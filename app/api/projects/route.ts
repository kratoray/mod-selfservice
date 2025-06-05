import type { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/fetchApi';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return fetchApi.get({
    request,
    path: 'v1/projects',
  });
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  return fetchApi.post({
    request,
    path: 'admin/v1/projects',
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
    },
  });
};
