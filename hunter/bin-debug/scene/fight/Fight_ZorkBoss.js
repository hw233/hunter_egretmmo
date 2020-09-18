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
    var Fight_ZorkBoss = (function (_super) {
        __extends(Fight_ZorkBoss, _super);
        function Fight_ZorkBoss() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.bossHp = 0;
            _this.timer = 2000;
            _this.totalSum = 0;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_ZorkBoss.prototype.Init = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.update = egret.setInterval(this.Update, this, 0);
            this.bossHp = scene.bossInstance.getHp();
        };
        Fight_ZorkBoss.prototype.getSumHurt = function (bclear) {
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
        Fight_ZorkBoss.prototype.timeHp = function (tick) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
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
        Fight_ZorkBoss.prototype.timeReq = function (value) {
            var req = new message.BossSynchronousHurtRequest();
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.hurtValue = value;
            this.totalSum = this.totalSum + value;
            zj.Game.Controller.send(req, this.ZorkBossHurt_Visit, null, this, false);
        };
        Fight_ZorkBoss.prototype.ZorkBossHurt_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.freshBossHp(response.body.value);
        };
        Fight_ZorkBoss.prototype.freshBossHp = function (hp) {
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
        Fight_ZorkBoss.prototype.Update = function (dt) {
            dt = 1 / 30;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            this.timeHp(dt);
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false && scene.bBossEnding == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_ZorkBoss.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_ZorkBoss.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_ZorkBoss.prototype.NetData = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            this.DealLoseData();
            this.ChallengeMobReq();
        };
        Fight_ZorkBoss.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_3;
            var battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = battleInfo;
        };
        Fight_ZorkBoss.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_B;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_ZorkBoss.prototype.ChallengeMobReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.BossBattleRequest();
            var sum = this.getSumHurt(true);
            this.totalSum = this.totalSum + sum;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            req.body.totalDamage = this.totalSum;
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.BossBattle_Visit, null, this, false);
        };
        Fight_ZorkBoss.prototype.BossBattle_Visit = function (req, resp) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerZorkSystem.zork.roleInfo = response.body.roleInfo;
            if (scene.bBossEnding == false && response.body.is_kill == false) {
                this.BossEntryReq();
            }
        };
        Fight_ZorkBoss.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_ZorkBoss.prototype.BossEntryReq = function () {
            var req = new message.BossEntryRequest();
            req.body.scene_x = zj.Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem.scene_x;
            req.body.scene_y = zj.Game.PlayerZorkSystem.zork.roleInfo.posInfo.posItem.scene_y;
            // Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, this.BossEntryReqBody_Visit, null, this, false);
        };
        Fight_ZorkBoss.prototype.BossEntryReqBody_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerWonderLandSystem.scenePosInfo = {};
            zj.Game.PlayerWonderLandSystem.timePosInfo = {};
            zj.PlayerWonderLandSystem.MapHeight = 960;
            response.body.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
            zj.Game.PlayerZorkSystem.zorkBoss.inZorkBoss = true;
            zj.Game.PlayerZorkSystem.zorkBoss.roleInfo = response.body.roleInfo;
            zj.Game.PlayerZorkSystem.zorkBoss.serverSceneId = response.body.sceneId;
            zj.Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneZorkBoss);
        };
        Fight_ZorkBoss.prototype.QuitBossFight = function () {
            // 	local function tmp()
            //     Gmgr.bPause = false
            //     Gmgr.bReplay = false
            //     PushUI("HXH_Wonderland")
            //     --PushUI("Zork_BossMainPop") 
            // end        
            // StageSceneManager:ChangeScene(StageSceneCity, tmp)
        };
        Fight_ZorkBoss.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_ZorkBoss;
    }(zj.UI));
    zj.Fight_ZorkBoss = Fight_ZorkBoss;
    __reflect(Fight_ZorkBoss.prototype, "zj.Fight_ZorkBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_ZorkBoss.js.map