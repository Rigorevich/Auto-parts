import { createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { LoadingOverlay } from '@mantine/core';
import type { AxiosResponse } from 'axios';

import { AuthClient, AuthResponse, AuthData, Account } from '../api/axios';
import { api_config } from '../api/api_config';
import { showErrowMessage } from '../utils/showErrowMessage';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils/localStorage';
import inMemoryJWT from '../services/inMemoryJWT';

export const AuthContext = createContext({});

export interface AuthContextInterface {
  isAppLoaded: boolean;
  isUserLogged: boolean;
  accountData: Account | null;
  cars: SavedCar[];
  isActiveCar?: SavedCar;
  favorites: string[];
  cart: Cart[];
  setCars: Dispatch<SetStateAction<SavedCar[]>>;
  setCart: Dispatch<SetStateAction<Cart[]>>;
  setFavorites: Dispatch<SetStateAction<string[]>>;
  setAccountData: Dispatch<SetStateAction<Account | null>>;
  handleLogOut: () => void;
  handleSignUp: (data: AuthData) => void;
  handleSignIn: (data: AuthData) => void;
}

export interface SavedCar {
  id: string;
  active: boolean;
}

export interface Cart {
  id: string;
  quantity: number;
  price: number;
  discount: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [accountData, setAccountData] = useState<Account | null>(null);

  const [cars, setCars] = useState<SavedCar[]>(getDataFromLocalStorage('modifications'));
  const [favorites, setFavorites] = useState<string[]>(getDataFromLocalStorage('favorites'));
  const [cart, setCart] = useState<Cart[]>(getDataFromLocalStorage('cart'));

  const isActiveCar = cars.find((car) => car.active);

  const handleLogOut = async () => {
    try {
      await AuthClient.post('/logout');

      setIsUserLogged(false);
      inMemoryJWT.deleteToken();
      setDataToLocalStorage('modifications', []);
      setDataToLocalStorage('favorites', []);
      setDataToLocalStorage('cart', []);
      setAccountData(null);
      showSuccessMessage('Вы успешно вышли из аккаунта!');
    } catch (error) {
      showErrowMessage(error);
    }
  };

  const handleSignUp = async (data: AuthData) => {
    try {
      const response = await AuthClient.post('/signup', data);

      const { accessToken, accessTokenExpiration, accountData } = response.data as AuthResponse;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      setIsUserLogged(true);
      setAccountData(accountData);
      showSuccessMessage('Вы успешно зарегистрировались!');
    } catch (error) {
      showErrowMessage(error);
    }
  };
  const handleSignIn = async (data: AuthData) => {
    try {
      const response = await AuthClient.post('/signin', data);

      const { accessToken, accessTokenExpiration, accountData } = response.data as AuthResponse;

      inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      setIsUserLogged(true);
      setAccountData(accountData);
      showSuccessMessage('Вы успешно авторизовались!');
    } catch (error) {
      showErrowMessage(error);
    }
  };

  useEffect(() => {
    AuthClient.post('/refresh')
      .then((res: AxiosResponse<AuthResponse>) => {
        const { accessToken, accessTokenExpiration, accountData } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true);
        setAccountData(accountData);
        setIsAppLoaded(true);
      })
      .catch(() => {
        setIsUserLogged(false);
        setAccountData(null);
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
      value={{
        accountData,
        setAccountData,
        isActiveCar,
        cars,
        cart,
        favorites,
        setCars,
        setCart,
        setFavorites,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isAppLoaded,
        isUserLogged,
      }}
    >
      {isAppLoaded ? (
        children
      ) : (
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: 'md' }}
        />
      )}
    </AuthContext.Provider>
  );
};
