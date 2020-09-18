var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var BaseTalent = (function () {
        function BaseTalent(id, level, belongRole, bHide, source) {
            // 成员初始化
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.node = null;
            this.nodeName = null;
            this.belong_role = null;
            this.talent_id = null;
            this.talent_level = null;
            this.bHide = null;
            this.source = null;
            this.bEnemy = null;
            this.eyePath = null;
            this.talentEyePath = null;
            this.talent_name = null;
            this.talent_quality = 0;
            this.trigger_type = zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_NONE;
            this.trigger_condition = null;
            this.trigger_rate = 0;
            this.trigger_num = 0;
            this.extra_value = 0;
            this.revive_num = 0;
            this.buqu_time = 0;
            this.rand_revive_num = 0;
            this.tableEffects = [];
            this.tableClean = [];
            this.is_handOut = false;
            this.tableHandOutRate = [];
            //public reset_blood_touch = false
            this.is_has_blood_touch = false;
            this.blood_num = 0;
            this.time_tick = 0;
            // 损失血量
            this.lose_blood_val = 0;
            // 与战斗时间相关重置
            this.is_reset = false;
            // 属性差值
            this.attriDiff = 0;
            // 专精
            /*
            public b_special = false
            public specail_trigger_value = 0
            public specail_effect_value = 0
                  */
            // other
            this.spx = null;
            this.name_spx = null;
            this.extra_value2 = null;
            this.spx_id = null;
            this.css_id = null;
            this.action_id = null;
            this.b_blendActive = null;
            this.pos = null;
            this.b_eyes = null;
            this.talent_name_path = null;
            this.trigger_ani_index = null;
            this.path = null;
            this.growthValue = null;
            this.trigger_decay = null;
            this.belong_role = belongRole;
            this.talent_id = id;
            this.talent_level = level;
            this.bHide = bHide;
            this.source = source;
            this.bEnemy = this.belong_role.bEnemy;
            this.init();
        }
        BaseTalent.prototype.changeBloodTouch = function () {
            //this.reset_blood_touch = true
            this.is_has_blood_touch = true;
            this.blood_num = this.blood_num + 1;
        };
        BaseTalent.prototype.release = function () {
            // body	    
            if (this.node != null && this.spx != null) {
                this.spx.clearSpine();
                this.spx = null;
            }
            if (this.nodeName != null && this.name_spx != null) {
                // this.nodeName.removeChild(this.name_spx, true)
                this.name_spx.clearSpine();
                this.name_spx = null;
            }
            //this.belong_role = null
            this.tableEffects = null;
            this.tableClean = null;
        };
        BaseTalent.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.loadTable();
            this.loadEffect();
        };
        BaseTalent.prototype.loadTable = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tableTalent = zj.TableGeneralTalent.Table(); //CSV.GetTable(StringConfig_Table.baseTalent)
            var type = tableTalent[this.talent_id].talent_type;
            /*
            if( type == this.belong_role.getTalentProId() ){
                this.b_special = true
            }
            */
            // 天赋名称
            this.talent_name = tableTalent[this.talent_id].talent_name;
            // 天赋触发类型
            this.trigger_type = tableTalent[this.talent_id].trigger_type;
            // 天赋触发条件
            this.trigger_condition = tableTalent[this.talent_id].trigger_condition;
            this.talent_quality = tableTalent[this.talent_id].talent_quality;
            // 天赋触发几率
            var rateParam1 = tableTalent[this.talent_id].trigger_rate;
            this.trigger_rate = zj.talent_triggerRate(this.talent_level, rateParam1[zj.adjustIndex(1)], rateParam1[zj.adjustIndex(2)]);
            //this.trigger_decay = tableTalent[this.talent_id].trigger_decay 
            // 专精加成
            /*
            if( this.b_special == true ){
                this.trigger_rate = this.trigger_rate * ( 1 + this.belong_role.getTalentProTriggerValue() / 100)
            }
            */
            this.tableEffects = tableTalent[this.talent_id].talent_effect;
            // 天赋额外参数
            this.extra_value = tableTalent[this.talent_id].talent_extra;
            this.extra_value2 = tableTalent[this.talent_id].talent_extra2;
            if (this.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME) {
                this.time_tick = this.extra_value;
            }
            // 动画相关
            this.spx = null;
            this.name_spx = null;
            this.spx_id = tableTalent[this.talent_id].spx_id;
            this.css_id = tableTalent[this.talent_id].css_id;
            this.action_id = tableTalent[this.talent_id].action_id;
            this.b_blendActive = zj.yuan3(tableTalent[this.talent_id].blend_active == -1, false, true);
            this.pos = tableTalent[this.talent_id].buff_pos;
            this.b_eyes = zj.yuan3(tableTalent[this.talent_id].is_eyes > 0, true, false);
            this.talent_name_path = tableTalent[this.talent_id].buff_name_path;
            this.node = this.belong_role.getBuffNode(this.pos);
            // this.nodeName = this.belong_role.getBuffNameNode()
            var instance = zj.TableMapRole.Item(this.belong_role.mapRoleId);
            this.eyePath = instance.eye_head;
            this.talentEyePath = instance.eye_talent;
            this.is_handOut = zj.yuan3(tableTalent[this.talent_id].is_handOut == -1, false, true);
            this.tableHandOutRate = tableTalent[this.talent_id].handOut_rate;
            this.trigger_ani_index = tableTalent[this.talent_id].trigger_ani_index;
            this.path = tableTalent[this.talent_id].path;
            this.growthValue = 0;
        };
        BaseTalent.prototype.isTouch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return zj.percentIsEffect(this.trigger_rate, this.belong_role, null, "基础天赋是否触发" + this.talent_id);
        };
        BaseTalent.prototype.update = function (tick) {
            if (this.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME) {
                this.time_tick = this.time_tick - tick * 1000;
                if (this.time_tick <= 0) {
                    this.time_tick = 0;
                }
            }
        };
        BaseTalent.prototype.touchDecay = function () {
            // body
            this.trigger_rate = this.trigger_rate * (1 + this.trigger_decay);
            if (this.trigger_rate <= 0) {
                this.trigger_rate = 0;
            }
        };
        BaseTalent.prototype.talentFun = function (value) {
            // body  
            // 瞬时直接触发
            var fightScene = zj.StageSceneManager.Instance.GetCurScene();
            var talentEffect = zj.TableGeneralTalentEffect.Table(); //CSV.GetTable(StringConfig_Table.talentEffect) 
            var total = 100;
            var bSkip = false;
            for (var i = zj.adjustIndex(1); i < this.tableEffects.length; i++) {
                do {
                    if (bSkip) {
                        break;
                    }
                    if (this.is_handOut == true) {
                        var subRate = this.tableHandOutRate[i];
                        if (null == subRate || -1 == subRate) {
                            subRate = 0;
                        }
                        if (zj.percentInTotal(subRate, total) == false) {
                            total = total - subRate;
                            break;
                        }
                        else {
                            bSkip = true;
                        }
                        total = total - subRate;
                    }
                    var targetPlayers = [];
                    var id = this.tableEffects[i];
                    var pos = talentEffect[id].effect_pos;
                    var target = talentEffect[id].effect_target;
                    var effectValue = talentEffect[id].effect_extra;
                    //let effectType = talentEffect[id].effect_target            
                    var rateParam1 = talentEffect[id].effect_rate;
                    var effectRate = zj.talentEffect_triggerRate(this.talent_level, rateParam1[zj.adjustIndex(1)], rateParam1[zj.adjustIndex(2)]);
                    if (effectRate < 100 && zj.percentIsEffect(effectRate) == false) {
                        break;
                    }
                    /*
                    if( this.trigger_type == TableTalentTrigger.TALENT_TRIGGER_GEL_LIFE ){
                        for i = 1, TablePositionType.POSITION_RIGHT do
                            if( Gmgr.generalLifeTalent[i] == null ){
                                Gmgr.generalLifeTalent[i] = {}
                            }
                        }
                        let info = {}
                        let key = null
                        let rolePos = this.belong_role.ePosition
                        if( (pos == TablePositionType.POSITION_LEFT and rolePos == TablePositionType.POSITION_LEFT)
                            or (pos == TablePositionType.POSITION_RIGHT and rolePos == TablePositionType.POSITION_RIGHT) ){
                            key = TablePositionType.POSITION_LEFT
                        }else if( (pos == TablePositionType.POSITION_RIGHT and rolePos == TablePositionType.POSITION_LEFT)
                            or (pos == TablePositionType.POSITION_LEFT and rolePos == TablePositionType.POSITION_RIGHT) ){
                             key = TablePositionType.POSITION_RIGHT
                        }
                        info.belongRolePos = rolePos
                        info.belongRoleId = this.belong_role.roleId
                        info.talent = this
                        info.target = target
                        info.effectId = id
                        info.value = null
                        table.insert(Gmgr.generalLifeTalent[key], info)
                        break
                    }
                    */
                    if (this.trigger_type == zj.TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI) {
                        targetPlayers.push(this.belong_role);
                    }
                    else {
                        if (target == message.ETargetId.TARGET_BRING_HURT_ROLE) {
                            //table.insert(targetPlayers, this.belong_role.getBringHurtRole())
                            targetPlayers.push(this.belong_role.getBringHurtRole());
                        }
                        else if (target == message.ETargetId.TARGET_HURTING_ROLE) {
                            //table.insert(targetPlayers, this.belong_role.getHurtingRole())
                            targetPlayers.push(this.belong_role.getHurtingRole());
                        }
                        else if (target == message.ETargetId.TARGET_REVIVE_PERSON) {
                            //table.insert(targetPlayers, this.belong_role.revivingRole)
                            targetPlayers.push(this.belong_role.revivingRole);
                        }
                        else {
                            targetPlayers = fightScene.getTargetPlayer(this.belong_role, pos, target, null, effectValue);
                        }
                    }
                    for (var i_1 = zj.adjustIndex(1); i_1 < targetPlayers.length; i_1++) {
                        if (targetPlayers[i_1]) {
                            targetPlayers[i_1].newTalentEffect(this, id, value);
                        }
                    }
                } while (false);
            }
            //this.touchDecay()
        };
        BaseTalent.prototype.loadEffect = function (args) {
            // body
            /*if( this.node == null ){ return }
            let function animationTalentEvent(armatureBack,movementType,movementID)
                if( movementType == ccs.MovementEventType.loopComplete or  movementType == ccs.MovementEventType.complete ){
                    armatureBack.setVisible(false)
                    armatureBack.stopAllActions()
                    this.belong_role.tableTalentAni[armatureBack] = null
                }
            }
        
            if( this.action_id != -1 and this.node != null ){
                let name = null
                if( this.spx_id != -1 ){
                    name = resdb.SPX( this.spx_id )
                }else if( this.css_id != -1 ){
                    name = resdb.Css( this.css_id )
                }
        
                if( name != null ){
                    this.node.removeChild(this.spx, true)
                    this.spx = ccs.Armature.create(name)
                    this.spx.setVisible(false)
                    this.node.addChild(this.spx)
                    this.spx.getAnimation().setMovementEventCallFunc(animationTalentEvent)
                }
            }*/
        };
        BaseTalent.prototype.triggerEffect = function () {
            // body
            //if( true ){ return }
            if (this.action_id == -1) {
                return;
            }
            if (this.spx == null) {
                return;
            }
            // 天赋触发音效
            zj.Helper.EftByID(20048);
            if (this.b_blendActive == true) {
                this.spx.setBlendAdditive(true);
            }
            //this.setPos()
            this.spx.setVisible(true);
            this.spx.stopAllActions();
            if (this.pos == "floor") {
                //this.spx.setPosition(ccp(this.belong_role.teamOriginalX, this.belong_role.teamOriginalY + (Gmgr.floor-Gmgr.ground)))
                this.spx.x = this.belong_role.teamOriginalX;
                this.spx.y = this.belong_role.teamOriginalY + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
            }
            this.spx.getAnimation().playWithIndex(this.action_id);
            this.belong_role.tableTalentAni[this.spx] = this;
        };
        BaseTalent.prototype.isSkillKeepingTalent = function (args) {
            if (this.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_TYPE ||
                this.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW) {
                return true;
            }
            return false;
        };
        return BaseTalent;
    }());
    zj.BaseTalent = BaseTalent;
    __reflect(BaseTalent.prototype, "zj.BaseTalent");
    var TalentEffect = (function () {
        function TalentEffect(targetRole, belongTalent, effect_id, value) {
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.node = null;
            this.target_role = null;
            this.belong_talent = null;
            this.belong_role = null;
            this.effect_id = null;
            this.hurt_value = null;
            this.b_disappear = false;
            this.effect_type = zj.TableEnum.TableTalentEffect.TALENT_EFFECT_NONE;
            this.effect_param = -1;
            this.effect_rate = -1;
            this.effect_pos = -1;
            this.effect_target = -1;
            this.effect_value = 0;
            this.growUp_value = 0;
            this.bakeup_value = 0;
            this.effect_extra = 0;
            this.effect_extra2 = 0;
            this.effect_extraParam = null;
            this.effect_buffId = -1;
            this.effect_buffLv = 0;
            //public bActive = true
            this.timer = 0;
            this.trigger_num = 1;
            this.active_num = 0;
            this.stepBuffHitRate = -1;
            this.b_active = true;
            this.sum_hp = 0;
            // other
            this.spx_id = null;
            this.action_id = null;
            this.b_blendActive = null;
            this.pos = null;
            this.target_role = targetRole;
            this.belong_talent = belongTalent;
            this.belong_role = belongTalent.belong_role;
            this.effect_id = effect_id;
            this.hurt_value = value;
            this.init();
        }
        TalentEffect.prototype.release = function () {
            // body
            this.scene = null;
            this.target_role = null;
            this.belong_talent = null;
            this.belong_role = null;
        };
        TalentEffect.prototype.init = function () {
            this.loadTable();
        };
        TalentEffect.prototype.loadTable = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var talentEffect = zj.TableGeneralTalentEffect.Table(); //CSV.GetTable(StringConfig_Table.talentEffect)   
            this.effect_type = talentEffect[this.effect_id].effect_type;
            this.effect_param = talentEffect[this.effect_id].effect_param;
            this.effect_pos = talentEffect[this.effect_id].effect_pos;
            this.effect_target = talentEffect[this.effect_id].effect_target;
            var rateParam1 = talentEffect[this.effect_id].effect_rate;
            this.effect_rate = zj.talentEffect_triggerRate(this.belong_talent.talent_level, rateParam1[zj.adjustIndex(1)], rateParam1[zj.adjustIndex(2)]);
            var valueParam1 = talentEffect[this.effect_id].effect_value;
            this.effect_value = zj.talentEffect_effectValue(this.belong_talent.talent_level, valueParam1[zj.adjustIndex(1)], valueParam1[zj.adjustIndex(2)]);
            if (zj.Table.FindK(talentEffect[this.effect_id].scene_type, zj.Gmgr.Instance.fightType) != -1) {
                //this.scene_add_value = talentEffect[this.effect_id].scene_add_value
                var sceneAddParam = talentEffect[this.effect_id].scene_add_value;
                this.effect_value = this.effect_value + zj.talentEffect_effectValue(this.belong_talent.talent_level, sceneAddParam[zj.adjustIndex(1)], sceneAddParam[zj.adjustIndex(2)]);
            }
            this.effect_value = this.effect_value + this.belong_talent.growthValue;
            this.bakeup_value = this.effect_value;
            var valueParam2 = talentEffect[this.effect_id].growUp_value;
            this.growUp_value = zj.talentEffect_effectValue(this.belong_talent.talent_level, valueParam2[zj.adjustIndex(1)], valueParam2[zj.adjustIndex(2)]);
            // 专精提升
            /*
            if( this.belong_talent.b_special == true ){
                this.effect_value = this.effect_value * ( 1 + this.belong_role.getTalentProEffectValue() / 100 )
            }
            */
            this.effect_extra = talentEffect[this.effect_id].effect_extra;
            this.effect_extra2 = talentEffect[this.effect_id].effect_extra2;
            this.effect_extraParam = talentEffect[this.effect_id].effect_extra3;
            this.effect_buffId = talentEffect[this.effect_id].effect_buffId;
            this.effect_buffLv = this.belong_talent.talent_level; //talentEffect[this.effect_id].effect_buffLv
            // 动画相关
            this.spx_id = talentEffect[this.effect_id].spx_id;
            this.action_id = talentEffect[this.effect_id].action_id;
            this.b_blendActive = zj.yuan3(talentEffect[this.effect_id].blend_active == -1, false, true);
            this.pos = talentEffect[this.effect_id].buff_pos;
            this.node = this.target_role.getBuffNode(this.pos);
            // specail
            if ((this.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_RPOTO_TO_ATK || this.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROTO_TO_REALHURT)) {
                this.effect_param = this.effect_extra;
            }
            if (this.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_ADD_HURT) {
                this.b_active = false;
            }
        };
        TalentEffect.prototype.update = function (dt) {
            var _this = this;
            // 判断所属的天赋id是否还在里面出现
            if (this.b_disappear == true) {
                return;
            }
            if (this.effect_type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE) {
                if (this.target_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.target_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.target_role.beBuffHurt(this.effect_buffLv, this.effect_buffId, this.belong_role, null);
                    this.target_role.playTalentEffect(this);
                }
                this.b_disappear = true;
            }
            if (this.target_role.bPause && this.scene.isTimePause()) {
                return;
            }
            switch (this.effect_type) {
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE_TIMELY:
                    this.target_role.addFightExtraAttri(this.effect_param, this.effect_value);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE_TIMELY:
                    this.target_role.reduceFightExtraAttri(this.effect_param, this.effect_value);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_REDUCE:
                    if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        var tvalue_1 = this.effect_value * this.target_role.getMaxHp() / 100;
                        this.belong_role.flowHurtValue(tvalue_1, tvalue_1, this.target_role);
                        this.target_role.dealCutHp(this.belong_role, tvalue_1, true);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP_SPECIAL) {
                        var tvalue_2 = this.effect_value * this.target_role.getMaxHp() / 100;
                        this.belong_role.flowHurtValue(tvalue_2, tvalue_2, this.target_role);
                        this.target_role.dealCutHp(this.belong_role, tvalue_2, true, 2, false);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BRING_ROLE_HP) {
                        var tvalue_3 = this.effect_value * this.belong_role.getMaxHp() / 100;
                        this.belong_role.flowHurtValue(tvalue_3, tvalue_3, this.target_role);
                        this.target_role.dealCutHp(this.belong_role, tvalue_3, true);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_LOSS_BLOOD) {
                        var loss = this.target_role.getMaxHp() - this.target_role.getHp();
                        var tvalue_4 = this.effect_value * loss / 100;
                        this.belong_role.flowHurtValue(tvalue_4, tvalue_4, this.target_role);
                        this.target_role.dealCutHp(this.belong_role, tvalue_4, true);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        var immuneBuff = this.target_role.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                        if (immuneBuff == null) {
                            this.target_role.dealCutRage(this.effect_value);
                            this.target_role.playTalentEffect(this);
                        }
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        this.target_role.dealCutCd(this.effect_value, true);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_PERCENT_CD) {
                        var pressSkill = this.target_role.getPressSkill();
                        if (pressSkill != null) {
                            this.target_role.dealCutCd(pressSkill.getFixedCd() * this.effect_value / 100, true);
                            this.target_role.playTalentEffect(this);
                        }
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getCurHelpCd() - this.effect_value)
                            }
                        */
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_ADD:
                    if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        var addValue = this.belong_role.handleTalentEffect_ProBuffRecoverValue();
                        var tvalue_5 = this.effect_value * this.target_role.getMaxHp() / 100;
                        tvalue_5 = tvalue_5 * (1 + addValue / 100);
                        this.belong_role.flowRecoverValue(tvalue_5);
                        this.target_role.dealRecHp(tvalue_5);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BRING_ROLE_HP) {
                        var addValue = this.belong_role.handleTalentEffect_ProBuffRecoverValue();
                        var tvalue_6 = this.effect_value * this.belong_role.getMaxHp() / 100;
                        tvalue_6 = tvalue_6 * (1 + addValue / 100);
                        this.belong_role.flowRecoverValue(tvalue_6);
                        this.target_role.dealRecHp(tvalue_6);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_LOSS_BLOOD) {
                        var loss = this.target_role.getMaxHp() - this.target_role.getHp();
                        var tvalue_7 = this.effect_value * loss / 100;
                        this.belong_role.flowRecoverValue(tvalue_7);
                        this.target_role.dealRecHp(tvalue_7);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        this.target_role.dealRecRage(this.effect_value);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        var immuneBuff = this.target_role.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                        if (immuneBuff == null) {
                            this.target_role.dealAddCd(this.effect_value, zj.yuan3(this.effect_extra == 1, true, false));
                            this.target_role.playTalentEffect(this);
                            this.target_role.triggerPullCdAdd();
                        }
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_PERCENT_CD) {
                        var immuneBuff = this.target_role.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                        if (immuneBuff == null) {
                            var pressSkill = this.target_role.getPressSkill();
                            if (pressSkill != null) {
                                this.target_role.dealAddCd(pressSkill.getFixedCd() * this.effect_value / 100, zj.yuan3(this.effect_extra == 1, true, false));
                                this.target_role.playTalentEffect(this);
                                this.target_role.triggerPullCdAdd();
                            }
                        }
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getCurHelpCd() + this.effect_value)
                            }
                        */
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_MIN:
                    if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        var tvalue_8 = this.target_role.getHp();
                        this.belong_role.flowHurtValue(tvalue_8, tvalue_8, this.target_role);
                        this.target_role.dealCutHp(this.belong_role, this.target_role.getHp(), true);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        var immuneBuff = this.target_role.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                        if (immuneBuff == null) {
                            this.target_role.dealCutRage(this.target_role.getRage());
                            this.target_role.playTalentEffect(this);
                        }
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        this.target_role.dealCutCdMin();
                        this.target_role.playTalentEffect(this);
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(0)
                            }
                        */
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_MAX:
                    if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        var tvalue_9 = this.target_role.getMaxHp() - this.target_role.getHp();
                        this.belong_role.flowRecoverValue(tvalue_9);
                        this.target_role.dealRecHp(tvalue_9);
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        this.target_role.dealRecRage(this.target_role.getMaxRage() - this.target_role.getRage());
                        this.target_role.playTalentEffect(this);
                    }
                    else if (this.effect_param == zj.TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        var immuneBuff = this.target_role.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                        if (immuneBuff == null) {
                            this.target_role.dealAddCdMax();
                            this.target_role.playTalentEffect(this);
                            this.target_role.triggerPullCdAdd();
                        }
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getMaxHelpCd())
                            }
                        */
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CUT_CD_AND_REL_SKILL:
                    this.target_role.dealCutCdAndRelSkill();
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP:
                    var tmp = this.effect_value * this.hurt_value / 100 * this.target_role.getRecoverRadio();
                    if (tmp <= 1) {
                        tmp = 1;
                    }
                    this.belong_role.flowRecoverValue(tmp);
                    this.target_role.dealRecHp(tmp);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP2:
                    var forbidden = this.target_role.getForbideRecoverValue();
                    if (forbidden < 1) {
                        var tvalue_10 = this.effect_value * this.hurt_value / 100;
                        var tmp_1 = tvalue_10 * (1 - forbidden);
                        this.belong_role.flowRecoverValue(tmp_1);
                        this.target_role.dealRecHp(tmp_1);
                        this.target_role.playTalentEffect(this);
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PERMANENT_DAMAGE_HP:
                    if (this.target_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        var tvalue_11 = this.effect_value * this.hurt_value / 100;
                        this.target_role.foreverCutHp(this.belong_role, tvalue_11);
                        this.target_role.playTalentEffect(this);
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_REDUCE_HP:
                    var tvalue1 = this.effect_value * this.hurt_value / 100;
                    this.belong_role.flowHurtValue(tvalue1, tvalue1, this.target_role);
                    this.belong_role.doReboundUi();
                    this.target_role.dealCutHp(this.belong_role, tvalue1, true);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_MYLOSTHP:
                    var tvalue = (this.belong_role.getMaxHp() - this.belong_role.getHp()) * this.effect_value / 100;
                    this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role);
                    this.belong_role.doReboundUi();
                    this.target_role.dealCutHp(this.belong_role, tvalue, true);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_MYDEFENCE:
                    var tvalue2 = this.belong_role.getDef() * this.effect_value / 100;
                    this.belong_role.flowHurtValue(tvalue2, tvalue2, this.target_role);
                    this.target_role.dealCutHp(this.belong_role, tvalue2, true);
                    this.target_role.playTalentEffect(this);
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD:
                    if (this.target_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.target_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                        this.target_role.beBuffHurt(this.effect_buffLv, this.effect_buffId, this.belong_role, null);
                        this.target_role.playTalentEffect(this);
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_AUTO_ADDHP:
                    if (this.target_role.bDead != true) {
                        //if( this.target_role.bDead != true and this.scene.sceneState == TableSceneState.SCENE_STATE_FIGHT ){
                        this.timer = this.timer + dt * 1000;
                        if (this.timer >= this.effect_extra) {
                            this.timer = 0;
                            var forbidden_1 = this.target_role.getForbideRecoverValue();
                            if (forbidden_1 < 1) {
                                var t_value = this.effect_value * this.target_role.getMaxHp() / 100;
                                var tmp_2 = t_value * (1 - forbidden_1);
                                this.target_role.dealRecHp(t_value);
                            }
                        }
                    }
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HP_ADD_BY_ATK:
                    var value = 0;
                    var damage = 0;
                    value = this.belong_role.getAtk() * this.effect_value / 100;
                    damage = message.EDamageType.DAMAGE_TYPE_PHY;
                    var forbidden1 = this.target_role.getForbideRecoverValue();
                    if (forbidden1 < 1) {
                        var tmp_3 = damage * (1 - forbidden1);
                        this.belong_role.flowRecoverValue(tmp_3);
                        this.target_role.dealRecHp(tmp_3);
                        this.target_role.playTalentEffect(this);
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HP_REDUCE_BY_ATK:
                    var value1 = 0;
                    value1 = this.belong_role.getAtk() * this.effect_value / 100;
                    this.target_role.dealCutHp(this.belong_role, value1, true);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_EMERGE_HURT_EFFECT:
                    var effect = new zj.TalentHurtEffect();
                    effect.newSetData(this.effect_extra, this);
                    effect.initHand();
                    effect.playEffect();
                    this.belong_role.addEffect(effect);
                    //this.target_role.addEffect( effect )
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_SKILL_LEVEL:
                    this.target_role.changeSkillLevel(this.effect_param, this.effect_value);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CALL_MONSTER:
                    this.scene.createCallMonster(this.effect_extra, this.belong_role.bEnemy, this.belong_role, 0, this.belong_talent.talent_level);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_RANDOM_DISPEL_BUFF:
                    this.target_role.dispelBuff(this.effect_extra);
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON:
                    var fightScene_1 = zj.StageSceneManager.Instance.GetCurScene();
                    var tag = fightScene_1.isRandRevive(this.target_role.bEnemy);
                    var buff = function () {
                        var myTbl = fightScene_1.getTargetPlayer(_this.target_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_ALL);
                        for (var i = zj.adjustIndex(1); i < myTbl.length; i++) {
                            myTbl[i].beBuffHurt(_this.effect_buffLv, _this.effect_buffId, _this.target_role, null);
                        }
                    };
                    var randReviveNum = function () {
                        _this.belong_talent.rand_revive_num = _this.belong_talent.rand_revive_num + 1;
                        if (_this.belong_talent.rand_revive_num >= _this.effect_extra - 1) {
                            _this.belong_talent.rand_revive_num = _this.effect_extra - 1;
                        }
                    };
                    if (tag == true) {
                        if (this.belong_talent.rand_revive_num == this.effect_extra - 1) {
                            this.belong_talent.rand_revive_num = 0;
                            var suc = void 0, role = fightScene_1.randRevive(this.target_role.bEnemy, this.effect_value);
                            if (suc) {
                                this.belong_role.revivingRole = role;
                                this.belong_role.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_REVIVE_OTHER_PERSON, -1);
                            }
                        }
                        else {
                            buff();
                            randReviveNum();
                        }
                    }
                    else {
                        buff();
                        randReviveNum();
                    }
                    this.target_role.playTalentEffect(this);
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_STEAL_HP_RECOVER:
                    var fightScene1 = zj.StageSceneManager.Instance.GetCurScene();
                    var enemyTbl = fightScene1.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_HP_MAX, true);
                    var myTbl = fightScene1.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_HP_MIN);
                    if (enemyTbl[zj.adjustIndex(1)] != null && myTbl[zj.adjustIndex(1)] != null) {
                        var hp = enemyTbl[zj.adjustIndex(1)].getHp() * this.effect_value / 100;
                        enemyTbl[zj.adjustIndex(1)].dealCutHp(this.target_role, hp, true);
                        this.target_role.flowRecoverValue(hp);
                        myTbl[zj.adjustIndex(1)].dealRecHp(hp);
                        this.target_role.playTalentEffect(this);
                    }
                    this.b_disappear = true;
                    break;
                case zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HP_AVERAGE:
                    this.target_role.handleHPAverage();
                    this.b_disappear = true;
                    break;
                default:
                    if (this.belong_talent.isSkillKeepingTalent() == true) {
                        if (this.belong_talent.belong_role.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                            this.b_disappear = true;
                        }
                        else {
                            if (this.belong_talent.belong_role.curSkill != null) {
                                if (this.belong_talent.belong_role.curSkill.isKeepingTalentExit(this.belong_talent) == false) {
                                    this.b_disappear = true;
                                }
                            }
                            else {
                                this.b_disappear = true;
                            }
                        }
                    }
                    break;
            }
        };
        TalentEffect.prototype.useEffect = function (args) {
            // 永久性的不会消失
            // 持续性的需要在udate里判断消失    
            this.disappear();
        };
        TalentEffect.prototype.disappear = function (args) {
            // body
            if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ALL_FIGHT) {
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY) {
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SHIHUN) {
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI) {
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENTER_WEEK) {
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START) {
                if (this.effect_type != zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_DEBUFF_TIME) {
                    this.b_disappear = true;
                }
                /*
                }else if( this.effect_type == TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK ){
                    if( this.num >= this.effect_extra ){
                        this.b_disappear = true
                    }
                */
            }
            else if (this.belong_talent.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BLOOD_LOW) {
                this.target_role.playTalentEffect(this);
                if (this.belong_talent.is_has_blood_touch == false) {
                    this.b_disappear = true;
                }
            }
            else if (this.belong_talent.isSkillKeepingTalent()) {
                this.target_role.playTalentEffect(this);
            }
            else {
                this.target_role.playTalentEffect(this);
                this.b_disappear = true;
            }
        };
        TalentEffect.prototype.setHurtValue = function (value) {
            // body
            this.hurt_value = value;
        };
        TalentEffect.prototype.isActive = function () {
            // body
            return this.b_active;
        };
        return TalentEffect;
    }());
    zj.TalentEffect = TalentEffect;
    __reflect(TalentEffect.prototype, "zj.TalentEffect");
    var TalentEffectAni = (function () {
        function TalentEffectAni(belongRole, talentEffect) {
            this.belongRole = null;
            this.talentEffect = null;
            this.spx = null;
            this.node = null;
            this.b_finish = false;
            this.belongRole = belongRole;
            this.talentEffect = talentEffect;
            this.init();
        }
        TalentEffectAni.prototype.release = function (args) {
            // body
            if (this.node != null) {
                this.node.removeChild(this.spx, true);
            }
        };
        TalentEffectAni.prototype.init = function (args) {
            // body
            //this.node = this.belongRole.nodeUpEffect
            this.node = this.belongRole.getBuffNode(this.talentEffect.pos);
            this.loadEffect();
        };
        TalentEffectAni.prototype.loadEffect = function (args) {
            // body
            //if( true ){ return }
            /* if( this.node == null ){ return }
             let name = resdb.SPX( this.talentEffect.spx_id )
             this.spx = ccs.Armature.create(name)
             this.node.addChild(this.spx)
         
             let function animationEffectEvent(armatureBack,movementType,movementID)
                 if( movementType == ccs.MovementEventType.loopComplete or  movementType == ccs.MovementEventType.complete ){
                     this.spx.setVisible(false)
                     this.spx.stopAllActions()
                     this.b_finish = true
                 }
             }
             this.spx.getAnimation().setMovementEventCallFunc(animationEffectEvent)
              
             if( this.talentEffect.b_blendActive == true ){
                 this.spx.setBlendFunc(gl.SRC_ALPHA , gl.ONE )
             }
             this.spx.setVisible(true)
         
             //let x, y = this.belongRole.getTalentAniPos()
             //this.spx.setPosition( ccp(x, y) )
             this.spx.stopAllActions()
             this.spx.getAnimation().playWithIndex(this.talentEffect.action_id)*/
        };
        TalentEffectAni.prototype.update = function (tick) {
            // body
            // 复活特效单独处理
        };
        return TalentEffectAni;
    }());
    zj.TalentEffectAni = TalentEffectAni;
    __reflect(TalentEffectAni.prototype, "zj.TalentEffectAni");
})(zj || (zj = {}));
//# sourceMappingURL=BaseTalent.js.map