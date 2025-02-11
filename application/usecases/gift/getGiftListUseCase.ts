import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { GiftDto } from './dto/GiftDto';
import { GiftListDto } from './dto/GiftListDto';

export const getGiftListUseCase = async (
  giftRepository: GiftRepository,
  page: number = 1,
  size: number = 7,
  selectedCategory: string = '전체',
  searchWord: string = ''
): Promise<GiftListDto> => {
  const from = (page - 1) * size;
  const to = page * size - 1;

  let giftList = await giftRepository.getGiftList(from, to);
  const totalCount = await giftRepository.getTotalGiftCount();
  const totalPage = Math.ceil(totalCount / size);
  const now = new Date().toISOString().split('T')[0];

  // 홈 필터링(isDeleted가 false이고 dueDate 안 지난 것 )
  giftList = giftList.filter(
    (gift) =>
      !gift.isDeleted &&
      new Date(gift.dueDate).toISOString().split('T')[0] >= now
  );

  // 카테고리 필터링
  let filteredGiftList = giftList;
  if (selectedCategory !== '전체') {
    filteredGiftList = giftList.filter(
      (gift) => gift.category === selectedCategory
    );
  }

  // 검색어 필터링
  if (searchWord.trim()) {
    filteredGiftList = giftList.filter(
      (gift) =>
        gift.productName.includes(searchWord) || gift.brand.includes(searchWord)
    );
  }

  const newGiftList: GiftDto[] = filteredGiftList.map((gift) => ({
    id: gift.id,
    category: gift.category,
    productName: gift.productName,
    brand: gift.brand,
    dueDate: new Date(gift.dueDate).toISOString().split('T')[0],
    barcode: gift.barcode,
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
