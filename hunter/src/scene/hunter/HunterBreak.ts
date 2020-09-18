namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-4
     * 
     * @class 猎人突破界面
     */
    export class HunterBreak extends Dialog {
        public groupLeft: eui.Group;
        public imgHunter: eui.Image;
        public imgGrade: eui.Image;
        public imgType: eui.Image;
        public groupGet: eui.Group;
        public imgHunterName: eui.Image;
        public imgTitle: eui.Image;
        public spriteStar1: eui.Image;
        public spriteStar2: eui.Image;
        public spriteStar3: eui.Image;
        public spriteStar4: eui.Image;
        public spriteStar5: eui.Image;
        public spriteStar6: eui.Image;
        public lableHunterLevel: eui.Label;
        public groupLeftBottom: eui.Group;
        public groupLeftBottom1: eui.Group;
        public groupLeftBottomItem1: eui.Group;
        public spriteFrame1: eui.Image;
        public spriteIcon1: eui.Image;
        public labelSkillLevel1: eui.Label;
        public btnSkill1: eui.Button;
        public spriteRed1: eui.Image;
        public iock1: eui.Image;
        public uniconHint1: eui.Label;
        public groupLeftBottom2: eui.Group;
        public groupLeftBottomItem2: eui.Group;
        public spriteFrame2: eui.Image;
        public spriteIcon2: eui.Image;
        public labelSkillLevel2: eui.Label;
        public btnSkill2: eui.Button;
        public spriteRed2: eui.Image;
        public iock2: eui.Image;
        public uniconHint2: eui.Label;
        public groupLeftBottom3: eui.Group;
        public groupLeftBottomItem3: eui.Group;
        public spriteFrame3: eui.Image;
        public spriteIcon3: eui.Image;
        public labelSkillLevel3: eui.Label;
        public btnSkill3: eui.Button;
        public spriteRed3: eui.Image;
        public iock3: eui.Image;
        public uniconHint3: eui.Label;
        public groupRight: eui.Group;
        public groupHunter: eui.Group;
        public imgAwakenTime: eui.Image;
        public groupCurrentHunter: eui.Group;
        public spriteFrameCurrentHunter: eui.Image;
        public spriteIconCurrentHunter: eui.Image;
        public labelLevelCurrentHunter: eui.Label;
        public spriteCurrentBreak: eui.Image;
        public spriteAwakenCurrentLevelIcon: eui.Image;
        public nodeStarCurrentHunter: eui.Group;
        public groupNextHunter: eui.Group;
        public spriteFrameNextHunter: eui.Image;
        public spriteIconNextHunter: eui.Image;
        public labelLevelNextHunter: eui.Label;
        public spriteNextBreak: eui.Image;
        public spriteAwakenNextLevelIcon: eui.Image;
        public nodeStarNextHunter: eui.Group;
        public groupAwakenMaxHunter: eui.Group;
        public spriteFrameAwakenSkillMax: eui.Image;
        public spriteIconAwakenSkillMax: eui.Image;
        public labelLevelAwakenSkillMax: eui.Label;
        public spriteMaxBreak: eui.Image;
        public spriteAwakenMaxLevelIcon: eui.Image;
        public nodeStarMaxHunter: eui.Group;
        public nodeInfo: eui.Group;
        public spriteBreakInfoTitle: eui.Image;
        public nodeInfoTop: eui.Group;
        public spriteIconProperty: eui.Image;
        public nodeProperty1: eui.Group;
        public labelAttri1: eui.Label;
        public labelAttri2: eui.Label;
        public nodeProperty2: eui.Group;
        public spriteAttAddNext1: eui.Image;
        public spriteAttAddNext2: eui.Image;
        public nodeProperty3: eui.Group;
        public labelAttriAddNext1: eui.Label;
        public labelAttriAddNext2: eui.Label;
        public nodeProperty4: eui.Group;
        public spriteAttAdd1: eui.Image;
        public spriteAttAdd2: eui.Image;
        public nodeProperty5: eui.Group;
        public labelAttriAdd1: eui.Label;
        public labelAttriAdd2: eui.Label;
        public spriteLine1: eui.Image;
        public nodeInfoLeve: eui.Group;
        public spriteIconLevelUp0: eui.Image;
        public labelAtt1: eui.Label;
        public labelAtt2: eui.Label;
        public nodeInfoBottom: eui.Group;
        public spriteIconBreakSkill: eui.Image;
        public labelInfoAwakenSkill: eui.Label;
        public groupRightBottom: eui.Group;
        public labelBreakRole: eui.Label;
        public spriteBreakMax: eui.Image;
        public nodeUpLevel: eui.Group;
        public nodeMeterial: eui.Group;
        public spriteFrameMeterials: eui.Image;
        public spriteIconMeterials: eui.Image;
        public spriteMakeMeterials: eui.Image;
        public spriteAddMeterials: eui.Image;
        public labelNumMeterials: eui.Label;
        public btnMaterials: eui.Button;
        public nodeSkill: eui.Group;
        public spriteFrameSkillFragment: eui.Image;
        public spriteIconSkillFragment: eui.Image;
        public spriteMakeSkillFragment: eui.Image;
        public spriteAddSkillFragment: eui.Image;
        public nodeBreakStar: eui.Group;
        public labelNumSkillFragment: eui.Label;
        public labelBreakLevel: eui.Label;
        public spriteBreakAwaken: eui.Image;
        public nodeSkill0: eui.Group;
        public spriteFrameSkillFragment1: eui.Image;
        public spriteIconSkillFragment1: eui.Image;
        public spriteMakeSkillFragment1: eui.Image;
        public spriteAddSkillFragment1: eui.Image;
        public nodeBreakStar1: eui.Group;
        public labelNumSkillFragment1: eui.Label;
        public labelBreakLevel0: eui.Label;
        public spriteBreakAwaken1: eui.Image;
        public btnFirstAwaken: eui.Button;
        public lableGoldNum: eui.Label;
        public groupMoney: eui.Group;
        public groupMoney2: eui.Group;
        public labelIntegrate: eui.Label;
        public btnAddGold: eui.Button;
        public groupMoney1: eui.Group;
        public labelToken: eui.Label;
        public btnAdddiamond: eui.Button;
        public btnReturn: eui.Button;

        private generalId: number = null;
        private breakLevel: number = null;
        private isLongShow = true;
        private desProp: Common_DesProp;
        private desPropVisible: boolean = false;
        private callback: (isBreakSuccess?: boolean, isUpLevelSuccess?: boolean) => void;
        private nodeInfoTopHeight: number = 0;
        //判断技能是否点击
        private groupvis1: boolean = false;
        private groupvis2: boolean = false;
        private groupvis3: boolean = false;
        private update: number;
        /**0:任意1：同名 */
        private type: number = 0;
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakSkin.exml";
            this.init();
            if (Device.isReviewSwitch) {
                this.btnAddGold.visible = false;
            }
        }

        private init() {
            let centerX = UIManager.StageWidth * 0.5;
            this.groupLeft.x = (centerX - this.groupLeft.width - 20) < 0 ? 0 : (centerX - this.groupLeft.width - 20);
            this.groupRight.x = centerX;

            let tap = egret.TouchEvent.TOUCH_TAP;
            this.groupLeftBottomItem1.addEventListener(tap, this.onBtnBreakSkill1, this);
            this.groupLeftBottomItem2.addEventListener(tap, this.onBtnBreakSkill2, this);
            this.groupLeftBottomItem3.addEventListener(tap, this.onBtnBreakSkill3, this);

            this.groupLeftBottomItem1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.groupvis1 = true;
                this.groupLeftBottomItem1.scaleX = this.groupLeftBottomItem1.scaleY = 1.1;
                this.onShowBreakSkill(1);
            }, this);
            this.groupLeftBottomItem2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.groupvis2 = true;
                this.groupLeftBottomItem2.scaleX = this.groupLeftBottomItem2.scaleY = 1.1;
                this.onShowBreakSkill(2);
            }, this);
            this.groupLeftBottomItem3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.groupvis3 = true;
                this.groupLeftBottomItem3.scaleX = this.groupLeftBottomItem3.scaleY = 1.1;
                this.onShowBreakSkill(3);
            }, this);
            let a = (e: egret.TouchEvent) => {
                if (this.groupvis1 == true) {
                    let one = this.groupLeftBottomItem1;
                    let one1 = this.groupLeftBottomItem1.localToGlobal(one.x, one.y);
                    one1.x -= Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    } else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
                if (this.groupvis2 == true) {
                    let one = this.groupLeftBottomItem2;
                    let one1 = this.groupLeftBottomItem2.localToGlobal(one.x, one.y);
                    one1.x -= Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    } else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
                if (this.groupvis3 == true) {
                    let one = this.groupLeftBottomItem3;
                    let one1 = this.groupLeftBottomItem3.localToGlobal(one.x, one.y);
                    one1.x -= Game.UIManager.x;
                    if (Math.floor(Math.abs(e.stageX - one1.x)) < one.width / 2 && Math.floor(Math.abs(e.stageY - one1.y)) < one.height / 2) {
                        one.scaleX = one.scaleY = 1.1;
                    } else {
                        one.scaleX = one.scaleY = 1;
                    }
                }
            }
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, a, this)

            this.btnReturn.addEventListener(tap, this.onBtnReturn, this);
            this.btnFirstAwaken.addEventListener(tap, this.onBtnFirstAwaken, this);

            this.btnMaterials.addEventListener(tap, this.onBtnMaterials, this);
            this.nodeMeterial.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                if (this.spriteAddMeterials.visible == true) {
                    this.onBtnMaterials();
                } else {
                    this.onShowMaterials();
                }
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.nodeSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.onAddSkill(0);
            }, this);
            this.nodeSkill0.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.onAddSkill(1);
            }, this);

            this.nodeInfoTopHeight = this.nodeInfoTop.height;
            this.update = egret.setInterval(this.Update, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
                egret.Tween.removeTweens(this);
            }, this);
            egret.Tween.get(this).wait(10).call(() => {
                this.Update();
            })
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);

        }

        public isFullScreen() {
            return true;
        }
        private onBtnAddGold() {
            loadUI(HelpGoldDialog)
                .then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        private Update() {
            //钻石数量
            if (Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            } else {
                this.labelIntegrate.text = Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            } else {
                this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
            this.groupMoney.width = this.groupMoney1.width + this.groupMoney2.width + 20;
        }

        /**
         * 设置基本信息
         * 
         * @param id 猎人ID
         * @param cb 回调函数， 猎人突破成功调用
         */
        public setInfo(id: number, cb: (isBreakSuccess?: boolean, isUpLevelSuccess?: boolean) => void) {
            this.generalId = id;
            this.callback = cb;

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;

            this.refreshInfo();
        }

        private refreshInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId)
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            /**是否可变身 */
            let vis = Table.FindF(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
                return v.general_id == this.generalId % 100000;
            })

            if (baseGeneralInfo.aptitude <= 13) {
                this.groupLeftBottom2.visible = false;
                this.groupLeftBottom3.visible = false;
            } else if (baseGeneralInfo.aptitude >= 14 && vis == false) {
                this.groupLeftBottom2.visible = true;
                this.groupLeftBottom3.visible = false;
            } else if (baseGeneralInfo.aptitude >= 14 && vis == true) {
                this.groupLeftBottom3.visible = true;
            }
            if (baseGeneralInfo.aptitude <= 13) {
                CommonConfig.general_max_break = 3;
            } else if (baseGeneralInfo.aptitude >= 14 && vis == false) {
                CommonConfig.general_max_break = 6;
            } else if (baseGeneralInfo.aptitude >= 14 && vis == true) {
                this.groupLeftBottom3.visible = true;
                CommonConfig.general_max_break = 9;
                this.uniconHint3.text = "变身解锁"
            }
            if (hunterInfo.break_level == CommonConfig.general_max_break) {
                this.breakLevel = hunterInfo.break_level;
            } else {
                this.breakLevel = hunterInfo.break_level + 1;
            }

            this.setBreakCondition();

            this.setBreakState();
            let thisone = this;
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

            if (hunterInfo.break_level == CommonConfig.general_max_break) {
                this.setAttributeInfoMax();
                this.maxAni();
            } else {
                this.setAttributeInfo();
                this.setBreakConsume();
                this.waitAni();
            }
            if (hunterInfo.break_level <= 0) {
                this.labelSkillLevel1.text = "" + 0;
                this.labelSkillLevel2.text = "" + 0;
                this.labelSkillLevel3.text = "" + 0;
            } else {
                this.labelSkillLevel1.text = "" + TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[0];
                this.labelSkillLevel2.text = "" + TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[1];
                this.labelSkillLevel3.text = "" + TableGeneralBreakup.Item(hunterInfo.break_level).break_skill_level[2];
            }
        }

        /** 突破条件 */
        private setBreakCondition() {
            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.isLongShow = true;

            if (hunterInfo.break_level == CommonConfig.general_max_break) {
                this.nodeUpLevel.visible = false;
                this.labelBreakRole.visible = false;
                this.spriteBreakMax.visible = true;
            } else if (hunterInfo.level >= breakInfo.condition_level &&
                hunterInfo.awakePassive.level >= breakInfo.condition_awaken) {
                this.nodeUpLevel.visible = true;
                this.labelBreakRole.visible = false;
                this.spriteBreakMax.visible = false;
            } else {
                this.isLongShow = false;
                this.nodeUpLevel.visible = false;
                this.labelBreakRole.visible = true;
                this.spriteBreakMax.visible = false;

                let tbl = [breakInfo.condition_star, breakInfo.condition_level, breakInfo.condition_awaken];
                let str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.breakCondition[this.breakLevel - 1], tbl[this.breakLevel - 1]);
                this.labelBreakRole.textFlow = Util.RichText(str);
            }
        }

        /** 突破消耗 */
        private setBreakConsume() {
            if (this.breakLevel > CommonConfig.general_max_break) {
                this.breakLevel = CommonConfig.general_max_break;
            }

            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);
            let itemCount = PlayerItemSystem.Count(breakInfo.exchange_store[0]);
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);

            let currentNumber = itemCount;
            let enoughNumber = breakInfo.exchange_store[1];

            // set node meterials info
            let meterialsNumString = String(currentNumber) + "/" + String(enoughNumber);
            this.labelNumMeterials.text = meterialsNumString;
            Set.LabelNumberGreenAndRed(this.labelNumMeterials, currentNumber, enoughNumber);

            if (currentNumber >= enoughNumber && this.isLongShow) {
                this.spriteMakeMeterials.visible = false;
                this.spriteAddMeterials.visible = false;
                this.btnMaterials.visible = false;
            } else {
                this.spriteMakeMeterials.visible = true;
                this.spriteAddMeterials.visible = true;
                this.btnMaterials.visible = true;
            }

            let a = () => {
                let aa = [];
                for (let i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 0) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            let b = () => {
                let aa = [];
                for (let i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 1) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            if (a().length == 0) {
                this.nodeSkill.visible = false;
            } else {
                this.nodeSkill.visible = true;
            }
            if (b().length == 0) {
                this.nodeSkill0.visible = false;
            } else {
                this.nodeSkill0.visible = true;
            }
            // set node skill
            let skillFragmentNumString = String(PlayerHunterSystem.breakSelectedGenerals.length) + "/" + String(a().length);
            this.labelNumSkillFragment.text = skillFragmentNumString;
            Set.LabelNumberGreenAndRed(this.labelNumSkillFragment, PlayerHunterSystem.breakSelectedGenerals.length, a().length);
            let skillFragmentNumString1 = String(PlayerHunterSystem.breakSelectedGenerals1.length) + "/" + String(b().length);
            this.labelNumSkillFragment1.text = skillFragmentNumString1;
            Set.LabelNumberGreenAndRed(this.labelNumSkillFragment1, PlayerHunterSystem.breakSelectedGenerals1.length, b().length);

            let level = breakInfo.exchange_level[0];
            this.labelBreakLevel.text = level.toString();

            let isExange = Table.FindF(breakInfo.exchange_generals, function (k, v) {
                return v == 0;
            });
            let table: any = PlayerItemSystem.Table(breakInfo.exchange_store[0]);
            let materialIconPath = table.path;
            let skillFragmentPath = isExange ? UIConfig.UIConfig_General.hunter_donnot_know : PlayerHunterSystem.Head(this.generalId);
            let skillFragmentPath1 = isExange ? PlayerHunterSystem.Head(this.generalId) : UIConfig.UIConfig_General.hunter_donnot_know;
            let awakenPath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];

            this.spriteIconMeterials.source = cachekey(materialIconPath, this);
            this.spriteIconSkillFragment.source = cachekey(skillFragmentPath, this);
            this.spriteIconSkillFragment1.source = cachekey(skillFragmentPath1, this);
            // this.spriteBreakAwaken.visible = (breakInfo.exchange_generals[0] != 0);
            // this.spriteBreakAwaken.source = cachekey(awakenPath, this);
            let star1 = 0;
            let break1 = 0;
            if (this.type == 0) {
                star1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            } else {
                star1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }
            let tbl = PlayerHunterSystem.GetCanBreakHunter(star1, this.generalId, break1);
            this.spriteMakeSkillFragment.visible = (tbl.length != 0);
            let tbl1 = PlayerHunterSystem.GetCanBreakHunter(star1, this.generalId, break1);
            this.spriteMakeSkillFragment1.visible = (tbl1.length != 0);

            let star = breakInfo.exchange_star[breakInfo.exchange_star.length - 1];
            let awaken = breakInfo.exchange_awaken[0];
            Helper.SetHeroAwakenStar(this.nodeBreakStar, star, awaken);
            let star11 = breakInfo.exchange_star[0];
            Helper.SetHeroAwakenStar(this.nodeBreakStar1, star11, awaken);
        }

        /** 技能红点 */
        private setBreakSkillRedDot() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let usingBreakSkills = hunterInfo.using_break_skill;
            for (let i = 1; i <= 3; i++) {
                let group = this["groupLeftBottom" + i].getChildByName(`groupLeftBottomItem${i}`) as eui.Group;
                let img = group.getChildByName(`spriteRed${i}`) as eui.Image;
                if (hunterInfo.break_level >= i) {
                    let can = (usingBreakSkills[i - 1] == 0);
                    img.visible = can;
                } else {
                    img.visible = false;
                }
            }
        }

        /**
         * 突破阶段状态
         * 
         * 设置左侧底部技能部分状态
         */
        private setBreakState() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let thisOne = this;
            for (let i = 1; i <= 3; i++) {
                let group = thisOne["groupLeftBottom" + i].getChildByName(`groupLeftBottomItem${i}`) as eui.Group;
                // 判断技能是否使用
                let using = Table.FindF(hunterInfo.using_break_skill, function (k: number, v: number) {
                    return (v != 0 && Number(k) == (i - 1));
                });

                let imgFrame = group.getChildByName(`spriteFrame${i}`) as eui.Image;
                imgFrame.visible = true;

                let imgIcon = group.getChildByName(`spriteIcon${i}`) as eui.Image;
                // if ((i - 1) * 3 <= hunterInfo.break_level && using == true) {
                imgIcon.visible = true;
                let usingSkillId = TableBaseGeneral.Item(PlayerHunterSystem.GetGeneralId(thisOne.generalId)).break_skill[i - 1][0];// hunterInfo.using_break_skill[i - 1];
                let talentInfo = TableGeneralTalent.Item(usingSkillId);
                let framePath = UIConfig.UIConfig_Hunter_break.aptitude[0];//hunterInfo.break_level - (i * 3) - 1
                let iconPath = talentInfo.path;
                imgIcon.source = cachekey(iconPath, thisOne);
                imgFrame.source = cachekey(framePath, thisOne);
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
                    this["iock" + i].visible = true;
                    this["uniconHint" + i].visible = true;
                } else {
                    //         framePath = UIConfig.UIConfig_Hunter_break.buttonStepSkillSel[i - 1];
                    //         Set.ButtonBackgroud(this["btnSkill" + i], "ui_hunter_break_ButtonSkill1Nor_png", "ui_hunter_break_ButtonSkill1Nor_png", );
                    //         this["btnSkill" + i].visible = false;
                    //         this["btnSkill" + i];
                    this["iock" + i].visible = false;
                    this["uniconHint" + i].visible = false;
                }
                //     imgFrame.source = cachekey(framePath, this);
                // }

                let node = group.getChildByName("groupLeftBottomItem-dragonBones");
                if (node != null) {
                    group.removeChild(node);
                }
                if ((i - 1) * 3 <= thisOne.breakLevel && using == false) {
                    Game.DragonBonesManager.playAnimation(this, "tupo_eff", "armatureName", "005_jineng_faguang", 0)
                        .then(display => {
                            display.x = group.width / 2;
                            display.y = group.height / 2;
                            display.name = "groupLeftBottomItem-dragonBones";
                            group.addChild(display);
                        })
                        .catch(reason => {
                            toast(reason);
                        });
                }
            }
        }

        /** 突破加成 */
        private setAttributeInfo() {
            this.imgAwakenTime.visible = true;
            // this.groupCurrentHunter.visible = true;
            // this.groupAwakenMaxHunter.visible = false;
            this.groupNextHunter.visible = true;

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId)
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);

            // 设置当前猎人和下级猎人信息
            Helper.GetBreakLevelToPath(this.spriteCurrentBreak, hunterInfo.break_level);
            Helper.GetBreakLevelToPath(this.spriteNextBreak, hunterInfo.break_level + 1);

            // 突破次数
            let awakenTimePath = UIConfig.UIConfig_Hunter_break.break_level[this.breakLevel - 1];
            let framePath = PlayerHunterSystem.Frame(this.generalId);
            let headPath = PlayerHunterSystem.Head(this.generalId);
            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            let breakSkillPath = UIConfig.UIConfig_Hunter_break.BreakSkillIcon[this.breakLevel - 1]; // 第三行内容 设置突破效果信息
            this.imgAwakenTime.source = cachekey(awakenTimePath, this);
            this.spriteFrameCurrentHunter.source = cachekey(framePath, this);
            this.spriteFrameNextHunter.source = cachekey(framePath, this);
            this.spriteIconCurrentHunter.source = cachekey(headPath, this);
            this.spriteIconNextHunter.source = cachekey(headPath, this);
            this.spriteAwakenCurrentLevelIcon.source = cachekey(gradePath, this);
            this.spriteAwakenNextLevelIcon.source = cachekey(gradePath, this);
            // this.spriteIconBreakSkill.source = cachekey(breakSkillPath, this);

            this.labelLevelCurrentHunter.text = String(hunterInfo.level);
            this.labelLevelNextHunter.text = String(hunterInfo.level);

            Helper.SetHeroAwakenStar(this.nodeStarCurrentHunter, hunterInfo.star, hunterInfo.awakePassive.level);
            Helper.SetHeroAwakenStar(this.nodeStarNextHunter, hunterInfo.star, hunterInfo.awakePassive.level);



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
            let [attri, des] = PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel);
            let attriNext = null;
            let desNext = null;
            if (this.breakLevel != 1) {
                [attriNext, desNext] = PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel - 1);
                // 设置第一行内容
                for (let i = 0; i < attri.length; i++) {
                    let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
                    labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[desNext[i]], attriNext[i]);

                    // let labelAttriAddNext = this.nodeProperty3.getChildByName(`labelAttriAddNext${i + 1}`) as eui.Label;
                    // labelAttriAddNext.text = String(attri[i]);

                    // let labelAttriAdd = this.nodeProperty5.getChildByName(`labelAttriAdd${i + 1}`) as eui.Label;
                    // labelAttriAdd.text = String(attri[i] - attriNext[i]);
                }
            } else {
                this.nodeProperty2.visible = false;
                // this.nodeProperty3.visible = false;
                this.nodeProperty4.visible = false;
                this.nodeProperty5.visible = false;
                let [level, levelNext, levelPre] = PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel);
                if (breakInfo.add_level == 0) {
                    this.labelAtt2.visible = (false)
                } else {
                    this.labelAtt2.visible = (true)
                }
                this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, level);
                // 设置第一行 group1 内容
                for (let i = 0; i < attri.length; i++) {
                    let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
                    labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[des[i]], attri[i]);
                }


            }

            this.nodeInfoBottom.visible = false;
            this.nodeInfoLeve.visible = false;
            if (this.breakLevel == 1 || this.breakLevel == 4 || this.breakLevel == 7) {
                this.nodeInfoBottom.visible = true;
                this.labelInfoAwakenSkill.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skillBreak, Helper.GetNumCH(String(this.breakLevel)));
            } else if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8 || this.breakLevel == 3 || this.breakLevel == 6 || this.breakLevel == 9) {
                this.nodeInfoLeve.visible = true;
                let lv
                if (this.breakLevel <= 3) {
                    lv = 0;
                } else if (this.breakLevel <= 6) {
                    lv = 1
                } else if (this.breakLevel <= 9) {
                    lv = 2
                }
                this.labelAtt1.text = "突破技：" + TableGeneralTalent.Item(Game.PlayerHunterSystem.queryHunter(this.generalId).using_break_skill[lv]).talent_name + " 等级+" + 1;
                if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8) {
                    this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, TableGeneralBreakup.Item(this.breakLevel).add_skillLevel);
                } else {
                    this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, TableGeneralBreakup.Item(this.breakLevel).add_level);
                }

            }
            this.lableGoldNum.text = String(breakInfo.consume);
        }

        private setAttributeInfoMax() {

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId)
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);

            this.imgAwakenTime.visible = false;
            this.groupCurrentHunter.visible = false;
            this.groupAwakenMaxHunter.visible = true;
            this.groupNextHunter.visible = false;

            let framePath = PlayerHunterSystem.Frame(this.generalId);
            let headPath = PlayerHunterSystem.Head(this.generalId);
            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.spriteFrameAwakenSkillMax.source = cachekey(framePath, this);
            this.spriteIconAwakenSkillMax.source = cachekey(headPath, this);
            this.spriteAwakenMaxLevelIcon.source = cachekey(gradePath, this);

            this.labelLevelAwakenSkillMax.text = hunterInfo.level.toString();
            Helper.SetHeroAwakenStar(this.nodeStarMaxHunter, hunterInfo.star, hunterInfo.awakePassive.level);
            Helper.GetBreakLevelToPath(this.spriteMaxBreak, CommonConfig.general_max_break);

            //设置第一行内容
            for (let i = 2; i < 6; i++) {
                let group = this.nodeInfoTop.getChildByName(`nodeProperty${i}`) as eui.Group;
                group.visible = false;
            }

            // 设置第二行内容
            let [, levelNext,] = PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel);
            this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, levelNext - 1);
            let add_skill_level = TableGeneralBreakup.Item(this.breakLevel).add_skillLevel;
            // this.labelAtt3.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, add_skill_level);

            // 设置第三行内容
            // this.nodeInfoBottom.visible = false;
            // this.nodeBreakMaxSkill.visible = true;
            this.labelInfoAwakenSkill.text = TextsConfig.TextsConfig_Hunter_Break.allSkillBreak;
            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);
            let [attri, des] = PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel);
            let attriNext = null;
            let desNext = null;
            if (this.breakLevel != 1) {
                [attriNext, desNext] = PlayerHunterSystem.GetAttri(this.generalId, this.breakLevel - 1);
                // 设置第一行内容
                for (let i = 0; i < attri.length; i++) {
                    let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
                    labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[desNext[i]], attriNext[i]);

                    // let labelAttriAddNext = this.nodeProperty3.getChildByName(`labelAttriAddNext${i + 1}`) as eui.Label;
                    // labelAttriAddNext.text = String(attri[i]);

                    // let labelAttriAdd = this.nodeProperty5.getChildByName(`labelAttriAdd${i + 1}`) as eui.Label;
                    // labelAttriAdd.text = String(attri[i] - attriNext[i]);
                }
            } else {
                let [level, levelNext, levelPre] = PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel);
                if (breakInfo.add_level == 0) {
                    this.labelAtt2.visible = (false)
                } else {
                    this.labelAtt2.visible = (true)
                }
                this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, level);
                // 设置第一行 group1 内容
                for (let i = 0; i < attri.length; i++) {
                    let labelAttri = this.nodeProperty1.getChildByName(`labelAttri${i + 1}`) as eui.Label;
                    labelAttri.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[des[i]], attri[i]);
                }
            }
            this.nodeProperty2.visible = false;
            this.nodeProperty4.visible = false;
            this.nodeProperty5.visible = false;
            this.nodeInfoBottom.visible = false;
            this.nodeInfoLeve.visible = false;
            if (this.breakLevel == 1 || this.breakLevel == 4 || this.breakLevel == 7) {
                this.nodeInfoBottom.visible = true;
                this.labelInfoAwakenSkill.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skillBreak, Helper.GetNumCH(String(this.breakLevel)));
            } else if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8 || this.breakLevel == 3 || this.breakLevel == 6 || this.breakLevel == 9) {
                this.nodeInfoLeve.visible = true;
                let lv
                if (this.breakLevel <= 3) {
                    lv = 0;
                } else if (this.breakLevel <= 6) {
                    lv = 1
                } else if (this.breakLevel <= 9) {
                    lv = 2
                }
                this.labelAtt1.text = "突破技：" + TableGeneralTalent.Item(Game.PlayerHunterSystem.queryHunter(this.generalId).using_break_skill[lv]).talent_name + " 等级+" + 1;
                let [levelAdd, ,] = PlayerHunterSystem.GetBreakHunterLevel(this.breakLevel);
                if (this.breakLevel == 2 || this.breakLevel == 5 || this.breakLevel == 8) {
                    this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.skilllevelMax, TableGeneralBreakup.Item(this.breakLevel).add_skillLevel);
                } else {
                    this.labelAtt2.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.levelMax, TableGeneralBreakup.Item(this.breakLevel).add_level);
                }
            }
        }

        /** 设置猎人信息 */
        private setHunterInfo() {
            let baseInfo = PlayerHunterSystem.Table(this.generalId);
            let roleInfo = PlayerHunterSystem.MapInstance(PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId));
            let stepInfo = PlayerHunterSystem.GetStep(this.generalId);

            let gradePath = UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude];
            let typePath = UIConfig.UIConfig_General.hunter_type2[baseInfo.features];
            let namePath = baseInfo.name_pic;
            let titlePath = stepInfo.name_path;
            let hunterPath = roleInfo.half_path;
            this.imgGrade.source = cachekey(gradePath, this);
            this.imgType.source = cachekey(typePath, this);
            this.imgHunterName.source = cachekey(namePath, this);
            this.imgTitle.source = cachekey(titlePath, this);
            this.imgHunter.source = cachekey(hunterPath, this);

            let maxLevel = 0;
            let [level, levelNext] = [null, null];
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.break_level != 0) {
                [level, levelNext] = PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level);
                maxLevel = 60 + levelNext;
            } else {
                maxLevel = stepInfo.max_level;
            }
            this.lableHunterLevel.text = hunterInfo.level.toString() + "/" + maxLevel.toString();

            let star = baseInfo.init_star;
            if (hunterInfo.level != 0) {
                star = hunterInfo.star;
            }
            for (let i = 1; i < 7; i++) {
                let img = this.groupGet.getChildByName(`spriteStar${i}`) as eui.Image;
                if (i <= star) {
                    img.source = cachekey(UIConfig.UIConfig_Role.heroAwakenStar[hunterInfo.awakePassive.level + 1], this);
                } else {
                    img.source = cachekey(UIConfig.UIConfig_Role.heroAwakenStar[0], this);
                }
            }
        }

        private onBtnReturn() {
            PlayerHunterSystem.breakSelectedGenerals = [];
            PlayerHunterSystem.breakSelectedGenerals1 = [];
            this.close(UI.HIDE_TO_TOP);
        }

        /** 获取材料路径 */
        private onBtnMaterials() {
            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);
            if (breakInfo == null) return;

            let goodsId = breakInfo.exchange_store[0];
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(goodsId, this, () => {
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /** 触摸显示材料详情信息 */
        private onShowMaterials() {
            let breakInfo = PlayerHunterSystem.HunterBreak(this.breakLevel);
            if (breakInfo == null) return;

            let goodsId = breakInfo.exchange_store[0];
            let counts = breakInfo.exchange_store[1];
            loadUI(Common_DesProp)
                .then((dialog: Common_DesProp) => {
                    this.desProp = dialog;
                    this.desProp.setInfo(goodsId, counts);
                    this.groupRight.addChild(this.desProp);
                    this.desPropVisible = true;
                    // 调整坐标
                    this.desProp.y = this.groupRightBottom.y - this.desProp.height;
                    if (this.desProp.y < 0) {
                        this.desProp.y = 0;
                    }
                    this.desProp.x = this.nodeMeterial.x + this.nodeMeterial.width * 0.5 - this.desProp.width * 0.5;
                })
        }

        private onTouchEnd() {
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
            let obj = this.getChildByName("hunter-break-skill-talent-des");
            if (obj) this.removeChild(obj);
        }

        /** 添加技能 */
        private onAddSkill(type: number) {
            this.type = type;
            let star = 0;
            let break1 = 0;
            if (type == 0) {
                star = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            } else {
                star = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }
            loadUI(HunterBreakPopDialog)
                .then((popDialog: HunterBreakPopDialog) => {
                    popDialog.setHunterBreak(this.generalId, this.breakLevel, star, break1, (isClose: boolean) => {
                        if (isClose) {
                            PlayerHunterSystem.breakSelectedGenerals = [];
                        } else {
                            this.setBreakConsume();
                        }
                    }, type, this);
                    popDialog.show(UI.SHOW_FROM_TOP);
                })
        }

        private onBtnBreakSkill1() {
            // if (this.iock1.visible == false) {
            // this.onShowBreakSkill(1);
            // }
        }
        private onBtnBreakSkill2() {
            // if (this.iock2.visible == false) {
            // this.onShowBreakSkill(2);
            // }
        }
        private onBtnBreakSkill3() {
            // if (this.iock3.visible == false) {
            // this.onShowBreakSkill(3);
            // }
        }

        /**
         * 显示技能对话框
         * @param index 索引 1-3
         */
        private onShowBreakSkill(index: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId)
            let level = 0;
            if (index == 1) {
                level = hunterInfo.break_level <= 3 ? hunterInfo.break_level : 3;
            } else if (index == 2) {
                level = hunterInfo.break_level - 3 <= 3 ? hunterInfo.break_level - 3 : 3;
            } else if (index == 3) {
                level = hunterInfo.break_level - 6 <= 3 ? hunterInfo.break_level - 6 : 3;
            }
            this.onListItemTouch(TableBaseGeneral.Item(PlayerHunterSystem.GetGeneralId(this.generalId)).break_skill[index - 1][0], level, index)
        }

        public onListItemTouch(skillId, breakLevel, index) {
            if (!skillId) {
                return;
            }
            let point = this.localToGlobal(this[`groupLeftBottom`].x, this[`groupLeftBottom`].y);
            loadUI(CommonDesTalent).then((ui: CommonDesTalent) => {
                ui.setInfoByBreak(skillId, breakLevel);
                ui.name = "hunter-break-skill-talent-des";
                ui.x = point.x + (index - 1) + 120;
                ui.y = point.y - 200;
                this.addChild(ui);
            });
        }

        private onBtnFirstAwaken() {
            // this.startAni();
            // return;
            let star = 0;
            let break1 = 0;
            if (this.type == 0) {
                star = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star.length - 1];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break.length - 1];
            } else {
                star = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_star[0];
                break1 = PlayerHunterSystem.HunterBreak(this.breakLevel).exchange_break[0];
            }

            let breakHunterList = [];
            let breakInfos1 = PlayerHunterSystem.GetCanBreakHunter(star, this.generalId, break1);
            for (let i = 0; i < PlayerHunterSystem.breakSelectedGenerals1.length; i++) {
                let vv = PlayerHunterSystem.breakSelectedGenerals1[i];
                // for (let j = 0; j < breakInfos1.length; j++) {
                //     let v = breakInfos1[j];
                //     if (vv == v.general_id) {
                breakHunterList.push(vv);
                //     }
                // }
            }
            let breakInfos = PlayerHunterSystem.GetCanBreakHunter(star, this.generalId, break1);
            for (let i = 0; i < PlayerHunterSystem.breakSelectedGenerals.length; i++) {
                let vv = PlayerHunterSystem.breakSelectedGenerals[i];
                // for (let j = 0; j < breakInfos.length; j++) {
                //     let v = breakInfos[j];
                //     if (vv == v.general_id) {
                breakHunterList.push(vv);
                // }
                // }
            }
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            if (baseGeneralInfo.aptitude < PlayerHunterSystem.HunterBreak(this.breakLevel).condition_aptitude[0]) {
                toast_warning("猎人资质不满足突破条件")
                return;
            }
            if (this.breakLevel >= 6 && Game.PlayerHunterSystem.queryHunter(this.generalId).transfer_level < PlayerHunterSystem.HunterBreak(this.breakLevel).condition_transfer) {
                toast_warning("猎人未变身不满足突破条件")
                return;
            }

            let lastBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            let p = Game.PlayerHunterSystem.generalBreak(this.generalId, breakHunterList);
            p.then(() => {
                PlayerHunterSystem.breakSelectedGenerals = [];
                PlayerHunterSystem.breakSelectedGenerals1 = [];
                this.refreshInfo();
                this.startAni();
                this.setAttributeInfo();
                this.setBreakConsume();
                this.promptBattle(lastBattleValue);

                if (this.callback) this.callback(true);
            });
        }

        private promptBattle(lastBattleValue: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.battleValue > lastBattleValue) {
                CommonTipBmfont.promptBattleValue(lastBattleValue, hunterInfo.battleValue);
            }
            // let [currentBattleValue, breakBattleValue] = PlayerHunterSystem.GeneralBreakBattleValue(hunterInfo);
            // if (currentBattleValue < breakBattleValue && currentBattleValue > 0) { // 提示战斗力提升
            //     CommonTipBmfont.promptBattleValue(currentBattleValue, breakBattleValue);
            // }
        }

        /** 满级动画 */
        private maxAni() {
            let bones = [this.groupAwakenMaxHunter];
            let solts = ["000_touxiang2"];

            Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null
                , bones, solts).then((display: dragonBones.EgretArmatureDisplay) => {
                    // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     display.animation.stop();
                    //     display.animation.reset();
                    //     display.armature.dispose();
                    //     display.dbClear();
                    //     display.dispose(true);
                    //     if (display.parent) display.parent.removeChild(display);
                    // }, null);
                    display.armature.animation.play("002_tupo_manji", 1);

                    display.x = this.groupHunter.width * 0.5;
                    display.y = this.groupHunter.height * 0.5;

                    this.groupHunter.addChild(display);
                });
        }

        /** 待机动画 */
        private waitAni() {
            let bones = [this.groupCurrentHunter, this.groupNextHunter, this.imgAwakenTime];
            let solts = ["000_touxiang1", "000_touxiang2", "000_wenzi_qian"];

            Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null
                , bones, solts).then((display: dragonBones.EgretArmatureDisplay) => {
                    // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     display.animation.stop();
                    //     display.animation.reset();
                    //     display.armature.dispose();
                    //     display.dbClear();
                    //     display.dispose(true);
                    //     if (display.parent) display.parent.removeChild(display);
                    // }, null);
                    display.armature.animation.play("000_topo_dj", 0);

                    display.x = this.groupHunter.width * 0.5;
                    display.y = this.groupHunter.height * 0.5;
                    this.groupHunter.addChild(display);
                });
        }

        private startAni() {

            let bones = [this.groupCurrentHunter, this.groupNextHunter, this.imgAwakenTime];
            let solts = ["000_touxiang1", "000_touxiang2", "000_wenzi_hou"];

            Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null
                , bones, solts).then((display: dragonBones.EgretArmatureDisplay) => {
                    // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     display.animation.stop();
                    //     display.animation.reset();
                    //     display.armature.dispose();
                    //     display.dbClear();
                    //     display.dispose(true);
                    //     if (display.parent) display.parent.removeChild(display);
                    // }, null);
                    display.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e:
                        dragonBones.AnimationEvent) => {

                        this.startAttributeAni(() => {
                            this.startAttributeAniNext();
                        }, this);

                    }, this);

                    display.x = this.groupHunter.width * 0.5;
                    display.y = this.groupHunter.height * 0.5;

                    this.groupHunter.removeChildren();
                    this.groupHunter.addChild(display);

                    display.armature.animation.play("001_tupo_kaishi", 1);
                });
        }

        private startAttributeAni(cb, thisObj, index = 0) {
            let p = Game.DragonBonesManager.getArmatureDisplayAsync(this, "tupo_eff", null);
            p.then((display: dragonBones.EgretArmatureDisplay) => {
                display.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                    // display.animation.stop();
                    // display.animation.reset();
                    // display.armature.dispose();
                    // display.dbClear();
                    // display.dispose(true);
                    setDragonBonesRemove(display);
                    if (display.parent) display.parent.removeChild(display);
                    if (index == 0) {
                        index += 1;
                        this.startAttributeAni(cb, thisObj, index);
                    } else {
                        if (cb) cb.call(thisObj);
                    }
                }, this);
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                setDragonBonesRemove(display);
                display.animation.play("003_shuxing", 1);
                if (index == 0) {
                    display.x = this.nodeInfoTop.width * 0.5;
                    display.y = this.nodeInfoTop.height * 0.5;
                    this.nodeInfoTop.addChild(display);
                } else if (index == 1) {
                    display.x = this.nodeInfoBottom.width * 0.5;
                    display.y = this.nodeInfoBottom.height * 0.5;
                    this.nodeInfoBottom.addChild(display);
                }

            });
        }

        private startAttributeAniNext() {
            // loadUI(HunterBreakSkillUnlock).then((dialog: HunterBreakSkillUnlock) => {
            //     dialog.setInfo(this.generalId, () => {
            //         egret.setTimeout(() => {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.onShowBreakSkill(hunterInfo.break_level);
            //         }, this, 500);
            //     });
            //     dialog.show(UI.SHOW_FROM_TOP);
            // });
        }
    }

}