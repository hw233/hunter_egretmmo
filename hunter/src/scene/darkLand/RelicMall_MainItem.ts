namespace zj {
//RelicMall_MainItem
//hexiaowei
// 2019/03/08
export class RelicMall_MainItem extends eui.ItemRenderer {

    private buttonItem: eui.Button;
    private groupAnimate: eui.Group;
    private imgSpriteFrame: eui.Image;
    private imgSpriteIcon: eui.Image;
    private imgSpriteLogo: eui.Image;
    private labelNum111: eui.Label;
    private groupItem: eui.Group;
    private labelNum: eui.BitmapLabel;
    private groupNodeA: eui.Group;
    private imgCCSprite: eui.Image;
    private labelName: eui.Label;
    private imgCCSprite1: eui.Image;
    private imgSpriteCost: eui.Image;
    private labelCost: eui.Label;
    private groupNodeB: eui.Group;
    private imgCCSprite2: eui.Image;
    private imgCCSprite3: eui.Image;
    private imgCCSprite4: eui.Image;
    private labelNameB: eui.Label;
    private imgSpriteCostB: eui.Image;
    private labelCostB: eui.Label;
    private labelBuyNum: eui.Label;
    private imgSpriteDiscount: eui.Image;
    private labelDis: eui.Label;
    private imgSpriteShadow: eui.Image;
    private imgSpriteSoldOut: eui.Image;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    private num: number = 0;


    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicMall_MainItemSkin.exml";
        cachekeys(<string[]>UIResource["RelicMall_MainItem"], null);
        
        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = false;

        // 徽章遮罩
        this.rectMask = Util.getMaskImgBlack(73, 70);
        this.rectMask.horizontalCenter = 0;
        this.rectMask.verticalCenter = 0;
        this.groupAnimate.addChild(this.rectMask);
        this.rectMask.visible = false;
        
        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupAnimate.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {
        
        this.imgSpriteSoldOut.visible = false;
        let itemSet: any = PlayerItemSystem.Set(this.data.mallitem.goods_id, this.data.mallitem.show_type[0], this.data.mallitem.goods_count);
        if (this.data.mallitem.show_type[0] == 1) {
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
        }
        let itemCount = this.data.mallitem.goods_count[0];

        //this.imgSpriteFrame.source= UIConfig.UIConfig_Role.itemFrame[PlayerItemSystem.ItemQuality(this.data.goods_id)];
        this.imgSpriteFrame.source = cachekey(itemSet.Frame , this) ;
        this.imgSpriteLogo.source = cachekey(itemSet.Logo , this) ;
        this.imgSpriteIcon.source = cachekey(PlayerItemSystem.ItemPath(this.data.mallitem.goods_id) , this) ;

        if (this.isImgMask(this.data.mallitem.goods_id[0])) {
            this.imgMask.visible = true;
            this.imgSpriteIcon.mask = this.imgMask;
        } else if (this.isRectMask(this.data.mallitem.goods_id[0])) {
            this.rectMask.visible = true;
            this.imgSpriteIcon.mask = this.rectMask;
        }else{     
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imgSpriteIcon.mask = this.rectMaskCommon;
        }


        this.labelNum.text = itemCount;
        this.labelNameB.text = itemSet.Info.name;
        this.labelCostB.text = this.data.mallitem.original_price;
        this.labelBuyNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Mall.mall_limit, this.data.mallitem.remain);

        this.imgSpriteCost.visible = this.data.mallitem.buy_limit <= Game.PlayerInfoSystem.Level;
        let cost_path: any = PlayerItemSystem.Item(this.data.mallitem.consume_type);
        this.imgSpriteCost.source = cachekey(cost_path.icon , this) ;;
        this.imgSpriteCostB.source = cachekey(cost_path.icon , this) ;

        if (this.data.relicmallmain.getDiscount()) {
            this.setInfoDisOfLeague(this.data);
        } else {
            this.setInfoDisOfNormal(this.data);
        }

        this.setInfoRemain(this.data);

    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            //||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true; //UIConfig.UIConfig_Role.mask.soul
        }

        return false;
    }

    // 徽章遮罩
    private isRectMask(goodsId: number): boolean {
        if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
            return true;
        }

        return false;
    }

    private setInfoDisOfNormal(data: ShopMainItemData) {
        if (data.mallitem.discount_price == data.mallitem.original_price) {
            this.imgSpriteDiscount.visible = false;
            this.labelDis.visible = false;

            this.setInfoDisOfCommon(1)
        }
        else {
            this.imgSpriteDiscount.visible = true;
            this.labelDis.visible = true;
            this.setInfoDisOfCommon(1)
        }
    }

    private setInfoDisOfLeague(data: ShopMainItemData) {
       let m=Game.PlayerLeagueSystem.BaseInfo.level;
       let discount =  TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
       if (discount < 10 ){
           this.imgSpriteDiscount.visible=true;
           this.labelDis.visible=true;
           this.setInfoDisOfCommon(discount / 10);
       }
       else{
          this.imgSpriteDiscount.visible=false;
           this.labelDis.visible=false;
           this.setInfoDisOfCommon(discount / 10);
       }
       
    }

    private setInfoDisOfCommon(dis: number) {
        let discount = dis * (this.data.mallitem.discount_price / this.data.mallitem.original_price)
        let str_dis = Helper.StringFormat("%s%s", Helper.MallDiscount(discount), TextsConfig.TextsConfig_Mall.dis);
        this.labelDis.text = str_dis;

        if (this.data.mallitem.buy_limit > Game.PlayerInfoSystem.Level) {
            this.labelCost.text = Helper.StringFormat(TextsConfig.TextsConfig_Mall.buy_limit, this.data.mallitem.buy_limit);
            this.labelCostB.text = Helper.StringFormat(TextsConfig.TextsConfig_Mall.buy_limit, this.data.mallitem.buy_limit);
            this.labelCost.x = this.labelCost.x - 35;
            this.labelCostB.x = this.labelCostB.x - 35;

        }
        else {
            let cost_price = this.data.mallitem.original_price * discount;
            let str_price = Helper.StringFormat("%d", cost_price);
            let m = PlayerItemSystem.Resource(this.data.mallitem.consume_type);
            let enough = PlayerItemSystem.Resource(this.data.mallitem.consume_type) >= cost_price
            this.labelCost.text = str_price;
            this.labelCostB.text = str_price;
            if (!enough) {
                this.labelCost.textColor = ConstantConfig_Common.Color.red;
                this.labelCostB.textColor = ConstantConfig_Common.Color.red;
            }else{
                this.labelCost.textColor =Helper.RGBToHex("r:88,g:40,b:0");;
                this.labelCostB.textColor = Helper.RGBToHex("r:88,g:40,b:0");;
            }
        }
    }

    private setInfoRemain(data: RelicMall_MainItemData) {

        if (data.mallitem.buy_limit > Game.PlayerInfoSystem.Level) {
            this.imgSpriteShadow.visible = true;
            this.groupNodeA.visible = true;
            this.groupNodeB.visible = false;
        }

        else if(data.relicmallmain.getLimit()) {

            this.groupNodeA.visible = true;
            this.groupNodeB.visible = false;
            this.imgSpriteShadow.visible =  false;
            this.imgSpriteSoldOut.visible = false;
            
        }else{
            let remain = data.relicmallmain.getMallRemain(data.mallitem.mall_id);
            this.groupNodeA.visible = false;
            this.groupNodeB.visible = true;

            this.labelBuyNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Mall.mall_limit, remain);
            this.imgSpriteShadow.visible = remain == 0;
            this.imgSpriteSoldOut.visible = remain == 0;
            this.num = remain;
        }

    }



}

//子项数据源
export class RelicMall_MainItemData {
    //数据源
    mallitem: message.MallItem;

    //父类 //
    relicmallmain: RelicMall_Main;

}


}