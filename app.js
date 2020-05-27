'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config');

var Twitter = require('node-tweet-stream'),
  t = new Twitter({
    consumer_key: config.twitter.API_key,
    consumer_secret: config.twitter.API_secret_key,
    token: config.twitter.token,
    token_secret: config.twitter.token_secret
  });

var searchText = 'bitcoin';
t.track(searchText);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  t.on('tweet', function (tweet) { //イベント検知 = 受信
    if (!tweet.retweed) {
      io.emit('tweet', tweet); //イベント発火＝送信
      console.log(tweet.text);
    }
  });
});


const port = process.env.PORT || 8000;
http.listen(port, () => {
  console.log('Listening on ' + port);
});