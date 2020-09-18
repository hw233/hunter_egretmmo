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
    // 邮件-系统
    // lizhengqiang
    // 20190517
    var Mail_Sys = (function (_super) {
        __extends(Mail_Sys, _super);
        function Mail_Sys() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.skinName = "resource/skins/mail/Mail_SysSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        Mail_Sys.prototype.setInfo = function (info) {
            this.lbTitle.text = info.title;
            this.lbFrom.text = zj.TextsConfig.TextsConfig_Mail.system;
            this.lbTime.text = zj.Set.TimeForMail(info.createtime);
            this.lbContent.textFlow = zj.Util.RichText(info.content);
        };
        Mail_Sys.prototype.setFather = function (father) {
            this.father = father;
        };
        Mail_Sys.prototype.onBtnClose = function () {
            if (this.father && this.father.groupMail) {
                egret.Tween.get(this.father.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Mail_Sys;
    }(zj.Dialog));
    zj.Mail_Sys = Mail_Sys;
    __reflect(Mail_Sys.prototype, "zj.Mail_Sys");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_Sys.js.map