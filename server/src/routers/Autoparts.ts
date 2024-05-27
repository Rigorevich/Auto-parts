import { Router } from 'express';

import TokenService from '../services/Auth/Token';
import AutopartsController from '../controllers/Autoparts/Autoparts';

const router = Router();

router.get('/', AutopartsController.getAutopartsWithPagination);
router.get('/:id', AutopartsController.getAutopartById);
router.post('/create', TokenService.checkAccess, TokenService.checkRole, AutopartsController.create);
router.put('/update/:id', TokenService.checkAccess, TokenService.checkRole);
router.delete('/delete/:id', TokenService.checkAccess, TokenService.checkRole, AutopartsController.delete);

export default router;
