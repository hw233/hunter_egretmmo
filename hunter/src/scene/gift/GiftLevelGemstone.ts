namespace zj {
// 
// lizhengqiang
// 20190410
export class GiftLevelGemstone extends Dialog {
    private groupMain: eui.Group;
    private imgGiftType: eui.Image;
    private imgGiftAward: eui.Image;
    private lbNameType: eui.BitmapLabel;
    private imgBuyCoinType: eui.Image;
    private lbBuyNeedNum: eui.BitmapLabel;
    private imgCoinType: eui.Image;
    private lbDayAwardNum: eui.BitmapLabel;
    private lbCurrentLevel: eui.Label;
    private lstBuyAward: eui.List;
    private gourpBuy: eui.Group;
    private btnGiftBuy: eui.Button;
    private lbGetNum: eui.BitmapLabel;
    private lbTipClose: eui.Label;

    private info;
    private father;
    private cb: Function = null;
    private giftInfo: TableNewgiftItem;
    private allLevelInfo: TableNewgiftDaily[];
    private change: boolean = false;

    private _TOKEN = message.EResourceType.RESOURCE_TOKEN;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftLevelGemstoneSkin.exml";
        this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftBuy, this);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.lbTipClose); // 因为是循环播放，需要特别处理
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
    }

    public setInfo(info, father, cb?: Function) {
        this.info = info;
        this.father = father;
        this.cb = cb;

        if (this.father != null) {
            this.father.openDown();
        }

        this.giftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
        this.allLevelInfo = PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));

        this.setInfoOther();
        this.setInfoList();
        this.setInfoButton();

        egret.Tween.get(this.lbTipClose, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);
    }

    private setInfoOther() {
        // tips
        let tipIndex: number = Number(this.info["gift_index"] + this.info["index"]);
        if (Tips.tips_oneday_get(tipIndex)) {
            Tips.tips_oneday_set(tipIndex, true)
            this.change = true;
        }

        let price: number = this.giftInfo.price;
        let allGet: number = 0;
        for (let i = 0; i < this.allLevelInfo.length; i++) {
            for (let j = 0; j < this.allLevelInfo[i].goods_id.length; j++) {
                if (this.allLevelInfo[i].goods_id[j] == this._TOKEN)
                    allGet = allGet + this.allLevelInfo[i].goods_count[j];
            }
        }
        this.lbNameType.text = this.giftInfo.name_str;
        this.lbCurrentLevel.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.cur_level, Game.PlayerInfoSystem.BaseInfo.level));
        this.lbBuyNeedNum.text = price.toString();
        this.lbDayAwardNum.text = allGet.toString();
        this.lbGetNum.text = price.toString();
    }

    private setInfoList() {
        let arrCollection = new eui.ArrayCollection();
        for (let v of this.allLevelInfo) {
            arrCollection.addItem(v);
        }
        this.lstBuyAward.dataProvider = arrCollection;
        this.lstBuyAward.itemRenderer = GiftLevelGemstoneItem;
    }

    private setInfoButton = () => {
        this.btnGiftBuy.enabled = (this.info["buy_times"] < this.giftInfo.buy_times);
    };

    private onBtnGiftBuy() {
        if (Game.PlayerInfoSystem.BaseInfo.vipLevel < 3) {
            toast_warning(LANG(TextsConfig.TextConfig_Instance.vip3BuyGift));
        } else {
            this.btnGiftBuy.enabled = false;
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.change = true;
                let cb = () => {
                    this.setInfoButton();

                    toast_success(LANG(TextsConfig.TextConfig_Tower.mallBuy));
                    this.onBtnClose();
                };

                if (gameInfo.giftInfos.length > 0) {
                    for (let v of gameInfo.giftInfos) {
                        if (v.index == this.info["index"]) {
                            this.info = Table.DeepCopy(v);
                            if (this.info["buy_times"] >= this.giftInfo.buy_times) {
                                cb();
                            }
                        }
                    }
                }
            }).catch((result) => {
                toast_warning(Game.ConfigManager.getAone2CodeReason(result));
            });
        }
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupMain.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose(false);
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

    private onBtnClose(isPop: boolean = true) {
        if (this.father != null) {
            this.father.closeUp();
        }

        if (this.change && this.cb != null) {
            this.cb();
        }

        if (isPop) {
            (<PayMallScene>this.father).popItem(this.info["index"]);
        }

        this.close(UI.HIDE_TO_TOP);
    }
}
}