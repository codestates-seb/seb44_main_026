import { GreenButton } from 'feature/GreenButton';
import { SearchBar } from 'feature/SearchBar';
import styled from 'styled-components';
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
  border: 1px solid red;
  width: 50rem;
  height: 55rem;
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

const handlechangeregister = () => {
  alert('등록버튼 눌림');
};
export const AddMap = () => {
  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 나만의 그린 상점 등록하기</StyledTitle>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>지도 들어갈 자리</StyledMapItem>
        <StyledMapItem>
          <StyledSubTitle>나만의 상점 등록하기</StyledSubTitle>
          <SearchBar></SearchBar>
          <div>에디터 들어갈 자리</div>
          <GreenButton onClick={handlechangeregister}>등록</GreenButton>
        </StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
