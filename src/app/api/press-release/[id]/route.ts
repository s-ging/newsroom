import { fetchPressRelease } from '@/services/press-release';
import { NextResponse } from 'next/server';

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(
  _req: Request,
  context: Context
) {
  try {
    const { id } = await context.params;
    const data = await fetchPressRelease(Number(id));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}