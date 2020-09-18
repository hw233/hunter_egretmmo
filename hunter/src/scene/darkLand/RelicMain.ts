namespace zj {
//RelicMain (遗迹探索)
//hexiaowei
// 2019/03/05
export class RelicMain extends Scene {

    private buttonClose:eui.Button;
    private labelToken:eui.Label;
    private labelRElicCoin:eui.Label;
    private listTableView:eui.List;
    private buttonToken :eui.Button;
    private buttonRule: eui.Button;

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    public b_open : boolean = false;
    public teachOpenIndex : number = 0;


    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicMainSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonToken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonToken, this);
        this.buttonRule.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonRule , this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateToken, this);
        this.setInfoList();
        
        
    }

    private setInfoList(){
         
        let relicTbl : {[key:string]: TableInstanceRelic} =  TableInstanceRelic.Table();
        this.listTableView.selectedIndex = 0; // 默认选中
        this.listTableView.itemRenderer = RelicMainItem;//
        this.selectedItem = new eui.ArrayCollection();
        for(const k in relicTbl){
            const v = relicTbl[k];
            let data = new RelicMainItemData();
            data.index = Number(k) + 1;
            data.item = v;
            data.father = this;
            this.selectedItem.addItem(data);
        }

        this.listTableView.dataProvider = this.selectedItem;
        this.selectedIndex = this.listTableView.selectedIndex;

        let OpenIndex = this.teachOpenIndex;
        this.updateToken();

    }
    private updateToken() {
         //鑽石
        if (Game.PlayerInfoSystem.Token > 100000) {
            this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
        } else {
            this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
        }

        //晶石
        let id = message.EResourceType.RESOURCE_RELIC_COIN;
        let str_res = PlayerItemSystem.Str_Resoure(id);
        this.labelRElicCoin.text = str_res;
    }

    private onButtonToken(){
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }


    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private itemList: Array<RelicMainItem> = [];

	private getItemList() {
		this.itemList = [];
        let relicTbl : {[key:string]: TableInstanceRelic} =  TableInstanceRelic.Table();
		for(const k in relicTbl){
            let item = this.listTableView.getElementAt(Number(k) - 1) as RelicMainItem;
            this.itemList.push(item);
        }
	}

    private onButtonRule() {
        toast_warning("暂未开启！")
    }


}

}