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
    var Fight_Single = (function (_super) {
        __extends(Fight_Single, _super);
        function Fight_Single() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.getMoney = 0;
            _this.getArena = 0;
            _this.tblFlags = [];
            _this.tblWords = [];
            _this.tblStates = [];
            _this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
            return _this;
        }
        Fight_Single.prototype.Init = function () {
            this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
            this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
            this.tblStates = [];
            for (var i = 0; i < this.tblFlags.length; i++) {
                this.tblFlags[i].visible = false;
            }
            this.update = egret.setInterval(this.Update, this, 0);
            this.FreshFlag();
        };
        Fight_Single.prototype.FreshFlag = function () {
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
        Fight_Single.prototype.Update = function (dt) {
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
        Fight_Single.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Single.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Single.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.cacheStarcraftInfo(this.battleResult, zj.Game.PlayerBattleSystem.battleDetailFormation);
                this.FreshFlag();
                this.DealAnimation(200304);
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.cacheStarcraftInfo(this.battleResult, zj.Game.PlayerBattleSystem.battleDetailFormation);
                this.FreshFlag();
                this.DealAnimation(200303);
            }
        };
        Fight_Single.prototype.DealAnimation = function (id) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            function animationEvent() {
                if (this.playerEffect) {
                    zj.clearSpine(this.playerEffect);
                    this.playerEffect = null;
                }
                this.ChallengeStarcraftReq();
            }
            var item = zj.TableClientAniUi.Item(id);
            var tableAni = zj.TableClientAniCssSource.Item(item.css_id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, tableAni.name)
                .then(function (display) {
                _this.playerEffect = display;
                _this.playerEffect.x = zj.Device.STANDARD_SCREEN_W / 2;
                _this.playerEffect.y = zj.Device.STANDARD_SCREEN_H / 2;
                zj.setDragonBonesRemove(display);
                scene.nodeUpEffect.addChild(_this.playerEffect);
                _this.playerEffect.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, animationEvent, _this);
                var names = _this.playerEffect.animation.animationNames;
                for (var i = 0; i < names.length; i++) {
                    if (item.index == i) {
                        _this.playerEffect.animation.play(names[i]);
                        break;
                    }
                }
            });
        };
        Fight_Single.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Single.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Single.prototype.ChallengeStarcraftReq = function () {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.CraftBattleRequest();
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            if (req.body.battleInfo.battleTime < 150) {
                req.body.battleInfo.battleTime = 150;
            }
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            //第三场没有打那么将第三组攻击阵型传过来
            if (zj.Gmgr.Instance.starcraftIndex == 3
                && this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN
                && zj.Game.PlayerBattleSystem.battleSingleInfo[2].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                var formation = new message.SimpleFormationInfo();
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[2].generals) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[2].generals[k];
                    if (v != 0) {
                        formation.generals.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                }
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleAttack[2].supports) {
                    var v = zj.Game.PlayerFormationSystem.formatsSingleAttack[2].supports[k];
                    if (v != 0) {
                        formation.supports.push(zj.Helper.LocalGeneralIdTranToGelSimpleInfo(v));
                    }
                }
                req.body.leftFormation.push(formation);
            }
            egret.setTimeout(function () { zj.Game.Controller.send(req, _this.ChallengeStarcraft_Visit, null, _this, false); }, this, 1000);
        };
        Fight_Single.prototype.ChallengeStarcraft_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            if (response.body.result == 0) {
                zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
                this.BattleStartReq();
            }
            else {
                if (zj.Gmgr.Instance.starcraftIndex < 3) {
                    for (var i = 0; i < response.body.rightFormation.length; i++) {
                        zj.Gmgr.Instance.starcraftIndex = zj.Gmgr.Instance.starcraftIndex + 1;
                        this.cacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO, response.body.rightFormation[i]);
                    }
                }
                scene.endFightUi();
                var info_1 = {};
                info_1["rank"] = response.body.rank;
                info_1["score"] = response.body.score;
                zj.Game.PlayerBattleSystem.singleEnemyInfo.score = response.body.other_score;
                zj.Game.PlayerBattleSystem.singleEnemyInfo.rank = response.body.other_rank;
                if (response.body.result == 1) {
                    zj.loadUI(zj.BattleEnd_WinStarcraftB)
                        .then(function (dialog) {
                        _this.winSubUi = dialog;
                        _this.winSubUi.show();
                        _this.winSubUi.SetUI(info_1);
                        _this.winSubUi.Init();
                        _this.winSubUi.Load();
                    });
                }
                else if (response.body.result == 2) {
                    zj.loadUI(zj.BattleEnd_LoseStarcraftB)
                        .then(function (dialog) {
                        _this.loseSubUi = dialog;
                        _this.loseSubUi.show();
                        _this.loseSubUi.SetUI(info_1);
                        _this.loseSubUi.Init();
                        _this.loseSubUi.Load();
                    });
                }
            }
        };
        Fight_Single.prototype.cacheStarcraftInfo = function (battleResult, rightFormation) {
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
                _tblSup.push(general);
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
        Fight_Single.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_Single.prototype.BattleStartReq = function () {
            var req = new message.BattleStartRequest();
            req.body.type = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
            req.body.id = zj.Game.PlayerBattleSystem.pvpOppBriefInfo.id;
            req.body.ext = zj.Gmgr.Instance.starcraftIndex;
            zj.Game.Controller.send(req, this.BattleStart_Visit, null, this, false);
        };
        Fight_Single.prototype.BattleStart_Visit = function (req, resp) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            if (response.body.detailFormation.length > 0) {
                var para = {};
                para["index"] = 4;
                var inflate = new Zlib.Inflate(response.body.detailFormation, para);
                var plain = inflate.decompress();
                var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                var detailForma = new message.DetailFormationInfo();
                if (!detailForma.parse_bytes(decoder)) {
                    zj.toast(zj.LANG("游戏数据解析失败"));
                    return;
                }
                zj.Game.PlayerBattleSystem.battleDetailFormation = detailForma;
            }
            this.CacheSkillSpineId();
            scene.nextStarcraft();
        };
        Fight_Single.prototype.CacheSkillSpineId = function () {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            var suffixs = ["generals", "reserves", "supports"];
            for (var i = 0; i < suffixs.length; i++) {
                var ids = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex][suffixs[i]];
                for (var j = 0; j < ids.length; j++) {
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
            enemys.push(generals);
            enemys.push(generals); //supports
            for (var k = 0; k < enemys.length; k++) {
                var v = enemys[k];
                if (v.general_id != 0) {
                    for (var k1 in v.skills) {
                        var v1 = v.skills[k1];
                        zj.Gmgr.Instance.relatedAsynDataId.push(v1.skillId);
                    }
                }
            }
        };
        Fight_Single.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Single;
    }(zj.UI));
    zj.Fight_Single = Fight_Single;
    __reflect(Fight_Single.prototype, "zj.Fight_Single");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Single.js.map