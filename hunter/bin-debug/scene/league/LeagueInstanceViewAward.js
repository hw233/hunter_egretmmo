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
    // 公会-奖励预览
    // lizhengqiang
    // 20190103
    var LeagueInstanceViewAward = (function (_super) {
        __extends(LeagueInstanceViewAward, _super);
        function LeagueInstanceViewAward() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueInstanceViewAwardSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.setList();
            return _this;
        }
        LeagueInstanceViewAward.prototype.setList = function () {
            var instance = zj.Game.PlayerLeagueSystem.getAllInstance();
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = Object.keys(instance); _i < _a.length; _i++) {
                var v = _a[_i];
                arrCollection.addItem({
                    instance: instance[v],
                    father: this
                });
            }
            this.lstAward.itemRenderer = zj.LeagueInstanceViewAwardItemIR;
            this.lstAward.dataProvider = arrCollection;
        };
        LeagueInstanceViewAward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //鼠标抬起，移除  掉落 材料说明
        LeagueInstanceViewAward.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return LeagueInstanceViewAward;
    }(zj.Dialog));
    zj.LeagueInstanceViewAward = LeagueInstanceViewAward;
    __reflect(LeagueInstanceViewAward.prototype, "zj.LeagueInstanceViewAward");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueInstanceViewAward.js.map