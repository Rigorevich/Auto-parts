import { createBrowserRouter } from 'react-router-dom';

import { Pages } from '../constants/pages';

import SignUp from './Sign-up/SignUp';
import SignIn from './Sign-in/SignIn';

const router = createBrowserRouter([
  {
    path: Pages.ROOT,
    element: <div>Home</div>,
  },
  {
    path: Pages.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: Pages.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: Pages.PROFILE,
    element: <div>My profile</div>,
  },
]);

export default router;
