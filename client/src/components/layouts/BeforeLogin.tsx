import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const StyledButton = styled.button`
  background-color: var(--green-100);
  margin-right: 10px;
  width: 4rem;
  height: 2.5rem;
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

const StyledPadding = styled.div`
  padding-right: 7rem;
`;

export const BeforeLogin = () => {
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
