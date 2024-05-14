import { useState } from 'react';
import { Pagination, TextInput, Select } from '@mantine/core';

import { SearchIcon } from '../../components/ui/Icons/Icons';
import { useAccountsWithPagination } from '../../queries/accounts.query';
import { useDebounce } from '../../hooks/useDebounce';

import { SearchInput } from './components/SearchInput/SearchInput';
import { AdminPanelTable } from './components/AdminPanelTable/AdminPanelTable';

import styles from './AdminPanel.module.scss';

const AdminPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('10');
  const [search, setSearch] = useState('');

  const { accounts, totalCount, isAccountsLoading, isAccountsError } = useAccountsWithPagination(
    search,
    page,
    Number(limit)
  );

  return (
    <section className={styles.adminPanel}>
      <div className={styles.adminPanel__container}>
        <SearchInput onChange={setSearch} />
        {isAccountsError ? (
          <div className={styles.adminPanel__error}>Произошла ошибка</div>
        ) : (
          <AdminPanelTable
            accounts={accounts}
            isAccountsLoading={isAccountsLoading}
          />
        )}

        <div className={styles.adminPanel__controllers}>
          <Pagination
            className={styles.adminPanel__pagination}
            total={Math.ceil((totalCount || 0) / Number(limit))}
            value={page}
            onChange={setPage}
          />
          <Select
            className={styles.adminPanel__select}
            checkIconPosition="right"
            data={['10', '20', '30']}
            value={limit}
            onChange={(value) => setLimit(value || '10')}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
