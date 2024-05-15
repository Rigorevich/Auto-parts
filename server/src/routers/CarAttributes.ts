import { Router } from 'express';
import CarAttributesController from '../controllers/CarAttributes/CarAttributes';

const router = Router();

router.get('/brands', CarAttributesController.getCarBrands);
router.get('/models', CarAttributesController.getCarModelsByBrand);
router.get('/generations', CarAttributesController.getCarGenerationsByModel);
router.get('/engines', CarAttributesController.getCarEngines);
router.get('/modifications', CarAttributesController.getCarModifications);

export default router;
