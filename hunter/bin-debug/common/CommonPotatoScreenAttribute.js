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
    var CommonPotatoScreenAttribute = (function (_super) {
        __extends(CommonPotatoScreenAttribute, _super);
        function CommonPotatoScreenAttribute() {
            var _this = _super.call(this) || this;
            _this.listInfoData = new eui.ArrayCollection();
            _this.lastSelectedIndex = -1;
            _this.callback = null;
            _this.skinName = "resource/skins/common/CommonPotatoScreenAttributeSkin.exml";
            return _this;
        }
        CommonPotatoScreenAttribute.prototype.setInfo = function (bMain, selectedId, callback) {
            if (selectedId === void 0) { selectedId = 0; }
            this.callback = callback;
            this.listInfoData.removeAll();
            var data = new zj.CommonPotatoScreenItemData();
            data.id = 0;
            data.name = zj.TextsConfig.TextsConfig_Potato.all;
            data.type = 0;
            data.isSelected = (selectedId == 0);
            this.listInfoData.addItem(data);
            var screenInfo = zj.TableClientPotatoScreen.Table();
            for (var k in screenInfo) {
                if (screenInfo.hasOwnProperty(k)) {
                    var v = screenInfo[k];
                    var data_1 = new zj.CommonPotatoScreenItemData();
                    data_1.id = v.id;
                    data_1.type = v.type;
                    data_1.name = v.name;
                    data_1.isSelected = (v.id == selectedId);
                    if (bMain && v.type == 1) {
                        this.listInfoData.addItem(data_1);
                    }
                    else if (!bMain && v.type == 2) {
                        this.listInfoData.addItem(data_1);
                    }
                }
            }
            this.listInfo.dataProvider = this.listInfoData;
            this.listInfo.itemRenderer = zj.CommonPotatoScreenItem;
            this.listInfo.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListInfoTap, this);
            this.lastSelectedIndex = this.getLastSelectedIndex();
        };
        CommonPotatoScreenAttribute.prototype.getLastSelectedIndex = function () {
            var index = -1;
            for (var i = 0; i < this.listInfoData.length; i++) {
                var data = this.listInfoData.getItemAt(i);
                if (data.isSelected == true) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        CommonPotatoScreenAttribute.prototype.onListInfoTap = function (e) {
            if (this.lastSelectedIndex < 0) {
                return;
            }
            var lastData = this.listInfoData.getItemAt(this.lastSelectedIndex);
            if (lastData) {
                lastData.isSelected = false;
                this.listInfoData.replaceItemAt(lastData, this.lastSelectedIndex);
            }
            var data = this.listInfoData.getItemAt(e.itemIndex);
            data.isSelected = true;
            this.listInfoData.replaceItemAt(data, e.itemIndex);
            this.lastSelectedIndex = e.itemIndex;
            if (this.callback) {
                this.callback(data.id);
            }
        };
        CommonPotatoScreenAttribute.ID = "CommonPotatoScreenAttribute";
        return CommonPotatoScreenAttribute;
    }(zj.UI));
    zj.CommonPotatoScreenAttribute = CommonPotatoScreenAttribute;
    __reflect(CommonPotatoScreenAttribute.prototype, "zj.CommonPotatoScreenAttribute");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPotatoScreenAttribute.js.map