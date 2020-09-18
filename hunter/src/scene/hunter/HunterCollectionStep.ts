namespace zj {
    /**
     * @author xing li wei
     * 
     * @date 2018-1-3
     * 
     * @class 猎人收藏升品弹窗
     */
    export class HunterCollectionStep extends Dialog {
        private btnClose: eui.Button;
        private groupCollectLeft: eui.Group;
        private imgIconBackLeft: eui.Image;
        private imgIconLeft: eui.Image;
        private groupCollectCenter: eui.Group;
        private imgIconBackCenter: eui.Image;
        private imgIconCenter: eui.Image;
        private groupCollectRight: eui.Group;
        private imgIconBackRight: eui.Image;
        private imgIconRight: eui.Image;
        private groupInfoUp: eui.Group;
        private imgInfoIconUp: eui.Image;
        private lableAttLeftUp: eui.Label;
        private imgAttAddNextUp: eui.Image;
        private lableAttCenterUp: eui.Label;
        private imgAttAddUp: eui.Image;
        private lableAttRightUp: eui.Label;
        private imgStepStarBefore: eui.Image;
        private imgStepStarAfter: eui.Image;
        private groupInfoDown: eui.Group;
        private imgSkillIcon: eui.Image;
        private lableAttLeftDown: eui.Label;
        private imgAttAddNextDown: eui.Image;
        private lableAttCenterDown: eui.Label;
        private imgAttAddDown: eui.Image;
        private lableAttRightDown: eui.Label;
        private groupAttributeInfo: eui.Group;
        private imgFrame: eui.Image;
        private imgSkill: eui.Image;
        private lableSkillLevel: eui.BitmapLabel;
        private lableSkillName: eui.Label;
        private lablePlayerInfo: eui.Label;
        private groupDownInfo: eui.Group;
        private groupMaterialsLeft: eui.Group;
        private imgFrameMaterials: eui.Image;
        private imgIconMaterials: eui.Image;
        private imgAddMaterials: eui.Image;
        private labelNumberMaterials: eui.Label;
        private imgAdd: eui.Image;
        private groupTeach: eui.Group;
        private groupFragRight: eui.Group;
        private imgFrameSkillFrag: eui.Image;
        private imgIconSkillFrag: eui.Image;
        private imgAddSkillFrag: eui.Image;
        private labelNumberSkillFrag: eui.Label;
        private btnliftQuality: eui.Button;
        private lableGoldNumber: eui.Label;
        private imgPromoteMax: eui.Image;
        /**父类第几个 */
        private index: number;
        private generalId: number;
        private equipId: number;
        /**装备信息索引 */
        private equipInfoIndex: number = 0;
        /**回调方法 */
        private callback: () => void;
        /**武将战力 */
        private oldBattleValue: number;
        /**判断是否提示升品成功 */
        private vis: boolean = false;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCollectionStepSkin.exml";
            this.init();
        }

        private init() {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupMaterialsLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupMaterialsLeft, this);
            this.groupFragRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupFragRight, this);
            this.btnliftQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.BtnLiftQuality, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this);
            }, this)
        }

        public setInfo(index: number, generalId: number, cb: () => void) {
            this.callback = cb;
            this.index = index;
            this.generalId = generalId;

            this.refresh();
        }

        private refresh() {
            this.equipId = PlayerHunterSystem.Table(this.generalId).equip_info[this.index];
            let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (let i = 0; i < equipInfo.length; i++) {
                if (equipInfo[i].equipId == this.equipId) {
                    this.equipInfoIndex = i;
                }
            }
            let equidInfo = TableGeneralEquip.Item(this.equipId);
            let step = equipInfo[this.equipInfoIndex].step;
            this.loadIconInfo(equidInfo, step);
            this.loadAttributeInfo(equidInfo, step);
            if (step != CommonConfig.general_equip_max_step) {
                this.loadExpendInfo(equidInfo, step);
            }

        }

        private loadIconInfo(equidInfo: TableGeneralEquip, step: number) {
            //根据等级判断顶部icon是两边显示还是中间显示
            let iconVisible = (step != CommonConfig.general_equip_max_step && step % 5 == 0);
            this.groupCollectLeft.visible = (iconVisible == true ? true : false);
            this.groupCollectCenter.visible = (iconVisible == true ? false : true);
            this.groupCollectRight.visible = (iconVisible == true ? true : false);

            //顶部icon组底部图片
            let skillLevelNumber = 1;
            let skillLevelNumber1 = 1;
            if (step >= 5) {
                skillLevelNumber = Math.floor((step - 1) / 5) + 1;
                skillLevelNumber1 = Math.floor((step) / 5) + 1;
            }
            let frame = UIConfig.UIConfig_Hunter_Equip.Normal_Frame;
            if (this.index == 2) {
                frame = UIConfig.UIConfig_Hunter_Equip.Speical_Frame;
            }
            this.imgIconBackLeft.source = cachekey(frame[skillLevelNumber], this);
            this.imgIconBackCenter.source = cachekey(frame[skillLevelNumber], this);
            this.imgIconBackRight.source = cachekey(frame[skillLevelNumber1], this);


            let path = equidInfo.equip_icon;
            this.imgIconCenter.source = cachekey(path, this);
            this.imgIconLeft.source = cachekey(path, this);
            if (step != CommonConfig.general_equip_max_step) {
                this.imgIconRight.source = cachekey(path, this);
            }
            cachekey(path, this)
        }

        private loadAttributeInfo(equidInfo: TableGeneralEquip, step: number) {
            let attriId1 = TableGeneralEquipAttri.Item(equidInfo.add_attri_one);
            let attriId2 = TableGeneralEquipAttri.Item(equidInfo.add_attri_two);
            let attri1 = PlayerHunterSystem.equipGetStepAttribute(Number(attriId1.attri_id), step);
            let attri2 = 0;
            this.imgInfoIconUp.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);

            /**TextsConfig.TextsConfig_Hunter_Break.Attri1 */
            let configAttri = TextsConfig.TextsConfig_Hunter_Break.Attri1;
            if (attriId2 != null) {

                this.imgSkillIcon.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[attriId2.attri_type - 1], this);
                attri2 = PlayerHunterSystem.equipGetStepAttribute(Number(attriId2.attri_id), step);
                this.lableAttLeftUp.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                this.lableAttLeftDown.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId2.attri_type - 1], attri2));
            }

            if (step == CommonConfig.general_equip_max_step) {
                this.groupDownInfo.visible = false;
                this.imgPromoteMax.visible = true;
                this.lableAttLeftUp.visible = true;
                this.imgStepStarBefore.visible = false;
                this.imgStepStarAfter.visible = false;
                this.imgAttAddNextUp.visible = false;
                this.lableAttCenterUp.visible = false;
                this.imgAttAddUp.visible = false;
                this.lableAttRightUp.visible = false;
                if (this.index == 2) {
                    this.groupAttributeInfo.visible = true;
                    this.groupInfoDown.visible = false;
                    this.lableAttLeftUp.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                    let skillLevel = equidInfo.skillLevel[step - 1];
                    let talentId = equidInfo.skillId[0];
                    let talentId2 = equidInfo.skillId[1];
                    let skill = TableGeneralTalent.Item(talentId).path;

                    this.imgSkill.source = cachekey(skill, this);
                    this.lableSkillLevel.text = String(skillLevel);
                    this.imgFrame.source = cachekey(UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                    this.lableSkillName.text = TableGeneralTalent.Item(talentId).talent_name;
                    let des = null;
                    if (talentId2 != null) {
                        des = PlayerHunterSystem.GetPassiveSkillDes(talentId, skillLevel - 1);
                        let des1 = PlayerHunterSystem.GetPassiveSkillDes(talentId2, skillLevel - 1);
                        this.lablePlayerInfo.textFlow = Util.RichText(des[0] + "/" + des1[0]);
                    } else {
                        des = PlayerHunterSystem.GetPassiveSkillDes(talentId, skillLevel);
                        this.lablePlayerInfo.textFlow = Util.RichText(des[0]);
                    }
                } else {
                    this.groupAttributeInfo.visible = false;
                    this.groupInfoDown.visible = true;
                    this.imgAttAddNextDown.visible = false;
                    this.lableAttCenterDown.visible = false;
                    this.imgAttAddDown.visible = false;
                    this.lableAttRightDown.visible = false;
                    this.groupInfoUp.horizontalCenter = 130;
                    this.groupInfoDown.horizontalCenter = 130;
                }
                return;
            }

            if (this.index == 2) {
                /**布局显示 */
                let layoutVisible = step % 5 != 0 ? true : false;
                this.lableAttCenterUp.visible = !layoutVisible;
                this.imgAttAddUp.visible = !layoutVisible;
                this.lableAttRightUp.visible = !layoutVisible;
                this.imgAttAddNextDown.visible = layoutVisible;
                this.lableAttCenterDown.visible = layoutVisible;
                this.imgAttAddDown.visible = layoutVisible;
                this.lableAttRightDown.visible = layoutVisible;
                this.groupAttributeInfo.visible = !layoutVisible;
                this.lableAttLeftDown.visible = layoutVisible;
                this.imgStepStarBefore.visible = layoutVisible;
                this.imgStepStarAfter.visible = layoutVisible;
                this.lableAttLeftUp.visible = !layoutVisible;

                this.lableAttLeftUp.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                let attri1Next = PlayerHunterSystem.equipGetStepAttribute(attriId1.attri_id, step + 1);
                this.lableAttCenterUp.text = attri1Next + "%";
                this.lableAttRightUp.text = (attri1Next - attri1) + "%";

                let skillLevel = equidInfo.skillLevel[step - 1];
                let skillLevelNext = equidInfo.skillLevel[step];
                let talentId = equidInfo.skillId;
                let skill = TableGeneralTalent.Item(talentId[0]).path;

                this.imgSkill.source = cachekey(skill, this);
                this.lableSkillLevel.text = String(skillLevel);
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                if (step % 5 != 0) {
                    this.imgInfoIconUp.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[3], this);
                    this.imgSkillIcon.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);
                    this.imgStepStarBefore.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
                    this.imgStepStarAfter.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step], this);

                    this.lableAttCenterDown.text = attri1Next + "%";
                    this.lableAttRightDown.text = (attri1Next - attri1) + "%";
                    this.lableAttLeftDown.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                }

                let [str1, attriNum1, str2, attriNum2, attriNum1Next, attriNum2Next, strAttri1, strAttri2, des1, des2, strAttri11, strAttri22] = [null, null, null, null, null, null, null, null, null, null, null, null]
                if (talentId.length == 2 && (step % 5 == 0)) {
                    this.lableAttLeftUp.visible = true;

                    [str1, attriNum1] = PlayerHunterSystem.GetPassiveSkillDes(talentId[0], skillLevel);
                    [str2, attriNum2] = PlayerHunterSystem.GetPassiveSkillDes(talentId[1], skillLevel);
                    [, attriNum1Next] = PlayerHunterSystem.GetPassiveSkillDes(talentId[0], skillLevelNext);
                    [, attriNum2Next] = PlayerHunterSystem.GetPassiveSkillDes(talentId[1], skillLevelNext);

                    strAttri1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                    strAttri2 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum2[0], (attriNum2Next[0] - attriNum2[0]));
                    strAttri11 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[1], (attriNum1Next[1] - attriNum1[1]));
                    strAttri22 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum2[1], (attriNum2Next[1] - attriNum2[1]));

                    if (attriNum1.length == 2) {
                        if (attriNum2.length == 2) {
                            des2 = Helper.StringFormat(str2, strAttri2, strAttri22);
                        } else {
                            des2 = Helper.StringFormat(str2, strAttri2);
                        }
                        des1 = Helper.StringFormat(str1, strAttri1, strAttri11);
                    } else {
                        if (attriNum1.length == 2) {
                            des2 = Helper.StringFormat(str2, strAttri2, strAttri22);
                        } else {
                            des2 = Helper.StringFormat(str2, strAttri2);
                        }
                        des1 = Helper.StringFormat(str1, strAttri1);
                    }

                    this.lableSkillName.text = TableGeneralTalent.Item(talentId[0]).talent_name;
                    this.lablePlayerInfo.textFlow = Util.RichText(des1 + des2);

                } else if (talentId.length == 1 && (step % 5 == 0)) {
                    this.lableAttLeftUp.visible = true;
                    [str1, attriNum1] = PlayerHunterSystem.GetPassiveSkillEquipDes(talentId[0], skillLevel);
                    [, attriNum1Next] = PlayerHunterSystem.GetPassiveSkillEquipDes(talentId[0], skillLevelNext);

                    if (attriNum1.length == 2) {
                        strAttri1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                        strAttri2 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[1], (attriNum1Next[1] - attriNum1[1]));
                        des1 = Helper.StringFormat(str1, strAttri1, strAttri2);
                    } else {
                        strAttri1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                        des1 = Helper.StringFormat(str1, strAttri1);
                    }

                    this.lableSkillName.text = TableGeneralTalent.Item(talentId[0]).talent_name;
                    this.lablePlayerInfo.textFlow = Util.RichText(des1);
                }
            } else if (this.index != 2) {
                this.groupInfoDown.visible = true;
                this.groupAttributeInfo.visible = false;
                let stepvis = step % 5 == 0 ? true : false;
                this.lableAttCenterUp.visible = stepvis;
                this.imgAttAddUp.visible = stepvis;
                this.lableAttRightUp.visible = stepvis;
                this.lableAttLeftUp.visible = stepvis;
                this.imgStepStarBefore.visible = !stepvis;
                this.imgStepStarAfter.visible = !stepvis;

                this.lableAttLeftUp.textFlow = Util.RichText(Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                this.lableAttLeftDown.textFlow = stepvis ? Util.RichText(Helper.StringFormat(configAttri[attriId2.attri_type - 1], attri2)) : Util.RichText(Helper.StringFormat(configAttri[(attriId2.attri_type - 1) - 1], attri1));

                let attri1Next = PlayerHunterSystem.equipGetStepAttribute(attriId1.attri_id, step + 1);
                this.lableAttCenterUp.text = attri1Next + "%";
                this.lableAttRightUp.text = (attri1Next - attri1) + "%";
                let attri2Next = PlayerHunterSystem.equipGetStepAttribute(attriId2.attri_id, step + 1);
                this.lableAttCenterDown.text = stepvis ? attri2Next + "%" : attri1Next + "%";
                this.lableAttRightDown.text = stepvis ? (attri2Next - attri2) + "%" : (attri1Next - attri1) + "%";
                let iconup = !stepvis ? UIConfig.UIConfig_Hunter_Equip.collection[3] : UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1];
                let icon = !stepvis ? UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1] : UIConfig.UIConfig_Hunter_Equip.collection[attriId2.attri_type - 1];
                let before = !stepvis ? UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1] : null;
                let after = !stepvis ? UIConfig.UIConfig_Hunter_Equip.spriteStar[step] : null;
                this.imgInfoIconUp.source = cachekey(iconup, this);
                this.imgSkillIcon.source = cachekey(icon, this);
                this.imgStepStarBefore.source = cachekey(before, this);
                this.imgStepStarAfter.source = cachekey(after, this);
            }
        };

        private loadExpendInfo(equidInfo: TableGeneralEquip, step: number) {
            //消耗
            let goods = equidInfo.upstep_goods[step];
            let count = equidInfo.upstep_count[step];
            let money = equidInfo.upstep_money[step];

            let itemSet1 = PlayerItemSystem.Set(goods[0], null, null) as any;
            this.imgFrameMaterials.source = cachekey(itemSet1.Frame, this);
            this.imgIconMaterials.source = cachekey(itemSet1.Path, this);
            this.labelNumberMaterials.text = itemSet1.Count + "/" + count[0];
            Set.LabelNumberGreenAndRed(this.labelNumberMaterials, itemSet1.Count, count[0]);

            let goodsLength = goods.length == 2 ? true : false;
            if (goodsLength) {
                let itemSet2 = PlayerItemSystem.Set(goods[1], null, null) as any;
                this.imgFrameSkillFrag.source = cachekey(itemSet2.Frame, this);
                this.imgIconSkillFrag.source = cachekey(itemSet2.Path, this);

                this.labelNumberSkillFrag.text = itemSet2.Count + "/" + count[1];
                Set.LabelNumberGreenAndRed(this.labelNumberSkillFrag, itemSet2.Count, count[1]);
                this.imgAddSkillFrag.visible = itemSet2.Count >= count[1] ? false : true;
            }

            this.imgAddMaterials.visible = itemSet1.Count >= count[0] ? false : true;
            this.groupMaterialsLeft.left = goodsLength ? 55 : 100;
            this.groupFragRight.visible = goodsLength;
            this.imgAdd.visible = goodsLength;
            this.lableGoldNumber.text = String(money);
        }

        /**点击第一个道具碎片 */
        private onBtnGroupMaterialsLeft() {
            let step = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[this.equipInfoIndex].step;
            let goods = TableGeneralEquip.Item(this.equipId).upstep_goods[step];
            let itemSet1 = PlayerItemSystem.Set(goods[0], null, null) as any;
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(itemSet1.Info.id, this, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**点击第二个道具碎片 */
        private onBtnGroupFragRight() {
            let step = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[this.equipInfoIndex].step;
            let goods = TableGeneralEquip.Item(this.equipId).upstep_goods[step];
            let itemSet1 = PlayerItemSystem.Set(goods[1], null, null) as any;
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(itemSet1.Info.id, this, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**点击升品 */
        private BtnLiftQuality() {
            this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            Game.PlayerHunterSystem.generalUpStepEquip(this.generalId, this.index + 1).then(() => {
                loadUI(HunterCollectPopStep)
                    .then((dialog: HunterCollectPopStep) => {
                        dialog.setInfo(PlayerHunterSystem.Table(this.generalId).equip_info[this.index], 2, this.generalId, this, () => {
                            this.keel();
                            let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
                            let step = equipInfo[this.equipInfoIndex].step;
                            if ((step - 1) % 5 == 0) {
                                this.vis = true;
                            }
                        });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }).catch((reason) => {
                // toast(reason);
            })

        }

        private keel() {
            if (this.groupCollectCenter.visible == true) {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectCenter], ["001_tubiao"])
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {

                        }, this)
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        //     armatureDisplay.animation.stop();
                        //     armatureDisplay.animation.reset();
                        //     armatureDisplay.armature.dispose();
                        //     armatureDisplay.dbClear();
                        //     armatureDisplay.dispose(true);
                        //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("001_tubiao", 1);
                        armatureDisplay.x = this.groupTeach.width / 2;//; + this.groupCollectCenter.width / 2;
                        armatureDisplay.y = this.groupTeach.height / 2;// + this.groupCollectCenter.height / 2;
                        this.groupTeach.addChild(armatureDisplay);
                    });
            } else {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectRight], ["001_tubiao"])
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        // armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {

                        // }, this)
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        //     armatureDisplay.animation.stop();
                        //     armatureDisplay.animation.reset();
                        //     armatureDisplay.armature.dispose();
                        //     armatureDisplay.dbClear();
                        //     armatureDisplay.dispose(true);
                        //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.animation.play("001_tubiao", 1);
                        armatureDisplay.x = 396;// + this.groupCollectRight.width / 2;
                        armatureDisplay.y = this.groupTeach.height / 2;// + this.groupCollectRight.height / 2;
                        this.groupTeach.addChild(armatureDisplay);
                    });
            }
            egret.Tween.get(this).wait(500).call(() => {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [], [])
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            this.promptActive();
                            this.promptBattleValue();
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
                        armatureDisplay.animation.play("000_jiantou", 1);
                        armatureDisplay.x = this.groupInfoUp.width * 0.5;
                        armatureDisplay.y = this.groupInfoUp.height * 0.5;
                        this.groupInfoUp.addChild(armatureDisplay);
                    });
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [], [])
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            // this.promptActive();
                            // this.promptBattleValue();
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
                        armatureDisplay.animation.play("000_jiantou", 1);
                        armatureDisplay.x = this.groupInfoDown.width * 0.5;
                        armatureDisplay.y = this.groupInfoDown.height * 0.5;
                        this.groupInfoDown.addChild(armatureDisplay);
                    });
            });
        }

        /**提示升品成功 */
        private promptActive() {
            let source = cachekey(UIConfig.UIConfig_Hunter_Equip.common_hint[3], this);
            let image = new eui.Image(source);
            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    if (this.vis == true) {
                        toast_success("技能提升成功");
                        this.vis = false;
                    }

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
                armatureDisplay.x = this.groupTeach.width * 0.3;
                armatureDisplay.y = this.groupTeach.height * 0.35;
                this.groupTeach.addChild(armatureDisplay);
                this.refresh();
                if (this.callback) this.callback();
            });
        }

        private promptBattleValue() {
            // 当前武将战斗力
            let oldValue = this.oldBattleValue;
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;

            CommonTipBmfont.promptBattleValue(oldValue, newValue);
        }


        /**关闭弹窗 */
        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }

    }

}