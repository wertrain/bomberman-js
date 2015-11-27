/**
 * @fileoverview マップを表す
 */
(function(namespace) {
    /**
     * マップを表すクラス
     * @constructor
     */
    var Map = enchant.Class.create({
        initialize: function() {

        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Map = Map;
}("bomberman.game"));