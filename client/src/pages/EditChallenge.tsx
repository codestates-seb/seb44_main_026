import NewChallenge from 'feature/NewChallenge';
import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { InputTitle } from 'components/Challenge/Detail/Comment';
import UploadFile from 'components/UploadFile/NewFile';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/index';
import { UploadChallenge } from 'components/Challenge/UploadChallenge';

const EditChallenge: React.FC = () => {
  const id = useParams().id; //챌린지 아이디
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [fileurl, setFileurl] = useState<string>(''); //기본파일세팅
  const [newfile, setnewFile] = useState<File | null>(null); //새로업로드할 파일
  const loginAccToken = localStorage.getItem('accessToken');

  const newData = {
    title: title,
    content: contents,
  };

  const goToChallenge = () => {
    nav('/challenge');
  };

  const EditChallenge = async () => {
    try {
      const formData = new FormData();
      formData.append(
        'requestBody',
        new Blob([JSON.stringify(newData)], {
          type: 'application/json',
        }),
      );
      if (fileurl && newfile) {
        formData.append('image', newfile);
      } else {
        formData.append(
          'image',
          new Blob([null], {
            type: 'multipart/form-data',
          }),
        );
      }
      const res = await API.POST({
        url: `https://ok.greennare.store/nare/update/${id}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: loginAccToken,
        },
      });
      console.log('수정');
    } catch (err) {
      console.log(err);
    }
    alert('수정되었습니다');
    nav(`/challenge/${id}`);
    location.reload();
  };

  const getDataurl = async () => {
    try {
      const res = await API.GET({
        url: `https://ok.greennare.store/nare/${id}`,
      });
      setFileurl(`https://ok.greennare.store` + res?.data.data.image);
      console.log(fileurl);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataurl();
    console.log(id);
  }, []);

  const getMyChallenge = async () => {
    try {
      const res = await API.GET({
        url: `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/nare/${id}`,
      });
      console.log(res);
      setTitle(res?.data.data.title);
      setContents(res?.data.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getMyChallenge();
  }, []);

  return (
    <>
      <InputContainer>
        <HeadLine>
          <h1>🦄 챌린지 등록하기</h1>
        </HeadLine>
        <InputTitle setTitle={setTitle} value={title} />
        <NewChallenge setContents={setContents} contents={contents} />
        <UploadFile
          fileurl={fileurl}
          setFileurl={setFileurl}
          newfile={newfile}
          setnewFile={setnewFile}
        />
      </InputContainer>
      <ButtonContainer>
        <SubmitContainer onClick={EditChallenge}>수정</SubmitContainer>
        <CancelContainer onClick={goToChallenge}>취소</CancelContainer>
      </ButtonContainer>
    </>
  );
};

export default EditChallenge;

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
