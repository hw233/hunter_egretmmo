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
    var Fight_ThreeBattle = (function (_super) {
        __extends(Fight_ThreeBattle, _super);
        function Fight_ThreeBattle() {
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
        Fight_ThreeBattle.prototype.Init = function () {
            this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
            this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
            this.tblStates = [];
            for (var i = 0; i < this.tblFlags.length; i++) {
                this.tblFlags[i].visible = false;
            }
            this.update = egret.setInterval(this.Update, this, 0);
            this.FreshFlag();
        };
        Fight_ThreeBattle.prototype.FreshFlag = function () {
            for (var i = 1; i <= this.tblWords.length; i++) {
                var info = zj.Game.PlayerBattleSystem.battleSingleInfo[i];
                if (info != null) {
                    this.tblWords[i - 1].visible = true;
                    if (info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        this.tblWords[i - 1].source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.win, this);
                    }
                    else {
                        this.tblWords[i - 1].source = zj.cachekey(zj.UIConfig.UIConfig_BattleStarcraft.word.fail, this);
                    }
                }
                else {
                    this.tblWords[i - 1].visible = false;
                }
            }
        };
        Fight_ThreeBattle.prototype.Update = function (dt) {
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
        Fight_ThreeBattle.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_ThreeBattle.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_ThreeBattle.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.CacheChallengeSingleBattle();
                this.CacheStarcraftInfo(this.battleResult, zj.Game.PlayerBattleSystem.battleDetailFormation);
                this.FreshFlag();
                this.DealAnimation(200304);
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.CacheChallengeSingleBattle();
                this.CacheStarcraftInfo(this.battleResult, zj.Game.PlayerBattleSystem.battleDetailFormation);
                this.FreshFlag();
                this.DealAnimation(200303);
            }
        };
        Fight_ThreeBattle.prototype.DealAnimation = function (id) {
            var _this = this;
            function animationEvent() {
                if (this.checkGoonOrEnd()) {
                    this.ChallengeThreePkReq();
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
        Fight_ThreeBattle.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_ThreeBattle.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_ThreeBattle.prototype.CacheChallengeSingleBattle = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            zj.Game.PlayerBattleSystem.multiReplayInfo[zj.Gmgr.Instance.starcraftIndex - 1] = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
        };
        Fight_ThreeBattle.prototype.CreateMultiResultInfo = function (index) {
            index = index - 1;
            var msg = new message.MultiResultInfo();
            for (var i = 0; i < zj.Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
                msg.results.push(zj.Game.PlayerBattleSystem.multiReplayInfo[i]);
            }
            for (var i = index; i < 3; i++) {
                var formation = new message.SimpleFormationInfo();
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[i].generals) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[i].generals[k];
                    if (v != 0) {
                        formation.generals.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                }
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[i].supports) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[i].supports[k];
                    if (v != 0) {
                        formation.supports.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                }
                msg.leftFormation.push(formation);
            }
            for (var i = index; i < 3; i++) {
                var formation = new message.SimpleFormationInfo();
                for (var k in zj.Game.PlayerFormationSystem.threeBattleInfo[i].generals) {
                    var v = zj.Game.PlayerFormationSystem.threeBattleInfo[i].generals[k];
                    if (v != 0) {
                        formation.generals.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(v));
                    }
                }
                for (var k in zj.Game.PlayerFormationSystem.threeBattleInfo[i].supports) {
                    var v = zj.Game.PlayerFormationSystem.threeBattleInfo[i].supports[k];
                    if (v != 0) {
                        formation.supports.push(zj.Helper.DetailGeneralTranToGelSimpleInfo(v));
                    }
                }
                msg.rightFormation.push(formation);
            }
            return msg;
        };
        Fight_ThreeBattle.prototype.CreatePvpResultInfo = function () {
            var msg = new message.MoreSimpleFormationInfo();
            for (var i = 0; i < zj.Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
                msg.battle_result.push(zj.Game.PlayerBattleSystem.multiReplayInfo[i].battleResult);
            }
            for (var i = 0; i < 3; i++) {
                var formation = new message.SimpleFormationInfo();
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[i].generals) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[i].generals[k];
                    if (v != 0) {
                        formation.generals.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                    else {
                        formation.generals.push(new message.GeneralSimpleInfo());
                    }
                }
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[i].supports) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[i].supports[k];
                    if (v != 0) {
                        formation.supports.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                    else {
                        formation.supports.push(new message.GeneralSimpleInfo());
                    }
                }
                msg.simpleFormation.push(formation);
            }
            return msg;
        };
        Fight_ThreeBattle.prototype.createBattleResult = function () {
            var winSum = 0;
            for (var k in zj.Game.PlayerBattleSystem.battleSingleInfo) {
                var v = zj.Game.PlayerBattleSystem.battleSingleInfo[k];
                if (v.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                    winSum = winSum + 1;
                }
            }
            if (winSum >= 2) {
                return message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            }
            else {
                return message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            }
        };
        Fight_ThreeBattle.prototype.ChallengeThreePkReq = function () {
            var result = this.createBattleResult();
            this.endResult = result;
            var req = new message.PVPBattleResultRequest();
            // req.body.sequence = Game.PlayerBattleSystem.battleSequence;
            req.body.roleId = zj.Gmgr.Instance.pkRoleId;
            req.body.group_id = zj.Gmgr.Instance.pkRoleGroupId;
            req.body.result = result;
            req.body.battle_type = zj.Gmgr.Instance.pkBattleType;
            var index = zj.Gmgr.Instance.starcraftIndex;
            if (zj.Gmgr.Instance.starcraftIndex < 3) {
                zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
                this.CacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO, zj.Game.PlayerFormationSystem.threeBattleInfo[2]);
            }
            req.body.battle_date = zj.Helper.createPvpBattleResultInfo(this.CreatePvpResultInfo());
            zj.Game.PlayerBattleSystem.cacheBattleResult = zj.Helper.createMutiBattleResultInfo(zj.Gmgr.Instance.fightType, result, message.EBattleStar.BATTLE_STAR_NONO, 0, 0, 0, this.CreateMultiResultInfo(zj.Gmgr.Instance.starcraftIndex));
            zj.Game.Controller.send(req, this.ChallengeThreePk_Visit, null, this, false);
        };
        Fight_ThreeBattle.prototype.checkGoonOrEnd = function () {
            var bEnd = false;
            if ((zj.Gmgr.Instance.starcraftIndex == 2
                && this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN
                && zj.Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) || (zj.Gmgr.Instance.starcraftIndex == 2
                && this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL
                && zj.Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL)) {
                bEnd = true;
            }
            else if (zj.Gmgr.Instance.starcraftIndex == 3) {
                bEnd = true;
            }
            else {
                bEnd = false;
            }
            return bEnd;
        };
        Fight_ThreeBattle.prototype.goOn = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
            zj.Game.PlayerBattleSystem.battleDetailFormation = zj.Game.PlayerFormationSystem.threeBattleInfo[zj.Gmgr.Instance.starcraftIndex - 1];
            this.CacheSkillSpineId();
            scene.nextStarcraft();
        };
        Fight_ThreeBattle.prototype.ChallengeThreePk_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            //Game.PlayerBattleSystem.battleReportId =response.body.battle_id;
            scene.endFightUi();
            // let info = {}
            zj.Game.PlayerBattleSystem.singleEnemyInfo.score = 0;
            zj.Game.PlayerBattleSystem.singleEnemyInfo.rank = 0;
            if (this.endResult == 1) {
                zj.loadUI(zj.BattleEnd_WinStarcraftB)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.Load();
                });
            }
            else if (this.endResult == 2) {
                zj.loadUI(zj.BattleEnd_LoseStarcraftB)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                });
            }
        };
        Fight_ThreeBattle.prototype.CacheStarcraftInfo = function (battleResult, rightFormation) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var info = {};
            var _a = scene.getCurFormationGels(), _generals = _a[0], _reserves = _a[1], _supports = _a[2];
            var leftArmy = {};
            var _tblGel = [];
            for (var i = 0; i < _generals.length; i++) {
                var general = new message.GeneralInfo();
                if (_generals[i] != 0) {
                    general = zj.Game.PlayerHunterSystem.allHuntersMap()[_generals[i]];
                }
                _tblGel.push(general);
            }
            var _tblSup = [];
            for (var i = 0; i < _supports.length; i++) {
                var general = new message.GeneralInfo();
                if (_supports[i] != 0) {
                    general = zj.Game.PlayerHunterSystem.allHuntersMap()[_supports[i]];
                }
                _tblGel.push(general);
            }
            leftArmy["generals"] = _tblGel;
            leftArmy["supports"] = _tblSup;
            var rightArmy = {};
            rightArmy["generals"] = rightFormation.generals;
            rightArmy["supports"] = rightFormation.supports;
            info["leftInfo"] = leftArmy;
            info["rightInfo"] = rightArmy;
            info["index"] = zj.Gmgr.Instance.starcraftIndex;
            info["battleResult"] = battleResult;
            zj.Game.PlayerBattleSystem.battleSingleInfo[info["index"]] = info;
        };
        Fight_ThreeBattle.prototype.CacheSkillSpineId = function () {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            var suffixs = ["generals", "reserves", "supports"];
            for (var i = 0; i < suffixs.length; i++) {
                var ids = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1][suffixs[i]];
                for (var j = 0; j < ids; j++) {
                    if (ids[j] > 0) {
                        var gelInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[ids[j]];
                        for (var x = 0; x < gelInfo.skills.length; x++) {
                            zj.Gmgr.Instance.relatedAsynDataId.push(gelInfo.skills[x].skillId);
                        }
                    }
                }
            }
            var generals = zj.Game.PlayerBattleSystem.battleDetailFormation.generals;
            var supports = zj.Game.PlayerBattleSystem.battleDetailFormation.supports;
            var enemys = [];
            for (var i = 0; i < generals.length; i++) {
                enemys.push(generals[i]);
            }
            for (var i = 0; i < generals.length; i++) {
                enemys.push(generals[i]);
            }
            for (var k = 0; k < enemys.length; k++) {
                var v = enemys[k];
                if (v.general_id != 0) {
                    for (var k1 = 0; k1 < v.skills.length; k1++) {
                        var v1 = v.skills[k1];
                        zj.Gmgr.Instance.relatedAsynDataId.push(v1.skillId);
                    }
                }
            }
        };
        Fight_ThreeBattle.prototype.quit = function () {
            //Gmgr:goBattleBefore();
        };
        Fight_ThreeBattle.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
            if (this.disPlay) {
                zj.clearSpine(this.disPlay);
                this.disPlay = null;
            }
        };
        return Fight_ThreeBattle;
    }(zj.UI));
    zj.Fight_ThreeBattle = Fight_ThreeBattle;
    __reflect(Fight_ThreeBattle.prototype, "zj.Fight_ThreeBattle");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_ThreeBattle.js.map