'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var config = require('./config');

var Twitter = require('node-tweet-stream'),
  t = new Twitter({
    consumer_key: '2mrK7KN2dW8BKnytlVsulOyBP',
    consumer_secret: 'qBeygZgzQUqbppe99ILUHf2QkXEJtc2nwU0kFdu0oXith9valP',
    token: '1224295757332639744-fd2coDG6MRDn691idFBHNltzko3Edj',
    token_secret: '7r7wtkcgUFWDDVrcRy3HjIqCE5E9rQtx9iPPUQMEHln9N'
  });
 
var searchText = 'ビットコイン';
t.track(searchText);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/** 
io.on('connection', function (socket) {
  t.on('tweet', function (tweet) { //イベント検知 = 受信
    if (!tweet.retweed) {
      io.emit('tweet', tweet); //イベント発火＝送信
      console.log(tweet.text);
    }
  });
});
*/

io.on('connection', function (socket) {
  t.on('tweet', function (tweet) { //イベント検知 = 受信
    if (!tweet.retweed) {
      io.emit('tweet', tweet); //イベント発火＝送信
      console.log(tweet.text);
    }
  });
  //////////////////////////////////
  socket.on('message',function(msg){
    console.log('message:'+msg);
    io.emit('message',msg);
  });
});

const port = process.env.PORT || 8000;
http.listen(port, () => {
  console.log('Listening on ' + port);
});