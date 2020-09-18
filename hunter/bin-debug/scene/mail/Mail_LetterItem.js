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
    // 邮件-信件item
    // lizhengiang
    // 20190517
    var Mail_LetterItem = (function (_super) {
        __extends(Mail_LetterItem, _super);
        function Mail_LetterItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/mail/Mail_LetterItemSkin.exml";
            zj.cachekeys(zj.UIResource["Mail_LetterItem"], null);
            _this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickItem, _this);
            return _this;
        }
        Mail_LetterItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupItem);
            var info = this.data.info;
            var role = info.roleBaseInfo[0];
            var pathFrame = zj.PlayerItemSystem.ItemPath(role.picFrameId);
            var pathUser = zj.PlayerItemSystem.ItemPath(role.picId);
            var bRead = !info.is_read;
            var strTitle = info.title;
            var strFrom = zj.TextsConfig.TextsConfig_Mail.from + zj.TextsConfig.TextsConfig_Mail.system;
            var strTime = zj.Set.TimeOffset(info.createtime);
            this.imgFrame.source = zj.cachekey(pathFrame, this);
            this.imgUser.source = zj.cachekey(pathUser, this);
            this.imgRead.visible = bRead;
            this.lbTitle.text = strTitle;
            this.lbFrom.text = strFrom;
            this.lbTime.text = strTime;
            var callFunctionName = this.data.callFunctionName;
            if (callFunctionName == "read") {
                this.setInfoRead();
            }
            zj.setCache(this.groupItem);
        };
        Mail_LetterItem.prototype.setInfoRead = function () {
            this.imgRead.visible = false;
        };
        Mail_LetterItem.prototype.onClickItem = function () {
            if (this.data.father.setSelect != null) {
                this.data.father.setSelect(this.data.index);
            }
        };
        return Mail_LetterItem;
    }(eui.ItemRenderer));
    zj.Mail_LetterItem = Mail_LetterItem;
    __reflect(Mail_LetterItem.prototype, "zj.Mail_LetterItem");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_LetterItem.js.map