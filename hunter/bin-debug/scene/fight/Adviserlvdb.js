var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Adviserlvdb = (function () {
        function Adviserlvdb() {
            this._adviser = zj.StringConfig_Table.adviserBase;
            this._adviser_level = zj.StringConfig_Table.adviserLevel;
        }
        Adviserlvdb.Instance = function (id) {
            if (id < 0) {
                return null;
            }
            return zj.TableAdviserLevel.Item(id);
        };
        Adviserlvdb.InstanceNext = function (id) {
            if (id < 0) {
                return null;
            }
            if (Adviserlvdb.Instance(id + 1) == null) {
                return Adviserlvdb.Instance(id);
            }
            else {
                Adviserlvdb.Instance(id + 1);
            }
        };
        Adviserlvdb.GetSingleAttriTbl = function (id) {
            var result = zj.Helper.CreateGeneralAttrTbl0();
            var tbl = zj.TableAdviserLevel.Item(id);
            for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                var value = tbl[zj.TableEnum.EnumGelAttribName[i - 1]];
                if (value != null && value != "") {
                    result[i] = value;
                }
            }
            return result;
        };
        Adviserlvdb.GetSumValueTbl = function (id, level) {
            var result = zj.Helper.CreateGeneralAttrTbl0();
            if (level == null || level <= 0) {
                return result;
            }
            ;
            var start = id * 10000 + 1;
            var real = id * 10000 + level;
            for (var j = start; j < real; j++) {
                var tblAttrib = Adviserlvdb.GetSingleAttriTbl(j);
                for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                    result[i] = result[i] + tblAttrib[i];
                }
            }
            return result;
        };
        Adviserlvdb.GetAllAdviserValueTbl = function (advisers, baseInfo) {
            var result = zj.Helper.CreateGeneralAttrTbl0();
            if (zj.Helper.getObjLen(baseInfo) == 0) {
                return result;
            }
            var lfun = zj.TableFunctionOpen.Item(13); //lvdb.FUNC.ADVISER
            if (baseInfo.level < lfun.condition) {
                return result;
            }
            for (var k in advisers) {
                var v = advisers[k];
                var tblAttrib = Adviserlvdb.GetSumValueTbl(v.adviserId, v.level);
                for (var i = zj.TableEnum.EnumGelAttrib.ATTR_HP; i < zj.TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
                    result[i] = result[i] + tblAttrib[i];
                }
            }
            return result;
        };
        Adviserlvdb.GetAdviserSkills = function (advisers, baseInfo) {
            var result = [];
            var lfun = zj.TableFunctionOpen.Item(13);
            if (zj.Helper.getObjLen(baseInfo) == 0 || baseInfo.level < lfun.condition) {
                return result;
            }
            for (var k in advisers) {
                var v = advisers[k];
                var index = v.adviserId * 10000 + v.level;
                var levelIns = Adviserlvdb.Instance(index);
                var adviserIns = zj.TableBaseAdviser.Item(v.adviserId);
                if (adviserIns == null || levelIns == null) {
                    continue;
                }
                for (var k1 in adviserIns.base_skill) {
                    var v1 = adviserIns.base_skill[k1];
                    var ret = { skillId: v1, skillLevel: levelIns.level };
                    result.push(ret);
                }
                for (var k2 in adviserIns.skill_id) {
                    var v2 = adviserIns.skill_id[k2];
                    var ret = { skillId: v2, skillLevel: levelIns.level };
                    result.push(ret);
                }
            }
            return result;
        };
        return Adviserlvdb;
    }());
    zj.Adviserlvdb = Adviserlvdb;
    __reflect(Adviserlvdb.prototype, "zj.Adviserlvdb");
})(zj || (zj = {}));
//# sourceMappingURL=Adviserlvdb.js.map