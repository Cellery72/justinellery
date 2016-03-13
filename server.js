process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');

var app = express();
var port = 1337;

app.use(express.static(__dirname + '/src'));
app.listen(port);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + port);