import { Categories } from '@/types/Categories';

export interface GetGiftListDto {
  id: string; // UUID
  category: Categories;
  productName: string;
  brand: string;
  dueDate: string;
  imageUrl: string;
  isDeleted: boolean;
  ownerUserId: string; // Foreign Key -> User
}
