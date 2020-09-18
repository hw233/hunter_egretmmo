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
    // Activity_BossItem
    //yuqingchao
    //2019.07.19
    var Activity_BossItem = (function (_super) {
        __extends(Activity_BossItem, _super);
        function Activity_BossItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_BossItemSkin.exml";
            return _this;
        }
        Activity_BossItem.prototype.dataChanged = function () {
            var info = this.data.info;
            this.lbName.text = info.roleName;
            this.lbText.text = info.rank;
            this.lbValue.text = info.score;
        };
        return Activity_BossItem;
    }(eui.ItemRenderer));
    zj.Activity_BossItem = Activity_BossItem;
    __reflect(Activity_BossItem.prototype, "zj.Activity_BossItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossItem.js.map