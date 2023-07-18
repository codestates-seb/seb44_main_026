import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { Category } from 'feature/Category';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { filterAtom } from 'jotai/atom';
import { Pagination } from 'feature/Pagination';
import { ItemList } from 'feature/ItemList';
import { TopScrollButton } from 'feature/TopScrollButton';

export interface ItemType {
  productId: number;
  productName: string;
  detail: string;
  price: number;
  point: number;
  category: string;
  storeLink: string;
  image: string;
  heart?: boolean;
}

export const Product = () => {
  const filter = useAtomValue(filterAtom);

  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //카테고리 변경 시
  useEffect(() => {
    axios
      .get(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/green`,
        {
          params: {
            page: currentPage,
            size: 9,
            category: filter,
          },
        },
      )
      .then((res) => {
        const Products = res.data;
        setItemList(Products.data);
        setTotalPages(Products.pageInfo.totalPages);
        setCurrentPage(1);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  //페이지네이션 변경 시
  useEffect(() => {
    axios
      .get(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/green`,
        {
          params: {
            page: currentPage,
            size: 9,
            category: filter,
          },
        },
      )
      .then((res) => {
        const Products = res.data;
        setItemList(Products.data);
        setTotalPages(Products.pageInfo.totalPages);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Category />
        <ItemList itemlist={itemList} />
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
