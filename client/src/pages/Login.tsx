import { GreenButton } from 'feature/GreenButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
const StyledTitle = styled.h1`
  font-size: 2.7rem;
  font-weight: 550;
  color: #4a4543;
`;
const Styledexplain = styled.span`
  color: #808080;
  margin-top: 0.8rem;
`;
const StyledeEmail = styled.span`
  color: #4a4543;
  margin-top: 0.8rem;
`;
const StyledPw = styled(StyledeEmail)``;
const StyledInput = styled.input`
  color: #4a4543;
  border-color: rgba(218, 218, 218, 1);
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
export const Login = () => {
  return (
    <>
      <StyledLoginContainer>
        <StyledTitle>Welcome back</StyledTitle>
        <Styledexplain>Welcome back! Please enter your details.</Styledexplain>
        <StyledLoginMain>
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
