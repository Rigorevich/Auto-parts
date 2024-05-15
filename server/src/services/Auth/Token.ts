import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Forbidden, Unauthorized } from '../../utils/Errors';
import type { IGenerateToken } from './types';
import { Role } from '../../types/Account';

dotenv.config();

class TokenService {
  static async generateAccessToken(payload: IGenerateToken) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
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

  static async checkRole(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')?.[1];

    try {
      const user: any = await TokenService.verifyAccessToken(token);

      if (user.role !== Role.ADMIN) {
        next(new Forbidden('Недостаточно прав'));
      }
    } catch (error) {
      return next(new Forbidden(error));
    }

    next();
  }

  static async checkAccess(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return next(new Unauthorized('Пользователь не авторизирован'));
    }

    try {
      const user = await TokenService.verifyAccessToken(token);

      req.user = user;
    } catch (error) {
      return next(new Forbidden(error));
    }

    next();
  }
}

export default TokenService;
