import { createContext, ReactNode, useState, useEffect } from 'react';
import type { AxiosResponse } from 'axios';

import { AuthClient, ResourceClient, AuthResponse, AuthData } from '../api/axios';
import { api_config } from '../api/api_config';
import { showErrowMessage } from '../utils/showErrowMessage';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import inMemoryJWT from '../services/inMemoryJWT';

export const AuthContext = createContext({});

export interface AuthContextInterface {
  isAppLoaded: boolean;
  isUserLogged: boolean;
  data: any;
  handleFetchProtected: () => void;
  handleLogOut: () => void;
  handleSignUp: (data: AuthData) => void;
  handleSignIn: (data: AuthData) => void;
}

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState({});

  const handleFetchProtected = async () => {
    try {
      const { data } = await ResourceClient.get('/');

      setData(data);
    } catch (error) {
      showErrowMessage(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await AuthClient.post('/logout');

      setIsUserLogged(false);
      inMemoryJWT.deleteToken();

      setData({});
    } catch (error) {
      showErrowMessage(error);
    }
  };

  const handleSignUp = async (data: AuthData) => {
    try {
      const response = await AuthClient.post('/signup', data);

      const { accessToken, accessTokenExpiration } = response.data as AuthResponse;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      setIsUserLogged(true);
      showSuccessMessage('Вы успешно зарегистрировались!');
    } catch (error) {
      showErrowMessage(error);
    }
  };
  const handleSignIn = async (data: AuthData) => {
    try {
      const response = await AuthClient.post('/signin', data);

      const { accessToken, accessTokenExpiration } = response.data as AuthResponse;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      setIsUserLogged(true);
      showSuccessMessage('Вы успешно авторизовались!');
    } catch (error) {
      showErrowMessage(error);
    }
  };

  useEffect(() => {
    AuthClient.post('/refresh')
      .then((res: AxiosResponse<AuthResponse>) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        setIsAppLoaded(true);
      })
      .catch(() => {
        setIsUserLogged(false);
        setIsAppLoaded(true);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event: StorageEvent) => {
      if (event.key === api_config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener('storage', handlePersistedLogOut);

    return () => {
      window.removeEventListener('storage', handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, handleSignUp, handleFetchProtected, handleSignIn, handleLogOut, isAppLoaded, isUserLogged }}
    >
      {isAppLoaded ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};
