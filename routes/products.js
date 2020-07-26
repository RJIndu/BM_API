const express = require('express');
const router = express.Router();
const productsController = require('../app/api/controllers/products');
const { check } = require('express-validator');

router.get('/', productsController.getAll);
router.post('/',[    
    check('title', 'title is required').not().isEmpty(),
    check('price', 'price is required').not().isEmpty()    
], productsController.create);
router.get('/:productId', productsController.getById);
router.put('/:productId', productsController.updateById);
router.delete('/:productId', productsController.deleteById);

module.exports = router;