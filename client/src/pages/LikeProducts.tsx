import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { ItemList } from 'feature/ItemList';
import { TopScrollButton } from 'feature/TopScrollButton';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { isShopAtom } from 'jotai/atom';

export const LikeProducts = () => {
  const setIsShop = useSetAtom(isShopAtom);
  const [likeItems, setLikeItems] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    setLikeItems(JSON.parse(localStorage.getItem('likeItems') || '[]'));
    setIsLoding(false);
    setIsShop(true);
  }, []);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Title>관심 상품</Title>
        <ItemList itemlist={likeItems} isLoding={isLoding} />
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
