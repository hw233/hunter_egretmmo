namespace zj {
export class PlayerSkillSystem {
    public static Table(id): TableGeneralSkill {
        if(ckid(id)) return null;
        return TableGeneralSkill.Item(id);
    }

    public static EffectInfo(effectId): TableSkillEffects {
        if(ckid(effectId)) return null;
        return TableSkillEffects.Item(effectId);
    }

    public static UnitInfo(unitId) {
        if (ckid(unitId)) return null; 
        return TableSkillUnit.Item(unitId);
    }

    public static ActionInfo(actionId) {
        if (ckid(actionId)) return null; 
        return TableSkillAction.Item(actionId);
    }

    public static ActionDisplacement(dispId) {
        if (ckid(dispId)) return null; 
        return TableClientActionDisplacement.Item(dispId);
    }

    public static DisplacementInfo(dispId) {
        if (ckid(dispId)) return null; 
        return TableClientSkillDisplacement.Item(dispId);
    }

    public static HunterTrans(id: number) {
        if (ckid(id)) return null;
        return TableGeneralTransfer.Item(id);
    }

    public static getTranMapId(generalInfo: message.GeneralInfo) {
        if (generalInfo.transfer_level == 0) return null;
        let instance = PlayerSkillSystem.HunterTrans(generalInfo.general_id % CommonConfig.general_id_to_index_multiple);
        if (instance != null) {
            return instance.transfer_role;
        }
        return null;
    }

  
    public init() {
    }

    public uninit() {
    }
}
}