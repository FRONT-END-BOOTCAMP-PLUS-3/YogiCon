import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftListDto } from './dto/GiftListDto';
import { GiftDto } from './dto/GiftDto';

export const getGiftListUseCase = async (
  giftRepository: GiftRepository,
  page: number = 1
): Promise<GiftListDto> => {
  const from = (page - 1) * 10;
  const to = page * 10 - 1;

  const giftList = await giftRepository.getGiftList(from, to);

  console.log('giftList: ', giftList);

  const totalCount = await giftRepository.getTotalGiftCount();
  const totalPage = Math.ceil(totalCount / 10);

  const newGiftList: GiftDto[] = giftList.map((gift) => ({
    id: gift.id,
    category: gift.category,
    productName: gift.productName,
    brand: gift.brand,
    dueDate: gift.dueDate,
    imageUrl: gift.imageUrl,
    isDeleted: gift.isDeleted,
    ownerUserId: gift.ownerUserId,
  }));

  return {
    giftList: newGiftList,
    totalCount,
    totalPage,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPage,
  };
};
