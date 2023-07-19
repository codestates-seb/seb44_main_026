import NewChallenge from 'feature/NewChallenge';
import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { InputTitle } from 'components/Challenge/Detail/Comment';
import UploadFile from 'components/UploadFile/NewFile';
import { useNavigate } from 'react-router-dom';
import { UploadChallenge } from 'components/Challenge/UploadChallenge';
import API from '../api/index';
import axios, { AxiosError } from 'axios';

const AddChallenge = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [fileurl, setFileurl] = useState<string>(''); //기본파일세팅
  const [newfile, setnewFile] = useState<File | null>(); //새로업로드할 파일
  const newData = {
    title: title,
    content: contents,
  };

  const goToChallenge = () => {
    nav('/challenge');
  };

  const postChallenge = async () => {
    try {
      const formData = new FormData();
      //formData.append('requestBody', JSON.stringify(newData));
      formData.append(
        'requestBody',
        new Blob([JSON.stringify(newData)], {
          type: 'application/json',
        }),
      );
      formData.append('image', null);
      const res = await API.POST({
        url: 'http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/nare/challenge',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }

    nav('/challenge');
    location.reload();
  };

  /*
  //file upload 
  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault(); // Prevent redirection

      if (file) {
        const formData = new FormData();
        formData.append('files', file);

        const res = await API.POST({
          url: `url`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('file upload');
        setSuccess(true);
        if (res.status !== 200) throw res;
      } else {
        console.log('file is null');
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  //수정할때 데이터 받아서 세팅
  const getDataurl = async () => {
    try {
      const res = await API.GET(`주소`);
      setFileurl(`data:image/jpeg;base64,` + res.data[0]);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataurl();
    console.log(id);
  }, []);
*/

  return (
    <>
      <InputContainer>
        <HeadLine>
          <h1>🦄 챌린지 등록하기</h1>
        </HeadLine>
        <InputTitle setTitle={setTitle} value={title} />
        <NewChallenge setContents={setContents} contents={contents} />
        {/*<UploadFile
          fileurl={fileurl}
          setFileurl={setFileurl}
          newfile={newfile}
          setnewFile={setnewFile}
  />*/}
        <UploadChallenge />
      </InputContainer>
      <ButtonContainer>
        <SubmitContainer onClick={postChallenge}>등록</SubmitContainer>
        <CancelContainer onClick={goToChallenge}>취소</CancelContainer>
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
  padding: 1rem;
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
  padding: 1rem;
  color: white;
  font-size: 13px;
  border-radius: 3px;
  margin-bottom: 1rem;
`;
