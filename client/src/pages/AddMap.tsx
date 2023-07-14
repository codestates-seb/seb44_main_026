import { GreenButton } from 'feature/GreenButton';
import NewChallenge from 'feature/NewChallenge';
import { SearchBar } from 'feature/SearchBar';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
declare global {
  interface Window {
    kakao: any;
  }
}
const StyledMapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
`;

const StyledMapItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;

  height: 5.1rem;
`;

const StyledTitle = styled.h2`
  margin-right: auto;
`;

const StyledSubTitle = styled.h3`
  margin-right: auto;
  margin-bottom: 2rem;
`;

const StyledPadding = styled.div``;

const StyledPaddingBottom = styled.div`
  margin-bottom: 2rem;
`;
export const AddMap = () => {
  const [address, setAddress] = useState(''); // 지도 주소
  const [contents, setContents] = useState(''); // 내용
  const [map, setMap] = useState(null); // 지도 상태
  const [latitude, setLatitude] = useState(0); // 위도 상태 변수
  const [longitude, setLongitude] = useState(0); // 경도 상태 변수
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlechangeregister = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${contents}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
        console.log('위도:', latitude);
        console.log('경도:', longitude);
        setLatitude(coords.La); // 위도
        setLongitude(coords.Ma); // 경도

        // POST 요청 보내기
        const postData = {
          placeName: contents, // 가게 이름
          lat: latitude, // 위도
          longi: longitude, // 경도
        };

        axios
          .post('url', postData, {
            // url에 서버 주도 들어가야 함!!!
            headers: {
              // Authorization: accessToken,
            },
          })
          .then((response) => {
            console.log('POST 요청 성공:', response.data);
            // 성공적으로 처리된 후에 원하는 작업 수행
          })
          .catch((error) => {
            console.error('POST 요청 오류:', error);
            // 오류 발생 시에 대한 처리
          });
      } else {
        console.error('주소 검색 오류:', status);
      }
    });
  };

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []);

  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 나만의 그린 상점 등록하기</StyledTitle>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>
          <div id="map" style={{ width: '65%', height: '60%' }}></div>
        </StyledMapItem>
        <StyledMapItem>
          <StyledPadding>
            <StyledSubTitle>나만의 상점 등록하기</StyledSubTitle>
            <SearchBar onChange={handleChangeValue} value={address}></SearchBar>
            <StyledPaddingBottom />
            <NewChallenge setContents={setContents} contents={contents} />
          </StyledPadding>
          <GreenButton onClick={handlechangeregister}>등록</GreenButton>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
