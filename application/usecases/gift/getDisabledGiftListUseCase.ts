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

  // 한국 시간(KST) 기준 오늘 날짜
  const now = new Date();
  now.setHours(9, 0, 0, 0); // UTC+9 기준으로 변환
  const nowString = now.toISOString().split('T')[0]; // "YYYY-MM-DD"

  // 휴지통 필터링(isDeleted가 true거나 dueDate 지난 것 )
  const filteredGiftList = giftList.filter((gift) => {
    const dueDate = new Date(gift.dueDate + 'T00:00:00'); // 로컬 시간 기준 변환
    dueDate.setHours(9, 0, 0, 0); // UTC+9로 변환

    return gift.isDeleted || dueDate.toISOString().split('T')[0] < nowString;
  });

  const newGiftList: GiftDto[] = filteredGiftList.map((gift) => {
    const formattedDueDate = new Date(gift.dueDate + 'T00:00:00'); // 로컬 시간 변환
    formattedDueDate.setHours(9, 0, 0, 0); // UTC+9 적용

    return {
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
  });

  return {
    giftList: newGiftList,
    totalCount,
    totalPage,
    hasNextPage: page < totalPage,
  };
};
