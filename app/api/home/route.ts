import { giftList } from '@/app/giftData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedCategory = searchParams.get('selectedCategory');

  // 더미데이터
  const filteredData =
    selectedCategory === '전체'
      ? giftList
      : giftList.filter((item) => item.category === selectedCategory);

  return NextResponse.json(filteredData);
}
