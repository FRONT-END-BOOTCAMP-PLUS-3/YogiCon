import { createGiftUseCase } from '@/application/usecases/gift/createGiftUseCase';
import { CreateGiftDto } from '@/application/usecases/gift/dto/CreateGiftDto';
import { getGiftListUseCase } from '@/application/usecases/gift/getGiftListUseCase';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { SbGiftRepository } from '@/infrastructure/repositories/SbGiftRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data: CreateGiftDto = await request.json();
    const giftRepository: GiftRepository = new SbGiftRepository();

    await createGiftUseCase(giftRepository, data);
    return NextResponse.json(
      { message: '기프티콘 생성 성공' },
      { status: 201 }
    );
  } catch (error) {
    console.error('기프티콘 생성 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedCategory = searchParams.get('selectedCategory');
    const searchWord = searchParams.get('searchWord') ?? '';
    const page = Number(searchParams.get('page')) || 1;
    // const from = (page - 1) * 10;
    // const to = page * 10 - 1;

    const giftRepository: GiftRepository = new SbGiftRepository();
    // let giftList = await giftRepository.getGiftList(from, to);
    let giftListDto = await getGiftListUseCase(giftRepository, page);

    if (selectedCategory !== '전체') {
      giftListDto.giftList = giftListDto.giftList.filter(
        (gift) => gift.category === selectedCategory
      );
    }

    if (searchWord) {
      giftListDto.giftList = giftListDto.giftList.filter(
        (gift) =>
          gift.productName.includes(searchWord) ||
          gift.brand.includes(searchWord)
      );
    }
    return NextResponse.json(
      { message: '기프티콘 리스트 조회 성공', data: giftListDto },
      { status: 200 }
    );
  } catch (error) {
    console.error('기프티콘 리스트 조회 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
