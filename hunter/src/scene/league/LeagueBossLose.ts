namespace zj {
//公会BOSS-击杀失败
//yuqingchao
//2019.03.11
export class LeagueBossLose extends Dialog {
    private btnKnow: eui.Button;        //“知道了”按钮
    private groupAdd: eui.Group;
    private groupBG: eui.Group;
    private imgInstance: eui.Image;
    private imgTip: eui.Image;
    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueBossLoseSkin.exml"
        this.btnKnow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnKnow, this);
        this.groupAdd.addChild(new LeagueBossRank());
        this.groupBG.visible = true;
        this.imgInstance.visible = true;
        this.imgTip.visible = true;

        this.imgInstance.source = cachekey("ui_instance_LayerInstance_png", this);
        this.imgTip.source = cachekey("ui_instance_BoardTopTip_png", this);
    }
    private onBtnKnow() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}