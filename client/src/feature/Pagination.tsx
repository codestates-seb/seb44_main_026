import { styled } from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ total, page, setPage }: PaginationProps) => {
  return (
    <PaginationWrapper>
      {page > 1 ? (
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          pre
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
        <Button onClick={() => setPage(page + 1)}>next</Button>
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
  border: 0.1rem solid var(--gray);
  background-color: var(--white);
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--green-100);
    color: var(--white);
  }

  &.focused {
    background-color: var(--green-200);
    color: var(--white);
  }
`;
