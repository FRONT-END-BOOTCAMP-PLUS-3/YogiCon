import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { SbGiftRepository } from '@/infrastructure/repositories/SbGiftRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedCategory = searchParams.get('selectedCategory');
    const searchWord = searchParams.get('searchWord') ?? '';

    const giftRepository: GiftRepository = new SbGiftRepository();
    let giftList = await giftRepository.getGiftList();

    if (selectedCategory !== '전체') {
      giftList = giftList.filter((gift) => gift.category === selectedCategory);
    }

    if (searchWord) {
      giftList = giftList.filter(
        (gift) =>
          gift.productName.includes(searchWord) ||
          gift.brand.includes(searchWord)
      );
    }
    return NextResponse.json(
      { message: '기프티콘 리스트 조회 성공', data: giftList },
      { status: 200 }
    );
  } catch (error) {
    console.error('기프티콘 리스트 조회 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
