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
     * 帮助界面
     * created by Lian Lei
     * 2018.12.19
     */
    var HelpDialog = (function (_super) {
        __extends(HelpDialog, _super);
        function HelpDialog() {
            var _this = _super.call(this) || this;
            _this.buttonListInfo = [];
            _this.desListInfo = [];
            _this.listButtonData = new eui.ArrayCollection();
            _this.listDesData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/help/HelpDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.loadByBigType(1);
            return _this;
        }
        HelpDialog.prototype.loadBySmallType = function (smallType) {
            this.imageBackground.visible = false;
            this.curSmallType = smallType;
            this.curBigType = Math.floor(this.curSmallType / 100);
            this.loadHelpData();
        };
        HelpDialog.prototype.isFullScreen = function () {
            return this.imageBackground.visible;
        };
        HelpDialog.prototype.loadByBigType = function (bigType) {
            if (this.curBigType != bigType) {
                this.curBigType = bigType;
                this.curSmallType = zj.HelpOther.helpBigTypeInstance(this.curBigType).small_ids[0];
                this.loadHelpData();
            }
        };
        HelpDialog.prototype.loadHelpData = function () {
            this.setButtonList();
            this.setDesList();
        };
        HelpDialog.prototype.setButtonList = function () {
            this.curItem = null;
            this.buttonListInfo = zj.HelpOther.getHelpListByBigType(this.curBigType);
            this.listButton.itemRenderer = zj.HelpButtonItem;
            this.listButtonData.removeAll();
            for (var i = 0; i < this.buttonListInfo.length; i++) {
                var itemData = new zj.HelpButttonItemData();
                itemData.bigType = this.curBigType;
                itemData.father = this;
                itemData.index = this.buttonListInfo[i];
                itemData.info = this.buttonListInfo[i];
                itemData.smallType = this.curSmallType;
                this.listButtonData.addItem(itemData);
            }
            this.listButton.dataProvider = this.listButtonData;
        };
        HelpDialog.prototype.selButtonItem = function (item) {
            this.curSmallType = item.getInfo().small_id;
            if (this.curItem != null) {
                this.curItem.unSel(this.curSmallType);
            }
            this.curItem = item;
            this.curItem.sel();
            this.setDesList();
        };
        HelpDialog.prototype.setDesList = function () {
            if (this.curDesId == this.curSmallType) {
                return;
            }
            this.curDesId = this.curSmallType;
            this.desListInfo = zj.HelpOther.getHelpBySmallType(this.curSmallType);
            this.listDes.itemRenderer = zj.HelpDesItem;
            this.listDesData.removeAll();
            this.listDes.scrollH = 0;
            this.listDes.scrollV = 0;
            for (var i = 0; i < this.desListInfo.length; i++) {
                var itemData = new zj.HelpDesItemData();
                itemData.info = this.desListInfo[i];
                this.listDesData.addItem(itemData);
            }
            this.listDes.dataProvider = this.listDesData;
        };
        HelpDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        return HelpDialog;
    }(zj.Dialog));
    zj.HelpDialog = HelpDialog;
    __reflect(HelpDialog.prototype, "zj.HelpDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HelpDialog.js.map