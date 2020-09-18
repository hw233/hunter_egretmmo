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
    // 猜拳 查看奖励
    // wangshenzhuo
    // 2019.05.25
    var MoraMainAwardDialog = (function (_super) {
        __extends(MoraMainAwardDialog, _super);
        function MoraMainAwardDialog() {
            var _this = _super.call(this) || this;
            _this.reward = [];
            _this.skinName = "resource/skins/fishing/MoraMainAwardSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            zj.setCache(_this.groupCache);
            return _this;
        }
        MoraMainAwardDialog.prototype.SetInfo = function () {
            var max = zj.CommonConfig.gain_runes_number;
            var tbl = zj.TableRunes.Table();
            var num = 1;
            for (var i = 0; i < max; i++) {
                tbl[max - num + 1].id = null;
                var id = max - num + 1 != 0 && max - num + 1 || max;
                this.reward[i] = tbl[id];
                num = num + 1;
            }
            this.SetInfoList();
        };
        MoraMainAwardDialog.prototype.SetInfoList = function () {
            this.listViewList.itemRenderer = zj.MoraMainAwardItem;
            this.listMyItem = new eui.ArrayCollection();
            for (var i = 0; i < this.reward.length; i++) {
                var data = new zj.MoraMainAwardItemData();
                data.father = this;
                data.info = this.reward[i];
                data.index = i;
                this.listMyItem.addItem(data);
            }
            this.listViewList.dataProvider = this.listMyItem;
        };
        MoraMainAwardDialog.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info.good, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        MoraMainAwardDialog.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        MoraMainAwardDialog.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return MoraMainAwardDialog;
    }(zj.Dialog));
    zj.MoraMainAwardDialog = MoraMainAwardDialog;
    __reflect(MoraMainAwardDialog.prototype, "zj.MoraMainAwardDialog");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainAwardDialog.js.map