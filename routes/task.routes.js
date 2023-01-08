const { Router } = require('express');

const { check } = require('express-validator');

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    finishTask } = require('../controllers/task.controller');

const { taskExists, taskIsntFinished } = require('../helpers');

const { jwtValidate } = require('../middlewares');

const { validateFields } = require('../middlewares/validate-fields.mw');


/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Tasks management
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         _id:
 *           type: mongoId
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         body:
 *           type: string
 *           description: Additional information of the task
 *         date:
 *           type: date
 *           description: Date the task was created
 *         status:
 *           type: boolean
 *           description: If a task has been marked as finished (false) or not (true)
 *         user:
 *           type: mongoId
 *           description: The auto-generated id of the user who create the task
 *       example:
 *         _id: 63b8c81f8f354ed7be8f77b7
 *         title: Go to the gym!
 *         body: Go to the fucking gym!
 *         date: 2023-01-07T01:54:56.343Z
 *         status: true
 *         user: 63b8c81f8f354ed7be8h57a9
 */
const router = Router();

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get tasks.
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Tasks loaded!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.get('/', [
    jwtValidate,
    validateFields
], getTasks)

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create task.
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: Some random title
 *               body:
 *                 type: string
 *                 example: Some random additional information
 *     responses:
 *       200:
 *         description: Task has been created successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.post('/', [
    jwtValidate,
    check('title', '"title" is required.').not().isEmpty(),
    check('title', 'The title must have at least 6 length.').isLength({ min: 6 }),
    check('title', 'The title cant be higher than 30 length.').isLength({ max: 30 }),
    check('body', '"body" is required.').not().isEmpty(),
    check('body', 'The body must have at least 6 length.').isLength({ min: 6 }),
    check('body', 'The body cant be higher than 60 length.').isLength({ max: 60 }),
    validateFields
], createTask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: Title updated
 *               body:
 *                 type: string
 *                 example: Additional information updated
 *     responses:
 *       200:
 *         description: Task has been updated successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.put('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    check('title', '"title" is required.').not().isEmpty(),
    check('title', 'The title must have at least 6 length.').isLength({ min: 6 }),
    check('title', 'The title cant be higher than 30 length.').isLength({ max: 30 }),
    check('body', '"body" is required.').not().isEmpty(),
    check('body', 'The body must have at least 6 length.').isLength({ min: 6 }),
    check('body', 'The body cant be higher than 60 length.').isLength({ max: 60 }),
    validateFields
], updateTask)

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Finish task.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     responses:
 *       200:
 *         description: Task has been marked as finished successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8f77b7
 *                     title:
 *                       type: string
 *                       example: Go to the gym!
 *                     body:
 *                       type: string
 *                       example: Go to the fucking gym!
 *                     date:
 *                       type: date
 *                       example: 2023-01-07T01:54:56.343Z
 *                     status:
 *                       type: boolean
 *                       example: false
 *                     user:
 *                       type: string
 *                       example: 63b8c81f8f354ed7be8h57a9
 *       400:
 *         description: Some server error
 *
 */
router.patch('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    check('id').custom(taskIsntFinished),
    validateFields
], finishTask)

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: mongoId of the task
 *     responses:
 *       200:
 *         description: Task has been deleted successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OK
 *                 task:
 *                   type: object
 *                   $ref: "#/components/schemas/Task"
 *       400:
 *         description: Some server error
 *
 */
router.delete('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    validateFields
], deleteTask)





module.exports = router;