/**
 * @fileoverview 戦闘画面のクラスを定義。
 */
(function(namespace) {
    /**
     * 戦闘画面のクラス
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
            var stage = new enchant.Group();
            stage.addChild(map.getEnchantMap());
            stage.addChild(bombGroup);
            stage.addChild(player);
            this.getEnchantScene().addChild(stage);
            
            var buttonTrigger = false;
            this.getEnchantScene().addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                player.enterFrame(map.getEnchantMap());
                if (game.input.a) {
                    if (false === buttonTrigger) {
                        var bomb = new bomberman.game.NormalBomb(game.assets[R.BOMB], CHIP_SIZE, CHIP_SIZE, 48, 16);
                        bomb.put(player.getMapPosX(), player.getMapPosY());
                        bombGroup.addChild(bomb);
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