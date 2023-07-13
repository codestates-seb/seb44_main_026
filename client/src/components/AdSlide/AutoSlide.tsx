import { useEffect, useRef, useState } from 'react';
import { slideArr } from './AdInfo';
import styled, { keyframes, css } from 'styled-components';
import { useInterval } from 'hook/UseInterval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import SlideButton from './SlideButton';

const AutoSlide: React.FC = () => {
  const [slideIndex, setslideIndex] = useState(0); //slider index
  const [currentInterval, setCurrentInterval] = useState(3000);
  const LastIdx = slideArr.length;
  const beforeSlide = slideArr[LastIdx - 1];
  const afterSlide = slideArr[0];
  const copiedArr = [...slideArr];
  const COPIED_NUM = copiedArr.length;
  const outRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  useInterval(
    () => setslideIndex((slideIndex) => slideIndex + 1),
    currentInterval,
  ); //custom hook

  if (slideIndex === COPIED_NUM) {
    setslideIndex(0);
  }

  const slideUp = () => {
    if (slideIndex < COPIED_NUM) {
      setslideIndex(slideIndex + 1);
    } else {
      setslideIndex(0);
    }
    stopSlide();
  };
  const slideDown = () => {
    if (slideIndex > 0) {
      setslideIndex(slideIndex - 1);
    } else {
      setslideIndex(COPIED_NUM - 1);
    }
    stopSlide();
  };

  const stopSlide = () => {
    setCurrentInterval(5000);
  };

  const restartSlide = () => {
    setCurrentInterval(3000);
  };

  useEffect(() => {
    outRef.current?.addEventListener('mouseover', stopSlide);
    outRef.current?.addEventListener('mouseleave', restartSlide);

    return () => {
      outRef.current?.removeEventListener('mouseover', stopSlide);
      outRef.current?.removeEventListener('mouseleave', restartSlide);
    };
  }, [currentInterval]); //마우스 올리면 interval 초기화

  return (
    <StyledAutoContainer>
      <HeadLine>
        <h2>🌎 알아서 챙겨주는 나만의 환경 트레이너 🌎</h2>
      </HeadLine>
      <div className="ad-slider" ref={outRef}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="ad-icon-left"
          onClick={slideDown}
        />
        <DivConatiner>
          <StyledContainer display={slideIndex}>
            <SingleContainer ref={slideRef}>
              {copiedArr.map((item, index) => (
                <img src={item[0]} alt="banner" key={index} />
              ))}
            </SingleContainer>
          </StyledContainer>
        </DivConatiner>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="ad-icon-right"
          onClick={slideUp}
        />
      </div>
      <SlideButton
        slideIndex={slideIndex}
        setslideIndex={setslideIndex}
        slideArr={slideArr}
        stopSlide={stopSlide}
        restartSlide={restartSlide}
      />
    </StyledAutoContainer>
  );
};

export default AutoSlide;

const StyledAutoContainer = styled.div`
  margin: 1rem 0rem;
  .ad-slider {
    display: flex;
    position: relative;
    align-items: center;
    .ad-icon-left {
      position: absolute;
      z-index: 99;
      margin-left: 0.5rem;
      font-size: 2rem;
      color: white;
    }
    .ad-icon-right {
      position: absolute;
      margin-left: 68.3rem;
      z-index: 99;
      font-size: 2rem;
      color: white;
    }
  }
`;

const HeadLine = styled.div`
  margin-bottom: 1.5rem;
  margin-top: 2rem;
`;

const DivConatiner = styled.div`
  width: 70rem;
  height: 20rem;
  border-radius: 1rem;
  background-color: green;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StyledContainer = styled.div<{ display: number }>`
  width: 700rem;
  transition: 1s;
  transform: ${(props) =>
    props.display ? `translate(${-(props.display * 70)}rem)` : null};
`;

const SingleContainer = styled.div`
  img {
    width: 70rem;
    height: 20rem;
    object-fit: cover;
  }
`;
