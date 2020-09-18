var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillHit = (function () {
        function SkillHit() {
            // 成员初始化
            this.node = null;
            this.role = null;
            this.hit_id = null;
            this.x = 0;
            this.y = 0;
            this.spx_id = 0;
            this.action_id = 0;
            this.play_speed = 1.0;
            this.b_blendActive = false;
            this.b_finish = false;
            this.b_crit = false;
            this.scale = null;
            // 加载ani
        }
        SkillHit.prototype.release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            // wuzhi all
            /*if( tolua.isnull(this.node) == false ){
                this.node.removeChild(this.spx, true)
                this.spx = null
            }*/
            if (this.spx) {
                this.spx.clearSpine();
                this.spx = null;
            }
            zj.Game.ObjectPool.returnItem("SkillHit", this);
        };
        SkillHit.prototype.setInfo = function (node, role, id, scale) {
            // 成员初始化
            this.node = node;
            this.role = role;
            this.hit_id = id;
            this.scale = scale;
            this.init();
        };
        SkillHit.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.x = 0;
            this.y = 0;
            this.spx_id = 0;
            this.action_id = 0;
            this.play_speed = 1.0;
            this.b_blendActive = false;
            this.b_finish = false;
            this.spx = null;
            this.b_crit = false;
            // body
            this.loadTable();
            this.loadSpx();
        };
        SkillHit.prototype.loadTable = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tableHit = zj.TableClientSkillHiteffect.Table(); //CSV.GetTable(StringConfig_Table.skillHitEffect)
            this.spx_id = tableHit[this.hit_id].effects_spx_id;
            this.action_id = tableHit[this.hit_id].effects_action_id;
            var tag = tableHit[this.hit_id].blend_active;
            this.b_blendActive = zj.getBoolean(tag);
        };
        SkillHit.prototype.loadSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.spx) {
                this.spx.clearSpine();
                this.spx = null;
            }
            // wu zhi
            var _a = zj.HunterSpineX(this.spx_id, zj.Gmgr.Instance.spineX_scale), s = _a[0], order = _a[1];
            this.spx = s;
            this.spx.SetScale(this.scale);
            this.spx.SetAutoUpdate(false);
            this.spx.setVisibleSpx(false);
            this.node.addChild(this.spx.spine);
        };
        SkillHit.prototype.playSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.b_blendActive == true) {
                this.spx.setBlendAdditive(true);
            }
            this.spx.SetPosition(this.x, this.y);
            this.spx.stopAllActions();
            this.spx.setVisibleSpx(true);
            this.spx.SetLoop(false);
            this.spx.ChangeAction(this.action_id);
        };
        SkillHit.prototype.update = function (tick) {
            // body	
            this.updateSpineX(tick);
            this.updateEndBody(tick);
        };
        SkillHit.prototype.setPosition = function (x, y) {
            // body	
            this.x = x;
            this.y = y;
            if (this.spx != null) {
                this.spx.SetPosition(this.x, this.y);
            }
        };
        SkillHit.prototype.getEffectSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.spx;
        };
        SkillHit.prototype.getIsFinish = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.b_finish;
        };
        SkillHit.prototype.getRole = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.role;
        };
        SkillHit.prototype.getHitId = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hit_id;
        };
        SkillHit.prototype.updateSpineX = function (tick) {
            // body
            if (this.spx != null) {
                this.spx.UpdataAni(tick);
            }
        };
        SkillHit.prototype.updateEndBody = function (tick) {
            // body    
            if (this.b_finish == true) {
                return;
            }
            if (this.spx.IsActEnd()) {
                this.b_finish = true;
            }
        };
        return SkillHit;
    }());
    zj.SkillHit = SkillHit;
    __reflect(SkillHit.prototype, "zj.SkillHit");
})(zj || (zj = {}));
//# sourceMappingURL=SkillHit.js.map