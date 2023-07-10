import { styled } from 'styled-components';
import { Item } from 'feature/item';
import { ItemType } from 'pages/Product';

// interface ItemType {
//   albumId?: number;
//   id: number;
//   thumbnailUrl?: string;
//   title: string;
//   url: string;
//   heart: boolean;
// }

interface ItemListProps {
  itemlist: ItemType[];
}

export const ItemList = ({ itemlist }: ItemListProps) => {
  return (
    <ListWrapper>
      {itemlist.map(
        (item: { id: number; title: string; url: string; heart: boolean }) => (
          <Item
            // key={item.id}
            // id={item.id}
            // title={item.title}
            // url={item.url}
            // heart={item.heart}
            {...item}
          />
        ),
      )}
    </ListWrapper>
  );
};

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, max-content));
  justify-content: center;
  gap: 1rem;
  margin: 2rem;
`;
