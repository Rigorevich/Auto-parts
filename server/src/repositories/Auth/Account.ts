import pool from '../../../db';
import { Account } from '../../types/Account';

export interface ICreateUser extends Pick<Account, 'email' | 'role' | 'status'> {
  hashedPassword: Account['password'];
}

class AccountRepository {
  static async createAccount({ email, hashedPassword, role, status }: ICreateUser): Promise<Account> {
    const response = await pool.query(
      'INSERT INTO accounts (email, password, role, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, role.toString(), status.toString()],
    );

    return response.rows[0];
  }

  static async getAccountData(email: Account['email']): Promise<Account | null> {
    const response = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);

    return response ? response.rows[0] : null;
  }

  static async getAccountDataById(id: Account['id']): Promise<Account | null> {
    const response = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);

    return response ? response.rows[0] : null;
  }

  static async getAccountsWithPagination(
    search: string,
    limit: number,
    offset: number,
  ): Promise<{ accounts: Account[]; totalCount: number } | null> {
    const searchPattern = `%${search}%`;

    const response = await pool.query(
      `SELECT * FROM accounts 
    WHERE 
        email ILIKE $1 OR 
        name ILIKE $1 OR 
        surname ILIKE $1 OR 
        phone_number ILIKE $1
    LIMIT $2 OFFSET $3`,
      [searchPattern, limit.toString(), offset.toString()],
    );

    const totalCountResponse = await pool.query('SELECT COUNT(*) FROM accounts');

    return response
      ? { accounts: response.rows, totalCount: Number(totalCountResponse.rows[0].count) }
      : null;
  }

  static async deleteAccount(id: Account['id']): Promise<void> {
    await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
  }

  static async updateAccount(id: Account['id'], newData: Partial<Account>): Promise<Account | null> {
    const response = await pool.query(
      'UPDATE accounts SET email = $1, password = $2, role = $3, status = $4, name = $5, surname = $6, phone_number = $7 WHERE id = $8 RETURNING *',
      [
        newData.email,
        newData.password,
        newData.role.toString(),
        newData.status.toString(),
        newData.name,
        newData.surname,
        newData.phone_number,
        id.toString(),
      ],
    );

    return response ? response.rows[0] : null;
  }
}

export default AccountRepository;
