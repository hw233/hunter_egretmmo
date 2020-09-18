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
     * @class 跨服对手防守阵容子项界面
     */
    var ArenaWholeEnemyItem = (function (_super) {
        __extends(ArenaWholeEnemyItem, _super);
        function ArenaWholeEnemyItem() {
            var _this = _super.call(this) || this;
            _this.enemyItems = new eui.ArrayCollection();
            _this.skinName = "resource/skins/arena/ArenaWholeEnemyItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeEnemyItem"], null);
            return _this;
        }
        ArenaWholeEnemyItem.prototype.dataChanged = function () {
            var data = this.data;
            var generals;
            var supports;
            if (data.enemyInfo.simpleInfo != null) {
                generals = data.enemyInfo.simpleInfo.generals;
                supports = data.enemyInfo.simpleInfo.supports;
            }
            else {
                generals = data.enemyInfo.generals;
                supports = data.enemyInfo.supports;
            }
            this.enemyItems.removeAll();
            for (var i = 0; i < generals.length; i++) {
                if (generals[i].general_id != 0) {
                    this.createItem(generals[i]);
                }
            }
            this.imgGradeName.source = zj.cachekey(zj.UIConfig.UIConfig_Pk.TeamIndex[data.index + 1], this);
        };
        ArenaWholeEnemyItem.prototype.createItem = function (info, supports) {
            var data = new zj.ArenaWholeEnemyItemItemData();
            data.info = info;
            this.enemyItems.addItem(data);
            this.listViewEnemy.dataProvider = this.enemyItems;
            this.listViewEnemy.itemRenderer = zj.ArenaWholeEnemyItemItem;
        };
        return ArenaWholeEnemyItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeEnemyItem = ArenaWholeEnemyItem;
    __reflect(ArenaWholeEnemyItem.prototype, "zj.ArenaWholeEnemyItem");
    /**子项数据源 */
    var ArenaWholeEnemyItemData = (function () {
        function ArenaWholeEnemyItemData() {
        }
        return ArenaWholeEnemyItemData;
    }());
    zj.ArenaWholeEnemyItemData = ArenaWholeEnemyItemData;
    __reflect(ArenaWholeEnemyItemData.prototype, "zj.ArenaWholeEnemyItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeEnemyItem.js.map