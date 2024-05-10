import { Request, Response } from 'express';

import AuthService from '../../services/Auth/Auth';
import ErrorsUtils from '../../utils/Errors';
import { ERole } from '../../types/Role';
import { COOKIE_SETTINGS } from '../../../constants';
import type { ISignUpRequest, ISignUpResponse } from './types';

class AuthController {
  static async signIn(req: ISignUpRequest, res: ISignUpResponse) {
    const { username, password } = req.body;
    const { fingerprint } = req;

    try {
      const { refreshToken, accessToken, accessTokenExpiration } = await AuthService.signIn({
        username,
        password,
        fingerprint,
      });

      res.cookie('refresh_token', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req: ISignUpRequest, res: ISignUpResponse) {
    const { username, password, role } = req.body;
    const { fingerprint } = req;

    const defaultRole = role || ERole.USER;

    try {
      const { refreshToken, accessToken, accessTokenExpiration } = await AuthService.signUp({
        username,
        password,
        role: defaultRole,
        fingerprint,
      });

      res.cookie('refresh_token', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req: Request, res: Response) {
    const refreshToken: string = req.cookies.refresh_token;

    try {
      await AuthService.logOut(refreshToken);

      res.clearCookie('refresh_token');

      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    const currentRefreshToken = req.cookies.refresh_token;

    try {
      const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.refresh({
        currentRefreshToken,
        fingerprint,
      });

      res.cookie('refresh_token', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
