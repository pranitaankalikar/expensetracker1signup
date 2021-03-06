const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


//const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');


const userRoutes = require('./routes/user');

const app = express();

app.use(cors());



 //app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(bodyParser.json());  //this is for handling jsons


app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRoutes);


sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(7000);
    })
    .catch(err=>console.log(err));