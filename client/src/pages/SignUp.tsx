import { GreenButton } from 'feature/GreenButton';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import { Modal } from 'feature/Modal';
import { modalAtom } from 'jotai/atom';
import API from '../api/index';
import { Link, useNavigate } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
interface StyledChangeModal {
  modalOpen: boolean;
}
const StyledLoginContainer = styled.div<StyledChangeModal>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ modalOpen }) =>
    modalOpen ? ' rgba(0, 0, 0, 0.61);' : 'initial'};
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
interface StyledInputProps {
  error: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  color: #4a4543;
  border-color: hsl(106, 16%, 27%);
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const SignUp = () => {
  const [nickname, setNickname] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [errors, setErrors] = useState([]); //에러
  const [modal, setModal] = useAtom(modalAtom);
  const navitator = useNavigate();
  const [isExploding, setIsExploding] = React.useState(false);
  const PostSignUp = async () => {
    try {
      const postData = {
        name: nickname, // 닉네임
        email: email, // 이메일
        password: password, // 비밀번호
      };

      const response = await API.POST({
        url: 'https://ok.greennare.store/user/join',
        headers: {
          'Content-Type': 'application/json',
        },
        data: postData,
      });

      // 비동기 요청이 성공했을 경우에만 처리
      if (response.status === 201) {
        const { memberId }: { memberId: number } = response.data;
        const postData: { memberId: number } = { memberId };
        localStorage.setItem('user', JSON.stringify(postData));
        setModal(true);
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
        }, 3000);
      } else if (response.status === 409) {
        // 회원가입 실패 했을 경우
        return response.data.then((data: { message: string }) => {
          if (data.message === 'USER_EXISTS') {
            setErrors((err) => [...err, 'USER_EXISTS']);
            throw new Error('이미 등록된 이메일입니다.');
          } else {
            throw new Error('회원가입에 실패했습니다.');
          }
        });
      }
    } catch (error) {
      console.error('회원가입 요청 중 오류가 발생했습니다.', error);
      // 오류 발생 시에 대한 처리
    }
  };

  const handleSignupChange = () => {
    setErrors([]);
    // 닉네임 조건문
    if (!nickname) {
      setErrors((err) => [...err, 'Nickname_empty']);
    } else if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
      setErrors((err) => [...err, 'Nickname_specialChars']);
    } else if (nickname.length < 3) {
      setErrors((err) => [...err, 'Nickname_short']);
    }

    // 이메일 조건문
    if (!email) {
      setErrors((err) => [...err, 'Email_empty']);
    } else if (!email.includes('@')) {
      setErrors((err) => [...err, 'Email_invalid']);
    }

    // 비밀번호 조건문
    if (!password) {
      setErrors((err) => [...err, 'Password_empty']);
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password)
    ) {
      setErrors((err) => [...err, 'Password_Displayname_specialChars']);
    } else if (password.length < 8) {
      setErrors((err) => [...err, 'Password_Short']);
    }
    // POST 요청 보내는 부분
    PostSignUp();
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setModal(false);
    navitator('/');
  };

  return (
    <>
      <StyledLoginContainer modalOpen={modal}>
        <StyledLink to={'/'}>
          <StyledImg src={logo} />
        </StyledLink>

        <Styledexplain>회원가입</Styledexplain>
        <StyledLoginMain>
          <StyledeEmail>닉네임</StyledeEmail>

          <StyledInput
            placeholder=" Enter your name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            }
            error={
              errors.includes('Nickname_empty') ||
              errors.includes('Nickname_specialChars') ||
              errors.includes('Nickname_short')
            }
          />
          {errors.includes('Nickname_empty') && (
            <ErrorMessage>Nickname cannot be empty.</ErrorMessage>
          )}
          {errors.includes('Nickname_specialChars') && (
            <ErrorMessage>
              Nickname should consist only of uppercase and
              <br /> lowercase letters and numbers.
            </ErrorMessage>
          )}
          {errors.includes('Nickname_short') && (
            <ErrorMessage>
              nickname should be at least 8 characters long.
            </ErrorMessage>
          )}
          <StyledeEmail>Email</StyledeEmail>

          <StyledInput
            placeholder=" Enter your email"
            type="text"
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
          {errors.includes('USER_EXISTS') && (
            <ErrorMessage>이미 등록된 이메일 입니다.</ErrorMessage>
          )}

          <StyledPw>Password</StyledPw>
          <StyledInputPw
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={
              errors.includes('Password_empty') ||
              errors.includes('Password_Displayname_specialChars') ||
              errors.includes('Password_Short')
            }
          />
          {errors.includes('Password_empty') && (
            <ErrorMessage>Password cannot be empty.</ErrorMessage>
          )}
          {errors.includes('Password_Displayname_specialChars') && (
            <ErrorMessage>
              Must contain at least 1 letter and 1 number.
            </ErrorMessage>
          )}
          {errors.includes('Password_short') && (
            <ErrorMessage>Must be 8 characters or more.</ErrorMessage>
          )}
        </StyledLoginMain>
        <GreenButton onClick={handleSignupChange}>SignUp</GreenButton>

        {modal && (
          <Modal onClick={handleCloseModal}>회원가입이 되었습니다!</Modal>
        )}

        {isExploding && (
          <ConfettiExplosion
            force={0.8}
            duration={3500}
            particleCount={250}
            width={1600}
            colors={['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF']}
            style={{ zIndex: 10, position: 'relative', top: 0, left: 0 }}
          />
        )}
      </StyledLoginContainer>
    </>
  );
};
