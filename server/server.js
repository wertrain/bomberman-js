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

    var allPlayers = []
    io.sockets.on('connection', function (socket) {
        socket.on(constants.EVENT_CONNECTED, function (param) {
            var msg = '(' + socket.id + ')' + 'が入室しました ';
            console.log(msg);
            var player = {name: param, id:socket.id, x: 0, y: 0, frame: 0}
            for (var i in allPlayers) {
                socket.emit(constants.EVENT_JOIN, allPlayers[i]);
            }
            socket.broadcast.emit(constants.EVENT_JOIN, player);
            allPlayers[socket.id] = player;
        });
        socket.on(constants.EVENT_DISCONNECTED, function () {
            socket.broadcast.emit(constants.EVENT_LEAVE, {id: socket.id});
            delete allPlayers[socket.id];
        });
        socket.on(constants.EVENT_BOMB, function (param) {
            param.id = socket.id;
            socket.broadcast.emit(constants.EVENT_BOMB, param);
            socket.emit(constants.EVENT_BOMB, param);
        });
        socket.on(constants.EVENT_PLAYER, function (param) {
            var player = allPlayers[socket.id];
            player.x = param.x;
            player.y = param.y;
            player.frame = param.frame;
            param.id = socket.id;
            socket.broadcast.emit(constants.EVENT_PLAYER, param);
        });
    });
    
    server.listen(process.env.PORT || 8080);
})();
