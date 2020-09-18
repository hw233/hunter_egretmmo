namespace zj {
// lizhengqiang
// 20190212
export class LeagueMatchSelectDefenceFormationItemBIR extends eui.ItemRenderer {
    private imgHeroFrame: eui.Image;
    private imgAdd: eui.Image;
    private groupAll: eui.Group;
    private imgHeroHead: eui.Image;
    private groupStar: eui.Group;
    private lbLevel: eui.BitmapLabel;

    private bShowAdd: boolean;
    private generalInfo: message.GeneralSimpleInfo;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationItemBSkin.exml";
        cachekeys(<string[]>UIResource["LeagueMatchSelectDefenceFormationItemBIR"], null);
    }

    protected dataChanged() {
        this.generalInfo = this.data.generalInfo;
        this.bShowAdd = this.data.bShowAdd;

        this.setInfoBase();
        this.setINfoGeneral();
    }

    private setInfoBase() {
        this.imgAdd.visible = true;
        this.groupAll.visible = false;
        this.imgHeroFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[0], this);
    }

    private setINfoGeneral() {
        this.imgAdd.visible = this.bShowAdd;
        if (this.generalInfo == null || this.generalInfo.general_id == 0) {
            return;
        }
        this.groupAll.visible = true;

        this.imgHeroHead.source = cachekey(PlayerHunterSystem.Head(PlayerHunterSystem.GetGeneralId(this.generalInfo.general_id)), this);
        this.imgHeroFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.generalInfo.step], this);
        this.lbLevel.text = this.generalInfo.level.toString();

        // star
        Helper.SetHeroAwakenStar(this.groupStar, this.generalInfo.star, this.generalInfo.awaken_level);
    }
}
}