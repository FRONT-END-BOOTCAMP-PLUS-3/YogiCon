import { GiftDto } from './GiftDto';

export interface GiftListDto {
  giftList: GiftDto[];

  // 페이징 정보
  totalCount: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
