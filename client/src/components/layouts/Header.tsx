import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
// import { SearchBar } from '../../feature/SearchBar';
import { useAtom, useSetAtom } from 'jotai';
import { AfterLogin } from './AfterLogin';
import { BeforeLogin } from './BeforeLogin';
import { isShopAtom } from 'jotai/atom';

const StyledHeaderContainer = styled.nav`
  display: flex;
  background-color: var(--white);
`;
const StyledLogo = styled.img`
  margin: 0.625rem;
`;

const StyledChoicePage = styled.div`
  margin: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--gray-100);
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

const StyledSpan = styled.span`
  color: var(--gray-100);

  &:hover {
    cursor: pointer;
    font-weight: bold;
    color: var(--green-200);
  }

  &.focused {
    font-weight: bold;
    color: var(--green-200);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Header = () => {
  // const setIsShop = useSetAtom(isShopAtom);
  const [isShop, setIsShop] = useAtom(isShopAtom);

  const accessToken = localStorage.getItem('accessToken');
  return (
    <div>
      <StyledHeaderContainer>
        <StyledLink to={'/'}>
          <StyledLogo src={logo}></StyledLogo>
        </StyledLink>

        <StyledChoicePage>
          <StyledGreen to={'/'}>
            <StyledSpan
              className={isShop ? 'focused' : null}
              onClick={() => setIsShop(true)}
            >
              그린 마켓
            </StyledSpan>
          </StyledGreen>
          ㅣ{/* 그린 라우팅 주소 입력*/}
          <StyledNare to={'/challenge'}>
            <StyledSpan
              className={isShop ? null : 'focused'}
              onClick={() => setIsShop(false)}
            >
              나래 커뮤니티
            </StyledSpan>
          </StyledNare>
          {/* 나래 라우팅 주소 입력*/}
        </StyledChoicePage>
        <StyledNavContainer>
          {/* <SearchBar></SearchBar> */}
          {accessToken ? <AfterLogin /> : <BeforeLogin />}
        </StyledNavContainer>
        {/* 로그인, 회원가입 버튼 자리*/}
      </StyledHeaderContainer>
    </div>
  );
};
