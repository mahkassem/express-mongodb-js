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
import { authed } from '../security/auth.middleware.js';

const router = Router();

router.get('', getAll);
router.get('/:id', getById);
router.post('', authed, validateCreate, create);
router.put('/:id', authed, validateUpdate, update);
router.delete('/:id', authed, validateUpdate, remove);

export default router;