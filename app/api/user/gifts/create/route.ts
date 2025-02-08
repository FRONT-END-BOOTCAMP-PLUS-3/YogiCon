import { createGiftUseCase } from '@/application/usecases/gift/createGiftUseCase';
import { CreateGiftDto } from '@/application/usecases/gift/dto/CreateGiftDto';
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
