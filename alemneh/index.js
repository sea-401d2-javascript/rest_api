'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser());

app.get('/ideas', (req, res) => {

});

app.post('/ideas/:id', (req, res) => {

});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
