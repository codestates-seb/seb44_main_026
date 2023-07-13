import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
const StyledFooterContainer = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: #40513b;
  padding: 1rem;
  margin-top: 3rem;
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
  padding-left: 0.624rem;
`;
interface TeamMember {
  name: string;
  githubId: string;
  githubUrl: string;
}

const Teammembers: TeamMember[] = [
  {
    name: '김수성',
    githubId: '@KimSuSung0326',
    githubUrl: 'https://github.com/KimSuSung0326',
  },
  {
    name: '백승효',
    githubId: '@hyo-4',
    githubUrl: 'https://github.com/hyo-4',
  },
  {
    name: '김영윤',
    githubId: ' @youngyun213',
    githubUrl: 'https://github.com/youngyun213',
  },
  {
    name: '최서우',
    githubId: ' @wooseoboy',
    githubUrl: 'https://github.com/wooseoboy',
  },
  {
    name: '백도담',
    githubId: ' @BAEKDODAM',
    githubUrl: 'https://github.com/BAEKDODAM',
  },
  {
    name: '김리나',
    githubId: ' @LinaKK',
    githubUrl: 'https://github.com/LinaKK',
  },
];
export const Footer = () => {
  return (
    <div>
      <StyledFooterContainer>
        <StyledTeaMember>
          <StyledItemList>
            {Teammembers.map((member) => {
              return (
                <StyledListItem key={member.name}>
                  {member.name}ㅣGitHub:
                  <StyledGitid to={member.githubUrl}>
                    {member.githubId}
                  </StyledGitid>
                </StyledListItem>
              );
            })}
          </StyledItemList>
        </StyledTeaMember>
      </StyledFooterContainer>
    </div>
  );
};
