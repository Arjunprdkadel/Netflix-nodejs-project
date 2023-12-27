const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const registerSchema= mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true 
    },
    address :{
        type:String,
        required:true
    }
     
//active:boolean,
//date:{
//    type:Date,
//    default:Date.nows
//    }    
}) 
//*********ENCRYPT USERS PASSWARD ***********//

registerSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12);
    }
    next();
});   

registerSchema.methods.comparePassword = function(plaintext, callback){
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};
//**********CREATE COLLECTION OR MODAL HERE************//
const userModel = mongoose.model('register',registerSchema)
module.exports=userModel;   