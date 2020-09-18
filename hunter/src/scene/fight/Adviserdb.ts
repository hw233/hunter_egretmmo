namespace zj {
export class Adviserdb {
	public constructor() {
	}
	public static GetPetFightSkill( petInfo ){
		let result = [];
		if(petInfo == null){return;}
		for(let k in petInfo){
			let v = petInfo[k];
			let petTbl = TableBasePet.Item(v.pet_id);
			if(petTbl!=null){
				let curStep = v.step+1;
				for(let i = 0; i<curStep; i++){
					if(petTbl.skill_normal[i] != null){
						let ret = {skillId:petTbl.skill_normal[i],skillLevel:1};
						result.push(ret);
					}
				}
			}
		}
		return result;
	}
	public static GetIndexById( id, advisers ){
		for(let k in advisers){
			let v = advisers[k];
			if(v.adviserId == id){
				return k;
			}
		}
		return null;
	}
	//场景被动相关
	//宠物减少采集比例
	public static PassiveGrassTime( petInfo ){
		let reduceSecond = 0;
		if(petInfo == null){
			return reduceSecond;
		}
		for(let k in petInfo){
			let v = petInfo[k];
			let petTbl = TableBasePet.Item(v.pet_id);
			if(petTbl){
				//宠物进化被动减少采集时间
				for(let i = 0;i<v.step+1;i++){
					let skillId = petTbl.skill_island[i];
					if(skillId != null && skillId != 0){
						let skillTbl = TablePetSkill.Item(skillId);
						if(skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_CAIJI){
							reduceSecond = reduceSecond + parseInt(skillTbl.value);
						}
					}
				}
			}
		}
		return reduceSecond;
	}
	//宠物形态
	public static GetPetEvolution(petId, petInfo){
		petId = petId || petInfo.pet_id
    	petInfo = petInfo || Game.PlayerAdviserSystem.petMap[petId];

		let step = 0;
		if(petInfo.step< PlayerAdviserSystem.PetBase(petId).unlock_step[1]){
			step = 0;
		}else if(petInfo.step >= PlayerAdviserSystem.PetBase(petId).unlock_step[1] && petInfo.step< PlayerAdviserSystem.PetBase(petId).unlock_step[2]){
			step = 1;
		}else{
			step = 2;
		}
		let spine_id = PlayerAdviserSystem.PetBase(petId).spine_id[step];
		return spine_id;
	}
}
}