'use strict';

module.exports = exports = function(req, res, next) {
  try {
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(method);
    console.log(name);
    console.log(password);
    req.body.name = name;
    req.body.password = password;
    return next();
  } catch(e) {
    console.log(e);
  }
  res.status(401).json({msg: 'could not authenticate'});
};
