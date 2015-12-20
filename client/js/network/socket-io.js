/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    var socketio = io.connect('http://localhost:8080');
    //var port = 8080;
    //var socketio = io.connect('/', { port: port });
    
    // if 判定が不要なようにすべてのコールバックを埋めておく
    var events = [];
    for(var prop in Constants) {
         events[prop] = function(param) {};
    }
    socketio.on(Constants.EVENT_CONNECTED, function(player) {
        events[Constants.EVENT_CONNECTED](player);
    });
    socketio.on(Constants.EVENT_BOMB, function(param) {
        events[Constants.EVENT_BOMB](param);
    });
    var login = function(name) {
        socketio.emit(Constants.EVENT_CONNECTED, name);
    }
    var setEventCallback = function(event, callback) {
        events[event] = callback;
        if (callback === null || typeof callback === 'undefined') {
            events[event] = function(param) {};
        }
    }
    var sendEvent = function(event, param) {
        socketio.emit(event, param);
    }
    var ns = bomberman.common.addNamespace(namespace);
    ns.login = login;
    ns.setEventCallback = setEventCallback;
    ns.sendEvent = sendEvent;
}('bomberman.network'));