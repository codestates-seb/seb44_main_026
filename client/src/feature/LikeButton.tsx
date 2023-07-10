import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { ItemType } from 'pages/Product';

interface StyleLikeProps {
  color: string;
}

export const LikeButton = ({ id, title, url, heart }: ItemType) => {
  const [isLike, setIsLike] = useState(heart);

  const onLikeHandler = (id: number) => {
    setIsLike(!isLike);

    const likeItems = JSON.parse(localStorage.getItem('likeItems') || '[]');

    // 관심상품 여부 저장
    if (isLike) {
      const filterArr = likeItems.filter((obj: ItemType) => obj.id !== id);
      localStorage.setItem('likeItems', JSON.stringify(filterArr));
    } else {
      likeItems.push({ id: id, title: title, url: url, heart: !isLike });
      localStorage.setItem('likeItems', JSON.stringify(likeItems));
    }
    console.log(likeItems);
  };

  return (
    <>
      {isLike ? (
        <Heart
          icon={solidHeart}
          onClick={() => onLikeHandler(id)}
          color={`var(--red)`}
        />
      ) : (
        <Heart
          icon={regularHeart}
          onClick={() => onLikeHandler(id)}
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
