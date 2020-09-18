namespace zj {
export enum EnumEffectType {
    Effect_Type_None = 0,
    Effect_Type_Skill_Common = 1,
    Effect_Type_Skill_Target = 2,
    Effect_Type_Tallent = 3,
    Effect_Type_Missile = 4, // 导弹（跟踪系列)
    Effect_Type_Num = 5,
}

export let gmSound : any;

export function getRandom(n, m) {
        if (n == null && m == null) {
            return Math.floor(Math.random() * 99999999)
        } else if (m == null) {
            return Math.floor(1 + Math.random() * n)
        } else if (m == n){
            return n
        }

        return Math.floor(Math.random()*(m - n)+ n);
    }

    export function turnNum(tPosition, number) {
        if (tPosition == TableEnum.TablePositionType.POSITION_LEFT ){
            return number
        } else if (tPosition == TableEnum.TablePositionType.POSITION_RIGHT ){
            return -number
        }
    }

    export function turnDir(dir, number) {
        if (dir == TableEnum.TableEnumDir.Dir_Right){
            return number
        } else if (dir == TableEnum.TableEnumDir.Dir_Left){
            return -number
        }
    }


    export function getBuffRelate(level, id) {
        let tableBuff = TableSkillBuff.Table();//TableUtil.getInstance().getTableByName(StringConfig_Table.skillBuff)
        if (tableBuff[id] == null) {
            //console.log("skillBuff表id = " + id + "没有查找到")
            return
        }
        let param = tableBuff[id].hit_rate
        let baseType = tableBuff[id].base_type
        let damageType = tableBuff[id].damage_type
        let hitRate = param[0] + level * param[1]
        return [hitRate, baseType, damageType]
    }

    export function getBuffUseType(type) {
        let tableBaseBuff = TableClientBuffBase.Table();//TableUtil.getInstance().getTableByName(StringConfig_Table.buffBase)
        if (tableBaseBuff[type] == null) {
            //console.log("buffBase表id = " + type + "没有查找到")
            return
        }
        return [tableBaseBuff[type].buff_profit, tableBaseBuff[type].is_fold, tableBaseBuff[type].fold_number]
    }

export class SkillEffectBase{

    // body	   
    public effectLayer = null

    public effect_type = EnumEffectType.Effect_Type_None
    public fightScene = StageSceneManager.Instance.GetCurScene() 	
	public effect_id = null
    public pzName = ""

    public belong_skill = null 
	public belong_role = null
    public belong_action = null 
    public belong_parent = null
    public touch_role = null

    public effect_skill_type = message.EEffectType.EFFECT_TYPE_COLLISION
    public effect_target_pos = message.ETargetPosType.TARGET_POS_NONE
    public effect_target = message.ETargetId.TARGET_COLLISION
    public effect_next_type = message.EEffectType.EFFECT_TYPE_NONE

    public effect_point = [-1, -1, -1]
    public continue_time = -1 
    public next_id = -1    
    public dis_x = 0
    public dis_y = 0   
	public x = 0
	public y = 0
	public e_dir = -1    
    
    public originalX = 0
	public originalY = 0    

	public b_loop = false
	public b_finish = true
    public b_playBuff = false
    public b_playParticle = false
	public b_call = false
    public b_complete = false    
    public b_shake = false
    public b_playSound = false
    public b_lockY = false
    public b_follow = false
    public b_floorEnd = false
    public b_blendActive = false
    
	public total_time = 0
    public hurt_gap = 0
	public cur_counter = 0
    public collision_counter = 0

	public hurt = null
	public spx : Spx

    public sound_id = -1
    public sound_path = null

    public next_effect = null
    public spxAnimationFrame = -1

    public b_decay = false
    public decay_ratio = -1
    public collision_distance = -1

    public related_eff = null

    public DISPLACEMENT = {
		speed_x : 0,
		speed_y : 0,
		aspeed_x : 0,
		aspeed_y : 0,
		aspeed_time : 0,
		continue_time : 0
    }
    
    public I = { eff_id : null, eff_info : null, eff_nxteff : null, eff_disp : null };

    public b_loopChange

    constructor(){
        // body	   
    
    }
    public setId(id){
        this.effectLayer = null

    this.effect_type = EnumEffectType.Effect_Type_None
    this.fightScene = StageSceneManager.Instance.GetCurScene() 	
	this.effect_id = id   
    this.pzName = ""

    this.belong_skill = null 
	this.belong_role = null
    this.belong_action = null 
    this.belong_parent = null
    this.touch_role = null

    this.effect_skill_type = message.EEffectType.EFFECT_TYPE_COLLISION
    this.effect_target_pos = message.ETargetPosType.TARGET_POS_NONE
    this.effect_target = message.ETargetId.TARGET_COLLISION
    this.effect_next_type = message.EEffectType.EFFECT_TYPE_NONE

    this.effect_point = [-1, -1, -1]
    this.continue_time = -1 
    this.next_id = -1    
    this.dis_x = 0
    this.dis_y = 0   
	this.x = 0
	this.y = 0
	this.e_dir = -1    
    
    this.originalX = 0
	this.originalY = 0    

	this.b_loop = false
	this.b_finish = true
    this.b_playBuff = false
    this.b_playParticle = false
	this.b_call = false
    this.b_complete = false    
    this.b_shake = false
    this.b_playSound = false
    this.b_lockY = false
    this.b_follow = false
    this.b_floorEnd = false
    this.b_blendActive = false
    
	this.total_time = 0
    this.hurt_gap = 0
	this.cur_counter = 0
    this.collision_counter = 0

	this.hurt = null
	this.spx = null
 
    this.sound_id = -1
    this.sound_path = null

    this.next_effect = null
    this.spxAnimationFrame = -1

    this.b_decay = false
    this.decay_ratio = -1
    this.collision_distance = -1

    this.related_eff = null
        
        let I = { eff_id : null, eff_info : null, eff_nxteff : null, eff_disp : null };
        I[`eff_id`] = id
        I[`eff_info`] = PlayerSkillSystem.EffectInfo( id )
        I[`eff_nxteff`] = PlayerSkillSystem.EffectInfo( I[`eff_info`].next_effects_id )
        I[`eff_disp`] = PlayerSkillSystem.DisplacementInfo( I[`eff_info`].displacement_id )

        this.I = I;

        this.polyFun()
    }
    public polyFun(){
        
    }

    public release(){
        // body   
        this.DISPLACEMENT.speed_x = 0,
		this.DISPLACEMENT.speed_y = 0,
		this.DISPLACEMENT.aspeed_x = 0,
		this.DISPLACEMENT.aspeed_y = 0,
		this.DISPLACEMENT.aspeed_time = 0,
		this.DISPLACEMENT.continue_time = 0;
        this.total_time = 0;
        CC_SAFE_DELETE(this.hurt)  
        this.hurt = null  
      
        CC_SAFE_DELETE(this.next_effect) 
        this.next_effect = null
    
        //this.clearEffectLayer();
        if(this.spx){
            this.spx.clearSpine();
            this.spx = null;
        }
        this.fightScene = null;
    }

    public init(){
        // body
        this.effect_skill_type = this.I.eff_info.effect_skill_type
        this.effect_target_pos = this.I.eff_info.effect_target_pos
        this.effect_target = this.I.eff_info.effect_target
    
        this.b_loop = booln( this.I.eff_info.is_repeat )
        this.b_follow = booln(this.I.eff_info.is_follow_role)
        this.b_floorEnd = booln(this.I.eff_info.is_floor_end)
        this.b_blendActive = booln(this.I.eff_info.blend_active)
        this.b_lockY = booln(this.I.eff_info.is_lockY)
    
        this.continue_time = this.I.eff_info.continue_time
    
        this.next_id = this.I.eff_info.next_effects_id
        if( this.I.eff_nxteff != null ){
            this.effect_next_type = this.I.eff_nxteff.effect_skill_type
        }
        
        this.sound_id = this.I.eff_info.effect_sound_id
        if( this.sound_id != -1 ){
            let tableSound = TableClientSoundResource.Table();
            this.sound_path = tableSound[this.sound_id].sound_path
        }
        
        this.effect_point = this.I.eff_info.point_hurt   
        this.dis_x = this.I.eff_info.distance_role[0]
        this.dis_y = this.I.eff_info.distance_role[1]
        // this.dis_x = 0;//这里很尴尬需要修改
    
        if( this.I.eff_info.decay_ratio != -1 ){
            this.b_decay = true
            this.decay_ratio = this.I.eff_info.decay_ratio
        }
    
        this.collision_distance = this.I.eff_info.collision_distance
    
        if( this.I.eff_info.efficient_eff != -1 ){
            this.related_eff = this.belong_role.getRelatedEffect( this.I.eff_info.efficient_eff )
        }
    }

    public initHand()	{
        // body		
    }

    public loadArmature(){
        // body    
        if( this.I.eff_info.effects_spx_id != -1 ){		
            let order : any; // let order = 1
            [this.spx,] = HunterSpineX(this.I.eff_info.effects_spx_id, Gmgr.Instance.spineX_scale * this.I.eff_info.effect_scale);
            this.spx.SetAutoUpdate(false)
            this.spx.setVisibleSpx(false)      
            this.addEffectLayer( order )    
        }  
    }

    public getArmaturePos(){
        // body 
        this.x = this.spx.getPositionX()
        this.y = this.spx.getPositionY()
    }

    public addEffectLayer( order ){
        // body	
        //revert
        
        /*this.effectLayer = new eui.Group;
        this.belong_role.nodeBody.addChild(this.spx.spine)
        this.spx.SetPosition(this.belong_role.x, this.belong_role.y);*/

        this.effectLayer = this.fightScene.getEffectLayer( this.belong_role )
        this.effectLayer.addChild(this.spx.spine);
        // this.effectLayer.visible = false;
    }

    public clearEffectLayer(){
        // body		
    }

    public loadHurt(){
        // body	
        if( this.I.eff_info.hurt_id != -1 ){
            this.hurt = new SkillHurt( this.I.eff_info.hurt_id );
        }  
    }

    public loadNext()	{
        // body		
        if( this.next_id != -1 ){  
            if( this.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET ){
               // console.log("特效id：" + this.effect_id + "当前特效为指向性特效，不能有next")
                //assert(false)
            }   
    
            //if( this.effect_next_type == EEffectType.EFFECT_TYPE_COLLISION ){ 
                this.next_effect = new SkillEffect();
                this.next_effect.newSetData(this.next_id, this.belong_skill, this.belong_action, this);
                this.next_effect.initHand() 
            //}
        } 
    }

    public loadSpx()	  {
        // body
        this.loadArmature()
        this.loadHurt()
        this.loadNext()	   
     }

     public playEffect(){
        // body
        this.cleanHurtBodys()
        this.resetDist()
            
        // spx
        let tableSkillEffect =  TableSkillEffects.Table();//CSV.GetTable(StringConfig_Table.skillEffects)    
        let spxActionId = this.I.eff_info.effects_action_id
        let roleDir = this.belong_role.getDir()	   
    
        // 特效速度是根据人物挂钩的
        let playSpeed = this.belong_role.getPlayActionSpeed()	
    
        // 针对不同场景处理
        if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_ZORKBOSS ){
            if( this.fightScene.bHideEffect == true && this.belong_role.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_OTHER ){
                this.spx.setVisibleSpx(false)
            }else{
                this.spx.setVisibleSpx(true)
            }
        }else{
            this.spx.setVisibleSpx(true)          
        }        
    
        if( this.b_blendActive == true ){       
            this.spx.setBlendAdditive( true );         
        } 
        this.spx.setSpeedScale(playSpeed) 
        let [rx, ry, roleScale] = this.handlePos()
        //ry = 640 - ry;
        this.spx.setFlipX(yuan3(roleScale > 0, false ,true)) 
        this.spx.SetPosition( rx, ry-(Gmgr.Instance.floor-Gmgr.Instance.ground));
        this.x = rx;
        this.y = ry - (Gmgr.Instance.floor-Gmgr.Instance.ground);
    
        this.spx.stopAllActions()   
        this.spx.SetLoop(this.b_loop)
        this.spx.ChangeAction(spxActionId)
    
        // other
        this.b_finish = false
        this.b_playBuff = false
        this.b_shake = false  
        this.collision_counter = 0
        
        this.originalX = rx
        this.originalY = ry   
    
        //this.update(0)
    }

    public handlePos(){
        //     
        return [0, 0, 1]  
    }

    public updateCall( tick? ){
        // body	
        if( this.b_call == false && this.I.eff_info.call_monsterbase != -1 && this.spxAnimationFrame >= this.I.eff_info.callFrame ){		
            this.fightScene.createCallMonster(this.I.eff_info.call_monsterbase, this.belong_role.bEnemy, this.belong_role, 0, this.belong_skill)
            this.b_call = true
        }
    }

    public update( tick )    {
        // body
        if( this.b_finish == true ){
            return 
        }   
        
        let rt = tick * 1000
        if( this.cur_counter == 0 ){ 
            this.spxAnimationFrame = this.spx.GetCurFrm()
            this.b_loopChange = this.spx.isLoopChange()
            this.updateShake(tick)		
            this.updateRelateEff()
            let bEnd = this.updateSpx(tick)  
            //wuzhi
            //if( bEnd == true ){ return true }
            this.total_time = this.total_time + rt
            this.updateSound(tick);
            this.updateSpxOther(tick);
            this.updateHurt(tick);
            this.updateTargetHurt(tick);      
            this.updateTargetBuff();
            this.updateParticle();   
            this.updateBreakUnit();
            this.updateCall();
            this.updateEndSpx();
        }else if( this.cur_counter == 1 ){
            this.next_effect.update(tick)
            let bFinish = this.next_effect.getIsFinish()
            if( bFinish == true ){
                this.b_finish = true
            }		
        }
    }

    public updateRelateEff(){
        if( this.related_eff != null ){
            if( this.related_eff.getIsFinish() == true ){
                this.changeNextOrEnd(true)
            }
        }
    }

    public updateSpx( tick ){
        // body	
        if( this.spx != null ){
            this.spx.UpdataAni( tick )
        }
    }

    public updateSpxOther( tick ){
        // body	    
        if( this.b_loop == false ){		
            // condition 1
            if( this.b_complete == true ){
                this.changeNextOrEnd(false)
            }
        }else{
    
            if( this.b_loopChange == true ){
                if( booln(this.I.eff_info.hurt_zone_reset) ){
                    
                }    
    
                if( booln(this.I.eff_info.buff_zone_reset) ){
                    this.b_playBuff = false
                }
    
                if( this.hurt != null ){
                    this.hurt.clearCollideInfo()
                }
    
            }
    
            // condition 2
            if( this.total_time >= this.continue_time ){
                this.changeNextOrEnd(true)
            }else{
    
                if( this.hurt != null ){
                    let roleNum = this.hurt.getHurtRoleNum()
                    let curBodys = this.hurt.getHurtBodysNum()
                    // condition 3
                    if( roleNum != -1 && curBodys >= roleNum ){
                        this.changeNextOrEnd(true)
                    }                
                }
    
            }
        }
    }

    public updateHurt( tick ){
        // body
        if( this.hurt != null ){
            this.hurt.update(tick)
        }
    }

    public updateSpxDistance( tick ){
        // body
        let cheatDt = tick;
        //let rt = tick * 1000
        let rt = cheatDt * 1000
        if( this.I.eff_disp != null ){
            if( this.total_time >= this.I.eff_info.start_move_time && this.total_time < this.DISPLACEMENT.continue_time ){
    
                if( this.DISPLACEMENT.aspeed_time > 0 ){
                    let tmpAccTime = rt
                    this.DISPLACEMENT.aspeed_time = this.DISPLACEMENT.aspeed_time - rt
                    if( this.DISPLACEMENT.aspeed_time < 0 ){
                        tmpAccTime = tmpAccTime + this.DISPLACEMENT.aspeed_time
                    }
                    let aaaaaa = this.DISPLACEMENT.speed_x;
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
                this.x = this.spx.GetPosX() + tmpX/1.3
                this.y = this.spx.GetPosY() - tmpY
    
                if( this.b_floorEnd == true ){
                    if( this.y <= Gmgr.Instance.floor ){    
                        this.y = Gmgr.Instance.floor    
                        this.changeNextOrEnd(true) 
                        this.spx.Stop()
                        return true
                    }
                }
                this.spx.SetPosition(this.x, this.y)
            }
        }
        return false
    }

    public updateShake( tick ){
        // body		
        if( Gmgr.Instance.layerId != TableEnum.TableEnumLayerId.LAYER_ZORKBOSS ){ 
            if( this.belong_role.bDead == true ){
                return
            }
        }else{
            if( this.belong_role.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_OTHER ){
                return
            }
        }
    
        //if( this.belong_role.bDead == true ){ return }
        if( this.b_shake == true ){ return }  
        if( this.belong_role.isVisible() == false ){ return }
        let bodyFrame = this.belong_role.getBodySpx().GetCurFrm()
        if( this.I.eff_info.shake_id != null && this.I.eff_info.shake_id != -1 && bodyFrame >= this.I.eff_info.shake_appear_frame ){		
            this.fightScene.startShake(this.I.eff_info.shake_id)
            this.b_shake = true
        }
    }

    public updateSound( tick )    {
        if( this.sound_id == -1  ){ return }
        if( this.spxAnimationFrame >= this.I.eff_info.sound_appear_frame && this.b_playSound == false ){
            this.b_playSound = true 
            if( this.sound_id != null ){
                Helper.EftByID(this.sound_id)
            }
        }
    }

    public updateParticle(){
        // body    
        if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_ZORKBOSS ){ return }
        if( this.I.eff_info.particle_id == -1 ){ return }    
        if( this.spxAnimationFrame >= this.I.eff_info.particle_frame && this.b_playParticle == false ){
            this.b_playParticle = true            
            //wuzhi 2
            //let particle = new SkillParticle(this.fightScene.getParticleLayer(), this.belong_role, this.I.eff_info.particle_id)
            //this.fightScene.addParticle(particle)
        }
    }

    public updateTargetBuff(){
        // body 
    }
    
    public updateTargetHurt(...arg)   {
        // body
    }

    public updateBreakUnit(args?){
        // body
        if( this.belong_action != null && this.belong_action.getIsContinueBreak() == true ){
            this.b_finish = true
        } 
    }

    public collisionEvent(){
        // body
        if( this.I.eff_info.collision_num <= 0 ){ return }
        this.collision_counter = this.collision_counter + 1
        if( this.collision_counter >= this.I.eff_info.collision_num ){
            this.changeNextOrEnd(false)
        }
    }

    public updateEndSpx(args?){
        // body
        if( this.b_complete == true ){
            return 
        }
        if( this.spx.IsActEnd() ){
            if( this.spx != null ){
                this.spx.setVisibleSpx(false)
            }                
            this.b_complete = true
        }
    }

    public changeNextOrEnd( bClean ){
        // body
        if( this.next_effect != null ){
            this.cur_counter = 1
            if( bClean == true ){ this.cleanHurtBodys() }        
            //if( this.effect_next_type == EEffectType.EFFECT_TYPE_COLLISION ){
                this.next_effect.playEffect() 
            //}
        }else{
            this.b_finish = true       
            this.spx.setVisibleSpx(false);
            this.cleanHurtBodys()	
        }   
        this.spx.Stop();
    }

    public setActInterval( scale ){
        if( this.cur_counter == 0 ){
            if( this.spx != null ){
                this.spx.setSpeedScale( scale )
            }		
        }else if( this.cur_counter == 1 ){
            this.next_effect.setActInterval( scale )           
        }else{
            console.assert( false )
        }
    }

    public Pause(){
        if( this.cur_counter == 0 ){
            if( this.spx != null ){
                this.spx.Pause()
            }		
        }else if( this.cur_counter == 1 ){
            this.next_effect.Pause()           
        }else{
            console.assert( false )
        }
    }

    public resume(){
        if( this.cur_counter == 0 ){
            if( this.spx != null ){
                this.spx.resume()
            }		
        }else if( this.cur_counter == 1 ){		
            if( this.next_effect != null ){
                this.next_effect.resume()
            }		   
        }else{
            console.assert( false )
        }
    }

    public addHurtOne( role ){
        // body	
        if( this.cur_counter == 0 ){
            this.hurt.addHurtOne( role )
        }else if( this.cur_counter == 1 ){
            if( this.next_effect != null ){
                this.next_effect.addHurtOne( role ) 
            }   
        }else{
            console.assert( false )
        }
    }

    public canHurtOne( role ){
        // body
        //assert( role != null )
        if( this.cur_counter == 0 ){
            if( this.hurt != null ){
                let bTag = this.hurt.canHurtOne( role )
                if( bTag == true ){
                    if( this.next_effect != null ){
                        this.cur_counter = 1						
                        this.playEffect()	
                    }else{
                        this.b_finish = true                    
                        this.cleanHurtBodys()
                    }
                    return true
                }else{
                    return false
                }
            }
        }else if( this.cur_counter == 1 ){
            if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){
                return this.next_effect.canHurtOne( role )
            }else{
                return false
            }
            
        }else{
            console.assert(false)
        }
        return false
    }

    public cleanHurtBodys(){
        // body
        if( this.hurt != null ){
            this.hurt.cleanHurtBodys()
        }
    }

    public setPos( x, y ){
        // body
        if( this.cur_counter == 0 ){
            this.x = x
            this.y = y	
            if( this.spx != null ){
                this.spx.SetPosition( x, y )
            }
        }else if( this.cur_counter == 1 ){
            if( this.next_effect != null ){
                this.next_effect.setPos( x, y )
            }        	
        }else{
            console.assert( false )
        }
    }

    public resetDist(){
        let effdisp = this.I.eff_disp
        if( effdisp == null ){ return }
        let sX    = effdisp.displacement_speed[adjustIndex(1)]
        let sY    = effdisp.displacement_speed[adjustIndex(2)]
        let aX    = effdisp.displacement_acceleration[adjustIndex(1)]
        let aY    = effdisp.displacement_acceleration[adjustIndex(2)]
        let aTime = effdisp.acceleration_time
        let cTime = effdisp.continue_time
        this.setDisplacement(sX, sY, aX, aY, aTime, cTime)
    }

    public setDisplacement( sX, sY, aX, aY, aTime, cTime ){
        this.DISPLACEMENT.speed_x = sX
        if(sX > 1){
            console.log(111);
        }
        this.DISPLACEMENT.speed_y = sY
        this.DISPLACEMENT.aspeed_x = aX
        this.DISPLACEMENT.aspeed_y = aY
        this.DISPLACEMENT.aspeed_time = aTime
        this.DISPLACEMENT.continue_time = cTime
    }

    public getPos(){
        // body
        let x = 0
        let y = 0
    
        if( this.cur_counter == 0 ){
            x = this.x
            y = this.y
        }else if( this.cur_counter == 1 ){
            if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){
                this.next_effect.getPos( x, y )
            }else{
                // do! need
                // assert( false )
            }
        }else{ 
            console.assert(false)
        }
        return [x,y]
    }

    public setVisible( tag ){
        if( this.cur_counter == 0 ){
            this.spx.setVisibleSpx( tag )
        }else if( this.cur_counter == 1 ){
            if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){				
                return this.next_effect.setVisible( tag )
            }else{
                // do! need
                // assert( false )
            }
        }
    }

    public getEffectSpx(){
        // body
        if( this.b_finish != true ){
            if( this.cur_counter == 0 ){            
                return this.spx
            }else if( this.cur_counter == 1 ){
                if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){				
                    return this.next_effect.getEffectSpx()
                }else{
                    // do! need
                    // assert( false )
                }
                
            }else{
                console.assert( false )
            }
        }
        return null
    }

    public getEffectType(args){
        if( this.cur_counter == 0 ){
            return this.effect_type
        }else{
            if( this.next_effect != null ){
                return this.next_effect.getEffectType()
            } 
        }
    }

    public getHurt( ...args ){
	// body
	if( this.cur_counter == 0 ){
		return this.hurt
	}else if( this.cur_counter == 1 ){
		if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){				
			return this.next_effect.getHurt()
		}else{
			// do! need
			// assert( false )
		}		
	}else{
		console.assert( false )
	}
	return null
}

    public getHitEffectId(){
        // body
        if( this.cur_counter == 0 ){
            let len = this.I.eff_info.hit_effects_ids.length;
            let index = getRandom(1, len)
            return [this.I.eff_info.hit_effects_ids[adjustIndex(index)], this.I.eff_info.hit_effects_size]
        }else if( this.cur_counter == 1 ){
            if( this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET ){				
                return this.next_effect.getHitEffectId()
            }else{
                // do! need
                // assert( false )
            }		
        }else{
            console.assert( false )
        }
        return -1
    }

    public getIsFollowRole(){
        // body
        return this.b_follow
    }
    
    public getIsFinish(){
        // body
        return this.b_finish
    }
    
    public getEffectId(){
        // body
        return this.effect_id
    }
    
    public getBelongRole(){
        // body
        return this.belong_role
    }
    
    public getBelongSkill(){
        // body
        return this.belong_skill
    }
    
    public getBelongUnit(){
        // body
        return this.belong_action
    }
    
    public getAtkType(){
        // body
        return this.I.eff_info.effect_atk_type
    }
    
    public getSkillType(){
        // body
        return this.effect_skill_type
    }
    
    public getTarget(){
        // body
        return this.effect_target
    }
    
    public getBreakPriority(){
        // body
        return this.I.eff_info.effect_break_priority
    }
    
    public getBuffId(){
        // body
        return this.I.eff_info.effect_buff_id
    }
    
    public setEffectType( effectType ){
        // body
        this.effect_type = effectType
    }

    public isHighLight(args){
        return yuan3(this.belong_skill.skill_type == message.ESkillType.SKILL_TYPE_DEATH, true, false)
    }
}


export class SkillEffect extends SkillEffectBase{

    constructor(){
        
        super();
    }
    public newSetData(id, belong_skill, belong_action, belong_parent){
        this.setId(id);
        this.polyFun();
        this.CtorMore(belong_skill, belong_action, belong_parent)
        this.init()
    }

    public polyFun(){
        this.setEffectType(EnumEffectType.Effect_Type_Skill_Common)
    }

    public CtorMore(belong_skill, belong_action, belong_parent){
        this.belong_skill = belong_skill;
        this.belong_role = belong_skill.getBelongRole();
        this.belong_action = belong_action;
        this.belong_parent = belong_parent;
    }

    public initHand()	{
        // body	    
        this.loadSpx()	
    }

    public handlePos(){
        // body
        let [rx, ry] = [0, 0]
        let roleScale = this.belong_role.getScale()
        if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_FIGHT ){
             roleScale = turnNum(this.belong_role.ePosition, 1)
        }else{
             roleScale = turnDir(this.belong_role.dir, 1)
        }
    
        if( this.I.eff_info.effect_target == message.ETargetId.TARGET_MAP ){
            if( (this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_LEFT && this.effect_target_pos == message.ETargetPosType.TARGET_POS_ENEMY)
                || (this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_RIGHT && this.effect_target_pos == message.ETargetPosType.TARGET_POS_MINE) ){
                rx = this.I.eff_info.distance_map[0]
                ry = this.I.eff_info.distance_map[1]///(UIManager.StageWidth/960)
                ry = (UIManager.StageHeight - ry)///(UIManager.StageHeight/ Device.STANDARD_SCREEN_H);
            }else{
                rx = UIManager.StageWidth - (this.I.eff_info.distance_map[0]*(UIManager.StageWidth/Device.STANDARD_SCREEN_W))- this.fightScene.fightRoot.x;
                ry = (this.I.eff_info.distance_map[1])///(UIManager.StageWidth/960)
                ry = UIManager.StageHeight - ry;
                if(this.spx.name != "zi_yanwu_eff"){
                    let a ;
                }
            }
        }else{
            if( this.belong_parent != null && this.belong_parent.effect_type == EnumEffectType.Effect_Type_Skill_Common ){
                rx = this.belong_parent.spx.getPositionX()
                ry = this.belong_parent.spx.getPositionY()
            }else{
                let roleDir = this.belong_role.getDir()
                let face = -1
                if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	
                let _x = this.belong_role.getPosX()
                let _y = this.belong_role.getPosY()
                rx = _x + face * this.dis_x * Math.abs(roleScale);
                ry = _y - this.dis_y * Math.abs(roleScale);
            }  
        }      
        return [rx, ry, roleScale];
    
    }

    public updateSpx( tick ){
        // body    	
        super.updateSpx(tick)
        if( this.b_follow == true ){
            this.updateSpxFollow(tick)
        }else{
            this.updateSpxDistance(tick)
        }
    }

    public updateSpxFollow( tick ){
        // body		
        let roleDir = this.belong_role.getDir()
        let roleX = this.belong_role.getPosX()
        let roleY = this.belong_role.getPosY()
        let roleScale = this.belong_role.getScale()
        let face = -1
    
        if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	    
        var rx = roleX + face * this.dis_x * Math.abs(roleScale)
        if( this.b_lockY == false ){
            var ry: number = roleY - this.dis_y * Math.abs(roleScale) 
        }else{
            var ry: number = Gmgr.Instance.floor
        }	  	
        this.spx.SetPosition( rx, ry)	
    }

    public clearEffectLayer(){
        // body	
        this.effectLayer.removeChild(this.spx.spine, true)  
    }
}


export class TalentHurtEffect extends SkillEffectBase{

    public talent_effect = null;
    public belong_talent = null;

    constructor(){
        
        super();   
    }
    public newSetData(id, belong_talentEffect){
        super.setId(id);
        this.polyFun();
        this.CtorMore(belong_talentEffect)
        this.init() 
    }

    public polyFun(){
        this.setEffectType(EnumEffectType.Effect_Type_Tallent)
    }

    public CtorMore(belong_talentEffect){
        // body
        // 天赋产生天赋效果，天赋效果为 产生一个碰撞特效
        this.talent_effect = belong_talentEffect
        this.belong_talent = belong_talentEffect.belong_talent
        this.belong_role = belong_talentEffect.target_role
    }

    public initHand()	{
        // body	    
        this.loadSpx()	
    }

    public handlePos(){
        // body
        let rx = this.belong_role.getPosX()
        let ry = this.belong_role.getPosY()
        let roleScale = turnNum(this.belong_role.ePosition, 1)
        let roleDir = this.belong_role.getDir()
        let face = -1
        if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	  
        if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_FIGHT ){
            rx = rx + face * this.dis_x * Math.abs(roleScale)
            ry = ry - this.dis_y * Math.abs(roleScale);
        }else{
            rx = this.belong_role.x + face * this.dis_x * Math.abs(roleScale)
            ry = this.belong_role.y - this.dis_y * Math.abs(roleScale)  
        }	       
        return [rx, ry, roleScale] 
    }

    public updateSpx( tick ){
        // body    	
        super.updateSpx(tick)
    }

    public clearEffectLayer(){
        // body	
        this.effectLayer.removeChild(this.spx.spine, true)  
    }
}


export class SkillEffectTimely extends SkillEffectBase{
    
    public target_role = null;

    constructor(){
        super();
    }
    public newSetData(id, belong_skill, target_role, belong_action){
        super.setId(id);
        this.polyFun();
        this.CtorMore(belong_skill, belong_action, target_role)
	    this.init()	 
    }


    public polyFun(){
        this.setEffectType(EnumEffectType.Effect_Type_Skill_Target)
    }

    public CtorMore(belong_skill, belong_action, target_role){
        this.belong_skill = belong_skill 
        this.belong_role = belong_skill.getBelongRole()
        this.belong_action = belong_action
        this.target_role = target_role
        this.touch_role = target_role
    }

    public initHand()	{
        // body	
        this.loadSpx()	
    }

    public clearEffectLayer(){
        // body
        this.effectLayer.removeChild(this.spx.spine, true)
    }

    public handlePos(){
        // 
        // let roleDir = this.target_role.getDir()
        let roleScale = this.target_role.getScale()  
        let [rx, ry] = [0, 0];
        // let roleX = this.target_role.getPosX();
        // let roleY = this.target_role.getPosY();
        // let face = -1;
    
        // if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	    
        // rx = roleX + face * this.dis_x * Math.abs(roleScale);
        // if( this.b_lockY == false ){
        //     ry = roleY - this.dis_y * Math.abs(roleScale);
        // }else{
        //     ry = UIManager.StageHeight-230;
        // }
        let rectRole = this.target_role.body.getRect();
        rx = this.target_role.x
        ry = this.target_role.y - rectRole.height/2;
        return [rx, ry, roleScale]  
    }

    public updateSpx( tick ){
        // body    	
        super.updateSpx(tick)
        //if( this.b_follow == true ){
        if( this.b_follow == true ){
            this.updateSpxFollow(tick)
        }else{
            this.updateSpxDistance(tick)
        }
    }

    public updateSpxFollow(...args){
        // body		
        let roleDir = this.target_role.getDir()
        let roleX = this.target_role.getPosX()
        let roleY = this.target_role.getPosY()
        let roleScale = this.target_role.getScale()
        let face = -1
    
        if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	    
        var rx = roleX + face * this.dis_x * Math.abs(roleScale)
        if( this.b_lockY == false ){
            var ry: number = roleY - this.dis_y * Math.abs(roleScale);
        }else{
            var ry: number = Gmgr.Instance.floor
        }	  	
        this.spx.SetPosition( rx, ry);
    }

    public updateTargetBuff(){
        // body   
        if( this.effect_target == message.ETargetId.TARGET_COLLISION || this.b_playBuff == true ){ return }    
        if( this.I.eff_info.effect_buff_id != -1 && this.spxAnimationFrame >= this.I.eff_info.buff_appear_frame ){
            this.b_playBuff = true        
            
            let [hitRate, baseType, damageType] = getBuffRelate(1, this.I.eff_info.effect_buff_id)
            let useType, is_fold = getBuffUseType(baseType)  
    
            if( this.target_role.beCanHurt() == true || useType == TableEnum.TableBuffUseType.Buff_Use_Good ){
                this.target_role.beTargetEffectBuff(this, this.belong_role) 
            }       
        }
    }

    public updateTargetHurt( tick )   {
        // body        
        if( this.effect_target == message.ETargetId.TARGET_COLLISION ){ return }
        if( this.effect_point[1] == -1 ){ return }     
        if( this.spxAnimationFrame >= this.effect_point[1] && this.spxAnimationFrame < this.effect_point[2] ){         
            if( this.hurt_gap == 0 ){    
                if(  Gmgr.Instance.layerId != TableEnum.TableEnumLayerId.LAYER_ZORKBOSS && this.target_role.beCanHurt() == true && this.belong_role.bDead == false ){
                    // 直接给敌人施加hurt
                    this.target_role.beTargetEffectHurt(this, this.belong_role) 
                }else if( Gmgr.Instance.layerId == TableEnum.TableEnumLayerId.LAYER_ZORKBOSS ){
                    // 直接给敌人施加hurt
                    this.target_role.beTargetEffectHurt(this, this.belong_role) 
                }
             }
            this.hurt_gap = this.hurt_gap + tick * 1000
            if( this.hurt_gap >= this.effect_point[3] ){
                this.hurt_gap = 0
            } 
        }   
    }
    
}

//////////////////////////////////////////////////////////////////////////////-
// 导弹跟踪特效

export class MissileEffect extends SkillEffect{

    public track_role = null;
    
    constructor(){
        
        super();
    }
    public newSetData(id, belong_skill, belong_action, belong_parent){
        super.newSetData(id, belong_skill, belong_action, belong_parent);
        this.polyFun();
        this.initTrack();
    }

public polyFun(){
    this.setEffectType(EnumEffectType.Effect_Type_Missile)
}

public initTrack(){
    let players = this.fightScene.getTargetPlayer(this.belong_role, this.effect_target_pos, this.effect_target)
    if( players.length != 0 ){
        this.track_role = players[ adjustIndex(1)]
    }
}

public updateSpx( tick ){
	// body   
    super.updateSpx(tick)
    this.updateTrack( tick )
}
private _targetPoint:egret.Point = new egret.Point();
private _thisPoint:egret.Point = new egret.Point();
public updateTrack( tick ){
    // body
    let speed = this.I.eff_info.missile_speed;
    if( speed <= 0 ){ speed = 0 }
    let rt = tick * 1000;
    if( this.track_role == null ){ return }
    let [_t_x , _t_y] = this.track_role.getMidPos();
    this._targetPoint.setTo(_t_x,_t_y);
    let [_x, _y] = this.getPos();
    this._thisPoint.setTo(_x,_y);
    let delta = this._targetPoint.subtract(this._thisPoint);
    let distance = egret.Point.distance(this._thisPoint, this._targetPoint);
    let x2 = this._thisPoint.x + speed * rt * delta.x/distance;
    let y2 = this._thisPoint.y + speed * rt * delta.y/distance;

    if( 100 > distance ){
        return
    }    

    this.x = x2
    this.y = y2
    this.spx.SetPosition(this.x, this.y)

    let x1 = this._thisPoint.x
    let y1 = this._thisPoint.y
    let deltaRotation = 90 - Math.atan2(y2-y1, x2-x1) * 180/Math.PI
    this.spx.setRotation(deltaRotation)
}

}
}