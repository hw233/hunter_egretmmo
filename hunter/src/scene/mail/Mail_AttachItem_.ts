namespace zj {
// 邮件-信件item
// lizhengiang
// 20190517
export class Mail_AttachItem_ extends eui.ItemRenderer {
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private groupNode: eui.Group;
    private lbNum: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_AttachItem_Skin.exml";
        cachekeys(<string[]>UIResource["Mail_AttachItem_"], null);
    }

    protected dataChanged() {
        let itemInfo = this.data.itemInfo;
        let battleResult = this.data.battleResult;

        let itemSet = PlayerItemSystem.Set(itemInfo.goodsId, null, itemInfo.count);

        this.imgFrame.source = cachekey(itemSet.Frame, this);
        this.imgIcon.source = cachekey(itemSet.Clip, this);

        if (!battleResult) {
            this.lbNum.text = "x" + itemInfo.count;
        } else {
            let bWin = battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            let strNum = bWin ? "x" + itemInfo.count : "-" + itemInfo.count;
            let color = bWin ? this.lbNum.textColor : ConstantConfig_Common.Color.red;
            this.lbNum.text = strNum;
            this.lbNum.textColor = color;
        }
    }

}
}