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

  static async getCarEnginesByGenerationId(generationId: number) {
    if (!generationId) {
      throw new BadRequest('Не достаточно данных для получения двигателей автомобилей!');
    }

    const engines = await CarAttributesRepository.getEnginesByGenerationId(generationId);

    if (!engines) {
      throw new NotFound('Категории двигателей не найдены!');
    }

    const uniqueEngines = Array.from(new Set(engines.map((item) => JSON.stringify(item)))).map((item) =>
      JSON.parse(item),
    );

    return uniqueEngines;
  }

  static async getCarBodyTypes() {
    const bodyTypes = await CarAttributesRepository.getAllBodyTypes();

    if (!bodyTypes) {
      throw new NotFound('Категории двигателей не найдены!');
    }

    return bodyTypes;
  }

  static async getCarBodyTypesByGenerationId(generationId: number) {
    if (!generationId) {
      throw new BadRequest('Не достаточно данных для получения кузовов автомобилей!');
    }

    const bodyTypes = await CarAttributesRepository.getBodyTypesByGenerationId(generationId);

    if (!bodyTypes) {
      throw new NotFound('Кузова не найдены!');
    }

    const uniqueBodyTypes = Array.from(new Set(bodyTypes.map((item) => JSON.stringify(item)))).map((item) =>
      JSON.parse(item),
    );

    return uniqueBodyTypes;
  }

  static async getCarModifications(generation_id: number, engine: string, body_type: string) {
    if (!generation_id || !engine || !body_type) {
      throw new BadRequest('Не достаточно данных для получения модификаций автомобилей!');
    }

    const modifications = await CarAttributesRepository.getModificationsByIds(
      generation_id,
      engine,
      body_type,
    );

    if (!modifications) {
      throw new NotFound('Не удалось найти модификации автомобилей по указанным параметрам!');
    }

    return modifications;
  }
}

export default CarAttributesService;
