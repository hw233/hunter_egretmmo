var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author xingliwie
     *
     * @date 2019-5-17
     *
     * @class 玩家系统设置
     */
    var PlayerUserSystem = (function () {
        function PlayerUserSystem() {
            this.info = { particulars: true, physical: true };
        }
        PlayerUserSystem.prototype.init = function () {
            // this.Initsq();// 初始化
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.setInfo, this);
        };
        PlayerUserSystem.prototype.setInfo = function () {
            var msg = zj.Controller.getGlobalStorageItem("system");
            if (msg == null || msg == undefined || msg == "") {
                this.setSystemInfo(this.info);
            }
            try {
                this.info = this.getSystemInfo();
            }
            catch (error) {
                this.setSystemInfo(this.info);
            }
        };
        PlayerUserSystem.prototype.setSystemInfo = function (info) {
            var msg = JSON.stringify(info);
            zj.Controller.setGlobalStorageItem("system", msg);
        };
        PlayerUserSystem.prototype.getSystemInfo = function () {
            var msg = zj.Controller.getGlobalStorageItem("system");
            if (!msg || msg == "")
                return {};
            var map = JSON.parse(msg);
            return map;
        };
        /**设置玩家游戏音乐设置 */
        PlayerUserSystem.prototype.Music = function () {
            if (zj.Game.SoundManager.isMusicEnabled()) {
                zj.Game.SoundManager.stopMusic();
                zj.Game.SoundManager.musicDisable();
            }
            else {
                zj.Game.SoundManager.musicEnable();
                zj.Game.SoundManager.playMusic("city_mp3", 0);
            }
        };
        PlayerUserSystem.prototype.Effect = function () {
            if (zj.Game.SoundManager.isEffectEnabled()) {
                zj.Game.SoundManager.effectDisable();
            }
            else {
                zj.Game.SoundManager.effectEnable();
            }
        };
        /**是否允许他人查看猎人详情 */
        PlayerUserSystem.prototype.modifyRoleNameRespBody = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetAgreeDetailRequest();
                request.body.agree_detail = zj.Game.PlayerInfoSystem.BaseInfo.agree_detail;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        /**体力回满提醒 */
        PlayerUserSystem.prototype.SaveClientOperationReqBody = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SaveClientOperationRequest();
                request.body.clientOperation = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.PushNotice.RefreshNotice(index); // 刷新通知
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false);
            });
        };
        return PlayerUserSystem;
    }());
    zj.PlayerUserSystem = PlayerUserSystem;
    __reflect(PlayerUserSystem.prototype, "zj.PlayerUserSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerUserSystem.js.map