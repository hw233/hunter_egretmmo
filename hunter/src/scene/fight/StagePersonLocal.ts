namespace zj {
/**本地武将类，继承人物类 */
export class StagePersonLocal extends StagePerson{
	public constructor(node, aiTag) {
		super(node, aiTag);
		this.setRoleType( TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL );
		this.bLocalBoss = false;
	}
	public bLocalBoss;
	public loadBaseData(){
		let instance = this.getDbInstance();
		this.mapRoleId = instance.monster_roleId
		this.formType = instance.role_type 

		this.roleName = this.getLocalMobName();
		this.headPath = TableMapRole.Item(this.mapRoleId).head_path
		this.battleHead = TableMapRole.Item(this.mapRoleId).battle_head
		this.supportHead = TableMapRole.Item(this.mapRoleId).battle_help
		this.bodyPath = TableMapRole.Item(this.mapRoleId).body_path
		this.halfPath = TableMapRole.Item(this.mapRoleId).half_path
		// 旅团标识
		this.groupTag = TableMapRole.Item(this.mapRoleId).organization
		// 特性
		this.roleFeature = TableMapRole.Item(this.mapRoleId).features
		// 派系
		this.roleFaction = message.EGeneralType.GENERAL_TYPE_NONO //TableMapRole.Item(this.mapRoleId).type
		this.parryMaxTime = TableMapRole.Item(this.mapRoleId).parry_time
		this.homingTime = TableMapRole.Item(this.mapRoleId).homing_time
		//this.headPath = Game.PlayerMobSystem.fromMonster(this.roleId).head_path
		this.profession = instance.monster_profession
		
		this.nHpTube = null;//instance.hp_tube
		this.helpBg = instance.help_bg
		this.maxBeanNum = 1

		this.star = instance.monster_star
		this.step = instance.monster_step

		this.tableSkillIds = instance.skill_ids
		this.tableSkillLevels = instance.skill_levels
		this.tableTalentIds = instance.talent_ids
		this.tableTalentLevels = instance.talent_levels
		this.tableHideTalentIds = [];
		this.tableHideTalentIds.push(instance.hide_talent_ids);
		
		this.getUpTime = instance.get_up_time	
		this.stirUpDef = instance.stir_up_resistance
		this.stirAgainDef = instance.stir_again_def
		this.moveSpeed = instance.move_speed
		let tag = instance.is_stir_up
		this.bStirUp = getBoolean(tag)	   
		tag = instance.is_gravity 
		this.bGravity = getBoolean(tag)	

		this.SetAttrib("maxRage", instance.monster_rage)
		this.SetAttrib("stiffDef", instance.stiff_resistance)
	}
	public loadFightData(){
		let instance = this.getDbInstance();
		this.SetAttrib("level", instance.monster_level)
		this.SetAttrib("maxHp", instance.monster_hp)
		this.SetAttrib("curHp", this.attribs.maxHp)
		
		this.SetAttrib("atk", instance.monster_atk)
		this.SetAttrib("def", instance.monster_def)
		this.SetAttrib("htv", instance.skill_atk)
		this.SetAttrib("eva", instance.skill_def)
		//this.SetAttrib("sacredAtk", instance.sacred_atk)
		//this.SetAttrib("sacredDef", instance.sacred_def)
		
		this.SetAttrib("atkCritRate", instance.atk_crit)
		this.SetAttrib("skillCritRate", instance.skill_crit)
		//this.SetAttrib("sacredCritRate", instance.sacred_crit)
		this.SetAttrib("critExtra", instance.crit_extra)
		this.SetAttrib("critDef", instance.crit_resistance)

		this.SetAttrib("hitRate", instance.hit_rate)
		this.SetAttrib("dodgeRate", instance.dodge_rate)	
		
		this.SetAttrib("ignorePhydef", instance.ignore_phyDef)
		this.SetAttrib("ignoreMagicdef", instance.ignore_magicDef)
		//this.SetAttrib("ignoreScaredef", instance.ignore_sacredDef)
		this.SetAttrib("finalExtraHurt", instance.final_extra)
		this.SetAttrib("finalReduceHurt", instance.final_reduce)

		this.SetAttrib("unilResis", instance.universal_resistance)
		this.SetAttrib("ignoreResis", instance.ignore_resistance)
		this.SetAttrib("floatResis", instance.float_resistance)
		this.SetAttrib("cdSpeed", instance.cd_speed) 
		this.SetAttrib("supportConsume", instance.support_consume);

		//专用字段
		if(this.attribs.ignoreMagicdef == 1){
			this.bFloatBreak = false;
		}
	}
	public initLocal( roleId ){
		this.setRoleId( roleId )
		this.setGeneralId( PlayerHunterSystem.GetGeneralId(roleId) )
		this.loadBaseData()
		this.loadFightData()
		this.loadModelDB()
		this.loadBody()      

		this.loadTalent() 
		this.loadAttriTalent()
		this.loadSkill() 
		this.loadSkillAi()

		this.loadFightSpxRes()	  
		this.loadStorageSpx()  
		this.loadSkillDialog()
		this.initBleedTriggerLine()
		this.setHp( this.getMaxHp() )
	}
	public creatLocal(roleId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale, appearStage, orderPos){
		this.setPositionType(ePosition); 
		this.setRoleId(roleId)
		this.setGeneralId( PlayerHunterSystem.GetGeneralId(roleId) )
		this.setOrderPos(orderPos)
		this.setTeamNum(eTeamNum)       
		this.setIsEnemy(bEnemy)

		this.initLocal(roleId)
		this.commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale)

		this.setVisible(false)
	}
	public loadTalent(){
		this.initTalent(Gmgr.Instance.everybodyTalent[this.ePosition]);
    	this.initTalent(Gmgr.Instance.personalTalent[this.ePosition][this.roleId]);
	}
	public loadSkill(){
		this.loadLocalSkill();
	}
	public getDbInstance(){
		return TableClientMonsterLocal.Item(this.roleId);
	}
	public getLocalMobName(){
		let instance = this.getDbInstance();
		return instance.monster_name;
	}
	public setLocalBoss( isLocalBoss ){
		this.bLocalBoss = isLocalBoss;
	}
}
}