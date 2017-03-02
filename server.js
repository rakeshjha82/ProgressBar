var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './app')));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, './app', 'index1.html'));
});

app.listen(process.PORT || 3000, function (){
    console.log('listening on port 3000');
});