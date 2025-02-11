import { Categories } from '@/types/Categories';

export interface EditGiftDto {
  id: string;
  category: Categories;
  productName: string;
  brand: string;
  dueDate: string;
  barcode: string;
  imageUrl: string;
  isDeleted: boolean;
  ownerUserId: string;
}
