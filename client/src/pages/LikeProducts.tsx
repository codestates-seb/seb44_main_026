import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { ItemList } from 'feature/ItemList';
import { TopScrollButton } from 'feature/TopScrollButton';
import { useEffect, useState } from 'react';

export const LikeProducts = () => {
  const [likeItems, setLikeItems] = useState([]);

  useEffect(() => {
    setLikeItems(JSON.parse(localStorage.getItem('likeItems') || '[]'));
  }, []);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Title>관심 상품</Title>
        <ItemList itemlist={likeItems} />
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
