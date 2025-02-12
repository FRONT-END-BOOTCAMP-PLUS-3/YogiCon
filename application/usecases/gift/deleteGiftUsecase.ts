import { GiftRepository } from '@/domain/repositories/GiftRepository';

export const deleteGiftUsecase = async (
  giftRepository: GiftRepository,
  giftId: string
): Promise<void> => {
  await giftRepository.deleteGift(giftId);
};
