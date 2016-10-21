"use strict";

var port = process.env.PORT || '3001';


let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

let app = express();

app.set('port', port);

var http = require('http').Server(app);

var io = require('socket.io').listen(http);

io.set("origins", "*:*");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

io.on('connection', function (socket) {

  socket.emit('new_user');

  socket.on('chat', function (data) {
    console.log("new message!", data)
    socket.broadcast.emit('chat_broadcast', data);
  });

});

console.log("listening on port "+ port)
http.listen(port);

