import { Account, AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

/**
 * Adds the access and refresh tokens to the JWT, including their expiry
 * timestamps.
 *
 * @param token The JWT to add the access and refresh tokens to
 * @param oauthResponse The response from OAuth containing the tokens
 *
 * @return The JWT that contains the access and refresh tokens
 */
const addTokensToJwt = (token: JWT, oauthResponse: Account): JWT => {
  let accessTokenExpiry = 0;

  if (oauthResponse.expires_at) {
    accessTokenExpiry = oauthResponse.expires_at * 1000;
  } else if (oauthResponse.expires_in) {
    accessTokenExpiry = Date.now() + oauthResponse.expires_in * 1000;
  }

  const refreshTokenExpiry = Date.now() + oauthResponse.refresh_expires_in * 1000;

  const decodedAccessToken = JSON.parse(
    new TextDecoder().decode(
      Uint8Array.from(atob(oauthResponse.access_token.split('.')[1]), c => c.charCodeAt(0))
    )
  );

  return {
    ...token,
    accessToken: oauthResponse.access_token,
    refreshToken: oauthResponse.refresh_token,
    accessTokenExpiresAt: accessTokenExpiry - 15 * 1000,
    refreshTokenExpiresAt: refreshTokenExpiry - 15 * 1000,
    username: decodedAccessToken.username,
    name: `${decodedAccessToken.first_name} ${decodedAccessToken.last_name}`,
    resource_access: decodedAccessToken.resource_access,
    roles: decodedAccessToken.roles,
    groups: decodedAccessToken.groups,
  };
};

/**
 * Sends a request to Keycloak for refreshing an access token.
 *
 * @param token The JWT containing the refresh token
 *
 * @return A JWT containing the new access and refresh tokens if the refresh was
 *         successful, otherwise a JWT containing an error
 */
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
  });

  if (!response.ok) {
    return { ...token, error: 'RefreshAccessTokenError' };
  }

  return addTokensToJwt(token, await response.json());
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      issuer: process.env.KEYCLOAK_ISSUER,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid cadok',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(session);
      console.log(token);
      const projects: { [projectId: string]: string } = {};
      (token.groups ?? [])
        .filter(group => group.startsWith('/CADOK/'))
        .forEach(group => {
          const [projectId, role] = group.substring('/CADOK/'.length).split('/');
          projects[projectId] = role;
        });

      // Fix: Find the correct resource_access key case-insensitively
      let roles: string[] = [];
      if (token.resource_access && process.env.KEYCLOAK_CLIENT_ID) {
        const clientId = process.env.KEYCLOAK_CLIENT_ID.toLowerCase();
        const matchedKey = Object.keys(token.resource_access).find(
          key => key.toLowerCase() === clientId
        );
        if (matchedKey) {
          roles = token.resource_access[matchedKey]?.roles ?? [];
        }
      }

      return {
        ...session,
        user: {
          username: token.username,
          name: token.name,
        },
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        roles,
        projects,
        error: token.error,
      };
    },

    jwt: async ({ token, account, profile, trigger }) => {
      if (account && profile) {
        return addTokensToJwt(token, account);
      }

      if (trigger || Date.now() >= token.accessTokenExpiresAt) {
        return refreshAccessToken(token);
      }

      return token;
    },
  },
};
