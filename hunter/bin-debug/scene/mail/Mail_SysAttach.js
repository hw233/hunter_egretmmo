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
    // �ʼ�-ϵͳ-����ȡ
    // lizhengqiang
    // 20190517
    var Mail_SysAttach = (function (_super) {
        __extends(Mail_SysAttach, _super);
        function Mail_SysAttach() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.father = null;
            _this.runActionGet = function () {
                _this.imgGet.visible = true;
                egret.Tween.get(_this.imgGet)
                    .to({ scaleX: 4, scaleY: 4 }, 0)
                    .to({ scaleX: 0.7, scaleY: 0.7 }, 100)
                    .to({ scaleX: 1, scaleY: 1 }, 100)
                    .call(function () {
                    _this.btnGet.enabled = false;
                })
                    .call(function () {
                    _this.onBtnClose();
                });
            };
            _this.skinName = "resource/skins/mail/Mail_SysAttachSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            return _this;
        }
        Mail_SysAttach.prototype.setInfo = function (info) {
            this.info = info;
            this.lbTitle.text = info.title;
            this.lbFrom.text = zj.TextsConfig.TextsConfig_Mail.system;
            this.lbTime.text = zj.Set.TimeForMail(info.createtime);
            this.lbContent.textFlow = zj.Util.RichText(info.content);
            this.btnGet.enabled = !info.is_attachment;
            this.imgGet.visible = info.is_attachment;
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = info.attachment; _i < _a.length; _i++) {
                var v = _a[_i];
                arrCollection.addItem({ itemInfo: v });
            }
            this.lstViewAttach.dataProvider = arrCollection;
            this.lstViewAttach.itemRenderer = zj.Mail_AttachItem_;
        };
        Mail_SysAttach.prototype.setFather = function (father) {
            this.father = father;
        };
        Mail_SysAttach.prototype.onBtnGet = function () {
            var _this = this;
            this.btnGet.enabled = false;
            zj.Game.PlayerMailSystem.saveAttachment(this.info.type, [this.info.mailId]).then(function () {
                _this.father.setMailIsGet();
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(_this.info.attachment);
                    dialog.setCB(_this.runActionGet);
                });
            }).catch(function () {
                _this.btnGet.enabled = true;
            });
        };
        Mail_SysAttach.prototype.onBtnClose = function () {
            if (this.father && this.father.groupMail) {
                egret.Tween.get(this.father.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Mail_SysAttach;
    }(zj.Dialog));
    zj.Mail_SysAttach = Mail_SysAttach;
    __reflect(Mail_SysAttach.prototype, "zj.Mail_SysAttach");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_SysAttach.js.map