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
    var Fight_InstanceUI = (function (_super) {
        __extends(Fight_InstanceUI, _super);
        function Fight_InstanceUI() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_InstanceUI.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_InstanceUI.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.stopChannelTag = true;
                this.NetData();
                this.OpenBattleNet();
            }
        };
        Fight_InstanceUI.prototype.OpenBattleNet = function () {
            //this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_InstanceUI.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_InstanceUI.prototype.IsEndBattleEnd = function () {
            // if(this.time_id == -1){
            // 	return true;
            // }
            return false;
        };
        Fight_InstanceUI.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            //先判断失败，后判断胜利
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.ChallengeMobReq(false);
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.ChallengeMobReq(false);
            }
        };
        Fight_InstanceUI.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        Fight_InstanceUI.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_InstanceUI.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_InstanceUI.prototype.ChallengeMobReq = function (is_jump) {
            var _this = this;
            this.OnExit();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                var req = new message.ActivityRandInstanceResultRequest();
                req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
                req.body.instanceId = scene.instanceId;
                req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
                zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
                // req.body.battle_id = 
                zj.Game.PlayerBattleSystem.sendMobReq1(req)
                    .then(function (value) {
                    _this.ChallengeMob_Visit(value);
                })
                    .catch(function (reason) {
                });
            }
            else {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                var req = new message.ChallengeMobRequest();
                req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
                req.body.mobsId = scene.instanceId;
                req.body.is_jump = is_jump;
                req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
                req.body.formation = [zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]];
                zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
                zj.Game.PlayerBattleSystem.sendMobReq(req)
                    .then(function (value) {
                    _this.ChallengeMob_Visit(value);
                })
                    .catch(function (reason) {
                });
            }
        };
        Fight_InstanceUI.prototype.ChallengeMob_Visit = function (msg) {
            var _this = this;
            if (this.IsEndBattleEnd()) {
                return;
            }
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            zj.Game.PlayerBattleSystem.battleReportId = msg.body.battle_id;
            if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                scene.getItemInfo.exp = 0;
                scene.getItemInfo.coin = 0;
                scene.getItemInfo.items = zj.Helper.hideSpecialGoods(msg.body.gameInfo.getGoods);
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_Lose)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.SetFather(_this);
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                });
            }
            else {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                }
                else {
                    var tableInstance = zj.TableInstance.Table();
                    var startExp = tableInstance[scene.instanceId].challenge_start;
                    var winExp = tableInstance[scene.instanceId].challenge_win;
                    var tableLevel = zj.TableLevel.Table();
                }
                scene.mainmenu.CommonSettleWin(msg);
                scene.endFightUi();
            }
        };
        Fight_InstanceUI.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        return Fight_InstanceUI;
    }(zj.UI));
    zj.Fight_InstanceUI = Fight_InstanceUI;
    __reflect(Fight_InstanceUI.prototype, "zj.Fight_InstanceUI");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_InstanceUI.js.map