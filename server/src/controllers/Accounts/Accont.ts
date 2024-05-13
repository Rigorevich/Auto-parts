import { Request, Response } from 'express';

import ErrorsUtils from '../../utils/Errors';
import { Account } from '../../types/Account';
import AccountService from '../../services/Account/Account';

class AccountController {
  static async getAccountData(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const accountData = await AccountService.getAccountById(Number(id));

      return res.status(200).json({ result: accountData });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getAccountsWithPagination(req: Request, res: Response) {
    const { page, limit, search } = req.query;

    const defaultPage = Number(page) || 1;
    const defaultLimit = Number(limit) || 10;

    // TODO: add check roles

    try {
      const { accounts, totalCount } = await AccountService.getAccountsWithPagination(
        search.toString(),
        defaultPage,
        defaultLimit,
      );

      return res.status(200).json({ result: { accounts, totalCount } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async updateAccountData(req: Request, res: Response) {
    const { id } = req.params;
    const newData = req.body;

    try {
      const updatedAccount = await AccountService.updateAccount(Number(id), newData);

      return res.status(200).json({ result: updatedAccount });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await AccountService.deleteAccount(Number(id));

      return res.sendStatus(204);
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
}

export default AccountController;
