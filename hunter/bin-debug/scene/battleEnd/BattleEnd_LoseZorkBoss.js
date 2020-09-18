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
    var BattleEnd_LoseZorkBoss = (function (_super) {
        __extends(BattleEnd_LoseZorkBoss, _super);
        function BattleEnd_LoseZorkBoss() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_LoseZorkBossSkin.exml";
            _this.ui_name = "BattleEnd_LoseZorkBoss";
            _this.init();
            return _this;
        }
        BattleEnd_LoseZorkBoss.prototype.init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
        };
        BattleEnd_LoseZorkBoss.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.LabelHurt.text = Math.floor(1).toString(); //this.father.total;
        };
        BattleEnd_LoseZorkBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_LoseZorkBoss.prototype.UpdateLeagueBoss = function (tick) {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_LoseZorkBoss.prototype.onButtonGoOn = function () {
            this.QuitBossFight();
        };
        BattleEnd_LoseZorkBoss.prototype.FadeInGet = function () {
        };
        return BattleEnd_LoseZorkBoss;
    }(zj.BattleSettle));
    zj.BattleEnd_LoseZorkBoss = BattleEnd_LoseZorkBoss;
    __reflect(BattleEnd_LoseZorkBoss.prototype, "zj.BattleEnd_LoseZorkBoss");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseZorkBoss.js.map