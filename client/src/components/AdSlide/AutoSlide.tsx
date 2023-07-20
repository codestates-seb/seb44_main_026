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
import { useNavigate } from 'react-router-dom';

const AutoSlide: React.FC = () => {
  const [slideIndex, setslideIndex] = useState(0); //slider index
  const [currentInterval, setCurrentInterval] = useState(3000);
  const LastIdx = slideArr.length;
  const copiedArr = [...slideArr];
  const COPIED_NUM = copiedArr.length;
  const navigate = useNavigate();
  const outRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | undefined>();
  const [endX, setEndX] = useState<number | undefined>();

  const onDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + (scrollRef.current?.scrollLeft ?? 0));
    console.log(e.pageX);
    console.log(scrollRef.current.scrollLeft);
  };
  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (isDrag) {
      console.log(e.clientX);
      scrollRef.current.scrollLeft = e.clientX;
    }
  };

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
    <StyledAutoContainer ref={outRef}>
      <HeadLine>
        <h2>🌎 알아서 챙겨주는 나만의 환경 트레이너 🌎</h2>
      </HeadLine>
      <div className="ad-slider">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="ad-icon-left"
          onClick={slideDown}
        />
        <DivConatiner>
          <StyledContainer
            display={slideIndex}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            ref={scrollRef}
          >
            <SingleContainer>
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
  .ad-slider {
    display: flex;
    position: relative;
    align-items: center;
    .ad-icon-left {
      position: absolute;
      z-index: 999;
      font-size: 2rem;
      padding-left: 5%;
      color: white;
      cursor: pointer;
    }
    .ad-icon-right {
      position: absolute;
      margin-left: 95%;
      z-index: 999;
      font-size: 2rem;
      color: white;
      cursor: pointer;
    }
  }
`;

const HeadLine = styled.div`
  margin-bottom: 1.5rem;
  margin-top: 3rem;
  margin-left: 2rem;
`;

const DivConatiner = styled.div`
  width: 100%;
  height: 25rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
  margin: 0 auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  @media (min-width: 1700px) {
    height: 30rem;
  }
`;

const StyledContainer = styled.div<{ display: number }>`
  width: 600%;
  transition: 1s;
  transform: ${(props) =>
    props.display ? `translate(${-(props.display * 16.68)}%)` : null};
`;

const SingleContainer = styled.div`
  img {
    width: 100vw;
    height: 25rem;
    object-fit: cover;
    @media (min-width: 1700px) {
      height: 30rem;
    }
  }
`;
