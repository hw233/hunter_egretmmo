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
     * tiledMap 图片对象类
     * zhaiweili
     * 2019.10.24
     */
    var TiledImgBase = (function (_super) {
        __extends(TiledImgBase, _super);
        function TiledImgBase(gid, tileX, tileY, tileW, tileH, tileSet) {
            var _this = _super.call(this) || this;
            _this.gid = gid;
            _this.tileX = tileX;
            _this.tileY = tileY;
            _this.tileSet = tileSet;
            _this.x = tileX * tileW;
            _this.y = (tileY + 1) * tileH;
            _this.width = tileSet.tilewidth;
            _this.height = tileSet.tileheight;
            _this.anchorOffsetY = _this.height;
            var idx = gid - tileSet.firstgid;
            var ix = idx % tileSet.horizontalTileCount;
            var iy = Math.floor(idx / tileSet.horizontalTileCount);
            var img = new eui.Image();
            img.source = tileSet.image.source;
            img.x = -ix * tileSet.tilewidth;
            img.y = -iy * tileSet.tileheight;
            _this.addChild(img);
            _this.mask = new egret.Rectangle(tileSet.tilewidth, tileSet.tileheight);
            return _this;
        }
        return TiledImgBase;
    }(egret.DisplayObjectContainer));
    zj.TiledImgBase = TiledImgBase;
    __reflect(TiledImgBase.prototype, "zj.TiledImgBase");
})(zj || (zj = {}));
//# sourceMappingURL=TiledImgBase.js.map