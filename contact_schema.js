const mongoose=require('mongoose');
const contSchema= mongoose.Schema({

    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
        
    },

    message:
    {
        type:String,
        required:true
    }
    
})

const contactModel = mongoose.model('contact', contSchema)
module.exports=contactModel  
