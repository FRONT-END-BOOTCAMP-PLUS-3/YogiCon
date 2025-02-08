import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { CreateGiftDto } from './dto/CreateGiftDto';

export const createGiftUseCase = async (
  giftRepository: GiftRepository,
  data: CreateGiftDto
): Promise<void> => {
  const userId = 'fc0e7623-88a7-4312-969f-7d57b8df2501';

  // string으로 받은 dueDate를 Date로 변환
  const parseDueDate = new Date(data.dueDate);

  const newData: Omit<Gift, 'id'> = {
    category: data.category,
    productName: data.productName,
    brand: data.brand,
    dueDate: parseDueDate,
    barcode: data.barcode,
    imageUrl: data.imageUrl,
    isDeleted: false,
    ownerUserId: userId,
  };
  console.log('newData: ', newData);
  await giftRepository.createGift(newData);
};
