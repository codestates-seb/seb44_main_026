import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { ItemList } from 'feature/ItemList';
import { TopScrollButton } from 'feature/TopScrollButton';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { isShopAtom } from 'jotai/atom';
import API from '../api/index';
import { ItemType } from './Product';
import { Pagination } from 'feature/Pagination';

export const LikeProducts = () => {
  const setIsShop = useSetAtom(isShopAtom);
  const [likeItems, setLikeItems] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = localStorage.getItem('accessToken');

  const getLikeProducts = async () => {
    try {
      const res = await API.GET({
        url: `${process.env.REACT_APP_SERVER_URL}like?page=${
          currentPage - 1
        }&size=${9}`,
        headers: {
          Authorization: accessToken,
        },
      });

      const likeProducts = res.data;
      const setProducts = likeProducts.data.map((item: ItemType) => {
        return { ...item, imageLink: item.imageLinks[0], heart: true };
      });
      setLikeItems(setProducts);
      setTotalPages(likeProducts.pageInfo.totalPages);

      console.log('get like');
      console.log(res?.data);
      setIsLoding(false);
    } catch (err) {
      console.log('get like err');
      console.log(err);
    }
  };

  useEffect(() => {
    // setLikeItems(JSON.parse(localStorage.getItem('likeItems') || '[]'));
    getLikeProducts();
    setIsShop(true);
  }, [currentPage]);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Title>관심 상품</Title>
        {/* <ItemList itemlist={likeItems} isLoding={isLoding} /> */}
        <ItemList itemlist={likeItems} isLoding={isLoding} />
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
const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0 2rem;
`;
