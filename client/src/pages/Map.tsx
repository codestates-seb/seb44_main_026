import styled from 'styled-components';
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
  border: 1px solid red;
  width: 50rem;
  height: 55rem;
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
  return (
    <>
      <StyledNav>
        <StyledTitle>🗺 지도보기</StyledTitle>
        <StyledAddButton>나도 등록하기</StyledAddButton>
      </StyledNav>
      <StyledMapContainer>
        <StyledMapItem>지도 들어갈 자리</StyledMapItem>
      </StyledMapContainer>
    </>
  );
};
