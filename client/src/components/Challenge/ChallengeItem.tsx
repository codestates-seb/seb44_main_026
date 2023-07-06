import React from 'react';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ItemProps = {
  item: any;
};

const ChallengeItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const gotoDetail = () => {
    navigate(`/challenge/${item.id}`);
  };
  return (
    <ItemWrapper onClick={gotoDetail}>
      <div className="challenge">
        {'🌱 ' + item.id + '. '}
        {item.title}
      </div>
      <WriterContainer>작성자: 김철수</WriterContainer>
      <CountContainer>n명 참여중</CountContainer>
    </ItemWrapper>
  );
};

export default ChallengeItem;

const ItemWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 2rem;
  font-size: 1rem;
  margin-top: 1rem;
  border-radius: 1rem;
  width: 100%;
  .challenge {
    display: flex;
    width: 60%;
    border-radius: 1rem;
    color: var(--green-300);
    align-items: center;
  }
`;

const CountContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  border-radius: 0.4rem;
  color: white;
  padding: 1rem;
  width: 20%;
  justify-content: center;
  margin-left: 1rem;
  background-color: var(--green-200);
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--green-300);
  font-size: 1rem;
  width: 20%;
`;
