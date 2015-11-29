/**
 * @fileoverview すべてのシーンの基底となるクラスを定義。
 */
(function(namespace) {
    /**
     * すべてのシーンの基底となるクラス
     * @extends {bomberman.scene.SceneBase} 
     */
    var BattleScene = enchant.Class.create(bomberman.scene.SceneBase, {
        initialize: function() {
            bomberman.scene.SceneBase.call(this);
        },
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.SceneBase = SceneBase;
}("bomberman.scene"));