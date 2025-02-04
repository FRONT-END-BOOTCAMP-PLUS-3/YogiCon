import { Categories } from '@/types/categories';

export type ConInfo = {
  id: string;
  image_url: string;
  category: Categories;
  brand: string;
  name: string;
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
    name: '1번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '2',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스2',
    name: '2번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '3',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스3',
    name: '3번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '4',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스4',
    name: '4번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '5',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스5',
    name: '5번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '6',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스6',
    name: '6번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '7',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스7',
    name: '7번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
  {
    id: '8',
    image_url: '/gifticon.jpg',
    category: '카페',
    brand: '스타벅스8',
    name: '8번 스타벅스 아메리카노 카페라떼 세트',
    duedate: '2026-01-26T00:00:00.000Z',
    isDeleted: false,
    owner_user_id: '1',
  },
];
