import pool from '../../../db';

import { Autopart, Attribute } from './types';
import { LIMIT } from '../../services/Autoparts/Autoparts';

class AutopartsRepository {
  static async getAttributes(autopartId: string): Promise<Attribute[]> {
    const response = await pool.query(
      `
      SELECT * FROM autoparts_attributes
      WHERE autopart_id = $1
    `,
      [autopartId],
    );

    return response ? response.rows : null;
  }

  static async getImages(autopartId: string): Promise<{ id: string; image_path: string }[]> {
    const response = await pool.query(
      `
      SELECT * FROM autoparts_images
      WHERE autopart_id = $1
    `,
      [autopartId],
    );

    return response ? response.rows : null;
  }

  static async getAutopartById(id: string): Promise<Autopart> {
    const response = await pool.query('SELECT * FROM autoparts WHERE id = $1', [id]);

    return response ? response.rows[0] : null;
  }

  static async getAutopartsWithPagination(
    search: string,
    subcategoryId: string,
    modificationId: string,
    offset: number,
  ): Promise<{ autoparts: Autopart[]; totalCount: number }> {
    const searchPattern = `%${search}%`;

    let query = `
      SELECT DISTINCT autoparts.*
      FROM autoparts
      LEFT JOIN autoparts_modifications
      ON autoparts.id = autoparts_modifications.autopart_id
      WHERE autoparts.name ILIKE $1`;

    let countQuery = `
      SELECT COUNT(DISTINCT autoparts.id) AS count
      FROM autoparts
      LEFT JOIN autoparts_modifications
      ON autoparts.id = autoparts_modifications.autopart_id
      WHERE autoparts.name ILIKE $1`;

    const queryParams: string[] = [searchPattern];
    const countParams: string[] = [searchPattern];

    let paramIndex = 2;

    if (subcategoryId) {
      query += ` AND autoparts.subcategory_id = $${paramIndex}`;
      countQuery += ` AND autoparts.subcategory_id = $${paramIndex}`;
      queryParams.push(subcategoryId);
      countParams.push(subcategoryId);
      paramIndex++;
    }

    if (modificationId) {
      query += ` AND autoparts_modifications.modification_id = $${paramIndex}`;
      countQuery += ` AND autoparts_modifications.modification_id = $${paramIndex}`;
      queryParams.push(modificationId);
      countParams.push(modificationId);
      paramIndex++;
    }

    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(`${LIMIT}`, `${offset}`);

    const response = await pool.query(query, queryParams);
    const totalCountResponse = await pool.query(countQuery, countParams);

    return response ? { autoparts: response.rows, totalCount: +totalCountResponse.rows[0].count } : null;
  }

  static async delete(id: string): Promise<Autopart> {
    const response = await pool.query('DELETE FROM autoparts WHERE id = $1 RETURNING *', [id]);

    return response ? response.rows[0] : null;
  }

  static async create(
    subcategoryId: string,
    name: string,
    description: string,
    price: string,
    quantity: string,
    discount: string,
  ): Promise<Autopart> {
    const response = await pool.query(
      'INSERT INTO autoparts (subcategory_id, name, description, price, quantity, discount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [subcategoryId, name, description, price, quantity, discount],
    );

    return response ? response.rows[0] : null;
  }

  static async applyAttributes(autopartId: string, attributes: Attribute[]): Promise<Attribute[]> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const results = [];
      for (const attribute of attributes) {
        const response = await client.query(
          'INSERT INTO autoparts_attributes (autopart_id, type, value) VALUES ($1, $2, $3) RETURNING *',
          [autopartId, attribute.type, attribute.value],
        );
        results.push(response.rows[0]);
      }

      await client.query('COMMIT');

      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async applyImages(
    autopartId: string,
    imageNames: string[],
  ): Promise<{ id: string; imageNames: string[] }[]> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const results = [];
      for (const imageName of imageNames) {
        const response = await client.query(
          'INSERT INTO autoparts_images (autopart_id, image_path) VALUES ($1, $2) RETURNING *',
          [autopartId, imageName],
        );
        results.push(response.rows[0]);
      }

      await client.query('COMMIT');

      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async applyModifications(
    autopartId: string,
    modifications: string[],
  ): Promise<{ autopart_id: string; modification_id: string }[]> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const results = [];
      for (const modificationId of modifications) {
        const response = await client.query(
          'INSERT INTO autoparts_modifications (autopart_id, modification_id) VALUES ($1, $2) RETURNING *',
          [autopartId, modificationId],
        );

        results.push(response.rows[0]);
      }

      await client.query('COMMIT');

      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

export default AutopartsRepository;
