namespace zj {
//RelicAwardMainItem
//hexiaowei
// 2019/03/06
export class RelicAwardMainItem extends eui.ItemRenderer {
    
    private groupAnimate : eui.Group;
    private imageFrame: eui.Image;
    private imageIcon: eui.Image;
    private labelNum: eui.BitmapLabel;
    private imageStage: eui.Image;
    private imgMask: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicAwardMainItemSkin.exml";
        cachekeys(<string[]>UIResource["RelicAwardMainItem"], null);
        this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as RelicAwardMainItemData).father.onDropInfoItemTap(true, this.data);
        }, this);
        this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as RelicAwardMainItemData).father.onDropInfoItemTap(false, this.data);
        }, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.imgMask.scaleX = 0.6;
        this.imgMask.scaleY = 0.6;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = false;
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {
        let data : RelicAwardMainItemData = this.data;
        if(data.bool){
            let pathurl = "ui_darkland_relic_WordsStage"+ (data.index + 1) +"_png";
            this.imageStage.source = cachekey(pathurl , this) ;
        }

        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
        this.imageStage.visible = data.bool;
        
        let itemSet = PlayerItemSystem.Set(data.tableAward.goodsId,data.tableAward.showType,data.tableAward.count);
        //this.imageIcon.visible = false;
        this.imageFrame.source = cachekey(itemSet.Frame , this) ;
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;

        this.labelNum.text = "x" + data.tableAward.count;
        this.labelNum.visible = data.tableAward.count != 0;

        if (this.isImgMask(this.data.tableAward.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.imageIcon.mask = null;
        }

    }

     // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            //||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1
            || goodsId == 202009 || goodsId == 202008 || goodsId == 202010) {
            return true; //UIConfig.UIConfig_Role.mask.soul
        }

        return false;
    }

}


//子项数据源
export class RelicAwardMainItemData {
    index : number;
    //数据源
    tableAward: message.GoodsInfo;
    
    bool : boolean;
    father : any;
    listtype : number;

}


}