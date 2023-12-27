const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
const editSchema= Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Update_Model = mongoose.model('Update_form',editSchema)
module.exports=Update_Model
