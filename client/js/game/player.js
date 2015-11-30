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
            this.sprite.x = 16;
            this.sprite.y = 8;
            this.sprite.isMoving = false;
            this.sprite.direction = 1;
            this.sprite.walk = 1;
            this.image = null;
            this.addChild(this.sprite);
            
            this.sprite.enterFrame = function(map) {
                var game = enchant.Game.instance;
                this.frame = this.direction * 3 + this.walk;
                if (!(game.frame % 3)) {
                    this.walk = this.walk === 0 ? 2 : 0;
                }
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
                }
                return false;
            };
        },
        setImage: function(assets, imageWidth, imageHeight) {
            this.image = new enchant.Surface(imageWidth, imageHeight);
            this.image.draw(assets, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
            this.sprite.image = this.image;
        },
        enterFrame: function(map) {
            return this.sprite.enterFrame(map);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Player = Player;
}("bomberman.game"));