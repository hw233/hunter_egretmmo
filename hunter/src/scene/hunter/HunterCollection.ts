namespace zj {
    /**
     * @author xing li wei
     * 
     * @date 2018-12-30
     * 
     * @class 猎人收藏
     */
    export class HunterCollection extends HunterSubUI {
        public groupMain: eui.Group;

        private groupCollectLeft: eui.Group;
        private imgFrameLeft: eui.Image;
        private imgIconLeft: eui.Image;
        private imgRedLeft: eui.Image;
        private imgLevelFloorLeft: eui.Image;
        private labelLevelLeft: eui.BitmapLabel;
        private imgStarBackgroundLeft: eui.Image;
        private imgStepStarLeft: eui.Image;
        private groupCollectCenter: eui.Group;
        private imgFrameCenter: eui.Image;
        private imgIconCenter: eui.Image;
        private imgRedCenter: eui.Image;
        private imgLevelFloorCenter: eui.Image;
        private labelLevelCenter: eui.BitmapLabel;
        private imgStarBackgroundCenter: eui.Image;
        private imgStepStarCenter: eui.Image;
        private groupCollectRight: eui.Group;
        private imgFrameRight: eui.Image;
        private imgIconRight: eui.Image;
        private imgRedRight: eui.Image;
        private imgLevelFloorRight: eui.Image;
        private labelLevelRight: eui.BitmapLabel;
        private imgStarBackgroundRight: eui.Image;
        private imgStepStarRight: eui.Image;
        private labelName: eui.Label;
        private labelType: eui.Label;
        private labelExclusiveType: eui.Label;
        private labelSkillParticulars: eui.Label;
        private listAttribute: eui.List;
        private groupLevelRestrict: eui.Group;
        private imgIconTitleRight: eui.Image;
        private imgLevelNumber: eui.Image;
        private groupIcon: eui.Group
        private groupiconCompound: eui.Group;
        /**合成组合 */
        private groupCompound: eui.Group;
        private imgFrameSkillFrag: eui.Image;
        private imgIconSkillFrag: eui.Image;
        private imgAdd: eui.Image;
        private btnCompound: eui.Button;
        /**激活组合 */
        private groupActivation: eui.Group;
        private imgFrameSkillActivation: eui.Image;
        private imgIconSkillActivation: eui.Image;
        private imgAddActivation: eui.Image;
        /**激活所需材料 */
        private labelActivationMaterials: eui.Label;
        /**合成所需材料 */
        private labelNumberMaterials: eui.Label;
        /**激活按钮 */
        private btnActivation: eui.Button;
        /**强化升品组 */
        private groupButton: eui.Group;
        /**强化按钮 */
        private btnIntensify: eui.Button;
        /**强化按钮上红点 */
        private imgRedDotIntensify: eui.Image;
        /**升品按钮 */
        private btnUpQuality: eui.Button;
        /**升品按钮上红点 */
        private imgRedDotliftQuality: eui.Image;

        public groupStepStarLeft: eui.Group;
        public groupStepStarCenter: eui.Group;
        public groupStepStarRight: eui.Group;
        public groupIcon1: eui.Group;
        public groupCollectLeft0: eui.Group;
        public groupCollectCenter0: eui.Group;
        public groupCollectRight0: eui.Group;
        public groupTeach: eui.Group;
        public imgFrameSkillFragment: eui.Image;
        public imgLevel: eui.Image;

        private oldBattleValue: number;
        private listAttributeData: eui.ArrayCollection = new eui.ArrayCollection();
        private currentSelectedIndex: number = 0;

        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCollectionSkin.exml";
            this.init();
            // this.groupIcon.cacheAsBitmap = true;
        }

        private init() {
            this.btnIntensify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnIntensify, this);
            this.btnUpQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpQuality, this);
            this.groupCollectLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectLeft, this);
            this.groupCollectCenter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectCenter, this);
            this.groupCollectRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectRight, this);
            this.btnActivation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActivation, this);
            this.btnCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCompound, this);
            this.groupiconCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupiconCompound, this);
        }

        protected reloadGeneral() {
            this.currentSelectedIndex = 0;
            this.playSelectedAnimation(this.groupCollectLeft0);
            this.refresh();
        }

        private refresh() {
            this.setCollectionInfo();
            this.setAttributeInfo();
            this.setBottomInfo();
        }

        private setCollectionInfo() {
            let baseEquipInfo = PlayerHunterSystem.Table(this.generalId).equip_info;
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseEquipInfo == null || hunterInfo == null) {
                throw Error("equip info or hunter info can't be null.");
            }

            /** 是否能够显示专属藏品 */
            let canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            let equipInfo = hunterInfo.equipInfo;

            let leftFramePath = UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
            let leftIconPath = TableGeneralEquip.Item(baseEquipInfo[0]).equip_icon;
            let centerFramePath = UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
            let centerIconPath = TableGeneralEquip.Item(baseEquipInfo[1]).equip_icon;

            this.groupCollectRight.visible = canShowSpecial;
            let rightFramePath, rightIconPath;
            if (canShowSpecial) {
                rightFramePath = UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
                rightIconPath = TableGeneralEquip.Item(baseEquipInfo[2]).equip_icon;
            }

            // 等级; icon背景
            let [letfEquipInfo, centerEquipInfo, rightEquipInfo] = [null, null, null];
            for (let i = 0; i < baseEquipInfo.length; i++) {
                let v = baseEquipInfo[i];
                for (let j = 0; j < equipInfo.length; j++) {
                    let currentEquipInfo = equipInfo[j];

                    // 本地装备id和猎人装备ID一致，表示激活过
                    if (v != 0 && currentEquipInfo != null && v === currentEquipInfo.equipId) {

                        if (i == 0) {
                            letfEquipInfo = currentEquipInfo;

                            let skillLevelNumber = (currentEquipInfo.step < 5) ? 1 : (Math.floor((currentEquipInfo.step - 1) / 5) + 1);
                            leftFramePath = UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber];
                        } else if (i == 1) {
                            centerEquipInfo = currentEquipInfo;

                            let skillLevelNumber = (currentEquipInfo.step < 5) ? 1 : (Math.floor((currentEquipInfo.step - 1) / 5) + 1);
                            centerFramePath = UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber];
                        } else if (i == 2) {
                            rightEquipInfo = currentEquipInfo;

                            let itemInfo = TableGeneralEquip.Item(currentEquipInfo.equipId);
                            rightFramePath = UIConfig.UIConfig_Hunter_Equip.Speical_Frame[itemInfo.skillLevel[currentEquipInfo.step - 1]];
                        }
                    }
                }
            }

            this.imgFrameLeft.source = cachekey(leftFramePath, this);
            this.imgIconLeft.source = cachekey(leftIconPath, this);
            this.imgFrameCenter.source = cachekey(centerFramePath, this);
            this.imgIconCenter.source = cachekey(centerIconPath, this);
            if (rightFramePath) this.imgFrameRight.source = cachekey(rightFramePath, this);
            if (rightIconPath) this.imgIconRight.source = cachekey(rightIconPath, this);

            let isLeftActived = (letfEquipInfo != null);
            this.labelLevelLeft.visible = isLeftActived;
            this.imgLevelFloorLeft.visible = isLeftActived;
            if (isLeftActived) this.labelLevelLeft.text = letfEquipInfo.level.toString();

            let isCenterActived = (centerEquipInfo != null);
            this.labelLevelCenter.visible = isCenterActived;
            this.imgLevelFloorCenter.visible = isCenterActived;
            if (isCenterActived) this.labelLevelCenter.text = centerEquipInfo.level.toString();

            let isRightActived = (canShowSpecial && rightEquipInfo != null);
            this.labelLevelRight.visible = isRightActived;
            this.imgLevelFloorRight.visible = isRightActived;
            if (isRightActived) this.labelLevelRight.text = rightEquipInfo.level.toString();

            // icon 滤镜
            Helper.SetImageFilterColor(this.imgIconLeft, isLeftActived ? null : "gray");
            Helper.SetImageFilterColor(this.imgIconCenter, isCenterActived ? null : "gray");
            Helper.SetImageFilterColor(this.imgIconRight, isRightActived ? null : "gray");

            // 星星, 背景
            this.imgStepStarLeft.visible = isLeftActived;
            this.imgStarBackgroundLeft.visible = isLeftActived;
            if (isLeftActived) {
                let step = letfEquipInfo.step;

                let leftStarPath = UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                let leftStarBgPath = UIConfig.UIConfig_Hunter_Equip.frameBoard[PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarLeft.source = cachekey(leftStarPath, this);
                this.imgStarBackgroundLeft.source = cachekey(leftStarBgPath, this);
            }

            this.imgStepStarCenter.visible = isCenterActived;
            this.imgStarBackgroundCenter.visible = isCenterActived;
            if (isCenterActived) {
                let step = centerEquipInfo.step;
                let centerStarPath = UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                let centerStarBgPath = UIConfig.UIConfig_Hunter_Equip.frameBoard[PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarCenter.source = cachekey(centerStarPath, this);
                this.imgStarBackgroundCenter.source = cachekey(centerStarBgPath, this);
            }

            this.imgStepStarRight.visible = isRightActived;
            this.imgStarBackgroundRight.visible = isRightActived;
            if (isRightActived) {
                let step = rightEquipInfo.step;
                let rightStarPath = UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                let rightStarBgPath = UIConfig.UIConfig_Hunter_Equip.frameBoard[PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarRight.source = cachekey(rightStarPath, this);
                this.imgStarBackgroundRight.source = cachekey(rightStarBgPath, this);
            }
            let hunterEquip = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let equipinfo = hunterEquip.equipInfo;
            let have1 = Table.FindF(equipinfo, (_, v) => {
                return v.equipId == baseEquipInfo[0];
            });
            let have2 = Table.FindF(equipinfo, (_, v) => {
                return v.equipId == baseEquipInfo[1];
            });
            let have3 = Table.FindF(equipinfo, (_, v) => {
                return v.equipId == baseEquipInfo[2];
            });

            // 红点
            this.imgRedLeft.visible = PlayerHunterSystem.equipCanActive(this.generalId, baseEquipInfo, baseEquipInfo[0]);
            this.imgRedCenter.visible = PlayerHunterSystem.equipCanActive(this.generalId, baseEquipInfo, baseEquipInfo[1]);
            this.imgRedRight.visible = PlayerHunterSystem.equipCanCompound(this.generalId, baseEquipInfo);

            //装备可升品
            let step1 = PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[0]);
            let step2 = PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[1]);
            let step3 = null;
            if (baseEquipInfo[2] != 0) {
                step3 = PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[2]);
            }

            //装备可强化
            let strength1 = PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[0]);
            let strength2 = PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[1]);
            let strength3 = null
            if (baseEquipInfo[2] != 0) {
                strength3 = PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[2]);
            }

            if (this.imgRedLeft.visible == false) {
                this.imgRedLeft.visible = have1 && (step1 || strength1);
            }
            if (this.imgRedCenter.visible == false) {
                this.imgRedCenter.visible = have2 && (step2 || strength2);
            }
            if (baseEquipInfo[2] != 0) {
                if (this.imgRedRight.visible == false) {
                    this.imgRedRight.visible = have3 && (step3 || strength3);
                }
            }

            if (this.currentSelectedIndex == 0) {
                this.imgRedDotIntensify.visible = strength1;
                this.imgRedDotliftQuality.visible = step1;
            } else if (this.currentSelectedIndex == 1) {
                this.imgRedDotIntensify.visible = strength2;
                this.imgRedDotliftQuality.visible = step2;
            } else if (this.currentSelectedIndex == 2) {
                this.imgRedDotIntensify.visible = strength3;
                this.imgRedDotliftQuality.visible = step3;
            }
        }

        private setAttributeInfo() {
            let baseEquipInfo = PlayerHunterSystem.Table(this.generalId).equip_info;
            let equipId = baseEquipInfo[this.currentSelectedIndex];
            if (equipId == 0) return;

            let itemInfo = TableGeneralEquip.Item(equipId);
            this.labelName.text = itemInfo.equip_type_name;
            this.labelType.text = itemInfo.equip_type_des;
            this.labelSkillParticulars.text = itemInfo.equip_des;

            let canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            if (canShowSpecial && this.currentSelectedIndex == 2) {
                this.labelExclusiveType.visible = true;
                this.labelExclusiveType.text = itemInfo.equip_type;
            } else {
                this.labelExclusiveType.visible = false;
            }

            this.listAttributeData.removeAll();
            for (let i = 0; i < 3; i++) {
                let data = new HunterCollectionItemData();
                data.index = i;
                data.fatherIndex = this.currentSelectedIndex;
                data.equipId = equipId;
                data.generalId = this.generalId;
                // data.father = this;
                this.listAttributeData.addItem(data);
            }
            this.listAttribute.dataProvider = this.listAttributeData;
            this.listAttribute.itemRenderer = HunterCollectionItem;
        }

        private setBottomInfo() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let baseEquipInfo = PlayerHunterSystem.Table(this.generalId).equip_info;
            let canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            let equipInfo = hunterInfo.equipInfo;

            let activedList: number[] = [];
            for (let i = 0; i < baseEquipInfo.length; i++) {
                let v = baseEquipInfo[i];
                for (let j = 0; j < equipInfo.length; j++) {
                    let vv = equipInfo[j];
                    if (v != 0 && vv != null && vv.equipId == v) {
                        activedList.push(i);
                    }
                }
            }

            // whether curren selected is actived or not.
            let isActived = Table.FindF(activedList, (_, v: number) => {
                return v == this.currentSelectedIndex;
            });

            if (this.currentSelectedIndex == 2) {
                this.groupButton.visible = isActived;
                this.groupCompound.visible = !isActived;
                this.groupActivation.visible = false;
                this.groupLevelRestrict.visible = false;
            } else {
                this.groupButton.visible = isActived;
                this.groupCompound.visible = false;
                if (isActived) { // 激活成功，显示升品和强化. 
                    this.groupActivation.visible = false;
                    this.groupLevelRestrict.visible = false;
                } else { // 尚未激活成功
                    if (this.currentSelectedIndex == 0) {
                        let isLevelEnough = (hunterInfo.level >= CommonConfig.general_equip_one_openlevel);
                        this.groupActivation.visible = isLevelEnough;
                        this.groupLevelRestrict.visible = !isLevelEnough;
                        if (!isLevelEnough) {
                            let path = UIConfig.UIConfig_Hunter_Equip.collectLevel1;
                            this.imgLevelNumber.source = cachekey(path, this);
                        }
                    } else {
                        let isLevelEnough = (hunterInfo.level >= CommonConfig.general_equip_two_openlevel);
                        this.groupActivation.visible = isLevelEnough;
                        this.groupLevelRestrict.visible = !isLevelEnough;
                        if (!isLevelEnough) {
                            let path = UIConfig.UIConfig_Hunter_Equip.collectLevel2;
                            this.imgLevelNumber.source = cachekey(path, this);
                        }
                    }
                }
            }

            //合成组激活组信息
            if (this.currentSelectedIndex == 2 && canShowSpecial) {
                let generalEquipInfo = TableGeneralEquip.Item(baseEquipInfo[2]);
                let goods = generalEquipInfo.compose_goods;
                let enough = generalEquipInfo.compose_count;
                let itemSet = PlayerItemSystem.Set(Number(goods), null, null) as any;

                let iconPath = itemSet.Path;
                let framePath = itemSet.Frame;
                this.imgFrameSkillFrag.source = cachekey(framePath, this);
                this.imgIconSkillFrag.source = cachekey(iconPath, this);

                let currentCount = itemSet.Count;
                this.labelNumberMaterials.text = String(currentCount) + "/" + enough;
                Set.LabelNumberGreenAndRed(this.labelNumberMaterials, currentCount, Number(enough));
                this.imgAdd.visible = currentCount < Number(enough);

            } else if ((this.currentSelectedIndex == 0 || this.currentSelectedIndex == 1) &&
                isActived == false) {
                let enough = TableGeneralEquip.Item(baseEquipInfo[this.currentSelectedIndex]).compose_money;
                let itemSet = PlayerItemSystem.Set(20001, null, null) as any;

                let framePath = itemSet.Frame;
                let iconPath = itemSet.Path;
                this.imgIconSkillActivation.source = cachekey(itemSet.Path, this);
                this.imgFrameSkillActivation.source = cachekey(itemSet.Frame, this);

                let currentCount = itemSet.Count;
                this.labelActivationMaterials.text = String(currentCount) + "/" + enough;
                Set.LabelNumberGreenAndRed(this.labelActivationMaterials, currentCount, Number(enough));

                this.imgAddActivation.visible = currentCount < Number(enough);
            }

            if (this.currentSelectedIndex == 0 && isActived == false) {
                this.groupCollectLeft.addChild(this.imgRedLeft);
            }
            if (this.currentSelectedIndex == 1 && isActived == false) {
                this.groupCollectCenter.addChild(this.imgRedCenter);
            }
            if (this.currentSelectedIndex == 2 && isActived == false) {
                this.groupCollectRight.addChild(this.imgRedRight);
            }

        }

        private onBtnGroupCollectLeft() {
            this.currentSelectedIndex = 0;
            this.playSelectedAnimation(this.groupCollectLeft0);
        }

        private onBtnGroupCollectCenter() {
            this.currentSelectedIndex = 1;
            this.playSelectedAnimation(this.groupCollectCenter0);
        }

        private onBtnGroupCollectRight() {
            let baseEquipInfo = PlayerHunterSystem.Table(this.generalId).equip_info;
            if (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0) {
                this.currentSelectedIndex = 2;
                this.playSelectedAnimation(this.groupCollectRight0);
            }
        }

        private playSelectedAnimation(group: eui.Group) {
            this.removeAnimation();

            Game.DragonBonesManager.playAnimation(this, "zhuangbei_xuanzhong", "armatureName", null, 0)
                .then(display => {
                    if (!this.getChildByName("dzGF")) {
                        display.x = group.width / 2;
                        display.y = group.height / 2 - 10;
                        display.name = "dzGF";
                        group.addChild(display);
                        this.groupCollectRight.addChild(this.imgIconTitleRight);
                        this.refresh();
                    }
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        private removeAnimation() {

            let obj0 = this.groupCollectLeft0.getChildByName("dzGF");
            if (obj0) {
                this.groupCollectLeft0.removeChild(obj0);
            }

            let obj1 = this.groupCollectCenter0.getChildByName("dzGF");
            if (obj1) {
                this.groupCollectCenter0.removeChild(obj1);
            }

            let obj2 = this.groupCollectRight0.getChildByName("dzGF");
            if (obj2) {
                this.groupCollectRight0.removeChild(obj2);
            }
        }

        /**激活*/
        private onBtnActivation() {
            let p = Game.PlayerHunterSystem.generalSelectEquip(this.generalId, this.currentSelectedIndex + 1);
            this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            p.then(() => {
                loadUI(HunterCollectPopStep)
                    .then((dialog: HunterCollectPopStep) => {
                        dialog.setInfo(PlayerHunterSystem.Table(this.generalId).equip_info[this.currentSelectedIndex], 1, this.generalId, this, () => {
                            let source = cachekey(UIConfig.UIConfig_Hunter_Equip.common_hint[1], this);
                            let image = new eui.Image(source);
                            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                                    if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                                }, this)
                                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                                //     armatureDisplay.animation.stop();
                                //     armatureDisplay.animation.reset();
                                //     armatureDisplay.armature.dispose();
                                //     armatureDisplay.dbClear();
                                //     armatureDisplay.dispose(true);
                                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                                // }, null);
                                armatureDisplay.animation.play("000_tishi", 1);
                                armatureDisplay.x = this.groupIcon.width * 0.22;
                                armatureDisplay.y = this.groupIcon.height * 0.5;
                                this.groupIcon1.addChild(armatureDisplay);
                                this.promptBattleValue();
                                this.refresh();
                            });
                            this.refresh();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            });
            p.catch((reason) => {
                // toast(reason);
            })
        }

        /**合成 */
        private onBtnCompound() {
            let p = Game.PlayerHunterSystem.generalSelectEquip(this.generalId, this.currentSelectedIndex + 1);
            this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            p.then(() => {
                loadUI(HunterCollectPopStep)
                    .then((dialog: HunterCollectPopStep) => {
                        dialog.setInfo(PlayerHunterSystem.Table(this.generalId).equip_info[this.currentSelectedIndex], 1, this.generalId, this, () => {
                            let source = cachekey(UIConfig.UIConfig_Hunter_Equip.common_hint[2], this);
                            let image = new eui.Image(source);
                            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                                    if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                                }, this)
                                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                                //     armatureDisplay.animation.stop();
                                //     armatureDisplay.animation.reset();
                                //     armatureDisplay.armature.dispose();
                                //     armatureDisplay.dbClear();
                                //     armatureDisplay.dispose(true);
                                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                                // }, null);
                                armatureDisplay.animation.play("000_tishi", 1);
                                armatureDisplay.x = this.groupIcon.width * 0.22;
                                armatureDisplay.y = this.groupIcon.height * 0.5;
                                this.groupIcon1.addChild(armatureDisplay);
                                this.promptBattleValue();
                                this.refresh();
                            });
                            this.refresh();
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            });
            p.catch((reason) => {
                // toast(reason);
            })
        }

        private promptBattleValue() {
            // 当前武将战斗力
            let oldValue = this.oldBattleValue;
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;

            CommonTipBmfont.promptBattleValue(oldValue, newValue);
        }

        private onBtnGroupiconCompound() {
            let baseEquipInfo = PlayerHunterSystem.Table(this.generalId).equip_info;
            let generalEquipInfo = TableGeneralEquip.Item(baseEquipInfo[2]);
            let goods = generalEquipInfo.compose_goods;
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(Number(goods), this, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**点击强化 */
        private onBtnIntensify() {
            loadUI(HunterCollectionStrength)
                .then((dialog: HunterCollectionStrength) => {
                    dialog.setInfo(this.currentSelectedIndex, this.generalId, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**点击升品 */
        private onBtnUpQuality() {
            loadUI(HunterCollectionStep)
                .then((dialog: HunterCollectionStep) => {
                    dialog.setInfo(this.currentSelectedIndex, this.generalId, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

    }

}