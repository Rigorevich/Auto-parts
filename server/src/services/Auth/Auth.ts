import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { FingerprintResult } from 'express-fingerprint';

import TokenService from './Token';
import { NotFound, Forbidden, Conflict, Unauthorized } from '../../utils/Errors';
import RefreshSessionsRepository from '../../repositories/Auth/RefreshSession';
import AccountRepository from '../../repositories/Auth/Account';
import { ACCESS_TOKEN_EXPIRATION } from '../../../constants';
import type { ISignUpArguments, ISignUpResponse, ISignInArguments, ISignInResponse } from './types';

class AuthService {
  static async signIn({ email, password, fingerprint }: ISignInArguments): Promise<ISignInResponse> {
    const accountData = await AccountRepository.getAccountData(email);

    if (!accountData) {
      throw new NotFound('Пользователь не найден!');
    }

    const isPasswordValid = bcrypt.compareSync(password, accountData.password);

    if (!isPasswordValid) {
      throw new Unauthorized('Неверный логин или пароль!');
    }

    const payload = { id: accountData.id, email, role: accountData.role };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id: accountData.id,
      refreshToken,
      fingerprint,
    });

    return { accessToken, refreshToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION, data: accountData };
  }

  static async signUp({
    email,
    password,
    fingerprint,
    role,
    status,
  }: ISignUpArguments): Promise<ISignUpResponse> {
    const accountData = await AccountRepository.getAccountData(email);

    if (accountData) {
      throw new Conflict('Такой пользователь уже существует!');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const { id } = await AccountRepository.createAccount({ email, hashedPassword, role, status });

    const payload = { id, email, role, status };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      data: { id, email, password: hashedPassword, role, status },
    };
  }

  static async logOut(refreshToken: string) {
    await RefreshSessionsRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({
    fingerprint,
    currentRefreshToken,
  }: {
    fingerprint: FingerprintResult;
    currentRefreshToken: string;
  }) {
    if (!currentRefreshToken) {
      throw new Unauthorized('Пользователь не авторизован!');
    }

    const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken);

    if (!refreshSession) {
      throw new Unauthorized('Пользователь не авторизован!');
    }

    if (fingerprint.hash !== refreshSession.finger_print) {
      throw new Forbidden('Попытка несанкционированного обновления токенов');
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken);

    let payload;

    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken);
    } catch (error) {
      throw new Forbidden(error);
    }

    const accountData = await AccountRepository.getAccountData(payload.email);

    const actualPayload = { id: accountData.id, email: accountData.email, role: accountData.role };

    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);

    await RefreshSessionsRepository.createRefreshSession({
      id: accountData.id,
      refreshToken,
      fingerprint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      data: accountData,
    };
  }
}

export default AuthService;
