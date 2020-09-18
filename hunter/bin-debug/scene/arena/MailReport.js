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
     * @date 2019-2-20
     *
     * @class 战报详情界面
     */
    var MailReport = (function (_super) {
        __extends(MailReport, _super);
        function MailReport() {
            var _this = _super.call(this) || this;
            _this.formate = {
                isMutiFormate: null,
                enemyFormation: {
                    generals: null,
                    supports: null
                },
                bWin: {},
                show_enemy: null
            };
            _this.skinName = "resource/skins/arena/MailReportSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnViewEnemyTeam.visible = false;
            }
            return _this;
        }
        MailReport.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            if (zj.Device.isReviewSwitch) {
                this.btnViewEnemyTeam.visible = false;
            }
            else {
                this.btnViewEnemyTeam.addEventListener(tap, this.onBtnViewEnemyTeam, this);
            }
            this.formate.isMutiFormate = false;
            this.formate.show_enemy = false;
            this.formate.enemyFormation.generals = [];
            this.formate.enemyFormation.supports = [];
            this.groupHide.alpha = 0;
        };
        MailReport.prototype.setInfo = function (info, father, cb) {
            this.father = father;
            this.info = info;
            this.cb = cb;
            var path = zj.UIConfig.UIConfig_Mail.winLogo[info.battleResult - 1];
            this.labelTitle.text = info.title;
            this.labelFrom.text = zj.TextsConfig.TextsConfig_Mail.system;
            this.labelTime.text = zj.Set.TimeForMail(info.createtime);
            this.labelContent.textFlow = zj.Util.RichText(info.content);
            this.imgWin.source = zj.cachekey(path, this);
            this.btnReplay.visible = false;
            this.btnShare.visible = false;
            this.btnEnemy.visible = false;
            this.btnFoe.visible = false;
            if (this.father.mailType == message.MailType.MAIL_TYPE_LADDER || this.father.mailType == message.MailType.MAIL_TYPE_SINGLECRAFT || this.father.mailType == message.MailType.MAIL_TYPE_PVP) {
                this.btnViewEnemyTeam.visible = (this.info.war_id != "0");
            }
        };
        MailReport.prototype.onBtnViewEnemyTeam = function () {
            if (Object.keys(this.formate.enemyFormation.generals).length > 0) {
                if (!this.formate.show_enemy) {
                    this.AniOpen();
                }
                else {
                    this.AniClose();
                }
                this.formate.show_enemy = !this.formate.show_enemy;
            }
            else {
                if (this.father.mailType == message.MailType.MAIL_TYPE_PVP) {
                    if (this.info.battleDate == null || this.info.battleDate.length == 0) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Replay.ReplayMsg_Error);
                        return;
                    }
                    if (Number(this.info.war_id) == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                        var extrate = function (s) {
                            var msg = new message.MultiResultInfo();
                            if (true) {
                                var decoder = new aone.BinaryDecoder(new Uint8Array(s));
                                if (!msg.parse_bytes(decoder)) {
                                    zj.toast_warning("单队切磋数据解析失败!");
                                    return null;
                                }
                            }
                            return msg;
                        };
                        zj.Game.PlayerBattleSystem.multiResultInfo.battleData = this.info.battleDate;
                        zj.Game.PlayerBattleSystem.multiResultInfo.newMultiResultInfo = extrate(this.info.battleDate);
                        if (zj.Game.PlayerBattleSystem.multiResultInfo.battleData.length) {
                            this.setInfoFormateList(Number(this.info.war_id));
                            this.AniOpen();
                            this.formate.show_enemy = !this.formate.show_enemy;
                        }
                        else {
                            zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Replay.ReplayMsg_Error));
                        }
                    }
                    else if (Number(this.info.war_id) == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                        var extrate = function (s) {
                            var msg = new message.MoreSimpleFormationInfo();
                            if (true) {
                                var decoder = new aone.BinaryDecoder(new Uint8Array(s));
                                if (!msg.parse_bytes(decoder)) {
                                    zj.toast_warning("三队切磋数据解析失败!");
                                    return null;
                                }
                            }
                            return msg;
                        };
                        zj.Game.PlayerBattleSystem.multiResultInfo.battleData = this.info.battleDate;
                        zj.Game.PlayerBattleSystem.multiResultInfo.newMoreSimpleFormationInfo = extrate(this.info.battleDate);
                        if (zj.Game.PlayerBattleSystem.multiResultInfo.battleData.length) {
                            this.setInfoFormateList(Number(this.info.war_id));
                            this.AniOpen();
                            this.formate.show_enemy = !this.formate.show_enemy;
                        }
                        else {
                            zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Replay.ReplayMsg_Error));
                        }
                    }
                }
                else {
                    this.queryBattleReportReq();
                }
            }
        };
        MailReport.prototype.queryBattleReportReq = function () {
            var _this = this;
            zj.Game.PlayerArenaSystem.queryBattle(this.info.war_id)
                .then(function (battleData) {
                var success = zj.Game.PlayerBattleSystem.UncompressBattleData(battleData[0], true);
                if (success) {
                    _this.setInfoFormateList(battleData[0].battleType);
                    _this.AniOpen();
                    _this.formate.show_enemy = !_this.formate.show_enemy;
                }
                else {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Replay.ReplayMsg_Error);
                }
            }).catch(function (result) {
                zj.toast_warning(zj.Helper.GetErrorString(result));
            });
        };
        MailReport.prototype.setInfoFormateList = function (formationtype) {
            var formate = null;
            var generalsNumber = zj.Formate.Instence(formationtype).generals + zj.Formate.Instence(formationtype).generals_limit_number[0];
            var resultInfo = zj.Game.PlayerBattleSystem.multiResultInfo;
            if (formationtype == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || (formationtype == message.EFormationType.FORMATION_TYPE_CRAFT)) {
                this.formate.isMutiFormate = true;
                var beLeft = null;
                for (var i = 0; i < 3; i++) {
                    this.formate.enemyFormation.generals[i] = [];
                    formate = null;
                    if (resultInfo.newMultiResultInfo.results[i] != null) {
                        zj.Game.PlayerBattleSystem.UncompressBattleData(resultInfo.newMultiResultInfo.results[i], false);
                        resultInfo = zj.Game.PlayerBattleSystem.multiResultInfo;
                        if (beLeft == null) {
                            if (resultInfo.newReplayBattleInfo.leftReplayInfo.roleInfo.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                                beLeft = true;
                                formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
                            }
                            else if (resultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                                beLeft = false;
                                formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
                            }
                        }
                        else if (beLeft == false) {
                            formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
                        }
                        else {
                            formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
                        }
                        if (formate != null) {
                            var _loop_1 = function (k) {
                                var v = formate.formation.generals[k];
                                if (v == 0) {
                                    this_1.formate.enemyFormation.generals[i][k] = 0;
                                }
                                else {
                                    var generalInfo = zj.Table.FindR(formate.generals, function (_, _v) {
                                        return _v.generalInfo.general_id == v;
                                    })[0];
                                    if (generalInfo != null) {
                                        this_1.formate.enemyFormation.generals[i][k] = generalInfo; //generalInfo.generalInfo 有错误
                                    }
                                    else {
                                        this_1.formate.enemyFormation.generals[i][k] = 0;
                                    }
                                }
                            };
                            var this_1 = this;
                            for (var k = 0; k < formate.formation.generals.length; k++) {
                                _loop_1(k);
                            }
                        }
                        this.formate.bWin[i] = resultInfo.battleResult;
                    }
                    else {
                        var formateOne = null;
                        if (beLeft) {
                            formateOne = resultInfo.newMultiResultInfo.leftFormation[0];
                        }
                        else if (beLeft == false) {
                            formateOne = resultInfo.newMultiResultInfo.rightFormation[0];
                        }
                        if (formateOne != null) {
                            for (var k = 0; k < formateOne.generals.length; k++) {
                                var v = formateOne.generals[k];
                                if (v.general_id != 0) {
                                    this.formate.enemyFormation.generals[i][k] = v;
                                }
                            }
                        }
                    }
                    for (var j = 0; j < generalsNumber; j++) {
                        if (this.formate.enemyFormation.generals[i][j] == null) {
                            this.formate.enemyFormation.generals[i][j] = 0;
                        }
                    }
                }
            }
            else if (formationtype == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                this.formate.isMutiFormate = true;
                for (var i = 0; i < 3; i++) {
                    this.formate.enemyFormation.generals[i] = {};
                    var formateTwo = null;
                    if (resultInfo.battleData != null) {
                        formateTwo = resultInfo.newMoreSimpleFormationInfo.simpleFormation[i];
                        if (formateTwo != null) {
                            for (var j = 0; j < generalsNumber; j++) {
                                if ((formateTwo.generals[j].general_id == 0) || (formateTwo.generals[j].general_id == null)) {
                                    this.formate.enemyFormation.generals[i][j] = 0;
                                }
                                else {
                                    this.formate.enemyFormation.generals[i][j] = formateTwo.generals[j];
                                }
                            }
                        }
                        if (resultInfo.newMoreSimpleFormationInfo.battle_result[i] != null) {
                            this.formate.bWin[i] = resultInfo.newMoreSimpleFormationInfo.battle_result[i];
                        }
                    }
                    for (var j = 0; j < generalsNumber; j++) {
                        if (this.formate.enemyFormation.generals[i][j] == null) {
                            this.formate.enemyFormation.generals[i][j] = 0;
                        }
                    }
                }
            }
            else if (formationtype == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.formate.isMutiFormate = false;
                this.formate.enemyFormation.generals = {};
                var formateTwo = null;
                if (resultInfo.battleData != null) {
                    formateTwo = resultInfo.newMultiResultInfo.leftFormation[0];
                    if (formateTwo != null) {
                        for (var j = 0; j < generalsNumber; j++) {
                            if ((formateTwo.generals[j].general_id == 0) || (formateTwo.generals[j].general_id == null)) {
                                this.formate.enemyFormation.generals[j] = 0;
                            }
                            else {
                                this.formate.enemyFormation.generals[j] = formateTwo.generals[j];
                            }
                        }
                        for (var j = 0; j < generalsNumber; j++) {
                            if (formateTwo.supports[j].general_id == 0 || formateTwo.supports[j].general_id == null) {
                                this.formate.enemyFormation.supports[j] = 0;
                            }
                            else {
                                this.formate.enemyFormation.supports[j] = formateTwo.supports[j];
                            }
                        }
                    }
                }
                for (var j = 0; j < generalsNumber; j++) {
                    if (this.formate.enemyFormation.generals[j] == null) {
                        this.formate.enemyFormation.generals[j] = 0;
                    }
                }
                for (var j = 0; j < generalsNumber; j++) {
                    if (this.formate.enemyFormation.supports[j] == null) {
                        this.formate.enemyFormation.supports[j] = 0;
                    }
                }
            }
            else {
                this.formate.isMutiFormate = false;
                if (resultInfo.battleData != null) {
                    if (resultInfo.newReplayBattleInfo.leftReplayInfo.roleInfo.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                        formate = resultInfo.newReplayBattleInfo.leftReplayInfo;
                    }
                    else if (resultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                        formate = resultInfo.newReplayBattleInfo.rightReplayInfo;
                    }
                }
                if (formate != null) {
                    var thisOne = this;
                    var _loop_2 = function (k) {
                        var v = formate.formation.generals[k];
                        if (v == 0) {
                            thisOne.formate.enemyFormation.generals[k] = 0;
                        }
                        else {
                            var generalInfo = zj.Table.FindR(formate.generals, function (_, _v) {
                                return _v.generalInfo.general_id == v;
                            })[0];
                            if (generalInfo != null) {
                                thisOne.formate.enemyFormation.generals[k] = generalInfo; // .generalInfo; 有问题
                            }
                            else {
                                thisOne.formate.enemyFormation.generals[k] = 0;
                            }
                        }
                    };
                    for (var k = 0; k < formate.formation.generals.length; k++) {
                        _loop_2(k);
                    }
                    var _loop_3 = function (k) {
                        var v = formate.formation.supports[k];
                        if (v == 0) {
                            thisOne.formate.enemyFormation.supports[k] = 0;
                        }
                        else {
                            var generalInfo = zj.Table.FindR(formate.generals, function (_k, _v) {
                                return _v.generalInfo.general_id == v;
                            })[0];
                            if (generalInfo != null) {
                                thisOne.formate.enemyFormation.supports[k] = generalInfo; // .generalInfo; 有问题
                            }
                            else {
                                thisOne.formate.enemyFormation.generals[k] = 0;
                            }
                        }
                    };
                    for (var k = 0; k < formate.formation.supports.length; k++) {
                        _loop_3(k);
                    }
                }
                for (var i = 0; i < generalsNumber; i++) {
                    if (this.formate.enemyFormation.generals[i] == null) {
                        this.formate.enemyFormation.generals[i] = 0;
                    }
                }
                for (var i = 0; i < generalsNumber; i++) {
                    if (this.formate.enemyFormation.supports[i] == null) {
                        this.formate.enemyFormation.supports[i] = 0;
                    }
                }
            }
            this.LoadList();
        };
        /**动画打开防守阵容List */
        MailReport.prototype.AniOpen = function () {
            var _this = this;
            this.groupHide.alpha = 1;
            this.groupHide.scaleX = 0;
            this.groupHide.visible = true;
            egret.Tween.get(this.groupHide).to({ scaleX: 1.1 }, 400).to({ scaleX: 1 }, 150).call(function () {
                zj.Set.ButtonBackgroud(_this.btnViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNor_png", "ui_arena_ButtonConsealEnemyTeamSel_png");
            });
        };
        /**动画关闭防守阵容List */
        MailReport.prototype.AniClose = function () {
            var _this = this;
            egret.Tween.get(this.groupHide).to({ scaleX: 1.1 }, 150).to({ scaleX: 0 }, 400).call(function () {
                _this.groupHide.visible = false;
                zj.Set.ButtonBackgroud(_this.btnViewEnemyTeam, "ui_arena_ButtonViewEnemyTeamNor_png", "ui_arena_ButtonViewEnemyTeamSel_png");
            });
        };
        MailReport.prototype.LoadList = function () {
            if (!this.formate.isMutiFormate) {
                // this.groupThreeTean.visible = false;
                var generalInfos = [];
                for (var k = 0; k < this.formate.enemyFormation.supports.length; k++) {
                    var v = this.formate.enemyFormation.supports[k];
                    generalInfos.push(v);
                }
                for (var i = 0; i < Object.keys(this.formate.enemyFormation.generals).length; i++) {
                    var vv = this.formate.enemyFormation.generals[i];
                    generalInfos.push(vv);
                }
                var array = new eui.ArrayCollection();
                for (var i = 0; i < generalInfos.length; i++) {
                    var data = new zj.CommonArenaEnemyTeamItemData();
                    data.index = i + 1;
                    data.simpleInfo = generalInfos[i];
                    array.addItem(data);
                }
                this.listSupport.dataProvider = array;
                this.listSupport.itemRenderer = zj.CommonArenaEnemyTeamItem;
            }
            else {
                // this.groupOneTeam.visible = false;
                var array = new eui.ArrayCollection();
                for (var i = 0; i < this.formate.enemyFormation.generals.length; i++) {
                    var data = new zj.CommonBattleMailThreeItemData();
                    data.index = i + 1;
                    data.info = this.formate.enemyFormation.generals[i];
                    data.bWin = this.formate.bWin[i];
                    array.addItem(data);
                }
                this.listHunter.dataProvider = array;
                this.listHunter.itemRenderer = zj.CommonBattleMailThreeItem;
            }
        };
        /**关闭弹窗*/
        MailReport.prototype.onBtnClose = function () {
            this.cb();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return MailReport;
    }(zj.Dialog));
    zj.MailReport = MailReport;
    __reflect(MailReport.prototype, "zj.MailReport");
})(zj || (zj = {}));
//# sourceMappingURL=MailReport.js.map