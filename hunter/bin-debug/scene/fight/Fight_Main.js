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
    var Fight_Main = (function (_super) {
        __extends(Fight_Main, _super);
        function Fight_Main() {
            var _this = _super.call(this) || this;
            _this.tableEnemyUi = [];
            _this.tableUiPos = [];
            _this.viewArr = [];
            _this.skinName = "resource/skins/fight/Fight_MainSkin.exml";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.roleMsg = null;
            _this.itemBoss = null;
            _this.bMeetBoss = false;
            _this.tableEnemyUi = [];
            _this.time_id = -1;
            _this.time_step = 0;
            _this.move_step = 0;
            _this.load_id = -1;
            _this.load_step = 0;
            _this.tableUiPos = [];
            return _this;
        }
        //初始化ui
        Fight_Main.prototype.Init = function () {
            this.ShowTansFunc();
            this.CheckTeachNetError();
        };
        Fight_Main.prototype.CheckTeachNetError = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true && zj.Gmgr.Instance.bInAIFightType() == 5) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Reconnect.disconnect, function () {
                    //GameCommon.ReLogin()
                });
            }
        };
        Fight_Main.prototype.ShowTansFunc = function () {
            this.ButtonTowerBack.visible = false;
            // this.update = egret.setInterval(this.Update, this, 0);
            this.doLoad();
        };
        Fight_Main.prototype.preLoadMonsterPic = function () {
        };
        Fight_Main.prototype.NoticeMsgInfo = function (general) {
            if (general.bEnemy == true) {
            }
            else {
                if (this.roleMsg != null) {
                    this.roleMsg.FreshBlood(general);
                }
            }
        };
        Fight_Main.prototype.Update = function (dt) {
        };
        Fight_Main.prototype.ConfirmCallB = function () {
        };
        Fight_Main.prototype.doDieUi = function (pos, isBoss) {
            if (isBoss == true) {
                //this.bossDie();
            }
        };
        Fight_Main.prototype.doBossAppear = function () {
            var des_y = zj.Device.screenHeight - 95 - 32;
            var bossIndex = this.scene.bossPosIndex;
            this.creatBossUi(bossIndex, 0);
            this.doAction(this.itemBoss, 500, new egret.Point(zj.Device.screenWidth - 524, 0), null);
        };
        Fight_Main.prototype.doFillUi = function (role) {
            var pos = role.getTeamNum() + 1;
            if (role.bEnemy == false) {
            }
            else {
                if (this.scene.isBossAppear() && pos == this.scene.bossPosIndex) {
                    this.doBossAppear();
                }
            }
        };
        Fight_Main.prototype.doSingleBossAppear = function () {
            this.creatBossUi(2, 0);
            this.doAction(this.itemBoss, 0.5, new egret.Point(zj.Device.screenWidth - 524, 0), null);
        };
        Fight_Main.prototype.doSingleMonsterAppear = function (pos, bossAppear) {
            this.creatBossUi(pos, bossAppear);
        };
        Fight_Main.prototype.loadMeetMonsterUi = function () {
            for (var i = 3; i >= 0; i--) {
                if (this.scene.tableEnemyKey[i] != null) {
                    if (this.scene.isBossAppear() == true && i == this.scene.bossPosIndex) {
                        this.creatBossUi(i, 0);
                    }
                }
            }
            this.timer_id = egret.setInterval(this.doStep, this, 250);
        };
        Fight_Main.prototype.doLoad = function () {
            this.load_id = egret.setInterval(this.doLoadStep, this, 300);
        };
        Fight_Main.prototype.doTeach = function () {
            if (this.load_step == 2) {
                this.loadMeetMonsterUi();
            }
            else if (this.load_step == 4) {
                egret.clearInterval(this.load_id);
                this.load_step = -1;
            }
        };
        Fight_Main.prototype.doNormal = function () {
            if (this.load_step == 1) {
                this.scene.judgeFightStart();
            }
            else if (this.load_step == 2) {
                this.roleMsg = this.AddSubWin(zj.Fight_RoleMsg);
                zj.Game.EventManager.event(zj.GameEvent.SHOW_FIGHT_UI, { typeName: "zj.Fight_RoleMsg" });
            }
            else if (this.load_step == 3) {
                this.loadMeetMonsterUi();
            }
            else if (this.load_step == 4) {
                if (zj.Gmgr.Instance.bReplay == false) {
                    if (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == zj.Gmgr.Instance.fightType ||
                        message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == zj.Gmgr.Instance.fightType ||
                        message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND == zj.Gmgr.Instance.fightType ||
                        message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND == zj.Gmgr.Instance.fightType) {
                        //普通副本和精英副本
                        var fight = this.AddSubWin(zj.Fight_InstanceUI);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_LADDER_ATTACK == zj.Gmgr.Instance.fightType) {
                        //竞技场
                        var itemArenaUi = this.AddSubWin(zj.Fight_Arena);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER == zj.Gmgr.Instance.fightType) {
                        //爬塔
                        var instanceTower = this.AddSubWin(zj.Fight_Tower);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER == zj.Gmgr.Instance.fightType) {
                        //高级爬塔
                        var instanceTower = this.AddSubWin(zj.Fight_Tower);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_INSTANCE_EXP == zj.Gmgr.Instance.fightType) {
                        //经验或游戏币副本
                        var expOrCoin = this.AddSubWin(zj.Fight_Bastille);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_WANTED == zj.Gmgr.Instance.fightType) {
                        //通缉令类型
                        var itemWantedUi = this.AddSubWin(zj.Fight_Wanted);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP == zj.Gmgr.Instance.fightType) {
                        //通缉令山洞类型
                        var itemWantedUi = this.AddSubWin(zj.Fight_WantedSecondEnemy);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS == zj.Gmgr.Instance.fightType) {
                        //联盟boss
                        var leagueBoss = this.AddSubWin(zj.Fight_LeagueBoss);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE == zj.Gmgr.Instance.fightType) {
                        //联盟副本
                        var leagueBoss = this.AddSubWin(zj.Fight_LeagueInstance);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_ZORK == zj.Gmgr.Instance.fightType) {
                        //世界boss
                        var zorkBoss = this.AddSubWin(zj.Fight_ZorkBoss);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK == zj.Gmgr.Instance.fightType) {
                        //跨服战
                        var arenaStarcraft = this.AddSubWin(zj.Fight_Single);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_MATCH_ATTACK == zj.Gmgr.Instance.fightType) {
                        //联赛工会战斗
                        var arenaStarcraft = this.AddSubWin(zj.Fight_Match);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT == zj.Gmgr.Instance.fightType) {
                        //天命
                        //let lifeUi = this.AddSubWin(Fight_Life);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_MISSION_LICENCE == zj.Gmgr.Instance.fightType) {
                        //执照
                        var LicenseUi = this.AddSubWin(zj.Fight_License);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_PVP_SIMPLE == zj.Gmgr.Instance.fightType) {
                        //1v1 切磋
                        var SingleBattle = this.AddSubWin(zj.Fight_SingleBattle);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_PVP_THIRD == zj.Gmgr.Instance.fightType) {
                        //3v3 切磋
                        var ThreeBattle = this.AddSubWin(zj.Fight_ThreeBattle);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_GROUP_FIGHT == zj.Gmgr.Instance.fightType) {
                        //组队战飞龙营地
                        var GroupFight = this.AddSubWin(zj.Fight_GroupFight);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_RELIC == zj.Gmgr.Instance.fightType) {
                        //遗迹战 遗迹探索
                        this.relicFight = this.AddSubWin(zj.Fight_Relic);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_ACTIVITY == zj.Gmgr.Instance.fightType) {
                        // 活动副本 猎人故事副本
                        var activityFight = this.AddSubWin(zj.Fight_Activity);
                    }
                    else if (message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS == zj.Gmgr.Instance.fightType) {
                        // 活动Boss 年兽
                        var activityFight = this.AddSubWin(zj.Fight_ActivityBoss); // 打年兽积分显示
                    }
                }
                else {
                    //let replayUi = this.AddSubWin(Fight_Replay);
                }
            }
            else if (this.load_step == 8) {
            }
            else if (this.load_step == 10) {
            }
            else if (this.load_step == 12) {
                egret.clearInterval(this.load_id);
                this.load_step = -1;
            }
        };
        Fight_Main.prototype.AddSubWin = function (claName) {
            var view = zj.newUI(claName);
            //view.ui_name = claName;
            view.height = zj.UIManager.StageHeight;
            view.width = zj.UIManager.StageWidth;
            view.Init();
            this.addChild(view);
            this.viewArr.push(view);
            return view;
        };
        Fight_Main.prototype.DeleteSubWin = function (cla) {
            if (cla && cla.parent) {
                cla.OnExit();
                cla.parent.removeChild(cla);
                cla.close();
                cla = null;
            }
        };
        Fight_Main.prototype.doLoadStep = function () {
            if (this.load_step == -1) {
                return;
            }
            this.load_step = this.load_step + 1;
            if (zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH == zj.Gmgr.Instance.fightType) {
                this.doTeach();
            }
            else {
                this.doNormal();
            }
        };
        Fight_Main.prototype.doAction = function (ui, _time, moveByPos, callBack) {
            var _tmp = zj.ConstantConfig_BattleTbl.BATTLE_AUTO_SPEED_UI[zj.Gmgr.Instance.bakeSpeedIndex];
            var time = _time / _tmp;
            function callNil() {
                ui.actionTag = false;
            }
            // egret.Tween.get(ui).to({ x: moveByPos.x}, time,callNil);
            ui.moveTag = true;
            ui.actionTag = true;
        };
        Fight_Main.prototype.doStep = function () {
            if (this.time_step == -1) {
                return;
            }
            this.time_step = this.time_step + 1;
            if (this.scene.isBossAppear() == true) {
                if (this.itemBoss.moveTag == false) {
                    var index = this.searchNearMove();
                    if (index == -1) {
                        this.doAction(this.itemBoss, 500, new egret.Point(zj.Device.screenWidth - 524, 0), null);
                    }
                    else {
                        this.move_step = this.move_step + 1;
                        var moveByX = -(82 + this.move_step * 152 + (this.move_step - 1) * 10);
                        this.doAction(this.tableEnemyUi[index], 300, new egret.Point(moveByX, 0), null);
                    }
                }
                else {
                    egret.clearInterval(this.load_id);
                    this.load_id = -1;
                }
            }
            else {
                var index = this.searchNearMove();
                if (index == -1) {
                    egret.clearInterval(this.time_id);
                    this.time_id = -1;
                }
                else {
                    this.move_step = this.move_step + 1;
                    var moveByX = -(20 + this.move_step * 152 + (this.move_step - 1) * 10);
                    this.doAction(this.tableEnemyUi[index], 300, new egret.Point(moveByX, 0), null);
                }
            }
        };
        Fight_Main.prototype.searchNearMove = function () {
            for (var i = 3; i < 0; i--) {
                if (this.tableEnemyUi[i] != null && this.tableEnemyUi[i].moveTag == false) {
                    return i;
                }
            }
            return -1;
        };
        Fight_Main.prototype.creatBossUi = function (pos, y) {
            this.DeleteSubWin(this.itemBoss);
            this.itemBoss = this.AddSubWin(zj.Fight_ItemBoss);
            if (this.itemBoss == null) {
                return;
            }
            var t = this.scene.getEnemys();
            var boss = t[this.scene.tableEnemyKey[pos]];
            this.itemBoss.SetInfo(boss);
            this.itemBoss.Load();
            //this.itemBoss.SetFather(this);
        };
        Fight_Main.prototype.creatMonsterUi = function (pos, bBossStep) {
            var y = zj.yuan3(bBossStep == false, -15, -95);
            this.DeleteSubWin(this.itemEnemy);
            //this.itemEnemy = this.AddSubWin(Fight_ItemEnemy);
            if (this.itemEnemy == null) {
                return;
            }
            var t = this.scene.getEnemys();
            var monster = t[this.scene.tableEnemyKey[pos]];
            this.itemEnemy.SetInfo(monster);
            this.itemEnemy.Load();
            this.itemEnemy.SetBossStep(bBossStep);
            this.itemEnemy.x = zj.Device.screenWidth;
            this.itemEnemy.y = zj.Device.screenHeight - y;
            //this.itemEnemy.SetFather(this);
            this.tableEnemyUi[pos] = this.itemEnemy;
        };
        Fight_Main.prototype.Pause = function () {
            if (this.roleMsg != null) {
                this.roleMsg.Pause();
            }
        };
        Fight_Main.prototype.resume = function () {
            if (this.roleMsg != null) {
                this.roleMsg.resume();
            }
        };
        Fight_Main.prototype.OpenWeekUI = function () {
            if (this.relicFight != null) {
                this.relicFight.OpenWeek();
            }
        };
        Fight_Main.prototype.CloseWeekUI = function () {
            if (this.relicFight != null) {
                this.relicFight.CloseWeek();
            }
        };
        Fight_Main.prototype.EndCurrChap = function () {
            if (this.relicFight != null) {
                this.relicFight.SetStageEnd();
            }
        };
        Fight_Main.prototype.StartNextChap = function () {
            if (this.relicFight != null) {
                this.relicFight.SetStageBegin();
            }
        };
        Fight_Main.prototype.ResetCurrBossInfo = function () {
            if (this.itemBoss != null) {
                this.itemBoss.ResetCurrBossInfo();
            }
        };
        Fight_Main.prototype.DealSkillUiEffect = function (general, index) {
            if (this.roleMsg != null) {
                this.roleMsg.TouchSkillUiEffect(general, index);
            }
        };
        Fight_Main.prototype.DealDeathUiEffect = function (general, index) {
            if (this.roleMsg != null) {
                this.roleMsg.TouchDeathUiEffect(general, index);
            }
        };
        Fight_Main.prototype.FreshDeadUi = function (role) {
            if (role.bEnemy == false) {
                if (this.roleMsg != null) {
                    this.roleMsg.FreshDeadUi(role);
                }
            }
        };
        Fight_Main.prototype.FreshNewUi = function (role) {
            if (this.roleMsg != null) {
                this.roleMsg.FreshNewUi(role);
            }
        };
        Fight_Main.prototype.ReloadHelp = function () {
            if (this.roleMsg != null) {
                this.roleMsg.ReloadHelp();
            }
        };
        Fight_Main.prototype.FreshHelp = function (role) {
            if (this.roleMsg != null) {
                this.roleMsg.ClickHelp();
            }
        };
        Fight_Main.prototype.FreshReviveMenu = function (role) {
            if (role != null && role.bEnemy == false) {
                if (this.roleMsg != null) {
                    this.roleMsg.FreshReviveUi(role);
                }
            }
        };
        Fight_Main.prototype.CloseAni = function (role) {
            if (this.roleMsg != null) {
                this.roleMsg.CloseAni();
            }
        };
        Fight_Main.prototype.GetCdTipPos = function (num, type) {
            var x = 0;
            var y = 0;
            if (this.roleMsg != null) {
                var arr = this.roleMsg.GetCdTipPos(num, type);
                x = arr[0];
                y = arr[1];
            }
            return [x, y];
        };
        Fight_Main.prototype.LockPauseUi = function () {
            if (this.roleMsg != null) {
                this.roleMsg.ForceLockPause();
            }
        };
        Fight_Main.prototype.getLoadStep = function () {
            if (this.roleMsg != null) {
                return this.roleMsg.load_step;
            }
        };
        Fight_Main.prototype.OnExit = function () {
            egret.clearInterval(this.load_id);
            this.load_step = -1;
            egret.clearInterval(this.update);
            this.update = -1;
            egret.clearInterval(this.timer_id);
            this.timer_id = -1;
            for (var i = 0; i < this.viewArr.length; i++) {
                this.DeleteSubWin(this.viewArr[i]);
            }
            this.roleMsg = null;
            this.itemBoss = null;
            this.relicFight = null;
            this.viewArr = [];
            this.scene = null;
        };
        Fight_Main.prototype.CommonSettleWin = function (msg, rewardCB, thisObj) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            scene.getItemInfo.items = zj.Helper.hideSpecialGoods(msg.body.gameInfo.getGoods);
            _a = zj.Helper.getTurnGoods(msg.body.gameInfo.getGoods, zj.Gmgr.Instance.fightType), scene.getItemInfo.turnItems = _a[0], scene.getItemInfo.extraItems = _a[1];
            scene.getItemInfo.firstBloodItems = zj.Helper.getFirstBloodGoods(msg.body.gameInfo.getGoods, zj.Gmgr.Instance.fightType);
            scene.potatos = msg.body.gameInfo.potatos;
            if (zj.Gmgr.Instance.bContinueBattle) {
                var _loop_1 = function (k) {
                    var v = msg.body.gameInfo.getGoods[k];
                    if (v.goodsId != 0) {
                        var _a = zj.Table.FindR(zj.Game.PlayerBattleSystem.continueBattleDropItems, function (_k, _v) {
                            return _v.goodsId == v.goodsId;
                        }), entity = _a[0], index = _a[1];
                        if (entity != null && zj.PlayerItemSystem.ItemIsOverlap(v.goodsId) && zj.PlayerItemSystem.Type2(v.goodsId) != message.EGoodsType.GOODS_TYPE_POTATO) {
                            zj.Game.PlayerBattleSystem.continueBattleDropItems[index].count = entity.count + v.count;
                        }
                        else {
                            zj.Game.PlayerBattleSystem.continueBattleDropItems.push(v);
                        }
                    }
                };
                for (var k in msg.body.gameInfo.getGoods) {
                    _loop_1(k);
                }
                for (var k in msg.body.gameInfo.potatos) {
                    var v = msg.body.gameInfo.potatos[k];
                    zj.Game.PlayerBattleSystem.continueBattleDropItems.push(v);
                }
            }
            if (scene.getItemInfo.firstBloodItems.length != 0
                && (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == zj.Gmgr.Instance.fightType
                    || message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == zj.Gmgr.Instance.fightType
                    || message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER == zj.Gmgr.Instance.fightType
                    || message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER == zj.Gmgr.Instance.fightType
                    || message.EFormationType.FORMATION_TYPE_GROUP_FIGHT == zj.Gmgr.Instance.fightType
                    || message.EFormationType.FORMATION_TYPE_WANTED == zj.Gmgr.Instance.fightType)) {
                var show_first = true;
                for (var i = 0; i < scene.getItemInfo.firstBloodItems.length; i++) {
                    var v = scene.getItemInfo.firstBloodItems[i];
                    if (v.goodsId == 0) {
                        show_first = false;
                        break;
                    }
                }
                if (show_first) {
                    // TipMgr:GetFirstBlood(self.scene.getItemInfo.firstBloodItems ,self, cb1);、
                    zj.loadUI(zj.Common_FirstBlood)
                        .then(function (dialog) {
                        dialog.SetInfoGet(scene.getItemInfo.firstBloodItems);
                        dialog.SetCB(function () {
                            _this.cb1(rewardCB, thisObj);
                        });
                        dialog.show();
                    });
                }
                else {
                    this.cb1(rewardCB, thisObj);
                }
            }
            else {
                this.cb1(rewardCB, thisObj);
            }
            var _a;
        };
        Fight_Main.prototype.setUI = function (rewardCB, thisObj) {
            var _this = this;
            if (rewardCB == null) {
                // toast("成功调取成功结算")
                zj.loadUI(zj.BattleEnd_Win)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.SetFather(_this);
                    _this.loseSubUi.Load();
                });
            }
            else {
                rewardCB.call(thisObj);
            }
        };
        Fight_Main.prototype.cb1 = function (rewardCB, thisObj) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Helper.getObjLen(scene.getItemInfo.turnItems) != 0) {
                var show_turn = true;
                for (var i = 0; i < scene.getItemInfo.turnItems.length; i++) {
                    var v = scene.getItemInfo.turnItems[i];
                    if (v.goodsId == 0) {
                        show_turn = false;
                        break;
                    }
                }
                if (show_turn) {
                    var a_1 = function () {
                        _this.setUI(rewardCB, thisObj);
                    };
                    zj.loadUI(zj.CardBagPopItem)
                        .then(function (dialog) {
                        dialog.playAni(null, scene.getItemInfo.turnItems, scene.getItemInfo.extraItems, _this, a_1, scene.potatos);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    // this.setUI(rewardCB, thisObj);
                }
                else {
                    this.setUI(rewardCB, thisObj);
                }
            }
            else {
                this.setUI(rewardCB, thisObj);
            }
        };
        return Fight_Main;
    }(zj.UI));
    zj.Fight_Main = Fight_Main;
    __reflect(Fight_Main.prototype, "zj.Fight_Main");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Main.js.map