const mongoose = require('mongoose')

const reviewModel = new mongoose.Schema({
   user:{name:String,picture:String},
   heading:{type:String,required:true},
   stars:{type:Number},
   body:{type:String},
   helpfull:{type:Number,default:0},
   img:{type:String}
})

const Review = mongoose.model('review',reviewModel)

module.exports = Review;