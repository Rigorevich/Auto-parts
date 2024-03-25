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

  static async checkAccess(req, _, next) {}
}

export default TokenService;
