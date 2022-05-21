const mongoose = require('./db');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const userController = require('./controller/AuthController');
var app = express();

app.use(cors());
app.use(bodyparser.json());

app.use('/user', userController);

app.listen(3000, () => { console.log("listening at port 3000 "); });