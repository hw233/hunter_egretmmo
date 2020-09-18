namespace zj {
    // 福利
    // lizhengqiang
    // 20190320
    export class ActivitySpecialMainScene extends Scene {
        public groupTR: eui.Group;
        public groupbtnAddGold: eui.Group;
        public lbGold: eui.Label;
        public btnAddGold: eui.Button;
        public imgFlagGold: eui.Image;
        public groupbtnAddGemstone: eui.Group;
        public lbGemstone: eui.Label;
        public jewel: eui.Image;
        public btnAddGemstone: eui.Button;
        public imgFlagGemstone: eui.Image;
        public groupbtnAddStrength: eui.Group;
        public lbStrength: eui.Label;
        public energy: eui.Image;
        public btnAddStrength: eui.Button;
        public imgFlagStrength: eui.Image;
        public groupRight: eui.Group;
        public lstViewType: eui.List;
        public btnClose: eui.Button;

        private arrCollection: eui.ArrayCollection;
        private focusCurrent: number = 0;
        private ui = {//屏蔽活动把1注掉依次往前重排
            "0": new AwardSign(),
            "1": new ActivitySpecialGetPower(),
            "2": new ActivitySpecialLevelUp(),
            "3": new ActivitySpecialWord(),
            "4": new ActivitySpecialWonderland(),
            "5": new ActivitySpecialWantedSeonde(),
            "6": new ActivityRecharge(),
            // "7": new ActivitySpecialSkyArena()
        };
        // private vis: boolean = true;
        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialMainSceneSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.lstViewType.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedItem, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            Game.EventManager.on(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);
            Game.EventManager.on(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE, this.typeUpdte, this);

            Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.update, this);
            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.update, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.update, this);

            Game.EventManager.on(GameEvent.CLOSE_ACTIVITY_SCENE, this.closeThis, this);

            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.groupbtnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.groupbtnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            this.groupbtnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
                Game.EventManager.off(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);
                Game.EventManager.off(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE, this.typeUpdte, this);
                for (let k in this.ui) {
                    if (this.ui.hasOwnProperty(k)) {
                        let v = this.ui[k];
                        v.close();
                    }
                }
                this.ui = null;
            }, null);

            this.init();
            this.update();
            if (Device.isReviewSwitch) {
                this.btnClose.x = 900;
                this.btnClose.y = 25;
            }
        }

        private update() {
            if (Game.PlayerInfoSystem.Coin > 100000) {
                if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                } else {
                    this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
            }
            if (Game.PlayerInfoSystem.Token > 100000) {
                if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                } else {
                    this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
            let str = "";
            if (Game.PlayerInfoSystem.Power > 100000) {
                if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                } else {
                    str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            } else {
                str += Game.PlayerInfoSystem.Power.toString();
            }
            let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
            this.lbStrength.text = str_energy;
            // //金币红点
            // if (Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < PlayerVIPSystem.LowItem().buy_coin_free_time) {
            //     this.imgFlagGold.visible = true;
            // } else {
            //     this.imgFlagGold.visible = false;
            // }
            // this.imgFlagGemstone.visible = false;
            // this.imgFlagStrength.visible = false;
            this.imgFlagGemstone.visible = false;
            this.imgFlagGold.visible = false;
            this.imgFlagStrength.visible = false;
        }

        private init() {
            this.loadAttrList();

            this.groupRight.removeChildren();

            if (this.ui[this.focusCurrent] != null) {
                this.groupRight.addChild(this.ui[this.focusCurrent]);
                this.ui[this.focusCurrent].init();
            }
        }

        private loadAttrList() {
            let length = Object.keys(this.ui).length;//屏蔽活动加了个+1
            if (Device.isReviewSwitch) {
                length = 1;
            }
            this.arrCollection = new eui.ArrayCollection();
            for (let i = 1; i <= length; i++) {
                this.arrCollection.addItem(i);
            }
            this.lstViewType.dataProvider = this.arrCollection;
            this.lstViewType.itemRenderer = ActivitySpecialMainItem;
            this.lstViewType.selectedIndex = 0;
        }

        private onLstSelectedItem(e: eui.ItemTapEvent) {
            let gift = Table.FindF(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            let charge = Table.FindF(PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });

            if ((!gift && e.itemIndex == 3) && (!charge && e.itemIndex == 3)) {
                toast_warning("月卡暂未开启")
                return;
            };
            let info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100302;
            })[0];
            if (!info && e.itemIndex == 4) {
                toast_warning("基金暂未开启")
                return;
            };
            let info1 = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100303;
            })[0];
            if (!info1 && e.itemIndex == 5) {
                toast_warning("礼包暂未开启")
                return;
            };
            if (this.focusCurrent != this.lstViewType.selectedIndex) {
                Tips.tips_useTime_set(this.focusCurrent + 1);
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, this.focusCurrent + 1);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.focusCurrent]);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.lstViewType.selectedIndex]);
                this.focusCurrent = this.lstViewType.selectedIndex;
                let x = this.groupRight.x;
                this.groupRight.removeChildren();
                if (this.ui[this.focusCurrent] != null) {
                    this.groupRight.addChild(this.ui[this.focusCurrent]);
                    this.ui[this.focusCurrent].init();
                    Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
                    if (this.focusCurrent == 0 || this.focusCurrent == 3) {
                        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
                    }
                    if (this.focusCurrent == 2) {
                        this.ui[this.focusCurrent].cb(() => {
                            let e: eui.ItemTapEvent = new eui.ItemTapEvent(null);
                            e.itemIndex = 3;
                            this.lstViewType.selectedIndex = 3;
                            this.onLstSelectedItem(e);
                        });
                    }
                }
            }
        }

        public jump(num: number) {
            let e: eui.ItemTapEvent = new eui.ItemTapEvent(null);
            e.itemIndex = num;
            this.lstViewType.selectedIndex = num;
            this.onLstSelectedItem(e);
        }

        private removeShow() {
            let show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        }

        private showGoodsProperty(ev: egret.Event) {
            if (Game.UIManager.dialogCount() > 0) return;

            let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        }

        private showCommonMessgae(ev: egret.Event) {
            setTimeout(() => {
                let ui = <CommonMessage>newUI(CommonMessage);
                this.addChild(ui);
                ui.init(ev.data.source, ev.data.text);
            }, 300);
        }

        private typeUpdte(ev: egret.Event) {
            Tips.tips_useTime_set(this.focusCurrent + 1);
            Tips.SetTipsOfId(Tips.TAG.SPECIAL, this.focusCurrent + 1);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.focusCurrent]);
        }

        //添加金币
        private onBtnAddGold() {
            loadUI(HelpGoldDialog)
                .then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList(true);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            // toast_success("加钻石功能未开启");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(true);
                });
        }

        private onBtnAddStrength() {
            //增加体力
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }

        private closeThis() {
            this.close();
        }
    }
}