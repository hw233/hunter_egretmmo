namespace zj {
//lizhengqiang
//20190108
export class LeagueManageApplicationItemIR extends eui.ItemRenderer {
    private imgUserFrame: eui.Image;
    private imgUserIcon: eui.Image;
    private lbName: eui.Label;
    private lbLevel: eui.Label;
    private btnCheck: eui.Button;
    private btnRefuse: eui.Button;
    private btnAgree: eui.Button;

    private roleId: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueManageApplicationItemIRSkin.exml";
        cachekeys(<string[]>UIResource["LeagueInstanceViewAwardItemIR"], null);

        this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this);
        this.btnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRefuse, this);
        this.btnAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAgree, this);
    }

    protected dataChanged() {
        let index: number = this.data.index;
        if (index < 0) return;

        let applyInfo: message.MemberApply = Game.PlayerLeagueSystem.Applicants[index];

        this.imgUserFrame.source = cachekey(TableItemPicFrame.Item(applyInfo.monarchbase.picFrameId).path, this); // StringConfig_Table.itemFrame
        this.imgUserIcon.source = cachekey(TableItemPic.Item(applyInfo.monarchbase.picId).path, this); // StringConfig_Table.itemHead

        this.lbName.text = applyInfo.monarchbase.name;
        this.lbLevel.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.levelDes, applyInfo.monarchbase.level);

        this.roleId = applyInfo.monarchbase.id;
    }

    // 查看详情
    private onBtnCheck() {
        toast_warning(TextsConfig.TextsConfig_Error.wait);
    }

    // 拒绝
    private onBtnRefuse() {
        if (this.roleId == 0) return;
        Game.PlayerLeagueSystem.leagueApplyDeal([this.roleId], false).then(() => {
            Game.EventManager.event(GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, this.itemIndex);
        });
    }

    // 同意
    private onBtnAgree() {
        if (this.roleId == 0) return;
        Game.PlayerLeagueSystem.leagueApplyDeal([this.roleId], true).then(() => {
            Game.EventManager.event(GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, this.itemIndex);
        });
    }
}
}