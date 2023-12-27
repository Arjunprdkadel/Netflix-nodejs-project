const mongoose=require('mongoose');
const productSchema= mongoose.Schema({

    product_image:
    {
        type:String,
     required:true
    },

    product_name:
    {
        type:String,
        // required:true
    },
    product_price:
    {
        type:String,
        // required:true
        
    },
    product_description:
    {
        type:String,
        // required:true
    }
   
    
})

const addProductModel = mongoose.model('addproduct', productSchema)
module.exports=addProductModel;
