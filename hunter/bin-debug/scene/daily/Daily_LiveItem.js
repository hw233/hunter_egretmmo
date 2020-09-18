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
     * 日常任务item
     * created by Lian Lei
     * 2019.03.15
     */
    var Daily_LiveItem = (function (_super) {
        __extends(Daily_LiveItem, _super);
        function Daily_LiveItem() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/daily/Daily_LiveItemSkin.exml";
            zj.cachekeys(zj.UIResource["Daily_LiveItem"], null);
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            _this.btnDone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDone, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReward, _this);
            _this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCharge, _this);
            return _this;
        }
        Daily_LiveItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Daily_LiveItem.prototype.updateView = function (data) {
            this.indexId = data.index;
            this.missionType = data.missionType;
            this.father = data.father;
            this._JumpByInstance = data._JumpByInstance;
            this.refreshInfo();
        };
        Daily_LiveItem.prototype.refreshInfo = function () {
            this.setInfoState();
            this.setInfoName();
            this.setInfoReward();
        };
        /**按钮显示 */
        Daily_LiveItem.prototype.setInfoState = function () {
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            var state = zj.Game.PlayerMissionSystem.itemComplete(this.indexId);
            var id = mission.type;
            var subId = mission.subType;
            var info = zj.Game.PlayerMissionSystem.itemType(id, subId);
            var strLevel = info.open_level > 0 ?
                (zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.lock, info.open_level)) :
                (zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.inst, zj.Game.PlayerInstanceSystem.Set(info.open_instance).Stage));
            // 累计消费特殊处理 不配到表里 此处会是坑
            var bShowGo = !(id == message.MissionType.MISSION_TYPE_DAILY && subId == message.MissionSubType.MISSION_SUB_TYPE_ADD_CHARGE);
            var bMonth = subId == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH || subId == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH;
            var bCharge = bMonth && ((mission.value >> 31) == 0);
            var bReward = bMonth && ((mission.value >> 31) == 1);
            this.btnDone.visible = (state == zj.TableEnum.EnumDailyLive.finished && !bMonth);
            this.btnGo.visible = (state == zj.TableEnum.EnumDailyLive.unfinished && !bMonth && bShowGo && !this._JumpByInstance);
            this.btnCharge.visible = (state == zj.TableEnum.EnumDailyLive.unfinished && !bMonth && bCharge);
            this.btnReward.visible = (state == zj.TableEnum.EnumDailyLive.finished && bMonth && bReward);
            this.imgDone.visible = (state == zj.TableEnum.EnumDailyLive.rewarded);
            this.imgMask.visible = (state == zj.TableEnum.EnumDailyLive.unOpened);
            this.imgLock.visible = (state == zj.TableEnum.EnumDailyLive.unOpened);
            this.labelLevel.visible = (state == zj.TableEnum.EnumDailyLive.unOpened);
            this.labelLevel.text = strLevel;
        };
        /**描述 已完成 完成条件 */
        Daily_LiveItem.prototype.setInfoName = function () {
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            var tbl = zj.Game.PlayerMissionSystem.itemInfo(mission.missionId);
            var todo = tbl.condition;
            var isdo = zj.yuan3(mission.value >= tbl.condition, tbl.condition, mission.value);
            var strName = zj.Helper.StringFormat(tbl.des + "(%d/%d)", isdo, todo);
            // VIP工资特殊处理
            if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LICENCE_DAILY_REWARD) {
                strName = tbl.des;
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH) {
                if ((mission.value >> 31) == 0) {
                    strName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.token, tbl.des, mission.value, zj.CommonConfig.month_normal_activity_token);
                }
                else {
                    var day = ((mission.value << 1) >> 1);
                    strName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.month, tbl.des, day, zj.CommonConfig.month_days_duration);
                }
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH) {
                if ((mission.value >> 31) == 0) {
                    strName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.token, tbl.des, mission.value, zj.CommonConfig.month_senior_activity_token);
                }
                else {
                    var day = ((mission.value << 1) >> 1);
                    strName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.month, tbl.des, day, zj.CommonConfig.month_days_duration);
                }
            }
            this.imgIcon.source = zj.cachekey(tbl.path, this);
            this.labelName.text = strName;
            zj.cachekey(tbl.path, this);
        };
        /**奖励列表 */
        Daily_LiveItem.prototype.setInfoReward = function () {
            var mission = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            var tbl = zj.Game.PlayerMissionSystem.itemInfo(mission.missionId);
            var goods = [];
            for (var i = 0; i < tbl.reward_goods.length; i++) {
                goods.push([]);
            }
            for (var i = 0; i < tbl.reward_goods.length; i++) {
                var v = tbl.reward_goods[i];
                if (goods.length == 1) {
                    goods[i].push(v[0], v[1]);
                }
                else {
                    for (var j = 0; j < tbl.reward_goods[i].length; j++) {
                        goods[i].push(v[j]);
                    }
                }
            }
            if (Number(tbl.reward_active) > 0) {
                goods.push([]);
                goods[tbl.reward_goods.length].push(0, Number(tbl.reward_active));
            }
            this.listAwardData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.Daily_AwardItemData();
                itemData.goodsId = goods[i][0];
                itemData.count = goods[i][1];
                itemData.Ffather = this.father;
                itemData.father = this;
                itemData.type = itemData.CurState.daily_live;
                this.listAwardData.addItem(itemData);
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Daily_AwardItem;
        };
        Daily_LiveItem.prototype.setInfoGet = function () {
            var _this = this;
            var moveFun = function () {
                egret.Tween.get(_this.groupAll)
                    .call(function () {
                    if (zj.Game.PlayerInfoSystem.BaseInfo.level > zj.Game.PlayerInfoSystem.baseInfo_pre.level) {
                        zj.TipManager.LevelUp();
                    }
                })
                    .to({ x: _this.x + _this.width + 100 }, 500, egret.Ease.backInOut)
                    .to({ x: 0 }, 0, egret.Ease.backInOut).wait(10)
                    .call(function () {
                    _this.data.father.setInfo();
                });
                if (zj.Game.TeachSystem.curPart != -1 && zj.Game.TeachSystem.curPart != 0 && zj.Teach.teachingNow == false) {
                    _this.btnGo.visible = true;
                }
                else {
                    _this.btnGo.visible = false;
                }
            };
            this.imgDone.visible = true;
            this.btnDone.visible = false;
            this.btnGo.visible = false;
            this.btnCharge.visible = false;
            this.btnReward.visible = false;
            egret.Tween.get(this.imgDone).to({ scaleX: 3, scaleY: 3 }, 0)
                .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
                .to({ scaleX: 1, scaleY: 1 }, 150)
                .call(function () {
                moveFun();
            });
        };
        Daily_LiveItem.prototype.onBtnCharge = function () {
            // loadUI(Vip_Main)
            // 	.then((dialog: Vip_Main) => {
            // 		SetInfoActive(index)
            // 		dialog.show(UI.SHOW_FROM_TOP);
            // 	});
        };
        Daily_LiveItem.prototype.onBtnReward = function () {
            var type = zj.Game.PlayerMissionSystem.missionMap[this.indexId].type;
            var subType = zj.Game.PlayerMissionSystem.missionMap[this.indexId].subType;
            zj.Game.PlayerMissionSystem.ReqReward(type, subType)
                .then(function (value) {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(value.body.gameInfo.getGoods);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) {
                zj.toast_warning(zj.Helper.GetErrorString(reason));
            });
        };
        Daily_LiveItem.prototype.onBtnGo = function () {
            var info = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            this.father.close();
            if (zj.Game.TeachSystem.curPart != -1 && zj.Teach.teachingNow) {
                return;
            }
            else {
                zj.Game.PlayerMissionSystem.getMission(info.type, info.subType)();
            }
        };
        Daily_LiveItem.prototype.onBtnDone = function () {
            var _this = this;
            var info = zj.Game.PlayerMissionSystem.missionMap[this.indexId];
            zj.Game.PlayerMissionSystem.ReqReward(info.type, info.subType).then(function (value) {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.init(value.body.gameInfo.getGoods);
                    dialog.setCB(function () {
                        _this.setInfoGet();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function (reason) {
                zj.toast_warning(zj.Helper.GetErrorString(reason));
            });
        };
        return Daily_LiveItem;
    }(eui.ItemRenderer));
    zj.Daily_LiveItem = Daily_LiveItem;
    __reflect(Daily_LiveItem.prototype, "zj.Daily_LiveItem");
    var Daily_LiveItemData = (function () {
        function Daily_LiveItemData() {
        }
        return Daily_LiveItemData;
    }());
    zj.Daily_LiveItemData = Daily_LiveItemData;
    __reflect(Daily_LiveItemData.prototype, "zj.Daily_LiveItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_LiveItem.js.map