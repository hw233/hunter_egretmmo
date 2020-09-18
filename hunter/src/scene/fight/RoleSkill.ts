namespace zj {

	
export class RoleSkill{
	// body	
	public belong_role = null		
	public skillInfo = null
	public skill_id = null
	public level = null

	public cur_counter = 0
	public b_finish = true   
	public next_dir = TableEnum.TableEnumDir.Dir_None

	public skill_type = message.ESkillType.SKILL_TYPE_NONE
    public skill_damage_type = message.EDamageType.DAMAGE_TYPE_NONE
    public skill_order = -1
	public skill_cd = 0
	public skill_cd_entry = 0
    public skill_consume_rage = 0
    
    public skill_delay_time = 0
    public skill_ai_type = 0       

	public continue_time = -1
    public hurt_ratio = 0
    public hurt_extra_value = 0
    public relate_value = 0
    public relate_still_effect = -1

    //public base_value = 0
    //public skill_gain_target = -1    
    public skill_name = null
    public skill_name_path = null
    public skill_icon_path = null

	public tableSkills = []	
    public tableExtraEffect = []
    public tableKeepingTalent = []
    public varyCode = 0
    public promoteLevel = 0

    public b_breakTag = false

    public tableHurtInfo = {}
    public onlyId = -1;

    public constructor(belong_role, skillInfo){
        this.belong_role = belong_role		
	    this.skillInfo = skillInfo
	    this.skill_id = skillInfo.id
        this.level = skillInfo.level
        
        this.init();
    }

    public init()
    {
        Gmgr.Instance.skillOnlyId+=1;
        this.onlyId = Gmgr.Instance.skillOnlyId;
        // body	
        this.loadTable()
        this.cptContinueTime()
        this.cptSkillValue()
        this.initCurSkills()
    }

    public loadTable(){
        // body
        let instance = PlayerSkillSystem.Table(this.skill_id);    
        this.skill_type = instance.skill_big_type
        this.skill_damage_type = instance.skill_damage_type
        this.skill_order = instance.skill_order
        this.skill_consume_rage = instance.skill_consume_rage
        // 速度转时间
        //this.skill_cd = instance.skill_cd
        this.skill_cd = speedTranToCd(this.belong_role.getCdSpeed())
        // 速度转时间
        //this.skill_cd_entry = instance.skill_cd_entry
        this.skill_cd_entry = speedTranToEntry(this.belong_role.getCdSpeed())
    
        this.skill_delay_time = instance.skill_delay_time
        this.skill_ai_type = instance.skill_ai_type   
    
        //this.skill_gain_target = instance.skill_gain  
        this.skill_name = instance.skill_name 
        this.skill_name_path = instance.skill_name_path
        this.skill_icon_path = instance.path
        this[`skill_name2_path_s`] = instance.skill_name2_path_s
        this.relate_still_effect = instance.relate_still_effect
    
        let extra_effect = instance.extra_effect
        for (let i = adjustIndex(1); i < extra_effect.length; i++) {
            let tbl = extra_effect[i]
            let type = tbl[adjustIndex(1)]
            if( type != null && type != -1 ){
                if( this.tableExtraEffect[type] == null ){ this.tableExtraEffect[type] = [] }
                let info = {}            
                info[`condation`] = tbl[adjustIndex(2)]
                info[`value`] = tbl[adjustIndex(3)]
                this.tableExtraEffect[type].push(info);
            }
        }
    }

    public targetStill(args){
        // body
        if( this.relate_still_effect > 0 ){
            let info = PlayerSkillSystem.EffectInfo( this.relate_still_effect ) 
            if( info == null ){ return }  
            if( info.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET ){
                //let target = getEffectTargetId( this.relate_still_effect )
                let fightScene = StageSceneManager.Instance.GetCurScene()            
                let players = fightScene.getTargetPlayer(this.belong_role, info.effect_target_pos, info.effect_target)    
                fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players)
            }
        }else{
            let fightScene = StageSceneManager.Instance.GetCurScene() 
            if( this.relate_still_effect == 0 ){
                let players = fightScene.getTargetPlayer(this.belong_role, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_ALL)    
                fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players)
            }else if( this.relate_still_effect == -1 ){                       
                let players = fightScene.getTargetPlayer(this.belong_role, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_ALL)    
                fightScene.setTargetPlayer(this.belong_role, this.relate_still_effect, players)
            }        
        }
        //let effect_skill_type = getEffectSkillTypeById( this.relate_still_effect )         
    }

    public update( tick ){
        // body
        if( this.b_finish ){ return }
        let tableSize = this.tableSkills.length; 
        let curSkill = this.tableSkills[this.cur_counter + 0]
        let finishTag = curSkill.getIsFinish()
        if( finishTag ){
            let nextCnt = this.cur_counter + 1
            if( nextCnt >= tableSize ){
                this.cur_counter = 0
                this.b_finish = true
                //this.dealAtkDodge()
                //this.belong_role.backOriginalTeam()
                //this.belong_role.backHoming()
            }else{			
                this.playNextSkill(nextCnt)
            }
        }else{
            curSkill.update(tick)
        }		
    }
    public release(){
        let i = 0;
        while( i < this.tableSkills.length){
            CC_SAFE_DELETE(this.tableSkills[i]);
            i = i + 1;
        }
        this.tableSkills = [];
        this.tableExtraEffect = [];
        this.tableKeepingTalent = [];
        this.tableHurtInfo = [];
    }

    public playNextSkill( nextCnt ){
        // body
        this.cur_counter = nextCnt
        //this.changeDir()
        this.tableSkills[this.cur_counter + adjustIndex(1)].playSkill()
    }

    public endCurSkill(){
        let curUnit = this.tableSkills[this.cur_counter + adjustIndex(1)]
        if( curUnit != null ){
            curUnit.endUnit()
        }
    }

    public playRoleSkill(){
        // body
        let tag = false
        let tableSize =  this.tableSkills.length;
        if( tableSize == 0 ){
            tag = false
        }else{
            this.cur_counter = 0
            this.b_finish = false    
            this.b_breakTag = false    
            this.tableKeepingTalent = []
            this.tableSkills[this.cur_counter+ adjustIndex(1)].playSkill()
            this.tableSkills[this.cur_counter+ adjustIndex(1)].startLookBegin()
            tag = true
    
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
    
        return tag
    }

    public cleanCurSkills(){
        // body
        let i = adjustIndex(1)
        while (i < this.tableSkills.length){	
            CC_SAFE_DELETE(this.tableSkills[i])		
            i = i + 1
        } 
        //clearTable(this.tableSkills)
        this.tableSkills = []
    }

    public initCurSkills(){
        // body		
        if( this.skill_id == -1 ){ return }
        let instance = PlayerSkillSystem.Table(this.skill_id)
        let stepId = null; //instance.skill_init_step_id
        if( this.skillInfo.level == 0 && stepId == -1 ){ return } 
        this.dealOrigin();   
    }

    public dealOrigin(){
        // body
        this.cleanCurSkills()	
        let instance = PlayerSkillSystem.Table(this.skill_id)
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
        let unitSize = instance.skill_units.length;
        for (let i = adjustIndex(1); i < unitSize; i++) {
            let skillUnit = new SkillUnit(this.belong_role, this, instance.skill_units[i])
            this.tableSkills.push(skillUnit);
        }
    }

    public addHurtOne( role ){
        // body
        //assert( role != null )
        let tableSize = this.tableSkills.length
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            this.tableSkills[this.cur_counter + adjustIndex(1)].addHurtOne(role)
        }
    }

    public canHurtOne( role ){
        // body
        //assert( role != null )
        let tag = false
        let tableSize = this.tableSkills.length;
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            tag =  this.tableSkills[this.cur_counter + adjustIndex(1)].canHurtOne(role)
        }
        return tag
    }

    public nextSkill(){
        // body
        let counter = this.cur_counter
        let tableSize = this.tableSkills.length
        this.cur_counter = counter % tableSize
        this.tableSkills[this.cur_counter + adjustIndex(1)].playSkill()
    }

    public nextAction(){
        // body
        let tableSize = this.tableSkills.length;
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            return this.tableSkills[this.cur_counter + adjustIndex(1)].nextAction()
        }	
    }

    public changeDir(){
        // body
        /*
        if( this.next_dir != TableEnumDir.Dir_None ){
            this.belong_role.changeDir(this.next_dir, true)
        }
        */
    }

    public setContinue( tag ){
        // body
        //this.b_continue = tag
    }

    public setIsFinish(){
        // body
        //console.log("RoleSkill setIsFinish role id==" + this.belong_role.roleId)
        this.b_finish = true
    }

    public setIsBreakTag(args){
        // body
        this.b_breakTag = true
    }

    public setAttrib( attribName, attribVal ){
        /*if((this.PLUSATTRIBUTE[attribName] == null) ){
            print("attrib "..attribName.." is illegal")
            assert(false)
        }
        this.PLUSATTRIBUTE[attribName] = attribVal*/
    }

    public setVaryCode( code ){
        // body
        this.varyCode = code
    }

    public changeSkillLevel( value ){
        // body
        this.promoteLevel = this.promoteLevel + value
        this.level = this.level + value 
    }

    public getHurt(){
        // body
        let tableSize = this.tableSkills.length;
        let hurt = null
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            hurt = this.tableSkills[this.cur_counter + adjustIndex(1)].getHurt()
        }
        return hurt
    }

    public getHitEffectId(){
        // body
        let tableSize = this.tableSkills.length;
        let hitId = -1
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            hitId = this.tableSkills[this.cur_counter + adjustIndex(1)].getHitEffectId()
        }
        return hitId
    }

    public getOrder(){
        // body
        let tableSize = this.tableSkills.length
        let order = -1
        if( tableSize != 0 && this.cur_counter < tableSize ){
            order = this.tableSkills[this.cur_counter + adjustIndex(1)].getOrder()
        }
        return order
    }

    public getIsCanBreakSkill( skillOrder ){
        // body
        let tag = false
        let tableSize = this.tableSkills.length
        if( tableSize == 0 ){
            tag = true
        }else{
            tag = this.tableSkills[this.cur_counter + adjustIndex(1)].canBreakSkill(skillOrder)
        }
        return tag
    }

    public getIsLearnSkill(){
        // body
        let tableSize = this.tableSkills.length
        let tag = false
        if( tableSize == 0 ){
            tag = false
        }else{
            tag = true
        }
        return tag
    }

    public getCurActionId(){
        // body
        let tableSize = this.tableSkills.length	
        //assert(this.cur_counter >= tableSize)
        let priority = -1
        if( this.cur_counter < tableSize ){
            priority = this.tableSkills[this.cur_counter + adjustIndex(1)].getCurActionPriority()
        }
        return priority
    }

    public getCurUnit(){
        let tableSize = this.tableSkills.length
        let curAction = null
        if( this.cur_counter < tableSize ){
            curAction = this.tableSkills[this.cur_counter + adjustIndex(1)]
        }
        return curAction
    }

    public getSkillAction(){
        let tableSize = this.tableSkills.length
        let curAction = null
        if( this.cur_counter < tableSize ){
            curAction = this.tableSkills[this.cur_counter + adjustIndex(1)].getCurAction()
        }
        return curAction
    }

    public getSkillIsByWeapon(){
        // body
        let tag = false
        let tableSize = this.tableSkills.length
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            tag = this.tableSkills[this.cur_counter + adjustIndex(1)].getActionIsByWeapon()
        }
        return tag
    }

    public getSkillToFloorOver(){
        // body
        let tag = false
        let tableSize = this.tableSkills.length
        //assert(this.cur_counter >= tableSize)
        if( this.cur_counter < tableSize ){
            tag = this.tableSkills[this.cur_counter + adjustIndex(1)].getActionToFloorOver()
        }
        return tag
    }

    public getIsRageEnough(){
        // body
        if( this.belong_role.getRage() < this.getRageConsume() ){
            return true
        }
        return false
    }

    public addKeepingTalent( talent ){
        // body
        this.tableKeepingTalent.push(talent);
    }
    

    public isKeepingTalentExit( talent ){
        // body
        for (let i = 1; i < this.tableKeepingTalent.length; i++) {
            if( talent == this.tableKeepingTalent[i] ){
                return true
            }
        }
        return false
    }

    public getBelongRole() {
        // body
        return this.belong_role
    }

    public getSkillId(){
        // bodyskill_id
        return this.skill_id
    }

    public getSkillLevel(){
        // body
        return this.level
    }

    public getSkillType(){
        // body
        return this.skill_type
    }

    public getSkillDamageType(){
        // body
        return this.skill_damage_type
    }

    public getSkillOrder(){
        // body
        return this.skill_order
    }

    public getCd(){
        // body
        //return this.skill_cd
        return speedTranToCd(this.belong_role.getCdSpeed())
    }

    public getFixedCd(){
        return this.skill_cd
    }

    public getCdEntry(){
        // body
        return speedTranToEntry(this.belong_role.getCdSpeed())
    }

    public getRageConsume(){
        // body
        let reduce = this.belong_role.rageReducePlus
        return this.skill_consume_rage * (1 - reduce)
    }

    public getIsFinish(){
        // body
        return this.b_finish
    }

    public getSkillSize(){
        // body
        let size = this.tableSkills.length
        return size
    }

    public getCurSkill(){
        // body
        return this.tableSkills[this.cur_counter + adjustIndex(1)]
    }

    public getSkillByIndex( idx ){
        // body
        return this.tableSkills[idx]
    }

    public cptContinueTime(){
        // body
        let instance = PlayerSkillSystem.Table(this.skill_id)
        let value = instance.skill_upgrade_continueTime
        let tag = isCanUseVec(value)
        if( tag == true ){
            this.continue_time = skill_continueTime(this.level, value[adjustIndex(1)], value[adjustIndex(2)])	
        }	
    }

    public getContinueTime(){
        // body
        return this.continue_time
    }

    public cptSkillValue(){
        // body
        let tag = false
        let instance = PlayerSkillSystem.Table(this.skill_id)   
        let value1 = instance.skill_hurt_ratio 
        tag = isCanUseVec(value1)
        if( tag == true ){
            this.relate_value = value1[1]
            this.hurt_ratio = skill_ratioValue(this.level, value1[0], value1[1])
        }
    
        let value2 = instance.skill_extra_value   
        tag = isCanUseVec(value2)
        if( tag == true ){
            this.hurt_extra_value = skill_extraValue(this.level, value2[0], value2[1])
        }
    }
    
    public getExtraEffect(args){
        // body
        return this.tableExtraEffect
    }

    public getSkillHurtRatio(args){
        // body
        return this.hurt_ratio
    }

    public getHurtExtraValue(args){
        // body
        return this.hurt_extra_value
    }

    public getRelateValue(args){
        // body
        return this.relate_value
    }

    public getSkillNamePath(){
        // body
        return this.skill_name_path
    }

    public getSkillIconPath(){
        // body
        return this.skill_icon_path
    }

    public getVaryCode(args){
        // body
        return this.varyCode
    }
    
    public getSkillDelayTime(args){
        // body
        return this.skill_delay_time
    }

    public getSkillAiType(args){
        // body
        return this.skill_ai_type
    }

    public getIsBreakTag(args){
        // body
        return this.b_breakTag
    }

    public addHurtInfo( hurt ){
        //let _id = hurt.hurt_id
        //let _proofValue = hurt.hurt_proof_value
        if( this.tableHurtInfo[ hurt.hurt_id ] == null || ( this.tableHurtInfo[ hurt.hurt_id ] != null &&  hurt.hurt_proof_value > this.tableHurtInfo[ hurt.hurt_id ]  ) ){
            this.tableHurtInfo[ hurt.hurt_id ] = hurt.hurt_proof_value
        }
    }

    public makeSkillTableInfo(){
        
        let msg = new message.SkillTableInfo;
        msg.skill_id = this.skill_id
        msg.skill_cd = this.skill_cd
        msg.skill_cd_entry = this.skill_cd_entry
        msg.skill_consume_rage = this.skill_consume_rage
        msg.skill_hurt_ratio = this.hurt_ratio
        msg.skill_extra_value = this.hurt_extra_value
    
        for(let [k, v] of HelpUtil.GetKV(this.tableHurtInfo))
        {
            let _t = new message.SkillHurtTableInfo;
            _t.hurt_id = k;
            _t.proof_value = v;
            msg.hurts.push(_t);
        }
        return msg
    }
    

}
}