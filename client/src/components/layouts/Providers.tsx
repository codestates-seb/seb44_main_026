import { Home } from 'pages/Home';
import App from '../../App';
import { NotFound } from 'pages/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Product } from 'pages/Product';
import ChallengePage from 'pages/ChallengePage';
import MainPage from 'pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product', element: <Product /> },
      { path: 'challenge', element: <ChallengePage /> },
      { path: 'main', element: <MainPage /> },
    ],
  },
]);

export const Providers = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
