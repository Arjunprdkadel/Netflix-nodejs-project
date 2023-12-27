//*************common codes*********************//
const express=require('express');
const app=express();
const router=express.Router();
//*************common codes*********************//

const conn = require('./dbconnection');
const userModel= require('./model/user_schema');
const loginModel=require('./model/login_schema');
const contactModel=require('./model/contact_schema');
const addProductModel=require('./model/product_Schema');
const multer=require('multer');
const dotenv = require("dotenv");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');


app.use(cookieParser());
app.use(session({key:'user_sid',
                 secret:'secret',
                 resave:false,
                saveUninitialized:false,
            cookie:{
                expires:600000,
                   },
            })
       );
   
//*************common codes*********************//
 app.set('view engine','ejs');
 app.use(express.static('views'))
 app.use(express.static('dashboard'))
 app.use(express.static('upload'))
//  app.use(require('./middleware/aunthenticate'));//authentication file******
//*************common codes*********************//

 app.use(bodyParser.urlencoded({extended:true}));

//*************VIEWS FILE :- GET ROUTERS STARTED HERE*********************//
router.get('/',function(req,res){
    res.render('home');
});//home page

router.get('/contact',function(req,res){
    res.render('contact');
});//this is contact page

router.get('/register',function(req,res){
    res.render('register');
});//this is register page

router.get('/login',function(req,res){
    res.render('login');
});//this is login page
//*************VIEWS FILE :- GET ROUTERS ENDED HERE*********************//


//************DASHBOARD FILE :- GET ROUTERS STARTED HERE****************//
router.get('/adminlogin', (req,res)=>{
    res.render('dashboard/index');
}); // admin login page

router.get('/welcome', (req,res)=>{
    res.render('dashboard/welcome')
});// welcome page 

router.get('/addproduct', (req,res)=>{
    res.render('dashboard/addproduct');
});//add product page

 router.get('/dashboard/editcontact',(req,res)=>{
    res.render('dashboard/editcontact')
});//edit contact page

router.get('/header', (req,res)=>{
    res.render('dashboard/header')
});//Dashboard Page
//************DASHBOARD FILE :- GET ROUTERS ENDED HERE******************//


//******** EDIT VIEWREGISTER CODE STARTED HERE **********//
router.get('/edit_form/:id',(req,res)=>{
    let data = req.params.id;
    console.log(data);
    Update_Model.findOne({name:data})
    .then((x)=>{
        res.render('dashboard/Edit_form')
        console.log(x)
})
     });
//******** EDIT VIEWREGISTER CODE ENDED  HERE **********//

// ******** REGISTRATION CODE STARTED HERE ***********//
router.post('/register',(req,res)=>{
    var register=new userModel({
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        address:req.body.address,
        password:req.body.password,
    })
    register.save().then(()=>{
        console.log("The given datas have been saved successfull in database(Mongoose atlas)");
    })
    .catch((err)=>{
        console.log(err);
    })
});
// ******** REGISTRATION CODE ENDED HERE ***********//

//***********POST CONTACT CODE STARTED HERE*************//
router.post('/contact',(req,res)=>{
    var contacts=new contactModel({
        name:req.body.name,
        email:req.body.email,
        mob:req.body.mob,  
        message:req.body.message
    })
    contacts.save()
    .then(()=>{
        console.log("Contact data saved successfully....");
    })
    .catch((err)=>{
        console.log(err);
    })
});
//***********POST CONTACT CODE ENDED HERE*************//
//**********EDIT CONTACT CODE STARTED HERE ***********//
router.get("/edit2/:id", async (req,res)=>{  
    try{
        const edata=await contactModel.findById(req.params.id);
        console.log(edata);
        res.render('dashboard/editcontact',{edata:edata});
    }
    catch(err){
        console.log(err);
    }
});
//**********EDIT CONTACT CODE ENDED HERE ***********//
//*************UPDATE OFF VIEW CONTACT CODE STARTED HERE***************//
router.post('/edit2/:id' , async(req,res)=>{
    try{
        let udata={
            name:req.body.name,
            email:req.body.email,
            message:req.body.message
        };
        let updateContact=await contactModel.findByIdAndUpdate(req.params.id , udata);
        console.log(updateContact);
        res.redirect('/viewcontacts');
    }
    catch(err){
        console.log(err);
    }
});
//*************UPDATE OFF VIEW CONTACT CODE STARTED HERE***************//

// ***********ADDPRODUCT CODE STARTED HERE***********//
const storage=multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, './upload');
    },
    filename:function(req, file ,cb){
        cb(null , file.originalname);
        //cb(null , uuidv4() +'-'+ Date.now() + path.extname(file.originalname)) //Apending jpg

    }
});

const fileFilter= (req,file , cb)=>{
    const allowedFileType=['image/jpeg' , 'image/jpg' , 'image/png' , 'image/webp'];
    if(allowedFileType.includes(file.mimetype)){
        cb(null , true);
    }
    else{
        cb(null, false)
    }
}

let upload=multer({storage , fileFilter});
router.post('/addproduct', upload.single('product_image'),(req,res)=>{
    var addproducts=new addProductModel({
        product_image:req.file.filename,
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_description:req.body.product_description        
    });
    addproducts.save().then(()=>{
        console.log("Product added succesfully....");
    })
    .catch((err)=>{
        console.log(err); 
    }) 
 
});
// ***********ADDPRODUCT CODE ENDED HERE***********//


//*********VIEWREGISTER CODE STARTED HERE*********//
router.get("/viewregister",async (req, res)=>{
    if(req.session.user && req.cookies.user_sid){
    try{
        const registerdata = await userModel.find({});
        res.render('dashboard/viewregister',{registerdata:registerdata})
        console.log(registerdata);

    }catch(err){
        console.log(err);
    }
}else{
    res.redirect('/adminlogin')
} 
});
//*********VIEWREGISTER CODE ENDED HERE*********//

// *********VIEWCONTACT CODE STARTED HERE************//
router.get('/viewcontacts', async (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        try{
            const contactdata= await contactModel.find({});
            res.render('dashboard/viewcontacts',{contactdata:contactdata});
            console.log(contactdata)
        }catch(err){
            console.log(err);
        }
    }else{
        res.redirect('/adminlogin')
    }
})
// *********VIEWCONTACT CODE ENDED HERE************//


//*********VIEWPRODUCT CODE STARTED HERE***************//
router.get("/viewproduct", async (req, res)=>{
    if(req.session.user && req.cookies.user_sid){
    try{
        const productdata = await addProductModel.find({});
        res.render('dashboard/viewproduct',{productdata:productdata})
        console.log(productdata);

    }catch(err){
        console.log(err); }
    }else{
        res.redirect('/adminlogin')
    }    
});
//*********VIEWPRODUCT CODE ENDED HERE***************//
//********PRODUCT LIST*********//
router.get("/productl", async (req, res)=>{
    if(req.session.user && req.cookies.user_sid){
    try{
        const productdata = await addProductModel.find({});
        res.render('dashboard/productl',{productdata:productdata})
        console.log(productdata);

    }catch(err){
        console.log(err); }
    }else{
        res.redirect('/adminlogin')
    }    
});


//************DELETE CODE STARTED HERE*****************//
router.get("/deleteproduct/:id",async (req,res)=>{
    try{
        const data = await addProductModel.findByIdAndRemove(req.params.id);
        res.redirect('/viewproduct');
        }catch(err){
            console.log(err);
    }
});
//************DELETE CODE ENDED HERE*****************//


//****** EDIT FOR VIEW PRODUCT CODE STARTED HERE********//
router.get("/editP/:id", async (req,res)=>{  
    try{
        const pdata=await addProductModel.findById(req.params.id);
        console.log(pdata);
        res.render('dashboard/editproduct',{pdata:pdata});
    }
    catch(err){
        console.log(err);
    }
});
//****** EDIT FOR VIEW PRODUCT CODE ENDED HERE********//


//********UPDATE OFF VIEWPRODUCT CODE STATED HERE**********//
router.post('/editP/:id' , async(req,res)=>{
    try{
        let updateP={
            product_name:req.body.product_name,
            product_price:req.body.product_price,
            product_description:req.body.product_description
        };
         let updateProduct=await addProductModel.findByIdAndUpdate(req.params.id , updateP);
        console.log(updateProduct);
        res.redirect('/viewproduct');
    }
    catch(err){
        console.log(err);
    }
});
//********UPDATE OFF VIEWPRODUCT CODE ENDED HERE**********//

var sessionChecker = (req,res,next)=>{
    if(req.session.userModel && req.cookies.id){
        res.redirect('/welcome');
    }else{
        next();
    }
};
       
//******LOGIN FOR DASHBOARD****** user validation//

router.post('/adminlogin',async (req,res)=>{
    var email=req.body.email;
    password=req.body.password;

    try{
        var user=await userModel.findOne({email:email})
        .exec();
        console.log(user);
        if(!user){
            res.redirect('/adminlogin');
        }
        //res.redirect('/welcome');
        user.comparePassword(password,
            (error,match)=>{
                if(!match){
                    res.redirect('/adminlogin');
                }
            });
            req.session.user=user; 
            //console.log(req.session.user)
            res.redirect('/'); //welcome tha
    }
    catch(error){
        console.log(error)
    }
});

router.get('/welcome', function(req,res){
    if(req.session.user && req.cookies.user_sid){
        res.render("welcome");
    }
    else{
        res.redirect("/adminlogin");
    }
});

router.get("/logout",(req,res)=>{
    if(req.session.userModel && req.cookies.id){
        res.clearCookie('id');
        res.render('index');
    }else{
        res.redirect('/adminlogin')
    }
});

router.get('show/:id',function(req,res){
    console.log(req.params.id);
     User.findById(req.params.id, function(err, data){
         if (err){
             console.log(err);
         }else{
             console.log(data);
             res.render('show',{data:data});
         }
     });
 })


router.get('/')

//*************COMMON CODES STARTED HERE*********************//
app.use('/assets',express.static('assets'));//it connect css file.
app.use('/',router);
app.listen(5240,()=>{
    console.log('The server is started!,Plz run port no 5240 on local host to check.')
});
//*************COMMON CODES ENDED HERE*********************//




