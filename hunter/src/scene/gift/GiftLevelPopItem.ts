namespace zj {
    // 
    // lizhengqiang
    // 20190411
    export class GiftLevelPopItem extends eui.ItemRenderer {
        private lbNameType: eui.BitmapLabel;
        private lbLevelGet: eui.Label;
        private groupOne: eui.Group;
        private groupAni: eui.Group;
        private imgIcon: eui.Image;
        private lbGemstoneNum: eui.BitmapLabel;
        private lstRMB: eui.List;
        private btnGiftGet: eui.Button;
        private btnGiftNo: eui.Button;
        private imgRed: eui.Image;
        private imgGet: eui.Image;
        private imgFrameClick: eui.Image;
        private imgShadow: eui.Image;

        private info;
        private dayInfo: TableNewgiftDaily;
        private giftInfo: TableNewgiftItem;
        private goodsInfo: message.GoodsInfo;

        private _TOKEN = 20002;

        public constructor() {
            super();
            this.skinName = "resource/skins/gift/GiftLevelPopItemSkin.exml";
            cachekeys(<string[]>UIResource["GiftLevelPopItem"], null);
            this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftGet, this);
            this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
                this.groupAni.addChild(display);
            }).catch(reason => {
                toast(reason);
            });
        }

        protected dataChanged() {
            this.info = this.data.info;
            this.dayInfo = this.data.dayInfo;
            this.giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.goodsInfo = null;

            this.setInfoOtherInfo();
            this.setInfoGoods();
        }

        private setInfoOtherInfo = () => {
            if (this.giftInfo.gift_form == 6) {
                this.setInfoOtherInfo1();
            } else if (this.giftInfo.gift_form == 3) {
                this.setInfoOtherInfo2();
            }
        }

        private setInfoOtherInfo1() {
            let level: number = Number(this.dayInfo.reward_level);
            let find = Table.FindF(this.info["markIndex"], (k, v) => {
                return v == this.dayInfo.index;
            });
            this.imgRed.visible = (!find && Game.PlayerInfoSystem.BaseInfo.level >= level);
            this.lbNameType.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.level_gift_name, level);
            this.lbLevelGet.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.get_level, level));

            let image1 = UIConfig.UIConfig_Gift.reach; // 达成
            let image2 = UIConfig.UIConfig_Gift.get; // 领取

            if (!find && Game.PlayerInfoSystem.BaseInfo.level >= level) {
                // 可领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = true;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = true;
                this.btnGiftGet.enabled = true;
            } else if (find) {
                // 已领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = true;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = true;
                this.btnGiftGet.enabled = false;
            } else if (Game.PlayerInfoSystem.BaseInfo.level < level) {
                // 不可领
                this.imgShadow.visible = true;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = true;
                this.btnGiftGet.visible = false;
                this.btnGiftGet.enabled = false;
            }
        }

        private setInfoOtherInfo2() {
            this.imgRed.visible = (this.info["dailyIndex"] == this.dayInfo.index && this.info["buy_times"] == 0);
            this.lbNameType.text = Helper.StringFormat(TextsConfig.TextsConfig_Award.day, this.dayInfo.index - Number(this.giftInfo.daily_index) + 1);
            this.lbLevelGet.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Award.day_get, this.dayInfo.index - Number(this.giftInfo.daily_index) + 1));

            let image1 = UIConfig.UIConfig_Gift.reach; // 达成
            let image2 = UIConfig.UIConfig_Gift.get; // 领取

            if (this.info["dailyIndex"] < this.dayInfo.index) {
                // 不可领
                this.imgShadow.visible = true;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = false;
                this.btnGiftNo.visible = true;
                this.btnGiftNo.enabled = false;
                this.btnGiftGet.visible = false;
            } else if (this.info["dailyIndex"] == this.dayInfo.index) {
                if (this.info["buy_times"] == 0) {
                    // 可领取
                    this.imgShadow.visible = false;
                    this.imgFrameClick.visible = true;
                    this.imgGet.visible = false;
                    this.btnGiftNo.visible = false;
                    this.btnGiftGet.visible = true;
                    this.btnGiftGet.enabled = true;
                } else {
                    // 已领取
                    this.imgShadow.visible = false;
                    this.imgFrameClick.visible = false;
                    this.imgGet.visible = true;
                    this.btnGiftNo.visible = false;
                    this.btnGiftGet.visible = false;
                    this.btnGiftGet.enabled = false;
                }

            } else if (this.info["dailyIndex"] > this.dayInfo.index) {
                // 已领取
                this.imgShadow.visible = false;
                this.imgFrameClick.visible = false;
                this.imgGet.visible = true;
                this.btnGiftNo.visible = false;
                this.btnGiftGet.visible = false;
                this.btnGiftGet.enabled = false;
            }
        }

        private setInfoGoods() {
            let rewards: message.GoodsInfo[] = [];
            for (let i = 0; i < this.dayInfo.goods_id.length; i++) {
                let good = new message.GoodsInfo();
                good.goodsId = this.dayInfo.goods_id[i];
                good.count = this.dayInfo.goods_count[i];
                rewards.push(good);
            }

            let showOne: boolean = (rewards.length == 1 && this.giftInfo.gift_form == 6);
            this.lstRMB.visible = !showOne;
            this.groupOne.visible = showOne;
            if (showOne) {
                let k = Table.FindR(rewards, (kk, vv) => {
                    return vv.goodsId == this._TOKEN
                });
                if (k[1] != null) {
                    let count = rewards[k[1]].count;
                    this.imgIcon.source = cachekey("ui_iconresources_zuanshi1_png", this);
                    this.lbGemstoneNum.text = "x" + count;
                    this.goodsInfo = k[0];
                }
            } else {
                let arrCollection = new eui.ArrayCollection();
                for (let v of rewards) {
                    arrCollection.addItem(v);
                }

                this.lstRMB.dataProvider = arrCollection;
                this.lstRMB.itemRenderer = GiftCommonAwardItem;
            }
        }

        private onBtnGiftGet() {
            this.btnGiftGet.enabled = false;
            if (this.giftInfo.gift_form == 6) {
                Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.dayInfo.index).then((msg: message.GameInfo) => { this.simulateCharge(msg) });
            } else if (this.giftInfo.gift_form == 3) {
                Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((msg: message.GameInfo) => { this.simulateCharge(msg) });
            }
        }

        private simulateCharge(msg: message.GameInfo) {
            this.btnGiftGet.enabled = true;
            for (let v of msg.giftInfos) {
                if (v.index == this.info["index"]) {
                    this.info = Table.DeepCopy(v);
                }
            }
            let info = this.info;
            if (msg.getGoods.length > 0) {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(msg.getGoods);
                        dialog.setCB(() => {
                            (this.data.father as GiftLevelPop).updateItem(info);
                        });
                    });
            }
        }

        private onShowGoodProperty(e: egret.TouchEvent) {
            Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        }

    }
}