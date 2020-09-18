namespace zj {
// HelpGoldDialog(HXH_Gold)
// wang shen zhuo
// 2019/1/3
export class HelpGoldDialog extends Dialog {
    public imgSpriteIsKill:eui.Image;
    public labelTime:eui.BitmapLabel;
    public imgSpriteSearchNode:eui.Image;
    public listTableViewReward:eui.List;
    public btnSearchA:eui.Button;
    public labelNeedA:eui.Label;
    public btnSearchB:eui.Button;
    public labelNeedB:eui.Label;
    public labelHaveGemstone:eui.Label;
    public btnclose:eui.Button;
    private scrollerLog : eui.Scroller;
    private imgSpriteIconNeedA :eui.Image;
    private imageTip : eui.Image;
    private imagebg : eui.Image;

    private array : eui.ArrayCollection =new eui.ArrayCollection();

    private itemIndex1: number = 0;
    private count : number = 0;

    public savecount_1 : number = 0;
    public savecount_2 : any;
    public savecount : number = 0;

    private buyMoneyLogNum : number;

    /**探索获得的金币 */
    public strMoney : number = 0;

    /**探索的暴击率 */
    public multiple : number = 0;
    public table = [];

    public firstone : number;


    public constructor() {
        super();
        this.skinName = "resource/skins/help/GoldSkin.exml";

        this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
        this.btnSearchA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSearchA, this);
        this.btnSearchB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSearchB, this);
        this.imagebg.visible = false;
        this.table = [];
        this.SetInfo();
    }
    
    public isFullScreen(){
        return this.imagebg.visible;
    }

    private SetInfo(){
        this.SetInfoText();
        this.SetToken();
        this.SetCan();
    }

    //判断list是否为空
    private SetCan(){
        if(Game.PlayerMixUnitInfoSystem.Buy_Money_List.length == 0){
            this.imgSpriteSearchNode.visible = true;
        }else{
            this.imgSpriteSearchNode.visible = false;
        } 
    }

    public SetInfoList(isShow : boolean = false){
        this.imagebg.visible = isShow;
        let buyLength = Game.PlayerMixUnitInfoSystem.Buy_Money_List.length;
        this.buyMoneyLogNum=buyLength;
        for (let i = 0; i < buyLength; i++) {
            let data = new HelpGoldItemData();
            data.id=i;
            data.condition = false;
            data.mallitem=Game.PlayerMixUnitInfoSystem.Buy_Money_List[i];
            data.father=this;
            this.array.addItem(data);
        }
        this.listTableViewReward.dataProvider = this.array;
        this.listTableViewReward.itemRenderer = HelpGoldItem;
        
        this.slidingBottom();
        
    }
    
    //列表滑动到最底部
    private slidingBottom(){
        this.scrollerLog.viewport=this.listTableViewReward;
        this.scrollerLog.validateNow();
        if( this.scrollerLog.viewport.contentHeight >this.scrollerLog.viewport.height){
            this.scrollerLog.viewport.scrollV= this.scrollerLog.viewport.contentHeight - this.scrollerLog.viewport.height;
        }
    }

    private SetInfoText(){
        let [cost1, cost3, count3] = this.GetCost();
        let str_cost_one = Helper.StringFormat("%d", cost1);
        let str_cost_more = Helper.StringFormat("%d", cost3);

        let info = TableLicence.Table();
        let index = info[Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + PlayerVIPSystem.LowItem().buy_coin_free_time - Game.PlayerVIPSystem.vipInfo.buy_money;
        let aa = info[Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money;
        let bb = Game.PlayerVIPSystem.vipInfo.buy_money;
        if(Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < PlayerVIPSystem.LowItem().buy_coin_free_time) {
            this.imgSpriteIconNeedA.visible = false;
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Vip.Gold_num , PlayerVIPSystem.LowItem().buy_coin_free_time - Game.PlayerVIPSystem.vipInfo.buy_coin_free_time);
            this.imageTip.visible = true;
            this.labelNeedA.textFlow = Util.RichText(Helper.StringFormat("<color>r:11,g:239,b:27</color><text>%s</text>", str));
        }else{
            this.imgSpriteIconNeedA.visible = true;
            this.imageTip.visible = false;
            this.labelNeedA.textFlow = Util.RichText(Helper.StringFormat("<color>r:212,g:224,b:238</color><text>%s</text>", str_cost_one));
        }
        if(index <= 0){
            index = 0;
        }
        this.labelTime
        this.labelTime.text = index.toString();
        this.labelNeedB.text = str_cost_more;
    }

    //钻石数量
    private SetToken(){
        let token = Game.PlayerInfoSystem.Token;
        if(token > 100000){
            this.labelHaveGemstone.text =(token/10000).toFixed(1)+"万";
        }else{
            this.labelHaveGemstone.text = token.toString();
        }
        let str_token = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
    }

    public isBg() {
        this.imagebg.visible = true;
    }

    //探索按钮是否能点击
    private SetInfoLock(){
        this.btnSearchA.touchEnabled = true;
        this.btnSearchB.touchEnabled = true;
    }

    private GetCost(){
        let tbl = TableBuyMoney.Table();
        let next1 = Game.PlayerVIPSystem.vipInfo.buy_money + 1 - Game.PlayerVIPSystem.vipInfo.buy_coin_free_time;
        let next3 = Game.PlayerVIPSystem.vipInfo.buy_money + 10 - Game.PlayerVIPSystem.vipInfo.buy_coin_free_time;
        let max = Table.LengthDisorder(tbl);
        if(next1 > max){
            return [0, 0, 0]
        }
        next1= this.yuan3(next1>max,max,next1);
        next3=this.yuan3(next3>max,max,next3);
        let cost1=tbl[next1].consume;
        let cost3=Table.Add(next1,next3 - (PlayerVIPSystem.LowItem().buy_coin_free_time - Game.PlayerVIPSystem.vipInfo.buy_coin_free_time) + 1,function (i) {
             return tbl[i].consume; 
        });
        return [cost1,cost3,next3-next1+1];
    }
    
    private yuan3(condition, param1, param2){
        if(condition==true){
            return param1;
        }else{
            return param2;
        }
    }

    private ButtonClose(){
        Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
        this.close(UI.HIDE_TO_TOP);
        this.SetToken();
    }

    //探索一次
    private ButtonSearchA(){
        
        this.btnSearchA.touchEnabled = false;
        this.count = 1;
        let info = TableLicence.Table();
        let index = info[Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + PlayerVIPSystem.LowLevel().buy_coin_free_time - Game.PlayerVIPSystem.vipInfo.buy_money;
        let [cost1 , cost3 , count3] = this.GetCost();
        this.savecount_1 = 1;
        this.savecount_2 = 0;
        this.savecount = this.savecount_1;
        let str_token = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        if(index < this.count){
            toast_warning(TextsConfig.TextsConfig_Error.buy_money);
        }else{
            this.reqBuyVisit();  
            
        }
        this.btnSearchA.touchEnabled = true;
    }

    //探索10次
    private ButtonSearchB(){
        this.btnSearchB.touchEnabled = false;
        this.count = 10;
        let info = TableLicence.Table();
        let index = info[Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + PlayerVIPSystem.LowItem().buy_coin_free_time - Game.PlayerVIPSystem.vipInfo.buy_money;
        let [cost1 , cost3 , count3] = this.GetCost();
        this.savecount_1 = 0;
        this.savecount_2 = count3;
        this.savecount = this.savecount_2;
        let str_token = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        if(index <this.count){
            toast_warning(TextsConfig.TextsConfig_Error.buy_money);
        }else{
            this.reqBuyVisit();
        }
        this.btnSearchB.touchEnabled = true;
    }

    //跳转充值成功界面
    private recharge(){

    }

    private reqBuyVisit(){
        HelpGoldDialog.reqBuy(this.count).then((data: message.BuyMoneyResponse) =>{
            if(data.header.result == 0) {
                let max = Game.PlayerMixUnitInfoSystem.Buy_Money_List.length;      
                let item = Game.PlayerMixUnitInfoSystem.Buy_Money_List[max-1];
                this.slidingBottom();
                if(this.count == 1){
                    this.strMoney = item.money;
                    this.multiple = item.multiple;
                }else if(this.count == 10){
                    this.multiple = Table.Add(Game.PlayerMixUnitInfoSystem.Buy_Money_List.length - 10 + 1 , 
                    Game.PlayerMixUnitInfoSystem.Buy_Money_List.length , function(i){
                        return Game.PlayerMixUnitInfoSystem.Buy_Money_List[i-1].multiple
                    })
                    this.strMoney = Table.Add(Game.PlayerMixUnitInfoSystem.Buy_Money_List.length - 10 + 1, 
                    Game.PlayerMixUnitInfoSystem.Buy_Money_List.length , function(i){
                        return Game.PlayerMixUnitInfoSystem.Buy_Money_List[i-1].money;
                    })
                }
                if(this.count==1){
                    let data = new HelpGoldItemData();
                    data.id=this.buyMoneyLogNum;
                    data.condition = true; 
                    this.buyMoneyLogNum = this.buyMoneyLogNum+1;
                    data.mallitem=item;
                    data.father=this;
                    this.array.addItem(data);
                }
                else{
                    
                    this.SetInfoList(true);
                }
                this.slidingBottom();

                this.SetCan();
                this.SetInfoText();
                this.SetToken();
                
                loadUI(HelpGoldPop)
                    .then((dialog: HelpGoldPop) => {
                        dialog.SetInfo(this.strMoney,this.multiple,this);
                        dialog.show(UI.SHOW_FILL_OUT);
                    });
            
            }else if(data.header.result == message.EC.XG_LACK_TOKEN) {
                this.SetInfoLock();
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone , ()=>{
                    setTimeout(() => {
                        call();
                    } , 450)  ;

                    let call = ()=>{
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                    }
                
                });
            }
        });
       
    }
    

    public static reqBuy(count:number) {
        return new Promise((resolve, reject) => {
            let request = new message.BuyMoneyRequest();
            request.body.count = count;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.BuyMoneyResponse>resp;
                console.log(response);
                // if (response.header.result != 0) {
                //     reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                //     return;
                // }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false , true);
            return;
        });
    }
    
}

}