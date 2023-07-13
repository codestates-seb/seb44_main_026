import { GreenButton } from 'feature/GreenButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const StyledLoginMain = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledImg = styled.img``;
const Styledexplain = styled.span`
  color: black;
  margin-top: 0.8rem;
  font-weight: bold;
  font-size: 1.3rem;
`;
const StyledeEmail = styled.span`
  color: #4a4543;
  margin-top: 0.8rem;
`;
const StyledPw = styled(StyledeEmail)``;
const StyledInput = styled.input`
  color: #4a4543;
  border-color: hsl(106, 16%, 27%);
  border-radius: 0.5rem;
  border: 1px solid rgba(218, 218, 218, 1);
  width: 18rem;
  height: 2.6rem;
  margin-top: 0.5rem;
`;
const StyledInputPw = styled(StyledInput)``;

const StyledexplainSignUp = styled.span`
  color: #808080;
  margin-bottom: 0.8rem;
`;
const StyledSignUpLink = styled(Link)`
  text-decoration: none;
  span {
    color: hsl(100, 30%, 65%);
  }
`;

const handleLoginChange = () => {
  alert('로그인버튼 눌림');
};
export const SignUp = () => {
  return (
    <>
      <StyledLoginContainer>
        <StyledImg src={logo}></StyledImg>
        <Styledexplain>회원가입</Styledexplain>
        <StyledLoginMain>
          <StyledeEmail>닉네임</StyledeEmail>
          <StyledInput placeholder=" Enter your name" type="text"></StyledInput>
          <StyledeEmail>Email</StyledeEmail>
          <StyledInput
            placeholder=" Enter your email"
            type="text"
          ></StyledInput>
          <StyledPw>Password</StyledPw>
          <StyledInputPw type="password"></StyledInputPw>
        </StyledLoginMain>
        <GreenButton onClick={handleLoginChange}>Login</GreenButton>
        <StyledexplainSignUp>
          Don’t have an account?
          <StyledSignUpLink to={'/'}>
            <span>Sign Up</span>
          </StyledSignUpLink>
        </StyledexplainSignUp>
      </StyledLoginContainer>
    </>
  );
};
