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
     * xingliwei
     * 2019.11.30
     * c 成长基金item
     */
    var ActivitySpecialWonderlandItem = (function (_super) {
        __extends(ActivitySpecialWonderlandItem, _super);
        function ActivitySpecialWonderlandItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivitySpecialWonderlandItemSkin.exml";
            _this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMonthCard, _this);
            return _this;
        }
        ActivitySpecialWonderlandItem.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            this.lbPlayerLevel.text = "" + data.info.reward_level;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < data.info.goods_id.length; i++) {
                arrCollection.addItem({
                    "goods": data.info.goods_id[i],
                    "count": data.info.goods_count[i],
                    "isGet": false
                });
            }
            this.lstAward.dataProvider = arrCollection;
            this.lstAward.itemRenderer = zj.ActivityActivityItemB;
            this.info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == data.id;
            })[0];
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.dailyInfo = zj.PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
            this.imgGet.visible = false;
            var level = Number(this.dailyInfo[this.data.index].reward_level);
            var find = zj.Table.FindF(this.info["markIndex"], function (k, v) {
                return v == _this.dailyInfo[_this.data.index].index;
            });
            var image1 = zj.UIConfig.UIConfig_Gift.reach; // 达成
            var image2 = zj.UIConfig.UIConfig_Gift.get; // 领取
            if (!find && zj.Game.PlayerInfoSystem.BaseInfo.level >= level && data.father.vis) {
                // 可领取
                this.btnMonthCard.visible = true;
                this.btnMonthCard.enabled = true;
            }
            else if (find && zj.Game.PlayerInfoSystem.BaseInfo.level >= level && data.father.vis) {
                // 已领取
                this.imgGet.visible = true;
                this.btnMonthCard.visible = false;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.level < level && !data.father.vis) {
                // 不可领
                this.btnMonthCard.visible = true;
                this.btnMonthCard.enabled = false;
            }
            else {
                this.btnMonthCard.visible = true;
                this.btnMonthCard.enabled = false;
            }
        };
        ActivitySpecialWonderlandItem.prototype.onBtnMonthCard = function () {
            var _this = this;
            if (this.giftInfo.gift_form == 6) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.dailyInfo[this.data.index].index).then(function (msg) { _this.simulateCharge(msg); });
            }
            else if (this.giftInfo.gift_form == 3) {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (msg) { _this.simulateCharge(msg); });
            }
        };
        ActivitySpecialWonderlandItem.prototype.simulateCharge = function (msg) {
            var _this = this;
            for (var _i = 0, _a = msg.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.index == this.info["index"]) {
                    this.info = zj.Table.DeepCopy(v);
                }
            }
            var data = this.data;
            var goods = [];
            for (var i = 0; i < data.info.goods_id.length; i++) {
                var a = new message.GoodsInfo();
                a.goodsId = data.info.goods_id[i];
                a.count = data.info.goods_count[i];
                goods.push(a);
            }
            zj.loadUI(zj.CommonGetDialog)
                .then(function (dialog) {
                dialog.show();
                dialog.init(goods);
                dialog.setCB(function () {
                    _this.data.father.init();
                });
            });
        };
        return ActivitySpecialWonderlandItem;
    }(eui.ItemRenderer));
    zj.ActivitySpecialWonderlandItem = ActivitySpecialWonderlandItem;
    __reflect(ActivitySpecialWonderlandItem.prototype, "zj.ActivitySpecialWonderlandItem");
    var ActivitySpecialWonderlandItemData = (function () {
        function ActivitySpecialWonderlandItemData() {
        }
        return ActivitySpecialWonderlandItemData;
    }());
    zj.ActivitySpecialWonderlandItemData = ActivitySpecialWonderlandItemData;
    __reflect(ActivitySpecialWonderlandItemData.prototype, "zj.ActivitySpecialWonderlandItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialWonderlandItem.js.map