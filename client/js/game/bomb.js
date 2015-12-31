/**
 * @fileoverview ボムを表す
 */
(function(namespace) {
    /**
     * ボムベースクラス
     * @constructor
     * @extends {bomberman.system.Drawable} 
     */
    var BombBase = enchant.Class.create(bomberman.system.Drawable, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.system.Drawable.call(this, asset, 0, 0, chipWidth, chipHeight, imageWidth, imageHeight);
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE;
            this.addChild(this.sprite);
        },
        remove: function() {
            this.removeChild(this.sprite);
        }
    });
    
    /**
     * 通常ボムクラス
     * @constructor
     * @extends {bomberman.game.BombBase} 
     */
    var NormalBomb = enchant.Class.create(BombBase, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            BombBase.call(this, asset, chipWidth, chipHeight, imageWidth, imageHeight);
            this.sprite.frame = bomberman.common.extendArray([0, 1, 2, 1, 0], 3);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBomb = NormalBomb;
}("bomberman.game"));