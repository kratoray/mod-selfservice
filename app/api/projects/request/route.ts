import type { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/fetchApi';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  return fetchApi.post({
    request,
    path: 'v1/requests',
  });
};
