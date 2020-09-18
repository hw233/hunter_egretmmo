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
    //ActivityUplevelActivityPopItem
    //yuqingchao
    //2019.04.01
    var ActivityUplevelActivityPopItem = (function (_super) {
        __extends(ActivityUplevelActivityPopItem, _super);
        function ActivityUplevelActivityPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityUplevelActivityPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityUplevelActivityPopItem"], null);
            return _this;
        }
        ActivityUplevelActivityPopItem.prototype.dataChanged = function () {
            var info = this.data.info;
            var i = this.data.i + 1;
            var find = this.data.find;
            if (info != null) {
                this.lbName.text = info.name;
                this.lbTime.text = info.rewardTime;
            }
            else {
                this.lbName.text = zj.TextsConfig.TextsConfig_Activity.Rank_Charge.nobody;
                this.lbTime.text = "";
            }
            this.lbLevel.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.uplevelRank, i);
            this.imgAwardRank.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.levelRank[find], this);
        };
        return ActivityUplevelActivityPopItem;
    }(eui.ItemRenderer));
    zj.ActivityUplevelActivityPopItem = ActivityUplevelActivityPopItem;
    __reflect(ActivityUplevelActivityPopItem.prototype, "zj.ActivityUplevelActivityPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityUplevelActivityPopItem.js.map