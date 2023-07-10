import { styled } from 'styled-components';
import search from '../assets/img/search.png';
const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSearchBar = styled.input`
  width: 30rem;
  height: 2.6rem;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: 0.313rem center;
  padding-left: 2.5rem;
  box-sizing: border-box;
  border: 0.063rem solid var(--gray);
  border-radius: 0.625rem;
  color: var(--gray);
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
