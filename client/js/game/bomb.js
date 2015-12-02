/**
 * @fileoverview ボムを表す
 */
(function(namespace) {
    /**
     * ボムベースクラス
     * @constructor
     * @extends {enchant.Group} 
     */
    var BombBase = enchant.Class.create(enchant.Group, {
        initialize: function() {
            enchant.Group.call(this);
        }
    });
    
    /**
     * 通常ボムクラス
     * @constructor
     * @extends {bomberman.game.BombBase} 
     */
    var NormalBomb = enchant.Class.create(BombBase, {
        initialize: function() {
            BombBase.call(this);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBomb = NormalBomb;
}("bomberman.game"));