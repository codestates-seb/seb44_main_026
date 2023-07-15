import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { Pagination } from './Pagination';
import { UploadReview } from './UploadReview';
import moment from 'moment';
import 'moment/locale/ko';

export interface ReviewType {
  memberId: string;
  body: string;
  point: number;
  createdAt: string;

  // content: string;
  // createdAt: string;
  // image: string;
  // name: string;
  // point: number;
}

interface ReviewListProps {
  id: number;
}

export const ReviewList = ({ id }: ReviewListProps) => {
  const [reviewList, setReviewList] = useState<ReviewType[]>(dummyComment);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const onDeleteReview = () => {
    console.log('delete');

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

  // useEffect(() => {
  //   axios
  //     .get(`/green/review/${id}`)
  //     .then((res) => {
  //       setReviewList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <ul>
      {reviewList
        .slice((currentPage - 1) * 3, currentPage * 3)
        .map((review: ReviewType) => {
          // <Review key={review.memberId} id={id} {...review} />

          const { memberId, body, point, createdAt } = review;
          return (
            <ReviewWrapper key={memberId}>
              <UserInfo>
                <div className="userName">{`🐥 ${memberId}`}</div>
                <div className="point">{`🏆 ${point}P`}</div>
                <div className="reviewDate">{`⏱️ ${moment(
                  createdAt,
                ).fromNow()}`}</div>
              </UserInfo>
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
                  <Button onClick={() => setIsEdit(true)}>수정</Button>
                  <Button onClick={() => onDeleteReview()}>삭제</Button>
                </ContentWrapper>
              )}
            </ReviewWrapper>
          );
        })}
      <Pagination
        total={Math.ceil(dummyComment.length / 3)}
        page={currentPage}
        setPage={setCurrentPage}
      />
    </ul>
  );
};

const ReviewWrapper = styled.li`
  list-style: none;

  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;
  border-radius: 0.5rem;

  padding: 1rem;
  margin: 1rem 0;
`;

const UserInfo = styled.div`
  display: flex;

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

////
////
///
//

const dummyComment: ReviewType[] = [
  {
    memberId: '참여자1',
    body: '챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-06 15:19:14',
  },
  {
    memberId: '참여자2',
    body: '챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-06 09:23:14',
  },
  {
    memberId: '참여자3',
    body: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자4',
    body: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자5',
    body: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자6',
    body: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-01 09:23:14',
  },
  {
    memberId: '참여자7',
    body: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-04-01 09:23:14',
  },
];
