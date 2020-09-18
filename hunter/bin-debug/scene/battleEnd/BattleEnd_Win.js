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
         * @class 冒险副本 流星街 执照 天空竞技场 成功结算
         */
    var BattleEnd_Win = (function (_super) {
        __extends(BattleEnd_Win, _super);
        // public update;
        function BattleEnd_Win() {
            var _this = _super.call(this) || this;
            _this.enemys = [];
            _this.ui_name = "BattleEnd_Win";
            _this.skinName = "resource/skins/battleEnd/BattleEndWinSkin.exml";
            _this.bHasStart = false;
            _this.bTenContinue = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickGoOn, _this);
            _this.ButtonNextMob.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonNextMob_CallBack, _this);
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                _this.ButtonNextMob.scaleX = 0;
                _this.ButtonNextMob.touchEnabled = false;
            }
            return _this;
        }
        BattleEnd_Win.prototype.Init = function () {
            _super.prototype.Init.call(this);
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                if (this.scene.bEliteReview) {
                    zj.Set.ButtonBackgroud(this.ButtonNextMob, zj.UIConfig.UIConfig_BattleSettleResult.againButton[0], zj.UIConfig.UIConfig_BattleSettleResult.againButton[1]);
                }
                else {
                }
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                if (zj.Gmgr.Instance.isKeepContinueUI()) {
                    if (zj.Gmgr.Instance.bContinueBattle && zj.Gmgr.Instance.isContinueNumMax()) {
                        this.bTenContinue = true;
                    }
                    if (this.bTenContinue) {
                        zj.Set.ButtonBackgroud(this.ButtonNextMob, zj.UIConfig.UIConfig_BattleSettleResult.againTen[0], zj.UIConfig.UIConfig_BattleSettleResult.againTen[1]);
                    }
                    else {
                        zj.Set.ButtonBackgroud(this.ButtonNextMob, zj.UIConfig.UIConfig_BattleSettleResult.againButton[0], zj.UIConfig.UIConfig_BattleSettleResult.againButton[1]);
                    }
                }
                else {
                    if (this.scene.bWantedReview) {
                        zj.Set.ButtonBackgroud(this.ButtonNextMob, zj.UIConfig.UIConfig_BattleSettleResult.againButton[0], zj.UIConfig.UIConfig_BattleSettleResult.againButton[1]);
                    }
                    else {
                    }
                }
            }
        };
        BattleEnd_Win.prototype.Load = function () {
            _super.prototype.Load.call(this);
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                //下一个怪ID，继续攻打有用
                this.nextMobID = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
                if (zj.Gmgr.Instance.bContinueBattle) {
                    if (zj.TableTower.Item(this.nextMobID) == null) {
                        zj.Gmgr.Instance.bStopContinueFromBattle = true;
                    }
                }
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                //下一个怪ID，继续攻打有用
                // this.nextMobID = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                if (zj.Gmgr.Instance.bContinueBattle) {
                    if (zj.TableTower.Item(this.nextMobID) == null) {
                        zj.Gmgr.Instance.bStopContinueFromBattle = true;
                    }
                }
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                //下一个怪ID，继续攻打有用
                this.nextMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID + 1;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                //再战
                if (this.scene.bEliteReview) {
                    this.nextMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
                }
                else {
                    this.nextMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID + 1;
                }
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                if (zj.Gmgr.Instance.isKeepContinueUI()) {
                    this.nextMobID = zj.Game.PlayerWantedSystem.wantedCurPos;
                }
                else {
                    if (this.scene.bWantedReview) {
                        this.nextMobID = zj.Game.PlayerWantedSystem.wantedCurPos;
                    }
                    else {
                        this.nextMobID = zj.Game.PlayerWantedSystem.wantedCurPos + 1;
                    }
                }
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                //下一个怪ID，继续攻打有用
                this.nextMobID = zj.Game.PlayerMissionSystem.licenseCurPos;
            }
        };
        BattleEnd_Win.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_Win.prototype.isTeachAni = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                var info = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
                if (info.curMobID >= info.maxMobID - 1) {
                    var areaId = Number(zj.Game.PlayerInstanceSystem.getAreaIdByLastMobId(info.curMobID));
                    if (areaId > 0) {
                        if (info.mobsMap[info.curMobID] && info.mobsMap[info.curMobID].allTime == 1)
                            return true;
                    }
                }
            }
            return false;
        };
        //成功点击返回到到xx界面
        BattleEnd_Win.prototype.clickGoOn = function () {
            var _this = this;
            if (this.isTeachAni())
                zj.Game.TeachSystem.playAreaAnimate = true;
            zj.Game.TeachSystem.battleEndOpenTeach = false;
            //关闭战斗
            zj.StageSceneManager.Instance.clearScene();
            this.close();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                this.clickGoOn_Instance();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                this.clickGoOn_Tower();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                this.clickGoOn_Tower();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                this.clickGoOn_Wanted();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                this.clickGoOn_License();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                //this.BossEntryReq()
                this.QuitBossFight();
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Game.UIManager.popAllScenesAndDialogs(function () {
                    zj.loadUI(zj.LeagueHomeScene)
                        .then(function (scene) {
                        scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.onGroupAnimal();
                        zj.Game.TeachSystem.battleEndOpenTeach = true;
                    });
                });
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Game.UIManager.popAllScenesAndDialogs(function () {
                    zj.loadUI(zj.LeagueHomeScene)
                        .then(function (scene) {
                        scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.onGroupInstance();
                        zj.Game.TeachSystem.battleEndOpenTeach = true;
                    });
                });
            }
            else {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        zj.loadUI(zj.SkyAreanMainScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.Init();
                            zj.Game.TeachSystem.battleEndOpenTeach = true;
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        zj.loadUI(zj.licenseMain)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            zj.Game.TeachSystem.battleEndOpenTeach = true;
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                            zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                                dialog.setInfo(data, function () {
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                zj.Game.TeachSystem.battleEndOpenTeach = true;
                            });
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        zj.loadUI(zj.WantedSecondMeteorstanceScene)
                            .then(function (scene) {
                            scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            zj.Game.TeachSystem.battleEndOpenTeach = true;
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        zj.loadUI(zj.WantedSecondMeteorstanceScene)
                            .then(function (scene) {
                            scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            zj.Game.TeachSystem.battleEndOpenTeach = true;
                        });
                    });
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
                    zj.toast_warning("错误");
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                    zj.toast_warning("经验或游戏币副本");
                }
                else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                    zj.Game.UIManager.popAllScenesAndDialogs(function () {
                        _this.checkAreaFinish();
                    });
                    return;
                }
            }
            this.checkAreaFinish();
        };
        BattleEnd_Win.prototype.checkAreaFinish = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                var info = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
                if (info.curMobID >= info.maxMobID - 1) {
                    var areaId_1 = Number(zj.Game.PlayerInstanceSystem.getAreaIdByLastMobId(info.curMobID));
                    if (areaId_1 > 0) {
                        var mob = info.mobsMap[info.curMobID];
                        if (mob && mob.allTime == 1) {
                            zj.Game.TeachSystem.playAreaAnimate = true;
                            zj.Common_AnimationB.initResCachekeys(areaId_1);
                            zj.loadUI(zj.Common_AnimationB)
                                .then(function (dailog) {
                                dailog.LoadAni(areaId_1);
                                dailog.show();
                            });
                        }
                    }
                }
            }
        };
        BattleEnd_Win.prototype.clickNext = function () {
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                this.clickNext_Tower();
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                this.clickNext_Tower();
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                this.clickNext_Wanted();
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                this.clickNext_Instance();
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                this.clickNext_License();
            }
        };
        //爬塔
        //----------------------------------------------------------------------------------
        BattleEnd_Win.prototype.returnFromTower = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.SkyAreanMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.Init();
                });
            });
        };
        BattleEnd_Win.prototype.clickGoOn_Tower = function () {
            if (zj.Gmgr.Instance.bContinueBattle && zj.Gmgr.Instance.isContinueNumMax()) {
                return;
            }
            if (zj.Gmgr.Instance.bContinueBattle) {
                zj.Game.UIManager.popAllScenesAndDialogs(function () {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        zj.Game.TeachSystem.battleEndOpenTeach = true;
                    });
                });
                // loadUI(HunterMainScene)
                // .then((scene: ) => {
                //     scene.show(UI.SHOW_FROM_TOP);
                // });
                // TipMgr:ShowSuccessionBattlePopTip(true, self,
                //     function()
                //         Gmgr.bContinueBattle = false
                //         Gmgr:clearContinueBattleData()
                //         this.returnFromTower()
                //     end
            }
            else {
                this.returnFromTower();
            }
        };
        //下一关
        BattleEnd_Win.prototype.clickNext_Tower = function () {
            if (zj.TableTower.Item(this.nextMobID) == null) {
                zj.toast_warning(zj.TextsConfig.TextConfig_Tower.errClear);
                return;
            }
            if (zj.Gmgr.Instance.bContinueBattle && zj.Gmgr.Instance.isContinueNumMax()) {
                return;
            }
            var stages = null;
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                stages = zj.TableTower.Item(this.nextMobID).tower_pack[zj.Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2 + 1];
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // stages = TableTower.Item(this.nextMobID).tower_pack[Game.PlayerInstanceSystem.InstanceInfo.high_monsterTowerIndex % 2 + 1];
            }
            if (stages instanceof Array) {
            }
            else {
                stages = [stages];
            }
            if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                this.LoadEnemys();
                this.BattleStartTower_Req();
            }
            else {
                this.MobsInfoTower_Req();
            }
        };
        //拉取副本怪信息
        BattleEnd_Win.prototype.MobsInfoTower_Req = function () {
            var _this = this;
            var request = new message.MobsInfoRequest();
            request.body.battleType = zj.Game.PlayerInstanceSystem.curInstanceType;
            request.body.mobsId = this.nextMobID;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                //console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                _this.MobsInfoTower_Visit();
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.MobsInfoTower_Visit = function () {
            this.LoadEnemys();
            this.BattleStartTower_Req();
        };
        //发起战斗
        BattleEnd_Win.prototype.BattleStartTower_Req = function () {
            var _this = this;
            if (this.bHasStart) {
                return;
            }
            var id = zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER && zj.Game.PlayerTowerSystem.towerInfo.towerCur; //|| Game.PlayerTowerSystem.towerInfo.high_tower_cur;
            var request = new message.BattleStartRequest();
            request.body.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            request.body.id = id;
            request.body.ext = 0;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                _this.BattleStartTower_Visit(response.header.result);
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.BattleStartTower_Visit = function (result) {
            var _this = this;
            if (result == message.EC.SUCCESS) {
                if (zj.Gmgr.Instance.autoContinueBattleNum()) {
                    this.bHasStart = true;
                }
                var FightCB = function () {
                    _this.CacheSkillSpineId(zj.Game.PlayerInstanceSystem.curInstanceType);
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightTower);
                };
                zj.FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, FightCB, this);
                this.close();
                //gmsound.Ui_GOTO_FIGHT()
            }
            else if (result == message.EC.XG_LACK_POWER) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.SetInfo();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
            }
        };
        BattleEnd_Win.prototype.CacheSkillSpineId = function (type) {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            for (var i = 0; i < this.enemys.length; i++) {
                var v = this.enemys[i];
                var info = zj.Game.PlayerMobSystem.Instance(v.id);
                zj.Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
            }
        };
        //执照
        //--------------------------------------------------------------------------------------------
        BattleEnd_Win.prototype.clickGoOn_License = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.licenseMain)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    zj.Game.TeachSystem.battleEndOpenTeach = true;
                });
            });
        };
        BattleEnd_Win.prototype.clickNext_License = function () {
            if (zj.Game.PlayerMissionSystem.itemLicense(this.nextMobID) == null) {
                return;
            }
            var stages = zj.Game.PlayerMissionSystem.itemLicense(this.nextMobID).battle_id;
            if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                this.BattleStartLicense_Req();
            }
            else {
                this.MobsInfoLicense_Req();
            }
        };
        //拉取怪信息
        BattleEnd_Win.prototype.MobsInfoLicense_Req = function () {
            var _this = this;
            var request = new message.MobsInfoRequest();
            request.body.battleType = zj.Game.PlayerInstanceSystem.curInstanceType;
            request.body.mobsId = this.nextMobID;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                //console.log(response);
                if (response.header.result != 0) {
                    zj.Game.ConfigManager.getAone2CodeReason(response.header.result);
                    return;
                }
                _this.MobsInfoLicense_Visit();
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.MobsInfoLicense_Visit = function () {
            this.LoadEnemys();
            this.BattleStartLicense_Req();
        };
        //发起战斗
        BattleEnd_Win.prototype.BattleStartLicense_Req = function () {
            var _this = this;
            var request = new message.BattleStartRequest();
            request.body.type = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
            request.body.id = zj.Game.PlayerMissionSystem.licenseCurPos;
            request.body.ext = 0;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                //console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                _this.BattleStartLicese_Visit();
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.BattleStartLicese_Visit = function () {
            this.CacheSkillSpineId(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);
            // StageSceneManager.Instance.ChangeScene(StageSceneFightLicense);
            //gmsound.Ui_GOTO_FIGHT();
            this.close();
        };
        //通缉令
        //---------------------------------------------------------------------------------
        BattleEnd_Win.prototype.returnFromWanted = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    zj.Game.TeachSystem.battleEndOpenTeach = true;
                });
            });
        };
        BattleEnd_Win.prototype.clickGoOn_Wanted = function () {
            if (zj.Gmgr.Instance.bContinueBattle && zj.Gmgr.Instance.isContinueNumMax()) {
                return;
            }
            if (zj.Gmgr.Instance.bContinueBattle) {
                // TipManager.Show
                //连续战斗界面
            }
            else {
                this.returnFromWanted();
            }
        };
        BattleEnd_Win.prototype.clickNext_Wanted = function () {
            if (zj.Gmgr.Instance.bContinueBattle && zj.Gmgr.Instance.isContinueNumMax()) {
                return;
            }
            //通缉令类型返回界面
            var cost = [zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin, zj.Game.PlayerInfoSystem.BaseInfo.arrestCoin];
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                var floor_info = zj.otherdb.WantedInstance(this.nextMobID);
                var bFirstReward = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_info.wanted_id) == -1;
                if (zj.Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume && !bFirstReward) {
                    if (!zj.Gmgr.Instance.checkContinueBattleSettle(true, null)) {
                        //增加体力
                        zj.loadUI(zj.HXH_HunterUserStrength)
                            .then(function (dialog) {
                            dialog.SetInfo();
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                }
                else if ((zj.Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_EASY || zj.Game.PlayerMissionSystem.fightExt == message.EWantedType.WANTED_TYPE_HARD) && (cost[zj.Game.PlayerMissionSystem.fightExt]) < 0) {
                    zj.toast_warning(zj.TextsConfig.TextConfig_Instance.errorCountWanted);
                }
                else {
                    if (this.bTenContinue) {
                        // TipManager.Show
                        // 连续战斗界面
                    }
                    else {
                        zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED;
                        this.ReqGetWantedMobsInfo();
                    }
                }
            }
            else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Game.UIManager.popAllScenesAndDialogs(function () {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        scene.Init(zj.Game.PlayerWantedSystem.wantedBossDifficulty + 1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
        };
        //拉怪
        BattleEnd_Win.prototype.ReqGetWantedMobsInfo = function () {
            var _this = this;
            var request = new message.MobsInfoRequest();
            request.body.battleType = message.EFormationType.FORMATION_TYPE_WANTED;
            request.body.mobsId = this.nextMobID;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    return;
                }
                _this.ReqGetWantedMobsInfo_Visit();
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.ReqGetWantedMobsInfo_Visit = function () {
            zj.Game.PlayerWantedSystem.wantedCurPos = this.nextMobID;
            this.LoadEnemys();
            this.BattleStartWanted_Req();
        };
        //通缉令战斗
        BattleEnd_Win.prototype.BattleStartWanted_Req = function () {
            var _this = this;
            if (this.bHasStart) {
                return;
            }
            var request = new message.BattleStartRequest();
            request.body.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            request.body.id = zj.Game.PlayerWantedSystem.wantedCurPos;
            request.body.ext = 0;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                _this.BattleStartWanted_Visit(response.header.result);
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.BattleStartWanted_Visit = function (result) {
            var _this = this;
            if (result == message.EC.SUCCESS) {
                if (zj.Gmgr.Instance.autoContinueBattleNum()) {
                    this.bHasStart = true;
                }
                var FightCB = function () {
                    _this.CacheSkillSpineId(message.EFormationType.FORMATION_TYPE_WANTED);
                    zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30058), 100);
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightWanted);
                };
                zj.FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_WANTED, FightCB, this);
                this.close();
                //gmsound.Ui_GOTO_FIGHT()
            }
            else {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
            }
        };
        //副本
        //---------------------------------------------------------------------------------
        //胜利返回到到xx界面
        BattleEnd_Win.prototype.clickGoOn_Instance = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.EventManager.event(zj.GameEvent.PLAYER_HUNTER_BADGE);
            zj.Game.TeachSystem.battleEndOpenTeach = true;
            // let bMaxChapter = !Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview;
            // if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.NORMAL) {
            // 	// Game.UIManager.popAllScenesAndDialogs();
            // 	loadUI(Adventurems)
            // 		.then((scene: Adventurems) => {
            // 			scene.show(UI.SHOW_FROM_TOP);
            // 			scene.LoadFromBattleNormal(bMaxChapter);
            // 		});
            // } else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.ELITE) {
            // 	// Game.UIManager.popAllScenesAndDialogs();
            // 	loadUI(Adventurems)
            // 		.then((scene: Adventurems) => {
            // 			scene.show(UI.SHOW_FROM_TOP);
            // 			scene.LoadFromBattleElite(bMaxChapter);
            // 		});
            // }
        };
        //继续攻打下一关
        BattleEnd_Win.prototype.clickNext_Instance = function () {
            if (zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bClear == true && zj.Game.PlayerInstanceSystem.InstanceFun(this.nextMobID) == null) {
                zj.toast_warning(zj.TextsConfig.TextConfig_Instance.errClear);
            }
            else if (zj.Game.PlayerInstanceSystem.CheckCount(this.nextMobID) == false) {
                // this.Buy
            }
            else if (zj.Game.PlayerInstanceSystem.CheckPower(this.nextMobID) == false) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.SetInfo();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                var stages = zj.Game.PlayerInstanceSystem.InstanceFun(this.nextMobID).instance_pack;
                if (zj.Game.PlayerStageSystem.haveStages(stages)) {
                    this.BattleStartInstance_Req();
                }
                else {
                    this.MobsInfoInstance_Req();
                }
            }
        };
        //发起战斗
        BattleEnd_Win.prototype.BattleStartInstance_Req = function () {
            var _this = this;
            //设置当前怪物信息
            zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID = this.nextMobID;
            var request = new message.BattleStartRequest();
            var type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                type = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
            }
            request.body.type = type;
            request.body.id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            request.body.ext = 0;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                //console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                _this.BattleStartInstance_Visit(response.header.result);
                return;
            }, function (req) {
                // reject(LANG("请求超时"));
                return;
            }, this, false);
        };
        BattleEnd_Win.prototype.BattleStartInstance_Visit = function (result) {
            if (result == message.EC.SUCCESS) {
                if (zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID == zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].maxMobID) {
                    zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = false;
                }
                else {
                    zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                }
                if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                }
                var FightCB = function () {
                    zj.Game.PlayerFormationSystem.saveFormations();
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightNormal);
                };
                zj.FightLoading.getInstance().loadFightRes(zj.Game.PlayerInstanceSystem.curInstanceType, FightCB, this);
                this.close();
            }
        };
        BattleEnd_Win.prototype.MobsInfoInstance_Req = function () {
            var _this = this;
            this.MobsInfo(zj.Game.PlayerInstanceSystem.curInstanceType, this.nextMobID)
                .then(function () {
                _this.LoadEnemys();
                _this.BattleStartInstance_Req();
            }).catch(function () {
            });
        };
        BattleEnd_Win.prototype.LoadEnemys = function () {
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                var cell = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
                var stages = zj.TableTower.Item(cell).tower_pack[zj.Game.PlayerInstanceSystem.MonsterTowerIndex % 2];
                this.enemys = zj.getEnemyFomation([stages - 1]);
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                // let stages = TableTower.Item(cell).tower_pack[Game.PlayerInstanceSystem.High_monsterTowerIndex % 2];
                // this.enemys = getEnemyFomation([stages]);
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                var stages = zj.TableInstance.Item(zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID).instance_pack;
                this.enemys = zj.getEnemyFomation(stages);
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                var cell = zj.Game.PlayerWantedSystem.wantedCurPos;
                var stages = zj.TableWanted.Item(cell).instance_pack;
                this.enemys = zj.getEnemyFomation(stages);
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                var stages = zj.TableMissionLicence.Item(zj.Game.PlayerMissionSystem.licenseCurPos).battle_id;
                this.enemys = zj.getEnemyFomation([stages]);
            }
        };
        BattleEnd_Win.prototype.MobsInfo = function (type, nextMobId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = type;
                request.body.mobsId = nextMobId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        return BattleEnd_Win;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_Win = BattleEnd_Win;
    __reflect(BattleEnd_Win.prototype, "zj.BattleEnd_Win");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_Win.js.map