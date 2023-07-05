import { createGlobalStyle } from 'styled-components';
import { Header } from 'components/layouts/Header';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/layouts/Footer';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  &:root{
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --green-100: rgba(157, 192, 139, 1)
    --green-200: hsl(126,23,49,100%);
    --green-300: hsl(106,16,27,100%);
    --red: hsl(0, 100%, 43%);
    --gray: hsl(0, 0%, 85%);

  } 
}
`;
const MainWrapper = styled.div`
  max-width: 1264px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex: 1;
`;

const App = () => (
  <div>
    <GlobalStyle />
    <Header />
    <MainWrapper>
      <Outlet />
    </MainWrapper>
    <Footer />
  </div>
);

export default App;
