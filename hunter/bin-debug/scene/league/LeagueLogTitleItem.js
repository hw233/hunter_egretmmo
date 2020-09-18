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
    //公会日志中的日期
    //yuqingchao
    //2018.12.27
    var LeagueLogTitleItem = (function (_super) {
        __extends(LeagueLogTitleItem, _super);
        function LeagueLogTitleItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueLogTitleItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueLogTitleItem.prototype.init = function (father) {
            this.father = father;
        };
        LeagueLogTitleItem.prototype.dataChanged = function () {
            var timeTbl = this.data.timeTblnew;
            var des = "";
            //日期显示的格式
            if (timeTbl.M >= 10) {
                if (timeTbl.D >= 10)
                    des = "%d-%d-%d";
                else
                    des = "%d-%d-" + "0" + "%d";
            }
            else {
                if (timeTbl.D >= 10)
                    des = "%d-" + "0" + "%d-%d";
                else
                    des = "%d-" + "0" + "%d-" + "0" + "%d";
            }
            this.lbDate.text = zj.HelpUtil.textConfigFormat(des, timeTbl.Y, timeTbl.M, timeTbl.D);
        };
        return LeagueLogTitleItem;
    }(eui.ItemRenderer));
    zj.LeagueLogTitleItem = LeagueLogTitleItem;
    __reflect(LeagueLogTitleItem.prototype, "zj.LeagueLogTitleItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueLogTitleItem.js.map