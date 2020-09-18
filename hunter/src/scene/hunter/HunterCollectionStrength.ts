namespace zj {
    /**
     * @author xing li wei
     * 
     * @date 2018-1-3
     * 
     * @class 猎人收藏强化弹窗
     */
    export class HunterCollectionStrength extends Dialog {
        private btnClose: eui.Button;
        private groupCollectLeft: eui.Group;
        private imgBoardLeft: eui.Image;
        private imgIconLeft: eui.Image;
        private labelLevelLeft: eui.Label;
        private imgStarFloorLeft: eui.Image;
        private imgStepStarLeft: eui.Image;
        private groupCollectRight: eui.Group;
        private imgBoardRight: eui.Image;
        private imgIconRight: eui.Image;
        private labelLevelRight: eui.Label;
        private imgStarFloorRight: eui.Image;
        private imgStepStarRigth: eui.Image;
        private lableAttLeftUp: eui.Label;
        private imgAttAddNextUp: eui.Image;
        private lableAttCenterUp: eui.Label;
        private groupIntensifyInfoUp: eui.Group;
        private groupIntensifyInfoDown: eui.Group;
        private imgTableDown: eui.Image;
        private lableAttLeftDown: eui.Label;
        private imgAttAddNextDown: eui.Image;
        private lableAttCenterDown: eui.Label;
        private imgAttAddDown: eui.Image;
        private lableAttRightDown: eui.Label;
        private groupConsumablesInfoDown: eui.Group;
        private groupMaterialsLeft: eui.Group;
        private imgFrameMaterials: eui.Image;
        private imgIconMaterials: eui.Image;
        private imgAddMaterials: eui.Image;
        private labelNumberMaterials: eui.Label;
        private imgAdd: eui.Image;
        private groupFragRight: eui.Group;
        private imgFrameSkillFrag: eui.Image;
        private imgIconSkillFrag: eui.Image;
        private imgAddSkillFrag: eui.Image;
        private labelNumberSkillFrag: eui.Label;
        private btnIntensify: eui.Button;
        private lableGoldNum: eui.Label;
        private groupAwakenLevelMax: eui.Group;
        private imgBoardMax: eui.Image;
        private imgIconMax: eui.Image;
        private labelLevelMax: eui.Label;
        private imgStarFloorMax: eui.Image;
        private imgStepStarMax: eui.Image;
        private groupCollectMax: eui.Group;
        private groupTeach: eui.Group;
        private groupUpLevel: eui.Group;
        /**在父类中排名 */
        private index: number;
        private generalId: number;
        private equipId: number;
        /**回调方法 */
        private callback: () => void;
        /**武将战力 */
        private oldBattleValue: number;

        private _id: number;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCollectionStrengthSkin.exml";
            this.init();
        }

        private init() {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupMaterialsLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupMaterialsLeft, this);
            this.groupFragRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupFragRight, this);
            this.btnIntensify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnIntensify, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this);
            }, this)
        }

        public setInfo(index: number, generalId: number, cb: () => void) {
            this.callback = cb;
            this.index = index;
            this.generalId = generalId;
            this._id = 0;

            this.refresh();
        }

        private refresh() {
            this.equipId = PlayerHunterSystem.Table(this.generalId).equip_info[this.index];
            let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            let step: number = 0;
            let level: number = 0;
            for (let i = 0; i < equipInfo.length; i++) {
                this._id = i;
                if (equipInfo[i].equipId == this.equipId) {
                    step = equipInfo[i].step;
                    level = equipInfo[i].level;
                }
            }

            this.loadIconInfo(level, step);
            this.loadAttributeInfo(level, step);
            if (level != CommonConfig.general_equip_max_level) {
                this.loadExpendInfo(level);
            }
        }

        private loadIconInfo(level: number, step: number) {
            let frameBoard = UIConfig.UIConfig_Hunter_Equip.frameBoard[PlayerHunterSystem.equipGetStarNumber(step) - 1];
            this.imgStarFloorLeft.source = cachekey(frameBoard, this);
            this.imgStarFloorMax.source = cachekey(frameBoard, this);
            this.imgStarFloorRight.source = cachekey(frameBoard, this);

            let spriteStar = UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
            this.imgStepStarLeft.source = cachekey(spriteStar, this);
            this.imgStepStarMax.source = cachekey(spriteStar, this);;
            this.imgStepStarRigth.source = cachekey(spriteStar, this);;

            let equipIcon = TableGeneralEquip.Item(this.equipId).equip_icon;
            this.labelLevelLeft.text = String(level);
            this.labelLevelMax.text = String(level);
            this.labelLevelRight.text = String(level + 1);
            this.imgIconLeft.source = cachekey(equipIcon, this);
            this.imgIconMax.source = cachekey(equipIcon, this);;
            this.imgIconRight.source = cachekey(equipIcon, this);;
        }

        private loadAttributeInfo(level: number, step: number) {

            let mainAttri = TableGeneralEquip.Item(this.equipId).main_attri;
            let attriId1 = TableGeneralEquipAttri.Item(mainAttri);
            let attri1 = PlayerHunterSystem.GetLevelAttri(attriId1.attri_id, level);
            this.lableAttLeftDown.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[attriId1.attri_type - 1], attri1));
            this.imgTableDown.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);

            //判断等级最大与非最大时该显示的部分
            let layout = level == CommonConfig.general_equip_max_level ? false : true;
            this.groupTeach.visible = layout;
            this.groupConsumablesInfoDown.visible = layout;
            this.groupAwakenLevelMax.visible = !layout;
            this.imgAttAddNextUp.visible = layout;
            this.lableAttCenterUp.visible = layout;
            this.imgAttAddNextDown.visible = layout;
            this.lableAttCenterDown.visible = layout;
            this.imgAttAddDown.visible = layout;
            this.lableAttRightDown.visible = layout;

            let skillLevel = TableGeneralEquip.Item(this.equipId).skillLevel[step - 1];
            let skillLevelNumber = step < 5 ? 1 : Math.floor((step - 1) / 5) + 1;
            let frame = UIConfig.UIConfig_Hunter_Equip.Normal_Frame;
            if (this.index == 2) {
                frame = UIConfig.UIConfig_Hunter_Equip.Speical_Frame;
            }
            /**this.index != 2 */
            let panIndex = this.index != 2;
            let max = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
            this.imgBoardMax.source = cachekey(max, this);
            this.lableAttLeftUp.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.strengthLv, level));
            if (level == CommonConfig.general_equip_max_level) {
                this.lableAttLeftUp.left = 150;
                this.groupIntensifyInfoDown.horizontalCenter = 95;

                this.imgIconMax.source = cachekey(TableGeneralEquip.Item(this.equipId).equip_icon, this);
                this.labelLevelMax.text = String(level);
            } else {
                let Left = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
                let Right = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
                this.imgBoardLeft.source = cachekey(Left, this);
                this.imgBoardRight.source = cachekey(Right, this);

                this.lableAttCenterUp.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.strengthLv, level + 1));
                let attri1Next = PlayerHunterSystem.GetLevelAttri(attriId1.attri_id, level + 1);

                this.lableAttCenterDown.text = String(attri1Next);
                this.lableAttRightDown.text = String(attri1Next - attri1);
            }
        }

        private loadExpendInfo(level: number) {
            let equipInfo = TableGeneralEquip.Item(this.equipId);
            let goods = equipInfo.uplevel_goods[level];
            let count = equipInfo.uplevel_count[level];
            let money = equipInfo.uplevel_money[level];
            let itemSet1 = PlayerItemSystem.Set(goods[0]) as any;
            this.imgFrameMaterials.source = cachekey(itemSet1.Frame, this);
            this.imgIconMaterials.source = cachekey(itemSet1.Path, this);
            this.labelNumberMaterials.text = itemSet1.Count + "/" + count[0];
            this.imgAddMaterials.visible = itemSet1.Count >= count[0] ? false : true;
            Set.LabelNumberGreenAndRed(this.labelNumberMaterials, itemSet1.Count, count[0]);

            /**数组长度判断 */
            let goodslength = goods.length == 2 ? true : false;
            this.groupFragRight.visible = goodslength;
            this.imgAdd.visible = goodslength;
            this.groupMaterialsLeft.left = goodslength ? 56 : 100;
            if (goods.length == 2) {
                let itemSet2 = PlayerItemSystem.Set(goods[1]) as any;
                this.imgFrameSkillFrag.source = cachekey(itemSet2.Frame, this);
                this.imgIconSkillFrag.source = cachekey(itemSet2.Path, this);
                this.labelNumberSkillFrag.text = itemSet2.Count + "/" + count[1];
                Set.LabelNumberGreenAndRed(this.labelNumberSkillFrag, itemSet2.Count, count[1]);
                this.imgAddSkillFrag.visible = itemSet2.Count >= count[0] ? false : true;
            }
            this.lableGoldNum.text = String(money);
        }


        /**点击第一个道具随便 */
        private onBtnGroupMaterialsLeft() {
            let level = 0;
            let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (let kk in equipInfo) {
                if (equipInfo.hasOwnProperty(kk)) {
                    let vv = equipInfo[Number(kk)];
                    level = vv.equipId == this.equipId ? vv.level : 0;
                }
            }
            let goods = TableGeneralEquip.Item(this.equipId).uplevel_goods[level + 1];
            let itemSet1 = PlayerItemSystem.Set(goods[0], null, null) as any;
            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(itemSet1.Info.id, this, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**点击第二个道具随便 */
        private onBtnGroupFragRight() {
            let level = 0;
            let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (let kk in equipInfo) {
                if (equipInfo.hasOwnProperty(kk)) {
                    let vv = equipInfo[Number(kk)];
                    if (vv.equipId == this.equipId) {
                        level = vv.level;
                    }
                }
            }
            let goods = TableGeneralEquip.Item(this.equipId).uplevel_goods[level + 1];
            let itemSet1 = PlayerItemSystem.Set(goods[1], null, null) as any;
            loadUI(CommonOutExchangeDialog)
                .then((dialog: CommonOutExchangeDialog) => {
                    dialog.setInfo(itemSet1.Info.id, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnIntensify() {
            this.oldBattleValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            Game.PlayerHunterSystem.generalUpLevelEquip(this.generalId, this.index + 1)
                .then(() => {
                    // toast("");
                    ///加龙骨动画
                    this.keel();
                    // this.refresh();
                    // if (this.callback) this.callback();
                }).catch((reason) => {
                    // toast(reason);
                })
        }

        private keel() {
            if (this.groupAwakenLevelMax.visible == true) {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectMax], ["001_tubiao"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
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
                    armatureDisplay.x = this.groupTeach.width * 0.5;
                    armatureDisplay.y = this.groupTeach.height * 0.5;
                    this.groupTeach.addChild(armatureDisplay);
                });
            } else {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectRight], ["001_tubiao"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
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
                    armatureDisplay.x = 335;
                    armatureDisplay.y = this.groupTeach.height / 2;
                    this.groupTeach.addChild(armatureDisplay);
                });
            }
            egret.Tween.get(this).wait(500).call(() => {
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [], ["000_jiantou"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        this.refresh();
                        if (this.callback) this.callback();
                        if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        this.promptBattleValue();
                        this.promptActive();
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
                    armatureDisplay.x = this.groupIntensifyInfoUp.width * 0.5;
                    armatureDisplay.y = this.groupIntensifyInfoUp.height * 0.5;
                    this.groupIntensifyInfoUp.addChild(armatureDisplay);
                });
                Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [], ["000_jiantou"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        this.refresh();
                        if (this.callback) this.callback();
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
                    armatureDisplay.x = this.groupIntensifyInfoDown.width * 0.5;
                    armatureDisplay.y = this.groupIntensifyInfoDown.height * 0.5;
                    this.groupIntensifyInfoDown.addChild(armatureDisplay);
                });
            });
        }

        private promptBattleValue() {
            // 当前武将战斗力
            let oldValue = this.oldBattleValue;
            let newValue = Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;

            CommonTipBmfont.promptBattleValue(oldValue, newValue);
        }

        /**提示强化成功 */
        private promptActive() {
            let source = cachekey(UIConfig.UIConfig_Hunter_Equip.common_hint[4], this);
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
                armatureDisplay.x = this.groupTeach.width * 0.5 - 104;
                armatureDisplay.y = this.groupTeach.height * 0.5 - 32.5;
                if (this.groupTeach.visible != true) {
                    this.groupAwakenLevelMax.addChild(armatureDisplay);
                } else {
                    this.groupTeach.addChild(armatureDisplay);
                }
                this.refresh();
                if (this.callback) this.callback();
            });
        }

        /**关闭弹窗 */
        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }

    }

}