import { GreenButton } from 'feature/GreenButton';
import NewChallenge from 'feature/NewChallenge';
import { SearchBar } from 'feature/SearchBar';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../api/index';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'feature/Modal';
import { modalAtom } from 'jotai/atom';
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
export const AddMap = () => {
  const [address, setAddress] = useState(''); // 지도 주소
  const [placeName, setPlaceName] = useState(''); // 내용
  const [map, setMap] = useState(null); // 지도 상태
  const [location, setLocation] = useState(0); // 위치 상태 변수
  const [lat, setLat] = useState(0); // 위도 상태 변수
  const [longi, setLongi] = useState(0); // 경도 상태 변수

  const accessToken = localStorage.getItem('accessToken');

  const PostMapData = async (lat: number, longi: number) => {
    try {
      const postData = {
        placeName: placeName, // 가게 이름
        lat: lat, // 위도
        longi: longi, // 경도
      };
      console.log('보낼 데이터:', postData);
      const response = await API.POST({
        url: 'https://ok.greennare.store/nare/map',
        data: postData,
        headers: {
          Authorization: accessToken, // 필요한 헤더를 추가합니다.
          'Content-Type': 'application/json', // 필요에 따라 content type을 설정합니다.
        },
      });
      console.log('POST 요청 성공', response.data);
    } catch (err) {
      console.log('POST 요청 오류', err);
    }
  };
  interface MapData {
    placeId: number;
  }
  interface ID {
    id: number;
  }
  const DeleteMapData = async () => {
    try {
      const response = await API.GET({
        url: 'https://ok.greennare.store/nare/map',
      });
      if (response?.data?.length > 0) {
        // 배열의 모든 객체에 접근하여 placeId 값을 추출
        const placeIds = response.data.map(
          (mapData: MapData) => mapData.placeId,
        );

        // placeIds에는 배열 안의 모든 객체들의 placeId 값.
        console.log('placeIds:', placeIds);

        // DeleteMapData 함수를 호출하여 placeIds 배열을 사용하여 순차적으로 삭제 요청 보내기
        placeIds.map(async (id: ID) => {
          try {
            const deleteResponse = await API.DELETE({
              url: `https://ok.greennare.store/nare/map/${id}`,
              headers: {
                Authorization: accessToken, // 필요한 헤더를 추가합니다.
                'Content-Type': 'application/json', // 필요에 따라 content type을 설정합니다.
              },
            });
            console.log(`DELETE 요청 성공 - ID: ${id}`, deleteResponse.data);
          } catch (error) {
            console.log(`DELETE 요청 실패 - ID: ${id}`, error);
          }
        });
      } else {
        console.log('데이터가 비어있습니다.');
      }
      console.log('GET 요청 성공', response);
    } catch (error) {
      console.log('GET 요청 실패', error);
    }
  };

  const handlechangeregister = () => {
    // 클릭 이벤트 함수 만들기

    const marker = new window.kakao.maps.Marker({
      position: location,
      map: map,
    });
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="width:150px;text-align:center;padding:6px 0;">${placeName}</div>`,
    });
    infowindow.open(map, marker);

    // 데이터 보내기
    PostMapData(lat, longi);
  };

  const handledeleteregister = () => {
    DeleteMapData();
  };

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    window.kakao.maps.event.addListener(
      map,
      'click',
      function (mouseEvent: any) {
        MapClick(mouseEvent);
      },
    );
    const MapClick = (e: any) => {
      // 클릭 시 위도 경도
      const latLng = e.latLng;
      const lat = latLng.getLat();
      const longi = latLng.getLng();

      console.log('위치:', latLng);
      console.log('위도:', lat);
      console.log('경도:', longi);

      //위도, 경도, 위치정보 저장
      setLocation(latLng);
      setLat(lat);
      setLongi(longi);
    };
    setMap(map);
  }, []);

  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 나만의 그린 상점 등록하기</StyledTitle>
        <StyledAddButton>
          <StyledLink to={'/map'}>그린나래지도</StyledLink>
        </StyledAddButton>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>
          <div id="map" style={{ width: '65%', height: '60%' }}></div>
        </StyledMapItem>
        <StyledMapItem>
          <StyledPadding>
            <StyledSubTitle>나만의 상점 등록하기</StyledSubTitle>
            <h3>1. 등록할 상점의 위치를 지도에서 찾아 클릭 해주세요!</h3>
            <h3>2. 상점의 이름을 입력 하고 등록 버튼을 눌러 주세요!</h3>
            <StyledPaddingBottom />
            <NewChallenge setContents={setPlaceName} contents={placeName} />
          </StyledPadding>
          <div>
            <GreenButton onClick={handlechangeregister}>등록</GreenButton>
            <GreenButton onClick={handledeleteregister}>삭제</GreenButton>
          </div>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
