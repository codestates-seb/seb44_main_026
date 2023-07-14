import { styled } from 'styled-components';
import { LikeButton } from 'feature/LikeButton';
import { useNavigate } from 'react-router-dom';
import { ItemType } from 'pages/Product';

interface ImageProps {
  img: string;
}

export const Item = ({ id, title, url, heart }: ItemType) => {
  const navigate = useNavigate();

  const selectItemHandler = (id: number) => {
    navigate(`/item/${id}`, {
      state: { id: id, title: title, url: url, heart: heart },
    });
  };

  return (
    <ItemWrapper>
      <Image img={url} onClick={() => selectItemHandler(id)} />
      <ItemInfoWrapper>
        <ItemInfo>
          <div className="title" onClick={() => selectItemHandler(id)}>
            {title}
          </div>
          <div className="price">10000원</div>
          <div className="review">리뷰 00개</div>
        </ItemInfo>
        <div className="likebutton">
          <LikeButton id={id} title={title} url={url} heart={heart} />
        </div>
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
  height: 22rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div<ImageProps>`
  cursor: pointer;

  width: 16rem;
  min-height: 13rem;

  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
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
`;
