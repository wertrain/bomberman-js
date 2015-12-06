/**
 * @fileoverview キャラクターを表す
 */
(function(namespace) {
    /**
     * キャラクター基底クラス
     * @constructor
     * @extends {bomberman.system.Drawable}
     */
    var Chara = enchant.Class.create(bomberman.system.Drawable, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.system.Drawable.call(this, asset, 0, 0, chipWidth, chipHeight, imageWidth, imageHeight);
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE - 8;
            this.addChild(this.sprite);
        },
        remove: function() {
            this.removeChild(this.sprite);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Chara = Chara;
}("bomberman.game"));