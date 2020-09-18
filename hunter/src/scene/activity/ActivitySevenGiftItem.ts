namespace zj {
// 
// lizhengiang
// 20190413
export class ActivitySevenGiftItem extends eui.ItemRenderer {
    private imgSelect: eui.Image;
    private imgSelects: eui.Image;
    private btnGet: eui.Button;
    private imgDay: eui.Image;
    private lbLimit: eui.Label;
    private lstViewAward: eui.List;
    private groupPrice: eui.Group;
    private imgIcon: eui.Image;
    private lbToken: eui.BitmapLabel;
    private groupPrimer: eui.Group;
    private lbPrimer: eui.Label;
    private imgSale: eui.Image;
    private imgNoSell: eui.Image;
    private imgGet: eui.Image;
    private imgStop: eui.Image;

    private index: number = null;
    private info = null;
    private day: number = null;
    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivitySevenGiftItemSkin.exml";
        cachekeys(<string[]>UIResource["ActivitySevenGiftItem"], null);
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
    }

    protected dataChanged() {
        this.index = this.data.index;
        this.info = this.data.info;
        this.day = this.data.day;
        this.father = this.data.father;

        this.setInfoItem();
        this.setInfoGet();

        this.imgDay.source = cachekey(UIConfig.UIConfig_Activity.day[this.index], this);
    }

    private setInfoItem() {
        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < this.info["reward_goods"].length; i++) {
            let goods = new message.GoodsInfo;
            goods.goodsId = this.info["reward_goods"][i];
            goods.count = this.info["reward_count"][i];
            goods.index = 0;
            goods.showType = this.info["show_type"][i];
            arrCollection.addItem({ info: goods });
        }
        this.lstViewAward.dataProvider = arrCollection;
        this.lstViewAward.itemRenderer = ActivityAwardItem;
    }

    private setInfoGet() {
        let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven, (k, v) => {
            return v == this.index;
        });

        let token: number = 0;
        if (this.index <= this.day && !bReward) {
            if (PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                token = PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
            }
        } else if (this.index > this.day) {
            if (PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.index <= PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                token = PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.index - 1];
            }

        } else if (this.index == this.day && bReward) {
            if (PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                token = PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
            }
        } else if (this.index <= this.day && bReward) {
            if (PlayerGiftSystem.Instance_sevenGift(this.index) != null && this.day <= PlayerGiftSystem.Instance_sevenGift(this.index).consume_token.length) {
                token = PlayerGiftSystem.Instance_sevenGift(this.index).consume_token[this.day - 1];
            }
        }

        let primer: number;
        if (PlayerGiftSystem.Instance_sevenGift(this.index) != null) {
            primer = PlayerGiftSystem.Instance_sevenGift(this.index).primer;
        }

        if (this.day <= 7) {
            this.imgStop.visible = (token == 0);
            this.imgGet.visible = (bReward && this.index <= this.day && token != 0);
            this.btnGet.visible = (token != 0 && !bReward);
            this.btnGet.enabled = (this.index <= this.day);
            this.groupPrice.visible = (!bReward && this.index <= this.day && token != 0);
            this.groupPrimer.visible = (!bReward && this.index <= this.day && token != 0);
            this.imgNoSell.visible = (this.index > this.day);
            if (this.index == this.day && token != primer && !bReward) {
                this.imgSale.visible = true;
            } else {
                this.imgSale.visible = false;
            }
            this.lbToken.text = (typeof token == "number" ? token.toString() : "0");
            this.lbPrimer.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.primer, primer);
        } else {
            this.imgStop.visible = true;
            this.imgGet.visible = false;
            this.btnGet.visible = false;
            this.btnGet.enabled = false;
            this.groupPrice.visible = false;
            this.groupPrimer.visible = false;
            this.imgNoSell.visible = false;
            this.imgSale.visible = false;
        }

        if ((token == 0 || bReward && this.index <= this.day) || this.day > 7) {
            this.imgSelect.visible = false;
            this.imgSelects.visible = true;
        } else {
            this.imgSelect.visible = true;
            this.imgSelects.visible = false;
        }
    }

    private onBtnGet() {
        let allGeneralHistory = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();

        Game.PlayerMixUnitInfoSystem.buySevenNewGift(this.index).then((gameInfo: message.GameInfo) => {
            this.father.setInfoTips();
            if (gameInfo.getGoods.length > 0) {
                let hasGeneral: boolean = false;
                let goods: message.GoodsInfo = null;
                for (const v of gameInfo.getGoods) {
                    if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        hasGeneral = true;
                        goods = v;
                        break;
                    }
                }

                if (hasGeneral && goods != null) {
                    loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                        dialog.setInfo(goods.goodsId, 0, () => {
                            loadUI(CommonGetDialog)
                                .then((dialog: CommonGetDialog) => {
                                    dialog.show();
                                    dialog.init(gameInfo.getGoods);
                                    dialog.setCB(() => {
                                        this.setInfoGet();
                                    });
                                });
                        });
                        dialog.show(UI.SHOW_FILL_OUT);

                        // let general = Table.FindK(allGeneralHistory, PlayerHunterSystem.Table(goods.goodsId).general_id);
                        // if (general == -1) {
                        //     setTimeout(() => {
                        //         // 图鉴解锁成功
                        //         let ui = <TavernGetGeneralPop>newUI(TavernGetGeneralPop);
                        //         ui.setInof(goods);
                        //         this.addChild(ui);
                        //         egret.Tween.get(ui.group1)
                        //             .to({ alpha: 1 }, 100)
                        //             .to({ y: 10 }, 150, egret.Ease.sineInOut)
                        //             .wait(300, false)
                        //             .to({ y: -10 }, 150, egret.Ease.sineInOut)
                        //             .wait(300, false)
                        //             .call(() => { ui.close(); });
                        //     }, 300);
                        // }
                    });
                } else {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(() => {
                                this.setInfoGet();
                            });
                        });
                }
            }
        });
    }
}
}