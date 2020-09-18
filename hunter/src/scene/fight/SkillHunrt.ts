namespace zj {



    export class SkillHurt {
        // body
        //public belong_skill = belong_skill
        public hurt_id = null
        public hurt_effect_type = TableEnum.TableHurtEffectType.TYPE_NONE
        public hurt_proof_value = 1

        public hurt_num_max = -1
        public hurt_gap_time = -1
        public hurt_stiff_time = 0
        public hurt_attacked_state = 0
        public attacked_displacement_id = -1
        public sound_id = -1
        public hurt_weight = 0

        public tableHurtRole = []
        public tableHurtTimeGaps = []

        public collide_frame = 0

        public hurt_collide_begin = null;

        public hurt_collide_end = null;

        constructor(id) {
            // body
            //this.belong_skill = belong_skill
            this.hurt_id = id
            this.hurt_effect_type = TableEnum.TableHurtEffectType.TYPE_NONE
            this.hurt_proof_value = 1

            this.hurt_num_max = -1
            this.hurt_gap_time = -1
            this.hurt_stiff_time = 0
            this.hurt_attacked_state = 0
            this.attacked_displacement_id = -1
            this.sound_id = -1
            this.hurt_weight = 0

            this.tableHurtRole = []
            this.tableHurtTimeGaps = []

            this.collide_frame = 0;
            this.tick = 0;
            this.init();
        }

        public release() {
            // body    
            this.cleanHurtBodys()
        }

        public init() {
            // body
            this.loadTable()
        }

        public loadTable() {
            // body  
            let tableHurt = TableSkillHurt.Table();
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
        }

        public addHurtOne(role) {
            // body
            //assert(role != null)  
            let beIn = Table.VIn(this.tableHurtRole, role.roleId)
            if (beIn == true) { return }
            this.tableHurtRole.push(role.roleId);
            if (this.hurt_gap_time != -1) {
                this.tableHurtTimeGaps.push(this.hurt_gap_time);
            }
        }

        public getSoundName() {
            // body
            if (this.sound_id == -1) {
                return null
            }
            let tableSound = TableClientSoundResource.Table();
            return tableSound[this.sound_id].sound_path
        }

        public canHurtOne(role) {
            // body
            //assert(role != null)	
            let roleCount = this.tableHurtRole.length
            let beIn = Table.VIn(this.tableHurtRole, role.roleId)
            if (this.hurt_num_max != -1) {
                if (roleCount >= this.hurt_num_max) {
                    return false
                } else {
                    if (beIn == true) {
                        return false
                    } else {
                        return true
                    }
                }
            } else {
                if (beIn == true) {
                    return false
                } else {
                    return true
                }
            }
        }

        public canStop() {
            // body	
            let roleCount = this.tableHurtRole.length
            if (this.hurt_num_max != -1) {
                if (roleCount >= this.hurt_num_max) {
                    return true
                }
            }
            return false
        }

        public cleanHurtBodys() {
            // body
            this.tableHurtRole = []
            this.tableHurtTimeGaps = []
        }

        public clearCollideInfo() {
            this.collide_frame = 0
            this.tick = 0;
        }
        // private frames60 = 1/60;
        // private frames30 = 1/30;
        private tick = 0;
        public update(tick) {
            // body
            // if(ConstantConfig_RoleBattle.DEFAULTFPS == 60){
            //     let num = this.frames60 / tick;
            //     this.collide_frame = this.collide_frame + (0.5 * num);
            // }else{
            //     let num = this.frames30 / tick;
            //     this.collide_frame = this.collide_frame + (1 * num);
            // }

            this.tick += Gmgr.Instance.battleSpeed;
            if (ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
                this.collide_frame += Gmgr.Instance.battleSpeed / 2;
            } else {
                this.collide_frame += Gmgr.Instance.battleSpeed;
            }


            if (this.hurt_gap_time == -1) { return }
            let time = 0
            let i = 0;
            while (i < this.tableHurtTimeGaps.length) {
                time = this.tableHurtTimeGaps[i]
                time = time - tick * 1000
                this.tableHurtTimeGaps[i] = time
                if (time <= 0) {
                    this.tableHurtTimeGaps.splice(i, 1);
                    this.tableHurtRole.splice(i, 1);
                } else {
                    i = i + 1
                }
            }
        }

        public getHurtId(...args) {
            // body
            return this.hurt_id
        }

        /*
        public getBelongSkill( ... ){
            // body
            return this.belong_skill
        }
        */

        public getHurtEffectType(...args) {
            // body
            return this.hurt_effect_type
        }

        public getProofValue(...args) {
            // body
            return this.hurt_proof_value
        }

        public getHurtRoleNum(...args) {
            // body
            return this.hurt_num_max
        }

        public getHurtBodysNum(...args) {
            // body	
            return this.tableHurtRole.length
        }

        public getAtkDisId(...args) {
            // body
            return this.attacked_displacement_id
        }

        public getHurtAtkState(...args) {
            // body
            return this.hurt_attacked_state
        }

        public getHurtStiffTime(...args) {
            // body
            return this.hurt_stiff_time
        }

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

        public beInCollideFrame() {
            let ret = false;
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
            return ret
        }

    }
}