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
    // 首领奖励
    // lizhengqiang
    // 20190325
    var WantedSecondBossDropInfo = (function (_super) {
        __extends(WantedSecondBossDropInfo, _super);
        function WantedSecondBossDropInfo() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondBossDropInfoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.setInfoList();
            return _this;
        }
        WantedSecondBossDropInfo.prototype.setInfoList = function () {
            var bossInfo = zj.PlayerWantedSystem.BossFloorReward();
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < bossInfo.length; i++) {
                arrCollection.addItem({ "index": i + 1, "info": bossInfo[i] });
            }
            this.lstViewDrop.dataProvider = arrCollection;
            this.lstViewDrop.itemRenderer = zj.WantedSecondBossDropInfoItem;
        };
        WantedSecondBossDropInfo.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        WantedSecondBossDropInfo.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        WantedSecondBossDropInfo.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return WantedSecondBossDropInfo;
    }(zj.Dialog));
    zj.WantedSecondBossDropInfo = WantedSecondBossDropInfo;
    __reflect(WantedSecondBossDropInfo.prototype, "zj.WantedSecondBossDropInfo");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondBossDropInfo.js.map