import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { createClient } from '@/utils/supabase/server';

export class SbGiftRepository implements GiftRepository {
  async createGift(giftInfo: Gift): Promise<void> {
    const supabase = await createClient();

    const newGift = {
      category: giftInfo.category,
      product_name: giftInfo.productName,
      brand: giftInfo.brand,
      due_date: giftInfo.dueDate,
      barcode: giftInfo.barcode,
      image_url: giftInfo.imageUrl,
      is_deleted: giftInfo.isDeleted,
      owner_user_id: giftInfo.ownerUserId,
    };

    const { error } = await supabase.from('gift').insert([newGift]);
    if (error) {
      throw new Error(error.message);
    }
  }
}
