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
            this.power = 0;
            this.sprite.frame = [9, 17, 25, 33, 41, 33, 25, 17, 9, null];
            
            this.spriteList = []
            for (var i = 0; i < 4; ++i) {
                this.spriteList[i] = [];
                 for (var j = 0; j < bomberman.common.MAX_BLAST_POWER; ++j) {
                    var tmp = new enchant.Sprite(chipWidth, chipHeight);
                    tmp.image = this.image;
                    tmp.frame = [8, 16, 24, 32, 40, 32, 24, 16, 8, null];
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
            this.power = 2;
            for (var i = 0; i < 4; ++i) {
                 for (var j = 0; j < this.power; ++j) {
                     var dx = 0, dy = 0;
                     var frame = null, offset = 1;
                     switch(i){
                         case 0:
                            dx = this.sprite.x;
                            dy = this.sprite.y - ((j + 1) * bomberman.common.CHIP_SIZE);
                            offset = (j === this.power - 1) ? 0 : 6;
                         break;
                         case 1:
                            dx = this.sprite.x;
                            dy = this.sprite.y + ((j + 1) * bomberman.common.CHIP_SIZE);
                            offset = (j === this.power - 1) ? 7 : 6;
                         break;
                         case 2:
                            dx = this.sprite.x - ((j + 1) * bomberman.common.CHIP_SIZE);
                            dy = this.sprite.y
                            offset = (j === this.power - 1) ? 2 : 3;
                         break;
                         case 3:
                            dx = this.sprite.x + ((j + 1) * bomberman.common.CHIP_SIZE);
                            dy = this.sprite.y;
                            offset = (j === this.power - 1) ? 2 : 3;
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