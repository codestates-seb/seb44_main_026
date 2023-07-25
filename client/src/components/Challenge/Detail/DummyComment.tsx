export interface Comment {
  memberId: string;
  content: string;
  point: number;
  createdAt: string;
}

export const dummyComment: Comment[] = [
  {
    memberId: '참여자1',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-06 15:19:14',
  },
  {
    memberId: '참여자2',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-06 09:23:14',
  },
  {
    memberId: '참여자3',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자4',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자5',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-05 09:23:14',
  },
  {
    memberId: '참여자6',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-07-01 09:23:14',
  },
  {
    memberId: '참여자7',
    content: '챌린지 참여합니다!',
    point: 2000,
    createdAt: '2023-04-01 09:23:14',
  },
];
