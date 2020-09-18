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
    //Activity_BossMainPopHitItem
    //yuqingchao
    //2019.07.16 
    var Activity_BossMainPopHitItem = (function (_super) {
        __extends(Activity_BossMainPopHitItem, _super);
        function Activity_BossMainPopHitItem() {
            var _this = _super.call(this) || this;
            _this.skinName = _this.skinName = "resource/skins/activity/Activity_BossMainPopHitItemSkin.exml";
            return _this;
        }
        Activity_BossMainPopHitItem.prototype.dataChanged = function () {
            var info = this.data.info;
            var i = this.data.i;
            this.lbName.text = info.roleName;
            this.lbRank.text = info.rank;
            this.lbHit.text = info.score;
            var sn = zj.Set.DecodeJson(info.groupName);
            var splitList = sn.split("&");
            this.lbServer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesBoss, splitList[0]);
        };
        return Activity_BossMainPopHitItem;
    }(eui.ItemRenderer));
    zj.Activity_BossMainPopHitItem = Activity_BossMainPopHitItem;
    __reflect(Activity_BossMainPopHitItem.prototype, "zj.Activity_BossMainPopHitItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossMainPopHitItem.js.map