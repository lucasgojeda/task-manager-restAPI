const jwt = require('jsonwebtoken');


const jwtGenerate = ( id = '' ) => {
    
    return new Promise( (resolve, reject) => {

        const payload = { id }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {

            expiresIn: '4h'

        }, (err, token) => {

            if(err){
                console.log(err);
                reject( 'Failed to generate token' );
            } else{
                resolve( token )
            }
        })
    })
};


module.exports = {
    jwtGenerate
};