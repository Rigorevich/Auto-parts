import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

import { PAGES } from '../constants/pages';
import { AuthContext, AuthContextInterface } from '../context/AuthContext';

export const PrivateRoute = () => {
  const { isUserLogged, isAppLoaded } = useContext(AuthContext) as AuthContextInterface;

  if (!isAppLoaded) {
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: 'md' }}
      />
    );
  }

  return isUserLogged ? <Outlet /> : <Navigate to={PAGES.SIGN_IN} />;
};
