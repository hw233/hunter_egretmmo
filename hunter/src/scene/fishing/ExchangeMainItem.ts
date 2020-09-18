namespace zj {
// wang shen zhuo
// HXH_ExchangeMainItem
// 2019.05.21
export class ExchangeMainItem extends eui.ItemRenderer {
    private groupCache: eui.Group;
    public imageBg:eui.Image;
    public imageBoard:eui.Image;
    public imageIcon:eui.Image;
    public imageCD:eui.Image;
    public imageTips:eui.Image;
    public labelName:eui.Label;
    public labelTimeTip:eui.Label;
    public labelTime:eui.Label;
    public labelBur:eui.Label;
    public groupMain:eui.Group;
    public groupAll: eui.Group;

    private index : number ;
    private info :any;
    private father : ExchangeMainSence;

    private imgMask: eui.Image;
    private rectMaskCommon: eui.Image;
  
    public constructor() {
		super();
		this.skinName = "resource/skins/fishing/ExchangeMainItemSkin.exml";
        cachekeys(<string[]>UIResource["ExchangeMainItem"], null);
        this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

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
        closeCache(this.groupCache);
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;

        if (this.selected) {
            this.imageBg.visible = true;
        }else{
            this.imageBg.visible = false;
        }

        this.father = this.data.father;
        this.index = this.data.index;
        this.info = this.data.good;
        this.SetInfoItem();
        setCache(this.groupCache);
    }

    private SetInfoItem() {
        if(this.info.reward_goods == 0 || this.info.reward_goods == null) {
            return;
        }
        let itemSet = PlayerItemSystem.Set(this.info.reward_goods , this.info.showType , this.info.reward_count);
        let need = this.info.exchange_goods.length;
        let has = PlayerConvertSystem.NumCanConvert(this.info.id);

        this.imageBoard.source = cachekey(itemSet.Frame , this) ;
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        this.labelName.text = itemSet.Info["name"];

        let infoid = this.info.id;
        let converts = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls , function(k ,v) {
            return infoid == v.key;
        })
        let title = "";
        let str_gap = "";
        let num = 0;
        if(converts[0] != null){
            num = converts[0].value;    
        }
        let can_convert_times = converts[0] == null && this.info.exchange_times || (this.info.exchange_times - num)
        // let can_convert_times = 5 ;
        if(this.info.is_only == 1) {
            title = TextsConfig.TextsConfig_Convert.convert_gap[1];
            str_gap = TextsConfig.TextsConfig_Convert.once_convert;
        }else if(this.info.daily_refresh == 1) {
            title = TextsConfig.TextsConfig_Convert.convert_gap[2];
            if(can_convert_times <= 0) {
                str_gap = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light , can_convert_times + "<text>/" + this.info.exchange_times + "</text>"); 
            }else{
                str_gap = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr , can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
            }
        }else if(this.info.week_refresh == 1) {
            title = TextsConfig.TextsConfig_Convert.convert_gap[3];
            if(can_convert_times <= 0) {
                str_gap = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light , can_convert_times +  "<text>/" + this.info.exchange_times + "</text>"); 
            }else{
                str_gap = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr , can_convert_times + "<text>/" + this.info.exchange_times + "</text>");
            }
        }
        this.labelTime.textFlow = Util.RichText(str_gap);
        this.labelTimeTip.text = title;

        if(has >= need) {
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr , has + "<text>/" + need + "</text>");
            this.labelBur.textFlow = Util.RichText(str) ; 
        }else{
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light , has + "<text>/" + need + "</text>");
            this.labelBur.textFlow = Util.RichText(str) ; 
        }
        let info_id = this.info.id;
        let [_v , _k] = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls , function(key , value) {
            return value.key == info_id;
        })
        let can_convert = _v == null && true || (_v.value < this.info.exchange_times);
        this.imageCD.visible = !can_convert;

        let tips = PlayerConvertSystem.CanConvert(this.info.id);
        this.imageTips.visible = tips;

        if (this.isImgMask(this.info.reward_goods)) {
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

    private onShowGoodProperty(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

export class ExchangeMainItemData {
    father : ExchangeMainSence;
    good : any;
    index : number;
}
}