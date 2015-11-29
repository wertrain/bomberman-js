/**
 * @fileoverview 操作可能プレイヤーを表す
 */
(function(namespace) {
    /**
     * プレイヤークラス
     * @extends {bomberman.game.Chara} 
     */
    var Player = enchant.Class.create(bomberman.game.Chara, {
        initialize: function() {
            bomberman.game.Chara.call(this);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Player = Player;
}("bomberman.game"));