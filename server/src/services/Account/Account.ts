import bcrypt from 'bcryptjs';

import AccountRepository from '../../repositories/Auth/Account';
import { Account } from '../../types/Account';
import { NotFound } from '../../utils/Errors';

class AccountService {
  static async getAccountById(id: number): Promise<Account | null> {
    const account = await AccountRepository.getAccountDataById(id);

    if (!account) {
      throw new NotFound('Пользователь не найден!');
    }

    return account;
  }

  static async getAccountsWithPagination(
    search: string,
    page: number,
    limit: number,
  ): Promise<{ accounts: Account[]; totalCount: number } | null> {
    const offset = (page - 1) * limit;

    const { accounts, totalCount } = await AccountRepository.getAccountsWithPagination(search, limit, offset);

    return { accounts, totalCount };
  }

  static async updateAccount(id: number, newData: Partial<Account>): Promise<Account | null> {
    const currentAccount = await AccountRepository.getAccountDataById(id);

    if (!currentAccount) {
      throw new NotFound('Пользователь не найден!');
    }

    newData.name = newData.name || currentAccount.name;
    newData.surname = newData.surname || currentAccount.surname;
    newData.phone_number = newData.phone_number || currentAccount.phone_number;
    newData.role = newData.role || currentAccount.role;
    newData.status = newData.status || currentAccount.status;
    newData.email = newData.email || currentAccount.email;
    newData.password = newData.password ? bcrypt.hashSync(newData.password, 10) : currentAccount.password;

    const updatedAccount = await AccountRepository.updateAccount(id, newData);

    return updatedAccount;
  }

  static async deleteAccount(id: number): Promise<void> {
    await AccountRepository.deleteAccount(id);
  }
}

export default AccountService;
