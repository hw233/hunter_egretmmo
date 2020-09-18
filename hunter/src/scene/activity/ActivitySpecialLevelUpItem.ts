namespace zj {
    // 福利-升级奖励item
    // lizhengiang
    // 20190323
    export class ActivitySpecialLevelUpItem extends eui.ItemRenderer {
        private groupCache: eui.Group;
        private lbPlayerLevel: eui.BitmapLabel;
        private lstAward: eui.List;
        private imgMonthCardFrame: eui.Image;
        private imgMonthCardIcon: eui.Image;
        private groupAnimation: eui.Group;
        private lbMonthCardNum: eui.BitmapLabel;
        private imgGetAward: eui.Image;
        private btnMonthCard: eui.Button;
        private btnCardGetAward: eui.Button;
        private imgMask: eui.Image;

        private tbl: TableUplevelReward;
        private info: TableUplevelReward;
        private getAward: boolean = false;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialLevelUpItemSkin.exml";
            cachekeys(<string[]>UIResource["ActivitySpecialLevelUpItem"], null);
            this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMonthCard, this);
            this.btnCardGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardGetAward, this);
            this.imgMonthCardIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
                this.groupAnimation.addChild(display);
            }).catch(reason => {
                toast(reason);
            });
        }

        protected dataChanged() {
            closeCache(this.groupCache);
            this.info = this.data.info;
            this.tbl = this.data.tbl;

            this.lbPlayerLevel.text = this.tbl.level.toString() // Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.getAward, ));

            this.imgMonthCardIcon.source = cachekey(PlayerItemSystem.ItemPath(this.tbl.month_reward[0][0]), this);
            this.lbMonthCardNum.text = (this.tbl.month_reward[0][1]).toString();

            let buyCard: boolean = PlayerGiftSystem.AdvanceMonthBeBought();
            let level: number = this.tbl.level;

            let levelReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward, (k, v) => {
                return v == this.tbl.index;
            });

            let monthReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.monthReward, (k, v) => {
                return v == this.tbl.index;
            });

            this.imgGetAward.visible = false;
            this.imgMask.visible = false;
            this.getAward = false;
            // (<eui.Image>this.btnCardGetAward.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Special.buttonNor, this);
            this.btnCardGetAward.label = "普通领取";
            // (<eui.Image>this.btnMonthCard.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Special.buttonSingle["buttonNor"], this);
            this.btnMonthCard.label = "领取专享";
            this.btnCardGetAward.enabled = true;
            this.btnMonthCard.enabled = true;
            if (Game.PlayerInfoSystem.BaseInfo.level >= level) {
                if (buyCard) {
                    if (levelReward) {
                        this.getAward = true;
                        this.btnCardGetAward.visible = false;
                        if (monthReward) {
                            this.imgGetAward.visible = true;
                            this.btnMonthCard.visible = true;
                            // (<eui.Image>this.btnMonthCard.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Activity.ButtonOk, this);
                            this.imgMask.visible = true;
                            this.btnMonthCard.label = "已领取";
                            this.btnMonthCard.enabled = false;
                        } else {
                            this.btnMonthCard.visible = true;
                        }
                    } else {
                        this.btnCardGetAward.visible = true;
                        this.btnMonthCard.visible = false;
                    }
                } else {
                    if (levelReward) {
                        this.getAward = true;
                        this.btnCardGetAward.visible = false;
                        this.btnMonthCard.visible = true;
                    } else {
                        this.btnCardGetAward.visible = true;
                        this.btnMonthCard.visible = false;
                    }
                }
            } else {
                this.imgGetAward.visible = false;
                this.btnCardGetAward.visible = true;
                this.btnMonthCard.visible = false;
                // (<eui.Image>this.btnCardGetAward.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Activity.ButtonLevel, this);
                this.btnCardGetAward.label = "等级不足";
                this.btnCardGetAward.enabled = false;
            }

            this.loadList();
            setCache(this.groupCache);
        }

        private loadList() {
            let arrCollection = new eui.ArrayCollection();
            for (let v of this.tbl.level_reward) {
                arrCollection.addItem(
                    {
                        "goods": v[0],
                        "count": v[1],
                        "isGet": this.getAward
                    }
                );
            }
            this.lstAward.dataProvider = arrCollection;
            this.lstAward.itemRenderer = ActivityActivityItemB;
        }

        private onBtnMonthCard() {
            let buyCard: boolean = PlayerGiftSystem.AdvanceMonthBeBought();
            let advancedId: number = CommonConfig.month_card_fit[1];

            let advanceInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == advancedId;
            })[0];

            if (buyCard == false) {
                if (advanceInfo == null) {
                    toast_warning(TextsConfig.TextsConfig_Activity.BuyCard);
                } else {
                    // loadUI(GiftTimeNode)
                    //     .then((dialog: GiftTimeNode) => {
                    //         dialog.show(UI.SHOW_FROM_TOP);
                    //         dialog.setInfo(advanceInfo, null, null, true);
                    //     });
                    TipManager.ShowConfirmCancel("是否前往超值月卡购买", () => {
                        this.data.father.cb();
                    })
                }
            } else {
                this.reqReward();
            }
        }

        private onBtnCardGetAward() {
            this.reqReward();
        }

        private reqReward = () => {
            Game.PlayerActivitySystem.upLevelReward(this.tbl.index).then((resp: message.GameInfo) => {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(resp.getGoods);
                        dialog.setCB((this.data.father as ActivitySpecialLevelUp).setList);

                        Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
                    });
            }).catch((result) => {
                toast_warning(Game.ConfigManager.getAone2CodeReason(result));
            });
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.tbl.month_reward[0][0];
            goodsInfo.count = this.tbl.month_reward[0][1];

            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }
    }
}