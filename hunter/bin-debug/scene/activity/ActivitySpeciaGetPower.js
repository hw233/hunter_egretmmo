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
    // 福利-领取体力
    // lizhengqiang
    // 20190322
    var ActivitySpecialGetPower = (function (_super) {
        __extends(ActivitySpecialGetPower, _super);
        function ActivitySpecialGetPower() {
            var _this = _super.call(this) || this;
            _this.addStone = function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                });
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialGetPowerSkin.exml";
            _this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet1, _this);
            _this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet2, _this);
            _this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet3, _this);
            _this.btnBuy1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy1, _this);
            _this.btnBuy2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy2, _this);
            _this.btnBuy3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy3, _this);
            return _this;
        }
        ActivitySpecialGetPower.prototype.init = function () {
            var canGet = zj.CommonConfig.recieve_instance_power_info;
            var getTime = zj.CommonConfig.recieve_instance_power_time;
            for (var i = 0; i < canGet.length; i++) {
                var str = "0";
                if (i != 2) {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.GetPowerTime, Math.floor(getTime[canGet[i] - 1] / 3600), Math.floor(getTime[canGet[i]] / 3600 + 1));
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.GetPowerTime, Math.floor(getTime[canGet[i] - 1] / 3600), Math.floor(getTime[canGet[i]] / 3600));
                }
                this["lbTime" + (i + 1)].text = str;
            }
            this.setInfo();
        };
        ActivitySpecialGetPower.prototype.setInfo = function () {
            var rewardProgress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INSTANCE_POWER];
            var canGet = zj.CommonConfig.recieve_instance_power_info;
            var info = rewardProgress.info;
            var powerCount = zj.CommonConfig.recieve_instance_power_count;
            var powerConsume = zj.CommonConfig.recieve_instance_power_consume;
            var getReward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.instancePower;
            var _loop_1 = function (i) {
                var isGet = zj.Table.FindF(getReward, function (k, v) {
                    return v == canGet[i];
                });
                this_1["lbPower" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Friend.getPower, powerCount[i]);
                this_1["lbNum" + (i + 1)].text = powerConsume[i];
                if (rewardProgress.leftTime != 0 && info == canGet[i] && !isGet) {
                    this_1["btnGet" + (i + 1)].visible = true;
                    this_1["btnBuy" + (i + 1)].visible = false;
                    this_1["imgZuan" + (i + 1)].visible = false;
                    this_1["imgGet" + (i + 1)].visible = false;
                    this_1["lbNum" + (i + 1)].visible = false;
                    this_1["imgFood" + (i + 1)].source = zj.UIConfig.UIConfig_Special.foodNor[i + 1];
                }
                else if (rewardProgress.leftTime != 0 && info > canGet[i] && !isGet) {
                    this_1["btnGet" + (i + 1)].visible = false;
                    this_1["btnBuy" + (i + 1)].visible = true;
                    this_1["imgZuan" + (i + 1)].visible = true;
                    this_1["imgGet" + (i + 1)].visible = false;
                    this_1["lbNum" + (i + 1)].visible = true;
                    this_1["imgFood" + (i + 1)].source = zj.UIConfig.UIConfig_Special.foodNor[i + 1];
                }
                else if (rewardProgress.leftTime != 0 && isGet) {
                    this_1["btnGet" + (i + 1)].visible = false;
                    this_1["btnBuy" + (i + 1)].visible = false;
                    this_1["imgZuan" + (i + 1)].visible = false;
                    this_1["imgGet" + (i + 1)].visible = true;
                    this_1["lbNum" + (i + 1)].visible = false;
                    this_1["imgFood" + (i + 1)].source = zj.UIConfig.UIConfig_Special.foodDis[i + 1];
                }
                else {
                    this_1["btnGet" + (i + 1)].visible = true;
                    this_1["btnBuy" + (i + 1)].visible = false;
                    this_1["imgZuan" + (i + 1)].visible = false;
                    this_1["imgGet" + (i + 1)].visible = false;
                    this_1["lbNum" + (i + 1)].visible = false;
                    this_1["imgFood" + (i + 1)].source = zj.UIConfig.UIConfig_Special.foodNor[i + 1];
                    this_1["btnGet" + (i + 1)].currentState = "disabled";
                }
            };
            var this_1 = this;
            for (var i = 0; i < canGet.length; i++) {
                _loop_1(i);
            }
            var list = [];
            for (var _i = 0, canGet_1 = canGet; _i < canGet_1.length; _i++) {
                var v = canGet_1[_i];
                if (v <= info) {
                    list.push(v);
                }
            }
        };
        ActivitySpecialGetPower.prototype.onBtnGet1 = function () {
            this.onBtnBuy1();
        };
        ActivitySpecialGetPower.prototype.onBtnGet2 = function () {
            this.onBtnBuy2();
        };
        ActivitySpecialGetPower.prototype.onBtnGet3 = function () {
            this.onBtnBuy3();
        };
        ActivitySpecialGetPower.prototype.onBtnBuy1 = function () {
            this.getIndex = zj.CommonConfig.recieve_instance_power_info[0];
            this.powerIndex = 0;
            this.recievePower();
        };
        ActivitySpecialGetPower.prototype.onBtnBuy2 = function () {
            this.getIndex = zj.CommonConfig.recieve_instance_power_info[1];
            this.powerIndex = 1;
            this.recievePower();
        };
        ActivitySpecialGetPower.prototype.onBtnBuy3 = function () {
            this.getIndex = zj.CommonConfig.recieve_instance_power_info[2];
            this.powerIndex = 2;
            this.recievePower();
        };
        ActivitySpecialGetPower.prototype.recievePower = function () {
            var _this = this;
            zj.Game.PlayerActivitySystem.recievePower(this.getIndex).then(function () {
                _this.setInfo();
                var power = "+" + zj.CommonConfig.recieve_instance_power_count[_this.powerIndex];
                var source = zj.PlayerItemSystem.ItemPath(message.EResourceType.RESOURCE_POWER);
                zj.Game.EventManager.event(zj.GameEvent.SHOW_COMMON_MESSAGE, { source: source, text: power });
                zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            }).catch(function (result) {
                if (result == message.EC.XG_LACK_TOKEN) {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextsConfig_Money.demstone);
                        dialog.setCB(_this.addStone);
                    });
                }
                else {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                }
            });
        };
        return ActivitySpecialGetPower;
    }(zj.UI));
    zj.ActivitySpecialGetPower = ActivitySpecialGetPower;
    __reflect(ActivitySpecialGetPower.prototype, "zj.ActivitySpecialGetPower");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpeciaGetPower.js.map