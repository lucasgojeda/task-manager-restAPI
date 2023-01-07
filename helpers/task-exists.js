const { Task } = require("../models");


const taskExists = async(id = '') => {

    const taskExists = await Task.findById( id );
    
    if ( !taskExists ) {
        throw new Error(`The task with id: '${id}' does not exist.`);
    };
};

module.exports = {
    taskExists
}