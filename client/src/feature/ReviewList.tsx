import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { Pagination } from './Pagination';
import { Review } from './Review';

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
        .map((review: ReviewType) => (
          <Review key={review.memberId} id={id} {...review} />
        ))}
      <Pagination
        total={Math.ceil(dummyComment.length / 3)}
        page={currentPage}
        setPage={setCurrentPage}
      />
    </ul>
  );
};

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
