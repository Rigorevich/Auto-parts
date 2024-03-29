import axios from 'axios';

import { api_config } from './api_config';

export const AuthClient = axios.create({
  baseURL: `${api_config.API_URL}/auth`,
  withCredentials: true,
});
