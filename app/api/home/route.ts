import { giftList } from '@/app/giftData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedCategory = searchParams.get('selectedCategory');
  const searchWord = searchParams.get('searchWord') ?? '';

  // 더미데이터
  const filteredData =
    selectedCategory === '전체'
      ? giftList.filter((item) => item.productName.includes(searchWord))
      : giftList.filter(
          (item) =>
            item.category === selectedCategory &&
            item.productName.includes(searchWord)
        );

  return NextResponse.json(filteredData);
}
