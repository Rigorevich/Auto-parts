import axios from 'axios';

import { API_URL } from './API_URL';

export const AuthClient = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});
