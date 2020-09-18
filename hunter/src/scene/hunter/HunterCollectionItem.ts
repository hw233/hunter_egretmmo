namespace zj {
    /**
     * @author xing li wei
     * 
     * @date 2018-1-3
     * 
     * @class 猎人收藏List子项
     */
    export class HunterCollectionItem extends eui.ItemRenderer {
        private groupIcon: eui.Group;
        private imgFrame: eui.Image;
        private imgSkill: eui.Image;
        private labelSkillLevel: eui.BitmapLabel;
        private imgProperty: eui.Image;
        private labelSkillName: eui.Label;
        private labelPlayerInfo: eui.Label;
        private labelInfo: eui.Label;
        private imgDashed: eui.Image;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterCollectionItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterCollectionItem"], null);
        }

        /** 数据源刷新被动执行 */
        protected dataChanged() {
            let data: HunterCollectionItemData = this.data;
            /** 专属主题最后一项 */
            let isSpecial = (data.fatherIndex == 2 && data.index == 2);
            this.imgDashed.source = cachekey("ui_darkland_relic_Line1_png", this);
            this.groupIcon.visible = isSpecial;
            this.labelSkillName.visible = isSpecial;
            this.labelInfo.visible = isSpecial;
            this.imgProperty.visible = !isSpecial;
            this.labelPlayerInfo.visible = !isSpecial;

            let level = 0;
            let step = 0;
            let equipInfo = Game.PlayerHunterSystem.queryHunter(data.generalId).equipInfo;
            for (let i = 0; i < equipInfo.length; i++) {
                let v = equipInfo[i];
                if (v.equipId == data.equipId) {
                    level = (v.level == 0 || v.level == null) ? 1 : v.level;
                    step = (v.step == 0 || v.step == null) ? 1 : v.step;
                }
            }
            if (level == 0 || level == null) {
                level = 1;
            }
            if (step == 0 || step == null) {
                step = 1;
            }

            let baseEquipInfo = TableGeneralEquip.Item(data.equipId);
            let baseEquipAttriMain = TableGeneralEquipAttri.Item(baseEquipInfo.main_attri);
            let baseEquipAttri1 = TableGeneralEquipAttri.Item(baseEquipInfo.add_attri_one);
            let baseEquipAttri2 = TableGeneralEquipAttri.Item(baseEquipInfo.add_attri_two);

            let attriMainNumber = PlayerHunterSystem.equipGetLevelAttribute(baseEquipAttriMain.attri_id, level);
            let attri1Number = PlayerHunterSystem.equipGetStepAttribute(baseEquipAttri1.attri_id, step);
            let attri2Number = null;
            if (baseEquipAttri2 != null) {
                attri2Number = PlayerHunterSystem.equipGetStepAttribute(baseEquipAttri2.attri_id, step);
            }
            if (isSpecial == false) {
                let [attriType, text] = [0, null];
                if (data.index == 0) {
                    attriType = baseEquipAttriMain.attri_type - 1;
                    text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri[attriType], attriMainNumber);
                } else if (data.index == 1) {
                    attriType = baseEquipAttri1.attri_type - 1;
                    text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri1[attriType], attri1Number);
                } else if (data.index == 2) {
                    attriType = baseEquipAttri2.attri_type - 1;
                    text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.Attri1[attriType], attri2Number);
                }
                this.labelPlayerInfo.textFlow = Util.RichText(text);
                let path = UIConfig.UIConfig_Hunter_Equip.collection[attriType];
                this.imgProperty.source = cachekey(path, this);

            } else {
                let skillId = baseEquipInfo.skillId;
                let skillLevel = baseEquipInfo.skillLevel[step - 1];
                let [talentDes1,] = PlayerHunterSystem.GetPassiveSkillDes(skillId[0], skillLevel - 1);
                let [talentDes2,] = skillId.length == 2 ? PlayerHunterSystem.GetPassiveSkillDes(skillId[1], skillLevel - 1) : [null];
                this.labelInfo.textFlow = skillId.length == 2 ? Util.RichText(talentDes1 + talentDes2) : Util.RichText(talentDes1);
                let framePath = UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1];
                let baseTalentInfo = TableGeneralTalent.Item(skillId[0]);
                let skillPath = baseTalentInfo.path;
                this.imgFrame.source = cachekey(framePath, this);
                this.imgSkill.source = cachekey(skillPath, this);

                this.labelSkillLevel.text = skillLevel.toString();
                this.labelSkillName.text = baseTalentInfo.talent_name;
            }
        }
    }

    export class HunterCollectionItemData {
        /**英雄ID */
        generalId: number;

        /**在父类list中的索引 */
        index: number;

        /**装备设置 */
        equipId: number;

        /**父类三个技能索引 */
        fatherIndex: number;
    }
}