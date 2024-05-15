import { Router } from 'express';
import CatalogsController from '../controllers/Catalogs/Catalogs';
import TokenService from '../services/Auth/Token';

const router = Router();

router.post(
  '/create',
  TokenService.checkAccess,
  TokenService.checkRole,
  CatalogsController.createSubcategory,
);
router.delete(
  '/delete/:id',
  TokenService.checkAccess,
  TokenService.checkRole,
  CatalogsController.deleteSubcategory,
);
router.get('/', CatalogsController.getSubcategoriesByCategoryId);

export default router;
