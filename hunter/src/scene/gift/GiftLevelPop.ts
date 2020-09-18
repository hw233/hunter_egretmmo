namespace zj {
// 
// lizhengqiang
// 20190411
export class GiftLevelPop extends Dialog {
    private groupMain: eui.Group;
    private lbName: eui.BitmapLabel;
    private lbCurrentLevelPrefix: eui.BitmapLabel;
    private lbCurrentLevel: eui.Label;
    private scroller: eui.Scroller;
    private lstAward: eui.List;
    private lbTipClose: eui.Label;

    private arrCollection: eui.ArrayCollection;

    private info;
    private father = null;
    private cb: Function = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftLevelPopSkin.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            egret.Tween.removeTweens(this.lbTipClose); // 因为是循环播放，需要特别处理
        }, null);
    }

    public setInfo(info, father?, cb?: Function) {
        this.info = info;
        this.father = father;
        this.cb = cb;

        if (this.father != null) {
            this.father.openDown();
        }

        let giftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
        let dailyInfo = PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));

        let offset: number = 0;
        this.arrCollection = new eui.ArrayCollection();
        for (let v of dailyInfo) {
            this.arrCollection.addItem({ info: info, dayInfo: v, father: this });
        }
        this.lstAward.dataProvider = this.arrCollection;
        this.lstAward.itemRenderer = GiftLevelPopItem;

        let forcus = this.setOffset();
        this.scroller.viewport = this.lstAward;
        this.scroller.validateNow();
        if (this.scroller.viewport.contentWidth > this.scroller.viewport.width) {
            let moveDistance: number = 0;
            if (this.scroller.viewport.contentWidth - forcus * 244 > this.scroller.viewport.width) {
                moveDistance = forcus * 244;
            } else {
                moveDistance = this.scroller.viewport.contentWidth - this.scroller.viewport.width;
            }
            this.scroller.viewport.scrollH = moveDistance;
        }

        if (giftInfo.gift_form == 6) {
            this.lbCurrentLevelPrefix.visible = true;
            this.lbCurrentLevel.textFlow = Util.RichText(Helper.StringFormat("<color>r:60,g:255,b:0</color><text>%s</text>", Game.PlayerInfoSystem.BaseInfo.level));//TextsConfig.TextsConfig_Hunter_Pay.cur_level
        } else {
            this.lbCurrentLevelPrefix.visible = false;
            this.lbCurrentLevel.text = "";
        }

        if (PlayerItemSystem.Type2(info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
            this.lbName.text = giftInfo.name + "(" + PlayerHunterSystem.Table(info["mark"]).general_name + ")";
            StringConfig_Table.baseGeneral
        } else {
            this.lbName.text = giftInfo.name_str;
        }

        if (this.father != null) {
            (this.father as PayMallScene).openDown();
        }

        // 点击任意区域关闭
        egret.Tween.get(this.lbTipClose, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);
    }

    public updateItem = (item) => {
        let replaceItem = this.arrCollection.getItemAt(this.lstAward.selectedIndex);
        replaceItem["info"] = item;
        this.arrCollection.replaceItemAt(replaceItem, this.lstAward.selectedIndex);
    }

    private setOffset(): number {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        if (giftInfo.gift_form == 6) {
            let daysInfo: TableNewgiftDaily[] = PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));
            let nextlevel = 1;
            for (let i = 0; i < daysInfo.length; i++) {
                let limitLevel = (daysInfo[i].reward_level != "" ? Number(daysInfo[i].reward_level) : 0);
                if (Game.PlayerInfoSystem.BaseInfo.level < limitLevel) {
                    nextlevel = Number(i);
                    break;
                } else if (Game.PlayerInfoSystem.BaseInfo.level >= limitLevel) {
                    let find = Table.FindF(this.info["markIndex"], (k, v) => {
                        return daysInfo[i].index == v;
                    });
                    if (!find) {
                        nextlevel = Number(i);
                        break;
                    }
                }
            }
            return nextlevel;
        } else if (giftInfo.gift_form == 3) {
            return Number(this.info["dailyIndex"]) - Number(giftInfo.daily_index);
        }
        return 0;
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupMain.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose();
        }
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
        if (this.father != null) {
            this.father.closeUp();
        }
        if (this.cb != null) {
            this.cb();
        }
        this.close(UI.HIDE_TO_TOP);
    }
}
}