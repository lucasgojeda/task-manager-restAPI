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


const router = Router();

router.get('/', [
    jwtValidate,
    validateFields
], getTasks)

router.post('/', [
    jwtValidate,
    check('title', '"name" is required.').not().isEmpty(),
    check('title', 'The title must have at least 1 length.').isLength({ min: 1 }),
    check('title', 'The title cant be higher than 16 length.').isLength({ max: 16 }),
    check('body', '"body" is required.').not().isEmpty(),
    check('body', 'The body must have at least 1 length.').isLength({ min: 1 }),
    check('body', 'The body cant be higher than 30 length.').isLength({ max: 30 }),
    validateFields
], createTask);

router.put('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    check('title', '"name" is required.').not().isEmpty(),
    check('title', 'The title must have at least 1 length.').isLength({ min: 1 }),
    check('title', 'The title cant be higher than 16 length.').isLength({ max: 16 }),
    check('body', '"body" is required.').not().isEmpty(),
    check('body', 'The body must have at least 1 length.').isLength({ min: 1 }),
    check('body', 'The body cant be higher than 30 length.').isLength({ max: 30 }),
    validateFields
], updateTask)

router.patch('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    check('id').custom(taskIsntFinished),
    validateFields
], finishTask)

router.delete('/:id', [
    jwtValidate,
    check('id', 'The id is not a valid mongo id.').isMongoId(),
    check('id').custom(taskExists),
    validateFields
], deleteTask)





module.exports = router;