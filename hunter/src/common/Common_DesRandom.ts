namespace zj {
// Common_DesRandom
// hexiaowei 
// 2019/02/20

export class Common_DesRandom extends UI {

    private imageFrame : eui.Image;
    private imageIcon : eui.Image;
    private labelName : eui.Label;
    private labelType : eui.Label;
    private groupStar : eui.Group;
    private groupItem : eui.Group;

    private imgMask: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_DesRandomSkin.exml";

        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupItem.addChild(this.imgMask);
        this.imgMask.visible = false;
    }

    public setInfo(goodsId, count) {
        let itemSet :any = PlayerItemSystem.Set(goodsId,null,count);
        
        this.imageFrame.source = cachekey(itemSet.Frame , this) ;
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        let info : any = itemSet.Info;
        this.labelName.text = info.name;
        this.labelType.text = info.des;

         let mnb :any = PlayerItemSystem.Item(goodsId)
        if (mnb.client_star != null){
             Helper.NodeStarByAlignLeft(this.groupStar,mnb.client_star,6, 1.8,false,UIConfig.UIConfig_Role.heroAwakenStar[1]);
        }

        if (this.isRectMask(goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
        }
        
    }

     //根据奖励类型判断是否添加遮罩
    private isRectMask(goodsId: number): boolean {

        let m = PlayerItemSystem.ItemType(goodsId);
        if ( goodsId >=203001 && goodsId <=203006 ) {
            return true;
        }

        return false;
    }
}

}