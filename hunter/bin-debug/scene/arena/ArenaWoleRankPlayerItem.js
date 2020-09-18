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
     * @author
     *
     * @date 2019-1-29
     *
     * @class 跨服排行今日昨日排名子项界面
     */
    var ArenaWoleRankPlayerItem = (function (_super) {
        __extends(ArenaWoleRankPlayerItem, _super);
        function ArenaWoleRankPlayerItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWoleRankPlayerItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWoleRankPlayerItem"], null);
            return _this;
        }
        ArenaWoleRankPlayerItem.prototype.dataChanged = function () {
            var data = this.data;
        };
        return ArenaWoleRankPlayerItem;
    }(eui.ItemRenderer));
    zj.ArenaWoleRankPlayerItem = ArenaWoleRankPlayerItem;
    __reflect(ArenaWoleRankPlayerItem.prototype, "zj.ArenaWoleRankPlayerItem");
    /**子项数据源 */
    var ArenaWoleRankPlayerItemData = (function () {
        function ArenaWoleRankPlayerItemData() {
        }
        return ArenaWoleRankPlayerItemData;
    }());
    zj.ArenaWoleRankPlayerItemData = ArenaWoleRankPlayerItemData;
    __reflect(ArenaWoleRankPlayerItemData.prototype, "zj.ArenaWoleRankPlayerItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWoleRankPlayerItem.js.map