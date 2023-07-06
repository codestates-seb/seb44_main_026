import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { Category } from 'feature/Category';
import { Item } from 'feature/item';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ItemType {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export const Product = () => {
  const [itemList, setItemList] = useState<ItemType[]>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <ProductWrapper>
        <Category />
        <ItemList>
          {itemList.map((item) => (
            <Item key={item.id} title={item.title} url={item.url} />
          ))}
        </ItemList>
      </ProductWrapper>
    </>
  );
};

const ProductWrapper = styled.div`
  padding: 2rem;
`;

const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, max-content));
  justify-content: center;
  gap: 1rem;
  margin: 2rem;
`;
