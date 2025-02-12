import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { EditGiftDto } from './dto/EditGiftDto';

export const editGiftUseCase = async (
  giftRepository: GiftRepository,
  giftInfo: EditGiftDto
): Promise<void> => {
  const userId = '3891279432';

  const parseDueDate = new Date(giftInfo.dueDate);

  const editedGift: Gift = {
    id: giftInfo.id,
    category: giftInfo.category,
    productName: giftInfo.productName,
    brand: giftInfo.brand,
    dueDate: parseDueDate,
    barcode: giftInfo.barcode,
    imageUrl: giftInfo.imageUrl,
    isDeleted: giftInfo.isDeleted,
    ownerUserId: userId,
  };
  console.log('editedGift: ', editedGift);
  await giftRepository.editGift(editedGift);
};
