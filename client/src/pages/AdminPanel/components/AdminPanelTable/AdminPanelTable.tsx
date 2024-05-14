import { FC } from 'react';
import { Table, LoadingOverlay, ScrollArea } from '@mantine/core';

import { Account } from '../../../../api/accounts';

import styles from './AdminPanelTable.module.scss';

export interface AdminPanelTableProps {
  accounts?: Account[];
  isAccountsLoading: boolean;
}

const roleLabel: Record<number, string> = {
  1: 'Администратор',
  2: 'Пользователь',
  3: 'Модератор',
};

const statusLabel: Record<number, string> = {
  1: 'Активен',
  2: 'Не активен',
  3: 'Заблокирован',
};

export const AdminPanelTable: FC<AdminPanelTableProps> = ({ accounts, isAccountsLoading }) => {
  return (
    <ScrollArea h={'calc(100vh - 400px)'}>
      <Table
        stickyHeader
        className={styles.adminPanelTable}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Почта</Table.Th>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Фамилия</Table.Th>
            <Table.Th>Номер телефона</Table.Th>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Статус</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isAccountsLoading ? (
            <LoadingOverlay visible={true} />
          ) : accounts?.length ? (
            accounts.map((account) => (
              <Table.Tr key={account.id}>
                <Table.Td>{account.email}</Table.Td>
                <Table.Td>{account.name || '-'}</Table.Td>
                <Table.Td>{account.surname || '-'}</Table.Td>
                <Table.Td>{account.phone_number || '-'}</Table.Td>
                <Table.Td>{roleLabel[account.role]}</Table.Td>
                <Table.Td>{statusLabel[account.status]}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <div className={styles.adminPanelTable__notFound}>Ничего не найдено</div>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
