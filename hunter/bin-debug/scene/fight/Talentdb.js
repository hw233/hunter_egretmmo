var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Talentdb = (function () {
        function Talentdb() {
        }
        Talentdb.GetPokedexSkills = function (tbl) {
            var result = {};
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
        };
        Talentdb.createPersonTalent = function (roleInfo) {
            var _everyTbl = [];
            var _selfTbl = [];
            var _press_skill_level = 1;
            if (roleInfo.skills[1] != null) {
                _press_skill_level = roleInfo.skills[1].level;
            }
            //被动
            for (var i = 0; i < roleInfo.passives.length; i++) {
                var _talentId = roleInfo.passives[i].talentId;
                if (_talentId <= 0) {
                    continue;
                }
                var _con = { id: _talentId, level: roleInfo.passives[i].level, bHide: false, source: zj.TableEnum.Enum.TalentSource.Talent };
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //隐藏天赋
            var _instance = zj.PlayerHunterSystem.Table(roleInfo.general_id);
            var _hideTalents = _instance.hide_talent_ids;
            for (var i = 0; i < _hideTalents.length; i++) {
                var _talentId = _hideTalents[i];
                if (_talentId <= 0) {
                    continue;
                }
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = roleInfo.skills[1].level;
                _con["bHide"] = true;
                _con["source"] = zj.TableEnum.Enum.TalentSource.HideTalent;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //觉醒技天赋
            var _level = roleInfo.awakePassive.level;
            if (_level > 0) {
                var _talentId = roleInfo.awakePassive.talentId;
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = _level;
                _con["bHide"] = false;
                _con["source"] = zj.TableEnum.Enum.TalentSource.AwakeSkill;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //宝物天赋
            var _a = zj.Game.PlayerHunterSystem.GetAttriByPotatos(roleInfo.potatoInfo), _talentSet = _a[3];
            for (var i = 0; i < _talentSet.length; i++) {
                var _talentId = _talentSet[i].type;
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = 1;
                _con["bHide"] = true;
                _con["source"] = zj.TableEnum.Enum.TalentSource.PotatoSkill;
                _con["growthValue"] = _talentSet[i].growthValue;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //突破技
            var _breakRet = zj.Game.PlayerHunterSystem.GetBreakInfo(roleInfo);
            for (var k in _breakRet) {
                var v = _breakRet[k];
                var _talentId = k;
                var _con = {};
                _con["id"] = _talentId;
                var _level_1 = v;
                if (_level_1 <= 0) {
                    _level_1 = 1;
                }
                _con["level"] = _level_1;
                _con["bHide"] = true;
                _con["source"] = zj.TableEnum.Enum.TalentSource.BreakSkill;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //念力天赋
            var _ret = zj.PlayerHunterSystem.getGeneralPsychicCurGroup(null, roleInfo);
            var talentSet = [];
            for (var i = 0; i < zj.Game.PlayerMissionSystem.tableLength(_ret); i++) {
                if (_ret[i] != null && _ret[i] != 0) {
                    var _ins = zj.TableGeneralPsychic.Item(_ret[i]);
                    if (_ins != null) {
                        talentSet.push(_ins.group_talent);
                    }
                }
            }
            for (var i = 0; i < talentSet.length; i++) {
                var _talentId = talentSet[i];
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = 1;
                _con["bHide"] = true;
                _con["source"] = zj.TableEnum.Enum.TalentSource.Psychic;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            //装备
            var equipId = zj.PlayerHunterSystem.Table(roleInfo.general_id).equip_info[2];
            var equipSkillIds;
            var step = 0;
            for (var k in roleInfo.equipInfo) {
                var v = roleInfo.equipInfo[k];
                if (equipId != 0 && equipId == v.equipId) {
                    step = zj.TableGeneralEquip.Item(equipId).skillLevel[v.step];
                    equipSkillIds = zj.TableGeneralEquip.Item(equipId).skillId;
                }
            }
            var skill = equipSkillIds;
            if (equipSkillIds != null) {
                for (var i = 0; i < equipSkillIds.length; i++) {
                    var _talentId = equipSkillIds[i];
                    var _con = {};
                    _con["id"] = _talentId;
                    _con["level"] = step;
                    _con["bHide"] = true;
                    _con["source"] = zj.TableEnum.Enum.TalentSource.Equip;
                    if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                        if (Talentdb.isEveryBodyTalent(_talentId)) {
                            _everyTbl.push(_con);
                        }
                        else {
                            _selfTbl.push(_con);
                        }
                    }
                }
            }
            return [_everyTbl, _selfTbl];
        };
        Talentdb.addTbl = function (des, add) {
            for (var i = 0; i < add.length; i++) {
                des.push(add[i]);
            }
        };
        Talentdb.isDefaultOpen = function (preseSkillLevel, talentId) {
            var talent = zj.TableGeneralTalent.Item(talentId);
            if (talent != null) {
                if (preseSkillLevel >= talent.open_level) {
                    return true;
                }
            }
            return false;
        };
        Talentdb.isEveryBodyTalent = function (id) {
            var _ret = false;
            var _info = zj.TableGeneralTalent.Item(id);
            if (_info != null && _info.trigger_type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY) {
                _ret = true;
            }
            return _ret;
        };
        Talentdb.createMobTalents = function (monsterId) {
            var _instance = zj.Game.PlayerMobSystem.Instance(monsterId);
            var _tableTalentIds = _instance.talent_ids;
            var _tableTalentLevels = _instance.talent_levels;
            if (_tableTalentIds.length != _tableTalentLevels.length) {
            }
            var _everyTbl = [];
            var _selfTbl = [];
            var _press_skill_level = 1;
            if (_instance.skill_levels[1] != null) {
                _press_skill_level = _instance.skill_levels[1];
            }
            for (var i = 0; i < _tableTalentIds.length; i++) {
                var _talentId = _tableTalentIds[i];
                if (_talentId <= 0) {
                    continue;
                }
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = _tableTalentLevels[i];
                _con["bHide"] = false;
                _con["source"] = zj.TableEnum.Enum.TalentSource.Talent;
                if (Talentdb.isDefaultOpen(_press_skill_level, _talentId)) {
                    if (Talentdb.isEveryBodyTalent(_talentId)) {
                        _everyTbl.push(_con);
                    }
                    else {
                        _selfTbl.push(_con);
                    }
                }
            }
            return [_everyTbl, _selfTbl];
        };
        Talentdb.createTeachPersonTalent = function (tbl) {
            var _everyTbl = [];
            var _selfTbl = [];
            // 被动
            for (var i = 0; i < tbl.length; i++) {
                var _talentId = tbl[i];
                if (_talentId <= 0) {
                    continue;
                }
                var _con = {};
                _con["id"] = _talentId;
                _con["level"] = 1;
                _con["bHide"] = false;
                _con["source"] = zj.TableEnum.Enum.TalentSource.Talent;
                if (Talentdb.isEveryBodyTalent(_talentId)) {
                    _everyTbl.push(_con);
                }
                else {
                    _selfTbl.push(_con);
                }
            }
            return [_everyTbl, _selfTbl];
        };
        return Talentdb;
    }());
    zj.Talentdb = Talentdb;
    __reflect(Talentdb.prototype, "zj.Talentdb");
})(zj || (zj = {}));
//# sourceMappingURL=Talentdb.js.map