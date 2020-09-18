var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    function closeCache(obj) {
        CacheImgManager.getInstance().closeCache(obj);
    }
    zj.closeCache = closeCache;
    function closeCaches(objs) {
        CacheImgManager.getInstance().closeCacheList(objs);
    }
    zj.closeCaches = closeCaches;
    function setCache(obj, count) {
        if (count === void 0) { count = 3; }
        CacheImgManager.getInstance().setCache(obj, count);
    }
    zj.setCache = setCache;
    function setCaches(objs, count) {
        if (count === void 0) { count = 3; }
        CacheImgManager.getInstance().setCaches(objs, count);
    }
    zj.setCaches = setCaches;
    /**
     * 位图缓存管理类
     */
    var CacheImgManager = (function () {
        function CacheImgManager() {
        }
        CacheImgManager.getInstance = function () {
            if (!CacheImgManager.instance) {
                CacheImgManager.instance = new CacheImgManager();
            }
            return CacheImgManager.instance;
        };
        CacheImgManager.prototype.closeCache = function (obj) {
            obj.cacheAsBitmap = false;
        };
        CacheImgManager.prototype.closeCacheList = function (objs) {
            if (objs) {
                for (var i = objs.length - 1; i >= 0; --i) {
                    this.closeCache(objs[i]);
                }
            }
        };
        CacheImgManager.prototype.setCaches = function (objs, count) {
            if (count === void 0) { count = 3; }
            if (objs) {
                for (var i = objs.length - 1; i >= 0; --i) {
                    this.setCache(objs[i], count);
                }
            }
        };
        CacheImgManager.prototype.setCache = function (obj, count) {
            if (count === void 0) { count = 3; }
            if (CacheImgManager.isOpenCache) {
                if (this.checkRes(obj)) {
                    obj.cacheAsBitmap = true;
                }
                else {
                    if (count > 0) {
                        egret.setTimeout(this.setCache, this, 500, obj, count - 1);
                    }
                    else {
                        egret.error("setCache fail");
                    }
                }
            }
        };
        CacheImgManager.prototype.checkRes = function (obj) {
            if (!obj.visible) {
                return true;
            }
            if (egret.is(obj, "eui.Image")) {
                var res = obj.source;
                if (res && !RES.getRes(res)) {
                    return false;
                }
                return true;
            }
            if (egret.is(obj, "egret.DisplayObjectContainer")) {
                for (var i = obj.numChildren - 1; i >= 0; --i) {
                    var childDisplay = obj.getChildAt(i);
                    if (!this.checkRes(childDisplay)) {
                        return false;
                    }
                }
            }
            return true;
        };
        CacheImgManager.isOpenCache = true; // 位图缓存开关
        CacheImgManager.instance = null;
        return CacheImgManager;
    }());
    zj.CacheImgManager = CacheImgManager;
    __reflect(CacheImgManager.prototype, "zj.CacheImgManager");
})(zj || (zj = {}));
//# sourceMappingURL=CacheImgManager.js.map