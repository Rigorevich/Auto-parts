import { Router } from 'express';

import TokenService from '../services/Auth/Token';
import UsersController from '../controllers/Users/Users';

const router = Router();

router.get('/', TokenService.checkAccess, UsersController.getAllUsers);
router.get('/:id', TokenService.checkAccess);
router.patch('/:id', TokenService.checkAccess);
router.delete('/:id', TokenService.checkAccess);

export default router;
