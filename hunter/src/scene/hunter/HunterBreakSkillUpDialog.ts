namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-19
     * 
     * @class 猎人突破 技能升级 部分对话框
     */
    export class HunterBreakSkillUpDialog extends Dialog {
        private btnClose: eui.Button;
        private groupTeach: eui.Group;
        private groupLeft: eui.Group;
        private imgFrameLeft: eui.Image;
        private imgIconLeft: eui.Image;
        private labelLevelLeft: eui.Label;
        private imgFrameMiddle: eui.Image;
        private imgIconMiddle: eui.Image;
        private labelLevelMiddle: eui.Label;
        private imgArrow: eui.Image;
        private groupRight: eui.Group;
        private imgFrameRight: eui.Image;
        private imgIconRight: eui.Image;
        private labelLevelRight: eui.Label;
        private labelPlayerInfo: eui.Label;
        private groupUpLevel: eui.Group;
        private groupMaterial: eui.Group;
        private imgFrameMaterials: eui.Image;
        private imgIconMaterials: eui.Image;
        private imgAddMaterials: eui.Image;
        private labelNumberMaterials: eui.Label;
        private groupSkill: eui.Group;
        private imgFrameSkillFragment: eui.Image;
        private imgIconSkillFragment: eui.Image;
        private imgMakeSkillFragment: eui.Image;
        private imgAddSkillFragment: eui.Image;
        private groupBreakStar: eui.Group;
        private labelNumberSkillFragment: eui.Label;
        private labelBreakLevel: eui.Label;
        private imgBreakAwaken: eui.Image;
        private btnFirstAwaken: eui.Button;
        private lableGoldNum: eui.Label;
        private spriteBreakMax: eui.Image;

        private index: number = null; /** 列表索引 */
        private skillLevel: number = null; /** x阶技能 1 - 3 */
        private skillId: number = null; /** 技能ID */
        private generalId: number = null; /** 猎人ID */
        private callback: Function = null;
        public breakSelectedGenerals: Array<number> = [];

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakSkillUpSkin.exml";
            this.init();
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.imgIconMaterials.addEventListener(tap, this.onBtnMaterial, this);
            this.groupSkill.addEventListener(tap, this.onBtnFragment, this);
            this.btnFirstAwaken.addEventListener(tap, this.onBtnUpLevel, this);
        }

        private onBtnClose() {
            PlayerHunterSystem.breakSelectedGenerals = [];
            this.close(UI.HIDE_TO_TOP);
        }

        /** 显示材料获取界面 */
        private onBtnMaterial() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let skillLevel = 1;
            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            let id = this.generalId % CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;
            let upLevelInfos = TableBreakSkillUplevel.Item(id);
            let goodId = upLevelInfos.consume_goods[skillLevel - 1];

            loadUI(Common_OutPutDialog)
                .then((dialog: Common_OutPutDialog) => {
                    dialog.setInfo(goodId, this, () => {
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                })
        }

        /** 显示技能升级界面 */
        private onBtnFragment() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let skillLevel = 1;
            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }
            let id = this.generalId % CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;

            loadUI(HunterBreakPopDialog).then((dialog: HunterBreakPopDialog) => {
                dialog.setHunberBreakSkillUpInfo(this.generalId, skillLevel, id, (isClose: boolean) => {
                    if (isClose) {
                        PlayerHunterSystem.breakSelectedGenerals = [];
                    } else {
                        this.refresh();
                    }
                }, this);

                dialog.show(UI.SHOW_FROM_TOP);
            }).catch(() => {

            });
        }

        /** 点击升级按钮 */
        private onBtnUpLevel() {
            let ids = (this.generalId % CommonConfig.general_id_to_index_multiple) * 10 + this.skillLevel;

            let skillLevel = 1;
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);

            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }

            let hunterList: Array<number> = [];
            let breakUpSkillHunters = PlayerHunterSystem.GetBreakUpSkillHunter(ids, skillLevel, this.generalId);
            if (PlayerHunterSystem.breakSelectedGenerals.length != 0) {
                for (let i = 0; i < PlayerHunterSystem.breakSelectedGenerals.length; i++) {
                    let v = PlayerHunterSystem.breakSelectedGenerals[i];
                    for (let j = 0; j < breakUpSkillHunters.length; j++) {
                        let hunter = breakUpSkillHunters[j];
                        if (hunter.general_id == v) {
                            hunterList.push(v);
                        }
                    }
                }
            }

            let currentBattleValue = hunterInfo.battleValue;

            Game.PlayerHunterSystem.breakSkillUpLevel(this.generalId, this.skillId, this.skillLevel, hunterList).then(() => {
                for (let i = 0; i < hunterList.length; i++) {
                    let v = hunterList[i];
                    Game.PlayerHunterSystem.deleteHunterById(v);
                }

                PlayerHunterSystem.breakSelectedGenerals = [];

                let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
                let [, breakBattleValue] = PlayerHunterSystem.GeneralBreakBattleValue(hunterInfo);

                if (breakBattleValue - currentBattleValue >= 1 && currentBattleValue > 0) { // 提示战斗力提升

                    CommonTipBmfont.promptBattleValue(currentBattleValue, breakBattleValue);


                }

                this.promptActive();

                this.refresh();

                if (this.callback) this.callback();
            });
        }

        private promptActive() {
            let source = cachekey(UIConfig.UIConfig_Hunter.common_hint[5], this);
            let image = new eui.Image(source);

            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                }, this)
                armatureDisplay.animation.play("000_tishi", 1);

                armatureDisplay.x = this.groupTeach.width * 0.32;
                armatureDisplay.y = this.groupTeach.height * 0.5;
                this.groupTeach.addChild(armatureDisplay);
            });
        }

        /**
         * 设置基本信息
         * @param index 列表索引
         * @param breakLevel X阶技能 1 - 3
         * @param skillId 技能ID
         * @param generalId 武将ID
         * @param callback 回调函数
         * @param thisObj 回调对象
         */
        public setInfo(index: number, skillLevel: number, skillId: number, generalId: number, callback: Function, thisObj: any) {
            this.index = index;
            this.skillLevel = skillLevel;
            this.skillId = skillId;
            this.generalId = generalId;
            this.callback = callback;
            // this.thisObj = thisObj;

            this.refresh();
        }

        private refresh() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) return;

            let skillLevel = 1;
            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }

            let isMax = (skillLevel == CommonConfig.general_break_skill_max_level);
            this.imgArrow.visible = !isMax;
            this.imgFrameMiddle.visible = isMax;
            this.imgIconMiddle.visible = isMax;
            this.labelLevelMiddle.visible = isMax;
            this.groupLeft.visible = !isMax;
            this.groupRight.visible = !isMax;
            this.groupUpLevel.visible = !isMax;
            this.spriteBreakMax.visible = isMax;

            let talentInfo = TableGeneralTalent.Item(this.skillId);
            if (isMax) {
                let framePath = UIConfig.UIConfig_Hunter_break.aptitude[4];
                let iconPath = talentInfo.path;
                this.imgFrameMiddle.source = cachekey(framePath, this);
                this.imgIconMiddle.source = cachekey(iconPath, this);

                this.labelLevelMiddle.text = skillLevel.toString();
                let [des,] = PlayerHunterSystem.GetPassiveSkillDes(this.skillId, skillLevel);
                this.labelPlayerInfo.textFlow = Util.RichText(des);
            } else {
                let frameLeft = UIConfig.UIConfig_Hunter_break.aptitude[skillLevel - 1];
                let frameRight = UIConfig.UIConfig_Hunter_break.aptitude[skillLevel];
                let iconPath = talentInfo.path;
                this.imgFrameLeft.source = cachekey(frameLeft, this);
                this.imgIconLeft.source = cachekey(iconPath, this);
                this.imgFrameRight.source = cachekey(frameRight, this);
                this.imgIconRight.source = cachekey(iconPath, this);

                this.labelLevelLeft.text = skillLevel.toString();
                this.labelLevelRight.text = (skillLevel + 1).toString();

                let [des1, attribute1] = PlayerHunterSystem.GetPassiveSkillEquipDes(this.skillId, skillLevel);
                let [, attribute2] = PlayerHunterSystem.GetPassiveSkillEquipDes(this.skillId, skillLevel + 1);

                let attributeStringArray = [];
                for (let i = 0; i < attribute1.length; i++) {
                    let v = attribute1[i];
                    let str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Equip.EquipDes, v, attribute2[i] - v);
                    attributeStringArray.push(str);
                }
                let des = Helper.StringFormat(des1, ...attributeStringArray);
                this.labelPlayerInfo.textFlow = Util.RichText(des);

                this.setConsume();
            }
        }

        private setConsume() {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            let skillLevel = 1;
            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key == this.skillId) {
                    skillLevel = v.value;
                }
            }

            let id = this.generalId % CommonConfig.general_id_to_index_multiple * 10 + this.skillLevel;
            let upLevelInfos = TableBreakSkillUplevel.Item(id);
            let consumeGood = upLevelInfos.consume_goods[skillLevel - 1];
            let consumeCount = upLevelInfos.consume_count[skillLevel - 1];
            let count = PlayerItemSystem.Count(consumeGood);

            // set skill materials info
            let materialFramePath = PlayerItemSystem.ItemFrame(consumeGood);
            let materialIconPath = PlayerItemSystem.ItemPath(consumeGood);

            this.imgAddMaterials.visible = (count < consumeCount);
            this.labelNumberMaterials.text = Helper.StringFormat("%d/%d", count, consumeCount);
            Set.LabelNumberGreenAndRed(this.labelNumberMaterials, count, consumeCount);

            // set fragment info 
            let isExange = Table.FindF(upLevelInfos.exchange_ids[skillLevel - 1], (_, v) => {
                return v == 0;
            });
            let fragmentPath = (isExange) ? UIConfig.UIConfig_General.hunter_donnot_know : PlayerHunterSystem.Head(upLevelInfos.exchange_ids[skillLevel - 1][0]);

            let aptitude = upLevelInfos.exchange_aptitude[skillLevel - 1][0];
            let awakenPath = UIConfig.UIConfig_General.hunter_grade[aptitude];
            this.imgBreakAwaken.visible = (aptitude != 0);

            this.imgFrameMaterials.source = cachekey(materialFramePath, this);
            this.imgIconMaterials.source = cachekey(materialIconPath, this);
            this.imgIconSkillFragment.source = cachekey(fragmentPath, this);
            this.imgBreakAwaken.source = cachekey(awakenPath, this);

            let level = upLevelInfos.exchange_level[skillLevel - 1][0];
            this.labelBreakLevel.visible = (level != 0);
            this.labelBreakLevel.text = level.toString();

            let star = upLevelInfos.exchange_star[skillLevel - 1][0];
            let awaken = upLevelInfos.exchange_awaken[skillLevel - 1][0];
            Helper.SetHeroAwakenStar(this.groupBreakStar, star, awaken);

            this.labelNumberSkillFragment.text = Helper.StringFormat("%d/%d", PlayerHunterSystem.breakSelectedGenerals.length, upLevelInfos.exchange_ids[skillLevel - 1].length);
            Set.LabelNumberGreenAndRed(this.labelNumberSkillFragment, PlayerHunterSystem.breakSelectedGenerals.length, upLevelInfos.exchange_ids[skillLevel - 1].length);

            // set money
            this.lableGoldNum.text = upLevelInfos.consume_money[skillLevel - 1].toString();
        }

    }

}