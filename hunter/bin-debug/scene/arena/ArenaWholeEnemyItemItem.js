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
     * @class 跨服对手防守阵容子项的子项
     */
    var ArenaWholeEnemyItemItem = (function (_super) {
        __extends(ArenaWholeEnemyItemItem, _super);
        function ArenaWholeEnemyItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeEnemyItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeEnemyItemItem"], null);
            return _this;
        }
        ArenaWholeEnemyItemItem.prototype.dataChanged = function () {
            var data = this.data;
            var tableGeneral = zj.TableBaseGeneral.Table();
            var headPath = zj.PlayerHunterSystem.Head(data.info);
            this.imgHead.source = zj.cachekey(headPath, this);
            this.imgBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.info.step], this);
            this.labelLevel.text = data.info.level.toString();
            var awakeLevel = data.info.awaken_level;
            zj.Helper.SetHeroAwakenStar(this.groupStar, data.info.star, awakeLevel);
        };
        return ArenaWholeEnemyItemItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeEnemyItemItem = ArenaWholeEnemyItemItem;
    __reflect(ArenaWholeEnemyItemItem.prototype, "zj.ArenaWholeEnemyItemItem");
    /**子项数据源 */
    var ArenaWholeEnemyItemItemData = (function () {
        function ArenaWholeEnemyItemItemData() {
        }
        return ArenaWholeEnemyItemItemData;
    }());
    zj.ArenaWholeEnemyItemItemData = ArenaWholeEnemyItemItemData;
    __reflect(ArenaWholeEnemyItemItemData.prototype, "zj.ArenaWholeEnemyItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeEnemyItemItem.js.map