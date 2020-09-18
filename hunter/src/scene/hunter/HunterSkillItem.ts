namespace zj {
    /**
 * @author chen xi
 * 
 * @date 2018-12-23
 * 
 * @class 猎人技能item
 */
    export class HunterSkillItem extends eui.ItemRenderer {
    private imgBoard: eui.Image;
        private imgFrame: eui.Image;
    private imgSelected: eui.Image;
    private imgAwake: eui.Image;
    private imgIcon: eui.Image;
        private labelLevel: eui.BitmapLabel;
    private imgTypeIcon: eui.Image;
        private imgIocnAwaken: eui.Image;
    private imgActivity: eui.Image;
        private imgTransformLvNum: eui.Image;


    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterSkillItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterSkillItem"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            // (this.data as HunterSkillItemData).father.onItemTap(true, this.data);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            // (this.data as HunterSkillItemData).father.onItemTap(false, this.data);
        }, this);
    }

    protected dataChanged() {

        this.updateView(this.data);
    }

    public SetSelect(sel: boolean) {
        let data = this.data as HunterSkillItemData;
        this.imgBoard.visible = sel;
        this.imgSelected.visible = sel;
        if (sel && data.index != 3) {
            this.imgAwake.source = cachekey(UIConfig.UIConfig_Hunter.frameSkillSel, this);
        } else if (!sel && data.index != 3) {
            this.imgAwake.source = cachekey(UIConfig.UIConfig_Hunter.frameSkillNor, this);
        }
    }

    private updateView(data: HunterSkillItemData) {
        data.father.subitem = this;
        this.imgBoard.visible = false;
        this.imgActivity.visible = false;

        let hunterInfo = Game.PlayerHunterSystem.queryHunter(data.generalId);
        this.labelLevel.visible = true;
        let iconPath = "";
            let framePath = "ui_frame_FrameSkill_png";
            this.imgSelected.source = cachekey(UIConfig.UIConfig_Activity_Battle.spriteframe[2], this);
        if (data.index == 2) { // 被动技能
            this.labelLevel.text = hunterInfo.passives[0].level.toString();
            iconPath = TableGeneralTalent.Item(data.skillId).path;
                this.imgIocnAwaken.visible = false;
                this.imgTransformLvNum.visible = false;
        } else if (data.index == 3) { // 觉醒技能
            this.labelLevel.visible = (hunterInfo.awakePassive.level != 0);
            this.labelLevel.text = hunterInfo.awakePassive.level.toString();

            this.imgActivity.visible = (hunterInfo.awakePassive.level == 0);
            iconPath = TableGeneralTalent.Item(data.skillId).path;

                this.imgTransformLvNum.visible = false;
                this.imgIocnAwaken.visible = false;
            } else if (data.index == 4) { // 猎人故事
                this.labelLevel.visible = false;
                this.imgTransformLvNum.visible = (true)
                this.imgTransformLvNum.source = cachekey(UIConfig.UIConfig_Activity_Battle.skill_level[hunterInfo.transfer_level], this);
                iconPath = (TableGeneralTalent.Item(data.skillId).path);//table_general_talent
                // this.level = genInfo.transfer_level
                // this.imgFrame:setZOrder(4)
                this.imgSelected.source = cachekey(UIConfig.UIConfig_Activity_Battle.spriteframe[1], this);
                this.imgIocnAwaken.visible = (false)
                framePath = UIConfig.UIConfig_Activity_Battle.skillFrame;
        } else {
            this.labelLevel.text = hunterInfo.skills[data.index].level.toString();
            iconPath = TableGeneralSkill.Item(data.skillId).path;
                this.imgTransformLvNum.visible = false;
                this.imgIocnAwaken.visible = false;
        }
        if (data.index == 3 && hunterInfo.awakePassive.level == 0) {
            Helper.SetImageFilterColor(this.imgIcon, 'gray');
        } else {
            Helper.SetImageFilterColor(this.imgIcon);
        }

        let typePath = UIConfig.UIConfig_General.hunter_skillType[data.index];
        this.imgIcon.source = cachekey(iconPath, this);
            this.imgFrame.source = cachekey(framePath, this);
        this.imgTypeIcon.source = cachekey(typePath, this);


        this.imgSelected.visible = data.isSelected;
        this.imgAwake.visible = (data.index == 3);
        this.imgTypeIcon.visible = (data.index != 0);
    }

    }

    export class HunterSkillItemData {
    index: number = null;
    generalId: number = null;
    skillId: number = null;
    isSelected: boolean = false;
    father: HunterSkill;
}
}