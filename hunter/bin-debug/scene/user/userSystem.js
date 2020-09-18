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
     * @author xingliwei
     *
     * @date 2019-5-16
     *
     * @class 玩家详情系统设置
     */
    var userSystem = (function (_super) {
        __extends(userSystem, _super);
        function userSystem() {
            var _this = _super.call(this) || this;
            _this.info = { particulars: true, physical: true };
            _this.skinName = "resource/skins/user/userSystemSkin.exml";
            _this.init();
            return _this;
        }
        userSystem.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btn1.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this.btn2.addEventListener(eui.UIEvent.CHANGE, this.onChange1, this);
            this.btn3.addEventListener(eui.UIEvent.CHANGE, this.onChange2, this);
            this.btn4.addEventListener(eui.UIEvent.CHANGE, this.onChange3, this);
            this.info = zj.Game.PlayerUserSystem.info;
            this.btn1.selected = zj.Game.SoundManager.isMusicEnabled();
            this.btn2.selected = zj.Game.SoundManager.isEffectEnabled();
            this.btn3.selected = this.info.particulars;
            this.btn4.selected = this.info.physical;
        };
        userSystem.prototype.onChange = function (e) {
            var btn = e.target;
            console.log(btn.selected); //按下true， 正常false
            zj.Game.PlayerUserSystem.Music();
            this.btn1.selected = zj.Game.SoundManager.isMusicEnabled();
        };
        userSystem.prototype.onChange1 = function (e) {
            var btn = e.target;
            // Game.SoundManager
            zj.Game.PlayerUserSystem.Effect();
            this.btn2.selected = zj.Game.SoundManager.isEffectEnabled();
        };
        userSystem.prototype.onChange2 = function (e) {
            var _this = this;
            var btn = e.target;
            zj.Game.PlayerInfoSystem.BaseInfo.agree_detail = !zj.Game.PlayerInfoSystem.BaseInfo.agree_detail;
            zj.Game.PlayerUserSystem.modifyRoleNameRespBody()
                .then(function () {
                _this.setinfo(btn.selected, null);
            }).catch(function () {
            });
        };
        userSystem.prototype.onChange3 = function (e) {
            var _this = this;
            var btn = e.target;
            zj.Game.PlayerUserSystem.SaveClientOperationReqBody(1)
                .then(function () {
                _this.setinfo(null, btn.selected);
            }).catch(function () {
            });
        };
        userSystem.prototype.onClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        userSystem.prototype.setinfo = function (particulars, physical) {
            var info = this.info;
            info.particulars = particulars != null ? particulars : info.particulars;
            info.physical = physical != null ? physical : info.physical;
            zj.Game.PlayerUserSystem.setSystemInfo(info);
            this.info = info;
            zj.Game.PlayerUserSystem.info = info;
        };
        userSystem.prototype.SetAgreeDetailReq = function (flag) {
        };
        return userSystem;
    }(zj.Dialog));
    zj.userSystem = userSystem;
    __reflect(userSystem.prototype, "zj.userSystem");
})(zj || (zj = {}));
//# sourceMappingURL=userSystem.js.map