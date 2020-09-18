namespace zj {
// 商城type
// lizhengiang
// 20190326
export class PayMallType extends eui.ItemRenderer {
    private btnType: eui.Button;
    private imgTips: eui.Image;

    private timer: egret.Timer;
    private index: number = null;
    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/pay/PayMallTypeSkin.exml";
        cachekeys(<string[]>UIResource["PayMallType"], null);
        this.btnType.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
            this.father = null;
        }, null);

        this.timer = new egret.Timer(999, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoTips, this);
        this.timer.start();
    }

    protected dataChanged() {
        this.index = this.data.index;
        this.father = this.data.father;

        this.setInfo();
        this.setInfoTips();
    }

    private setInfo() {
        Set.ButtonBackgroud(this.btnType, UIConfig.UIConfig_VIP.chargeType[this.index][1], UIConfig.UIConfig_VIP.chargeType[this.index][2]);
        this.btnType.currentState = "up";
        if (this.selected) {
            this.btnType.currentState = "down";
        }
    }

    private onBtnType() {
        if (this.father.type == TableEnum.Enum.HXHChargeType.Gift) {
            let tbl = PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos);
            for (const v of tbl) {
                let num = Number((<string>v.gift_index) + (<string>v.index));
                if (Tips.tips_oneday_get(num)) {
                    Tips.tips_oneday_set(num, true)
                }
            }
        } else if (this.father.type == TableEnum.Enum.HXHChargeType.Op) {
            let tbl = PlayerGiftSystem.SortOp(Game.PlayerGiftSystem.giftInfos);
            for (const v of tbl) {
                let num = Number((<string>v.gift_index) + (<string>v.index));
                if (Tips.tips_oneday_get(num)) {
                    Tips.tips_oneday_set(num, true)
                }
            }
        } else if (this.father.type == TableEnum.Enum.HXHChargeType.Vip) {
            let tbl = PlayerGiftSystem.SortOp(Game.PlayerGiftSystem.giftInfos);
            for (const v of tbl) {
                let num = Number((<string>v.gift_index) + (<string>v.index));
                if (Tips.tips_oneday_get(num)) {
                    Tips.tips_oneday_set(num, true)
                }
            }
        } else if (this.father.type == TableEnum.Enum.HXHChargeType.Charge) {
            let tbl = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
            for (const v of tbl) {
                let num = Number((<string>v.gift_index) + (<string>v.index));
                if (Tips.tips_oneday_get(num)) {
                    Tips.tips_oneday_set(num, true)
                }
            }
        }

        this.father.type = this.index;
        this.father.setInfoTypeList();
    }

    private setInfoTips() {
        if (this.index == TableEnum.Enum.HXHChargeType.Charge) {
            let tips = PlayerGiftSystem.findTipsCharge();
            this.imgTips.visible = tips;
        } else if (this.index == TableEnum.Enum.HXHChargeType.Gift) {
            let tips = PlayerGiftSystem.findTips();
            this.imgTips.visible = tips;
        } else if (this.index == TableEnum.Enum.HXHChargeType.Op) {
            let tips = PlayerGiftSystem.findOpTips();
            this.imgTips.visible = tips;
        } else if (this.index == TableEnum.Enum.HXHChargeType.First) {
            this.imgTips.visible = Tips.GetTipsOfId(Tips.TAG.FIRST);
        } else if (this.index == TableEnum.Enum.HXHChargeType.Vip) {
            let tips = PlayerGiftSystem.findTips();
            this.imgTips.visible = tips;
        }
    }


}
}