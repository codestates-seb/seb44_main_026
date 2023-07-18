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

// api 명세서 - 응답
export interface ItemType {
  productId: number;
  productName: string;
  detail: string;
  price: number;
  point: number;
  category: string;
  storeLink: string;
  image?: string;
  heart?: boolean;
}

// 임시
// export interface ItemType {
//   albumId?: number;
//   id: number;
//   thumbnailUrl?: string;
//   title: string;
//   url: string;
//   heart: boolean;
// }

export const Product = () => {
  const filter = useAtomValue(filterAtom);

  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // const totalItems = 50; // 아이템 총 개수 -> 해당 카테고리의 상품 개수
  // const itemsPerPage = 10; // 각 페이지에 표시될 아이템 개수 -> 응답으로 받은 아이템의 개수
  // const totalPages = Math.ceil(totalItems / itemsPerPage); //페이지 개수

  useEffect(() => {
    // let id = 1;

    // if (filter === 'all') id = 1;
    // else if (filter === 'bathroom') id = 2;
    // else if (filter === 'kitchen') id = 3;
    // else if (filter === 'living') id = 4;
    // else if (filter === 'stationery') id = 5;
    // else if (filter === 'hygiene') id = 6;

    // axios
    //   .get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    //   .then((res) => {
    //     // setItemList(res.data.slice(0, 10));
    //     const itemlist = res.data.map((item: ItemType) => {
    //       return { ...item, heart: false };
    //     });
    //     setItemList(itemlist.slice((currentPage - 1) * 8, currentPage * 8));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // "proxy" : "http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com"

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
        console.log(res.data);

        const Products = res.data;
        setItemList(Products.data);
        setTotalPages(Products.pageInfo.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, currentPage]);

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
