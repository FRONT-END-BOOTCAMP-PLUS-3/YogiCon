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

  const newGift: GiftDto = {
    id: gift.id,
    category: gift.category,
    productName: gift.productName,
    brand: gift.brand,
    dueDate: new Date(gift.dueDate).toISOString().split('T')[0],
    barcode: gift.barcode,
    imageUrl: gift.imageUrl,
    isDeleted: gift.isDeleted,
    ownerUserId: gift.ownerUserId,
  };
  return newGift;
};
