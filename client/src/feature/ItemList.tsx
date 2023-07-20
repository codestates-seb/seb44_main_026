import { styled } from 'styled-components';
import { Item } from 'feature/item';
import { ItemType } from 'pages/Product';
import { ItemSkeleton } from './skeletonUI/ItemSkeleton';

interface ItemListProps {
  itemlist: ItemType[];
  isLoding: boolean;
}

export const ItemList = ({ itemlist, isLoding }: ItemListProps) => {
  return (
    <ListWrapper>
      {isLoding
        ? Array(9)
            .fill(null)
            .map((_, index) => <ItemSkeleton key={index} />)
        : itemlist.map((item: ItemType) => {
            // <Item key={item.id} {...item} />
            // const { productId, productName, image, heart } = item;
            return (
              <Item
                key={item.productId}
                // productId={productId}
                // productName={productName}
                // image={image}
                // heart={heart}
                {...item}
              />
            );
          })}
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
