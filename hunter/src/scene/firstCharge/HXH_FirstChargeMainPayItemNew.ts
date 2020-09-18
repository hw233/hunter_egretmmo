namespace zj {
//HXH_FirstChargeMainPayItemNew
//wangshenzhuo
// 2019/03/30
export class HXH_FirstChargeMainPayItemNew extends eui.ItemRenderer {

    public buttonPay:eui.Button;
    public imagePayNum:eui.Image;
    public imageGet:eui.Image;
    public imagePay:eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainPayItemNewSkin.exml";
        cachekeys(<string[]>UIResource["HXH_FirstChargeMainPayItemNew"], null);
    }

    protected dataChanged() {
        if (this.selected) {
            this.buttonPay.touchEnabled = false;
            this.imagePay.visible = true;
        }
        else {
            this.buttonPay.touchEnabled = true;
            this.imagePay.visible = false;
        }
        let a = this.data.index + 1;
        let bCharge = Game.PlayerInfoSystem.BaseInfo.chargeToken < this.data.father.first_data[this.data.index].token;
        let bAward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward , function(k,v){
            return v == a;
        })
        let bShowAward = !bCharge && bAward;
        //是否领取
        this.imageGet.visible = bShowAward;
        this.imagePayNum.source = cachekey(this.data.info.button_pic , this) ;
    }
}

//子项数据源
export class HXH_FirstChargeMainPayItemNewData {
    index : number;
    father : HXH_FirstChargeMainNew;
    info : any;
}
}