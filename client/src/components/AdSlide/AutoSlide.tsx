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
  const LastIdx = slideArr.length;
  useInterval(() => setslideIndex((slideIndex) => slideIndex + 1), 4000); //custom hook

  if (slideIndex === LastIdx) {
    setslideIndex(0);
  }

  const slideUp = () => {
    if (slideIndex < LastIdx) {
      setslideIndex(slideIndex + 1);
    } else {
      setslideIndex(0);
    }
  };
  const slideDown = () => {
    if (slideIndex > 0) {
      setslideIndex(slideIndex - 1);
    } else {
      setslideIndex(LastIdx - 1);
    }
  };
  return (
    <>
      <button onClick={slideDown}>{`<`}</button>
      <DivConatiner>
        <StyledContainer display={slideIndex}>
          <SingleContainer>
            {slideArr.map((el) => (
              <img src={el[0]} />
            ))}
          </SingleContainer>
        </StyledContainer>
      </DivConatiner>
      <button onClick={slideUp}>{`>`}</button>
    </>
  );
};

export default AutoSlide;

const DivConatiner = styled.div`
  width: 60rem;
  height: 20rem;
  border-radius: 1rem;
  background-color: green;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StyledContainer = styled.div<{ display: number }>`
  width: 300rem;
  transition: 0.5s;
  transform: ${(props) =>
    props.display ? `translate(${-(props.display * 60)}rem)` : null};
`;

const SingleContainer = styled.div`
  img {
    width: 60rem;
    height: 20rem;
    object-fit: cover;
  }
`;
