var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // created by hhh in 2018/11/21
    var PlayerTalentSystem = (function () {
        function PlayerTalentSystem() {
        }
        PlayerTalentSystem.Des = function (talentId, level) {
            var talent = zj.TableGeneralTalent.Item(talentId);
            var str_effect = PlayerTalentSystem.Str_Effect(talent.talent_effect, talent.talent_describe, level);
            return str_effect;
        };
        PlayerTalentSystem.Des_Card = function (talentId, level, rangAdd, _type) {
            var talent = zj.TableGeneralTalent.Item(talentId);
            var str_effect = PlayerTalentSystem.Str_Effect_Card(talent.talent_effect, talent.talent_describe, level, rangAdd, _type);
            return str_effect;
        };
        PlayerTalentSystem.DesNext = function (talentId, level) {
            var talent = zj.TableGeneralTalent.Item(talentId);
            var str = zj.TextsConfig.TextsConfig_Adviser.talent_describe[talentId - 5020];
            var str_effect = PlayerTalentSystem.Str_Effect(talent.talent_effect, str, level);
            return str_effect;
        };
        PlayerTalentSystem.Str_Effect = function (ids, format, level) {
            var str = "";
            var value = [];
            for (var k in ids) {
                var id = ids[k];
                if (zj.TableGeneralTalentEffect.Item(id).effect_value[0] == 0 && zj.TableGeneralTalentEffect.Item(id).effect_value[1] == 0) {
                    var buffId = zj.TableGeneralTalentEffect.Item(id).effect_buffId;
                    var skillBuffInfo = zj.TableSkillBuff.Item(buffId);
                    if (skillBuffInfo == null) {
                        break;
                    }
                    if (skillBuffInfo.fis_param[0] != -1 && skillBuffInfo.fis_param[1] != 0) {
                        value[k] = skillBuffInfo.fis_param[0] + skillBuffInfo.fis_param[1] * level;
                    }
                    else if (skillBuffInfo.sec_param[0] != -1 && skillBuffInfo.sec_param[1] != 0) {
                        value[k] = skillBuffInfo.sec_param[0] + skillBuffInfo.sec_param[1] * level;
                    }
                    else if (skillBuffInfo.continue_time[1] != 0) {
                        value[k] = skillBuffInfo.continue_time[0] + skillBuffInfo.continue_time[1] * level;
                        value[k] = Math.floor(value[k] / 1000);
                    }
                    else {
                        value[k] = skillBuffInfo.continue_time[0];
                        value[k] = value[k] / 1000;
                    }
                }
                else {
                    value[k] = zj.TableGeneralTalentEffect.Item(id).effect_value[0] + zj.TableGeneralTalentEffect.Item(id).effect_value[1] * level;
                }
            }
            if (value.length == 1) {
                str = zj.HelpUtil.textConfigFormat(format, Math.floor(value[0] * 10) / 10);
            }
            else if (value.length == 2) {
                str = zj.HelpUtil.textConfigFormat(format, value[0], value[1]);
            }
            else if (value.length == 3) {
                str = zj.HelpUtil.textConfigFormat(format, value[0], value[1], value[2]);
            }
            else {
                str = format;
            }
            return str;
        };
        ////////////////////////////////////////////////////////////////////////////////////////
        PlayerTalentSystem.Des_Card_Value = function (talentId, level, rangAdd, _type) {
            var talent = zj.TableGeneralTalent.Item(talentId);
            var _a = PlayerTalentSystem.Str_Effect_Card(talent.talent_effect, talent.talent_describe, level, rangAdd, _type), _ = _a[0], value = _a[1];
            return value;
        };
        PlayerTalentSystem.Str_Effect_Card = function (ids, format, level, rangAdd, _type) {
            var str = "";
            var value = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(ids); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                if (zj.TableGeneralTalentEffect.Item(k).effect_value[0] == 0 && zj.TableGeneralTalentEffect.Item(k).effect_value[1] == 0) {
                    var _id = zj.TableGeneralTalentEffect.Item(k).effect_buffId;
                    var _info = zj.TableSkillBuff.Item(_id);
                    if (_info == null)
                        break;
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
                    value[v] = zj.TableGeneralTalentEffect.Item(k).effect_value[0] + zj.TableGeneralTalentEffect.Item(k).effect_value[1] * level;
                }
            }
            var valueStr;
            if (value.length == 1) {
                if (rangAdd != 0 && rangAdd != null) {
                    if (_type == 1) {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_pur_per, value[0], rangAdd);
                    }
                    else {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_attr_org_per, value[0], rangAdd);
                    }
                    str = zj.Helper.StringFormat(format, valueStr);
                }
                else {
                    if (rangAdd == 0) {
                        valueStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Potato.card_no_color_per, value[0]);
                        str = zj.Helper.StringFormat(format, valueStr);
                    }
                    else {
                        str = zj.Helper.StringFormat(format, value[0]);
                    }
                }
            }
            else if (value.length == 2) {
                str = zj.Helper.StringFormat(format, value[0], value[1]);
            }
            else if (value.length == 3) {
                str = zj.Helper.StringFormat(format, value[0], value[1], value[2]);
            }
            else {
                str = format;
            }
            return [str, value[0]];
        };
        PlayerTalentSystem.prototype.init = function () {
        };
        PlayerTalentSystem.prototype.uninit = function () {
        };
        return PlayerTalentSystem;
    }());
    zj.PlayerTalentSystem = PlayerTalentSystem;
    __reflect(PlayerTalentSystem.prototype, "zj.PlayerTalentSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerTalentSystem.js.map