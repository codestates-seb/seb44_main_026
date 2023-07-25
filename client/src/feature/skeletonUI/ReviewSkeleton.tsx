import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

export const ReviewSkeleton = () => {
  return (
    <ReviewWrapper>
      <div className="userInfoWrapper">
        <UserInfo>
          <Skeleton className="userName"></Skeleton>
          <Skeleton className="point"></Skeleton>
          <Skeleton className="reviewDate"></Skeleton>
        </UserInfo>
      </div>

      <Skeleton className="content"></Skeleton>
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

  .content {
    margin-top: 0.5rem;
    width: 80%;
    height: 2rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1rem;
  }

  .userName {
    width: 5rem;
  }

  .point {
    width: 5rem;
  }

  .reviewDate {
    width: 7rem;
    margin-right: 1rem;
  }
`;
