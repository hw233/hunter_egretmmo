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
     * 帮助界面左边Item
     * created by Lian Lei
     * 2018.12.19
     */
    var HelpButtonItem = (function (_super) {
        __extends(HelpButtonItem, _super);
        function HelpButtonItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/help/HelpButtonItemSkin.exml";
            _this.groupBtnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLevelOne, _this);
            _this.groupBtnTwo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLevelTwo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        HelpButtonItem.prototype.dataChanged = function () {
            this.setInfo(this.data);
        };
        HelpButtonItem.prototype.setInfo = function (data) {
            this.index = data.index;
            this.info = data.info;
            this.curSmallType = data.smallType;
            this.curBigType = data.bigType;
            data.father.groupAddHelpButtonItem.addChild(this);
            this.groupBtnOne.visible = (data.info.big_id != null);
            this.groupBtnTwo.visible = (data.info.small_id != null);
            this.labelLevelOne.visible = (data.info.big_id != null);
            this.labelLevelTwo.visible = (data.info.small_id != null);
            this.labelLevelOne.text = data.info.name;
            this.labelLevelTwo.text = data.info.help_id;
            this.groupBtnOne.touchEnabled = (data.info.big_id != null && data.info.big_id != this.curBigType);
            this.btnLevelOne.enabled = (data.info.big_id != null && data.info.big_id != this.curBigType);
            if (data.info.small_id != null && data.info.small_id == this.curSmallType) {
                data.father.selButtonItem(this);
            }
            this.refreshItemSel(this.data);
        };
        HelpButtonItem.prototype.getInfo = function () {
            return this.info;
        };
        HelpButtonItem.prototype.refreshItemSel = function (data) {
            this.groupBtnTwo.touchEnabled = (this.info.small_id != null && this.info.small_id != this.curSmallType);
            this.btnLevelTwo.enabled = (this.info.small_id != null && this.info.small_id != this.curSmallType);
        };
        HelpButtonItem.prototype.unSel = function (smallType) {
            this.curSmallType = smallType;
            this.refreshItemSel(this.data);
        };
        HelpButtonItem.prototype.sel = function () {
            this.curSmallType = this.info.small_id;
            this.refreshItemSel(this.data);
        };
        HelpButtonItem.prototype.onBtnLevelOne = function () {
            this.data.father.loadByBigType(this.info.big_id);
        };
        HelpButtonItem.prototype.onBtnLevelTwo = function () {
            this.data.father.selButtonItem(this);
        };
        return HelpButtonItem;
    }(eui.ItemRenderer));
    zj.HelpButtonItem = HelpButtonItem;
    __reflect(HelpButtonItem.prototype, "zj.HelpButtonItem");
    var HelpButttonItemData = (function () {
        function HelpButttonItemData() {
        }
        return HelpButttonItemData;
    }());
    zj.HelpButttonItemData = HelpButttonItemData;
    __reflect(HelpButttonItemData.prototype, "zj.HelpButttonItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HelpButtonItem.js.map