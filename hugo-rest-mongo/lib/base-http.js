'use strict';

let noBuffer = require('../lib/no-buffer.js');

module.exports = exports = function(req, res, next) {
  try {
    var authString = req.headers.authorization;
    console.log('req headers auth is: ', req.headers.authorization);
    var base64String = authString.split(' ')[1];
    var authBuf = new Buffer(base64String, 'base64');
    var utf8AuthString = authBuf.toString();
    var authArr = utf8AuthString.split(':');
    noBuffer(authBuf);
    if (authArr[0].length && authArr[1].length) {
      req.baseHTTP = {
        name: authArr[0],
        password: authArr[1]
      };
      return next();
    }
  } catch (err) {
    console.log(err);
  }
  res.status(401).json({msg: 'unable to authenticate'});
}
