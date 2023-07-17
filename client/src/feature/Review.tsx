import { styled } from 'styled-components';
import { useState } from 'react';
import { UploadReview } from './UploadReview';
import moment from 'moment';
import 'moment/locale/ko';

interface ReviewProps {
  id: number;
  memberId: string;
  body: string;
  point: number;
  createdAt: string;
}

export const Review = ({
  id,
  memberId,
  body,
  point,
  createdAt,
}: ReviewProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const username = '참여자1';

  const onDeleteReview = (memberId: string) => {
    console.log('delete');
    console.log(memberId);

    // return axios
    //   .delete(`/gree/review/${id}`, {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     // 성공
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <ReviewWrapper>
      <div className="userInfoWrapper">
        <UserInfo>
          <div className="userName">{`🐥 ${memberId}`}</div>
          <div className="point">{`🏆 ${point}P`}</div>
          <div className="reviewDate">{`⏱️ ${moment(
            createdAt,
          ).fromNow()}`}</div>
        </UserInfo>
        {memberId === username && !isEdit ? (
          <div>
            <Button onClick={() => setIsEdit(true)}>수정</Button>
            <Button onClick={() => onDeleteReview(memberId)}>삭제</Button>
          </div>
        ) : null}
      </div>
      {isEdit ? (
        <ContentWrapper>
          <UploadReview
            id={id}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            memberId={memberId}
            content={body}
          />
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <div className="content">{body}</div>
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
  align-items: center;
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
