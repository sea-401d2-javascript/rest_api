'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let User = require('./models/user_model');
let Course = require('./models/class_model');
let auth = require('./lib/authentication');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

// The extended config object key now needs
// to be explicitly passed, since it now has no default value.
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// *** Users ***
app.post('/users', auth, (req, res) => {
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    res.json(user);
  });
});

app.get('/users', auth, (req, res) => {
  User.find({}, (err, users) => {
    res.json({data: users});
  });
});

app.get('/users/:id', auth, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);      
    }
  });
});

app.put('/users/:id', auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return res.send(err);
    console.log('Updated: ', user  );
    res.json(user);
  });
});

app.delete('/users/:id', auth, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send(err);
    user.remove((err, user) => {
      res.json({'message': 'user removed'});
    });
  });
});

// *** Classes ***

// Displays all overloaded courses
app.get('/courses/overload', (req, res) => {
  Course.find({$where: 'this.enrollment > this.maxEnroll'}, (err, course) => {
    res.json(course);
  });
});

app.post('/courses', (req, res) => {
  var newCourse = new Course(req.body);
  newCourse.save((err, course) => {
    res.json(course);
  });
});

app.post('/courses', (req, res) => {
  var newCourse = new Course(req.body);
  newCourse.save((err, course) => {
    res.json(course);
  });
});

app.get('/courses', (req, res) => {
  Course.find({}, (err, courses) => {
    res.json({data: courses});
  });
});

app.get('/courses/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    res.json(course);
  });
});

app.put('/courses/:id', (req, res) => {
  Course.findByIdAndUpdate(req.params.id, req.body, (err, course) => {
    if (err) return res.send(err);
    res.json(course);
  });
});

app.delete('/courses/:id', (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) return res.send(err);
    course.remove((err, course) =>{
      res.json({message: 'course removed'});
    });
  });
});

app.post('/login', (req, res) => {

    let authorizationArray = req.headers.authorization.split(' ');
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    // parse based on basic or whatever method
    User.find({name: name}, (err, user) => {
      if (user.length == 0) {
        return res.json({status: 'failure', message: 'Invalid username!'});
      }
      let valid = user[0].compareHash(password);
      if (!valid) {
        return res.json({status: 'failure', message: 'Invalid password!'});
      }
      // generate and return the token
      var myToken = user[0].generateToken();
      res.json({message: 'Welcome, ' + name, token: myToken});
    }) ;
  });

app.listen(3000, () =>{
  console.log('Server started on 3000');
});















/*
app.put('/villains/:id', (req, res) => {
  db.villains[req.params.id] = req.body;
  res.json({
    status: true,
    data: db.villains[req.params.id]
  });
});
/*




//puts in all requests
// app.use((req, res, next) => {
//   console.log('request logged');
//   next();
// });

app.use(function(req, res, next) {
  try {
    console.log('Im here!');
    bodyParser.json();
  }
  catch(err) {
    console.log('Error parsing!')
  }
  next();
});
// app.use(bodyParser.json());
//var jsonParser = bodyParser.json();



app.get('/villains/:id', (req, res) => {
  let villain = db.villains[req.params.id];
  res.json({
    status: true,
    data:villain
  });
});

function CBS(req, res) {
  console.log('CBS rebuilt it!');
} 

app.get('/startrek', (req, res, next) => {
  console.log('Star Trek is a hit!');
  next();
}, (req, res, next) => {
  console.log('JJ Abrams destroyed the universe!');
  next();
}, CBS);



// curl -X POST -H 'Content-type: application/json' --data '{"name":"Kahn"}' http://localhost:3000/villains

app.post('/villains', (req, res) => {

  // console.log(req);
  if (!req.body) {
    console.log(400);
  }
  db.villains.push(req.body);
  let villain = req.body ;
  res.json({
    status: true,
    data:villain
  });
  console.log(db);
});
app.put('/villains/:id', (req, res) => {
  db.villains[req.params.id] = req.body;
  res.json({
    status: true,
    data: db.villains[req.params.id]
  });
});

/*
dateRouter.route('/dates/:id')
  .all((req, res, next) => {
    req.villain = db.penguins[req.params.id]
  })
  .get((req, res) => {
    res.json(db.penguins)
  })
  .put((req, res) => {

  })

  dateRouter.get('/dates/:id', (req, res) => {
  
  })

  app.use('/', penguinRouter)

*/
