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

    io.sockets.on('connection', function (socket) {
        socket.on('connected', function () {
            var msg = '(' + socket.id + ')' + 'が入室しました ';
            console.log(msg);
        });
        socket.on('disconnect', function () {
            
        });
    });
    
    server.listen(process.env.PORT || 8080);
})();
