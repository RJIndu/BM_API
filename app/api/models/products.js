const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    categoryid:{type:String,required:true},
    title:{type:String,required:true},
    brand:{type:String,required:false},
    description:{type:String,required:false},
    price_mrp:{type:String,required:true},  
    price:{type:Number,required:true},    
    imagePath:{type:Array,required:false},
    available_size:{type:Array,required:false},
    available_colors:{type:Array,required:false},
    unitsInStock:{type:Number,required:false}, 
    setminorder:{type:Number,required:false}, 
    product_available:{type:Boolean,required:false},    
    createdon:{type:Date,required:false} ,
    updatedon:{type:Date,required:false} 
});

module.exports = mongoose.model('Products', ProductsSchema)