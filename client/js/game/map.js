/**
 * @fileoverview マップを表す
 */
(function(namespace) {
    /**
     * 初期マップ
     *
     */
    var defaultMap = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], 
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 
    ];
    
    /**
     * マップを表すクラス
     * @constructor
     */
    var Map = enchant.Class.create({
        initialize: function(image, chipWidth, chipHeight) {
            this.map = new enchant.Map(chipWidth, chipHeight);
            this.map.image = image;
            this.mapArray = defaultMap;
            this.map.loadData(defaultMap, defaultMap);
            this.map.collisionData = defaultMap;
            
            this.blocks = [];
            this.blockGroup = new enchant.Group();
            for (var i = 0; i < this.getMapHeight(); ++i) {
                this.blocks[i] = []
                for (var j = 0; j < this.getMapWidth(); ++j) {
                    var block = null;
                    if (this.mapArray[i][j] === 0 && this._isPutBlock(j, i, this)) {
                        block = new bomberman.game.NormalBlock(image, chipWidth, chipHeight, 96, 32);
                        block.put(j, i);
                        this.blockGroup.addChild(block);
                    }
                    this.blocks[i][j] = block;
                }
            }
        },
        getEnchantMap: function() {
            return this.map;
        },
        getBlocks: function() {
            return this.blocks;
        },
        getBlockGroup: function() {
            return this.blockGroup;
        },
        getMapWidth: function() {
            return this.mapArray[0].length;
        },
        getMapHeight: function() {
            return this.mapArray.length;
        },
        getMapArray: function() {
            return this.mapArray;
        },
        hitTest: function(x, y, checkObject) {
            if (this.map.hitTest(x, y)) {
                return true;
            }
            var mx = Math.floor(x / bomberman.common.CHIP_SIZE);
            var my = Math.floor(y / bomberman.common.CHIP_SIZE);
            if(this.blocks[my][mx] !== null && false === this.blocks[my][mx].isPass()) {
                var that = this;
                this.blocks[my][mx].hit(checkObject, function() {
                    that.blocks[my][mx] = null;
                });
                return true;
            }
            return false;
        },
        _isPutBlock: function(x, y, map) {
            // プレイヤー1から4の初期位置を空ける
            var width = this.getMapWidth(), height = this.getMapHeight();
            if (((x == 1 && y == 1) || (x == 2 && y == 1) || (x == 1 && y == 2) || (x == 1 && y == 3) || (x == 3 && y == 1)) ||
                ((x == width - 2 && y == 1) || (x == width - 3 && y == 1) || (x == width - 2 && y == 2) || (x == width - 2 && y == 3) || (x == width - 4 && y == 1)) ||
                ((x == 1 && y == height - 2) || (x == 2 && y == height - 2) || (x == 1 && y == height - 3) || (x == 1 && y == height - 4) || (x == 3 && y == height - 2)) ||
                ((x == width - 2 && y == height - 2) || (x == width - 3 && y == height - 2) || (x == width - 2 && y == height - 3) || (x == width - 2 && y == height - 4) || (x == width - 4 && y == height - 2))) {
                return false;
            }
            // 残りはランダムにかけさせる
            if (3 > Math.floor(Math.random() * 100)) {
                return false;
            }
            return true;
        }
    });
    
    var ns = bomberman.common.addNamespace(namespace);
    ns.Map = Map;
}("bomberman.game"));