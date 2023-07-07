import { styled } from 'styled-components';
import { Nav } from 'components/Nav';
import { LikeButton } from 'feature/LikeButton';

export const ItemDetail = () => {
  const itemId = 1;

  return (
    <>
      <Nav />
      <Wrapper>
        <Item>
          <Image />
          <ItemInfo>
            <Title>무려 10,000원 짜리 커피 연필</Title>
            <Price>10,000원</Price>
            <Carbon>
              줄인탄소량 nnn CO<sub>2</sub>
            </Carbon>
            <Detail>
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
            </Detail>
            <ButtonWrapper>
              <BuyButton onClick={() => window.open('https://www.naver.com/')}>
                구매하기
              </BuyButton>

              {/* */}
              {/* 상품 id props로 보내기 */}
              <LikeButton id={itemId} />
              {/* */}
              {/* */}
            </ButtonWrapper>
          </ItemInfo>
        </Item>
        {/* 리뷰 표시 */}
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
`;
const Item = styled.div`
  display: flex;

  border-bottom: 0.1rem solid var(--gray);
  padding: 2rem;
`;

const Image = styled.div`
  background-color: var(--gray);
  border: 0.1rem solid var(--gray);
  width: 16rem;
  height: 13rem;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  margin-left: 2rem;

  > * {
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;
const Price = styled.div``;

const Carbon = styled.div`
  font-weight: bold;
  color: var(--green-300);
`;

const Detail = styled.p`
  word-break: normal;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const BuyButton = styled.button`
  cursor: pointer;

  background-color: var(--green-100);
  border: 0.1rem solid var(--green-100);
  border-radius: 0.5rem;

  font-size: 1.25rem;
  color: var(--white);

  width: 100%;
  padding: 0.75rem;
`;
