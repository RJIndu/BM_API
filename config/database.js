//Set up mongoose connection
const config = require('../config.json');
console.log('MongoDB config');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
.then(() => {
    console.log('connected to MONGO  DB successfully');
    console.log(mongoose.connection.host+":"+mongoose.connection.port);
 })
.catch(err => {
    console.log('connection failed ' + err);
}); 
// const mongoDBUri = 'mongodb+srv://indu:indu123@cluster0-bjksa.mongodb.net/begemart?retryWrites=true&w=majority';
// mongoose.connect(mongoDBUri,{ useNewUrlParser: true, useUnifiedTopology: true })
    
mongoose.Promise = global.Promise;

module.exports = mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/