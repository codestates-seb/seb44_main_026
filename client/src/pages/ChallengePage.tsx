import ChallengeList from 'components/Challenge/ChallengeList';
import React from 'react';
import { styled } from 'styled-components';

const ChallengePage = () => {
  return (
    <StyledWrapper>
      <HeadLine>
        <h1>☘️ 챌린지</h1>
        <WriteButton>글 작성하기</WriteButton>
      </HeadLine>
      <ChallengeList />
    </StyledWrapper>
  );
};

export default ChallengePage;

const StyledWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;
const HeadLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
  h1 {
    width: 90%;
  }
`;

const WriteButton = styled.div`
  display: flex;
  width: 10%;
  align-items: center;
  font-size: 13px;
  justify-content: center;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--green-100);
`;
