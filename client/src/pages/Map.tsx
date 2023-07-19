import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const Map = () => {
  const [content, setContent] = useState(''); // 가게 이름
  const [latitude, setLatitude] = useState(0); // 위도 상태 변수
  const [longitude, setLongitude] = useState(0); // 경도 상태 변수
  const [map, setMap] = useState(null); // 지도 상태
  const getMapData = async () => {
    try {
      const res = await API.GET(
        'http://greennareALB-281283380.ap-northeast-2.elb.amazonaws.com/nare/map',
      );
      console.log(res?.data);
      if (res?.data?.length > 0) {
        // 배열의 첫 번째 객체에 접근하여 값을 추출
        const mapData = res.data[0];
        setContent(mapData.placeName);
        setLatitude(mapData.lat);
        setLongitude(mapData.longi);

        // 지도 생성 및 마커 추가
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(mapData.lat, mapData.longi),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(
          mapData.lat,
          mapData.longi,
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        const iwPosition = new window.kakao.maps.LatLng(
          mapData.lat,
          mapData.longi,
        );

        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: mapData.placeName,
        });

        infowindow.open(map, marker);
        setMap(map);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMapData();
  }, []);
  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 지도보기</StyledTitle>
        <StyledAddButton>
          <StyledLink to={'/addmap'}>나도 등록하기</StyledLink>
        </StyledAddButton>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>
          <div id="map" style={{ width: '80%', height: '100%' }}></div>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
