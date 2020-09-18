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
     * @date 2019-3-25
     *
     * @class 新手狂欢list子项
     */
    var ActivityNoviceItem = (function (_super) {
        __extends(ActivityNoviceItem, _super);
        function ActivityNoviceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityNoviceItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityNoviceItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            return _this;
        }
        ActivityNoviceItem.prototype.dataChanged = function () {
            var data = this.data;
            this.setInfoTask(data);
            this.setInfoAward(data);
        };
        ActivityNoviceItem.prototype.setInfoTask = function (data) {
            var item = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
            var strText = data.father.data[data.TypeId - 1].finish[data.index];
            // if (data.type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) {
            // 	strText = strText[strText.length - 1] || 0;
            // }
            var strTexts = data.father.data[data.TypeId - 1].finishs[data.index];
            var missionId = data.father.data[data.TypeId - 1].mission.missionId % 1000000 % 100 - 1;
            var state = 1;
            var novice1 = null;
            var novice2 = null;
            var type = data.type;
            var vis = (zj.Helper.day()) >= data.father.btnIndex;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX) {
                state = vis ? data.father.data[data.TypeId - 1].state[data.index] : zj.TableEnum.Enum.NoviceState.LOCK;
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                if (strText <= strTexts && data.index == missionId && !data.father.data[data.TypeId - 1].mission.isFinish) {
                    state = zj.TableEnum.Enum.NoviceState.REWARD;
                }
                else if (strText <= strTexts && data.index <= missionId) {
                    state = zj.TableEnum.Enum.NoviceState.OVER;
                }
                else {
                    state = zj.TableEnum.Enum.NoviceState.OPEN;
                }
            }
            else {
                novice1 = strTexts >= 10000 ? Math.floor(strTexts / 10000) : Math.floor(strTexts % 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                if (data.father.data[data.TypeId - 1].finish.length != 0) {
                    if (novice2 >= strTexts % 10000 && !data.father.data[data.TypeId - 1].mission.isFinish && novice2 != 0 && data.index == missionId) {
                        state = zj.TableEnum.Enum.NoviceState.REWARD;
                    }
                    else if (novice2 >= strTexts % 10000 && data.index < missionId || data.father.data[data.TypeId - 1].mission.isFinish && novice2 != 0) {
                        state = zj.TableEnum.Enum.NoviceState.OVER;
                    }
                    else if (novice2 < strTexts % 10000 && vis && data.index == missionId) {
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
            var strTitle = data.father.data[data.TypeId - 1].dataInfo[data.index].des;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY // 武将最大品质
            ) {
                if (strText > strTexts) {
                    strText = strTexts;
                }
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, strText, strTexts);
                this.labelTitle.textFlow = zj.Util.RichText(str);
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX) {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, (Math.floor(strText % 10000) || 0), (Math.floor(strTexts % 10000) || 0));
                this.labelTitle.textFlow = zj.Util.RichText(str);
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE) {
                novice1 = Math.floor(strTexts / 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                if (novice2 > strTexts % 10000) {
                    novice2 = strTexts % 10000;
                }
                var novice3 = strTexts % 10000;
                var a = novice2 % 7 == 0 ? Math.floor(novice2 / 7) : Math.floor(novice2 / 7) + 1;
                var b = novice2 % 7 == 0 && novice2 != 0 ? 7 : novice2 % 7;
                var a1 = novice3 % 7 == 0 ? Math.floor(novice3 / 7) : Math.floor(novice3 / 7) + 1;
                var b1 = novice3 % 7 == 0 && novice3 != 0 ? 7 : novice3 % 7;
                this.labelTitle.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, a + "-" + b, a1 + "-" + b1)); //novice2, strTexts % 10000)
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                novice1 = Math.floor(strTexts / 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                this.labelTitle.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
            }
            else {
                novice1 = Math.floor(strTexts / 10000);
                novice2 = data.father.missionProgress(strText, novice1);
                if (novice2 > strTexts % 10000) {
                    novice2 = strTexts % 10000;
                }
                this.labelTitle.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.newNovice, strTitle, novice2, strTexts % 10000));
            }
            if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX // 流星街第六个副本最大层
            ) {
                if (state == zj.TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    this.btnGet1.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    this.btnGet1.visible = true;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OVER) {
                    this.btnGet.visible = false;
                    this.btnGet1.visible = false;
                    this.imgGet.visible = true;
                }
                else {
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    this.btnGet.enabled = false;
                    this.btnGet1.visible = false;
                }
                //  else if (state == TableEnum.Enum.NoviceState.LOCK && data.index == missionId + 1) {//前往//
                // 	this.btnGet.enabled = true;
                // 	this.btnGet.visible = false;
                // 	this.imgGet.visible = false;
                // 	this.btnGet1.visible = true;
                // }
            }
            else {
                if (state == zj.TableEnum.Enum.NoviceState.REWARD && data.index <= missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    this.btnGet1.visible = false;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OPEN && data.index == missionId) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = false;
                    this.imgGet.visible = false;
                    this.btnGet1.visible = true;
                }
                else if (state == zj.TableEnum.Enum.NoviceState.OVER) {
                    this.btnGet.enabled = false;
                    this.btnGet.visible = false;
                    this.imgGet.visible = true;
                    this.btnGet1.visible = false;
                }
                else {
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    this.btnGet.enabled = false;
                    this.btnGet1.visible = false;
                }
                // else if (state == TableEnum.Enum.NoviceState.LOCK && data.index == missionId + 1) {//前往//
                // 	this.btnGet.enabled = true;
                // 	this.btnGet.visible = false;
                // 	this.imgGet.visible = false;
                // 	this.btnGet1.visible = true;
                // } 
            }
        };
        ActivityNoviceItem.prototype.setInfoAward = function (data) {
            var itemInfo = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
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
        ActivityNoviceItem.prototype.onBtnGet = function () {
            var data = this.data;
            var strText = data.father.data[data.TypeId - 1].finish[data.index];
            var strTexts = data.father.data[data.TypeId - 1].finishs[data.index];
            var missionId = data.father.data[data.TypeId - 1].mission.missionId % 1000000 % 100 - 1;
            var state;
            var type = data.type;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                type == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX // 流星街第六个副本最大层
            ) {
                state = data.father.data[data.TypeId - 1].state[data.index];
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                if (strText <= strTexts && data.index == missionId && !data.father.data[data.TypeId - 1].mission.isFinish) {
                    state = zj.TableEnum.Enum.NoviceState.REWARD;
                }
                else if (strText <= strTexts && data.index <= missionId) {
                    state = zj.TableEnum.Enum.NoviceState.OVER;
                }
                else {
                    state = zj.TableEnum.Enum.NoviceState.OPEN;
                }
            }
            else {
                var novice1 = Math.floor(strTexts / 10000);
                var novice2 = data.father.missionProgress(strText, novice1);
                if ((typeof strText == "object" && strText.length != 0) || strText != 0) {
                    if (novice2 >= strTexts % 10000) {
                        state = zj.TableEnum.Enum.NoviceState.REWARD;
                    }
                    else if (novice2 >= strTexts % 10000 && data.index < missionId) {
                        state = zj.TableEnum.Enum.NoviceState.OVER;
                    }
                    else if (novice2 < strTexts % 10000) {
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
                data.father.btnGo(data.type);
            }
        };
        ActivityNoviceItem.prototype.reqReward = function () {
            var data = this.data;
            var info = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            zj.Game.PlayerMissionSystem.missionReward(data.father.missionType, data.type)
                .then(function (gameInfo) {
                var a = data.father.data[data.TypeId - 1].dataInfo[data.index].reward_goods;
                var goods = [];
                for (var i = 0; i < a.length; i++) {
                    var v = a[i];
                    var b = new message.GoodsInfo();
                    b.goodsId = v[0];
                    b.count = v[1];
                    goods.push(b);
                }
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                data.father.loadPmgressbarInfo();
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    // this.setInfoTask(this.data);
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
                            // this.setInfoTask(this.data);
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                data.father.initAfterSetType();
                // this.setInfoTask(this.data);
            })
                .catch(function (res) {
                // toast_success(res);
            });
        };
        return ActivityNoviceItem;
    }(eui.ItemRenderer));
    zj.ActivityNoviceItem = ActivityNoviceItem;
    __reflect(ActivityNoviceItem.prototype, "zj.ActivityNoviceItem");
    var ActivityNoviceItemData = (function () {
        function ActivityNoviceItemData() {
        }
        return ActivityNoviceItemData;
    }());
    zj.ActivityNoviceItemData = ActivityNoviceItemData;
    __reflect(ActivityNoviceItemData.prototype, "zj.ActivityNoviceItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceItem.js.map