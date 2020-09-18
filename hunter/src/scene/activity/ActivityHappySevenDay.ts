namespace zj {
// 
// lizhengqiang
// 20190413
export class ActivityHappySevenDay extends UI {
    private groupReward: eui.Group;
    private scrollerViewDay: eui.Scroller;
    private lstViewDay: eui.List;
    private groupGift: eui.Group;
    private scrollerViewGift: eui.Scroller;
    private lstViewGift: eui.List;
    private btnReward: eui.Button;
    private btnGift: eui.Button;
    private imgTip: eui.Image;
    private imgTip1: eui.Image;

    private day: number = null;
    private index: number = null;

    private TBL: number[] = [1, 2, 3, 4, 5, 6, 7];

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityHappySevenDaySkin.exml";

        this.btnReward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            this.btnReward.currentState = "down";
            this.btnReward.scaleX = 1.2;
            this.btnReward.scaleY = 1.2;
        }, this);
        this.btnReward.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.btnReward.currentState = "down";
            this.btnReward.scaleX = 1;
            this.btnReward.scaleY = 1;
            this.onBtnReward();
        }, this);
        this.btnReward.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
            this.btnReward.currentState = "up";
            this.btnReward.scaleX = 1;
            this.btnReward.scaleY = 1;
        }, this);

        this.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            this.btnGift.currentState = "down";
            this.btnGift.scaleX = 1.2;
            this.btnGift.scaleY = 1.2;
        }, this);
        this.btnGift.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            this.btnGift.currentState = "down";
            this.btnGift.scaleX = 1;
            this.btnGift.scaleY = 1;
            this.onBtnGift();
        }, this);
        this.btnGift.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
            this.btnGift.currentState = "up";
            this.btnGift.scaleX = 1;
            this.btnGift.scaleY = 1;
        }, this);

        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.setInfoRefresh, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.setInfoRefresh, this);
        }, null);
    }

    public setInfo() {
        this.day = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
        let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (k, v) {
            return v === true;
        });

        if (!bReward || Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven.length >= Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length) {
            this.groupReward.visible = true;
            this.groupGift.visible = false;
            this.setInfoItem();
            this.index = 1;
        } else {
            this.setInfoGiftItem();
            this.groupReward.visible = false;
            this.groupGift.visible = true;
            this.index = 2;
        }

        this.setButtonState();
        this.setInfoTips();
        this.setInfoTipReward();
    }

    public setInfoReward() {
        this.setInfoItem();
    }

    private setInfoRefresh() {
        this.day = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
        if (this.index == 1) {
            this.setInfoItem();
            this.setInfoTipReward();
            this.setInfoTips();
        } else {
            this.setInfoGiftItem();
            this.setInfoTipReward();
            this.setInfoTips();
        }
    }

    private onBtnReward() {
        this.groupReward.visible = true;
        this.groupGift.visible = false;
        this.setInfoItem();
        this.index = 1;
        this.setButtonState();
    }

    private onBtnGift() {
        this.groupReward.visible = false;
        this.groupGift.visible = true;
        this.setInfoGiftItem();
        this.index = 2;
        this.setButtonState();
    }

    private setButtonState() {
        this.btnReward.enabled = (this.index != 1);
        this.btnGift.enabled = (this.index != 2);

        if (this.index == 1) {
            this.btnReward.currentState = "down";
            this.btnGift.currentState = "up";
        }
        if (this.index == 2) {
            this.btnReward.currentState = "up";
            this.btnGift.currentState = "down";
        }
    }

    public setInfoTips() {
        this.imgTip.visible = (Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven.length < this.day);
    }

    public setInfoTipReward() {
        let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (k, v) {
            return v == 0;
        });
        this.imgTip1.visible = bReward;
    }

    private setInfoItem() {
        let info = TableContinueLogin.Table(); // StringConfig_Table.continue_login

        let arrCollection = new eui.ArrayCollection();
        for (let k in info) {
            arrCollection.addItem({ day: Number(k), info: info[k], father: this });
        }
        this.lstViewDay.dataProvider = arrCollection;
        this.lstViewDay.itemRenderer = ActivityHappySevenDayItem;

        let list = [];
        let min: number = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
        let tmp = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward;
        for (const k in tmp) {
            if (tmp[k] == 0) {
                list.push(k);
            }
        }

        for (const v of list) {
            if (v < min) {
                min = Number(v);
            }
        }

        this.scrollerViewDay.viewport = this.lstViewDay;
        this.scrollerViewDay.validateNow();
        if (this.scrollerViewDay.viewport.contentHeight > this.scrollerViewDay.viewport.height) {
            let moveDistance: number = 0;
            if (this.scrollerViewDay.viewport.contentHeight - min * 112 > this.scrollerViewDay.viewport.height) {
                moveDistance = min * 112;
            } else {
                moveDistance = this.scrollerViewDay.viewport.contentHeight - this.scrollerViewDay.viewport.height;
            }
            this.scrollerViewDay.viewport.scrollV = moveDistance;
        }
    }

    private setInfoGiftItem() {
        let info = TableNewgiftSeven.Table();  // StringConfig_Table.newGift_seven

        let arrCollection = new eui.ArrayCollection();
        for (let k in info) {
            arrCollection.addItem({ index: Number(k), info: info[k], father: this, day: this.day });
        }
        this.lstViewGift.dataProvider = arrCollection;
        this.lstViewGift.itemRenderer = ActivitySevenGiftItem;

        let min: number = 8;
        let list = [];
        for (const v of this.TBL) {
            let gift = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven, function (kk, vv) {
                return vv == v;
            });

            if (!gift) {
                list.push(v);
            }
        }

        for (const v of list) {
            if (v < min) {
                min = Number(v);
            }
        }

        min = min - 1 < 0 ? 0 : min - 1;

        this.scrollerViewGift.viewport = this.lstViewGift;
        this.scrollerViewGift.validateNow();
        if (this.scrollerViewGift.viewport.contentHeight > this.scrollerViewGift.viewport.height) {
            let moveDistance: number = 0;
            if (this.scrollerViewGift.viewport.contentHeight - min * 112 > this.scrollerViewGift.viewport.height) {
                moveDistance = min * 112;
            } else {
                moveDistance = this.scrollerViewGift.viewport.contentHeight - this.scrollerViewGift.viewport.height;
            }
            this.scrollerViewGift.viewport.scrollV = moveDistance;
        }
    }



}
}