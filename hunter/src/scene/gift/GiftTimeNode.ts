namespace zj {
// 
// lizhengqiang
// 20190402
export class GiftTimeNode extends Dialog {
    private groupAddGift: eui.Group;
    private lbTipClose: eui.Label;

    private father = null;
    public cb: Function = null;
    public CB: Function = null;
    public info = null;


    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftTimeNodeSkin.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.father = null;
        }, null);
    }

    public setInfo(info, father?, cb?: Function, isActivity: boolean = false) {
        this.info = info;
        this.father = father;
        this.cb = cb;

        if (this.father && this.father.openDown) {
            this.father.openDown();
        }

        let ui;
        if (info["gift_index"] == 100208) {
            // "HXH_GiftNewFresh"
            this.lbTipClose.visible = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        } else if (info["gift_index"] == 100209) {
            // "HXH_GiftNew"
        } else {
            // "HXH_GiftTime"
            ui = new GiftTime();
        }
        this.groupAddGift.removeChildren();
        this.groupAddGift.addChild(ui);

        ui.setInfo(false, info, this, isActivity);
    }
    public setCB(CB?) {
        this.CB = CB;
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupAddGift.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupAddGift.width, this.groupAddGift.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose(false);
        }
    }

    public onBtnClose = (isPop: boolean = true) => {

        if (this.cb != null) {
            this.cb();
        }
        if (this.CB != null) {
            this.CB();
        }

        if (isPop && this.father && this.father.popItem) {
            (<PayMallScene>this.father).popItem(this.info["index"]);
        } else {
            if (this.father && this.father.closeUp) {
                this.father.closeUp();
            }
        }



        this.close(UI.HIDE_TO_TOP);
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
}
}