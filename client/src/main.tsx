import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { AuthProvider } from './context/AuthContext';
import router from './pages/router';

import './styles/global.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const queryClient = new QueryClient();

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <AuthProvider>
        <ModalsProvider>
          <SnackbarProvider />
          <RouterProvider router={router} />
        </ModalsProvider>
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>
);
