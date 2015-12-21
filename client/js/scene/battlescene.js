/**
 * @fileoverview 戦闘画面のクラスを定義。
 */
(function(namespace) {
    /**
     * 戦闘画面のクラス
     * @constructor
     * @extends {bomberman.scene.SceneBase} 
     */
    var BattleScene = enchant.Class.create(bomberman.scene.SceneBase, {
        initialize: function() {
            bomberman.scene.SceneBase.call(this);
            var game = enchant.Game.instance;
            game.keybind(90, 'a'); // Zキー = Aボタン
            
            var CHIP_SIZE = bomberman.common.CHIP_SIZE;
            
            var map = new bomberman.game.Map(game.assets[R.CHIP], CHIP_SIZE, CHIP_SIZE);
            var player = new bomberman.game.Player(game.assets[R.WHITE_BOMBERMAN], 16, 24, 48, 128);
            player.put(1, 1);
            
            var bombGroup = new enchant.Group();
            var blastGroup = new enchant.Group();
            var stage = new enchant.Group();
            stage.addChild(map.getEnchantMap());
            stage.addChild(bombGroup);
            stage.addChild(blastGroup);
            stage.addChild(player);
            this.getEnchantScene().addChild(stage);
                      
            bomberman.network.setEventCallback(Constants.EVENT_BOMB, function(param) {
                var bomb = new bomberman.game.NormalBomb(game.assets[R.BOMB], CHIP_SIZE, CHIP_SIZE, 48, 16);
                bomb.put(param.x, param.y);
                bombGroup.addChild(bomb);
                var blast = new bomberman.game.Blast(game.assets[R.BOMB], CHIP_SIZE, CHIP_SIZE, 128, 128);
                blastGroup.addChild(blast);
                setInterval(function() {
                    bombGroup.removeChild(bomb);
                    blast.blast(param.x, param.y, param.power, function() {
                        blastGroup.removeChild(blast);
                    });
                }, 3000);
            });
                        
            var buttonTrigger = false;
            this.getEnchantScene().addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                player.enterFrame(map.getEnchantMap());
                bomberman.network.sendEvent(Constants.EVENT_PLAYER, {
                    x: player.getPosX(), 
                    y: player.getPosY(),
                    frame: player.getAnimFrame()
                });
                if (game.input.a) {
                    if (false === buttonTrigger) {
                        bomberman.network.sendEvent(Constants.EVENT_BOMB, {
                            x: player.getMapPosX(), 
                            y: player.getMapPosY(), 
                            power: player.getPower()
                        });
                    }
                    buttonTrigger = true;
                } else {
                    buttonTrigger = false;
                }
            });
        }
    });
    
    /**
     * このシーンが使用するリソースを列挙します。
     * アクセスしやすくするため、同時に R という変数にデータを代入しています。
     * この Resources というプロパティは common.addResourceArray で使用するために予約された名前です。
     */
    var R = BattleScene.Resources = {
        ITEM: 'images/item24.png',
        BOMB: 'images/bomb16.png',
        CHIP: 'images/chip16.png',
        WHITE_BOMBERMAN: 'images/white16.png',
    };
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.BattleScene = BattleScene;
}("bomberman.scene"));