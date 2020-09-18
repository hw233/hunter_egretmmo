namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-1-10
 * 
 * @class 猎人觉醒成功之后，显示升星动画界面
 */
export class HunterAwakenSuccess extends Dialog {
    private mainGroup: eui.Group;
    private groupAttributes: eui.Group;
    private groupPower: eui.Group;
    private labelPlayerPower: eui.Label;
    private labelTip: eui.Label;
    private groupStar: eui.Group;
    private groupHunter: eui.Group;
    private groupSkill: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelLevel: eui.Label;
    private labelInfo: eui.Label;

    private attributes: Array<eui.Group> = [];
    private generalId: number = null;
    private callback: Function = null;
    private animationEnd: boolean = false;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterAwakenSuccessSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchClose, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.labelTip); // 因为是循环播放，需要特别处理
        }, null);
    }

    public isFullScreen(){
        return true;
    }
    
    private touchClose() {
        if (this.animationEnd == false) return;

        this.close();

        this.callback();
    }

    public setInfo(generalId: number, callback: Function) {
        this.generalId = generalId;
        this.callback = callback;

        this.animationEnd = false;

        this.setHeroInfo(() => {
            this.playAnimation(() => {
                this.animationEnd = true;

                this.mainGroup.setChildIndex(this.labelTip, this.mainGroup.numChildren - 1);

                this.playTipAnimation();
            });
        });
    }

    private setHeroInfo(cb: Function) {
        let hunterInfo = Table.DeepCopy(Game.PlayerHunterSystem.queryHunter(this.generalId));

        let level = hunterInfo.awakePassive.level;
        let [attriCurrent,] = PlayerHunterSystem.AttriAdd(this.generalId, level == 1 ? level : level - 1);
        let [attriNext, desNext] = PlayerHunterSystem.AttriAdd(this.generalId, level);

        for (let i = 0; i < 3; i++) {
            let group = this[`groupAttribute${i + 1}`] as eui.Group;
            let labelName = group.getChildByName(`labelName${i + 1}`) as eui.Label;
            let labelAttributeCurrent = group.getChildByName(`labelAttributeCurrent${i + 1}`) as eui.Label;
            let labelAttributeNext = group.getChildByName(`labelAttributeNext${i + 1}`) as eui.Label;
            let arrow = group.getChildByName(`imgArrow${i + 1}`) as eui.Image;

            if (i < attriNext.length) {
                let name = TextsConfig.TextsConfig_Hunter.AttriName[desNext[i]];

                let [current, next] = ["", ""];
                let v = attriNext[i];
                if (hunterInfo.awakePassive.level == 1) {
                    if (desNext[i] == 24 || desNext[i] == 25) {
                        current = "+0";
                        next = "+" + v;
                    } else {
                        current = "+0%";
                        next = "+" + v + "%";
                    }
                } else {
                    if (attriCurrent[i] == null) {
                        attriCurrent[i] = 0;
                    }

                    if (desNext[i] == 24 || desNext[i] == 25) {
                        current = "+" + attriCurrent[i];
                        next = "+" + v;
                    } else {
                        current = "+" + attriCurrent[i] + "%";
                        next = "+" + v + "%";
                    }
                }

                labelName.text = name;
                labelAttributeCurrent.text = current;
                labelAttributeNext.text = next;
                arrow.visible = true;
            } else {
                labelName.visible = false;
                labelAttributeCurrent.visible = false;
                labelAttributeNext.visible = false;
                arrow.visible = false;
            }

            this.attributes.push(group);
            this.groupAttributes.removeChild(group);
        }

        let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);

        let framePath = UIConfig.UIConfig_Role.skill_awaken_frame[6];
        let headPath = TableGeneralTalent.Item(baseGeneralInfo.awake_passive).path;
        this.imgFrame.source = cachekey(framePath, this);
        this.imgIcon.source = cachekey(headPath, this);

        this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Comment.des_level, hunterInfo.awakePassive.level);
        this.groupSkill.parent.removeChild(this.groupSkill);

        if (hunterInfo.awakePassive.level == 1) {
            this.labelInfo.text = TextsConfig.TextsConfig_Hunter.awakenStart;
        } else {
            this.labelInfo.text = TextsConfig.TextsConfig_Hunter.awakenUpLevel;
        }
        this.labelInfo.parent.removeChild(this.labelInfo);

        Helper.setUpstarImage(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level + 1);
        this.groupStar.parent.removeChild(this.groupStar);

        let battleValue = Set.NumberUnit3(hunterInfo.battleValue);
        this.labelPlayerPower.text = battleValue;
        this.groupPower.parent.removeChild(this.groupPower);

        let roleInfo = TableMapRole.Item(baseGeneralInfo.general_roleId);
        let id = roleInfo.body_spx_id;
        let info = TableClientFightAniSpineSource.Item(id);

        Game.DragonBonesManager.getArmatureDisplayAsync(this, info.json, null)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                armatureDisplay.animation.play(info.ani_name, 0);
                armatureDisplay.x = this.groupHunter.width * 0.5;
                armatureDisplay.y = this.groupHunter.height * 0.5;
                this.groupHunter.parent.removeChild(this.groupHunter);
                setDragonBonesRemove(armatureDisplay);
                this.groupHunter.addChild(armatureDisplay);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                if (cb) cb();
            }).catch(() => {
                if (cb) cb();
            });
    }

    private playTipAnimation() {
        egret.Tween.get(this.labelTip, { loop: true }).
            to({ alpha: 0 }, 1500).
            wait(100);
    }

    private playAnimation(cb: Function) {
        let dbName = "ui_juexing_eff";
        let animationName = "001_juexing";
        let displays = [this.groupPower, this.groupStar, this.groupHunter, this.groupSkill, this.labelInfo];
        let solts = ["005_zhanli", "002_xingxing01", "002_juese", "005_tubiao", "005_wenzi"];
        for (let i = 0; i < this.attributes.length; i++) {
            let display = this.attributes[i];
            let name = `004_shuxing0${4 - i}`;
            if (display) {
                displays.push(display);
                solts.push(name);
            }
        }

        Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

            armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                if (cb) cb();
            }, this);
            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            //     armatureDisplay.animation.stop();
            //     armatureDisplay.animation.reset();
            //     armatureDisplay.armature.dispose();
            //     armatureDisplay.dbClear();
            //     armatureDisplay.dispose(true);
            //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
            // }, null);
            armatureDisplay.animation.play(animationName, 1);

            armatureDisplay.x = this.width / 2;
            armatureDisplay.y = this.height / 2;
            this.mainGroup.addChild(armatureDisplay);

        }).catch((msg) => {
            if (cb) cb();
        });

    }

}

}