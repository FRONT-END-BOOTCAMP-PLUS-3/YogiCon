import { Categories } from '@/types/Categories';

export interface Con {
  id: string; // UUID
  category: Categories;
  productName: string;
  brand: string;
  dueDate: Date;
  barcode: string;
  imageUrl: string;
  isDeleted: boolean;
  ownerUserId: string; // Foreign Key -> User
}
