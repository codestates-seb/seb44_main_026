import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { filterAtom } from 'jotai/atom';

export const Category = () => {
  const [currentFilter, setCurrentFilter] = useAtom(filterAtom);

  const Category = [
    {
      name: '전체',
      data: 'all',
    },
    {
      name: '욕실',
      data: 'bathroom',
    },
    {
      name: '주방',
      data: 'kitchen',
    },
    {
      name: '생활',
      data: 'living',
    },
    {
      name: '문구',
      data: 'stationery',
    },
    {
      name: '위생',
      data: 'hygiene',
    },
  ];

  return (
    <Wrapper>
      <CategoryWrapper>
        {Category.map((filter) => {
          return (
            <Filter
              key={filter.data}
              className={currentFilter === filter.data ? 'focused' : null}
              onClick={() => setCurrentFilter(filter.data)}
            >
              {filter.name}
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
  border: none;
  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;
  border-radius: 0.5rem;
  min-width: 56rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
  list-style: none;
`;

const Filter = styled.li`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
  height: 2rem;

  border: none;
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
