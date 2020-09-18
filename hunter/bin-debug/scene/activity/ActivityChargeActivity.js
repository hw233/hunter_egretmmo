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
    //充值送好礼
    //yuqingchao
    //2019.03.23
    var ActivityChargeActivity = (function (_super) {
        __extends(ActivityChargeActivity, _super);
        function ActivityChargeActivity() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityChargeActivitySkin.exml";
            zj.cachekeys(zj.UIResource["ActivityChargeActivity"], null);
            _this.btnGoCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoCharge, _this);
            _this.groupBag1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBroupBag1, _this);
            _this.groupBag2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBroupBag2, _this);
            _this.groupBag3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBroupBag3, _this);
            _this.groupBag4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBroupBag4, _this);
            _this.groupBag5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBroupBag5, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        ActivityChargeActivity.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            for (var i = 0; i < this.info.rewards.length; i++) {
                this["imgMask" + (i + 1)].visible = false;
            }
            this.setInfoText();
            this.setInfoAward();
        };
        ActivityChargeActivity.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityChargeActivity.prototype.setInfoText = function () {
            var strOpen = this.time(this.info.openTime);
            var timeOpen;
            if (strOpen.m < 10) {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
            }
            else {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
            }
            var strColse = this.time(this.info.closeTime);
            var timeColse;
            if (strColse.m < 10) {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
            }
            else {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
            }
            var curMoney = this.info.itemCount + "";
            var chargeDaily = this.info.chargeDaily;
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbMoney.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.chargeToday, curMoney, chargeDaily);
            this.canGet = this.info.itemCount >= this.info.chargeDaily;
            this.saveStart = this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString());
        };
        ActivityChargeActivity.prototype.setInfoAward = function () {
            for (var i = 0; i < this.info.rewards.length; i++) {
                var _a = this.getInfoToday(), today = _a[0], isGFet = _a[1];
                var bStart = this.getInfoStart();
                var bNotGet = i + 1 == today && !isGFet && bStart && this.canGet;
                var bIsGet = i + 1 < today || (i + 1 == today && isGFet);
                var bCanGet = i + 1 == today && !isGFet && bStart;
                this["imgGet" + (i + 1)].visible = bNotGet;
                this["imgBag" + (i + 1)].visible = bIsGet;
                if (!this["imgBag" + (i + 1)] && bIsGet) {
                    this["imgBag" + (i + 1)].visible = bIsGet;
                }
                this["imgBag" + (i + 1)].visible = bIsGet;
                this["imgMask" + (i + 1)].visible = bIsGet;
            }
        };
        ActivityChargeActivity.prototype.getInfoToday = function () {
            var reward = this.info.todayReward;
            var today = this.info.daysIndex;
            today = zj.yuan3(reward, today, today + 1);
            return [today, reward];
        };
        ActivityChargeActivity.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        ActivityChargeActivity.prototype.onGroupGet = function (i) {
            var _this = this;
            var _a = this.getInfoToday(), today = _a[0], isGFet = _a[1];
            var bStart = this.getInfoStart();
            var bNotGet = i == today - 1 && !isGFet && bStart && this.canGet;
            var bIsGet = i < today - 1 || (i == today - 1 && isGFet);
            var type = this.info.type;
            var index = this.info.index;
            var rewardIndex = index;
            // this.curIndex = index;
            if (bNotGet) {
                zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, true).then(function (resp) {
                    _this.father.setInit(true);
                    _this.info = _this.father.dataList[_this.father.lstViewType.selectedIndex];
                    _this.setInfoAward();
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                        dialog.setCB(function () {
                            _this.father.setInit(true);
                            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                        });
                    });
                });
            }
            else {
                zj.loadUI(zj.Daily_AwardPop)
                    .then(function (dialog) {
                    zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                    dialog.SetInfoGift(_this.info.rewards[i].goodsInfo, null, null);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        ActivityChargeActivity.prototype.onBroupBag1 = function () {
            this.onGroupGet(0);
        };
        ActivityChargeActivity.prototype.onBroupBag2 = function () {
            this.onGroupGet(1);
        };
        ActivityChargeActivity.prototype.onBroupBag3 = function () {
            this.onGroupGet(2);
        };
        ActivityChargeActivity.prototype.onBroupBag4 = function () {
            this.onGroupGet(3);
        };
        ActivityChargeActivity.prototype.onBroupBag5 = function () {
            this.onGroupGet(4);
        };
        //跳转支付
        ActivityChargeActivity.prototype.onBtnGoCharge = function () {
            var _this = this;
            zj.loadUI(zj.PayMallScene)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.init();
                dialog.setCB(function () {
                    _this.father.setInit(true);
                    _this.info = _this.father.dataList[_this.father.lstViewType.selectedIndex];
                    _this.setInfoAward();
                    _this.setInfoText();
                });
            });
        };
        return ActivityChargeActivity;
    }(zj.UI));
    zj.ActivityChargeActivity = ActivityChargeActivity;
    __reflect(ActivityChargeActivity.prototype, "zj.ActivityChargeActivity");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityChargeActivity.js.map