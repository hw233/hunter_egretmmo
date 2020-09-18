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
     * @class 通行证主界面奖励UI 每十级奖励Item
     *
     * @author lianlei
     *
     * @date 2019-11-21
     */
    var HXH_BattlePassRewardGoodItem = (function (_super) {
        __extends(HXH_BattlePassRewardGoodItem, _super);
        function HXH_BattlePassRewardGoodItem() {
            var _this = _super.call(this) || this;
            _this.listViewData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassRewardGoodItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_BattlePassRewardGoodItem"], null);
            return _this;
        }
        HXH_BattlePassRewardGoodItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_BattlePassRewardGoodItem.prototype.updateView = function (data) {
            var rewardList = [];
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            for (var key in tblInfo) {
                if (tblInfo.hasOwnProperty(key)) {
                    var element = tblInfo[key];
                    if (element.season == season)
                        rewardList.push(element);
                }
            }
            rewardList.sort(function (a, b) { return a.level - b.level; });
            var info = null;
            for (var j = 0; j < rewardList.length; j++) {
                if (rewardList[j].level == data.level) {
                    info = rewardList[j];
                    break;
                }
            }
            this.listViewData.removeAll();
            for (var i = 0; i < 1; i++) {
                var itemData = new zj.HXH_BattlePassRewardItemData();
                itemData.index = data.level;
                itemData.high = true;
                itemData.info = info;
                this.listViewData.addItem(itemData);
            }
            this.listView.dataProvider = this.listViewData;
            this.listView.itemRenderer = zj.HXH_BattlePassRewardItem;
        };
        return HXH_BattlePassRewardGoodItem;
    }(eui.ItemRenderer));
    zj.HXH_BattlePassRewardGoodItem = HXH_BattlePassRewardGoodItem;
    __reflect(HXH_BattlePassRewardGoodItem.prototype, "zj.HXH_BattlePassRewardGoodItem");
    var HXH_BattlePassRewardGoodItemData = (function () {
        function HXH_BattlePassRewardGoodItemData() {
        }
        return HXH_BattlePassRewardGoodItemData;
    }());
    zj.HXH_BattlePassRewardGoodItemData = HXH_BattlePassRewardGoodItemData;
    __reflect(HXH_BattlePassRewardGoodItemData.prototype, "zj.HXH_BattlePassRewardGoodItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassRewardGoodItem.js.map