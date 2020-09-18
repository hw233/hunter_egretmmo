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
    // 福利-升级奖励
    // lizhengqiang
    // 20190323
    var ActivitySpecialLevelUp = (function (_super) {
        __extends(ActivitySpecialLevelUp, _super);
        function ActivitySpecialLevelUp() {
            var _this = _super.call(this) || this;
            _this.setList = function () {
                var tbl = zj.Game.PlayerMissionSystem.listSpecial();
                var arrCollection = new eui.ArrayCollection();
                for (var i = 0; i < tbl.length; i++) {
                    var info = tbl[i].index < tbl.length ? tbl[tbl[i].index] : null;
                    arrCollection.addItem({
                        info: info,
                        tbl: tbl[i],
                        father: _this
                    });
                }
                _this.lstAward.dataProvider = arrCollection;
                _this.lstAward.itemRenderer = zj.ActivitySpecialLevelUpItem;
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialLevelUpSkin.exml";
            return _this;
        }
        ActivitySpecialLevelUp.prototype.init = function () {
            this.lbCurrencyLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.baselevel, zj.Game.PlayerInfoSystem.BaseInfo.level));
            this.setList();
        };
        ActivitySpecialLevelUp.prototype.cb = function (cb) {
            if (cb) {
                this.cb1 = cb;
            }
            else {
                if (this.cb1) {
                    this.cb1();
                }
            }
        };
        return ActivitySpecialLevelUp;
    }(zj.UI));
    zj.ActivitySpecialLevelUp = ActivitySpecialLevelUp;
    __reflect(ActivitySpecialLevelUp.prototype, "zj.ActivitySpecialLevelUp");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialLevelUp.js.map