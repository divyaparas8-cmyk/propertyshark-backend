import { Router } from 'express';
import { propertyController } from '../controllers/propertyController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { bblParamSchema, searchQuerySchema } from '../validators/propertyValidator.js';

const router = Router();

router.get('/search', validate(searchQuerySchema, 'query'), propertyController.search);
router.get('/:bbl', validate(bblParamSchema, 'params'), propertyController.getByBBL);

export default router;
