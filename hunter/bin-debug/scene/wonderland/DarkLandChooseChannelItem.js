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
     * @author xingliwei
     *
     * @date 2019-6-14
     *
     * @class 贪婪之岛港口线路list子项
     */
    var DarkLandChooseChannelItem = (function (_super) {
        __extends(DarkLandChooseChannelItem, _super);
        function DarkLandChooseChannelItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/DarkLandChooseChannelItemSkin.exml";
            _this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelect, _this);
            return _this;
        }
        DarkLandChooseChannelItem.prototype.dataChanged = function () {
            var data = this.data;
            var maxNum = zj.TableDarkland.Item(1).branch_condition;
            this.channelId = data.info.key;
            var channelID = this.channelId % 100;
            var strNum = "";
            if (data.info.value >= maxNum) {
                strNum = "<text>(</text>" + zj.TextsConfig.TextsConfig_DarkLand.redFull + "<text>)</text>";
            }
            else {
                strNum = "<text>(</text><color>r=60,g=255,b=0</color><text>" + data.info.value + "</text><text>/" + maxNum + ")</text>";
            }
            this.label1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.curPortChannel, channelID);
            this.label2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(strNum));
        };
        DarkLandChooseChannelItem.prototype.onBtnSelect = function () {
            var data = this.data;
            data.father.selectChannelId = this.channelId;
            data.father.ChangeChannel();
        };
        return DarkLandChooseChannelItem;
    }(eui.ItemRenderer));
    zj.DarkLandChooseChannelItem = DarkLandChooseChannelItem;
    __reflect(DarkLandChooseChannelItem.prototype, "zj.DarkLandChooseChannelItem");
    var DarkLandChooseChannelItemData = (function () {
        function DarkLandChooseChannelItemData() {
        }
        return DarkLandChooseChannelItemData;
    }());
    zj.DarkLandChooseChannelItemData = DarkLandChooseChannelItemData;
    __reflect(DarkLandChooseChannelItemData.prototype, "zj.DarkLandChooseChannelItemData");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandChooseChannelItem.js.map