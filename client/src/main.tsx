import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MantineProvider } from '@mantine/core';

import router from './pages/router';
import { AuthProvider } from './context/AuthContext';

import './styles/global.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider>
        <SnackbarProvider />
        <RouterProvider router={router} />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>
);
