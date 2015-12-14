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
            this.power = 3;
            this.sprite.frame = [14, 22, 30, 38, 46, 38, 30, 22, 14, null];
            var that = this;
            this.sprite.addEventListener(enchant.Event.ANIMATION_END, function(e) {
                var clength = that.childNodes.length;
                for (var i = 0; i < clength; ++i) {
                    that.removeChild(that.childNodes[0]);
                }
            });
            this.spriteList = []
            for (var i = 0; i < 4; ++i) {
                this.spriteList[i] = [];
                for (var j = 0; j < bomberman.common.MAX_BLAST_POWER; ++j) {
                    var tmp = new enchant.Sprite(chipWidth, chipHeight);
                    tmp.image = this.image;
                    tmp.x = j * bomberman.common.CHIP_SIZE;
                    tmp.y = j * bomberman.common.CHIP_SIZE;
                    this.spriteList[i].push(tmp);
                }
            }
        },
        put: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE;
            this.addChild(this.sprite);
            this.power = 3;
            for (var i = 0; i < 4; ++i) {
                 for (var j = 0; j < this.power; ++j) {
                     var dx = 0, dy = 0;
                     var frame = null, offset = 1;
                     switch(i) {
                         case 0:
                            dx = this.sprite.x;
                            dy = this.sprite.y - ((j + 1) * bomberman.common.CHIP_SIZE);
                            offset = (j === this.power - 1) ? 0 : 5;
                         break;
                         case 1:
                            dx = this.sprite.x;
                            dy = this.sprite.y + ((j + 1) * bomberman.common.CHIP_SIZE);
                            offset = (j === this.power - 1) ? 1 : 5;
                         break;
                         case 2:
                            dx = this.sprite.x - ((j + 1) * bomberman.common.CHIP_SIZE);
                            dy = this.sprite.y
                            offset = (j === this.power - 1) ? 2 : 4;
                         break;
                         case 3:
                            dx = this.sprite.x + ((j + 1) * bomberman.common.CHIP_SIZE);
                            dy = this.sprite.y;
                            offset = (j === this.power - 1) ? 3 : 4;
                         break;
                     }
                     this.spriteList[i][j].x = dx;
                     this.spriteList[i][j].y = dy;
                     this.spriteList[i][j].frame = [8 + offset, 16 + offset, 24 + offset, 32 + offset, 40 + offset, 32 + offset, 24 + offset, 16 + offset, 8 + offset, null];
                     this.addChild(this.spriteList[i][j]);
                 }
            }

        },
        blast: function(x, y, power) {
            this.blastCenterX = x;
            this.blastCenterY = y;
            this.power = power;
            this.put(x, y);
        },
        enterFrame: function(map) {
            this.image.draw(asset, chipX, chipY, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Blast = Blast;
}("bomberman.game"));