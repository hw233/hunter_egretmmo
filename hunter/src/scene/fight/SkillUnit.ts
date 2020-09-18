namespace zj {


export class SkillUnit
{
    // body
    public fight_scene = StageSceneManager.Instance.GetCurScene()	
	public belong_role = null	
	public belong_skill = null
	public unit_id = null
    public skill_type = null
   
	public cur_counter = 0
    public counter_tick = 0
	public b_finish = true
    public b_lookBegin = true
    public b_lookEnd = false
    public b_look = true
    public b_storage = true
    public play_up_rate = 1.0

    public action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE
    public flash_param1 = 0
    public flash_param2 = 0

	public skill_order = -1
    public bg_spx_id = -1
    public bg_spx_index = 0
    public bg_appear_frame = -1

    public b_bgAppear = false
    public bgCss = null

    public tableAction = []
    
    public I = null

    public constructor( belong_role, belong_skill, id ){
        // body
    this.fight_scene = StageSceneManager.Instance.GetCurScene()	
	this.belong_role = belong_role	
	this.belong_skill = belong_skill
	this.unit_id = id
    this.skill_type = this.belong_skill.getSkillType()  
   
	this.cur_counter = 0
    this.counter_tick = 0
	this.b_finish = true
    this.b_lookBegin = true
    this.b_lookEnd = false
    this.b_look = true
    this.b_storage = true
    this.play_up_rate = 1.0

    this.action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE
    this.flash_param1 = 0
    this.flash_param2 = 0

	//this.skill_order = -1
    //this.bg_spx_id = -1
    //this.bg_spx_index = 0
    //this.bg_appear_frame = -1

    this.b_bgAppear = false
    this.bgCss = null

	this.tableAction = []

    let I      = {}
	I[`unitid`]      = id
	I[`unitInfo`]        = PlayerSkillSystem.UnitInfo(id)
	this.I = I

	this.init()
    }

    public release(){
        // body
        //this.fight_scene.getEffectLayer(this.belong_role).removeChild(this.bgCss, true)
        this.belong_role = null;
        if(this.bgCss && this.bgCss.spine){
            this.bgCss.clearSpine();
            this.bgCss = null;
        }  
       
        let i = adjustIndex(1)
        while (i < this.tableAction.length){	
            CC_SAFE_DELETE(this.tableAction[i]);
            //Game.ObjectPool.getItem("SkillAction",this.tableAction[i]);
            i = i + 1;
        }    
        this.tableAction = null;
        this.fight_scene = null;
    }

    public init(){

        //let tableSkillUnit = CSV.GetTable(StringConfig_Table.skillUnit)
        //this.skill_order = tableSkillUnit[this.unit_id].skill_order	
    
        //this.bg_spx_id = tableSkillUnit[this.unit_id].bg_spx_id
        //this.bg_spx_index = tableSkillUnit[this.unit_id].bg_spx_index
        //this.bg_appear_frame = tableSkillUnit[this.unit_id].bg_appear_frame
        this.initBgCss()
        // body
        this.addAction()
        //this.extraAction()
    }

    public initBgCss(args?){
        // body
        if( this.I.unitInfo.bg_spx_id == -1 ){ 
            return 
        }
        [this.bgCss,] = HunterSpineX(this.I.unitInfo.bg_spx_id, Gmgr.Instance.spineX_scale)
        this.bgCss.SetAutoUpdate(true)
        this.bgCss.setVisibleSpx(false)      
        /*
        let name = resdb.SPX( this.I.unitInfo.bg_spx_id )
        this.bgCss = ccs.Armature.create(name)    
        this.bgCss.setVisible(false)    
        let function animationEvent(armatureBack,movementType,movementID)
            if( movementType == ccs.MovementEventType.loopComplete or movementType == ccs.MovementEventType.complete ){
                armatureBack.setVisible(false)           
            }       
        }
        this.bgCss.getAnimation().setMovementEventCallFunc(animationEvent) 
        */
        //this.fight_scene.getEffectLayer(this.belong_role).addChild(this.bgCss)    
        this.fight_scene.nodeDownEffect.addChild(this.bgCss.spine) 
    }

    public hideBg(){
        if( this.bgCss != null ){
            this.bgCss.stopAllActions()
            this.bgCss.setVisibleSpx(false)
        }
    }

    public playBgCss( ){
        this.bgCss.setVisibleSpx(true)
        this.bgCss.SetPosition(UIManager.StageWidth/2-this.fight_scene.fightRoot.x, UIManager.StageHeight/2);
        this.bgCss.stopAllActions()   
        this.bgCss.SetLoop(false)
        let index = this.I.unitInfo.bg_spx_index
        if( index <= -1 ){
            index = 0
        }
        this.bgCss.ChangeAction(index)
    
        // body
        /*
        this.bgCss.setVisible(true)
        this.bgCss.stopAllActions()     
        this.bgCss.setPosition(cc.p(Device.screenWidth/2, Device.screenHeight/2))   
        //roleScale = turnNum(this.belong_role.ePosition, roleScale)
        let scale = math.max(Device.screenWidth/Device.STANDARD_SCREEN_W, Device.screenHeight/Device.STANDARD_SCREEN_H)
        let ratio = turnNum(this.belong_role.ePosition, 1)
        this.bgCss.setScaleX(ratio*scale)
        this.bgCss.setScaleY(scale)
        this.bgCss.getAnimation().playWithIndex(this.I.unitInfo.bg_spx_index + this.belong_role.eTeamNum % TableTeamNum.TEAM_NUM_MAX) 
        */
    }

    public updateBg(){
        if( this.I.unitInfo.bg_spx_id == -1 || this.b_bgAppear == true ){ 
            return 
        }
        let bodyFrame = this.belong_role.getBodySpx().GetCurFrm()
        if( bodyFrame > this.I.unitInfo.bg_appear_frame ){
            this.b_bgAppear = true
            this.playBgCss()        
        }
    } 

    public playSkill( ...args )	{
        this.clearHurtBodys()	
        this.b_finish = false
        this.b_bgAppear = false
        this.cur_counter = 0
        this.b_lookBegin = false
        this.b_look = false
        this.b_storage = false
        this.counter_tick = 0
        this.action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE
        this.flash_param1 = 0
        this.flash_param2 = 0
        let tableSize = this.tableAction.length
        if( tableSize > 0 ){
            this.tableAction[this.cur_counter + adjustIndex(1)].play()
            //this.tableAction[this.cur_counter+1].playAction(this.play_up_rate)
        }
    }

    public update( tick ){
        // body
        if( this.b_finish == true ){ return }
        if( this.belong_role.is_flashing == true ){ return }
    
        this.counter_tick = this.counter_tick + tick * 1000
    
        let curAction = this.tableAction[this.cur_counter + 0]
        let actionFinish = curAction.getIsFinish()
        if( actionFinish == true ){
            let tableSize = this.tableAction.length
            if( tableSize > this.cur_counter+1 ){
                this.cur_counter = this.cur_counter + 1
                curAction = this.tableAction[this.cur_counter + 0]
                curAction.play()
                //curAction.playAction(this.play_up_rate)
            }else{
                //this.}Look()
                //this.b_finish = true
                this.endUnit()
            }
        }else{
            curAction.update(tick)
        }
    
        this.updateBg()
        this.updateStorage()
        //this.updateLookBegin()
        this.updateLook()
    }

    public canBreakSkill( skillOrder ){
        // body
        let order = this.getOrder()
        if( skillOrder  <= order ){
            return false
        }
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        let actionBreak = curAction.isBreakAction()
        if( actionBreak == true ){        
            return true
        }
        return false
    }

    public getBreakPriority(){
        // body    
        let priority = this.tableAction[this.cur_counter + adjustIndex(1)].getBreakPriority()
        return priority
    }

    public getCurAction(args){
        // body
        //return null
        //return this.tableAction[this.cur_counter+1].getCurUnit()
        return this.tableAction[this.cur_counter + adjustIndex(1)]
    }

    public addAction(){
        // body
        let tableSkillUnit = TableSkillUnit.Table();
        let tableAllAction = tableSkillUnit[this.unit_id].all_action
        let tableSize = tableAllAction.length
    
        for (let i = adjustIndex(1); i < tableSize; i++){
            
            let action_id = tableAllAction[i]
             let action = new SkillAction();
            // let action = Game.ObjectPool.getItem("SkillAction",SkillAction);
            action.newSetData(this.belong_role, this.belong_skill, action_id, this);
            this.tableAction.push(action);
        }
    }

    public nextAction(){
        // body
        let size = this.tableAction.length
        if( size <= this.cur_counter + 1 ){
            //this.}Look()
            //this.}Look()
            //this.b_finish = true
            this.endUnit()
            return
        }
        this.cur_counter = this.cur_counter + 1
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        //curAction.playAction(this.play_up_rate)
        curAction.play()
    }

    public addHurtOne( role ){
        // body
        //assert( role != null)
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            curAction.addHurtOne( role )
        }
    }

    public canHurtOne( role ){
        // body
        //assert( role != null)
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            return curAction.canHurtOne( role )
        }
        return false
    }

    public clearHurtBodys(){
        // body
        let tableSize = this.tableAction.length
        for (let i = adjustIndex(1); i < tableSize; i++){
            let action = this.tableAction[i]
            action.cleanHurtBodys()
        }
    }

    public getActionIsByWeapon(){
        // body
        let tag = false
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            tag = curAction.getIsByWeapon()
        }
        return tag
    }

    public getActionToFloorOver(){
        // body
        let tag = false
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            tag = curAction.getIsToFloorOver()
        }
        return tag
    }

    public getHurt(){
        // body
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            return curAction.getHurt()
        }
        return null
    }

    public getHitEffectId(){
        // body
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            return curAction.getHitEffectId()
        }
        return -1
    }

    public getCurActionPriority(){
        // body  
        let curAction = this.tableAction[this.cur_counter + adjustIndex(1)]
        if( curAction != null ){
            return curAction.getBreakPriority()
        }
        return -1
    }

    public setInterval(speed){
        // body
        if( this.bgCss != null ){
            this.bgCss.setSpeedScale(speed)
        }
    }

    public setActionFlash( value, param1, param2 ){
        this.action_flash_type = value
        this.flash_param1 = param1
        this.flash_param2 = param2
    }

    public Pause(args){
        // body
        if( this.bgCss != null ){
            this.bgCss.Pause()
        }
    }

    public resume(args){
        // body
        if( this.bgCss != null ){
            this.bgCss.resume()
        }
    }

    public getOrder(){
        // body	
        return this.I.unitInfo.skill_order
    }

    public getIsFinish(){
        // body
        return this.b_finish
    }

    public getBelongRole(){
        // body
        return this.belong_role
    }

    public getBelongSkill(){
        // body
        return this.belong_skill
    }

    public getSkillUnitId(){
        // body
        return this.unit_id
    }

    public getActionByID( id ){
        //let action_id = tableAllAction[i]
        for (let i = adjustIndex(1); i < this.tableAction.length; i++){
            if( this.tableAction[i].action_id == id ){
                return this.tableAction[i]
            }
        }
        return null
    }

    public getActionFlash(){
        return [this.action_flash_type, this.flash_param1, this.flash_param2];
    }

    
    public updateStorage(){
        // body   
        if(  !(Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_FIGHT || Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_ZORKBOSS) ){ 
            return 
        }
        if( this.I.unitInfo.storage_appear_frame == -1 ||  this.b_storage == true ){ 
            return 
        }    
        if( this.counter_tick >= this.I.unitInfo.storage_appear_frame ){   
            this.b_storage = true     
            if( this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE ){       
                this.belong_role.playStorage(UIConfig.UIConfig_CommonBattleCss.pressKillAni.index)
            }else if( this.skill_type == message.ESkillType.SKILL_TYPE_DEATH ){
                this.belong_role.playStorage(UIConfig.UIConfig_CommonBattleCss.deadKillAni.index)
            }              
            
            if( this.belong_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_MOB && this.belong_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_CALL ){
                if( this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE || this.skill_type == message.ESkillType.SKILL_TYPE_DEATH ){
                    if( ! Device.isReviewSwitch ){
                       this.belong_role.playDialogAni();
                    }
                    
                }
            }

            /*
            if( this.skill_type == ESkillType.SKILL_TYPE_DEATH ){
                if( this.belong_role.roleType == TableEnumRoleType.ROLE_TYPE_BOSS and this.belong_role.bDead != true ){
                this.belong_role.openStorageBar(this.I.unitInfo.storage_appear_frame, this.I.unitInfo.look_}_frame)
                }
            }
            */                
        } 
    }

    public startLookBegin(){
        // body
        if( Gmgr.Instance.layerId != TableEnum.TableEnumLayerId.LAYER_FIGHT ){ 
            return 
        }  
        if( this.I.unitInfo.look_begin_frame == -1 || this.skill_type == message.ESkillType.SKILL_TYPE_COMMON || this.b_lookBegin == true ){ 
            return 
        }
    
        if( true ){
        //if( this.counter_tick > this.I.unitInfo.look_begin_frame ){
            this.b_lookBegin = true
    
            if( this.belong_role.isPerson() ){
            //if( this.belong_role != null and this.belong_role.roleType != TableEnumRoleType.ROLE_TYPE_CALL ){
                //if( this.belong_role.bEnemy == false ){
                if( true ){
                    let sence = StageSceneManager.Instance.GetCurScene()  
                    if( this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE ){   
                        if( this.belong_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.belong_role.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP ){ 
                            sence.staticBegin(this.belong_role)
                            
                            if( sence.beInPvp() ){
                                if( ! this.belong_role.bEnemy ){
                                    sence.helpRoleAniBegin(this.belong_role)
                                }else{
                                    sence.oppHelpRoleAniBegin(this.belong_role)
                                }
                            }else{
                                if( ! this.belong_role.bEnemy ){
                                    sence.helpRoleAniBegin(this.belong_role)
                                }
                            }
                        }
                        
                        sence.renderTargetStart(this.belong_role.targetPlayers )
                        sence.renderEffectStart(this.belong_role)                                     
                    }else if( this.skill_type == message.ESkillType.SKILL_TYPE_DEATH ){
                        //sence.killSkillEnd(this.belong_role)   
                    }        
                }                   
            }  
    
    
        }
    }

    public endUnit(){
        this.b_finish = true
        this.hideBg()
        this.endLook()
    }

    public endLook(){
        if( Gmgr.Instance.layerId != TableEnum.TableEnumLayerId.LAYER_FIGHT ){ 
            return 
        } 
        if( this.I.unitInfo.look_begin_frame != -1 && this.I.unitInfo.look_end_frame != -1 &&  this.b_look == false  ){ 
            if( this.b_lookBegin == true ){
                if( this.belong_role.isPerson() ){
                //if( this.belong_role.bEnemy == false ){
                    let sence = StageSceneManager.Instance.GetCurScene() 
                    sence.staticEnd(this.belong_role)   
                    sence.renderEffectEnd(this.belong_role)
                }
            } 
        } 
    }

    public updateLook() {
        // body
        if( Gmgr.Instance.layerId != TableEnum.TableEnumLayerId.LAYER_FIGHT ){ 
            return 
        }  
        if( this.I.unitInfo.look_begin_frame == -1 || this.I.unitInfo.look_end_frame == -1 || this.skill_type == message.ESkillType.SKILL_TYPE_COMMON || this.b_look == true ){ 
            return 
        }
        if( this.counter_tick > this.I.unitInfo.look_end_frame ){   
            this.b_look = true           
    
            if( this.belong_role.isPerson() ){
                if( true ){
                //if( this.belong_role.bEnemy == false ){
                     let sence = StageSceneManager.Instance.GetCurScene()  
                    if( this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE ){              
                        sence.staticEnd(this.belong_role)   
                        sence.renderEffectEnd(this.belong_role)                                   
                    }else if( this.skill_type == message.ESkillType.SKILL_TYPE_DEATH ){
                        //sence.killSkillEnd(this.belong_role)   
                    }        
                }                   
            }                            
        }
    }



}
}