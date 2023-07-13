import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import cart from '../../assets/img/cart.png';
import user from '../../assets/img/user.png';
// import { SearchBar } from '../../feature/SearchBar';

const StyledHeaderContainer = styled.nav`
  display: flex;
  background-color: var(--white);
`;
const StyledLogo = styled.img`
  margin: 0.625rem;
`;
const StyledLoginLogo = styled.img`
  margin: 0.625rem;
  width: 2.3rem;
  height: 2.3rem;
`;
const StyledChoicePage = styled.div`
  margin: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledGreen = styled(Link)`
  color: var(--black);
  text-decoration: none;
  font-size: 1.3rem;
`;
const StyledNare = styled(Link)`
  color: var(--black);
  text-decoration: none;
  font-size: 1.3rem;
`;
const StyledNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
const StyledButton = styled.button`
  background-color: var(--green-100);
  margin-right: 10px;
  width: 4rem;
  height: 2.51rem;
  border: 1px solid var(--white);
  color: var(--white);
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
const StyledSpan = styled.span`
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
const StyledPadding = styled.div`
  padding-right: 7rem;
`;
const BeforeLogin = () => {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation('/login');
  };
  const handlesignup = () => {
    navigation('/signup');
  };
  return (
    <>
      <StyledPadding />
      <StyledButton onClick={handleLogin}>로그인</StyledButton>
      <StyledButton onClick={handlesignup}>회원가입</StyledButton>
    </>
  );
};

const AfterLogin = () => {
  const navigation = useNavigate();

  const handlelogout = () => {
    navigation('/login');
  };
  return (
    <>
      <StyledPadding />
      <StyledLoginLogo src={cart}></StyledLoginLogo>
      <StyledLoginLogo src={user}></StyledLoginLogo>
      <StyledButton onClick={handlelogout}>로그아웃</StyledButton>
    </>
  );
};

export const Header = () => {
  const isLogin = false; // 로그인 상태 구현전 임시 변수입니다.

  return (
    <div>
      <StyledHeaderContainer>
        <StyledLogo src={logo}></StyledLogo>
        <StyledChoicePage>
          <StyledGreen to={'/'}>
            <StyledSpan>그린</StyledSpan>
          </StyledGreen>
          ㅣ{/* 그린 라우팅 주소 입력*/}
          <StyledNare to={'/'}>
            <StyledSpan>나래</StyledSpan>
          </StyledNare>
          {/* 나래 라우팅 주소 입력*/}
        </StyledChoicePage>
        <StyledNavContainer>
          {/* <SearchBar></SearchBar> */}
          {isLogin ? <AfterLogin /> : <BeforeLogin />}
        </StyledNavContainer>
        {/* 로그인, 회원가입 버튼 자리*/}
      </StyledHeaderContainer>
    </div>
  );
};
