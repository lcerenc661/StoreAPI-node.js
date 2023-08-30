// Import express as express
const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');


// Import middlewares
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
// Use express as a constructor method to create the app
const app = express();
// Configure ports
const port = 3000;

app.listen(port);
app.use(express.json()); // Middleware for post request json data processing

const whitelist = ['http//localhost:8000','https://myapp.co'];
const options = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin) || !origin ){
      callback(null, true);
    } else {
      callback(new Error('Not allowed'))
    }
  }
}
app.use(cors(options)); // Allows connection from any origin

console.log('Running App');

//Endpoints
app.get('/', (req, res) => {
  res.send('Hello my server on express.js');
});

routerApi(app);
// The middlewares always are applied after the routing.
// middlewares will execute in the order there were written
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);