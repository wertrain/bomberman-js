/**
 * @fileoverview マップを表す
 */
(function(namespace) {
    /**
     * 初期マップ
     *
     */
    var defaultMap = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3], 
        [3, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3], 
        [3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3], 
        [3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3], 
        [3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3], 
        [3, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 3], 
        [3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 
    ];
    
    /**
     * マップを表すクラス
     * @constructor
     */
    var Map = enchant.Class.create({
        initialize: function(image, width, height) {
            this.map = new enchant.Map(width, height);
            this.map.image = image;
            this.map.loadData(defaultMap, defaultMap);
            this.map.collisionData = defaultMap;
        },
        getEnchantMap: function() {
            return this.map;
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Map = Map;
}("bomberman.game"));