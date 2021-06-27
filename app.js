const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const bcrypt = require('bcrypt');

//const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');

const app = express();

app.use(cors());



 //app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(bodyParser.json());  //this is for handling jsons


app.use(express.static(path.join(__dirname, 'public')));



app.use('/user/signup',(req, res) => {
    const { name, email, contact, password }=req.body;
    const saltRounds=10;
    //console.log(name);
   //res.send("hiiiiiiiiiiiiii");
   bcrypt.genSalt(saltRounds,function(err,salt){
       bcrypt.hash(password,salt,function(err,hash){
           if(err){
               console.log('err');
               return res.json({message:'unable to creat new user'});
           }
           else{
           User.create({name,email,contact,password: hash }).then(()=>{
               res.status(201).json({message:'successfuly created new user'});
           }).catch(err=>res.status(403).json({success:false,error:err}))}
       });
   });
   
}
 );
sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(7000);
    })
    .catch(err=>console.log(err));