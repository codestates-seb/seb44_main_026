import { createGlobalStyle } from 'styled-components';
import { Header } from 'components/layouts/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/layouts/Footer';
import { Nav } from 'components/Nav';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  &:root{
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --green-100 : hsl(100, 30%, 65%); 
    --green-200 : hsl(126, 23%, 49%);
    --green-300 : hsl(106, 16%, 27%);

    --green-400 : #4A4543;
    --red : hsl(0, 100%, 43%);
    --gray : hsl(0, 0%, 85%);
    --gray-200 : #808080;
    --gray-300 : rgba(218, 218, 218, 1);

    --red : hsl(0, 100%, 43%);
    --gray : hsl(0, 0%, 85%);
    --gray-100 : hsl(0, 0%, 70%);
    --gray-200 : hsl(0, 0%, 50%);


  } 
}
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const App = () => (
  <AppWrapper>
    <GlobalStyle />
    <Header />
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
    <Footer />
  </AppWrapper>
);

export default App;
