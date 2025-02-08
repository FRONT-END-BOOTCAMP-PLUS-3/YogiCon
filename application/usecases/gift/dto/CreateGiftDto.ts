import { Categories } from '@/types/Categories';

export interface CreateGiftDto {
  category: Categories;
  productName: string;
  brand: string;
  dueDate: Date;
  barcode: string;
  imageUrl: string;
  isDeleted: boolean;
  ownerUserId: string;
}
