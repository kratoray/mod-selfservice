// lib/fetchApi.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { parseDocument } from 'yaml';

// import { H } from 'highlight.run';
// Highlight.io logging staat klaar, uncomment bij implementatie

export type ResponseType = 'json' | 'yaml' | 'blob' | 'none' | 'plain';

interface Params {
  request: NextRequest;
  path: string;
  responseType?: ResponseType;
  options?: RequestInit;
  retryCount?: number;
  timeoutMs?: number;
}

interface RawParams extends Params {
  responseType?: 'json' | 'yaml';
}

function buildRequest(path: string, method: string, token: string, options?: RequestInit) {
  const url = `${process.env.CADOK_URL}/api/${path}`;
  const headers = new Headers(options?.headers);

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept-Language', 'nl');

  return new Request(url, {
    cache: 'no-store',
    ...options,
    method,
    headers,
  });
}

async function parseErrorResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  let body: any = null;
  try {
    if (contentType.includes('application/json')) {
      body = await response.json();
    } else {
      body = await response.text();
    }
  } catch {}

  const message =
    typeof body === 'object' && body?.message ? body.message : typeof body === 'string' ? body : null;

  return { error: 'API error', devError: message };
}

async function tryFetchWithRetry(
  request: Request,
  retries = 1,
  timeoutMs = 5000
): Promise<Response> {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(request.clone(), { signal: controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      lastError = err;
      clearTimeout(timeout);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 250)); // kleine delay tussen retries
    }
  }
  throw lastError;
}

async function fetchApiRequest(params: Params, method: string): Promise<NextResponse> {
  const token = await getToken({ req: params.request });
  if (!token?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const req = buildRequest(params.path, method, token.accessToken, params.options);
  let res: Response;
  try {
    res = await tryFetchWithRetry(req, params.retryCount ?? 0, params.timeoutMs ?? 5000);
  } catch (err) {
    // H.captureException?.(err, { extra: { path: params.path, method } });
    return NextResponse.json({ error: 'Netwerkfout' }, { status: 500 });
  }

  if (!res.ok) {
    if (res.status === 401) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
    if (res.status === 403) return NextResponse.json({ error: 'Geen toegang' }, { status: 403 });
    if (res.status === 404) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });

    const errBody = await parseErrorResponse(res);
    // H.captureMessage?.('API error', { level: 'error', extra: { path: params.path, method, status: res.status, body: errBody } });
    return process.env.NODE_ENV === 'development'
      ? NextResponse.json(errBody, { status: res.status })
      : NextResponse.json({ error: errBody.error }, { status: res.status });
  }

  switch (params.responseType) {
    case 'blob': return new NextResponse(await res.blob(), { status: res.status });
    case 'plain': return new NextResponse(await res.text(), { status: res.status });
    case 'none': return new NextResponse(null, { status: res.status });
    default:
      try {
        const json = await res.json();
        return NextResponse.json(json, { status: res.status });
      } catch {
        return new NextResponse(null, { status: res.status });
      }
  }
}

async function fetchRawApiRequest<T>(params: RawParams, method: string): Promise<T> {
  const token = await getToken({ req: params.request });
  if (!token?.accessToken) throw new Error('Unauthorized');

  const req = buildRequest(params.path, method, token.accessToken, params.options);
  let res: Response;
  try {
    res = await tryFetchWithRetry(req, params.retryCount ?? 0, params.timeoutMs ?? 5000);
  } catch (err) {
    // H.captureException?.(err, { extra: { path: params.path, method } });
    throw new Error('Netwerkfout');
  }

  if (!res.ok) {
    if (res.status === 401) throw new Error('Niet ingelogd');
    if (res.status === 403) throw new Error('Geen toegang');
    if (res.status === 404) throw new Error('Niet gevonden');

    const errBody = await parseErrorResponse(res);
    // H.captureMessage?.('API error', { level: 'error', extra: { path: params.path, method, status: res.status, body: errBody } });
    throw new Error(errBody.devError || errBody.error);
  }

  switch (params.responseType) {
    case 'yaml': return parseDocument(await res.text()) as T;
    default:
      try {
        return (await res.json()) as T;
      } catch {
        return null as T;
      }
  }
}

export const fetchApi = {
  get: (params: Params) => fetchApiRequest(params, 'GET'),
  getRaw: <T>(params: RawParams) => fetchRawApiRequest<T>(params, 'GET'),
  post: (params: Params) => fetchApiRequest(params, 'POST'),
  put: (params: Params) => fetchApiRequest(params, 'PUT'),
  patch: (params: Params) => fetchApiRequest(params, 'PATCH'),
  delete: (params: Params) => fetchApiRequest(params, 'DELETE'),
};
