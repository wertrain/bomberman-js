/**
 * @fileoverview サーバ側の実装。
 */
(function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/build'));
    
    var http = require('http');
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);
    var constants = require('./constants.js').Constants;

    io.sockets.on('connection', function (socket) {
        socket.on(constants.EVENT_CONNECTED, function () {
            var msg = '(' + socket.id + ')' + 'が入室しました ';
            console.log(msg);
        });
        socket.on(constants.EVENT_DISCONNECTED, function () {
            
        });
        socket.on(constants.EVENT_BOMB, function (param) {
            param.id = socket.id;
            socket.broadcast.emit(constants.EVENT_BOMB, param);
            socket.emit(constants.EVENT_BOMB, param);
        });
        socket.on(constants.EVENT_PLAYER, function (param) {
            param.id = socket.id;
            socket.broadcast.emit(constants.EVENT_PLAYER, param);
            //console.log(param);
        });
    });
    
    server.listen(process.env.PORT || 8080);
})();
