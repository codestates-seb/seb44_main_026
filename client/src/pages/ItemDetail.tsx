import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { UploadReview } from 'feature/UploadReview';
import { ReviewList } from 'feature/ReviewList';
import { LikeButton } from 'feature/LikeButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TopScrollButton } from 'feature/TopScrollButton';
import API from '../api/index';

interface ImageProps {
  img: string;
}

export const ItemDetail = () => {
  const location = useParams();
  const [currentItem, setCurrentItem] = useState({
    productId: 0,
    productName: '',
    detail: '',
    price: 0,
    point: 0,
    category: '',
    storeLink: '',
    image: '',
    heart: false,
  });

  const getItemDetail = async () => {
    const id = location.id;

    try {
      const res = await API.GET(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/green/${id}`,
      );

      const itemDetail = res.data;
      setCurrentItem(itemDetail.data);

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getItemDetail();
    const id = location.id;
    axios
      .get(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/green/${id}`,
      )
      .then((res) => {
        console.log(res.data.data);

        const itemDetail = res.data;
        setCurrentItem(itemDetail.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <Wrapper>
        <div className="itemWrapper">
          <Image img={currentItem.image} />
          <ItemInfo>
            <div>
              <h1 className="title">{currentItem.productName}</h1>
              <div className="price">
                {`${currentItem.price.toLocaleString()} 원`}
              </div>
              <div className="point">
                {`${currentItem.point.toLocaleString()} 포인트`}
              </div>
              <p className="detail">
                {currentItem.detail}
                {/* 100% 천연 커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연
              커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피
              점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피 점토만을
              사용하여 만들어진 연필입니다 ! 100% 천연 커피 점토만을 사용하여
              만들어진 연필입니다 ! 100% 천연 커피 점토만을 사용하여 만들어진
              연필입니다 !100% 천연 커피 점토만을 사용하여 만들어진 연필입니다 !
              100% 천연 커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연
              커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피
              점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피 점토만을
              사용하여 만들어진 연필입니다 ! 100% 천연 커피 점토만을 사용하여
              만들어진 연필입니다 !100% 천연 커피 점토만을 사용하여 만들어진
              연필입니다 ! 100% 천연 커피 점토만을 사용하여 만들어진 연필입니다
              ! 100% 천연 커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연
              커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피
              점토만을 사용하여 만들어진 연필입니다 ! 100% 천연 커피 점토만을
              사용하여 만들어진 연필입니다 ! */}
              </p>
            </div>
            <ButtonWrapper>
              <BuyButton onClick={() => window.open(currentItem.storeLink)}>
                구매하기
              </BuyButton>

              <div className="likebutton">
                <LikeButton
                  productId={currentItem.productId}
                  productName={currentItem.productName}
                  image={currentItem.image}
                  price={currentItem.price}
                  point={currentItem.point}
                  heart={currentItem.heart}
                />
              </div>
            </ButtonWrapper>
          </ItemInfo>
        </div>
        {/* 리뷰 표시 */}
        <div className="reviewWrapper">
          리뷰 2개
          <FormWrapper>
            <UploadReview id={currentItem.productId} />
          </FormWrapper>
          <ReviewList id={currentItem.productId} />
        </div>
      </Wrapper>
      <TopScrollButton />
    </>
  );
};

const Wrapper = styled.main`
  border: 0.1rem solid var(--green-100);
  border-radius: 0.5rem;
  background-color: var(--white);

  margin: 1rem;
  padding: 1rem;

  .itemWrapper {
    display: flex;
    border-bottom: 0.1rem solid var(--gray);
    padding: 2rem;
  }

  .reviewWrapper {
    padding: 2rem;
  }
`;

const Image = styled.div<ImageProps>`
  width: 16rem;
  height: 13rem;
  flex-shrink: 0;

  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  background-color: var(--gray);
`;

const ItemInfo = styled.div`
  margin-left: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .price {
    margin-bottom: 0.5rem;
  }
  .point {
    font-weight: bold;
    color: var(--green-300);
    margin: 0.5rem 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  .likebutton {
    position: relative;
    padding: 1rem;
    margin-left: 1rem;
  }
`;

const BuyButton = styled.button`
  cursor: pointer;

  background-color: var(--green-100);
  border: none;
  border-radius: 0.5rem;

  font-size: 1.25rem;
  color: var(--white);

  width: 100%;
  height: 3rem;

  &:hover {
    background-color: var(--green-200);
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 0.1rem solid var(--gray);
  border-radius: 0.5rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;

  padding: 1rem;
  margin: 1rem 0;
`;
