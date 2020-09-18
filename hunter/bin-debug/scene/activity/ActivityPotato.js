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
    //ActivityPotato
    //yuqingchao
    //2019.04.02
    var ActivityPotato = (function (_super) {
        __extends(ActivityPotato, _super);
        function ActivityPotato() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.skinName = "resource/skins/activity/ActivityPotatoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        ActivityPotato.prototype.init = function (id, father) {
            this.id = id;
            this.father = father;
            this.setInfoList();
        };
        ActivityPotato.prototype.setInfoList = function () {
            var list = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.itemTransfer + ".json");
            var goodsList = [];
            var goodsId;
            var count;
            var index;
            var showType;
            var num = list[this.id].items_id.length;
            for (var i = 0; i < list[this.id].items_id.length; i++) {
                var goods = [
                    goodsId = list[this.id].items_id[i],
                    count = list[this.id].items_count[i],
                    index = 0,
                    showType = list[this.id].show_type
                ];
                goodsList.push(goods);
            }
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < goodsList.length; i++) {
                this.arrayCollection.addItem({
                    info: goodsList[i],
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityPotatoItem;
        };
        ActivityPotato.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityPotato;
    }(zj.Dialog));
    zj.ActivityPotato = ActivityPotato;
    __reflect(ActivityPotato.prototype, "zj.ActivityPotato");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityPotato.js.map