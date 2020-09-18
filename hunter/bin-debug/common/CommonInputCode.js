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
     * @date 2019-5-17
     *
     * @class 玩家信息激活码
     */
    var CommonInputCode = (function (_super) {
        __extends(CommonInputCode, _super);
        function CommonInputCode() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonInputCodeSkin.exml";
            _this.init();
            return _this;
        }
        CommonInputCode.prototype.init = function () {
            this.editBoxContent.skinName = "resource/skins/common/TextInputSkin.exml";
            this.editBoxContent.textDisplay.textColor = 0x5A3722;
            this.editBoxContent.promptDisplay.textColor = 0xB19782;
            this.editBoxContent.inputType = egret.TextFieldType.INPUT;
            this.editBoxContent.prompt = zj.TextsConfig.TextsConfig_User.key_tips;
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
        };
        CommonInputCode.prototype.onBtnOk = function () {
            var _this = this;
            if (this.editBoxContent.text != null && Object.keys(this.editBoxContent.text).length == 20) {
                this.AcceptActivationReqBody()
                    .then(function (gameInfo) {
                    if (gameInfo.getGoods != null) {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(gameInfo.getGoods);
                            dialog.show();
                        });
                    }
                    else {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_User.key_tips_error);
                    }
                    _this.close(zj.UI.HIDE_TO_TOP);
                }).catch(function () {
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_User.key_tips);
            }
        };
        CommonInputCode.prototype.onBtnclose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        CommonInputCode.prototype.AcceptActivationReqBody = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.AcceptActivationRequest();
                request.body.activation = _this.editBoxContent.text;
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
                }, _this, false);
            });
        };
        return CommonInputCode;
    }(zj.Dialog));
    zj.CommonInputCode = CommonInputCode;
    __reflect(CommonInputCode.prototype, "zj.CommonInputCode");
})(zj || (zj = {}));
//# sourceMappingURL=CommonInputCode.js.map