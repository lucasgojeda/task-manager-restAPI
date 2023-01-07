

const dbValidator = require('./db-validator');
const jwtGenerate = require('./jwt-generate');
const taskExists = require('./task-exists');
const taskIsntFinished = require('./task-isnt-finished');
const sortArrays = require('./sort-arrays');


module.exports = {
    ...dbValidator,
    ...jwtGenerate,
    ...taskExists,
    ...taskIsntFinished,
    ...sortArrays,
}