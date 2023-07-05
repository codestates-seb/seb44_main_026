import { styled } from 'styled-components';

const StyledSearch = styled.div`
  border: 1px solid var(--black);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSearchBar = styled.input`
  border: 1px solid var(--black);
`;
export const SearchBar = () => {
  return (
    <div>
      <StyledSearch>
        <StyledSearchBar placeholder="검색어를 입력하세요"></StyledSearchBar>
      </StyledSearch>
    </div>
  );
};
