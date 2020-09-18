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
     * @author xing li wei
     *
     * @date 2019-4-5
     *
     * @class 冒险副本 流星街 执照 天空竞技场 失败结算
     */
    var BattleEnd_Lose = (function (_super) {
        __extends(BattleEnd_Lose, _super);
        function BattleEnd_Lose() {
            var _this = _super.call(this) || this;
            _this.ui_name = "BattleEnd_Lose";
            _this.skinName = "resource/skins/battleEnd/BattleEndLoseSkin.exml";
            return _this;
        }
        BattleEnd_Lose.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGoOn, this);
            this.ButtonNextMob.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonNextMob_CallBack, this);
        };
        BattleEnd_Lose.prototype.Load = function () {
            _super.prototype.Load.call(this);
            //再战的怪信息
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                this.nextMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                this.nextMobID = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // this.nextMobID = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                this.nextMobID = zj.Game.PlayerWantedSystem.wantedCurPos;
            }
        };
        BattleEnd_Lose.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        //失败返回到到xx界面
        BattleEnd_Lose.prototype.clickGoOn = function () {
            var _this = this;
            this.close();
            egret.clearInterval(this.update);
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                _this.onJump();
            });
        };
        BattleEnd_Lose.prototype.onJump = function () {
            // StageSceneManager.Instance.clearScene();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
                zj.loadUI(zj.LeagueBossInfo)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.onGroupInstance();
                });
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                this.BossEntryReq();
            }
            else {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Gmgr.Instance.bContinueBattle = false;
                zj.Gmgr.Instance.bStopContinueFromBattle = false;
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    var bMaxChapter = !zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType - 1].bReview;
                    if (zj.Game.PlayerFormationSystem.saveFrom) {
                        zj.Game.PlayerFormationSystem.saveFrom = [];
                    }
                    else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                        zj.loadUI(zj.LeagueInstanceMain)
                            .then(function (scene) {
                            scene.init();
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                    else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                        zj.loadUI(zj.LeagueInstanceMain)
                            .then(function (scene) {
                            scene.init();
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                    zj.loadUI(zj.SkyAreanMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.Init();
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                    zj.loadUI(zj.SkyAreanMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.Init();
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                    zj.loadUI(zj.licenseMain)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                    zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                        zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                            dialog.setInfo(data, function () {
                            });
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT) {
                    zj.Game.PlayerArenaSystem.craftQureyList(false)
                        .then(function () {
                        zj.loadUI(zj.ArenaWhole).then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    zj.loadUI(zj.HXH_GroupFightMain)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                    zj.Game.PlayerArenaSystem.craftQureyList(false)
                        .then(function () {
                        zj.loadUI(zj.ArenaWhole).then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                    //有问题
                    // loadUI(ArenaWhole)
                    // 	.then((scene: ArenaWhole) => {
                    // 		scene.show(UI.SHOW_FROM_TOP);
                    // 	});
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                    zj.loadUI(zj.LeagueHomeScene)
                        .then(function (scene) {
                        scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                    // loadUI(LeagueHomeScene)
                    // 	.then((scene: Basti) => {
                    // 		scene.init();
                    // 		scene.show(UI.SHOW_FROM_TOP);
                    // 	});
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT) {
                }
            }
        };
        BattleEnd_Lose.prototype.clickNext = function () {
            if (zj.Gmgr.Instance.bContinueBattle) {
                zj.Gmgr.Instance.bContinueBattle = false;
            }
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                if (zj.Game.PlayerInstanceSystem.CheckCount(this.nextMobID) == false) {
                    this.BuyMobsTime();
                }
                else if (zj.Game.PlayerInstanceSystem.CheckPower(this.nextMobID, null) == false) {
                    zj.loadUI(zj.HXH_HunterUserStrength)
                        .then(function (dialog) {
                        dialog.SetInfo();
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    return;
                }
                else {
                    var stages = zj.TableInstance.Item(this.nextMobID).instance_pack;
                    if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                        this.BattleStart_Req();
                    }
                    else {
                        this.MobsInfo_Req();
                    }
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                var stages = zj.TableTower.Item(this.nextMobID).tower_pack;
                if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                    this.BattleStart_Req();
                }
                else {
                    this.MobsInfo_Req();
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                var stages = zj.TableTower.Item(this.nextMobID).tower_pack;
                if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                    this.BattleStart_Req();
                }
                else {
                    this.MobsInfo_Req();
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                //通缉令类型返回界面
                var cost = [
                    zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin,
                    zj.Game.PlayerInfoSystem.BaseInfo.arrestCoin
                ];
                var floor_info = zj.TableWanted.Item(this.nextMobID);
                if (zj.Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume) {
                    zj.loadUI(zj.HXH_HunterUserStrength)
                        .then(function (dialog) {
                        dialog.SetInfo();
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if ((zj.Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_EASY || zj.Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_HARD) && (cost[zj.Game.PlayerMissionSystem.fightExt] < 0)) {
                    zj.toast_warning(zj.TextsConfig.TextConfig_Instance.errorCountWanted);
                }
                else {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED;
                    this.ReqGetWantedMobsInfo();
                }
            }
            this.close();
        };
        //购买副本挑战次数
        BattleEnd_Lose.prototype.BuyMobsTime = function () {
        };
        //拉取副本怪信息
        BattleEnd_Lose.prototype.MobsInfo_Req = function () {
            var _this = this;
            var request = new message.MobsInfoRequest();
            request.body.battleType = zj.Game.PlayerInstanceSystem.curInstanceType;
            request.body.mobsId = this.nextMobID;
            zj.Game.Controller.send(request, function (request, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.MobsInfo_Visit();
                return;
            }, function (req) {
                //reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Lose.prototype.MobsInfo_Visit = function () {
            this.BattleStart_Req();
        };
        //发起战斗
        BattleEnd_Lose.prototype.BattleStart_Req = function () {
            var _this = this;
            var req = new message.BattleStartRequest();
            req.body.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                req.body.id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                req.body.id = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // req.body.id = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                //req.body.id = Player.licenseCurPos;
            }
            req.body.ext = 0;
            zj.Game.Controller.send(req, function (request, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.BattleStart_Visit();
                return;
            }, function (req) {
                //reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Lose.prototype.BattleStart_Visit = function () {
            zj.Game.PlayerFormationSystem.saveFormations();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightNormal);
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER
                || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightTower);
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                // StageSceneManager.Instance.ChangeScene(StageSceneFightLicense);
            }
        };
        //拉怪
        BattleEnd_Lose.prototype.ReqGetWantedMobsInfo = function () {
            var _this = this;
            var req = new message.MobsInfoRequest();
            req.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED;
            req.body.mobsId = this.nextMobID;
            zj.Game.Controller.send(req, function (request, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.ReqGetWantedMobsInfo_Visit();
                return;
            }, function (req) {
                //reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Lose.prototype.ReqGetWantedMobsInfo_Visit = function () {
            // Player.wantedCurPos = self.nextMobID;
            this.BattleStartWanted_Req();
        };
        //通缉令战斗
        BattleEnd_Lose.prototype.BattleStartWanted_Req = function () {
            var _this = this;
            var req = new message.BattleStartRequest();
            req.body.type = message.EFormationType.FORMATION_TYPE_WANTED;
            req.body.id = this.nextMobID;
            req.body.ext = 0;
            zj.Game.Controller.send(req, function (request, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.BattleStartWanted_Visit(response);
                return;
            }, function (req) {
                //reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Lose.prototype.BattleStartWanted_Visit = function (response) {
            if (response.header.result == message.EC.SUCCESS) {
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightWanted);
                // gmsound.Ui_GOTO_FIGHT()
            }
            else {
                // GameCommon: ShowMessage(getErrorString(result))
            }
        };
        return BattleEnd_Lose;
    }(zj.BattleSettleLose));
    zj.BattleEnd_Lose = BattleEnd_Lose;
    __reflect(BattleEnd_Lose.prototype, "zj.BattleEnd_Lose");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_Lose.js.map