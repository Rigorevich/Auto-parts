import axios from 'axios';

import inMemoryJWT from '../services/inMemoryJWT';

import { api_config } from './api_config';

export interface Account {
  id: number;
  email: string;
  password: string;
  status: number;
  role: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  phone_number?: string;
}

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiration: number;
  accountData: Account;
}

export interface AuthData {
  email: string;
  password: string;
}

export const axiosOptions = {
  baseURL: api_config.API_URL,
  withCredentials: true,
};

export const axiosInstance = axios.create(axiosOptions);

axiosInstance.interceptors.request.use(
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

// TODO: DELETE CODE BELOW

export const AuthClient = axios.create({
  baseURL: `${api_config.API_URL}/auth`,
  withCredentials: true,
});

export const AccountClient = axios.create({
  baseURL: `${api_config.API_URL}/accounts`,
});

AccountClient.interceptors.request.use(
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
