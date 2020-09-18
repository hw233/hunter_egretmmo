namespace zj {
    /**
     * @author chen xi.
     * 
     * @date 2019-1-11
     * 
     * @class 猎人念力子项
     */

    export class HunterPsychicItem extends UI {
        public groupMain: eui.Group;
        public groupAnimation: eui.Group;
        public imgPsychicPicture: eui.Image;
        private imgPsychicPicture1: eui.Image;
        public groupLock: eui.Group;
        public imgLevelFloor: eui.Image;
        public labelLevelNum: eui.BitmapLabel;
        public groupName: eui.Group;
        public labelName: eui.Label;
        public groupProperty: eui.Group;
        public labelProperty: eui.Label;
        public groupPsychicEffect: eui.Group;
        public groupAni: eui.Group;
        public groupEffectOpen: eui.Group;
        public groupEffectAct: eui.Group;

        private isShowName: boolean;
        private isShowProperty: boolean;
        private index: number;
        private info: message.PsychicInfo | number;
        private callback: (index: number, lock: boolean) => void;
        private father;
        private generalPsy;
        private psyInfo;
        private isEff;
        private isAct;
        private cbFunc;
        private level: number;
        private value;
        private quality;
        private effectOpen;
        private effect_act = null;
        private effect = null;
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterPsychicItemSkin.exml";
            this.labelName.textColor = Helper.RGBToHex("r:212,g:224,b:238");

            this.isShowName = true;
            this.isShowProperty = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpen, this);

            this.initPsychicEffect();
        }

        private initPsychicEffect() {
            this.groupAni.visible = false;
            Game.DragonBonesManager.playAnimation(this, "nianli2_eff", "armatureName", "008_xuanzhong", 0)
                .then(display => {
                    this.groupAni.addChild(display);
                }).catch(reason => {

                });
        }

        public SetItemName() {
            if (!this.isShowName) {
                return;
            }
            this.groupName.visible = false;
            this.groupProperty.visible = false;
            if (this.father.showName) {
                this.groupName.visible = true;
                this.groupProperty.visible = false;
                this.labelName.text = this.generalPsy.name;
            }
            if (this.father.showProp) {
                let useLable: eui.Label = null;
                if (this.father.showName) {
                    this.groupProperty.visible = true;
                    useLable = this.labelProperty;
                } else {
                    this.groupName.visible = true
                    this.groupProperty.visible = false
                    useLable = this.labelName
                }
                let attriType = this.generalPsy.attri_type;
                let attriTypeName = TextsConfig.TextsConfig_Hunter_psychic.attri_type[attriType];
                let attriTypeType = TextsConfig.TextsConfig_Hunter_psychic.attri_type_type[attriType];
                useLable.text = (attriTypeName + "+" + this.value + attriTypeType);
            }
            this.labelName.textColor = ConstantConfig_Common.Color.psy_quality_color[this.quality];
            this.labelProperty.textColor = ConstantConfig_Common.Color.psy_quality_color[this.quality];
        }


        public setInfo(father, index: number, vis: boolean) {
            this.father = father;
            this.index = index;
            // this.effActivationBefIndx = 804100
            // this.effActivationIndx = 804101
            this.isShowName = false;
            // this.isAct = false
            let noEnable = (vis || false) == false;
            // this.labelPsychicName.tex(cc.c3b(212, 224, 238))
            // this.imgSelect.visible = (false)
            this.groupAni.visible = false;
            // this.btnOpen.ex :setEnabled(_noEnable)
        }

        public SetSelectVisible(isVisible: boolean) {
            this.groupAni.visible = isVisible;
        }

        public SetMainItemUI(generalPsy, psyInfo, isEff, isAct, cb?) {
            this.generalPsy = generalPsy
            this.psyInfo = psyInfo
            this.isEff = isEff
            this.isAct = isAct
            this.cbFunc = cb || null;
            this.SetCommonItemUI()
        }

        private SetCommonItemUI() {
            if (this.psyInfo instanceof Object) {
                this.level = this.psyInfo.level
                this.value = this.generalPsy.attri_value[this.level - 1];
                this.quality = Math.floor((this.level + 1) / 2)

                this.SetActivationBeforeEffect(false)
                this.SetPsyItemAndEffect()
            } else {
                this.groupLock.visible = false;
                this.SetActivationBeforeEffect(true)

                this.PlayItemEffect(UIConfig.UIConfig_Psychic.psyPath[this.index])
                this.SetShowTips()
            }
        }

        private SetActivationBeforeEffect(enable) {
            this.groupEffectOpen.visible = enable;
            if (enable && this.effectOpen == null) {
                let thisOne = this;
                Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli_eff", null, [], [])
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        // this.remove(armatureDisplay);
                        thisOne.effectOpen = armatureDisplay;
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            armatureDisplay.animation.stop();
                        }, thisOne)
                        thisOne.effectOpen.animation.play("006_kejihuo", 0);
                        thisOne.groupEffectOpen.addChild(thisOne.effectOpen);
                    });
            } else if (enable) {
                this.effectOpen.animation.play("006_kejihuo", 0);
            }
        }

        // private remove(armatureDisplay) {
        //     armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
        //         armatureDisplay.animation.stop();
        //         armatureDisplay.animation.reset();
        //         armatureDisplay.armature.dispose();
        //         armatureDisplay.dbClear();
        //         armatureDisplay.dispose(true);
        //         if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
        //     }, null);
        // }

        private SetShowTips() {
            this.isShowName = false
            this.groupName.visible = false;
            this.groupProperty.visible = false;
        }

        private SetPsyItemAndEffect() {
            if (this.isAct) {
                this.setPsyEffect()
            } else {
                this.setPsyItem()
            }
        }

        private setPsyItem() {
            let path = this.generalPsy.path;
            path = path.slice(0, Object.keys(path).length - 5);
            path += this.quality + "_png";
            this.groupLock.visible = true;
            this.imgLevelFloor.source = cachekey(UIConfig.UIConfig_Psychic.level[this.quality + 1], this);
            this.labelLevelNum.text = this.level.toString();

            this.PlayItemEffect(path)
            this.SetShowName()
            this.SetItemName()
        }

        private setPsyEffect() {
            this.isAct = false;

            let frameEvt_cb = () => {//bone, evt, originFrameIndex, currentFrameIndex
                // if (evt == "next") {
                this.setPsyItem()
                if (this.cbFunc != null) {
                    this.cbFunc()
                }
                // }
            }

            let animation_cb = () => {//armatureBack, movementType, movementID
                // if (movementType == ccs.MovementEventType.start) {
                Teach.addTeaching()
                // }
            }
            let thisOne = this;
            if (this.effect_act == null) {
                Game.DragonBonesManager.playAnimation(this, "nianli2_eff", "armatureName", "001_jihuo", 1)
                    .then(display => {
                        egret.Tween.get(thisOne).wait(150).call(() => {
                            frameEvt_cb();
                            animation_cb();
                        })
                        thisOne.effect_act = display;
                        thisOne.groupEffectAct.addChild(this.effect_act)
                    }).catch(reason => {

                    });
            } else {
                this.effect_act.animation.play("001_jihuo", 1);
                egret.Tween.get(thisOne).wait(150).call(() => {
                    frameEvt_cb();
                    animation_cb();
                })
            }
        }

        private PlayItemEffect(path) {
            let bone = ["002_huizhang_diguang", "002_huizhang2"]
            let thisOne = this;
            this.imgPsychicPicture.source = cachekey(path, this);
            this.imgPsychicPicture1.source = path;
            this.groupPsychicEffect.visible = true;
            Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli_eff", null, [new eui.Image(), this.imgPsychicPicture], bone)
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    // this.remove(armatureDisplay);
                    this.effect = armatureDisplay;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        armatureDisplay.animation.stop();
                    }, thisOne)
                    thisOne.effect.animation.play("000_daiji", 0);
                    thisOne.groupPsychicEffect.addChild(thisOne.effect);
                });
        }

        private onBtnOpen() {
            if (this.father.reloadSelecte instanceof Function && this.index != null) {
                this.father.reloadSelecte(this.index);
            }
        }

        private SetShowName() {
            this.isShowName = true
            this.groupName.visible = true;
            this.groupProperty.visible = true;
        }
    }
}