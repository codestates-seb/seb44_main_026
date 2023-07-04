import AutoSlide from 'components/AdSlide/AutoSlide';
import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <StyledContainer>
      <AutoSlide />
    </StyledContainer>
  );
};

export default MainPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
