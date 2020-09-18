namespace zj {
// wang shen zhuo
// 宝石收藏---宝石商店--item
// 2019.05.07
export class ActivityJewelCollectionMallItem extends eui.ItemRenderer {

    private labelItemName: eui.Label;
    private imageFrame: eui.Image;
    private imageClip: eui.Image;
    private labelNum: eui.BitmapLabel;
    private imageGet: eui.Image;
    private labelChangeNum: eui.Label;
    private labelChangeCore: eui.Label;
    private buttonChange: eui.Button;
    private groupMain: eui.Group;
    private imageBg: eui.Image;

    private imgMask: eui.Image;
    private rectMaskCommon: eui.Rect;
    private info : any;
    private father : any;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityJewelCollectionMallItemSkin.exml";
        cachekeys(<string[]>UIResource["ActivityJewelCollectionMallItem"], null);
        this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_END ,this.onButtonChange , this);

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

    protected dataChanged() {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        this.info = this.data.info;
        this.father = this.data.father;
        let itemSet = PlayerItemSystem.Set(this.data.info.itemID, null, this.data.info.itemCount);
        //名称
        this.labelItemName.text = itemSet.Info["name"];
        this.imageFrame.source = cachekey(itemSet.Frame, this);
        this.imageClip.source = cachekey(itemSet.Clip, this);
        this.imageBg.source = cachekey("ui_acitivity_random_BoardExchangeAward_png", this);
        this.labelNum.text = this.data.info.itemCount;
        // 剩余次数
	    // 颜色
        let leftTimes = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.g_lastTimes , this.data.info.leftTimes , this.data.info.totalTimes);
        if(this.data.info.isDailyRefresh) {
            leftTimes = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.g_todayLastTimes , this.data.info.leftTimes , this.data.info.totalTimes);
            if(this.data.info.leftTimes == 0) {
                leftTimes = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.r_todayLastTimes , this.data.info.leftTimes , this.data.info.totalTimes); 
            }
        }else{
            if(this.data.info.leftTimes == 0) {
                leftTimes = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.r_lastTimes , this.data.info.leftTimes,this.data.info.totalTimes);
            }
        }

        this.labelChangeNum.textFlow = Util.RichText(leftTimes);
        //消耗
        this.labelChangeCore.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.con_jewel , this.data.info.consume);
        //可兑换判定
        let enabled = false;
        if(Game.PlayerMissionSystem.missionActive.jewelHave >= this.data.info.consume && this.data.info.leftTimes != 0) {
            enabled = true;
        } 
        this.buttonChange.enabled = enabled;

        if (this.isImgMask(this.data.info.itemID)) {
            this.imgMask.visible = true;
            this.imageClip.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageClip.mask = this.rectMaskCommon;
        }
    }

    // 兑换按钮
    public onButtonChange() {
        let fathers = this.father;
        let infos = this.info;
         loadUI(ActivityJewelCollectionMallExchange)
            .then((dialog: ActivityJewelCollectionMallExchange) => {
                dialog.SetFather(fathers);
                dialog.SetInfo(infos);
                dialog.show(UI.SHOW_FROM_TOP);
            });
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

}


export class ActivityJewelCollectionMallItemData {
    father: ActivityJewelCollectionMall;
    info: any;
    id: number;
}
}