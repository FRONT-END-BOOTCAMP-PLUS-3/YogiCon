import { getDisabledGiftListUseCase } from '@/application/usecases/gift/getDisabledGiftListUseCase';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { SbGiftRepository } from '@/infrastructure/repositories/SbGiftRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId가 필요합니다.' },
        { status: 400 }
      );
    }

    const giftRepository: GiftRepository = new SbGiftRepository();

    const giftListDto = await getDisabledGiftListUseCase(
      giftRepository,
      page,
      7,
      userId
    );

    return NextResponse.json(
      { message: '휴지통 기프티콘 리스트 조회 성공', data: giftListDto },
      { status: 200 }
    );
  } catch (error) {
    console.error('휴지통 기프티콘 리스트 조회 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
