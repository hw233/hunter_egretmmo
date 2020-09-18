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
    //累计充值送大礼（特效卡，累计充值）Item
    //yuqingchao
    //2019.03.23
    var ActivityTopUpActivityItem = (function (_super) {
        __extends(ActivityTopUpActivityItem, _super);
        function ActivityTopUpActivityItem() {
            var _this = _super.call(this) || this;
            _this.saveGet = false;
            _this.i = 0;
            _this.skinName = "resource/skins/activity/ActivityTopUpActivityItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityTopUpActivityItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.main = null;
                // this.father = null;
            }, null);
            return _this;
        }
        ActivityTopUpActivityItem.prototype.dataChanged = function () {
            this.i = this.data.i;
            var info = this.data.info;
            this.main = this.data.main;
            var index = this.data.father.index;
            this.activities = this.data.activities;
            this.father = this.data.father;
            var bStart = this.data.father.getInfoStart(); //活动是否开启
            var bIsGet = zj.Table.VIn(this.activities.rewardIndex, this.i + 1); //已领取
            var bNotGet = this.data.father.info.itemCount >= this.data.info.rankZone[0] && bIsGet != true && bStart;
            this.lbNum.text = this.data.info.rankZone[0];
            this.btnGet.enabled = bNotGet;
            this.btnGet.visible = !bIsGet;
            this.imgGet.visible = bIsGet;
            if (this.saveGet && bIsGet) {
                this.runActionGet();
            }
            this.saveGet = bNotGet;
            this.setAwardList(info);
        };
        ActivityTopUpActivityItem.prototype.runActionGet = function () {
            var bStart = this.data.father.getInfoStart(); //活动是否开启
            var bIsGet = zj.Table.VIn(this.activities.rewardIndex, this.i + 1); //已领取
            var bNotGet = this.activities.itemCount >= this.data.info.rankZone[0] && bIsGet;
            // this.lbNum.text = this.data.father.info.rewardZone[this.i];
            this.btnGet.enabled = bNotGet;
            this.btnGet.visible = !bIsGet;
            this.imgGet.visible = bIsGet;
        };
        ActivityTopUpActivityItem.prototype.setAwardList = function (info) {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < info.goodsInfo.length; i++) {
                this.arrayCollection.addItem({
                    j: i,
                    i: this.i,
                    info: info.goodsInfo[i],
                    main: this.main,
                });
            }
            this.lstViewAward.dataProvider = this.arrayCollection;
            this.lstViewAward.itemRenderer = zj.ActivityAwardItem1;
        };
        ActivityTopUpActivityItem.prototype.btnEnabled = function () {
            this.father.onLstView();
        };
        ActivityTopUpActivityItem.prototype.onBtnGet = function () {
            var _this = this;
            var bStart = this.data.father.getInfoStart(); //活动是否开启
            var bIsGet = zj.Table.VIn(this.activities.rewardIndex, this.data.i + 1); //已领取
            var bNotGet = this.activities.itemCount >= this.data.info.rankZone[0] && bIsGet != true && bStart;
            if (bNotGet) {
                this.saveGet = true;
                var any = this.activities;
                var type = this.activities.type;
                var index = this.activities.index;
                var rewardIndex = this.data.i + 1;
                zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, bNotGet).then(function (resp) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                        dialog.setCB(function () {
                            _this.btnEnabled();
                            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                        });
                    });
                });
            }
        };
        return ActivityTopUpActivityItem;
    }(eui.ItemRenderer));
    zj.ActivityTopUpActivityItem = ActivityTopUpActivityItem;
    __reflect(ActivityTopUpActivityItem.prototype, "zj.ActivityTopUpActivityItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTopUpActivityItem.js.map