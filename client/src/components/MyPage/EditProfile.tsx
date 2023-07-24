import React, { useState } from 'react';
import styled from 'styled-components';
import API from '../../api/index';

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
  const [newpassword, setPassword] = useState('');
  const loginAccToken = localStorage.getItem('accessToken');
  const textHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setnewName(e.currentTarget.value);
  };

  const passwordtextHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    console.log(newpassword);
  };

  const patchProfile = async () => {
    if (newpassword && newName) {
      try {
        const res = await API.PATCH({
          url: `https://ok.greennare.store/user/info`,
          data: { name: newName, password: newpassword },
          headers: {
            Authorization: loginAccToken,
          },
        });
        console.log('patch');
        setUserName(newName);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('내용을 입력하세요!');
    }
  };

  const onClickHandler = () => {
    patchProfile();
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
      <InputTitleContainer>
        <input
          onChange={passwordtextHandler}
          className="input-content"
          placeholder={'비밀 번호를 입력하세요'}
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
