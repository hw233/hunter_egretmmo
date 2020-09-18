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
    // 账号注册页
    // guoshanhe 创建于2018.11.14
    var AoneRegisterDialog = (function (_super) {
        __extends(AoneRegisterDialog, _super);
        function AoneRegisterDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/aone/AoneRegisterDialogSkin.exml";
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRegister, _this);
            _this.lbAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.lbPromptAccount.text = ""; }, _this);
            _this.lbPassword.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.lbPromptPassword.text = ""; }, _this);
            _this.lbPassword2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.lbPromptPassword2.text = ""; }, _this);
            return _this;
        }
        AoneRegisterDialog.prototype.open = function (callback_success, callback_fail, callback_this) {
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
        };
        AoneRegisterDialog.prototype.onBtnRegister = function () {
            var account = this.lbAccount.text;
            var password1 = this.lbPassword.text;
            var password2 = this.lbPassword2.text;
            if (account.length < 3) {
                zj.toast_warning("账号至少要3个字符");
                return;
            }
            if (account.length > 64) {
                zj.toast_warning("账号不能超过64个字符");
                return;
            }
            if (password1 != password2) {
                zj.toast_warning("两次输入密码不一致");
                return;
            }
            if (password1.length < 6) {
                zj.toast_warning("密码不能少于6个字符");
                return;
            }
            if (password1.length > 12) {
                zj.toast_warning("密码不能多于12个字符");
                return;
            }
            var register_request = new message.AoneRegisterReqBody();
            register_request.account = account;
            register_request.password = password1;
            register_request.device_info = zj.Util.getDeviceInfo();
            register_request.version_info = zj.Util.getAppVersionInfo();
            register_request.auth_key = "";
            var body = JSON.stringify(register_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onRegisterAccountResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/aone_register.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("register_account request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        AoneRegisterDialog.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，注册账号失败");
            zj.toast("网络错误，注册账号失败");
            zj.Game.UIManager.closeWaitingUI();
        };
        AoneRegisterDialog.prototype.onRegisterAccountResponse = function (event) {
            var request = event.currentTarget;
            console.log("register account response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(json.retcode) + "(" + json.retcode + ")");
                return;
            }
            var response = json.body;
            zj.EventTracker.track('创建账号', {
                "account_type": "aone",
                "user_id": response.user_id.toString(),
                "user_account": response.user_account,
                "device_id": zj.Util.getDeviceInfo().device_id
            });
            var accounts = this.readAccounts();
            accounts.unshift([this.lbAccount.text, this.lbPassword.text]);
            this.writeAccounts(accounts);
            zj.toast_success("注册成功");
            this.onBtnReturn();
        };
        AoneRegisterDialog.prototype.onBtnReturn = function () {
            var _this = this;
            zj.loadUI(zj.AoneLoginDialog)
                .then(function (dialog) {
                _this.close(zj.UI.HIDE_TRAIL_OFF);
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.open(_this.callback_success, _this.callback_fail, _this.callback_this);
            });
        };
        // 读出账号列表
        AoneRegisterDialog.prototype.readAccounts = function () {
            var data = zj.Controller.getGlobalStorageItem("accounts");
            if (data && data.length > 0) {
                try {
                    var json = JSON.parse(data);
                    return json;
                }
                catch (e) {
                    console.log(e);
                    return [];
                }
            }
            return [];
        };
        // 保存账号列表
        AoneRegisterDialog.prototype.writeAccounts = function (accounts) {
            zj.Controller.setGlobalStorageItem("accounts", JSON.stringify(accounts));
        };
        return AoneRegisterDialog;
    }(zj.Dialog));
    zj.AoneRegisterDialog = AoneRegisterDialog;
    __reflect(AoneRegisterDialog.prototype, "zj.AoneRegisterDialog");
})(zj || (zj = {}));
//# sourceMappingURL=AoneRegisterDialog.js.map