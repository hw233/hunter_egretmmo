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
     * @class Activity_BossMainAwardItem
     *
     * @author Yu Qingchao
     *
     * 2019.07.20
     */
    var Activity_BossMainAwardItem = (function (_super) {
        __extends(Activity_BossMainAwardItem, _super);
        function Activity_BossMainAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_BossMainAwardItemSkin.exml";
            return _this;
        }
        Activity_BossMainAwardItem.prototype.dataChanged = function () {
            var good = this.data.info;
            var bln = this.data.bln;
            var itemSet = zj.PlayerItemSystem.Set(good.goodsId, good.showType, good.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imgLogo.source = zj.cachekey(itemSet.Logo, this);
            this.lbNum.text = "X" + good.count;
            if (bln) {
                this.scaleX = 0.8;
                this.scaleY = 0.8;
            }
        };
        return Activity_BossMainAwardItem;
    }(eui.ItemRenderer));
    zj.Activity_BossMainAwardItem = Activity_BossMainAwardItem;
    __reflect(Activity_BossMainAwardItem.prototype, "zj.Activity_BossMainAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossMainAwardItem.js.map