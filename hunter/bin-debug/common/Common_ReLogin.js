var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @class 断线重连Tip
     *
     * @author LianLei
     *
     * @date 2019.07.11
     */
    var Common_ReLogin = (function (_super) {
        __extends(Common_ReLogin, _super);
        function Common_ReLogin() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_ReLoginSkin.exml";
            _this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCancel, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.onAutoClose, _this);
            zj.Game.EventManager.event(zj.GameEvent.NETWORK_DISCONNECTION);
            _this.init();
            return _this;
        }
        Common_ReLogin.prototype.init = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
                .then(function (display) {
                display.x = _this.TableViewNpc.width / 2;
                display.y = _this.TableViewNpc.height;
                display.scaleX = 0.6;
                display.scaleY = 0.58;
                _this.TableViewNpc.addChild(display);
            })
                .catch(function (reason) {
                // toast(reason);
            });
        };
        /**
         * 断线重连回调方法
         *
         * @param _confirmCallback 重新连接回调
         *
         * @param _cancelCallback 返回登陆回调
         *
         * @param _thisObj 执行域
         */
        Common_ReLogin.prototype.setCB = function (_cancelCallback, _confirmCallback, _thisObj) {
            this.cancelCallback = _cancelCallback;
            this.confirmCallback = _confirmCallback;
            this.thisObj = _thisObj;
        };
        Common_ReLogin.prototype.onBtnCancel = function () {
            zj.Game.EventManager.off(zj.GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
            this.cancelCallback.call(this.thisObj);
            this.thisObj = null;
            if (this.parent)
                this.parent.removeChild(this);
        };
        Common_ReLogin.prototype.onBtnConfirm = function () {
            zj.Game.EventManager.off(zj.GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
            this.confirmCallback.call(this.thisObj);
            this.thisObj = null;
            if (this.parent)
                this.parent.removeChild(this);
        };
        Common_ReLogin.prototype.onAutoClose = function () {
            zj.Game.EventManager.off(zj.GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
            this.thisObj = null;
            if (this.parent)
                this.parent.removeChild(this);
        };
        Common_ReLogin.prototype.setOneBtn = function () {
            this.btnConfirm.visible = false;
            this.btnCancel.horizontalCenter = "0";
        };
        Common_ReLogin.prototype.setMsgInfo = function (str) {
            this.labelNotice.text = str;
        };
        return Common_ReLogin;
    }(zj.Dialog));
    zj.Common_ReLogin = Common_ReLogin;
    __reflect(Common_ReLogin.prototype, "zj.Common_ReLogin");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ReLogin.js.map