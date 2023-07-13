import styled from 'styled-components';
import { useEffect } from 'react';
const StyledMapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const StyledMapItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80rem;
  height: 60rem;

  div {
    border-radius: 1rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;

  height: 5rem;
`;

const StyledTitle = styled.h2`
  margin-right: auto;
`;

const StyledAddButton = styled.button`
  background-color: var(--green-100);
  color: var(--white);
  border-radius: 0.4rem;
  border: 1px solid rgba(217, 218, 218, 1);
  width: 7rem;
  height: 3rem;
`;

export const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []);
  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 지도보기</StyledTitle>
        <StyledAddButton>나도 등록하기</StyledAddButton>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>
          <div id="map" style={{ width: '80rem', height: '60rem' }}></div>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
