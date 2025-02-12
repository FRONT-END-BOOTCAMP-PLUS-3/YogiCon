import { Gift } from '../entities/Gift';

export interface GiftRepository {
  createGift(giftInfo: Gift): Promise<void>; // 기프티콘 등록
  getTotalGiftCount(userId: string): Promise<number>; // 기프티콘 총 개수 조회
  getGiftList(from: number, to: number, userId: string): Promise<Gift[]>; // 기프티콘 리스트 조회
  getGiftById(giftId: string): Promise<Gift>; // 기프티콘 상세 조회
  deleteGift(giftId: string): Promise<void>; // 기프티콘 삭제
  editGift(giftInfo: Gift): Promise<void>; // 기프티콘 수정
}
