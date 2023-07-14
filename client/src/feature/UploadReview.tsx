import { styled } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react';
import axios from 'axios';

interface UploadReviewProps {
  id: string;
}

export const UploadReview = ({ id }: UploadReviewProps) => {
  const [review, setReview] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [preview, setPreview] = useState([]);

  const reviewHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(e.currentTarget.value);
  };

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const addFiles = [...imageFiles, ...files];
    setImageFiles(addFiles);

    const previewArray = addFiles.map((data) => URL.createObjectURL(data));
    setPreview(previewArray);

    e.target.value = '';
  };

  const deleteFileHandler = (index: number) => {
    setImageFiles([
      ...imageFiles.slice(0, index),
      ...imageFiles.slice(index + 1, preview.length),
    ]);
    setPreview([
      ...preview.slice(0, index),
      ...preview.slice(index + 1, preview.length),
    ]);
    //
  };

  const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', review); // JSON.stringify ??
    imageFiles.forEach((file) => formData.append('image', file));

    return axios
      .post(`/green/review/${id}`, formData, {
        headers: {
          // Authorization: accessToken,
          // 'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // 성공
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);

        // formData값 확인
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
      });
  };

  return (
    <>
      리뷰 2개
      <FormWrapper onSubmit={submitReviewHandler}>
        <InputWrapper>
          <Input
            maxRows={4}
            value={review}
            placeholder="리뷰를 작성해보세요!"
            onChange={reviewHandler}
          />
          <Button type="submit" className="submit">
            등록
          </Button>
        </InputWrapper>
        <PreviewWrapper>
          {preview.map((image, index) => (
            <Preview key={image}>
              <img className="previewImg" src={image} />
              <div className="delete" onClick={() => deleteFileHandler(index)}>
                삭제
              </div>
            </Preview>
          ))}
        </PreviewWrapper>
        <FileUploadButton htmlFor="file">사진 추가하기</FileUploadButton>
        <input
          type="file"
          id="file"
          accept="image/*"
          multiple
          onChange={uploadFileHandler}
        />
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  border: 0.1rem solid var(--gray);
  border-radius: 0.5rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;

  padding: 1rem;
  margin: 1rem 0;

  #file {
    display: none;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Input = styled(TextareaAutosize)`
  width: 100%;

  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;

  resize: none;

  &::placeholder {
    color: var(--gray);
  }
`;

const FileUploadButton = styled.label`
  border: 0.1rem solid var(--green-100);
  border-radius: 0.5rem;
  color: var(--green-100);

  width: 7rem;
  padding: 0.5rem;
  font-size: 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0;
`;

const Preview = styled.div`
  position: relative;
  margin: 0.25rem 0;
  margin-right: 0.25rem;
  background-color: var(--green-200);
  width: 8rem;
  height: 8rem;

  .previewImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }

  .delete {
    cursor: pointer;
    color: var(--white);
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  &:hover .delete {
    opacity: 1;
  }
  &:hover .previewImg {
    opacity: 0.3;
  }
`;

const Button = styled.button`
  cursor: pointer;

  color: var(--white);
  background-color: var(--green-100);
  border: none;
  border-radius: 0.5rem;
  font-size: 1.25rem;

  min-width: 7rem;
  height: 3rem;
  margin-left: 1rem;

  &:hover {
    background-color: var(--green-200);
  }
`;
