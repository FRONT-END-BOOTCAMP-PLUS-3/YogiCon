import { editGiftUseCase } from '@/application/usecases/gift/editGiftUseCase';
import { getGiftUseCase } from '@/application/usecases/gift/getGiftUseCase';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { SbGiftRepository } from '@/infrastructure/repositories/SbGiftRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const giftId = url.pathname.split('/').pop();

    if (!giftId) {
      return NextResponse.json(
        { error: 'giftId가 필요합니다.' },
        { status: 400 }
      );
    }
    const giftRepository: GiftRepository = new SbGiftRepository();
    const gift = await getGiftUseCase(giftRepository, giftId);

    return NextResponse.json(
      { message: '기프티콘 상세정보 조회 성공', gift },
      { status: 200 }
    );
  } catch (error) {
    console.error('기프티콘 상세정보 조회 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const giftId = url.pathname.split('/').pop();

    if (!giftId) {
      return NextResponse.json(
        { error: 'giftId가 필요합니다.' },
        { status: 400 }
      );
    }
    const giftRepository: GiftRepository = new SbGiftRepository();
    await giftRepository.deleteGift(giftId);

    return NextResponse.json(
      { message: '기프티콘 삭제 성공' },
      { status: 200 }
    );
  } catch (error) {
    console.error('기프티콘 삭제 오류', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const giftId = url.pathname.split('/').pop();

    if (!giftId) {
      return NextResponse.json(
        { error: 'giftId가 필요합니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const giftRepository: GiftRepository = new SbGiftRepository();
    const giftInfo = {
      id: giftId,
      ...body,
    };

    await editGiftUseCase(giftRepository, giftInfo);
    return NextResponse.json(
      { message: '기프티콘 수정 성공' },
      { status: 200 }
    );
  } catch (error) {
    console.error('기프티콘 수정 오류', error);
    return NextResponse.json({ message: '서버 오류 발생' }, { status: 500 });
  }
}
