import { Router } from 'express';
import TokenService from '../services/Auth/Token';
import FeedbacksController from '../controllers/Feedbacks/Feedbacks';

const router = Router();

router.get('/:id', FeedbacksController.getAllFeedbacks);
router.post('/create', TokenService.checkAccess, FeedbacksController.create);
router.delete('/delete/:id', TokenService.checkAccess, FeedbacksController.delete);

export default router;
