namespace zj {
//HXH_HunterTransformDetailsItemItemRight
// wangshenzhuo
// 2019-07-17
export class HunterTransformDetailsItemItemRight extends eui.ItemRenderer {

    public imageBG: eui.Image;
    public labelPlayerDes: eui.Label;
    public imageIcon2: eui.Image;
    public imageFrameTransform: eui.Image;
    public imageLvNum: eui.Image;
    public imageStar1: eui.Image;
    public imageStar2: eui.Image;
    public imageStar3: eui.Image;
    public imageStar4: eui.Image;
    public imageStar5: eui.Image;
    public labelSkillName: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemItemRightSkin.exml";
        cachekeys(<string[]>UIResource["HunterTransformDetailsItemItemRight"], null);
    }

    protected dataChanged() {
        if (this.data) {
            let skillInfo = TableGeneralTalent.Item(this.data.general_id);
            let iconPath = TableGeneralTalent.Item(this.data.transfer_skill).path;
            this.imageIcon2.source = cachekey(iconPath , this);
            this.labelPlayerDes.text = TableGeneralTalent.Item(this.data.transfer_skill).skill_des;
            this.labelSkillName.text = TableGeneralTalent.Item(this.data.transfer_skill).talent_name;
            for(let i = 0 ; i < 5 ; i ++) {
                this["imageStar" + (i + 1)].visible = false;
            }
            this.imageLvNum.visible = false;
        }
    }

}


}