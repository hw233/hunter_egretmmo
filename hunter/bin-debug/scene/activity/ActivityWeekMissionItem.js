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
     * @author xing li wei
     *
     * @date 2019-5-6
     *
     * @class 赏金特训list子项
     */
    var ActivityWeekMissionItem = (function (_super) {
        __extends(ActivityWeekMissionItem, _super);
        function ActivityWeekMissionItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityWeekMissionItemSkin.exml";
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            zj.cachekeys(zj.UIResource["ActivityWeekMissionItem"], null);
            return _this;
        }
        ActivityWeekMissionItem.prototype.dataChanged = function () {
            var data = this.data;
            this.setBtn(data);
            this.setInfoTask(data);
            this.setInfoAward(data);
        };
        ActivityWeekMissionItem.prototype.setBtn = function (data) {
            // let path = UIConfig.UIConfig_Novice[data.father.noviceType].getItem;
            // 	this.imgGet.source = cachekey(path);
            // 	let path1 = UIConfig.UIConfig_Novice[data.father.noviceType].floor;
            // 	this.imgFloor.source = cachekey(path1);
        };
        ActivityWeekMissionItem.prototype.setInfoTask = function (data) {
            var item = data.father.data[data.typeId - 1].dataInfo[data.index].reward_goods;
            var strText = data.father.data[data.typeId - 1].finish[data.index];
            var strTexts = data.father.data[data.typeId - 1].finishs[data.index];
            var missionId = data.father.data[data.typeId - 1].mission.missionId % 1000000 % 100 - 1;
            var state = 1;
            var novice1 = null;
            var novice2 = null;
            if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
                state = data.father.data[data.typeId - 1].state[data.index];
            }
            else {
                novice1 = Math.floor(strTexts / 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                if (strText.length != 0) {
                    if (novice2 >= strTexts % 10000 && data.index == missionId && !data.father.data[data.typeId - 1].mission.isFinish) {
                        state = zj.TableEnum.Enum.NoviceState.REWARD;
                    }
                    else if (novice2 >= strTexts % 10000 && data.index < missionId || data.father.data[data.typeId - 1].mission.isFinish) {
                        state = zj.TableEnum.Enum.NoviceState.OVER;
                    }
                    else if (novice2 < strTexts % 10000 && data.index == missionId) {
                        state = zj.TableEnum.Enum.NoviceState.OPEN;
                    }
                    else {
                        state = zj.TableEnum.Enum.NoviceState.LOCK;
                    }
                }
                else {
                    if (data.index == 0) {
                        state = zj.TableEnum.Enum.NoviceState.OPEN;
                    }
                    else {
                        state = zj.TableEnum.Enum.NoviceState.LOCK;
                    }
                }
            }
            var bShowShaDow = state == zj.TableEnum.Enum.NoviceState.OVER;
            var bShowGet = state == zj.TableEnum.Enum.NoviceState.OVER;
            var bReward = state == zj.TableEnum.Enum.NoviceState.REWARD;
            var strTitle = data.father.data[data.typeId - 1].dataInfo[data.index].des;
            this.imgShaDow.visible = false;
            if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
                if (strText > strTexts) {
                    strText = strTexts;
                }
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, strText, strTexts);
                this.labelTitle.textFlow = zj.Util.RichText(str);
            }
            else {
                novice1 = Math.floor(strTexts / 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                if (novice2 > strTexts % 10000) {
                    novice2 = strTexts % 10000;
                }
                this.labelTitle.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
            }
            if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
                if (state == zj.TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    var path1 = zj.UIConfig.UIConfig_Novice[1].get[0];
                    var path2 = zj.UIConfig.UIConfig_Novice[1].get[1];
                    zj.Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
                    this.imgShaDow.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    var path1 = zj.UIConfig.UIConfig_Novice[1].go[0];
                    var path2 = zj.UIConfig.UIConfig_Novice[1].go[1];
                    zj.Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
                    this.imgShaDow.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OVER) {
                    this.btnGet.enabled = false;
                    this.btnGet.visible = false;
                    this.imgGet.visible = true;
                    this.imgShaDow.visible = true;
                }
                else {
                    this.btnGet.visible = false;
                    this.imgGet.visible = false;
                    this.imgShaDow.visible = true;
                }
            }
            else {
                if (state == zj.TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    var path1 = zj.UIConfig.UIConfig_Novice[1].get[0];
                    var path2 = zj.UIConfig.UIConfig_Novice[1].get[1];
                    zj.Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
                    this.imgShaDow.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    var path1 = zj.UIConfig.UIConfig_Novice[1].go[0];
                    var path2 = zj.UIConfig.UIConfig_Novice[1].go[1];
                    zj.Set.ButtonBackgroud(this.btnGet, path1, path2, path1);
                    this.imgShaDow.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OVER) {
                    this.btnGet.enabled = false;
                    this.btnGet.visible = false;
                    this.imgGet.visible = true;
                    this.imgShaDow.visible = true;
                }
                else {
                    this.btnGet.visible = false;
                    this.imgGet.visible = false;
                    this.imgShaDow.visible = true;
                }
            }
        };
        ActivityWeekMissionItem.prototype.setInfoAward = function (data) {
            var itemInfo = data.father.data[data.typeId - 1].dataInfo[data.index].reward_goods;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < itemInfo.length; i++) {
                var data_1 = new zj.ActivityNoviceItemItemData();
                data_1.index = i;
                data_1.itemInfo = itemInfo[i];
                data_1.father = this;
                array.addItem(data_1);
            }
            this.listViewAward.dataProvider = array;
            this.listViewAward.itemRenderer = zj.ActivityNoviceItemItem;
        };
        ActivityWeekMissionItem.prototype.onBtnGet = function () {
            var data = this.data;
            var strText = data.father.data[data.typeId - 1].finish[data.index];
            var strTexts = data.father.data[data.typeId - 1].finishs[data.index];
            var missionId = data.father.data[data.typeId - 1].mission.missionId % 1000000 % 100 - 1;
            var state;
            if (zj.Game.PlayerMissionSystem.itemMissionWeekValNormalType(data.father.weekTable.mission_types[data.typeId - 1])) {
                state = data.father.data[data.typeId - 1].state[data.index];
            }
            else {
                var novice1 = Math.floor(strTexts / 10000);
                var novice2 = data.father.missionProgress(strText, novice1);
                if (strText.length != 0) {
                    if (novice2 >= strTexts % 10000 && data.index == missionId) {
                        state = zj.TableEnum.Enum.NoviceState.REWARD;
                    }
                    else if (novice2 >= strTexts % 10000 && data.index < missionId) {
                        state = zj.TableEnum.Enum.NoviceState.OVER;
                    }
                    else if (novice2 < strTexts % 10000 && data.index == missionId) {
                        state = zj.TableEnum.Enum.NoviceState.OPEN;
                    }
                    else {
                        state = zj.TableEnum.Enum.NoviceState.LOCK;
                    }
                }
                else {
                    if (data.index == 0) {
                        state = zj.TableEnum.Enum.NoviceState.OPEN;
                    }
                    else {
                        state = zj.TableEnum.Enum.NoviceState.LOCK;
                    }
                }
            }
            if (state == zj.TableEnum.Enum.NoviceState.REWARD) {
                this.reqReward();
            }
            else if (state == zj.TableEnum.Enum.NoviceState.OVER) {
                return;
            }
            else {
                data.father.btnGo();
            }
        };
        ActivityWeekMissionItem.prototype.reqReward = function () {
            var data = this.data;
            var info = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            zj.Game.PlayerMissionSystem.missionReward(data.father.missionType, data.father.weekTable.mission_types[data.typeId - 1] % 10000)
                .then(function (gameInfo) {
                var goods = zj.Table.DeepCopy(gameInfo.getGoods);
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    data.father.setInfoReward();
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        }, info);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(goods);
                        dialog.setCB(function () {
                            data.father.setInfoReward();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                data.father.setInfoData();
            })
                .catch(function (res) {
                zj.toast_success(res);
            });
        };
        ActivityWeekMissionItem.prototype.setInfoTag = function (typeId) {
            var data = this.data;
            data.typeId = typeId;
            this.setInfoTask(data);
            this.setInfoArrow(data);
            this.setInfoAward(data);
        };
        ActivityWeekMissionItem.prototype.setInfoArrow = function (data) {
        };
        return ActivityWeekMissionItem;
    }(eui.ItemRenderer));
    zj.ActivityWeekMissionItem = ActivityWeekMissionItem;
    __reflect(ActivityWeekMissionItem.prototype, "zj.ActivityWeekMissionItem");
    var ActivityWeekMissionItemData = (function () {
        function ActivityWeekMissionItemData() {
        }
        return ActivityWeekMissionItemData;
    }());
    zj.ActivityWeekMissionItemData = ActivityWeekMissionItemData;
    __reflect(ActivityWeekMissionItemData.prototype, "zj.ActivityWeekMissionItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityWeekMissionItem.js.map