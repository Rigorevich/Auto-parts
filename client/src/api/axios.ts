import axios from 'axios';

import { api_config } from './api_config';

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiration: number;
}

export interface AuthData {
  username: string;
  password: string;
}

export const AuthClient = axios.create({
  baseURL: `${api_config.API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${api_config.API_URL}/resource`,
});
