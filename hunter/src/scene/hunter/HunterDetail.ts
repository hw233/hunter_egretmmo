namespace zj {
    /** 
     * @author lilou
     * 
     * @date 2018-11-13
     * 
     * @class 猎人详情界面
     * 
     * @description modified by chen xi
     */
    export class HunterDetail extends HunterSubUI {
        private labelPower: eui.Label;
        private arrAttrs: Array<eui.Label> = [];
        private arrAttrsAdd: Array<eui.Label> = [];

        private groupTeach: eui.Group;
        private fateHolesMap: { [key: number]: HunterDetailFateHole } = {};
        private groupAttrMap: { [key: number]: eui.Group } = {};

        private btnHelp: eui.Button;
        private labelTitleLevel: eui.Label;
        private groupActive: eui.Group;
        private groupLowLevel: eui.Group;
        private labelLowLevel: eui.Label;
        private btnActive: eui.Button;
        private btnObtain: eui.Button;
        private groupPromtion: eui.Group;
        private btnPromtion: eui.Button;
        private imgPromotionRed: eui.Image;
        private btnGoUpLevel: eui.Button;
        private labelGold: eui.Label;

        private currentSelectedIndex: number = null;
        private oldBattleValue: number = null;
        private animationEnd: boolean = true;
        private groupAttribute: eui.Group;
        private shade: CommonShade;
        /**记录上次点击的按钮 */
        private btnIndex: number = 1;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterDetailsSkin.exml";

            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            // this.groupAttribute.cacheAsBitmap = true;
            this.init();
            if (Device.isReviewSwitch) {
                this.btnHelp.visible = false;
            }
        }

        private init() {
            this.arrAttrs = [];
            this.arrAttrsAdd = [];
            for (let i = 1; i <= 10; i++) {
                let labelAttri = this[`labelAttri${i}`] as eui.Label;
                if (labelAttri == null || labelAttri == undefined) {
                    throw Error("label attri is undefined, please check the spell.");
                }
                this.arrAttrs.push(labelAttri);

                let labelAttriAdd = this[`labelAttriAdd${i}`] as eui.Label;
                if (labelAttriAdd == null || labelAttriAdd == undefined) {
                    throw Error("label attri add is undefined, please check the spell.");
                }
                this.arrAttrsAdd.push(labelAttriAdd);
            }

            this.fateHolesMap = [];
            this.groupAttrMap = [];
            for (let i = 1; i <= 4; i++) {
                let hole = new HunterDetailFateHole();
                hole.btnFate = this[`btnFate${i}`];
                hole.imgFate = this[`imgFate${i}`];
                hole.imgIcon = this[`imgIcon${i}`];
                hole.imgActive = this[`imgActive${i}`];
                hole.imgRed = this[`imgRed${i}`];
                hole.labelFate = this[`labelFate${i}`];
                this.fateHolesMap[i] = hole;

                let group = this.groupTeach.getChildByName(`groupAttr${i}`) as eui.Group;
                group.touchEnabled = true;
                group.touchChildren = true;
                group.addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnGroupAttr${i}`], this);
                this.groupAttrMap[i] = group;

                this[`btnFate${i}`].addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                    Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
                }, this);
                this[`imgFate${i}`].addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                    Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
                }, this);
            }

            this.btnObtain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnObtain, this);
            this.btnActive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActive, this);
            this.btnPromtion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPromtion, this);
            this.btnGoUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoUpLevel, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);

            this.btnActive.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);
            this.btnObtain.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, this);

            Game.EventManager.on(GameEvent.PLAYER_HUNTER_BADGE, this.reloadGeneral, this);
            Game.EventManager.on(GameEvent.SET_HUNTER_ITEM, this.udpateInfo, this);
        }

        private udpateInfo(){
            if(this.generalId){
                this.setCurrentHole();
            }
        }

        // implement the function from the super class
        protected reloadGeneral() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.labelPower.text = hunterInfo.battleValue.toString();

            let stepInfo = PlayerHunterSystem.GetNextStep(this.generalId);
            if (stepInfo != null) {
                this.labelTitleLevel.text = stepInfo.name;
                this.labelTitleLevel.textColor = Helper.GetStepColor(hunterInfo.step + 1);
                this.labelGold.text = PlayerHunterSystem.GetStep(this.generalId).consume_money.toString();
            } else {
                this.labelTitleLevel.text = TextsConfig.TextsConfig_Error.wait;
                this.labelGold.text = "0";
            }

            this.animationEnd = true;
            this.holeSelect();
        }

        private onBtnGroupAttr1() {
            this.holeSelect(1);
            this.btnIndex = 1;
        }

        private onBtnGroupAttr2() {
            this.holeSelect(2);
            this.btnIndex = 2;
        }

        private onBtnGroupAttr3() {
            this.holeSelect(3);
            this.btnIndex = 3;
        }

        private onBtnGroupAttr4() {
            this.holeSelect(4);
            this.btnIndex = 4;
        }

        private holeSelect(selectedIndex?: number) {
            if (selectedIndex == null) {
                if (this.currentSelectedIndex != null) {
                    // if reload general or refresh, keep the same as the last selected index 
                    this.setCurrentHole();
                    return;
                } else {
                    selectedIndex = 1;
                }
            }

            this.currentSelectedIndex = selectedIndex;

            this.setCurrentHole();
        }

        private setCurrentHole() {
            // current selected hole show selected image, and don't response tap event
            for (let i = 1; i <= 4; i++) {
                this.setHoleInfo(i);
            }
            this.setAttributeInfo();
            this.setCurrentHoleAttributeInfo();
            this.setButtons();
            this.setActiveState();
        }

        private setHoleInfo(index: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let partnerInfo = PlayerHunterSystem.GetPartner(this.generalId, index);
            let partnerLevel = PlayerHunterSystem.GetPartnerLv(this.generalId, index);
            let holeInfo = PlayerHunterSystem.GetHole(this.generalId, index);

            // 是否激活
            let bActive = (hunterInfo.step < partnerLevel);
            // 是否够数量激活
            let currentCount = Game.PlayerItemSystem.itemCount(partnerInfo.id);
            let activateNumber = holeInfo.activate_num;
            let bNumberEnough = (currentCount >= activateNumber);
            // 是否够等级激活
            let bLevel = (hunterInfo.level >= PlayerHunterSystem.GetHoleLevel(this.generalId, index));

            let fateHole = this.fateHolesMap[index];
            fateHole.imgFate.visible = (index == this.currentSelectedIndex);
            fateHole.imgIcon.source = cachekey(partnerInfo.path, this);

            fateHole.labelFate.visible = !bActive
            fateHole.labelFate.text = currentCount.toString() + "/" + activateNumber.toString();
            fateHole.labelFate.textColor = (!bActive && bNumberEnough) ? ConstantConfig_Common.Color.green : ConstantConfig_Common.Color.red;
            let masureWidth = fateHole.labelFate.textWidth;
            fateHole.labelFate.width = masureWidth + 5;

            fateHole.imgActive.visible = bActive;
            fateHole.imgRed.visible = (!bActive && bNumberEnough);

            let group = this.groupAttrMap[index];
            group.touchChildren = (index != this.currentSelectedIndex);

            let childName = "hui-zhang-sao-guang";
            let display = group.getChildByName(childName);
            if (display) {
                group.removeChild(display);
            }
            if (bActive) {
                Game.DragonBonesManager.playAnimation(this, "ui_lieren_huizhang", "armatureName", "000_saoguang", 0).then((display: dragonBones.EgretArmatureDisplay) => {
                    display.x = group.width * 0.5;
                    display.y = group.height * 0.5;
                    display.name = childName;
                    group.addChild(display);
                });
            }
            return !bActive && bLevel && bNumberEnough;
        }

        private setAttributeInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;

            let [info] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfo);
            let attrsAddInfo = PlayerHunterSystem.HXHCalcGelOtherAttrToShow(hunterInfo);
            let attriShow = [...TableEnum.EnumHunterAttriShow];
            for (let i = 0; i < attriShow.length; i++) {
                let index = attriShow[i] - 1;

                let attrStr = Math.ceil(info[index]).toString();

                let attrAddStr = "";
                if (TableEnum.EnumHunterAttriShowFloat[index]) { // 24, 9, 6, 8, 5, 4
                    if (attrsAddInfo[index] % 1 >= 0.1) {
                        attrAddStr = "+" + attrsAddInfo[index].toFixed(1);
                    } else {
                        attrAddStr = "+" + attrsAddInfo[index].toFixed(0);
                    }
                } else {
                    attrAddStr = "+" + Math.ceil(attrsAddInfo[index]);
                }

                if (i >= 4) {
                    attrStr += "%";
                    attrAddStr += "%";
                }
                // if (!Device.isDebug) { // -- 服务器数据
                //     let serverInfo = Helper.AttriConvertTbl(hunterInfo.attri);
                //     attrAddStr += " s: " + Math.ceil(serverInfo[index]).toString();
                // }

                this.arrAttrs[i].text = attrStr;
                this.arrAttrsAdd[i].text = attrAddStr;
            }

            let path = "ui_hunter_OrnLine_png";
            for (let i = 1; i <= 4; i++) {
                (this[`labelLine${i}`] as eui.Image).source = cachekey(path, this);
            }
        }

        private setCurrentHoleAttributeInfo() {
            let partnerInfo = PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex);
            this[`labelCourage`].text = partnerInfo.name;
            this[`labelCourage`].textColor = ConstantConfig_Common.Color.quality_level_color[partnerInfo.quality - 1];

            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let holeInfo = PlayerHunterSystem.GetHoleValueTbl(this.generalId, hunterInfo.step, this.currentSelectedIndex);

            for (let i = 0; i < TableEnum.EnumHunterAttriShow.length; i++) {
                let v = TableEnum.EnumHunterAttriShow[i];
                if (holeInfo[v - 1] != 0) {
                    let text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.Attri[v - 1], holeInfo[v - 1]);
                    this[`labelAddAtt1`].text = text;
                    break;
                }
            }
        }

        private setButtons() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let partnerInfo = PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex);
            let partnerLevel = PlayerHunterSystem.GetPartnerLv(this.generalId, this.currentSelectedIndex);
            let holeLevel = PlayerHunterSystem.GetHoleLevel(this.generalId, this.currentSelectedIndex);
            let holeInfo = PlayerHunterSystem.GetHole(this.generalId, this.currentSelectedIndex);

            // 是否激活
            let bActive = (hunterInfo.step < partnerLevel);
            // 是否够等级激活
            let bLevel = (hunterInfo.level >= holeLevel);
            // 是否够数量激活
            let bNumberEnough = Game.PlayerItemSystem.itemCount(partnerInfo.id) >= holeInfo.activate_num;

            this.groupLowLevel.visible = (bNumberEnough && !bLevel);
            this.labelLowLevel.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.hunter_act_low_level, holeLevel);

            this.groupActive.visible = true;
            this.btnObtain.visible = (!bActive && !bNumberEnough);
            this.btnActive.visible = !this.btnObtain.visible;
            this.btnActive.enabled = (!bActive && bLevel);

            this.groupPromtion.visible = !(bNumberEnough && !bLevel);
            this.btnGoUpLevel.visible = !this.groupPromtion.visible;

            this.playAnimationInActive((!bActive && bNumberEnough && bLevel));
        }

        private setActiveState() {
            let gnr = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let allActived = true;
            for (let i = 1; i <= 4; i++) {
                let partnerLv = PlayerHunterSystem.GetPartnerLv(this.generalId, i);
                if (gnr.step >= partnerLv || gnr.step == CommonConfig.general_max_quality) {
                    allActived = false;
                    break;
                }
            }
            this.btnPromtion.enabled = allActived;
            this.imgPromotionRed.visible = allActived;

            this.playAnimationInPromtion(allActived);
        }

        private playAnimationInActive(play: boolean) {
            let childName = "hunter-detail-active-button";
            this.playAnimaionInButton(this.groupActive, childName, "001_xuanzhong_anniu1", play);
        }

        private playAnimationInPromtion(play: boolean) {
            let childName = "hunter-detail-promtion-button";
            this.playAnimaionInButton(this.groupPromtion, childName, "002_xuanzhong_anniu2", play);
        }

        private playAnimaionInButton(group: eui.Group, childName: string, animationName: string, play: boolean) {
            let child = group.getChildByName(childName) as dragonBones.EgretArmatureDisplay;
            if (child) group.removeChild(child);

            if (play) {
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", animationName, 0).then((display: dragonBones.EgretArmatureDisplay) => {
                    display.x = group.width * 0.5;
                    display.y = group.height * 0.5;
                    display.name = childName;
                    group.addChild(display);
                });
            }
        }

        private onBtnActive() {
            if (this.animationEnd == false) return;

            this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;

            Game.PlayerHunterSystem.activatePartner(this.generalId, this.currentSelectedIndex)
                .then(() => {
                    Game.SoundManager.playEffect("ui_yinzhang_mp3", 500);
                    this.promptBattleValue(() => {
                        let visible = true;
                        for (let i = 1; i <= 5; i++) {
                            if (visible == true) {
                                if (this.currentSelectedIndex == null || this.currentSelectedIndex >= 4) {
                                    this.currentSelectedIndex = 1;
                                } else {
                                    this.currentSelectedIndex += 1;
                                }
                                if (this.fateHolesMap[this.currentSelectedIndex].labelFate.textColor == ConstantConfig_Common.Color.green && this.fateHolesMap[this.currentSelectedIndex].imgActive.visible == false) {
                                    if (i != 4) {
                                        visible = false;
                                    }
                                }
                            }
                        }
                        for (let i = 1; i <= 4; i++) {
                            if (visible == true) {
                                if (this.fateHolesMap[this.currentSelectedIndex].labelFate.textColor == ConstantConfig_Common.Color.red && this.fateHolesMap[this.currentSelectedIndex].imgActive.visible == false) {
                                    visible = false;
                                    break;
                                }
                                if (this.currentSelectedIndex == null || this.currentSelectedIndex >= 4) {
                                    this.currentSelectedIndex = 1;
                                } else {
                                    this.currentSelectedIndex += 1;
                                }
                            }
                        }

                        this.reloadGeneral();
                    });

                    this.promptActive();
                });
        }

        private onBtnObtain() {
            let holeInfo = PlayerHunterSystem.GetHole(this.generalId, this.currentSelectedIndex);
            // loadUI(Common_OutPutDialog)
            //     .then((dialog: Common_OutPutDialog) => {
            //         let id = PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex).id;
            //         dialog.setInfo(id, this, () => {
            //             this.holeSelect(this.currentSelectedIndex);
            //         });
            //         dialog.setNeedNum(holeInfo.activate_num);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            let itemId = PlayerHunterSystem.GetPartner(this.generalId, this.currentSelectedIndex).id;
            let mobIds = Game.PlayerInstanceSystem.GetProp(itemId);
            if (mobIds && mobIds.length > 0) {
                let mobMax = Game.PlayerInstanceSystem.curInstances[1].maxMobID;
                let mobMin = 9000000;
                for (let i = 0; i < mobIds.length; ++i) {
                    if (mobIds[i] <= mobMax) {
                        Game.PlayerInstanceSystem.StartFast(mobIds[0], itemId, holeInfo.activate_num, this, () => {
                            this.holeSelect(this.currentSelectedIndex);
                        });
                        return;
                    }
                    mobMin = Math.min(mobIds[i], mobMin);
                }
                let maxMobId = Game.PlayerInstanceSystem.getLastInstance(20);
                if(mobMin <= maxMobId){
                    let table = TableInstance.Item(mobMin);
                    if (table) {
                        let [areaId, chapIdx] = Game.PlayerInstanceSystem.ChapterIdx(mobMin);
                        let instanceName = areaId + "-" + (Number(chapIdx) + 1) + table.instance_name;
                        toast(Helper.StringFormat(TextsConfig.TextConfig_Instance.SweepNoOpen, instanceName))
                    } else {
                        console.error("sweep fast error: " + mobMin);
                    }
                } else {
                    // toast("副本未开启");
                }
            }
        }

        private onBtnGoUpLevel() {
            if (Game.PlayerHunterSystem.queryHunter(this.generalId).level > 0) {
                if (PlayerMissionSystem.FunOpenTo(FUNC.HEROLEVEL, true)) {
                    loadUI(HunterUpLevel).then((dialog: HunterUpLevel) => {
                        dialog.setInfo(this.generalId, (isUpLevelSuccess: boolean, isAdvance: boolean) => {
                            if (isUpLevelSuccess) {
                                this.father.onSubUIEvent(HunterSubUIEvent.Refresh);
                                this.reloadGeneral();
                            } else if (isAdvance) {
                                // to 
                            }
                        }, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                }
            } else {
                toast_warning(TextsConfig.TextsConfig_Error.add_exp_soul);
            }
            Teach.addTeaching();
        }

        private addAnimatoin(dbName: string, armatureName: string = "armatureName") {
            let thisOne = this;
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, "002_jinjie2", 1)
                .then(display => {
                    display.x = this[`groupTeach`].width / 2 - 410;
                    display.y = this[`groupTeach`].height / 2 - 140;
                    this[`groupTeach`].addChild(display);

                    display.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                        let ui = thisOne.father.getChildByName("shade");
                        if (ui) {
                            thisOne.father.removeChild(ui);
                        }
                        this.currentSelectedIndex = 1;

                        this.reloadGeneral();

                        loadUI(HunterUpAdvanced)
                            .then((dialog: HunterUpAdvanced) => {
                                dialog.setInfo(this.generalId, this.oldBattleValue, () => {
                                    egret.setTimeout(() => {
                                        this.promptBattleValue(() => {
                                        });
                                    }, this, 600);

                                    this.animationEnd = true;
                                });
                                dialog.show();
                            }).
                            catch(() => {
                                this.animationEnd = true;
                            });
                    }, this);
                }).catch(() => {
                    this.animationEnd = true;
                });
        }

        private onBtnPromtion() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.HEROGRADE, true)) {
                if (this.animationEnd == false) return;

                this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
                this.animationEnd = false;
                var thisOne = this;
                Game.PlayerHunterSystem.upQuality(this.generalId)
                    .then(() => {
                        Game.SoundManager.playEffect("ui_wujiang_shengxing_mp3", 500);
                        //添加遮罩
                        if (thisOne.shade == null) {
                            thisOne.shade = new CommonShade();
                            thisOne.shade.name = "shade";
                        }
                        thisOne.father.addChild(thisOne.shade);
                        // egret.Tween.get(this).wait(3000).call(() => {
                        //     let ui = this.father.getChildByName("shade");
                        //     if (ui) {
                        //         this.father.removeChild(ui);
                        //     }
                        // })
                        thisOne.father.onSubUIEvent(HunterSubUIEvent.Refresh);

                        Game.DragonBonesManager.playAnimation(thisOne, "ui_lieren_jinjie", "armatureName", "001_jinjie1", 1)
                            .then(display => {
                                display.x = thisOne[`groupTeach`].width / 2;
                                display.y = thisOne[`groupTeach`].height / 2;
                                thisOne[`groupTeach`].addChild(display);

                                display.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                                    thisOne.addAnimatoin("ui_lieren_jinjie", "armatureName");
                                    let ui = thisOne.father.getChildByName("shade");
                                    if (ui) {
                                        thisOne.father.removeChild(ui);
                                    }
                                }, thisOne);

                            }).catch(() => {
                                thisOne.animationEnd = true;
                            });

                    }).catch((msg: string | number) => {
                        thisOne.animationEnd = true;
                        if (msg == 10304) {
                            thisOne.btnActive.enabled = false;
                            thisOne.btnPromtion.enabled = false;
                            thisOne.imgPromotionRed.visible = false;
                            thisOne.playAnimationInPromtion(false);
                        }
                    });
            }
        }

        private promptBattleValue(cb: Function) {
            // 当前武将战斗力
            let oldValue = this.oldBattleValue;
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            console.log("---- 猎人信息最新战力 ", newValue);
            CommonTipBmfont.promptBattleValue(oldValue, newValue);
            if (cb) cb();
        }

        private promptActive() {
            let source = cachekey(UIConfig.UIConfig_Hunter.common_hint[4], this);
            let image = new eui.Image(source);

            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                }, this)
                armatureDisplay.animation.play("000_tishi", 1);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.x = this.groupTeach.width * 0.2;
                armatureDisplay.y = this.groupTeach.height * 0.4;
                this.groupTeach.addChild(armatureDisplay);
            });
        }

        private onBtnHelp() {
            loadUI(HelpDialog)
                .then((dialog: HelpDialog) => {
                    dialog.loadBySmallType(301);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }
    }

    export class HunterDetailFateHole {
        btnFate: eui.Button;

        /** The golden selected frame image. */
        imgFate: eui.Image;

        /** The hole's icon image. */
        imgIcon: eui.Image;

        /** The actived image. */
        imgActive: eui.Image;

        /** red dot image */
        imgRed: eui.Image;

        /** The own and consume number label. */
        labelFate: eui.Label;
    }

}