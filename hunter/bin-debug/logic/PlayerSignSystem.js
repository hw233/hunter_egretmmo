var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 签到
    // lizhengqiang
    // 20190321
    var PlayerSignSystem = (function () {
        function PlayerSignSystem() {
        }
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        ///////////////////////////////////////////////////////////////////////////
        // 变量
        // private items: Array<message.SignItem> = [];  // 签到列表
        // private signInfo: message.SignInfo = null;  // 签到信息
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerSignSystem.prototype.init = function () {
            // Game.EventManager.on(GameEvent.PLAYER_SIGN_ITEMS_CHANGE, this.onSignItemChange, this);
            // Game.EventManager.on(GameEvent.PLAYER_SIGN_INFO_CHANGE, this.onSignInfohange, this);
        };
        PlayerSignSystem.prototype.uninit = function () {
            // this.items = [];
            // this.signInfo = null;
        };
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
        PlayerSignSystem.prototype.sign = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SignRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerSignSystem;
    }());
    zj.PlayerSignSystem = PlayerSignSystem;
    __reflect(PlayerSignSystem.prototype, "zj.PlayerSignSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerSignSystem.js.map