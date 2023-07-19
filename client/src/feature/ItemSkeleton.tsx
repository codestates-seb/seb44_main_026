import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

export const ItemSkeleton = () => {
  return (
    <ItemWrapper>
      <Skeleton className="image" />
      <ItemInfoWrapper>
        <ItemInfo>
          <Skeleton className="title"></Skeleton>
          <Skeleton className="price"></Skeleton>
          <Skeleton className="point"></Skeleton>
        </ItemInfo>
        <div className="likebutton"></div>
      </ItemInfoWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  border-radius: 0.5rem;
  background-color: var(--white);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;

  width: 18rem;
  height: 20rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 16rem;
    min-height: 13rem;
  }
`;

const ItemInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  word-break: normal;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .likebutton {
    position: relative;
  }
`;

const ItemInfo = styled.div`
  & > * {
    margin-bottom: 0.3rem;
  }

  .price {
    width: 40%;
  }
  .point {
    width: 40%;
  }
`;
