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
     * @class 执照主界面几星猎人list子项
     */
    var licenseProgressLevelInfo = (function (_super) {
        __extends(licenseProgressLevelInfo, _super);
        function licenseProgressLevelInfo() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/license/licenseProgressLevelInfoSkin.exml";
            zj.cachekeys(zj.UIResource["licenseProgressLevelInfo"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.down, _this);
            return _this;
        }
        /** 修改数据源被动执行*/
        licenseProgressLevelInfo.prototype.dataChanged = function () {
            var data = this.data;
            this.imgRedIcon.visible = false;
            var infos = zj.TableMissionType.Table();
            for (var kk in infos) {
                if (infos.hasOwnProperty(kk)) {
                    var vv = infos[kk];
                    if (data.type == 1 && vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
                        var list = zj.Game.PlayerMissionSystem.GetItemMissionId(vv.index);
                        var list_1 = zj.Game.PlayerMissionSystem.GetMaxCondition(vv.index);
                        var star = zj.Game.PlayerMissionSystem.GetMaxStar(vv.index);
                        var info = zj.Game.PlayerMissionSystem.missionMap[vv.index];
                        var starId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                        var tbl = zj.Game.PlayerMissionSystem.itemInfo(starId + data.index);
                        var subId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).sub_type;
                        var value = info.value;
                        var start = starId + data.index;
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
                                for (var k in list) {
                                    if (list.hasOwnProperty(k)) {
                                        var v = list[k];
                                        IsHave = zj.Table.FindF(info.valueEx, function (k1, v1) {
                                            return v.condition == v1;
                                        });
                                    }
                                }
                                if (IsHave == true || IsHave == null) {
                                    for (var kkk in info.valueEx) {
                                        if (info.valueEx.hasOwnProperty(kkk)) {
                                            var vvv = info.valueEx[kkk];
                                            if (vvv > max) {
                                                max = vvv;
                                                value = max;
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (var k0 in list_1) {
                                        if (list_1.hasOwnProperty(k0)) {
                                            var v0 = list_1[k0];
                                            if (v0.id > max) {
                                                max = v0.id;
                                                value = v0.condition;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (value >= tbl.condition && info.missionId < start && data.index <= star) {
                            this.imgRedIcon.visible = true;
                        }
                        else if (value >= tbl.condition && info.missionId == start && data.index <= star && info.isFinish == false) {
                            this.imgRedIcon.visible = true;
                        }
                    }
                    else if (data.type == 2 && vv.type == message.MissionType.MISSION_TYPE_HIGH_LICENCE) {
                        var starHighId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                        var Hightbl = zj.Game.PlayerMissionSystem.itemInfo(starHighId + data.index);
                        var infoH = zj.Game.PlayerMissionSystem.missionMap[vv.index];
                        var valueH = infoH.value;
                        var starIdH = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                        var startH = starIdH + data.index;
                        var starH = zj.Game.PlayerMissionSystem.GetMaxStar(vv.index);
                        var subId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).sub_type;
                        if (subId == 69) {
                            valueH = infoH.value % 10000;
                        }
                        if (valueH >= Hightbl.condition && infoH.missionId < startH && data.index <= starH - 1) {
                            this.imgRedIcon.visible = true;
                        }
                        else if (valueH >= Hightbl.condition && infoH.missionId == startH && data.index <= starH && !infoH.isFinish) {
                            this.imgRedIcon.visible = true;
                        }
                    }
                }
            }
            this.setScale();
        };
        licenseProgressLevelInfo.prototype.setScale = function () {
            var data = this.data;
            this.btnHunterLicence.scaleX = 1;
            this.btnHunterLicence.scaleY = 1;
            if (data.type == 1) {
                if (data.index + 1 <= zj.Game.PlayerMissionSystem.missionActive.licence) {
                    if (data.index + 1 == data.father.focusCur) {
                        this.btnHunterLicence.scaleX = 1.2;
                        this.btnHunterLicence.scaleY = 1.2;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonSel[this.data.index + 1]);
                    }
                    else {
                        this.btnHunterLicence.scaleX = 1;
                        this.btnHunterLicence.scaleY = 1;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonNum[this.data.index + 1]);
                    }
                    this.imgGet.visible = true;
                }
                else {
                    if (data.index + 1 == data.father.focusCur) {
                        this.btnHunterLicence.scaleX = 1.2;
                        this.btnHunterLicence.scaleY = 1.2;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonDis[data.index + 1]);
                    }
                    else {
                        this.btnHunterLicence.scaleX = 1;
                        this.btnHunterLicence.scaleY = 1;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonLock[data.index + 1]);
                    }
                    this.imgGet.visible = false;
                }
            }
            else {
                if (data.index + 1 + zj.CommonConfig.licence_max_level <= zj.Game.PlayerMissionSystem.missionActive.licence) {
                    if (data.index + 1 == data.father.focusCurH) {
                        this.btnHunterLicence.scaleX = 1.2;
                        this.btnHunterLicence.scaleY = 1.2;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonHighSel[data.index + 1]);
                    }
                    else {
                        this.btnHunterLicence.scaleX = 1;
                        this.btnHunterLicence.scaleY = 1;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonHighNum[data.index + 1]);
                    }
                    this.imgGet.visible = true;
                }
                else {
                    if (data.index + 1 == data.father.focusCurH) {
                        this.btnHunterLicence.scaleX = 1.2;
                        this.btnHunterLicence.scaleY = 1.2;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonHighDis[this.data.index + 1]);
                    }
                    else {
                        this.btnHunterLicence.scaleX = 1;
                        this.btnHunterLicence.scaleY = 1;
                        zj.Set.ButtonBackgroud(this.btnHunterLicence, zj.UIConfig.UIConfig_Task.buttonHighLock[this.data.index + 1]);
                    }
                    this.imgGet.visible = false;
                }
            }
        };
        licenseProgressLevelInfo.prototype.down = function () {
            var data = this.data;
            var licenseId;
            if (data.type == 1) {
                if (this.data.index + 1 == this.data.father.focusCur) {
                    return;
                }
                licenseId = zj.Game.PlayerMissionSystem.SetExamination(this.data.index + 1);
                this.data.father.setSelect(this.data.index + 1, licenseId.length == 4);
            }
            else if (data.type == 2) {
                if (this.data.index + 1 == this.data.father.focusCurH) {
                    return;
                }
                licenseId = zj.Game.PlayerMissionSystem.SetExaminationHigh(this.data.index + 1);
                this.data.father.setSelectH(this.data.index + 1, licenseId.length == 4);
            }
        };
        return licenseProgressLevelInfo;
    }(eui.ItemRenderer));
    zj.licenseProgressLevelInfo = licenseProgressLevelInfo;
    __reflect(licenseProgressLevelInfo.prototype, "zj.licenseProgressLevelInfo");
    var licenseProgressLevelInfoData = (function () {
        function licenseProgressLevelInfoData() {
        }
        return licenseProgressLevelInfoData;
    }());
    zj.licenseProgressLevelInfoData = licenseProgressLevelInfoData;
    __reflect(licenseProgressLevelInfoData.prototype, "zj.licenseProgressLevelInfoData");
})(zj || (zj = {}));
//# sourceMappingURL=licenseProgressLevelInfo.js.map