var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillHurt = (function () {
        function SkillHurt(id) {
            // body
            //public belong_skill = belong_skill
            this.hurt_id = null;
            this.hurt_effect_type = zj.TableEnum.TableHurtEffectType.TYPE_NONE;
            this.hurt_proof_value = 1;
            this.hurt_num_max = -1;
            this.hurt_gap_time = -1;
            this.hurt_stiff_time = 0;
            this.hurt_attacked_state = 0;
            this.attacked_displacement_id = -1;
            this.sound_id = -1;
            this.hurt_weight = 0;
            this.tableHurtRole = [];
            this.tableHurtTimeGaps = [];
            this.collide_frame = 0;
            this.hurt_collide_begin = null;
            this.hurt_collide_end = null;
            // private frames60 = 1/60;
            // private frames30 = 1/30;
            this.tick = 0;
            // body
            //this.belong_skill = belong_skill
            this.hurt_id = id;
            this.hurt_effect_type = zj.TableEnum.TableHurtEffectType.TYPE_NONE;
            this.hurt_proof_value = 1;
            this.hurt_num_max = -1;
            this.hurt_gap_time = -1;
            this.hurt_stiff_time = 0;
            this.hurt_attacked_state = 0;
            this.attacked_displacement_id = -1;
            this.sound_id = -1;
            this.hurt_weight = 0;
            this.tableHurtRole = [];
            this.tableHurtTimeGaps = [];
            this.collide_frame = 0;
            this.tick = 0;
            this.init();
        }
        SkillHurt.prototype.release = function () {
            // body    
            this.cleanHurtBodys();
        };
        SkillHurt.prototype.init = function () {
            // body
            this.loadTable();
        };
        SkillHurt.prototype.loadTable = function () {
            // body  
            var tableHurt = zj.TableSkillHurt.Table();
            this.hurt_collide_begin = (tableHurt[this.hurt_id].time[0]);
            this.hurt_collide_end = (tableHurt[this.hurt_id].time[1] + 5);
            this.hurt_effect_type = tableHurt[this.hurt_id].effect_type;
            this.hurt_proof_value = tableHurt[this.hurt_id].proof_value;
            this.hurt_num_max = tableHurt[this.hurt_id].role_num;
            this.hurt_gap_time = tableHurt[this.hurt_id].hurt_gap_time;
            this.hurt_stiff_time = tableHurt[this.hurt_id].stiff_time;
            this.hurt_attacked_state = tableHurt[this.hurt_id].attacked_state;
            this.attacked_displacement_id = tableHurt[this.hurt_id].attacked_displacement_id;
            this.sound_id = tableHurt[this.hurt_id].hurt_effect_sound_id;
            this.hurt_weight = tableHurt[this.hurt_id].hurt_weight;
        };
        SkillHurt.prototype.addHurtOne = function (role) {
            // body
            //assert(role != null)  
            var beIn = zj.Table.VIn(this.tableHurtRole, role.roleId);
            if (beIn == true) {
                return;
            }
            this.tableHurtRole.push(role.roleId);
            if (this.hurt_gap_time != -1) {
                this.tableHurtTimeGaps.push(this.hurt_gap_time);
            }
        };
        SkillHurt.prototype.getSoundName = function () {
            // body
            if (this.sound_id == -1) {
                return null;
            }
            var tableSound = zj.TableClientSoundResource.Table();
            return tableSound[this.sound_id].sound_path;
        };
        SkillHurt.prototype.canHurtOne = function (role) {
            // body
            //assert(role != null)	
            var roleCount = this.tableHurtRole.length;
            var beIn = zj.Table.VIn(this.tableHurtRole, role.roleId);
            if (this.hurt_num_max != -1) {
                if (roleCount >= this.hurt_num_max) {
                    return false;
                }
                else {
                    if (beIn == true) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                if (beIn == true) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
        SkillHurt.prototype.canStop = function () {
            // body	
            var roleCount = this.tableHurtRole.length;
            if (this.hurt_num_max != -1) {
                if (roleCount >= this.hurt_num_max) {
                    return true;
                }
            }
            return false;
        };
        SkillHurt.prototype.cleanHurtBodys = function () {
            // body
            this.tableHurtRole = [];
            this.tableHurtTimeGaps = [];
        };
        SkillHurt.prototype.clearCollideInfo = function () {
            this.collide_frame = 0;
            this.tick = 0;
        };
        SkillHurt.prototype.update = function (tick) {
            // body
            // if(ConstantConfig_RoleBattle.DEFAULTFPS == 60){
            //     let num = this.frames60 / tick;
            //     this.collide_frame = this.collide_frame + (0.5 * num);
            // }else{
            //     let num = this.frames30 / tick;
            //     this.collide_frame = this.collide_frame + (1 * num);
            // }
            this.tick += zj.Gmgr.Instance.battleSpeed;
            if (zj.ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
                this.collide_frame += zj.Gmgr.Instance.battleSpeed / 2;
            }
            else {
                this.collide_frame += zj.Gmgr.Instance.battleSpeed;
            }
            if (this.hurt_gap_time == -1) {
                return;
            }
            var time = 0;
            var i = 0;
            while (i < this.tableHurtTimeGaps.length) {
                time = this.tableHurtTimeGaps[i];
                time = time - tick * 1000;
                this.tableHurtTimeGaps[i] = time;
                if (time <= 0) {
                    this.tableHurtTimeGaps.splice(i, 1);
                    this.tableHurtRole.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        SkillHurt.prototype.getHurtId = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_id;
        };
        /*
        public getBelongSkill( ... ){
            // body
            return this.belong_skill
        }
        */
        SkillHurt.prototype.getHurtEffectType = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_effect_type;
        };
        SkillHurt.prototype.getProofValue = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_proof_value;
        };
        SkillHurt.prototype.getHurtRoleNum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_num_max;
        };
        SkillHurt.prototype.getHurtBodysNum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	
            return this.tableHurtRole.length;
        };
        SkillHurt.prototype.getAtkDisId = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.attacked_displacement_id;
        };
        SkillHurt.prototype.getHurtAtkState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_attacked_state;
        };
        SkillHurt.prototype.getHurtStiffTime = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.hurt_stiff_time;
        };
        /*public getSoundName( ... ){
            // body
            if( this.sound_id == -1 ){
                return null
            }
            let tableSound = CSV.GetTable(StringConfig_Table.soundRes)
            if( tableSound[this.sound_id] == null ){
                cclog("sound is ! found  id=="..this.sound_id)
                return null
            }
            return tableSound[this.sound_id].sound_path
        }*/
        SkillHurt.prototype.beInCollideFrame = function () {
            var ret = false;
            // let frames30 = 1/30;
            // let scene = StageSceneManager.Instance.GetCurScene();
            // let num = scene.tick/frames30;
            // this.collide_frame = this.tick * num;
            //this.collide_frame = this.collide_frame/2;
            if (this.hurt_collide_begin != null && this.hurt_collide_end != null) {
                if (this.collide_frame >= (this.hurt_collide_begin) && this.collide_frame <= (this.hurt_collide_end)) {
                    ret = true;
                }
            }
            return ret;
        };
        return SkillHurt;
    }());
    zj.SkillHurt = SkillHurt;
    __reflect(SkillHurt.prototype, "zj.SkillHurt");
})(zj || (zj = {}));
//# sourceMappingURL=SkillHunrt.js.map