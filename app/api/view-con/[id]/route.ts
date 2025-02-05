import { giftList } from '@/app/giftData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  // 더미 데이터
  const conInfo = giftList.find((item) => item.id === id);

  return NextResponse.json(conInfo);
}
