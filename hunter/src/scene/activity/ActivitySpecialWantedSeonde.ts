namespace zj {
    // 福利-成长礼包
    // lizhengqiang
    // 20190323
    export class ActivitySpecialWantedSeonde extends UI {
        public lbCurrencyLevel: eui.Label;
        public lstAward: eui.List;
        public btn: eui.Button;

        private giftInfo;
        private info: message.GiftInfo;
        private allLevelInfo;
        private allProducts: Array<MyProductInfo> = [];
        public payTbl;
        public groupHand: eui.Group;
        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialWantedSeondeSkin.exml";
        }

        private playerGiftInfoChange() {
            egret.Tween.get(this).wait(100).call(() => {
                this.init();
            })
        }

        public init() {
            Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            Game.EventManager.on(GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.playerGiftInfoChange, this);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtn, this);
            this.giftInfo = PlayerGiftSystem.Instance_item(100303);
            this.info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100303;
            })[0];
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.info.buy_times == 0) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 1, 0)
                    .then(display => {
                        display.touchEnabled = false;
                        this.groupHand.addChild(display);
                    })
            } else {
                this.groupHand.removeChildren();
            }
            this.payTbl = {};
            this.loadPayProducts(() => {
                let payIndex = TablePayIndex.Item(giftInfo.pay_index);
                for (const v of this.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        this.payTbl = Table.DeepCopy(v);
                        break;
                    }
                }
                this.allLevelInfo = PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));

                this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);

                let arrCollection = new eui.ArrayCollection();
                for (let i = 0; i < this.allLevelInfo.length; i++) {
                    let data = new ActivitySpecialWonderlandItemData();
                    data.father = this;
                    data.index = i;
                    data.info = this.allLevelInfo[i];
                    data.id = 100303;
                    arrCollection.addItem(data);
                }
                let array = new eui.ArrayCollection();
                let b = [];
                for (let i = 0; i < arrCollection.length; i++) {
                    let a = arrCollection.source[i] as ActivitySpecialWonderlandItemData;
                    let info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                        return v.gift_index == a.id;
                    })[0];
                    let find = info && Table.FindF(info["markIndex"], (k, v) => {
                        return v == PlayerGiftSystem.GetGiftFate(Number(PlayerGiftSystem.Instance_item(info["gift_index"]).daily_index))[a.index].index;
                    });
                    if (find) {
                        b.push(a);
                    } else {
                        array.addItem(a);
                    }
                }
                for (let k = 0; k < b.length; k++) {
                    array.addItem(b[k]);
                }

                this.lstAward.dataProvider = array;
                this.lstAward.itemRenderer = ActivitySpecialWonderlandItem;
                this.lbCurrencyLevel.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.baselevel, Game.PlayerInfoSystem.BaseInfo.level));
            });

        }

        public get vis(): boolean {
            if (this.info.buy_times == 1) {
                return true;
            } else {
                return false;
            }
        }

        private setInfoButton = () => {
            this.btn.enabled = (this.info["buy_times"] < this.giftInfo.buy_times);
        };
        private onbtn() {
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.pay_type == 1) {
                Game.PlayerGiftSystem.getNewGift().then(() => {
                    Game.PlayerGiftSystem.newGiftExist(this.info["index"]).then(() => {
                        this.requestButtonBuy();
                    });
                });
            } else {
                this.requestButtonBuy();
            }
        }

        private requestButtonBuy() {
            // this.btn.enabled = false;
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (Util.getAppVersionInfo().channel == "test") {
                Game.PlayerPaySystem.simulateCharge(this.info["index"]).then(() => {
                    this.init();
                });
            } else {
                let strIndex = this.info["index"];
                if (this.payTbl) {
                    platform.pay(PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                }
            }
        }

        private loadPayProducts(cb?) {
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
                    return itemA.sort_index - itemB.sort_index;
                });
                if (cb) cb();
                // this.setInfoOther();
            });
        }

        /**抬起移除奖励详情界面 */
        public up() {
            let show = this.getChildByName("details");
            if (show) this.removeChild(show);
        }

        private showGoodsProperty(ev: egret.Event) {
            let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        }
    }
}