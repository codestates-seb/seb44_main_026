import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { UploadReview } from 'feature/UploadReview';
import { LikeButton } from 'feature/LikeButton';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { isShopAtom } from 'jotai/atom';
import { TopScrollButton } from 'feature/TopScrollButton';
import API from '../api/index';
import { Pagination } from 'feature/Pagination';
import { Review } from 'feature/Review';
import { ReviewSkeleton } from 'feature/skeletonUI/ReviewSkeleton';

interface ReviewType {
  reviewId: number;
  context: string;
  createdAt: number[];
  updateId: number;
  productId: number;
  imageLinks?: string[];
  name: string;
  point: number;
  memberId: number;
}

export const ItemDetail = () => {
  const location = useParams();
  const id = parseInt(location.id);

  const setIsShop = useSetAtom(isShopAtom);
  const [currentItem, setCurrentItem] = useState({
    category: '',
    imageLinks: '',
    point: 0,
    price: 0,
    productId: 0,
    productName: '',
    detail: '',
    storeLink: '',
    heart: false,
  });

  const [reviewList, setReviewList] = useState<ReviewType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoding, setIsLoding] = useState(true);
  const accessToken = localStorage.getItem('accessToken');

  const getReview = async () => {
    try {
      const res = await API.GET({
        url: `${process.env.REACT_APP_SERVER_URL}green/review/${id}?page=${
          currentPage - 1
        }&size=${5}`,
      });

      const Reviews = res.data;
      setReviewList(Reviews.data);
      setTotalPages(Reviews.pageInfo.totalPages);
      setIsLoding(false);

      console.log('review');
      console.log(res?.data);
    } catch (err) {
      console.log('review err');
      console.log(err);
    }
  };

  const getItemDetail = async () => {
    try {
      const res = await API.GET({
        url: `${process.env.REACT_APP_SERVER_URL}green/${id}`,
      });

      const itemDetail = res.data;
      setCurrentItem(itemDetail.data);
      console.log('item detail');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemDetail();
    getReview();
    setIsShop(true);
  }, [currentPage]);

  return (
    <>
      <Nav />
      <Wrapper>
        <div className="itemWrapper">
          <Image>
            <img src={currentItem.imageLinks} />
          </Image>
          <ItemInfo>
            <div>
              <h1 className="title">{currentItem.productName}</h1>
              <div className="price">
                {`${currentItem.price.toLocaleString()} 원`}
              </div>
              <div className="point">
                {`${currentItem.point.toLocaleString()} 포인트`}
              </div>
              <p className="detail">{currentItem.detail}</p>
            </div>
            <ButtonWrapper>
              <BuyButton onClick={() => window.open(currentItem.storeLink)}>
                구매하기
              </BuyButton>

              <div className="likebutton">
                <LikeButton
                  productId={currentItem.productId}
                  productName={currentItem.productName}
                  image={currentItem.imageLinks}
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
          리뷰 {reviewList.length}개
          {accessToken ? (
            <FormWrapper>
              <UploadReview id={currentItem.productId} />
            </FormWrapper>
          ) : null}
          <ul>
            {isLoding
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <ReviewSkeleton key={index} />)
              : reviewList.map((review: ReviewType) => (
                  <Review key={review.name} id={id} {...review} />
                ))}
          </ul>
          <Pagination
            total={totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
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

const Image = styled.div`
  width: 16rem;
  height: 13rem;
  flex-shrink: 0;

  background-color: var(--gray);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
