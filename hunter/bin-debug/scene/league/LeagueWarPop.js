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
     * @author xingliwei
     *
     * @date 2019-5-21
     *
     * @class 贪婪之岛战报详情展示
     */
    var LeagueWarPop = (function (_super) {
        __extends(LeagueWarPop, _super);
        function LeagueWarPop() {
            var _this = _super.call(this) || this;
            _this.LeftIsEnd = false;
            _this.RightIsEnd = false;
            _this.barType = zj.TableEnum.Enum.FastResultBarType.HP;
            _this.firstPlay = true;
            _this.leftData = [];
            _this.rightData = [];
            _this.leftGeneralsData = [];
            _this.rightGeneralsData = [];
            _this.itemsMineGeneral = [];
            _this.itemsOppGeneral = [];
            _this.array1 = new eui.ArrayCollection();
            _this.array2 = new eui.ArrayCollection();
            _this.leftnumber = 0;
            _this.rightnumber = 0;
            _this.maxValue = 0;
            _this.minNum = 0;
            /**判断子项显示战斗力还是血条 true是血条 false 是伤害*/
            _this.vis = true;
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.goodShow = false;
            _this.isClose = false;
            _this.isEndL = false;
            _this.isEndR = false;
            _this.skinName = "resource/skins/league/LeagueWarPopSkin.exml";
            _this.SpriteLeftHpBar.mask = _this.SpriteLeftHpBarbg;
            _this.SpriteRightHpBar.mask = _this.SpriteRightHpBarbg;
            _this.firstPlay = true;
            return _this;
        }
        LeagueWarPop.prototype.init = function () {
            var _this = this;
            this.ButtonSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSwitch, this);
            this.ButtonBlood.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBlood, this);
            this.ButtonHurt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHurt, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.setSwitch();
            // this.PlayFirstAni();
            this.NodeLeft.x -= 480;
            this.NodeLeft.alpha = 0;
            this.NodeRight.x += 480;
            this.NodeRight.alpha = 0;
            this.SpriteZhan.alpha = 0;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            // this.goodShow = false;
            // this.isClose = false;
        };
        LeagueWarPop.prototype.PlayLastReport = function () {
            this.rpgInfo = zj.Table.DeepCopy(zj.Game.PlayerWonderLandSystem.resultInfo);
            this.LoadReport();
            this.btnClose.visible = true;
            this.InitBeforePlay();
            this.update = egret.setInterval(this.RefreshPlayerState, this, 999);
            this.init();
        };
        LeagueWarPop.prototype.RefreshPlayerState = function () {
            if (zj.TableEnum.TableEnumOtherState.OtherState_Die != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_FallDown != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_StirUp != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_StirDown != this.scene.playerLeader.otherState &&
                this.rpgInfo.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                // PopUIUntil(this:GetUIName())
                // UICloseAndUp(this)
            }
            if (zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_FallDown != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_StirUp != this.scene.playerLeader.otherState &&
                zj.TableEnum.TableEnumOtherState.OtherState_StirDown != this.scene.playerLeader.otherState) {
                this.btnClose.visible = (true);
            }
        };
        LeagueWarPop.prototype.PlayReport = function (info) {
            this.rpgInfo = zj.Table.copy(info);
            this.LoadReport();
            this.InitBeforePlay();
            this.init();
        };
        LeagueWarPop.prototype.LoadReport = function () {
            _a = this.getAllHp(this.rpgInfo.leftArmy), this.rpgInfo.leftAllHp = _a[0];
            _b = this.getAllHp(this.rpgInfo.rightArmy), this.rpgInfo.rightAllHp = _b[0];
            if (this.rpgInfo.leftRoleBase.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                var a_1 = zj.Table.DeepCopy(this.rpgInfo.leftRoleBase);
                var b = zj.Table.DeepCopy(this.rpgInfo.rightRoleBase);
                this.rpgInfo.leftRoleBase = b;
                this.rpgInfo.rightRoleBase = a_1;
                var c = zj.Table.DeepCopy(this.rpgInfo.leftArmy);
                var d = zj.Table.DeepCopy(this.rpgInfo.rightArmy);
                this.rpgInfo.leftArmy = d;
                this.rpgInfo.rightArmy = c;
                var e = zj.Table.DeepCopy(this.rpgInfo.leftGenerals);
                var f = zj.Table.DeepCopy(this.rpgInfo.rightGenerals);
                this.rpgInfo.leftGenerals = f;
                this.rpgInfo.rightGenerals = e;
                var g = zj.Table.DeepCopy(this.rpgInfo.leftAllHp);
                var h = zj.Table.DeepCopy(this.rpgInfo.rightAllHp);
                this.rpgInfo.leftAllHp = h;
                this.rpgInfo.rightAllHp = g;
                if (this.rpgInfo.battleResult == 1) {
                    this.rpgInfo.battleResult = 2;
                }
                else if (this.rpgInfo.battleResult == 2) {
                    this.rpgInfo.battleResult = 1;
                }
            }
            this.leftData = zj.Table.copy(this.rpgInfo.leftArmy);
            this.rightData = zj.Table.copy(this.rpgInfo.rightArmy);
            this.leftGeneralsData = zj.Table.copy(this.rpgInfo.leftGenerals);
            this.rightGeneralsData = zj.Table.copy(this.rpgInfo.rightGenerals);
            this.minNum = 0;
            if (this.leftData.length > this.rightData.length) {
                this.minNum = this.rightData.length;
            }
            else {
                this.minNum = this.leftData.length;
            }
            this.LeftIsEnd = false;
            this.RightIsEnd = false;
            this.barType = zj.TableEnum.Enum.FastResultBarType.HP;
            this.firstPlay = true;
            this.maxValue = 0;
            for (var i = 0; i < this.rightData.length; i++) {
                if (this.rightData[i] != null && this.rightData[i] != undefined) {
                    if (this.maxValue < this.rightData[i].cur_pos) {
                        this.maxValue = this.rightData[i].cur_pos;
                    }
                }
            }
            for (var i = 1; i < this.leftData.length; i++) {
                if (this.leftData[i] != null && this.leftData[i] != undefined) {
                    if (this.maxValue < this.leftData[i].cur_pos) {
                        this.maxValue = this.leftData[i].cur_pos;
                    }
                }
            }
            var a = [];
            this.leftData.splice(0, 0, a);
            this.leftData.splice(0, 0, a);
            this.rightData.splice(0, 0, a);
            this.rightData.splice(0, 0, a);
            var _a, _b;
        };
        ;
        LeagueWarPop.prototype.InitBeforePlay = function () {
            this.initUi();
            this.initBar();
            this.PlayFirstAni();
        };
        LeagueWarPop.prototype.initUi = function () {
            var _this = this;
            if (zj.PlayerItemSystem.ItemType(this.rpgInfo.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.Item(this.rpgInfo.rightRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.rpgInfo.rightRoleBase.picId);
                if (mpr != null) {
                    this.SpriteRightHead.source = zj.cachekey(mpr.head_path, this);
                }
            }
            else {
                this.SpriteRightHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.rpgInfo.rightRoleBase.picId), this);
            }
            if (zj.PlayerItemSystem.ItemType(this.rpgInfo.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.Item(this.rpgInfo.leftRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.rpgInfo.leftRoleBase.picId);
                if (mpr != null) {
                    this.SpriteLeftHead.source = zj.cachekey(mpr.head_path, this);
                }
            }
            else {
                this.SpriteLeftHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.rpgInfo.leftRoleBase.picId), this);
            }
            this.LabelLeftName.text = this.rpgInfo.leftRoleBase.name;
            this.LabelLevelNumA.text = ("Lv" + this.rpgInfo.leftRoleBase.level);
            var right_name = "";
            if (this.rpgInfo.rightRoleBase.name_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
                right_name = zj.Game.PlayerWonderLandSystem.Des(Number(this.rpgInfo.rightRoleBase.name));
            }
            else {
                right_name = this.rpgInfo.rightRoleBase.name;
            }
            this.LabelRightName.text = right_name;
            this.LabelLevelNumB.text = ("Lv" + this.rpgInfo.rightRoleBase.level);
            this.LabelPlayerPowerLeft.text = (zj.Set.NumberUnit3(this.getGeneralPower(this.rpgInfo.leftGenerals)));
            this.LabelPlayerPowerRight.text = (zj.Set.NumberUnit3(this.getGeneralPower(this.rpgInfo.rightGenerals)));
            this.NodeLeft.x -= 480;
            this.NodeLeft.alpha = 0;
            this.NodeRight.x += 480;
            this.NodeRight.alpha = 0;
            this.SpriteZhan.alpha = 0;
            this.ButtonBlood.visible = false;
            this.ButtonHurt.visible = false;
            this.SpriteResult.visible = false;
            this.SpriteBoardTip.visible = false;
            this.SpriteOrnTip.visible = false;
            var noLeftPet = function () {
                _this.groupPetLeft.visible = (false);
            };
            var noRightsPet = function () {
                _this.groupPetRight.visible = (false);
            };
            if (this.rpgInfo.leftRoleBase.petInfo != null && this.rpgInfo.leftRoleBase.petInfo.length > 0 && this.rpgInfo.leftRoleBase.petInfo != undefined) {
                var leftPetCarryInfo = zj.Table.FindR(this.rpgInfo.leftRoleBase.petInfo, function (_k, _v) {
                    return _v.situtation == 1;
                });
                if (leftPetCarryInfo != null && leftPetCarryInfo[0] != null) {
                    var dat_tbl = zj.TableBasePet.Item(leftPetCarryInfo[0].pet_id);
                    this.SpriteIconLeft.source = dat_tbl.frame_path;
                    zj.PetEvolution.GetNodeStarByAlignmentsPet(this.NodeStarLeft, 5, 5, 1, leftPetCarryInfo[0].star, null);
                }
                else {
                    noLeftPet();
                }
            }
            else {
                noLeftPet();
            }
            if ((this.rpgInfo.rightRoleBase.petInfo) != null && this.rpgInfo.rightRoleBase.petInfo.length > 0 && this.rpgInfo.rightRoleBase.petInfo != undefined) {
                var rightPetCarryInfo = zj.Table.FindR(this.rpgInfo.rightRoleBase.petInfo, function (_k, _v) {
                    return _v.situtation == 1;
                });
                if (rightPetCarryInfo != null && rightPetCarryInfo[0] != null) {
                    var dat_tbl = zj.TableBasePet.Item(rightPetCarryInfo[0].pet_id);
                    this.SpriteIconRight.source = dat_tbl.frame_path;
                    zj.PetEvolution.GetNodeStarByAlignmentsPet(this.NodeStarRight, 5, 5, 1, rightPetCarryInfo[0].star, null);
                }
                else {
                    noRightsPet();
                }
            }
            else {
                noRightsPet();
            }
        };
        LeagueWarPop.prototype.getGeneralPower = function (generalList) {
            var generalPowerSub = 0;
            for (var k in generalList) {
                if (generalList.hasOwnProperty(k)) {
                    var v = generalList[k];
                    generalPowerSub = generalPowerSub + v.battleValue;
                }
            }
            return generalPowerSub;
        };
        /**子类调动，子项特效都结束后调用，本类播放动画 */
        LeagueWarPop.prototype.LeftEnd = function () {
            this.LeftIsEnd = true;
            this.isEndL = true;
            if (this.RightIsEnd) {
                this.AniResult();
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                this.RightIsEnd = false;
            }
        };
        LeagueWarPop.prototype.RightEnd = function () {
            this.RightIsEnd = true;
            this.isEndR = true;
            if (this.LeftIsEnd) {
                this.AniResult();
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                this.LeftIsEnd = false;
            }
        };
        LeagueWarPop.prototype.AniCall = function (close) {
            if (this.goodShow) {
                return;
            }
            this.goodShow = true;
            var sceneGoods = [];
            var resultList = [];
            if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                sceneGoods = zj.Game.PlayerWonderLandSystem.getGoods;
                resultList = zj.Game.PlayerWonderLandSystem.resultList;
            }
            else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                sceneGoods = zj.Game.PlayerWonderLandSystem.darkland.getGoods;
                resultList = zj.Game.PlayerWonderLandSystem.darkland.resultList;
            }
            if (zj.Game.PlayerWonderLandSystem.resultInfo.battleType == message.EFormationType.FORMATION_TYPE_WONDERLAND && sceneGoods != null && !this.isClose) {
                var getGold = false;
                var loseGold = false;
                var lose_good = [];
                var good_1 = [];
                var fightGoods = [];
                //仙境新手处理  
                if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                    for (var k in sceneGoods) {
                        if (sceneGoods.hasOwnProperty(k)) {
                            var v = sceneGoods[k];
                            if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                                getGold = true;
                                good_1.push(v);
                                fightGoods.push(v);
                            }
                            else {
                                if (v.index == 2) {
                                    loseGold = true;
                                    lose_good.push(v);
                                    fightGoods.push(v);
                                }
                                else if (v.index == 1) {
                                    getGold = true;
                                    good_1.push(v);
                                    fightGoods.push(v);
                                }
                            }
                        }
                    }
                }
                if ((resultList) && (fightGoods)) {
                    if (resultList.length > 0) {
                        if (resultList[0].goods == null) {
                            resultList[0].goods = zj.Table.DeepCopy(sceneGoods);
                        }
                    }
                }
                if (getGold && !close) {
                    if (!zj.Teach.m_bOpenTeach) {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(good_1);
                            dialog.show();
                        });
                    }
                }
                if (lose_good && !close) {
                    for (var k in lose_good) {
                        if (lose_good.hasOwnProperty(k)) {
                            var v = lose_good[k];
                            var itemSet = zj.PlayerItemSystem.Set(v.goodsId, v.showType);
                            zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, itemSet.Info.name, v.count), this.height, this.width, null, zj.UIConfig.UIConfig_Wonderland.tipBoard[1]);
                        }
                    }
                }
                for (var k in sceneGoods) {
                    if (sceneGoods.hasOwnProperty(k)) {
                        var v = sceneGoods[k];
                        if (v.index != 1 && v.index != 2 && !close) {
                            var itemSet = zj.PlayerItemSystem.Set(v.goodsId, v.showType);
                            var rgb = zj.Helper.HexToRGB(zj.ConstantConfig_Common.Color.quality_color[itemSet.Info.quality - 1]);
                            rgb.r = Math.floor(rgb.r);
                            rgb.g = Math.floor(rgb.g);
                            rgb.b = Math.floor(rgb.b);
                            // Common_Tip.AddTip(Helper.StringFormat("%s%s", itemSet.Info.name, v.count), this.height, this.width, null, UIConfig.UIConfig_Wonderland.tipBoard[0]);
                            zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, itemSet.Info.name, v.count), zj.UIManager.StageHeight, zj.UIManager.StageWidth, null, zj.UIConfig.UIConfig_Wonderland.tipBoard[0]);
                        }
                    }
                }
                if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                    zj.Game.PlayerWonderLandSystem.getGoods = [];
                }
                else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                    zj.Game.PlayerWonderLandSystem.darkland.getGoods = [];
                }
                if (zj.Game.PlayerWonderLandSystem.mobsDebuffTips) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.mobs_debuff);
                    zj.Game.PlayerWonderLandSystem.mobsDebuffTips = false;
                }
            }
        };
        LeagueWarPop.prototype.setSwitch = function () {
            this.SpriteHook0.visible = zj.Device.fastBattleSwitch;
        };
        LeagueWarPop.prototype.AniResult = function () {
            var _this = this;
            if (this.firstPlay) {
                var NodeResult_1 = new eui.Group();
                var NodeBoardTip_1 = new eui.Group();
                var NodeOrnTip_1 = new eui.Group();
                this.groupRoot.addChild(NodeOrnTip_1);
                this.groupRoot.addChild(NodeBoardTip_1);
                this.groupRoot.addChild(NodeResult_1);
                if (this.rpgInfo.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                    this.AniCall();
                    this.RightHpSub(this.rightBeforeHp);
                    zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "002_beijingguang_03", 0)
                        .then(function (display) {
                        display.y = 5;
                        display.name = "ui_tongyong_beijingguang";
                        if (!NodeOrnTip_1.getChildByName("ui_tongyong_beijingguang")) {
                            NodeOrnTip_1.addChild(display);
                        }
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_diban", null, [], [])
                        .then(function (armatureDisplay) {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.play("009_diban5_xunhuan", 0);
                        }, _this);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("008_diban5_chuxian", 1);
                        NodeBoardTip_1.addChild(armatureDisplay);
                    });
                    zj.cachekey(zj.UIConfig.UIConfig_League.WarResultWin, this);
                    var img = new eui.Image(zj.UIConfig.UIConfig_League.WarResultWin);
                    img.anchorOffsetX = 98;
                    img.anchorOffsetY = 42;
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [img], ["003_wenzi"])
                        .then(function (armatureDisplay) {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.play("001_xunhuan", 0);
                        }, _this);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("000_chuxian", 1);
                        NodeResult_1.addChild(armatureDisplay);
                    });
                    // this.firstPlay = false;
                }
                else {
                    this.AniCall();
                    this.LeftHpSub(this.leftBeforeHp);
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_diban", null, [], [])
                        .then(function (armatureDisplay) {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.play("011_diban6_xunhuan", 0);
                        }, _this);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("010_diban6_chuxian", 1);
                        NodeBoardTip_1.addChild(armatureDisplay);
                    });
                    zj.cachekey(zj.UIConfig.UIConfig_League.WarResultLose, this);
                    var img = new eui.Image(zj.UIConfig.UIConfig_League.WarResultLose);
                    img.anchorOffsetX = 98;
                    img.anchorOffsetY = 42;
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [img], ["003_wenzi"])
                        .then(function (armatureDisplay) {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.play("001_xunhuan", 0);
                        }, _this);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("000_chuxian", 1);
                        NodeResult_1.addChild(armatureDisplay);
                    });
                }
            }
            this.firstPlay = false;
            this.ButtonBlood.visible = this.barType == zj.TableEnum.Enum.FastResultBarType.HURT;
            this.ButtonHurt.visible = this.barType == zj.TableEnum.Enum.FastResultBarType.HP;
        };
        LeagueWarPop.prototype.onBtnBlood = function () {
            this.ButtonBlood.visible = false;
            this.ButtonHurt.visible = false;
            this.barType = zj.TableEnum.Enum.FastResultBarType.HP;
            this.ResetListAni();
            this.vis = true;
            this.lodelist();
        };
        LeagueWarPop.prototype.onBtnHurt = function () {
            this.ButtonBlood.visible = false;
            this.ButtonHurt.visible = false;
            this.barType = zj.TableEnum.Enum.FastResultBarType.HURT;
            this.ResetListAni();
            this.vis = false;
            this.lodelist();
        };
        LeagueWarPop.prototype.lodelist = function () {
            // [this.leftMaxHp, this.leftBeforeHp, this.leftCurHp] = this.getAllHp(this.leftData);
            // [this.rightMaxHp, this.rightBeforeHp, this.rightCurHp] = this.getAllHp(this.rightData);
            // this.leftMaxHp = this.rpgInfo.leftAllHp;
            // this.rightMaxHp = this.rpgInfo.rightAllHp;
            this.leftnumber = 0;
            this.rightnumber = 0;
            this.TableViewMine.scrollV = 0;
            this.TableViewOpp.scrollV = 0;
            this.array1.removeAll();
            this.array2.removeAll();
            this.LoadLeftGeneral();
            this.LoadRightGeneral();
        };
        LeagueWarPop.prototype.ResetListAni = function () {
            this.LeftIsEnd = false;
            this.RightIsEnd = false;
            if (this.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.initBar();
            }
        };
        LeagueWarPop.prototype.initBar = function () {
            _a = this.getAllHp(this.leftData), this.leftMaxHp = _a[0], this.leftBeforeHp = _a[1], this.leftCurHp = _a[2];
            _b = this.getAllHp(this.rightData), this.rightMaxHp = _b[0], this.rightBeforeHp = _b[1], this.rightCurHp = _b[2];
            this.leftMaxHp = this.rpgInfo.leftAllHp;
            this.rightMaxHp = this.rpgInfo.rightAllHp;
            this.ResetBar();
            var _a, _b;
        };
        LeagueWarPop.prototype.ResetBar = function () {
            this.TextHpLeft.text = (zj.Set.NumberUnit3(Math.floor(this.leftBeforeHp)) + "/" + zj.Set.NumberUnit3(Math.floor(Math.floor(this.leftMaxHp))));
            this.TextHpRight.text = (zj.Set.NumberUnit3(Math.floor(this.rightBeforeHp)) + "/" + zj.Set.NumberUnit3(Math.floor(Math.floor(this.rightMaxHp))));
            egret.Tween.get(this.SpriteLeftHpBarbg).to({ width: (this.SpriteLeftHpBar.width * this.leftBeforeHp / this.leftMaxHp) }, 400);
            egret.Tween.get(this.SpriteRightHpBarbg).to({ width: (this.SpriteRightHpBar.width * this.rightBeforeHp / this.rightMaxHp) }, 400);
            if (this.leftBeforeHp <= 0) {
                egret.Tween.removeTweens(this.SpriteLeftHpBarbg);
                this.SpriteLeftHpBarbg.width = 0;
            }
            if (this.rightBeforeHp <= 0) {
                egret.Tween.removeTweens(this.SpriteRightHpBarbg);
                this.SpriteRightHpBarbg.width = 0;
            }
        };
        LeagueWarPop.prototype.LeftHpSub = function (hp) {
            if (hp < 0) {
                hp = 0;
            }
            if (this.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.leftBeforeHp -= hp;
                if (this.leftBeforeHp < 0) {
                    this.leftBeforeHp = 0;
                }
                this.ResetBar();
            }
        };
        LeagueWarPop.prototype.RightHpSub = function (hp) {
            if (hp < 0) {
                hp = 0;
            }
            if (this.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.rightBeforeHp -= hp;
                if (this.rightBeforeHp < 0) {
                    this.rightBeforeHp = 0;
                }
                this.ResetBar();
            }
        };
        LeagueWarPop.prototype.PlayFirstAni = function () {
            var _this = this;
            var paths = [];
            if (zj.PlayerItemSystem.ItemType(this.rpgInfo.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.Table(this.rpgInfo.rightRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.rpgInfo.rightRoleBase.picId);
                if (mpr != null) {
                    paths[1] = mpr.half_path;
                }
            }
            else {
                var table = zj.PlayerItemSystem.Table(this.rpgInfo.rightRoleBase.picId);
                paths[1] = zj.TableMapRole.Item(table.mapRole_id).half_path;
            }
            if (zj.PlayerItemSystem.ItemType(this.rpgInfo.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.Item(this.rpgInfo.leftRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.rpgInfo.leftRoleBase.picId);
                if (mpr != null) {
                    paths[0] = mpr.half_path;
                }
            }
            else {
                var table = zj.PlayerItemSystem.Table(this.rpgInfo.leftRoleBase.picId);
                paths[0] = zj.TableMapRole.Item(table.mapRole_id).half_path;
            }
            var pathNodes = [];
            for (var i = 0; i < 2; i++) {
                zj.cachekey(paths[i], this);
                var img = new eui.Image(paths[i]);
                var sx = i == 0 ? 1 : -1;
                // img.scaleX = sx * 0.6;
                // img.scaleY = 0.6;
                img.width = 502 * 0.6;
                img.height = 487 * 0.6;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                pathNodes.push(img);
            }
            var bones = ["006_juese1", "007_juese2"]; //[]//
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tanlanzhidao_03", null, pathNodes, bones)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    _this.Show();
                }, _this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play("000_juese", 1);
                _this.NodeAdd.addChild(armatureDisplay);
            });
        };
        LeagueWarPop.prototype.Show = function () {
            var _this = this;
            egret.Tween.get(this.NodeLeft).to({ alpha: 1 }, 1).to({ x: 135 }, 400).to({ x: 85 }, 100).call(function () {
                _this.LoadLeftGeneral();
                _this.LoadRightGeneral();
            });
            egret.Tween.get(this.NodeRight).to({ alpha: 1 }, 1).to({ x: 510 }, 400).to({ x: 560 }, 100);
            egret.Tween.get(this.SpriteZhan).to({ alpha: 1 }, 1).to({ scaleX: 1.2, scaleY: 1.2 }, 350).to({ scaleX: 1, scaleY: 1 }, 150);
            // this.AniResult();
        };
        /**加载左侧list */
        LeagueWarPop.prototype.LoadLeftGeneral = function () {
            var array = new eui.ArrayCollection();
            if (this.leftnumber < 12) {
                if (this.leftnumber >= this.leftData.length) {
                    return;
                }
                var data = new zj.LeagueWarPopItemMineData();
                data.index = this.leftnumber;
                data.barType = this.barType;
                data.itemInfo = this.leftData[this.leftnumber];
                data.maxValue = this.maxValue;
                data.oppNum = this.minNum;
                data.generalInfo = this.leftGeneralsData[this.leftnumber - 2];
                data.itemtype = 0;
                data.father = this;
                this.leftnumber++;
                this.array1.addItemAt(data, 0);
            }
            this.TableViewMine.dataProvider = this.array1;
            this.TableViewMine.itemRenderer = zj.LeagueWarPopItemMine;
        };
        /**加载右侧list */
        LeagueWarPop.prototype.LoadRightGeneral = function () {
            if (this.rightnumber < 12) {
                if (this.rightnumber >= this.rightData.length) {
                    return;
                }
                var data = new zj.LeagueWarPopItemEnemyData();
                data.index = this.rightnumber;
                data.barType = this.barType;
                data.itemInfo = this.rightData[this.rightnumber];
                data.maxValue = this.maxValue;
                data.oppNum = this.minNum;
                data.generalInfo = this.rightGeneralsData[this.rightnumber - 2];
                data.itemtype = 0;
                data.father = this;
                this.rightnumber++;
                this.array2.addItemAt(data, 0);
            }
            this.TableViewOpp.dataProvider = this.array2;
            this.TableViewOpp.itemRenderer = zj.LeagueWarPopItemEnemy;
        };
        LeagueWarPop.prototype.onBtnSwitch = function () {
            zj.Device.fastBattleSwitch = !zj.Device.fastBattleSwitch;
            zj.Device.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch, zj.Device.fastBattleSwitch);
            zj.Device.fastBattleHideTips = 0;
            zj.Device.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleHideTips, zj.Device.fastBattleSwitch);
            this.setSwitch();
        };
        LeagueWarPop.prototype.getAllHp = function (tableDate) {
            var maxHp = 0;
            var curHp = 0;
            var beforeHp = 0;
            for (var k in tableDate) {
                if (tableDate.hasOwnProperty(k)) {
                    var v = tableDate[k];
                    if (v && Object.keys(v).length > 0) {
                        maxHp = maxHp + v.cur_bean;
                    }
                }
            }
            for (var k in tableDate) {
                if (tableDate.hasOwnProperty(k)) {
                    var v = tableDate[k];
                    if (v && Object.keys(v).length > 0) {
                        beforeHp = beforeHp + v.cur_rage;
                        curHp = curHp + v.cur_hp;
                    }
                }
            }
            return [maxHp, beforeHp, curHp];
        };
        LeagueWarPop.prototype.onBtnClose = function () {
            this.AniCall(true);
            this.isClose = true;
            if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
                zj.Game.PlayerWonderLandSystem.getGoods = [];
            }
            else if (this.scene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                zj.Game.PlayerWonderLandSystem.darkland.getGoods = [];
            }
            zj.Teach.addTeaching();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueWarPop;
    }(zj.Dialog));
    zj.LeagueWarPop = LeagueWarPop;
    __reflect(LeagueWarPop.prototype, "zj.LeagueWarPop");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueWarPop.js.map