'use strict';
let express = require('express');
let mongoose = require('mongoose');
let app = express();
let bodyParser = require('body-parser');
let ideasRouter = express.Router();
let studentsRouter = express.Router();
mongoose.connect('mongodb://localhost:27017/ideas');
require('./routes/ideas-routes')(ideasRouter);
require('./routes/students-routes')(studentsRouter);

app.use(bodyParser.json());
app.use('/', ideasRouter);
app.use('/', studentsRouter);





app.listen(3000, () => {
  console.log('Server running on port 3000');
});
