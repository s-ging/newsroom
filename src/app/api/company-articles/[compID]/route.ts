// app/api/company-articles/[compID]/route.ts
import { fetchCompanyArticles } from '@/services/company-articles';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ compID: string }> }
) {
  const { compID } = await params;
  try {
    const related = await fetchCompanyArticles(compID);
    return NextResponse.json(related);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}