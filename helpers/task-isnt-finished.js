const { Task } = require("../models");


const taskIsntFinished = async(id = '') => {

    const task = await Task.findById( id );
    
    if ( !task.status ) {
        throw new Error(`The task with id: '${id}' is already marked as finished.`);
    };
};

module.exports = {
    taskIsntFinished
}