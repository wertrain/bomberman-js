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
            var map = new bomberman.game.Map(game.assets[R.CHIP], 16, 16);
            var player = new bomberman.game.Player(16, 24);
            player.setPos(1, 1);
            player.setImage(game.assets[R.WHITE_BOMBERMAN], 48, 168);
            
            var stage = new enchant.Group();
            stage.addChild(map.getEnchantMap());
            stage.addChild(player);
            this.getEnchantScene().addChild(stage);
             
            this.getEnchantScene().addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                player.enterFrame(map.getEnchantMap());
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
        BOMB: 'images/bomb24.png',
        CHIP: 'images/chip16.png',
        WHITE_BOMBERMAN: 'images/white16.png',
    };
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.BattleScene = BattleScene;
}("bomberman.scene"));