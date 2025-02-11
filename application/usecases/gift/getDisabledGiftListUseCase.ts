import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftDto } from './dto/GiftDto';
import { GiftListDto } from './dto/GiftListDto';

export const getDisabledGiftListUseCase = async (
  giftRepository: GiftRepository,
  page: number = 1,
  size: number = 7
): Promise<GiftListDto> => {
  const from = (page - 1) * size;
  const to = page * size - 1;

  const giftList = await giftRepository.getGiftList(from, to);
  const totalCount = await giftRepository.getTotalGiftCount();
  const totalPage = Math.ceil(totalCount / size);
  const now = new Date().toISOString().split('T')[0];

  // 휴지통 필터링(isDeleted가 true거나 dueDate 지난 것 )
  const filteredGiftList = giftList.filter(
    (gift) =>
      gift.isDeleted || new Date(gift.dueDate).toISOString().split('T')[0] < now
  );

  const newGiftList: GiftDto[] = filteredGiftList.map((gift) => ({
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
    hasNextPage: page < totalPage,
  };
};
