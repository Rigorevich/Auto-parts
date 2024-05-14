import { useQuery } from '@tanstack/react-query';

import accountsApi from '../api/accounts';

export const useAccountsWithPagination = (search: string, page: number = 1, limit: number = 0) => {
  const {
    data: accountsData,
    isError: isAccountsError,
    isLoading: isAccountsLoading,
  } = useQuery({
    queryKey: ['accounts', page, limit, search],
    queryFn: () => accountsApi.getAccountsWithPagination(page, limit, search),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    accounts: accountsData?.result.accounts,
    totalCount: accountsData?.result.totalCount,
    isAccountsError,
    isAccountsLoading,
  };
};
