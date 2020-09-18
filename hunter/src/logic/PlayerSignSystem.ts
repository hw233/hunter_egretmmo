namespace zj {
    // 签到
    // lizhengqiang
    // 20190321

    export class PlayerSignSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        ///////////////////////////////////////////////////////////////////////////
        // 变量
        // private items: Array<message.SignItem> = [];  // 签到列表
        // private signInfo: message.SignInfo = null;  // 签到信息

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            // Game.EventManager.on(GameEvent.PLAYER_SIGN_ITEMS_CHANGE, this.onSignItemChange, this);
            // Game.EventManager.on(GameEvent.PLAYER_SIGN_INFO_CHANGE, this.onSignInfohange, this);
        }

        public uninit() {
            // this.items = [];
            // this.signInfo = null;
        }

        // private onSignItemChange(ev: egret.Event) {
        //     // this.items = <Array<message.SignItem>>ev.data;
        // }

        // private onSignInfohange(ev: egret.Event) {
        //     // this.signInfo = <message.SignInfo>ev.data;
        // }

        // public get SignItemInfo() {
        //     return null // this.items;
        // }

        // public get SignInfo() {
        //     return null// this.signInfo;
        // }

        // 签到
        public sign(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SignRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SignResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

    }
}