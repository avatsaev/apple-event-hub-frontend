"use strict";

var port = process.env.PORT || '3001';


let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
const profanity_db = require("./profanity_db");

let app = express();

let user_count = 0;
let message_history = [];
const msg_history_buffer_size = 30;

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

  user_count+=1;
  socket.emit('user_count_update', {user_count});
  socket.emit('message_history', {message_history})
  socket.broadcast.emit('user_count_update', {user_count});


  socket.on('disconnect', function(){
    user_count-=1;
    socket.broadcast.emit('user_count_update', {user_count});

  });

  socket.on('chat', function (data) {

    if (profanity_db.indexOf(data.msg) == -1 && data.username != "Slack-Spambot-Spambot-Slack") {

      socket.broadcast.emit('chat_broadcast', data);

      if (message_history.length >= msg_history_buffer_size){
        message_history.shift()
      }

      message_history.push(data);
    }

  });

});

console.log("listening on port "+ port);
http.listen(port);

