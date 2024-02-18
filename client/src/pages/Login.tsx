import { GreenButton } from 'feature/GreenButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import API from '../api/index';
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
interface StyledInputProps {
  error: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  color: #4a4543;
  border-color: rgba(218, 218, 218, 1);
  border-radius: 0.5rem;
  border: 1px solid rgba(218, 218, 218, 1);
  width: 18rem;
  height: 2.6rem;
  margin-top: 0.5rem;
  ${({ error }) =>
    error &&
    `
    border-color: red;
    box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.15);
  `}
`;
const StyledInputPw = styled.input<StyledInputProps>`
  color: #4a4543;
  border-color: rgba(218, 218, 218, 1);
  border-radius: 0.5rem;
  border: 1px solid rgba(218, 218, 218, 1);
  width: 18rem;
  height: 2.6rem;
  margin-top: 0.5rem;
  ${({ error }) =>
    error &&
    `
    border-color: red;
    box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.15);
  `}
`;

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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0;
`;

const StyledMenuLink = styled(Link)`
  text-decoration: none;
`;

const StyledImg = styled.img``;
export const Login = () => {
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [errors, setErrors] = useState([]); //에러
  const navigate = useNavigate();

  const PostLogin = async () => {
    interface UserData {
      memberId: string;
      name: string;
    }

    try {
      const postData = {
        username: email, // 이메일
        password: password, // 비밀번호
      };
      const response = await API.POST({
        url: 'https://ok.greennare.store/user/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: postData,
      });
      // // 비동기 요청이 성공했을 경우에만 처리
      if (
        // 헤더에 토큰이 포함된다면 로그인 성공
        response.headers['authorization'] &&
        response.headers['refresh']
      ) {
        const authorizationHeader = response.headers['authorization'];
        const refreshToken = response.headers['refresh'];

        const accessToken = authorizationHeader.split(' ')[1]; // Bearer 분리

        const userData: UserData = response.data;
        console.log(userData);
        const { memberId } = userData;
        const { name } = userData;

        // 토큰 저장

        localStorage.setItem('accessToken', accessToken); // 토큰 저장
        localStorage.setItem('refreshToken', refreshToken); // refresh 토큰 저장
        localStorage.setItem('memberId', memberId); // memberId 저장
        localStorage.setItem('name', name); // name 저장
        console.log(accessToken);
        console.log(memberId);

        console.log(accessToken);
        console.log(memberId);
        // 페이지 이동
        navigate('/');
      } else if (response.status === 401) {
        // 로그인 실패 했을 경우
        const data: { message: string } = await response.data;
        if (data.message === 'Member not found : Unauthorized') {
          setErrors((err) => [...err, 'NotMember']);
        } else if (data.message === 'Unauthorized') {
          setErrors((err) => [...err, 'WrongPassword']);
          throw new Error('비밀번호가 잘못되었습니다.');
        } else {
          throw new Error('로그인에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('로그인 요청 중 오류가 발생했습니다.', error);
    }
  };

  const handleLoginChange = () => {
    // 오류 메시지 초기화
    setErrors([]);

    // 이메일이 틀릴경우
    if (!email) {
      setErrors((err) => [...err, 'Email_empty']);
      // 이메일 형식이 아닐때
    } else if (!email.includes('@')) {
      setErrors((err) => [...err, 'Email_invalid']);
    }

    // 비밀번호가 틀릴경우
    if (!password) {
      setErrors((err) => [...err, 'PassWord_empty']);
    }
    // POST 요청 보내기
    PostLogin();
  };

  return (
    <>
      <StyledLoginContainer>
        <StyledMenuLink to={'/'}>
          <StyledImg src={logo} />
        </StyledMenuLink>
        <StyledTitle>Welcome back</StyledTitle>
        <Styledexplain>Welcome back! Please enter your details.</Styledexplain>
        <StyledLoginMain>
          <StyledeEmail>Email</StyledeEmail>
          <StyledInput
            placeholder=" Enter your email"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={
              errors.includes('Email_empty') || errors.includes('Email_invalid')
            }
          />
          {errors.includes('Email_empty') && (
            <ErrorMessage>Email cannot be empty.</ErrorMessage>
          )}
          {errors.includes('Email_invalid') && (
            <ErrorMessage>
              This email is not a valid email address.
            </ErrorMessage>
          )}
          {errors.includes('NotMember') && (
            <ErrorMessage>This is not a registered email.</ErrorMessage>
          )}
          <StyledPw>Password</StyledPw>
          <StyledInputPw
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={errors.includes('PassWord_empty')}
          />
          {errors.includes('Password_empty') && (
            <ErrorMessage>Password cannot be empty.</ErrorMessage>
          )}
          {errors.includes('WrongPassword') && (
            <ErrorMessage>Passwords do not match.</ErrorMessage>
          )}
        </StyledLoginMain>

        <GreenButton onClick={handleLoginChange}>Login</GreenButton>

        <StyledexplainSignUp>
          Don’t have an account?
          <StyledSignUpLink to={'/signup'}>
            <span>Sign Up</span>
          </StyledSignUpLink>
        </StyledexplainSignUp>
      </StyledLoginContainer>
    </>
  );
};
