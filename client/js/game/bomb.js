/**
 * @fileoverview ボムを表す
 */
(function(namespace) {
    /**
     * 配列ユーティリティー
     */
    var extendArray = function(arr, num) {
        if (arr.length === 0 || num === 0) {
            return [];
        }
        var result = [];
        for (var i = 0; i < arr.length; ++i) {
            for (var j = 0; j < num; ++j) {
                result.push(arr[i]);
            }
        }
        return result;
    };
    
    /**
     * ボムベースクラス
     * @constructor
     * @extends {bomberman.system.Drawable} 
     */
    var BombBase = enchant.Class.create(bomberman.system.Drawable, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.system.Drawable.call(this, asset, chipWidth, chipHeight, imageWidth, imageHeight);
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE + 8;
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
            this.sprite.frame = extendArray([0, 1, 2, 1, 0], 3);
        }
    });
    
    /**
     * 爆風ベースクラス
     * @constructor
     * @extends {bomberman.system.Drawable} 
     */
    var BlastBase = enchant.Class.create(bomberman.system.Drawable, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.system.Drawable.call(this, asset, chipWidth, chipHeight, imageWidth, imageHeight);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBomb = NormalBomb;
}("bomberman.game"));