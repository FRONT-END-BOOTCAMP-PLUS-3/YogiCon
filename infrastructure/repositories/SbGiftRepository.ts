import { GetGiftListDto } from '@/application/usecases/gift/dto/GetGiftListDto';
import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
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

  async getGiftList(): Promise<GetGiftListDto[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('gift')
      .select(
        'id, category, product_name, brand, due_date, image_url, is_deleted, owner_user_id'
      )
      .order('due_date', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const giftList = data.map((gift) => ({
      id: gift.id,
      category: gift.category,
      productName: gift.product_name,
      brand: gift.brand,
      dueDate: gift.due_date,
      imageUrl: gift.image_url,
      isDeleted: gift.is_deleted,
      ownerUserId: gift.owner_user_id,
    }));

    return giftList || [];
  }

  async getGiftById(giftId: string): Promise<GiftDto> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('gift')
      .select('id, brand, due_date, image_url, is_deleted, owner_user_id')
      .eq('id', giftId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      brand: data.brand,
      dueDate: data.due_date,
      imageUrl: data.image_url,
      isDeleted: data.is_deleted,
      ownerUserId: data.owner_user_id,
    };
  }

  async deleteGift(giftId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('gift').delete().eq('id', giftId);
    if (error) {
      throw new Error(error.message);
    }
  }
}
