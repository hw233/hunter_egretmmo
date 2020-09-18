namespace zj {
// wang shen zhuo
// Activity_RandomBoomAwardItem
// 20190411
export class Activity_RandomBoomAwardItem extends eui.ItemRenderer {

    public imageBoard:eui.Image;
    public imageIcon:eui.Image;
    public groupMain:eui.Group;
    public labelNum:eui.BitmapLabel;
    public imageTip:eui.Image;
    public groupMain1 : eui.Group;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_RandomBoomAwardItemSkin.exml";
        cachekeys(<string[]>UIResource["Activity_RandomBoomAwardItem"], null);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as Activity_RandomBoomAwardItemData).father.onChooseItemTap(true, this.data);
        }, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as Activity_RandomBoomAwardItemData).father.onChooseItemTap(false, this.data);
        }, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;
        
        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
	}
	protected dataChanged() {
        this.groupMain1.removeChildren();
        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain1);
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        if(this.data.good.goodsId < 10000){
            return;
        }
        
        let itemSet = PlayerItemSystem.Set(this.data.good.goodsId , this.data.good.showType , this.data.good.count)
        if(itemSet["Type"] == message.EGoodsType.GOODS_TYPE_GENERAL) {
            let gnritem :any =  PlayerHunterSystem.Table(this.data.good.goodsId);
            let gnr_aptitude = gnritem.aptitude;
            this.imageBoard.source = cachekey(UIConfig.UIConfig_Role.itemFrame[gnr_aptitude%10 + 1] , this) ;
            this.imageTip.source = cachekey(UIConfig.UIConfig_General.hunter_grade[gnr_aptitude] , this) ;
        }else{
            this.imageTip.visible = false;
            this.imageBoard.source = cachekey(itemSet.Frame, this);
        }
        this.imageIcon.source = cachekey(itemSet.Clip, this) ;
        this.labelNum.text = "x" + Set.NumberUnit2(this.data.good.count);

        if (this.isImgMask(this.data.good.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else{     
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
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

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }
}

export class Activity_RandomBoomAwardItemData {
    father : Activity_RandomBoomSence;
    good : any;
    index : number;
}
}