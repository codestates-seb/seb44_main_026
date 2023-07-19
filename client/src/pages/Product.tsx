import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { filterAtom } from 'jotai/atom';
import { Nav } from 'components/Nav';
import { Category } from 'feature/Category';
import { Pagination } from 'feature/Pagination';
import { ItemList } from 'feature/ItemList';
import { TopScrollButton } from 'feature/TopScrollButton';
import API from '../api/index';

export interface ItemType {
  productId: number;
  productName: string;
  detail: string;
  price: number;
  point: number;
  category: string;
  storeLink: string;
  imageLink: string;
  heart?: boolean;
}

export const Product = () => {
  const filter = useAtomValue(filterAtom);

  const [isLoding, setIsLoding] = useState(true);
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const getProduct = async () => {
    try {
      const res = await API.GET(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/green?page=${currentPage}&size=${9}&category=${filter}`,
      );

      const Products = res.data;
      setItemList(Products.data);
      setTotalPages(Products.pageInfo.totalPages);
      setIsLoding(false);

      console.log(res?.data);
    } catch (err) {
      console.log('product');
      console.log(err);
    }
  };

  //카테고리 변경 시
  useEffect(() => {
    getProduct();
    setCurrentPage(1);
  }, [filter]);

  //페이지네이션 변경 시
  useEffect(() => {
    getProduct();
  }, [currentPage]);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Category />
        <ItemList itemlist={itemList} isLoding={isLoding} />
        <Pagination
          total={totalPages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      </ProductWrapper>
      <TopScrollButton />
    </>
  );
};

const ProductWrapper = styled.div`
  padding: 2rem;
`;
