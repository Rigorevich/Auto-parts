import pool from '../../../db';
import { CarBrand, CarModel, CarGenaration, CarModification, CarEngine, CarBodyTypes } from '../../types/Car';

class CarAttributesRepository {
  static async getAllBrands(): Promise<CarBrand[]> {
    const response = await pool.query('SELECT * FROM car_brands');

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

  static async getAllBodyTypes(): Promise<CarBodyTypes[]> {
    const response = await pool.query('SELECT * FROM body_types');

    return response ? response.rows : null;
  }

  static async getBodyTypesByGenerationId(generationId: number): Promise<CarBodyTypes[]> {
    const response = await pool.query('SELECT body_type FROM modifications WHERE generation_id = $1', [
      generationId,
    ]);

    return response ? response.rows : null;
  }

  static async getEnginesByGenerationId(generationId: number): Promise<CarEngine[]> {
    const response = await pool.query('SELECT engine FROM modifications WHERE generation_id = $1', [
      generationId,
    ]);

    return response ? response.rows : null;
  }

  static async getCarBrandById(brandId: number): Promise<CarBrand> {
    const response = await pool.query('SELECT * FROM car_brands WHERE id = $1', [brandId]);

    return response ? response.rows[0] : null;
  }

  static async getModelById(modelId: number): Promise<CarModel> {
    const response = await pool.query('SELECT * FROM models WHERE id = $1', [modelId]);

    return response ? response.rows[0] : null;
  }

  static async getGenerationById(generationId: number): Promise<CarGenaration> {
    const response = await pool.query('SELECT * FROM generations WHERE id = $1', [generationId]);

    return response ? response.rows[0] : null;
  }

  static async getModificationById(modificationId: number): Promise<CarModification> {
    const response = await pool.query('SELECT * FROM modifications WHERE id = $1', [modificationId]);

    return response ? response.rows[0] : null;
  }

  static async getModificationsByIds(
    generationId: number,
    engine: string,
    bodyType: string,
  ): Promise<CarModification[]> {
    const response = await pool.query(
      'SELECT * FROM modifications WHERE engine = $1 AND generation_id = $2 AND body_type = $3',
      [engine, generationId.toString(), bodyType],
    );

    return response ? response.rows : null;
  }
}

export default CarAttributesRepository;
