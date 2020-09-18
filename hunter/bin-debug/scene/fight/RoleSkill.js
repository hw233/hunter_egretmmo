var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var RoleSkill = (function () {
        function RoleSkill(belong_role, skillInfo) {
            // body	
            this.belong_role = null;
            this.skillInfo = null;
            this.skill_id = null;
            this.level = null;
            this.cur_counter = 0;
            this.b_finish = true;
            this.next_dir = zj.TableEnum.TableEnumDir.Dir_None;
            this.skill_type = message.ESkillType.SKILL_TYPE_NONE;
            this.skill_damage_type = message.EDamageType.DAMAGE_TYPE_NONE;
            this.skill_order = -1;
            this.skill_cd = 0;
            this.skill_cd_entry = 0;
            this.skill_consume_rage = 0;
            this.skill_delay_time = 0;
            this.skill_ai_type = 0;
            this.continue_time = -1;
            this.hurt_ratio = 0;
            this.hurt_extra_value = 0;
            this.relate_value = 0;
            this.relate_still_effect = -1;
            //public base_value = 0
            //public skill_gain_target = -1    
            this.skill_name = null;
            this.skill_name_path = null;
            this.skill_icon_path = null;
            this.tableSkills = [];
            this.tableExtraEffect = [];
            this.tableKeepingTalent = [];
            this.varyCode = 0;
            this.promoteLevel = 0;
            this.b_breakTag = false;
            this.tableHurtInfo = {};
            this.onlyId = -1;
            this.belong_role = belong_role;
            this.skillInfo = skillInfo;
            this.skill_id = skillInfo.id;
            this.level = skillInfo.level;
            this.init();
        }
        RoleSkill.prototype.init = function () {
            zj.Gmgr.Instance.skillOnlyId += 1;
            this.onlyId = zj.Gmgr.Instance.skillOnlyId;
            // body	
            this.loadTable();
            this.cptContinueTime();
            this.cptSkillValue();
            this.initCurSkills();
        };
        RoleSkill.prototype.loadTable = function () {
            // body
            var instance = zj.PlayerSkillSystem.Table(this.skill_id);
            this.skill_type = instance.skill_big_type;
            this.skill_damage_type = instance.skill_damage_type;
            this.skill_order = instance.skill_order;
            this.skill_consume_rage = instance.skill_consume_rage;
            // 速度转时间
            //this.skill_cd = instance.skill_cd
            this.skill_cd = zj.speedTranToCd(this.belong_role.getCdSpeed());
            // 速度转时间
            //this.skill_cd_entry = instance.skill_cd_entry
            this.skill_cd_entry = zj.speedTranToEntry(this.belong_role.getCdSpeed());
            this.skill_delay_time = instance.skill_delay_time;
            this.skill_ai_type = instance.skill_ai_type;
            //this.skill_gain_target = instance.skill_gain  
            this.skill_name = instance.skill_name;
            this.skill_name_path = instance.skill_name_path;
            this.skill_icon_path = instance.path;
            this["skill_name2_path_s"] = instance.skill_name2_path_s;
            this.relate_still_effect = instance.relate_still_effect;
            var extra_effect = instance.extra_effect;
            for (var i = zj.adjustIndex(1); i < extra_effect.length; i++) {
                var tbl = extra_effect[i];
                var type = tbl[zj.adjustIndex(1)];
                if (type != null && type != -1) {
                    if (this.tableExtraEffect[type] == null) {
                        this.tableExtraEffect[type] = [];
                    }
                    var info = {};
                    info["condation"] = tbl[zj.adjustIndex(2)];
                    info["value"] = tbl[zj.adjustIndex(3)];
                    this.tableExtraEffect[type].push(info);
                }
            }
        };
        RoleSkill.prototype.targetStill = function (args) {
            // body
            if (this.relate_still_effect > 0) {
                var info = zj.PlayerSkillSystem.EffectInfo(this.relate_still_effect);
                if (info == null) {
                    return;
                }
                if (info.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET) {
                    //let target = getEffectTargetId( this.relate_still_effect )
                    var fightScene = zj.StageSceneManager.Instance.GetCurScene();
                    var players = fightScene.getTargetPlayer(this.belong_role, info.effect_target_pos, info.effect_target);
                    fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players);
                }
            }
            else {
                var fightScene = zj.StageSceneManager.Instance.GetCurScene();
                if (this.relate_still_effect == 0) {
                    var players = fightScene.getTargetPlayer(this.belong_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_ALL);
                    fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players);
                }
                else if (this.relate_still_effect == -1) {
                    var players = fightScene.getTargetPlayer(this.belong_role, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_ALL);
                    fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players);
                }
            }
            //let effect_skill_type = getEffectSkillTypeById( this.relate_still_effect )         
        };
        RoleSkill.prototype.update = function (tick) {
            // body
            if (this.b_finish) {
                return;
            }
            var tableSize = this.tableSkills.length;
            var curSkill = this.tableSkills[this.cur_counter + 0];
            var finishTag = curSkill.getIsFinish();
            if (finishTag) {
                var nextCnt = this.cur_counter + 1;
                if (nextCnt >= tableSize) {
                    this.cur_counter = 0;
                    this.b_finish = true;
                    //this.dealAtkDodge()
                    //this.belong_role.backOriginalTeam()
                    //this.belong_role.backHoming()
                }
                else {
                    this.playNextSkill(nextCnt);
                }
            }
            else {
                curSkill.update(tick);
            }
        };
        RoleSkill.prototype.release = function () {
            var i = 0;
            while (i < this.tableSkills.length) {
                zj.CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            this.tableSkills = [];
            this.tableExtraEffect = [];
            this.tableKeepingTalent = [];
            this.tableHurtInfo = [];
        };
        RoleSkill.prototype.playNextSkill = function (nextCnt) {
            // body
            this.cur_counter = nextCnt;
            //this.changeDir()
            this.tableSkills[this.cur_counter + zj.adjustIndex(1)].playSkill();
        };
        RoleSkill.prototype.endCurSkill = function () {
            var curUnit = this.tableSkills[this.cur_counter + zj.adjustIndex(1)];
            if (curUnit != null) {
                curUnit.endUnit();
            }
        };
        RoleSkill.prototype.playRoleSkill = function () {
            // body
            var tag = false;
            var tableSize = this.tableSkills.length;
            if (tableSize == 0) {
                tag = false;
            }
            else {
                this.cur_counter = 0;
                this.b_finish = false;
                this.b_breakTag = false;
                this.tableKeepingTalent = [];
                this.tableSkills[this.cur_counter + zj.adjustIndex(1)].playSkill();
                this.tableSkills[this.cur_counter + zj.adjustIndex(1)].startLookBegin();
                tag = true;
                /*
                if( this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE && this.belong_role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP ){
                    let temp = this.belong_role.getSupportConsume()
                    if( this.belong_role.relySupportRole != null ){
                        this.belong_role.relySupportRole.dealCutRage(temp)
                    }
                }
                */
                // 必杀消耗
                /*
                if( this.skill_type == message.ESkillType.SKILL_TYPE_DEATH ){
                    //let temp = this.skill_consume_rage
                    let temp = this.getRageConsume()
                    let tag, value = this.belong_role.handleTalentEffect_LeiTing()
                    if( tag == true ){
                        temp = temp * (100 - value) / 100
                    }
                    this.belong_role.dealCutRage(temp)
                    //this.belong_role.reduceRage( temp )
                    //this.belong_role.playAnimation(this, -temp, TableEnumCommonCosume.CONSUME_TYPE_MP)
                }
                */
            }
            return tag;
        };
        RoleSkill.prototype.cleanCurSkills = function () {
            // body
            var i = zj.adjustIndex(1);
            while (i < this.tableSkills.length) {
                zj.CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            //clearTable(this.tableSkills)
            this.tableSkills = [];
        };
        RoleSkill.prototype.initCurSkills = function () {
            // body		
            if (this.skill_id == -1) {
                return;
            }
            var instance = zj.PlayerSkillSystem.Table(this.skill_id);
            var stepId = null; //instance.skill_init_step_id
            if (this.skillInfo.level == 0 && stepId == -1) {
                return;
            }
            this.dealOrigin();
        };
        RoleSkill.prototype.dealOrigin = function () {
            // body
            this.cleanCurSkills();
            var instance = zj.PlayerSkillSystem.Table(this.skill_id);
            /*
            let index = instance.skill_init_step_id
            let tableSkillStep = CSV.GetTable(StringConfig_Table.skillStep)
            let tableStep = tableSkillStep[index]
        
            if( tableStep != null ){
                let tableStepForm = tableStep.skill_step_form
                let formSize = tablelen(tableStepForm)
                for i=1,formSize do
                    let skillUnit = SkillUnit.new(this.belong_role, this, tableStepForm[i])
                    table.insert(this.tableSkills, skillUnit)
                }
            }
            */
            //instance
            var unitSize = instance.skill_units.length;
            for (var i = zj.adjustIndex(1); i < unitSize; i++) {
                var skillUnit = new zj.SkillUnit(this.belong_role, this, instance.skill_units[i]);
                this.tableSkills.push(skillUnit);
            }
        };
        RoleSkill.prototype.addHurtOne = function (role) {
            // body
            //assert( role != null )
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                this.tableSkills[this.cur_counter + zj.adjustIndex(1)].addHurtOne(role);
            }
        };
        RoleSkill.prototype.canHurtOne = function (role) {
            // body
            //assert( role != null )
            var tag = false;
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                tag = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].canHurtOne(role);
            }
            return tag;
        };
        RoleSkill.prototype.nextSkill = function () {
            // body
            var counter = this.cur_counter;
            var tableSize = this.tableSkills.length;
            this.cur_counter = counter % tableSize;
            this.tableSkills[this.cur_counter + zj.adjustIndex(1)].playSkill();
        };
        RoleSkill.prototype.nextAction = function () {
            // body
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                return this.tableSkills[this.cur_counter + zj.adjustIndex(1)].nextAction();
            }
        };
        RoleSkill.prototype.changeDir = function () {
            // body
            /*
            if( this.next_dir != TableEnumDir.Dir_None ){
                this.belong_role.changeDir(this.next_dir, true)
            }
            */
        };
        RoleSkill.prototype.setContinue = function (tag) {
            // body
            //this.b_continue = tag
        };
        RoleSkill.prototype.setIsFinish = function () {
            // body
            //console.log("RoleSkill setIsFinish role id==" + this.belong_role.roleId)
            this.b_finish = true;
        };
        RoleSkill.prototype.setIsBreakTag = function (args) {
            // body
            this.b_breakTag = true;
        };
        RoleSkill.prototype.setAttrib = function (attribName, attribVal) {
            /*if((this.PLUSATTRIBUTE[attribName] == null) ){
                print("attrib "..attribName.." is illegal")
                assert(false)
            }
            this.PLUSATTRIBUTE[attribName] = attribVal*/
        };
        RoleSkill.prototype.setVaryCode = function (code) {
            // body
            this.varyCode = code;
        };
        RoleSkill.prototype.changeSkillLevel = function (value) {
            // body
            this.promoteLevel = this.promoteLevel + value;
            this.level = this.level + value;
        };
        RoleSkill.prototype.getHurt = function () {
            // body
            var tableSize = this.tableSkills.length;
            var hurt = null;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                hurt = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getHurt();
            }
            return hurt;
        };
        RoleSkill.prototype.getHitEffectId = function () {
            // body
            var tableSize = this.tableSkills.length;
            var hitId = -1;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                hitId = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getHitEffectId();
            }
            return hitId;
        };
        RoleSkill.prototype.getOrder = function () {
            // body
            var tableSize = this.tableSkills.length;
            var order = -1;
            if (tableSize != 0 && this.cur_counter < tableSize) {
                order = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getOrder();
            }
            return order;
        };
        RoleSkill.prototype.getIsCanBreakSkill = function (skillOrder) {
            // body
            var tag = false;
            var tableSize = this.tableSkills.length;
            if (tableSize == 0) {
                tag = true;
            }
            else {
                tag = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].canBreakSkill(skillOrder);
            }
            return tag;
        };
        RoleSkill.prototype.getIsLearnSkill = function () {
            // body
            var tableSize = this.tableSkills.length;
            var tag = false;
            if (tableSize == 0) {
                tag = false;
            }
            else {
                tag = true;
            }
            return tag;
        };
        RoleSkill.prototype.getCurActionId = function () {
            // body
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            var priority = -1;
            if (this.cur_counter < tableSize) {
                priority = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getCurActionPriority();
            }
            return priority;
        };
        RoleSkill.prototype.getCurUnit = function () {
            var tableSize = this.tableSkills.length;
            var curAction = null;
            if (this.cur_counter < tableSize) {
                curAction = this.tableSkills[this.cur_counter + zj.adjustIndex(1)];
            }
            return curAction;
        };
        RoleSkill.prototype.getSkillAction = function () {
            var tableSize = this.tableSkills.length;
            var curAction = null;
            if (this.cur_counter < tableSize) {
                curAction = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getCurAction();
            }
            return curAction;
        };
        RoleSkill.prototype.getSkillIsByWeapon = function () {
            // body
            var tag = false;
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                tag = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getActionIsByWeapon();
            }
            return tag;
        };
        RoleSkill.prototype.getSkillToFloorOver = function () {
            // body
            var tag = false;
            var tableSize = this.tableSkills.length;
            //assert(this.cur_counter >= tableSize)
            if (this.cur_counter < tableSize) {
                tag = this.tableSkills[this.cur_counter + zj.adjustIndex(1)].getActionToFloorOver();
            }
            return tag;
        };
        RoleSkill.prototype.getIsRageEnough = function () {
            // body
            if (this.belong_role.getRage() < this.getRageConsume()) {
                return true;
            }
            return false;
        };
        RoleSkill.prototype.addKeepingTalent = function (talent) {
            // body
            this.tableKeepingTalent.push(talent);
        };
        RoleSkill.prototype.isKeepingTalentExit = function (talent) {
            // body
            for (var i = 1; i < this.tableKeepingTalent.length; i++) {
                if (talent == this.tableKeepingTalent[i]) {
                    return true;
                }
            }
            return false;
        };
        RoleSkill.prototype.getBelongRole = function () {
            // body
            return this.belong_role;
        };
        RoleSkill.prototype.getSkillId = function () {
            // bodyskill_id
            return this.skill_id;
        };
        RoleSkill.prototype.getSkillLevel = function () {
            // body
            return this.level;
        };
        RoleSkill.prototype.getSkillType = function () {
            // body
            return this.skill_type;
        };
        RoleSkill.prototype.getSkillDamageType = function () {
            // body
            return this.skill_damage_type;
        };
        RoleSkill.prototype.getSkillOrder = function () {
            // body
            return this.skill_order;
        };
        RoleSkill.prototype.getCd = function () {
            // body
            //return this.skill_cd
            return zj.speedTranToCd(this.belong_role.getCdSpeed());
        };
        RoleSkill.prototype.getFixedCd = function () {
            return this.skill_cd;
        };
        RoleSkill.prototype.getCdEntry = function () {
            // body
            return zj.speedTranToEntry(this.belong_role.getCdSpeed());
        };
        RoleSkill.prototype.getRageConsume = function () {
            // body
            var reduce = this.belong_role.rageReducePlus;
            return this.skill_consume_rage * (1 - reduce);
        };
        RoleSkill.prototype.getIsFinish = function () {
            // body
            return this.b_finish;
        };
        RoleSkill.prototype.getSkillSize = function () {
            // body
            var size = this.tableSkills.length;
            return size;
        };
        RoleSkill.prototype.getCurSkill = function () {
            // body
            return this.tableSkills[this.cur_counter + zj.adjustIndex(1)];
        };
        RoleSkill.prototype.getSkillByIndex = function (idx) {
            // body
            return this.tableSkills[idx];
        };
        RoleSkill.prototype.cptContinueTime = function () {
            // body
            var instance = zj.PlayerSkillSystem.Table(this.skill_id);
            var value = instance.skill_upgrade_continueTime;
            var tag = zj.isCanUseVec(value);
            if (tag == true) {
                this.continue_time = zj.skill_continueTime(this.level, value[zj.adjustIndex(1)], value[zj.adjustIndex(2)]);
            }
        };
        RoleSkill.prototype.getContinueTime = function () {
            // body
            return this.continue_time;
        };
        RoleSkill.prototype.cptSkillValue = function () {
            // body
            var tag = false;
            var instance = zj.PlayerSkillSystem.Table(this.skill_id);
            var value1 = instance.skill_hurt_ratio;
            tag = zj.isCanUseVec(value1);
            if (tag == true) {
                this.relate_value = value1[1];
                this.hurt_ratio = zj.skill_ratioValue(this.level, value1[0], value1[1]);
            }
            var value2 = instance.skill_extra_value;
            tag = zj.isCanUseVec(value2);
            if (tag == true) {
                this.hurt_extra_value = zj.skill_extraValue(this.level, value2[0], value2[1]);
            }
        };
        RoleSkill.prototype.getExtraEffect = function (args) {
            // body
            return this.tableExtraEffect;
        };
        RoleSkill.prototype.getSkillHurtRatio = function (args) {
            // body
            return this.hurt_ratio;
        };
        RoleSkill.prototype.getHurtExtraValue = function (args) {
            // body
            return this.hurt_extra_value;
        };
        RoleSkill.prototype.getRelateValue = function (args) {
            // body
            return this.relate_value;
        };
        RoleSkill.prototype.getSkillNamePath = function () {
            // body
            return this.skill_name_path;
        };
        RoleSkill.prototype.getSkillIconPath = function () {
            // body
            return this.skill_icon_path;
        };
        RoleSkill.prototype.getVaryCode = function (args) {
            // body
            return this.varyCode;
        };
        RoleSkill.prototype.getSkillDelayTime = function (args) {
            // body
            return this.skill_delay_time;
        };
        RoleSkill.prototype.getSkillAiType = function (args) {
            // body
            return this.skill_ai_type;
        };
        RoleSkill.prototype.getIsBreakTag = function (args) {
            // body
            return this.b_breakTag;
        };
        RoleSkill.prototype.addHurtInfo = function (hurt) {
            //let _id = hurt.hurt_id
            //let _proofValue = hurt.hurt_proof_value
            if (this.tableHurtInfo[hurt.hurt_id] == null || (this.tableHurtInfo[hurt.hurt_id] != null && hurt.hurt_proof_value > this.tableHurtInfo[hurt.hurt_id])) {
                this.tableHurtInfo[hurt.hurt_id] = hurt.hurt_proof_value;
            }
        };
        RoleSkill.prototype.makeSkillTableInfo = function () {
            var msg = new message.SkillTableInfo;
            msg.skill_id = this.skill_id;
            msg.skill_cd = this.skill_cd;
            msg.skill_cd_entry = this.skill_cd_entry;
            msg.skill_consume_rage = this.skill_consume_rage;
            msg.skill_hurt_ratio = this.hurt_ratio;
            msg.skill_extra_value = this.hurt_extra_value;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.tableHurtInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                var _t = new message.SkillHurtTableInfo;
                _t.hurt_id = k;
                _t.proof_value = v;
                msg.hurts.push(_t);
            }
            return msg;
        };
        return RoleSkill;
    }());
    zj.RoleSkill = RoleSkill;
    __reflect(RoleSkill.prototype, "zj.RoleSkill");
})(zj || (zj = {}));
//# sourceMappingURL=RoleSkill.js.map