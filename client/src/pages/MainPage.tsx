import AutoSlide from 'components/AdSlide/AutoSlide';
import MainSlide from 'components/MainSlide/MainSlide';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'components/Nav';

const MainPage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Nav />
      <StyledContainer>
        <AutoSlide />
        <MainSlide />
        <div className="scroll-container">
          <button id="top" onClick={scrollToTop} type="button">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </StyledContainer>
    </>
  );
};

export default MainPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .scroll-container {
    position: fixed;
    right: 3%;
    bottom: 6%;
    z-index: 1;
  }
  #top {
    font-weight: bold;
    font-size: 20px;
    padding: 20px 22px;
    background-color: white;
    color: var(--green-200);
    border: 1px solid var(--green-200);
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }
  #top:hover {
    color: white;
    background-color: var(--green-200);
  }
`;
