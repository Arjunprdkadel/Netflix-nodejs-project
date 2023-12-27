const mysql=require('mysql2');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    passward:"",
    database:'vscube '
});
con.connect(function(err){
    if(err)throw err;
    console.log('server connected');

con.query('seclect * from marks',function(err,result){
    if(err) throw err;
    console.log('results is here',result);
});    
});
