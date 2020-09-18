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
    // lizhengqiang
    // 20190103
    var LeagueInstanceViewAwardItemIR = (function (_super) {
        __extends(LeagueInstanceViewAwardItemIR, _super);
        function LeagueInstanceViewAwardItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueInstanceViewAwardItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueInstanceViewAwardItemIR"], null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueInstanceViewAwardItemIR.prototype.dataChanged = function () {
            var instance = this.data.instance;
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_League.leagueInstanceName[instance.instance_id], this);
            this.setList(instance);
        };
        LeagueInstanceViewAwardItemIR.prototype.setList = function (instance) {
            var bossGoods = instance.boss_goods;
            var bossCount = instance.boss_count;
            var father = this.data.father;
            if (bossGoods.length != 3 || bossGoods.length != 3)
                return;
            for (var i in bossGoods) {
                var arrCollection = new eui.ArrayCollection();
                for (var j in bossGoods[i]) {
                    arrCollection.addItem({ i: i, j: j, "goodsId": bossGoods[i][j], "count": bossCount[i][j], father: father });
                }
                if (Number(i) == 0) {
                    this.lstAward1.itemRenderer = zj.LeagueInstanceViewAwardItemItemIR;
                    this.lstAward1.dataProvider = arrCollection;
                }
                else if (Number(i) == 1) {
                    this.lstAward2.itemRenderer = zj.LeagueInstanceViewAwardItemItemIR;
                    this.lstAward2.dataProvider = arrCollection;
                }
                else if (Number(i) == 2) {
                    this.lstAward3.itemRenderer = zj.LeagueInstanceViewAwardItemItemIR;
                    this.lstAward3.dataProvider = arrCollection;
                }
            }
        };
        return LeagueInstanceViewAwardItemIR;
    }(eui.ItemRenderer));
    zj.LeagueInstanceViewAwardItemIR = LeagueInstanceViewAwardItemIR;
    __reflect(LeagueInstanceViewAwardItemIR.prototype, "zj.LeagueInstanceViewAwardItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueInstanceViewAeardItemIR.js.map