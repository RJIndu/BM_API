const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CategorySchema = new Schema({   
    name:{type:String,required:true},
    active:{type:Boolean,required:false},
    parentid:{type:String,required:false},    
    level:{type:Number,required:false},      
    createdon:{type:Date,required:false} ,
    updatedon:{type:Date,required:false} 
});

module.exports = mongoose.model('Categories', CategorySchema)