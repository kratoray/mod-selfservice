// eslint-disable-next-line react/no-typos
import 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;

      KEYCLOAK_ISSUER: string;
      KEYCLOAK_CLIENT_ID: string;
      KEYCLOAK_CLIENT_SECRET: string;

      API_URL: string;
      CADOK_URL: string;
      HELM_REPO: string;

      NEXT_PUBLIC_SENTRY_DSN: string;
      SENTRY_DSN: string;

      NEXT_PUBLIC_MATOMO_URL: string;
      NEXT_PUBLIC_MATOMO_SITE_ID: string;

      STRAPI_API_URL: string;
      STRAPI_API_TOKEN: string;
    }
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare module 'next-auth' {
  interface Account {
    access_token: string;
    token_type: string;
    id_token: string;
    refresh_token: string;
    expires_in?: number;
    expires_at?: number;
    refresh_expires_in: number;
  }

  interface Profile {
    roles: string[];
    username: string;
    first_name: string;
    last_name: string;
    groups: string[];
  }

  interface Session {
    user: {
      name: string;
      username: string;
    };
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    roles: string[];
    projects: { [projectId: string]: string };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    refreshTokenExpiresAt: number;
    roles: string[];
    groups: string[];
    resource_access: {
      [clientId: string]: {
        roles: string[];
      };
    };
    error?: 'RefreshAccessTokenError';
  }
}
