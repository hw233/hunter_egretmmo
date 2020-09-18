namespace zj {

export class SkillHit{

    // 成员初始化
	public node: eui.Group = null
	public role = null
	public hit_id = null	

	public x = 0
	public y = 0
    public spx_id = 0
	public action_id = 0
	public play_speed = 1.0
    public b_blendActive = false

	public b_finish = false
	public spx: Spx
    public b_crit = false
    public scale = null


    constructor(){
        // 加载ani
    }

    public release( ...args ){
        // body
        // wuzhi all
        /*if( tolua.isnull(this.node) == false ){
            this.node.removeChild(this.spx, true)
            this.spx = null
        }*/	
        if(this.spx){
            this.spx.clearSpine();
            this.spx = null;
        }
        Game.ObjectPool.returnItem("SkillHit",this);
    }
    public setInfo(node, role, id, scale){
        // 成员初始化
        this.node = node
        this.role = role
        this.hit_id = id	
        this.scale = scale
        this.init();
    }
    public init( ...args ){
        this.x = 0
        this.y = 0
        this.spx_id = 0
        this.action_id = 0
        this.play_speed = 1.0
        this.b_blendActive = false

        this.b_finish = false
        this.spx = null    
        this.b_crit = false
        // body
        this.loadTable()
        this.loadSpx()
    }


    public loadTable( ...args ){
        // body
        let tableHit = TableClientSkillHiteffect.Table(); //CSV.GetTable(StringConfig_Table.skillHitEffect)
        this.spx_id = tableHit[this.hit_id].effects_spx_id
        this.action_id = tableHit[this.hit_id].effects_action_id

        let tag = tableHit[this.hit_id].blend_active
        this.b_blendActive = getBoolean(tag)
    }

    public loadSpx(...args){
        // body
        if(this.spx){
            this.spx.clearSpine();
            this.spx = null;
        }
        // wu zhi
        let [s, order] = HunterSpineX(this.spx_id, Gmgr.Instance.spineX_scale)
        this.spx = s;
        
        this.spx.SetScale(this.scale)
        this.spx.SetAutoUpdate(false)
        this.spx.setVisibleSpx(false)      
        this.node.addChild(this.spx.spine);
    }

    public playSpx( ...args ){
        // body
        if( this.b_blendActive == true ){       
            this.spx.setBlendAdditive( true );
        }
        this.spx.SetPosition( this.x, this.y)
        this.spx.stopAllActions()
        this.spx.setVisibleSpx(true)   
        this.spx.SetLoop(false) 
        this.spx.ChangeAction(this.action_id)
    }

    public update( tick ){
        // body	
        this.updateSpineX(tick)
        this.updateEndBody(tick)
    }

    public setPosition( x, y ){
        // body	
        this.x = x
        this.y = y

        if( this.spx != null ){
            this.spx.SetPosition( this.x, this.y)   
        }	
    }

    public getEffectSpx( ...args ){
        return this.spx
    }

    public getIsFinish( ...args ){
	    // body
	    return this.b_finish
    }

    public getRole( ...args ){
	    // body
	    return this.role
    }
    
    public getHitId( ...args ){
	    // body
	    return this.hit_id
    }

    public updateSpineX( tick ){
        // body
        if( this.spx != null ){
            this.spx.UpdataAni( tick )
        }
    }

    public updateEndBody( tick ){
        // body    
        if( this.b_finish == true ){ return }    
        if( this.spx.IsActEnd() ){
            this.b_finish = true 
        }
    }

}


}