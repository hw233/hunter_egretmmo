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
     * 冒险通关奖励
     * created by Lian Lei
     * 2019.1.16
     */
    var HXH_InstancePassDropInfo = (function (_super) {
        __extends(HXH_InstancePassDropInfo, _super);
        function HXH_InstancePassDropInfo() {
            var _this = _super.call(this) || this;
            _this.listViewDropData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/adventureMap/HXH_InstancePassDropInfoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            _this.setInfo();
            return _this;
        }
        HXH_InstancePassDropInfo.prototype.setInfo = function () {
            var tableChapter = zj.TableInstanceArea.Table();
            var list = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tableChapter); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (vv.area_normal.length != 0 && kk < 10) {
                    list.push(vv);
                }
            }
            // list.sort(function(a, b){
            // 	return b.area_id - a.area_id;
            // });
            this.listViewDropData.removeAll();
            for (var i = 0; i < list.length; i++) {
                var itemData = new zj.HXH_InstancePassDropInfoItemData();
                itemData.id = i + 1;
                itemData.info = list[i];
                itemData.father = this;
                itemData.index = i;
                this.listViewDropData.addItem(itemData);
            }
            this.listViewDrop.dataProvider = this.listViewDropData;
            this.listViewDrop.itemRenderer = zj.HXH_InstancePassDropInfoItem;
        };
        HXH_InstancePassDropInfo.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_InstancePassDropInfo.prototype.onRemoveDialog = function () {
            var dialog = this.getChildByName("Award");
            if (dialog)
                this.removeChild(dialog);
        };
        return HXH_InstancePassDropInfo;
    }(zj.Dialog));
    zj.HXH_InstancePassDropInfo = HXH_InstancePassDropInfo;
    __reflect(HXH_InstancePassDropInfo.prototype, "zj.HXH_InstancePassDropInfo");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstancePassDropInfo.js.map