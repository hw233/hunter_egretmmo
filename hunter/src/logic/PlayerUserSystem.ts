namespace zj {
/**
 * @author xingliwie
 * 
 * @date 2019-5-17
 * 
 * @class 玩家系统设置
 */
export class PlayerUserSystem {

    public init() {
        // this.Initsq();// 初始化
        Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.setInfo, this);
    }

    public setInfo() {

        let msg = Controller.getGlobalStorageItem("system");
        if (msg == null || msg == undefined || msg == "") {
            this.setSystemInfo(this.info);
        }
        try {
            this.info = this.getSystemInfo();
        } catch (error) {
            this.setSystemInfo(this.info);
        }

    }

    public info = { particulars: true, physical: true };

    public setSystemInfo(info) {
        let msg = JSON.stringify(info);
        Controller.setGlobalStorageItem("system", msg);
    }

    public getSystemInfo() {
        let msg = Controller.getGlobalStorageItem("system");
        if (!msg || msg == "") return {};
        let map = JSON.parse(msg);
        return map;
    }

    /**设置玩家游戏音乐设置 */
    public Music() {
        if (Game.SoundManager.isMusicEnabled()) {
            Game.SoundManager.stopMusic();
            Game.SoundManager.musicDisable();
        } else {
            Game.SoundManager.musicEnable();
            Game.SoundManager.playMusic("city_mp3", 0);
        }
    }
    public Effect() {
        if (Game.SoundManager.isEffectEnabled()) {
            Game.SoundManager.effectDisable();
        } else {
            Game.SoundManager.effectEnable();
        }
    }

    /**是否允许他人查看猎人详情 */
    public modifyRoleNameRespBody(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SetAgreeDetailRequest();
            request.body.agree_detail = Game.PlayerInfoSystem.BaseInfo.agree_detail;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SetAgreeDetailResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false);
        });
    }

    /**体力回满提醒 */
    public SaveClientOperationReqBody(index: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SaveClientOperationRequest();
            request.body.clientOperation = index;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SaveClientOperationResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                PushNotice.RefreshNotice(index); // 刷新通知
                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false);
        });
    }
}
}