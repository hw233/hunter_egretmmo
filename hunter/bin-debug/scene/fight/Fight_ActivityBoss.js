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
     * @class 年兽boss战斗积分显示
     *
     * @author LianLei
     *
     * @date 2019.07.26
     */
    var Fight_ActivityBoss = (function (_super) {
        __extends(Fight_ActivityBoss, _super);
        // private time_id: number;
        function Fight_ActivityBoss() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fight/Fight_ActivityBossSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.scene = null;
                egret.clearInterval(_this.update);
                egret.clearInterval(_this._timmers);
                // egret.clearInterval(this.time_id);
                _this.update = -1;
                _this._timmers = -1;
                // this.time_id = -1;
            }, _this);
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.stopChannelTag = false;
            _this.bossHp = 0;
            _this.timer = 0;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.ScoreSum = 0;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            return _this;
        }
        Fight_ActivityBoss.prototype.Init = function () {
            this.labelHit.text = "0";
            this.update = egret.setInterval(this.Update, this, 0);
            this._timmers = egret.setInterval(this.UpdateEnd, this, 990);
        };
        Fight_ActivityBoss.prototype.UpdateEnd = function () {
            var _this = this;
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var time = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].leftTime - Math.floor(egret.getTimer() / 1000);
            if (!bOpen && time <= 0) {
                zj.loadUI(zj.Activity_BossEnd).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init();
                    _this.OnExit();
                    _this.scene = null;
                });
            }
        };
        Fight_ActivityBoss.prototype.getSumHurt = function () {
            var sumHurt = 0;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.scene.tableAllys); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v != null) {
                    sumHurt += v.bossHurtValue;
                }
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(this.scene.tableAllySupports); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                if (v != null) {
                    sumHurt += v.bossHurtValue;
                }
            }
            return sumHurt;
        };
        Fight_ActivityBoss.prototype.timeHp = function () {
            if (this.scene.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT)
                return;
            var sumHurt = this.getSumHurt();
            var score = zj.CommonConfig.darkland_boss_calc_battle_score(sumHurt);
            this.labelHit.text = score.toString();
        };
        Fight_ActivityBoss.prototype.Update = function () {
            if (zj.Gmgr.Instance.bInLoading == true)
                return;
            this.timeHp();
            if (this.scene.bBalance == false)
                return;
            if (this.stopChannelTag == false && this.scene.bBossEnding == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_ActivityBoss.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        // private EndBattleNet() {
        // 	egret.clearInterval(this.time_id);
        // 	this.time_id = -1;
        // }
        Fight_ActivityBoss.prototype.NetData = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true)
                return;
            this.DealLoseData();
            this.ChallengeMobReq();
        };
        Fight_ActivityBoss.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_B;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_ActivityBoss.prototype.ChallengeMobReq = function () {
            var req = new message.DarklandBossBattleResultRequest();
            var SumHurt = this.getSumHurt();
            var score = zj.CommonConfig.darkland_boss_calc_battle_score(SumHurt);
            req.body.mobId = zj.Game.PlayerBossSystem.ActivityBoss.bossId;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, this.scene.getTiming(), null, this.scene.maxCombo, this.scene.replayBattleInfo);
            req.body.totalDamage = SumHurt;
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            req.body.score = score;
            zj.Game.Controller.send(req, this.BossBattle_Visit, null, this, false);
        };
        Fight_ActivityBoss.prototype.BossBattle_Visit = function (req, resp) {
            // this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            if (response.header.result == message.EC.SUCCESS) {
                this.OnExit();
                this.bossEntry();
            }
            else {
                zj.TipManager.ShowBattleError(response.header.result, this, this.quit);
            }
        };
        Fight_ActivityBoss.prototype.bossEntry = function () {
            var req = new message.DarklandBossEnterRequest();
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, this.BossEntryReqBody_Visit, null, this, false);
        };
        Fight_ActivityBoss.prototype.BossEntryReqBody_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            if (response.header.result == message.EC.SUCCESS) {
                zj.PlayerWonderLandSystem.MapHeight = 960;
                response.body.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
                zj.Game.PlayerBossSystem.ActivityBoss.roleInfo = response.body.roleInfo;
                zj.Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
                zj.Game.PlayerBossSystem.ActivityBoss.inZorkBoss = true;
                zj.Game.PlayerWonderLandSystem.darkland.cityId = response.body.cityId;
                zj.Game.PlayerWonderLandSystem.darkland.cityServerInfo = response.body.group_name;
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneActivityBoss);
            }
            else {
                zj.TipManager.ShowBattleError(response.header.result, this, this.QuitBossFight);
            }
        };
        Fight_ActivityBoss.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_ActivityBoss.prototype.QuitBossFight = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            egret.clearInterval(this.update);
            egret.clearInterval(this._timmers);
            // egret.clearInterval(this.time_id);
            this.update = -1;
            // this.time_id = -1;
            this._timmers = -1;
            zj.loadUI(zj.Activity_BossMainPop).then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        Fight_ActivityBoss.prototype.OnExit = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            egret.clearInterval(this.update);
            egret.clearInterval(this._timmers);
            // egret.clearInterval(this.time_id);
            this.update = -1;
            // this.time_id = -1;
            this._timmers = -1;
            this.scene = null;
        };
        return Fight_ActivityBoss;
    }(zj.UI));
    zj.Fight_ActivityBoss = Fight_ActivityBoss;
    __reflect(Fight_ActivityBoss.prototype, "zj.Fight_ActivityBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_ActivityBoss.js.map