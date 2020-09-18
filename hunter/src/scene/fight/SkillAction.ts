namespace zj {


export class SkillAction{

    // body	
	public belong_role  = null
	public belong_skill = null
    public belong_unit = null
	public action_id = null
    public hurt = null
    public b_finish = true  
    public b_play = false  
    public skill_type = null
    public fight_scene = null
    public tablePlayRec = {}
    public disp_tick = 0
    public collision_counter = 0
    public b_lockY = false
    //public related_action = null

    // 持续施法相关
    public b_continue = false
    public b_continue_break = false
    
    // 格挡相关
    public b_hasParryed = false

    // 与天赋70相关
    public totalLostHp = 0

    public DISPLACEMENT = {speed_x: 0, speed_y: 0, aspeed_x: 0, aspeed_y: 0, aspeed_time: 0, continue_time: 0}
		

    public I = {actid:null,act:null,roledisp:null};

    public is_repeat = null;

    public continue_time = null;

    public spxAnimationFrame = null;
 

    constructor(){

        // body	
    }
    public newSetData(belong_role, belong_skill, id, belong_unit){
        this.belong_role = belong_role
        this.belong_skill = belong_skill
        this.belong_unit = belong_unit
        this.action_id = id  
        this.hurt = null
        this.b_finish = true  
        this.b_play = false  
        this.skill_type = this.belong_skill.getSkillType()  
        this.fight_scene = StageSceneManager.Instance.GetCurScene()
        this.tablePlayRec = {}
        this.disp_tick = 0
        this.collision_counter = 0
        this.b_lockY = false
        //this.related_action = null

        // 持续施法相关
        this.b_continue = false
        this.b_continue_break = false
        
        // 格挡相关
        this.b_hasParryed = false

        // 与天赋70相关
        this.totalLostHp = 0

        // let I:any  = {};
        this.I.actid      = id
        this.I.act        = PlayerSkillSystem.ActionInfo(id)
        this.I.roledisp   = PlayerSkillSystem.ActionDisplacement(this.I.act.role_displacement_id); 
        this.init();
    }

    public release(){
        // body
        this.fight_scene = null;
        this.I.actid = null;
        this.I.act = null; 
        this.I.roledisp = null;
    }

    public init(){
        // body
        if( this.I.act.hurt_id != -1 ){
            //this.hurt = new SkillHurt(this.belong_skill, this.I.act.hurt_id)
            this.hurt = new SkillHurt(this.I.act.hurt_id)
        }
    
        if( this.I.act.effects_id.length != this.I.act.effects_appear_frame.length ){
            //console.log("skill_action id " + this.I.actid + " the num of effects_id is ! equal the num of frame ")
            //assert(false)
        }    
        this.b_lockY = booln(this.I.act.is_lockY)
        //this.efficient_action = this.I.act.efficient_frame
    }

    public resetDist(){
        let roledisp = this.I.roledisp;
        if( roledisp == null ){ return }
        let sX    = roledisp.displacement_speed[adjustIndex(1)];
        let sY    = roledisp.displacement_speed[adjustIndex(2)];
        let aX    = roledisp.displacement_acceleration[adjustIndex(1)];
        let aY    = roledisp.displacement_acceleration[adjustIndex(2)];
        let aTime = roledisp.acceleration_time;
        let cTime = roledisp.continue_time;
        this.setDisplacement(sX, sY, aX, aY, aTime, cTime)
        this.disp_tick = 0
    }

    public setDisplacement( sX, sY, aX, aY, aTime, cTime ){
        this.DISPLACEMENT.speed_x       = sX
        this.DISPLACEMENT.speed_y       = sY
        this.DISPLACEMENT.aspeed_x      = aX
        this.DISPLACEMENT.aspeed_y      = aY
        this.DISPLACEMENT.aspeed_time   = aTime
        this.DISPLACEMENT.continue_time = cTime
    }

    public play( ){

        let x = this.belong_role.getPosX()
        let y = this.belong_role.getPosY()
        let des_x = 0
        let des_y = 0
    
        function _getIsFlash(c_x, c_y){
            let is_flash = false
            if( Math.abs( x - c_x) > ConstantConfig_RoleBattle.FLASH_DIS_IGNORE_X  ||
                    Math.abs( y - c_y) > ConstantConfig_RoleBattle.FLASH_DIS_IGNORE_Y ){
                is_flash = true
            }
            return is_flash
        }
    
        /*
        let function _getFlashDesPos(position, src_x, src_y)
            if( position == TablePositionType.POSITION_LEFT ){
                return src_x - ConstantConfig_RoleBattle.FLASH_DIS_OFFSET_X, src_y
            }else if( position == TablePositionType.POSITION_RIGHT ){
                return src_x + ConstantConfig_RoleBattle.FLASH_DIS_OFFSET_X, src_y
            }
        }
        */
    
        let _getSrc = ( type, param1, parm2)=>{
            let _is_flash = false
            let _src_x = 0
            let _src_y = 0
            let _offset_w = yuan3(this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_LEFT, this.I.act.target_offset_distance[adjustIndex(1)], -this.I.act.target_offset_distance[adjustIndex(1)])
            let _offset_h = this.I.act.target_offset_distance[adjustIndex(2)]
            if(  type == message.EActionFlashType.FLASH_TYPE_ORIGIN ){
                _src_x = this.belong_role.teamOriginalX
                _src_y = this.belong_role.teamOriginalY
                _is_flash = _getIsFlash(_src_x, _src_y)
            }else if( type == message.EActionFlashType.FLASH_TYPE_LOCAL ){
                _is_flash = false
            }else if( type == message.EActionFlashType.FLASH_TYPE_DETAILPOS ){
                if( this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_LEFT ){
                    _src_x = param1
                }else if( this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_RIGHT ){
                    _src_x = 960 - param1
                }
                if( this.b_lockY == false ){
                    _src_y = parm2 + _offset_h + (Gmgr.Instance.floor-Gmgr.Instance.ground)
                }else{
                    _src_y = this.belong_role.teamOriginalY + _offset_h + (Gmgr.Instance.floor-Gmgr.Instance.ground)    
                }           
                _is_flash = _getIsFlash(_src_x, _src_y)
            }else if( type == message.EActionFlashType.FLASH_TYPE_TARGET ){
                let targetPlayers = this.fight_scene.getTargetPlayer(this.belong_role, param1, parm2)     
                if( targetPlayers.length > 0 ){
                    //let [_realX, _realY] = [0, 0]
                    let [_realX, _realY] = targetPlayers[adjustIndex(1)].getRealPos()
                    _src_x = _realX + _offset_w
                    if( this.b_lockY == false ){
                        _src_y = _realY + _offset_h + (Gmgr.Instance.floor-Gmgr.Instance.ground)                  
                    }else{
                        _src_y = this.belong_role.teamOriginalY + _offset_h + (Gmgr.Instance.floor-Gmgr.Instance.ground)    
                    }     
            
                    _is_flash = _getIsFlash(_src_x, _src_y)
                }
            }  
            return [_is_flash, _src_x, _src_y]
        }
        
        //let is_flash = false
        let [type, param1, param2] = this.belong_unit.getActionFlash()
        if( this.I.act.action_flash == message.EActionFlashType.FLASH_TYPE_LASTPOS ){
            if( type == message.EActionFlashType.FLASH_TYPE_NONE ){
                type = message.EActionFlashType.FLASH_TYPE_LOCAL
                param1 = 0
                param2 = 0
            }         
        }else{        
            type = this.I.act.action_flash
            param1 = this.I.act.flash_target_param1
            param2 = this.I.act.flash_target_param2 
        }    
    
        let [is_flash, src_x, src_y] = _getSrc(type, param1, param2)
        this.belong_unit.setActionFlash(type, param1, param2)
        if( is_flash == true ){
            //des_x, des_y = _getFlashDesPos(this.belong_role.ePosition, src_x, src_y)
            let des_x = src_x;
            let des_y = src_y;
            this.belong_role.flashMove(this.playAction,this, des_x, des_y);
        }else{
            this.playAction()
        }    
    
    }

    public playAction( ){
        //console.log("action play")
        this.is_repeat = booln( this.I.act.is_repeat )
        this.continue_time = this.I.act.continue_time	
                
        if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_FIGHT ){        
            let playSpeed = this.belong_role.getPlayActionSpeed()
            this.belong_role.setActInterval( playSpeed )
        }    
    
        if( this.I.act.spx_action_id != -1 ){
            this.resetDist()
            //this.belong_role.startDraw()
            this.belong_role.setFlipX( yuan3( this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_LEFT, false, true) )
            this.belong_role.setActLoop(this.is_repeat)           
            this.belong_role.changeAction(this.I.act.spx_action_id)
        }
    
        //print("spx_action_id == "..this.I.act.spx_action_id)
    
        this.b_finish = false;
        this.b_play = true;
        this.b_continue_break = false;
        this.tablePlayRec = {};
        this.collision_counter = 0;
        this.b_hasParryed = false;	
        this.totalLostHp = 0;
    
        //this.cur_counter = 0
        //this.b_pause = false
        //this.b_storage = false
        //this.b_look = false
    }

    public collisionEvent(){
        // body
        if( this.I.act.collision_num <= 0 ){ return }
        this.collision_counter = this.collision_counter + 1
        if( this.collision_counter >= this.I.act.collision_num ){
            //this.changeNextOrEnd(false)
            //this.b_finish = true
            this.setIsFinish(true)
            this.b_play = false
        }
    }

    public setIsFinish( tag ) {
        this.b_finish = tag
    }

    public update( tick  ){
        if( this.b_finish == true ){
            return true
        }
        this.spxAnimationFrame = this.belong_role.getBodySpx().GetCurFrm()
    
        this.updateDisplacement( tick )
        this.updateEffect()
        //this.updateShake()
        this.updateBodyAct( tick )
        this.updateHurt( tick )
        //this.updateRelatedAction()
    
        //this.updateBodyAct( tick )
        //this.updatePause()
        //this.updateStorage()
        //this.updateLook()
    }

    public isBreakAction(){
        let breakFrame = this.I.act.break_action_frame
        if( breakFrame == -1 ){
            return false
        }
    
        let bodyFrame = this.belong_role.getBodySpx().GetCurFrm()
        if( bodyFrame >= breakFrame ){
            return true
        }
    
        return false
    }

    public addHurtOne( role ){
        //assert( role != null )
        if( this.hurt != null ){
            this.hurt.addHurtOne(role)
        }  
    }

    public canHurtOne( role ){
        //assert( role != null )
        let tag = false
        if( this.hurt != null ){
            tag = this.hurt.canHurtOne(role)
        }
        return tag
    }

    public cleanHurtBodys()   {
        if( this.hurt != null ){
            this.hurt.cleanHurtBodys()
        }
    }

    public updateBodyAct( tick ){
        let bodyEnd = this.belong_role.isBodyActEnd()
        if( this.is_repeat ){
            
            // 是否每个区间都生效
            if( booln(this.I.act.zone_reset) && this.belong_role.getBodySpx().isLoopChange() == true ){
                this.tablePlayRec = {}
            }
    
            this.continue_time = this.continue_time - tick*1000
            if( this.continue_time <= 0 ){
                this.setIsFinish(true)
                this.b_play = false
            }
        }else{
            if( bodyEnd == true ){
                this.setIsFinish(true)
                this.b_play = false
            }
        }
    }

    public updateShake(){
        let shakeId     = this.I.act.shake_id
        let shakeAppear = this.I.act.shake_appear_frame
        let role_frame  = this.spxAnimationFrame
        if( shakeId == null || shakeId == -1 || role_frame != shakeAppear	){
            return
        }
    
        if( this.fight_scene && this.fight_scene.startShake != null ){
            this.fight_scene.startShake(shakeId)
        }
    }

    public updateDisplacement( tick ){
    
        // s = v0·t + a·t2/2
        if( this.I.roledisp == null
        || this.DISPLACEMENT.continue_time <=0
        ){
            return
        }
        let cheatDt = tick//1.0 / 30//ConstantConfig_RoleBattle.DEFAULTFPS
        let rt = cheatDt*1000;
        //let rt = tick*1000
        this.disp_tick = this.disp_tick + rt
        if( this.disp_tick < this.DISPLACEMENT.continue_time){
    
            if( this.DISPLACEMENT.aspeed_time > 0 ){
                let tmpAccTime = rt
                this.DISPLACEMENT.aspeed_time = this.DISPLACEMENT.aspeed_time - rt
                if( this.DISPLACEMENT.aspeed_time < 0 ){
                    tmpAccTime = tmpAccTime + this.DISPLACEMENT.aspeed_time
                }
                this.DISPLACEMENT.speed_x = this.DISPLACEMENT.speed_x + this.DISPLACEMENT.aspeed_x * tmpAccTime
                this.DISPLACEMENT.speed_y = this.DISPLACEMENT.speed_y + this.DISPLACEMENT.aspeed_y * tmpAccTime
            }
            
            let tmpX = 0
            let tmpY = this.DISPLACEMENT.speed_y * rt
            let roleDir = this.belong_role.getDir()
            if( roleDir == TableEnum.TableEnumDir.Dir_Right ){
                tmpX = this.DISPLACEMENT.speed_x * rt
            }else{
                tmpX = -this.DISPLACEMENT.speed_x * rt
            }
            
            /*
            let dis_x = this.DISPLACEMENT.speed_x * rt + this.DISPLACEMENT.aspeed_x * rt^2 / 2
            let dis_y = this.DISPLACEMENT.speed_y * rt + this.DISPLACEMENT.aspeed_y * rt^2 / 2
            let tmpX = 0
            let tmpY = dis_y
            let roleDir = this.belong_role.getDir()
            if( roleDir == TableEnumDir.Dir_Right ){
                tmpX = dis_x
            }else{
                tmpX = -dis_x
            }
            */
    
            let roleType = this.belong_role.getFormType();
            if( roleType == TableEnum.TableEnumFromClassify.TYPE_PERSON    
            ){
                this.belong_role.moveMap(tmpX, tmpY)
                this.belong_role.setPos(this.belong_role.getPosX(), this.belong_role.getPosY())
            }else{
                let y = this.belong_role.getPosY() + tmpY
                let bGravity = this.belong_role.getIsGravity()
                if( bGravity == true && y < Gmgr.Instance.floor + (this.belong_role.getFloor() - Gmgr.Instance.ground) ){
                    y = Gmgr.Instance.floor + (this.belong_role.getFloor() - Gmgr.Instance.ground)
                }
                this.belong_role.moveMap(tmpX, 0)
                this.belong_role.setPos(this.belong_role.getPosX(), y)
            }
        }
    
    }

    public creatEffect( id ){
        // body
        if(id == 1008224){
            let aaa;
        }
        let info = PlayerSkillSystem.EffectInfo( id ) 
        if( info == null ){ return }
        //let effect_skill_type = getEffectSkillTypeById( id )
        if( info.effect_skill_type == message.EEffectType.EFFECT_TYPE_COLLISION ){
            //1
            // let effect = new SkillEffect();
            let effect = Game.ObjectPool.getItem("SkillEffectBase_1",SkillEffect);
            effect.newSetData(id, this.belong_skill, this, null );
            effect.initHand()
            effect.playEffect()
            this.belong_role.addEffect( effect );
        }else if( info.effect_skill_type == message.EEffectType.EFFECT_TYPE_MISSILE ){
            let effect = new MissileEffect();
            effect.newSetData(id, this.belong_skill, this, null );
            effect.initHand()
            effect.playEffect()
            this.belong_role.addEffect( effect )
        }else if( info.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET ){        
            let fightScene = StageSceneManager.Instance.GetCurScene()  
            //let target = getEffectTargetId( id )
            let players = []
            if( id == this.belong_role.still_target_effect ){
                players = this.belong_role.targetPlayers
            }else{
                players = fightScene.getTargetPlayer(this.belong_role, info.effect_target_pos, info.effect_target)
            }      
            //2
            for (let i = 0; i < players.length; i++){   
                         
                //let effect = new SkillEffectTimely();
                let effect = Game.ObjectPool.getItem("SkillEffectBase_2",SkillEffectTimely);
                effect.newSetData(id, this.belong_skill, players[i], this);
                effect.initHand()
                effect.playEffect()
                players[i].addEffect( effect );
            }
        }
    }

    public updateEffect(){
        // body	
        for (let i = 0; i < this.I.act.effects_id.length; i++){
            let id = this.I.act.effects_id[i]  
            if( id == -1 || this.tablePlayRec[id] != null ){
                continue;
            }
            if( this.spxAnimationFrame >= this.I.act.effects_appear_frame[i] ){
                this.tablePlayRec[id] = "trigger"     
                this.creatEffect(id)
                //console.log("wocao");
            }
                //console.log("mlgb", this.spxAnimationFrame)
        }
    }

    public updateHurt( tick ){
        if(  this.hurt != null ){
            this.hurt.update( tick )
        }
    }

    public getBelongSkill(){
        return this.belong_skill
    }

    public getActionId(){
        return this.action_id
    }

    public getIsFinish(){
        return this.b_finish
    }

    public getIsToFloorOver(){
        return booln( this.I.act.is_to_floor_over )
    }

    public getBreakPriority(){
        return this.I.act.action_break_priority
    }

    public setContinueBreak(args){
        // body  
        if( this.b_continue == false ){ return }
        this.b_continue_break = true
    }

    public getIsContinueBreak(args){
        // body    
        return this.b_continue_break
    }

    public getCollisionNum(){
        return this.I.act.collision_num
    }

    public getCollisionDistance(){
        return this.I.act.collision_distance
    }

    public isHasParryed(){
        return this.b_hasParryed
    }

    public keepOutLostHp( maxLost, curHurt ){
        let hurtValue = 0
        if( this.totalLostHp < maxLost ){
            let ret = this.totalLostHp + curHurt
            if( ret >= maxLost ){
                hurtValue = maxLost
                this.totalLostHp = maxLost
            }else{
                hurtValue = curHurt
                this.totalLostHp = ret
            }        
        }else{
            hurtValue = maxLost
        }
        return hurtValue
    }
    










}
}