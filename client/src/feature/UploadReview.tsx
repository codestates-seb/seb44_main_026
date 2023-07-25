import { styled } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useEffect, useState } from 'react';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../api/index';
import { ReviewModal } from './ReviewModal';

interface UploadReviewProps {
  id: number;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  context?: string;
  imageLinks?: string[];
}
interface imageFilesType {
  file: File[];
  url: string[];
}

export const UploadReview = ({
  id,
  isEdit,
  setIsEdit,
  context,
  imageLinks,
}: UploadReviewProps) => {
  //리뷰 작성
  const [review, setReview] = useState(context || '');
  const [imageFiles, setImageFiles] = useState<imageFilesType>({
    file: [],
    url: imageLinks || [],
  });
  const [deleteUrl, setDeleteUrl] = useState([]);
  const [preview, setPreview] = useState(imageLinks || []);
  const [errorMessage, setErrorMessage] = useState('');
  //모달
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(true);
  const [modalContent, setModalContent] = useState('');
  // 인증 토큰
  const accessToken = localStorage.getItem('accessToken');

  // 리뷰 등록
  const postReview = async (formData: FormData) => {
    // formData값 확인
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await API.POST({
        url: `${process.env.REACT_APP_SERVER_URL}green/review/${id}`,
        data: { context: review },
        // data: formData,
        headers: {
          Authorization: accessToken,
          // 'Content-Type': 'multipart/form-data',

          'Content-Type': 'application/json',
        },
      });

      setReview('');
      setImageFiles({ file: [], url: [] });
      setPreview([]);

      if (res.status === 409) {
        setModalContent('이미 등록된 리뷰가 존재합니다.');
        setIsAlert(true);
        setIsOpen(true);
        return;
      } else if (res.status === 500) {
        setModalContent('리뷰 등록에 실패하였습니다.');
        setIsAlert(true);
        setIsOpen(true);
        return;
      }

      setModalContent('리뷰가 등록되었습니다.');
      setIsAlert(true);
      setIsOpen(true);

      console.log('review post');
      console.log(res.data);
    } catch (err) {
      console.log('review post err');
      console.log(err);

      setModalContent('리뷰 등록에 실패하였습니다.');
      setIsAlert(true);
      setIsOpen(true);
    }
  };

  //리뷰 수정
  const patchReview = async (formData: FormData) => {
    // formData값 확인
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await API.PATCH({
        url: `${process.env.REACT_APP_SERVER_URL}green/review/${id}`,
        data: { context: review },
        // data: formData,
        headers: {
          Authorization: accessToken,
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 500) {
        setModalContent('리뷰 수정에 실패하였습니다.');
        setIsAlert(true);
        setIsOpen(true);
        return;
      }

      setModalContent('리뷰가 수정되었습니다.');
      setIsAlert(true);
      setIsOpen(true);

      console.log('review patch');
      console.log(res.data);
    } catch (err) {
      console.log('review patch err');
      console.log(err);

      setModalContent('리뷰 수정에 실패하였습니다.');
      setIsAlert(true);
      setIsOpen(true);
    }
  };

  // 리뷰 작성
  const reviewHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(e.currentTarget.value);
  };
  // 이미지 파일 업로드, 프리뷰
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const files = Array.from(e.target.files);
    // const addFiles = [...imageFiles, ...files];
    // setImageFiles(addFiles);

    // const previewArray = addFiles.map((data) =>
    //   window.URL.createObjectURL(data),
    // );
    // setPreview(previewArray);
    const files = Array.from(e.target.files);
    const addFiles = [...imageFiles.file, ...files];
    setImageFiles({
      ...imageFiles,
      file: addFiles,
    });

    const previewArray = files.map((data) => window.URL.createObjectURL(data));
    const addPreviews = [...preview, ...previewArray];
    setPreview(addPreviews);

    e.target.value = '';
  };
  // 이미지 파일 삭제
  const deleteFileHandler = (index: number) => {
    const fileLen = imageFiles.file.length;
    const urlLen = imageFiles.url.length;
    const sliceIndex = index - urlLen;
    if (sliceIndex >= 0) {
      setImageFiles({
        ...imageFiles,
        file: [
          ...imageFiles.file.slice(0, sliceIndex),
          ...imageFiles.file.slice(sliceIndex + 1, fileLen),
        ],
      });
    } else {
      setImageFiles({
        ...imageFiles,
        url: [
          ...imageFiles.url.slice(0, index),
          ...imageFiles.url.slice(index + 1, urlLen),
        ],
      });
      setDeleteUrl([...deleteUrl, imageFiles.url[index]]);
    }
    // setImageFiles([
    //   ...imageFiles.slice(0, index),
    //   ...imageFiles.slice(index + 1, preview.length),
    // ]);
    setPreview([
      ...preview.slice(0, index),
      ...preview.slice(index + 1, preview.length),
    ]);
  };

  // 작성한 리뷰 등록
  const submitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review || !review.replace(/\n/g, '')) {
      return setErrorMessage('내용을 작성해 주세요!');
    } else {
      setErrorMessage('');
    }

    const formData = new FormData();
    formData.append('context', review);
    // imageFiles.url.forEach((url) => formData.append('image', url));
    deleteUrl.forEach((url) => formData.append('image', url));
    imageFiles.file.forEach((file) => formData.append('image', file));

    if (isEdit) {
      return patchReview(formData);
    } else {
      return postReview(formData);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // 새로고침
    location.reload();
  };

  useEffect(() => {
    if (review) {
      setErrorMessage('');
    }
  }, [review, isEdit]);

  return (
    <>
      {isOpen ? (
        <ReviewModal
          isAlert={isAlert}
          content={modalContent}
          onClose={handleClose}
        />
      ) : null}
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
