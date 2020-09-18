namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-12
 * 
 * @class 猎人念力组合效果item.
 */
export class HunterPsychicGroupItem extends UI {
    private groupAniEffect: eui.Group;
    private imgVoid: eui.Image;
    private imgGroupName: eui.Image;
    private imgGroupPicBack: eui.Image;
    private groupAdd: eui.Group;
    private imgLevelFloor: eui.Image;
    private labelLevelNum: eui.BitmapLabel;
    private groupAni: eui.Group;
    private imgGroupPic: eui.Image;

    private index;
    private info;
    private father: HunterPsychic;
    private isUp;
    private isAct;
    private effect = null;
    private update: number = 0;
    private effBGAni = null;
    private effBGIndex = [4, 5, 6, 7, 3];
    public constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicGroupItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterPsychicGroupItem"], null);
        this.init();
    }

    private init() {
        let thisOne = this;
        Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                thisOne.effBGAni = armatureDisplay;
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    armatureDisplay.animation.stop();
                }, thisOne)
                thisOne.effBGAni.animation.play("005_taozhuang_lan", 0);
                thisOne.groupAniEffect.addChild(thisOne.effBGAni);
            });
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEND, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onEND, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => { this.father = null }, this)
    }
    private onBegin() {
        this.update = egret.setInterval(() => {
            this.father.lodeUI(this.info);
            egret.clearInterval(this.update);
        }, this, 300)
    }

    private onEND() {
        egret.clearInterval(this.update);
    }

    private SetEmptyItem() {
        this.imgVoid.visible = true;
        this.imgGroupPic.visible = false;
        this.imgGroupPicBack.visible = false;
        this.groupAni.visible = false;
        this.groupAniEffect.visible = false;
        this.imgLevelFloor.visible = false;
        this.labelLevelNum.visible = false;
    }

    private SetGroupItem() {
        this.imgVoid.visible = false;
        this.imgGroupPic.visible = true;
        this.imgGroupPicBack.visible = true;
        this.groupAniEffect.visible = true;
        this.imgLevelFloor.visible = true;
        this.labelLevelNum.visible = true;
        let str = this.info.path;
        str = str.slice(0, Object.keys(this.info.path).length - 5);
        str += Math.floor((this.info.psychic.level + 1) / 2) + "_png"

        this.imgGroupPic.source = cachekey(str, this);
        this.imgGroupPicBack.source = str;
        this.imgLevelFloor.source = cachekey(UIConfig.UIConfig_Psychic.level[Math.floor((this.info.psychic.level + 1) / 2) + 1], this);
        this.labelLevelNum.text = this.info.psychic.level;
    }

    public SetInfo(index, info, father, isUp, isAct) {
        this.index = index;
        this.info = info;
        this.father = father;
        this.isUp = isUp || false;
        this.isAct = isAct || false;
        if (this.info == 0) {
            this.SetEmptyItem()
        } else {
            if (this.isUp) {
                this.SetGroupItemAni()
            } else {
                this.SetGroupItem()
            }
            if (this.isAct) {
                this.SetGroupBGAni()
            }
        }
    }

    private SetGroupItemAni() {
        this.groupAni.visible = true;
        if (this.effect == null) {
            let thisOne = this;
            Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    thisOne.effect = armatureDisplay;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        armatureDisplay.animation.stop();
                        this.SetGroupItem()
                    }, thisOne)
                    thisOne.effect.animation.play("002_jihuo_taozhuang", 1);
                    thisOne.groupAni.addChild(thisOne.effect);
                });
        } else {
            this.effect.animation.play("002_jihuo_taozhuang", 1);
        }
    }

    private SetGroupBGAni() {
        let quality = Math.floor((this.info.psychic.level + 1) / 2);
        if (this.effBGIndex[quality - 1] == 3) {
            this.effBGAni.animation.play("003_taozhuang_bai", 0);
        } else if (this.effBGIndex[quality - 1] == 4) {
            this.effBGAni.animation.play("004_taozhuang_lv", 0);
        } else if (this.effBGIndex[quality - 1] == 5) {
            this.effBGAni.animation.play("005_taozhuang_lan", 0);
        } else if (this.effBGIndex[quality - 1] == 6) {
            this.effBGAni.animation.play("006_taozhuang_zi", 0);
        } else if (this.effBGIndex[quality - 1] == 7) {
            this.effBGAni.animation.play("007_taozhuang_cheng", 0);
        }
    }
}

}