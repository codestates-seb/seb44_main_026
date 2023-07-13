import { Home } from 'pages/Home';
import App from '../../App';
import { NotFound } from 'pages/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Map } from 'pages/Map';
import { AddMap } from 'pages/AddMap';

import { Product } from 'pages/Product';
import ChallengePage from 'pages/ChallengePage';
import MainPage from 'pages/MainPage';
import ChallengeDetail from 'pages/ChallengeDetail';
import AddChallenge from 'pages/AddChallenge';
import MyProfile from 'pages/MyProfile';
import { ItemDetail } from 'pages/ItemDetail';
import { LikeProducts } from 'pages/LikeProducts';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      { path: 'map', element: <Map /> },
      { path: 'addmap', element: <AddMap /> },

      { path: 'product', element: <Product /> },
      { path: 'challenge', element: <ChallengePage /> },
      { path: 'challenge/:id', element: <ChallengeDetail /> },
      { path: 'challenge/write', element: <AddChallenge /> },
      { path: 'main', element: <MainPage /> },
      { path: 'mypage', element: <MyProfile /> },
      { path: 'product/:id', element: <ItemDetail /> },
      { path: 'like', element: <LikeProducts /> },

    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
]);

export const Providers = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
