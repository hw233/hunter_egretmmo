var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Adviserdb = (function () {
        function Adviserdb() {
        }
        Adviserdb.GetPetFightSkill = function (petInfo) {
            var result = [];
            if (petInfo == null) {
                return;
            }
            for (var k in petInfo) {
                var v = petInfo[k];
                var petTbl = zj.TableBasePet.Item(v.pet_id);
                if (petTbl != null) {
                    var curStep = v.step + 1;
                    for (var i = 0; i < curStep; i++) {
                        if (petTbl.skill_normal[i] != null) {
                            var ret = { skillId: petTbl.skill_normal[i], skillLevel: 1 };
                            result.push(ret);
                        }
                    }
                }
            }
            return result;
        };
        Adviserdb.GetIndexById = function (id, advisers) {
            for (var k in advisers) {
                var v = advisers[k];
                if (v.adviserId == id) {
                    return k;
                }
            }
            return null;
        };
        //场景被动相关
        //宠物减少采集比例
        Adviserdb.PassiveGrassTime = function (petInfo) {
            var reduceSecond = 0;
            if (petInfo == null) {
                return reduceSecond;
            }
            for (var k in petInfo) {
                var v = petInfo[k];
                var petTbl = zj.TableBasePet.Item(v.pet_id);
                if (petTbl) {
                    //宠物进化被动减少采集时间
                    for (var i = 0; i < v.step + 1; i++) {
                        var skillId = petTbl.skill_island[i];
                        if (skillId != null && skillId != 0) {
                            var skillTbl = zj.TablePetSkill.Item(skillId);
                            if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_CAIJI) {
                                reduceSecond = reduceSecond + parseInt(skillTbl.value);
                            }
                        }
                    }
                }
            }
            return reduceSecond;
        };
        //宠物形态
        Adviserdb.GetPetEvolution = function (petId, petInfo) {
            petId = petId || petInfo.pet_id;
            petInfo = petInfo || zj.Game.PlayerAdviserSystem.petMap[petId];
            var step = 0;
            if (petInfo.step < zj.PlayerAdviserSystem.PetBase(petId).unlock_step[1]) {
                step = 0;
            }
            else if (petInfo.step >= zj.PlayerAdviserSystem.PetBase(petId).unlock_step[1] && petInfo.step < zj.PlayerAdviserSystem.PetBase(petId).unlock_step[2]) {
                step = 1;
            }
            else {
                step = 2;
            }
            var spine_id = zj.PlayerAdviserSystem.PetBase(petId).spine_id[step];
            return spine_id;
        };
        return Adviserdb;
    }());
    zj.Adviserdb = Adviserdb;
    __reflect(Adviserdb.prototype, "zj.Adviserdb");
})(zj || (zj = {}));
//# sourceMappingURL=Adviserdb.js.map