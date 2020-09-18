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
    // wang shen zhuo
    // DarkLandPortMainItem
    // 20190411
    var DarkLandPortMainItem = (function (_super) {
        __extends(DarkLandPortMainItem, _super);
        function DarkLandPortMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/DarkLandPortMainItemSkin.exml";
            return _this;
        }
        DarkLandPortMainItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.info = this.data.info;
            this.father = this.data.father;
            this.SetInfoItem();
        };
        DarkLandPortMainItem.prototype.SetInfoItem = function () {
            if ((this.info.rank_min + 1) == this.info.rank_max) {
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.info.rank_max);
            }
            else {
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank2, (this.info.rank_min + 1), this.info.rank_max);
            }
            this.SetInfoList();
        };
        DarkLandPortMainItem.prototype.SetInfoList = function () {
            var award = [];
            for (var i = 0; i < this.info.rank_reward.length; i++) {
                var goods = new message.GoodsInfo();
                goods.goodsId = this.info.rank_reward[i][0];
                goods.count = this.info.rank_reward[i][1];
                award.push(goods);
            }
            this.listReward.itemRenderer = zj.GiftCommonAwardItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < award.length; i++) {
                this.TableViewItem.addItem(award[i]);
            }
            this.listReward.dataProvider = this.TableViewItem;
        };
        return DarkLandPortMainItem;
    }(eui.ItemRenderer));
    zj.DarkLandPortMainItem = DarkLandPortMainItem;
    __reflect(DarkLandPortMainItem.prototype, "zj.DarkLandPortMainItem");
    var DarkLandPortMainItemData = (function () {
        function DarkLandPortMainItemData() {
        }
        return DarkLandPortMainItemData;
    }());
    zj.DarkLandPortMainItemData = DarkLandPortMainItemData;
    __reflect(DarkLandPortMainItemData.prototype, "zj.DarkLandPortMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandPortMainItem.js.map