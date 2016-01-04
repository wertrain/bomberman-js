/**
 * @fileoverview socket.io に関する実装。
 */
(function(namespace) {
    var port = 8080;
    var host = location.origin;
    var socketio = io.connect(host, {port: port, transports: ["websocket"]});
    
    // if 判定が不要なようにすべてのコールバックを埋めておく
    var events = [];
    // 以下のようなイベントごとの定義が不要なようにラッパーを作って
    // ループで設定しておく
    //socketio.on(Constants.EVENT_CONNECTED, function(param) {
    //    events[Constants.EVENT_CONNECTED](param);
    //});
    function SocketIoEventWrapper(index) {
        this.callback = function(param) {
            events[index](param);
        }
    }
    for(var prop in Constants) {
        events[Constants[prop]] = function(param) {};
        var wrapper = new SocketIoEventWrapper(Constants[prop]);
        socketio.on(Constants[prop], wrapper.callback);
    }
    
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