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
     * @date 2019-3-20
     *
     * @class 执照主界面考核list子项
     */
    var licenseProgressInfoItem = (function (_super) {
        __extends(licenseProgressInfoItem, _super);
        function licenseProgressInfoItem() {
            var _this = _super.call(this) || this;
            /**教学 */
            _this.teachCanGet = false;
            _this.skinName = "resource/skins/license/licenseProgressInfoItemSkin.exml";
            zj.cachekeys(zj.UIResource["licenseProgressInfoItem"], null);
            var tap = egret.TouchEvent.TOUCH_TAP;
            _this.btnAward.addEventListener(tap, _this.onBtnAward, _this);
            _this.btnGetAward.addEventListener(tap, _this.onBtnGetAward, _this);
            _this.btnPlayer.addEventListener(tap, _this.onBtnPlayer, _this);
            _this.btnTransfer.addEventListener(tap, _this.onBtnTransfer, _this);
            _this.groupAward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupAward, _this);
            return _this;
        }
        /** 修改数据源被动执行*/
        licenseProgressInfoItem.prototype.dataChanged = function () {
            var data = this.data;
            var tbl = zj.Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
            this.imgTips.visible = false;
            if (data.type == 2) {
                this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_Task.ExaminationHigh[data.index + 1], this);
                this.imgMap.source = zj.cachekey(zj.UIConfig.UIConfig_Task.HighMap[data.index + 1], this);
            }
            else {
                this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_Task.Examination[data.index + 1], this);
                this.imgMap.source = zj.cachekey(zj.UIConfig.UIConfig_Task.Map[data.index + 1], this);
            }
            var list = zj.Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
            var list_1 = zj.Game.PlayerMissionSystem.GetMaxCondition(data.mission.index);
            var star = zj.Game.PlayerMissionSystem.GetMaxStar(data.mission.index);
            var mission = zj.Game.PlayerMissionSystem.missionMap[data.mission.index];
            var starId = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).start_id;
            var missionId = mission.missionId;
            var start = starId + data.focusCur - 1;
            var endId = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).end_id;
            var subId = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
            var condition = 0;
            if (data.type == 1) {
                condition = zj.Game.PlayerMissionSystem.itemInfo(700000 + (data.index + 1) * 10000 + data.focusCur).condition;
            }
            else {
                condition = zj.Game.PlayerMissionSystem.itemInfo(13000000 + subId * 100 + data.focusCur).condition;
            }
            var max = 0;
            var instaned = 0;
            var map = zj.TableInstance.Table();
            for (var kk in map) {
                if (map.hasOwnProperty(kk)) {
                    var vv = map[kk];
                    if (Number(kk) > instaned) {
                        instaned = Number(kk);
                    }
                }
            }
            var value = 200002;
            var condition_be;
            var condition_naxe;
            var valuebe;
            var valueNext;
            if (subId == 25 || subId == 97 || subId == 96) {
                value = mission.value;
            }
            else if (subId == 55 || subId == 69) {
                value = mission.value % 10000;
            }
            else if (subId == 2) {
                value = mission.value;
                if (value > 100112 && data.type == 1) {
                    value = 100112;
                }
                //条件
                _a = this.ChapterIdx(condition), condition_be = _a[0], condition_naxe = _a[1];
                //进度
                if (value == 100000) {
                    valuebe = 0;
                    valueNext = 0;
                }
                else {
                    _b = this.ChapterIdx(value), valuebe = _b[0], valueNext = _b[1];
                }
            }
            else {
                if (mission.valueEx.length == 0) {
                    value = 0;
                }
                else {
                    var IsHave = void 0;
                    var _loop_1 = function (kk, vv) {
                        IsHave = zj.Table.FindF(mission.valueEx, function (k, v) {
                            return vv.condition == v;
                        });
                    };
                    for (var _i = 0, _c = zj.HelpUtil.GetKV(list); _i < _c.length; _i++) {
                        var _d = _c[_i], kk = _d[0], vv = _d[1];
                        _loop_1(kk, vv);
                    }
                    if (IsHave == true || IsHave == null) {
                        for (var kk in mission.valueEx) {
                            if (mission.valueEx.hasOwnProperty(kk)) {
                                var vv1 = mission.valueEx[kk];
                                if (vv1 > max) {
                                    max = vv1;
                                    value = max;
                                }
                            }
                        }
                    }
                    else {
                        for (var kk in list_1) {
                            if (list_1.hasOwnProperty(kk)) {
                                var vv2 = list_1[kk];
                                if (vv2.id > max) {
                                    max = vv2.id;
                                    value = vv2.condition;
                                }
                            }
                        }
                    }
                }
                var conditionEnd = zj.Game.PlayerMissionSystem.itemInfo(endId).condition;
                if (value > conditionEnd) {
                    value = conditionEnd;
                }
                if (value > instaned) {
                    value = instaned;
                }
                _e = this.ChapterIdx(condition), condition_be = _e[0], condition_naxe = _e[1];
                var maxIndex = -1;
                var listNaxt = [];
                for (var kk in list_1) {
                    if (list_1.hasOwnProperty(kk)) {
                        var vv = list_1[kk];
                        if (vv.id == 720001) {
                            listNaxt.push(kk);
                            if (listNaxt.length == 2) {
                                if (Number(kk) > maxIndex) {
                                    maxIndex = Number(kk);
                                    list_1.splice(maxIndex);
                                }
                            }
                        }
                    }
                }
                if (list_1.length == 0) {
                    if (value == 0) {
                        valuebe = 0;
                        valueNext = 0;
                    }
                    else if (data.focusCur == list_1.length + 1 && data.focusCur == 1) {
                        _f = this.ChapterIdx(value), valuebe = _f[0], valueNext = _f[1];
                    }
                    else {
                        valueNext = 0;
                    }
                }
                else {
                    if (value == 0) {
                        valuebe = 0;
                        valueNext = 0;
                    }
                    else if (data.focusCur <= list_1.length || data.focusCur == 1) {
                        valueNext = 5;
                    }
                    else if (value % 100000 % 10 != 5 && data.focusCur == list_1.length + 1) {
                        _g = this.ChapterIdx(value), valuebe = _g[0], valueNext = _g[1];
                    }
                    else {
                        valueNext = 0;
                    }
                }
            }
            var level_val = 1;
            var level_con = 1;
            var value_str = zj.TextsConfig.TextsConfig_DarkLand.levelDes[level_val];
            var cond_str = zj.TextsConfig.TextsConfig_DarkLand.levelDes[level_con];
            if (data.type == 2 && data.index == 1) {
                level_val = zj.PlayerDarkSystem.GetLevelByHurt(1, value);
                level_con = zj.PlayerDarkSystem.GetLevelByHurt(1, condition);
                value_str = zj.TextsConfig.TextsConfig_DarkLand.levelDes[level_val + 1];
                cond_str = zj.TextsConfig.TextsConfig_DarkLand.levelDes[level_con + 1];
            }
            var des = 0;
            if (data.type == 2 && data.index == 2 && value >= condition) {
                if (value - 10000 < 0) {
                    des = 0;
                }
                else {
                    des = value - 10000;
                }
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioned, des, condition - 10000));
            }
            else if (data.type == 2 && data.index == 2 && value < condition) {
                if (value - 10000 < 0) {
                    des = 0;
                }
                else {
                    des = value - 10000;
                }
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioning, des, condition - 10000));
            }
            else if (data.index >= 2 && value >= condition) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioned, value, condition));
            }
            else if (data.index >= 2 && value < condition) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioning, value, condition));
            }
            else if (data.index == 0 && valuebe > condition_be) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.instanced, valuebe, valueNext, condition_be, condition_naxe));
            }
            else if (data.index == 0 && valuebe == condition_be && valueNext >= condition_naxe) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.instanced, valuebe, valueNext, condition_be, condition_naxe));
            }
            else if ((data.index == 0 && valuebe < condition_be) || (data.index == 0 && valuebe == condition_be && valueNext < condition_naxe)) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.instancing, valuebe, valueNext, condition_be, condition_naxe));
            }
            else if (data.index == 1 && valueNext >= condition_naxe && valueNext != 0) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioned, valueNext, condition_naxe));
            }
            else if (data.type == 2 && data.index == 1 && value >= condition) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioned, value_str, cond_str));
            }
            else if (data.type == 2 && data.index == 1 && value < condition) {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioning, value_str, cond_str));
            }
            else {
                this.labelInfo.textFlow = zj.Util.RichText(list[data.focusCur - 1].des + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Task.conditioning, valueNext, condition_naxe));
            }
            if (data.index > 1 || (data.type == 2 && data.index == 1)) {
                if (value >= condition && missionId < start) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (value >= condition && missionId == start && mission.isFinish == false) {
                    this.groupAward.visible = true;
                    this.btnTransfer.visible = false;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (value >= condition && missionId >= start) {
                    this.groupAward.visible = false;
                    this.imgGetAward.visible = true;
                    this.imgGetAward.source = zj.cachekey(zj.UIConfig.UIConfig_Task.ActivityType.Typeed, this);
                    this.btnPlayer.visible = false;
                    this.btnTransfer.visible = false;
                    this.btnAward.visible = false;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = false;
                }
                else {
                    this.btnTransfer.visible = true;
                    this.btnPlayer.visible = false;
                    this.imgGetAward.visible = false;
                    this.btnGetAward.visible = true;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = false;
                }
            }
            else if (data.index == 0) {
                if (valuebe > condition_be && missionId < start && star + 1 != data.focusCur) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (valuebe > condition_be && missionId == start && mission.isFinish == false) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (valuebe == condition_be && valueNext >= condition_naxe && missionId <= start && mission.isFinish == false) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if ((valuebe >= condition_be && missionId > start) || (valuebe == condition_be && valueNext >= condition_naxe && missionId > start) || mission.isFinish) {
                    this.groupAward.visible = false;
                    this.imgGetAward.visible = true;
                    this.imgGetAward.source = zj.cachekey(zj.UIConfig.UIConfig_Task.ActivityType.Typeed, this);
                    this.btnPlayer.visible = false;
                    this.btnTransfer.visible = false;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = false;
                }
                else {
                    this.imgGetAward.visible = false;
                    this.btnTransfer.visible = true;
                    this.btnPlayer.visible = false;
                    this.btnAward.visible = true;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = false;
                }
            }
            else if (data.type == 1 && data.index == 1) {
                if (valueNext >= condition_naxe && missionId < start && star + 1 != data.focusCur) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (valueNext >= condition_naxe && missionId == start && mission.isFinish == false) {
                    this.groupAward.visible = true;
                    this.groupAward.x = this.width / 2;
                    this.groupAward.y = this.height / 2;
                    this.btnTransfer.visible = false;
                    this.btnPlayer.visible = true;
                    this.imgGetAward.visible = false;
                    this.btnAward.visible = true;
                    this.lingqu();
                    this.teachCanGet = true;
                }
                else if (valueNext >= condition_naxe && missionId >= start) {
                    this.groupAward.visible = false;
                    this.imgGetAward.visible = true;
                    this.btnTransfer.visible = false;
                    this.imgGetAward.source = zj.cachekey(zj.UIConfig.UIConfig_Task.ActivityType.Typeed, this);
                    this.btnPlayer.visible = false;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = true;
                }
                else {
                    this.imgGetAward.visible = false;
                    this.btnTransfer.visible = true;
                    this.btnAward.visible = true;
                    this.btnPlayer.visible = false;
                    this.GroupCartoon.removeChildren();
                    this.teachCanGet = false;
                }
            }
            else {
                this.groupAward.visible = false;
                this.imgGetAward.visible = false;
                this.btnTransfer.visible = true;
                this.btnAward.visible = true;
                this.teachCanGet = false;
            }
            var subMission = zj.Game.PlayerMissionSystem.GetItemMissionId(data.mission.index);
            for (var kk in subMission) {
                if (subMission.hasOwnProperty(kk)) {
                    var vv = subMission[kk];
                    if (Number(kk) == data.focusCur - 1) {
                        var itemSet = zj.PlayerItemSystem.Set(vv.reward_goods[0][0]);
                        this.imgItemFrame.source = zj.cachekey(itemSet.Frame, this);
                        this.imgItemIcon.source = zj.cachekey(itemSet.Path, this);
                        this.labelItemNum.text = vv.reward_goods[0][1].toString();
                    }
                }
            }
            if (data.father.teachNotGetTbl[data.index] == null) {
                data.father.teachNotGetTbl[data.index] = this.teachCanGet;
            }
            var _a, _b, _e, _f, _g;
        };
        licenseProgressInfoItem.prototype.ChapterIdx = function (id) {
            var chapterNormal = zj.TableChapterNormal.Table();
            var chapterElite = zj.TableChapterElite.Table();
            if (zj.ckid(id)) {
                return null;
            }
            var tbl;
            if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                tbl = chapterNormal;
            }
            else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                tbl = chapterElite;
            }
            else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                return null;
            }
            else if (Math.floor(id / 100000) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                return null;
            }
            for (var v in tbl) {
                if (tbl.hasOwnProperty(v)) {
                    var k = tbl[v];
                    for (var vv in k.chapter_pack) {
                        if (k.chapter_pack.hasOwnProperty(vv)) {
                            var kk = k.chapter_pack[vv];
                            if (id == kk) {
                                return [Number(v), Number(vv) + 1];
                            }
                        }
                    }
                }
            }
            return null;
        };
        licenseProgressInfoItem.prototype.lingqu = function () {
            var _this = this;
            //ui_tongyong_lingqu
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_lingqu", "armatureName", "000_lingqu", 0)
                .then(function (display) {
                display.touchEnabled = false;
                _this.GroupCartoon.addChild(display);
                _this.btnAward.touchEnabled = false;
                _this.groupAward.touchEnabled = false;
                _this.btnGetAward.touchEnabled = false;
                _this.GroupCartoon.touchEnabled = false;
            }).catch(function (reason) {
            });
        };
        licenseProgressInfoItem.prototype.onBtnAward = function () {
            this.btnTransfer.enabled = false;
            // TipManager.ShowProp();
            console.log();
        };
        licenseProgressInfoItem.prototype.onBtnGetAward = function () {
            console.log();
        };
        licenseProgressInfoItem.prototype.onBtnPlayer = function () {
            var data = this.data;
            var info = zj.Game.PlayerMissionSystem.missionMap[data.mission.index];
            var missionId = info.missionId;
            var starId = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).start_id;
            var tbl = zj.Game.PlayerMissionSystem.itemInfo(starId + data.focusCur - 1);
            var subId = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
            var start = starId + data.focusCur - 1;
            var missionIdNaxt = missionId - starId;
            var canGet = data.focusCur - missionIdNaxt;
            var value = info.value;
            var star = zj.Game.PlayerMissionSystem.GetMaxStar(data.mission.index);
            var conditionItem = zj.Game.PlayerMissionSystem.itemInfo(starId).condition;
            var list = zj.Game.PlayerMissionSystem.GetMaxCondition(data.mission.index);
            var condition;
            if (data.type == 1) {
                condition = zj.Game.PlayerMissionSystem.itemInfo(700000 + (data.index + 1) * 10000 + data.focusCur).condition;
            }
            else {
                condition = zj.Game.PlayerMissionSystem.itemInfo(13000000 + subId * 100 + data.focusCur).condition;
            }
            var max = 0;
            if (subId == 55 || subId == 69) {
                value = info.value % 10000;
            }
            else if (subId == 3) {
                if (info.valueEx.length == 0) {
                    value = 0;
                }
                else {
                    var IsHave = void 0;
                    var _loop_2 = function (kk, vv) {
                        IsHave = zj.Table.FindF(info.valueEx, function (k, v) {
                            return vv.condition == v;
                        });
                    };
                    for (var _i = 0, _a = zj.HelpUtil.GetKV(list); _i < _a.length; _i++) {
                        var _b = _a[_i], kk = _b[0], vv = _b[1];
                        _loop_2(kk, vv);
                    }
                    if (IsHave == true || IsHave == null) {
                        for (var kk in info.valueEx) {
                            if (info.valueEx.hasOwnProperty(kk)) {
                                var vv = info.valueEx[kk];
                                if (vv > max) {
                                    max = vv;
                                    value = max;
                                }
                            }
                        }
                    }
                    else {
                        for (var kk in list) {
                            if (list.hasOwnProperty(kk)) {
                                var vv = list[kk];
                                if (vv.id > max) {
                                    max = vv.id;
                                    value = vv.condition;
                                }
                            }
                        }
                    }
                }
            }
            if (value >= condition && missionId < start && canGet < 2 && value != 0) {
                this.reqReward();
            }
            else if (value >= condition && missionId == start && info.isFinish == false) {
                this.reqReward();
            }
            else if (value >= tbl.condition && canGet >= 2) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Task.canGet);
            }
            else {
                return;
            }
        };
        licenseProgressInfoItem.prototype.reqReward = function () {
            var _this = this;
            var data = this.data;
            var subType = zj.Game.PlayerMissionSystem.itemSubType(data.mission.index).sub_type;
            var type;
            if (data.type == 1) {
                type = message.MissionType.MISSION_TYPE_LICENCE;
            }
            else {
                type = message.MissionType.MISSION_TYPE_HIGH_LICENCE;
            }
            zj.Game.PlayerMissionSystem.ReqReward(type, subType)
                .then(function (response) {
                if (!zj.Teach.BeInTeaching() || (zj.Teach.nOperateTeachPart != zj.teachBattle.teachPartID_Lisence_Exam)) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        dialog.init(response.body.gameInfo.getGoods);
                        dialog.show();
                    });
                }
                var licenseID;
                if (data.type == 1) {
                    licenseID = zj.Game.PlayerMissionSystem.SetExamination(data.focusCur);
                    data.father.setSelect(data.focusCur, licenseID.length == 4);
                }
                else {
                    licenseID = zj.Game.PlayerMissionSystem.SetExaminationHigh(data.focusCur);
                    data.father.setSelectH(data.focusCur, licenseID.length == 4);
                }
                _this.btnTransfer.visible = false;
            })
                .catch(function (resule) {
                zj.toast_warning(resule);
            });
        };
        licenseProgressInfoItem.prototype.onGroupAward = function (e) {
            if (this.groupAward.x == this.width / 2) {
                this.onBtnPlayer();
                return;
            }
            var data = this.data;
            var info = new message.GoodsInfo();
            var subMission = zj.Game.PlayerMissionSystem.GetItemMissionId(data.mission.index)[data.focusCur - 1];
            info.goodsId = subMission.reward_goods[0][0];
            info.count = subMission.reward_goods[0][1];
            data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        licenseProgressInfoItem.prototype.onBtnTransfer = function () {
            var data = this.data;
            var info = zj.Game.PlayerMissionSystem.missionMap[this.data.mission.index];
            data.father.btnCloseAndGo(info.type, info.subType);
        };
        return licenseProgressInfoItem;
    }(eui.ItemRenderer));
    zj.licenseProgressInfoItem = licenseProgressInfoItem;
    __reflect(licenseProgressInfoItem.prototype, "zj.licenseProgressInfoItem");
    var licenseProgressInfoItemData = (function () {
        function licenseProgressInfoItemData() {
        }
        return licenseProgressInfoItemData;
    }());
    zj.licenseProgressInfoItemData = licenseProgressInfoItemData;
    __reflect(licenseProgressInfoItemData.prototype, "zj.licenseProgressInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=licenseProgressInfoItem.js.map