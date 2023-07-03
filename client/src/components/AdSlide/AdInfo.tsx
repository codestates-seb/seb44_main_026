export const slideArr = [
  [
    'https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_1280.jpg',
    '광고1',
  ],
  [
    'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    '광고1',
  ],
  [
    'https://cdn.pixabay.com/photo/2016/02/27/06/43/cherry-blossom-tree-1225186_1280.jpg',
    '광고1',
  ],
];

export interface DirectionBtnType {
  direction: string;
  onClick: () => void;
}

export interface PaginationBtnType {
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}
