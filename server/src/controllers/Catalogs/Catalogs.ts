import { Response, Request } from 'express';

import CatalogsService from '../../services/Catalogs/Catalogs';
import ErrorsUtils from '../../utils/Errors';

class CatalogsController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CatalogsService.getAllCategories();

      return res.status(200).json({ result: { categories } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async getSubcategoriesByCategoryId(req: Request, res: Response) {
    const { id: categoryId } = req.params;

    try {
      const subcategories = await CatalogsService.getSubcategoriesByCategoryId(Number(categoryId));

      return res.status(200).json({ result: { subcategories } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async createCategory(req: Request & { files: any }, res: Response) {
    const { name } = req.body;
    const { image } = req.files;

    try {
      const category = await CatalogsService.createCategory(name, image);

      return res.status(201).json({ result: { category } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CatalogsService.deleteCategory(Number(id));

      return res.status(200).json({ result: { category } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async createSubcategory(req: Request & { files: any }, res: Response) {
    const { categoryId, name } = req.body;
    const { image } = req.files;

    console.log(categoryId, name, image);

    try {
      const category = await CatalogsService.createSubcategory(categoryId, name, image);

      return res.status(201).json({ result: { category } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async deleteSubcategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const subcategory = await CatalogsService.deleteSubcategory(Number(id));

      return res.status(200).json({ result: { subcategory } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
}

export default CatalogsController;
