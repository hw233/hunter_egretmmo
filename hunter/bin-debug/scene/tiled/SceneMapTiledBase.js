var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * 有 tiledMap 的单机地图基类
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapTiledBase = (function (_super) {
        __extends(SceneMapTiledBase, _super);
        function SceneMapTiledBase() {
            var _this = _super.call(this) || this;
            _this.tiledMap = null; // tiledMap 地图对象
            return _this;
        }
        SceneMapTiledBase.prototype.init = function (ui, param) {
            var _this = this;
            if (param === void 0) { param = null; }
            _super.prototype.init.call(this, ui);
            // 资源是否为zip压缩包
            var isZip = false;
            zj.TiledDataManager.getInstance().getMapData(param, isZip)
                .then(function (_a) {
                var data = _a[0], tiledMap = _a[1];
                _this.initTiledMap(data, tiledMap);
                egret.setTimeout(function () {
                    _this.onStart();
                }, _this, 500);
            });
            // let tileMapId = param;
            // let path = tileMapId + (isZip ? "_zip" : "_tmx");
            // let mapUrl = "resource/config/map/" + tileMapId + "/" + path;
            // RES.getResAsync(path, (_date: any, url: string) => {
            // 	if (isZip) {
            // 		this.loadZipData(path)
            // 			.then((txt) => {
            // 				this.initTiledMap(txt, mapUrl);
            // 			});
            // 	} else {
            // 		this.initTiledMap(_date, mapUrl);
            // 	}
            // 	egret.setTimeout(() => {
            // 		this.onStart();
            // 	}, this, 500);
            // }, this);
        };
        SceneMapTiledBase.prototype.initTiledMap = function (data, tiledMap) {
            this.tileW = Number(data["$tilewidth"]);
            this.tileH = Number(data["$tileheight"]);
            this.tileCountW = Number(data["$width"]);
            this.tileCountH = Number(data["$height"]);
            this.mapWidth = this.tileCountW * this.tileW;
            this.mapHeight = this.tileCountH * this.tileH;
            this.mapXMax = this.mapWidth - zj.UIManager.StageWidth;
            this.mapYMax = this.mapHeight - zj.UIManager.StageHeight;
            this.tiledMap = tiledMap;
            this.parseMap();
            this.layerMap.mask = new egret.Rectangle(0, 0, this.mapWidth, this.mapHeight);
        };
        /**
         * 解析地图
         */
        SceneMapTiledBase.prototype.parseMap = function () {
            var maps = this.tiledMap.getLayers();
            for (var i = 0; i < maps.length; ++i) {
                var v = maps[i];
                this.initLayer(v);
            }
        };
        /**
         * 初始化地图层数据（供子类覆盖用）
         * 返回值： 1-隐藏tiledMap本层（visible = false）; 2-删除本层；其他-本层可见
         */
        SceneMapTiledBase.prototype.initLayer = function (layer) {
        };
        SceneMapTiledBase.prototype.setPlayerMove = function (x, y, isMapFollow) {
            if (isMapFollow === void 0) { isMapFollow = true; }
            if (this.player && !this.isBlockPos(x, y)) {
                // 点击角色脚下的图块，则不移动
                if (Math.floor(x / this.tileW) == Math.floor(this.player.x / this.tileW)
                    && Math.floor(y / this.tileH) == Math.floor(this.player.y / this.tileH)) {
                    this.playerMoveFinish(this.player);
                    return;
                }
                // 点击的图块不是阻挡块，则寻路
                var posList = zj.TiledAstar.getPath(this.player.x, this.player.y, x, y, this.tileW, this.tileH, this.getBlockAstar());
                if (posList) {
                    this.player.setMove(posList);
                    this.isMapPlayerFollow = isMapFollow;
                }
            }
        };
        SceneMapTiledBase.prototype.getBlockAstar = function () {
            for (var i = this.blocks.length - 1; i >= 0; --i) {
                for (var j = this.blocks[i].length - 1; j >= 0; --j) {
                    if (this.isBlockTiledIdx(i, j)) {
                        this.blockAstar[i][j] = 1;
                    }
                    else {
                        this.blockAstar[i][j] = 0;
                    }
                }
            }
            return this.blockAstar;
        };
        /**
         * 以坐标检测地图块是否有碰撞
         */
        SceneMapTiledBase.prototype.isBlockPos = function (x, y) {
            if (_super.prototype.isBlockPos.call(this, x, y)) {
                return true;
            }
            var idxw = Math.floor(x / this.tileW);
            var idxh = Math.floor(y / this.tileH);
            return this.isBlockTiledIdx(idxw, idxh);
        };
        /**
         * 以地图块索引检测是否有碰撞
         */
        SceneMapTiledBase.prototype.isBlockTiledIdx = function (idxw, idxh) {
            if (this.blocks) {
                return this.blocks[idxw][idxh] >= 0;
            }
            return false;
        };
        /**
         * 通过zip包解析地图数据资源
         */
        SceneMapTiledBase.prototype.loadZipData = function (url) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                RES.getResAsync(url, function (data, key) {
                    JSZip.loadAsync(data).then(function (zipdata) {
                        zipdata.forEach(function (path, file) {
                            file.async('text').then(function (txt) {
                                resolve(txt);
                                return;
                            });
                        });
                    }).catch(function (e) {
                        console.log("tileAdventure - loadZipData fail(" + url + "):" + JSON.stringify(e));
                        reject();
                    });
                }, _this);
            });
        };
        return SceneMapTiledBase;
    }(zj.SceneMapBase));
    zj.SceneMapTiledBase = SceneMapTiledBase;
    __reflect(SceneMapTiledBase.prototype, "zj.SceneMapTiledBase");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapTiledBase.js.map