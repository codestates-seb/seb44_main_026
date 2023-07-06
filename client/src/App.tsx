import { createGlobalStyle } from 'styled-components';
import { Header } from 'components/layouts/Header';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/layouts/Footer';
import { Nav } from 'components/Nav';

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
    --red : hsl(0, 100%, 43%);
    --gray : hsl(0, 0%, 85%);

  } 
}
`;

const App = () => (
  <div>
    <GlobalStyle />
    <Header />
    <Nav />
    <Outlet />
    <Footer />
  </div>
);

export default App;
