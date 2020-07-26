const express = require('express');
const router = express.Router();
const categoriesController = require('../app/api/controllers/categories');
const { check } = require('express-validator');

router.get('/', categoriesController.getAll);
router.post('/',[    
    check('name', 'name is required').not().isEmpty()  
], categoriesController.create);
router.get('/:categoryId', categoriesController.getById);
router.put('/:categoryId', categoriesController.updateById);
router.delete('/:categoryId', categoriesController.deleteById);

module.exports = router;