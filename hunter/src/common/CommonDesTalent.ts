namespace zj {
    /**
     * @author chen xi.
     * 
     * @date 2019-1-24
     * 
     * @class 天赋效果描述
     */
    export class CommonDesTalent extends UI {
        public imgFrame: eui.Image;
        public imgIcon: eui.Image;
        public labelName: eui.Label;
        public labelType1: eui.Label;
        public labelType2: eui.Label;
        public labelType3: eui.Label;
        constructor() {
            super();
            this.skinName = "resource/skins/common/CommonDesTalentSkin.exml";
        }
        public setInfoByBreak(id: number, level: number) {
            let talentInfo = TableGeneralTalent.Item(id);
            if (!talentInfo) return;
            let framePath = UIConfig.UIConfig_Role.itemFrame[talentInfo.talent_quality];
            this.imgFrame.source = cachekey(framePath, this);
            this.imgIcon.source = cachekey(talentInfo.path, this);
            this.labelName.text = talentInfo.talent_name;
            for (let i = 1; i <= 3; i++) {
                let [des,] = PlayerHunterSystem.GetPassiveSkillDes(id, i);
                this["labelType" + i].textFlow = Util.RichText("Lv." + i + " " + des);
                if (i > level) {
                    this["labelType" + i].textColor = 0x9E9E9E;
                }
            }
        }
    }
}