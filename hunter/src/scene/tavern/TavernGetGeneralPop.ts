namespace zj {
//TavernGetGeneralPop
//hexiaowei
//2018/11/15
export class TavernGetGeneralPop extends UI {
    private image1: eui.Image;
    private image2: eui.Image;
    private labelHunExplain: eui.Label;
    public group1: eui.Group;

    private taverninfo : message.GoodsInfo;
    private tavern: TavernScene;

    public constructor() {
        super();
        this.skinName = "resource/skins/tavern/TavernGetGeneralPopSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
        this.group1.alpha = 0;
        this.info();
    }

    public init(tavern) {
        this.tavern = tavern;
    }

    private info() {

    }

    public onGroupParent() {
        this.close();
        //this.tavern.removeChild(this);
    }

    public setInof(info: message.GoodsInfo) {
        this.taverninfo = info;
        let goodsId = info.goodsId;
        let type = PlayerHunterSystem.Table(goodsId).type;
        this.image1.source = cachekey(UIConfig.UIConfig_Hunter_Pokedex.dpt[type] , this) ;
        // let des = PlayerTalentSystem.Des(PlayerHunterSystem.Table(goodsId).pokedex_attri, 1);
        this.labelHunExplain.text = "";//TextsConfig.TextsConfig_Hunter.hunter_type_Pokedex[type - 1] + des;
        /*
        egret.Tween.get(this.group1)
              .to({x:139,y:370}, 2000, egret.Ease.backOut)
              .to({x:139,y:350}, 500, egret.Ease.backOut)
              .call(()=>{this._tavern.removeChild(this);});
        */
    }

}

}