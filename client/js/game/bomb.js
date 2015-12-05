/**
 * @fileoverview ボムを表す
 */
(function(namespace) {
    /**
     * ボムベースクラス
     * @constructor
     * @extends {enchant.Group} 
     */
    var BombBase = enchant.Class.create(enchant.Group, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            enchant.Group.call(this);
            this.sprite = new enchant.Sprite(chipWidth, chipHeight);
            this.image = new enchant.Surface(imageWidth, imageHeight);
            this.image.draw(asset, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
            this.sprite.image = this.image;
            this.sprite.frame = 0;
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE;
            this.addChild(this.sprite);
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
            this.sprite.frame = [0, 0, 1, 1, 2, 2, 1, 1, 0, 0];
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.NormalBomb = NormalBomb;
}("bomberman.game"));