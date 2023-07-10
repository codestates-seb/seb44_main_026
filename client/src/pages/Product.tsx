import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { Category } from 'feature/Category';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { filterAtom } from 'jotai/atom';
import { Pagination } from 'feature/Pagination';
import { ItemList } from 'feature/ItemList';

// api 명세서 - 응답
// interface ItemType {
//   productName: string;
//   price: number;
//   image: string;
//   category: string;
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

    if (filter === '전체') id = 1;
    else if (filter === '욕실') id = 2;
    else if (filter === '주방') id = 3;
    else if (filter === '생활') id = 4;
    else if (filter === '주방') id = 5;
    else if (filter === '위생') id = 6;

    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((res) => {
        // setItemList(res.data.slice(0, 10));
        setItemList(res.data.slice((currentPage - 1) * 8, currentPage * 8));
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
    </>
  );
};

const ProductWrapper = styled.div`
  padding: 2rem;
`;
