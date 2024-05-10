import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { FingerprintResult } from 'express-fingerprint';

import TokenService from './Token';
import { NotFound, Forbidden, Conflict, Unauthorized } from '../../utils/Errors';
import RefreshSessionsRepository from '../../repositories/RefreshSession';
import UserRepository from '../../repositories/User';
import { ACCESS_TOKEN_EXPIRATION } from '../../../constants';
import type { ISignUpArguments, ISignUpResponse, ISignInArguments, ISignInResponse } from './types';

class AuthService {
  static async signIn({ username, password, fingerprint }: ISignInArguments): Promise<ISignInResponse> {
    const userData = await UserRepository.getUserData(username);

    if (!userData) {
      throw new NotFound('Пользователь не найден!');
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password);

    if (!isPasswordValid) {
      throw new Unauthorized('Неверный логин или пароль!');
    }

    const payload = { id: userData.id, username, role: userData.role };

    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession({
      id: userData.id,
      refreshToken,
      fingerprint,
    });

    return { accessToken, refreshToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION };
  }

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

    console.log('payload', payload);

    const { id, role, name: username } = await UserRepository.getUserData(payload.username);

    const actualPayload = { id, username, role };

    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }
}

export default AuthService;
