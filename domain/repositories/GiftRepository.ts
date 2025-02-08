import { Gift } from '../entities/Gift';

export interface GiftRepository {
  createGift(data: Omit<Gift, 'id'>): Promise<void>;
}
