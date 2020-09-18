var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillParticle = (function () {
        function SkillParticle(node, belong_role, id) {
            // 成员初始化    
            this.node = null;
            this.belong_role = null;
            this.particle_id = null;
            this.spx_id = 0;
            this.x = 0;
            this.y = 0;
            this.scale_x = 1;
            this.scale_y = 1;
            this.flip_x = false;
            this.continue_time = 0;
            this.b_blendActive = false;
            this.total_time = 0;
            this.b_finish = false;
            this.particle = null;
            // 成员初始化    
            this.node = node;
            this.belong_role = belong_role;
            this.particle_id = id;
            this.spx_id = 0;
            this.x = 0;
            this.y = 0;
            this.scale_x = 1;
            this.scale_y = 1;
            this.flip_x = false;
            this.continue_time = 0;
            this.b_blendActive = false;
            this.total_time = 0;
            this.b_finish = false;
            this.particle = null;
        }
        SkillParticle.prototype.release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	 
            this.node.removeChild(this.particle, true);
            this.particle = null;
            //this.belong_role = null
        };
        SkillParticle.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.loadTable();
            this.loadParticle();
            this.play();
        };
        SkillParticle.prototype.loadTable = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tableParticle = zj.TableClientSkillParticle.Table();
            this.spx_id = tableParticle[this.particle_id].source_id;
            var pos = tableParticle[this.particle_id].play_pos;
            this.x = pos[zj.adjustIndex(1)];
            this.y = pos[zj.adjustIndex(2)];
            var scale = tableParticle[this.particle_id].scale;
            this.scale_x = scale[zj.adjustIndex(1)];
            this.scale_y = scale[zj.adjustIndex(2)];
            this.flip_x = zj.turnBool(tableParticle[this.particle_id].flip_x);
            this.continue_time = tableParticle[this.particle_id].play_time;
            this.b_blendActive = zj.turnBool(tableParticle[this.particle_id].blend_active);
        };
        SkillParticle.prototype.loadParticle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            // wuzhi all
            /*let particle = resdb.Particle(this.spx_id)
            particle.setPositionType(cc.POSITION_TYPE_GROUPED)
            let dir = 1
            if( this.flip_x == true && this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_RIGHT ){
                //particle.setScaleX(-1)
                dir = -1
            }
            if( this.b_blendActive == true ){
                particle.setBlendAdditive(true)
            }
            particle.setScaleX(dir*this.scale_x)
            particle.setScaleY(this.scale_y)
    
            this.node.addChild(particle)
            this.particle = particle*/
        };
        SkillParticle.prototype.play = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body    
            this.particle.setPosition(new egret.Point(this.x, this.y / (zj.UIManager.StageWidth / 960)));
        };
        SkillParticle.prototype.update = function (tick) {
            // body	
            if (this.b_finish == true) {
                return;
            }
            var rt = tick * 1000;
            this.total_time = this.total_time + rt;
            if (this.total_time > this.continue_time) {
                this.b_finish = true;
            }
        };
        SkillParticle.prototype.getParticleId = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            //return this.buff_id
        };
        SkillParticle.prototype.getIsFinish = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.b_finish;
        };
        return SkillParticle;
    }());
    zj.SkillParticle = SkillParticle;
    __reflect(SkillParticle.prototype, "zj.SkillParticle");
})(zj || (zj = {}));
//# sourceMappingURL=SkillParticle.js.map