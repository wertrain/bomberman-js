/**
 * @fileoverview 操作可能プレイヤーを表す
 */
(function(namespace) {
    /**
     * プレイヤークラス
     * @constructor
     */
    var Player = enchant.Class.create(bomberman.game.Chara, {
        initialize: function() {
            
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Player = Player;
}("bomberman.game"));