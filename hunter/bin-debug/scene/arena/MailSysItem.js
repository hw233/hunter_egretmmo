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
     * @author xing li wei
     *
     * @date 2019-1-30
     *
     * @class 战报子项界面
     */
    var MailSysItem = (function (_super) {
        __extends(MailSysItem, _super);
        function MailSysItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/MailSysItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.down, _this);
            zj.cachekeys(zj.UIResource["MailSysItem"], null);
            return _this;
        }
        MailSysItem.prototype.dataChanged = function () {
            var data = this.data;
            var pathLogo = data.info.is_read && zj.UIConfig.UIConfig_Mail.read[0] || zj.UIConfig.UIConfig_Mail.read[1];
            var bRead = !data.info.is_read;
            var bGet = data.info.attachment && data.info.is_attachment;
            var strTitle = zj.Helper.StringFormat("%s", data.info.title);
            var strFrom = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_Mail.from, zj.TextsConfig.TextsConfig_Mail.system);
            var steTime = zj.Helper.StringFormat(data.info.createtime);
            this.imgLogo.source = zj.cachekey(pathLogo, this);
            this.imgGet.visible = bGet;
            this.labelTitle.text = strTitle;
            this.labelFrom.text = strFrom;
        };
        MailSysItem.prototype.down = function () {
            this.data.father.setSelect(this.data.index);
        };
        return MailSysItem;
    }(eui.ItemRenderer));
    zj.MailSysItem = MailSysItem;
    __reflect(MailSysItem.prototype, "zj.MailSysItem");
    /**子项数据源 */
    var MailSysItemData = (function () {
        function MailSysItemData() {
        }
        return MailSysItemData;
    }());
    zj.MailSysItemData = MailSysItemData;
    __reflect(MailSysItemData.prototype, "zj.MailSysItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MailSysItem.js.map