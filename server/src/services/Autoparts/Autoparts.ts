import { v4 } from 'uuid';
import fs from 'fs';
import path from 'path';

import { NotFound, BadRequest } from '../../utils/Errors';
import AutopartsRepository from '../../repositories/Autoparts/Autoparts';

import { Autopart } from './types';
import FeedbacksRepository from '../../repositories/Autoparts/Feedbacks';

export const LIMIT = 5;

class AutopartsService {
  static async getAutopartById(id: string) {
    const autopart = await AutopartsRepository.getAutopartById(id);

    if (!autopart) {
      throw new NotFound('Не удалось найти запчасть!');
    }

    const attributes = await AutopartsRepository.getAttributes(autopart.id);

    if (!attributes) {
      throw new NotFound('Не удалось найти характеристики запчасти!');
    }

    const images = await AutopartsRepository.getImages(autopart.id);

    if (!images) {
      throw new NotFound('Не удалось найти изображения запчасти!');
    }

    const imageNames = images.map((image) => image.image_path);

    // TODO: add feedbacks

    return { ...autopart, attributes, images: imageNames };
  }

  static async getAutopartsWithPagination(
    search: string,
    page: number,
    subcategoryId: string,
    modificationId: string,
  ) {
    const offset = (page - 1) * LIMIT;

    const autoparts = await AutopartsRepository.getAutopartsWithPagination(
      search,
      subcategoryId,
      modificationId,
      offset,
    );

    if (!autoparts) {
      throw new NotFound('Не удалось найти запчасти!');
    }

    for (const autopart of autoparts.autoparts) {
      const attributes = await AutopartsRepository.getAttributes(autopart.id);
      const images = await AutopartsRepository.getImages(autopart.id);
      const feedbacks = await FeedbacksRepository.getAllFeedbacks(autopart.id);

      autopart.attributes = attributes;
      autopart.image = images[0]?.image_path;
      autopart.averageRating =
        feedbacks?.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks?.length;
    }

    return autoparts;
  }

  static async delete(id: string) {
    const images = await AutopartsRepository.getImages(id);

    const autopart = await AutopartsRepository.delete(id);

    if (!autopart) {
      throw new BadRequest('Не удалось удалить запчасть!');
    }

    if (autopart) {
      images.forEach(({ image_path }) => {
        fs.unlink(path.resolve(__dirname, '..', '..', 'static', image_path), (error) => {
          if (error) {
            throw error;
          }
        });
      });
    }

    return autopart;
  }

  static async create({
    subcategoryId,
    name,
    description,
    price,
    quantity,
    discount,
    images,
    modifications,
    universal,
    attributes,
  }: Autopart) {
    const autopart = await AutopartsRepository.create(
      subcategoryId,
      name,
      description,
      price,
      quantity,
      discount,
    );

    if (!autopart) {
      throw new NotFound('Не удалось создать запчасть!');
    }

    const autopartAttributes = await AutopartsRepository.applyAttributes(autopart.id, attributes);

    if (!autopartAttributes) {
      throw new NotFound('Не удалось применить характеристики для запчасти!');
    }

    const imageNames = [];

    for (const image of Array.isArray(images) ? images : [images]) {
      let imageName = v4() + '.jpg';

      if (image) {
        image.mv(path.resolve(__dirname, '..', '..', 'static', imageName));

        imageNames.push(imageName);
      }
    }

    const autopartImages = await AutopartsRepository.applyImages(autopart.id, imageNames);

    if (!autopartImages) {
      throw new NotFound('Не удалось применить изображения!');
    }

    const autopartModifications = await AutopartsRepository.applyModifications(autopart.id, modifications);

    if (!autopartModifications) {
      throw new NotFound('Не удалось применить модификации к запчасти!');
    }

    return { autopart, autopartAttributes, autopartImages, autopartModifications };
  }
}

export default AutopartsService;
