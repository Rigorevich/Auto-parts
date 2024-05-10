import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Forbidden, Unauthorized } from '../../utils/Errors';
import type { IGenerateToken } from './types';

dotenv.config();

class TokenService {
  static async generateAccessToken(payload: IGenerateToken) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  }

  static async generateRefreshToken(payload: IGenerateToken) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });
  }

  static async verifyAccessToken(accessToken: string) {
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }

  static async verifyRefreshToken(refreshToken: string) {
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }

  static async checkAccess(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return next(new Unauthorized('Пользователь не авторизирован'));
    }

    try {
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error) {
      return next(new Forbidden(error));
    }

    next();
  }
}

export default TokenService;
