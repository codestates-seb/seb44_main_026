import { styled } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface UploadReviewProps {
  id: number;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  memberId?: string;
  content?: string;
}

export const UploadReview = ({
  id,
  isEdit,
  setIsEdit,
  memberId,
  content,
}: UploadReviewProps) => {
  const [review, setReview] = useState(content || '');
  const [imageFiles, setImageFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const reviewHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(e.currentTarget.value);
  };
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const addFiles = [...imageFiles, ...files];
    setImageFiles(addFiles);

    const previewArray = addFiles.map((data) =>
      window.URL.createObjectURL(data),
    );
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
  };

  const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review) {
      return setErrorMessage('내용을 작성해 주세요!');
    } else {
      setErrorMessage('');
    }

    const formData = new FormData();
    formData.append('content', review); // JSON.stringify ??
    imageFiles.forEach((file) => formData.append('image', file));

    if (isEdit) {
      return axios
        .patch(`/green/review/${id}`, formData, {
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
          console.log('edit');

          // formData값 확인
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }

          console.log(memberId);
        });
    } else {
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

          console.log('upload');
          // formData값 확인
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }
          console.log(memberId);
        });
    }
  };

  useEffect(() => {
    if (review) {
      setErrorMessage('');
    }
  }, [review]);

  return (
    <>
      <Form onSubmit={submitReviewHandler}>
        <InputWrapper>
          <Input
            maxRows={4}
            value={review}
            placeholder="리뷰를 작성해보세요!"
            onChange={reviewHandler}
          />
          {isEdit ? (
            <>
              <button type="submit" className="editButton">
                확인
              </button>
              <button
                type="button"
                className="editButton"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>
            </>
          ) : (
            <button type="submit" className="submitButton">
              등록
            </button>
          )}
        </InputWrapper>
        {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
        <PreviewWrapper>
          {preview.map((image, index) => (
            <Preview key={index}>
              <img className="previewImg" src={image} />
              <div className="delete" onClick={() => deleteFileHandler(index)}>
                삭제
              </div>
            </Preview>
          ))}
        </PreviewWrapper>

        <FileUploadButton>
          사진 업로드
          <FontAwesomeIcon icon={faCloudArrowUp} />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={uploadFileHandler}
            className="inputfile"
          />
        </FileUploadButton>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;

  .inputfile {
    display: none;
  }

  .editButton {
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: var(--gray);

    width: 3rem;
    padding: 0.5rem;
    margin-left: 0.3rem;

    &:hover {
      color: var(--green-200);
    }
  }

  .submitButton {
    cursor: pointer;
    border: none;
    background-color: var(--green-100);
    color: var(--white);
    border-radius: 0.5rem;
    width: 5rem;
    margin-left: 1rem;
    padding: 1rem;

    &:hover {
      background-color: var(--green-200);
    }
  }

  .errorMessage {
    color: var(--red);
    font-size: 0.75rem;
    /* margin-top: 0.5rem; */
    padding: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled(TextareaAutosize)`
  width: 100%;

  padding: 1rem;
  border-radius: 0.5rem;
  /* border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px; */
  border: 0.1rem solid var(--gray);
  resize: none;

  &::placeholder {
    color: var(--gray);
  }

  &:focus {
    border-color: var(--green-200);
    outline: none;
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
  justify-content: space-evenly;

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
