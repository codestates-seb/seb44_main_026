import { styled } from 'styled-components';

interface ModalProps {
  isAlert: boolean;
  content: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export const ReviewModal = ({
  isAlert,
  content,
  onConfirm,
  onClose,
}: ModalProps) => {
  return (
    <ModalBackground>
      <ModalWrapper>
        <Content>{content}</Content>
        {isAlert ? (
          <ButtonWrapper>
            <button className="confirm" onClick={onClose}>
              확인
            </button>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <button className="confirm" onClick={onConfirm}>
              확인
            </button>

            <button className="cancel" onClick={onClose}>
              취소
            </button>
          </ButtonWrapper>
        )}
      </ModalWrapper>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const ModalWrapper = styled.div`
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--green-100);
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    cursor: pointer;
    margin: 0 0.25rem;
    padding: 0.5rem;
    width: 5rem;
    border: none;
    border-radius: 0.5rem;
  }

  .confirm {
    background-color: var(--green-100);
    border: 0.1rem solid var(--green-100);
    color: var(--white);
  }

  .cancel {
    background-color: var(--white);
    border: 0.1rem solid var(--green-100);
  }
`;
