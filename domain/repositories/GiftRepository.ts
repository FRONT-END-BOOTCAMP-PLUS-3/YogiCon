import { Gift } from '../entities/Gift';

export interface GiftRepository {
  createGift(giftInfo: Gift): Promise<void>;
}
