import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftDto } from './dto/GiftDto';

export const getGiftUseCase = async (
  giftRepository: GiftRepository,
  giftId: string
): Promise<GiftDto> => {
  const gift = await giftRepository.getGiftById(giftId);
  if (!gift) {
    throw new Error('기프티콘을 찾을 수 없습니다.');
  }

  const formattedDueDate = new Date(gift.dueDate + 'T00:00:00'); // 로컬 시간 변환
  formattedDueDate.setHours(9, 0, 0, 0); // UTC+9 적용

  const newGift: GiftDto = {

    id: gift.id,
    category: gift.category,
    productName: gift.productName,
    brand: gift.brand,
    dueDate: formattedDueDate.toISOString().split('T')[0], // 한국 시간 기준 변환
    barcode: gift.barcode,
    imageUrl: gift.imageUrl,
    isDeleted: gift.isDeleted,
    ownerUserId: gift.ownerUserId,
  };
  return newGift;
};
