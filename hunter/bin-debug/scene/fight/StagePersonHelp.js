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
    var StagePersonHelp = (function (_super) {
        __extends(StagePersonHelp, _super);
        function StagePersonHelp(node, aiTag) {
            var _this = _super.call(this, node, aiTag) || this;
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP);
            _this.bHasHelped = false;
            return _this;
        }
        StagePersonHelp.prototype.loadHpDc = function () {
        };
        StagePersonHelp.prototype.beEffectHurt = function (effect, character, point) {
            //无敌状态
            return [false, 0];
        };
        StagePersonHelp.prototype.beHurtCommon = function (belongSkill, character, atkType, hurt, hitId, sizeTbl, priority, numX, numY, bTarget, point, effect) {
            var hurtValue = 0;
            this.dealHit(character, hitId, sizeTbl);
            this.dealHurtState(priority, hurt, character);
            return [true, hurtValue];
        };
        // public beTalentHurt( effect, character ){
        // }
        StagePersonHelp.prototype.openRageLimit = function () {
            this.SetAttrib("curRage", this.attribs.maxRage);
        };
        StagePersonHelp.prototype.finishSkill = function () {
            _super.prototype.finishSkill.call(this);
            this.setVisible(false);
            this.fightScene.endHelp();
        };
        StagePersonHelp.prototype.setHasHelped = function (tag) {
            this.bHasHelped = tag;
        };
        StagePersonHelp.prototype.isHasHelped = function (args) {
            return this.bHasHelped;
        };
        //设置发号使令武将
        StagePersonHelp.prototype.setSenderRole = function (role) {
            this.senderRole = role;
        };
        StagePersonHelp.prototype.isPlaySkillLegeal = function () {
            if (this.bPauseBlack == true) {
                return false;
            }
            return true;
        };
        return StagePersonHelp;
    }(zj.StagePerson));
    zj.StagePersonHelp = StagePersonHelp;
    __reflect(StagePersonHelp.prototype, "zj.StagePersonHelp");
})(zj || (zj = {}));
//# sourceMappingURL=StagePersonHelp.js.map