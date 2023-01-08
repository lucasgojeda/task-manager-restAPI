const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.mw');

const { login,
    register,
    tokenRevalidate } = require('../controllers/auth.controller');
const { jwtValidate } = require('../middlewares');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: mongoId
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *         status:
 *           type: boolean
 *           description: If a user has been deleted or not
 *       example:
 *         _id: 63b8c81f8f354ed7be8f77b7
 *         name: test 1
 *         email: test1@gmail.com
 */
const router = Router();


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login on the application.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test1@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login success!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     name:
 *                       type: string
 *                       example: test 1
 *                     email:
 *                       type: string
 *                       example: test1@test.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjhjODFmOGYzNTRlZDdiZThmNzdiNyIsImlhdCI6MTY3MzE5NTI0NiwiZXhwIjoxNjczMjA5NjQ2fQ.fJEomtqUlwee4L07tdBu2YWOzkOz9snR6RrvpjAzvTc
 *       400:
 *         description: Some server error
 *
 */
router.post('/login', [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'The email must have at least 6 length.').isLength({ min: 6 }),
    check('email', 'The email cant be higher than 30 length.').isLength({ max: 30 }),
    check('email', 'Must be a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'The password must have at least 4 length.').isLength({ min: 4 }),
    check('password', 'The password cant be higher than 16 length.').isLength({ max: 16 }),
    validateFields
], login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Sign in on the application.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: test 1
 *               email:
 *                 type: string
 *                 example: test1@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Register success!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     name:
 *                       type: string
 *                       example: test 1
 *                     email:
 *                       type: string
 *                       example: test1@test.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjhjODFmOGYzNTRlZDdiZThmNzdiNyIsImlhdCI6MTY3MzE5NTI0NiwiZXhwIjoxNjczMjA5NjQ2fQ.fJEomtqUlwee4L07tdBu2YWOzkOz9snR6RrvpjAzvTc
 *       400:
 *         description: Some server error
 *
 */
router.post('/register', [
    check('name', 'Name is required.').not().isEmpty(),
    check('name', 'The name must have at least 1 length.').isLength({ min: 1 }),
    check('name', 'The name cant be higher than 16 length.').isLength({ max: 16 }),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'The email must have at least 6 length.').isLength({ min: 6 }),
    check('email', 'The email cant be higher than 30 length.').isLength({ max: 30 }),
    check('email', 'Must be a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'The password must have at least 4 length.').isLength({ min: 4 }),
    check('password', 'The password cant be higher than 16 length.').isLength({ max: 16 }),
    validateFields
], register);

/**
 * @swagger
 * /auth/renew:
 *   get:
 *     summary: Renew the access token.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success to renew access token!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     name:
 *                       type: string
 *                       example: test 1
 *                     email:
 *                       type: string
 *                       example: test1@test.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjhjODFmOGYzNTRlZDdiZThmNzdiNyIsImlhdCI6MTY3MzE5NTI0NiwiZXhwIjoxNjczMjA5NjQ2fQ.fJEomtqUlwee4L07tdBu2YWOzkOz9snR6RrvpjAzvTc
 *       400:
 *         description: Some server error
 *
 */
router.get('/renew', [
    jwtValidate,
    validateFields
], tokenRevalidate);

module.exports = router;