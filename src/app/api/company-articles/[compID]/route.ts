// app/api/company-articles/[compId]/route.ts
import { fetchCompanyArticles } from '@/services/company-articles';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ compId: string }> }
) {
  const { compId } = await params;
  try {
    const related = await fetchCompanyArticles(compId);
    return NextResponse.json(related);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}