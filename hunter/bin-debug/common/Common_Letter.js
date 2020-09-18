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
    // 写信
    // lizhengqiang
    // 20190518
    var Common_Letter = (function (_super) {
        __extends(Common_Letter, _super);
        function Common_Letter() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.skinName = "resource/skins/common/Common_LetterSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSend, _this);
            _this.init();
            return _this;
        }
        Common_Letter.prototype.init = function () {
            this.lbTitle.textColor = zj.ConstantConfig_Common.Color.letter_result;
            this.lbTitle.promptColor = zj.ConstantConfig_Common.Color.letter_default;
            this.lbTitle.prompt = "标题需要两个字可以发送";
            this.lbContent.textColor = zj.ConstantConfig_Common.Color.letter_result;
            this.lbContent.promptColor = zj.ConstantConfig_Common.Color.letter_default;
            this.lbContent.prompt = "请输入信件内容（最长不可超过150字）";
        };
        Common_Letter.prototype.setInfo = function (info) {
            this.info = info;
            this.setInfoLetter();
        };
        Common_Letter.prototype.setInfoLetter = function () {
            var role = this.info.roleBaseInfo[0];
            this.lbName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mail.GetMessage, role.name);
        };
        Common_Letter.prototype.onBtnSend = function () {
            var _this = this;
            if (this.lbTitle.text.length < zj.CommonConfig.limit_mail_title_min) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Mail.title_min));
            }
            else if (this.lbTitle.text.length > 10) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Mail.title_max));
            }
            else if (this.lbContent.text.length < zj.CommonConfig.limit_mail_content_min) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Mail.content_min));
            }
            else if (this.lbContent.text.length > 150) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Mail.content_max));
            }
            else {
                zj.Game.PlayerMailSystem.sendRoleMail(this.info.type, this.info.from_id, this.info.roleBaseInfo[0].name, this.lbTitle.text, this.lbContent.text).then(function () {
                    zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Mail.send_success));
                    _this.onBtnClose();
                });
            }
        };
        Common_Letter.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Common_Letter;
    }(zj.Dialog));
    zj.Common_Letter = Common_Letter;
    __reflect(Common_Letter.prototype, "zj.Common_Letter");
})(zj || (zj = {}));
//# sourceMappingURL=Common_Letter.js.map