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
     * @date 2019-2-20
     *
     * @class 战报子项界面
     */
    var MailReportItem = (function (_super) {
        __extends(MailReportItem, _super);
        function MailReportItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/MailReportItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.down, _this);
            zj.cachekeys(zj.UIResource["MailReportItem"], null);
            _this.imgBG.source = zj.cachekey("ui_mail_LayerMailSeconde_png", _this);
            return _this;
        }
        MailReportItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupItem);
            var data = this.data;
            var role = data.info.roleBaseInfo[0];
            if (role && role.picFrameId > 0 && role.picId > 0) {
                this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(role.picFrameId), this);
                this.imgUser.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(role.picId), this);
            }
            var bRead = data.info.is_read && 1 || 2;
            var bGet = false;
            var pathWin = zj.UIConfig.UIConfig_Mail.win[data.info.battleResult - 1];
            var pathLogo = data.info.is_read && zj.UIConfig.UIConfig_Mail.read[0] || zj.UIConfig.UIConfig_Mail.read[1];
            // let bRead = !data.info.is_read;
            // let bGet = data.info.attachment && data.info.is_attachment;
            var strTitle = zj.Helper.StringFormat("%s", data.info.title);
            var strFrom = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_Mail.from, zj.TextsConfig.TextsConfig_Mail.system);
            var strTime = data.info.createtime;
            this.imgRead.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.read[bRead - 1], this);
            this.imgGet.visible = bGet;
            this.imgWin.source = zj.cachekey(pathWin, this);
            this.labelTitle.text = strTitle;
            this.labelFrom.text = strFrom;
            this.labelTime.text = zj.Set.TimeOffset(strTime).toString();
            zj.setCache(this.groupItem);
        };
        MailReportItem.prototype.down = function () {
            this.data.father.setSelect(this.data.index);
        };
        MailReportItem.prototype.setinfoRead = function () {
            this.imgRead.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.read[0], this);
        };
        MailReportItem.prototype.setInfoGet = function () {
            this.imgGet.visible = false;
        };
        return MailReportItem;
    }(eui.ItemRenderer));
    zj.MailReportItem = MailReportItem;
    __reflect(MailReportItem.prototype, "zj.MailReportItem");
    /**子项数据源 */
    var MailReportItemData = (function () {
        function MailReportItemData() {
        }
        return MailReportItemData;
    }());
    zj.MailReportItemData = MailReportItemData;
    __reflect(MailReportItemData.prototype, "zj.MailReportItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MailReportItem.js.map