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
            
            var bombGroup = new enchant.Group();
            var blastGroup = new enchant.Group();
            var playerGroup = new enchant.Group();
            
            var map = new bomberman.game.Map(game.assets[R.CHIP], CHIP_SIZE, CHIP_SIZE);
            var player = new bomberman.game.Player(game.assets[R.WHITE_BOMBERMAN], 16, 24, 48, 128);
            player.put(1, 1);
            playerGroup.addChild(player);
            
            var otherPlayers = [];
            
            var stage = new enchant.Group();
            stage.addChild(map.getEnchantMap());
            stage.addChild(map.getBlockGroup());
            stage.addChild(bombGroup);
            stage.addChild(blastGroup);
            stage.addChild(playerGroup);
            this.getEnchantScene().addChild(stage);
            
            bomberman.network.setEventCallback(Constants.EVENT_BOMB, function(param) {
                var bomb = new bomberman.game.NormalBomb(game.assets[R.BOMB], CHIP_SIZE, CHIP_SIZE, 48, 16);
                var timerId = null;
                // 爆発時のコールバックを登録する
                // このコールバックはボムクラスから呼び出される
                var explosionCallback = function() {
                    bombGroup.removeChild(bomb);
                    map.removeBomb(param.x, param.y);
                    var blast = new bomberman.game.Blast(game.assets[R.BOMB], CHIP_SIZE, CHIP_SIZE, 128, 128);
                    blastGroup.addChild(blast);
                    blast.blast(param.x, param.y, param.power, map, function() {
                        blastGroup.removeChild(blast);
                        if (timerId !== null) {
                            clearInterval(timerId);
                        }
                    });
                }
                // 時間経過で爆発するように登録
                timerId = setInterval(function() {
                    explosionCallback();
                }, 3000);
                
                bomb.put(param.x, param.y, explosionCallback);
                map.setBomb(param.x, param.y, bomb);
                bombGroup.addChild(bomb);
            });
            
            bomberman.network.setEventCallback(Constants.EVENT_JOIN, function(param) {
                var newPlayer = new bomberman.game.Player(game.assets[R.WHITE_BOMBERMAN], 16, 24, 48, 128);
                newPlayer.setInfo(param);
                playerGroup.addChild(newPlayer);
                otherPlayers[param.id] = newPlayer;
            });
            
            bomberman.network.setEventCallback(Constants.EVENT_LEAVE, function(param) {
                var leavePlayer = otherPlayers[param.id];
                if (leavePlayer !== null || typeof leavePlayer !== 'undefined') {
                    delete otherPlayers[param.id];
                    playerGroup.removeChild(leavePlayer);
                }
            });
            
            bomberman.network.setEventCallback(Constants.EVENT_PLAYER, function(param) {
                var activePlayer = otherPlayers[param.id];
                if (activePlayer !== null || typeof activePlayer !== 'undefined') {
                    activePlayer.setInfo(param);
                }
            });
            
            var buttonTrigger = false;
            this.getEnchantScene().addEventListener(enchant.Event.ENTER_FRAME, function(e) {
                player.enterFrame(map);
                bomberman.network.sendEvent(Constants.EVENT_PLAYER, {
                    x: player.getPosX(), 
                    y: player.getPosY(),
                    frame: player.getAnimFrame()
                });
                if (game.input.a) {
                    if (false === buttonTrigger && map.isPutBomb(player.getMapPosX(), player.getMapPosY())) {
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
                // 常に y 座標でソートしておく
                playerGroup.childNodes.sort(function(_o0, _o1) {
                    return (_o0.sprite.y > _o1.sprite.y) ? 1 : ((_o0.sprite.y < _o1.sprite.y) ? -1 : 0);
                });
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