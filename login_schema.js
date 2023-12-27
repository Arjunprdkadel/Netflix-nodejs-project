const mongoose=require('mongoose');
const logSchema= mongoose.Schema({

    mail:
    {
        type:String,
        required:true
    },
   
    password:{
        type:String,
        required:true
    }
    
    
})

const loginModel = mongoose.model('login', logSchema)
module.exports=loginModel;  
