import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftDto } from './dto/GiftDto';

export const getGiftUseCase = async (
  giftRepository: GiftRepository,
  giftId: string
): Promise<GiftDto> => {
  const userId = '3891279432';

  const gift = await giftRepository.getGiftById(giftId);
  if (gift.ownerUserId !== userId) {
    throw new Error('해당 기프티콘에 접근할 권한이 없습니다.');
  }
  return gift;
};
