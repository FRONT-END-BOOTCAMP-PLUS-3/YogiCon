import { Gift } from '../entities/Gift';
import { GetGiftListDto } from '@/application/usecases/gift/dto/GetGiftListDto';

export interface GiftRepository {
  createGift(giftInfo: Gift): Promise<void>; // 기프티콘 등록
  getGiftList(): Promise<GetGiftListDto[]>; // 기프티콘 리스트 조회
}
