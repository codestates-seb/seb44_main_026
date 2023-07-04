import ChallengeList from 'components/Challenge/ChallengeList';
import React from 'react';
import { styled } from 'styled-components';

const ChallengePage = () => {
  return (
    <StyledWrapper>
      <HeadLine>
        <h1>☘️ 챌린지</h1>
      </HeadLine>
      <ChallengeList />
    </StyledWrapper>
  );
};

export default ChallengePage;

const StyledWrapper = styled.div``;
const HeadLine = styled.div``;
