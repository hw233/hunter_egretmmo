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
    // 账号登录页
    // guoshanhe 创建于2018.11.14
    var AoneLoginDialog = (function (_super) {
        __extends(AoneLoginDialog, _super);
        function AoneLoginDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/aone/AoneLoginDialogSkin.exml";
            if (zj.Device.isReviewSwitch) {
                _this.ButtonShrink.visible = true;
                _this.ButtonShrink.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonShrink, _this);
            }
            _this.btnAoneLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAoneLogin, _this);
            _this.btnQuickLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnQuickLogin, _this);
            _this.btnRegisterAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRegisterAccount, _this);
            _this.lbAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.lbPromptAccount.text = ""; }, _this);
            _this.lbPassword.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.lbPromptPassword.text = ""; }, _this);
            _this.initAccounts();
            _this.lst_accounts.itemRenderer = zj.AoneLoginIR;
            _this.rect_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickBg, _this);
            _this.img_list_open.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onShowAccounts, _this);
            _this.img_list_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCloseAccounts, _this);
            zj.Game.EventManager.on(zj.GameEvent.AONE_SELECT_ACCOUNT, _this.onSelectAccount, _this);
            zj.Game.EventManager.on(zj.GameEvent.AONE_DELETE_ACCOUNT, _this.onDeleteAccount, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.AONE_SELECT_ACCOUNT, _this.onSelectAccount, _this);
                zj.Game.EventManager.off(zj.GameEvent.AONE_DELETE_ACCOUNT, _this.onDeleteAccount, _this);
            }, _this);
            return _this;
        }
        AoneLoginDialog.prototype.initAccounts = function () {
            this.img_list_open.visible = false;
            this.img_list_close.visible = false;
            this.lst_accounts.visible = false;
            this.lbAccount.text = "";
            this.lbPassword.text = "";
            this.lbPromptAccount.text = "请输入账号";
            this.lbPromptPassword.text = "请输入密码";
            var accounts = this.readAccounts();
            if (accounts.length <= 0)
                return;
            this.img_list_open.visible = true;
            this.lbAccount.text = accounts[0][0];
            this.lbPassword.text = accounts[0][1];
            this.lbPromptAccount.text = "";
            this.lbPromptPassword.text = "";
        };
        AoneLoginDialog.prototype.onClickBg = function () {
            if (this.lst_accounts.visible) {
                this.onCloseAccounts();
            }
        };
        AoneLoginDialog.prototype.onShowAccounts = function () {
            this.initAccounts();
            var accounts = this.readAccounts();
            var data = [];
            for (var i = 0; i < accounts.length; i++)
                data.push(accounts[i][0]);
            data.push("");
            this.img_list_open.visible = false;
            this.img_list_close.visible = true;
            this.lst_accounts.visible = true;
            this.lst_accounts.alpha = 0;
            this.lst_accounts.scaleY = 0.6;
            this.lst_accounts.dataProvider = new eui.ArrayCollection(data);
            egret.Tween.get(this.lst_accounts).to({ scaleY: 1, alpha: 1 }, 100);
        };
        AoneLoginDialog.prototype.onCloseAccounts = function () {
            var _this = this;
            this.lst_accounts.alpha = 1;
            this.lst_accounts.scaleY = 1;
            this.img_list_open.visible = true;
            this.img_list_close.visible = false;
            egret.Tween.get(this.lst_accounts).to({ scaleY: 0.6, alpha: 0 }, 100).call(function () {
                _this.lst_accounts.visible = false;
            });
        };
        AoneLoginDialog.prototype.onDeleteAccount = function (evt) {
            var account = evt.data;
            var accounts = this.readAccounts();
            var data = [];
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i][0] != account) {
                    data.push(accounts[i]);
                }
            }
            this.writeAccounts(data);
            this.onCloseAccounts();
            this.initAccounts();
        };
        AoneLoginDialog.prototype.onSelectAccount = function (evt) {
            var account = evt.data;
            var accounts = this.readAccounts();
            if (account == "") {
                this.lbAccount.text = "";
                this.lbPassword.text = "";
                this.lbPromptAccount.text = "请输入账号";
                this.lbPromptPassword.text = "请输入密码";
                this.onCloseAccounts();
            }
            else {
                var accounts_1 = this.readAccounts();
                for (var i = 0; i < accounts_1.length; i++) {
                    if (accounts_1[i][0] == account) {
                        var data = accounts_1[i];
                        accounts_1.splice(i, 1);
                        accounts_1.unshift(data);
                        this.writeAccounts(accounts_1);
                        this.onCloseAccounts();
                        this.initAccounts();
                        break;
                    }
                }
            }
        };
        // 读出账号列表
        AoneLoginDialog.prototype.readAccounts = function () {
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
        AoneLoginDialog.prototype.writeAccounts = function (accounts) {
            zj.Controller.setGlobalStorageItem("accounts", JSON.stringify(accounts));
        };
        AoneLoginDialog.prototype.open = function (callback_success, callback_fail, callback_this) {
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
        };
        AoneLoginDialog.prototype.onBtnRegisterAccount = function () {
            var _this = this;
            zj.loadUI(zj.AoneRegisterDialog)
                .then(function (dialog) {
                _this.close(zj.UI.HIDE_TRAIL_OFF);
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.open(_this.callback_success, _this.callback_fail, _this.callback_this);
            });
        };
        AoneLoginDialog.prototype.onButtonShrink = function () {
            this.close();
        };
        AoneLoginDialog.prototype.onBtnQuickLogin = function () {
            var quicklogin_request = new message.QuickRegisterReqBody();
            quicklogin_request.device_info = zj.Util.getDeviceInfo();
            quicklogin_request.version_info = zj.Util.getAppVersionInfo();
            quicklogin_request.auth_key = "";
            var body = JSON.stringify(quicklogin_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onQuickLoginResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/quick_register.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("quick_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        AoneLoginDialog.prototype.onQuickLoginResponse = function (event) {
            var request = event.currentTarget;
            console.log("quicklogin response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(json.retcode) + "(" + json.retcode + ")");
                return;
            }
            var response = json.body;
            if (response.aone_password.length > 0) {
                var accounts = this.readAccounts();
                var data = [];
                data.push([response.aone_account, response.aone_password]);
                for (var i = 0; i < accounts.length; i++) {
                    if (accounts[i][0] != response.aone_account) {
                        data.push(accounts[i]);
                    }
                }
                this.writeAccounts(data);
                this.initAccounts();
            }
            if (response.aone_password.length > 0) {
                this.saveAccountAsImg();
            }
            if (response.aone_password && response.aone_password.length > 0) {
                zj.EventTracker.track('创建账号', {
                    "account_type": "aone",
                    "user_id": response.user_id.toString(),
                    "user_account": response.user_account,
                    "device_id": zj.Util.getDeviceInfo().device_id
                });
            }
            zj.EventTracker.track('账号登录', {
                "login_type": "快速注册登录",
                "user_id": response.user_id.toString(),
                "user_account": response.user_account,
                "device_id": zj.Util.getDeviceInfo().device_id
            });
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
            zj.ReyunTracker.track("Quick login"); // 热云，快速登录
        };
        // 保存账号到图片
        AoneLoginDialog.prototype.saveAccountAsImg = function () {
            var _this = this;
            var dialog = zj.newUI(zj.SaveAccountDialog);
            var accounts = this.readAccounts();
            var account = "";
            var password = "";
            if (accounts.length > 0) {
                account = accounts[0][0];
                password = accounts[0][1];
            }
            dialog.setValue(account, password);
            dialog.box.width = zj.UIManager.StageWidth / 2;
            dialog.box.height = zj.UIManager.StageHeight * 3 / 5;
            dialog.show();
            if (window['WxAppPlatform'] && (zj.platform instanceof window['WxAppPlatform'])) {
                dialog.setCallback(function () {
                    var canvas = window['canvas'];
                    canvas.toTempFilePath({
                        x: canvas.width / 4,
                        y: canvas.height / 5,
                        width: canvas.width / 2,
                        height: canvas.height * 3 / 5,
                        destWidth: canvas.width / 2,
                        destHeight: canvas.height * 3 / 5,
                        canvasId: '',
                        success: (function (res) {
                            dialog.close();
                            dialog.setCallback(null, null);
                            var imgPath = res.tempFilePath;
                            window['wx'].saveImageToPhotosAlbum({
                                filePath: imgPath,
                                success: function (res) {
                                    zj.toast_success("成功保存到相册");
                                }
                            });
                        }),
                        fail: function (res) { dialog.close(); dialog.setCallback(null, null); }
                    }, _this);
                }, this);
            }
            else {
                dialog.setCallback(function () {
                    dialog.close();
                    dialog.setCallback(null, null);
                }, this);
            }
        };
        AoneLoginDialog.prototype.onBtnAoneLogin = function () {
            var account = this.lbAccount.text;
            var password = this.lbPassword.text;
            if (account.length <= 0) {
                zj.toast_warning("请输入账号！");
                return;
            }
            if (password.length <= 0) {
                zj.toast_warning("请输入密码！");
                return;
            }
            if (password.length <= 3) {
                zj.toast_warning("密码太短！");
                return;
            }
            var login_request = new message.AoneLoginReqBody();
            login_request.account = account;
            login_request.password = password;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            login_request.auth_key = "";
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onLoginAccountResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/aone_login.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("login_account request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        AoneLoginDialog.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，验证账号失败");
            zj.toast("网络错误，验证账号失败");
            zj.Game.UIManager.closeWaitingUI();
        };
        AoneLoginDialog.prototype.onLoginAccountResponse = function (event) {
            var request = event.currentTarget;
            console.log("login account response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(json.retcode) + "(" + json.retcode + ")");
                return;
            }
            var accounts = this.readAccounts();
            var data = [];
            data.push([this.lbAccount.text, this.lbPassword.text]);
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i][0] != this.lbAccount.text) {
                    data.push(accounts[i]);
                }
            }
            this.writeAccounts(data);
            this.initAccounts();
            var response = json.body;
            zj.EventTracker.track('账号登录', {
                "login_type": "Aone登录",
                "user_id": response.user_id.toString(),
                "user_account": response.user_account,
                "device_id": zj.Util.getDeviceInfo().device_id
            });
            // toast_success("登录成功");
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
        };
        return AoneLoginDialog;
    }(zj.Dialog));
    zj.AoneLoginDialog = AoneLoginDialog;
    __reflect(AoneLoginDialog.prototype, "zj.AoneLoginDialog");
})(zj || (zj = {}));
//# sourceMappingURL=AoneLoginDialog.js.map