import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import API from '../api/index';
import { ReviewModal } from './ReviewModal';

interface LikeButtonProps {
  productId: number;
  productName: string;
  detail?: string;
  price?: number;
  point?: number;
  category?: string;
  storeLink?: string;
  image?: string;
  heart?: boolean;
}

interface StyleLikeProps {
  color: string;
}

export const LikeButton = ({
  productId,
  // productName,
  // image,
  // price,
  // point,
  heart,
}: LikeButtonProps) => {
  const [isLike, setIsLike] = useState(heart);
  //모달
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(true);
  const [modalContent, setModalContent] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const postLike = async () => {
    try {
      const res = await API.POST({
        url: `${process.env.REACT_APP_SERVER_URL}like/${productId}`,
        headers: {
          Authorization: accessToken,
        },
      });

      if (res.status === 409) {
        setModalContent('이미 좋아요한 상품입니다.');
        setIsAlert(true);
        setIsOpen(true);
        return;
      } else if (res.status === 500) {
        setModalContent('상품 좋아요에 실패하였습니다.');
        setIsAlert(true);
        setIsOpen(true);
        return;
      }

      console.log('like post');
      console.log(res.data);
    } catch (err) {
      console.log('like post err');
      console.log(err);
    }
  };

  const deleteLike = async () => {
    try {
      const res = await API.DELETE({
        url: `${process.env.REACT_APP_SERVER_URL}like/${productId}`,
        headers: {
          Authorization: accessToken,
        },
      });
      console.log('delete like');
      console.log(res.data);
    } catch (err) {
      console.log('delete like err');
      console.log(err);
    }
  };

  const onLikeHandler = (productId: number) => {
    setIsLike(!isLike);

    // const likeItems = JSON.parse(localStorage.getItem('likeItems') || '[]');

    // 관심상품 여부 저장
    // if (isLike) {
    //   const filterArr = likeItems.filter(
    //     (obj: LikeButtonProps) => obj.productId !== productId,
    //   );
    //   localStorage.setItem('likeItems', JSON.stringify(filterArr));
    // } else {
    //   likeItems.push({
    //     productId: productId,
    //     productName: productName,
    //     image: image,
    //     price: price,
    //     point: point,
    //     heart: !isLike,
    //   });
    //   localStorage.setItem('likeItems', JSON.stringify(likeItems));
    // }

    if (!isLike) {
      postLike();
    } else {
      deleteLike();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // 새로고침
    location.reload();
  };

  return (
    <>
      {isOpen ? (
        <ReviewModal
          isAlert={isAlert}
          content={modalContent}
          onClose={handleClose}
        />
      ) : null}
      {isLike ? (
        <Heart
          icon={solidHeart}
          onClick={() => onLikeHandler(productId)}
          color={`var(--red)`}
        />
      ) : (
        <Heart
          icon={regularHeart}
          onClick={() => onLikeHandler(productId)}
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

  position: absolute;
  bottom: 0;
  right: 0;
`;
