import ChallengeList from 'components/Challenge/ChallengeList';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSetAtom } from 'jotai';
import { isShopAtom } from 'jotai/atom';
import API from '../api/index';

const ChallengePage = () => {
  const setIsShop = useSetAtom(isShopAtom);
  const login = localStorage.getItem('accessToken');
  const [point, setPoint] = useState<number>(0);

  const getPoint = async () => {
    try {
      const res = await API.GET({
        url: `https://ok.greennare.store/user/info`,
        headers: {
          Authorization: login,
        },
      });
      console.log(res);
      setPoint(res?.data.data.point);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate('/challenge/write');
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const WarningPoint = () => {
    alert('point가 500점 이상이어야 등록이 가능합니다( 등록시 500 차감 )');
  };

  useEffect(() => {
    setIsShop(false);
    getPoint();
  }, []);

  return (
    <>
      <Nav />
      <StyledWrapper>
        <HeadLine>
          <h1>☘️ 챌린지</h1>
          {login && Number(point) >= 500 ? (
            <WriteButton onClick={gotoWrite}>글 작성하기</WriteButton>
          ) : null}
          {login && Number(point) < 500 ? (
            <WriteButton className="warning-point" onClick={WarningPoint}>
              포인트 부족
            </WriteButton>
          ) : null}
        </HeadLine>
        <ChallengeList />
        <div className="scroll-container">
          <button id="top" onClick={scrollToTop} type="button">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </StyledWrapper>
    </>
  );
};

export default ChallengePage;

const StyledWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
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
const HeadLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
  h1 {
    width: 90%;
  }
  .warning-point {
    background-color: var(--gray-100);
    &:hover {
      background-color: var(--gray-200);
    }
  }
`;

const WriteButton = styled.div`
  display: flex;
  width: 10%;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  justify-content: center;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--green-100);
  &:hover {
    background-color: var(--green-200);
  }
  @media (max-width: 900px) {
    width: 20%;
  }
`;
