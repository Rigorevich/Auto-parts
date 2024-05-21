import { Router } from 'express';
import CarAttributesController from '../controllers/CarAttributes/CarAttributes';

const router = Router();

router.get('/brands', CarAttributesController.getCarBrands);
router.get('/models', CarAttributesController.getCarModelsByBrand);
router.get('/generations', CarAttributesController.getCarGenerationsByModel);
router.get('/engines', CarAttributesController.getCarEnginesByGenerationId);
router.get('/body-types', CarAttributesController.getCarBodyTypesByGenerationId);
router.get('/modifications', CarAttributesController.getCarModifications);
router.get('/car', CarAttributesController.getCarByModificationId);

export default router;
