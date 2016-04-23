var webtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var decoded;
  try {
    var token = req.headers.token;
    console.log('token:', token); 
    decoded = webtoken.verify(token, 'CHANGE ME');
    console.log('decoded:', decoded);
    req.decodedToken = decoded;
    next();
  } catch (err) {
    return res.status(418).json({msg: 'I am a teapot and you are not authorized'});
  }
}