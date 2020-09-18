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
     * @class 通行证主界面任务UI Item
     *
     * @author LianLei
     *
     * @date 2019-11-19
     */
    var HXH_BattlePassMissionItem = (function (_super) {
        __extends(HXH_BattlePassMissionItem, _super);
        function HXH_BattlePassMissionItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassMissionItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_BattlePassMissionItem"], null);
            _this.btnToDo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnToDo, _this);
            return _this;
        }
        HXH_BattlePassMissionItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_BattlePassMissionItem.prototype.updateView = function (data) {
            this.id = data.id;
            this.type = data.type;
            if (data.type == 1) {
                this.infoMission = null;
                this.infoPermit = data.info;
                var itemSet = zj.PlayerItemSystem.Set(this.infoPermit.reward_goods[0]);
                this.labelMission.text = data.id + "." + this.infoPermit.des;
                this.labelMissionNum.text = zj.Game.PlayerMissionSystem.missionActive.activeScore + "/" + this.infoPermit.value;
                this.labelNum.text = data.info.reward_goods[1].toString();
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.labelMissionNum.visible = this.infoPermit.value != 0;
                this.SetButtonState1(this.infoPermit);
            }
            else if (data.type == 2 || data.type == 3) {
                this.infoPermit = null;
                this.infoMission = data.info;
                var mission = void 0;
                for (var key in zj.TableMissionType.Table()) {
                    if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                        var element = zj.TableMissionType.Table()[key];
                        if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
                            mission = element;
                            break;
                        }
                    }
                }
                var itemSet = zj.PlayerItemSystem.Set(data.info.reward_goods[0][0]);
                this.labelMission.text = (data.id + 1) + "." + data.info.des;
                var tb = zj.Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);
                this.labelMissionNum.text = tb.isDo + "/" + tb.toDo;
                this.labelNum.text = data.info.reward_goods[0][1].toString();
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.labelMissionNum.visible = true;
                this.SetButtonState2(tb);
            }
            // let itemSet = PlayerItemSystem.Set(data.info.reward_goods[0]) as any;
            // this.labelMission.text = data.id + "." + data.info.des;
            // this.labelMissionNum.text = Game.PlayerMissionSystem.missionActive.activeScore + "/" + data.info.value;
            // this.labelNum.text = data.info.reward_goods[1].toString();
            // this.imgIcon.source = cachekey(itemSet.Path, this);
            // this.imgFrame.source = cachekey(itemSet.Frame, this);
            // this.labelMissionNum.visible = data.info.value != 0;
        };
        HXH_BattlePassMissionItem.prototype.SetButtonState1 = function (info) {
            var isGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(info.id) != -1;
            // 判断按钮状态
            if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && isGet) {
                this.btnToDo.visible = false;
                this.imgGet.visible = true;
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet) {
                this.btnToDo.visible = true;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardNor, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel);
                this.imgGet.visible = false;
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && isGet) {
                this.btnToDo.visible = false;
                this.imgGet.visible = true;
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && zj.Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissFinishedNor, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel); // 去完成
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardNor, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel); // 领取
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && isGet) {
                this.btnToDo.visible = false;
                this.imgGet.visible = true;
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && zj.Game.PlayerMissionSystem.missionActive.activeScore < info.value) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissFinishedNor, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel); // 去完成
            }
            else if (info.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && zj.Game.PlayerMissionSystem.missionActive.activeScore >= info.value) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardNor, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel); // 领取
            }
            else {
                this.btnToDo.visible = true;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissFinishedNor, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel); // 去完成
            }
        };
        HXH_BattlePassMissionItem.prototype.SetButtonState2 = function (tb) {
            if (tb.isDo >= tb.toDo && tb.finish) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardNor, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel, zj.UIConfig.UIConfig_BattlePass.passMissGetRewardSel); // 领取
            }
            else if (tb.isDo >= tb.toDo && !tb.finish) {
                this.btnToDo.visible = false;
                this.imgGet.visible = true;
            }
            else if (tb.isDo < tb.toDo) {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissFinishedNor, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel); // 去完成
            }
            else {
                this.btnToDo.visible = true;
                this.imgGet.visible = false;
                zj.Set.ButtonBackgroud(this.btnToDo, zj.UIConfig.UIConfig_BattlePass.passMissFinishedNor, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel, zj.UIConfig.UIConfig_BattlePass.passMissFinishedSel); // 去完成
            }
        };
        HXH_BattlePassMissionItem.prototype.onBtnToDo = function () {
            if (this.type == 1 && this.infoPermit != null) {
                var isGet = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward, function (k, v) { return v == this.id; });
                if (this.infoPermit.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && zj.Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
                    zj.loadUI(zj.HXH_BattlePassPay).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (this.infoPermit.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && zj.Game.PlayerMissionSystem.missionActive.activeScore < this.infoPermit.value) {
                    if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY, true)) {
                        // Game.EventManager.event(GameEvent.CLOSE_BATTLEPASS);
                        zj.loadUI(zj.Daily_Main).then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                            dialog.hideBackGround();
                        });
                    }
                }
                else {
                    this.ContendQueryListReqData();
                }
            }
            else if ((this.type == 2 || this.type == 3) && this.infoMission != null) {
                var mission = void 0;
                for (var key in zj.TableMissionType.Table()) {
                    if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                        var element = zj.TableMissionType.Table()[key];
                        if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
                            mission = element;
                            break;
                        }
                    }
                }
                var tb = zj.Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);
                if (tb.isDo >= tb.toDo && tb.finish) {
                    this.GetRewardReqData(this.infoMission);
                }
                else {
                    var info = zj.Game.PlayerMissionSystem.missionMap[mission.index];
                    zj.Game.EventManager.event(zj.GameEvent.CLOSE_BATTLEPASS);
                    zj.Game.PlayerMissionSystem.getMission(info.type, info.subType)();
                }
            }
        };
        HXH_BattlePassMissionItem.prototype.ContendQueryListReqData = function () {
            var req = new message.RewardPermitMissionRequest();
            req.body.id = this.infoPermit.id;
            zj.Game.Controller.send(req, this.ContendQueryListReqData_Visit, null, this, false);
        };
        HXH_BattlePassMissionItem.prototype.ContendQueryListReqData_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.SetButtonState1(this.infoPermit);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REDTIP);
            zj.toast_success(zj.TextsConfig.TextsConfig_Adviser.adviser_success);
        };
        HXH_BattlePassMissionItem.prototype.GetRewardReqData = function (info) {
            var mission;
            for (var key in zj.TableMissionType.Table()) {
                if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                    var element = zj.TableMissionType.Table()[key];
                    if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
                        mission = element;
                        break;
                    }
                }
            }
            var req = new message.MissionRewardRequest();
            req.body.type = mission.type;
            req.body.subType = mission.sub_type;
            zj.Game.Controller.send(req, this.GetRewardReqData_Visit, null, this, false);
        };
        HXH_BattlePassMissionItem.prototype.GetRewardReqData_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REDTIP);
            var mission;
            for (var key in zj.TableMissionType.Table()) {
                if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                    var element = zj.TableMissionType.Table()[key];
                    if (this.infoMission.id >= element.start_id && this.infoMission.id <= element.end_id) {
                        mission = element;
                        break;
                    }
                }
            }
            var tb = zj.Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, this.infoMission.id);
            this.SetButtonState2(tb);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_MISSION);
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REDTIP);
            zj.toast_success(zj.TextsConfig.TextsConfig_Adviser.adviser_success);
        };
        return HXH_BattlePassMissionItem;
    }(eui.ItemRenderer));
    zj.HXH_BattlePassMissionItem = HXH_BattlePassMissionItem;
    __reflect(HXH_BattlePassMissionItem.prototype, "zj.HXH_BattlePassMissionItem");
    var HXH_BattlePassMissionItemData = (function () {
        function HXH_BattlePassMissionItemData() {
        }
        return HXH_BattlePassMissionItemData;
    }());
    zj.HXH_BattlePassMissionItemData = HXH_BattlePassMissionItemData;
    __reflect(HXH_BattlePassMissionItemData.prototype, "zj.HXH_BattlePassMissionItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassMissionItem.js.map