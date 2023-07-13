import React, { useState } from 'react';
import styled from 'styled-components';

interface MyPageItemProps {
  username: string;
  isEdit: boolean;
  setUserName: (username: string) => void;
  setIsEdit: (isEdit: boolean) => void;
}

const EditProfile: React.FC<MyPageItemProps> = ({
  username,
  isEdit,
  setUserName,
  setIsEdit,
}) => {
  const [newName, setnewName] = useState('');
  const textHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setnewName(e.currentTarget.value);
  };
  const onClickHandler = () => {
    setUserName(newName);
    setIsEdit(false);
  };
  const isEditHandler = () => {
    setIsEdit(false);
    window.scroll(0, 0);
  };

  return (
    <EditContainer>
      <h2>🖊️ Edit Profile</h2>
      <InputTitleContainer>
        <input
          onChange={textHandler}
          className="input-content"
          placeholder={username}
        ></input>
      </InputTitleContainer>
      <ButtonContainer>
        <div onClick={onClickHandler} className="edit-button">
          변경
        </div>
        <div onClick={isEditHandler} className="cancel-button">
          취소
        </div>
      </ButtonContainer>
    </EditContainer>
  );
};

export default EditProfile;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  margin-top: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 3rem;
  h2 {
    margin-bottom: 2rem;
  }
`;

const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  input {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 1rem;
    height: 2rem;
    padding: 1rem;
    font-size: 16px;
    border-radius: 0.5rem;
    border: none;
    border: 1px solid var(--gray-100);
  }
  input::placeholder {
    color: var(--gray);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .edit-button {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: center;
    width: 10%;
    padding: 1rem;
    color: white;
    font-size: 16px;
    border-radius: 1rem;
    background-color: var(--green-100);
    &:hover {
      background-color: var(--green-200);
    }
  }
  .cancel-button {
    display: flex;
    margin-left: 1rem;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: center;
    width: 10%;
    padding: 1rem;
    color: white;
    font-size: 16px;
    border-radius: 1rem;
    background-color: var(--gray-100);
    &:hover {
      background-color: var(--gray-200);
    }
  }
`;
