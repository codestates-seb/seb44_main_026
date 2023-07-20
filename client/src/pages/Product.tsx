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
// interface ItemType {
//   productId?: number;
//   productName: string;
//   price: number;
//   image: string;
//   category: string;
//   point: number;
//   detail?: string;
//   storeLink?: string;
// }

// 임시
export interface ItemType {
  albumId?: number;
  id: number;
  thumbnailUrl?: string;
  title: string;
  url: string;
  heart: boolean;
}

export const Product = () => {
  const filter = useAtomValue(filterAtom);

  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 50; // 아이템 총 개수 -> 해당 카테고리의 상품 개수
  const itemsPerPage = 10; // 각 페이지에 표시될 아이템 개수 -> 응답으로 받은 아이템의 개수
  const totalPages = Math.ceil(totalItems / itemsPerPage); //페이지 개수

  useEffect(() => {
    let id = 1;

    if (filter === 'all') id = 1;
    else if (filter === 'bathroom') id = 2;
    else if (filter === 'kitchen') id = 3;
    else if (filter === 'living') id = 4;
    else if (filter === 'stationery') id = 5;
    else if (filter === 'hygiene') id = 6;

    axios
      .get('url')
      .then((res) => {
        // setItemList(res.data.slice(0, 10));
        const itemlist = res.data.map((item: ItemType) => {
          return { ...item, heart: false };
        });
        setItemList(itemlist.slice((currentPage - 1) * 8, currentPage * 8));
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`/green`, {
    //     params: {
    //       page: currentPage,
    //       size: 10,
    //       category: filter,
    //     },
    //   })
    //   .then((res) => {
    //     setItemList(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
