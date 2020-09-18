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
    var Fight_LeagueBoss = (function (_super) {
        __extends(Fight_LeagueBoss, _super);
        function Fight_LeagueBoss() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.bossHp = 0;
            _this.timer = 0;
            _this.totalSum = 0;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_LeagueBoss.prototype.Init = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.update = egret.setInterval(this.Update, this, 0);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.LeagueBossNotice_Visit, this);
            this.bossHp = scene.bossInstance.getHp();
        };
        Fight_LeagueBoss.prototype.LeagueBossNotice_Visit = function (response) {
            var data = response.data;
            // if (data.header.result != 0) {
            // 	toast(Game.ConfigManager.getAone2CodeReason(data.header.result));
            // 	return;
            // }
            if (data.body.type == 2 || data.body.type == 3) {
                this.freshBossHp(data.body.value);
            }
        };
        Fight_LeagueBoss.prototype.getSumHurt = function (bclear) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var sumHurt = 0;
            for (var k in scene.tableAllys) {
                var v = scene.tableAllys[k];
                if (v != null) {
                    sumHurt = sumHurt + v.bossHurtValue;
                    if (bclear == true) {
                        v.bossHurtValue = 0;
                    }
                }
            }
            for (var k in scene.tableAllySupports) {
                var v = scene.tableAllySupports[k];
                if (v != null) {
                    sumHurt = sumHurt + v.bossHurtValue;
                    if (bclear == true) {
                        v.bossHurtValue = 0;
                    }
                }
            }
            return sumHurt;
        };
        Fight_LeagueBoss.prototype.timeHp = function (tick) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            tick = 1 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            if (scene.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            this.timer = this.timer + tick * 1000;
            if (this.timer >= 2000) {
                this.timer = 0;
                var sumHurt = this.getSumHurt(true);
                this.timeReq(sumHurt);
            }
        };
        Fight_LeagueBoss.prototype.timeReq = function (value) {
            var req = new message.LeagueBossHurtRequest();
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.hurtValue = value;
            this.totalSum = this.totalSum + value;
            zj.Game.Controller.send(req, this.LeagueBossHurt_Visit, null, this, false);
        };
        Fight_LeagueBoss.prototype.LeagueBossHurt_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                //toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.freshBossHp(response.body.value);
        };
        Fight_LeagueBoss.prototype.freshBossHp = function (hp) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (scene.bBossDead == true) {
                return;
            }
            if (scene.bossInstance != null) {
                var curHp = scene.bossInstance.getHp();
                var a = hp - this.getSumHurt(false);
                if (a < 0) {
                    a = 0;
                }
                scene.bossInstance.setHp(a);
            }
        };
        Fight_LeagueBoss.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            this.timeHp(dt);
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_LeagueBoss.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_LeagueBoss.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_LeagueBoss.prototype.NetData = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            this.DealLoseData();
            this.ChallengeMobReq();
        };
        Fight_LeagueBoss.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_3;
            var battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = battleInfo;
        };
        Fight_LeagueBoss.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_B;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_LeagueBoss.prototype.ChallengeMobReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.LeagueBossBattleRequest();
            var sum = this.getSumHurt(true);
            this.totalSum = this.totalSum + sum;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.LeagueBossBattle_Visit, null, this, false);
        };
        Fight_LeagueBoss.prototype.LeagueBossBattle_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var response = resp;
            if (response.header.result != 0) {
                //toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.EventManager.event(zj.GameEvent.LEAGUEBOSSBATTLE, response.body); //工会需要的数据
            zj.Game.PlayerLeagueSystem.updateLeagueBossHp(response.body.bossHp);
            if (response.body.is_kill == true) {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                this.DealWinData();
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_WinLeagueMonster)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.loadLabel(_this);
                    _this.winSubUi.Load();
                });
            }
            else {
                this.DealLoseData();
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_LoseLeagueMonster)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.loadLabel(_this);
                    _this.loseSubUi.Load();
                });
            }
        };
        Fight_LeagueBoss.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_LeagueBoss.prototype.OnExit = function () {
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.LeagueBossNotice_Visit, this);
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_LeagueBoss;
    }(zj.UI));
    zj.Fight_LeagueBoss = Fight_LeagueBoss;
    __reflect(Fight_LeagueBoss.prototype, "zj.Fight_LeagueBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_LeagueBoss.js.map