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
    var RED_PACKAGE;
    (function (RED_PACKAGE) {
        RED_PACKAGE[RED_PACKAGE["DONE"] = 1] = "DONE";
        RED_PACKAGE[RED_PACKAGE["UNDONE"] = 2] = "UNDONE";
    })(RED_PACKAGE = zj.RED_PACKAGE || (zj.RED_PACKAGE = {}));
    /**
     * @class 红包活动(主城界面)
     *
     * @author LianLei
     *
     * @date 2020-01-08
     */
    var Activity_redWarsDialogMain = (function (_super) {
        __extends(Activity_redWarsDialogMain, _super);
        function Activity_redWarsDialogMain() {
            var _this = _super.call(this) || this;
            _this.timer = 0;
            _this.redpackageStage = RED_PACKAGE.UNDONE;
            _this.skinName = "resource/skins/activity/Activity_redWarsDialogMainSkin.exml";
            _this.groupOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOpen, _this);
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.timer = egret.setInterval(_this.update, _this, 1000);
            _this.setInfo();
            _this.update();
            return _this;
        }
        Activity_redWarsDialogMain.prototype.setInfo = function () {
            var ret = Activity_redWarsDialogMain.returnAwardNums();
            this.redpackageStage = ret[2];
            if (this.redpackageStage == RED_PACKAGE.DONE) {
                this.setStatus(ret[0], ret[1]);
            }
            else if (this.redpackageStage == RED_PACKAGE.UNDONE) {
                this.setStatus();
            }
            egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
            egret.Tween.get(this.imgOpen, { loop: true }).to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        };
        /**
         * @description 设置红包状态
         * @param awardNum {number} 奖励数量
         * @param beyondNum {number} 超越人数百分比
         */
        Activity_redWarsDialogMain.prototype.setStatus = function (awardNum, beyondNum) {
            if (awardNum === void 0) { awardNum = 0; }
            if (beyondNum === void 0) { beyondNum = 0; }
            switch (this.redpackageStage) {
                case RED_PACKAGE.DONE:// 已经抢过
                    this.groupOpen.visible = false;
                    this.groupTip.visible = true;
                    this.labelNum.text = awardNum.toString();
                    this.labelTips.text = beyondNum + "%";
                    this.imgNum.source = zj.cachekey("ui_acitivity_redWars_Get_png", this);
                    break;
                case RED_PACKAGE.UNDONE:// 没有抢过
                    var redPackageInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                        return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
                    })[0];
                    this.groupTip.visible = false;
                    this.groupOpen.visible = true;
                    var dayIndex = redPackageInfo.rewardZone[Math.floor((zj.Game.Controller.curServerTime - redPackageInfo.openTime) / (3600 * 24))];
                    var isBigPackage = dayIndex == 1;
                    this.labelNum.text = (isBigPackage ? 188888 : 28888).toString();
                    break;
            }
        };
        Activity_redWarsDialogMain.prototype.onBtnOpen = function () {
            var req = new message.ActivityRedPacketGrabRequest();
            zj.Game.Controller.send(req, this.ActivityRedPacketGrabReq_Visit, null, this, false);
        };
        Activity_redWarsDialogMain.prototype.ActivityRedPacketGrabReq_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.setInfo();
        };
        /**
         * @description 返回红包中奖数量 超越人数 当前红包是否领取
         */
        Activity_redWarsDialogMain.returnAwardNums = function () {
            var infoTimes = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET].info; // 第几轮红包
            var _a = [0, 0, RED_PACKAGE.UNDONE], awardNum = _a[0], beyondNum = _a[1], state = _a[2];
            for (var key in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab.hasOwnProperty(key)) {
                    var element = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab[key];
                    if (element.key == infoTimes) {
                        awardNum = element.value;
                        state = RED_PACKAGE.DONE;
                        break;
                    }
                }
            }
            for (var key in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes.hasOwnProperty(key)) {
                    var element = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrabDes[key];
                    if (element.key == infoTimes) {
                        beyondNum = element.value;
                        break;
                    }
                }
            }
            return [awardNum, beyondNum, state];
        };
        Activity_redWarsDialogMain.prototype.update = function () {
            var time = zj.Game.Controller.Activity_redpackage_countdown - zj.Game.Controller.curServerTime;
            if (time <= 0)
                this.onBtnClose();
        };
        Activity_redWarsDialogMain.prototype.onBtnClose = function () {
            egret.clearInterval(this.timer);
            this.timer = -1;
            egret.Tween.removeTweens(this.imgTip);
            egret.Tween.removeTweens(this.imgOpen);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Activity_redWarsDialogMain.showRedPackageMap = {};
        return Activity_redWarsDialogMain;
    }(zj.Dialog));
    zj.Activity_redWarsDialogMain = Activity_redWarsDialogMain;
    __reflect(Activity_redWarsDialogMain.prototype, "zj.Activity_redWarsDialogMain");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_redWarsDialogMain.js.map