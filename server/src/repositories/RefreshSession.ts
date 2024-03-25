import type { FingerprintResult } from 'express-fingerprint';

import pool from '../../db';
import type { IUser } from '../types/User';
import type { IAuthTokens } from '../types/AuthTokens';

export interface IRefreshSession {
  id?: IUser['id'];
  refreshToken: IAuthTokens['refreshToken'];
  fingerprint?: FingerprintResult;
}

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken: IRefreshSession) {}

  static async createRefreshSession({ id, refreshToken, fingerprint }: IRefreshSession) {
    await pool.query(
      'INSERT INTO refresh_sessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3)',
      [id.toString(), refreshToken, fingerprint.hash],
    );
  }

  static async deleteRefreshSession(refreshToken: IRefreshSession) {}
}

export default RefreshSessionRepository;
