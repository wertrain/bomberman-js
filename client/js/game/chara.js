/**
 * @fileoverview キャラクターを表す
 */
(function(namespace) {
    /**
     * キャラクター基底クラス
     * @constructor
     */
    var Chara = enchant.Class.create({
        initialize: function() {

        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Chara = Chara;
}("bomberman.game"));