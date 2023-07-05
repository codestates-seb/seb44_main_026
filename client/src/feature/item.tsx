import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

interface ItemProps {
  title: string;
  url: string;
}

interface LikeProps {
  color: string;
}

interface ImageProps {
  img: string;
}

export const Item = ({ title, url }: ItemProps) => {
  const [isLike, setIsLike] = useState(false);

  const onLikeHandler = () => {
    setIsLike(!isLike);

    // 관심상품 여부 저장
  };

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
        {isLike ? (
          <LikeButton
            icon={solidHeart}
            onClick={() => onLikeHandler()}
            color={`var(--red)`}
          />
        ) : (
          <LikeButton
            icon={regularHeart}
            onClick={() => onLikeHandler()}
            color={`var(--gray)`}
          />
        )}
      </ItemInfoWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  list-style: none;
  border: 0.1rem solid var(--gray);
  border-radius: 0.5rem;

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

const LikeButton = styled(FontAwesomeIcon)<LikeProps>`
  width: 2rem;
  height: 2rem;
  color: ${(props) => props.color};
`;
