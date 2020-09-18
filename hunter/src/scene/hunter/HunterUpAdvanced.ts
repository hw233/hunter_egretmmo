namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-17
 * 
 * @class 猎人进阶
 */
export class HunterUpAdvanced extends Dialog {
    private mainGroup: eui.Group;
    private groupAni: eui.Group;
    private groupTips: eui.Group;
    private imgTips: eui.Image;
    private groupIcon: eui.Group;
    private imgFrameLast: eui.Image;
    private imgHeadLast: eui.Image;
    private groupStarLast: eui.Group;
    private labelNameLast: eui.Label;
    private labelPowerLast: eui.Label;
    private imgFrameCurrent: eui.Image;
    private imgHeadCurrent: eui.Image;
    private groupStarCurrent: eui.Group;
    private labelNameCurrent: eui.Label;
    private labelPowerCurrent: eui.Label;
    private groupAttributes: eui.Group;
    private labelTip: eui.Label;
    private groupbg: eui.Group;
    private imgbg: eui.Image;
    private callback: Function;
    private generalId: number;
    private oldValue: number;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterUpAdvancedSkin.exml"
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.labelTip); // 因为是循环播放，需要特别处理
            egret.Tween.removeTweens(this);
        }, this);

        this.mainGroup.scaleX = this.mainGroup.scaleY = 0;
    }

    public setInfo(generalId: number, oldValue: number, cb?: Function) {
        this.generalId = generalId;
        this.oldValue = oldValue;
        this.callback = cb;

        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_diban", "armatureName", "007_diban4_xunhuan", 0)
            .then(display => {
                display.x = this.groupAni.width / 2;
                display.y = this.groupAni.height / 2;
                this.groupAni.addChild(display);
            });
        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "001_beijignguang_02", 0)
            .then(display => {
                display.scaleX = 0.9;
                display.scaleY = 0.9;
                display.x = this.groupbg.width / 2;
                this.groupbg.addChild(display);
            });

        Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [this.imgTips], ["003_wenzi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
            armatureDisplay.animation.play("001_xunhuan", 0);
            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            //     armatureDisplay.animation.stop();
            //     armatureDisplay.animation.reset();
            //     armatureDisplay.armature.dispose();
            //     armatureDisplay.dbClear();
            //     armatureDisplay.dispose(true);
            //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
            // }, null);
            armatureDisplay.x = this.groupTips.width / 2;
            armatureDisplay.y = this.groupTips.height / 2;
            this.groupTips.addChild(armatureDisplay);
        });

        let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);

        let lastFramePath = UIConfig.UIConfig_Role.heroFrame[hunterInfo.step - 1];
        let currentFramePath = UIConfig.UIConfig_Role.heroFrame[hunterInfo.step];
        let headPath = PlayerHunterSystem.Head(this.generalId);

        this.imgFrameLast.source = cachekey(lastFramePath, this);
        this.imgFrameCurrent.source = cachekey(currentFramePath, this);
        this.imgHeadLast.source = cachekey(headPath, this);
        this.imgHeadCurrent.source = cachekey(headPath, this);

        Helper.SetHeroAwakenStar(this.groupStarLast, hunterInfo.star, hunterInfo.awakePassive.level);
        Helper.SetHeroAwakenStar(this.groupStarCurrent, hunterInfo.star, hunterInfo.awakePassive.level);

        let [lastName, lastNameColor] = PlayerHunterSystem.Str_NameGr(this.generalId, hunterInfo.step - 1);
        this.labelNameLast.text = lastName;
        this.labelNameLast.textColor = lastNameColor;

        let [currentName, currentNameColor] = PlayerHunterSystem.Str_NameGr(this.generalId, hunterInfo.step);
        this.labelNameCurrent.text = currentName;
        this.labelNameCurrent.textColor = currentNameColor;

        this.labelPowerLast.text = this.oldValue.toString();
        this.labelPowerCurrent.text = hunterInfo.battleValue.toString();

        this.setAttributesInfo();

        this.groupIcon.x = -this.groupIcon.width;
        this.groupIcon.visible = false;
        this.groupAttributes.x = -this.groupAttributes.width;
        this.groupAttributes.visible = false;

        this.showAnimation();
    }

    private setAttributesInfo() {
        let hunterInfoNext = Table.DeepCopy(Game.PlayerHunterSystem.queryHunter(this.generalId));
        let hunterInfoCurrent = Table.DeepCopy(hunterInfoNext);
        hunterInfoCurrent.step -= 1;
        hunterInfoCurrent.partner = [1, 2, 3, 4];

        let [name, current, next] = ["", "", ""];
        let [attrCurrent,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoCurrent);
        let [attrNext,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoNext);

        let shows = [...TableEnum.EnumHunterAttriShow2];
        for (let i = 0; i < shows.length; i++) {
            let v = shows[i];
            name = Helper.StringFormat("%s", TextsConfig.TextsConfig_HeroMain.attr[v]);
            current = Helper.StringFormat("+%d", Math.ceil(attrCurrent[v - 1]));
            next = Helper.StringFormat("+%d", Math.ceil(attrNext[v - 1]));
            if (v == 8) {
                current += "%";
                next += "%";
            }
            this[`labelAttributeName${i + 1}`].text = name;
            this[`labelAttributeCurrent${i + 1}`].text = current;
            this[`labelAttributeNext${i + 1}`].text = next;
        }
    }

    private showAnimation() {
        this.slow();

        egret.Tween.get(this).wait(1500).call(() => {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        });
    }

    private slow() {
        egret.Tween.get(this.mainGroup).to({ scaleX: 1, scaleY: 1 }, 500).wait(100).call(() => {
            let destX = (this.groupIcon.parent.width - this.groupIcon.width) * 0.5;
            egret.Tween.get(this.groupIcon).call(() => {
                this.groupIcon.visible = true;
            }).to({ x: destX }, 500).call(() => {

                let attributeX = (this.groupAttributes.parent.width - this.groupAttributes.width) * 0.5;
                egret.Tween.get(this.groupAttributes).call(() => {
                    this.groupAttributes.visible = true;
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
                }).to({ x: attributeX }, 500);
            });
        });

        egret.Tween.get(this.labelTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 500);
    }

    private onBtnClose() {
        if (this.callback) {
            this.callback();
        }
        this.close(UI.HIDE_TO_TOP);
    }
}

}