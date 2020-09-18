namespace zj {
// 神秘商店 HXH_PublicGift
// lizhengqiang
// 20190420
export class PublicGift extends Scene {
    private imgName: eui.Image;
    private groupTitle: eui.Group;
    private groupStar1: eui.Group;
    private groupStar2: eui.Group;
    private groupLight1: eui.Group;
    private groupLight2: eui.Group;
    private groupNpc: eui.Group;
    private lbTime: eui.Label;
    private scroller: eui.Scroller;
    private lstAddGift: eui.List;
    private btnClose: eui.Button;
    private groupLeftButton: eui.Group;
    private groupSelectLeft: eui.Group;
    private groupRightButton: eui.Group;
    private groupSelectRight: eui.Group;

    private timer: egret.Timer;
    private canBuy: boolean = true;
    private allProducts: Array<MyProductInfo> = [];
    private giftInfo: TableNewgiftItem = null;
    private activityInfo: message.ActivityInfo = null;
    private giftInfos = [];
    private buyIndex: number = null;
    private arrCollection: eui.ArrayCollection;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/PublicGiftSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
            Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, this);
    }

    public init() {
        this.loadPayProducts();

        this.groupNpc.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "mysticalstore", "armatureName", null, 0).then(display => {
            this.groupNpc.addChild(display);
        }).catch(reason => {
            toast(reason);
        });

        this.setInfoAni();
        this.setActivityInfo();
        this.dealMallOpen();

        this.timer = new egret.Timer(999, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.dealMallOpen, this);
        this.timer.start();
    }

    private setInfoAni() {
        this.groupLight1.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "001_deng_zuo", 0).then(display => {
            this.groupLight1.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
        this.groupLight2.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "000_deng_you", 0).then(display => {
            this.groupLight2.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
        this.groupStar1.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "002_xingxing_zuo", 0).then(display => {
            this.groupStar1.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
        this.groupStar2.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "shenmishangcheng_eff", "armatureName", "003_xingxing_you", 0).then(display => {
            this.groupStar2.addChild(display);
        }).catch(reason => {
            toast(reason);
        });

        this.groupSelectLeft.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(display => {
            this.groupSelectLeft.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
        this.groupSelectRight.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(display => {
            this.groupSelectRight.addChild(display);
        }).catch(reason => {
            toast(reason);
        });
    }

    private setActivityInfo() {
        this.activityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
            return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
        })[0];

        if (this.activityInfo == null) return;

        let time1 = Helper.GetTMStrForActivity(this.activityInfo.openTime);
        let time2 = Helper.GetTMStrForActivity(this.activityInfo.closeTime);
        let timeStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.wishing_tree_time, time1, time2);
        this.lbTime.text = timeStr;
    }

    private dealMallOpen() {
        if (this.activityInfo == null || (!((this.activityInfo.openTime < Game.Controller.curServerTime) && (Game.Controller.curServerTime <= this.activityInfo.closeTime)))) {
            this.canBuy = false;
        }
    }

    private setInfoList() {
        this.giftInfos = otherdb.GetSecretMallInfo();

        this.arrCollection = new eui.ArrayCollection();
        for (const k in this.giftInfos) {
            this.arrCollection.addItem({ index: Number(k) + 1, info: this.giftInfos[k], father: this });
        }
        this.lstAddGift.dataProvider = this.arrCollection;
        this.lstAddGift.itemRenderer = PublicGiftItem;
    }

    private freshList() {
        let newGiftInfos = otherdb.GetSecretMallInfo();
        if (newGiftInfos.length == 0 || newGiftInfos.length != this.giftInfos.length) {
            this.setInfoList();
        } else {
            let refreshAll = false;
            for (let i = 0; i < newGiftInfos.length; i++) {
                if (i != this.buyIndex - 1 && newGiftInfos[i]["tribute_id"] != this.giftInfos[i]["tribute_id"]) {
                    refreshAll = true;
                    break;
                }
            }

            if (refreshAll) {
                this.setInfoList();
            } else {
                this.giftInfos = newGiftInfos;
                this.arrCollection.replaceItemAt({ index: this.buyIndex, info: newGiftInfos[this.buyIndex - 1], father: this }, this.buyIndex - 1);
            }
        }

    }

    private refreshInfo(ev: egret.Event) {
        let msg = (<message.RoleInfoNoticeRequest>ev.data).body;

        if (msg.gameInfo.getGoods.length > 0) {
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(this.followUp);
                });
        }
    }

    private followUp = () => {
        this.freshList();
    }

    private loadPayProducts() {
        Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
            for (let v of resp.products) {
                for (let vv of resp.channel_products_ext) {
                    if (v.id == vv.id) {
                        let tmp: MyProductInfo = {
                            id: "",
                            name: "",
                            describe: "",
                            currency: "",
                            amount: 0,
                            amount_usd: 0,
                            coin: 0,
                            type: "",
                            discount: "",
                            cp_product_id: "",
                        };
                        for (const k in tmp) {
                            tmp[k] = v[k];
                        }
                        tmp.cp_product_id = vv.cp_product_id;
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }

            let i = 0;
            while (i < this.allProducts.length) {
                if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }

            this.allProducts.sort(function (a, b) {
                let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
                let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
                if (itemA == null) return 1;
                if (itemB == null) return -1;
                return itemA.sort_index - itemB.sort_index;
            });

            this.setInfoList();
        });
    }

    private reqActivity(index: number) {
        if (!this.canBuy) {
            toast_warning(LANG(TextsConfig.TextsConfig_Activity.Rank_Charge.over));
            return;
        }

        this.buyIndex = index;

        Game.PlayerActivitySystem.queryActivitys(message.ActivityType.ACT_TYPE_NONO).then((activities: Array<number>) => {
            this.activityInfo = Table.FindR(activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
            })[0];

            if (this.activityInfo == null || !((this.activityInfo.openTime < Game.Controller.curServerTime) && (Game.Controller.curServerTime <= this.activityInfo.closeTime))) {
                let curActivityIndex = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                    return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
                })[1];

                if (curActivityIndex != null) {
                    Game.PlayerActivitySystem.Activities.splice(curActivityIndex, 1);
                }

                this.canBuy = false;
            }

            if (!this.canBuy) {
                toast_warning(LANG(TextsConfig.TextsConfig_Activity.Rank_Charge.over));
            } else {
                this.reqButtonBuy();
            }
        });
    }

    private reqButtonBuy() {
        let index = this.buyIndex - 1;

        if (this.giftInfos[index]["buy_type"] == 1) {
            if (Util.getAppVersionInfo().channel == "test") {
                Game.PlayerPaySystem.simulateCharge(this.giftInfos[index]["reference"], this.activityInfo.daysIndex, this.activityInfo.index).then((gameInfo: message.GameInfo) => {
                    if (gameInfo.getGoods.length > 0) {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.show();
                                dialog.init(gameInfo.getGoods);
                                dialog.setCB(this.followUp);
                            });
                    }
                });
            } else {
                let strIndex = this.giftInfos[index]["reference"];
                platform.pay(PlayerPaySystem.GetProductId(this.giftInfos[index]["pay_index"], this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex, this.activityInfo.daysIndex, this.activityInfo.index));
            }
        } else if (this.giftInfos[index]["buy_type"] == 2) {
            Game.PlayerGiftSystem.secretMallBuy(this.activityInfo.index, this.activityInfo.daysIndex, this.giftInfos[index]["reference"]).then((gameInfo: message.GameInfo) => {
                if (gameInfo.getGoods.length > 0) {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(this.followUp);
                        });
                }
            });
        }
    }

    private onScrollerEnd() {
        if (this.lstAddGift.scrollH == 0) {
            this.groupSelectLeft.visible = false;
            this.groupSelectRight.visible = true;
        }
        else if (this.lstAddGift.scrollH + this.scroller.width >= this.lstAddGift.contentWidth) {
            this.groupSelectLeft.visible = true;
            this.groupSelectRight.visible = false;
        }
        else {
            this.groupSelectLeft.visible = true;
            this.groupSelectRight.visible = true;
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
        this.close(UI.HIDE_TO_TOP);
    }
}
}