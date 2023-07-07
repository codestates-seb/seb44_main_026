import { styled } from 'styled-components';
import { LikeButton } from 'feature/LikeButton';
import { useNavigate } from 'react-router-dom';

interface ItemProps {
  id: number;
  title: string;
  url: string;
}

interface ImageProps {
  img: string;
}

export const Item = ({ id, title, url }: ItemProps) => {
  const navigate = useNavigate();

  const selectItemHandler = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <ItemWrapper>
      <Image img={url} onClick={() => selectItemHandler(id)} />
      <ItemInfoWrapper>
        <ItemInfo>
          <Title onClick={() => selectItemHandler(id)}>{title}</Title>
          <Price>10000원</Price>
          <Review>리뷰 00개</Review>
        </ItemInfo>

        <LikeButton id={id} />
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
`;

const Image = styled.div<ImageProps>`
  border: 0.1rem solid var(--gray);
  cursor: pointer;

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

const Title = styled.div`
  cursor: pointer;
`;
const Price = styled.div`
  padding-top: 0.3rem;
`;
const Review = styled.div`
  padding-top: 0.3rem;
`;
