// import { Categories } from '@/types/Categories';

// export interface GiftListDto {
//   id: string; // UUID
//   category: Categories;
//   productName: string;
//   brand: string;
//   dueDate: string;
//   imageUrl: string;
//   isDeleted: boolean;
//   ownerUserId: string; // Foreign Key -> User
// }

import { GiftDto } from './GiftDto';

export interface GiftListDto {
  giftList: GiftDto[];

  // 페이징 정보
  totalCount: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
