import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
const StyledFooterContainer = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: #40513b;
  padding: 1rem;
`;

const StyledTeaMember = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  list-style-type: none;
`;

const StyledItemList = styled.div``;

const StyledListItem = styled.li`
  text-align: left;
  color: var(--white);
`;
const StyledGitid = styled(Link)`
  text-align: left;
  color: var(--white);
  text-decoration: none;
  padding-left: 0.625rem;
`;

export const Footer = () => {
  return (
    <div>
      <StyledFooterContainer>
        <StyledTeaMember>
          <StyledItemList>
            <StyledListItem>
              김수성ㅣGitHub:
              <StyledGitid to={'https://github.com/KimSuSung0326'}>
                @KimSuSung0326
              </StyledGitid>
            </StyledListItem>
            <StyledListItem>
              백승효ㅣGitHub:
              <StyledGitid to={'https://github.com/hyo-4'}>@hyo-4</StyledGitid>
            </StyledListItem>
            <StyledListItem>
              김영윤ㅣGitHub:
              <StyledGitid to={'https://github.com/youngyun213'}>
                @youngyun213
              </StyledGitid>
            </StyledListItem>
            <StyledListItem>
              최서우ㅣGitHub:
              <StyledGitid to={'https://github.com/wooseoboy'}>
                @wooseoboy
              </StyledGitid>
            </StyledListItem>
            <StyledListItem>
              백도담ㅣGitHub:
              <StyledGitid to={'https://github.com/BAEKDODAM'}>
                @LinaKK
              </StyledGitid>
            </StyledListItem>
            <StyledListItem>
              김리나ㅣGitHub:
              <StyledGitid to={'https://github.com/LinaKK'}>
                @BAEKDODAM
              </StyledGitid>
            </StyledListItem>
          </StyledItemList>
        </StyledTeaMember>
      </StyledFooterContainer>
    </div>
  );
};
