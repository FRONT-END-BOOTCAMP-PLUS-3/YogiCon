import { Categories } from '@/types/Categories';

export type GiftInfo = {
  id: string;
  imageUrl: string;
  category: Categories;
  brand: string;
  productName: string;
  dueDate: string;
  isDeleted: boolean;
  ownerUserId: string;
};

export const giftList: GiftInfo[] = [
  {
    id: '1',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스',
    productName: '1번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '2',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '메가커피',
    productName: '2번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '3',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '베스킨라빈스',
    productName: '3번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '4',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스4',
    productName: '4번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '5',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스5',
    productName: '5번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '6',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스6',
    productName: '6번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '7',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스7',
    productName: '7번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
  {
    id: '8',
    imageUrl: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스8',
    productName: '8번 스타벅스 아메리카노 카페라떼 세트',
    dueDate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    ownerUserId: '1',
  },
];
