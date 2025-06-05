import type { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/fetchApi';

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  return fetchApi.put({
    request,
    path: `v1/requests/${params.id}`,
    options: {
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
    },
  });
};
