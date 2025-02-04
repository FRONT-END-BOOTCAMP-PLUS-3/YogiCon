import { Categories } from '@/types/categories';

export type ConInfo = {
  id: string;
  image_url: string;
  category: Categories;
  brand: string;
  product_name: string;
  duedate: string;
  isDeleted: boolean;
  owner_user_id: string;
};

export const giftList: ConInfo[] = [
  {
    id: '1',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스1',
    product_name: '1번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '2',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스2',
    product_name: '2번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '3',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스3',
    product_name: '3번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '4',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스4',
    product_name: '4번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '5',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스5',
    product_name: '5번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '6',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스6',
    product_name: '6번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '7',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스7',
    product_name: '7번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '8',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스8',
    product_name: '8번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
];
