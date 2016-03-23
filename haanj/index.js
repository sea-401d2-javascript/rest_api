'use strict';
let S_PORT = Number(process.env.S_PORT) || require('./.config').S_PORT;
let DB_PORT = process.env.DB_PORT || require('./.config').DB_PORT;

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let mongoose = require('mongoose');
let Movie = require('./models/movie_module');
let Snack = require('./models/snack_module');

mongoose.connect(DB_PORT);

app.use(bodyParser.json());

// creates new router to hold specific routes.. allows for more modularity and cleaner code than assigning everything directly to .express()
let loginRouter = express.Router();
let userRouter = express.Router();
let movieRouter = express.Router();
let snackRouter = express.Router();
let suggestRouter = express.Router();


// pulls in the function from login.js and passes in loginRouter. Effectively assigns loginRouter the routes in login.js
require(__dirname + '/routes/login')(loginRouter);
require(__dirname + '/routes/user')(userRouter);
require(__dirname + '/routes/movies')(movieRouter);
require(__dirname + '/routes/snacks')(snackRouter);
require(__dirname + '/routes/suggest')(suggestRouter);


// /Snacks routes

// /suggest route

app.use(loginRouter);
app.use(userRouter);
app.use(movieRouter);
app.use(snackRouter);
app.use(suggestRouter);

app.listen(S_PORT, () => {
  console.log('Server started on port', S_PORT);
});
