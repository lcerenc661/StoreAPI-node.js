const jwt = require('jsonwebtoken');

const secret = 'myCat';  //Secret is used to encrypt the headers and the payload, so it's very important! SHOULD BE AN ENV VARIABLE.
const payload = {
  sub:1, // required
  role: 'customer'
}

function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret)
console.log(token);
