namespace zj {


export class SkillCd{

    // body	
    public belong_role = null
	public belong_skill = null
    public maxTime = 0
    public time = 0   

   
    public cdTime = null;
    public overflow = null;
	
	public bFinish = false
	public bPause = false;

    public entryTime;

    public isComplete:boolean = false;

    constructor(role, skill, bEntry){
        this.belong_role = role
        this.belong_skill = skill
        this.maxTime = 0
        this.time = 0 
        let t_value = this.belong_role.handleTalentEffect_EntryTime();
        this.entryTime = skill.getCdEntry() + t_value;
        if(this.entryTime <= 0){
            this.entryTime = 0;
        }
        //教学关特殊处理
        if(teachBattle.teach_value[Game.TeachSystem.curPart] != null){
            let tbl = teachBattle.teach_value[Game.TeachSystem.curPart][ PlayerHunterSystem.GetGeneralId(role.roleId) ];
            if(tbl != null){
                if(tbl.cd != null){
                    this.entryTime = tbl.cd;
                }
            }
        }

        this.cdTime = skill.getCd()
        this.maxTime = bEntry && this.entryTime || this.cdTime;
        this.time = this.maxTime
        this.overflow = 0
        
        this.bFinish = false;
        this.bPause = false;
    }


    public release( ...args ){
        // body
        this.belong_role = null;
        this.belong_skill = null;
    }

    public update( tick ){
        // body	
        //if( this.bFinish == true or this.bPause == true ){
        //	return 
        //}
        if( this.time <= 0 ){
            this.bFinish = true
            return
        } 
        this.bFinish = false   

        if( this.belong_role.bSleep == true ){
            return 
        }   

        if( this.belong_role.isWeeking() == true ){
            return
        }
        
        let speedUpRatio = this.belong_role.getBuffSpeedUp()
        let speedDownRatio = this.belong_role.getBuffSpeedDown()
        let ratio = 1.0 + speedUpRatio - speedDownRatio
        /*
        if( this.belong_role.bSpeedDown == true ){
            ratio = 0.5
        }
        */
        this.isComplete = true;
        this.time = this.time - tick * 1000 * ratio
        if( this.time <= 0 ){
            this.time = 0
            this.bFinish = true
        }
    }

    public openNext(args){
        // body
        if( this.belong_skill != null ){
            this.cdTime = this.belong_skill.getCd()
        }    
        this.maxTime = this.cdTime
        this.time = this.maxTime
        this.overflow = 0
    }

    public setIsPause( tag ){
        // body
        this.bPause = tag
    }

    public isPause( ...args ){
	    // body
	    return this.bPause
    }

    public setIsFinish( tag ){
	    // body
	    this.bFinish = tag
    }

    public IsFinish( ...args ){
	    // body
        let tag = false
        if( this.time <= 0 || this.bFinish ){
            if(this.isComplete == true){
                tag = true;
            }
        }
	    return tag
    }

    public getTime( ...args ){
	    // body
	    return this.time
    }

    public getMaxTime( ...args ){
        // body
        return this.maxTime
    }

    public setTime( time ){
        this.time = time
    }

    public setMaxTime( time ){
        this.maxTime = time
    }

    public getBelongSkill( ...args ){
	    // body
	    return this.belong_skill
    }

    public getBelongRole( ...args ){
        // body
        return this.belong_role
    }

}

export class SkillCdMgr{

     // 提供单例接口
    private static instance_: SkillCdMgr;
    public static get Instance(): SkillCdMgr {
        if (SkillCdMgr.instance_ == null) {
            SkillCdMgr.instance_ = new SkillCdMgr();
        }
        return SkillCdMgr.instance_;
    }

    public tableCd = {};
    public battleFormulaValue = 3500;

    construct(){
        
    }


    public clearCd( ...args ){
	    // body
        this.resetCd()
    }

    public addSkillCd( role, skill, bEntry ){
	    // body
        //let tag = this.isSkillExit( skill )
	    //if( tag == true ){ assert(true) }
        // skill.StableObjectId
        if( this.tableCd[ skill.onlyId] == null ){
            let tmp = new SkillCd( role, skill, bEntry )
            this.tableCd[ skill.onlyId] = tmp
        }
        
        //this.modifyCdUi( role, skill, tmp )
    }

    public modifySkillCd( role, skill, time, tag, isOverFlow){
        // body
        if(tag == null){
            tag = false;
        }
        let cd = this.tableCd[ skill.onlyId ]
        if( cd == null ){ return }
        let curTime = cd.getTime()
        let maxTime = cd.getMaxTime()
        let belongRole = cd.getBelongRole()
        if( time < 0 ){
            let tmp = curTime + time
            if( tmp < 0 ){
                if( maxTime == cd.entryTime ){
                    cd.maxTime = cd.cdTime  
                    maxTime = cd.maxTime 
                }
                cd.setTime(0)   
                if( tag == true ){
                    cd.overflow = tmp
                }else{
                    cd.overflow = 0
                }        
            }else{
                cd.setTime(tmp)
            }
            
        }else{
            let tmp = curTime + time  
            if( isOverFlow ){
                
            }else{
                if( tmp >= cd.maxTime ){
                    tmp = cd.maxTime
                }
            }        
            cd.setTime(tmp)
        }

        /*
        let cd = this.tableCd[ skill ]
        if( cd == null ){ return }
        if( cd.isPause() == true ){ return }
        do
            let maxTime = cd.getMaxTime()
            let belongRole = cd.getBelongRole()
            let curTime = cd.getTime()
            if( time < 0 ){            
                let tmp = curTime + time
                if( tmp < 0 ){   
                    if( maxTime == cd.entryTime ){
                        cd.maxTime = cd.cdTime  
                        maxTime = cd.maxTime  
                    }                         
                    belongRole.addBean()
                    if( belongRole.isBeanMax() == true ){ 
                        cd.setIsFinish(false)
                        cd.setIsPause(true)
                    }else{
                        let extra = maxTime - math.abs(tmp)
                        if( extra >= 0 ){
                            cd.setTime(extra)
                        }                    
                    }
                }else{
                    cd.setTime(tmp)
                }
            }else if( time > 0 ){
                let tmp = curTime + time   
                if( tmp >= cd.cdTime ){
                    tmp = cd.cdTime
                }
                cd.setTime(tmp)
            }             
        }   
        */
    }

    public isSkillExit( skill ){
        // body
        if( skill == null ){ return [false, null] }
        if( this.tableCd[ skill.onlyId ] == null ){ return [false, null] }
        return [true, this.tableCd[ skill.onlyId ]] 
        /*
        let tag = false
        let cd = null
        for k,v in pairs(this.tableCd) do		
            if( v.belong_skill == skill ){
                tag = true
                cd = v
                break
            } 
        }    
        return tag, cd
        */  
    }

    // 从cdTable中获取数据
    public getCurCd( skill ){
        if( skill == null ){ return null }
        if( this.tableCd[ skill.onlyId ] == null ){ return null }
        return this.tableCd[ skill.onlyId ]
        /*
        for k,v in pairs(this.tableCd) do	
            if( v.belong_skill == skill ){
                return v
            }
        }
        return null
        */
    }

    public update( tick ){
        for (let key in this.tableCd){
            this.tableCd[key].update(tick)
        }
        // // body   
        // let i = 1
        // //while i <= this.tableCd.length do
        // for (let[k,cur] of HelpUtil.GetKV(this.tableCd)){
        //     cur.update(tick)
        //     //let cur = this.tableCd[i]	
        //     /*	
        //     if( cur.bFinish == true ){
        //         cur.setIsFinish(false)
        //         cur.belong_role.addBean()
        //         if( cur.belong_role.isBeanMax() == true ){
        //             cur.setIsFinish(false)
        //             cur.setIsPause(true)
        //         }else{
        //             cur.openNext()
        //         }                    
        //     }else{
        //         cur.update(tick)
        //         //i = i + 1
        //     }
        //     */
        // }
    }

    public resetCd(){
        // body     
        for (let k in this.tableCd){
            CC_SAFE_DELETE(this.tableCd[k])		
	    }	
        this.tableCd = {}
    }

    public reCalcCd( skill ){
        if( skill == null ){ return }
        if( this.tableCd[ skill.onlyId ] != null ){
         this.tableCd[ skill.onlyId ].cdTime = skill.getCd()
        }
    }

    public cleanRoleCd(role){
        let skill = role.getPressSkill()
        if( skill != null ){
            delete this.tableCd[skill.onlyId];
        }
        /*
        let i = 1
        while i <= this.tableCd.length do
            let cur = this.tableCd[i]        
            if( cur.getBelongRole() == role ){
                table.remove(this.tableCd, i)
            }else{
                i = i + 1
            }
        }
        */
    }

    public setRoleCd(role, cd){
        let skill = role.getPressSkill()
        if( skill != null ){
            this.tableCd[ skill.onlyId ] = cd   
        }  
    }


}
}