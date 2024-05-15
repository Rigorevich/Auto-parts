import pool from '../../../db';
import { CarBrand, CarModel, CarGenaration, CarModification, CarEngine } from '../../types/Car';

class CarAttributesRepository {
  static async getAllBrands(): Promise<CarBrand[]> {
    const response = await pool.query('SELECT * FROM brands');

    return response ? response.rows : null;
  }

  static async getModelsByBrandId(brandId: number): Promise<CarModel[]> {
    const response = await pool.query('SELECT * FROM models WHERE brand_id = $1', [brandId]);

    return response ? response.rows : null;
  }

  static async getGenerationsByModelId(modelId: number): Promise<CarGenaration[]> {
    const response = await pool.query('SELECT * FROM generations WHERE model_id = $1', [modelId]);

    return response ? response.rows : null;
  }

  static async getAllEngines(): Promise<CarEngine[]> {
    const response = await pool.query('SELECT * FROM engines');

    return response ? response.rows : null;
  }

  static async getModificationsByIds(generationId: number, engineId: number): Promise<CarModification[]> {
    const response = await pool.query(
      'SELECT * FROM modifications WHERE engine_id = $1 AND generation_id = $2',
      [engineId, generationId],
    );

    return response ? response.rows : null;
  }
}

export default CarAttributesRepository;
