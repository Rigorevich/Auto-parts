import { Request, Response } from 'express';

import CarAttributesService from '../../services/CarAttributes/CarAttributes';
import ErrorsUtils from '../../utils/Errors';

class CarAttributesController {
  static async getCarBrands(req: Request, res: Response) {
    try {
      const brands = await CarAttributesService.getCarBrands();

      return res.status(200).json({ result: { brands } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getCarModelsByBrand(req: Request, res: Response) {
    const { brandId } = req.query;

    try {
      const models = await CarAttributesService.getCarModelsByBrandId(Number(brandId));

      return res.status(200).json({ result: { models } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getCarGenerationsByModel(req: Request, res: Response) {
    const { modelId } = req.query;

    try {
      const generations = await CarAttributesService.getCarGenerationsByModelId(Number(modelId));

      return res.status(200).json({ result: { generations } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getCarEngines(req: Request, res: Response) {
    try {
      const engines = await CarAttributesService.getCarEngines();

      return res.status(200).json({ result: { engines } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getCarModifications(req: Request, res: Response) {
    const { engineId, generationId } = req.query;

    try {
      const modifications = await CarAttributesService.getCarModifications(
        Number(generationId),
        Number(engineId),
      );

      return res.status(200).json({ result: { modifications } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
}

export default CarAttributesController;
