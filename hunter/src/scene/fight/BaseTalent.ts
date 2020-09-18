namespace zj {


    export class BaseTalent {

        // 成员初始化
        public scene = StageSceneManager.Instance.GetCurScene()
        public node = null
        public nodeName = null

        public belong_role = null
        public talent_id = null
        public talent_level = null
        public bHide = null
        public source = null

        public bEnemy = null
        public eyePath = null
        public talentEyePath = null

        public talent_name = null
        public talent_quality = 0
        public trigger_type = TableEnum.TableTalentTrigger.TALENT_TRIGGER_NONE
        public trigger_condition = null
        public trigger_rate = 0
        public trigger_num = 0
        public extra_value = 0

        public revive_num = 0
        public buqu_time = 0
        public rand_revive_num = 0

        public tableEffects = []
        public tableClean = []

        public is_handOut = false
        public tableHandOutRate = []

        //public reset_blood_touch = false
        public is_has_blood_touch = false
        public blood_num = 0
        public time_tick = 0

        // 损失血量
        public lose_blood_val = 0

        // 与战斗时间相关重置
        public is_reset = false

        // 属性差值
        public attriDiff = 0
        // 专精
        /*   
        public b_special = false
        public specail_trigger_value = 0 
        public specail_effect_value = 0
              */

        // other
        public spx = null;
        public name_spx = null;
        public extra_value2 = null;
        public spx_id = null;
        public css_id = null;
        public action_id = null;
        public b_blendActive = null;
        public pos = null;
        public b_eyes = null;
        public talent_name_path = null;
        public trigger_ani_index = null;
        public path = null;
        public growthValue = null;
        public trigger_decay = null


        constructor(id, level, belongRole, bHide, source) {

            this.belong_role = belongRole
            this.talent_id = id
            this.talent_level = level
            this.bHide = bHide
            this.source = source

            this.bEnemy = this.belong_role.bEnemy

            this.init()
        }

        public changeBloodTouch() {
            //this.reset_blood_touch = true
            this.is_has_blood_touch = true
            this.blood_num = this.blood_num + 1
        }

        public release() {
            // body	    
            if (this.node != null && this.spx != null) {
                this.spx.clearSpine();
                this.spx = null
            }

            if (this.nodeName != null && this.name_spx != null) {
                // this.nodeName.removeChild(this.name_spx, true)
                this.name_spx.clearSpine();
                this.name_spx = null;
            }

            //this.belong_role = null
            this.tableEffects = null
            this.tableClean = null
        }

        public init(...args) {
            // body
            this.loadTable()
            this.loadEffect()
        }

        public loadTable(...args) {
            // body
            let tableTalent = TableGeneralTalent.Table(); //CSV.GetTable(StringConfig_Table.baseTalent)
            let type = tableTalent[this.talent_id].talent_type

            /*
            if( type == this.belong_role.getTalentProId() ){
                this.b_special = true
            }
            */

            // 天赋名称
            this.talent_name = tableTalent[this.talent_id].talent_name
            // 天赋触发类型
            this.trigger_type = tableTalent[this.talent_id].trigger_type
            // 天赋触发条件
            this.trigger_condition = tableTalent[this.talent_id].trigger_condition
            this.talent_quality = tableTalent[this.talent_id].talent_quality

            // 天赋触发几率
            let rateParam1 = tableTalent[this.talent_id].trigger_rate
            this.trigger_rate = talent_triggerRate(this.talent_level, rateParam1[adjustIndex(1)], rateParam1[adjustIndex(2)])

            //this.trigger_decay = tableTalent[this.talent_id].trigger_decay 

            // 专精加成
            /*
            if( this.b_special == true ){
                this.trigger_rate = this.trigger_rate * ( 1 + this.belong_role.getTalentProTriggerValue() / 100)
            }
            */

            this.tableEffects = tableTalent[this.talent_id].talent_effect
            // 天赋额外参数
            this.extra_value = tableTalent[this.talent_id].talent_extra
            this.extra_value2 = tableTalent[this.talent_id].talent_extra2
            if (this.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME) {
                this.time_tick = this.extra_value
            }

            // 动画相关
            this.spx = null
            this.name_spx = null

            this.spx_id = tableTalent[this.talent_id].spx_id
            this.css_id = tableTalent[this.talent_id].css_id
            this.action_id = tableTalent[this.talent_id].action_id
            this.b_blendActive = yuan3(tableTalent[this.talent_id].blend_active == -1, false, true)
            this.pos = tableTalent[this.talent_id].buff_pos

            this.b_eyes = yuan3(tableTalent[this.talent_id].is_eyes > 0, true, false)
            this.talent_name_path = tableTalent[this.talent_id].buff_name_path

            this.node = this.belong_role.getBuffNode(this.pos)
            // this.nodeName = this.belong_role.getBuffNameNode()

            let instance = TableMapRole.Item(this.belong_role.mapRoleId)
            this.eyePath = instance.eye_head
            this.talentEyePath = instance.eye_talent

            this.is_handOut = yuan3(tableTalent[this.talent_id].is_handOut == -1, false, true)
            this.tableHandOutRate = tableTalent[this.talent_id].handOut_rate

            this.trigger_ani_index = tableTalent[this.talent_id].trigger_ani_index
            this.path = tableTalent[this.talent_id].path
            this.growthValue = 0
        }

        public isTouch(...args) {
            // body
            return percentIsEffect(this.trigger_rate, this.belong_role, null, "基础天赋是否触发" + this.talent_id)
        }

        public update(tick) {
            if (this.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME) {
                this.time_tick = this.time_tick - tick * 1000
                if (this.time_tick <= 0) {
                    this.time_tick = 0
                }
            }
        }

        public touchDecay() {
            // body
            this.trigger_rate = this.trigger_rate * (1 + this.trigger_decay)
            if (this.trigger_rate <= 0) { this.trigger_rate = 0 }
        }

        public talentFun(value) {
            // body  
            // 瞬时直接触发
            let fightScene = StageSceneManager.Instance.GetCurScene()
            let talentEffect = TableGeneralTalentEffect.Table(); //CSV.GetTable(StringConfig_Table.talentEffect) 

            let total = 100
            let bSkip = false

            for (let i = adjustIndex(1); i < this.tableEffects.length; i++) {
                do {
                    if (bSkip) {
                        break
                    }

                    if (this.is_handOut == true) {
                        let subRate = this.tableHandOutRate[i]
                        if (null == subRate || -1 == subRate) {
                            subRate = 0
                        }
                        if (percentInTotal(subRate, total) == false) {
                            total = total - subRate
                            break
                        } else {
                            bSkip = true
                        }
                        total = total - subRate
                    }

                    let targetPlayers = []
                    let id = this.tableEffects[i]
                    let pos = talentEffect[id].effect_pos
                    let target = talentEffect[id].effect_target
                    let effectValue = talentEffect[id].effect_extra

                    //let effectType = talentEffect[id].effect_target            
                    let rateParam1 = talentEffect[id].effect_rate
                    let effectRate = talentEffect_triggerRate(this.talent_level, rateParam1[adjustIndex(1)], rateParam1[adjustIndex(2)])
                    if (effectRate < 100 && percentIsEffect(effectRate) == false) {
                        break
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

                    if (this.trigger_type == TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI) {
                        targetPlayers.push(this.belong_role);
                    } else {
                        if (target == message.ETargetId.TARGET_BRING_HURT_ROLE) {
                            //table.insert(targetPlayers, this.belong_role.getBringHurtRole())
                            targetPlayers.push(this.belong_role.getBringHurtRole());
                        } else if (target == message.ETargetId.TARGET_HURTING_ROLE) {
                            //table.insert(targetPlayers, this.belong_role.getHurtingRole())
                            targetPlayers.push(this.belong_role.getHurtingRole());
                        } else if (target == message.ETargetId.TARGET_REVIVE_PERSON) {
                            //table.insert(targetPlayers, this.belong_role.revivingRole)
                            targetPlayers.push(this.belong_role.revivingRole);
                        } else {
                            targetPlayers = fightScene.getTargetPlayer(this.belong_role, pos, target, null, effectValue)
                        }
                    }
                    for (let i = adjustIndex(1); i < targetPlayers.length; i++) {
                        if (targetPlayers[i]) {
                            targetPlayers[i].newTalentEffect(this, id, value);
                        }
                    }
                } while (false)
            }
            //this.touchDecay()
        }

        public loadEffect(args?) {
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
        }

        public triggerEffect() {
            // body
            //if( true ){ return }

            if (this.action_id == -1) { return }
            if (this.spx == null) { return }

            // 天赋触发音效
            Helper.EftByID(20048);

            if (this.b_blendActive == true) {
                this.spx.setBlendAdditive(true);
            }
            //this.setPos()
            this.spx.setVisible(true)
            this.spx.stopAllActions()
            if (this.pos == "floor") {
                //this.spx.setPosition(ccp(this.belong_role.teamOriginalX, this.belong_role.teamOriginalY + (Gmgr.floor-Gmgr.ground)))
                this.spx.x = this.belong_role.teamOriginalX;
                this.spx.y = this.belong_role.teamOriginalY + (Gmgr.Instance.floor - Gmgr.Instance.ground);
            }
            this.spx.getAnimation().playWithIndex(this.action_id)

            this.belong_role.tableTalentAni[this.spx] = this;
        }

        public isSkillKeepingTalent(args) {
            if (this.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_TYPE ||
                this.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW) {
                return true
            }
            return false
        }

    }

    export class TalentEffect {

        public scene = StageSceneManager.Instance.GetCurScene()

        public node = null

        public target_role = null
        public belong_talent = null
        public belong_role = null
        public effect_id = null
        public hurt_value = null
        public b_disappear = false

        public effect_type = TableEnum.TableTalentEffect.TALENT_EFFECT_NONE
        public effect_param = -1
        public effect_rate = -1

        public effect_pos = -1
        public effect_target = -1

        public effect_value = 0
        public growUp_value = 0
        public bakeup_value = 0
        public effect_extra = 0
        public effect_extra2 = 0
        public effect_extraParam = null
        public effect_buffId = -1
        public effect_buffLv = 0

        //public bActive = true
        public timer = 0
        public trigger_num = 1
        public active_num = 0
        public stepBuffHitRate = -1
        public b_active = true
        public sum_hp = 0

        // other
        public spx_id = null
        public action_id = null
        public b_blendActive = null
        public pos = null

        constructor(targetRole, belongTalent, effect_id, value) {

            this.target_role = targetRole;
            this.belong_talent = belongTalent;
            this.belong_role = belongTalent.belong_role;
            this.effect_id = effect_id;
            this.hurt_value = value;

            this.init();
        }

        public release() {
            // body
            this.scene = null
            this.target_role = null
            this.belong_talent = null
            this.belong_role = null
        }

        public init() {
            this.loadTable();
        }



        public loadTable(...args) {
            let talentEffect = TableGeneralTalentEffect.Table();//CSV.GetTable(StringConfig_Table.talentEffect)   
            this.effect_type = talentEffect[this.effect_id].effect_type
            this.effect_param = talentEffect[this.effect_id].effect_param

            this.effect_pos = talentEffect[this.effect_id].effect_pos
            this.effect_target = talentEffect[this.effect_id].effect_target

            let rateParam1 = talentEffect[this.effect_id].effect_rate
            this.effect_rate = talentEffect_triggerRate(this.belong_talent.talent_level, rateParam1[adjustIndex(1)], rateParam1[adjustIndex(2)])

            let valueParam1 = talentEffect[this.effect_id].effect_value
            this.effect_value = talentEffect_effectValue(this.belong_talent.talent_level, valueParam1[adjustIndex(1)], valueParam1[adjustIndex(2)])

            if (Table.FindK(talentEffect[this.effect_id].scene_type, Gmgr.Instance.fightType) != -1) {
                //this.scene_add_value = talentEffect[this.effect_id].scene_add_value
                let sceneAddParam = talentEffect[this.effect_id].scene_add_value
                this.effect_value = this.effect_value + talentEffect_effectValue(this.belong_talent.talent_level, sceneAddParam[adjustIndex(1)], sceneAddParam[adjustIndex(2)])
            }
            this.effect_value = this.effect_value + this.belong_talent.growthValue

            this.bakeup_value = this.effect_value

            let valueParam2 = talentEffect[this.effect_id].growUp_value
            this.growUp_value = talentEffect_effectValue(this.belong_talent.talent_level, valueParam2[adjustIndex(1)], valueParam2[adjustIndex(2)])

            // 专精提升
            /*
            if( this.belong_talent.b_special == true ){        
                this.effect_value = this.effect_value * ( 1 + this.belong_role.getTalentProEffectValue() / 100 )
            }
            */

            this.effect_extra = talentEffect[this.effect_id].effect_extra
            this.effect_extra2 = talentEffect[this.effect_id].effect_extra2
            this.effect_extraParam = talentEffect[this.effect_id].effect_extra3
            this.effect_buffId = talentEffect[this.effect_id].effect_buffId
            this.effect_buffLv = this.belong_talent.talent_level//talentEffect[this.effect_id].effect_buffLv

            // 动画相关
            this.spx_id = talentEffect[this.effect_id].spx_id
            this.action_id = talentEffect[this.effect_id].action_id
            this.b_blendActive = yuan3(talentEffect[this.effect_id].blend_active == -1, false, true)
            this.pos = talentEffect[this.effect_id].buff_pos
            this.node = this.target_role.getBuffNode(this.pos)

            // specail
            if ((this.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_RPOTO_TO_ATK || this.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_PROTO_TO_REALHURT)) {
                this.effect_param = this.effect_extra
            }

            if (this.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_ADD_HURT) {
                this.b_active = false
            }
        }


        public update(dt) {
            // 判断所属的天赋id是否还在里面出现
            if (this.b_disappear == true) { return }
            if (this.effect_type == TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_INFINITIZE) {
                if (this.target_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.target_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.target_role.beBuffHurt(this.effect_buffLv, this.effect_buffId, this.belong_role, null)
                    this.target_role.playTalentEffect(this)
                }
                this.b_disappear = true
            }

            if (this.target_role.bPause && this.scene.isTimePause()) {
                return
            }

            switch (this.effect_type) {
                case TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE_TIMELY:
                    this.target_role.addFightExtraAttri(this.effect_param, this.effect_value)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE_TIMELY:
                    this.target_role.reduceFightExtraAttri(this.effect_param, this.effect_value)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_REDUCE:
                    if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        let tvalue = this.effect_value * this.target_role.getMaxHp() / 100

                        this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                        this.target_role.dealCutHp(this.belong_role, tvalue, true)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP_SPECIAL) {
                        let tvalue = this.effect_value * this.target_role.getMaxHp() / 100

                        this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                        this.target_role.dealCutHp(this.belong_role, tvalue, true, 2, false)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BRING_ROLE_HP) {
                        let tvalue = this.effect_value * this.belong_role.getMaxHp() / 100

                        this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                        this.target_role.dealCutHp(this.belong_role, tvalue, true)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_LOSS_BLOOD) {
                        let loss = this.target_role.getMaxHp() - this.target_role.getHp()
                        let tvalue = this.effect_value * loss / 100

                        this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                        this.target_role.dealCutHp(this.belong_role, tvalue, true)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        let immuneBuff = this.target_role.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE)
                        if (immuneBuff == null) {
                            this.target_role.dealCutRage(this.effect_value)
                            this.target_role.playTalentEffect(this)
                        }
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        this.target_role.dealCutCd(this.effect_value, true)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_PERCENT_CD) {
                        let pressSkill = this.target_role.getPressSkill()
                        if (pressSkill != null) {
                            this.target_role.dealCutCd(pressSkill.getFixedCd() * this.effect_value / 100, true)
                            this.target_role.playTalentEffect(this)
                        }
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getCurHelpCd() - this.effect_value)
                            }
                        */
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_ADD:
                    if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        let addValue = this.belong_role.handleTalentEffect_ProBuffRecoverValue()
                        let tvalue = this.effect_value * this.target_role.getMaxHp() / 100
                        tvalue = tvalue * (1 + addValue / 100)

                        this.belong_role.flowRecoverValue(tvalue)
                        this.target_role.dealRecHp(tvalue)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BRING_ROLE_HP) {
                        let addValue = this.belong_role.handleTalentEffect_ProBuffRecoverValue()
                        let tvalue = this.effect_value * this.belong_role.getMaxHp() / 100
                        tvalue = tvalue * (1 + addValue / 100)

                        this.belong_role.flowRecoverValue(tvalue)
                        this.target_role.dealRecHp(tvalue)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_LOSS_BLOOD) {
                        let loss = this.target_role.getMaxHp() - this.target_role.getHp()
                        let tvalue = this.effect_value * loss / 100
                        this.belong_role.flowRecoverValue(tvalue)
                        this.target_role.dealRecHp(tvalue)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        this.target_role.dealRecRage(this.effect_value)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        let immuneBuff = this.target_role.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE)
                        if (immuneBuff == null) {
                            this.target_role.dealAddCd(this.effect_value, yuan3(this.effect_extra == 1, true, false))
                            this.target_role.playTalentEffect(this)
                            this.target_role.triggerPullCdAdd()
                        }
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_PERCENT_CD) {
                        let immuneBuff = this.target_role.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE)
                        if (immuneBuff == null) {
                            let pressSkill = this.target_role.getPressSkill()
                            if (pressSkill != null) {
                                this.target_role.dealAddCd(pressSkill.getFixedCd() * this.effect_value / 100, yuan3(this.effect_extra == 1, true, false))
                                this.target_role.playTalentEffect(this)
                                this.target_role.triggerPullCdAdd()
                            }
                        }

                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getCurHelpCd() + this.effect_value)
                            }
                        */
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_MIN:
                    if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        let tvalue = this.target_role.getHp()

                        this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                        this.target_role.dealCutHp(this.belong_role, this.target_role.getHp(), true)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        let immuneBuff = this.target_role.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE)
                        if (immuneBuff == null) {
                            this.target_role.dealCutRage(this.target_role.getRage())
                            this.target_role.playTalentEffect(this)
                        }
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        this.target_role.dealCutCdMin()
                        this.target_role.playTalentEffect(this)
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(0)
                            }
                        */
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_BASEVALUE_MAX:
                    if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_HP) {
                        let tvalue = this.target_role.getMaxHp() - this.target_role.getHp()
                        this.belong_role.flowRecoverValue(tvalue)
                        this.target_role.dealRecHp(tvalue)
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_RAGE) {
                        this.target_role.dealRecRage(this.target_role.getMaxRage() - this.target_role.getRage())
                        this.target_role.playTalentEffect(this)
                    } else if (this.effect_param == TableEnum.TableTalentBaseValueType.TALENT_BASEVALUE_CD) {
                        let immuneBuff = this.target_role.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE)
                        if (immuneBuff == null) {
                            this.target_role.dealAddCdMax()
                            this.target_role.playTalentEffect(this)
                            this.target_role.triggerPullCdAdd()
                        }
                        /*
                        }else if( this.effect_param == TableEnum.TableTalentBaseValueTyp.TALENT_BASEVALUE_HELP_CD ){
                            if( Gmgr.fightType != EFormationType.FORMATION_TYPE_LADDER_ATTACK ){
                                this.scene.setHelpCd(this.scene.getMaxHelpCd())
                            }
                        */
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_CUT_CD_AND_REL_SKILL:
                    this.target_role.dealCutCdAndRelSkill()
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP:
                    let tmp = this.effect_value * this.hurt_value / 100 * this.target_role.getRecoverRadio()
                    if (tmp <= 1) { tmp = 1 }
                    this.belong_role.flowRecoverValue(tmp)
                    this.target_role.dealRecHp(tmp)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP2:
                    let forbidden = this.target_role.getForbideRecoverValue()
                    if (forbidden < 1) {
                        let tvalue = this.effect_value * this.hurt_value / 100
                        let tmp = tvalue * (1 - forbidden)
                        this.belong_role.flowRecoverValue(tmp)
                        this.target_role.dealRecHp(tmp)
                        this.target_role.playTalentEffect(this)
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_PERMANENT_DAMAGE_HP:
                    if (this.target_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        let tvalue = this.effect_value * this.hurt_value / 100
                        this.target_role.foreverCutHp(this.belong_role, tvalue)
                        this.target_role.playTalentEffect(this)
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_REDUCE_HP:
                    let tvalue1 = this.effect_value * this.hurt_value / 100

                    this.belong_role.flowHurtValue(tvalue1, tvalue1, this.target_role)
                    this.belong_role.doReboundUi()
                    this.target_role.dealCutHp(this.belong_role, tvalue1, true)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_MYLOSTHP:
                    let tvalue = (this.belong_role.getMaxHp() - this.belong_role.getHp()) * this.effect_value / 100

                    this.belong_role.flowHurtValue(tvalue, tvalue, this.target_role)
                    this.belong_role.doReboundUi()
                    this.target_role.dealCutHp(this.belong_role, tvalue, true)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_MYDEFENCE:
                    let tvalue2 = this.belong_role.getDef() * this.effect_value / 100
                    this.belong_role.flowHurtValue(tvalue2, tvalue2, this.target_role)
                    this.target_role.dealCutHp(this.belong_role, tvalue2, true)
                    this.target_role.playTalentEffect(this)
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_ADD:
                    if (this.target_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.target_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                        this.target_role.beBuffHurt(this.effect_buffLv, this.effect_buffId, this.belong_role, null)
                        this.target_role.playTalentEffect(this)
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_AUTO_ADDHP:
                    if (this.target_role.bDead != true) {
                        //if( this.target_role.bDead != true and this.scene.sceneState == TableSceneState.SCENE_STATE_FIGHT ){
                        this.timer = this.timer + dt * 1000
                        if (this.timer >= this.effect_extra) {
                            this.timer = 0

                            let forbidden = this.target_role.getForbideRecoverValue()
                            if (forbidden < 1) {
                                let t_value = this.effect_value * this.target_role.getMaxHp() / 100
                                let tmp = t_value * (1 - forbidden)
                                this.target_role.dealRecHp(t_value)
                            }

                        }
                    }
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HP_ADD_BY_ATK:
                    let value = 0
                    let damage = 0
                    value = this.belong_role.getAtk() * this.effect_value / 100
                    damage = message.EDamageType.DAMAGE_TYPE_PHY
                    let forbidden1 = this.target_role.getForbideRecoverValue()
                    if (forbidden1 < 1) {
                        let tmp = damage * (1 - forbidden1)
                        this.belong_role.flowRecoverValue(tmp)
                        this.target_role.dealRecHp(tmp)
                        this.target_role.playTalentEffect(this)
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HP_REDUCE_BY_ATK:
                    let value1 = 0
                    value1 = this.belong_role.getAtk() * this.effect_value / 100
                    this.target_role.dealCutHp(this.belong_role, value1, true)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_EMERGE_HURT_EFFECT:
                    let effect = new TalentHurtEffect();
                    effect.newSetData(this.effect_extra, this);
                    effect.initHand()
                    effect.playEffect()
                    this.belong_role.addEffect(effect)
                    //this.target_role.addEffect( effect )
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_SKILL_LEVEL:
                    this.target_role.changeSkillLevel(this.effect_param, this.effect_value)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_CALL_MONSTER:
                    this.scene.createCallMonster(this.effect_extra, this.belong_role.bEnemy, this.belong_role, 0, this.belong_talent.talent_level)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_RANDOM_DISPEL_BUFF:
                    this.target_role.dispelBuff(this.effect_extra)
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_REVIVE_DEADPERSON:
                    let fightScene = StageSceneManager.Instance.GetCurScene()
                    let tag = fightScene.isRandRevive(this.target_role.bEnemy)
                    let buff = () => {
                        let myTbl = fightScene.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_ALL)
                        for (let i = adjustIndex(1); i < myTbl.length; i++) {
                            myTbl[i].beBuffHurt(this.effect_buffLv, this.effect_buffId, this.target_role, null)
                        }
                    }
                    let randReviveNum = () => {
                        this.belong_talent.rand_revive_num = this.belong_talent.rand_revive_num + 1
                        if (this.belong_talent.rand_revive_num >= this.effect_extra - 1) {
                            this.belong_talent.rand_revive_num = this.effect_extra - 1
                        }
                    }

                    if (tag == true) {
                        if (this.belong_talent.rand_revive_num == this.effect_extra - 1) {
                            this.belong_talent.rand_revive_num = 0
                            let suc, role = fightScene.randRevive(this.target_role.bEnemy, this.effect_value)
                            if (suc) {
                                this.belong_role.revivingRole = role
                                this.belong_role.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_REVIVE_OTHER_PERSON, -1)
                            }
                        } else {
                            buff()
                            randReviveNum()
                        }
                    } else {
                        buff()
                        randReviveNum()
                    }
                    this.target_role.playTalentEffect(this)
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_STEAL_HP_RECOVER:
                    let fightScene1 = StageSceneManager.Instance.GetCurScene()
                    let enemyTbl = fightScene1.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_HP_MAX, true)
                    let myTbl = fightScene1.getTargetPlayer(this.target_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_HP_MIN)
                    if (enemyTbl[adjustIndex(1)] != null && myTbl[adjustIndex(1)] != null) {
                        let hp = enemyTbl[adjustIndex(1)].getHp() * this.effect_value / 100
                        enemyTbl[adjustIndex(1)].dealCutHp(this.target_role, hp, true)
                        this.target_role.flowRecoverValue(hp)
                        myTbl[adjustIndex(1)].dealRecHp(hp)
                        this.target_role.playTalentEffect(this)
                    }
                    this.b_disappear = true
                    break;
                case TableEnum.TableTalentEffect.TALENT_EFFECT_HP_AVERAGE:
                    this.target_role.handleHPAverage()
                    this.b_disappear = true
                    break;
                default:
                    if (this.belong_talent.isSkillKeepingTalent() == true) {
                        if (this.belong_talent.belong_role.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                            this.b_disappear = true
                        } else {
                            if (this.belong_talent.belong_role.curSkill != null) {
                                if (this.belong_talent.belong_role.curSkill.isKeepingTalentExit(this.belong_talent) == false) {
                                    this.b_disappear = true
                                }
                            } else {
                                this.b_disappear = true
                            }
                        }
                    }
                    break;
            }

        }

        public useEffect(args) {
            // 永久性的不会消失
            // 持续性的需要在udate里判断消失    
            this.disappear()
        }

        public disappear(args?) {
            // body
            if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_ALL_FIGHT) {

            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY) {

            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_SHIHUN) {

            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI) {

            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENTER_WEEK) {

            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START) {
                if (this.effect_type != TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_DEBUFF_TIME) {
                    this.b_disappear = true
                }
                /*
                }else if( this.effect_type == TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK ){
                    if( this.num >= this.effect_extra ){
                        this.b_disappear = true
                    }
                */
            } else if (this.belong_talent.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_BLOOD_LOW) {
                this.target_role.playTalentEffect(this)
                if (this.belong_talent.is_has_blood_touch == false) {
                    this.b_disappear = true
                }
            } else if (this.belong_talent.isSkillKeepingTalent()) {
                this.target_role.playTalentEffect(this)
            } else {
                this.target_role.playTalentEffect(this)
                this.b_disappear = true
            }
        }

        public setHurtValue(value) {
            // body
            this.hurt_value = value
        }

        public isActive() {
            // body
            return this.b_active
        }

    }

    export class TalentEffectAni {


        public belongRole = null
        public talentEffect = null

        public spx = null
        public node = null
        public b_finish = false

        constructor(belongRole, talentEffect) {
            this.belongRole = belongRole
            this.talentEffect = talentEffect

            this.init();
        }

        public release(args) {
            // body
            if (this.node != null) {
                this.node.removeChild(this.spx, true)
            }
        }

        public init(args?) {
            // body
            //this.node = this.belongRole.nodeUpEffect
            this.node = this.belongRole.getBuffNode(this.talentEffect.pos)
            this.loadEffect()
        }

        public loadEffect(args?) {
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
        }

        public update(tick) {
            // body
            // 复活特效单独处理
        }

    }
}