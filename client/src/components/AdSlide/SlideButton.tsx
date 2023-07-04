import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as EmptyFaCircle } from '@fortawesome/free-regular-svg-icons';
import { styled } from 'styled-components';

interface AutoProps {
  slideIndex: number;
  setslideIndex: any;
  slideArr: string[][];
  stopSlide: () => void;
  restartSlide: () => void;
}

const SlideButton: React.FC<AutoProps> = ({
  slideIndex,
  setslideIndex,
  slideArr,
  stopSlide,
  restartSlide,
}) => {
  const PAGE_LEN = slideArr.length;
  const paginationArr = new Array(PAGE_LEN);
  paginationArr.fill(1);
  const paginationHandler = (index: number) => {
    setslideIndex(index);
    stopSlide();
    restartSlide();
  };
  return (
    <ButtonWrapper>
      {paginationArr.map((item, index) =>
        index === slideIndex ? (
          <FontAwesomeIcon
            icon={faCircle}
            className="idx-button"
            key={index + 'icon'}
          />
        ) : (
          <FontAwesomeIcon
            icon={EmptyFaCircle}
            className="idx-button"
            key={index + 'icon'}
            onClick={() => paginationHandler(index)}
          />
        ),
      )}
    </ButtonWrapper>
  );
};

export default SlideButton;

const ButtonWrapper = styled.div`
  display: flex;
  color: #9dc08b;
  align-items: center;
  justify-content: center;
  margin-top: 0.7rem;
  .idx-button {
    margin-left: 1rem;
    font-size: 0.8rem;
  }
`;
