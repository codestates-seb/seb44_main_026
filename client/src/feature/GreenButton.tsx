import styled from 'styled-components';
interface Props {
  children: string;
  onClick: () => void;
}
const StyledGreenButton = styled.button`
  background-color: hsl(100, 30%, 65%);
  border-radius: 0.5rem;
  border: 1px solid white;
  color: white;
  width: 18rem;
  height: 2.6rem;
  margin: 2rem 0 2rem 0;
`;
export const GreenButton = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledGreenButton onClick={onClick}>{children}</StyledGreenButton>
    </>
  );
};
