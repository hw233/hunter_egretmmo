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
    //LeagueBossInfoAwardItem
    //yuqingchao
    //2019.03.06
    var LeagueBossInfoAwardItem = (function (_super) {
        __extends(LeagueBossInfoAwardItem, _super);
        function LeagueBossInfoAwardItem() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.goodsId = 0;
            _this.skinName = "resource/skins/league/LeagueBossInfoAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueBossInfoAwardItem"], null);
            _this.groupAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        LeagueBossInfoAwardItem.prototype.dataChanged = function () {
            this.goodsId = this.data.goodsId;
            this.i = this.data.i;
            this.imgBoard.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.goodsId), this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.goodsId), this);
        };
        LeagueBossInfoAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return LeagueBossInfoAwardItem;
    }(eui.ItemRenderer));
    zj.LeagueBossInfoAwardItem = LeagueBossInfoAwardItem;
    __reflect(LeagueBossInfoAwardItem.prototype, "zj.LeagueBossInfoAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossInfoAwardItem.js.map