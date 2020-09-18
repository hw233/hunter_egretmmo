namespace zj {
export class Adviserlvdb {
	private _adviser = StringConfig_Table.adviserBase
	private _adviser_level = StringConfig_Table.adviserLevel
	public constructor() {
	}
	public static Instance(id){
		if(id < 0){
			return null;
		}
		return TableAdviserLevel.Item(id);
	}
	public static InstanceNext(id){
		if(id < 0){
			return null;
		}
		if(Adviserlvdb.Instance(id + 1) == null){
			return Adviserlvdb.Instance(id)
		}
		else{
			Adviserlvdb.Instance(id + 1);
		}
	}
	public static GetSingleAttriTbl(id){
		let result = Helper.CreateGeneralAttrTbl0();
		let tbl = TableAdviserLevel.Item(id);
		for(let i = TableEnum.EnumGelAttrib.ATTR_HP; i<TableEnum.EnumGelAttrib.ATTR_MAX;i++){
			let value = tbl[TableEnum.EnumGelAttribName[i-1]];
			if(value != null && value != ""){
				result[i] = value;
			}
		}
		return result;
	}
	public static GetSumValueTbl(id, level){
		let result = Helper.CreateGeneralAttrTbl0();
		if(level == null || level <= 0){return result};
		let start = id * 10000 + 1;
		let real = id * 10000 + level;
		for(let j = start; j < real; j++){
			let tblAttrib = Adviserlvdb.GetSingleAttriTbl(j);
			for(let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++){
				result[i] = result[i] + tblAttrib[i];
			}
		}
		return result;
	}
	public static GetAllAdviserValueTbl(advisers, baseInfo){
		let result = Helper.CreateGeneralAttrTbl0();
		if(Helper.getObjLen(baseInfo) == 0){
			return result;
		}
		let lfun = TableFunctionOpen.Item(13);//lvdb.FUNC.ADVISER
		if(baseInfo.level < lfun.condition){
			return result;
		}
		for(let k in advisers){
			let v = advisers[k];
			let tblAttrib = Adviserlvdb.GetSumValueTbl(v.adviserId, v.level);
			for(let i = TableEnum.EnumGelAttrib.ATTR_HP;i<TableEnum.EnumGelAttrib.ATTR_MAX;i++){
				result[i] = result[i] + tblAttrib[i];
			}
		}
		return result;
	}
	public static GetAdviserSkills(advisers, baseInfo){
		let result = [];
		let lfun = TableFunctionOpen.Item(13);
		if(Helper.getObjLen(baseInfo) == 0 || baseInfo.level < lfun.condition){
			return result;
		}
		for(let k in advisers){
			let v = advisers[k];
			let index = v.adviserId * 10000 + v.level;
			let levelIns = Adviserlvdb.Instance(index);
			let adviserIns = TableBaseAdviser.Item(v.adviserId);

			if(adviserIns == null || levelIns == null){
				continue;
			}
			for(let k1 in adviserIns.base_skill){
				let v1 = adviserIns.base_skill[k1];
				let ret = {skillId:v1,skillLevel:levelIns.level};
				result.push(ret);
			}
			for(let k2 in adviserIns.skill_id){
				let v2 = adviserIns.skill_id[k2];
				let ret = {skillId:v2,skillLevel:levelIns.level};
				result.push(ret);
			}
		}
		return result;
	}
}
}