namespace zj {
    // wang shen zhuo
    // HXH_GiftMonth
    // 20190420
    export class HXH_GiftMonth extends eui.ItemRenderer {

        public imageGiftType: eui.Image;
        public imageBuyTypeBoard: eui.Image;
        public imageicon1: eui.Image;
        public imageicon2: eui.Image;
        public imageicon3: eui.Image;
        public imageicon4: eui.Image;
        public imageBuyType: eui.Image;
        public labelBuyAward: eui.Label;
        public labelCurrentType: eui.Label;
        public imageRMB: eui.Image;
        public imageToken: eui.Image;
        public labelNumValue: eui.BitmapLabel;
        public listBuyAward: eui.List;
        public buttonGiftGet: eui.Button;
        public buttonGiftGo: eui.Button;
        public buttonGiftBuy: eui.Button;
        public labelGetNum: eui.BitmapLabel;
        public imageGestoneIcon: eui.Image;
        public imageTypeTop: eui.Image;
        public imageSoul: eui.Image;
        public imageTip: eui.Image;
        public groupMain: eui.Group;
        public imageRight: eui.Image;
        public imageLeft: eui.Image;
        private labelNum: eui.Label;

        private AddGiftItem: eui.ArrayCollection;
        private AddGiftIndex: number = 0;

        public father: HXH_GiftMonthList;
        public info: any;
        private allProducts: Array<MyProductInfo> = [];
        private index: number = 0;
        public this_buy: boolean;

        public dataid: number = 0;
        public arrayLength: number = 0;
        public timers: number;

        public constructor() {
            super();
            this.skinName = "resource/skins/gift/HXH_GiftMonthSkin.exml";
            cachekeys(<string[]>UIResource["HXH_GiftMonth"], null);
            this.buttonGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonGiftBuy_CallBack, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.on(GameEvent.USER_PAY_RESULT, () => {
                this.buttonGiftBuy.enabled = true;
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            }, this);
            this.this_buy = false;
            this.buttonGiftGo.visible = false;
            this.buttonGiftGet.visible = false;
            this.labelNum.visible = false;
        }

        protected dataChanged() {
            this.father = this.data.father;
            this.info = this.data.info;
            this.index = this.data.index;
            this.allProducts = this.data.allPro;
            this.SetInfoItem();
            this.SetInfoReward();
            this.SetInfoState();

        }

        private SetInfoItem() {
            if (this.info.pay_index != "") {
                let tblConsume = Game.ConfigManager.getTable(StringConfig_Table.pay + ".json");  //读表
                let pay_index = tblConsume[this.info.pay_index];
                let pay_tbl = null;
                for (const kk in this.allProducts) {
                    const vv = this.allProducts[kk];
                    if (Number(vv.coin) == pay_index.raw_token) {
                        pay_tbl = Table.DeepCopy(vv);
                        break;
                    }
                }

                if (pay_tbl) {
                    this.info.pay_tbl = pay_tbl;
                    let str_money = pay_tbl.amount;
                    this.labelGetNum.text = str_money;
                } else {
                    this.labelGetNum.text = " ";
                }

                this.imageGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[0], this);
                this.imageRMB.visible = true;
                this.imageToken.visible = false;
            } else if (this.info.token_price != "") {
                let a = this.info.token_price
                this.labelGetNum.text = this.info.token_price;
                this.imageGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[1], this);
                this.imageRMB.visible = false;
                this.imageToken.visible = true;
                // this.labelNum.visible = false;
            }
            this.imageTip.source = cachekey(this.info.name_path, this);
            this.imageBuyType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[4], this);
            this.imageGiftType.source = cachekey(UIConfig.UIConfig_Hunter_Pay.backcolor[(this.info.index - 1) % 2], this);
            this.imageBuyTypeBoard.source = cachekey(this.info.path, this);
            this.labelNumValue.text = this.info.all_price;
            for (let i = 1; i < 5; i++) {
                this["imageicon" + i].source = cachekey(UIConfig.UIConfig_Hunter_Pay.bordcolor[(this.info.index - 1) % 2], this);
            }
        }

        private SetInfoReward() {
            let rewards = [];
            for (const k in this.info.goods_id) {
                const v = this.info.goods_id[k];
                let goods = new message.GoodsInfo();
                goods.goodsId = v;
                if (v == message.EResourceType.RESOURCE_TOKEN) {
                    goods.count = this.info.goods_num[k] + this.info.raw_raw_token;
                } else {
                    goods.count = this.info.goods_num[k];
                }
                rewards.push(goods);
            }
            let good = new message.GoodsInfo();
            good.goodsId = message.EResourceType.RESOURCE_TOKEN;
            good.count = this.info.raw_token;
            let Token: any = message.EResourceType.RESOURCE_TOKEN;;
            let find_token = Table.FindF(rewards, function (k, v) {
                return v.goodsId == Token;
            })

            if (!find_token && good.count != 0) {
                rewards.splice(0, 0, good);
            }

            this.listBuyAward.selectedIndex = -1; // 默认选中
            this.listBuyAward.itemRenderer = HXH_GiftMonthItem;

            this.AddGiftItem = new eui.ArrayCollection();
            for (let i = 0; i < rewards.length; i++) {
                let data = new HXH_GiftMonthItemData();
                data.goods = rewards[i];
                data.father = this;
                data.index = i;
                this.AddGiftItem.addItem(data);
            }

            this.listBuyAward.dataProvider = this.AddGiftItem;
            this.AddGiftIndex = this.listBuyAward.selectedIndex;
            this.dataid++;
        }

        private SetInfoState() {
            let a = this.info.index;
            let b_bought = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.monthGift, function (k, v) {
                return v == a;
            })
            let time = PlayerGiftSystem.LastTime(this.info.open_time, this.info.duration);
            let str_last_time = b_bought && TextsConfig.TextsConfig_Hunter_NewGift.sold_out || TextsConfig.TextsConfig_Hunter_NewGift.last_time + this.formatMsTimeCh(time);
            this.labelCurrentType.text = str_last_time;
            this.buttonGiftBuy.enabled = !b_bought;
            this.imageTypeTop.visible = !b_bought;
            this.labelGetNum.visible = !b_bought;
            this.buttonGiftBuy.visible = !b_bought;
            this.imageSoul.visible = b_bought;
            this.imageGestoneIcon.visible = !b_bought;
            this.imageLeft.source = cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
            this.imageRight.source = cachekey("ui_hunter_ButtonHunterLeftNor_png", this);

        }

        private refreshInfo(ev: egret.Event) {
            if (this.this_buy == false) {
                return;
            } else {
                this.this_buy = true;
            }
            this.buttonGiftGet.touchEnabled = false;
            let msg = (<message.RoleInfoNoticeRequest>ev.data).body;
            if (msg.gameInfo.getGoods.length > 0) {
                let cb = () => {
                    this.FollowUp(true);
                }
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.init(msg.gameInfo.getGoods);
                        dialog.show();
                        dialog.setCB(cb);
                    })
            } else {
                this.FollowUp(false);
            }
        }

        private FollowUp(run_ani) {
            if (run_ani) {
                egret.Tween.get(this)
                    .to({ scaleX: 1, scaleY: 0 }, 400, egret.Ease.backInOut).call(() => {
                        this.SetInfoState();
                    })
                    .wait(500)
                    .to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut);
                this.imageLeft.source = cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
                this.imageRight.source = cachekey("ui_hunter_ButtonHunterLeftNor_png", this);

                this.this_buy = false;
            } else {
                this.SetInfoState();
            }
        }

        private ButtonGiftBuy_CallBack() {
            if (Device.isTestSwitch) {
                toast_warning(TextsConfig.TextsConfig_Error.sw_error);
            } else {
                this.buttonGiftBuy.touchEnabled = false;
                this.this_buy = true;
                let index = this.info.index;
                if (this.info.pay_index != "") {
                    if (Util.getAppVersionInfo().channel == "test") {
                        Game.PlayerPaySystem.simulateCharge(index).then((gameInfo: message.GameInfo) => {
                            this.buttonGiftBuy.enabled = false;
                            this.simulateCharge(gameInfo, 0);
                        }).catch((err) => {
                            this.simulateCharge(null, err);
                            this.buttonGiftBuy.touchEnabled = true;
                        });
                    } else {
                        let strIndex = this.info["index"];
                        platform.pay(PlayerPaySystem.GetProductId(this.info["pay_index"], this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                } else if (this.info.token_price != "") {
                    this.BuyMonthGiftReqBody(index).then((gameInfo: message.GameInfo) => {
                        this.buttonGiftBuy.enabled = false;
                        this.simulateCharge(gameInfo, 0);
                    }).catch((err) => {
                        this.simulateCharge(null, err);
                        this.buttonGiftBuy.touchEnabled = true;
                    });
                }
            }
        }

        public simulateCharge(gameInfo: message.GameInfo, result: number) {
            if (result == message.EC.SUCCESS) {
                if (gameInfo.getGoods.length > 0) {
                    let cb = () => {
                        this.FollowUp(true);
                    }
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init(gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(cb);
                        })
                } else {
                    this.FollowUp(false);
                }

            } else {
                toast_warning(`${Game.ConfigManager.getAone2CodeReason(result)}(${result})`);
            }
        }

        public BuyMonthGiftReqBody(index: number) {
            return new Promise((resolve, reject) => {
                let request = new message.BuyMonthGiftRequest();
                request.body.gift_id = index;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.BuyMonthGiftResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 鼠标点击说明
        public onChooseItemTap(isTouchBegin: boolean, data: HXH_GiftMonthItemData) {
            let _type = PlayerItemSystem.ItemType(data.goods.goodsId);

            let dialog = this.father.groupMain.getChildByName("Item-skill-common") as CommonDesGeneral;
            if (dialog) this.father.groupMain.removeChild(dialog);

            let index = data.index * 70 + this.index * 350 + 38;

            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                        dialog.x = -154 + index;
                        dialog.y = 65;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        this.father.groupMain.addChild(dialog);
                    });
                } else
                    if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                        loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                            dialog.x = -154 + index;
                            dialog.y = 65;
                            dialog.name = "Item-skill-common";
                            dialog.setInfo(data.goods.goodsId, data.goods.count);
                            this.father.groupMain.addChild(dialog);
                        });
                    } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                        loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                            dialog.x = -154 + index;
                            dialog.y = 65;
                            dialog.name = "Item-skill-common";
                            dialog.setInfo(data.goods.goodsId, data.goods.count);
                            this.father.groupMain.addChild(dialog);
                        });
                    }
                    else {
                        loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                            dialog.x = -154 + index;
                            dialog.y = 65;
                            dialog.name = "Item-skill-common";
                            dialog.init(data.goods.goodsId, data.goods.count);
                            this.father.groupMain.addChild(dialog);
                        });

                    }
            }
        }

        //鼠标抬起，移除说明
        private onRemoveAward() {
            let dialog = this.father.groupMain.getChildByName("Item-skill-common");
            if (dialog) this.father.groupMain.removeChild(dialog);
        }

        // 中文时间
        private formatMsTimeCh(ms: number) {
            let d: number = Math.floor(ms / 86400);
            let ttmp: number = Math.floor(ms % 86400)
            let a: number = Math.floor(ttmp / 3600);
            let tmp: number = Math.floor(ttmp % 3600);
            let b: number = Math.floor(tmp / 60);
            let c: number = Math.floor(tmp % 60);

            let hour = a;
            let min = b;
            let sec = c;
            let day = d;

            if (d == 0) {
                return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
            }
            return day + TextsConfig.TextsConfig_Time.day + hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
        }

    }

    export class HXH_GiftMonthData {
        father: HXH_GiftMonthList;
        info: any;
        index: number;
        allPro: Array<MyProductInfo> = [];
    }
}