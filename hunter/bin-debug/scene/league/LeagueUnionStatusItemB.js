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
    var LeagueUnionStatusItemB = (function (_super) {
        __extends(LeagueUnionStatusItemB, _super);
        function LeagueUnionStatusItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionStatusItem1Skin.exml";
            return _this;
        }
        LeagueUnionStatusItemB.prototype.dataChanged = function () {
            var i = this.data.i;
            var info = this.data.info;
            var ht = this.data.height;
            this.scrollerItem.height = ht;
            this.groupItem.height = ht;
            this.skin.height = ht;
            var str = zj.TextsConfig.TextsConfig_Match.flyName[i];
            this.lbPosition.textFlow = zj.Util.RichText(str);
            this.lbPosition.y = ht / 2;
            this.arrayCollection = new eui.ArrayCollection();
            for (var i_1 = 0; i_1 < info.length; i_1++) {
                this.arrayCollection.addItem({
                    i: i_1,
                    info: info[i_1]
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.LeagueUnionStatusItemBA;
        };
        return LeagueUnionStatusItemB;
    }(eui.ItemRenderer));
    zj.LeagueUnionStatusItemB = LeagueUnionStatusItemB;
    __reflect(LeagueUnionStatusItemB.prototype, "zj.LeagueUnionStatusItemB");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionStatusItemB.js.map