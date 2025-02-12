import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { EditGiftDto } from './dto/EditGiftDto';

export const editGiftUseCase = async (
  giftRepository: GiftRepository,
  giftInfo: EditGiftDto
): Promise<void> => {
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
    ownerUserId: giftInfo.ownerUserId,
  };
  console.log('editedGift: ', editedGift);
  await giftRepository.editGift(editedGift);
};
