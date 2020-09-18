namespace zj {
/**
     * @author chen xi
     * @date 2018-12-23
     * @class 猎人技能等级描述
     */
export class HunterSkillInfoItem extends eui.ItemRenderer {
        private labelLevel: eui.Label;
        private labelDes: eui.Label;

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterSkillInfoItemSkin.exml";
            this.labelLevel.lineSpacing = 4;
            cachekeys(<string[]>UIResource["HunterSkillInfoItem"], null);
        }

        protected dataChanged() {
            this.updateView(this.data);
        }

        private updateView(data: HunterSkillInfoItemData) {
            if (data.vis != null && data.vis == true) {
                this.SetBreakMax();
            } else if (data.vis != null && data.vis == false) {
                this.SetStarMax();
            } else {
            this.labelLevel.visible = true;
            this.labelLevel.text = "Lv." + data.level.toString();
            this.labelDes.textFlow = Util.RichText(data.info);
                this.labelLevel.alpha = (data.isFade) ? 1.0 : 100 / 255;
            this.labelDes.alpha = (data.isFade) ? 1.0 : 100 / 255;
                this.height = this.labelDes.textHeight + 10;
            }
        }

        private SetBreakMax() {
            this.labelLevel.visible = false;
            this.labelDes.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.level_break_max);
            this.labelDes.alpha = 1;
        }

        private SetStarMax() {
            this.labelLevel.visible = false;
            this.labelDes.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.level_star_max);
            this.labelDes.alpha = 1;
        }
}

export class HunterSkillInfoItemData {
        level: number;
        generalId: number;
        info: string;
        isFade: boolean = false;
        vis: boolean;
}
}