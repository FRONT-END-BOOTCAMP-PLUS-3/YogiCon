import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { CreateGiftDto } from './dto/CreateGiftDto';

export const createGiftUseCase = async (
  giftRepository: GiftRepository,
  giftInfo: CreateGiftDto
): Promise<void> => {
  const userId = 'fc0e7623-88a7-4312-969f-7d57b8df2501';

  // string으로 받은 dueDate를 Date로 변환
  const parseDueDate = new Date(giftInfo.dueDate);

  const newGift: Gift = {
    id: '',
    category: giftInfo.category,
    productName: giftInfo.productName,
    brand: giftInfo.brand,
    dueDate: parseDueDate,
    barcode: giftInfo.barcode,
    imageUrl: giftInfo.imageUrl,
    isDeleted: false,
    ownerUserId: userId,
  };
  console.log('newData: ', newGift);
  await giftRepository.createGift(newGift);
};
