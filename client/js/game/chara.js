/**
 * @fileoverview キャラクターを表す
 */
(function(namespace) {
    /**
     * キャラクター基底クラス
     * @constructor
     * @extends {enchant.Node} 
     */
    var Chara = enchant.Class.create(enchant.Node, {
        initialize: function() {
            enchant.Node.call(this);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Chara = Chara;
}("bomberman.game"));