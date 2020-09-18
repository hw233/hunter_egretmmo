namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-1-23
 * 
 * @class 猎人突破解锁动画
 */
export class HunterBreakSkillUnlock extends Dialog {
    private labelSucceed: eui.Label;
    private labelClose: eui.Label;
    private groupSkill: eui.Group;
    private imgSkill: eui.Image;
    private labelInclude: eui.Label;
    private groupSkill1: eui.Group;
    private groupSkill2: eui.Group;
    private groupSkill3: eui.Group;
    private groupAnimation: eui.Group;
    private callback: Function;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterBreakSkillUnlockSkin.exml";
        this.labelClose.visible = false;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.labelClose); // 因为是循环播放，需要特别处理
        }, null);
    }

    public setInfo(generalId: number, cb: Function) {

        this.callback = cb;

        let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
        let breakLevel = hunterInfo.break_level;

        this.labelSucceed.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.breakSuccess, breakLevel);

        if (breakLevel == 1) {
            this.imgSkill.source = cachekey("ui_hunter_break_ButtonSkill1Nor_png", this);
        } else if (breakLevel == 2) {
            this.imgSkill.source = cachekey("ui_hunter_break_ButtonSkill2Nor_png", this);
        } else if (breakLevel == 3) {
            this.imgSkill.source = cachekey("ui_hunter_break_ButtonSkill3Nor_png", this);
        }

        let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
        let hunterSkill = baseGeneralInfo.break_skill[breakLevel - 1];
        for (let i = 0; i < hunterSkill.length; i++) {
            let v = hunterSkill[i];
            let talentInfo = TableGeneralTalent.Item(v);

            let framePath = UIConfig.UIConfig_Role.itemFrame[talentInfo.talent_quality];
            let iconPath = talentInfo.path;
            this[`imgFrame${i + 1}`].source = cachekey(framePath,this);
            this[`imgIcon${i + 1}`].source = cachekey(iconPath,this);

            this[`labelLevel${i + 1}`].text = 1;
        }

        let path = [this.groupSkill, this.groupSkill1, this.groupSkill2, this.groupSkill3, this.labelInclude];
        let bones = ["001_jiesuo_tubiao2", "001_jiesuo_jineng1", "001_jiesuo_jineng2", "001_jiesuo_jineng3", "001_jiesuo_wenzi"];
        Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null, path, bones).then((display: dragonBones.EgretArmatureDisplay) => {

            display.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                this.playTipsAnimation();
            }, this);
            // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            //     display.animation.stop();
            //     display.animation.reset();
            //     display.armature.dispose();
            //     display.dbClear();
            //     display.dispose(true);
            //     if (display.parent) display.parent.removeChild(display);
            // }, null);
            display.x = this.groupAnimation.width * 0.5;
            display.y = this.groupAnimation.height * 0.5;
            this.groupAnimation.addChild(display);

            display.animation.play("004_jineng_jiesuo", 1);
        })
    }

    private playTipsAnimation() {
        this.labelClose.visible = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnd, this);
        egret.Tween.get(this.labelClose, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000);
    }

    private onTouchEnd() {
        this.close(UI.HIDE_TO_TOP);
        if (this.callback) this.callback();
    }
}

}