var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Otherdb = (function () {
        function Otherdb() {
        }
        Otherdb.GetTitleFightSkill = function (titleId) {
            var result = [];
            if (titleId == 0 || titleId == -1) {
                return;
            }
            var tbl = zj.TableItemTitle.Table();
            if (tbl[titleId] != null) {
                var ret = { skillId: tbl[titleId].skill_normal, skillLevel: 1 };
                result.push(ret);
            }
            return result;
        };
        Otherdb.getErrorString = function (result) {
            var tableError = zj.TableClientError.Table();
            if (result == null) {
                return zj.Helper.StringFormat("error");
            }
            else if (tableError[result] == null) {
                return zj.Helper.StringFormat("%s[%d]", zj.TextsConfig.TextsConfig_Common.unknownError, result);
            }
            else if (tableError[result].des_custom != "") {
                return zj.Helper.StringFormat("%s[%d]", tableError[result].des_custom, result);
            }
            else {
                return zj.Helper.StringFormat("%s[%d]", tableError[result].des_default, result);
            }
        };
        Otherdb.MissionGeneral = function (id) {
            if (id == undefined || id == null)
                return null;
            return zj.TableMissionGeneral.Item(id);
        };
        Otherdb.FundReward = function () {
            return false;
        };
        Otherdb.GetActivityInShow = function (activityType, index) {
            var allShowActivity = zj.PlayerActivitySystem.GetActivityUI();
            var find = zj.Table.FindF(allShowActivity, function (_k, _v) {
                return _v.type == activityType && _v.index == index;
            });
            return find;
        };
        //和平仙境在采集阶段未采集
        Otherdb.inPeaceWonderlandNotPick = function (id) {
            var quantum = null;
            var hour = zj.Set.TimeFormatBeijing().getHours();
            for (var k = 0; k < Otherdb.reward_power_time.length; k++) {
                var v = Otherdb.reward_power_time[k];
                if (hour >= Math.floor(v / 3600)) {
                    quantum = k;
                }
            }
            if ((quantum == null) && hour < (Otherdb.reward_power_time[0] / 3600)) {
                quantum = Otherdb.reward_power_time.length;
            }
            if (quantum == null) {
                return false;
            }
            var find = zj.Table.FindFCall(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.collectionFruit, function (k, v) {
                return v.key - 1 == quantum && v.value == id;
            }, this);
            return !find;
        };
        Otherdb.inPeaceWonderlandLastTime = function () {
            var time = zj.Set.TimeFormatBeijing();
            var quantum = null;
            var hour = time.getHours();
            for (var k = 0; k < Otherdb.reward_power_time.length; k++) {
                var v = Otherdb.reward_power_time[k];
                if (hour >= Math.floor(v / 3600)) {
                    quantum = k;
                }
            }
            if ((quantum == null) && hour < Math.floor(Otherdb.reward_power_time[0] / 3600)) {
                quantum = Otherdb.reward_power_time.length;
            }
            if (quantum == null) {
                return "";
            }
            var nextQuanTum = (quantum % Otherdb.reward_power_time.length);
            var nextTimeHour = Otherdb.reward_power_time[nextQuanTum];
            var minusTime = (nextTimeHour + 24 * 3600 - (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds())) % (24 * 3600);
            var _str = zj.Helper.FormatMsTime3(minusTime);
            var _tmp = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
            return _tmp;
        };
        Otherdb.reward_power_time = [14400, 43200, 72000];
        return Otherdb;
    }());
    zj.Otherdb = Otherdb;
    __reflect(Otherdb.prototype, "zj.Otherdb");
})(zj || (zj = {}));
//# sourceMappingURL=Otherdb.js.map