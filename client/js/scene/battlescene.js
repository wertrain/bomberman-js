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
            var map = new bomberman.game.Map(game.assets[R.CHIP], 24, 24);

            var stage = new enchant.Group();
            stage.addChild(map.getEnchantMap());
            this.getEnchantScene().addChild(stage);
             
            this.getEnchantScene().addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                
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
        CHIP: 'images/chip24.png',
    };
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.BattleScene = BattleScene;
}("bomberman.scene"));