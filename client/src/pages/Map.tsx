import styled from 'styled-components';
import { useEffect, useState } from 'react';
import API from '../api/index';
declare global {
  interface Window {
    kakao: any;
  }
}
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
  width: 80%;
  height: 100%;

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
  const [content, setContent] = useState(''); // 가게 이름
  const [latitude, setLatitude] = useState(0); // 위도 상태 변수
  const [longitude, setLongitude] = useState(0); // 경도 상태 변수
  const [map, setMap] = useState(null); // 지도 상태
  const getMapData = async () => {
    try {
      const res = await API.GET(' 지도 url');
      console.log(res);
      setContent(res.data.placeName);
      setLatitude(res.data.lat);
      setLongitude(res.data.longi);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getMapData();
  }, []);
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    //const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);  api에서 받아온 좌표 데이터

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    const iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다
    //const iwPosition = new window.kakao.maps.LatLng(latitude, longitude);api에서 받아온 좌표 데이터
    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      position: iwPosition,
      content: '우리집',
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker);
  }, []);
  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 지도보기</StyledTitle>
        <StyledAddButton>나도 등록하기</StyledAddButton>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>
          <div id="map" style={{ width: '80%', height: '100%' }}></div>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
