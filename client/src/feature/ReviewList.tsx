import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

interface ReviewType {
  id: number;
  name: string;
  body: string;
}

export const ReviewList = () => {
  const [reviewList, setReviewList] = useState<ReviewType[]>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1/comments`)
      .then((res) => {
        console.log(res.data);
        const list = res.data.map((el: ReviewType) => {
          return {
            id: el.id,
            name: el.name,
            body: el.body,
          };
          setReviewList(list);
        });
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul>
      {dummyComment.map((review: Comment) => (
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
            <DeleteButton>삭제</DeleteButton>
          </Content>
        </Review>
      ))}
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

const DeleteButton = styled.button`
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
