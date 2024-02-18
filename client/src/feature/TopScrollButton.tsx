import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const TopScrollButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollContainer>
      <button className="top" onClick={scrollToTop} type="button">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  position: fixed;
  right: 3%;
  bottom: 6%;
  z-index: 1;

  .top {
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
  .top:hover {
    color: white;
    background-color: var(--green-200);
  }
`;
