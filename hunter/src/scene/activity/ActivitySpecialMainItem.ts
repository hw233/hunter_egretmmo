namespace zj {
    // 福利item
    // lizhengiang
    // 20190320
    export class ActivitySpecialMainItem extends eui.ItemRenderer {
        public btnTag: eui.Button;
        public imgTip: eui.Image;
        private index: number = 0;
        private vis: boolean = true;
        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialMainItemSkin.exml";
            cachekeys(<string[]>UIResource["ActivitySpecialMainItem"], null);
        }

        protected dataChanged() {
            this.index = this.data;
            if (this.vis) {
                this.vis = false;
                if (this.index != 1) {
                    Set.ButtonBackgroud(this.btnTag, cachekey(UIConfig.UIConfig_Special.title[this.data - 1], this), cachekey(UIConfig.UIConfig_Special.title[this.data - 1], this), cachekey(UIConfig.UIConfig_Special.title1[this.data - 1], this))
                }
            }
            if (this.index == 1) {
                this.imgTip.visible = Tips.GetTipsOfId(Tips.TAG.AWARD, 1);
            } else if (this.index == 2) {
                this.imgTip.visible = Tips.GetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GETPOWER);
            } else if (this.index == 3) {
                this.imgTip.visible = Tips.GetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GATAWARD);
            } else if (this.index == 4) {
                let info: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                    return v.gift_index == 100203;
                })[0];
                let info1: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                    return v.gift_index == 100204;
                })[0];
                if (info == null && info1 == null) {
                    this.imgTip.visible = false;
                } else if (info != null && info1 == null) {
                    if ((info.buy_times != 0 && info.mark == 0)) {
                        this.imgTip.visible = true;
                    } else {
                        this.imgTip.visible = false;
                    }
                } else if (info == null && info1 != null) {
                    if ((info1.buy_times != 0 && info1.mark == 0)) {
                        this.imgTip.visible = true;
                    } else {
                        this.imgTip.visible = false;
                    }
                } else {
                    if ((info.buy_times != 0 && info.mark == 0) || (info1.buy_times != 0 && info1.mark == 0)) {
                        this.imgTip.visible = true;
                    } else {
                        this.imgTip.visible = false;
                    }
                }
            } else if (this.index == 5) {
                let info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                    return v.gift_index == 100302;
                })[0];
                if (info) {
                    if (PlayerGiftSystem.getNextLevel(info)) {
                        this.imgTip.visible = PlayerGiftSystem.getNextLevel(info) <= Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                } else {
                    this.imgTip.visible = false;
                }

            } else if (this.index == 6) {
                let info: message.GiftInfo = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                    return v.gift_index == 100303;
                })[0];
                if (info) {
                    if (PlayerGiftSystem.getNextLevel(info)) {
                        this.imgTip.visible = PlayerGiftSystem.getNextLevel(info) <= Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                } else {
                    this.imgTip.visible = false;
                }
            } else if (this.index == 7) {
                this.imgTip.visible = false;
                let table = TableContinuePay.Table();
                for (let i = 1; i <= Object.keys(table).length; i++) {
                    let info = TableContinuePay.Item(i);
                    let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, (k, v) => {
                        return v == info.id;
                    })
                    if (info.id == Game.PlayerInfoSystem.BaseInfo.pay_day && !vis) {//领取
                        this.imgTip.visible = true;
                        i = 1000;
                        break;
                    }
                }
            } else if (this.index >= 4) {
                this.imgTip.visible = Tips.tips_useTime_get(this.index);
            } else {
                this.imgTip.visible = Tips.GetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_UpStar);
            }
            if (this.selected) {
                this.btnTag.enabled = false;
            } else {
                this.btnTag.enabled = true;
            }
        }
    }
}