import { Gift } from '@/domain/entities/Gift';
import { GiftRepository } from '@/domain/repositories/GiftRepository';
import { createClient } from '@/utils/supabase/server';

export class SbGiftRepository implements GiftRepository {
  async createGift(data: Gift): Promise<void> {
    const supabase = await createClient();

    const formattedData = {
      category: data.category,
      product_name: data.productName,
      brand: data.brand,
      due_date: data.dueDate,
      barcode: data.barcode,
      image_url: data.imageUrl,
      is_deleted: data.isDeleted,
      owner_user_id: data.ownerUserId,
    };

    const { error } = await supabase.from('gift').insert([formattedData]);
    if (error) {
      throw new Error(error.message);
    }
  }
}
