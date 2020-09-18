var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * tiledMap 地图数据管理类
     * zhaiweili
     * 2019.12.16
     */
    var TiledDataManager = (function () {
        function TiledDataManager() {
            this.tiledMapDatas = {};
        }
        TiledDataManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new TiledDataManager();
            }
            return this.instance;
        };
        TiledDataManager.prototype.getMapData = function (tileMapId, isZip) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var result = _this.tiledMapDatas[tileMapId];
                if (result) {
                    resolve(result);
                    return;
                }
                var path = tileMapId + (isZip ? "_zip" : "_tmx");
                var mapUrl = "resource/config/map/" + tileMapId + "/" + path;
                RES.getResAsync(path, function (_date, url) {
                    if (isZip) {
                        _this.loadZipData(path)
                            .then(function (txt) {
                            _this.tiledMapDatas[tileMapId] = _this.initMapData(txt, mapUrl);
                            resolve(_this.tiledMapDatas[tileMapId]);
                        });
                    }
                    else {
                        _this.tiledMapDatas[tileMapId] = _this.initMapData(_date, mapUrl);
                        resolve(_this.tiledMapDatas[tileMapId]);
                    }
                }, _this);
            });
        };
        TiledDataManager.prototype.initMapData = function (_date, url) {
            var data = egret.XML.parse(_date);
            var tileW = Number(data["$tilewidth"]);
            var tileH = Number(data["$tileheight"]);
            var tileCountW = Number(data["$width"]);
            var tileCountH = Number(data["$height"]);
            var mapWidth = tileCountW * tileW;
            var mapHeight = tileCountH * tileH;
            var tiledMap = new tiled.TMXTilemap(mapWidth, mapHeight, data, url);
            return [data, tiledMap];
        };
        /**
         * 通过zip包解析地图数据资源
         */
        TiledDataManager.prototype.loadZipData = function (url) {
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
                        console.log("TiledDataManager - loadZipData fail(" + url + "):" + JSON.stringify(e));
                        reject();
                    });
                }, _this);
            });
        };
        TiledDataManager.instance = null;
        return TiledDataManager;
    }());
    zj.TiledDataManager = TiledDataManager;
    __reflect(TiledDataManager.prototype, "zj.TiledDataManager");
})(zj || (zj = {}));
//# sourceMappingURL=TiledDataManager.js.map