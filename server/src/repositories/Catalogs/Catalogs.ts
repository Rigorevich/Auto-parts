import pool from '../../../db';
import { Category, Subcategory } from '../../types/Categories';

class CatalogsRepository {
  static async getAllCategories(): Promise<Category[]> {
    const response = await pool.query('SELECT * FROM categories');

    return response ? response.rows : null;
  }

  static async getCategoryById(id: number): Promise<Category> {
    const response = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);

    return response ? response.rows[0] : null;
  }

  static async createCategory(name: string, imageName: string): Promise<Category> {
    const response = await pool.query(
      'INSERT INTO categories (name, image_path) VALUES ($1, $2) RETURNING *',
      [name, imageName],
    );

    return response ? response.rows[0] : null;
  }

  static async updateCategory(id: number, name: string, imageName: string): Promise<Category> {
    const response = await pool.query(
      'UPDATE categories SET name = $1, image_path = $2 WHERE id = $3 RETURNING *',
      [name, imageName, `${id}`],
    );

    return response ? response.rows[0] : null;
  }

  static async deleteCategory(id: number): Promise<Category> {
    const response = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);

    return response ? response.rows[0] : null;
  }

  static async getAllSubcategories(): Promise<Subcategory[]> {
    const response = await pool.query('SELECT * FROM subcategories');

    return response ? response.rows : null;
  }

  static async getSubcategoryById(id: number): Promise<Subcategory> {
    const response = await pool.query('SELECT * FROM subcategories WHERE id = $1', [id]);

    return response ? response.rows[0] : null;
  }

  static async getSubcategoriesByCatalogId(categoryId: number): Promise<Subcategory[]> {
    const response = await pool.query('SELECT * FROM subcategories WHERE category_id = $1', [categoryId]);

    return response ? response.rows : null;
  }

  static async createSubcategory(categoryId: number, name: string, imagePath: string): Promise<Subcategory> {
    const response = await pool.query(
      'INSERT INTO subcategories (category_id, name, image_path) VALUES ($1, $2, $3) RETURNING *',
      [`${categoryId}`, name, imagePath],
    );

    return response ? response.rows[0] : null;
  }

  static async updateSubcategory(
    id: number,
    categoryId: number,
    name: string,
    imagePath: string,
  ): Promise<Subcategory> {
    const response = await pool.query(
      'UPDATE subcategories SET name = $1, image_path = $2, category_id = $3, WHERE id = $4 RETURNING *',
      [name, imagePath, `${categoryId}`, `${id}`],
    );

    return response ? response.rows[0] : null;
  }

  static async deleteSubcategory(id: number): Promise<Subcategory> {
    const response = await pool.query('DELETE FROM subcategories WHERE id = $1 RETURNING *', [id]);

    return response ? response.rows[0] : null;
  }
}

export default CatalogsRepository;
