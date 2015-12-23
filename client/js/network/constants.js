/**
 * @fileoverview サーバ/クライアントで共有する定数定義。
 */
function Constants() {}
Constants.EVENT_CONNECTED = 'connected';
Constants.EVENT_DISCONNECTED = 'disconnect';
Constants.EVENT_BOMB = 'bomb';
Constants.EVENT_PLAYER = 'player';
Constants.EVENT_JOIN = 'join';
Constants.EVENT_LEAVE = 'leave';

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports.Constants = Constants;
}
