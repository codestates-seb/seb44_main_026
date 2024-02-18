import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import API from '../../api/index';

interface FileProps {
  fileurl: string;
  setFileurl: (fileurl: string) => void;
  newfile: File | null;
  setnewFile: (file: File | null) => void;
}

const UploadFile: React.FC<FileProps> = ({
  fileurl,
  setFileurl,
  newfile,
  setnewFile,
}) => {
  const { id } = useParams<{ id: string }>();
  const [success, setSuccess] = useState<boolean>(false);

  const readURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setnewFile(selectedFile);
      const res = URL.createObjectURL(selectedFile);
      setFileurl(res);
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://i.ibb.co/vjJJRHK/2023-06-26-10-57-48.png';
    // Handle default profile image when profile image is not available, 기본이미지
  };

  const fileDelete = () => {
    setnewFile(null);
    setFileurl('');
  };

  return (
    <FileContainer>
      <div className="upload-title">Upload</div>
      <form>
        <img
          id="preview"
          src={fileurl}
          width={300}
          height={300}
          onError={handleImgError}
          alt="Preview"
        />
        <input
          className="upload-name"
          placeholder={
            newfile
              ? '파일이 업로드 준비 상태입니다.'
              : '새 파일이 준비되지 않았습니다.'
          }
        ></input>
        <div className="button-file">
          <label
            htmlFor="file"
            className="find-file"
            onClick={() => setSuccess(false)}
          >
            파일 찾기
          </label>
          <input type="file" id="file" onChange={readURL} />
          <button className="file-del" onClick={fileDelete}>
            파일 삭제
          </button>
        </div>
      </form>
    </FileContainer>
  );
};

export default UploadFile;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid var(--green-200);
  justify-content: center;
  border-radius: 3px;
  form {
    flex-direction: column;
    #preview {
      margin-bottom: 10px;
    }
    img {
      border: 1px solid var(--green-100);
    }
    .upload-name {
      display: flex;
      height: 30px;
      padding: 0 10px;
      vertical-align: middle;
      border: 1px solid var(--green-100);
      border-radius: 3px;
      width: 78%;
      color: #999999;
    }
    label {
      display: flex;
      height: 30px;
      justify-content: center;
      color: #fff;
      width: 100px;
      background-color: var(--green-100);
      border-radius: 3px;
      cursor: pointer;
      margin-bottom: 10px;
      margin-top: 10px;
      font-size: 12px;
    }
    input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
  .button-file {
    display: flex;
    flex-direction: row;
    .find-file {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.2rem;
      padding-bottom: 1.3rem;
    }
  }
  .upload-title {
    font-weight: 600;
    margin-bottom: 10px;
  }
  button {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    font-size: 12px;
    background-color: var(--white);
    color: var(--green-100);
    border-radius: 3px;
    border: 1px solid var(--green-100);
    margin-left: 10px;
    margin-top: 10px;
    height: 40px;
  }
  .file-del {
    padding: 1rem;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .success-message {
    font-size: 12px;
    color: var(--green-100);
    margin-left: 10px;
  }
`;
