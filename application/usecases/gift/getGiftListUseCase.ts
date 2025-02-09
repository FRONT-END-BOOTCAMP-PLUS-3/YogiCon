import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GetGiftListDto } from './dto/GetGiftListDto';

export const getGiftListUseCase = async (
  giftRepository: GiftRepository
): Promise<GetGiftListDto[]> => {
  const userId = '3891273930';

  const giftList = await giftRepository.getGiftList();
  const filteredGiftList = giftList.filter(
    (gift) => gift.ownerUserId === userId
  );

  return filteredGiftList;
};
