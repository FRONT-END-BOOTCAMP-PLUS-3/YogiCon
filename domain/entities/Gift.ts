import { Categories } from '@/types/Categories';

export interface Gift {
  id: string; // UUID
  category: Categories;
  productName: string;
  brand: string;
  dueDate: string;
  barcode: string;
  imageUrl: string;
  isDeleted: boolean;
  ownerUserId: string; // Foreign Key -> User
}
