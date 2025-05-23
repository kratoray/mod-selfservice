import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    accessTokenExpiresAt?: number;
    refreshTokenExpiresAt?: number;
    roles?: string[];
    projects?: { [projectId: string]: string };
    error?: string;
    user?: {
      username?: string;
      name?: string | null;
    };
  }

  interface User {
    username?: string;
    name?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    refreshTokenExpiresAt?: number;
    username?: string;
    name?: string;
    resource_access?: {
      [key: string]: {
        roles?: string[];
      };
    };
    roles?: string[];
    groups?: string[];
    error?: string;
  }
}
