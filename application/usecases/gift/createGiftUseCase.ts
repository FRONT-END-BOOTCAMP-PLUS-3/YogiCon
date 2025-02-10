import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { CreateGiftDto } from './dto/CreateGiftDto';

export const createGiftUseCase = async (
  giftRepository: GiftRepository,
  giftInfo: CreateGiftDto
): Promise<void> => {
  const userId = '3891279432';

  // string으로 받은 dueDate를 Date로 변환
  // const parseDueDate = new Date(giftInfo.dueDate);

  const newGift: Gift = {
    id: '',
    category: giftInfo.category,
    productName: giftInfo.productName,
    brand: giftInfo.brand,
    // dueDate: parseDueDate,
    dueDate: giftInfo.dueDate,
    barcode: giftInfo.barcode,
    imageUrl: giftInfo.imageUrl,
    isDeleted: false,
    ownerUserId: userId,
  };
  console.log('newData: ', newGift);
  await giftRepository.createGift(newGift);
};
