import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { filterAtom } from 'jotai/atom';

export const Category = () => {
  const [currentFilter, setCurrentFilter] = useAtom(filterAtom);

  const filterArr = ['전체', '욕실', '주방', '생활', '문구', '위생'];

  const selectFilterHandler = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <Wrapper>
      <CategoryWrapper>
        {filterArr.map((filter) => {
          return (
            <Filter
              key={filter}
              className={currentFilter === filter ? 'focused' : null}
              onClick={() => selectFilterHandler(filter)}
            >
              {filter}
            </Filter>
          );
        })}
      </CategoryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryWrapper = styled.ul`
  border: 0.1rem solid var(--gray);
  border-radius: 0.5rem;
  width: 60rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
  list-style: none;
  margin: 1rem;
`;

const Filter = styled.li`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 2rem;

  border-left: 0.1rem solid var(--gray);
  font-size: 0.875rem;

  &:hover {
    font-weight: bold;
    color: var(--white);
    background-color: var(--green-100);
  }

  &.focused {
    font-weight: bold;
    color: var(--white);
    background-color: var(--green-200);
  }

  &:first-child {
    border: none;
  }
`;
