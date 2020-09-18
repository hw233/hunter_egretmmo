var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var PlayerSkillSystem = (function () {
        function PlayerSkillSystem() {
        }
        PlayerSkillSystem.Table = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.TableGeneralSkill.Item(id);
        };
        PlayerSkillSystem.EffectInfo = function (effectId) {
            if (zj.ckid(effectId))
                return null;
            return zj.TableSkillEffects.Item(effectId);
        };
        PlayerSkillSystem.UnitInfo = function (unitId) {
            if (zj.ckid(unitId))
                return null;
            return zj.TableSkillUnit.Item(unitId);
        };
        PlayerSkillSystem.ActionInfo = function (actionId) {
            if (zj.ckid(actionId))
                return null;
            return zj.TableSkillAction.Item(actionId);
        };
        PlayerSkillSystem.ActionDisplacement = function (dispId) {
            if (zj.ckid(dispId))
                return null;
            return zj.TableClientActionDisplacement.Item(dispId);
        };
        PlayerSkillSystem.DisplacementInfo = function (dispId) {
            if (zj.ckid(dispId))
                return null;
            return zj.TableClientSkillDisplacement.Item(dispId);
        };
        PlayerSkillSystem.HunterTrans = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.TableGeneralTransfer.Item(id);
        };
        PlayerSkillSystem.getTranMapId = function (generalInfo) {
            if (generalInfo.transfer_level == 0)
                return null;
            var instance = PlayerSkillSystem.HunterTrans(generalInfo.general_id % zj.CommonConfig.general_id_to_index_multiple);
            if (instance != null) {
                return instance.transfer_role;
            }
            return null;
        };
        PlayerSkillSystem.prototype.init = function () {
        };
        PlayerSkillSystem.prototype.uninit = function () {
        };
        return PlayerSkillSystem;
    }());
    zj.PlayerSkillSystem = PlayerSkillSystem;
    __reflect(PlayerSkillSystem.prototype, "zj.PlayerSkillSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerSkillSystem.js.map