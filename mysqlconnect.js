const mysql= require('mysql2');
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'first_name'
});

con.connect(function(err){
    
    if(err) throw err;
    console.log("server is coonected successfully");

    con.query('select * from student',function(err,result){
        if(err) throw err;
        console.log('results are here',result)  
    });
}); 
// mysql=con.cursor();
// mag="CREATE TABLE salary (st_id INT primary key auto_increment, st_name varchar(50), st_class varchar(10), st_email varchar(50)"
// mysql.execute(mag);