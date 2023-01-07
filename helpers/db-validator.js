const User = require('../models/user');


const emailExists = async(email = '') => {

    const emailConflict = await User.findOne({ email });

    if (emailConflict) {
        throw new Error(`The email '${email}' is already registered.`);
    };
};

const userByIdExists = async(id = '') => {

    const userExists = await User.findById( id );
    
    if ( !userExists ) {
        throw new Error(`The id '${id}' does not exist.`);
    };
};




module.exports = {
    emailExists,
    userByIdExists
}