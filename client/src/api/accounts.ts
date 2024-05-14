import { api_config } from './api_config';
import { axiosInstance } from './axios';

export interface Account {
  id: number;
  email: string;
  password: string;
  status: number;
  role: number;
  name?: string;
  surname?: string;
  phone_number?: string;
}

const accountsApi = {
  getAccountsWithPagination: async (page: number, limit: number, search: string) => {
    const route = api_config.API_URL + '/accounts';

    const { data } = await axiosInstance.get<{ result: { accounts: Account[]; totalCount: number } }>(route, {
      params: { page, limit, search },
    });

    return data;
  },
};

export default accountsApi;
