import { Response, Request } from 'express';

import AutopartsService from '../../services/Autoparts/Autoparts';
import ErrorsUtils from '../../utils/Errors';

class AutopartsController {
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const autopart = await AutopartsService.delete(id);

      return res.status(200).json({ result: { autopart } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async create(req: Request & { files: any }, res: Response) {
    const {
      subcategoryId,
      name,
      description,
      price,
      quantity,
      discount,
      modifications,
      universal,
      attributes,
    } = req.body;
    const images = req?.files?.images;

    try {
      const autopart = await AutopartsService.create({
        subcategoryId,
        name,
        description,
        price,
        quantity,
        discount,
        images,
        modifications: JSON.parse(modifications),
        universal: JSON.parse(universal),
        attributes: JSON.parse(attributes),
      });

      return res.status(200).json({ result: { autopart } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getAutopartById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const autopart = await AutopartsService.getAutopartById(id);

      return res.status(200).json({ result: { autopart } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getAutopartsWithPagination(req: Request, res: Response) {
    const { page, search = '', subcategoryId, modificationId } = req.query;

    const defaultPage = Number(page) || 1;

    try {
      const autoparts = await AutopartsService.getAutopartsWithPagination(
        search.toString(),
        defaultPage,
        subcategoryId as string,
        modificationId as string,
      );

      return res.status(200).json({ result: { ...autoparts } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
}

export default AutopartsController;
