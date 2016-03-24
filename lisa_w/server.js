'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = module.exports = exports = express();

var port = process.env.PORT || 6000;
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);
let router = express.Router();

//middleware
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:6000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

require('./routes/arcade-route')(router);
require('./routes/game-route')(router);
const userRouter = require(__dirname + '/routes/user-routes');
const authRouter = require(__dirname + '/routes/auth-routes');


app.use('/api', router);
app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port);
console.log('Magic is happening on port ' + port);
