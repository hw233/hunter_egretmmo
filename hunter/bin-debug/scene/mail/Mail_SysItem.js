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
    // 邮件-系统item
    // lizhengiang
    // 20190516
    var Mail_SysItem = (function (_super) {
        __extends(Mail_SysItem, _super);
        function Mail_SysItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/mail/Mail_SysItemSkin.exml";
            zj.cachekeys(zj.UIResource["Mail_SysItem"], null);
            _this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickItem, _this);
            return _this;
        }
        Mail_SysItem.prototype.dataChanged = function () {
            var info = this.data.info;
            zj.closeCache(this.groupItem);
            var pathLogo = info.is_read ? zj.UIConfig.UIConfig_Mail.read[0] : zj.UIConfig.UIConfig_Mail.read[1];
            var bRead = !info.is_read;
            var bGet = info.attachment.length > 0 && !info.is_attachment;
            var strTitle = info.title;
            var strFrom = zj.TextsConfig.TextsConfig_Mail.from + zj.TextsConfig.TextsConfig_Mail.system;
            var strTime = zj.Set.TimeOffset(info.createtime);
            this.imgLogo.source = zj.cachekey(pathLogo, this);
            this.imgRead.visible = bRead;
            this.imgGet.visible = bGet;
            this.lbTitle.text = strTitle;
            this.lbFrom.text = strFrom;
            this.lbTime.text = strTime;
            var callFunctionName = this.data.callFunctionName;
            if (callFunctionName == "read") {
                this.setInfoRead();
            }
            else if (callFunctionName == "get") {
                this.setInfoGet();
            }
            zj.setCache(this.groupItem);
        };
        Mail_SysItem.prototype.setInfoRead = function () {
            this.imgRead.visible = false;
            this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.read[0], this);
        };
        Mail_SysItem.prototype.setInfoGet = function () {
            this.imgGet.visible = false;
        };
        Mail_SysItem.prototype.onClickItem = function () {
            if (this.data.father.setSelect != null) {
                this.data.father.setSelect(this.data.index);
            }
        };
        return Mail_SysItem;
    }(eui.ItemRenderer));
    zj.Mail_SysItem = Mail_SysItem;
    __reflect(Mail_SysItem.prototype, "zj.Mail_SysItem");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_SysItem.js.map