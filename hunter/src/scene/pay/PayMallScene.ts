namespace zj {
    // 商城
    // lizhengqiang
    // 20190326

    export interface MyProductInfo {
        id: string;
        name: string;
        describe: string;
        currency: string;
        amount: number;
        amount_usd: number;
        coin: number;
        type: string;
        discount: string;
        cp_product_id: string;
    }

    export class PayMallScene extends Dialog {
        private imgBackground: eui.Image;
        private groupMain: eui.Group;
        private lbNeed: eui.Label;
        private imgVipNext: eui.Image;
        private groupExp: eui.Group;
        private imgExpNull: eui.Image;
        private imgExp: eui.Image;
        private lbPay: eui.Label;
        private imgVip: eui.Image;
        private btnPay: eui.Button;
        private imgTips6: eui.Image;
        private imgPay: eui.Image;
        private groupTitle: eui.Group;
        private groupBgAni: eui.Group;
        private imgName: eui.Image;
        private lstViewType: eui.List;
        private lstViewItem: eui.List;
        private imgCost: eui.Image;
        private lbToken: eui.Label;
        private btnClose: eui.Button;
        private btnRecharge: eui.Button;
        private groupInfo: eui.Group;
        private scrollViewType: eui.Scroller;

        private tween: egret.tween.TweenGroup;
        private rectMask: eui.Image;
        private timer: egret.Timer;
        private arrCollectionType: eui.ArrayCollection;
        private arrCollectionItem: eui.ArrayCollection;
        private typeIndex: number = 0;
        public type: number = TableEnum.Enum.HXHChargeType.Charge;
        private allProducts: Array<MyProductInfo> = [];
        private confirmCB: Function = null;
        private index: number = null;

        public constructor() {
            super();
            this.skinName = "resource/skins/pay/PayMallSceneSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPay, this);
            this.lstViewType.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedType, this);

            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfoLowVip, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                if (this.tween) this.tween.stop();
                if (this.timer) this.timer.stop();
                Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfoLowVip, this);
            }, null);
        }

        public init(isBackground: boolean = false) {
            if (Util.isDisabledPay()) {
                this.close();
            }

            this.imgBackground.visible = isBackground;
            this.groupBgAni.removeChildren();
            Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(display => {
                this.groupBgAni.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            this.tween.items[0].props = { loop: true };
            this.tween.play();

            this.rectMask = Util.getMaskImgBlack(this.imgExp.width, this.imgExp.height);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);

            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoRes, this);
            this.timer.start();

            this.imgName.source = cachekey(UIConfig.UIConfig_VipMall.low_title_texiao, this);
            this.imgTips6.visible = false;
            this.imgPay.visible = false;

            this.loadPayProducts();
            this.setInfoLowVip();
            this.setInfoRes();
            if (Device.isReviewSwitch) {
                this.btnPay.visible = false;
                this.groupTitle.visible = false;
                this.btnRecharge.visible = true;
                this.groupInfo.visible = false;
                this.scrollViewType.visible = false;
            } else {
                this.btnRecharge.visible = false;
            }
        }

        public isFullScreen() {
            return this.imgBackground.visible;
        }

        public loadFrom(type: number, index?: number) {
            if (Util.isDisabledPay()) {
                this.close();
            }

            this.groupBgAni.removeChildren();
            Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(display => {
                this.groupBgAni.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            this.tween.items[0].props = { loop: true };
            this.tween.play();

            this.rectMask = Util.getMaskImgBlack(341, 25);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);

            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoRes, this);
            this.timer.start();

            this.imgName.source = cachekey(UIConfig.UIConfig_VipMall.low_title_texiao, this);
            this.imgTips6.visible = false;
            this.imgPay.visible = false;

            if (type) {
                this.type = type;
            }

            this.index = index;

            this.loadPayProducts();
            this.setInfoLowVip();
            this.setInfoRes();
        }

        private setInfoRes() {
            this.lbToken.text = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        }

        public setInfoLowVip() {
            const MAX = 12;
            let tbl = TableVipinfo.Table();
            let levelCur = Game.PlayerInfoSystem.VipLevel;
            // 当前星耀等级名称
            this.imgVip.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[levelCur], this);

            if (levelCur != MAX) {
                this.imgVipNext.visible = true;
                // 下一星耀等级名称
                this.imgVipNext.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[levelCur + 1], this);
                // 需要充值
                this.lbNeed.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[levelCur + 1].sum - Game.PlayerInfoSystem.BaseInfo.vipExp) / 10);
            } else {
                this.imgVipNext.visible = false;
                this.lbNeed.text = TextsConfig.TextsConfig_Common.expMax;
            }

            // 进度条
            let percent: number = 0;
            if (levelCur != MAX) {
                percent = (Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / (tbl[levelCur].charge + tbl[levelCur].sum);
                this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + (tbl[levelCur].charge + tbl[levelCur].sum) / 10).toString();
            } else {
                percent = (Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / tbl[levelCur].sum;
                this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + tbl[levelCur].sum / 10).toString();;
            }

            if (percent > 1) {
                percent = 1;
            } else if (percent <= 0) {
                percent = 0;
            }

            this.rectMask.visible = true;
            this.rectMask.width = 341 * percent;
            this.imgExp.mask = this.rectMask;

            this.updateItemList();
        }

        public setInfoTypeList() {
            let showType: number[] = [];

            showType.push(TableEnum.Enum.HXHChargeType.Charge);

            for (const v of Game.PlayerGiftSystem.giftInfos) {
                let info = PlayerGiftSystem.Instance_item(v.gift_index);
                if (info.is_op == 1) {
                    showType.push(TableEnum.Enum.HXHChargeType.Op);
                    break;
                }
            }

            for (const v of Game.PlayerGiftSystem.giftInfos) {
                let info = PlayerGiftSystem.Instance_item(v.gift_index);
                if (info.is_op == 0) {
                    // 新手礼包购买后才显示
                    if (info.gift_form == 5 && info.tips[0] != 0) {
                        if (v.buy_times >= 1 && CommonConfig.month_card_fit.indexOf(v.gift_index) == -1) {
                            showType.push(TableEnum.Enum.HXHChargeType.Gift);
                            break;
                        }
                    } else {
                        showType.push(TableEnum.Enum.HXHChargeType.Gift);
                        break;
                    }
                }
            }

            this.arrCollectionType = new eui.ArrayCollection();
            for (const v of showType) {
                this.arrCollectionType.addItem({ index: v, father: this });
            }
            this.lstViewType.dataProvider = this.arrCollectionType;
            this.lstViewType.itemRenderer = PayMallType;

            this.typeIndex = showType.indexOf(this.type) != -1 ? showType.indexOf(this.type) : 0;
            this.lstViewType.selectedIndex = this.typeIndex;

            this.setInfoItemList();
        }

        private onLstSelectedType(e: eui.PropertyEvent) {
            if (this.typeIndex != this.lstViewType.selectedIndex) {
                this.arrCollectionType.itemUpdated(this.arrCollectionType.source[this.typeIndex]);
                this.arrCollectionType.itemUpdated(this.arrCollectionType.source[this.lstViewType.selectedIndex]);
                this.typeIndex = this.lstViewType.selectedIndex;

                this.type = this.lstViewType.selectedItem.index;
                this.setInfoItemList();
            }
        }

        public setInfoItemList() {
            if (this.type == TableEnum.Enum.HXHChargeType.Charge) {
                let giftList = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
                let tbl = [];
                for (const v of giftList) {
                    if (v.gift_index == 100203 || v.gift_index == 100204) continue;
                    tbl.push(v);
                }

                for (const v of this.allProducts) {
                    tbl.push(v);
                }

                this.arrCollectionItem = new eui.ArrayCollection();
                for (const v of tbl) {
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }

            } else if (this.type == TableEnum.Enum.HXHChargeType.Gift) {
                let giftList = PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos);
                this.arrCollectionItem = new eui.ArrayCollection();
                for (const v of giftList) {
                    if (v.gift_index == 100203 ||
                        v.gift_index == 100204 ||
                        v.gift_index == 100302 ||
                        v.gift_index == 100303 ||
                        v.gift_index == 101507 ||
                        v.gift_index == 100211) continue;
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            } else if (this.type == TableEnum.Enum.HXHChargeType.First) {
                // "HXH_FirstChargeMain"
                loadUI(HXH_FirstChargeMainNew)
                    .then((scene: HXH_FirstChargeMainNew) => {
                        scene.show(UI.SHOW_FILL_OUT);
                    });
            } else if (this.type == TableEnum.Enum.HXHChargeType.Op) {
                let giftList = PlayerGiftSystem.SortOp(Game.PlayerGiftSystem.giftInfos);
                this.arrCollectionItem = new eui.ArrayCollection();
                for (const v of giftList) {
                    this.arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            }

            if (this.arrCollectionItem.source.length == 0) return;
            this.lstViewItem.dataProvider = this.arrCollectionItem;
            this.lstViewItem.itemRenderer = PayMallItem;
            // this.lstViewItem.useVirtualLayout = false;

            if (this.index) this.popItem(this.index);
        }

        public updateItemList = () => {
            if (this.allProducts.length == 0) return;
            let arrCollectionItem = new eui.ArrayCollection();
            if (this.type == TableEnum.Enum.HXHChargeType.Charge) {
                let giftList = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
                let tbl = [];
                for (const v of giftList) {
                    if (v.gift_index == 100203 || v.gift_index == 100204) continue;
                    tbl.push(v);
                }

                for (const v of this.allProducts) {
                    tbl.push(v);
                }

                for (const v of tbl) {
                    arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }

            } else if (this.type == TableEnum.Enum.HXHChargeType.Gift) {
                let giftList = PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos);
                for (const v of giftList) {
                    if (v.gift_index == 100203 ||
                        v.gift_index == 100204 ||
                        v.gift_index == 100302 ||
                        v.gift_index == 100303 ||
                        v.gift_index == 101507 ||
                        v.gift_index == 100211) continue;
                    arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            } else if (this.type == TableEnum.Enum.HXHChargeType.First) {
                // "HXH_FirstChargeMain"
                loadUI(HXH_FirstChargeMainNew)
                    .then((scene: HXH_FirstChargeMainNew) => {
                        scene.show(UI.SHOW_FILL_OUT);
                    });
            } else if (this.type == TableEnum.Enum.HXHChargeType.Op) {
                let giftList = PlayerGiftSystem.SortOp(Game.PlayerGiftSystem.giftInfos);
                for (const v of giftList) {
                    arrCollectionItem.addItem({ "info": v, "type": this.type, "allProducts": this.allProducts, "father": this });
                }
            }

            if (arrCollectionItem.source.length == 0) return;
            this.arrCollectionItem.replaceAll(arrCollectionItem.source);
        }

        public popItem(index: number) {
            this.index = null;
            if (index == null || index == undefined) return;
            setTimeout(() => {
                let popIndex: number;
                for (const k in this.arrCollectionItem.source) {
                    const v = this.arrCollectionItem.source[k];
                    if (v.info.index == index) {
                        popIndex = Number(k);
                        break;
                    }
                }

                let row = Math.floor(popIndex / 3);
                if (row > 2) {
                    let move = row * (182 + 6);
                    if (move + 390 < this.lstViewItem.contentHeight) {
                        this.lstViewItem.scrollV = move;
                    } else {
                        this.lstViewItem.scrollV = this.lstViewItem.contentHeight - 390;
                    }
                    this.lstViewItem.validateNow();
                }

                if (popIndex != null && popIndex != undefined) {
                    (<PayMallItem>this.lstViewItem.getElementAt(popIndex)).onBtnItem();
                }
            }, 800);
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
                    if (itemA.sort_index == itemB.sort_index) {
                        return b.amount - a.amount;
                    } else {
                        return itemA.sort_index - itemB.sort_index;
                    }

                });

                Game.PlayerGiftSystem.getNewGift().then(() => {
                    this.setInfoTypeList();
                });
            }).catch((err) => {
                toast_warning(err);
            });
        }

        private onBtnPay() {
            // "HXH_VipLow"
            this.btnPay.touchEnabled = false;
            setTimeout(() => {
                this.onBtnClose();
            }, 500);

            setTimeout(() => {
                loadUI(VipLow)
                    .then((dialog: VipLow) => {
                        dialog.show(UI.SHOW_FILL_OUT);
                        dialog.init(true);
                    });
            }, 1000);
        }

        public openDown = () => {
            egret.Tween.get(this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
        };

        public closeUp = () => {
            egret.Tween.get(this.groupMain).to({ scaleX: 1, scaleY: 1 }, 200);
        };

        public onBtnClose() {
            if (this.type == TableEnum.Enum.HXHChargeType.Gift) {
                let tbl = PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos);
                for (let v of tbl) {
                    let num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (Tips.tips_oneday_get(num)) {
                        Tips.tips_oneday_set(num, true)
                    }
                }
            } else if (this.type == TableEnum.Enum.HXHChargeType.Op) {
                let tbl = PlayerGiftSystem.SortOp(Game.PlayerGiftSystem.giftInfos);
                for (let v of tbl) {
                    let num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (Tips.tips_oneday_get(num)) {
                        Tips.tips_oneday_set(num, true)
                    }
                }
            } else if (this.type == TableEnum.Enum.HXHChargeType.Charge) {
                let tbl = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
                for (let v of tbl) {
                    let num = Number(v["gift_index"].toString() + v["index"].toString());
                    if (Tips.tips_oneday_get(num)) {
                        Tips.tips_oneday_set(num, true)
                    }
                }
            }
            // 设置红点
            Tips.SetTipsOfId(Tips.TAG.NEWGIFT);
            if (this.confirmCB != null) {
                this.confirmCB();
            }

            egret.Tween.get(this.imgBackground).to({ alpha: 0 }, 180);
            this.close(UI.HIDE_TO_TOP);
        }

        public setCB(confirmCB?: Function) {
            this.confirmCB = confirmCB;
        }

    }
}