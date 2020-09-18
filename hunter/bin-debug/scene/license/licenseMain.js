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
 * @class 执照主界面
 */
    var licenseMain = (function (_super) {
        __extends(licenseMain, _super);
        function licenseMain() {
            var _this = _super.call(this) || this;
            _this.focusCur = 0;
            _this.focusCurH = 0;
            _this.Canse = false;
            _this.CanseH = false;
            /**星级按钮数据源 */
            _this.array = new eui.ArrayCollection();
            /**星级按钮数据源高级 */
            _this.arrayH = new eui.ArrayCollection();
            /**只点击一次点击按钮 */
            _this.boolean = true;
            _this.index = 1;
            _this.itemListInfo = [];
            _this.skinName = "resource/skins/license/licenseMainSkin.exml";
            if (_this.imgbg.width < zj.UIManager.StageWidth) {
                _this.imgbg.width = zj.UIManager.StageWidth;
            }
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGetLicence.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetLicence, _this);
            _this.btnHunterExamination.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHunterExamination, _this);
            _this.btnNone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetLicence1, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnNorMal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnNorMal, _this);
            _this.btnHight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHight, _this);
            _this.btnGetLicenceH.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetLicenceH, _this);
            _this.btnHunterExaminationH.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHunterExaminationH, _this);
            _this.update = egret.setInterval(_this.Update, _this, 1000);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.Update();
            _this.groupHight.visible = false;
            _this.info();
            return _this;
        }
        licenseMain.prototype.info = function () {
            if (zj.Game.PlayerMissionSystem.missionActive.licence == 0) {
                this.focusCur = 1;
            }
            else if (zj.Game.PlayerMissionSystem.missionActive.licence == 7) {
                this.focusCur = 7;
            }
            else {
                this.focusCur = zj.Game.PlayerMissionSystem.missionActive.licence + 1;
                if (this.focusCur > 7) {
                    this.focusCur = 1;
                }
            }
            if (zj.Game.PlayerMissionSystem.missionActive.licence == zj.CommonConfig.licence_max_level) {
                this.focusCurH = 1;
            }
            else if (zj.Game.PlayerMissionSystem.missionActive.licence == zj.CommonConfig.high_licence_max_level + zj.CommonConfig.licence_max_level) {
                this.focusCurH = zj.CommonConfig.high_licence_max_level;
            }
            else {
                this.focusCurH = zj.Game.PlayerMissionSystem.missionActive.licence + 1 - zj.CommonConfig.licence_max_level;
            }
            var licenseID = zj.Game.PlayerMissionSystem.SetExamination(this.focusCur);
            if (licenseID.length == 4) {
                this.Canse = true;
            }
            else {
                this.Canse = false;
            }
            var licenseIDH = zj.Game.PlayerMissionSystem.SetExaminationHigh(this.focusCurH);
            if (licenseIDH.length == 4) {
                this.CanseH = true;
            }
            else {
                this.CanseH = false;
            }
            this.SetListButtonInfo();
            this.setListInfo();
            this.setLabelList();
            this.setAwardList();
            this.setLicenseRight();
            if (zj.Game.PlayerMissionSystem.missionActive.licence >= zj.CommonConfig.licence_max_level) {
                this.groupCommon.visible = false;
                this.groupHight.visible = true;
                this.setAwardListH();
                this.SetLicenseRightH();
                this.setListInfoH();
                this.setLabelListH();
                this.SetListButtonInfoH();
            }
        };
        licenseMain.prototype.CB = function (cb) {
            this.cb = cb;
        };
        licenseMain.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        licenseMain.prototype.Update = function () {
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelIntegrate.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
        };
        /**科目进度 */
        licenseMain.prototype.setListInfo = function () {
            var thisOne = this;
            var licenceReward = zj.Game.PlayerMissionSystem.missionActive.licenceReward;
            var bGet = zj.Table.FindF(licenceReward, function (k, v) {
                return v == thisOne.focusCur;
            });
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            if (this.teachNotGetTbl == null) {
                this.teachNotGetTbl = [];
            }
            this.listInfo.visible = true;
            if (!this.Canse || (bGet && this.focusCur <= licence)) {
                var missions = zj.Game.PlayerMissionSystem.listForLicence();
                this.groupExamination.visible = false;
                var array = new eui.ArrayCollection();
                for (var i = 0; i < missions.length; i++) {
                    var data = new zj.licenseProgressInfoItemData();
                    data.index = i;
                    data.father = this;
                    data.focusCur = this.focusCur;
                    data.mission = missions[i];
                    data.type = 1;
                    array.addItem(data);
                }
                this.listInfo.dataProvider = array;
                this.listInfo.itemRenderer = zj.licenseProgressInfoItem;
            }
            else {
                this.listInfo.visible = false;
                this.setExeam();
            }
        };
        /**猎人考试 */
        licenseMain.prototype.setExeam = function () {
            this.groupExamination.visible = true;
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            var info = zj.TableMissionLicence.Table();
            var thisOne = this;
            var licenceReward = zj.Game.PlayerMissionSystem.missionActive.licenceReward;
            var bGet = zj.Table.FindF(licenceReward, function (k, v) {
                return v == thisOne.focusCur;
            });
            var list = [];
            var infos = zj.Game.PlayerMissionSystem.listForLicence();
            for (var kk in infos) {
                if (infos.hasOwnProperty(kk)) {
                    var vv = infos[kk];
                    var tbl = zj.Game.PlayerMissionSystem.missionMap[vv.index];
                    var starId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                    var start = starId + this.focusCur - 1;
                    if (vv.type == message.MissionType.MISSION_TYPE_LICENCE && tbl.missionId >= start && licence == this.focusCur - 1) {
                        list.push(tbl.missionId);
                    }
                }
            }
            //领取执照
            if (bGet && licence <= this.focusCur) {
                this.groupNpcTalk1.visible = false;
                this.groupNpcTalk2.visible = true;
                this.labelExaminationInfo2.text = this.focusCur.toString();
            }
            else {
                this.groupNpcTalk1.visible = true;
                this.groupNpcTalk2.visible = false;
                this.labelExaminationInfo1.text = this.focusCur.toString();
            }
        };
        /**选择星级按钮列表 */
        licenseMain.prototype.SetListButtonInfo = function () {
            this.array.removeAll();
            for (var i = 0; i < 7; i++) {
                var data = new zj.licenseProgressLevelInfoData();
                data.isSel = (i == this.focusCur - 1);
                data.index = i;
                data.father = this;
                data.type = 1;
                this.array.addItem(data);
            }
            this.type = 1;
            this.listAllHunter.dataProvider = this.array;
            this.listAllHunter.itemRenderer = zj.licenseProgressLevelInfo;
            this.listAllHunter.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListAllHunter1, this);
        };
        licenseMain.prototype.onListAllHunter1 = function () {
            var data;
            if (this.type == 1) {
                data = this.listAllHunter.getElementAt(this.focusCur - 1);
            }
            else {
                data = this.listAllHunterH.getElementAt(this.focusCurH - 1);
            }
            data.down();
            this.array.refresh();
        };
        licenseMain.prototype.setSelect = function (index, Canse) {
            this.focusCur = index;
            this.Canse = Canse;
            this.setListInfo();
            this.setLicenseRight();
            this.setAwardList();
            this.SetListButtonInfo();
            this.setLabelList();
        };
        /**执照特权信息 */
        licenseMain.prototype.setLabelList = function () {
            var strVip = zj.PlayerVIPSystem.StrVip(this.focusCur);
            var array = new eui.ArrayCollection();
            for (var i = 0; i < strVip.length; i++) {
                var data = new zj.licenseProgressInfoItemBData();
                data.id = strVip[i];
                array.addItem(data);
            }
            this.listHunterInfo.dataProvider = array;
            this.listHunterInfo.itemRenderer = zj.licenseProgressInfoItemB;
        };
        licenseMain.prototype.setLicenseRight = function () {
            //执照ID
            this.labelLicenseLevelInfo.text = "NO." + zj.Game.PlayerInfoSystem.BaseInfo.id;
            //几星猎人
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            this.imgHunterTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Task.Title[this.focusCur], this);
            zj.Helper.SetStar(this.groupStar, this.focusCur, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], 0.8, 18);
            this.imgLevelAssess.source = zj.cachekey(zj.UIConfig.UIConfig_Task.num[this.focusCur], this);
            this.imgLevelAward.source = zj.cachekey(zj.UIConfig.UIConfig_Task.num[this.focusCur], this);
            this.imgLevelPrerogative.source = zj.cachekey(zj.UIConfig.UIConfig_Task.num[this.focusCur], this);
        };
        /**奖励 */
        licenseMain.prototype.setAwardList = function () {
            var goods = zj.Game.PlayerMissionSystem.itemLicense(this.focusCur).reward_goods;
            var count = zj.Game.PlayerMissionSystem.itemLicense(this.focusCur).reward_count;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.licenseProgressItemData();
                data.goods = goods[i];
                data.count = count[i];
                data.index = i;
                // data.father = this;
                array.addItem(data);
            }
            this.listStarAward.dataProvider = array;
            this.listStarAward.itemRenderer = zj.licenseProgressItem;
            this.listStarAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistStarAward, this);
        };
        /**奖励详情 */
        licenseMain.prototype.awardParticulars = function (xy, cx, cy, info) {
            if (Math.floor(info.goodsId / 1000) == 195) {
            }
            else {
                var ui = this.getChildByName("UI");
                if (ui) {
                    return;
                }
                var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
                commonDesSkill.name = "UI";
                this.addChild(commonDesSkill);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
            }
        };
        /**抬起移除奖励详情界面 */
        licenseMain.prototype.awardUp = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        licenseMain.prototype.onlistStarAward = function () {
        };
        /**领取执照 */
        licenseMain.prototype.onBtnGetLicence = function () {
            var _this = this;
            zj.Game.PlayerMissionSystem.MissionRewardLicence(this.focusCur)
                .then(function (msg) {
                zj.loadUI(zj.licenseHunterUpStar)
                    .then(function (dialog) {
                    dialog.setInfo(_this.focusCur, msg, _this, function () {
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                _this.setListInfo();
                _this.SetListButtonInfo();
            })
                .catch(function () {
            });
        };
        /**猎人考试 */
        licenseMain.prototype.onBtnHunterExamination = function () {
            var _this = this;
            if (zj.Game.PlayerMissionSystem.missionActive.licence == this.focusCur - 1) {
                zj.loadUI(zj.licenseExamination)
                    .then(function (dialog) {
                    dialog.setInfo(zj.Game.PlayerMissionSystem.missionActive.licence, _this.focusCur, 1, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Task.tishi);
            }
        };
        /**猎人社区 */
        licenseMain.prototype.onBtnGetLicence1 = function () {
            // loadUI(ZorkBossEnd).then((dialog: ZorkBossEnd) => {
            // 	dialog.show(UI.SHOW_FROM_TOP);
            // });
        };
        licenseMain.prototype.btnCloseAndGo = function (maintype, subType) {
            var _this = this;
            if (this.cb) {
                this.cb();
            }
            zj.Game.PlayerMissionSystem.getMission(maintype, subType)();
            egret.Tween.get(this).wait(200).call(function () {
                zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
                _this.close();
            });
        };
        licenseMain.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        licenseMain.prototype.getItemListInfo = function () {
            this.itemListInfo = [];
            var missions = zj.Game.PlayerMissionSystem.listForLicence();
            for (var i = 0; i < missions.length; i++) {
                var item = this.listInfo.getElementAt(i);
                this.itemListInfo.push(item);
            }
        };
        ////////////////////////////////////高级执照//////////////////////////////
        /**点击普通执照 */
        licenseMain.prototype.onBtnNorMal = function () {
            this.groupHight.visible = false;
            this.groupCommon.visible = true;
            this.index = 1;
        };
        /**点击高级执照 */
        licenseMain.prototype.onBtnHight = function () {
            if (zj.Game.PlayerMissionSystem.missionActive.licence >= zj.CommonConfig.licence_max_level) {
                this.index = 2;
                if (zj.Game.PlayerMissionSystem.missionActive.licence == zj.CommonConfig.licence_max_level) {
                    this.focusCurH = 1;
                }
                else if (zj.Game.PlayerMissionSystem.missionActive.licence == zj.CommonConfig.high_licence_max_level + zj.CommonConfig.licence_max_level) {
                    this.focusCurH = zj.CommonConfig.high_licence_max_level;
                }
                else {
                    this.focusCurH = zj.Game.PlayerMissionSystem.missionActive.licence + 1 - zj.CommonConfig.licence_max_level;
                }
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Task.getSeven);
                return;
            }
            this.groupCommon.visible = false;
            this.groupHight.visible = true;
            this.setAwardListH();
            this.SetLicenseRightH();
            this.setListInfoH();
            this.setLabelListH();
            this.SetListButtonInfoH();
        };
        licenseMain.prototype.SetLicenseRightH = function () {
            this.labelLicenseLevelInfoH.text = ("NO." + zj.Game.PlayerInfoSystem.BaseInfo.id);
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            this.imgHunterTitleH.source = (zj.UIConfig.UIConfig_Task.Title[this.focusCurH + zj.CommonConfig.licence_max_level]);
            zj.Helper.SetStar(this.groupStarH, this.focusCurH, zj.UIConfig.UIConfig_Task.highStarSmall, 1, 18);
            this.imgLevelAssessH.source = (zj.UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
            this.imgLevelAwardH.source = (zj.UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
            this.imgLevelPrerogativeH.source = (zj.UIConfig.UIConfig_Task.Highnum[this.focusCurH]);
        };
        /**奖励 */
        licenseMain.prototype.setAwardListH = function () {
            var goods = zj.Game.PlayerMissionSystem.itemLicense(this.focusCurH + zj.CommonConfig.licence_max_level).reward_goods;
            var count = zj.Game.PlayerMissionSystem.itemLicense(this.focusCurH + zj.CommonConfig.licence_max_level).reward_count;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.licenseProgressItemData();
                data.goods = goods[i];
                data.count = count[i];
                data.index = i;
                // data.father = this;
                array.addItem(data);
            }
            this.listStarAwardH.dataProvider = array;
            this.listStarAwardH.itemRenderer = zj.licenseProgressItem;
            this.listStarAwardH.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistStarAward, this);
        };
        /**领取执照 */
        licenseMain.prototype.onBtnGetLicenceH = function () {
            var _this = this;
            zj.Game.PlayerMissionSystem.MissionRewardLicence(this.focusCurH + zj.CommonConfig.licence_max_level)
                .then(function (msg) {
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30016), 200);
                zj.loadUI(zj.licenseHunterUpStarHight)
                    .then(function (dialog) {
                    dialog.setInfo(_this.focusCurH, msg, _this, function () {
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                _this.setListInfoH();
                _this.SetListButtonInfoH();
            }).catch(function () {
            });
        };
        /**科目进度 */
        licenseMain.prototype.setListInfoH = function () {
            var thisOne = this;
            var licenceReward = zj.Game.PlayerMissionSystem.missionActive.licenceReward;
            var bGet = zj.Table.FindF(licenceReward, function (k, v) {
                return v == thisOne.focusCurH + zj.CommonConfig.licence_max_level;
            });
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            if (this.teachNotGetTbl == null) {
                this.teachNotGetTbl = [];
            }
            this.listInfoH.visible = true;
            if (!this.CanseH || (bGet && this.focusCurH + zj.CommonConfig.licence_max_level <= licence)) {
                var missions = zj.Game.PlayerMissionSystem.listForHighLicence();
                this.groupExaminationH.visible = false;
                var array = new eui.ArrayCollection();
                for (var i = 0; i < missions.length; i++) {
                    var data = new zj.licenseProgressInfoItemData();
                    data.index = i;
                    data.father = this;
                    data.focusCur = this.focusCurH;
                    data.mission = missions[i];
                    data.type = 2;
                    array.addItem(data);
                }
                this.listInfoH.dataProvider = array;
                this.listInfoH.itemRenderer = zj.licenseProgressInfoItem;
            }
            else {
                this.listInfoH.visible = false;
                this.setExeamH();
            }
        };
        /**猎人考试 */
        licenseMain.prototype.setExeamH = function () {
            this.groupExaminationH.visible = true;
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            var info = zj.TableMissionLicence.Table();
            var thisOne = this;
            var licenceReward = zj.Game.PlayerMissionSystem.missionActive.licenceReward;
            var bGet = zj.Table.FindF(licenceReward, function (k, v) {
                return v == thisOne.focusCurH + zj.CommonConfig.licence_max_level;
            });
            var infos = zj.Game.PlayerMissionSystem.listForLicence();
            for (var kk in infos) {
                if (infos.hasOwnProperty(kk)) {
                    var vv = infos[kk];
                    var tbl = zj.Game.PlayerMissionSystem.missionMap[vv.index];
                    var starId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                    var start = starId + this.focusCurH - 1;
                }
            }
            //领取执照
            if (bGet && licence <= this.focusCurH + zj.CommonConfig.licence_max_level) {
                this.groupNpcTalkH.visible = false;
                this.groupNpcTalk3.visible = true;
                this.labelExaminationInfo2.text = this.focusCurH.toString();
            }
            else {
                this.groupNpcTalkH.visible = true;
                this.groupNpcTalk3.visible = false;
                this.labelExaminationInfo1.text = this.focusCurH.toString();
            }
        };
        /**高级执照特权信息 */
        licenseMain.prototype.setLabelListH = function () {
            var strVip = zj.PlayerVIPSystem.StrVip(this.focusCurH + zj.CommonConfig.licence_max_level);
            var array = new eui.ArrayCollection();
            for (var i = 0; i < strVip.length; i++) {
                var data = new zj.licenseProgressInfoItemBData();
                data.id = strVip[i];
                array.addItem(data);
            }
            this.listHunterInfoH.dataProvider = array;
            this.listHunterInfoH.itemRenderer = zj.licenseProgressInfoItemB;
        };
        /**选择星级按钮列表高级 */
        licenseMain.prototype.SetListButtonInfoH = function () {
            this.arrayH.removeAll();
            for (var i = 0; i < 5; i++) {
                var data = new zj.licenseProgressLevelInfoData();
                data.isSel = (i == this.focusCurH - 1);
                data.index = i;
                data.father = this;
                data.type = 2;
                this.arrayH.addItem(data);
            }
            this.type = 2;
            this.listAllHunterH.dataProvider = this.arrayH;
            this.listAllHunterH.itemRenderer = zj.licenseProgressLevelInfo;
            this.listAllHunterH.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListAllHunter1, this);
        };
        licenseMain.prototype.setSelectH = function (index, Canse) {
            this.focusCurH = index;
            this.CanseH = Canse;
            this.setListInfoH();
            this.SetLicenseRightH();
            this.setAwardListH();
            this.SetListButtonInfoH();
            this.setLabelListH();
        };
        /**猎人考试高级 */
        licenseMain.prototype.onBtnHunterExaminationH = function () {
            var _this = this;
            if (zj.Game.PlayerMissionSystem.missionActive.licence == this.focusCurH + zj.CommonConfig.licence_max_level - 1) {
                zj.loadUI(zj.licenseExamination)
                    .then(function (dialog) {
                    dialog.setInfo(zj.Game.PlayerMissionSystem.missionActive.licence, _this.focusCurH, 2, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Task.tishi);
            }
        };
        return licenseMain;
    }(zj.Dialog));
    zj.licenseMain = licenseMain;
    __reflect(licenseMain.prototype, "zj.licenseMain");
})(zj || (zj = {}));
//# sourceMappingURL=licenseMain.js.map