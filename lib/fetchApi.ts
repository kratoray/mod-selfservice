import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

// Helper voor error object check
function isErrorObject(body: unknown): body is { error: string } {
  return (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as { error: unknown }).error === 'string'
  );
}

type Params = {
  request: NextRequest;
  path: string;
  responseType?: 'json'; // Only json allowed
  options?: RequestInit;
};

type RawParams = Params & {
  responseType?: 'json';
};

const fetchApiRequest = async (params: Params, method: string): Promise<NextResponse> => {
  const token = await getToken({ req: params.request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = `${process.env.CADOK_URL}/${params.path}`;
  const request = new Request(url, {
    cache: 'no-store',
    ...params.options,
    method,
  });
  if (token.accessToken) request.headers.set('Authorization', `Bearer ${token.accessToken}`);
  request.headers.set('Accept-Language', 'nl');

  let response: Response;
  try {
    response = await fetch(request);
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }

  // Always return JSON, even for errors
  let body: unknown = null;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    } else {
      const text = await response.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }
  } catch {
    body = null;
  }

  if (!response.ok) {
    // H.captureMessage?.('API error', { level: 'error', extra: { path: params.path, method, status: response.status, body } });
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        isErrorObject(body) ? body : { error: String(body) || 'API error' },
        { status: response.status }
      );
    }
    // In productie: alleen error veld, geen dev details
    return NextResponse.json(isErrorObject(body) ? { error: body.error } : { error: 'API error' }, {
      status: response.status,
    });
  }

  // Only JSON responses allowed
  return NextResponse.json(body, { status: response.status });
};

const fetchRawApiRequest = async <T>(params: RawParams, method: string): Promise<T> => {
  const token = await getToken({ req: params.request });
  if (!token) throw new Error('Unauthorized');
  const url = `${process.env.CADOK_URL}/${params.path}`;
  const request = new Request(url, {
    cache: 'no-store',
    ...params.options,
    method,
  });
  if (token.accessToken) request.headers.set('Authorization', `Bearer ${token.accessToken}`);
  request.headers.set('Accept-Language', 'nl');
  let response: Response;
  try {
    response = await fetch(request);
  } catch {
    throw new Error('Network error');
  }
  let body: unknown = null;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    } else {
      const text = await response.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }
  } catch {
    body = null;
  }
  if (!response.ok) {
    throw new Error(isErrorObject(body) ? body.error : 'API error');
  }
  return body as T;
};

export const fetchApi = {
  get: (params: Params) => fetchApiRequest(params, 'GET'),
  getRaw: <T>(params: RawParams) => fetchRawApiRequest<T>(params, 'GET'),
  post: (params: Params) => fetchApiRequest(params, 'POST'),
  put: (params: Params) => fetchApiRequest(params, 'PUT'),
  patch: (params: Params) => fetchApiRequest(params, 'PATCH'),
  delete: (params: Params) => fetchApiRequest(params, 'DELETE'),
};
