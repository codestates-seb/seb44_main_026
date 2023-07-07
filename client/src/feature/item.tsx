import { styled } from 'styled-components';
import { LikeButton } from 'feature/LikeButton';

interface ItemProps {
  title: string;
  url: string;
}

interface ImageProps {
  img: string;
}

export const Item = ({ title, url }: ItemProps) => {
  const itemId = 1;

  console.log(title, url);

  return (
    <ItemWrapper>
      <Image img={url} />
      <ItemInfoWrapper>
        <ItemInfo>
          <Title>{title}</Title>
          <Price>10000원</Price>
          <Review>리뷰 00개</Review>
        </ItemInfo>

        <LikeButton id={itemId} />
      </ItemInfoWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  list-style: none;
  border: 0.1rem solid var(--gray);
  border-radius: 0.5rem;
  background-color: var(--white);

  width: 18rem;
  height: 21rem;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const Image = styled.div<ImageProps>`
  border: 0.1rem solid var(--gray);

  width: 16rem;
  height: 13rem;

  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;

const ItemInfoWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  word-break: normal;
`;

const ItemInfo = styled.div``;

const Title = styled.div``;
const Price = styled.div`
  padding-top: 0.3rem;
`;
const Review = styled.div`
  padding-top: 0.3rem;
`;
