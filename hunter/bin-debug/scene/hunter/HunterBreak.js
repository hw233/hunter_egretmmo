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
     * @author chen xi
     *
     * @date 2018-12-4
     *
     * @class 猎人突破界面
     */
    var HunterBreak = (function (_super) {
        __extends(HunterBreak, _super);
        function HunterBreak() {
            var _this = _super.call(this) || this;
            _this.generalId = null;
            _this.breakLevel = null;
            _this.isLongShow = true;
            _this.desPropVisible = false;
            _this.nodeInfoTopHeight = 0;
            //判断技能是否点击
            _this.groupvis1 = false;
            _this.groupvis2 = false;
            _this.groupvis3 = false;
            /**0:任意1：同名 */
            _this.type = 0;
            _this.skinName = "resource/skins/hunter/HunterBreakSkin.exml";
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnAddGold.visible = false;
            }
            return _this;
        }
        HunterBreak.prototype.init = function () {
            var _this = this;
            var centerX = zj.UIManager.StageWidth * 0.5;
            this.groupLeft.x = (centerX - this.groupLeft.width - 20) < 0 ? 0 : (centerX - this.groupLeft.width - 20);
            this.groupRight.x = centerX;
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.groupLeftBottomItem1.addEventListener(tap, this.onBtnBreakSkill1, this);
            this.groupLeftBottomItem2.addEventListener(tap, this.onBtnBreakSkill2, this);
            this.groupLeftBottomItem3.addEventListener(tap, this.onBtnBreakSkill3, this);
            this.groupLeftBottomItem1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.groupvis1 = true;
                _this.groupLeftBottomItem1.scaleX = _this.groupLeftBottomItem1.scaleY = 1.1;
                _this.onShowBreakSkill(1);
            }, this);
            this.groupLeftBottomItem2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.groupvis2 = true;
                _this.groupLeftBottomItem2.scaleX = _this.groupLeftBottomItem2.scaleY = 1.1;
                _this.onShowBreakSkill(2);
            }, this);
            this.groupLeftBottomItem3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.groupvis3 = true;
                _this.groupLeftBottomItem3.scaleX = _this.groupLeftBottomItem3.scaleY = 1.1;
                _this.onShowBreakSkill(3);
            }, this);
            var a = function (e) {
                if (_this.groupvis1 == true) {
                    var one = _this.groupLeftBottomItem1;
                    var one1 = _this.groupLeftBottomItem1.localToGlobal(one.x, one.y);
                    one1.x -= zj.Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    }
                    else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
                if (_this.groupvis2 == true) {
                    var one = _this.groupLeftBottomItem2;
                    var one1 = _this.groupLeftBottomItem2.localToGlobal(one.x, one.y);
                    one1.x -= zj.Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    }
                    else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
                if (_this.groupvis3 == true) {
                    var one = _this.groupLeftBottomItem3;
                    var one1 = _this.groupLeftBottomItem3.localToGlobal(one.x, one.y);
                    one1.x -= zj.Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    }
                    else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
            };
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, a, this);
            this.btnReturn.addEventListener(tap, this.onBtnReturn, this);
            this.btnFirstAwaken.addEventListener(tap, this.onBtnFirstAwaken, this);
            this.btnMaterials.addEventListener(tap, this.onBtnMaterials, this);
            this.nodeMeterial.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                if (_this.spriteAddMeterials.visible == true) {
                    _this.onBtnMaterials();
                }
                else {
                    _this.onShowMaterials();
                }
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.nodeSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.onAddSkill(0);
            }, this);
            this.nodeSkill0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.onAddSkill(1);
            }, this);
            this.nodeInfoTopHeight = this.nodeInfoTop.height;
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                egret.Tween.removeTweens(_this);
            }, this);
            egret.Tween.get(this).wait(10).call(function () {
                _this.Update();
            });
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        };
        HunterBreak.prototype.isFullScreen = function () {
            return true;
        };
        HunterBreak.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterBreak.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        HunterBreak.prototype.Update = function () {
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelIntegrate.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        };
        /**
         * 设置基本信息
         *
         * @param id 猎人ID
         * @param cb 回调函数， 猎人突破成功调用
         */
        HunterBreak.prototype.setInfo = function (id, cb) {
            this.generalId = id;
            this.callback = cb;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            this.refreshInfo();
        };
        HunterBreak.prototype.refreshInfo = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            /**是否可变身 */
            var vis = zj.Table.FindF(zj.PlayerHunterSystem.getGeneralTransfer(), function (k, v) {
                return v.general_id == _this.generalId % 100000;
            });
            if (baseGeneralInfo.aptitude <= 13) {
                this.groupLeftBottom2.visible = false;
                this.groupLeftBottom3.visible = false;
            }
            else if (baseGeneralInfo.aptitude >= 14 && vis == false) {
                this.groupLeftBottom2.visible = true;
                this.groupLeftBottom3.visible = false;
            }
            else if (baseGeneralInfo.aptitude >= 14 && vis == true) {
                this.groupLeftBottom3.visible = true;
            }
            if (baseGeneralInfo.aptitude <= 13) {
                zj.CommonConfig.general_max_break = 3;
            }
            else if (baseGeneralInfo.aptitude >= 14 && vis == false) {
                zj.CommonConfig.general_max_break = 6;
            }
            else if (baseGeneralInfo.aptitude >= 14 && vis == true) {
                this.groupLeftBottom3.visible = true;
                zj.CommonConfig.general_max_break = 9;
                this.uniconHint3.text = "变身解锁";
            }
            if (hunterInfo.break_level == zj.CommonConfig.general_max_break) {
                this.breakLevel = hunterInfo.break_level;
            }
            else {
                this.breakLevel = hunterInfo.break_level + 1;
            }
            this.setBreakCondition();
            this.setBreakState();
            var thisone = this;
            function a() {
                if (thisone.btnSkill1.visible == true) {
                    thisone.groupLeftBottomItem1.touchEnabled = true;
                }
                if (thisone.btnSkill2.visible == true) {
                    thisone.groupLeftBottomItem2.touchEnabled = true;
                }
                if (thisone.btnSkill3.visible == true) {
                    thisone.groupLeftBottomItem3.touchEnabled = true;
                }
            }
            a();
            this.setBreakSkillRedDot();
            this.setHunterInfo();
            if (hunterInfo.break_level == zj.CommonConfig.general_max_break) {
                this.setAttributeInfoMax();
                this.maxAni();
            }
            else {
                this.setAttributeInfo();
                this.setBreakConsume();
                this.waitAni();
            }
            if (hunterInfo.break_level <= 0) {
                this.labelSkillLevel1.text = "" + 0;
                this.labelSkillLevel2.text = "" + 0;
                this.labelSkillLevel3.text = "" + 0;
            }
            else {
                this.labelSkillLevel1.text = "" + zj.TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[0];
                this.labelSkillLevel2.text = "" + zj.TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[1];
                this.labelSkillLevel3.text = "" + zj.TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[2];
            }
        };
        /** 突破条件 */
        HunterBreak.prototype.setBreakCondition = function () {
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.isLongShow = true;
            if (hunterInfo.break_level == zj.CommonConfig.general_max_break) {
                this.nodeUpLevel.visible = false;
                this.labelBreakRole.visible = false;
                this.spriteBreakMax.visible = true;
            }
            else if (hunterInfo.level >= breakInfo.condition_level &&
                hunterInfo.awakePassive.level >= breakInfo.condition_awaken) {
                this.nodeUpLevel.visible = true;
                this.labelBreakRole.visible = false;
                this.spriteBreakMax.visible = false;
            }
            else {
                this.isLongShow = false;
                this.nodeUpLevel.visible = false;
                this.labelBreakRole.visible = true;
                this.spriteBreakMax.visible = false;
                var tbl = [breakInfo.condition_star, breakInfo.condition_level, breakInfo.condition_awaken];
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.breakCondition[this.breakLevel - 1], tbl[this.breakLevel - 1]);
                this.labelBreakRole.textFlow = zj.Util.RichText(str);
            }
        };
        /** 突破消耗 */
        HunterBreak.prototype.setBreakConsume = function () {
            if (this.breakLevel > zj.CommonConfig.general_max_break) {
                this.breakLevel = zj.CommonConfig.general_max_break;
            }
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            var itemCount = zj.PlayerItemSystem.Count(breakInfo.exchange_store[0]);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var currentNumber = itemCount;
            var enoughNumber = breakInfo.exchange_store[1];
            // set node meterials info
            var meterialsNumString = String(currentNumber) + "/" + String(enoughNumber);
            this.labelNumMeterials.text = meterialsNumString;
            zj.Set.LabelNumberGreenAndRed(this.labelNumMeterials, currentNumber, enoughNumber);
            if (currentNumber >= enoughNumber && this.isLongShow) {
                this.spriteMakeMeterials.visible = false;
                this.spriteAddMeterials.visible = false;
                this.btnMaterials.visible = false;
            }
            else {
                this.spriteMakeMeterials.visible = true;
                this.spriteAddMeterials.visible = true;
                this.btnMaterials.visible = true;
            }
            var a = function () {
                var aa = [];
                for (var i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 0) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            var b = function () {
                var aa = [];
                for (var i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 1) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            if (a().length == 0) {
                this.nodeSkill.visible = false;
            }
            else {
                this.nodeSkill.visible = true;
            }
            if (b().length == 0) {
                this.nodeSkill0.visible = false;
            }
            else {
                this.nodeSkill0.visible = true;
            }
            // set node skill
            var skillFragmentNumString = String(zj.PlayerHunterSystem.breakSelectedGenerals.length) + "/" + String(a().length);
            this.labelNumSkillFragment.text = skillFragmentNumString;
            zj.Set.LabelNumberGreenAndRed(this.labelNumSkillFragment, zj.PlayerHunterSystem.breakSelectedGenerals.length, a().length);
            var skillFragmentNumString1 = String(zj.PlayerHunterSystem.breakSelectedGenerals1.length) + "/" + String(b().length);
            this.labelNumSkillFragment1.text = skillFragmentNumString1;
            zj.Set.LabelNumberGreenAndRed(this.labelNumSkillFragment1, zj.PlayerHunterSystem.breakSelectedGenerals1.length, b().length);
            var level = breakInfo.exchange_level[0];
            this.labelBreakLevel.text = level.toString();
            var isExange = zj.Table.FindF(breakInfo.exchange_generals, function (k, v) {
                return v == 0;
            });
            var table = zj.PlayerItemSystem.Table(breakInfo.exchange_store[0]);
            var materialIconPath = table.path;
            var skillFragmentPath = isExange ? zj.UIConfig.UIConfig_General.hunter_donnot_know : zj.PlayerHunterSystem.Head(this.generalId);
            var skillFragmentPath1 = isExange ? zj.PlayerHunterSystem.Head(this.generalId) : zj.UIConfig.UIConfig_General.hunter_donnot_know;
            var awakenPath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.spriteIconMeterials.source = zj.cachekey(materialIconPath, this);
            this.spriteIconSkillFragment.source = zj.cachekey(skillFragmentPath, this);
            this.spriteIconSkillFragment1.source = zj.cachekey(skillFragmentPath1, this);
            // this.spriteBreakAwaken.visible = (breakInfo.exchange_generals[0] != 0);
            // this.spriteBreakAwaken.source = cachekey(awakenPath, this);
            var star1 = 0;
            var break1 = 0;
            if (this.type == 0) {
                star1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            }
            else {
                star1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }
            var tbl = zj.PlayerHunterSystem.GetCanBreakHunter(star1, this.generalId, break1);
            this.spriteMakeSkillFragment.visible = (tbl.length != 0);
            var tbl1 = zj.PlayerHunterSystem.GetCanBreakHunter(star1, this.generalId, break1);
            this.spriteMakeSkillFragment1.visible = (tbl1.length != 0);
            var star = breakInfo.exchange_star[breakInfo.exchange_star.length - 1];
            var awaken = breakInfo.exchange_awaken[0];
            zj.Helper.SetHeroAwakenStar(this.nodeBreakStar, star, awaken);
            var star11 = breakInfo.exchange_star[0];
            zj.Helper.SetHeroAwakenStar(this.nodeBreakStar1, star11, awaken);
        };
        /** 技能红点 */
        HunterBreak.prototype.setBreakSkillRedDot = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var usingBreakSkills = hunterInfo.using_break_skill;
            for (var i = 1; i <= 3; i++) {
                var group = this["groupLeftBottom" + i].getChildByName("groupLeftBottomItem" + i);
                var img = group.getChildByName("spriteRed" + i);
                if (hunterInfo.break_level >= i) {
                    var can = (usingBreakSkills[i - 1] == 0);
                    img.visible = can;
                }
                else {
                    img.visible = false;
                }
            }
        };
        /**
         * 突破阶段状态
         *
         * 设置左侧底部技能部分状态
         */
        HunterBreak.prototype.setBreakState = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var thisOne = this;
            var _loop_1 = function (i) {
                var group = thisOne["groupLeftBottom" + i].getChildByName("groupLeftBottomItem" + i);
                // 判断技能是否使用
                var using = zj.Table.FindF(hunterInfo.using_break_skill, function (k, v) {
                    return (v != 0 && Number(k) == (i - 1));
                });
                var imgFrame = group.getChildByName("spriteFrame" + i);
                imgFrame.visible = true;
                var imgIcon = group.getChildByName("spriteIcon" + i);
                // if ((i - 1) * 3 <= hunterInfo.break_level && using == true) {
                imgIcon.visible = true;
                var usingSkillId = zj.TableBaseGeneral.Item(zj.PlayerHunterSystem.GetGeneralId(thisOne.generalId)).break_skill[i - 1][0]; // hunterInfo.using_break_skill[i - 1];
                var talentInfo = zj.TableGeneralTalent.Item(usingSkillId);
                var framePath = zj.UIConfig.UIConfig_Hunter_break.aptitude[0]; //hunterInfo.break_level - (i * 3) - 1
                var iconPath = talentInfo.path;
                imgIcon.source = zj.cachekey(iconPath, thisOne);
                imgFrame.source = zj.cachekey(framePath, thisOne);
                thisOne["btnSkill" + i].visible = false;
                thisOne["iock" + i].visible = false;
                thisOne["uniconHint" + i].visible = false;
                // } else {
                //     imgIcon.visible = false;
                //     // 设置技能阶级图片
                //     let framePath = "";
                if ((i - 1) * 3 >= hunterInfo.break_level && using == false) {
                    //         framePath = UIConfig.UIConfig_Hunter_break.buttonStepSkillNor[i - 1];
                    //         this["btnSkill" + i].visible = false;
                    //         Set.ButtonBackgroud(this["btnSkill" + i], "ui_hunter_break_ButtonSkill1Dis_png", "ui_hunter_break_ButtonSkill1Dis_png", );
                    this_1["iock" + i].visible = true;
                    this_1["uniconHint" + i].visible = true;
                }
                else {
                    //         framePath = UIConfig.UIConfig_Hunter_break.buttonStepSkillSel[i - 1];
                    //         Set.ButtonBackgroud(this["btnSkill" + i], "ui_hunter_break_ButtonSkill1Nor_png", "ui_hunter_break_ButtonSkill1Nor_png", );
                    //         this["btnSkill" + i].visible = false;
                    //         this["btnSkill" + i];
                    this_1["iock" + i].visible = false;
                    this_1["uniconHint" + i].visible = false;
                }
                //     imgFrame.source = cachekey(framePath, this);
                // }
                var node = group.getChildByName("groupLeftBottomItem-dragonBones");
                if (node != null) {
                    group.removeChild(node);
                }
                if ((i - 1) * 3 <= thisOne.breakLevel && using == false) {
                    zj.Game.DragonBonesManager.playAnimation(this_1, "tupo_eff", "armatureName", "005_jineng_faguang", 0)
                        .then(function (display) {
                        display.x = group.width / 2;
                        display.y = group.height / 2;
                        display.name = "groupLeftBottomItem-dragonBones";
                        group.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            };
            var this_1 = this;
            for (var i = 1; i <= 3; i++) {
                _loop_1(i);
            }
        };
        /** 突破加成 */
        HunterBreak.prototype.setAttributeInfo = function () {
            this.imgAwakenTime.visible = true;
            // this.groupCurrentHunter.visible = true;
            // this.groupAwakenMaxHunter.visible = false;
            this.groupNextHunter.visible = true;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            // 设置当前猎人和下级猎人信息
            zj.Helper.GetBreakLevelToPath(this.spriteCurrentBreak, hunterInfo.break_level);
            zj.Helper.GetBreakLevelToPath(this.spriteNextBreak, hunterInfo.break_level + 1);
            // 突破次数
            var awakenTimePath = zj.UIConfig.UIConfig_Hunter_break.break_level[this.breakLevel - 1];
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            var breakSkillPath = zj.UIConfig.UIConfig_Hunter_break.BreakSkillIcon[this.breakLevel - 1]; // 第三行内容 设置突破效果信息
            this.imgAwakenTime.source = zj.cachekey(awakenTimePath, this);
            this.spriteFrameCurrentHunter.source = zj.cachekey(framePath, this);
            this.spriteFrameNextHunter.source = zj.cachekey(framePath, this);
            this.spriteIconCurrentHunter.source = zj.cachekey(headPath, this);
            this.spriteIconNextHunter.source = zj.cachekey(headPath, this);
            this.spriteAwakenCurrentLevelIcon.source = zj.cachekey(gradePath, this);
            this.spriteAwakenNextLevelIcon.source = zj.cachekey(gradePath, this);
            // this.spriteIconBreakSkill.source = cachekey(breakSkillPath, this);
            this.labelLevelCurrentHunter.text = String(hunterInfo.level);
            this.labelLevelNextHunter.text = String(hunterInfo.level);
            zj.Helper.SetHeroAwakenStar(this.nodeStarCurrentHunter, hunterInfo.star, hunterInfo.awakePassive.level);
            zj.Helper.SetHeroAwakenStar(this.nodeStarNextHunter, hunterInfo.star, hunterInfo.awakePassive.level);
            // 隐藏/显示第一行 `group2-5` 信息
            // for (let i = 2; i < 6; i++) {
            //     let group = this.nodeInfoTop.getChildByName(`nodeProperty${i}`) as eui.Group;
            //     group.visible = (this.breakLevel != 1);
            // }
            // let add_skill_level = TableGeneralBreakup.Item(this.breakLevel).add_skillLevel;
            // if (this.breakLevel == 1) { // 一阶突破 
            //     this.nodeInfoMiddle.visible = false;
            //     this.spriteLine2.visible = false;
            //     if (breakInfo.add_level == 0) {
            //         this.labelAtt2.visible = (false)
            //     } else {
            //         this.labelAtt2.visible = (true)
            //     }
            //     this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, level);
            //     if (add_skill_level != 0) {
            //         this.nodeInfoMiddle.visible = true;
            //         this.spriteLine2.visible = true;
            //         this.spriteAttAddNext4.visible = false;
            //         this.labelAtt3.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, add_skill_level);
            //     } else {
            //         let gaps = this.nodeInfoMiddle.height * 0.5;
            //         this.nodeInfoTop.height = this.nodeInfoTopHeight + gaps;
            //         this.spriteLine1.y += gaps;
            //         this.nodeInfoBottom.y -= gaps;
            //         this.nodeInfoBottom.height += gaps;
            //     }
            //     // 设置第一行 group1 内容
            //     for (let i = 0; i < attri.length; i++) {
            //         let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
            //         labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[des[i]], attri[i]);
            //     }
            // } else if (this.breakLevel == 2 || this.breakLevel == 3) { // 二阶、三阶突破 
            //     this.nodeInfoMiddle.visible = true;
            //     this.spriteLine2.visible = true;
            //     this.nodeInfoTop.height = this.nodeInfoTopHeight;
            //     this.spriteLine1.y = this.nodeInfoTop.y + this.nodeInfoTopHeight;
            //     this.nodeInfoMiddle.y = this.spriteLine1.y + this.spriteLine1.height;
            //     this.spriteLine2.y = this.nodeInfoMiddle.y + this.nodeInfoMiddle.height;
            //     this.nodeInfoBottom.y = this.spriteLine2.y + this.spriteLine2.height;
            //     this.nodeInfoBottom.height = this.nodeInfoTopHeight;
            //     // 设置第一行内容
            //     for (let i = 0; i < attri.length; i++) {
            //         let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
            //         labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[desNext[i]], attriNext[i]);
            //         let labelAttriAddNext = this.nodeProperty3.getChildByName(`labelAttriAddNext${i + 1}`) as eui.Label;
            //         labelAttriAddNext.text = String(attri[i]);
            //         let labelAttriAdd = this.nodeProperty5.getChildByName(`labelAttriAdd${i + 1}`) as eui.Label;
            //         labelAttriAdd.text = String(attri[i] - attriNext[i]);
            //     }
            //     if (add_skill_level != 0) {
            //         this.NodeLevel2.visible = true;
            //         this.NodeLevel1.y = 13;
            //         this.labelAtt3.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, add_skill_level);
            //     } else {
            //         this.NodeLevel1.y = 25;
            //         this.NodeLevel2.visible = false;
            //     }
            //     // 设置第二行内容
            //     this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, (this.breakLevel == 2) ? level : levelPre);
            // }
            var _a = zj.PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel), attri = _a[0], des = _a[1];
            var attriNext = null;
            var desNext = null;
            if (this.breakLevel != 1) {
                _b = zj.PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel - 1), attriNext = _b[0], desNext = _b[1];
                // 设置第一行内容
                for (var i = 0; i < attri.length; i++) {
                    var labelAttri = this.nodeProperty1.getChildByName("labelAttri" + (i + 1));
                    labelAttri.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[desNext[i]], attriNext[i]);
                    // let labelAttriAddNext = this.nodeProperty3.getChildByName(`labelAttriAddNext${i + 1}`) as eui.Label;
                    // labelAttriAddNext.text = String(attri[i]);
                    // let labelAttriAdd = this.nodeProperty5.getChildByName(`labelAttriAdd${i + 1}`) as eui.Label;
                    // labelAttriAdd.text = String(attri[i] - attriNext[i]);
                }
            }
            else {
                this.nodeProperty2.visible = false;
                // this.nodeProperty3.visible = false;
                this.nodeProperty4.visible = false;
                this.nodeProperty5.visible = false;
                var _c = zj.PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel), level = _c[0], levelNext = _c[1], levelPre = _c[2];
                if (breakInfo.add_level == 0) {
                    this.labelAtt2.visible = (false);
                }
                else {
                    this.labelAtt2.visible = (true);
                }
                this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.levelMax, level);
                // 设置第一行 group1 内容
                for (var i = 0; i < attri.length; i++) {
                    var labelAttri = this.nodeProperty1.getChildByName("labelAttri" + (i + 1));
                    labelAttri.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[des[i]], attri[i]);
                }
            }
            this.nodeInfoBottom.visible = false;
            this.nodeInfoLeve.visible = false;
            if (this.breakLevel == 1 || this.breakLevel == 4 || this.breakLevel == 7) {
                this.nodeInfoBottom.visible = true;
                this.labelInfoAwakenSkill.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.skillBreak, zj.Helper.GetNumCH(String(this.breakLevel)));
            }
            else if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8 || this.breakLevel == 3 || this.breakLevel == 6 || this.breakLevel == 9) {
                this.nodeInfoLeve.visible = true;
                var lv = void 0;
                if (this.breakLevel <= 3) {
                    lv = 0;
                }
                else if (this.breakLevel <= 6) {
                    lv = 1;
                }
                else if (this.breakLevel <= 9) {
                    lv = 2;
                }
                this.labelAtt1.text = "突破技：" + zj.TableGeneralTalent.Item(zj.Game.PlayerHunterSystem.queryHunter(this.generalId).using_break_skill[lv]).talent_name + " 等级+" + 1;
                if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8) {
                    this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, zj.TableGeneralBreakup.Item(this.breakLevel).add_skillLevel);
                }
                else {
                    this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.levelMax, zj.TableGeneralBreakup.Item(this.breakLevel).add_level);
                }
            }
            this.lableGoldNum.text = String(breakInfo.consume);
            var _b;
        };
        HunterBreak.prototype.setAttributeInfoMax = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            this.imgAwakenTime.visible = false;
            this.groupCurrentHunter.visible = false;
            this.groupAwakenMaxHunter.visible = true;
            this.groupNextHunter.visible = false;
            var framePath = zj.PlayerHunterSystem.Frame(this.generalId);
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.spriteFrameAwakenSkillMax.source = zj.cachekey(framePath, this);
            this.spriteIconAwakenSkillMax.source = zj.cachekey(headPath, this);
            this.spriteAwakenMaxLevelIcon.source = zj.cachekey(gradePath, this);
            this.labelLevelAwakenSkillMax.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.nodeStarMaxHunter, hunterInfo.star, hunterInfo.awakePassive.level);
            zj.Helper.GetBreakLevelToPath(this.spriteMaxBreak, zj.CommonConfig.general_max_break);
            //设置第一行内容
            for (var i = 2; i < 6; i++) {
                var group = this.nodeInfoTop.getChildByName("nodeProperty" + i);
                group.visible = false;
            }
            // 设置第二行内容
            var _a = zj.PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel), levelNext = _a[1];
            this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.levelMax, levelNext - 1);
            var add_skill_level = zj.TableGeneralBreakup.Item(this.breakLevel).add_skillLevel;
            // this.labelAtt3.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, add_skill_level);
            // 设置第三行内容
            // this.nodeInfoBottom.visible = false;
            // this.nodeBreakMaxSkill.visible = true;
            this.labelInfoAwakenSkill.text = zj.TextsConfig.TextsConfig_Hunter_Break.allSkillBreak;
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            var _b = zj.PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel), attri = _b[0], des = _b[1];
            var attriNext = null;
            var desNext = null;
            if (this.breakLevel != 1) {
                _c = zj.PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel - 1), attriNext = _c[0], desNext = _c[1];
                // 设置第一行内容
                for (var i = 0; i < attri.length; i++) {
                    var labelAttri = this.nodeProperty1.getChildByName("labelAttri" + (i + 1));
                    labelAttri.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[desNext[i]], attriNext[i]);
                    // let labelAttriAddNext = this.nodeProperty3.getChildByName(`labelAttriAddNext${i + 1}`) as eui.Label;
                    // labelAttriAddNext.text = String(attri[i]);
                    // let labelAttriAdd = this.nodeProperty5.getChildByName(`labelAttriAdd${i + 1}`) as eui.Label;
                    // labelAttriAdd.text = String(attri[i] - attriNext[i]);
                }
            }
            else {
                var _d = zj.PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel), level = _d[0], levelNext_1 = _d[1], levelPre = _d[2];
                if (breakInfo.add_level == 0) {
                    this.labelAtt2.visible = (false);
                }
                else {
                    this.labelAtt2.visible = (true);
                }
                this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.levelMax, level);
                // 设置第一行 group1 内容
                for (var i = 0; i < attri.length; i++) {
                    var labelAttri = this.nodeProperty1.getChildByName("labelAttri" + (i + 1));
                    labelAttri.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[des[i]], attri[i]);
                }
            }
            this.nodeProperty2.visible = false;
            this.nodeProperty4.visible = false;
            this.nodeProperty5.visible = false;
            this.nodeInfoBottom.visible = false;
            this.nodeInfoLeve.visible = false;
            if (this.breakLevel == 1 || this.breakLevel == 4 || this.breakLevel == 7) {
                this.nodeInfoBottom.visible = true;
                this.labelInfoAwakenSkill.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.skillBreak, zj.Helper.GetNumCH(String(this.breakLevel)));
            }
            else if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8 || this.breakLevel == 3 || this.breakLevel == 6 || this.breakLevel == 9) {
                this.nodeInfoLeve.visible = true;
                var lv = void 0;
                if (this.breakLevel <= 3) {
                    lv = 0;
                }
                else if (this.breakLevel <= 6) {
                    lv = 1;
                }
                else if (this.breakLevel <= 9) {
                    lv = 2;
                }
                this.labelAtt1.text = "突破技：" + zj.TableGeneralTalent.Item(zj.Game.PlayerHunterSystem.queryHunter(this.generalId).using_break_skill[lv]).talent_name + " 等级+" + 1;
                var _e = zj.PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel), levelAdd = _e[0];
                if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8) {
                    this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, zj.TableGeneralBreakup.Item(this.breakLevel).add_skillLevel);
                }
                else {
                    this.labelAtt2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.levelMax, zj.TableGeneralBreakup.Item(this.breakLevel).add_level);
                }
            }
            var _c;
        };
        /** 设置猎人信息 */
        HunterBreak.prototype.setHunterInfo = function () {
            var baseInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var roleInfo = zj.PlayerHunterSystem.MapInstance(zj.PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId));
            var stepInfo = zj.PlayerHunterSystem.GetStep(this.generalId);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            var typePath = zj.UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            var namePath = baseInfo.name_pic;
            var titlePath = stepInfo.name_path;
            var hunterPath = roleInfo.half_path;
            this.imgGrade.source = zj.cachekey(gradePath, this);
            this.imgType.source = zj.cachekey(typePath, this);
            this.imgHunterName.source = zj.cachekey(namePath, this);
            this.imgTitle.source = zj.cachekey(titlePath, this);
            this.imgHunter.source = zj.cachekey(hunterPath, this);
            var maxLevel = 0;
            var _a = [null, null], level = _a[0], levelNext = _a[1];
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.break_level != 0) {
                _b = zj.PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level), level = _b[0], levelNext = _b[1];
                maxLevel = 60 + levelNext;
            }
            else {
                maxLevel = stepInfo.max_level;
            }
            this.lableHunterLevel.text = hunterInfo.level.toString() + "/" + maxLevel.toString();
            var star = baseInfo.init_star;
            if (hunterInfo.level != 0) {
                star = hunterInfo.star;
            }
            for (var i = 1; i < 7; i++) {
                var img = this.groupGet.getChildByName("spriteStar" + i);
                if (i <= star) {
                    img.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroAwakenStar[hunterInfo.awakePassive.level + 1], this);
                }
                else {
                    img.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroAwakenStar[0], this);
                }
            }
            var _b;
        };
        HunterBreak.prototype.onBtnReturn = function () {
            zj.PlayerHunterSystem.breakSelectedGenerals = [];
            zj.PlayerHunterSystem.breakSelectedGenerals1 = [];
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /** 获取材料路径 */
        HunterBreak.prototype.onBtnMaterials = function () {
            var _this = this;
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            if (breakInfo == null)
                return;
            var goodsId = breakInfo.exchange_store[0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(goodsId, _this, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /** 触摸显示材料详情信息 */
        HunterBreak.prototype.onShowMaterials = function () {
            var _this = this;
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(this.breakLevel);
            if (breakInfo == null)
                return;
            var goodsId = breakInfo.exchange_store[0];
            var counts = breakInfo.exchange_store[1];
            zj.loadUI(zj.Common_DesProp)
                .then(function (dialog) {
                _this.desProp = dialog;
                _this.desProp.setInfo(goodsId, counts);
                _this.groupRight.addChild(_this.desProp);
                _this.desPropVisible = true;
                // 调整坐标
                _this.desProp.y = _this.groupRightBottom.y - _this.desProp.height;
                if (_this.desProp.y < 0) {
                    _this.desProp.y = 0;
                }
                _this.desProp.x = _this.nodeMeterial.x + _this.nodeMeterial.width * 0.5 - _this.desProp.width * 0.5;
            });
        };
        HunterBreak.prototype.onTouchEnd = function () {
            this.groupvis1 = false;
            this.groupLeftBottomItem1.scaleX = this.groupLeftBottomItem1.scaleY = 1;
            this.groupvis2 = false;
            this.groupLeftBottomItem2.scaleX = this.groupLeftBottomItem2.scaleY = 1;
            this.groupvis3 = false;
            this.groupLeftBottomItem3.scaleX = this.groupLeftBottomItem3.scaleY = 1;
            if (this.desPropVisible == true) {
                this.groupRight.removeChild(this.desProp);
                this.desPropVisible = false;
            }
            var obj = this.getChildByName("hunter-break-skill-talent-des");
            if (obj)
                this.removeChild(obj);
        };
        /** 添加技能 */
        HunterBreak.prototype.onAddSkill = function (type) {
            var _this = this;
            this.type = type;
            var star = 0;
            var break1 = 0;
            if (type == 0) {
                star = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            }
            else {
                star = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }
            zj.loadUI(zj.HunterBreakPopDialog)
                .then(function (popDialog) {
                popDialog.setHunterBreak(_this.generalId, _this.breakLevel, star, break1, function (isClose) {
                    if (isClose) {
                        zj.PlayerHunterSystem.breakSelectedGenerals = [];
                    }
                    else {
                        _this.setBreakConsume();
                    }
                }, type, _this);
                popDialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterBreak.prototype.onBtnBreakSkill1 = function () {
            // if (this.iock1.visible == false) {
            // this.onShowBreakSkill(1);
            // }
        };
        HunterBreak.prototype.onBtnBreakSkill2 = function () {
            // if (this.iock2.visible == false) {
            // this.onShowBreakSkill(2);
            // }
        };
        HunterBreak.prototype.onBtnBreakSkill3 = function () {
            // if (this.iock3.visible == false) {
            // this.onShowBreakSkill(3);
            // }
        };
        /**
         * 显示技能对话框
         * @param index 索引 1-3
         */
        HunterBreak.prototype.onShowBreakSkill = function (index) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var level = 0;
            if (index == 1) {
                level = hunterInfo.break_level <= 3 ? hunterInfo.break_level : 3;
            }
            else if (index == 2) {
                level = hunterInfo.break_level - 3 <= 3 ? hunterInfo.break_level - 3 : 3;
            }
            else if (index == 3) {
                level = hunterInfo.break_level - 6 <= 3 ? hunterInfo.break_level - 6 : 3;
            }
            this.onListItemTouch(zj.TableBaseGeneral.Item(zj.PlayerHunterSystem.GetGeneralId(this.generalId)).break_skill[index - 1][0], level, index);
        };
        HunterBreak.prototype.onListItemTouch = function (skillId, breakLevel, index) {
            var _this = this;
            if (!skillId) {
                return;
            }
            var point = this.localToGlobal(this["groupLeftBottom"].x, this["groupLeftBottom"].y);
            zj.loadUI(zj.CommonDesTalent).then(function (ui) {
                ui.setInfoByBreak(skillId, breakLevel);
                ui.name = "hunter-break-skill-talent-des";
                ui.x = point.x + (index - 1) + 120;
                ui.y = point.y - 200;
                _this.addChild(ui);
            });
        };
        HunterBreak.prototype.onBtnFirstAwaken = function () {
            var _this = this;
            // this.startAni();
            // return;
            var star = 0;
            var break1 = 0;
            if (this.type == 0) {
                star = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            }
            else {
                star = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = zj.PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }
            var breakHunterList = [];
            var breakInfos1 = zj.PlayerHunterSystem.GetCanBreakHunter(star, this.generalId, break1);
            for (var i = 0; i < zj.PlayerHunterSystem.breakSelectedGenerals1.length; i++) {
                var vv = zj.PlayerHunterSystem.breakSelectedGenerals1[i];
                // for (let j = 0; j < breakInfos1.length; j++) {
                //     let v = breakInfos1[j];
                //     if (vv == v.general_id) {
                breakHunterList.push(vv);
                //     }
                // }
            }
            var breakInfos = zj.PlayerHunterSystem.GetCanBreakHunter(star, this.generalId, break1);
            for (var i = 0; i < zj.PlayerHunterSystem.breakSelectedGenerals.length; i++) {
                var vv = zj.PlayerHunterSystem.breakSelectedGenerals[i];
                // for (let j = 0; j < breakInfos.length; j++) {
                //     let v = breakInfos[j];
                //     if (vv == v.general_id) {
                breakHunterList.push(vv);
                // }
                // }
            }
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            if (baseGeneralInfo.aptitude < zj.PlayerHunterSystem.HunterBreak(this.breakLevel).condition_aptitude[0]) {
                zj.toast_warning("猎人资质不满足突破条件");
                return;
            }
            if (this.breakLevel >= 6 && zj.Game.PlayerHunterSystem.queryHunter(this.generalId).transfer_level < zj.PlayerHunterSystem.HunterBreak(this.breakLevel).condition_transfer) {
                zj.toast_warning("猎人未变身不满足突破条件");
                return;
            }
            var lastBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            var p = zj.Game.PlayerHunterSystem.generalBreak(this.generalId, breakHunterList);
            p.then(function () {
                zj.PlayerHunterSystem.breakSelectedGenerals = [];
                zj.PlayerHunterSystem.breakSelectedGenerals1 = [];
                _this.refreshInfo();
                _this.startAni();
                _this.setAttributeInfo();
                _this.setBreakConsume();
                _this.promptBattle(lastBattleValue);
                if (_this.callback)
                    _this.callback(true);
            });
        };
        HunterBreak.prototype.promptBattle = function (lastBattleValue) {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.battleValue > lastBattleValue) {
                zj.CommonTipBmfont.promptBattleValue(lastBattleValue, hunterInfo.battleValue);
            }
            // let [currentBattleValue, breakBattleValue] = PlayerHunterSystem.GeneralBreakBattleValue(hunterInfo);
            // if (currentBattleValue < breakBattleValue && currentBattleValue > 0) { // 提示战斗力提升
            //     CommonTipBmfont.promptBattleValue(currentBattleValue, breakBattleValue);
            // }
        };
        /** 满级动画 */
        HunterBreak.prototype.maxAni = function () {
            var _this = this;
            var bones = [this.groupAwakenMaxHunter];
            var solts = ["000_touxiang2"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null, bones, solts).then(function (display) {
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                display.armature.animation.play("002_tupo_manji", 1);
                display.x = _this.groupHunter.width * 0.5;
                display.y = _this.groupHunter.height * 0.5;
                _this.groupHunter.addChild(display);
            });
        };
        /** 待机动画 */
        HunterBreak.prototype.waitAni = function () {
            var _this = this;
            var bones = [this.groupCurrentHunter, this.groupNextHunter, this.imgAwakenTime];
            var solts = ["000_touxiang1", "000_touxiang2", "000_wenzi_qian"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null, bones, solts).then(function (display) {
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                display.armature.animation.play("000_topo_dj", 0);
                display.x = _this.groupHunter.width * 0.5;
                display.y = _this.groupHunter.height * 0.5;
                _this.groupHunter.addChild(display);
            });
        };
        HunterBreak.prototype.startAni = function () {
            var _this = this;
            var bones = [this.groupCurrentHunter, this.groupNextHunter, this.imgAwakenTime];
            var solts = ["000_touxiang1", "000_touxiang2", "000_wenzi_hou"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null, bones, solts).then(function (display) {
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                display.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    _this.startAttributeAni(function () {
                        _this.startAttributeAniNext();
                    }, _this);
                }, _this);
                display.x = _this.groupHunter.width * 0.5;
                display.y = _this.groupHunter.height * 0.5;
                _this.groupHunter.removeChildren();
                _this.groupHunter.addChild(display);
                display.armature.animation.play("001_tupo_kaishi", 1);
            });
        };
        HunterBreak.prototype.startAttributeAni = function (cb, thisObj, index) {
            var _this = this;
            if (index === void 0) { index = 0; }
            var p = zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, "tupo_eff", null);
            p.then(function (display) {
                display.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    // display.animation.stop();
                    // display.animation.reset();
                    // display.armature.dispose();
                    // display.dbClear();
                    // display.dispose(true);
                    zj.setDragonBonesRemove(display);
                    if (display.parent)
                        display.parent.removeChild(display);
                    if (index == 0) {
                        index += 1;
                        _this.startAttributeAni(cb, thisObj, index);
                    }
                    else {
                        if (cb)
                            cb.call(thisObj);
                    }
                }, _this);
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                zj.setDragonBonesRemove(display);
                display.animation.play("003_shuxing", 1);
                if (index == 0) {
                    display.x = _this.nodeInfoTop.width * 0.5;
                    display.y = _this.nodeInfoTop.height * 0.5;
                    _this.nodeInfoTop.addChild(display);
                }
                else if (index == 1) {
                    display.x = _this.nodeInfoBottom.width * 0.5;
                    display.y = _this.nodeInfoBottom.height * 0.5;
                    _this.nodeInfoBottom.addChild(display);
                }
            });
        };
        HunterBreak.prototype.startAttributeAniNext = function () {
            // loadUI(HunterBreakSkillUnlock).then((dialog: HunterBreakSkillUnlock) => {
            //     dialog.setInfo(this.generalId, () => {
            //         egret.setTimeout(() => {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.onShowBreakSkill(hunterInfo.break_level);
            //         }, this, 500);
            //     });
            //     dialog.show(UI.SHOW_FROM_TOP);
            // });
        };
        return HunterBreak;
    }(zj.Dialog));
    zj.HunterBreak = HunterBreak;
    __reflect(HunterBreak.prototype, "zj.HunterBreak");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreak.js.map