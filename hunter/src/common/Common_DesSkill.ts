namespace zj {

/**
 * @author chen xi
 * 
 * @date 2018-12-4
 * 
 * @class 长按列表item点击显示技能详情界面
 */
export class Common_DesSkill extends UI {
    public static ID = "Common_DesSkill";

    private spriteFrame: eui.Image;
    private spriteIcon: eui.Image;
    private labelTextName: eui.Label;
    private labelTextLevel: eui.Label;
    private labelTextType: eui.Label;
    private labelTextInfo: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/common/Common_DesSkillSkin.exml";
    }

    /**
     * 设置技能信息 （自动技能，手动技能）
     * @param skillId 技能ID
     * @param index 索引下标 0 - 1
     * @param level 技能等级
     */
    public setInfoSkill(skillId: number, index: number, level: number) {
        let skillInfo = TableGeneralSkill.Item(skillId);

        this.labelTextName.text = skillInfo.skill_name;
        this.labelTextInfo.text = skillInfo.skill_des;

        let framePath = UIConfig.UIConfig_Role.itemFrame[skillInfo.quality - 1];
        let iconPath = skillInfo.path;
        this.spriteFrame.source = cachekey(framePath, this);
        this.spriteIcon.source = cachekey(iconPath, this);

        if (level == null || level == 0) {
            this.labelTextLevel.text = "";
        } else {
            this.labelTextLevel.text = level.toString();
        }

        if (index != null) {
            this.labelTextType.text = TextsConfig.TextsConfig_Hunter.skill_type[index];
        } else {
            this.labelTextType.text = "";
        }

    }

    /**
     * 设置技能信息 （被动技能，觉醒技能）
     * @param talentId 天赋表ID
     * @param generalId 武将ID
     * @param index 索引 （2-3）
     * @param level 技能等级
     */
    public setInfoLevelSkill(talentId: number, generalId: number, index: number, level: number = 0, biograyShow?: boolean) {
        let info = TableGeneralTalent.Item(talentId);
        if (biograyShow) {
            level = 0;
        } else {
            if (level == 0) {
                let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
                if (hunterInfo == null) return;
                if (index == 2) {
                    level = hunterInfo.passives[0].level;
                } else if (index == 3) {
                    level = hunterInfo.awakePassive.level;
                }
            }
        }

        this.labelTextName.text = info.talent_name;

        let framePath = UIConfig.UIConfig_Role.itemFrame[info.talent_quality];
        let iconPath = info.path;
        this.spriteFrame.source = cachekey(framePath, this);
        this.spriteIcon.source = cachekey(iconPath, this);

        if (index != null) {
            this.labelTextType.text = TextsConfig.TextsConfig_Hunter.skill_type[index];
        } else {
            this.labelTextType.text = "";
        }

        if (level != null && level != 0) {
            let skillInfoList = PlayerHunterSystem.GetSkillEachLvList(generalId, biograyShow);
            let levelDes = skillInfoList[index].upList[level - 1];
            this.labelTextInfo.textFlow = Util.RichText(levelDes);
            this.labelTextLevel.text = String(level);
        } else {
            this.labelTextInfo.textFlow = Util.RichText(info.skill_des);
            this.labelTextLevel.text = "1";
        }
    }

    public setInfoRes(goodsId: number, count: number) {
        let itemSet = PlayerItemSystem.Set(goodsId, 1, count) as any;
        let framePath = itemSet.Frame;
        let iconPath = itemSet.Clip;
        this.spriteFrame.source = cachekey(framePath, this);
        this.spriteIcon.source = cachekey(iconPath, this);

        this.labelTextName.text = itemSet.Info.name;
        this.labelTextType.text = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, count)
    }

    /**
     * 设置技能信息 （被动技能，觉醒技能）
     * @param talentId 天赋表ID
     * @param index 索引 （2-3）
     */
    public setInfoTalent(talentId: number, index: number) {
        let info = TableGeneralTalent.Item(talentId);
        let framePath = PlayerItemSystem.QualityFrame(info.talent_quality);
        let iconPath = info.path;
        let name = info.talent_name;
        let des = PlayerHunterSystem.GetPassiveSkillDesByType(talentId);

        this.spriteFrame.source = cachekey(framePath, this);
        this.spriteIcon.source = cachekey(iconPath, this);

        this.labelTextName.text = name;
        this.labelTextInfo.text = des;
        if (index == 2 || index == 3) {
            this.labelTextType.text = TextsConfig.TextsConfig_Hunter.skill_type[index];
        } else {
            this.labelTextType.text = "";
        }
        this.labelTextLevel.text = "1";
    }

}

}