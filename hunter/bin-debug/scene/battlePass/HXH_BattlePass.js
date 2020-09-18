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
     * @class 通行证主界面
     *
     * @author LianLei
     *
     * @date 2019-11-16
     */
    var HXH_BattlePass = (function (_super) {
        __extends(HXH_BattlePass, _super);
        function HXH_BattlePass() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCheck, _this);
            _this.btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnExpUp, _this);
            _this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDetails, _this);
            _this.btnTaskWeek.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTaskWeek, _this);
            _this.btnTaskDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTaskDaily, _this);
            _this.btnTaskMonth.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTaskMonth, _this);
            zj.Game.EventManager.on(zj.GameEvent.UPDATE_BATTLEPASS_REDTIP, _this.SetTips, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_PERMITLEVEL_CHANGE, _this.setLevelUp, _this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_BATTLEPASS, _this.close, _this);
            _this.init();
            return _this;
        }
        HXH_BattlePass.prototype.setLevelUp = function (ev) {
            zj.loadUI(zj.HXH_BattlePassLvUp).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(ev.data);
            });
        };
        HXH_BattlePass.prototype.init = function () {
            this.battlePassGift = null;
            this.battlePassMission = null;
            this.initUI();
            this.setButtonState();
            this.timer = egret.setInterval(this.RefreshInfo, this, 1000);
        };
        HXH_BattlePass.prototype.initUI = function () {
            this.initUIOfItemsList();
        };
        HXH_BattlePass.prototype.initUIOfItemsList = function () {
            this.battlePassGift = zj.newUI(zj.HXH_BattlePassGift);
            this.groupViewAdd.addChild(this.battlePassGift);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_GIFT);
            this.SetTips();
            this.groupBtnItem.scaleY = 0;
        };
        HXH_BattlePass.prototype.SetTips = function () {
            // this.imgTip1.visible = Tips.GetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD);
            // this.imgTip2.visible = Tips.GetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION);
            var tip1 = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)
                    tip1 = true;
            }
            else {
                if (zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length || zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)
                    tip1 = true;
            }
            this.imgTip1.visible = tip1;
            var _a = [this.missionComplete(zj.TablePermitMission.Table()), this.missionComplete(zj.Game.PlayerMissionSystem.GetBattlePassWeekMission()), this.missionComplete(zj.Game.PlayerMissionSystem.GetBattlePassMonthMission())], tip3 = _a[0], tip4 = _a[1], tip5 = _a[2];
            this.imgTip2.visible = tip3 || tip4 || tip5;
            this.imgTip3.visible = tip3;
            this.imgTip4.visible = tip4;
            this.imgTip5.visible = tip5;
        };
        /**
         * @description 判断通行证任务是否完成
         *
         * @param itemList 任务表
         */
        HXH_BattlePass.prototype.missionComplete = function (itemList) {
            if (itemList instanceof Array) {
                for (var i = 0; i < itemList.length; i++) {
                    var mission = void 0;
                    for (var key in zj.TableMissionType.Table()) {
                        if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                            var element = zj.TableMissionType.Table()[key];
                            if (itemList[i].id >= element.start_id && itemList[i].id <= element.end_id) {
                                mission = element;
                                break;
                            }
                        }
                    }
                    var tb = zj.Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, itemList[i].id);
                    if (tb.isDo >= tb.toDo && tb.finish)
                        return true; // 可以领取
                }
                return false;
            }
            else if (itemList instanceof Object) {
                for (var key in itemList) {
                    if (itemList.hasOwnProperty(key)) {
                        var element = itemList[key];
                        var isGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(element.id) != -1;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet)
                            return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1)
                            return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && zj.Game.PlayerMissionSystem.missionActive.activeScore >= element.value)
                            return true;
                    }
                }
                return false;
            }
            return false;
        };
        // info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1
        // info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= info.value
        HXH_BattlePass.prototype.setButtonState = function () {
            this.btnCheck.enabled = false;
            this.btnExpUp.enabled = true;
        };
        HXH_BattlePass.prototype.RefreshInfo = function () {
            var hour = zj.Set.TimeFormatBeijing().getHours();
            var min = zj.Set.TimeFormatBeijing().getMinutes();
            var sec = zj.Set.TimeFormatBeijing().getSeconds();
            if (hour == 4 && min == 2 && sec == 0) {
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_GIFT);
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
            }
        };
        /**
         * @description 场景进入栈顶
         * @description 刚放进去时
         * @description 上层场景弹出，该场景被弹到栈顶时
         */
        HXH_BattlePass.prototype.onEntryTopScene = function () {
            if (this.battlePassGift != null)
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_GIFT);
            if (this.battlePassMission != null)
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
        };
        HXH_BattlePass.prototype.onBtnClose = function () {
            HXH_BattlePass.missionIndex = 1;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_BattlePass.prototype.onBtnCheck = function () {
            if (this.battlePassMission != null) {
                this.groupViewAdd.removeChild(this.battlePassMission);
                this.battlePassMission = null;
            }
            this.battlePassGift = zj.newUI(zj.HXH_BattlePassGift);
            this.groupViewAdd.addChild(this.battlePassGift);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_GIFT);
            this.btnCheck.enabled = false;
            this.btnExpUp.enabled = true;
            egret.Tween.removeTweens(this.groupBtnItem);
            egret.Tween.get(this.groupBtnItem).to({ scaleY: 0 }, 300, egret.Ease.backIn);
            HXH_BattlePass.missionIndex = 1;
        };
        HXH_BattlePass.prototype.onBtnExpUp = function () {
            if (this.battlePassGift != null) {
                this.groupViewAdd.removeChild(this.battlePassGift);
                this.battlePassGift = null;
            }
            this.battlePassMission = zj.newUI(zj.HXH_BattlePassMission);
            this.groupViewAdd.addChild(this.battlePassMission);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
            this.btnCheck.enabled = true;
            this.btnExpUp.enabled = false;
            this.btnTaskDaily.enabled = false;
            this.btnTaskWeek.enabled = true;
            this.btnTaskMonth.enabled = true;
            egret.Tween.removeTweens(this.groupBtnItem);
            egret.Tween.get(this.groupBtnItem).to({ scaleY: 1 }, 300, egret.Ease.backOut);
        };
        HXH_BattlePass.prototype.onBtnTaskDaily = function () {
            this.btnTaskDaily.enabled = false;
            this.btnTaskWeek.enabled = true;
            this.btnTaskMonth.enabled = true;
            HXH_BattlePass.missionIndex = 1;
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
        };
        HXH_BattlePass.prototype.onBtnTaskWeek = function () {
            this.btnTaskWeek.enabled = false;
            this.btnTaskDaily.enabled = true;
            this.btnTaskMonth.enabled = true;
            HXH_BattlePass.missionIndex = 2;
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
        };
        HXH_BattlePass.prototype.onBtnTaskMonth = function () {
            this.btnTaskMonth.enabled = false;
            this.btnTaskDaily.enabled = true;
            this.btnTaskWeek.enabled = true;
            HXH_BattlePass.missionIndex = 3;
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
        };
        HXH_BattlePass.prototype.onBtnDetails = function () {
            zj.loadUI(zj.Common_RuleDialog).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.battlepass);
            });
        };
        HXH_BattlePass.missionIndex = 1;
        return HXH_BattlePass;
    }(zj.Scene));
    zj.HXH_BattlePass = HXH_BattlePass;
    __reflect(HXH_BattlePass.prototype, "zj.HXH_BattlePass");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePass.js.map