import AuthService from '../../services/Auth/Auth';
import ErrorsUtils from '../../utils/Errors';
import { ERole } from '../../types/Role';
import { COOKIE_SETTINGS } from '../../../constants';
import type { ISignUpRequest, ISignUpResponse } from './types';

class AuthController {
  static async signIn(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
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

  static async logOut(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
