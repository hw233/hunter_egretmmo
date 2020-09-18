namespace zj {
//  娃娃机 -- 兑换
//  wangshenzhuo
//  2019/04/12
export class Activity_RandomLiveExchange extends Dialog {

    public imageFrame:eui.Image;
    public imageIcon:eui.Image;
    public labelTextNum:eui.BitmapLabel;
    public labelTextName:eui.Label;
    public labelTextType:eui.Label;
    public labelTextOwn:eui.Label;
    public buttonBuy:eui.Button;
    public buttonSub:eui.Button;
    public buttonAdd:eui.Button;
    public buttonMax:eui.Button;
    public labelCount:eui.Label;
    public labelTextCost2:eui.Label;
    public buttonClose:eui.Button;
    public groupMain:eui.Group;

    public MIN_COUNT = 1 ;
    public MAX_COUNT = 100 ;

    public father : Activity_RandomLiveItem;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    public count : number ;
    public maxCount : number;
    public save_cost : number;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_RandomLiveExchangeSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonClose , this);
        this.buttonSub.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonSub , this);
        this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonAdd , this);
        this.buttonMax.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonMax , this);
        this.buttonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonBuy , this);

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

    public SetInfo(father : Activity_RandomLiveItem) {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        this.father = father;
        this.count = 1;
        let DataIndex : any = this.father.data.index - 1;
        let buyTimes :any = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone , function(k , v) {
            return v.key == DataIndex;
        })
        this.maxCount = buyTimes[0] == null && this.father.exchange_times || this.father.exchange_times - buyTimes[0].value;
        this.SetInfoMall();
        let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost;
        this.maxCount = num >= this.maxCount && this.maxCount || Math.floor(num);

        if (this.isImgMask(this.father.data.goods.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else{     
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
    }

    private SetInfoMall() {
        let id = this.father.data.goods.goodsId;
        let show = this.father.data.goods.showType;
        let count = this.father.data.goods.count;
        let itemSet = PlayerItemSystem.Set(id , show , count);
        let own_count = PlayerItemSystem.Count(id);
        let str_count = Helper.StringFormat("%s%d" , TextsConfig.TextsConfig_Mall.buy_count , own_count);
        let str_cost = this.father.score;
        this.save_cost = str_cost;

        this.imageFrame.source = cachekey(itemSet.Frame , this) ;
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        this.labelTextName.text = itemSet.Info["name"];
        this.labelTextType.text = itemSet["TypeDes"];
        this.labelTextNum.text = count;
        this.labelTextOwn.text = str_count;
        this.labelTextCost2.text = Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.jifen , str_cost);
        this.labelCount.text = this.count.toString();
    }

    private SetInfoCount() {
        this.labelCount.text = this.count.toString();
        this.labelTextCost2.text = Helper.StringFormat(TextsConfig.TextsConfig_Egg_Random.jifen , this.save_cost * this.count);
    }

    //  按钮 -
    private onButtonSub() {
        this.count = this.count - 1;
        if(this.count < this.MIN_COUNT) {
            this.count = this.MIN_COUNT;
        }
        this.SetInfoCount();
    }

    // 按钮 +
    private onButtonAdd() {
        let maxNum : number = 0;
        //当积分可换次数
        let num =  Math.floor(Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost);
        //当前剩余次数
        if(num > this.father.exchange_times2) {
            maxNum = this.father.exchange_times2;
        }else{
            maxNum = num;
        }
        this.count = this.count + 1;
        if(this.count > maxNum) {
            this.count = maxNum;
        }
        if(this.count <= 1) {
            this.count = 1;
        }
        this.SetInfoCount();
    }

    // 按钮 最大
    private onButtonMax() {
        //当积分可换次数
        let num =  Math.floor(Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost);
        //当前剩余次数
        if(num > this.father.exchange_times2) {
            this.count = this.father.exchange_times2;
        }else{
            this.count = num;
        }

        if(this.count <= 1) {
            this.count = 1;
        }
        // this.count = num >= this.maxCount && this.maxCount || Math.floor(num);
        // this.count = this.count > 0 && this.count || 1;
        this.SetInfoCount();
    }

    //确认兑换 按钮
    private onButtonBuy() {
        if(this.GetExchange()) {
            this.onButtonClose();
            setTimeout(() => {
                this.father.ExchangeReq(this.count);
            } , 350);
        }
    }

    private GetExchange() {
        let bBuy = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore >= this.save_cost * this.count;
        if(!bBuy) {
            toast_warning(TextsConfig.TextsConfig_Egg_Random.not_enough);
        }
        return bBuy;
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
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
}