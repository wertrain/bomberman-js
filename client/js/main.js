/**
 * @fileoverview ゲームメイン部分。
 */
window.onload = function() {
    var game = new enchant.Game(480, 320);
    game.fps = 15;

    var allResources = new Array();
    bomberman.common.addResourceArray(bomberman.scene.BattleScene, allResources);
    game.preload(allResources);
    
    game.onload = function() {
        var battleScene = new bomberman.scene.BattleScene();
        game.pushScene(battleScene.getEnchantScene());
    };
    game.start();
};
