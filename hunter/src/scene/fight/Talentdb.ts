namespace zj {
	export class Talentdb {
		public constructor() {
		}
		public static GetPokedexSkills(tbl) {
			let result = {};
			// if (tbl == null) { return result; }
			// for (let i = 0; i < tbl.length; i++) {
			// 	let ins = PlayerHunterSystem.Table(tbl[i]);
			// 	if (ins != null && ins.is_open == 1) {
			// 		if (result[ins.type] == null) {
			// 			result[ins.type] = [];
			// 		}
			// 		let ret = { skillId: ins.pokedex_attri, skillLevel: 1 };
			// 		result[ins.type].push(ret);
			// 	}
			// }
			return result;
		}
		public static createPersonTalent(roleInfo) {
			let _everyTbl = [];
			let _selfTbl = [];
			let _press_skill_level = 1;
			if (roleInfo.skills[1] != null) {
				_press_skill_level = roleInfo.skills[1].level;
			}
			//被动
			for (let i = 0; i < roleInfo.passives.length; i++) {
				let _talentId = roleInfo.passives[i].talentId;
				if (_talentId <= 0) {
					continue;
				}
				let _con = { id: _talentId, level: roleInfo.passives[i].level, bHide: false, source: TableEnum.Enum.TalentSource.Talent };
				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//隐藏天赋
			let _instance = PlayerHunterSystem.Table(roleInfo.general_id);
			let _hideTalents = _instance.hide_talent_ids;
			for (let i = 0; i < _hideTalents.length; i++) {
				let _talentId = _hideTalents[i];
				if (_talentId <= 0) {
					continue;
				}
				let _con = {};
				_con["id"] = _talentId;
				_con["level"] = roleInfo.skills[1].level;
				_con["bHide"] = true;
				_con["source"] = TableEnum.Enum.TalentSource.HideTalent;

				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//觉醒技天赋
			let _level = roleInfo.awakePassive.level;
			if (_level > 0) {
				let _talentId = roleInfo.awakePassive.talentId;
				let _con = {};
				_con["id"] = _talentId;
				_con["level"] = _level
				_con["bHide"] = false;
				_con["source"] = TableEnum.Enum.TalentSource.AwakeSkill;
				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//宝物天赋
			let [, , , _talentSet] = Game.PlayerHunterSystem.GetAttriByPotatos(roleInfo.potatoInfo);
			for (let i = 0; i < _talentSet.length; i++) {
				let _talentId = _talentSet[i].type;
				let _con = {};
				_con["id"] = _talentId
				_con["level"] = 1
				_con["bHide"] = true
				_con["source"] = TableEnum.Enum.TalentSource.PotatoSkill;
				_con["growthValue"] = _talentSet[i].growthValue;
				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//突破技
			let _breakRet = Game.PlayerHunterSystem.GetBreakInfo(roleInfo);
			for (let k in _breakRet) {
				let v = _breakRet[k];
				let _talentId = k;
				let _con = {};
				_con["id"] = _talentId;
				let _level = v;
				if (_level <= 0) {
					_level = 1;
				}
				_con["level"] = _level;
				_con["bHide"] = true;
				_con["source"] = TableEnum.Enum.TalentSource.BreakSkill;
				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//念力天赋
			let _ret = PlayerHunterSystem.getGeneralPsychicCurGroup(null, roleInfo);
			let talentSet = [];
			for (let i = 0; i < Game.PlayerMissionSystem.tableLength(_ret); i++) {
				if (_ret[i] != null && _ret[i] != 0) {
					let _ins = TableGeneralPsychic.Item(_ret[i]);
					if (_ins != null) {
						talentSet.push(_ins.group_talent);
					}
				}
			}
			for (let i = 0; i < talentSet.length; i++) {
				let _talentId = talentSet[i];
				let _con = {};
				_con["id"] = _talentId
				_con["level"] = 1
				_con["bHide"] = true
				_con["source"] = TableEnum.Enum.TalentSource.Psychic;

				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			//装备
			let equipId = PlayerHunterSystem.Table(roleInfo.general_id).equip_info[2];
			let equipSkillIds: Array<number>;
			let step = 0;
			for (let k in roleInfo.equipInfo) {
				let v = roleInfo.equipInfo[k];
				if (equipId != 0 && equipId == v.equipId) {
					step = TableGeneralEquip.Item(equipId).skillLevel[v.step];
					equipSkillIds = TableGeneralEquip.Item(equipId).skillId;
				}
			}

			let skill: Array<number> = equipSkillIds;
			if (equipSkillIds != null) {
				for (let i = 0; i < equipSkillIds.length; i++) {
					let _talentId = equipSkillIds[i];
					let _con = {};
					_con["id"] = _talentId
					_con["level"] = step
					_con["bHide"] = true
					_con["source"] = TableEnum.Enum.TalentSource.Equip;
					if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
						if (Talentdb.isEveryBodyTalent(_talentId)) {
							_everyTbl.push(_con);
						} else {
							_selfTbl.push(_con);
						}
					}
				}
			}
			return [_everyTbl, _selfTbl];
		}
		public static addTbl(des, add) {
			for (let i = 0; i < add.length; i++) {
				des.push(add[i]);
			}
		}
		public static isDefaultOpen(preseSkillLevel, talentId) {
			let talent = TableGeneralTalent.Item(talentId);
			if (talent != null) {
				if (preseSkillLevel >= talent.open_level) {
					return true;
				}
			}
			return false;
		}
		public static isEveryBodyTalent(id) {
			let _ret = false;
			let _info = TableGeneralTalent.Item(id);
			if (_info != null && _info.trigger_type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY) {
				_ret = true;
			}
			return _ret;
		}
		public static createMobTalents(monsterId) {
			let _instance = Game.PlayerMobSystem.Instance(monsterId);
			let _tableTalentIds = _instance.talent_ids;
			let _tableTalentLevels = _instance.talent_levels;
			if (_tableTalentIds.length != _tableTalentLevels.length) {

			}
			let _everyTbl = [];
			let _selfTbl = [];
			let _press_skill_level = 1;
			if (_instance.skill_levels[1] != null) {
				_press_skill_level = _instance.skill_levels[1];
			}
			for (let i = 0; i < _tableTalentIds.length; i++) {
				let _talentId = _tableTalentIds[i];
				if (_talentId <= 0) {
					continue;
				}
				let _con = {};
				_con["id"] = _talentId;
				_con["level"] = _tableTalentLevels[i]
				_con["bHide"] = false
				_con["source"] = TableEnum.Enum.TalentSource.Talent;
				if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
					if (Talentdb.isEveryBodyTalent(_talentId)) {
						_everyTbl.push(_con);
					} else {
						_selfTbl.push(_con);
					}
				}
			}
			return [_everyTbl, _selfTbl];
		}
		public static createTeachPersonTalent(tbl) {
			let _everyTbl = [];
			let _selfTbl = [];
			// 被动
			for (let i = 0; i < tbl.length; i++) {
				let _talentId = tbl[i];
				if (_talentId <= 0) {
					continue;
				}
				let _con = {};
				_con["id"] = _talentId
				_con["level"] = 1
				_con["bHide"] = false
				_con["source"] = TableEnum.Enum.TalentSource.Talent;

				if (Talentdb.isEveryBodyTalent(_talentId)) {
					_everyTbl.push(_con);
				} else {
					_selfTbl.push(_con);
				}
			}
			return [_everyTbl, _selfTbl];
		}
	}
}