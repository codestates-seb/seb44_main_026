import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

interface LikeButtonProps {
  id: number;
}

interface StyleLikeProps {
  color: string;
}

export const LikeButton = ({ id }: LikeButtonProps) => {
  const [isLike, setIsLike] = useState(false);

  const onLikeHandler = () => {
    setIsLike(!isLike);

    // 관심상품 여부 저장
  };

  return (
    <>
      {isLike ? (
        <Heart
          icon={solidHeart}
          onClick={() => onLikeHandler()}
          color={`var(--red)`}
        />
      ) : (
        <Heart
          icon={regularHeart}
          onClick={() => onLikeHandler()}
          color={`var(--gray)`}
        />
      )}
    </>
  );
};
const Heart = styled(FontAwesomeIcon)<StyleLikeProps>`
  cursor: pointer;

  width: 2rem;
  height: 2rem;
  color: ${(props) => props.color};
  padding: 1rem;
`;
