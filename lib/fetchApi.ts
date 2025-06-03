import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';
// import { H } from 'highlight.run';
import { parseDocument } from 'yaml';

type Params = {
  request: NextRequest;
  path: string;
  responseType?: 'json' | 'yaml' | 'blob' | 'none' | 'plain';
  options?: RequestInit;
};

type RawParams = Params & {
  responseType?: 'json' | 'yaml';
};

const fetchApiRequest = async (params: Params, method: string): Promise<NextResponse> => {
  const token = await getToken({ req: params.request });
  if (!token) {
    return NextResponse.json({}, { status: 401 });
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
    // H.captureException?.(error, { extra: { path: params.path, method } });
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }

  if (!response.ok) {
    let errorBody: string = '';
    try {
      errorBody = await response.text();
    } catch {}
    // H.captureMessage?.('API error', { level: 'error', extra: { path: params.path, method, status: response.status, errorBody } });
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ error: errorBody || 'API error' }, { status: response.status });
    }
    return NextResponse.json({ error: 'API error' }, { status: response.status });
  }

  switch (params.responseType) {
    case 'blob':
      return new NextResponse(await response.blob(), { status: response.status });
    case 'plain':
      return new NextResponse(await response.text(), { status: response.status });
    case 'none':
      return new NextResponse(null, { status: response.status });
    default:
      try {
        return NextResponse.json(await response.json(), { status: response.status });
      } catch {
        return new NextResponse(null, { status: response.status });
      }
  }
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
    // H.captureException?.(error, { extra: { path: params.path, method } });
    throw new Error('Network error');
  }
  if (!response.ok) {
    const errorBody = await response.text();
    // H.captureMessage?.('API error', { level: 'error', extra: { path: params.path, method, status: response.status, errorBody } });
    throw new Error(errorBody || 'API error');
  }
  switch (params.responseType) {
    case 'yaml':
      return parseDocument(await response.text()) as T;
    default:
      return response.json() as T;
  }
};

export const fetchApi = {
  get: (params: Params) => fetchApiRequest(params, 'GET'),
  getRaw: <T>(params: RawParams) => fetchRawApiRequest<T>(params, 'GET'),
  post: (params: Params) => fetchApiRequest(params, 'POST'),
  put: (params: Params) => fetchApiRequest(params, 'PUT'),
  patch: (params: Params) => fetchApiRequest(params, 'PATCH'),
  delete: (params: Params) => fetchApiRequest(params, 'DELETE'),
};
