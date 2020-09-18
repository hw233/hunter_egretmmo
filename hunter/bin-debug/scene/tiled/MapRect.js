var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 地图中的区域（非tiledMap地图中的碰撞检测用）
     * zhaiweili
     * 2019.10.24
     */
    var MapRect = (function () {
        function MapRect(x, y, w, h, rotation) {
            if (rotation === void 0) { rotation = 0; }
            this.setTo(x, y, w, h, rotation);
        }
        MapRect.prototype.setTo = function (rx, ry, rw, rh, rotation) {
            if (rotation === void 0) { rotation = 0; }
            this.posLUp = new egret.Point(rx, ry);
            var _a = zj.Util.getPosByRadiiAndAngle(rx, ry, rotation, rw), x = _a[0], y = _a[1];
            this.posRUp = new egret.Point(x, y);
            _b = zj.Util.getPosByRadiiAndAngle(rx, ry, rotation + 90, rh), x = _b[0], y = _b[1];
            this.posLDown = new egret.Point(x, y);
            this.posRDown = new egret.Point(this.posRUp.x + this.posLDown.x - rx, this.posRUp.y + this.posLDown.y - ry);
            this.left = Math.min(this.posLUp.x, this.posRUp.x, this.posRDown.x, this.posLDown.x);
            this.right = Math.max(this.posLUp.x, this.posRUp.x, this.posRDown.x, this.posLDown.x);
            this.top = Math.min(this.posLUp.y, this.posRUp.y, this.posRDown.y, this.posLDown.y);
            this.bottom = Math.max(this.posLUp.y, this.posRUp.y, this.posRDown.y, this.posLDown.y);
            return this;
            var _b;
        };
        /**
         * 检测点是否在区域内
         */
        MapRect.prototype.isInPoint = function (x, y) {
            var jUp = zj.Util.getAngle(x, y, this.posLUp.x, this.posLUp.y, this.posRUp.x, this.posRUp.y);
            var jRight = zj.Util.getAngle(x, y, this.posRDown.x, this.posRDown.y, this.posRUp.x, this.posRUp.y);
            var jDown = zj.Util.getAngle(x, y, this.posLDown.x, this.posLDown.y, this.posRDown.x, this.posRDown.y);
            var jLeft = zj.Util.getAngle(x, y, this.posLUp.x, this.posLUp.y, this.posLDown.x, this.posLDown.y);
            return Math.round(jUp + jRight + jDown + jLeft) == 360;
        };
        return MapRect;
    }());
    zj.MapRect = MapRect;
    __reflect(MapRect.prototype, "zj.MapRect");
})(zj || (zj = {}));
//# sourceMappingURL=MapRect.js.map