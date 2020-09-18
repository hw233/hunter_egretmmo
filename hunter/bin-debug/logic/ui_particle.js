var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    zj.ConstValueEnum = {
        CV_HURT_FORMULA_V1: 'CV_HURT_FORMULA_V1',
        CV_HURT_FORMULA_V2: 'CV_HURT_FORMULA_V2',
        CV_HURT_FORMULA_V3: 'CV_HURT_FORMULA_V3',
        CV_HURT_FORMULA_V4: 'CV_HURT_FORMULA_V4',
        CV_HURT_FORMULA_V5: 'CV_HURT_FORMULA_V5',
        //CV_FIGHT_PVE_RATIO : 6, // PVE
        CV_FIGHT_PVP_RATIO: 'CV_FIGHT_PVP_RATIO',
        CV_IGNORE_DEF: 'CV_IGNORE_DEF',
        CV_DODGE_HURT: 'CV_DODGE_HURT',
    };
    var constdb = (function () {
        function constdb() {
        }
        constdb.GetValue = function (e) {
            return constdb._constTbl[e];
        };
        constdb._constTbl = (_a = {},
            _a[zj.ConstValueEnum.CV_HURT_FORMULA_V1] = 1,
            _a[zj.ConstValueEnum.CV_HURT_FORMULA_V2] = 20,
            _a[zj.ConstValueEnum.CV_HURT_FORMULA_V3] = 100,
            _a[zj.ConstValueEnum.CV_HURT_FORMULA_V4] = 16500,
            _a[zj.ConstValueEnum.CV_HURT_FORMULA_V5] = 3500,
            _a[zj.ConstValueEnum.CV_FIGHT_PVP_RATIO] = 1,
            _a[zj.ConstValueEnum.CV_IGNORE_DEF] = 50,
            _a[zj.ConstValueEnum.CV_DODGE_HURT] = 0,
            _a);
        return constdb;
    }());
    zj.constdb = constdb;
    __reflect(constdb.prototype, "zj.constdb");
    zj.records = "";
    function percentInTotal(cur, total) {
        var tag = false;
        var rand = zj.TsMtirand();
        var i = rand % total;
        if (i > 0 && i < cur) {
            tag = true;
        }
        return tag;
    }
    zj.percentInTotal = percentInTotal;
    function percentIsEffect(percent, character, beatkeder, des) {
        // body
        /**/
        var atk_id = 0;
        if (character != null) {
            atk_id = character.roleId;
        }
        var beatked_id = 0;
        if (beatkeder != null) {
            beatked_id = beatkeder.roleId;
        }
        var rand = zj.TsMtirand();
        /*  */
        if (zj.Device != null && zj.Device.isBattleSeedOpen == true) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            console.log(zj.Gmgr.Instance.lcgrandcnt + "__发起者." + atk_id + "__被动者." + beatked_id + "__" + des + "__" + scene.timerTick + "__rand." + rand);
        }
        var i = (rand % 10000) / 100;
        var tag = false;
        if (i > 0 && i <= percent) {
            tag = true;
        }
        return tag;
    }
    zj.percentIsEffect = percentIsEffect;
    // 速度计算
    var MAXSPD = 10000;
    function speedTranToCd(speed) {
        // body
        if (speed <= 0) {
            speed = 1;
        }
        var cd = 1000 * MAXSPD / speed - 1000;
        return cd;
    }
    zj.speedTranToCd = speedTranToCd;
    function speedTranToEntry(speed) {
        // body
        if (speed <= 0) {
            speed = 1;
        }
        var cd = 0;
        if ((1000 * MAXSPD / speed - 1000) - 11000 < 0) {
            cd = 0;
        }
        else {
            cd = (1000 * MAXSPD / speed - 1000) - 11000;
        }
        return cd;
    }
    zj.speedTranToEntry = speedTranToEntry;
    // 60% + （攻击方的命中值+攻击方修正值) / ((攻击方命中值+攻击方命中修正值) + (被攻击方闪避值+被攻击方闪避修正值)) * 40%
    function isDodge(htv, htvExtra, eva, evaExtra, character, beatkeder) {
        // body 
        var value = 0.6 + (htv + htvExtra) / (htv + htvExtra + eva + evaExtra) * 0.4;
        if (percentIsEffect(value * 100, character, beatkeder, "是否闪避") == false) {
            return [true, value];
        }
        return [false, value];
    }
    zj.isDodge = isDodge;
    // 是否格挡
    function isParry(blr, ilr, character, beatkeder) {
        var rate = blr - ilr;
        if (rate <= 0) {
            rate = 0;
        }
        if (percentIsEffect(rate, character, beatkeder, "是否命中(忽视格挡)") == true) {
            return true;
        }
        return false;
    }
    zj.isParry = isParry;
    // 是否忽视防御
    function isIgnoreDef(igdef, character, beatkeder) {
        if (percentIsEffect(igdef, character, beatkeder, "是否忽视防御") == true) {
            return true;
        }
        return false;
    }
    zj.isIgnoreDef = isIgnoreDef;
    // 是否暴击
    function isCrit(crit, ctr, character, beatkeder) {
        var value = crit - ctr;
        if (value <= 0) {
            value = 0;
        }
        if (percentIsEffect(value, character, beatkeder, "是否暴击") == true) {
            return true;
        }
        return false;
    }
    zj.isCrit = isCrit;
    // 猎人伤害公式c
    function hunterHurtC(atk, def, skillHurtRatio, skillExtraValue, proofValue, generalId) {
        var rand;
        rand = zj.TsMtirand();
        var radio = 0.91 + (rand % ((1.00 - 0.91) * 10000)) / 10000;
        var value = 0;
        if (zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
            radio = 0.96;
        }
        if (def <= 0) {
            def = 0;
        }
        var retA = constdb.GetValue(zj.ConstValueEnum.CV_HURT_FORMULA_V1) + constdb.GetValue(zj.ConstValueEnum.CV_HURT_FORMULA_V2) / constdb.GetValue(zj.ConstValueEnum.CV_HURT_FORMULA_V3);
        var retC = constdb.GetValue(zj.ConstValueEnum.CV_HURT_FORMULA_V4);
        var retB = constdb.GetValue(zj.ConstValueEnum.CV_HURT_FORMULA_V5);
        if (def <= retC) {
            value = (atk * skillHurtRatio - (atk * skillHurtRatio * retA * def) / (def + retB) + skillExtraValue) * proofValue * radio;
        }
        else {
            value = (atk * skillHurtRatio - (atk * skillHurtRatio * retA * retC) / (retC + retB) + skillExtraValue) * proofValue * radio;
        }
        //let s = "id=="..generalId.."@@radio=="..radio.."@@atk=="..atk.."@@def=="..def.."@@skillHurtRatio=="..skillHurtRatio.."@@skillExtraValue=="..skillExtraValue.."@@proofValue=="..proofValue.."\n"  
        //records = records .. s
        //wqSetBinaryData("hunterHurt", records, #records)
        //console.log("基础伤害："+atk+"---------------------------------------------随机后伤害："+value);
        return value;
    }
    zj.hunterHurtC = hunterHurtC;
    // 猎人伤害公式s
    function hunterHurt(atk, def, skillHurtRatio, skillExtraValue, proofValue, generalId) {
        var rand = zj.TsMtirand();
        var radio = 0.91 + (rand % ((1.00 - 0.91) * 10000)) / 10000;
        var value = 0;
        if (def <= 0) {
            def = 0;
        }
        if (def <= 16500) {
            value = (atk * skillHurtRatio * 0.01 - (atk * skillHurtRatio * 0.01 * 1.2 * def) / (def + 3500) + skillExtraValue) * proofValue * radio;
        }
        else {
            value = (atk * skillHurtRatio * 0.01 - (atk * skillHurtRatio * 0.01 * 1.2 * 16500) / (16500 + 3500) + skillExtraValue) * proofValue * radio;
        }
        //let s = "id=="..generalId.."@@radio=="..radio.."@@atk=="..atk.."@@def=="..def.."@@skillHurtRatio=="..skillHurtRatio.."@@skillExtraValue=="..skillExtraValue.."@@proofValue=="..proofValue.."\n"  
        //records = records .. s
        //wqSetBinaryData("hunterHurt", records, #records)
        return value;
    }
    zj.hunterHurt = hunterHurt;
    // 猎人暴击伤害
    function hunterCritHurt(value, csd) {
        var hurtValue = value * csd / 100;
        return hurtValue;
    }
    zj.hunterCritHurt = hunterCritHurt;
    // todelete
    //（攻击方物理暴击 + 攻击方物理暴击修正） * 0.2 /（（攻击方物理暴击+攻击方物理暴击修正）*0.2 + 被攻击方暴击抵抗 + 被攻击方暴击抵抗修正） * 50%
    function isPhyCrit(pct, pctExtra, crt, crtExtra, character, beatkeder) {
        // body
        var value = (pct + pctExtra) * 0.9 / ((pct + pctExtra) * 0.9 + crt + crtExtra) * 0.5;
        if (percentIsEffect(value * 100, character, beatkeder, "是否物理暴击") == true) {
            return true;
        }
        return false;
    }
    zj.isPhyCrit = isPhyCrit;
    // todelete
    // （攻击方法术暴击 + 攻击方法术暴击修正） *  0.45 /（（攻击方法术暴击+攻击方法术暴击修正）* 0.45 + 被攻击方暴击抵抗 + 被攻击方暴击抵抗修正） * 30%
    function isMagicCrit(pct, pctExtra, crt, crtExtra, character, beatkeder) {
        // body
        var value = (pct + pctExtra) * 0.45 / ((pct + pctExtra) * 0.45 + crt + crtExtra) * 0.3;
        if (percentIsEffect(value * 100, character, beatkeder, "是否法术暴击") == true) {
            return true;
        }
        return false;
    }
    zj.isMagicCrit = isMagicCrit;
    // todelete
    /*检测是否眩晕*/
    function isStun(stunRate, stunPlus, stunDefplus) {
        // body    
        return false;
    }
    zj.isStun = isStun;
    // todelete
    //【攻击方已校对物理攻击值, 攻击方技能伤害系数, 攻击方技能伤害附加值, hurt校对系数, 被攻击方物理防御值, 攻击方忽视物防值, 攻击方等级】
    function phyValue(generalPhyAtk, skillHurtRatio, skillExtraValue, proofValue, phyDefence, pierceForce, atkGeneralLevel, character, beatkeder) {
        // body    
        var value = (generalPhyAtk * skillHurtRatio / 100 - generalPhyAtk * skillHurtRatio / 100 * 1 * (phyDefence - pierceForce) / (Math.abs(phyDefence - pierceForce) + 2 * atkGeneralLevel ^ 2 + 100) * 1 + skillExtraValue) * proofValue;
        return finalHurt(value, character, beatkeder, "物理伤害");
    }
    zj.phyValue = phyValue;
    // todelete
    /*技能魔法攻击伤害*/
    function magicValue(generalMagicAtk, skillHurtRatio, skillExtraValue, proofValue, magicDefence, pierceForce, atkGeneralLevel, character, beatkeder) {
        // body    
        var value = (generalMagicAtk * skillHurtRatio / 100 - generalMagicAtk * skillHurtRatio / 100 * 1 * (magicDefence - pierceForce) / (Math.abs(magicDefence - pierceForce) + 2 * atkGeneralLevel ^ 2 + 90) * 1 + skillExtraValue) * proofValue;
        return finalHurt(value, character, beatkeder, "魔法伤害");
    }
    zj.magicValue = magicValue;
    function phyTalentValue(talentEffectVal, generalPhyAtk, proofValue, phyDefence, pierceForce, atkGeneralLevel, character, beatkeder) {
        // body  
        var value = talentEffectVal * generalPhyAtk * proofValue;
        return finalHurt(value, character, beatkeder, "天赋物理伤害");
    }
    zj.phyTalentValue = phyTalentValue;
    // todelete
    /*天赋魔法攻击伤害*/
    function magicTalentValue(generalMagicAtk, proofValue, magicDefence, pierceForce, atkGeneralLevel, character, beatkeder) {
        // body    
        var value = 1 * generalMagicAtk * proofValue;
        return finalHurt(value, character, beatkeder, "天赋魔法伤害");
    }
    zj.magicTalentValue = magicTalentValue;
    // todelete
    // 最终伤害
    function finalHurt(value, character, beatkeder, des) {
        // body   
        var atk_id = 0;
        if (character != null) {
            atk_id = character.roleId;
        }
        var beatked_id = 0;
        if (beatkeder != null) {
            beatked_id = beatkeder.roleId;
        }
        var rand = zj.TsMtirand();
        var radio = 0.91 + (rand % ((1.00 - 0.91) * 10000)) / 10000;
        var final = value * radio;
        /**/
        if (zj.Device != null && zj.Device.isBattleSeedOpen == true) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            console.log(zj.Gmgr.Instance.lcgrandcnt + "__发起者." + atk_id + "__被动者." + beatked_id + "__" + des + "__" + scene.timerTick + "__rand." + rand);
        }
        return final;
    }
    zj.finalHurt = finalHurt;
    // todelete
    // 伤害*2 + 爆伤加成*random（91,100）/100
    function critPhyHurt(value, critHurtPlus, character, beatkeder) {
        var final = value * 2 + finalHurt(critHurtPlus, character, beatkeder, "物理暴击伤害");
        return final;
    }
    zj.critPhyHurt = critPhyHurt;
    // todelete
    // 伤害*2.2 + 爆伤加成*random（91,100）/100
    function critMagicHurt(value, critHurtPlus, character, beatkeder) {
        var final = value * 2.2 + finalHurt(critHurtPlus, character, beatkeder, "法术暴击");
        return final;
    }
    zj.critMagicHurt = critMagicHurt;
    function skill_continueTime(level, sBase, ratio) {
        // body
        var value = 0;
        value = sBase + level * ratio;
        return value;
    }
    zj.skill_continueTime = skill_continueTime;
    function skill_ratioValue(level, sBase, ratio) {
        // body
        var value = 0;
        value = sBase + level * ratio;
        return value;
    }
    zj.skill_ratioValue = skill_ratioValue;
    function skill_extraValue(level, sBase, ratio) {
        // body
        var value = 0;
        value = sBase + level * ratio;
        return value;
    }
    zj.skill_extraValue = skill_extraValue;
    ////////////////////////////////////////////////////////////////
    // buff相关
    // 命中概率
    // 已修改
    function buff_hit(belonglevel, bBase, ratio) {
        // body
        var value = 0;
        value = bBase + belonglevel * ratio;
        return value;
    }
    zj.buff_hit = buff_hit;
    // 持续时间
    // 已修改
    function buff_continueTime(belonglevel, bBase, ratio) {
        // body
        var value = 0;
        value = bBase + belonglevel * ratio;
        return value;
    }
    zj.buff_continueTime = buff_continueTime;
    // 减速(百分比>=0 && 百分比<1)
    // 已修改
    function buff_reduceSpeed(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        //if( value > 100 ){ cclog("超出界限了")  assert(false) }
        if (value > 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_reduceSpeed = buff_reduceSpeed;
    // 减命中(百分比>=0 && 百分比<1)
    // 已修改
    function buff_reduceHit(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_reduceHit = buff_reduceHit;
    // 伤害加深(百分比)
    // 已修改
    function buff_week(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_week = buff_week;
    // 减防御(百分比>=0 && 百分比<=1)
    // 已修改
    function buff_reduceDefence(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_reduceDefence = buff_reduceDefence;
    // 加效果命中
    function buff_addHtv(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_addHtv = buff_addHtv;
    // 减效果命中
    function buff_reduceHtv(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_reduceHtv = buff_reduceHtv;
    // 加效果抵抗
    function buff_addEva(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_addEva = buff_addEva;
    // 减效果抵抗
    function buff_reduceEva(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_reduceEva = buff_reduceEva;
    // 加格挡
    function buff_addBlr(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_addBlr = buff_addBlr;
    // 减格挡
    function buff_reduceBlr(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_reduceBlr = buff_reduceBlr;
    // 增防御(百分比>=0 && 百分比<=1)
    // 已修改
    function buff_promoteDefence(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_promoteDefence = buff_promoteDefence;
    // 流血(间隔时间， 掉血量)
    // 已修改
    function buff_intervalBlood(atk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = bloodValue + belonglevel * bloodRatio;
        return [interval, atk * value / 100];
    }
    zj.buff_intervalBlood = buff_intervalBlood;
    // 灼烧（间隔时间， 掉血量)
    // 已修改
    function buff_intervalFiring(atk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio, baseValue, ratio) {
        var interval = 0;
        var bloodPercent = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        bloodPercent = bloodValue + belonglevel * bloodRatio;
        value = baseValue + belonglevel * ratio;
        return [interval, atk * bloodPercent / 100, value / 100];
    }
    zj.buff_intervalFiring = buff_intervalFiring;
    function buff_recoverBySourceHp(belongRole, belonglevel, baseTime, timeRatio, baseRatio, ratio) {
        if (belongRole == null) {
            return [0, 0];
        }
        var val1 = baseTime + belonglevel * timeRatio;
        var percent = baseRatio + belonglevel * ratio;
        var val2 = percent / 100 * belongRole.getMaxHp();
        return [val1, val2];
    }
    zj.buff_recoverBySourceHp = buff_recoverBySourceHp;
    function buff_recoverByProto(belongRole, belonglevel, baseTime, timeRatio, baseRatio, ratio, proto) {
        var value = 0;
        if (belongRole == null) {
            return [0, 0];
        }
        var val1 = baseTime + belonglevel * timeRatio;
        var mult = baseRatio + belonglevel * ratio;
        var val2 = belongRole.getProtoValue(proto) * mult;
        return [val1, val2];
    }
    zj.buff_recoverByProto = buff_recoverByProto;
    function buff_addDefenceBySource(belongRole, belonglevel, baseRatio, ratio) {
        var value = 0;
        if (belongRole == null) {
            return 0;
        }
        var mult = baseRatio + belonglevel * ratio;
        value = belongRole.getDef() * mult;
        return value;
    }
    zj.buff_addDefenceBySource = buff_addDefenceBySource;
    function buff_sign(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_sign = buff_sign;
    // 吸取比例(百分比)
    // 已修改
    function buff_suckBlood(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_suckBlood = buff_suckBlood;
    // 加速(百分比>0)
    // 已修改
    function buff_raiseSpeed(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_raiseSpeed = buff_raiseSpeed;
    // 物理免疫(数值)
    // 已修改
    function buff_phyImmune(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value;
    }
    zj.buff_phyImmune = buff_phyImmune;
    // 魔法免疫(数值)
    // 已修改
    function buff_magicImmune(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value;
    }
    zj.buff_magicImmune = buff_magicImmune;
    // 所有伤害免疫(数值)
    // 已修改
    function buff_allImmune(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value;
    }
    zj.buff_allImmune = buff_allImmune;
    // 物理伤害吸收(数值)
    // 已修改
    function buff_phyDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio) {
        var percent = 0;
        var value = 0;
        percent = damagePer + belonglevel * damageRatio;
        value = valueMax + belonglevel * valueRatio;
        return [percent / 100, value];
    }
    zj.buff_phyDamageSuck = buff_phyDamageSuck;
    // 魔法伤害吸收(数值)
    // 已修改
    function buff_magicDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio) {
        var percent = 0;
        var value = 0;
        percent = damagePer + belonglevel * damageRatio;
        value = valueMax + belonglevel * valueRatio;
        return [percent / 100, value];
    }
    zj.buff_magicDamageSuck = buff_magicDamageSuck;
    // 所有伤害吸收(数值)
    // 已修改
    function buff_allDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio) {
        var percent = 0;
        var value = 0;
        percent = damagePer + belonglevel * damageRatio;
        value = valueMax + belonglevel * valueRatio;
        return [percent / 100, value];
    }
    zj.buff_allDamageSuck = buff_allDamageSuck;
    // 反弹（反弹比例(百分比), 反弹最大值（数值))
    // 已修改
    function buff_rebound(belonglevel, boundPer, boundRatio) {
        var percent = 0;
        var value = 0;
        percent = boundPer + belonglevel * boundRatio;
        return percent / 100;
    }
    zj.buff_rebound = buff_rebound;
    // 每隔多长时间加血与技能挂钩(间隔时间，回复值)
    // 已修改
    function buff_intervalRecoverBloodFrskill(generalMagicAtk, skillRatio, skillExtra, belonglevel, baseTime, timeRatio) {
        // body
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        //value = generalMagicAtk*skillRatio/100*1.0 + skillExtra
        value = 2 * (generalMagicAtk * skillRatio / 100 * 1.3 + skillExtra);
        return [interval, value];
    }
    zj.buff_intervalRecoverBloodFrskill = buff_intervalRecoverBloodFrskill;
    // 每隔多长时间加血(表)(间隔时间，回复值)
    // 已修改
    function buff_intervalRecoverBlood(generalMagicAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = recoverValue + belonglevel * recoverRatio;
        return [interval, generalMagicAtk * value / 100];
    }
    zj.buff_intervalRecoverBlood = buff_intervalRecoverBlood;
    // 定时炸弹
    // 已修改
    function buff_timerBomb(generalMagicAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = recoverValue + belonglevel * recoverRatio;
        return [interval, generalMagicAtk * value / 100];
    }
    zj.buff_timerBomb = buff_timerBomb;
    // 加攻击(百分比)
    // 已修改
    function buff_doubleDeep(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_doubleDeep = buff_doubleDeep;
    // 每隔多长时间中毒伤害(间隔时间，数值)
    // 已修改
    function buff_intervalPoison(generalMagicAtk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = bloodValue + belonglevel * bloodRatio;
        return [interval, generalMagicAtk * value / 100];
    }
    zj.buff_intervalPoison = buff_intervalPoison;
    // 蛋蛋
    // 已修改（数值)
    function buff_dandan(belonglevel, dandanValue, dandanRatio) {
        var value = 0;
        value = dandanValue + belonglevel * dandanRatio;
        return value;
    }
    zj.buff_dandan = buff_dandan;
    // 攻击力提升(百分比)
    function buff_atkPromote(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value / 100;
    }
    zj.buff_atkPromote = buff_atkPromote;
    // 禁止恢复(百分比>=0 && 百分比<=1)
    // 已修改
    function buff_forbideRecover(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_forbideRecover = buff_forbideRecover;
    // 驱散的数量(具体数值)
    function buff_dispelNum(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value;
    }
    zj.buff_dispelNum = buff_dispelNum;
    // 护盾(武将最大血量百分比)
    function buff_shield(generalMaxHp, belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return generalMaxHp * value / 100;
    }
    zj.buff_shield = buff_shield;
    // 关联自身防御护盾(吸收自身防御属性N%的伤害)
    function buff_shieldReleatedDef(generalDef, belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return generalDef * value / 100;
    }
    zj.buff_shieldReleatedDef = buff_shieldReleatedDef;
    // 护盾关联次数(吸收一定次数的伤害)
    function buff_shieldRelatedNum(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return value;
    }
    zj.buff_shieldRelatedNum = buff_shieldRelatedNum;
    // 护盾关联最大hp(单次受到伤害低于自身生命上限N%则本次伤害无效，高于N%伤害有效且BUFF消失)
    function buff_shieldCompareMaxHp(generalMaxHp, belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        return generalMaxHp * value / 100;
    }
    zj.buff_shieldCompareMaxHp = buff_shieldCompareMaxHp;
    // 重甲(百分比)
    function buff_armor(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_armor = buff_armor;
    // 破甲(百分比)
    function buff_armorBreak(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_armorBreak = buff_armorBreak;
    // 治疗(治疗量与武将最大hp有关)
    function buff_cure(generalMaxHp, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = recoverValue + belonglevel * recoverRatio;
        return [interval, generalMaxHp * value / 100];
    }
    zj.buff_cure = buff_cure;
    function buff_cureGogo(generalAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = recoverValue + belonglevel * recoverRatio;
        return [interval, generalAtk * value / 100];
    }
    zj.buff_cureGogo = buff_cureGogo;
    // 激怒(回怒量表里所填数值相关)
    function buff_anger(belonglevel, baseTime, timeRatio, recoverValue, recoverRatio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = recoverValue + belonglevel * recoverRatio;
        return [interval, value];
    }
    zj.buff_anger = buff_anger;
    // 增加忽视异常抵抗
    function buff_addIgnoreResis(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        //if( value >=100 ){ value = 100 }
        return value;
    }
    zj.buff_addIgnoreResis = buff_addIgnoreResis;
    // 增加自身异常抵抗
    function buff_addSelfResis(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        //if( value >=100 ){ value = 100 }
        return value;
    }
    zj.buff_addSelfResis = buff_addSelfResis;
    // 增益时间百分比
    function buff_addBuffTime(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        //if( value >=100 ){ value = 100 }
        return value / 100;
    }
    zj.buff_addBuffTime = buff_addBuffTime;
    // 减益时间百分比
    function buff_reduceBuffTime(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_reduceBuffTime = buff_reduceBuffTime;
    // 损伤hp
    function buff_damageHpTime(belonglevel, baseValue, ratio) {
        var value = 0;
        value = baseValue + belonglevel * ratio;
        if (value >= 100) {
            value = 100;
        }
        return value / 100;
    }
    zj.buff_damageHpTime = buff_damageHpTime;
    function buff_wounded(ememyAtk, myAtk, belonglevel, baseTime, timeRatio, baseValue, ratio) {
        var interval = 0;
        var value = 0;
        interval = baseTime + belonglevel * timeRatio;
        value = baseValue + belonglevel * ratio;
        return [interval, (ememyAtk + myAtk) * value / 100];
    }
    zj.buff_wounded = buff_wounded;
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    // 天赋相关
    // 天赋触发几率
    function talent_triggerRate(level, tBase, ratio) {
        // body
        var value = 0;
        value = tBase + level * ratio;
        return value;
    }
    zj.talent_triggerRate = talent_triggerRate;
    function talentEffect_triggerRate(level, tBase, ratio) {
        // body
        var value = 0;
        value = tBase + level * ratio;
        return value;
    }
    zj.talentEffect_triggerRate = talentEffect_triggerRate;
    // 天赋效果伤害值
    function talentEffect_effectValue(level, tBase, ratio) {
        // body
        var value = 0;
        value = tBase + level * ratio;
        return value;
    }
    zj.talentEffect_effectValue = talentEffect_effectValue;
    function talentReviveBuffId() {
        // body
        return 5100026;
    }
    zj.talentReviveBuffId = talentReviveBuffId;
    function reserveBuffId() {
        // body
        return 5100030;
    }
    zj.reserveBuffId = reserveBuffId;
    function convertStirRatio(floatRatio) {
        var tmp = 0;
        if (floatRatio < 50) {
            tmp = 3.3333 * Math.pow(10, -4) * floatRatio - 1.667 * Math.pow(10, -3);
        }
        else {
            tmp = 1.7071 * Math.pow(10, -3) * (floatRatio ^ 0.5) + 0.002928932;
        }
        if (tmp <= 0) {
            tmp = 0;
        }
        return tmp / 2;
    }
    zj.convertStirRatio = convertStirRatio;
    function hunter_calc_battervalue(skill_level1, skill_level2, init_passive, awake_passive, break_level1, break_level2, break_level3, equip_level, general_atk, atk_crit, crit_extra, general_hp, general_def, crit_resistance, cd_speed, skill_atk, skill_def, dodge_rate, adviserTbl) {
        var defGiven = 0;
        if (general_def <= 16500) {
            defGiven = general_hp / (1 - 1.2 * general_def / (general_def + 3500));
        }
        else {
            defGiven = (general_hp + (general_def - 16500) * 73) / (1 - 1.2 * 16500 / (16500 + 3500));
        }
        var base = Math.pow(((skill_level1 * 0.01 + 1) * (skill_level2 * 0.05 + 1) * (init_passive * 0.02 + 1) * (awake_passive * 0.02 + 1) * (break_level1 * 0.1 + 1) * (break_level2 * 0.1 + 1) * (break_level3 * 0.1 + 1) * (equip_level * 0.02 + 1) * general_atk * (1 - atk_crit / 100 + atk_crit / 100 * crit_extra / 100) * defGiven * (1 - crit_resistance / 100 + crit_resistance / 100 * crit_extra / 100) * 19000 / (10000000 / cd_speed - 1000) * (1 + skill_atk / 400) * (1 + skill_def / 400) * (1 + dodge_rate / 400)), 0.5);
        var adviserValue = 0;
        for (var i = zj.adjustIndex(1); i < adviserTbl.length; i++) {
            var adviserId = adviserTbl[i].adviserId;
            var adviserLevel = adviserTbl[i].level;
            var adviserQuality = zj.TableBaseAdviser.Item(adviserId).quality;
            adviserValue = adviserValue + adviserQuality ^ 2 * adviserLevel ^ 1.1;
        }
        return base + adviserValue;
    }
    zj.hunter_calc_battervalue = hunter_calc_battervalue;
    var _a;
})(zj || (zj = {}));
//# sourceMappingURL=ui_particle.js.map