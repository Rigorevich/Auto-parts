import { Router } from 'express';
import AuthController from '../controllers/Auth/Auth';
import AuthValidator from '../validators/Auth';

const router = Router();

router.post('/signin', AuthValidator.signIn, AuthController.signIn);
router.post('/signup', AuthValidator.signUp, AuthController.signUp);
router.post('/logout', AuthValidator.logOut, AuthController.logOut);
router.post('/refresh', AuthValidator.refresh, AuthController.refresh);

export default router;
