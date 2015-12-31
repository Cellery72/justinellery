process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

var port = 1337;
app.listen(port);

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + port);