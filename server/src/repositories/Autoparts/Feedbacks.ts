import pool from '../../../db';

import { Account } from '../../types/Account';

export interface Feedback {
  id: string;
  rating: number;
  feedback: string;
  autopart_id: string;
  account_id: string;
  account?: Account;
}

class FeedbacksRepository {
  static async getAllFeedbacks(autopartId: string, sortBy?: 'rating' | 'default'): Promise<Feedback[]> {
    let orderByClause = '';
    if (sortBy === 'rating') {
      orderByClause = 'ORDER BY rating DESC';
    }

    const response = await pool.query(
      `
      SELECT * FROM autoparts_feedbacks
      WHERE autopart_id = $1
      ${orderByClause}
      `,
      [autopartId],
    );
    return response ? response.rows : null;
  }

  static async delete(id: string): Promise<Feedback> {
    const response = await pool.query(
      `
      DELETE FROM autoparts_feedbacks
      WHERE id = $1
      RETURNING *
    `,
      [id],
    );
    return response ? response.rows[0] : null;
  }

  static async create(
    autopartId: string,
    accountId: string,
    rating: number,
    feedback: string,
  ): Promise<Feedback> {
    const response = await pool.query(
      `
      INSERT INTO autoparts_feedbacks
      (autopart_id, account_id, rating, feedback)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *
    `,
      [autopartId, accountId, `${rating}`, feedback],
    );

    return response ? response.rows[0] : null;
  }
}

export default FeedbacksRepository;
