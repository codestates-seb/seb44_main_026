import { createGlobalStyle } from 'styled-components';
import { Nav } from 'components/Nav';
import { ItemList } from 'pages/ItemList';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  &:root{
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --green-100: hsl(100,30,65,100%); 
    --green-200: hsl(126,23,49,100%);
    --green-300: hsl(106,16,27,100%);
    --red: hsl(0, 100%, 43%);
    --gray: hsl(0, 0%, 85%);
  } 
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <ItemList />
    </>
  );
}

export default App;
