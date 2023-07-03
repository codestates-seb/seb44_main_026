import { useEffect, useRef, useState } from 'react';
import { slideArr } from './AdInfo';
import styled from 'styled-components';

const AutoSlide = () => {
  return (
    <DivConatiner>
      <StyledContainer>
        <SingleContainer>
          {slideArr.map((el) => (
            <img src={el[0]} />
          ))}
        </SingleContainer>
      </StyledContainer>
      <button>{`<`}</button>
      <button>{`>`}</button>
    </DivConatiner>
  );
};

export default AutoSlide;

const DivConatiner = styled.div`
  width: 70rem;
  background-color: blue;
  overflow: hidden;
`;

const StyledContainer = styled.div`
  width: 300rem;
  background-color: red;
  transform: translate(-0rem);
`;

const SingleContainer = styled.div`
  img {
    width: 70rem;
    height: 20rem;
  }
`;
