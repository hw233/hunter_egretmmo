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
    var Fight_GroupFight = (function (_super) {
        __extends(Fight_GroupFight, _super);
        function Fight_GroupFight() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.endResult = -1;
            _this.getMoney = 0;
            _this.getArena = 0;
            _this.tblFlags = [];
            _this.tblWords = [];
            _this.tblStates = [];
            _this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
            return _this;
        }
        Fight_GroupFight.prototype.Init = function () {
            this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
            this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
            this.tblStates = [];
            for (var i = 0; i < this.tblWords.length; i++) {
                this.tblWords[i].visible = false;
            }
            for (var i = 0; i < this.tblFlags.length; i++) {
                var image = new eui.Image();
                this.tblFlags[i].addChild(image);
                this.tblFlags[i] = image;
            }
            this.update = egret.setInterval(this.Update, this, 0);
            this.FreshFlag();
        };
        Fight_GroupFight.prototype.FreshFlag = function () {
            for (var i = 1; i <= this.tblFlags.length; i++) {
                var info = zj.Game.PlayerBattleSystem.battleSingleInfo[i];
                if (info != null) {
                    this.tblFlags[i - 1].visible = true;
                    if (info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        this.tblFlags[i - 1].source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win2[0], this);
                    }
                    else {
                        this.tblFlags[i - 1].source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win2[1], this);
                    }
                }
                else {
                    this.tblFlags[i - 1].visible = false;
                }
            }
        };
        Fight_GroupFight.prototype.Update = function (dt) {
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
        Fight_GroupFight.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_GroupFight.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_GroupFight.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.CacheChallengeSingleBattle();
                this.CacheStarcraftInfo(this.battleResult);
                this.FreshFlag();
                this.DealAnimation(200304);
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.CacheChallengeSingleBattle();
                this.CacheStarcraftInfo(this.battleResult);
                this.FreshFlag();
                this.DealAnimation(200303);
            }
        };
        Fight_GroupFight.prototype.DealAnimation = function (id) {
            var _this = this;
            function animationEvent() {
                if (this.checkGoonOrEnd()) {
                    this.ChallengeGroupReq();
                }
                else {
                    this.goOn();
                }
            }
            var item = zj.TableClientAniUi.Item(id);
            var tableAni = zj.TableClientAniCssSource.Item(item.css_id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, tableAni.name)
                .then(function (display) {
                _this.disPlay = display;
                display.x = _this.width / 2;
                display.y = _this.height / 2;
                zj.setDragonBonesRemove(display);
                _this.addChild(display);
                display.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, animationEvent, _this);
                var names = display.animation.animationNames;
                for (var i = 0; i < names.length; i++) {
                    if (item.index == i) {
                        display.animation.play(names[i]);
                        break;
                    }
                }
            });
        };
        Fight_GroupFight.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_GroupFight.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_GroupFight.prototype.CacheChallengeSingleBattle = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            zj.Game.PlayerBattleSystem.multiReplayNozipInfo[zj.Gmgr.Instance.starcraftIndex - 1] = scene.replayBattleInfo;
            zj.Game.PlayerBattleSystem.multiReplayInfo[zj.Gmgr.Instance.starcraftIndex - 1] = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
        };
        Fight_GroupFight.prototype.CreateMultiResultInfo = function () {
            var msg = new message.MultiResultInfo();
            for (var i = 0; i < zj.Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
                msg.results.push(zj.Game.PlayerBattleSystem.multiReplayInfo[i]);
            }
            for (var i = 0; i < zj.Game.PlayerBattleSystem.multiReplayNozipInfo.length; i++) {
                var leftFormation = new message.SimpleFormationInfo();
                for (var j = 0; j < zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals.length; j++) {
                    var type = zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].type;
                    if (type == 1) {
                        leftFormation.generals.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].generalInfo));
                    }
                    else if (type == 3) {
                        leftFormation.supports.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].generalInfo));
                    }
                }
                msg.leftFormation.push(leftFormation);
                var rightFormation = new message.SimpleFormationInfo();
                for (var j = 0; j < zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals.length; j++) {
                    var type = zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].type;
                    if (type == 1) {
                        rightFormation.generals.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].generalInfo));
                    }
                    else if (type == 3) {
                        rightFormation.supports.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(zj.Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].generalInfo));
                    }
                }
                msg.rightFormation.push(rightFormation);
            }
            return msg;
        };
        Fight_GroupFight.prototype.createBattleResult = function () {
            var winSum = 0;
            for (var k in zj.Game.PlayerBattleSystem.battleSingleInfo) {
                var v = zj.Game.PlayerBattleSystem.battleSingleInfo[k];
                if (v.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                    winSum = winSum + 1;
                }
            }
            if (winSum >= 2) {
                return [message.BattleResultState.BATTLE_RESULT_STATE_WIN, winSum == 3 && 3 || 2];
            }
            else {
                return [message.BattleResultState.BATTLE_RESULT_STATE_FAIL, 0];
            }
        };
        Fight_GroupFight.prototype.checkGoonOrEnd = function () {
            var bEnd = false;
            if (zj.Gmgr.Instance.starcraftIndex == 3) {
                bEnd = true;
            }
            else if (zj.Gmgr.Instance.starcraftIndex == 2 && zj.Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL &&
                zj.Game.PlayerBattleSystem.battleSingleInfo[2].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                bEnd = true;
            }
            else {
                bEnd = false;
            }
            return bEnd;
        };
        Fight_GroupFight.prototype.goOn = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
            this.CacheGroupSkillSpineId();
            scene.nextGroupFight();
        };
        Fight_GroupFight.prototype.ChallengeGroupReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var _a = this.createBattleResult(), result = _a[0], star = _a[1];
            this.endResult = result;
            var req = new message.GroupBattleResultRequest();
            req.body.Id = zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            if (zj.Gmgr.Instance.starcraftIndex < 3) {
                zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
                this.CacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO);
            }
            req.body.battleInfo = zj.Helper.createMutiBattleResultInfo(zj.Gmgr.Instance.fightType, result, star, 0, zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id != null && zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id || 0, zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id != null && scene.friendIndex || 0, this.CreateMultiResultInfo());
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ChallengeGroup_Visit, null, this, false);
        };
        Fight_GroupFight.prototype.rewardCB = function () {
            var _this = this;
            zj.loadUI(zj.BattleEnd_WinGroupFight)
                .then(function (dialog) {
                _this.winSubUi = dialog;
                _this.winSubUi.show();
                _this.winSubUi.Init();
                _this.winSubUi.Load();
            });
        };
        Fight_GroupFight.prototype.ChallengeGroup_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            scene.getItemInfo.items = zj.Helper.hideSpecialGoods(response.body.gameInfo.getGoods);
            if (this.endResult == 1) {
                scene.mainmenu.CommonSettleWin(response, this.rewardCB, this);
            }
            else if (this.endResult == 2) {
                zj.loadUI(zj.BattleEnd_LoseGroupFight)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                });
            }
            scene.endFightUi();
        };
        Fight_GroupFight.prototype.CacheStarcraftInfo = function (battleResult) {
            var info = {};
            info["index"] = zj.Gmgr.Instance.starcraftIndex;
            info["battleResult"] = battleResult;
            zj.Game.PlayerBattleSystem.battleSingleInfo[info["index"]] = info;
        };
        Fight_GroupFight.prototype.quit = function () {
            //Gmgr:goBattleBefore();
        };
        Fight_GroupFight.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
            if (this.disPlay) {
                zj.clearSpine(this.disPlay);
                this.disPlay = null;
            }
        };
        Fight_GroupFight.prototype.CacheGroupSkillSpineId = function () {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            var detailFormation = zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[zj.Gmgr.Instance.starcraftIndex - 1];
            for (var i = 0; i < detailFormation.generals.length; i++) {
                var generalInfo = detailFormation.generals[i];
                if (generalInfo.general_id != 0) {
                    for (var x = 0; x < generalInfo.skills.length; x++) {
                        zj.Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
                    }
                }
            }
            for (var i = 0; i < detailFormation.supports.length; i++) {
                var generalInfo = detailFormation.supports[i];
                if (generalInfo.general_id != 0) {
                    for (var x = 0; x < generalInfo.skills.length; x++) {
                        zj.Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
                    }
                }
            }
            var retTbl = zj.TableInstanceGroup.Item(zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId);
            var stageId = retTbl.monster_stages[zj.Gmgr.Instance.starcraftIndex - 1];
            var enemys = zj.getEnemyFomation({ stageId: stageId });
            for (var k in enemys) {
                var v = enemys[k];
                var info = zj.Game.PlayerMobSystem.Instance(v.id);
                zj.Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
            }
        };
        return Fight_GroupFight;
    }(zj.UI));
    zj.Fight_GroupFight = Fight_GroupFight;
    __reflect(Fight_GroupFight.prototype, "zj.Fight_GroupFight");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_GroupFight.js.map