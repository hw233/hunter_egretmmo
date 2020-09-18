namespace zj {
// HelpGoldItem
// wang shen zhuo
// 2019/1/3
export class HelpGoldItem extends eui.ItemRenderer {
    private id : number;

    private skinListItem : eui.Skin;
    private groupItem : eui.Group;
    //金币数
    public labelAward:eui.Label;

    //几倍暴击
    public labelNum:eui.BitmapLabel;

    private father:HelpGoldDialog;

    private timewait : number = 0;
    private timemove : number = 0;



    public constructor() {
        super();
        this.skinName = "resource/skins/help/GoldItemSkin.exml";
        cachekeys(<string[]>UIResource["HelpGoldItem"], null);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);
    }

    protected dataChanged() {
        
        this.SetInfo( this.data.id, this.data.father);
        if(this.data.condition)
        egret.Tween.get(this.groupItem)
        .call(() => {this.data.condition = false;})
        .to({ x: -265 }, 100)
        .to({x:0 }, 300, egret.Ease.quadIn);
            
    }

    private SetInfo(id, father:HelpGoldDialog){
        this.id = id;
        this.father = father;
        this.SetInfoMoney();
    }

    private SetInfoMoney(){
        let money = Game.PlayerMixUnitInfoSystem.Buy_Money_List[this.id];
        let multiple = money.multiple;
        this.labelAward.text = Set.NumberUnit3(money.money);
        if(multiple < 3){
            this.labelNum.font = UIConfig.UIConfig_Money.nameFont[1];
            this.labelNum.text =Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1,multiple);
        }else if(multiple >= 3 && multiple <= 4){
            this.labelNum.font = UIConfig.UIConfig_Money.nameFont[2];
            this.labelNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1,multiple);
        }else if(multiple >=5 && multiple <= 7){
            this.labelNum.font = UIConfig.UIConfig_Money.nameFont[3];
            this.labelNum.text =Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1,multiple);
        }else if(multiple >= 8 && multiple <= 10){
            this.labelNum.font = UIConfig.UIConfig_Money.nameFont[4];
            this.labelNum.text =Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1,multiple);
        }else{
            this.labelNum.font = UIConfig.UIConfig_Money.nameFont[5];
            this.labelNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1,multiple);
        }
    }

    // private SetInfoMove(){
    //     let index = this.father.savecount + this.id - Game.PlayerMixUnitInfoSystem.Buy_Money_List.length;
        
    //     if(this.father.savecount == 1 &&  index >0){
    //         this.timewait = 0.15;
    //         this.timemove = 0.3;
            
    //     }
    // }

}

//子项数据源
export class HelpGoldItemData {
    id : number;
    condition : boolean;
    //数据源
    mallitem : message.BuyMoneyItem;
    //父类 //
    father: HelpGoldDialog;

}


}