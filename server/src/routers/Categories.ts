import { Router } from 'express';
import CatalogsController from '../controllers/Catalogs/Catalogs';
import TokenService from '../services/Auth/Token';

const router = Router();

router.post('/create', TokenService.checkAccess, TokenService.checkRole, CatalogsController.createCategory);
router.delete(
  '/delete/:id',
  TokenService.checkAccess,
  TokenService.checkRole,
  CatalogsController.deleteCategory,
);
router.get('/', CatalogsController.getAllCategories);

export default router;
