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
    /**结算基类 */
    var BattleSettle = (function (_super) {
        __extends(BattleSettle, _super);
        function BattleSettle() {
            var _this = _super.call(this) || this;
            _this.uiName = "";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.tableHeroItem = [];
            _this.bHerosCome = false;
            _this.bButtonCome = false;
            _this.bNotice = false;
            _this.bPopWin = false;
            _this.bCheckPopWin = false;
            _this.total_tick = 0;
            _this.hero_come_time = 0;
            _this.tableDetail = [];
            _this.tableButton = [_this.ButtonGoOn, _this.ButtonNextMob, _this.ButtonShare];
            _this.SingleInfo = { score: null };
            _this.listData = new eui.ArrayCollection();
            // UIManager.Stage.frameRate = UIManager.InitFrameRate;
            // console.log("到结算基类");
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            //数据整合
            if (zj.Gmgr.Instance.bReplay == false) {
                if (zj.Game.PlayerBattleSystem.cacheBattleResult.battleType == 16) {
                    // console.log("到结算基类1");
                    zj.Game.PlayerBattleSystem.UncompressBattleData(zj.Game.PlayerBattleSystem.cacheBattleResult, false);
                }
                else {
                    // console.log("到结算基类2");
                    zj.Game.PlayerBattleSystem.UncompressBattleData(zj.Game.PlayerBattleSystem.cacheBattleResult);
                }
            } //console.log("结算基类super执行完");
            return _this;
        }
        //结算基类初始化
        BattleSettle.prototype.Init = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_CHAT);
            this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
            this.AddBackShadow();
            if (this.AdaptBoard != null) {
                this.AdaptBoard.scaleX = zj.Device.scaleFactor;
                this.AdaptBoard.scaleY = zj.Device.scaleFactor;
            }
            this.tableButton = [this.ButtonGoOn, this.ButtonNextMob, this.ButtonShare];
            this.SetLock(true);
            if (this.ButtonDetail != null || this.ButtonDetail != undefined) {
                this.ButtonDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDetail, this);
                this.tableDetail = [this.ButtonDetail];
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
                egret.clearInterval(_this.update);
                _this.scene = null;
            }, this);
        };
        BattleSettle.prototype.SetLock = function (boo) {
        };
        BattleSettle.prototype.AddBackShadow = function () {
        };
        // private _father;
        BattleSettle.prototype.SetFather = function (father) {
            // this._father = father;
        };
        BattleSettle.prototype.Load = function () {
            this.SetDetailVisible(false);
            this.SetButtonVisible(false);
            this.LoadDetail();
        };
        //实时更新
        BattleSettle.prototype.Update = function (tick) {
            this.total_tick = this.total_tick + tick * 1000;
            this.UpdateGeneral(tick);
            this.UpdateButton(tick);
            this.Notice_Update();
            this.UpdatePopWin(tick);
        };
        BattleSettle.prototype.Notice_Update = function () {
            if (this.bButtonCome == false) {
                return;
            }
            if (zj.Gmgr.Instance.bReplay == true || this.bNotice == true) {
                return;
            }
            this.bNotice = true;
            var cb = function () {
                if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID == 100002) {
                    zj.Teach.CheckTeachName();
                }
            };
            if (zj.Game.PlayerInfoSystem.BaseInfo.level > zj.Game.PlayerInfoSystem.baseInfo_pre.level && zj.Game.PlayerInfoSystem.BaseInfo.level < 60 && zj.Game.PlayerInfoSystem.baseInfo_pre.level != 0) {
                egret.Tween.get(this).wait(600).call(function () {
                    zj.TipManager.LevelUp(cb);
                });
            }
            else {
                this.OnAbovePop();
            }
        };
        BattleSettle.prototype.OnAbovePop = function () {
            this.bCheckPopWin = true;
        };
        BattleSettle.prototype.UpdatePopWin = function (tick) {
            if (this.bCheckPopWin == false) {
                return;
            }
        };
        BattleSettle.prototype.UpdateGeneral = function (tick) {
            if (this.total_tick >= this.hero_come_time * 1000 && this.bHerosCome == false) {
                this.bHerosCome = true;
                this.scene.hideAllAlly();
                this.HerosComeIn();
            }
        };
        BattleSettle.prototype.UpdateButton = function (tick) {
            if (this.CheckHerosFinished() == true && this.bButtonCome == false) {
                this.bButtonCome = true;
                this.DetailFadeIn();
                this.ButtonFadeIn();
            }
        };
        BattleSettle.prototype.LoadHerosList = function () {
            if (this.TableViewHeros == null) {
                return;
            }
            var viewSizeW = this.TableViewHeros.width;
            var viewSizeH = this.TableViewHeros.height;
            // let tag = yuan3(this._father.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN, true, false);
            var generals = [];
            for (var i = zj.TableEnum.TableTeamNum.TEAM_NUM_A; i <= zj.TableEnum.TableTeamNum.TEAM_NUM_D; i++) {
                var key = this.scene.tablePosKey[i];
                if (key != null) {
                    generals.push(key);
                }
            }
            if (generals.length == 0) {
                generals = zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.formation.generals;
            }
            this.TableViewHeros.itemRenderer = zj.BattleEnd_HeroItemUpgrade;
            this.listData.removeAll();
            for (var i = generals.length - 1; i >= 0; i--) {
                var info = this.scene.getPlayerGelBtlInfo(generals[i]);
                if (info) {
                    this.listData.addItem(info);
                }
            }
            this.TableViewHeros.dataProvider = this.listData;
        };
        //检测武将动作是否已经完成
        BattleSettle.prototype.CheckHerosFinished = function () {
            for (var i = 0; i < this.tableHeroItem.length; i++) {
                var v = this.tableHeroItem[i];
                if (v.isFinished() == false) {
                    return false;
                }
            }
            return true;
        };
        //武将进场
        BattleSettle.prototype.HerosComeIn = function () {
            for (var i = 0; i < this.tableHeroItem.length; i++) {
                var v = this.tableHeroItem[i];
                v.Playing();
            }
        };
        //点击详情
        BattleSettle.prototype.SetDetailVisible = function (tag) {
            for (var i = 0; i < this.tableDetail.length; i++) {
                var v = this.tableDetail[i];
                if (v != null) {
                    v.visible = tag;
                }
            }
        };
        //详情出现action
        BattleSettle.prototype.DetailFadeIn = function () {
            this.SetDetailVisible(true);
            for (var i = 0; i < this.tableDetail.length; i++) {
                var v = this.tableDetail[i];
                if (v != null) {
                    v.alpha = 0;
                    egret.Tween.get(v).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.buttonFadeTime);
                }
            }
        };
        BattleSettle.prototype.SetButtonVisible = function (tag) {
            for (var i = 0; i < this.tableButton.length; i++) {
                var v = this.tableButton[i];
                if (v != null) {
                    v.visible = tag;
                }
            }
        };
        BattleSettle.prototype.SetButtonSpec = function () {
            if (zj.Gmgr.Instance.isTeachBattleEnd()) {
                this.SetButtonVisible(false);
                this.ButtonGoOn.visible = true;
            }
        };
        BattleSettle.prototype.LoadDetail = function () {
            if (this.LabelInstanceTime) {
                var ret = zj.Set.FormatMsTime2(Math.floor(this.scene.realTime / 1000));
                this.LabelInstanceTime.text = ret;
            }
            if (this.LabelInstanceName) {
                var ret = "";
                var a = zj.Game.PlayerBattleSystem.multiResultInfo;
                if (a.battleType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    ret = zj.Helper.getInstanceDetailName(a.battleType, zj.TableInstanceGroup.Item(zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId).instance_name);
                }
                else {
                    ret = zj.Helper.getInstanceDetailName(a.battleType, zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.roleInfo);
                }
                this.LabelInstanceName.text = ret;
            }
        };
        BattleSettle.prototype.SetSettleCb = function (cb) {
            this.settleCB = cb;
        };
        //public ButtonGoOn;
        //public ButtonNextMob;
        BattleSettle.prototype.ButtonFadeIn = function () {
            var thisOne = this;
            var tmp = function () {
                thisOne.SetLock(false);
                if (thisOne.settleCB) {
                    thisOne.settleCB();
                    thisOne.settleCB = null;
                }
            };
            if (this.GetUIName() == "BattleEnd_Lose") {
                //除了副本、爬塔，其余战斗失败不显示再战
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    this.tableButton = [this.ButtonGoOn, this.ButtonNextMob];
                }
                else {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_Win") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                    if (zj.PlayerTowerSystem.isTopFloor(zj.Game.PlayerTowerSystem.towerInfo.towerCur - 1)) {
                        this.tableButton = [this.ButtonGoOn];
                    }
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                    // if (PlayerTowerSystem.isTopFloor((Game.PlayerTowerSystem.towerInfo.high_tower_cur - 1) % 10000)) {
                    // 	this.tableButton = [this.ButtonGoOn];
                    // }
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    if (!zj.TableInstance.Item(this.nextMobID)) {
                        this.tableButton = [this.ButtonGoOn];
                    }
                    else {
                        if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                        }
                        else {
                            if (zj.Game.PlayerInstanceSystem.isLastMob(zj.Game.PlayerInstanceSystem.curInstanceType)) {
                                // if (Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID == Game.PlayerInstanceSystem.ChapterBossInstanceID()) {
                                this.tableButton = [this.ButtonGoOn];
                            }
                            else if (zj.Game.PlayerInstanceSystem.TeachNoNextButton()) {
                                // 新手教学
                                this.tableButton = [this.ButtonGoOn];
                            }
                        }
                    }
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                    this.tableButton = [this.ButtonGoOn];
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_WinArenaServer") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_WinArenaServer") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_WinMatchServer") {
                this.tableButton = [this.ButtonGoOn];
            }
            else if (this.GetUIName() == "BattleEnd_LoseArenaServer") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_LoseArenaServer") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_LoseLeagueMonster" || this.GetUIName() == "BattleEnd_WinLeagueMonster") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_LoseLeagueInstance" || this.GetUIName() == "BattleEnd_WinLeagueInstance") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_LoseZorkBoss" || this.GetUIName() == "BattleEnd_WinZorkBoss") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (this.GetUIName() == "BattleEnd_WinGroupFight" || this.GetUIName() == "BattleEnd_LoseGroupFight") {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    this.tableButton = [this.ButtonGoOn];
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.tableButton = [this.ButtonGoOn];
            }
            this.SetButtonVisible(true);
            this.SetButtonSpec();
            var _loop_1 = function (i) {
                var v = this_1.tableButton[i];
                if (v != null) {
                    v.alpha = 0;
                    egret.Tween.get(v).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.buttonFadeTime)
                        .call(function () {
                        egret.Tween.removeTweens(v);
                        tmp();
                    });
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.tableButton.length; i++) {
                _loop_1(i);
            }
        };
        BattleSettle.prototype.GetUIName = function () {
            return this.ui_name;
        };
        BattleSettle.prototype.close = function () {
            _super.prototype.close.call(this);
            egret.Tween.removeTweens(this);
            egret.clearInterval(this.update);
            for (var i = 0; i < BattleSettle.updates.length; i++) {
                egret.clearInterval(BattleSettle.updates[i]);
            }
            BattleSettle.updates = [];
            this.scene = null;
        };
        //继续
        BattleSettle.prototype.ButtonGoOn_CallBack = function () {
            zj.Game.PlayerInstanceSystem.canSyncLevel = true;
            //this.clickGoOn();
        };
        // 详情
        BattleSettle.prototype.ButtonDetail_CallBack = function () {
            this.clickDetail();
        };
        //继续下一关
        BattleSettle.prototype.ButtonNextMob_CallBack = function () {
            this.clickNext();
        };
        //分享
        BattleSettle.prototype.ButtonShare_CallBack = function () {
            this.clickShare();
        };
        //重播方法需重载
        BattleSettle.prototype.clickReplay = function () {
        };
        //详情方法需重载
        BattleSettle.prototype.clickDetail = function () {
            zj.loadUI(zj.BattleEnd_StatsPop)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
            //PushUI("BattleEnd_StatsPop");
        };
        //分享方法重载
        BattleSettle.prototype.clickShare = function () {
        };
        //下一关方法重载
        BattleSettle.prototype.clickNext = function () {
        };
        //战败战力分析
        BattleSettle.prototype.analyseResult = function () {
            //4个值来确定上阵武将
            var format = zj.Game.PlayerFormationSystem.maxFormat();
            var formatPosNum = (format["generals"] + format["reserves"] + format["supports"]);
            var current = zj.Helper.getObjLen(this.scene.tableGeneralsPower);
            var own = zj.Game.PlayerHunterSystem.queryAllHunters().length;
            var max = zj.Helper.getObjLen(zj.TableBaseGeneral.Table());
            var tblResult = [];
            var visitTag = false;
            if (own >= formatPosNum && current < formatPosNum) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_FORMAT;
                info["general_id"] = null;
                tblResult.push(info);
            }
            else if (own < formatPosNum && own < max && current < formatPosNum) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_VISIT;
                info["general_id"] = null;
                tblResult.push(info);
                visitTag = true;
            }
            //大方面去分
            var tblTotal = {};
            var name = ["lands", "partner"];
            for (var i = 0; i < name.length; i++) {
                tblTotal[name[i]] = 0;
            }
            var idTbl = [];
            for (var i = 0; i < current; i++) {
                var generalId = this.scene.tableGeneralsPower[i].general_id;
                idTbl.push(generalId);
                tblTotal["lands"] = tblTotal["lands"] + this.scene.tableGeneralsPower[i].lvAndStarPower;
                tblTotal["partner"] = tblTotal["partner"] + this.scene.tableGeneralsPower[i].partnerPower;
            }
            //取平均值
            var tblAverage = [];
            var fullValue = 0;
            for (var k in tblTotal) {
                var v = tblTotal[k];
                var info = {};
                info["type"] = k;
                if (k == "lands") {
                    for (var i = 0; i < idTbl.length; i++) {
                        fullValue = fullValue + zj.Game.PlayerHunterSystem.getLvAndStarFullValue(idTbl[i]);
                    }
                }
                else if (k == "partner") {
                    for (var i = 0; i < idTbl.length; i++) {
                        fullValue = fullValue + zj.Game.PlayerHunterSystem.getPartnerFullPower(idTbl[i]);
                    }
                }
                info["value"] = v / fullValue;
                tblAverage.push(info);
            }
            tblAverage.sort(function (a, b) {
                return a.value - b.value;
            });
            for (var i = 0; i < tblAverage.length; i++) {
                var info = {};
                if (tblAverage[i].type == "lands" && tblAverage[i].value < 1) {
                    this.scene.tableGeneralsPower.sort(function (a, b) {
                        return a.lvAndStarPower - b.lvAndStarPower;
                    });
                    info["type"] = 0; //TableEnum.EnumAnalyseResult.RESULT_UPGRADE_LEVEL_OR_STAR  
                    info["general_id"] = this.scene.tableGeneralsPower[0].general_id;
                    tblResult.push(info);
                }
                else if (tblAverage[i].type == "partner" && tblAverage[i].value < 1) {
                    this.scene.tableGeneralsPower.sort(function (a, b) {
                        return a.partnerPower - b.partnerPower;
                    });
                    info["type"] = 0; //TableEnum.EnumAnalyseResult.RESULT_UPGRADE_STEP;
                    info["general_id"] = this.scene.tableGeneralsPower[0].general_id;
                    tblResult.push(info);
                }
            }
            if (visitTag == false && tblResult.length == 1 && own < max) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_VISIT;
                info["general_id"] = null;
                tblResult.push(info);
            }
            return tblResult;
        };
        //适用于联赛
        BattleSettle.prototype.loadItem = function () {
            var _this = this;
            //先左后右
            var addItem = function (node, generalInfo, des, isSupport, bEnemy) {
                var item = zj.newUI(zj.ArenaStarcraftHeroItem);
                item.setGeneralInfo(generalInfo, isSupport, bEnemy);
                node.addChild(item);
            };
            var setFlag = function (flag, word, result, bLeft) {
                if (bLeft == true) {
                    if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        flag.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.flag.win, _this);
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.win, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                        flag.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.flag.fail, _this);
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.fail, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
                        flag.visible = false;
                        word.visible = false;
                    }
                }
                else {
                    if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                        flag.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.flag.win, _this);
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.win, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        flag.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.flag.fail, _this);
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.fail, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
                        flag.visible = false;
                        word.visible = false;
                    }
                }
            };
            for (var i = 0; i < 3; i++) {
                //主将
                var generals = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.generals;
                for (var j = 0; j < 3; j++) {
                    var generalInfo_1 = generals[j];
                    var key_1 = zj.Helper.StringFormat("HeroNodeBule%s_%s", (i + 1), (j + 1));
                    var des_1 = zj.Helper.StringFormat("blue%s_%s", (i + 1), (j + 1));
                    addItem(this[key_1], generalInfo_1, des_1, true, false);
                }
                //援护
                var supports = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.supports;
                var generalInfo = supports[0];
                var key = zj.Helper.StringFormat("HeroNodeBule%s%s", (i + 1), 4);
                var des = zj.Helper.StringFormat("bule%s_%s", (i + 1), 4);
                addItem(this[key], generalInfo, des, true, false);
                setFlag(this["BlueFlag" + i], this["BlueWord" + (i + 1)], zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, true);
            }
            for (var i = 0; i < 3; i++) {
                //主将
                var generals = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].rightInfo.generals;
                for (var j = 0; j < 3; j++) {
                    var generalInfo_2 = generals[j];
                    var key_2 = zj.Helper.StringFormat("HeroNodeRed%s_%s", (i + 1), (j + 1));
                    var des_2 = zj.Helper.StringFormat("red%s_%s", (i + 1), (j + 1));
                    addItem(this[key_2], generalInfo_2, des_2, false, true);
                }
                //援护
                var supports = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.supports;
                var generalInfo = supports[0];
                var key = zj.Helper.StringFormat("HeroNodeRed%s%s", (i + 1), 4);
                var des = zj.Helper.StringFormat("red%s_%s", (i + 1), 4);
                addItem(this[key], generalInfo, des, true, true);
                setFlag(this["RedFlag" + i], this["RedWord" + (i + 1)], zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, false);
            }
        };
        /**适用联赛设置UI */
        BattleSettle.prototype.setStarcraftUi = function () {
            // let a = 
            // let  b = Game.PlayerInfoSystem.BaseInfo.contend
        };
        BattleSettle.prototype.loadSinleItem = function (args) {
            var _this = this;
            if (this.LabelPointsB) {
                this.LabelPointsB.visible = false;
            }
            this.LabelPoints.visible = false;
            this.LabelReward.visible = false;
            this.SpriteRewardIcon.visible = false;
            //先左后右
            var addItem = function (node, generalInfo, des, isSupport, bEnemy) {
                var item = zj.newUI(zj.ArenaStarcraftHeroItem);
                item.setGeneralInfo(generalInfo, isSupport, bEnemy);
                node.anchorOffsetX = 24;
                node.anchorOffsetY = 24;
                node.addChild(item.getGroup());
            };
            var setFlag = function (word, result, bLeft) {
                if (bLeft == true) {
                    if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.win, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.fail, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
                        word.visible = false;
                    }
                }
                else {
                    if (result == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.win, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        word.source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.fail, _this);
                    }
                    else if (result == message.BattleResultState.BATTLE_RESULT_STATE_NO) {
                        word.visible = false;
                    }
                }
            };
            for (var i = 0; i < 3; i++) {
                //主将
                var generals = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].leftInfo.generals;
                for (var j = 0; j < 4; j++) {
                    var generalInfo = generals[j];
                    // let key = Helper.StringFormat("HeroNodeBule%s_%s", (i + 1), (j + 1));
                    var des = zj.Helper.StringFormat("blue%s_%s", (i + 1), (j + 1));
                    addItem(this["HeroNodeBule" + (i + 1) + "_" + (j + 1)], generalInfo, des, false, false);
                }
                setFlag(this["BlueWord" + (i + 1)], zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, true);
            }
            for (var i = 0; i < 3; i++) {
                //主将
                var generals = zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].rightInfo.generals;
                for (var j = 0; j < 4; j++) {
                    var generalInfo = generals[j];
                    // let key = Helper.StringFormat("HeroNodeRed%s_%s",, );
                    var des = zj.Helper.StringFormat("red%s_%s", (i + 1), (j + 1));
                    addItem(this["HeroNodeRed" + (i + 1) + "_" + (j + 1)], generalInfo, des, false, true);
                }
                setFlag(this["RedWord" + (i + 1)], zj.Game.PlayerBattleSystem.battleSingleInfo[i + 1].battleResult, false);
            }
            var delay = 0.2;
            var _loop_2 = function (i) {
                if (this_2["SpriteTeamNum" + (i + 1)] != null) {
                    // this["SpriteTeamNum" + (i + 1)].removeFromParent();
                    var bones = [
                        "004_xiaobiaoqian1",
                        "003_duiwu",
                        "005_xiaobiaoqian2",
                        "006_touxiang1_4",
                        "006_touxiang1_3",
                        "006_touxiang1_2",
                        "006_touxiang1_1",
                        "007_touxiang2_1",
                        "007_touxiang2_2",
                        "007_touxiang2_3",
                        "007_touxiang2_4",
                    ];
                    var paths = [
                        this_2["BlueWord" + (i + 1)],
                        this_2["SpriteTeamNum" + (i + 1)],
                        this_2["RedWord" + (i + 1)]
                    ];
                    for (var j = 4; j > 0; j--) {
                        paths.push(this_2["HeroNodeBule" + (i + 1) + "_" + j]);
                    }
                    for (var k = 4; k > 0; k--) {
                        paths.push(this_2["HeroNodeRed" + (i + 1) + "_" + k]);
                    }
                    // let action = () => {
                    // 	let animationEventBox = (armatureBack, movementType, movementId) => {
                    // if(movementType ){
                    if (i == 2) {
                        if (zj.Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                            this_2.setSingleUi();
                        }
                    }
                    // }
                    // 	}
                    // }
                    this_2["NodeTeamAni" + (i + 1)].removeChildren();
                    if (zj.Game.PlayerBattleSystem.battleSingleInfo[3].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_NO && i == 2) {
                        var node1 = new eui.Group();
                        var node2 = new eui.Group();
                        // this.rootNode
                        paths[0] = node1;
                        paths[2] = node2;
                    }
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this_2, "ui_gedou_02", null, paths, bones)
                        .then(function (armatureDisplay) {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.stop();
                        }, _this);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("0001_biaoqian_01", 1);
                        _this["NodeTeamAni" + (i + 1)].addChild(armatureDisplay);
                    });
                }
            };
            var this_2 = this;
            for (var i = 0; i < 3; i++) {
                _loop_2(i);
            }
        };
        /**适用跨服战设置UI */
        BattleSettle.prototype.setSingleUi = function () {
            var plevel = zj.singLecraft.GetLevel(zj.Gmgr.Instance.singleScore);
            var nlevel = zj.singLecraft.GetLevel(this.SingleInfo.score);
            var diffhonor = zj.Game.PlayerInfoSystem.BaseInfo.honorCoin - zj.Gmgr.Instance.singleHonor || 0;
            this.LabelReward.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.battleReward, diffhonor);
            this.LabelPoints.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.battlePoints, zj.Gmgr.Instance.singleScore);
            this.LabelPointsB.visible = false;
            this.SpriteRewardIcon.visible = true;
            var cb = function () {
                zj.loadUI(zj.ArenaWholeGradeUp)
                    .then(function (dialog) {
                    dialog.setInfo(plevel, nlevel);
                    dialog.show();
                });
            };
            if (plevel != nlevel) {
                this.SetLevelUpUI(cb);
            }
            else {
                this.SetLevelUpUI();
            }
        };
        BattleSettle.prototype.SetLevelUpUI = function (cb) {
            var _this = this;
            this.LabelPointsB.visible = true;
            this.LabelPoints.visible = true;
            this.LabelReward.visible = true;
            this.SpriteRewardIcon.visible = true;
            var diffScore = this.SingleInfo.score - zj.Gmgr.Instance.singleScore;
            var scoreStr = diffScore >= 0 && "+" + diffScore || diffScore;
            var t = 5;
            var a = zj.Gmgr.Instance.singleScore;
            var b = this.SingleInfo.score;
            var curScore = a;
            this.LabelPoints.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.battlePoints, curScore);
            var scalesold = this.LabelPointsB.scaleX;
            if (diffScore >= 0) {
                this.LabelPointsB.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, scoreStr));
            }
            else {
                this.LabelPointsB.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, scoreStr));
            }
            // this.LabelPointsB
            var preTime = zj.Game.PlayerInstanceSystem.curServerTime;
            var isdone = 0;
            var action = function () {
                if (zj.Game.PlayerInstanceSystem.curServerTime >= preTime + 0.9) {
                    if (a >= b) {
                        curScore -= Math.ceil((a - b) / (t / 0.5));
                        if (curScore < b) {
                            curScore = b;
                        }
                    }
                    else {
                        curScore += Math.ceil((b - a) / (t / 0.5));
                        if (curScore > b) {
                            curScore = b;
                        }
                    }
                    _this.LabelPoints.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.battlePoints, curScore);
                    if (curScore == b && cb != null && isdone == 0) {
                        isdone = 1;
                        cb();
                    }
                }
            };
        };
        BattleSettle.prototype.BossEntryReq = function () {
            var _this = this;
            var zork = zj.Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem;
            this.bossEntry(zork.scene_x, zork.scene_y)
                .then(function (response) {
            })
                .catch(function (result) {
                zj.TipManager.ShowBattleError(result, _this, _this.QuitBossFight);
            });
        };
        BattleSettle.prototype.bossEntry = function (scenex, sceney) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BossEntryRequest();
                request.body.scene_x = scenex;
                request.body.scene_y = sceney;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        BattleSettle.prototype.QuitBossFight = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.WonderlandScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    scene.init();
                    scene.onClick6_2();
                    zj.Game.TeachSystem.battleEndOpenTeach = true;
                });
            });
        };
        BattleSettle.updates = [];
        return BattleSettle;
    }(zj.Dialog));
    zj.BattleSettle = BattleSettle;
    __reflect(BattleSettle.prototype, "zj.BattleSettle");
})(zj || (zj = {}));
//# sourceMappingURL=BattleSettle.js.map