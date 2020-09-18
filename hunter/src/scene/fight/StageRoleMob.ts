namespace zj {
    //怪物类，继承角色类
    export class StageRoleMob extends StageRole {
        constructor(node, aiTag, roleId) {
            super(node, aiTag);
            this.setRoleId(roleId)
            this.setGeneralId(roleId)
            this.nHpTube = 1;
            this.realPos = 0;
        }
        public realPos;
        public setRealBtlPos(pos) {
            this.realPos = pos;
        }
        public getRealBtlPos() {
            return this.realPos;
        }
        public createRoleInfo() {
            let msg = new message.GeneralInfo();
            msg.general_id = this.roleId
            msg.level = this.attribs.level
            msg.star = this.star
            msg.step = this.step
            msg.attri = this.creatAttriInfo();
            return msg;
        }
        public creatMonster(aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale, appearStage) {
            this.setPositionType(ePosition)
            this.setIsEnemy(bEnemy)
            this.setTeamNum(eTeamNum)
            this.init()
            this.commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale)
            this.roleInfo = this.createRoleInfo();
        }
        public creatServerMonster(roleInfo, aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale) {
            this.setPositionType(ePosition)
            this.setIsEnemy(bEnemy)
            this.setTeamNum(eTeamNum)
            this.initServer(roleInfo)
            this.commonCreateRole(eCamp, floor, x, y, dir, null, scale);
        }
        public init() {
            this.loadBaseData();
            this.loadFightData();
            this.loadModelDB()
            this.loadBody()

            this.loadTalent()
            this.loadAttriTalent();
            this.loadSkill();
            this.loadSkillAi()

            this.loadFightSpxRes();
            this.loadStorageSpx();
            this.initBleedTriggerLine();
            this.setHp(this.getMaxHp());
            this.closeRoleDcUI();
        }
        public initServer(roleInfo) {
            this.loadRoleData(roleInfo)
            this.loadBaseData();
            this.loadServerData();
            this.loadModelDB();
            this.loadBody();

            this.loadTalent();
            this.loadAttriTalent();
            this.loadSkill();
            this.loadSkillAi();

            this.loadFightSpxRes();
            this.loadStorageSpx();
            this.initBleedTriggerLine();
            this.setHp(this.getMaxHp());
        }
        public loadSkill() {
            for (let i = 0; i < this.tableSkillIds.length; i++) {
                if (this.tableSkillIds[i] > 0) {
                    //真实ID = 表里ID +（技能等级-1）*1000000
                    let info = {}
                    let _level = this.tableSkillLevels[i]
                    let _id = this.tableSkillIds[i]
                    info["id"] = _id + (_level - 1) * 1000000;
                    info["level"] = _level;
                    let ts = new RoleSkill(this, info);
                    let sType = Helper.getSkillBaseTypeById(this.tableSkillIds[i]);
                    if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    } else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    } else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        }
        public loadTalent() {
            this.initTalent(Gmgr.Instance.everybodyTalent[this.ePosition]);
            this.initTalent(Gmgr.Instance.personalTalent[this.ePosition][this.roleId]);
        }
        public getDbInstance() {
            return Game.PlayerMobSystem.Instance(this.roleId);
        }
        public getMobName() {
            if (Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return this.getLocalMobName();
            } else {
                return this.getLangueMobName();
            }
        }
        public getLocalMobName() {
            let instance = this.getDbInstance();
            return instance.monster_name;
        }
        public getLangueMobName() {
            let instance = this.getDbInstance();
            let item = TableLanguage.Item(instance.monster_name);
            if(item){
                return item["ch"];
            }
            return "";
        }
        public loadBaseData() {
            let instance = this.getDbInstance();
            this.mapRoleId = instance.monster_roleId;
            this.formType = instance.role_type;

            this.groupTag = instance.organization
            // 特性
            this.roleFeature = instance.features
            // 派系
            this.roleFaction = instance.type

            this.roleName = this.getMobName()
            this.headPath = TableMapRole.Item(this.mapRoleId).head_path;
            //this.headPath = mprdb.fromMonster(this.roleId).head_path
            this.profession = instance.monster_profession

            this.nHpTube = instance.hp_tube
            //this.maxBeanNum = instance.bean_max
            this.maxBeanNum = 1

            this.star = instance.monster_star
            this.step = instance.monster_step

            this.tableSkillIds = instance.skill_ids
            this.tableSkillLevels = instance.skill_levels
            this.tableTalentIds = instance.talent_ids
            this.tableTalentLevels = instance.talent_levels
            this.tableHideTalentIds = instance.hide_talent_ids

            this.getUpTime = instance.get_up_time
            this.stirUpDef = instance.stir_up_resistance
            this.stirAgainDef = instance.stir_again_def
            this.moveSpeed = instance.move_speed
            let tag = instance.is_stir_up
            this.bStirUp = getBoolean(tag)
            tag = instance.is_gravity
            this.bGravity = getBoolean(tag)
            /**[[
            if  instance.is_interrupt ~= nil and instance.is_interrupt == -1 then
                this.bFloatBreak = false
            end
            ]]*/
            this.SetAttrib("maxRage", instance.monster_rage)
            this.SetAttrib("stiffDef", instance.stiff_resistance)
        }
        public loadFightData() {
            let instance = this.getDbInstance()
            this.SetAttrib("level", instance.monster_level)
            // this.SetAttrib("maxHp", instance.monster_hp)
            this.SetAttrib("maxHp", yuan3(this.isActivityBoss() == true, activityBossConfig.boss_max_hp, instance.monster_hp)) // 设置boss血量
            this.SetAttrib("curHp", this.attribs.maxHp)

            // 怪物木有这4个属性，默认为0
            //this.SetAttrib("atkAll", instance.general_atk_all)
            //this.SetAttrib("defAll", instance.general_def_all)
            //this.SetAttrib("critAll", instance.all_crit)
            //this.SetAttrib("ignoreAll", instance.ignore_def_all)

            this.SetAttrib("atk", instance.monster_atk)
            this.SetAttrib("def", instance.monster_def)
            this.SetAttrib("htv", instance.skill_atk)
            this.SetAttrib("eva", instance.skill_def)
            //this.SetAttrib("sacredAtk", instance.sacred_atk)
            //this.SetAttrib("sacredDef", instance.sacred_def)

            this.SetAttrib("atkCritRate", instance.atk_crit)
            this.SetAttrib("skillCritRate", instance.skill_crit)
            //this.SetAttrib("sacredCritRate", instance.sacred_crit)
            this.SetAttrib("critExtra", instance.crit_extra)
            this.SetAttrib("critDef", instance.crit_resistance)

            this.SetAttrib("hitRate", instance.hit_rate)
            this.SetAttrib("dodgeRate", instance.dodge_rate)

            this.SetAttrib("ignorePhydef", instance.ignore_phyDef)
            this.SetAttrib("ignoreMagicdef", instance.ignore_magicDef)
            //this.SetAttrib("ignoreScaredef", instance.ignore_sacredDef)
            this.SetAttrib("finalExtraHurt", instance.final_extra)
            this.SetAttrib("finalReduceHurt", instance.final_reduce)

            this.SetAttrib("unilResis", instance.universal_resistance)
            this.SetAttrib("ignoreResis", instance.ignore_resistance)
            this.SetAttrib("floatResis", instance.float_resistance)
            this.SetAttrib("cdSpeed", instance.cd_speed)
            this.SetAttrib("supportConsume", instance.support_consume);
            //专用字段
            if (this.attribs.ignoreMagicdef == 1) {
                this.bFloatBreak = false;
            }
        }
        public getBaseProtoValue(type) {
            let ret = 0;
            if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK) {
                ret = this.attribs.atk;
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF) {
                ret = this.attribs.def;
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV) {
                ret = this.attribs.htv
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA) {
                ret = this.attribs.eva
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF) {
                ret = this.attribs.ignorePhydef
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT) {
                ret = this.attribs.atkCritRate
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA) {
                ret = this.attribs.critExtra
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF) {
                ret = this.attribs.critDef
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE) {
                ret = this.attribs.hitRate
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE) {
                ret = this.attribs.dodgeRate
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                ret = this.attribs.cdSpeed
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                ret = this.attribs.maxHp
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS) {
                ret = this.attribs.unilResis
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS) {
                ret = this.attribs.ignoreResis
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS) {
                ret = this.attribs.floatResis
            }
            return ret;
        }
    }
}