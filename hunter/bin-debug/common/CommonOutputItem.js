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
     * @author chen xi.
     *
     * @date 2019-1-9
     */
    var CommonOutputItem = (function (_super) {
        __extends(CommonOutputItem, _super);
        function CommonOutputItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonOutputItemSkin.exml";
            return _this;
        }
        CommonOutputItem.prototype.dataChanged = function () {
            var info = this.data;
            if (info == null) {
                throw Error("info should not null.");
            }
            this.imgIcon.source = zj.cachekey(info.path, this);
            this.labelName.text = info.name;
            var bOpen = zj.Game.PlayerMissionSystem.Open(info.index);
            this.labelInfo.text = bOpen ? info.info : info.open;
            this.imgGo.visible = bOpen;
            this.labelNotOpen.visible = !bOpen;
        };
        return CommonOutputItem;
    }(eui.ItemRenderer));
    zj.CommonOutputItem = CommonOutputItem;
    __reflect(CommonOutputItem.prototype, "zj.CommonOutputItem");
})(zj || (zj = {}));
//# sourceMappingURL=CommonOutputItem.js.map