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
    var BattleEnd_WinWanted = (function (_super) {
        __extends(BattleEnd_WinWanted, _super);
        function BattleEnd_WinWanted() {
            return _super.call(this) || this;
        }
        return BattleEnd_WinWanted;
    }(zj.Dialog));
    zj.BattleEnd_WinWanted = BattleEnd_WinWanted;
    __reflect(BattleEnd_WinWanted.prototype, "zj.BattleEnd_WinWanted");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinWanted.js.map