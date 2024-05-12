import pool from '../../db';
import { User } from '../types/User';

class UsersRepository {
  static async getAllUsers(): Promise<User[] | null> {
    const response = await pool.query('SELECT * FROM users');

    return response ? response.rows[0] : null;
  }

  static async createUser(userId: User['id']): Promise<void> {
    await pool.query('INSERT INTO users (account_id) VALUES ($1)', [userId]);
  }
}

export default UsersRepository;
