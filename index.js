var express = require('express');

// Constants
var DEFAULT_PORT = 8080;
var PORT = process.env.PORT || DEFAULT_PORT;

// logger middleware
const logger = (options) =>
(req, res, next) => { 
  const timestamp = new Date().toISOString(); 
    const { method, url, ip } = req; 
      console.log(`
          ${timestamp} 
          ${options.level} 
          ${method} ${url} 
          ${ip}`); 
        next(); 
  };  

// App
var app = express();
app.use(logger({ level: 'INFO' }));
app.get('/', function (req, res) {
  console.log(req);
  res.send('Hello World\n');
});

app.listen(PORT)
console.log('Running on http://localhost:' + PORT);
