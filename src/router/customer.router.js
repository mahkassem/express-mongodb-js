import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controllers/customer.controller.js';
import {
  validateCreate,
  validateUpdate
} from '../validations/customer.validations.js';

const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', validateCreate, create);
router.put('/:id', validateUpdate, update);
router.delete('/:id', validateUpdate, remove);

export default router;