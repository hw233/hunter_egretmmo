namespace zj {
//WantedSecondChooseItem
//hexiaowei
// 2019/02/14
export class WantedSecondChooseItem extends eui.ItemRenderer {
    
    private groupMain :eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelTextNum: eui.BitmapLabel;
    private imgLogo: eui.Image;
    private groupStar :eui.Group;
    private isFirst : boolean = true;
    
    private imgMask: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/meteorstreet/WantedSecondChooseItemSkin.exml";
        cachekeys(<string[]>UIResource["WantedSecondChooseItem"], null);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as WantedSecondChooseItemData).father.onChooseItemTap(true, this.data);
        }, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as WantedSecondChooseItemData).father.onChooseItemTap(false, this.data);
        }, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.groupMain);
        }, null);

        //遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.scaleX = 0.8;
        this.imgMask.scaleY = 0.8;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

    }

    protected dataChanged() {
        closeCache(this.groupMain);
        //this.imgSpriteHunterBoard.source=this.data;
        let itemSet = PlayerItemSystem.Set(this.data.tableWanted.goodsId,0,this.data.tableWanted.count);
        this.imgFrame.source = cachekey(itemSet.Frame , this) ;
        this.labelTextNum.visible = true;
        
        if(this.data.tableWanted.count == 0){
            this.labelTextNum.visible = false;
        }
        this.imgIcon.source = cachekey(itemSet.Clip , this) ;
        //this.imgLogo.source = itemSet.Logo;
        let mnb :any = PlayerItemSystem.Item(this.data.tableWanted.goodsId)
        if (mnb.client_star != null){
             Helper.NodeStarByAlignLeft(this.groupStar,mnb.client_star,6, 1.2,false,UIConfig.UIConfig_Role.heroAwakenStar[1]);
        }
        let itemInfo :any = itemSet.Info;
        if(itemInfo.is_piece == 1){
            if (this.isRectMask(this.data.tableWanted.goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }else{
                this.imgMask.visible = false;
                this.imgIcon.mask = null;
            }
        }
        if(10000 <= this.data.tableWanted.count && this.data.tableWanted.count <=  99999){
               this.labelTextNum.text = this.data.tableWanted.count;
        }else{
               this.labelTextNum.text = ("x" +  Set.NumberUnit2(this.data.tableWanted.count) );
        }
        //this.labelTextNum.text = "x" + this.data.tableWanted.count;

        if (this.isFirst) {
            egret.Tween.get(this.groupMain)
                .wait(this.data.index * 100)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 150)
                .to({ scaleX: 0.95, scaleY: 0.95 }, 150)
                .to({ scaleX: 1, scaleY: 1 }, 150)
                .call(() => {
                    this.isFirst = false;
                });
        }
        setCache(this.groupMain);
    }

    private isRectMask(goodsId: number): boolean {
        if ( PlayerItemSystem.ItemType(goodsId) == 20 ) {
            return true;
        }

        return false;
    }
    



}

//子项数据源
export class WantedSecondChooseItemData {
    index : number;
    //数据源
    tableWanted : message.GoodsInfo;

    father : WantedSecondMeteorstanceScene;

}

}