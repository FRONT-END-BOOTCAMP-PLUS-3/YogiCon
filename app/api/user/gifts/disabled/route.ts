import { giftList } from '@/app/giftData';
import { NextResponse } from 'next/server';

export async function GET() {
  // 더미데이터
  const filteredData = giftList.filter(
    (item) => item.isDeleted || new Date(item.dueDate) < new Date()
  );

  return NextResponse.json(filteredData);
}
