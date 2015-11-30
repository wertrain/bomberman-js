/**
 * @fileoverview キャラクターを表す
 */
(function(namespace) {
    /**
     * キャラクター基底クラス
     * @constructor
     * @extends {enchant.Group} 
     */
    var Chara = enchant.Class.create(enchant.Group, {
        initialize: function() {
            enchant.Group.call(this);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Chara = Chara;
}("bomberman.game"));