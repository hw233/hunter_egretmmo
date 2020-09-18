namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-6
     * 
     * @class 猎人突破显示技能对话框, X阶突破技
     */
    export class HunterBreakSkillDialog extends Dialog {
        private btnClose: eui.Button;
        private imgTitle: eui.Image;
        private listStarAward: eui.List;
        private listData: eui.ArrayCollection = new eui.ArrayCollection();
        private labelCondition: eui.Label;

        /** 技能等级， 1-3 */
        private index: number = null;
        private generalId: number = null;
        private callback: Function;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakSkillDialogSkin.exml";

            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }

        public onBtnUsing(data: HunterBreakSkillDialogItemData) {
            let battleValue = Game.PlayerHunterSystem.queryHunter(data.generalId).battleValue;

            Game.PlayerHunterSystem.breakSkillUsing(data.generalId, data.skillId, data.skillLevel).then(() => {
                this.promptBattle(battleValue);
                this.refresh();
                if (this.callback) this.callback();
            });
        }

        // 显示技能升级界面
        public onBtnUpLevel(data: HunterBreakSkillDialogItemData) {
            let battleValue = Game.PlayerHunterSystem.queryHunter(data.generalId).battleValue;

            loadUI(HunterBreakSkillUpDialog)
                .then((upDialog: HunterBreakSkillUpDialog) => {

                    upDialog.setInfo(data.index, data.skillLevel, data.skillId, data.generalId, () => {
                        // 升级技能成功
                        this.refresh();

                        this.promptBattle(battleValue);

                        if (this.callback) this.callback(true);
                    }, this);
                    upDialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private promptBattle(lastBattleValue: number) {
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo.battleValue > lastBattleValue) {
                CommonTipBmfont.promptBattleValue(lastBattleValue, hunterInfo.battleValue);
            }
        }

        private onTouchEnd() {
            let obj = this.getChildByName("hunter-break-skill-talent-des");
            if (obj) this.removeChild(obj);
        }

        public onListItemTouch(begin: boolean, data: HunterBreakSkillDialogItemData) {
            if (!begin) {
                let obj = this.getChildByName("hunter-break-skill-talent-des");
                if (obj) this.removeChild(obj);
                return;
            }

            let point = this.localToGlobal(this[`group`].x, this[`group`].y);
            point.x -= Game.UIManager.x;

            loadUI(CommonDesTalent).then((ui: CommonDesTalent) => {
                ui.setInfoByBreak(data.skillId, data.breakLevel);
                ui.name = "hunter-break-skill-talent-des";
                ui.x = point.x - 115;
                if (data.index == 0 || data.index == 1) {
                    ui.y = point.y + 50 + 106 * (data.index + 1);
                } else {
                    ui.y = point.y + 70 + 106 * data.index - ui.height;
                }
                this.addChild(ui);
            });
        }

        /**
         * 设置信息
         * @param index X阶技能, 1-3
         * @param generalId 武将ID
         * @param callback 回调函数， 使用技能成功回调该函数
         * @param thisObj 回调this对象
         */
        public setInfo(index: number, generalId: number, callback: Function, thisObj?: any) {
            this.callback = callback;
            this.index = index;
            this.generalId = generalId;

            this.refresh();
        }

        private refresh() {
            let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
            let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseGeneralInfo == null || hunterInfo == null) return;

            // 标题
            let titlePath = UIConfig.UIConfig_Hunter_break.breakTitle[this.index - 1];
            this.imgTitle.source = cachekey(titlePath, this);

            // 列表信息
            this.listData.removeAll();
            let currentSkills = Table.DeepCopy(baseGeneralInfo.break_skill[this.index - 1]) as Array<number>;// 取本地表里当前技能等级(1-3)下的技能id数组
            for (let i = 0; i < currentSkills.length; i++) {
                let v = currentSkills[i];
                let data = new HunterBreakSkillDialogItemData();
                data.index = i;
                data.generalId = this.generalId;
                data.skillId = v;
                data.breakLevel = hunterInfo.break_level;
                data.skillLevel = this.index;
                data.father = this;
                this.listData.addItem(data);
            }
            this.listStarAward.dataProvider = this.listData;
            this.listStarAward.itemRenderer = HunterBreakSkillDialogItem;

            // 标签
            let currentBreakSkills = baseGeneralInfo.break_skill[this.index - 1];
            let skillList: Array<number> = [];
            for (let i = 0; i < currentBreakSkills.length; i++) {
                let v = currentBreakSkills[i];
                for (let j = 0; j < hunterInfo.using_break_skill.length; j++) {
                    let vv = hunterInfo.using_break_skill[j];
                    if (v === vv) {
                        skillList.push(v);
                    }
                }
            }

            if (hunterInfo.break_level + 3 > this.index * 3) {
                if (skillList.length == 0) {
                    this.labelCondition.text = TextsConfig.TextsConfig_Hunter_Break.condition1;
                } else {
                    this.labelCondition.text = TextsConfig.TextsConfig_Hunter_Break.condition2;
                }
            } else {
                this.labelCondition.text = TextsConfig.TextsConfig_Hunter_Break.condition3;
            }
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }
    }

}