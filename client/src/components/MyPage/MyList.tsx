import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

interface MyPageItemProps {
  item: {
    title: string;
    createdAt: string;
  };
}

const MyList: React.FC<MyPageItemProps> = ({ item }) => {
  return (
    <DivContainer>
      <SingleContainer>
        <div>{item.title}</div>
        <div>{'⏱️ ' + moment(item.createdAt).fromNow()}</div>
      </SingleContainer>
    </DivContainer>
  );
};

export default MyList;

const DivContainer = styled.div`
  border: 1px solid var(--gray);
  border-radius: 1rem;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
`;

const SingleContainer = styled.div`
  padding: 1rem;
`;
