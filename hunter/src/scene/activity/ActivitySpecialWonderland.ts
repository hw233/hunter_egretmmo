namespace zj {
    // 福利-成长基金
    // lizhengqiang
    // 20190323
    export class ActivitySpecialWonderland extends UI {
        public lbCurrencyLevel: eui.Label;
        public lstAward: eui.List;
        public btn: eui.Button;
        private giftInfo;
        private info: message.GiftInfo;
        public groupHand: eui.Group;
        private allLevelInfo;
        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialWonderlandSkin.exml";
        }

        public init() {
            Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtn, this);
            this.giftInfo = PlayerGiftSystem.Instance_item(100302);
            this.info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100302;
            })[0];
            if (this.info.buy_times == 0) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 1, 0)
                    .then(display => {
                        display.touchEnabled = false;
                        this.groupHand.addChild(display);
                    })
            } else {
                this.groupHand.removeChildren();
            }
            this.allLevelInfo = PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
            //最高返还多少
            let allGet: number = 0;
            for (let i = 0; i < this.allLevelInfo.length; i++) {
                for (let j = 0; j < this.allLevelInfo[i].goods_id.length; j++) {
                    if (this.allLevelInfo[i].goods_id[j] == message.EResourceType.RESOURCE_TOKEN)
                        allGet = allGet + this.allLevelInfo[i].goods_count[j];
                }
            }
            let arrCollection = new eui.ArrayCollection();
            for (let i = 0; i < this.allLevelInfo.length; i++) {
                let data = new ActivitySpecialWonderlandItemData();
                data.father = this;
                data.index = i;
                data.info = this.allLevelInfo[i];
                data.id = 100302
                arrCollection.addItem(data);
            }
            let array = new eui.ArrayCollection();
            let b = [];
            for (let i = 0; i < arrCollection.length; i++) {
                let a = arrCollection.source[i] as ActivitySpecialWonderlandItemData;
                let info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                    return v.gift_index == a.id;
                })[0];
                let find = Table.FindF(info["markIndex"], (k, v) => {
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
        }

        public get vis(): boolean {
            if (this.info.buy_times == 1) {
                return true;
            } else {
                return false;
            }
        }

        private onbtn() {
            if (Game.PlayerInfoSystem.BaseInfo.vipLevel < 3) {
                // toast_warning(LANG(TextsConfig.TextConfig_Instance.vip3BuyGift));
                let str = "<text>达到</text><color>r=200,g=38,b=0</color><text>VIP%s级</text><text>方可购买</text><color>r=200,g=38,b=0</color><text>成长基金</text><text>，是否前往提升VIP等级？</text>";
                loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(HelpUtil.textConfigFormat(str, 3));
                    dialog.setCB(() => {
                        Game.EventManager.event(GameEvent.CLOSE_ACTIVITY_SCENE);
                        loadUI(PayMallScene).then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init(true);
                            scene.loadFrom(TableEnum.Enum.HXHChargeType.Gift);
                        });
                    });
                });
            } else {
                if (!this.info) {
                    toast_warning("基金活动未开启")
                    return;
                }
                Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                    let cb = () => {
                        this.setInfoButton();
                        toast_success(LANG(TextsConfig.TextConfig_Tower.mallBuy));
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
                    egret.Tween.get(this).wait(100).call(() => {
                        this.init();
                    })
                }).catch((result) => {
                    toast_warning(Game.ConfigManager.getAone2CodeReason(result));
                });
            }
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
        private setInfoButton = () => {
            this.btn.enabled = (this.info["buy_times"] < this.giftInfo.buy_times);
        };
    }
}