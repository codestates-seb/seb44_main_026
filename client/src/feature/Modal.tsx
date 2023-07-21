import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faXbox } from '@fortawesome/free-brands-svg-icons';
const StyledModalConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(100, 30%, 65%);
  flex-direction: column;

  width: 30rem;
  height: 35rem;
  position: fixed;
  color: white;
  font-size: 2rem;
  border-radius: 2rem;
`;

const StyledMargin = styled.div`
  margin-top: 10rem;
`;
interface Props {
  children: string;
  onClick: () => void;
}
const StyledButton = styled.button<{ transparent?: boolean }>`
  width: 5rem;
  height: 5rem;
  background-color: transparent;
  border: none;
`;

export const Modal = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledModalConatiner>
        {children}
        <StyledMargin />

        <StyledButton onClick={onClick}>
          <FontAwesomeIcon icon={faX} size="2xl" style={{ color: '#ff0000' }} />
        </StyledButton>
      </StyledModalConatiner>
    </>
  );
};
