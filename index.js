var express = require('express');
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

// Constants
var DEFAULT_PORT = 8080;
var PORT = process.env.PORT || DEFAULT_PORT;

// logger middleware
const logger = (options) =>
(req, res, next) => { 
    const { level } = options;
    const span = tracer.scope().active();
    const time = new Date().toISOString();
    const { method, url, ip } = req; 
    const message = `${method} ${url} ${ip}`
    const record = { time, level, message };


    if (span) {
        tracer.inject(span.context(), formats.LOG, record);
    }

    console.log(JSON.stringify(record));
    next(); 
  };  

// App
var app = express();
app.use(logger({ level: 'INFO' }));
app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.listen(PORT)
console.log('Running on http://localhost:' + PORT);
