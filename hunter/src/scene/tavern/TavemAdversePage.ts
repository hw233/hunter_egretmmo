namespace zj {
//Tavern Page
//hexiaowei
//2018/11/09
export class TavemAdversePage extends Dialog {
    private btnClose: eui.Button;
    private labelTime : eui.Label;
    private labelGiftNum : eui.Label;
    
    private tavern : TavernScene;
    private beerGiftInfo : Object;
    private beerTblInfo : TableNewgiftItem;

    public constructor() {
        super();
        this.skinName = "resource/skins/tavern/TavemAdversePageSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.updateTime();
        this.beerTblInfo=PlayerGiftSystem.Instance_item(100202)
        this.beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
            return v.gift_index == 100202
        })
        this.setInfoGiftNum();

        Tips.tips_oneday_set(Tips.SAVE.TAVERN_ACTIVITY , true);
    }

    public init(tavern:TavernScene) {
        this.tavern=tavern;
    }
    
    //活动剩余时间
    private updateTime(){
        /*
        let beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfo, function (k, v) {
                        return v.gift_index == 100202
                    });
            let date = Game.Controller.serverNow();
            let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            let serverTime: number = humanDate.getTime() / 1000 - 8 * 60 * 60;
            let beerTblInfo = PlayerGiftSystem.Instance_item(100202)
            let timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
        */
       let timenew = Game.PlayerProgressesSystem.progressMap[1013].leftTime - (7 * 86400 - CommonConfig.activity_lottery_survival_time);
       if(timenew <=0){
           timenew = 0;
       }
       let unixTimestamp = this.timeShow(timenew);
       this.labelTime.textFlow=Util.RichText(unixTimestamp);
    }
    
    //时间转为天、时、分
    private timeShow(ms: number) {     
        let str = ""
        let day = Math.floor(ms / 86400)
        let hour = Math.floor((ms % 86400) / 3600)
        let min = Math.floor(((ms % 86400) % 3600) / 60)
        if (day == 0){
            if (hour == 0){ 
                if (min == 0){
                    str = TextsConfig.TextsConfig_Convert.upToStock[4]
                }
                else{
                    str = Helper.StringFormat( TextsConfig.TextsConfig_Convert.upToStock[3],min ); 
                }
            }
            else{
                str = Helper.StringFormat( TextsConfig.TextsConfig_Convert.upToStock[2],hour,min );
            }
        }
        else{
            str = Helper.StringFormat( TextsConfig.TextsConfig_Convert.upToStock[1], day, hour, min ) 
        }
        return str
    }
    
    //剩余可购买礼包的数量
    private setInfoGiftNum(){
        let str = ""
        if (this.beerGiftInfo[0] != null) {
            let time1 = this.beerTblInfo.buy_times - this.beerGiftInfo[0].buy_times
            let time2 = this.beerTblInfo.buy_times        
            if ( time1 <= 0 ) {
                str = Helper.StringFormat( TextsConfig.TextsConfig_Activity.beerGiftLast,255,38,0,time1,time2 )
            }
            else{
                str = Helper.StringFormat( TextsConfig.TextsConfig_Activity.beerGiftLast,60,255,0,time1,time2 )
            }
        }  
        else{
            let time1 = 0
            let time2 = this.beerTblInfo.buy_times   
            str = Helper.StringFormat( TextsConfig.TextsConfig_Activity.beerGiftLast,255,38,0,time1,time2 )
        }
        this.labelGiftNum.textFlow=Util.RichText(str);
    }

    private onButtonClose() {
        this.close(UI.HIDE_TRAIL_OFF);
        //this.tavern.removeChild(this);
    }
}

}