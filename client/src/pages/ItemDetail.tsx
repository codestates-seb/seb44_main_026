import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { UploadReview } from 'feature/UploadReview';
import { ReviewList } from 'feature/ReviewList';
import { LikeButton } from 'feature/LikeButton';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface ImageProps {
  img: string;
}

export const ItemDetail = () => {
  const location = useLocation();
  const item = location.state;

  // const [currentItem, setCurrentItem] = useState({});

  const onBuyHandler = () => {
    window.open('https://www.naver.com/');

    // const point = {
    //   point: currentItem.point,
    // };

    // axios
    //   .patch(`url`, JSON.stringify(point))
    //   .then((res) => {
    //     //성공
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // useEffect(() => {
  //   axios
  //     .get(`/green/${productId}`)
  //     .then((res) => {
  //       setCurrentItem(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <Nav />
      <Wrapper>
        <div className="itemWrapper">
          <Image img={item.url} />
          <ItemInfo>
            <h1 className="title">{item.title}</h1>
            <div className="price">10,000원</div>
            <div className="point">100포인트</div>
            <p className="detail">
              100% 천연 커피 점토만을 사용하여 만들어진 연필입니다 ! 100% 천연
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
              사용하여 만들어진 연필입니다 !
            </p>
            <ButtonWrapper>
              <BuyButton onClick={() => onBuyHandler()}>구매하기</BuyButton>

              <div className="likebutton">
                <LikeButton
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  heart={item.heart}
                />
              </div>
            </ButtonWrapper>
          </ItemInfo>
        </div>
        {/* 리뷰 표시 */}
        <div className="reviewWrapper">
          <UploadReview id={item.id} />
          <ReviewList />
        </div>
      </Wrapper>
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
`;

const ItemInfo = styled.div`
  margin-left: 2rem;

  > * {
    margin-bottom: 0.5rem;
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .point {
    font-weight: bold;
    color: var(--green-300);
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
