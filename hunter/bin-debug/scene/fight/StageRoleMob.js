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
    //怪物类，继承角色类
    var StageRoleMob = (function (_super) {
        __extends(StageRoleMob, _super);
        function StageRoleMob(node, aiTag, roleId) {
            var _this = _super.call(this, node, aiTag) || this;
            _this.setRoleId(roleId);
            _this.setGeneralId(roleId);
            _this.nHpTube = 1;
            _this.realPos = 0;
            return _this;
        }
        StageRoleMob.prototype.setRealBtlPos = function (pos) {
            this.realPos = pos;
        };
        StageRoleMob.prototype.getRealBtlPos = function () {
            return this.realPos;
        };
        StageRoleMob.prototype.createRoleInfo = function () {
            var msg = new message.GeneralInfo();
            msg.general_id = this.roleId;
            msg.level = this.attribs.level;
            msg.star = this.star;
            msg.step = this.step;
            msg.attri = this.creatAttriInfo();
            return msg;
        };
        StageRoleMob.prototype.creatMonster = function (aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale, appearStage) {
            this.setPositionType(ePosition);
            this.setIsEnemy(bEnemy);
            this.setTeamNum(eTeamNum);
            this.init();
            this.commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale);
            this.roleInfo = this.createRoleInfo();
        };
        StageRoleMob.prototype.creatServerMonster = function (roleInfo, aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale) {
            this.setPositionType(ePosition);
            this.setIsEnemy(bEnemy);
            this.setTeamNum(eTeamNum);
            this.initServer(roleInfo);
            this.commonCreateRole(eCamp, floor, x, y, dir, null, scale);
        };
        StageRoleMob.prototype.init = function () {
            this.loadBaseData();
            this.loadFightData();
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
            this.closeRoleDcUI();
        };
        StageRoleMob.prototype.initServer = function (roleInfo) {
            this.loadRoleData(roleInfo);
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
        };
        StageRoleMob.prototype.loadSkill = function () {
            for (var i = 0; i < this.tableSkillIds.length; i++) {
                if (this.tableSkillIds[i] > 0) {
                    //真实ID = 表里ID +（技能等级-1）*1000000
                    var info = {};
                    var _level = this.tableSkillLevels[i];
                    var _id = this.tableSkillIds[i];
                    info["id"] = _id + (_level - 1) * 1000000;
                    info["level"] = _level;
                    var ts = new zj.RoleSkill(this, info);
                    var sType = zj.Helper.getSkillBaseTypeById(this.tableSkillIds[i]);
                    if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    }
                    else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    }
                    else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        };
        StageRoleMob.prototype.loadTalent = function () {
            this.initTalent(zj.Gmgr.Instance.everybodyTalent[this.ePosition]);
            this.initTalent(zj.Gmgr.Instance.personalTalent[this.ePosition][this.roleId]);
        };
        StageRoleMob.prototype.getDbInstance = function () {
            return zj.Game.PlayerMobSystem.Instance(this.roleId);
        };
        StageRoleMob.prototype.getMobName = function () {
            if (zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return this.getLocalMobName();
            }
            else {
                return this.getLangueMobName();
            }
        };
        StageRoleMob.prototype.getLocalMobName = function () {
            var instance = this.getDbInstance();
            return instance.monster_name;
        };
        StageRoleMob.prototype.getLangueMobName = function () {
            var instance = this.getDbInstance();
            var item = zj.TableLanguage.Item(instance.monster_name);
            if (item) {
                return item["ch"];
            }
            return "";
        };
        StageRoleMob.prototype.loadBaseData = function () {
            var instance = this.getDbInstance();
            this.mapRoleId = instance.monster_roleId;
            this.formType = instance.role_type;
            this.groupTag = instance.organization;
            // 特性
            this.roleFeature = instance.features;
            // 派系
            this.roleFaction = instance.type;
            this.roleName = this.getMobName();
            this.headPath = zj.TableMapRole.Item(this.mapRoleId).head_path;
            //this.headPath = mprdb.fromMonster(this.roleId).head_path
            this.profession = instance.monster_profession;
            this.nHpTube = instance.hp_tube;
            //this.maxBeanNum = instance.bean_max
            this.maxBeanNum = 1;
            this.star = instance.monster_star;
            this.step = instance.monster_step;
            this.tableSkillIds = instance.skill_ids;
            this.tableSkillLevels = instance.skill_levels;
            this.tableTalentIds = instance.talent_ids;
            this.tableTalentLevels = instance.talent_levels;
            this.tableHideTalentIds = instance.hide_talent_ids;
            this.getUpTime = instance.get_up_time;
            this.stirUpDef = instance.stir_up_resistance;
            this.stirAgainDef = instance.stir_again_def;
            this.moveSpeed = instance.move_speed;
            var tag = instance.is_stir_up;
            this.bStirUp = zj.getBoolean(tag);
            tag = instance.is_gravity;
            this.bGravity = zj.getBoolean(tag);
            /**[[
            if  instance.is_interrupt ~= nil and instance.is_interrupt == -1 then
                this.bFloatBreak = false
            end
            ]]*/
            this.SetAttrib("maxRage", instance.monster_rage);
            this.SetAttrib("stiffDef", instance.stiff_resistance);
        };
        StageRoleMob.prototype.loadFightData = function () {
            var instance = this.getDbInstance();
            this.SetAttrib("level", instance.monster_level);
            // this.SetAttrib("maxHp", instance.monster_hp)
            this.SetAttrib("maxHp", zj.yuan3(this.isActivityBoss() == true, zj.activityBossConfig.boss_max_hp, instance.monster_hp)); // 设置boss血量
            this.SetAttrib("curHp", this.attribs.maxHp);
            // 怪物木有这4个属性，默认为0
            //this.SetAttrib("atkAll", instance.general_atk_all)
            //this.SetAttrib("defAll", instance.general_def_all)
            //this.SetAttrib("critAll", instance.all_crit)
            //this.SetAttrib("ignoreAll", instance.ignore_def_all)
            this.SetAttrib("atk", instance.monster_atk);
            this.SetAttrib("def", instance.monster_def);
            this.SetAttrib("htv", instance.skill_atk);
            this.SetAttrib("eva", instance.skill_def);
            //this.SetAttrib("sacredAtk", instance.sacred_atk)
            //this.SetAttrib("sacredDef", instance.sacred_def)
            this.SetAttrib("atkCritRate", instance.atk_crit);
            this.SetAttrib("skillCritRate", instance.skill_crit);
            //this.SetAttrib("sacredCritRate", instance.sacred_crit)
            this.SetAttrib("critExtra", instance.crit_extra);
            this.SetAttrib("critDef", instance.crit_resistance);
            this.SetAttrib("hitRate", instance.hit_rate);
            this.SetAttrib("dodgeRate", instance.dodge_rate);
            this.SetAttrib("ignorePhydef", instance.ignore_phyDef);
            this.SetAttrib("ignoreMagicdef", instance.ignore_magicDef);
            //this.SetAttrib("ignoreScaredef", instance.ignore_sacredDef)
            this.SetAttrib("finalExtraHurt", instance.final_extra);
            this.SetAttrib("finalReduceHurt", instance.final_reduce);
            this.SetAttrib("unilResis", instance.universal_resistance);
            this.SetAttrib("ignoreResis", instance.ignore_resistance);
            this.SetAttrib("floatResis", instance.float_resistance);
            this.SetAttrib("cdSpeed", instance.cd_speed);
            this.SetAttrib("supportConsume", instance.support_consume);
            //专用字段
            if (this.attribs.ignoreMagicdef == 1) {
                this.bFloatBreak = false;
            }
        };
        StageRoleMob.prototype.getBaseProtoValue = function (type) {
            var ret = 0;
            if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK) {
                ret = this.attribs.atk;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF) {
                ret = this.attribs.def;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV) {
                ret = this.attribs.htv;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA) {
                ret = this.attribs.eva;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF) {
                ret = this.attribs.ignorePhydef;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT) {
                ret = this.attribs.atkCritRate;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA) {
                ret = this.attribs.critExtra;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF) {
                ret = this.attribs.critDef;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE) {
                ret = this.attribs.hitRate;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE) {
                ret = this.attribs.dodgeRate;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                ret = this.attribs.cdSpeed;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                ret = this.attribs.maxHp;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS) {
                ret = this.attribs.unilResis;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS) {
                ret = this.attribs.ignoreResis;
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS) {
                ret = this.attribs.floatResis;
            }
            return ret;
        };
        return StageRoleMob;
    }(zj.StageRole));
    zj.StageRoleMob = StageRoleMob;
    __reflect(StageRoleMob.prototype, "zj.StageRoleMob");
})(zj || (zj = {}));
//# sourceMappingURL=StageRoleMob.js.map