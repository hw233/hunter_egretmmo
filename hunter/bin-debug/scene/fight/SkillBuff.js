var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillBuff = (function () {
        function SkillBuff() {
            this.belong_role = null;
            this.buff_id = null;
            this.skill_level = null;
            this.target_role = null;
            this.belong_unit = null;
            this.x = 0;
            this.y = 0;
            this.spx_id = 0;
            this.action_id = 0;
            this.pos = null;
            this.b_blendActive = false;
            //public active_type = TableBuffActiveType.Buff_Active_Nor
            this.use_type = zj.TableEnum.TableBuffUseType.Buff_Use_None;
            this.buff_type = zj.TableEnum.TableBufferType.BUFFER_NONE;
            this.buff_name = null;
            this.buff_name_path = null;
            this.damage_type = message.EDamageType.DAMAGE_TYPE_NONE;
            this.hit_rate = 0;
            this.continue_time = 0;
            this.fir_value = 0;
            this.sec_value = 0;
            this.total_time = 0;
            this.bleed_time = 0;
            this.b_finish = false;
            this.tblAniEffectType = {};
            this.tblNameEffectType = {};
            //////////////////////////////-
            // 霸体
            this.shelterMaxValue = 0;
            this.shelterState = zj.TableEnum.TableShelterState.SHELTER_STATE_NONE;
            //////////////////////////////-
            // 驱散
            this.dispelNum = 0;
            this.dispelTypeTbl = {};
            //////////////////////////////
            // 异常抵抗
            this.resisType = {};
            //////////////////////////////
            // 增益减益时间type
            this.timeType = {};
            //////////////////////////////
            // 免疫类型
            this.immuneNum = 99;
            this.immuneTypeTbl = {};
            ////////////////////-
            this.forbideTypeTbl = {};
            ////////////////////-
            // 叠加    
            this.is_fold = null;
            this.is_showIcon = false;
            this.is_foldIcon = -1;
            this.iconPath = null;
            this.is_buffAni = false;
            this.buff_icon_path = null;
            this.buff_ima_path = null;
            this.ispool = false;
            this.spxX = 0;
            this.spxY = 0;
        }
        SkillBuff.prototype.newSetData = function (belong_role, id, skill_level, target_role, belong_unit, is_fold) {
            this.ispool = false;
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
            this.belong_role = belong_role;
            this.buff_id = id;
            this.skill_level = skill_level;
            this.target_role = target_role;
            this.belong_unit = belong_unit;
            this.is_fold = is_fold;
            this.init();
        };
        SkillBuff.prototype.getProto = function () {
            return [this.buff_type, this.belong_role, this.buff_id, this.skill_level, this.target_role, this.belong_unit, this.is_fold];
        };
        SkillBuff.prototype.release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	 
            this.target_role = null;
            this.belong_role = null;
            this.belong_unit = null;
            this.nodeIcon = null;
            if (this.spx != null) {
                this.spx.clearSpine();
                this.spx = null;
            }
            else {
                var aaa = void 0;
            }
            if (this.name_spx != null) {
                this.name_spx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
                this.name_spx.clearSpine();
                this.name_spx = null;
            }
            if (this.icon_spx != null) {
                this.icon_spx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
                this.icon_spx.clearSpine();
                this.icon_spx = null;
            }
            this.node = null;
            this.nodeName = null;
            this.fightScene = null;
            this.b_finish = false;
            this.is_fold = null;
            this.is_showIcon = false;
            this.is_foldIcon = -1;
            this.iconPath = null;
            this.is_buffAni = false;
            this.continue_time = 0;
            this.tblAniEffectType = {};
            this.tblNameEffectType = {};
            this.shelterMaxValue = 0;
            this.shelterState = zj.TableEnum.TableShelterState.SHELTER_STATE_NONE;
            //////////////////////////////-
            // 驱散
            this.dispelNum = 0;
            this.dispelTypeTbl = {};
            //////////////////////////////
            // 异常抵抗
            this.resisType = {};
            //////////////////////////////
            // 增益减益时间type
            this.timeType = {};
            //////////////////////////////
            // 免疫类型
            this.immuneNum = 99;
            this.immuneTypeTbl = {};
            ////////////////////-
            this.forbideTypeTbl = {};
            this.buff_icon_path = null;
            this.buff_ima_path = null;
            this.total_time = 0;
            this.bleed_time = 0;
            if (this.ispool == false) {
                this.ispool = true;
                zj.Game.ObjectPool.returnItem("SkillBuff", this);
            }
        };
        SkillBuff.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.loadTable();
            this.loadConfig();
            this.loadSpx();
            this.loadNameSpx();
            this.loadIconSpx();
        };
        SkillBuff.prototype.setFold = function (tag) {
            this.is_fold = tag;
        };
        SkillBuff.prototype.loadTable = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tableBuff = zj.TableSkillBuff.Table();
            this.buff_name = tableBuff[this.buff_id].buff_name;
            this.buff_type = tableBuff[this.buff_id].base_type;
            this.damage_type = tableBuff[this.buff_id].damage_type;
            var tableBuffBase = zj.TableClientBuffBase.Table();
            this.spx_id = tableBuffBase[this.buff_type].spx_id;
            this.action_id = tableBuffBase[this.buff_type].action_id;
            this.iconPath = tableBuffBase[this.buff_type].buff_name_path;
            this.is_showIcon = zj.yuan3(tableBuffBase[this.buff_type].is_showIcon == -1, false, true);
            this.is_foldIcon = tableBuffBase[this.buff_type].is_foldIcon;
            this.is_buffAni = zj.yuan3(tableBuffBase[this.buff_type].buff_ani == -1, false, true);
            this.pos = tableBuffBase[this.buff_type].buff_pos;
            var tmp_tbl = tableBuffBase[this.buff_type].ani_trigger;
            for (var i = zj.adjustIndex(1); i < tmp_tbl.length; i++) {
                this.tblAniEffectType[tmp_tbl[i]] = 1;
            }
            tmp_tbl = tableBuffBase[this.buff_type].word_trigger;
            for (var i = zj.adjustIndex(1); i < tmp_tbl.length; i++) {
                this.tblNameEffectType[tmp_tbl[i]] = 1;
            }
            //this.active_type = tableBuffBase[this.buff_type].buff_active_type
            this.use_type = tableBuffBase[this.buff_type].buff_profit;
            // this.node = this.target_role.getBuffNode(this.pos)
            //this.nodeName = this.target_role.getBuffNameNode()
            this.nodeName = this.fightScene.getBuffEffectLayer();
            //this.nodeIcon = this.target_role.getBuffNode("mid")
            this.nodeIcon = this.fightScene.getBuffEffectLayer();
            var blendTag = tableBuffBase[this.buff_type].blend_active;
            this.b_blendActive = zj.getBoolean(blendTag);
            this.buff_name_path = tableBuffBase[this.buff_type].buff_name_path;
            this.buff_icon_path = tableBuffBase[this.buff_type].icon_path;
            this.buff_ima_path = tableBuffBase[this.buff_type].buff_ima_path;
            var level = this.skill_level;
            var hit = tableBuff[this.buff_id].hit_rate;
            this.hit_rate = zj.buff_hit(level, hit[zj.adjustIndex(1)], hit[zj.adjustIndex(2)]);
            var time = tableBuff[this.buff_id].continue_time;
            this.continue_time = zj.buff_continueTime(level, time[zj.adjustIndex(1)], time[zj.adjustIndex(2)]);
            var addTimePercent = this.target_role.dealTimeBuff(zj.TableEnum.TableBufferType.BUFFER_ADD_GAIN_TIME, this.buff_type);
            var reduceTimePercent = this.target_role.dealTimeBuff(zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEBUFF_TIME, this.buff_type);
            this.continue_time = this.continue_time * (1 + addTimePercent - reduceTimePercent);
        };
        SkillBuff.prototype.loadConfig = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tableBuff = zj.TableSkillBuff.Table();
            //let level = this.belong_skill.getSkillLevel()
            var level = this.skill_level;
            var param1 = tableBuff[this.buff_id].fis_param;
            var param2 = tableBuff[this.buff_id].sec_param;
            var param3 = tableBuff[this.buff_id].third_param;
            //let atkValue = yuan3(this.belong_role.profession == TableEnumProfession.CAREER_TACTICIAN, this.belong_role.getMagicAtk(), this.belong_role.getAtk())
            //let atkValue = this.belong_role.getAtk()
            if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SPEED_DOWN) {
                // [[参数一. 减速百分比  参数二：-1*/  
                // 减速   
                this.fir_value = zj.buff_reduceSpeed(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CONFUSE) {
                // [[参数一. 减命中百分比 参数二.-1*/
                // 迷惑
                this.fir_value = zj.buff_reduceHit(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WEAK) {
                // [[参数一. 伤害加深百分比 参数二.-1*/
                // 虚弱
                this.fir_value = zj.buff_week(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEF) {
                // [[参数一：减少防御百分比 参数二： -1*/   
                // 减甲
                this.fir_value = zj.buff_reduceDefence(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_PROMOTE_DEF) {
                // [[参数一：增加防御百分比 参数二： -1*/   
                // 增甲
                this.fir_value = zj.buff_promoteDefence(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_BLEED) {
                // [[参数一：每次间隔时间 参数二：掉血百分比*/
                // 流血
                _a = zj.buff_intervalBlood(this.target_role.getMaxHp(), level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _a[0], this.sec_value = _a[1];
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY ||
                    zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP ||
                    zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS ||
                    zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                    // 强制掉1血
                    if (this.target_role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        this.sec_value = 1;
                    }
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SUCK_BLOOD) {
                // [[参数一：吸血百分比 参数二： -1*/ 
                // 吸血
                this.fir_value = zj.buff_suckBlood(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SPEED_UP) {
                // [[参数一. 加速百分比 参数二.-1*/
                // 加速
                this.fir_value = zj.buff_raiseSpeed(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_PHY_IMMUNE) {
                // [[参数一. -1 参数二. 总免疫值上限*/    
                // 物理免疫   
                this.sec_value = zj.buff_phyImmune(level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_MAGIC_IMMUNE) {
                // [[参数一. -1 参数二. 总免疫值上限*/    
                // 魔法免疫
                this.sec_value = zj.buff_magicImmune(level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE) {
                // [[参数一. -1 参数二. 总免疫值上限*/    
                // 所有伤害免疫
                this.sec_value = zj.buff_allImmune(level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_PHY_SUCK) {
                // [[参数一. 伤害值的百分比转成HP 参数二. 转HP的累计上限*/ 
                // 物理伤害吸收转HP       
                _b = zj.buff_phyDamageSuck(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _b[0], this.sec_value = _b[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_MAGIC_SUCK) {
                // [[参数一. 伤害值的百分比转成HP 参数二. 转HP的累计上限*/  
                // 魔法伤害吸收转HP
                _c = zj.buff_magicDamageSuck(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _c[0], this.sec_value = _c[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_SUCK) {
                // [[参数一. 伤害值的百分比转成HP 参数二. 转HP的累计上限*/ 
                // 所有伤害吸收转HP 
                _d = zj.buff_allDamageSuck(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _d[0], this.sec_value = _d[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REBOUND) {
                // [[参数一. 伤害值的百分比反弹 参数二. 反弹累计上限*/  
                // 反弹
                this.fir_value = zj.buff_rebound(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BLOOD) {
                // [[参数一. 每次回血间隔时间 参数二. -1*/  
                // 如果是技能回血的话，与技能挂钩        
                if (this.belong_unit != null) {
                    var atkValue = this.belong_role.getAtk();
                    _e = zj.buff_intervalRecoverBloodFrskill(atkValue, this.belong_unit.getBelongSkill().getSkillHurtRatio(), this.belong_unit.getBelongSkill().getHurtExtraValue(), level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]), this.fir_value = _e[0], this.sec_value = _e[1];
                }
                else {
                    // 其他目前从表里取
                    //console.log("回血的buff，策划配表错误。")
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DOUBLE_DEEP) {
                // [[参数一. 连击攻击提升百分比 参数二. -1*/
                // 连击加深
                this.fir_value = zj.buff_doubleDeep(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_POISON) {
                // [[参数一. 每次间隔时间 参数二. 掉血百分比  */ 
                // 中毒
                var atkValue = this.belong_role.getAtk();
                _f = zj.buff_intervalPoison(atkValue, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _f[0], this.sec_value = _f[1];
                // 检测施加方有没有天赋<万蛊蚀心> 
                var _g = this.belong_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_POISON_DEEP, -1), tag_2 = _g[0], value_2 = _g[1], extra = _g[2];
                if (tag_2 == true) {
                    // value 持续时间
                    this.continue_time = this.continue_time * (1 + value_2 / 100);
                    // extra 间隔时间
                    this.fir_value = this.fir_value * (1 - extra / 100);
                    if (this.fir_value <= 1) {
                        this.fir_value = 1;
                    }
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_COMMON_BLOOD) {
                // [[参数一. 每次间隔时间 参数二. 回血百分比*/
                // 普通回血
                var atkValue = this.belong_role.getAtk();
                _h = zj.buff_intervalRecoverBlood(atkValue, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _h[0], this.sec_value = _h[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DANDAN) {
                /* 参数一. 最大蛋蛋承受量 参数二. -1*/
                this.fir_value = zj.buff_dandan(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                this.shelterMaxValue = this.fir_value;
                this.shelterState = zj.TableEnum.TableShelterState.SHELTER_STATE_PROTECT;
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ATK_PROMOTE) {
                // [[参数一. 提升的攻击力百分比*/
                // 攻击提升
                this.fir_value = zj.buff_atkPromote(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_FIRING) {
                // [[参数一. 每次间隔时间 参数二. 回血百分比], 参数三：降防百分比]
                // 灼烧
                var atkValue = this.belong_role.getAtk();
                _j = zj.buff_intervalFiring(atkValue, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)], param3[zj.adjustIndex(1)], param3[zj.adjustIndex(2)]), this.fir_value = _j[0], this.sec_value = _j[1], this.third_value = _j[2];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_FORBIDE_RECOVER) {
                // [[参数一. 禁止效果百分比*/  
                this.fir_value = zj.buff_forbideRecover(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DISPEL_HARMFUL || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DISPEL_HELPFUL) {
                // 驱散的数量
                this.dispelNum = zj.buff_dispelNum(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                // 驱散的类型
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.dispelTypeTbl[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD) {
                // 护盾(总吸收量为武将血量的百分比)
                this.sec_value = zj.buff_shield(this.target_role.getMaxHp(), level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_DEF) {
                //关联自身防御护盾(吸收自身防御属性N%的伤害)
                this.sec_value = zj.buff_shieldReleatedDef(this.target_role.getDef(), level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_NUM) {
                // 护盾关联次数(吸收一定次数的伤害)
                this.sec_value = zj.buff_shieldRelatedNum(level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_COMPARE_MAXHP) {
                // 护盾关联最大hp(单次受到伤害低于自身生命上限N%则本次伤害无效，高于N%伤害有效且BUFF消失)
                this.sec_value = zj.buff_shieldCompareMaxHp(this.belong_role.getMaxHp(), level, param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ARMOR) {
                // 所受伤害减少百分比
                this.fir_value = zj.buff_armor(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ARMOR_BREAK) {
                // 受到的伤害增加百分比
                this.fir_value = zj.buff_armorBreak(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CURE) {
                // X秒内，目标以一定速度按照血量上限的百分比恢复血量
                _k = zj.buff_cure(this.target_role.getMaxHp(), level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _k[0], this.sec_value = _k[1];
                this.third_value = param3;
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_GOON) {
                var myAtk = this.belong_role.getAtk();
                _l = zj.buff_cureGogo(myAtk, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _l[0], this.sec_value = _l[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WOUNDED) {
                var enemyAtk = this.belong_role.getAtk();
                var myAtk = this.target_role.getAtk();
                _m = zj.buff_wounded(enemyAtk, myAtk, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _m[0], this.sec_value = _m[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ANGER) {
                // X秒内，目标以一定速度按照数值恢复怒气直至上限
                _o = zj.buff_anger(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _o[0], this.sec_value = _o[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_IGNORE_RESIS) {
                // X秒内，忽视异常抵抗增加
                this.fir_value = zj.buff_addIgnoreResis(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                // 抵抗的类型
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.resisType[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_SELF_RESIST) {
                // X秒内，自身异常抵抗增加
                this.fir_value = zj.buff_addSelfResis(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                // 抵抗的类型     
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.resisType[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_GAIN_TIME) {
                // 增益时间百分比
                this.fir_value = zj.buff_addBuffTime(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                // 增益的类型
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.timeType[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEBUFF_TIME) {
                // 减debuff时间百分比
                this.fir_value = zj.buff_reduceBuffTime(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
                // 减益的类型
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.timeType[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_IMMUNE || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_IMMUNE2) {
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.immuneTypeTbl[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_TIMER_BOMB) {
                // 时间 最后爆炸减血量
                var atkValue = this.belong_role.getAtk();
                _p = zj.buff_timerBomb(atkValue, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _p[0], this.sec_value = _p[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_HTV) {
                this.fir_value = zj.buff_addHtv(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_HTV) {
                this.fir_value = zj.buff_reduceHtv(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_EVA) {
                this.fir_value = zj.buff_addEva(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_EVA) {
                this.fir_value = zj.buff_reduceEva(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_BLR) {
                this.fir_value = zj.buff_addBlr(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_BLR) {
                this.fir_value = zj.buff_reduceBlr(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEHP) {
                _q = zj.buff_recoverBySourceHp(this.belong_role, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)]), this.fir_value = _q[0], this.sec_value = _q[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEPROTE) {
                _r = zj.buff_recoverByProto(this.belong_role, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)], param2[zj.adjustIndex(1)], param2[zj.adjustIndex(2)], param3[zj.adjustIndex(1)]), this.fir_value = _r[0], this.sec_value = _r[1];
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE) {
                this.fir_value = zj.buff_addDefenceBySource(this.belong_role, level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_FORBIDE_STRENGTH) {
                for (var i = zj.adjustIndex(1); i < param2.length; i++) {
                    this.forbideTypeTbl[param2[i]] = 1;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SIGIN) {
                this.fir_value = zj.buff_sign(level, param1[zj.adjustIndex(1)], param1[zj.adjustIndex(2)]);
            }
            // deal talent
            var _s = [false, 0], tag = _s[0], value = _s[1];
            var _t = [false, 0], tag_1 = _t[0], value_1 = _t[1];
            if (this.use_type == zj.TableEnum.TableBuffUseType.Buff_Use_Good) {
                _u = this.target_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ADD_GAIN_TIME, this.buff_type), tag = _u[0], value = _u[1];
                var _v = this.target_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BELONG_GAIN_TIME, this.buff_type), tag_1_1 = _v[0], value_1_1 = _v[1];
            }
            else if (this.use_type == zj.TableEnum.TableBuffUseType.Buff_Use_Bad) {
                _w = this.target_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_DEBUFF_TIME, this.buff_type), tag = _w[0], value = _w[1];
                var _x = this.target_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BELONG_DEBUFF_TIME, this.buff_type), tag_1_2 = _x[0], value_1_2 = _x[1];
            }
            this.continue_time = this.continue_time * (1 + value / 100 + value_1 / 100);
            // 时间单独处理
            if ((this.buff_type == zj.TableEnum.TableBufferType.BUFFER_BLEED || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_FIRING)
                || (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BLOOD
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_COMMON_BLOOD
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CURE
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEHP
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEPROTE
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_GOON)
                || (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ANGER)
                || (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_POISON)
                || (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WOUNDED)) {
                this.bleed_time = this.fir_value;
                // 减少误差
                this.continue_time = this.continue_time - 80;
            }
            if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_TIMER_BOMB) {
                var _y = this.belong_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_BOMB_TIME, -1), timeTag = _y[0], timeValue = _y[1];
                this.continue_time = this.continue_time - this.continue_time * timeValue / 100;
                if (this.continue_time == 0) {
                    this.continue_time = 30;
                }
                var _z = this.belong_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ADD_BOMB_HURT, -1), hurtTag = _z[0], effectValue = _z[1];
                this.sec_value = this.sec_value * (100 + effectValue) / 100;
            }
            var _0 = this.isEffectProBuff(), isEffectPro = _0[0], extraValue = _0[1];
            if (this.isRecoverBuff()) {
                var addValue = this.belong_role.handleTalentEffect_ProBuffRecoverValue();
                var addValue2 = this.belong_role.handleTalentEffect_BuffEffectPro(this.buff_type);
                this.sec_value = this.sec_value * (1 + (addValue + addValue2) / 100);
            }
            else if (isEffectPro) {
                var addValue2 = this.belong_role.handleTalentEffect_BuffEffectPro(this.buff_type);
                if (extraValue == 1) {
                    this.fir_value = this.fir_value * (1 + addValue2 / 100);
                }
                else if (extraValue == 2) {
                    this.sec_value = this.sec_value * (1 + addValue2 / 100);
                }
            }
            var _a, _b, _c, _d, _e, _f, _h, _j, _k, _l, _m, _o, _p, _q, _r, _u, _w;
        };
        SkillBuff.prototype.playSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            //this.playLoopSpx()    
            //this.playNameSpx()
            if (this.tblAniEffectType[zj.TableEnum.TableBuffAniType.ENCHANT_PLAY] != null) {
                this.playBuffSpx();
            }
            if (this.is_buffAni) {
                this.playIconSpx();
                this.playNameSpx();
            }
            /*
            if( this.tblNameEffectType[ TableBuffAniType.ENCHANT_PLAY ] != null ){
                this.playNameSpx()
            }
            */
            this.triggerFun();
        };
        SkillBuff.prototype.playTriggerSpx = function () {
            if (this.tblAniEffectType[zj.TableEnum.TableBuffAniType.TRIGGER_PLAY] != null) {
                this.playBuffSpx();
            }
            if (this.tblNameEffectType[zj.TableEnum.TableBuffAniType.TRIGGER_PLAY] != null) {
                this.playNameSpx();
            }
        };
        SkillBuff.prototype.triggerFun = function () {
            if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_IMMUNE || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_IMMUNE2) {
                //this.target_role.clearBuffsByNumAType(this.immuneNum, this.immuneTypeTbl)
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DISPEL_HARMFUL) {
                var num = this.target_role.clearBuffsByNumAType(this.dispelNum, this.dispelTypeTbl);
                this.belong_role.handleTalentEffect_PurgeTrantoRecover(this.target_role, num);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_DISPEL_HELPFUL) {
                var num = this.target_role.clearBuffsByNumAType(this.dispelNum, this.dispelTypeTbl);
                this.belong_role.handleTalentEffect_DispelUsefulToPosion(this.target_role, num);
                var talentEffect = this.belong_role.getSingleTalentEffect(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_ADD_HURT);
                if (talentEffect != null && num > 0) {
                    talentEffect.b_active = true;
                    if (num >= talentEffect.effect_extra) {
                        num = talentEffect.effect_extra;
                    }
                    talentEffect.effect_value = num * talentEffect.bakeup_value;
                }
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_GAIN_TIME) {
                this.target_role.dealAllTimeBuff(this.timeType, this.fir_value);
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEBUFF_TIME) {
                this.target_role.dealAllTimeBuff(this.timeType, -this.fir_value);
            }
        };
        SkillBuff.prototype.loadSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.nodeIcon == null) {
                return;
            }
            if (this.spx_id != -1 && this.action_id != -1 && this.nodeIcon != null) {
                if (this.spx) {
                    this.spx.clearSpine();
                    this.spx = null;
                }
                var _a = zj.HunterSpineX(this.spx_id, 1, null, zj.TableClientAniSpxSource.Item(this.spx_id).name), spx = _a[0], order = _a[1]; //resdb.SPX( this.spx_id ) 
                this.spx = spx;
                this.nodeIcon.addChild(this.spx.spine);
                // this.target_role.getBuffNode(this.pos)
                _b = this.target_role.getBuffNodePosXy(this.pos), this.spxX = _b[0], this.spxY = _b[1];
                this.spx.SetPosition(this.spxX, this.spxY);
                // this.node.visible = false;
            }
            if (this.is_fold == true) {
                if (this.spx != null) {
                    this.spx.setVisibleSpx(false);
                }
            }
            var _b;
        };
        SkillBuff.prototype.playBuffSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	
            if (this.action_id == -1) {
                return;
            }
            if (this.spx == null) {
                return;
            }
            if (this.b_blendActive == true) {
                this.spx.setBlendAdditive(true);
            }
            //this.spx.setPosition(cc.p(0,0))
            this.spx.stopAllActions();
            //console.log("buff_type==" + this.buff_type + "  buff_id==" + this.buff_id + "  spx_id==" + this.spx_id + "  action_id" + this.action_id)
            this.spx.ChangeAction(this.action_id);
            this.target_role.renewDcPos();
        };
        SkillBuff.prototype.loadIconSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.nodeIcon == null) {
                return;
            }
            if (this.is_buffAni) {
                var _a = zj.HunterSpineX(zj.UIConfig.UIConfig_CommonBattleCss.json_tongyong, 1, null, zj.TableClientAniSpxSource.Item(zj.UIConfig.UIConfig_CommonBattleCss.json_tongyong).name), icon_spx = _a[0], order = _a[1];
                this.icon_spx = icon_spx;
                this.icon_spx.bLoop = false;
                this.icon_spx.setVisibleSpx(false);
                this.nodeIcon.addChild(this.icon_spx.spine);
                // this.nodeIcon.visible = false;
                this.icon_spx.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
            }
        };
        SkillBuff.prototype.animationRoleEvent1 = function () {
            if (this.icon_spx) {
                this.icon_spx.stopAllActions();
                this.icon_spx.setVisibleSpx(false);
                this.icon_spx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
            }
        };
        SkillBuff.prototype.playIconSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (!this.is_buffAni) {
                return;
            }
            if (this.icon_spx == null) {
                return;
            }
            this.icon_spx.setVisibleSpx(true);
            this.icon_spx.stopAllActions();
            this.icon_spx.bLoop;
            var _a = this.target_role.getBuffNodePosXy("mid"), x = _a[0], y = _a[1];
            this.icon_spx.SetPosition(x, y);
            var eye = new eui.Image;
            eye.source = this.buff_ima_path.replace("icon", "img");
            eye.anchorOffsetX = 116 * 0.5;
            eye.anchorOffsetY = 116 * 0.5;
            var slot = this.icon_spx.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_playBuffAni.icon_skinName1);
            slot.setDisplay(eye);
            var eye1 = new eui.Image;
            eye1.anchorOffsetX = 116 * 0.5;
            eye1.anchorOffsetY = 116 * 0.5;
            eye1.source = this.buff_ima_path.replace("icon", "img");
            var slot1 = this.icon_spx.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_playBuffAni.icon_skinName2);
            slot1.setDisplay(eye1);
            this.icon_spx.ChangeAction(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_playBuffAni.icon_index);
        };
        SkillBuff.prototype.loadNameSpx = function () {
            // body
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.nodeName == null) {
                return;
            }
            if (this.is_buffAni) {
                /* let function animationEvent(armatureBack,movementType,movementID)
                 if( movementType == ccs.MovementEventType.loopComplete or movementType == ccs.MovementEventType.complete ){
                       // null
                         this.name_spx.setVisible(false)
                         this.name_spx.stopAllActions()
                    }
                 }*/
                var _a = zj.HunterSpineX(zj.UIConfig.UIConfig_CommonBattleCss.json_tongyong, 1, null, zj.TableClientAniSpxSource.Item(zj.UIConfig.UIConfig_CommonBattleCss.json_tongyong).name), name_spx = _a[0], order = _a[1];
                this.name_spx = name_spx;
                this.name_spx.bLoop = false;
                this.name_spx.setVisibleSpx(false);
                this.nodeName.addChild(this.name_spx.spine);
                this.name_spx.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
            }
        };
        SkillBuff.prototype.animationRoleEvent = function () {
            if (this.name_spx) {
                this.name_spx.stopAllActions();
                this.name_spx.setVisibleSpx(false);
                this.name_spx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
            }
        };
        SkillBuff.prototype.isRecoverBuff = function () {
            var tag = false;
            if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BLOOD
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_COMMON_BLOOD
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEHP
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEPROTE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CURE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_GOON) {
                tag = true;
            }
            return tag;
        };
        SkillBuff.prototype.isEffectProBuff = function () {
            var tag = false;
            var extra = 0;
            if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SPEED_DOWN
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WEAK
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SPEED_UP
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEF
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ATK_PROMOTE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_SELF_RESIST
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ARMOR_BREAK
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_PROMOTE_DEF
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_HTV
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_HTV
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_EVA
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_EVA
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_BLR
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REDUCE_BLR
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SIGIN
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_REBOUND) {
                tag = true;
                extra = 1;
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_BLEED
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_POISON
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_TIMER_BOMB
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_DEF
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WOUNDED
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_SHIELD_COMPARE_MAXHP) {
                tag = true;
                extra = 2;
            }
            else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BLOOD
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_COMMON_BLOOD
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEHP
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEPROTE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CURE
                || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_GOON) {
                tag = true;
                extra = 2;
            }
            return [tag, extra];
        };
        SkillBuff.prototype.playNameSpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (!this.is_buffAni) {
                return;
            }
            if (this.name_spx == null) {
                return;
            }
            this.name_spx.setVisibleSpx(true);
            this.name_spx.stopAllActions();
            var _a = this.target_role.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_PRESS_BUFF), x = _a[0], y = _a[1];
            this.name_spx.SetPosition(x, y);
            this.name_spx.ChangeAction(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_playBuffAni.wenzi_index);
            var eye = new eui.Image;
            eye.source = this.buff_name_path; //.replace("icon","img");
            var slot = this.name_spx.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_playBuffAni.wenzi_skinName);
            slot.setDisplay(eye);
        };
        SkillBuff.prototype.update = function (tick) {
            // body	
            if (this.b_finish == true) {
                return;
            }
            if (this.fightScene && this.fightScene.isTimePause()) {
                return;
            }
            // 对流血之类的buff实时处理
            var rt = tick * 1000;
            this.total_time = this.total_time + rt;
            if (this.total_time > this.continue_time) {
                this.b_finish = true;
                // 如果是定时炸弹，时间到了最后一下会掉血
                if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_TIMER_BOMB) {
                    if (this.target_role.beCanHurt() == true) {
                        this.target_role.createBomoCss();
                        this.target_role.beBombend(this.belong_role, this.damage_type, this.sec_value);
                    }
                }
            }
            if (this.spx) {
                _a = this.target_role.getBuffNodePosXy(this.pos), this.spxX = _a[0], this.spxY = _a[1];
                this.spx.SetPosition(this.spxX, this.spxY);
            }
            //this.updateBreakUnit()
            if (this.b_finish == false) {
                if ((this.buff_type == zj.TableEnum.TableBufferType.BUFFER_BLEED || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_FIRING) && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    if (dif > 0) {
                        this.playTriggerSpx();
                        if (this.target_role.beCanHurt() == true) {
                            this.target_role.beBleeded(this.belong_role, this.damage_type, this.sec_value);
                        }
                        this.bleed_time = dif;
                    }
                }
                else if ((this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BLOOD
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_COMMON_BLOOD
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEHP
                    || this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_BYSOURCEPROTE)
                    && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    if (dif > 0) {
                        this.playTriggerSpx();
                        this.target_role.beRecoverBlood(this.belong_role, this.sec_value);
                        this.bleed_time = dif;
                    }
                }
                else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_CURE && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    var difHp = 0;
                    if (dif > 0) {
                        this.playTriggerSpx();
                        difHp = this.target_role.beRecoverBlood(this.belong_role, this.sec_value);
                        this.bleed_time = dif;
                    }
                    var _b = this.target_role.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_CREATE_SHIELD), tag = _b[0], value = _b[1], effect = _b[4];
                    if (tag && this.third_value[zj.adjustIndex(1)] != -1 && this.target_role.getHp() >= this.target_role.getMaxHp()) {
                        var sum = 0;
                        var time = this.total_time + this.fir_value;
                        while (time < this.continue_time) {
                            sum = sum + this.sec_value;
                            time = time + this.fir_value;
                        }
                        this.b_finish = true;
                        var realHp = difHp + sum * value / 100 * this.target_role.getRecoverRadio();
                        if (realHp > 0) {
                            var buff = this.target_role.beBuffHurt(effect.belong_talent.talent_level, this.third_value[zj.adjustIndex(1)], this.belong_role);
                            if (buff != null) {
                                buff.sec_value = realHp;
                            }
                        }
                    }
                }
                else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_RECOVER_GOON && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    var difHp = 0;
                    if (dif > 0) {
                        this.playTriggerSpx();
                        difHp = this.target_role.beRecoverBlood(this.belong_role, this.sec_value);
                        this.bleed_time = dif;
                    }
                    if (this.target_role.getHp() >= this.target_role.getMaxHp(true)) {
                        this.b_finish = true;
                        var nextRecHp = this.sec_value - difHp;
                        if (nextRecHp > 0) {
                            var players = this.fightScene.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_HP_PERCENT_MIN);
                            if (players.length > 0 && players[zj.adjustIndex(1)].roleId != this.target_role.roleId) {
                                //players[adjustIndex(1)].beRecoverBlood(this.belong_role, dif)
                                var buff = players[zj.adjustIndex(1)].beBuffHurt(this.skill_level, this.buff_id, this.belong_role);
                                if (buff != null) {
                                    buff.fir_value = this.fir_value;
                                    buff.sec_value = nextRecHp;
                                    buff.total_time = this.total_time;
                                    buff.bleed_time = this.fir_value;
                                    buff.continue_time = this.continue_time;
                                }
                            }
                        }
                    }
                }
                else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_ANGER) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    if (dif > 0) {
                        this.playTriggerSpx();
                        this.target_role.beRecoverAnger(this.belong_role, this.sec_value);
                        this.bleed_time = dif;
                    }
                }
                else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_POISON && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    if (dif > 0 && this.target_role.beCanHurt() == true) {
                        this.playTriggerSpx();
                        if (this.target_role.beCanHurt() == true) {
                            this.target_role.bePoisonBlood(this.belong_role, this.sec_value);
                        }
                        this.bleed_time = dif;
                    }
                }
                else if (this.buff_type == zj.TableEnum.TableBufferType.BUFFER_WOUNDED && this.target_role != null) {
                    this.bleed_time = this.bleed_time + rt;
                    var dif = this.bleed_time - this.fir_value;
                    if (dif > 0 && this.target_role.beCanHurt() == true) {
                        this.playTriggerSpx();
                        if (this.target_role.beCanHurt() == true) {
                            this.target_role.beWoundedBlood(this.belong_role, this.sec_value);
                        }
                        this.bleed_time = dif;
                    }
                }
            }
            var _a;
        };
        SkillBuff.prototype.getBuffBaseType = function () {
            return this.buff_type;
        };
        SkillBuff.prototype.getBuffId = function () {
            return this.buff_id;
        };
        SkillBuff.prototype.getTargetRole = function () {
            return this.target_role;
        };
        SkillBuff.prototype.getBuffUseType = function () {
            return this.use_type;
        };
        SkillBuff.prototype.getBuffDamageType = function () {
            return this.damage_type;
        };
        SkillBuff.prototype.getHitRate = function () {
            return this.hit_rate;
        };
        SkillBuff.prototype.getContinueTime = function () {
            return this.continue_time;
        };
        SkillBuff.prototype.getIsFinish = function () {
            return this.b_finish;
        };
        SkillBuff.prototype.getEffectSpx = function () {
            return this.spx;
        };
        SkillBuff.prototype.getBuffNamePaht = function () {
            return this.buff_name_path;
        };
        SkillBuff.prototype.dealShelter = function () {
        };
        SkillBuff.prototype.shelterHurt = function () {
        };
        return SkillBuff;
    }());
    zj.SkillBuff = SkillBuff;
    __reflect(SkillBuff.prototype, "zj.SkillBuff");
})(zj || (zj = {}));
//# sourceMappingURL=SkillBuff.js.map