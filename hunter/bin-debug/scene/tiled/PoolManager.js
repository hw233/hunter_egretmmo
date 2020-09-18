var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 对象池管理类
     * zhaiweili
     * 2019.10.24
     */
    var PoolManager = (function () {
        // private pointList: egret.Point[];
        // private rectList: MapRect[];
        function PoolManager() {
            this.key_point = "point";
            this.key_mapRect = "mapRect";
            // this.pointList = [];
            // this.rectList = [];
            this.datas = {};
            this.datas[this.key_point] = [];
            this.datas[this.key_mapRect] = [];
        }
        PoolManager.getInstance = function () {
            if (!PoolManager.instance) {
                PoolManager.instance = new PoolManager();
            }
            return PoolManager.instance;
        };
        PoolManager.prototype.getPoint = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var list = this.datas[this.key_point];
            if (list.length > 0) {
                return list.shift().setTo(x, y);
            }
            return new egret.Point(x, y);
        };
        PoolManager.prototype.addPoint = function (pos) {
            this.datas[this.key_point].push(pos);
        };
        PoolManager.prototype.getMapRect = function (x, y, w, h, rotation) {
            if (rotation === void 0) { rotation = 0; }
            var list = this.datas[this.key_mapRect];
            if (list.length > 0) {
                return list.shift().setTo(x, y, w, h, rotation);
            }
            return new zj.MapRect(x, y, w, h, rotation);
        };
        PoolManager.prototype.addMapRect = function (rect) {
            this.datas[this.key_mapRect].push(rect);
        };
        PoolManager.prototype.getObj = function (key, classz) {
            var list = this.datas[key];
            if (list && list.length > 0) {
                return list.shift();
            }
            return new classz();
        };
        PoolManager.prototype.addObj = function (key, item) {
            if (!this.datas[key]) {
                this.datas[key] = [];
            }
            this.datas[key].push(item);
        };
        return PoolManager;
    }());
    zj.PoolManager = PoolManager;
    __reflect(PoolManager.prototype, "zj.PoolManager");
})(zj || (zj = {}));
//# sourceMappingURL=PoolManager.js.map