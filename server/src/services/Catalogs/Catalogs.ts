import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import CatalogsRepository from '../../repositories/Catalogs/Catalogs';
import { NotFound, BadRequest } from '../../utils/Errors';

class CatalogsService {
  static async getAllCategories() {
    const categories = await CatalogsRepository.getAllCategories();

    if (!categories) {
      throw new NotFound('Категорий нет!');
    }

    return categories;
  }

  static async getCategoryById(id: number) {
    const category = await CatalogsRepository.getCategoryById(id);

    if (!category) {
      throw new NotFound('Категория не найдена!');
    }

    return category;
  }

  static async createCategory(name: string, image: any) {
    if (!name || !image) {
      throw new BadRequest('Недостаточно данных для создания категории!');
    }

    let imageName = v4() + '.jpg';
    image.mv(path.resolve(__dirname, '..', '..', 'static', imageName));

    const category = await CatalogsRepository.createCategory(name, imageName);

    if (!category) {
      throw new NotFound('Категория не создана!');
    }

    return category;
  }

  static async updateCategory(id: number, name: string, imagePath: string) {
    if (!id || !name || !imagePath) {
      throw new BadRequest('Недостаточно данных для обновления категории!');
    }

    const category = await CatalogsRepository.updateCategory(id, name, imagePath);

    if (!category) {
      throw new NotFound('Категория не обновлена!');
    }

    return category;
  }

  static async deleteCategory(id: number) {
    if (!id) {
      throw new BadRequest('Не достаточно данных для удаления категории!');
    }

    const category = await CatalogsRepository.deleteCategory(id);

    if (category && category.image_path) {
      fs.unlink(path.resolve(__dirname, '..', '..', 'static', category.image_path), (error) => {
        if (error) {
          throw error;
        }
      });
    }

    if (!category) {
      throw new NotFound('Категория не удалена!');
    }

    return category;
  }

  static async getAllSubcategories() {
    const subcategories = await CatalogsRepository.getAllSubcategories();

    if (!subcategories) {
      throw new NotFound('Подкатегорий нет!');
    }

    return subcategories;
  }

  static async getSubcategoryById(id: number) {
    const subcategory = await CatalogsRepository.getSubcategoryById(id);

    if (!subcategory) {
      throw new NotFound('Подкатегория не найдена!');
    }

    return subcategory;
  }

  static async createSubcategory(categoryId: number, name: string, image: any) {
    if (!categoryId || !name || !image) {
      throw new BadRequest('Недостаточно данных для создания подкатегории!');
    }

    let imageName = v4() + '.jpg';
    image.mv(path.resolve(__dirname, '..', '..', 'static', imageName));

    const subcategory = await CatalogsRepository.createSubcategory(categoryId, name, imageName);

    if (!subcategory) {
      throw new NotFound('Подкатегория не создана!');
    }

    return subcategory;
  }

  static async updateSubcategory(id: number, categoryId: number, name: string, imagePath: string) {
    if (!id || !categoryId || !name || !imagePath) {
      throw new BadRequest('Недостаточно данных для обновления подкатегории!');
    }

    const subcategory = await CatalogsRepository.updateSubcategory(id, categoryId, name, imagePath);

    if (!subcategory) {
      throw new NotFound('Подкатегория не обновлена!');
    }

    return subcategory;
  }

  static async deleteSubcategory(id: number) {
    if (!id) {
      throw new BadRequest('Не достаточно данных для удаления подкатегории!');
    }

    const subcategory = await CatalogsRepository.deleteSubcategory(id);

    if (subcategory && subcategory.image_path) {
      fs.unlink(path.resolve(__dirname, '..', '..', 'static', subcategory.image_path), (error) => {
        if (error) {
          throw error;
        }
      });
    }

    if (!subcategory) {
      throw new NotFound('Подкатегория не удалена!');
    }

    return subcategory;
  }

  static async getSubcategoriesByCategoryId(categoryId: number) {
    if (!categoryId) {
      throw new BadRequest('Не достаточно данных для получения подкатегорий!');
    }

    const subcategories = await CatalogsRepository.getSubcategoriesByCatalogId(categoryId);

    if (!subcategories) {
      throw new NotFound('Подкатегорий нет!');
    }

    return subcategories;
  }
}

export default CatalogsService;
