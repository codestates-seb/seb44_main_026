import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { Category } from 'feature/Category';
import { Item } from 'feature/item';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface ItemType {
  title: string;
  url: string;
}

export const Product = () => {
  const [item, setItem] = useState<ItemType>({
    title: '',
    url: '',
  });

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/1`)
      .then((res) => {
        console.log(res.data);
        const { title, thumbnailUrl } = res.data;
        setItem({
          title: title,
          url: thumbnailUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ProductWrapper>
      <Nav />
      <Category />
      <Item title={item.title} url={item.url} />
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
