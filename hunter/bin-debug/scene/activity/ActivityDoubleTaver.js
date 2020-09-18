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
    //酒馆双倍积分
    //yuqingchao
    //2019.04.04
    var ActivityDoubleTaver = (function (_super) {
        __extends(ActivityDoubleTaver, _super);
        function ActivityDoubleTaver() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityDoubleTaverSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityDoubleTaver"], null);
            _this.btnGetPartnerPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetPartnerPoint, _this);
            _this.btnUsepartherPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUsepartherPoint, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityDoubleTaver.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoTime();
            this.setInfoUI();
            this.info.rewards;
        };
        //时间戳转换为字符串格式
        ActivityDoubleTaver.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityDoubleTaver.prototype.init = function () {
            // Game.DragonBonesManager.playAnimation(this, "ui_tongyong_huodongguang_eff", "armatureName", null, 0).then(display => {
            // 	this.groupAnimal.addChild(display);
            // }).catch(reason => {
            // 	toast(reason);
            // });
        };
        ActivityDoubleTaver.prototype.setInfoTime = function () {
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
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbInfo.text = this.info.des;
        };
        ActivityDoubleTaver.prototype.setInfoUI = function () {
            var has_get = zj.Table.FindF(this.info.rewardIndex, function (_k, _v) {
                return _v == 1;
            });
            this.btnGetPartnerPoint.enabled = !has_get;
        };
        ActivityDoubleTaver.prototype.onBtnGetPartnerPoint = function () {
            var _this = this;
            zj.Game.PlayerActivitySystem.queryActivitysReward(message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING).then(function () {
                if (_this.info != null && _this.info.closeTime > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    var type = _this.info.type;
                    var index = _this.info.index;
                    var rewardIndex = 1;
                    zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then(function (resp) {
                        _this.btnGetPartnerPoint.enabled = false;
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(resp.getGoods);
                            dialog.setCB(function () {
                                if (_this.father) {
                                    _this.father.setInit();
                                }
                            });
                            dialog.show();
                        });
                    });
                }
            });
        };
        ActivityDoubleTaver.prototype.onBtnUsepartherPoint = function () {
            zj.loadUI(zj.TavernScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
                scene.nPCDialog();
            });
            this.father.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityDoubleTaver;
    }(zj.UI));
    zj.ActivityDoubleTaver = ActivityDoubleTaver;
    __reflect(ActivityDoubleTaver.prototype, "zj.ActivityDoubleTaver");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityDoubleTaver.js.map