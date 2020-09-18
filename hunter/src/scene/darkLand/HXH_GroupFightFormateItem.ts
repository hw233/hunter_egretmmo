namespace zj {
// HXH_GroupFightFormateItem
// wangshenzhuo
// 2019/03/06
export class HXH_GroupFightFormateItem extends eui.ItemRenderer {

    public listHunter:eui.List;
    public labelHelpName:eui.Label;
    public buttonUse:eui.Button;
    public buttonCancel:eui.Button;
    public imageShadow:eui.Image;

    private listHunterItem: eui.ArrayCollection;
    private listHunterIndex: number = 0;
    private bSelected : boolean;

    private dataItem : HXH_GroupFightFormateItemData;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightFormateItemSkin.exml";
        cachekeys(<string[]>UIResource["HXH_GroupFightFormateItem"], null);
        this.buttonUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonUse, this);
        this.buttonCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonUse, this);
        this.buttonCancel.visible = false;
       
    }

    protected dataChanged() {
        this.dataItem = <HXH_GroupFightFormateItemData>this.data;
        this.InitBase();
        this.SetInfoButton();
        let formate = [];
        for(let i = 0 ; i < this.data.father.generalNum ; i++){
            formate[this.data.father.generalNum - 1 - i] = this.data.info.formation.generals[i];
        }
        
        this.listHunter.itemRenderer = CommonArenaEnemyTeamItem;
        this.listHunterItem = new eui.ArrayCollection();

        for (let i = 0; i < formate.length; i++) {
            let data = new CommonArenaEnemyTeamItemData();
            data.index = i + 1;
            data.simpleInfo = formate[i];
            data.showTeam = true;
            this.listHunterItem.addItem(data);
        }

        this.listHunter.dataProvider = this.listHunterItem;
        this.listHunterIndex = this.listHunter.selectedIndex;

        this.labelHelpName.text = this.data.info.baseInfo.name;
    }

    private SetInfoButton(){
        let dataId: number = this.dataItem.info.baseInfo.id;
        let hasBeenUsed = Table.FindF(Game.PlayerWantedSystem.wantedInfo.groupBattleUsed , function(k,v){
            return v == dataId;
        })
        this.bSelected = this.dataItem.info.baseInfo.id == this.dataItem.father.bUsedInfo[1].lenght;
        let a = this.dataItem.info.baseInfo;
        this.bSelected = this.dataItem.info.baseInfo.id == this.dataItem.father.bUsedInfo[1].id;

        if(hasBeenUsed){
            // this.imageShadow.visible = true;
            this.notBeUsed(UIConfig.UIConfig_Hunter_GroupFight.haveUse[1] , false);
        }else if(this.bSelected){
            this.beUsed(UIConfig.UIConfig_Hunter_GroupFight.cancel[1]);
        }else{
            this.notBeUsed(UIConfig.UIConfig_Hunter_GroupFight.use[1] , true);
        }
    }

    private onButtonUse(){
        if(this.bSelected){
            //取消选中
            this.bSelected != this.bSelected
            this.dataItem.father.bUsedInfo[0] = null;
            this.dataItem.father.InitFriendState();
            this.dataItem.father.bUsedInfo[1] = [];
            this.dataItem.father.SetInfoFriendInfoList();
            this.dataItem.father.SetInfoFriendFormate();
        }else{
            //选中
            let useTime = Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
            let allTime = PlayerVIPSystem.Level().assist_time;
            if(useTime >= allTime){
                toast_warning(TextsConfig.TextsConfig_GroupFight.timeNotEnough2);
                return;
            }
            this.dataItem.father.bUsedInfo[0] = this.dataItem.bFriend && 1 || 2;
            this.dataItem.father.friendFormate = this.dataItem.info.formation;
            this.dataItem.father.bUsedInfo[1] = this.dataItem.info.baseInfo ;

            this.dataItem.father.SetInfoFriendInfoList()
            this.dataItem.father.SetInfoFriendFormate()
            this.dataItem.father.SetUITagAni(1)
            
        }
    }


    private InitBase(){
        this.bSelected = false;
        this.imageShadow.visible = false;
    }

    private beUsed(ui){
        Set.ButtonBackgroud(this.buttonUse , ui);
        this.buttonUse.enabled = true;
        this.buttonUse.touchEnabled = true;
    }

    private notBeUsed(ui , enable){
        Set.ButtonBackgroud(this.buttonUse , ui);
        this.buttonUse.enabled = enable;
        this.buttonUse.touchEnabled = enable; 
    }
}

//子项数据源
export class HXH_GroupFightFormateItemData {
    index : number;
    info : any;
    bFriend : any;
    father : any;
}
}