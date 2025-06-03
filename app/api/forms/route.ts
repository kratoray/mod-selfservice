import type { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/fetchApi';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  return fetchApi.get({
    request,
    path: 'v1/forms/available',
  });
};
