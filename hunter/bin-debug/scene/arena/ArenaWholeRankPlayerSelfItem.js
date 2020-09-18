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
     * @author xing li wei
     *
     * @date 2019-1-29
     *
     * @class 跨服排行世界精英子项界面
     */
    var ArenaWholeRankPlayerSelfItem = (function (_super) {
        __extends(ArenaWholeRankPlayerSelfItem, _super);
        function ArenaWholeRankPlayerSelfItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeRankPlayerSelfItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeRankPlayerSelfItem"], null);
            return _this;
        }
        ArenaWholeRankPlayerSelfItem.prototype.dataChanged = function () {
            var data = this.data;
            this.labelSeveName.text = this.data.info.serverName;
            for (var i = 0; i < 3; i++) {
                var name_1 = zj.TextsConfig.TextsConfig_Pk.norank.name;
                if (data.info.serverData[i + 1] != 0 && data.info.serverData[i + 1] != null) {
                    name_1 = data.info.serverData[i + 1].role_name;
                }
                this["labelPlayerName" + (i + 1)].text = name_1;
            }
        };
        return ArenaWholeRankPlayerSelfItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeRankPlayerSelfItem = ArenaWholeRankPlayerSelfItem;
    __reflect(ArenaWholeRankPlayerSelfItem.prototype, "zj.ArenaWholeRankPlayerSelfItem");
    /**子项数据源 */
    var ArenaWholeRankPlayerSelfItemData = (function () {
        function ArenaWholeRankPlayerSelfItemData() {
        }
        return ArenaWholeRankPlayerSelfItemData;
    }());
    zj.ArenaWholeRankPlayerSelfItemData = ArenaWholeRankPlayerSelfItemData;
    __reflect(ArenaWholeRankPlayerSelfItemData.prototype, "zj.ArenaWholeRankPlayerSelfItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeRankPlayerSelfItem.js.map