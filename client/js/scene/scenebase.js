/**
 * @fileoverview すべてのシーンの基底となるクラスを定義。
 */
(function(namespace) {
    /**
     * すべてのシーンの基底となるクラス
     * @constructor
     */
    var SceneBase = enchant.Class.create({
        initialize: function() {
            this.scene = new enchant.Scene();
            // Chrome (Windows) で表示されない不具合の対策
            // http://kazenetu.exblog.jp/15572197/
            this.scene._element.style.overflow = 'visible';
        },
        getEnchantScene: function() {
            return this.scene;
        },
        addChild: function(object) {
            this.scene.addChild(object);
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.SceneBase = SceneBase;
}("bomberman.scene"));