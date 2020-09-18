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
    var AiBrainYH = (function (_super) {
        __extends(AiBrainYH, _super);
        function AiBrainYH(role, id) {
            return _super.call(this, role, id) || this;
        }
        AiBrainYH.prototype.startHelp = function () {
            this.fightScene.startHelpYH(this.role);
        };
        AiBrainYH.prototype.update = function (tick) {
            _super.prototype.update.call(this, tick);
        };
        AiBrainYH.prototype.updateHelp = function () {
            if (this.role.getRage() < this.role.getMaxRage()) {
                return;
            }
            if (!this.role.isPlaySkillLegeal()) {
                return;
            }
            if (this.fightScene.checkAllEnemyDead()) {
                return;
            }
            if (this.role.bPauseBlack) {
                return;
            }
            if (this.fightScene.checkOppAnyReady(this.role.bEnemy) == false) {
                return;
            }
            this.dealHelp();
        };
        return AiBrainYH;
    }(zj.AiBrain));
    zj.AiBrainYH = AiBrainYH;
    __reflect(AiBrainYH.prototype, "zj.AiBrainYH");
})(zj || (zj = {}));
//# sourceMappingURL=AiBrainYH.js.map