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
    // HXH_GroupFightDropInfo(首领奖励)
    // wangshenzhuo
    // 20019/03/06
    var HXH_GroupFightDropInfo = (function (_super) {
        __extends(HXH_GroupFightDropInfo, _super);
        function HXH_GroupFightDropInfo() {
            var _this = _super.call(this) || this;
            _this.listViewIndex = 0;
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightDropInfoSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            //  this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this); 
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            zj.setCache(_this.groupCache);
            return _this;
        }
        HXH_GroupFightDropInfo.prototype.SetInfo = function () {
            var tbl = zj.PlayerGroupFightSystem.AwardList();
            this.listViewDrop.selectedIndex = 0; // 默认选中
            this.listViewDrop.itemRenderer = zj.HXH_GroupFightDropInfoItem; //
            this.listViewItem = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                var data = new zj.HXH_GroupFightDropInfoItemData();
                data.father = this;
                data.reward = tbl[i].reward;
                data.id = tbl[i].id;
                data.first = tbl[i].firstBlood;
                data.index = i;
                this.listViewItem.addItem(data);
            }
            this.listViewDrop.dataProvider = this.listViewItem;
            this.listViewIndex = this.listViewDrop.selectedIndex;
        };
        HXH_GroupFightDropInfo.prototype.showGoodsProperty = function (ev) {
            var a = ev.data;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        HXH_GroupFightDropInfo.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        HXH_GroupFightDropInfo.prototype.onButtonClose = function () {
            this.close(zj.Dialog.SHOW_FROM_TOP);
        };
        return HXH_GroupFightDropInfo;
    }(zj.Dialog));
    zj.HXH_GroupFightDropInfo = HXH_GroupFightDropInfo;
    __reflect(HXH_GroupFightDropInfo.prototype, "zj.HXH_GroupFightDropInfo");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightDropInfo.js.map