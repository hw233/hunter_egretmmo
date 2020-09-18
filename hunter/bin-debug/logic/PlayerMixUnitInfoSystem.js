var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 数据杂项系统
    // hexiaowei 创建于2019.01.03
    var PlayerMixUnitInfoSystem = (function () {
        function PlayerMixUnitInfoSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this._mixunitinfo = null; // 角色基本数据
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerMixUnitInfoSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MIX_UNIT_INFO_CHANGE, this.onMixUnitInfoChange, this);
        };
        PlayerMixUnitInfoSystem.prototype.uninit = function () {
            this._mixunitinfo = null;
        };
        PlayerMixUnitInfoSystem.prototype.onMixUnitInfoChange = function (ev) {
            this._mixunitinfo = ev.data;
            if (!this._mixunitinfo)
                return;
            this.setProcesses();
        };
        PlayerMixUnitInfoSystem.prototype.setProcesses = function () {
            if (!this._mixunitinfo || !this._mixunitinfo.process)
                return;
            var time = Math.floor(egret.getTimer() / 1000);
            this._mixunitinfo.process.leftTime = this._mixunitinfo.process.leftTime + time;
        };
        Object.defineProperty(PlayerMixUnitInfoSystem.prototype, "Buy_Money_List", {
            // 购买游戏币记录
            get: function () {
                return this._mixunitinfo.buy_money_list;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMixUnitInfoSystem.prototype, "mixunitinfo", {
            //数据杂项
            get: function () {
                return this._mixunitinfo;
            },
            enumerable: true,
            configurable: true
        });
        PlayerMixUnitInfoSystem.prototype.loginReward = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LoginRewardRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerMixUnitInfoSystem.prototype.buySevenNewGift = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuySevenNewGiftRequest();
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerMixUnitInfoSystem;
    }());
    zj.PlayerMixUnitInfoSystem = PlayerMixUnitInfoSystem;
    __reflect(PlayerMixUnitInfoSystem.prototype, "zj.PlayerMixUnitInfoSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerMixUnitInfoSystem.js.map