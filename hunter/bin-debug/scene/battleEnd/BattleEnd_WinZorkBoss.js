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
    var BattleEnd_WinZorkBoss = (function (_super) {
        __extends(BattleEnd_WinZorkBoss, _super);
        function BattleEnd_WinZorkBoss() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinZorkBossSkin.exml";
            _this.ui_name = "BattleEnd_WinZorkBoss";
            _this.init();
            return _this;
        }
        BattleEnd_WinZorkBoss.prototype.init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
        };
        BattleEnd_WinZorkBoss.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.LabelHurt.text = Math.floor(1).toString(); //this.father.total;
        };
        BattleEnd_WinZorkBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_WinZorkBoss.prototype.UpdateLeagueBoss = function (tick) {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_WinZorkBoss.prototype.onButtonGoOn = function () {
            this.QuitBossFight();
        };
        BattleEnd_WinZorkBoss.prototype.FadeInGet = function () {
        };
        return BattleEnd_WinZorkBoss;
    }(zj.BattleSettle));
    zj.BattleEnd_WinZorkBoss = BattleEnd_WinZorkBoss;
    __reflect(BattleEnd_WinZorkBoss.prototype, "zj.BattleEnd_WinZorkBoss");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinZorkBoss.js.map