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
    <ProductWrapper>
      <Nav />
      <Category />
      <ItemListWrapper>
        <ItemList>
          {itemList.map((item) => (
            <Item key={item.id} title={item.title} url={item.url} />
          ))}
        </ItemList>
      </ItemListWrapper>
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;
const ItemListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ItemList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 1rem;
`;
