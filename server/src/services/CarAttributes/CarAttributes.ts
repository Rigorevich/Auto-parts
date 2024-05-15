import CarAttributesRepository from '../../repositories/CarAttributes/CarAttributes';
import { NotFound, BadRequest } from '../../utils/Errors';

class CarAttributesService {
  static async getCarBrands() {
    const brands = await CarAttributesRepository.getAllBrands();

    if (!brands) {
      throw new NotFound('Марки автомобилей не найдены!');
    }

    return brands;
  }

  static async getCarModelsByBrandId(brandId: number) {
    if (!brandId) {
      throw new BadRequest('Не достаточно данных для получения моделей автомобилей!');
    }

    const models = await CarAttributesRepository.getModelsByBrandId(brandId);

    if (!models) {
      throw new NotFound('Модели автомобилей не найдены!');
    }

    return models;
  }

  static async getCarGenerationsByModelId(modelId: number) {
    if (!modelId) {
      throw new BadRequest('Не достаточно данных для получения поколений автомобилей!');
    }

    const generations = await CarAttributesRepository.getGenerationsByModelId(modelId);

    if (!generations) {
      throw new NotFound('Поколения автомобилей не найдены!');
    }

    return generations;
  }

  static async getCarEngines() {
    const engines = await CarAttributesRepository.getAllEngines();

    if (!engines) {
      throw new NotFound('Категории двигателей не найдены!');
    }

    return engines;
  }

  static async getCarModifications(generationId: number, engine_id: number) {
    if (!generationId || !engine_id) {
      throw new BadRequest('Не достаточно данных для получения модификаций автомобилей!');
    }

    const modifications = await CarAttributesRepository.getModificationsByIds(generationId, engine_id);

    if (!modifications) {
      throw new NotFound('Не удалось найти модификации автомобилей по указанным параметрам!');
    }

    return modifications;
  }
}

export default CarAttributesService;
