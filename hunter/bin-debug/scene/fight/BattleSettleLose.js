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
    var BattleSettleLose = (function (_super) {
        __extends(BattleSettleLose, _super);
        function BattleSettleLose() {
            var _this = _super.call(this) || this;
            _this.tblAnalyseResult = [];
            _this.boardActionIndex = -1;
            _this.bBoardAniCome = false;
            _this.bContinueBattleSettleCome = false;
            _this.bCauseCome = false;
            _this.reason_num = 2;
            _this.tableDropItem = {};
            _this.tableAniNode = [];
            return _this;
        }
        BattleSettleLose.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.hero_come_time = zj.ConstantConfig_BattleSettle.loseGeneralComeTime;
            if (this.ButtonCause1 != null) {
                this.ButtonCause1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCause1_CallBack, this);
            }
            if (this.ButtonCause2 != null) {
                this.ButtonCause2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCause2_CallBack, this);
            }
        };
        BattleSettleLose.prototype.Load = function () {
            _super.prototype.Load.call(this);
            zj.Game.SoundManager.playMusic(zj.SoundManager.playbgmByID(100004), 1);
            this.InitAni();
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                if (zj.Gmgr.Instance.bReplay == false) {
                    this.tblAnalyseResult = zj.Game.PlayerFormationSystem.analyseResult(this.scene.formationType);
                    zj.Game.PlayerBattleSystem.cacheBattleResultInfo = this.tblAnalyseResult;
                }
                else {
                    this.tblAnalyseResult = zj.Game.PlayerBattleSystem.cacheBattleResultInfo;
                }
            }
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_ZORK
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                this.SetCauseInfoVisible(false, 2);
            }
        };
        BattleSettleLose.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateReason(tick);
        };
        BattleSettleLose.prototype.UpdateLoseAni = function (tick) {
            if (this.total_tick >= 0 && this.bBoardAniCome == false) {
                this.bBoardAniCome = true;
                //this.boardMove();
            }
        };
        BattleSettleLose.prototype.UpdateReason = function (tick) {
            if (this.bCauseCome == false) {
                this.bCauseCome = true;
                if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_ZORK
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                    && zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                    this.CauseFadeIn();
                }
                this.DropFadeIn();
            }
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.continueBattleSettleTime * 1000 && this.bContinueBattleSettleCome == false) {
                this.bContinueBattleSettleCome = true;
                zj.Gmgr.Instance.checkContinueBattleSettle(false, this.nextMobID);
            }
        };
        BattleSettleLose.prototype.InitAni = function () {
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                this.InitSingleAni();
            }
            else {
                this.InitNormalAni();
            }
        };
        BattleSettleLose.prototype.InitSingleAni = function () {
        };
        BattleSettleLose.prototype.InitNormalAni = function () {
            this.tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
            var boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];
            var winAniName = ["012_shibai_chuxian", "013_shibai_xunhuan"];
            var starAniName = ["002_lingxing_chuxian", "003_lingxing_xunhuan"];
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(boardAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(boardAniName[0], 1);
                armatureDisplay.x = thisOne.NodeBoard.width / 2;
                armatureDisplay.y = thisOne.NodeBoard.height / 2;
                thisOne.NodeBoard.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(starAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(starAniName[0], 1);
                armatureDisplay.x = thisOne.NodeStar.width / 2;
                armatureDisplay.y = thisOne.NodeStar.height / 2;
                thisOne.NodeStar.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(winAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(winAniName[0], 1);
                armatureDisplay.x = thisOne.NodeWin.width / 2;
                armatureDisplay.y = thisOne.NodeWin.height / 2;
                thisOne.NodeWin.addChild(armatureDisplay);
            });
        };
        BattleSettleLose.prototype.SetCauseInfoVisible = function (tag, num) {
            if (num > 2) {
                console.assert(false);
            }
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseIcon" + (i + 1)] != null) {
                    this["SpriteCauseIcon" + (i + 1)].visible = tag;
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseWord" + (i + 1)] != null) {
                    this["SpriteCauseWord" + (i + 1)].visible = tag;
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["ButtonCause" + (i + 1)] != null) {
                    this["ButtonCause" + (i + 1)].visible = tag;
                }
            }
        };
        BattleSettleLose.prototype.BattleResultTip = function () {
            var num = zj.yuan3(this.tblAnalyseResult.length >= 2, 2, this.tblAnalyseResult.length);
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseIcon" + (i + 1)] != null) {
                    this["SpriteCauseIcon" + (i + 1)].visible = true;
                    this["SpriteCauseIcon" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_BattleSettleResult[this.tblAnalyseResult[i].type].icon, this);
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseWord" + (i + 1)] != null) {
                    this["SpriteCauseWord" + (i + 1)].visible = true;
                    this["SpriteCauseWord" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_BattleSettleResult[this.tblAnalyseResult[i].type].path, this);
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["ButtonCause" + (i + 1)] != null) {
                    this["ButtonCause" + (i + 1)].visible = true;
                }
            }
        };
        BattleSettleLose.prototype.CauseFadeIn = function () {
            this.BattleResultTip();
            var num = zj.yuan3(this.tblAnalyseResult.length >= 2, 2, this.tblAnalyseResult.length);
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseIcon" + (i + 1)] != null) {
                    this["SpriteCauseIcon" + (i + 1)].alpha = 0;
                    egret.Tween.get(this["SpriteCauseIcon" + (i + 1)]).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.loseCauseBoardFadeIconTime);
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["SpriteCauseWord" + (i + 1)] != null) {
                    this["SpriteCauseWord" + (i + 1)].alpha = 0;
                    egret.Tween.get(this["SpriteCauseWord" + (i + 1)]).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.loseCauseBoardFadeWordTime);
                }
            }
            for (var i = 0; i < num; i++) {
                if (this["ButtonCause" + (i + 1)] != null) {
                    this["ButtonCause" + (i + 1)].alpha = 0;
                    egret.Tween.get(this["ButtonCause" + (i + 1)]).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.loseCauseBoardFadeButtonTime);
                }
            }
        };
        BattleSettleLose.prototype.resultSkip = function (type, generalId) {
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.Gmgr.Instance.bReplay = false;
                if (type == zj.TableEnum.EnumAnalyseResult.RESULT_FORMAT) {
                    zj.Gmgr.Instance.bPause = false;
                    zj.Gmgr.Instance.bReplay = false;
                    if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                        if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                            var bMaxChapter = !zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview;
                            // loadUI(Adventurems)
                            // 	.then((scene: Adventurems) => {
                            // 		scene.LoadFromBattleNormal(bMaxChapter);
                            // 		scene.show(UI.SHOW_FROM_TOP);
                            // 	});
                            zj.SceneManager.instance.EnterAdventure(bMaxChapter ? 1 : 0);
                        }
                        else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                            var bMaxChapter = !zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview;
                            // loadUI(Adventurems)
                            // 	.then((scene: Adventurems) => {
                            // 		scene.LoadFromBattleElite(bMaxChapter);
                            // 		scene.show(UI.SHOW_FROM_TOP);
                            // 	});
                            zj.SceneManager.instance.EnterAdventure(bMaxChapter ? 2 : 0);
                        }
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
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
                            zj.Game.PlayerArenaSystem.ladderList(true).then(function (data) {
                                dialog.setInfo(data, function () {
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        });
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                        zj.loadUI(zj.WantedSecondMeteorstanceScene)
                            .then(function (scene) {
                            scene.Init(1);
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP) {
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_TRAINING) {
                    }
                    else if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT) {
                    }
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_VISIT) {
                    zj.loadUI(zj.TavernScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FILL_OUT);
                        scene.nPCDialog();
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_CARD_NUM) {
                    zj.loadUI(zj.CardMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_LEVEL) {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STAR) {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STEP) {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_SKILLS) {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (type == zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_ADVISER) {
                    zj.loadUI(zj.PetMainScene)
                        .then(function (dialog) {
                        dialog.inIt(1);
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
            });
        };
        BattleSettleLose.prototype.ButtonCause1_CallBack = function () {
            var num = this.tblAnalyseResult.length;
            if (num >= 1) {
                this.resultSkip(this.tblAnalyseResult[0].type, this.tblAnalyseResult[0].general_id);
            }
        };
        BattleSettleLose.prototype.ButtonCause2_CallBack = function () {
            var num = this.tblAnalyseResult.length;
            if (num >= 2) {
                this.resultSkip(this.tblAnalyseResult[1].type, this.tblAnalyseResult[1].general_id);
            }
        };
        BattleSettleLose.prototype.DropFadeIn = function () {
            this.LoadDropsList();
        };
        BattleSettleLose.prototype.LoadDropsList = function () {
            if (this.TableViewDrops == null) {
                return;
            }
            var TableViewDrops = new eui.ArrayCollection();
            for (var i = 0; i < this.scene.getItemInfo.items.length; i++) {
                if (this.scene.getItemInfo.items[i].goodsId != 0) {
                    var data = new zj.BattleEndDropItemData();
                    data.index = i;
                    data.itemInfo = this.scene.getItemInfo.items[i];
                    data.father = this;
                    TableViewDrops.addItem(data);
                }
            }
            this.TableViewDrops.dataProvider = TableViewDrops;
            this.TableViewDrops.itemRenderer = zj.BattleEndDropItem;
        };
        ;
        /**奖励详情 */
        BattleSettleLose.prototype.awardParticulars = function (xy, cx, cy, info) {
            var ui = this.getChildByName("UI");
            if (ui) {
                return;
            }
            var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            if (zj.PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                commonDesSkill.reSetGeneral();
            }
            commonDesSkill.name = "UI";
            this.addChild(commonDesSkill);
        };
        /**抬起时将按钮缩回��?*/ /**抬起移除奖励详情界面 */
        BattleSettleLose.prototype.up = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        return BattleSettleLose;
    }(zj.BattleSettle));
    zj.BattleSettleLose = BattleSettleLose;
    __reflect(BattleSettleLose.prototype, "zj.BattleSettleLose");
})(zj || (zj = {}));
//# sourceMappingURL=BattleSettleLose.js.map