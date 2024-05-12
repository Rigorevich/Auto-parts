import pool from '../../db';
import { Account } from '../types/Account';

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
}

export default AccountRepository;
