/**
 * @fileoverview ボムを表す
 */
(function(namespace) {
    /**
     * 爆風クラス
     * @constructor
     * @extends {bomberman.system.Drawable} 
     */
    var Blast = enchant.Class.create(bomberman.system.Drawable, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.system.Drawable.call(this, asset, 0, 0, chipWidth, chipHeight, imageWidth, imageHeight);
            this.blastCenterX = 0;
            this.blastCenterY = 0;
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE + 8;
            this.addChild(this.sprite);
        },
        blast: function(x, y) {
            this.blastCenterX = x;
            this.blastCenterY = y;
            this.put(x, y);
        },
        enterFrame: function(map) {
            
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Blast = Blast;
}("bomberman.game"));