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

  async getTotalGiftCount(): Promise<number> {
    const supabase = await createClient();
    const userId = '3891279432';

    const { count, error } = await supabase
      .from('gift')
      .select('*', { count: 'exact', head: true })
      .eq('owner_user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return count || 0;
  }

  async getGiftList(from: number, to: number): Promise<Gift[]> {
    const supabase = await createClient();
    const userId = '3891279432';

    const { data: giftList, error } = await supabase
      .from('gift')
      .select('*')
      .eq('owner_user_id', userId)
      .order('due_date', { ascending: true })
      .range(from, to);

    if (error) {
      throw new Error(error.message);
    }
    console.log('giftList: ', giftList);

    return (
      giftList?.map((gift) => ({
        id: gift.id,
        category: gift.category,
        productName: gift.product_name,
        brand: gift.brand,
        dueDate: gift.due_date,
        barcode: gift.barcode,
        imageUrl: gift.image_url,
        isDeleted: gift.is_deleted,
        ownerUserId: gift.owner_user_id,
      })) || []
    );
  }

  async getGiftById(giftId: string): Promise<Gift> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('gift')
      .select('*')
      .eq('id', giftId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      category: data.category,
      productName: data.product_name,
      brand: data.brand,
      dueDate: data.due_date,
      barcode: data.barcode,
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
