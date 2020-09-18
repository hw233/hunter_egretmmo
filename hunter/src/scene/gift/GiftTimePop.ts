namespace zj {
// 
// lizhengqiang
// 20190402
export class GiftTimePop extends Dialog {
    private groupMain: eui.Group;
    private lbPopName: eui.BitmapLabel;
    private lbAwardTip: eui.Label;
    private lstRMB: eui.List;
    private groupOne: eui.Group;
    private groupAni: eui.Group;
    private imgIcon: eui.Image;
    private lbAwardNum: eui.BitmapLabel;
    private btnGet: eui.Button;
    private imgGet: eui.Image;
    private imgFrameClick: eui.Image;
    private lbTipClose: eui.Label;

    private info;
    private father = null;
    private cb: Function = null;
    private giftInfo: TableNewgiftItem;
    private change: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftTimePopSkin.exml";
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.lbTipClose); // 因为是循环播放，需要特别处理
            this.giftInfo = null;
            this.father = null;
        }, null);
    }

    public setInfo(info, father?, cb?: Function) {
        this.info = info;
        this.father = father;
        this.cb = cb;

        if (this.father != null) {
            this.father.openDown();
        }

        this.giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);

        this.setInfoItem();
        this.setInfoButton();

        egret.Tween.get(this.lbTipClose, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);
    }

    private setInfoItem() {
        let dailyInfo = PlayerGiftSystem.Instance_days(this.info["dailyIndex"]);
        let tmp = Table.FindR(dailyInfo.goods_id, (k, v) => {
            return v == message.EResourceType.RESOURCE_TOKEN;
        });
        this.lbPopName.text = dailyInfo.des;
        if (dailyInfo.goods_id.length == 1) {
            if (tmp[1] != null) {
                let count: number = dailyInfo.goods_count[tmp[1]];
                this.imgIcon.source = cachekey("ui_iconresources_zuanshi1_png", this);
                this.lbAwardNum.text = count.toString();
                this.groupAni.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
                    this.groupAni.addChild(display);
                }).catch(reason => {
                    toast(reason);
                });
            }
        } else {
            this.groupOne.visible = false;
            let arrCollection = new eui.ArrayCollection();
            for (let i = 0; i < dailyInfo.goods_id.length; i++) {
                let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
                goodsInfo.goodsId = dailyInfo.goods_id[i];
                goodsInfo.showType = 1;
                goodsInfo.count = dailyInfo.goods_count[i];
                arrCollection.addItem(goodsInfo);
            }
            this.lstRMB.dataProvider = arrCollection;
            this.lstRMB.itemRenderer = GiftCommonAwardItem;
        }
    }

    private setInfoButton() {
        if (this.giftInfo.gift_form != 3) {
            let hasGet: number = Number(this.info["dailyIndex"]) - Number(this.giftInfo.daily_index) + Number(this.info["mark"]);
            let canGet: number = Number(this.giftInfo.daily_num) - hasGet;

            this.btnGet.enabled = (this.info["mark"] == 0);
            this.imgGet.visible = (this.info["mark"] != 0);
            this.lbAwardTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.can_get_and_has_get, canGet);
        } else {
            let hasGet: number = Number(this.info["dailyInfo"]) - Number(this.giftInfo.daily_index) + Number(this.info["buy_times"]);
            let canGet: number = Number(this.giftInfo.daily_num) - hasGet;

            this.btnGet.enabled = (this.info["mark"] == 0);
            this.imgGet.visible = (this.info["mark"] != 0);
            this.lbAwardTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.can_get_and_has_get, canGet);
        }
    }

    private onBtnGet() {
        this.btnGet.enabled = false;
        if (this.giftInfo.gift_form != 3) {
            Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.info["dailyIndex"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo);
            });
        } else {
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo);
            });
        }
    }

    private simulateCharge = (gameInfo: message.GameInfo) => {
        this.btnGet.enabled = true;
        this.change = true;

        if (gameInfo.getGoods.length > 0) {
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(gameInfo.getGoods);
                    dialog.setCB(this.onBtnClose);
                });
        }
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupMain.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose();
        }
    }

    private onBtnClose = () => {
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