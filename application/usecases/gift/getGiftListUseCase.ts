import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftListDto } from './dto/GiftListDto';
import { GiftDto } from './dto/GiftDto';

export const getGiftListUseCase = async (
  giftRepository: GiftRepository,
  page: number = 1,
  size: number = 5
): Promise<GiftListDto> => {
  const from = (page - 1) * size;
  const to = page * size - 1;

  const giftList = await giftRepository.getGiftList(from, to);

  console.log('giftList: ', giftList);

  const totalCount = await giftRepository.getTotalGiftCount();
  const totalPage = Math.ceil(totalCount / size);

  const newGiftList: GiftDto[] = giftList.map((gift) => ({
    id: gift.id,
    category: gift.category,
    productName: gift.productName,
    brand: gift.brand,
    dueDate: new Date(gift.dueDate).toISOString().split('T')[0],
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
