namespace zj {


export class SkillParticle{

      // 成员初始化    
        public node = null
        
        public belong_role = null
        public particle_id = null 	    	

        public spx_id = 0 
        public x = 0
        public y = 0
        public scale_x = 1
        public scale_y = 1
        
        public flip_x = false
        public continue_time = 0
        public b_blendActive = false	

        public total_time = 0    
        public b_finish = false
        
        public particle = null		

    constructor(node, belong_role, id){
        // 成员初始化    
        this.node = node
        
        this.belong_role = belong_role
        this.particle_id = id 	    	

        this.spx_id = 0 
        this.x = 0
        this.y = 0
        this.scale_x = 1
        this.scale_y = 1
        
        this.flip_x = false
        this.continue_time = 0
        this.b_blendActive = false	

        this.total_time = 0    
        this.b_finish = false
        
        this.particle = null		
    }

    public release( ...args ){
	// body	 
    this.node.removeChild(this.particle, true)   
    this.particle = null
    
    //this.belong_role = null
    }

    public init( ...args ){
	// body
	this.loadTable()	
	this.loadParticle()
    this.play()    
    }

    public loadTable( ...args ){
        // body
        let tableParticle = TableClientSkillParticle.Table();
        this.spx_id = tableParticle[this.particle_id].source_id
        let pos = tableParticle[this.particle_id].play_pos
        this.x = pos[adjustIndex(1)]
        this.y = pos[adjustIndex(2)]
        let scale = tableParticle[this.particle_id].scale
        this.scale_x = scale[adjustIndex(1)]
        this.scale_y = scale[adjustIndex(2)]    
        this.flip_x = turnBool(tableParticle[this.particle_id].flip_x)
        this.continue_time = tableParticle[this.particle_id].play_time
        this.b_blendActive = turnBool(tableParticle[this.particle_id].blend_active)
    }

    public loadParticle(...args){
        // body
        // wuzhi all
        /*let particle = resdb.Particle(this.spx_id)    
        particle.setPositionType(cc.POSITION_TYPE_GROUPED) 
        let dir = 1   
        if( this.flip_x == true && this.belong_role.ePosition == TableEnum.TablePositionType.POSITION_RIGHT ){ 
            //particle.setScaleX(-1)
            dir = -1
        }
        if( this.b_blendActive == true ){
            particle.setBlendAdditive(true)  
        }    
        particle.setScaleX(dir*this.scale_x)
        particle.setScaleY(this.scale_y)

        this.node.addChild(particle)
        this.particle = particle*/      
    }

    public play( ...args ){
	// body    
    this.particle.setPosition(new egret.Point(this.x, this.y / (UIManager.StageWidth / 960)))  
    }

    public update( tick ){
        // body	
        if( this.b_finish == true ){ return }   
        let rt = tick * 1000
        this.total_time = this.total_time + rt
        if( this.total_time > this.continue_time ){
            this.b_finish = true
        }     
    }

    public getParticleId( ...args ){
        // body
        //return this.buff_id
    }

    public getIsFinish( ...args ){
	    // body
	    return this.b_finish
    }

}


}