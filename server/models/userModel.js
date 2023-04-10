const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,trim:true},
    picture:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGMRC_3Lw0W1Nyws36Hy_oeoeCdzGTIjXXQ&usqp=CAU"},
    password:{type:String,required:true},
    fevorates:[Object],
    cart:[Object],
    address:{type:String},
    resetPasswordLinks:[Object]
})

const User = mongoose.model('user',userModel)

module.exports = User;