namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-12-1
 * 
 * @class 长按详情Item
 */
export class Common_ViewHeroDetailItem extends eui.ItemRenderer {

    private spriteIcon: eui.Image;
    private labelNum: eui.Label;
    private spriteSel: eui.Image;
    private spriteAwake: eui.Image;
    private spriteActivity: eui.Image;
    private spriteIconAwaken: eui.Image;
    private spriteFrame: eui.Image;
    private level: number;

    constructor() {
        super();
        this.skinName = "resource/skins/common/Common_ViewHeroDetailItemSkin.exml";

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            this.touchBegin(this.data, e);
        }, this);
    }

    private touchBegin(data: Common_ViewHeroDetailItemData, e: egret.TouchEvent) {
        data.father.showSkill(data, this.itemIndex, this.level, e.stageX);
    }

    protected dataChanged() {
        this.spriteSel.visible = false;
        this.spriteAwake.visible = false;
        this.spriteIconAwaken.visible = false;
        this.spriteActivity.visible = false;
        this.spriteFrame.source = cachekey("ui_frame_FrameSkill_png", this);
        let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.data.generalId);

        let iconPath = "";
        if (this.data.index == 3) {
            this.level = hunterInfo.passives[0].level;
            iconPath = TableGeneralTalent.Item(this.data.skillId).path;
        } else if (this.data.index == 4) {
            this.level = hunterInfo.awakePassive.level;
            if (hunterInfo.awakePassive.level == 0) {
                this.labelNum.visible = false;
                this.spriteActivity.visible = true;
            } else {
                this.labelNum.visible = true;
                // to do
            }
            this.spriteAwake.visible = true;
            this.spriteIconAwaken.visible = false;
            iconPath = TableGeneralTalent.Item(this.data.skillId).path;
        } else {
            this.level = hunterInfo.skills[this.data.index].level;
            iconPath = TableGeneralSkill.Item(this.data.skillId).path;
        }

        this.spriteIcon.source = cachekey(iconPath, this);

        this.labelNum.text = String(this.level);
    }

}

export class Common_ViewHeroDetailItemData {
    /** 索引下标 */
    index: number;

    /** 武将ID */
    generalId: number;

    /** 技能ID */
    skillId: number;

    father: Common_ViewHeroDetail;
}
}