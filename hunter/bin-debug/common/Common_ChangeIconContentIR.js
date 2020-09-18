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
    //
    // lizhengqiang
    // 20190112
    var Common_ChangeIconContentIR = (function (_super) {
        __extends(Common_ChangeIconContentIR, _super);
        function Common_ChangeIconContentIR() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.listID = 0;
            _this.listType = 0;
            _this.skinName = "resource/skins/common/Common_ChangeIconContentIRSkin.exml";
            zj.cachekeys(zj.UIResource["Common_ChangeIconContentIR"], null);
            _this.lstItem.selectedIndex = 0;
            _this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedItem, _this);
            return _this;
        }
        Common_ChangeIconContentIR.prototype.dataChanged = function () {
            this.listType = this.data.i ? this.data.i : 0;
            this.listID = this.data.j ? this.data.j : 0;
            var picIds = this.data.picIds;
            var iconType = this.data.iconType;
            var indexArr = this.data.index;
            this.arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < picIds.length; i++) {
                this.data.father.mapIndex += 1;
                this.arrCollection.addItem({ "iconType": iconType, "picId": picIds[i], "index": indexArr[i], "vis": true, "father": this, "i": i });
            }
            this.lstItem.itemRenderer = zj.Common_ChangeIconItemIR;
            this.lstItem.dataProvider = this.arrCollection;
            this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlstIconStyleTag, this);
        };
        Common_ChangeIconContentIR.prototype.onlstIconStyleTag = function (e) {
        };
        Common_ChangeIconContentIR.prototype.onLstSelectedItem = function (e) {
            if (this.data.father.vis == true) {
                this.data.father.vis = false;
            }
            else {
                return;
            }
            zj.Game.EventManager.event(zj.GameEvent.COMMON_CHANGE_ICON_SHUAXIN);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.index]);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.lstItem.selectedIndex]);
            this.index = this.lstItem.selectedIndex;
        };
        return Common_ChangeIconContentIR;
    }(eui.ItemRenderer));
    zj.Common_ChangeIconContentIR = Common_ChangeIconContentIR;
    __reflect(Common_ChangeIconContentIR.prototype, "zj.Common_ChangeIconContentIR");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIconContentIR.js.map