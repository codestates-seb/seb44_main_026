import { GreenButton } from 'feature/GreenButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { AccessTokenAtom, RefreshTokenAtom, UserIdAtom } from 'jotai/atom';
import { useNavigate } from 'react-router-dom';
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
  const [loginAccToken, setLoginAccToken] = useAtom(AccessTokenAtom); // Jotai atom 사용
  const [loginRefToken, setLoginRefToken] = useAtom(RefreshTokenAtom); // Jotai atom 사용
  const [loginUserId, setLoginUserId] = useAtom(UserIdAtom); // Jotai atom 사용
  const navigate = useNavigate();

  interface UserData {
    userId: string;
  }

  interface LoginData {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }
  const handleLoginChange = () => {
    const postData = {
      email: email, // 이메일
      password: password, // 비밀번호
    };

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
    } else {
      // post 요청 보내기
      axios
        .post('url', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response: AxiosResponse) => {
          if (
            // 헤더에 토큰이 포함된다면 로그인 성공
            response.headers['authorization'] &&
            response.headers['refresh']
          ) {
            const authorizationHeader = response.headers['authorization'];
            const refreshToken = response.headers['refresh'];

            const accessToken = authorizationHeader.split(' ')[1]; // Bearer 분리

            const userData: UserData = response.data;
            const { userId } = userData;
            console.log(userId);

            // 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);

            // 상태 업데이트
            const loginData: LoginData = {
              accessToken,
              refreshToken,
              userId,
            };
            setLoginAccToken(loginData.accessToken);
            setLoginRefToken(loginData.refreshToken);
            setLoginUserId(loginData.userId);
            // 페이지 이동
            navigate('/');
          } else if (response.status === 401) {
            // 로그인 실패 했을 경우
            return response.data.then((data: { message: string }) => {
              if (data.message === 'Member not found : Unauthorized') {
                setErrors((err) => [...err, 'NotMember']);
              } else if (data.message === 'Unauthorized') {
                setErrors((err) => [...err, 'WrongPassword']);
                throw new Error('비밀번호가 잘못되었습니다.');
              } else {
                throw new Error('로그인에 실패했습니다.');
              }
            });
          }
        })
        .catch((error: AxiosError) => {
          console.error('로그인 요청 중 오류가 발생했습니다.', error);
        });
    }
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
