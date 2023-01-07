const validateFields = require('./validate-fields.mw');
const jwtValidate = require('./validate-jwt.mw');
const validateRoles = require('./validate-roles.mw');




module.exports = {
    ...validateFields,
    ...jwtValidate,
    ...validateRoles,
}