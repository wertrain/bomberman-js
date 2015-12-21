/**
 * @fileoverview 操作可能プレイヤーを表す
 */
(function(namespace) {
    /**
     * プレイヤークラス
     * @constructor
     * @extends {bomberman.game.Chara} 
     */
    var Player = enchant.Class.create(bomberman.game.Chara, {
        initialize: function(asset, chipWidth, chipHeight, imageWidth, imageHeight) {
            bomberman.game.Chara.call(this, asset, chipWidth, chipHeight, imageWidth, imageHeight);

            this.sprite.isMoving = false;
            this.sprite.direction = 1;
            this.sprite.walk = 1;
            this.sprite.frame = this.sprite.direction * 3 + 1;
            this.power = 2;
            
            this.sprite.enterFrame = function(map) {
                var game = enchant.Game.instance;
                this.frame = this.direction * 3 + this.walk;
                if (this.isMoving) {
                    this.moveBy(this.vx, this.vy);
                    
                    if (!(game.frame % 2)) {
                        this.walk++;
                        this.walk %= 3;
                    }
                    if ((this.vx && this.x % bomberman.common.CHIP_SIZE == 0) || 
                        (this.vy && (this.y-8) % bomberman.common.CHIP_SIZE == 0)) {
                        this.isMoving = false;
                    }
                    return true;
                } else {
                    this.vx = this.vy = 0;
                    if (game.input.left) {
                        this.direction = 0;
                        this.vx = -4;
                    } else if (game.input.right) {
                        this.direction = 2;
                        this.vx = 4;
                    } else if (game.input.up) {
                        this.direction = 3;
                        this.vy = -4;
                    } else if (game.input.down) {
                        this.direction = 1;
                        this.vy = 4;
                    } else {
                        this.walk = 1;
                    }
                    if (this.vx || this.vy) {
                        var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * bomberman.common.CHIP_SIZE : 0) + 8;
                        var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * bomberman.common.CHIP_SIZE : 0) + 8;
                        if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                            this.isMoving = true;
                            arguments.callee.call(this);
                        }
                    }
                }
                return false;
            };
        },
        getPosX: function() {
            return this.sprite.x;
        },
        getPosY: function() {
            return this.sprite.y;
        },
        getAnimFrame: function() {
            return this.sprite.frame;
        },
        getMapPosX: function() {
            return Math.floor(this.sprite.x / bomberman.common.CHIP_SIZE);
        },
        getMapPosY: function() {
            return Math.floor((this.sprite.y + 8) / bomberman.common.CHIP_SIZE);
        },
        enterFrame: function(map) {
            return this.sprite.enterFrame(map);
        },
        getPower: function() {
            return this.power;
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Player = Player;
}("bomberman.game"));