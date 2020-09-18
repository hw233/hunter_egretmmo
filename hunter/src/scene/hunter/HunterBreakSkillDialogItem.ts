namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-6
     * 
     * @class 猎人突破显示技能对话框Item 
     */
    export class HunterBreakSkillDialogItem extends eui.ItemRenderer {
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private imgUsing: eui.Image;
        private labelLevel: eui.Label;
        private labelName: eui.Label;
        private labelDescribe: eui.Label;
        private btnUsing: eui.Button;
        private btnUpLevel: eui.Button;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakSkillDialogItemSkin.exml";

            this.btnUsing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUsing, this);
            this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpLevel, this);

            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                (this.data as HunterBreakSkillDialogItemData).father.onListItemTouch(true, this.data);
            }, this);
            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                (this.data as HunterBreakSkillDialogItemData).father.onListItemTouch(false, this.data);
            }, this);
            cachekeys(<string[]>UIResource["HunterBreakSkillDialogItem"], null);
        }

        protected dataChanged() {
            this.updateView(this.data);
        }

        private updateView(data: HunterBreakSkillDialogItemData) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
            let skillLevel = 1;
            for (let i = 0; i < hunterInfo.break_skill.length; i++) {
                let v = hunterInfo.break_skill[i];
                if (v.key === data.skillId) {
                    skillLevel = v.value;
                }
            }
            let [desText,] = PlayerHunterSystem.GetPassiveSkillDes(data.skillId, skillLevel);
            this.labelDescribe.textFlow = Util.RichText(desText);
            let talentInfo = TableGeneralTalent.Item(data.skillId);
            this.labelName.text = talentInfo.talent_name;

            let framePath = UIConfig.UIConfig_Hunter_break.aptitude[((hunterInfo.break_level - (data.skillLevel - 1) * 3) > 0 ? (hunterInfo.break_level - (data.skillLevel - 1) * 3) : 1) - 1];
            let iconPath = talentInfo.path;
            this.imgFrame.source = cachekey(framePath, this);
            this.imgIcon.source = cachekey(iconPath, this);

            this.labelLevel.text = (hunterInfo.break_level - (data.skillLevel - 1) * 3) > 0 ? (hunterInfo.break_level - (data.skillLevel - 1) * 3).toString() : "1"; // skillLevel);

            this.setButtonState(data);
        }

        private setButtonState(data: HunterBreakSkillDialogItemData) {
            if (data.breakLevel < data.skillLevel) {
                this.btnUsing.visible = true;
                this.btnUsing.enabled = false;
                this.btnUpLevel.enabled = false;
                this.imgUsing.visible = false;
            } else {
                let usingSkills = Game.PlayerHunterSystem.queryHunter(data.generalId).using_break_skill;
                let using = Table.FindF(usingSkills, (_, v) => {
                    return v === data.skillId;
                });

                this.btnUsing.visible = !using;
                this.imgUsing.visible = using;
                this.btnUpLevel.enabled = true;
            }
        }

        private onBtnUsing() {
            (this.data as HunterBreakSkillDialogItemData).father.onBtnUsing(this.data);
        }

        private onBtnUpLevel() {
            (this.data as HunterBreakSkillDialogItemData).father.onBtnUpLevel(this.data);
        }

    }

    export class HunterBreakSkillDialogItemData {
        /** 技能索引*/
        index: number;

        /** 武将id */
        generalId: number;

        /** 技能id */
        skillId: number;

        /** 突破等级 */
        breakLevel: number;

        /** x阶技能 1 - 3*/
        skillLevel: number;

        father: HunterBreakSkillDialog = null;
    }
}