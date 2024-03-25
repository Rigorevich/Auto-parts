import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { FingerprintResult } from 'express-fingerprint';

import TokenService from './Token';
import { NotFound, Forbidden, Conflict } from '../../utils/Errors';
import RefreshSessionsRepository from '../../repositories/RefreshSession';
import UserRepository from '../../repositories/User';
import { ACCESS_TOKEN_EXPIRATION } from '../../../constants';
import type { ISignUpArguments, ISignUpResponse } from './types';

class AuthService {
  static async signIn({ userName, password, fingerprint }) {}

  static async signUp({ username, password, fingerprint, role }: ISignUpArguments): Promise<ISignUpResponse> {
    const userData = await UserRepository.getUserData(username);

    if (userData) {
      throw new Conflict('Такой пользователь уже существует!');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const { id } = await UserRepository.createUser({ username, hashedPassword, role });

    const payload = { id, username, role };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    });

    return { accessToken, refreshToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION };
  }

  static async logOut(refreshToken) {}

  static async refresh({ fingerprint, currentRefreshToken }) {}
}

export default AuthService;
