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
    // 邮件-信件
    // lizhengqiang
    // 20190517
    var Mail_Letter = (function (_super) {
        __extends(Mail_Letter, _super);
        function Mail_Letter() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.father = null;
            _this.skinName = "resource/skins/mail/Mail_LetterSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDetail, _this);
            _this.btnAddFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddFriend, _this);
            _this.btnSetPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSetPrivate, _this);
            _this.btnReply.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReply, _this);
            return _this;
        }
        Mail_Letter.prototype.setInfo = function (info) {
            this.info = info;
            var role = info.roleBaseInfo[0];
            this.lbTitle.text = info.title;
            this.lbFrom.text = role.name;
            this.lbTime.text = zj.Set.TimeForMail(info.createtime);
            this.lbContent.textFlow = zj.Util.RichText(info.content);
        };
        Mail_Letter.prototype.onBtnDetail = function () {
            zj.TipManager.ReqRoleInfo(this.info.from_id, this.info.roleBaseInfo[0].group_id);
        };
        Mail_Letter.prototype.onBtnAddFriend = function () {
            var _this = this;
            zj.TipManager.RelationAdd(this.info.from_id, function () { _this.close(); });
        };
        Mail_Letter.prototype.onBtnSetPrivate = function () {
            var _this = this;
            var role = this.info.roleBaseInfo[0];
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: null });
                dialog.show();
                _this.onBtnClose();
            });
        };
        Mail_Letter.prototype.onBtnReply = function () {
            var _this = this;
            zj.loadUI(zj.Common_Letter)
                .then(function (dailog) {
                dailog.show();
                dailog.setInfo(_this.info);
            });
        };
        Mail_Letter.prototype.setFather = function (father) {
            this.father = father;
        };
        Mail_Letter.prototype.onBtnClose = function () {
            if (this.father && this.father.groupMail) {
                egret.Tween.get(this.father.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Mail_Letter;
    }(zj.Dialog));
    zj.Mail_Letter = Mail_Letter;
    __reflect(Mail_Letter.prototype, "zj.Mail_Letter");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_Letter.js.map