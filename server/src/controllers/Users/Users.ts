import { Request, Response } from 'express';

import UsersService from '../../services/Users/Users';
import ErrorsUtils from '../../utils/Errors';

class UsersController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UsersService.getAllUsers();

      return res.status(200).json({ users, quantity: users.length });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async editUser() {}

  static async deleteUser() {}
}

export default UsersController;
