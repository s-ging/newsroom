// src/app/api/press-release/[id]/route.ts
import { fetchPressRelease } from '@/services/press-release';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await fetchPressRelease(Number(id));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}