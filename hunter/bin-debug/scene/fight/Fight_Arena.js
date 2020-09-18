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
    var Fight_Arena = (function (_super) {
        __extends(Fight_Arena, _super);
        function Fight_Arena() {
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
        Fight_Arena.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_Arena.prototype.Update = function (dt) {
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
                //this.OpenBattleNet();
            }
        };
        Fight_Arena.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Arena.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Arena.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.ChallengeArenaReq();
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.ChallengeArenaReq();
            }
        };
        Fight_Arena.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Arena.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Arena.prototype.ChallengeArenaReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var request = new message.LadderBattleRequest();
            request.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            request.body.roleId = zj.Gmgr.Instance.arenaRoleId;
            request.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = request.body.battleInfo;
            zj.Game.Controller.send(request, this.ChallengeArena_Visit, null, this, false);
            zj.Game.PlayerArenaSystem.ladderList(true).then(function (data) {
                zj.ArenaMainScene.roleFormationInfo = data;
            });
        };
        Fight_Arena.prototype.ChallengeArena_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var goods = new message.GoodsInfo();
            function tmp() {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init([goods]);
                    dialog.setCB(function () {
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                scene.getItemInfo.arena = zj.Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LADDER);
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
                scene.getItemInfo.coin = zj.Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_MONEY);
                scene.getItemInfo.arena = zj.Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LADDER);
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_WinArenaServer)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.Load();
                    if (zj.Game.PlayerInfoSystem.BaseInfo.ladderMax < zj.Gmgr.Instance.arenaBestRank) {
                        goods.goodsId = message.EResourceType.RESOURCE_TOKEN;
                        goods.count = zj.Game.PlayerInfoSystem.BaseInfo.token - zj.Game.PlayerInfoSystem.baseInfo_pre.token;
                        if (goods.count > 0) {
                            dialog.SetSettleCb(tmp);
                        }
                    }
                });
            }
        };
        Fight_Arena.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_Arena.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Arena;
    }(zj.UI));
    zj.Fight_Arena = Fight_Arena;
    __reflect(Fight_Arena.prototype, "zj.Fight_Arena");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Arena.js.map