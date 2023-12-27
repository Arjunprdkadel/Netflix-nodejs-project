const mongoose= require('mongoose');
const conn = mongoose.connect("mongodb+srv://rohan:rabbitcat@cluster0.wuhmurf.mongodb.net/employees?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('The connection is connected successfully...'))
.catch((err)=>console.log('There is something error'));

module.exports = conn;
