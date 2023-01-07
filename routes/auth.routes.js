const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.mw');

const { login,
    register,
    tokenRevalidate } = require('../controllers/auth.controller');
const { jwtValidate } = require('../middlewares');


const router = Router();

router.post('/login', [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'The email must have at least 1 length.').isLength({ min: 1 }),
    check('email', 'The email cant be higher than 30 length.').isLength({ max: 30 }),
    check('email', 'Must be a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'The password must have at least 1 length.').isLength({ min: 1 }),
    check('password', 'The password cant be higher than 16 length.').isLength({ max: 16 }),
    validateFields
], login);

router.post('/register', [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'The email must have at least 1 length.').isLength({ min: 1 }),
    check('email', 'The email cant be higher than 30 length.').isLength({ max: 30 }),
    check('email', 'Must be a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'The password must have at least 1 length.').isLength({ min: 1 }),
    check('password', 'The password cant be higher than 16 length.').isLength({ max: 16 }),
    validateFields
], register);

router.get('/renew', [
    jwtValidate,
    validateFields
], tokenRevalidate);



module.exports = router;