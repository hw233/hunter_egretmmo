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
    //LeagueBossRankItem
    //yuqingchao
    //2019.03.06
    var LeagueBossRankItem = (function (_super) {
        __extends(LeagueBossRankItem, _super);
        function LeagueBossRankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBossRankItemSkin.exml";
            return _this;
        }
        LeagueBossRankItem.prototype.dataChanged = function () {
            var i = this.data.i;
            var info = this.data.info;
            var mem = zj.Table.FindR(zj.Game.PlayerLeagueSystem.Members, function (k, v) {
                if (v.monarchbase.id == info.roleId) {
                    return true;
                }
            });
            this.lbRank.text = info.rank.toString();
            if (mem != null) {
                this.lbName.text = mem[0].monarchbase.name.toString();
            }
            this.lbNum.text = info.value.toString();
        };
        return LeagueBossRankItem;
    }(eui.ItemRenderer));
    zj.LeagueBossRankItem = LeagueBossRankItem;
    __reflect(LeagueBossRankItem.prototype, "zj.LeagueBossRankItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossRankItem.js.map