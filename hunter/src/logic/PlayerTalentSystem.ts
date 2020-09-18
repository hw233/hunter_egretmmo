namespace zj {
// created by hhh in 2018/11/21

export class PlayerTalentSystem {
     static Des(talentId, level) {
        let talent = TableGeneralTalent.Item(talentId);
        let str_effect = PlayerTalentSystem.Str_Effect(talent.talent_effect, talent.talent_describe, level);

        return str_effect
    }

    static Des_Card(talentId: number, level: number, rangAdd: number, _type: number) {
        let talent = TableGeneralTalent.Item(talentId);
        let str_effect = PlayerTalentSystem.Str_Effect_Card(talent.talent_effect, talent.talent_describe, level, rangAdd, _type);

        return str_effect;
    }

    public static DesNext( talentId, level ){
        let talent = TableGeneralTalent.Item(talentId);
        let str = TextsConfig.TextsConfig_Adviser.talent_describe[talentId-5020];
        let str_effect = PlayerTalentSystem.Str_Effect(talent.talent_effect, str, level);

        return str_effect;
    }

    static Str_Effect(ids, format, level) {
        let str = "";
        let value = [];
        for (let k in ids) {
            let id = ids[k];
            if (TableGeneralTalentEffect.Item(id).effect_value[0] == 0 && TableGeneralTalentEffect.Item(id).effect_value[1] == 0) {
                let buffId = TableGeneralTalentEffect.Item(id).effect_buffId;
                let skillBuffInfo = TableSkillBuff.Item(buffId);
                if (skillBuffInfo == null) {
                    break;
                }
                if (skillBuffInfo.fis_param[0] != -1 && skillBuffInfo.fis_param[1] != 0) {
                    value[k] = skillBuffInfo.fis_param[0] + skillBuffInfo.fis_param[1] * level;
                } else if (skillBuffInfo.sec_param[0] != -1 && skillBuffInfo.sec_param[1] != 0) {
                    value[k] = skillBuffInfo.sec_param[0] + skillBuffInfo.sec_param[1] * level;
                } else if (skillBuffInfo.continue_time[1] != 0) {
                    value[k] = skillBuffInfo.continue_time[0] + skillBuffInfo.continue_time[1] * level;
                    value[k] = Math.floor(value[k] / 1000);
                } else {
                    value[k] = skillBuffInfo.continue_time[0];
                    value[k] = value[k] / 1000;
                }
            } else {
                value[k] = TableGeneralTalentEffect.Item(id).effect_value[0] + TableGeneralTalentEffect.Item(id).effect_value[1] * level;
            }
        }
        if (value.length == 1) {
            str = HelpUtil.textConfigFormat(format, Math.floor(value[0] *10) / 10);
        } else if (value.length == 2) {
            str = HelpUtil.textConfigFormat(format, value[0], value[1]);
        } else if (value.length == 3) {
            str = HelpUtil.textConfigFormat(format, value[0], value[1], value[2]);
        } else {
            str = format;
        }

        return str;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    static Des_Card_Value(talentId: number, level: number, rangAdd: number, _type: number) {
        let talent = TableGeneralTalent.Item(talentId);
        let [_, value] = PlayerTalentSystem.Str_Effect_Card(talent.talent_effect, talent.talent_describe, level, rangAdd, _type);
        return value;
    }

    static Str_Effect_Card(ids: Array<number>, format: string, level: number, rangAdd: number, _type: number): [string, number] {
        let str = "";
        let value = [];
        for (let [v, k] of HelpUtil.GetKV(ids)) {
            if (TableGeneralTalentEffect.Item(k).effect_value[0] == 0 && TableGeneralTalentEffect.Item(k).effect_value[1] == 0) {
                let _id = TableGeneralTalentEffect.Item(k).effect_buffId;
                let _info = TableSkillBuff.Item(_id);
                if (_info == null) break;
                if (_info.fis_param[0] != -1 && _info.fis_param[1] != 0) {
                    value[v] = _info.fis_param[1] + _info.fis_param[2] * level;
                }
                else if (_info.sec_param[0] != -1 && _info.sec_param[1] != 0) {
                    value[v] = _info.sec_param[0] + _info.sec_param[1] * level;
                }
                else if (_info.continue_time[1] != 0) {
                    value[v] = _info.continue_time[0] + _info.continue_time[1] * level;
                    value[v] = Math.floor(value[v] / 1000);
                }
                else {
                    value[v] = _info.continue_time[0];
                    value[v] = value[v] / 1000;
                }
            }
            else {
                value[v] = TableGeneralTalentEffect.Item(k).effect_value[0] + TableGeneralTalentEffect.Item(k).effect_value[1] * level;
            }
        }

        let valueStr: string;
        if (value.length == 1) {
            if (rangAdd != 0 && rangAdd != null) {
                if (_type == 1) {
                    valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_pur_per, value[0], rangAdd);
                }
                else {
                    valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_attr_org_per, value[0], rangAdd);
                }
                str = Helper.StringFormat(format, valueStr);
            }
            else {
                if (rangAdd == 0) {
                    valueStr = Helper.StringFormat(TextsConfig.TextsConfig_Potato.card_no_color_per, value[0]);
                    str = Helper.StringFormat(format, valueStr)
                }
                else {
                    str = Helper.StringFormat(format, value[0])
                }
            }
        }
        else if (value.length == 2) {
            str = Helper.StringFormat(format, value[0], value[1]);
        }
        else if (value.length == 3) {
            str = Helper.StringFormat(format, value[0], value[1], value[2]);
        }
        else {
            str = format;
        }
        return [str, value[0]];
    }


    public init() {
    }

    public uninit() {
    }
}
}