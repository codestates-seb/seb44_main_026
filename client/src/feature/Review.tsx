import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { UploadReview } from './UploadReview';
import moment from 'moment';
import 'moment/locale/ko';
import API from '../api/index';
import { ReviewModal } from './ReviewModal';

interface ReviewProps {
  id: number;

  context: string;
  createdAt: number[];
  imageLinks?: string[];
  name: string;
  point: number;
  memberId: number;
}

export const Review = ({
  id,
  context,
  createdAt,
  imageLinks,
  name,
  point,
  memberId,
}: ReviewProps) => {
  const [isEdit, setIsEdit] = useState(false);
  //모달
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(true);
  const [modalContent, setModalContent] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  // 임시
  const user = parseInt(localStorage.getItem('memberId'));
  // const user = 31;

  const onDeleteReview = () => {
    setModalContent('정말 삭제하시겠습니까?');
    setIsAlert(false);
    setIsOpen(true);
  };

  const deleteReview = async () => {
    try {
      const res = await API.DELETE({
        url: `${process.env.REACT_APP_SERVER_URL}green/review/${id}`,
        headers: {
          Authorization: accessToken,
        },
      });
      console.log('delete review');
      console.log(res.data);

      setModalContent('리뷰가 삭제되었습니다.');
      setIsAlert(true);
      setIsOpen(true);
    } catch (err) {
      console.log('delete review err');
      console.log(err);

      setModalContent('리뷰 삭제에 실패하였습니다.');
      setIsAlert(true);
      setIsOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    deleteReview();
    location.reload();
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const newDate = new Date(
    createdAt[0],
    createdAt[1] - 1,
    createdAt[2],
    createdAt[3] + 9,
    createdAt[4],
    createdAt[5],
  );
  const newCreatedAt = moment(newDate.toISOString());

  return (
    <ReviewWrapper>
      {isOpen ? (
        <ReviewModal
          isAlert={isAlert}
          content={modalContent}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      ) : null}
      <div className="userInfoWrapper">
        <UserInfo>
          <div className="userName">{`🐥 ${name}`}</div>
          <div className="point">{`🏆 ${point}P`}</div>
          <div className="reviewDate">{`⏱️ ${newCreatedAt.fromNow()}`}</div>
        </UserInfo>
        {memberId === user && !isEdit ? (
          <div>
            <Button onClick={() => setIsEdit(true)}>수정</Button>
            <Button onClick={() => onDeleteReview()}>삭제</Button>
          </div>
        ) : null}
      </div>
      {isEdit ? (
        <ContentWrapper>
          <UploadReview
            id={id}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            context={context}
            imageLinks={imageLinks}
          />
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <div className="content">{context}</div>
          {imageLinks ? (
            <PreviewWrapper>
              {imageLinks.map((image, index) => (
                <Preview key={index}>
                  <img
                    className="previewImg"
                    src={image}
                    // src={
                    //   'https://i.namu.wiki/i/c1FfgJTOGJAGV6Pz4hfrAtzmfdCpnO0Sqjqhd2wB9DtgjKFoEcTen1HymS9oa2FpgNdKSUxj494vii746Eu_YLAueKFu_VpKCbegr6Sa4WYX-rr5598Ma8quoNWHv3620PkvgxolW58DYM5-e4bOGQ.webp'
                    // }
                  />
                </Preview>
              ))}
            </PreviewWrapper>
          ) : null}
        </ContentWrapper>
      )}
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.li`
  list-style: none;

  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;
  border-radius: 0.5rem;

  padding: 1rem;
  margin: 1rem 0;

  .userInfoWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1rem;
  }

  .userName {
    font-weight: bold;
  }

  .point {
    font-weight: bold;
    color: var(--green-200);
  }

  .reviewDate {
    color: var(--gray);
    margin-right: 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem 0;

  .content {
    width: 100%;
  }
`;

const Button = styled.button`
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
`;
