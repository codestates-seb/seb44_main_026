export interface MainList {
  productName: string;
  price: string;
  detail: string;
  createdAt: string;
  point: number;
}

export const DummyItem: MainList[] = [
  {
    productName: '상품1',
    price: '50000',
    detail: '내용입니다내용입니다내용입니다내용입니다내용입니다',
    createdAt: '2023-07-11 13:23:14',
    point: 3000,
  },
  {
    productName: '상품2',
    price: '50000',
    detail: '내용입니다내용입니다내용입니다내용입니다내용입니다',
    createdAt: '2023-07-11 09:23:14',
    point: 3000,
  },
  {
    productName: '상품3',
    price: '50000',
    detail: '내용입니다내용입니다내용입니다내용입니다내용입니다',
    createdAt: '2023-07-09 09:23:14',
    point: 3000,
  },
  {
    productName: '상품4',
    price: '50000',
    detail: '내용입니다내용입니다내용입니다내용입니다내용입니다',
    createdAt: '2023-07-07 09:23:14',
    point: 3000,
  },
];
