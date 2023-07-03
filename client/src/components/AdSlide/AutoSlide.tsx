import { useEffect, useRef, useState } from 'react';
import { slideArr } from './AdInfo';
import styled, { keyframes, css } from 'styled-components';
import { useInterval } from 'hook/UseInterval';
import { transform } from '@babel/core';

interface AutoProps {
  idx: number;
}

const AutoSlide = () => {
  const [slideIndex, setslideIndex] = useState(0); //slider index
  useInterval(() => setslideIndex((slideIndex) => slideIndex + 1), 3000); //custom hook

  if (slideIndex === 3) {
    setslideIndex(0);
  }

  const slideUp = () => {
    if (slideIndex < 3) {
      setslideIndex(slideIndex + 1);
    } else {
      setslideIndex(0);
    }
  };
  const slideDown = () => {
    if (slideIndex > 0) {
      setslideIndex(slideIndex - 1);
    } else {
      setslideIndex(2);
    }
  };
  return (
    <DivConatiner>
      <StyledContainer display={slideIndex}>
        <SingleContainer>
          {slideArr.map((el) => (
            <img src={el[0]} />
          ))}
        </SingleContainer>
      </StyledContainer>
      <button onClick={slideDown}>{`<`}</button>
      <button onClick={slideUp}>{`>`}</button>
      {slideIndex}
    </DivConatiner>
  );
};

export default AutoSlide;

const DivConatiner = styled.div`
  width: 70rem;
  background-color: green;
  overflow: hidden;
`;

const StyledContainer = styled.div<{ display: number }>`
  width: 300rem;
  transition: 1s;
  transform: ${(props) =>
    props.display ? `translate(${-(props.display * 70)}rem)` : null};
`;

const SingleContainer = styled.div`
  img {
    width: 70rem;
    height: 20rem;
  }
`;
