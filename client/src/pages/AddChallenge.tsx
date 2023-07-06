import NewChallenge from 'feature/NewChallenge';
import React from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { InputTitle } from 'components/Challenge/Detail/Comment';

const AddChallenge = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  return (
    <>
      <InputContainer>
        <HeadLine>
          <h1>🦄 챌린지 등록하기</h1>
        </HeadLine>
        <InputTitle setTitle={setTitle} value={title} />
        <NewChallenge setContents={setContents} contents={contents} />
      </InputContainer>
      <ButtonContainer>
        <SubmitContainer>등록</SubmitContainer>
        <CancelContainer>취소</CancelContainer>
      </ButtonContainer>
    </>
  );
};

export default AddChallenge;

const InputContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const HeadLine = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 20%;
  margin: 0 auto;
`;

const SubmitContainer = styled.div`
  display: flex;
  width: 50%;
  background-color: var(--green-100);
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: white;
  margin-right: 1rem;
  font-size: 13px;
  border-radius: 3px;
  margin-bottom: 1rem;
`;

const CancelContainer = styled.div`
  display: flex;
  width: 50%;
  background-color: var(--gray-100);
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: white;
  font-size: 13px;
  border-radius: 3px;
  margin-bottom: 1rem;
`;
