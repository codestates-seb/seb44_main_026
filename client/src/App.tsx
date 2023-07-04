import ChallengePage from 'pages/ChallengePage';
import MainPage from 'pages/MainPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/challenge" element={<ChallengePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
