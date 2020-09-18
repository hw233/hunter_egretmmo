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
    //  wangshenzhuo
    //  2019-7-16
    //  HXH_HunterTransformChoose
    var HunterTransformChoose = (function (_super) {
        __extends(HunterTransformChoose, _super);
        function HunterTransformChoose() {
            var _this = _super.call(this) || this;
            _this.data_list = [];
            _this.skinName = "resource/skins/storyHunter/HunterTransformChooseSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            return _this;
        }
        HunterTransformChoose.prototype.setInfo = function () {
            var hunter_list = zj.TableGeneralTransfer.Table();
            this.data_list = [];
            var item_list = [];
            for (var k in hunter_list) {
                var v = hunter_list[k];
                if (v.general_add != 0) {
                    this.data_list.push(v);
                }
            }
            this.SetList();
        };
        HunterTransformChoose.prototype.SetList = function () {
            this.listViewItem.itemRenderer = zj.HunterTransformChooseItem;
            var listItem = new eui.ArrayCollection();
            for (var i = 0; i < this.data_list.length; i++) {
                var data = new zj.HunterTransformChooseItemData();
                data.info = this.data_list[i];
                data.father = this;
                listItem.addItem(data);
            }
            this.listViewItem.dataProvider = listItem;
        };
        HunterTransformChoose.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterTransformChoose;
    }(zj.Scene));
    zj.HunterTransformChoose = HunterTransformChoose;
    __reflect(HunterTransformChoose.prototype, "zj.HunterTransformChoose");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformChoose.js.map