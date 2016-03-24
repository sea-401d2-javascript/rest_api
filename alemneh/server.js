'use strict';
let express = require('express');
let app = express();
let db = require('./models');
let bodyParser = require('body-parser');
let ideasRouter = express.Router();
let statsRouter = express.Router();
let studentsRouter = express.Router();

require('./routes/ideas-routes')(ideasRouter, db);
require('./routes/stats-routes')(statsRouter, db);
require('./routes/students-routes')(studentsRouter, db);


app.use(bodyParser.json());
app.use('/students', ideasRouter);
app.use('/', statsRouter);
app.use('/', studentsRouter);





app.listen(3000, () => {
  console.log('Server running on port 3000');
});
