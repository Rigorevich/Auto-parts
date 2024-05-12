import { User } from '../../types/User';
import UsersRepository from '../../repositories/Users';

class UsersService {
  static async getAllUsers(): Promise<User[]> {
    const users = await UsersRepository.getAllUsers();

    return users;
  }

  static async createUser(userId: User['id']): Promise<void> {
    await UsersRepository.createUser(userId);
  }
}

export default UsersService;
