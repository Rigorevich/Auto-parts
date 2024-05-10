import pool from '../../db';
import { IUser } from '../types/User';

export interface ICreateUser extends Pick<IUser, 'username' | 'role'> {
  hashedPassword: IUser['password'];
}

class UserRepository {
  static async createUser({ username, hashedPassword, role }: ICreateUser): Promise<IUser> {
    const response = await pool.query(
      'INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role.toString()],
    );

    return response.rows[0];
  }

  static async getUserData(username: IUser['username']): Promise<any> {
    const response = await pool.query('SELECT * FROM users WHERE name = $1', [username]);

    return response ? response.rows[0] : null;
  }
}

export default UserRepository;
