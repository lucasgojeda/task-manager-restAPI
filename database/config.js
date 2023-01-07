const mongoose = require('mongoose');


// const mongoUrl = 'mongodb://localhost:27017/Eccomerce-app';
const mongoUrl = process.env.MONGODB_CNN;

const dbConnection = async() => {
    try {
        
        await mongoose.connect( mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Online database');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse con la base de datos');
    };
};


module.exports = {
    dbConnection
}