import { styled } from 'styled-components';
import { Item } from 'feature/item';
import { ItemType } from 'pages/Product';

interface ItemListProps {
  itemlist: ItemType[];
}

export const ItemList = ({ itemlist }: ItemListProps) => {
  return (
    <ListWrapper>
      {itemlist.map((item: ItemType) => (
        <Item key={item.id} {...item} />
        //id -> productId 로 수정할 것
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(18rem, max-content));
  justify-content: center;
  gap: 1rem;
  margin: 2rem;
`;
