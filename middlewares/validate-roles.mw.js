const { request, response } = require("express");
const { User } = require("../models");


const isAdminRole = ( req = request, res = response, next ) => {

    if( !req.user ){
        return res.status(500).json({
            msg: 'You want to validate the role without verifying the token first'
        });
    };
    const {role, name} = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `The user '${name}', is not an administrator - role not authorized`
        });
    };

    next();
};

const isRole = ( ...roles ) => {
    return async( req = request, res = response, next ) => {

        try {
            const user = await User.findById(req.user.id)

            if( !user){
                return res.status(401).json({
                    msg: `The user with id: ${req.user.id} doesn't exist`
                })
            }
            
            const { role } = user;
    
            if( !roles.includes( role )){
                return res.status(401).json({
                    msg: `User unauthorized`
                })
            }
            
            next();
            
        } catch (error) {
            console.log(error);
        }

    }
}



module.exports = {
    isAdminRole,
    isRole
};