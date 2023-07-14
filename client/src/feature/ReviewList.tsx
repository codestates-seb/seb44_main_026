import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { Pagination } from './Pagination';

interface ReviewType {
  id: number;
  name: string;
  body: string;
}

export const ReviewList = () => {
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onEditReview = () => {
    console.log('edit');
    // return axios
    //   .patch(`/gree/review/${id}`, {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     // 성공
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //     // formData값 확인
    //     for (const [key, value] of formData.entries()) {
    //       console.log(key, value);
    //     }
    //   });
  };

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
      {dummyComment
        .slice((currentPage - 1) * 3, currentPage * 3)
        .map((review: Comment) => (
          <Review>
            <UserInfo>
              <div className="userName">{`🐥 ${review.memberId}`}</div>
              <div className="point">{`🏆 ${review.point}P`}</div>
              <div className="reviewDate">
                {`⏱️ ${moment(review.createdAt).fromNow()}`}
              </div>
            </UserInfo>
            <Content>
              <ReviewBody>{review.body}</ReviewBody>
              <Button onClick={() => onEditReview()}>수정</Button>
              <Button onClick={() => onDeleteReview()}>삭제</Button>
            </Content>
          </Review>
        ))}
      <Pagination
        total={Math.ceil(dummyComment.length / 3)}
        page={currentPage}
        setPage={setCurrentPage}
      />
    </ul>
  );
};

const Review = styled.li`
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

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
`;

const ReviewBody = styled.div`
  width: 100%;
`;

const Button = styled.button`
  cursor: pointer;

  border: none;
  border-radius: 0.5rem;

  background-color: var(--green-100);
  color: var(--white);

  width: 3rem;
  padding: 0.5rem;
  margin-left: 0.5rem;

  &:hover {
    background-color: var(--green-200);
  }
`;

////
////
///
//

interface Comment {
  memberId: string;
  body: string;
  point: number;
  createdAt: string;
}

const dummyComment: Comment[] = [
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
