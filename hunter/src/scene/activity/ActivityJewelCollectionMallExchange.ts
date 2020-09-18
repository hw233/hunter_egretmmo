namespace zj {
// 宝石收藏 -- 宝石商店 -- 宝石兑换
// wangshenzhuo
// 20019/05/07
export class ActivityJewelCollectionMallExchange extends Dialog {

    public imageFrame: eui.Image;
    public imageIcon: eui.Image;
    public labelTextNum: eui.BitmapLabel;
    public labelTextName: eui.Label;
    public labelTextType: eui.Label;
    public labelTextOwn: eui.Label;
    public buttonBuy: eui.Button;
    public buttonSub: eui.Button;
    public buttonAdd: eui.Button;
    public buttonMax: eui.Button;
    public labelTextCount: eui.Label;
    public labelTextCost2: eui.Label;
    public buttonClose: eui.Button;
    public groupMain: eui.Group;

    private MIN_COUNT: number = 1;
    private MAX_COUNT: number = 100;
    private count: number = 0;
    private maxCount: number = 0;
    private info: any;

    private imgMask: eui.Image;
    private rectMaskCommon: eui.Rect;

    private father: ActivityJewelCollectionMall;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityJewelCollectionMallExchangeSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSub, this);
        this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAdd, this);
        this.buttonMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMax, this);
        this.buttonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonBuy, this);
        this.count = 1;

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    public SetInfo(info) {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        this.info = info;
        //最大可兑换数量
        this.maxCount = Math.min(Math.floor(Game.PlayerMissionSystem.missionActive.jewelHave / info.consume), info.leftTimes);

        let itemSet = PlayerItemSystem.Set(info.itemID, null, info.itemCount);
        this.imageFrame.source = cachekey(itemSet.Frame, this);
        this.imageIcon.source = cachekey(itemSet.Clip, this);
        this.labelTextNum.text = info.itemCount;
        this.labelTextName.text = itemSet.Info["name"];
        this.labelTextType.text = itemSet["TypeDes"];
        this.labelTextOwn.text = Helper.StringFormat("%s%d", TextsConfig.TextsConfig_Mall.buy_count, itemSet["Count"]);   //拥有数量
        this.SetInfoCount();

        if (this.isImgMask(info.itemID)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
    }

    public SetInfoCount() {
        this.labelTextCount.text = this.count.toString();
        this.labelTextCost2.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.con_jewel, (this.info.consume * this.count));
    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true;
        }
        return false;
    }

    //  按钮 -
    private onButtonSub() {
        this.count = this.count - 1;
        if (this.count <= 1) {
            this.count = 1;
        }
        this.SetInfoCount();
    }

    // 按钮 +
    private onButtonAdd() {
        if (this.count < this.maxCount) {
            this.count = this.count + 1;
            this.SetInfoCount();
        } else {
            return;
        }
    }

    // 按钮  最大
    private onButtonMax() {
        this.count = this.maxCount;
        this.SetInfoCount();
    }

    // 按钮  确认兑换
    private onButtonBuy() {
        if (this.count <= this.maxCount) {
            PlayerJewelSystem.MissionJewelExchangeReq(this.info.itemIndex + 1 , this.count).then((data: message.MissionJewelExchangeResponse) => {
                this.onButtonClose();
                this.father.SetInfo()
                setTimeout(() => {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(()=>{this.father.SetInfo()});
                        }).catch(reason => { })
                }, 500)
                
            })
        }
    }


    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    public SetFather(father: ActivityJewelCollectionMall) {
        this.father = father;
    }
}
}