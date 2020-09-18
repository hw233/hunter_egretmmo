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
    // Common_DesRelic
    // hexiaowei 
    // 2019/03/14
    var Common_DesRelic = (function (_super) {
        __extends(Common_DesRelic, _super);
        function Common_DesRelic() {
            var _this = _super.call(this) || this;
            _this.selectedIndex = 0;
            _this.skinName = "resource/skins/common/Common_DesRelicSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoods, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoods, _this);
            }, null);
            return _this;
        }
        Common_DesRelic.prototype.setInfoActivity = function (goods) {
            // for(const k in goods){
            //     let item = 
            // }
            this.listViewAward.selectedIndex = 0; // 默认选中
            this.listViewAward.itemRenderer = zj.Common_AwardItem; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in goods) {
                var v = goods[k];
                var data = new zj.Common_AwardItemData();
                data.index = Number(k);
                data.goodInfo = v;
                data.father = this;
                this.selectedItem.addItem(data);
            }
            this.listViewAward.dataProvider = this.selectedItem;
            this.selectedIndex = this.listViewAward.selectedIndex;
        };
        Common_DesRelic.prototype.showGoods = function (ev) {
            var a = zj.Game.UIManager.dialogCount();
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "showgoods";
            this.addChild(show);
        };
        Common_DesRelic.prototype.removeShow = function () {
            var show = this.getChildByName("showgoods");
            if (show) {
                this.removeChild(show);
            }
        };
        Common_DesRelic.prototype.onButtonClose = function () {
            this.close();
        };
        return Common_DesRelic;
    }(zj.Dialog));
    zj.Common_DesRelic = Common_DesRelic;
    __reflect(Common_DesRelic.prototype, "zj.Common_DesRelic");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesRelic.js.map