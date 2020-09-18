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
    var Fight_Relic = (function (_super) {
        __extends(Fight_Relic, _super);
        function Fight_Relic() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            //public barSizeW;
            //public barSizeH;
            _this.serverRelicInfo = null;
            _this.skinName = "resource/skins/fight/Fight_RelicSkin.exml";
            return _this;
        }
        Fight_Relic.prototype.Init = function () {
            this.LabelStage.visible = false;
            this.SpriteLevel.visible = false;
            this.update = egret.setInterval(this.Update, this, 0);
            this.instanceTbl = zj.TableInstanceRelic.Item(zj.Game.PlayerMissionSystem.fightExt + 1);
            this.curLevel = null;
            this.curDemage = null;
            this.nextDemage = null;
            this.barPer = -1;
            //this.barSizeW = this.SpriteBlood.width;
            //this.barSizeH = this.SpriteBlood.height;
            function f(_k, _v) {
                return _v.id == zj.Game.PlayerMissionSystem.fightExt;
            }
            for (var i = 0; i < zj.Game.PlayerInstanceSystem.RelicInfo.length; i++) {
                if (f(i, zj.Game.PlayerInstanceSystem.RelicInfo[i])) {
                    this.serverRelicInfo = [zj.Game.PlayerInstanceSystem.RelicInfo[i], i];
                }
            }
            this.serverRelicInfo = zj.Table.FindR(zj.Game.PlayerInstanceSystem.InstanceInfo.relicInfo, function (_k, _v) {
                return _v.id == zj.Game.PlayerMissionSystem.fightExt;
            });
            if (this.serverRelicInfo == null) {
                this.serverRelicInfo = new message.InstanceRelic();
                this.serverRelicInfo.def = null;
                this.serverRelicInfo.id = zj.Game.PlayerMissionSystem.fightExt;
            }
            this._exp_sizeW = this.SpriteExpBar.width;
            this._exp_sizeH = this.SpriteExpBar.height;
            this.SetInfoHurt();
            this.FreshMainChest(1);
            this.CloseWeek();
        };
        Fight_Relic.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.SetInfoHurt();
            this.SetTimerProgress();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.NetData();
                this.stopChannelTag = true;
            }
        };
        Fight_Relic.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Relic.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Relic.prototype.IsEndBattleEnd = function () {
            if (this.time_id == -1) {
                return true;
            }
            return false;
        };
        Fight_Relic.prototype.NetData = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
        };
        Fight_Relic.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Relic.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Relic.prototype.RelicChallengeReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.ChallengeRelicResultRequest();
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.mobsId = scene.instanceId;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getWeekBossHurt(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ChallengeRelicResult_Visit, null, this, false);
        };
        Fight_Relic.prototype.ChallengeRelicResult_Visit = function (req, resp) {
            var _this = this;
            if (this.IsEndBattleEnd()) {
                return;
            }
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            zj.loadUI(zj.Relic_BigEnd)
                .then(function (dialog) {
                dialog.show();
                dialog.Init();
                dialog.SetInfo(_this.battleStar, _this.battleHurt);
            });
            this.EndBattleNet();
        };
        Fight_Relic.prototype.SetStageEnd = function () {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var chestCB = function () {
                _this.FreshMainChest();
            };
            var step = scene.getCurrChapSetp();
            var result = scene.getChapResultTbl()[step];
            function tmp1(thisobj) {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                if ((step == thisobj.instanceTbl.max_step) || (result != message.BattleResultState.BATTLE_RESULT_STATE_WIN)) {
                    thisobj.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
                    thisobj.battleQuality = message.EQuality.QUALITY_F;
                    thisobj.battleStar = step;
                    if (result != message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        thisobj.battleStar = thisobj.battleStar - 1;
                    }
                    thisobj.battleHurt = scene.getWeekBossHurt();
                    thisobj.RelicChallengeReq();
                }
                else {
                    scene.openNextChap();
                }
            }
            function tmp2(thisobj) {
                zj.loadUI(zj.Relic_SmallEnd)
                    .then(function (dialog) {
                    thisobj.loseSubUi = dialog;
                    dialog.SetInfo(step);
                    dialog.SetCB(chestCB, tmp1, thisobj);
                    dialog.show();
                });
            }
            function tmp3(thisobj) {
                if (step > thisobj.serverRelicInfo.star) {
                    var goods_1 = new message.GoodsInfo();
                    goods_1.goodsId = thisobj.instanceTbl.first_rewards[step][0];
                    goods_1.count = thisobj.instanceTbl.first_rewards[step][1];
                    goods_1.showType = 1;
                    // TipMgr:GetFirstBlood({goods} ,self, tmp2);
                    // loadUI(CommonGetDialog)
                    // 	.then((dialog: CommonGetDialog) => {
                    // 		dialog.init([goods])
                    // 		dialog.setCB(() => {
                    // 			tmp2(thisobj);
                    // 		});
                    // 		dialog.show(UI.SHOW_FROM_TOP);
                    // 	});
                    zj.loadUI(zj.Common_FirstBlood)
                        .then(function (dialog) {
                        dialog.SetInfoGet([goods_1]);
                        dialog.SetCB(function () {
                            tmp2(thisobj);
                        });
                        dialog.show();
                    });
                }
                else {
                    tmp2(thisobj);
                }
            }
            if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                tmp3(this);
            }
            else {
                tmp1(this);
            }
        };
        Fight_Relic.prototype.SetStageBegin = function () {
        };
        Fight_Relic.prototype.FreshMainChest = function (step1) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var step = step1 || (scene.getCurrChapSetp() + 1);
            this.LabelStage.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.relic.step, step);
            if (scene.mainmenu != null) {
                if (scene.mainmenu.roleMsg != null) {
                    scene.mainmenu.roleMsg.SetRelicBox(step);
                }
            }
        };
        Fight_Relic.prototype.SetInfoHurt = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var level1 = 1;
            function getLevelByHurt(damage, thisobj) {
                for (var k in thisobj.instanceTbl.damage_zone) {
                    var v = thisobj.instanceTbl.damage_zone[k];
                    if (damage >= v) {
                        level1 = parseInt(k);
                    }
                }
                return level1;
            }
            var damage = scene.getWeekBossHurt();
            var level = getLevelByHurt(damage, this);
            var maxHurt = this.instanceTbl.damage_zone[this.instanceTbl.damage_zone.length - 1];
            var per = (damage / maxHurt) < 1 && (damage / maxHurt) || 1;
            var rect_exp = zj.getPercentSize({ width: this._exp_sizeW, height: this._exp_sizeH }, per);
            if (this.curLevel != level) {
                this.curLevel = level;
                this.SpriteLevel.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicHurtLevel[this.curLevel], this);
            }
            if (this.curDemage != damage) {
                this.curDemage = damage;
                this.SpriteExpBar.width = rect_exp.width;
                this.SpriteExpBar.height = rect_exp.height;
                if (this.curDemage >= 100000) {
                    this.TextExp.text = (this.curDemage / 10000).toFixed(0) + "万";
                }
                else {
                    this.TextExp.text = (this.curDemage / 10000).toFixed(0);
                }
            }
        };
        Fight_Relic.prototype.quit = function () {
            // Gmgr.Instance.goBattleBefore();
        };
        Fight_Relic.prototype.OpenWeek = function () {
            this.SpriteBlood.visible = false;
            this.SpriteBloodLight.visible = true;
            this.SpriteWeekGray.visible = false;
            this.SpriteWeekLight.visible = true;
            this.SpriteBlood.width = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
            this.SpriteBlood.height = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
            this.SpriteBloodLight.width = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
            this.SpriteBloodLight.height = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
        };
        Fight_Relic.prototype.CloseWeek = function () {
            this.SpriteBlood.visible = true;
            this.SpriteBloodLight.visible = false;
            this.SpriteWeekGray.visible = true;
            this.SpriteWeekLight.visible = false;
            this.SpriteBlood.width = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
            this.SpriteBlood.height = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
            this.SpriteBloodLight.width = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
            this.SpriteBloodLight.height = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
        };
        Fight_Relic.prototype.SetTimerProgress = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (scene.bossInstance != null) {
                var per = scene.bossInstance.getWeekProgressPer();
                if (Math.floor(this.barPer * 100) != Math.floor(per * 100)) {
                    this.barPer = per;
                    var size_bar = zj.getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, this.barPer);
                    if (scene.isWeekSteping) {
                        this.SpriteBloodLight.width = zj.getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).width;
                        this.SpriteBloodLight.height = zj.getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).height;
                    }
                    else {
                        this.SpriteBlood.width = zj.getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).width;
                        this.SpriteBlood.height = zj.getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).height;
                    }
                }
            }
        };
        Fight_Relic.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Relic;
    }(zj.UI));
    zj.Fight_Relic = Fight_Relic;
    __reflect(Fight_Relic.prototype, "zj.Fight_Relic");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Relic.js.map