import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json([], {
      status: 401,
    });
  }

  try {
    const params: { [key: string]: string } = {
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      refresh_token: token.refreshToken ?? '', // Use empty string if refreshToken is undefined
    };

    const apiResponse = await fetch(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: new URLSearchParams(params),
        cache: 'no-store',
      }
    );

    if (!apiResponse.ok) {
      return NextResponse.json([], {
        status: apiResponse.status,
      });
    }

    return NextResponse.json([], {
      status: 200,
    });
  } catch {
    return NextResponse.json([], {
      status: 500,
    });
  }
}
