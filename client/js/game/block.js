/**
 * @fileoverview ブロックを表す
 */
(function(namespace) {
    /**
     * ブロックベースクラス
     * @constructor
     * @extends {bomberman.system.Drawable}
     */
    var BlockBase = enchant.Class.create(bomberman.system.Drawable, {
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
    
    /**
     * 通常ブロッククラス
     * @constructor
     * @extends {BlockBase}
     */
    var NormalBlock = enchant.Class.create(BlockBase, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            BlockBase.call(this, asset, 0, 0, chipWidth, chipHeight, imageWidth, imageHeight);
            this.sprite.frame = 2;
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBlock = NormalBlock;
}("bomberman.game"));