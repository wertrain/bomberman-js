/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    var socketio = io.connect('http://localhost:8080');
    //var port = 8080;
    //var socketio = io.connect('/', { port: port });
    var ns = bomberman.common.addNamespace(namespace);
}('bomberman.game'));