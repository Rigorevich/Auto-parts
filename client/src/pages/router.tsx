import { createBrowserRouter } from 'react-router-dom';

import { PAGES } from '../constants/pages';

import SignUp from './Sign-up/SignUp';
import SignIn from './Sign-in/SignIn';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import Layout from './Layout/Layout';
import { PrivateRoute } from '../hoc/privateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: PAGES.ROOT,
        index: true,
        element: <Home />,
      },
      {
        path: PAGES.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PAGES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: PAGES.PROFILE,
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: PAGES.ADMIN_PANEL,
        element: <div>Admin panel</div>,
      },
      {
        path: PAGES.CART,
        element: <div>Cart</div>,
      },
      {
        path: PAGES.FAVORITES,
        element: <div>Favorites</div>,
      },
      {
        path: PAGES.GARAGE,
        element: <div>Favorites</div>,
      },
    ],
  },
]);

export default router;
