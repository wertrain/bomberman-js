/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    var socketio = io.connect('http://localhost:8080');
    //var port = 8080;
    //var socketio = io.connect('/', { port: port });
    
    socketio.on('connected', function(player) {

    });
    var login = function(name) {
        socketio.emit('connected', name);
    }
    var ns = bomberman.common.addNamespace(namespace);
    ns.login = login;
}('bomberman.network'));