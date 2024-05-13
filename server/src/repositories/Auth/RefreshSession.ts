import type { FingerprintResult } from 'express-fingerprint';

import pool from '../../../db';

export interface ICreateRefreshSession {
  id: number;
  refreshToken: string;
  fingerprint?: FingerprintResult;
}

export interface IGetRefreshSession {
  id: number;
  refreshToken: string;
  fingerprint: string;
}

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken: string): Promise<any> {
    const response = await pool.query('SELECT * FROM refresh_sessions WHERE refresh_token = $1', [
      refreshToken,
    ]);

    return response.rows.length ? response.rows[0] : null;
  }

  static async createRefreshSession({ id, refreshToken, fingerprint }: ICreateRefreshSession) {
    await pool.query(
      'INSERT INTO refresh_sessions (account_id, refresh_token, finger_print) VALUES ($1, $2, $3)',
      [id.toString(), refreshToken, fingerprint.hash],
    );
  }

  static async deleteRefreshSession(refreshToken: string) {
    await pool.query('DELETE FROM refresh_sessions WHERE refresh_token = $1', [refreshToken]);
  }
}

export default RefreshSessionRepository;
