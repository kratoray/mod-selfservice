import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

// import { H } from 'highlight.run';
// Highlight.io integratie (voor monitoring en error logging):
// Uncomment de import en de H.captureMessage/H.captureException regels zodra highlight.io is geconfigureerd in het project.
// Zie https://www.highlight.io/docs/getting-started/integrate/nodejs voor setup.

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

// Utility voor error handling
function handleApiError(response: Response, path: string, method: string): never {
  // H.captureMessage('API error', {
  //   level: 'error',
  //   extra: { path, method, status: response.status },
  // });
  throw new Error(`API error: ${response.status} for ${method} ${path}`);
}

function buildApiRequest(
  path: string,
  method: string,
  token: { accessToken?: string },
  options?: RequestInit
) {
  if (!process.env.CADOK_URL) {
    throw new Error('CADOK_URL environment variable is not set');
  }
  const url = `${process.env.CADOK_URL}/${path}`;
  // Headers correct opbouwen
  const headers = new Headers(options?.headers || {});
  if (token.accessToken) {
    headers.set('Authorization', `Bearer ${token.accessToken}`);
  }
  headers.set('Accept-Language', 'nl');
  const request = new Request(url, {
    cache: 'no-store',
    ...options,
    method,
    headers,
  });
  return request;
}

const fetchApiRequest = async (params: Params, method: string): Promise<NextResponse> => {
  const token = await getToken({ req: params.request });

  if (!token) {
    // H.captureMessage('Unauthorized: No token found', {
    //   level: 'warn',
    //   extra: { path: params.path, method },
    // });
    return NextResponse.json(
      {},
      {
        status: 401,
      }
    );
  }

  const request = buildApiRequest(params.path, method, token, params.options);

  let response: Response;
  try {
    response = await fetch(request);
  } catch {
    // H.captureException(error, { extra: { path: params.path, method } });
    return NextResponse.json({ error: 'Network error' }, { status: 500 });
  }

  if (!response.ok) {
    handleApiError(response, params.path, method);
  }

  switch (params.responseType) {
    case 'blob': {
      const blob = await response.blob();
      return new NextResponse(blob, { status: response.status });
    }
    case 'plain': {
      const text = await response.text();
      return new NextResponse(text, { status: response.status });
    }
    case 'none':
      return new NextResponse(null, { status: response.status });
    default: {
      const contentLength = response.headers.get('content-length');
      if (response.status === 204 || contentLength === '0' || response.body === null) {
        return new NextResponse(null, { status: response.status });
      }
      try {
        const json = await response.json();
        return NextResponse.json(json, { status: response.status });
      } catch {
        return new NextResponse(null, { status: response.status });
      }
    }
  }
};

const fetchRawApiRequest = async <T>(params: RawParams, method: string): Promise<T> => {
  const token = await getToken({ req: params.request });

  if (!token) {
    // H.captureMessage('Unauthorized: No token found', {
    //   level: 'warn',
    //   extra: { path: params.path, method },
    // });
    throw new Error('Unauthorized');
  }

  const request = buildApiRequest(params.path, method, token, params.options);

  let response: Response;
  try {
    response = await fetch(request);
  } catch (error) {
    // H.captureException(error, { extra: { path: params.path, method } });
    throw error;
  }

  if (!response.ok) {
    handleApiError(response, params.path, method);
  }

  switch (params.responseType) {
    case 'yaml': {
      const text = await response.text();
      return parseDocument(text) as T;
    }
    default: {
      const contentLength = response.headers.get('content-length');
      if (response.status === 204 || contentLength === '0' || response.body === null) {
        return null as T;
      }
      try {
        const json = await response.json();
        return json as T;
      } catch {
        return null as T;
      }
    }
  }
};

export const fetchApi = {
  get: async <T = unknown>(params: Params): Promise<T> => {
    const response = await fetchApiRequest(params, 'GET');
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  },

  getRaw: async <T>(params: RawParams): Promise<T> => {
    return fetchRawApiRequest<T>(params, 'GET');
  },

  post: async <T = unknown>(params: Params): Promise<T> => {
    const response = await fetchApiRequest(params, 'POST');
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  },

  put: async <T = unknown>(params: Params): Promise<T> => {
    const response = await fetchApiRequest(params, 'PUT');
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  },

  patch: async <T = unknown>(params: Params): Promise<T> => {
    const response = await fetchApiRequest(params, 'PATCH');
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  },

  delete: async <T = unknown>(params: Params): Promise<T> => {
    const response = await fetchApiRequest(params, 'DELETE');
    try {
      return (await response.json()) as T;
    } catch {
      return null as T;
    }
  },
};
