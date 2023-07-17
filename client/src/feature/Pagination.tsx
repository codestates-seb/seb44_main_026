import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ total, page, setPage }: PaginationProps) => {
  return (
    <PaginationWrapper>
      {page > 1 ? (
        <Button
          className="angle"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      ) : null}

      {Array(total)
        .fill(null)
        .map((el, index) => (
          <Button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'focused' : null}
          >
            {index + 1}
          </Button>
        ))}
      {page < total ? (
        <Button className="angle" onClick={() => setPage(page + 1)}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      ) : null}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.nav`
  padding: 1rem;
  margin: 1rem;

  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  background-color: var(--white);
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  border-radius: 50%;
  margin: 0 0.25rem;

  &:hover {
    background-color: var(--green-100);
    color: var(--white);
  }

  &.focused {
    background-color: var(--green-200);
    color: var(--white);
  }

  &.angle {
    border: none;
  }

  &.angle:hover {
    background-color: transparent;

    color: var(--green-100);
  }
`;
