import { Response, Request } from 'express';

import ErrorsUtils from '../../utils/Errors';

import FeedbacksService from '../../services/Feedbacks/Feedbacks';

class FeedbacksController {
  static async getAllFeedbacks(req: Request, res: Response) {
    const { id } = req.params;
    const { sortBy } = req.query;

    try {
      const feedbacks = await FeedbacksService.getAllFeedbacks(id, sortBy as 'rating' | 'default');

      return res.status(200).json({ result: { ...feedbacks } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async create(req: Request, res: Response) {
    const { autopartId, accountId, rating, feedback: feedbackMessage } = req.body;

    try {
      const feedback = await FeedbacksService.create(autopartId, accountId, rating, feedbackMessage);

      return res.status(201).json({ result: { feedback } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const feedback = await FeedbacksService.delete(id);

      return res.status(201).json({ result: { feedback } });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
}

export default FeedbacksController;
