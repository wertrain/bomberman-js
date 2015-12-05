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
        initialize: function(width, height) {
            bomberman.game.Chara.call(this);
            
            this.sprite = new enchant.Sprite(width, height);
            this.sprite.x = 0;
            this.sprite.y = 0;
            this.sprite.isMoving = false;
            this.sprite.direction = 1;
            this.sprite.walk = 1;
            this.image = null;
            this.addChild(this.sprite);
            
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
        setImage: function(asset, imageWidth, imageHeight) {
            this.image = new enchant.Surface(imageWidth, imageHeight);
            this.image.draw(asset, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
            this.sprite.image = this.image;
        },
        setMapPos: function(x, y) {
            this.sprite.x = x * bomberman.common.CHIP_SIZE;
            this.sprite.y = y * bomberman.common.CHIP_SIZE - 8;
        },
        getMapPosX: function() {
            return this.sprite.x / bomberman.common.CHIP_SIZE;
        },
        getMapPosY: function() {
            return this.sprite.y / bomberman.common.CHIP_SIZE;
        },
        enterFrame: function(map) {
            return this.sprite.enterFrame(map);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Player = Player;
}("bomberman.game"));