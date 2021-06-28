
  const bcrypt = require('bcrypt');
  const User = require('../models/user');
  const sequelize = require('../util/database');

  exports.postSignin = (req, res, next) => {
    //console.log(req);
    //res.send("hiiiiiiiiiiiiii");
    console.log(req.body);
   
  };
  exports.postSignup = (req, res, next) => {
      
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
 
   
  };