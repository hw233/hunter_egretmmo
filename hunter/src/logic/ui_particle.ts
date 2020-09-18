namespace zj {
export let ConstValueEnum = {
    CV_HURT_FORMULA_V1 : 'CV_HURT_FORMULA_V1', // 伤害数值1
    CV_HURT_FORMULA_V2 : 'CV_HURT_FORMULA_V2', // 伤害数值2
    CV_HURT_FORMULA_V3 : 'CV_HURT_FORMULA_V3', // 伤害数值3
    CV_HURT_FORMULA_V4 : 'CV_HURT_FORMULA_V4', // 伤害数值4
    CV_HURT_FORMULA_V5 : 'CV_HURT_FORMULA_V5', // 伤害数值5
    //CV_FIGHT_PVE_RATIO : 6, // PVE
    CV_FIGHT_PVP_RATIO : 'CV_FIGHT_PVP_RATIO', // PVP
    CV_IGNORE_DEF : 'CV_IGNORE_DEF',  // 忽视N%的防御
    CV_DODGE_HURT : 'CV_DODGE_HURT',  // 格挡减少N%的伤害
}

export class constdb{
    public  static _constTbl = { 
        [ ConstValueEnum.CV_HURT_FORMULA_V1 ] : 1,
        [ ConstValueEnum.CV_HURT_FORMULA_V2 ] : 20,
        [ ConstValueEnum.CV_HURT_FORMULA_V3 ] : 100,
        [ ConstValueEnum.CV_HURT_FORMULA_V4 ] : 16500,
        [ ConstValueEnum.CV_HURT_FORMULA_V5 ] : 3500,
        [ ConstValueEnum.CV_FIGHT_PVP_RATIO ] : 1,
        [ ConstValueEnum.CV_IGNORE_DEF ] : 50,
        [ ConstValueEnum.CV_DODGE_HURT ] : 0,
    }; 

    public static GetValue( e ){
        return constdb._constTbl[e];
    }
}


export let records = ""

export function percentInTotal( cur, total){
    let tag = false
    let rand = TsMtirand()  
    let i = rand%total
    if( i > 0 && i < cur ){
        tag = true
    }
    return tag
}

export function percentIsEffect( percent, character?, beatkeder?, des? ){
    // body
    /**/ 
    let atk_id = 0    
    if( character != null ){
        atk_id = character.roleId
    }
    let beatked_id = 0
    if( beatkeder != null ){
        beatked_id = beatkeder.roleId
    } 
      

    let rand = TsMtirand()  
    
    /*  */   
    if( Device != null && Device.isBattleSeedOpen == true ){
        let scene = StageSceneManager.Instance.GetCurScene() 
        console.log(Gmgr.Instance.lcgrandcnt + "__发起者." + atk_id + "__被动者." + beatked_id + "__" + des +"__" + scene.timerTick + "__rand." + rand)
    }    
    
    let i = (rand % 10000) / 100
    let tag = false
    if( i > 0 && i <= percent ){
        tag = true
    }
    return tag
}


// 速度计算
let MAXSPD = 10000
export function speedTranToCd( speed ){
    // body
    if (speed <= 0) { speed = 1 }
    let cd = 1000 * MAXSPD / speed  - 1000
    return cd
}

export function speedTranToEntry( speed ){
    // body
    if (speed <= 0) { speed = 1 }
    let cd =	0 
     	if ((1000 * MAXSPD/speed - 1000) - 11000 < 0) {
     		cd=0
         }else{
     		cd = (1000 * MAXSPD/speed - 1000) - 11000
         }
    return cd
}

// 60% + （攻击方的命中值+攻击方修正值) / ((攻击方命中值+攻击方命中修正值) + (被攻击方闪避值+被攻击方闪避修正值)) * 40%
export function isDodge( htv, htvExtra, eva, evaExtra, character, beatkeder){
    // body 
    
    let value = 0.6 + (htv+htvExtra) / (htv+htvExtra+eva+evaExtra)*0.4
    if( percentIsEffect(value*100, character, beatkeder, "是否闪避") == false ){
        return [true, value]
    }
    return [false, value]
}

// 是否格挡
export function isParry(blr, ilr, character, beatkeder){
    let rate = blr - ilr
    if( rate <= 0 ){ rate = 0 }
    if( percentIsEffect( rate, character, beatkeder, "是否命中(忽视格挡)" ) == true ){
        return true
    }
    return false
}

// 是否忽视防御
export function isIgnoreDef( igdef, character, beatkeder ){
    if( percentIsEffect( igdef, character, beatkeder, "是否忽视防御" ) == true ){
        return true
    }
    return false
}

// 是否暴击
export function isCrit( crit, ctr, character, beatkeder ){
    let value = crit - ctr
    if( value <= 0 ){ value = 0 }
    if( percentIsEffect( value, character, beatkeder, "是否暴击" ) == true ){
        return true
    }
    return false
}

// 猎人伤害公式c
export function hunterHurtC( atk, def, skillHurtRatio, skillExtraValue, proofValue, generalId){
    let rand;
    rand = TsMtirand();
    let radio = 0.91 + (rand%((1.00 - 0.91)*10000))/10000;
    let value = 0;
    if(Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH){
        radio = 0.96;
    }
    if( def <= 0 ){ def = 0 }

    let retA = constdb.GetValue( ConstValueEnum.CV_HURT_FORMULA_V1 ) +  constdb.GetValue( ConstValueEnum.CV_HURT_FORMULA_V2 )/constdb.GetValue( ConstValueEnum.CV_HURT_FORMULA_V3 )
    let retC = constdb.GetValue( ConstValueEnum.CV_HURT_FORMULA_V4 )
    let retB = constdb.GetValue( ConstValueEnum.CV_HURT_FORMULA_V5 )
    if( def<=retC ){
        value = (atk * skillHurtRatio - (atk * skillHurtRatio * retA *def)/(def+retB)+skillExtraValue) * proofValue * radio
    }else{
        value = (atk * skillHurtRatio - (atk * skillHurtRatio * retA *retC)/(retC+retB)+skillExtraValue) * proofValue * radio
    }
    //let s = "id=="..generalId.."@@radio=="..radio.."@@atk=="..atk.."@@def=="..def.."@@skillHurtRatio=="..skillHurtRatio.."@@skillExtraValue=="..skillExtraValue.."@@proofValue=="..proofValue.."\n"  
    //records = records .. s
    //wqSetBinaryData("hunterHurt", records, #records)
    //console.log("基础伤害："+atk+"---------------------------------------------随机后伤害："+value);
    return value
} 

// 猎人伤害公式s
export function hunterHurt( atk, def, skillHurtRatio, skillExtraValue, proofValue, generalId){
    let rand = TsMtirand()
    let radio = 0.91 + (rand%((1.00 - 0.91)*10000))/10000
    let value = 0
    if( def <= 0 ){ def = 0 }
    if( def<=16500 ){
        value = (atk * skillHurtRatio * 0.01 - (atk * skillHurtRatio * 0.01 * 1.2 *def)/(def+3500)+skillExtraValue) * proofValue * radio
    }else{
        value = (atk * skillHurtRatio * 0.01 - (atk * skillHurtRatio * 0.01 * 1.2 *16500)/(16500+3500)+skillExtraValue) * proofValue * radio
    }
    //let s = "id=="..generalId.."@@radio=="..radio.."@@atk=="..atk.."@@def=="..def.."@@skillHurtRatio=="..skillHurtRatio.."@@skillExtraValue=="..skillExtraValue.."@@proofValue=="..proofValue.."\n"  
    //records = records .. s
    //wqSetBinaryData("hunterHurt", records, #records)

    return value
} 


// 猎人暴击伤害
export function hunterCritHurt(value, csd){
    let hurtValue = value * csd/100
    return hurtValue
}

// todelete
//（攻击方物理暴击 + 攻击方物理暴击修正） * 0.2 /（（攻击方物理暴击+攻击方物理暴击修正）*0.2 + 被攻击方暴击抵抗 + 被攻击方暴击抵抗修正） * 50%
export function isPhyCrit( pct, pctExtra, crt, crtExtra, character, beatkeder ){
	// body
	let value = (pct + pctExtra) * 0.9 / ((pct + pctExtra) * 0.9 + crt + crtExtra) * 0.5
	if( percentIsEffect(value*100, character, beatkeder, "是否物理暴击") == true ){
		return true
	}
	return false
}

// todelete
// （攻击方法术暴击 + 攻击方法术暴击修正） *  0.45 /（（攻击方法术暴击+攻击方法术暴击修正）* 0.45 + 被攻击方暴击抵抗 + 被攻击方暴击抵抗修正） * 30%
export function isMagicCrit( pct, pctExtra, crt, crtExtra, character, beatkeder ){
    // body
    let value = (pct + pctExtra) * 0.45 / ((pct + pctExtra) * 0.45 + crt + crtExtra) * 0.3
    if( percentIsEffect(value*100, character, beatkeder, "是否法术暴击") == true ){
        return true
    }
    return false
}

// todelete
/*检测是否眩晕*/
export function isStun( stunRate, stunPlus, stunDefplus ){
	// body    
	return false
}

// todelete
//【攻击方已校对物理攻击值, 攻击方技能伤害系数, 攻击方技能伤害附加值, hurt校对系数, 被攻击方物理防御值, 攻击方忽视物防值, 攻击方等级】
export function phyValue( generalPhyAtk, skillHurtRatio, skillExtraValue, proofValue, phyDefence, pierceForce, atkGeneralLevel, character, beatkeder){
    // body    
    let value = (generalPhyAtk * skillHurtRatio/100 - generalPhyAtk * skillHurtRatio/100 * 1*(phyDefence-pierceForce) / (Math.abs(phyDefence - pierceForce) + 2 * atkGeneralLevel ^2 + 100 ) * 1 + skillExtraValue)*proofValue
    return finalHurt(value, character, beatkeder, "物理伤害")
}

// todelete
/*技能魔法攻击伤害*/
export function magicValue( generalMagicAtk, skillHurtRatio, skillExtraValue, proofValue, magicDefence, pierceForce, atkGeneralLevel, character, beatkeder){
    // body    
    let value = (generalMagicAtk * skillHurtRatio/100 - generalMagicAtk * skillHurtRatio/100 * 1*(magicDefence-pierceForce) / (Math.abs(magicDefence - pierceForce) + 2 * atkGeneralLevel ^2 + 90 ) * 1 + skillExtraValue)*proofValue
    return finalHurt(value, character, beatkeder, "魔法伤害")
}


export function phyTalentValue( talentEffectVal, generalPhyAtk, proofValue, phyDefence, pierceForce, atkGeneralLevel, character, beatkeder){
    // body  
    let value = talentEffectVal*generalPhyAtk * proofValue
    return finalHurt(value, character, beatkeder, "天赋物理伤害")
}

// todelete
/*天赋魔法攻击伤害*/
export function magicTalentValue( generalMagicAtk, proofValue, magicDefence, pierceForce, atkGeneralLevel, character, beatkeder){
    // body    
    let value = 1*generalMagicAtk  * proofValue
    return finalHurt(value, character, beatkeder, "天赋魔法伤害")
}

// todelete
// 最终伤害
export function finalHurt( value, character, beatkeder, des ){
	// body   
    let atk_id = 0
    if( character != null ){
        atk_id = character.roleId
    }
    let beatked_id = 0
    if( beatkeder != null ){
        beatked_id = beatkeder.roleId
    }
   
    let rand = TsMtirand()
    let radio = 0.91 + (rand%((1.00 - 0.91)*10000))/10000
    let final = value * radio   
        
    /**/
    if( Device != null && Device.isBattleSeedOpen == true ){
        let scene = StageSceneManager.Instance.GetCurScene()   
        console.log(Gmgr.Instance.lcgrandcnt + "__发起者." + atk_id + "__被动者." + beatked_id + "__" + des + "__" + scene.timerTick + "__rand." + rand)
    }   
    
    return final
}

// todelete
// 伤害*2 + 爆伤加成*random（91,100）/100
export function critPhyHurt( value, critHurtPlus, character, beatkeder){
    let final = value*2 + finalHurt(critHurtPlus, character, beatkeder, "物理暴击伤害")
    return final
}

// todelete
// 伤害*2.2 + 爆伤加成*random（91,100）/100
export function critMagicHurt( value, critHurtPlus, character, beatkeder){
    let final = value*2.2 + finalHurt(critHurtPlus, character, beatkeder, "法术暴击")
    return final
}

export function skill_continueTime( level, sBase, ratio )
{
    // body
	let value = 0
	value = sBase + level * ratio
	return value
}


export function skill_ratioValue( level, sBase, ratio ){
    // body
    let value = 0
    value = sBase + level * ratio
    return value
}

export function skill_extraValue( level, sBase, ratio ){
    // body
    let value = 0
    value = sBase + level * ratio
    return value
}


////////////////////////////////////////////////////////////////
// buff相关
// 命中概率
// 已修改
export function buff_hit( belonglevel, bBase, ratio ){
	// body
	let value = 0
	value = bBase + belonglevel * ratio	
	return value
}

// 持续时间
// 已修改
export function buff_continueTime( belonglevel, bBase, ratio ){
	// body
	let value = 0
	value = bBase + belonglevel * ratio
	return value
}

// 减速(百分比>=0 && 百分比<1)
// 已修改
export function buff_reduceSpeed(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    //if( value > 100 ){ cclog("超出界限了")  assert(false) }
    if( value > 100 ){ value = 100 }
    return value/100
}

// 减命中(百分比>=0 && 百分比<1)
// 已修改
export function buff_reduceHit(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 伤害加深(百分比)
// 已修改
export function buff_week(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio    
    return value/100
}

// 减防御(百分比>=0 && 百分比<=1)
// 已修改
export function buff_reduceDefence(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 加效果命中
export function buff_addHtv(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 减效果命中
export function buff_reduceHtv(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 加效果抵抗
export function buff_addEva(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 减效果抵抗
export function buff_reduceEva(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 加格挡
export function buff_addBlr(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 减格挡
export function buff_reduceBlr(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 增防御(百分比>=0 && 百分比<=1)
// 已修改
export function buff_promoteDefence(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 流血(间隔时间， 掉血量)
// 已修改
export function buff_intervalBlood(atk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = bloodValue + belonglevel * bloodRatio
    return [interval, atk*value/100]
}

// 灼烧（间隔时间， 掉血量)
// 已修改
export function buff_intervalFiring(atk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio, baseValue, ratio){
    let interval = 0
    let bloodPercent = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    bloodPercent = bloodValue + belonglevel * bloodRatio
    value = baseValue + belonglevel * ratio
    return [interval, atk*bloodPercent/100, value/100]
}

export function buff_recoverBySourceHp(belongRole, belonglevel, baseTime, timeRatio, baseRatio, ratio){  
    if( belongRole == null ){ return [0, 0] }
    let val1 = baseTime + belonglevel * timeRatio
    let percent = baseRatio + belonglevel * ratio
    let val2 = percent/100 * belongRole.getMaxHp()
    return [val1, val2]
}

export function buff_recoverByProto(belongRole, belonglevel, baseTime, timeRatio, baseRatio, ratio, proto){
    let value = 0
    if( belongRole == null ){ return [0, 0] }
    let val1 = baseTime + belonglevel * timeRatio
    let mult = baseRatio + belonglevel * ratio
    let val2 = belongRole.getProtoValue( proto ) * mult
    return [val1, val2]
}

export function buff_addDefenceBySource(belongRole, belonglevel, baseRatio, ratio){
    let value = 0
    if( belongRole == null ){ return 0 }
    let mult = baseRatio + belonglevel * ratio
    value = belongRole.getDef() * mult
    return value
}

export function buff_sign(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 吸取比例(百分比)
// 已修改
export function buff_suckBlood(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 加速(百分比>0)
// 已修改
export function buff_raiseSpeed(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 物理免疫(数值)
// 已修改
export function buff_phyImmune(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value
}

// 魔法免疫(数值)
// 已修改
export function buff_magicImmune(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value
}

// 所有伤害免疫(数值)
// 已修改
export function buff_allImmune(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value
}

// 物理伤害吸收(数值)
// 已修改
export function buff_phyDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio){
   	let percent = 0
    let value = 0
    percent = damagePer + belonglevel * damageRatio
    value = valueMax + belonglevel * valueRatio
    return [percent/100, value]
}

// 魔法伤害吸收(数值)
// 已修改
export function buff_magicDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio){
    let percent = 0
    let value = 0
    percent = damagePer + belonglevel * damageRatio
    value = valueMax + belonglevel * valueRatio
    return [percent/100, value]
}

// 所有伤害吸收(数值)
// 已修改
export function buff_allDamageSuck(belonglevel, damagePer, damageRatio, valueMax, valueRatio){
    let percent = 0
    let value = 0
    percent = damagePer + belonglevel * damageRatio
    value = valueMax + belonglevel * valueRatio
    return [percent/100, value]
}

// 反弹（反弹比例(百分比), 反弹最大值（数值))
// 已修改
export function buff_rebound(belonglevel, boundPer, boundRatio){
    let percent = 0
    let value = 0
    percent = boundPer + belonglevel * boundRatio
    return percent/100
}

// 每隔多长时间加血与技能挂钩(间隔时间，回复值)
// 已修改
export function buff_intervalRecoverBloodFrskill(generalMagicAtk, skillRatio, skillExtra, belonglevel, baseTime, timeRatio){
    // body
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    //value = generalMagicAtk*skillRatio/100*1.0 + skillExtra
    value = 2*(generalMagicAtk*skillRatio/100*1.3 + skillExtra ) 

    return [interval, value]
}

// 每隔多长时间加血(表)(间隔时间，回复值)
// 已修改
export function buff_intervalRecoverBlood(generalMagicAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = recoverValue + belonglevel * recoverRatio
    return [interval, generalMagicAtk*value/100]
}

// 定时炸弹
// 已修改
export function buff_timerBomb(generalMagicAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = recoverValue + belonglevel * recoverRatio
    return [interval, generalMagicAtk*value/100]
}

// 加攻击(百分比)
// 已修改
export function buff_doubleDeep(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value/100
}

// 每隔多长时间中毒伤害(间隔时间，数值)
// 已修改
export function buff_intervalPoison(generalMagicAtk, belonglevel, baseTime, timeRatio, bloodValue, bloodRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = bloodValue + belonglevel * bloodRatio
    return [interval, generalMagicAtk*value/100]
}

// 蛋蛋
// 已修改（数值)
export function buff_dandan(belonglevel, dandanValue, dandanRatio){    
    let value = 0    
    value = dandanValue + belonglevel * dandanRatio
    return  value
}

// 攻击力提升(百分比)
export function buff_atkPromote(belonglevel, baseValue, ratio){    
    let value = 0    
    value = baseValue + belonglevel * ratio
    return  value/100
}

// 禁止恢复(百分比>=0 && 百分比<=1)
// 已修改
export function buff_forbideRecover(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 驱散的数量(具体数值)
export function buff_dispelNum(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value
}

// 护盾(武将最大血量百分比)
export function buff_shield(generalMaxHp, belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return generalMaxHp * value/100
}


// 关联自身防御护盾(吸收自身防御属性N%的伤害)
export function buff_shieldReleatedDef(generalDef, belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return generalDef * value/100
}

// 护盾关联次数(吸收一定次数的伤害)
export function buff_shieldRelatedNum(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return value
}

// 护盾关联最大hp(单次受到伤害低于自身生命上限N%则本次伤害无效，高于N%伤害有效且BUFF消失)
export function buff_shieldCompareMaxHp(generalMaxHp, belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    return generalMaxHp * value/100
}

// 重甲(百分比)
export function buff_armor(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 破甲(百分比)
export function buff_armorBreak(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 治疗(治疗量与武将最大hp有关)
export function buff_cure(generalMaxHp, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = recoverValue + belonglevel * recoverRatio
    return [interval, generalMaxHp*value/100]
}

export function buff_cureGogo(generalAtk, belonglevel, baseTime, timeRatio, recoverValue, recoverRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = recoverValue + belonglevel * recoverRatio
    return [interval, generalAtk*value/100]
}

// 激怒(回怒量表里所填数值相关)
export function buff_anger(belonglevel, baseTime, timeRatio, recoverValue, recoverRatio){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = recoverValue + belonglevel * recoverRatio
    return [interval, value]
}

// 增加忽视异常抵抗
export function buff_addIgnoreResis(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    //if( value >=100 ){ value = 100 }
    return value
}

// 增加自身异常抵抗
export function buff_addSelfResis(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    //if( value >=100 ){ value = 100 }
    return value
}

// 增益时间百分比
export function buff_addBuffTime(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    //if( value >=100 ){ value = 100 }
    return value/100
}

// 减益时间百分比
export function buff_reduceBuffTime(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

// 损伤hp
export function buff_damageHpTime(belonglevel, baseValue, ratio){
    let value = 0
    value = baseValue + belonglevel * ratio
    if( value >=100 ){ value = 100 }
    return value/100
}

export function buff_wounded(ememyAtk, myAtk, belonglevel, baseTime, timeRatio, baseValue, ratio ){
    let interval = 0
    let value = 0
    interval = baseTime + belonglevel * timeRatio
    value = baseValue + belonglevel * ratio
    return [interval, (ememyAtk+myAtk) * value/100]
}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// 天赋相关

// 天赋触发几率
export function talent_triggerRate( level, tBase, ratio ){
	// body
	let value = 0
	value = tBase + level * ratio	
	return value
}

export function talentEffect_triggerRate( level, tBase, ratio ){
	// body
	let value = 0
	value = tBase + level * ratio	
	return value
}

// 天赋效果伤害值
export function talentEffect_effectValue( level, tBase, ratio ){
	// body
	let value = 0
	value = tBase + level * ratio
	return value
}

export function talentReviveBuffId(){
    // body
    return 5100026
}

export function reserveBuffId(){
    // body
    return 5100030
}

export function convertStirRatio( floatRatio ){
    let tmp = 0
    if( floatRatio < 50 ){
        tmp = 3.3333 * Math.pow(10, -4) *  floatRatio - 1.667 * Math.pow(10, -3)
    }else{
        tmp = 1.7071 * Math.pow(10, -3) * (floatRatio^0.5) + 0.002928932
    }
    if( tmp <= 0 ){ tmp = 0 }
    return tmp/2
}

export function hunter_calc_battervalue(skill_level1, skill_level2, init_passive, awake_passive, break_level1, break_level2, break_level3,equip_level, general_atk, atk_crit, crit_extra, general_hp, general_def, crit_resistance, cd_speed, skill_atk, skill_def, dodge_rate, adviserTbl){
	let defGiven = 0

    if( general_def<=16500 ){
        defGiven = general_hp / (1 - 1.2 * general_def / (general_def + 3500))
    }else{
        defGiven = (general_hp+(general_def-16500)*73) / (1 - 1.2 * 16500 / (16500 + 3500))
    }

    let base = Math.pow(((skill_level1*0.01+1) * (skill_level2*0.05+1) * (init_passive*0.02+1) * (awake_passive*0.02+1) * (break_level1*0.1+1) * (break_level2*0.1+1) * (break_level3*0.1+1) * (equip_level*0.02+1)* general_atk * (1 - atk_crit/100 + atk_crit/100 * crit_extra/100) * defGiven * (1-crit_resistance/100+crit_resistance/100*crit_extra/100) * 19000/(10000000/cd_speed-1000) * (1+skill_atk/400) * (1+skill_def/400) * (1+dodge_rate/400)) , 0.5)
    let adviserValue = 0
    for (let i = adjustIndex(1); i < adviserTbl.length; i++){
        let adviserId = adviserTbl[i].adviserId
        let adviserLevel = adviserTbl[i].level
        let adviserQuality = TableBaseAdviser.Item(adviserId).quality;
        adviserValue = adviserValue + adviserQuality ^ 2 * adviserLevel ^ 1.1
    }
    return base + adviserValue
} 

}