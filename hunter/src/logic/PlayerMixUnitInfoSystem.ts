namespace zj {
// 数据杂项系统
// hexiaowei 创建于2019.01.03

export class PlayerMixUnitInfoSystem {
    ///////////////////////////////////////////////////////////////////////////
    // 静态函数


    ///////////////////////////////////////////////////////////////////////////
    // 私有变量
    private _mixunitinfo: message.RoleMixUnit = null; // 角色基本数据

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        Game.EventManager.on(GameEvent.PLAYER_MIX_UNIT_INFO_CHANGE, this.onMixUnitInfoChange, this);
    }

    public uninit() {
        this._mixunitinfo = null;
    }

    private onMixUnitInfoChange(ev: egret.Event) {
        this._mixunitinfo = <message.RoleMixUnit>ev.data;
        if (!this._mixunitinfo) return;
        this.setProcesses();
    }
    private setProcesses() {
        if (!this._mixunitinfo || !this._mixunitinfo.process) return;
        let time: number = Math.floor(egret.getTimer() / 1000);
        this._mixunitinfo.process.leftTime = this._mixunitinfo.process.leftTime + time;
    }

    // 购买游戏币记录
    public get Buy_Money_List(): Array<message.BuyMoneyItem> {
        return this._mixunitinfo.buy_money_list;
    }

    //数据杂项
    public get mixunitinfo(): message.RoleMixUnit {
        return this._mixunitinfo;
    }
    
    public loginReward(index: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.LoginRewardRequest();
            request.body.index = index;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.LoginRewardResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public buySevenNewGift(index: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.BuySevenNewGiftRequest();
            request.body.index = index;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.BuySevenNewGiftResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

}
}