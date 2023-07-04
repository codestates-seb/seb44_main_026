import React from 'react';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { CPost } from './type';

type ItemProps = {
  item: any;
};

const ChallengeItem: React.FC<ItemProps> = ({ item }) => {
  return (
    <ItemWrapper>
      {item.id}
      {'🌱' + item.title}
      <CountContainer>참여자수</CountContainer>
    </ItemWrapper>
  );
};

export default ChallengeItem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  padding: 2rem 0rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  border-radius: 1rem;
  width: 80%;
`;

const CountContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  color: white;
  padding: 1rem;
  background-color: #9dc18b;
`;
