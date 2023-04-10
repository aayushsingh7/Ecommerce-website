const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    details:[Object],
    images:[{type:Object,required:true}],
    originalPrice:{type:Number,required:true},
    discount:{type:Number,required:true},
    discription:{type:String,required:true},
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"review"}],
    productType:{type:String,required:true},
    tags:[String],
    quantity:{type:Number,default:1},
    inStockQuantity:{type:Number},
    finalPrice:{type:Number,required:true},
    colour:{type:String},
    seller:{type:String},
    expectedDiliveryDuration:{type:Number},
    stars:{type:Number}
})

const Product = mongoose.model('product',productModel)

module.exports = Product;