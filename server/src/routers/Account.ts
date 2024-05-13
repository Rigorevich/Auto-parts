import { Router } from 'express';

import AccountController from '../controllers/Accounts/Accont';
import TokenService from '../services/Auth/Token';

const router = Router();

router.get('/', TokenService.checkAccess, AccountController.getAccountsWithPagination);
router.get('/:id', TokenService.checkAccess, AccountController.getAccountData);
router.patch('/:id', TokenService.checkAccess, AccountController.updateAccountData);
router.delete('/:id', TokenService.checkAccess, AccountController.deleteAccount);

export default router;
