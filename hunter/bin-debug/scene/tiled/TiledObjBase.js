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
     * tiledMap object 数据对象(有碰撞和遮挡关系)
     * zhaiweili
     * 2019.10.24
     */
    var TiledObjBase = (function (_super) {
        __extends(TiledObjBase, _super);
        function TiledObjBase(dict) {
            var _this = _super.call(this) || this;
            _this.dict = dict;
            _this.initInfo(dict);
            return _this;
        }
        TiledObjBase.prototype.initInfo = function (dict) {
            // dict["name"]
            // dict["type"]
        };
        TiledObjBase.prototype.setPosByTile = function (tileX, tileY, tileW, tileH) {
            this.setPos((tileX + 0.5) * tileW, (tileY + 0.5) * tileH);
        };
        TiledObjBase.prototype.setPos = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return TiledObjBase;
    }(egret.DisplayObjectContainer));
    zj.TiledObjBase = TiledObjBase;
    __reflect(TiledObjBase.prototype, "zj.TiledObjBase");
})(zj || (zj = {}));
//# sourceMappingURL=TiledObjBase.js.map