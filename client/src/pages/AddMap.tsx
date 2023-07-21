import { GreenButton } from 'feature/GreenButton';
import NewChallenge from 'feature/NewChallenge';
import { SearchBar } from 'feature/SearchBar';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../api/index';
import { Link, useNavigate } from 'react-router-dom';
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
  const [lat, setLat] = useState(0); // 위도 상태 변수
  const [longi, setLongi] = useState(0); // 경도 상태 변수
  const [PlaceId, setPlaceId] = useState(0);
  const accessToken = localStorage.getItem('accessToken');
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

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
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${placeName}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
        console.log('위도:', coords.getLat());
        console.log('경도:', coords.getLng());
        setLat(coords.getLat()); // 위도
        setLongi(coords.getLng()); // 경도
        // post 요청 보내기
        PostMapData(coords.getLat(), coords.getLng()); // coords.getLat()와 coords.getLng() 값을 전달
      }
    });
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
            <StyledSubTitle>나만의 상점 등록하기</StyledSubTitle>{' '}
            <SearchBar onChange={handleChangeValue} value={address}></SearchBar>
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
