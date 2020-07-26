const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const { check } = require('express-validator');

router.post('/register',[    
    check('email', 'Email is not valid').isEmail(),
    check('name', 'Username field is required').not().isEmpty(),
    check('password', 'Password field is required').not().isEmpty(),      
    check('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long')
], userController.create);

router.post('/authenticate',[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail()   
], userController.authenticate);

module.exports = router;