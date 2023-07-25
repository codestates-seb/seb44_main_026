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
  const [mapDataArray, setMapDataArray] = useState<MapData[]>([]); // 지도 데이터 배열
  const [map, setMap] = useState(null); // 지도 상태

  interface MapData {
    placeName: string;
    lat: number;
    longi: number;
  }

  const getMapData = async () => {
    try {
      const response = await API.GET({
        url: 'https://ok.greennare.store/nare/map',
      });
      console.log(response?.data);
      if (response?.data?.length > 0) {
        // 배열 안의 모든 객체에 접근하여 값을 추출
        setMapDataArray(response.data);
      } else {
        console.log('데이터가 비어있습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMapData();
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표 설정
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 데이터가 있을 경우, 모든 마커 추가
    if (mapDataArray.length > 0) {
      mapDataArray.forEach((mapData) => {
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
      });

      // 데이터가 바뀔 때마다 마커들 중심으로 지도 업데이트
      const centerPositions = mapDataArray.map((mapData) => ({
        lat: mapData.lat,
        lng: mapData.longi,
      }));

      // 지도를 데이터 마커들 중심으로 업데이트
      const bounds = new window.kakao.maps.LatLngBounds();
      centerPositions.forEach((position) => {
        bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
      });
      map.setBounds(bounds);
    } else {
      console.log('데이터가 비어있습니다.');
    }

    setMap(map);
  }, [mapDataArray]);
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
