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
    var Fight_SingleBattle = (function (_super) {
        __extends(Fight_SingleBattle, _super);
        function Fight_SingleBattle() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_SingleBattle.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_SingleBattle.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_SingleBattle.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_SingleBattle.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_SingleBattle.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.ChallengePkReq();
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.ChallengePkReq();
            }
        };
        Fight_SingleBattle.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_SingleBattle.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_SingleBattle.prototype.ChallengePkReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.PVPBattleResultRequest();
            // req.body.sequence = Game.PlayerBattleSystem.battleSequence;
            req.body.roleId = zj.Gmgr.Instance.pkRoleId;
            req.body.group_id = zj.Gmgr.Instance.pkRoleGroupId;
            req.body.result = this.battleResult;
            req.body.battle_type = zj.Gmgr.Instance.pkBattleType;
            req.body.battle_date = zj.Helper.createPvpBattleResultInfo(this.CreatePvpResultInfo());
            zj.Game.PlayerBattleSystem.cacheBattleResult = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.Controller.send(req, this.ChallengePk_Visit, null, this, false);
        };
        Fight_SingleBattle.prototype.ChallengePk_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = 0; //response.body.battle_id;
            if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_LoseArenaServer)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                });
            }
            else {
                zj.loadUI(zj.BattleEnd_WinArenaServer)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.Load();
                });
            }
        };
        Fight_SingleBattle.prototype.CreatePvpResultInfo = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var msg = new message.MoreSimpleFormationInfo();
            msg.battle_result.push(this.battleResult);
            var _a = scene.getCurFormationGels(), generals = _a[0], reserves = _a[1], supports = _a[2];
            var formation = new message.SimpleFormationInfo();
            for (var k in generals) {
                var v = generals[k];
                if (v != 0) {
                    formation.generals.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                }
                else {
                    formation.generals.push(new message.GeneralSimpleInfo());
                }
            }
            for (var k in supports) {
                var v = supports[k];
                if (v != 0) {
                    formation.supports.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                }
                else {
                    formation.supports.push(new message.GeneralSimpleInfo());
                }
            }
            msg.simpleFormation.push(formation);
            return msg;
        };
        Fight_SingleBattle.prototype.quit = function () {
            //Gmgr:goBattleBefore()
        };
        Fight_SingleBattle.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
            this.scene = null;
        };
        return Fight_SingleBattle;
    }(zj.UI));
    zj.Fight_SingleBattle = Fight_SingleBattle;
    __reflect(Fight_SingleBattle.prototype, "zj.Fight_SingleBattle");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_SingleBattle.js.map