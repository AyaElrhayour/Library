import express from 'express';
import { findAll, create, findById, update, remove } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', findById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;