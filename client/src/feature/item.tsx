import { styled } from 'styled-components';
import { LikeButton } from 'feature/LikeButton';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'pages/Product';

export const Item = ({
  productId,
  productName,
  price,
  point,
  imageLinks,
  heart,
}: ItemType) => {
  const navigate = useNavigate();

  const selectItemHandler = (productId: number) => {
    navigate(`/product/detail/${productId}`);
  };

  return (
    <ItemWrapper>
      <Image onClick={() => selectItemHandler(productId)}>
        <img src={imageLinks} />
      </Image>
      <ItemInfoWrapper>
        <ItemInfo>
          <div className="title" onClick={() => selectItemHandler(productId)}>
            {productName}
          </div>
          <div className="price"> {`${price.toLocaleString()} 원`}</div>
          <div className="point">{`${point.toLocaleString()} 포인트`}</div>
        </ItemInfo>
        <div className="likebutton">
          <LikeButton
            productId={productId}
            productName={productName}
            image={imageLinks}
            price={price}
            point={point}
            heart={heart}
          />
        </div>
      </ItemInfoWrapper>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  list-style: none;
  border-radius: 0.5rem;
  background-color: var(--white);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;

  width: 18rem;
  height: 20rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div`
  cursor: pointer;

  width: 16rem;
  min-height: 13rem;

  background-color: var(--gray);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  word-break: normal;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .likebutton {
    position: relative;
  }
`;

const ItemInfo = styled.div`
  & > * {
    margin-bottom: 0.3rem;
  }

  .title {
    cursor: pointer;
    font-weight: bold;
  }

  .point {
    font-weight: bold;
    color: var(--green-300);
  }
`;
