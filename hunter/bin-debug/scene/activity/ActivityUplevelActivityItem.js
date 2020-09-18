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
    //开服冲级赢大奖Item
    //yuqingchao
    //2019.03.23
    var ActivityUplevelActivityItem = (function (_super) {
        __extends(ActivityUplevelActivityItem, _super);
        function ActivityUplevelActivityItem() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.skinName = "resource/skins/activity/ActivityUplevelActivityItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityUplevelActivityItem"], null);
            _this.groupDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupGet, _this);
            return _this;
        }
        ActivityUplevelActivityItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.i = this.data.i;
            this.activities = this.data.activities;
            this.index = this.info.index;
            this.curNum = this.activities.uplevelReward;
            this.setItemInfo();
        };
        ActivityUplevelActivityItem.prototype.setItemInfo = function () {
            for (var k in this.activities.uplevelItems) {
                var v = this.activities.uplevelItems[k];
                if (v.index < this.index) {
                    this.curNum = this.curNum - v.rewardCount;
                    if (this.curNum <= 0)
                        this.curNum = 0;
                }
            }
            if (this.curNum > this.info.rewardCount) {
                this.curNum = this.info.rewardCount;
            }
            this.lbNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.get, this.curNum, this.info.rewardCount);
            if (this.curNum < this.info.rewardCount) {
                this.lbNum.textColor = zj.ConstantConfig_Common.Color.white;
            }
            else {
                this.lbNum.textColor = zj.ConstantConfig_Common.Color.red;
            }
            this.imgLevel.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.upLevel[this.data.i], this);
            this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.giftIcon[this.info.picId], this);
            if (this.data.i == 0) {
                this.imgBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Common.itemFrame[3], this);
            }
            else if (this.data.i == 1) {
                this.imgBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Common.itemFrame[2], this);
            }
            else {
                this.imgBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Common.itemFrame[1], this);
            }
        };
        ActivityUplevelActivityItem.prototype.onGroupGet = function () {
            var _this = this;
            zj.loadUI(zj.Daily_AwardPop)
                .then(function (dialog) {
                dialog.SetInfoGift(_this.info.goodsInfo, null, null);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return ActivityUplevelActivityItem;
    }(eui.ItemRenderer));
    zj.ActivityUplevelActivityItem = ActivityUplevelActivityItem;
    __reflect(ActivityUplevelActivityItem.prototype, "zj.ActivityUplevelActivityItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityUplevelActivityItem.js.map