namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-14
     * 
     * @class 猎人升星成功界面
     */
    export class HunterUpStarSuccess extends Dialog {
        private mainGroup: eui.Group;
        private groupAttributes: eui.Group;
        private groupPower: eui.Group;
        private labelPlayerPower: eui.Label;
        private labelTip: eui.Label;
        private groupStar: eui.Group;
        private groupHunter: eui.Group;

        private attributes: Array<eui.Group> = [];
        private generalId: number = null;
        private callback: Function = null;
        private thisObj: any = null;
        private animationEnd: boolean = false;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterUpStarSuccessSkin.exml";

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchClose, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this.labelTip); // 因为是循环播放，需要特别处理
            }, null);
        }
        public isFullScreen() {
            return true;
        }

        public setInfo(id: number, cb: Function, thisObj: any) {
            this.generalId = id;
            this.callback = cb;
            this.thisObj = thisObj;

            this.animationEnd = false;

            this.setHeroInfo(() => {
                this.playAnimation(() => {
                    this.animationEnd = true;

                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });

                    this.mainGroup.setChildIndex(this.labelTip, this.mainGroup.numChildren - 1);

                    this.playTipAnimation();
                });
            });
        }

        private setHeroInfo(cb: Function) {
            let hunterInfoNext = Table.DeepCopy(Game.PlayerHunterSystem.queryHunter(this.generalId));
            let hunterInfoCurrent = Table.DeepCopy(hunterInfoNext) as message.GeneralInfo;
            hunterInfoCurrent.star -= 1;

            Helper.setUpstarImage(this.groupStar, hunterInfoCurrent.star + 1, hunterInfoCurrent.awakePassive.level + 1);

            let upLevel = Game.PlayerHunterSystem.Table(this.generalId).up_star_add_skillLevel[hunterInfoCurrent.star - 1]
            if (upLevel != 0) {
                let [str1, str2, str3] = ["", "", ""];
                str1 = TextsConfig.TextsConfig_Hunter.level_max;
                str2 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId) - upLevel);
                str3 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId));
                let group = this[`groupAttribute5`] as eui.Group;
                let labelName = group.getChildByName("labelName5") as eui.Label;
                labelName.text = str1 + "" + str2;
                let labelAttributeCurrent = group.getChildByName(`labelAttributeCurrent5`) as eui.Label;
                labelAttributeCurrent.text = "";
                let labelAttributeNext = group.getChildByName(`labelAttributeNext5`) as eui.Label;
                labelAttributeNext.text = str3;
            } else {
                let group = this[`groupAttribute5`] as eui.Group;
                group.visible = false;
            }
            this.attributes.push(this["groupAttribute5"]);


            let [attrCurrent,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoCurrent);
            let [attrNext,] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoNext);
            let attriShow = [...TableEnum.EnumHunterAttriShow2];
            for (let i = 0; i < attriShow.length; i++) {
                let v = attriShow[i];
                let name = Helper.StringFormat("%s", TextsConfig.TextsConfig_HeroMain.attr[v]);
                let current = Helper.StringFormat("+%d", Math.ceil(attrCurrent[v - 1]));
                let next = Helper.StringFormat("+%d", Math.ceil(attrNext[v - 1]));

                if (v == TableEnum.EnumGelAttrib.ATTR_PHY_CRIT ||
                    v == TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA) {
                    current += "%";
                    next += "%";
                }

                let group = this[`groupAttribute${i + 1}`] as eui.Group;
                let labelName = group.getChildByName(`labelName${i + 1}`) as eui.Label;
                labelName.text = name;
                let labelAttributeCurrent = group.getChildByName(`labelAttributeCurrent${i + 1}`) as eui.Label;
                labelAttributeCurrent.text = current;
                let labelAttributeNext = group.getChildByName(`labelAttributeNext${i + 1}`) as eui.Label;
                labelAttributeNext.text = next;
                this.attributes.push(group);
                this.groupAttributes.removeChild(group);
            }
            // let uplevel = TableBaseGeneral.Item(this.generalId % CommonConfig.general_id_to_index_multiple).up_star_add_skillLevel[hunterInfoNext.star - 1];
            // if (uplevel != 0) {
            //     let item = new HunterUpStarAttributeItem();
            //     let name: string, value: string, nextValue: string;
            //     name = TextsConfig.TextsConfig_Hunter.level_max
            //     value = Helper.StringFormat("          " + TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId))
            //     nextValue = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId) + uplevel)
            //     this["labelName5"].text = name
            //     this["labelAttributeCurrent5"].text = value
            //     this["labelAttributeNext5"].text = nextValue;
            //     let group = this[`groupAttribute${5}`] as eui.Group;
            //     this.attributes.push(group);
            // }

            let battleValue = Set.NumberUnit3(hunterInfoNext.battleValue);
            this.labelPlayerPower.text = battleValue;

            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            let roleInfo = TableMapRole.Item(baseGeneralInfo.general_roleId);
            let id = roleInfo.body_spx_id;
            // let scale = roleInfo.body_scale ? roleInfo.body_scale : 1.0;
            let info = TableClientFightAniSpineSource.Item(id);

            Game.DragonBonesManager.getArmatureDisplayAsync(this, info.json, null)
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    armatureDisplay.animation.play(info.ani_name, 0);
                    armatureDisplay.x = this.groupHunter.width * 0.5;
                    armatureDisplay.y = this.groupHunter.height * 0.5;
                    this.groupHunter.parent.removeChild(this.groupHunter);
                    setDragonBonesRemove(armatureDisplay);
                    this.groupHunter.addChild(armatureDisplay);
                    // 
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

        private playAnimation(cb: Function) {
            let dbName = "ui_juexing_eff";
            let animationName = "000_shengxing";
            let displays = [...this.attributes, this.groupPower, this.groupStar, this.groupHunter];
            let solts = ["004_shuxing00", "004_shuxing04", "004_shuxing03", "004_shuxing02", "004_shuxing01", "005_zhanli", "002_xingxing01", "002_juese"];

            Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                    if (cb) cb();
                }, this);

                armatureDisplay.animation.play(animationName, 1);

                armatureDisplay.x = this.width / 2;
                armatureDisplay.y = this.height / 2;
                this.mainGroup.addChild(armatureDisplay);

            }).catch((msg) => {
                if (cb) cb();
            });

        }

        private playTipAnimation() {
            egret.Tween.get(this.labelTip, { loop: true }).
                to({ alpha: 0 }, 1500).
                wait(100);
        }

        private touchClose() {
            if (this.animationEnd == false) return;

            this.close();
            this.callback.call(this.thisObj);
        }
    }

}