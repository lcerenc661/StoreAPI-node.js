const jwt = require('jsonwebtoken');

const secret = 'myCat'; //Secret is used to encrypt the headers and the payload, so it's very important! SHOULD BE AN ENV VARIABLE.
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5Mzk0NTIyOH0.DPMEa12VcBG2NHc3YS9eFYmgY7xfiFT4tTpYYw1w8iY';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
