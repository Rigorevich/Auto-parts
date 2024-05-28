import AccountRepository from '../../repositories/Auth/Account';
import FeedbacksRepository from '../../repositories/Autoparts/Feedbacks';
import { NotFound, BadRequest } from '../../utils/Errors';

class FeedbacksService {
  static async getAllFeedbacks(id: string, sortBy?: 'rating' | 'default') {
    const feedbacks = await FeedbacksRepository.getAllFeedbacks(id, sortBy);

    if (!feedbacks) {
      throw new NotFound('Отзывы не найдены!');
    }

    for (const feedback of feedbacks) {
      const account = await AccountRepository.getAccountDataById(Number(feedback.account_id));

      feedback.account = account;
    }

    const averageRating =
      feedbacks.map((feedback) => feedback.rating).reduce((sum, rating) => sum + rating, 0) /
      feedbacks.length;

    return { feedbacks, averageRating };
  }

  static async create(autopartId: string, accountId: string, rating: string, feedbackMessage: string) {
    if (!autopartId || !accountId || !rating || !feedbackMessage) {
      throw new BadRequest('Необходимо заполнить все поля!');
    }

    const feedback = await FeedbacksRepository.create(autopartId, accountId, Number(rating), feedbackMessage);

    if (!feedback) {
      throw new BadRequest('Не удалось оставить отзыв!');
    }

    return feedback;
  }

  static async delete(id: string) {
    const feedback = await FeedbacksRepository.delete(id);

    if (!feedback) {
      throw new NotFound('Не удалось удалить отзыв!');
    }

    return feedback;
  }
}

export default FeedbacksService;
