namespace zj {
// 猜拳 查看奖励
// wangshenzhuo
// 2019.05.25
export class MoraMainAwardDialog extends Dialog {
    private groupCache: eui.Group;
    public buttonClose: eui.Button;
    public listViewList: eui.List;
    private listMyItem: eui.ArrayCollection;
    public reward = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainAwardSkin.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        setCache(this.groupCache);
    }

    public SetInfo() {
        let max = CommonConfig.gain_runes_number;
        let tbl = TableRunes.Table();
        let num = 1;
        for (let i = 0; i < max; i++) {
            tbl[max - num + 1].id = null;
            let id = max - num + 1 != 0 && max - num + 1 || max;
            this.reward[i] = tbl[id];
            num = num + 1;
        }

        this.SetInfoList();
    }

    private SetInfoList() {
        this.listViewList.itemRenderer = MoraMainAwardItem;
        this.listMyItem = new eui.ArrayCollection();
        for (let i = 0; i < this.reward.length; i++) {
            let data = new MoraMainAwardItemData();
            data.father = this;
            data.info = this.reward[i];
            data.index = i;
            this.listMyItem.addItem(data);
        }
        this.listViewList.dataProvider = this.listMyItem;
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info.good, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}