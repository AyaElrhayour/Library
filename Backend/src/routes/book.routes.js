const express = require('express')
const router = express.Router()
const bookController =   require('../controllers/book.controller');

router.get('/api/books', bookController.findAll);

router.post('/api/books', bookController.create);

router.get('/api/books/:id', bookController.findById);

router.put('/api/books/:id', bookController.update);

router.delete('/api/books/:id', bookController.delete);
module.exports = router