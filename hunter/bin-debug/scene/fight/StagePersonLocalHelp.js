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
    /**援助类,继承人物类 */
    var StagePersonLocalHelp = (function (_super) {
        __extends(StagePersonLocalHelp, _super);
        function StagePersonLocalHelp(node, aiTag) {
            var _this = _super.call(this, node, aiTag) || this;
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP);
            _this.senderRole = null;
            _this.bHasHelped = false;
            return _this;
        }
        StagePersonLocalHelp.prototype.loadHpDc = function () {
        };
        StagePersonLocalHelp.prototype.beEffectHurt = function (effect, character, point) {
            return [false, 0];
        };
        StagePersonLocalHelp.prototype.beHurtCommon = function (belongSkill, character, atkType, hurt, hitId, sizeTbl, priority, numX, numY, bTarget, point, effect) {
            var hurtValue = 0;
            this.dealHit(character, hitId, sizeTbl);
            this.dealHurtState(priority, hurt, character);
            return [true, hurtValue];
        };
        StagePersonLocalHelp.prototype.beRebounded = function (atkType, hurtValue, character) {
        };
        StagePersonLocalHelp.prototype.openRageLimit = function () {
            this.SetAttrib("curRage", this.attribs.maxRage);
        };
        StagePersonLocalHelp.prototype.finishSkill = function () {
            _super.prototype.finishSkill.call(this);
            this.setVisible(false);
            this.fightScene.endHelp();
        };
        StagePersonLocalHelp.prototype.setHasHelped = function (tag) {
            this.bHasHelped = tag;
        };
        StagePersonLocalHelp.prototype.isHasHelped = function () {
            return this.bHasHelped;
        };
        //设置发号使令武将
        StagePersonLocalHelp.prototype.setSenderRole = function (role) {
            this.senderRole = role;
        };
        StagePersonLocalHelp.prototype.isPlaySkillLegeal = function () {
            if (this.bPauseBlack == true) {
                return false;
            }
            return true;
        };
        return StagePersonLocalHelp;
    }(zj.StagePersonLocal));
    zj.StagePersonLocalHelp = StagePersonLocalHelp;
    __reflect(StagePersonLocalHelp.prototype, "zj.StagePersonLocalHelp");
})(zj || (zj = {}));
//# sourceMappingURL=StagePersonLocalHelp.js.map