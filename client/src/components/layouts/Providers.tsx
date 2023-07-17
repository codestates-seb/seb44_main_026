import { Home } from 'pages/Home';
import App from '../../App';
import { NotFound } from 'pages/NotFound';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

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
import EditChallenge from 'pages/EditChallenge';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: 'map', element: <Map /> },
      { path: 'addmap', element: <AddMap /> },
      { index: true, element: <MainPage /> },
      { path: 'product/:category', element: <Product /> },
      { path: 'challenge', element: <ChallengePage /> },
      { path: 'challenge/:id', element: <ChallengeDetail /> },
      { path: 'challenge/edit/:id', element: <EditChallenge /> },
      { path: 'challenge/write', element: <AddChallenge /> },
      // { path: 'main', element: <MainPage /> },
      { path: 'mypage', element: <MyProfile /> },
      { path: 'product/detail/:id', element: <ItemDetail /> },
      { path: 'product/like', element: <LikeProducts /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
]);

export const Providers = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
