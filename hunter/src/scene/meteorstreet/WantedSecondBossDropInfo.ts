namespace zj {
// 首领奖励
// lizhengqiang
// 20190325
export class WantedSecondBossDropInfo extends Dialog {
    public btnClose: eui.Button;
    public lstViewDrop: eui.List;

    public constructor() {
        super();
        this.skinName = "resource/skins/meteorstreet/WantedSecondBossDropInfoSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);

        this.setInfoList();
    }

    private setInfoList() {
        let bossInfo = PlayerWantedSystem.BossFloorReward();

        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < bossInfo.length; i++) {
            arrCollection.addItem({ "index": i + 1, "info": bossInfo[i] });
        }
        this.lstViewDrop.dataProvider = arrCollection;
        this.lstViewDrop.itemRenderer = WantedSecondBossDropInfoItem;
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}