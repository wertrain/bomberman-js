/**
 * @fileoverview 描画できるオブジェクトを表す
 */
(function(namespace) {
    /**
     * 描画できるオブジェクト基底クラス
     * @constructor
     * @extends {enchant.Group} 
     */
    var Drawable = enchant.Class.create(enchant.Group, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            enchant.Group.call(this);
            this.sprite = new enchant.Sprite(chipWidth, chipHeight);
            this.image = new enchant.Surface(imageWidth, imageHeight);
            this.image.draw(asset, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
            this.sprite.image = this.image;
            this.sprite.frame = 0;
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Drawable = Drawable;
}("bomberman.system"));