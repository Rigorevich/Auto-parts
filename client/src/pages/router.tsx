import { createBrowserRouter } from 'react-router-dom';

import { PAGES } from '../constants/pages';
import { PrivateRoute } from '../hoc/privateRoute';

import SignUp from './Sign-up/SignUp';
import SignIn from './Sign-in/SignIn';
import Feedback from './Feedback/Feedback';
import AdminPanel from './AdminPanel/AdminPanel';
import Profile from './Profile/Profile';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import ProfileAccount from './ProfileContacts/ProfileAccount';
import Home from './Home/Home';
import Layout from './Layout/Layout';

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
        path: PAGES.FEEDBACK,
        element: <Feedback />,
      },
      {
        path: PAGES.PROFILE,
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Profile />,
            children: [
              {
                path: '',
                index: true,
                element: <div>Profile</div>,
              },
              {
                path: PAGES.ADMIN_PANEL,
                element: <AdminPanel />,
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
                path: PAGES.ORDERS,
                element: <div>Orders</div>,
              },
              {
                path: PAGES.PROFILE_EDIT,
                element: <ProfileEdit />,
              },
              {
                path: PAGES.PROFILE_CONTACTS,
                element: <ProfileAccount />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
