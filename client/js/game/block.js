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
            this.sprite.y = y * bomberman.common.CHIP_SIZE;
            this.addChild(this.sprite);
        },
        remove: function() {
            this.removeChild(this.sprite);
        },
        isPass: function() {
            return true;
        }
    });
    
    /**
     * 通常ブロッククラス
     * @constructor
     * @extends {BlockBase}
     */
    var NormalBlock = enchant.Class.create(BlockBase, {
        _BLOCK_INDEX: 2,
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            BlockBase.call(this, asset, chipWidth, chipHeight, imageWidth, imageHeight);
            this.sprite.frame = this._BLOCK_INDEX;
            this.callback = null;
            
            var that = this;
            this.sprite.addEventListener(enchant.Event.ANIMATION_END, function(e) {
                that.remove();
                that.callback();
            });
        },
        hit: function(object, callback) {
            if (object instanceof bomberman.game.Blast) {
                this.sprite.frame = bomberman.common.extendArray([6, 7, 8, 9, 10, null], 2);
                this.callback = callback;
            }
        },
        isPass: function() {
            return this.sprite.frame !== this._BLOCK_INDEX;
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBlock = NormalBlock;
}("bomberman.game"));