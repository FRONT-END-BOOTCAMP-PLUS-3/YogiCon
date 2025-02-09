import { GetGiftListDto } from '@/application/usecases/gift/dto/GetGiftListDto';
import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import { Gift } from '../entities/Gift';

export interface GiftRepository {
  createGift(giftInfo: Gift): Promise<void>; // 기프티콘 등록
  getGiftList(): Promise<GetGiftListDto[]>; // 기프티콘 리스트 조회
  getGiftById(giftId: string): Promise<GiftDto>; // 기프티콘 상세 조회
}
