namespace zj {
    export const TableEnum = {
        TableCampType: {
            CAMP_TYPE_NONE: 0,     // 无阵营
            CAMP_TYPE_MY: 1,       // 我方阵营
            CAMP_TYPE_OTHER: 2     // 其他阵营
        },

        TablePositionType: {
            POSITION_NONE: 0,		// 无类型
            POSITION_LEFT: 1,      // 左边
            POSITION_RIGHT: 2      // 右边
        },

        TableTeamNum: {
            TEAM_NUM_NONE: -1,     // none
            TEAM_NUM_A: 0,         // 1号位
            TEAM_NUM_B: 1,         // 2号位
            TEAM_NUM_C: 2,         // 3号位
            TEAM_NUM_D: 3,         // 4号位
            TEAM_NUM_MAX: 4		// 站位总数
        },

        // 当前职业分类
        TableEnumProfession: {
            CAREER_Unknown: 0,		// 不明职业
            CAREER_FOOT: 1,		// 猛将
            CAREER_TACTICIAN: 2,	// 法师
            CAREER_ASSASSIN: 3,	// 刺客
            CAREER_ARCHER: 4,		// 弓箭手
            CAREER_MAX: 5, 		// 最大数量
        },

        EnumStrategySkillTarget: {
            None: 0,
            Default: 1,           // 默认全体
            Pos: 2,               // 按位置区分
            Profession: 3         // 按职业区分
        },

        TableCallPos: {
            CALL_POS_NONE: -1,
            CALL_POS_A: 0,
            CALL_POS_B: 1,
            CALL_POS_C: 2,
            CALL_POS_D: 3,
            CALL_POS_MAX: 4
        },

        TableSkillAiType: {
            TYPE_NONE: 0,              // 无类型
            TYPE_SKILLAI_NORMAL: 1,    // 普通类型
            TYPE_SKILLAI_BREAK: 2,     // 打断攻击
            TYPE_SKILLAI_RECOVER: 3    // 回复类型
        },

        TableSkillExtraEffect: {
            EXTRA_EFFECT_NONE: 0,
            EXTRA_EFFECT_FLOATED_DEEP: 1,      // 浮空加深
            EXTRA_EFFECT_SUCK_BLOOD: 2,        // 物理攻击带吸血
            EXTRA_EFFECT_DISPEL_BAD_BUFF: 3,   // 驱散不利buff (1-驱散我方， 2-驱散对方)
            EXTRA_EFFECT_DISPEL_PROFIT_BUFF: 4,// 驱散有益buff (1-驱散我方， 2-驱散对方)
            EXTRA_EFFECT_STEAL_HP_RECOVER: 5,  // 偷取对方生命给己方生命值最低的队友
            EXTRA_EFFECT_MULT_HURT: 6,         // 攻击中有一定概率造成N倍伤害
            EXTRA_EFFECT_DOUBLE_BUFF_DEEP: 7,  // 连击buff效果加深
            EXTRA_EFFECT_KICK_OUT: 8           // 淘汰
        },

        TableHurtEffectType: {
            TYPE_NONE: 0,			// 无类型
            TYPE_HP: 1,			// 血·
            TYPE_RAGE: 2 			// 怒气
        },

        TableBufferType: {
            BUFFER_NONE: -1,		// 无
            BUFFER_DIZZINESS: 1,	// 眩晕
            BUFFER_SLEEP: 2,		// 睡眠
            BUFFER_SPEED_DOWN: 3,	// 减速
            BUFFER_SILENCE: 4,		// 沉默
            BUFFER_DISARM: 5,		// 缴械
            BUFFER_CONFUSE: 6,		// 迷惑
            BUFFER_WEAK: 7,		// 虚弱
            BUFFER_BLEED: 8,		// 流血
            BUFFER_SUCK_BLOOD: 9,	// 吸血
            BUFFER_SPEED_UP: 10,	// 加速
            BUFFER_PHY_IMMUNE: 11,	// 物理免疫
            BUFFER_MAGIC_IMMUNE: 12,// 魔法免疫
            BUFFER_DAMAGE_IMMUNE: 13,// 所有伤害免疫
            BUFFER_PHY_SUCK: 14,	// 物理吸收转HP
            BUFFER_MAGIC_SUCK: 15,	// 魔法吸收转HP
            BUFFER_DAMAGE_SUCK: 16,// 所有伤害吸收转HP
            BUFFER_REBOUND: 17,	// 反弹
            BUFFER_FROZEN: 18,     // 冰冻
            BUFFER_STONED: 19,     // 石化
            BUFFER_RECOVER_BLOOD: 20, // 回血
            BUFFER_DOUBLE_DEEP: 21,// 连击攻击提升
            BUFFER_POISON: 22,     // 中毒
            BUFFER_REDUCE_DEF: 23, // 减甲
            BUFFER_RECOVER_COMMON_BLOOD: 24, // 普通回血
            BUFFER_DANDAN: 25,     // 霸体蛋蛋
            BUFFER_ATK_PROMOTE: 26,// 祝福（攻击力提升）
            BUFFER_FIRING: 27,     // 灼烧
            BUFFER_BOMB: 28,       // 爆炸
            BUFFER_IMMUNE: 29,     // 免疫
            BUFFER_DISPEL_HARMFUL: 30, // 驱散有害的（可配驱散类型）
            BUFFER_DISPEL_HELPFUL: 31, // 驱散有用的（可配驱散类型）
            BUFFER_FORBIDE_RECOVER: 32, // 禁用恢复

            BUFFER_SHIELD: 33,     // 护盾
            BUFFER_CURE: 34,       // 治疗
            BUFFER_ANGER: 35,      // 激怒
            BUFFER_ARMOR: 36,      // 重甲
            BUFFER_ADD_IGNORE_RESIS: 37, // 增加忽视异常抵抗效果（可配类型)
            BUFFER_ADD_GAIN_TIME: 38,// 增加增益时间
            BUFFER_REDUCE_DEBUFF_TIME: 39, // 减少debuff时间
            BUFFER_ADD_SELF_RESIST: 40, // 增加自身异常抵抗概率
            BUFFER_ARMOR_BREAK: 41, // 破甲
            BUFFER_PROMOTE_DEF: 42, // 增甲
            BUFFER_TIMER_BOMB: 43,  // 定时炸弹
            BUFFER_ADD_HTV: 44,     // 增加效果命中
            BUFFER_REDUCE_HTV: 45,  // 减少效果命中
            BUFFER_ADD_EVA: 46,     // 增加效果抵抗
            BUFFER_REDUCE_EVA: 47,  // 减少效果抵抗
            BUFFER_ADD_BLR: 48,     // 增加格挡率
            BUFFER_REDUCE_BLR: 49,  // 减少格挡率
            BUFFER_IMMUNE2: 50,     // 新免疫
            BUFFER_RECOVER_BYSOURCEHP: 51, // 回复（施加者生命上限）
            BUFFER_RECOVER_BYSOURCEPROTE: 52, // 回复（施加者XX属性 N倍的伤害）
            BUFFER_ADD_DEFENCE_BYSOURCE: 53, // 增加防御（施加者防御百分比)
            BUFFER_FORBIDE_STRENGTH: 54,   // 禁止强化
            BUFFER_SHIELD_RELATED_DEF: 55, // 关联自身防御护盾(吸收自身防御属性N%的伤害)
            BUFFER_SHIELD_RELATED_NUM: 56, // 护盾关联次数(吸收一定次数的伤害)
            BUFFER_SHIELD_COMPARE_MAXHP: 57, // 护盾关联最大hp(单次受到伤害低于自身生命上限N%则本次伤害无效，高于N%伤害有效且BUFF消失)
            BUFFER_WOUNDED: 58,     // 重伤
            BUFFER_SIGIN: 59,    //标记
            BUFFER_RECOVER_GOON: 60  //延续恢复
        },

        // 主动动画类型
        TableBuffActiveType: {
            Buff_Active_Nor: -1,
            Buff_Active_Loop: 1,      // 持续循环（例如物理免疫之类)
            Buff_Active_Triger: 2     // 触发类型( 例如流血，回血之类)
        },

        TableBuffAniType: {
            NONE_PLAY: 0,
            ENCHANT_PLAY: 1,   // 加持播放
            TRIGGER_PLAY: 2    // 触发播放
        },

        // 施加类型
        TableBuffUseType: {
            Buff_Use_None: 0,
            Buff_Use_Good: 1,         // 有益buff
            Buff_Use_Bad: 2           // 减益buff
        },

        TableTalentTrigger: {
            TALENT_TRIGGER_NONE: -1,                       // 无触发类型

            TALENT_TRIGGER_ALL_FIGHT: 1,                   // 所有副本的全程战斗，针对自己
            //TALENT_TRIGGER_GEL_LIFE : 2,                    // 武将生存期
            TALENT_TRIGGER_EVERY_BODY: 3,                  // 副本全程战斗，针对我方全体
            TALETN_TRIGGER_MY_SELF_ATTRI: 4,               // 给自己加基础属性的


            //TALENT_TRIGGER_PVE_FIGHT : 2,                   // PVE副本的全程战斗
            //TALENT_TRIGGER_PVP_FIGHT : 3,                   // PVP副本的全程战斗
            //TALENT_TRIGGER_BEATTACKED_SKILL : 4,            // 受到技能攻击时
            TALENT_TRIGGER_BEATTACKED_DAMAGE: 5,           // 受到某种类型攻击时(hurt产生后)

            TALENT_TRIGGER_HIT: 6,                         // 某类攻击击中敌人时
            TALENT_TRIGGER_KILL: 7,                        // 击杀任意敌人时
            TALENT_TRIGGER_FRIEND_DEATH: 8,                // 队友死亡时
            TALENT_TRIGGER_SELF_DEATH: 9,                  // 自己死亡时

            TALENT_TRIGGER_RELEASE_SKILL_DAMAGE: 10,       // 释放伤害技能时(自动技、主动技、必杀技, -1为所有)

            TALENT_TRIGGER_BEATTACKED_DODGE: 11,           // 闪避敌方攻击时
            TALENT_TRIGGER_ATTACK_CRIT: 12,                // 自己的攻击产生暴击时
            //TALENT_TRIGGER_ATTACK_BEDODGE : 13,             // 攻击被敌方闪避时   done
            TALENT_TRIGGER_BEATTACKED_CRIT: 14,            // 被敌方暴击时  

            TALENT_TRIGGER_ATTACK_HURT_BEHIND: 15,         // 攻击产生hurt后(传具体hurt数值需要)(eg:嗜血)
            TALENT_TRIGGER_BEATTACKED_HURT_BEHIND: 16,     // 被攻击产生hurt后(传具体hurt数值需要)(eg:刃甲)
            //TALENT_TRIGGER_BEATTACKED_TARGET_HURT : 17,     // 被施加指向性hurt是有概率触发

            TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF: 18,      // 攻击者对处于某种buff中的敌人(给攻击者施加效果,需配额外参数，攻击型/防御型效果)
            TALENT_TRIGGER_ATTACK_SELF_IN_BUFF: 19,        // 攻击者处于某种buff中(给攻击者施加效果,需配额外参数，攻击型/防御型效果)
            TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF: 20,    // 被攻击者处于某种buff中(给被攻击者施加效果,需配额外参数，攻击型/防御型效果)

            //TALENT_TRIGGER_DOUBLE : 20,                   // 连击达到一定条件触发   

            TALENT_TRIGGER_RELEASE_SKILL_TYPE: 21,         // 释放技能区间（自动技、主动技、必杀技, -1为所有)
            TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW: 22,    // 释放技能区间(血量低于X%时)(eg：逆浪)
            TALENT_TRIGGER_ZIBAO: 23,                      // 自爆
            TALENT_TRIGGER_HUITIAN: 24,                    // 回天
            TALENT_TRIGGER_FUHUO: 25,                      // 复活
            TALENT_TRIGGER_YIJI: 26,                       // 遗计
            TALENT_TRIGGER_FUCHOU: 27,                     // 复仇
            TALENT_TRIGGER_FIGHT_APPEAR: 28,                // 战斗开始时入场触发
            TALENT_TRIGGER_SHIHUN: 29,                     // 噬魂(神兵技)
            TALENT_TRIGGER_AFTER_FUHUO: 30,                // 复活后触发
            //TALENT_TRIGGER_LONGHUN_FUHUO : 31,            // 龙魂复活
            TALENT_TRIGGER_BLOOD_LOW: 32,                  // 血量低于X%时
            TALENT_TRIGGER_AUTOMATIC_TIME: 33,             // 间隔多长时间自动触发

            TALENT_TRIGGER_FRIEND_BECRIT: 34,              // 队友被暴击时
            TALENT_TRIGGER_LOSE_BLOOD: 35,                 // 每损失N%生命
            TALENT_TRIGGER_HP_COMPARE_GREATER: 36,         // 属性大于目标时,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_HP_COMPARE_LESS: 37,            // 属性小于目标时,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_SELF_HP_GREATER: 38,            // 自己生命值大于XX,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_SELF_HP_LESS: 39,               // 自己生命值小于XX,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_TARGET_HP_GREATER: 40,          // 目标生命值大于XX,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_TARGET_HP_LESS: 41,             // 目标生命值小于XX,需配额外参数，攻击型/防御型效果
            TALENT_TRIGGER_WILL_DEAD: 42,                  // 将死时触发
            TALENT_TRIGGER_FIGHT_START: 43,                // 每次战斗一开始触发包含出场
            TALENT_TRIGGER_TOUCH_SUPPORT: 44,              // 触发援护时触发
            TALENT_TRIGGER_RESIST_BUFF: 45,                // 抵抗buff时触发
            TALENT_TRIGGER_ATTRI_COMPARE_GREATER: 46,      // XX属性大于具体数值时
            TALENT_TRIGGER_RELEASE_SKILL_FIRST: 47,        // 第一次释放技能时
            TALENT_TRIGGER_PULL_CD_ADD: 48,                // 拉条增加时
            TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER: 49,  // 属性高于敌方N%时
            TALENT_TRIGGER_ENEMY_RELEASE_SKILL_DAMAGE: 50, // 敌方释放技能时
            TALENT_TRIGGER_BUFF_HIT: 51,                   // buff命中目标时触发
            TALENT_TRIGGER_BEATTACKED_DAMAGE_BEFORE: 52,   // 受到某种类型攻击时(hurt产生前)
            TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM: 53, // 间隔多少次释放技能时触发
            TALENT_TRIGGER_FEIGN_DEATH: 54,                 // 假死时触发
            TALENT_TRIGGER_REVIVE_OTHER_PERSON: 55,        // 复活其他人时触发
            TALENT_TRIGGER_ENEMY_DEATH: 56,                // 敌人死亡时触发
            TALENT_TRIGGER_ENEMY_RELEASE_SUPPORT_SKILL: 57,// 敌人释放援护技时
            TALENT_TRIGGER_ENTER_WEEK: 58,                 // 进入虚弱时触发
            TALENT_TRIGGER_ENEMY_CD_REDUCE: 59,            // 敌方拉条时触发
        },

        //[[1到6是直接给相应的目标施加效果]]
        TableTalentEffect: {
            TALENT_EFFECT_NONE: -1,                        // 无效果
            TALENT_EFFECT_BASEVALUE_REDUCE: 1,             // 战斗中数值减少(TableTalentBaseValueType相关)
            TALENT_EFFECT_BASEVALUE_ADD: 2,                // 战斗中数值增加(TableTalentBaseValueType相关)
            TALENT_EFFECT_BASEVALUE_MIN: 3,                // 战斗中数值减少为零
            TALENT_EFFECT_BASEVALUE_MAX: 4,                // 战斗中数值加至上限

            TALENT_EFFECT_HURT_VALUE_ADD_HP: 5,            // 嗜血(受伤hurt数值的百分比转hp(可配施加者))
            TALENT_EFFECT_HURT_VALUE_REDUCE_HP: 6,         // 刃甲(受伤hurt数值的百分比减少hp(可配施加者))

            TALENT_EFFECT_ATTACK_DAMAGE_REDUCE: 7,         // 攻击造成的某种伤害减少
            TALENT_EFFECT_ATTACK_DAMAGE_ADD: 8,            // 攻击造成的某种伤害增加
            TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE: 9,     // 受到的某种伤害减少
            TALENT_EFFECT_BEATTACKED_DAMAGE_ADD: 10,       // 受到的某种伤害增加
            TALENT_EFFECT_CRIT_MAX: 11,                    // 必然暴击（暴击率变为100%）
            TALENT_EFFECT_HIT_MAX: 12,                     // 必然命中（命中率变为100%）
            TALENT_EFFECT_DODGE_DAMAGE: 13,                // 闪避敌方攻击
            TALENT_EFFECT_REDUCE_DEFENCE: 14,              // 减甲
            TALENT_EFFECT_BUFF_ADD: 15,                    // 施加各种buff
            TALENT_EFFECT_ATTRIBUTE_ADD: 16,               // 面板属性增加 (整体）
            TALENT_EFFECT_ATTRIBUTE_REDUCE: 17,            // 面板属性减少（整体）

            // 需要单独处理
            // 触发类型配击杀任意敌人时(TALENT_TRIGGER_KILL)
            TALENT_EFFECT_TUNSHI: 18,                      // 吞噬(每击杀一个敌人后获得该敌人生命上限X%的生命值)
            // 触发类型配被施加指向性hurt是有概率触发(TALENT_TRIGGER_BEATTACKED_TARGET_HURT)
            TALENT_EFFECT_TAOTUO: 19,                      // 逃脱(被施以指向性技能时有N%概率免除，X%概率造成施法者反噬受伤)

            // 触发类型配所有副本的全程战斗(TALENT_TRIGGER_ALL_FIGHT)
            TALENT_EFFECT_JILI: 20,                         // 激励（友方数量提供攻击力(给自己)）
            TALENT_EFFECT_LONGYUAN: 21,                    // 敌方数量提供攻击力(给自己)
            TALENT_EFFECT_POISON_DEEP: 22,                 // 中毒效果加深 (给自己)
            TALENT_EFFECT_FEISHE: 23,                      // 飞射(浮空效果加深(给自己))
            TALENT_EFFECT_GUIDAO: 24,                      // 疯魔(每损失x%的血，增加x%的伤害)
            TALENT_EFFECT_JIANTA: 25,                      // 践踏(对方血量少于N%时，造成的伤害增加X%)

            TALENT_EFFECT_PARTAKE: 27,                     // 分担伤害(为生命值最低的队友分担X%伤害值，伤害同时减免(或加深)X%)
            TALENT_EFFECT_GUSHOU: 28,                      // 固守(被攻击时有N%概率减免X%的连击附加伤害)
            TALENT_EFFECT_BUQU: 29,                        // 回天(每隔N秒可抵挡一次致死的伤害，并恢复X%生命)
            TALENT_EFFECT_ZHUIJI: 30,                      // 追击(攻击时有N%概率增加X%的连击附加伤害)
            TALENT_EFFECT_HP_ADD_BY_ATK: 32,               // 增加某个对象生命值，数值为某项攻击力的百分比。(1-物理攻击力,2-魔法攻击力)
            TALENT_EFFECT_HP_REDUCE_BY_ATK: 33,            // 减少某个对象生命值，数值为某项攻击力的百分比。(1-物理攻击力,2-魔法攻击力)
            TALETN_EFFECT_CRIT_HURT_ADD: 34,               // 暴击伤害值增加
            TALENT_EFFECT_CRIT_HURT_REDUCE: 35,            // 暴击伤害值减少
            TALENT_EFFECT_ZIBAO: 36,                       // 自爆
            TALENT_EFFECT_FUHUO: 37,                       // 复活
            TALENT_EFFECT_EMERGE_HURT_EFFECT: 38,          // 产生碰撞特效
            TALENT_EFFECT_MULTI_HURT: 39,                  // 会心(多倍伤害)
            TALENT_EFFECT_PERCENT_FINAL_ADD: 40,           // 终伤增加比
            TALENT_EFFECT_PERCENT_FINAL_REDUCE: 41,        // 终伤减少比
            TALENT_EFFECT_CHUANYANG: 42,                   // 穿杨(对方血量大于N%时，造成的伤害增加X%)
            //TALENT_EFFECT_POFA : 43,                        // 破法(对方目标法攻值大于自己)
            //TALENT_EFFECT_XIAOYAO : 44,                     // 逍遥(增加自身物理防御X%的法术攻击)
            TALENT_EFFECT_MEIHUO: 45,                      // 魅惑(每个男性武将增加X%的伤害)
            //TALENT_EFFECT_ATK_PROFESSION : 46,              // 针对职业造成的伤害增加或减少(参数：TableEnumProfession)
            //TALENT_EFFECT_BEATKED_PROFESSION : 47,          // 针对职业自身所受的伤害增加或减少(参数：TableEnumProfession)
            TALENT_EFFECT_ATK_ROW: 48,                     // 针对位置造成的伤害增加或减少(参数：1前排 2中排 3后排)
            TALENT_EFFECT_YANXING: 49,                     // 燕行(对浮空状态的敌人X%的伤害)
            TALENT_EFFECT_LEITING: 50,                     // 雷霆(使用技能时减少X%怒气消耗)
            TALENT_EFFECT_CHANGE_SKILL_LEVEL: 51,          // 改变技能等级(等级非百分比)
            TALENT_EFFECT_CHANGE_GET_RAGE: 52,             // 改变获得怒气百分比
            TALENT_EFFECT_CHANGE_RESERVE_RAGE: 53,         // 改变替补上场怒气(数值非百分比)
            TALENT_EFFECT_CHANGE_RESERVE_SUPPERTIME: 54,   // 改变替补上场无敌时间（数值非百分比)
            TALENT_EFFECT_AUTO_ADDHP: 55,                  // 每隔多长时间自动回自身血量x%的血
            TALENT_EFFECT_CHANGE_ENTRY_TIME: 56,            // 改变入场cd（数值非百分比)
            TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED: 57,// 提升攻击力(有最大次数限制)

            TALENT_EFFECT_ADD_IGNORE_RESIS: 58,            // 增加忽视异常抵抗效果（可配类型)
            TALENT_EFFECT_ADD_SELF_RESIST: 59,             // 增加自身异常抵抗概率
            TALENT_EFFECT_ADD_GAIN_TIME: 60,               // 受到增益时间
            TALENT_EFFECT_REDUCE_DEBUFF_TIME: 61,          // 受到debuff时间
            TALENT_EFFECT_CALL_MONSTER: 62,                // 召唤怪物

            TALENT_EFFECT_RPOTO_TO_ATK: 63,                // 战斗中附加防御（可配）N%的攻击
            TALENT_EFFECT_PROTO_TO_REALHURT: 64,           // 战斗中附加防御（可配）N%的真实伤害

            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_GROUP: 65,   // 目标是否是旅团成员提升伤害
            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FEATURE: 66, // 目标根据武将特性提升伤害
            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FACTION: 67, // 目标武将派系提升伤害
            TALENT_EFFECT_LIVING_PERSON: 68,               // 每个存活队友为自身增加XX(可配)
            TALENT_EFFECT_REBOUND_MYLOSTHP: 69,            // 反弹自身已损失生命值的N%的伤害
            TALENT_EFFECT_LOSTHP_ACTION_ABSORB: 70,        // 受到每段攻击最多损失N%生命
            TALENT_EFFECT_KILL_NO_REVIVE: 71,              // 杀死敌方后敌方不可复活
            TALENT_EFFECT_PROMOTE_BY_NUM_OF_BUFF: 72,      // 目标当前的每个BUFF提升自身N%攻击（可配）
            TALENT_EFFECT_IGNORE_TARGET_DEF: 73,           // 忽视敌方N%的防御值
            TALENT_EFFECT_ADDHURT_BY_TARGET_HP: 74,        // 增加目标生命值N%的伤害
            TALENT_EFFECT_WILL_DEAD: 75,                   // 濒死时阻止死亡，生命值变为1并无敌N秒(buff不清零)
            TALENT_EFFECT_SEC_KILL: 76,                    // 秒杀
            TALENT_EFFECT_LIVING_ENEMY_HURT: 77,           // 战场中每个敌人为自身技能增加N%伤害
            TALENT_EFFECT_DISTANCE_FAR_HURT: 78,           // 距离越远伤害越高（按站位增加N%伤害，如填10%，则对1号位附加10%额外伤害，2号位附加20%，3号位附加30% 等等）
            TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FACTION: 79,// 自己武将派系提升伤害
            TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE: 80,  // 根据当前战斗类型提升伤害
            TALENT_EFFECT_GRAB_BUFF: 81,                   // 抢夺目标的一个有益或减益buff给别人  
            TALENT_EFFECT_BELONG_GAIN_TIME: 82,            // 施加增益时间
            TALENT_EFFECT_BELONG_DEBUFF_TIME: 83,          // 施加debuff时间     
            TALENT_EFFECT_ATTRIBUTE_ADD_BASE: 84,          // 面板属性增加(基础）
            TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE: 85,       // 面板属性减少（基础）  
            TALENT_EFFECT_ATTRIBUTE_ADD_BASE_TIMELY: 86,   // 即时面板属性增加(基础）
            TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE_TIMELY: 87,// 即时面板属性减少（基础）  
            TALENT_EFFECT_ADDHURT_BY_TARGET_MAXHP: 88,     // 增加目标最大生命值N%的伤害
            TALENT_EFFECT_RANDOM_DISPEL_BUFF: 89,          // 随机驱散buff(extra 1有益 2减益)
            TALENT_EFFECT_ATTRI_DVALUE_PERCENT: 90,        // 属性差值百分比的伤害
            TALENT_EFFECT_ADD_RECOVER_VALUE: 91,           // 处于回血时回复量增加
            TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FEATURE: 92,// 根据（攻/防/辅) 提升伤害
            TALENT_EFFECT_REBOUND_MYDEFENCE: 93,           // 反弹自身防御值N%的伤害
            TALENT_EFFECT_ATTR_PROMOTE_BY_DIFF: 94,        // 每XX属性提升XX属性(需和触发时机46配合使用)
            TALENT_EFFECT_STEP_BUFF: 95,                   // 碰撞阶段性施加buff
            TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION: 96,// 根据xx派系的伤害
            TALENT_EFFECT_BUFF_CREATE_SHIELD: 97,          // 治疗buff产生护盾
            TALENT_EFFECT_PROMOTE_HURT_BYENEMYHPPER: 98,   // 敌方血量高于N%对其造成的伤害增加s%
            TALENT_EFFECT_CRITHURT_LIMIT: 99,              // 暴击伤害上限
            TALENT_EFFECT_REDUCE_CRIT_BY_ATTACK_GROUP: 100,   // 攻击者是否是旅团成员减少自身暴击
            TALENT_EFFECT_REDUCE_HURT_BY_ATTACK_GROUP: 101,   // 攻击者是否是旅团成员减少伤害
            TALENT_EFFECT_REDUCE_BOMB_TIME: 102,			// 减少自身施加的炸弹时间
            TALENT_EFFECT_ADD_BOMB_HURT: 103,				// 增加炸弹的伤害
            TALENT_EFFECT_REDUCE_GET_RAGE: 104,            // 降低获得怒气百分比
            TALENT_EFFECT_REDUCE_CONTINUE_DAMAGE: 105,     // 受到的持续伤害减少N%(中毒、灼烧)
            TALENT_EFFECT_IGNORE_DEF_LIMIT: 106,           // 被攻击方忽视防御的效果不超过N%
            TALENT_EFFECT_LOSEHP_CONVERT_ATK: 107,         // 每损失X点生命提升X点攻击
            TALENT_EFFECT_PROMOTE_BUFF_RECOVER_EFFECT: 108,// Buff施加者恢复效果提升
            TALENT_EFFECT_REVIVE_DEADPERSON: 109,          // 复活一个死亡角色(暂时用的随机) 
            TALENT_EFFECT_PERMANENT_DAMAGE_HP: 110,        // 永久损伤HP
            TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_ADD: 111,// 比较属性关联伤害(属性高伤害增加)
            TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_REDUCE: 112, // 比较属性关联伤害(属性高伤害减少)    
            TALENT_EFFECT_WILL_DEAD2: 113,                 // 濒死时阻止死亡，生命值变为1并无敌N秒(有害buff清零,有益buff不清零)
            TALENT_EFFECT_STEAL_HP_RECOVER: 114,           // 偷取生命数值最高的一名敌人剩余生命的N%给我方生命值最低的队友
            TALENT_EFFECT_BUFF_INFINITIZE: 115,            // 施加buff不受1秒暂停的影响
            TALENT_EFFECT_RAGE_TO_HURT: 116,               // 敌方每点怒气增加自身对其N%的伤害
            TALENT_EFFECT_HP_COMPARETO_ENEMY: 117,         // 生命值低于敌方任意一人时,受到伤害减免N%
            TALENT_EFFECT_REDUCE_IGNORE_DEF_VALUE: 118,    // 受到的忽视防御效果(所有减防御的效果，破甲、忽视防御)减少N%
            TALENT_EFFECT_REDUCE_REAL_HURT: 119,           // 真实伤害减免
            TALENT_EFFECT_INGORE_CRIF_DEF: 120,            // 忽视敌方N%暴击抵抗
            TALENT_EFFECT_REBOUND_HURT: 121,               // 反弹伤害
            TALENT_EFFECT_REDUCE_HURT_BY_ATTACKER_FEATURE: 122, // 受到(攻/防/辅)猎人伤害降低多少
            TALENT_EFFECT_PURGE_TRANTO_RECOVER: 123,       // 净化消除转回复
            TALENT_EFFECT_HP_AVERAGE: 124,                 // 我方全体血量按百分比分配
            TALENT_EFFECT_SUCKHP_TRANTO_SHIELD: 125,       // 吸血溢出转护盾
            TALENT_EFFECT_DISPEL_ADD_HURT: 126,             // 驱散加伤害
            TALENT_EFFECT_LOSTHP_TRANTO_HURT: 127,         // 已损失生命值转hurt
            TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT: 128, // 每损失XX生命,伤害减免(备注:XX为effect_extra)
            TALENT_EFFECT_LOSTHP_CONVERT_ADD_PROTO: 129,   // 每损失XX生命,提升YY非基础属性ZZ%(备注:XX为effect_extra,YY为effect_param,ZZ为effect_value)
            TALENT_EFFECT_BEINBUFF_IGNORE_HURT: 130,       // 处于xxbuff中受到伤害减免N%(备注:XX为effect_extra3,可配数组)
            TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE: 131,// 提升属性根据副本类型可叠加
            TALENT_EFFECT_DISPEL_USEFUL_TO_POISON: 132,    // 驱散有益buff转中毒(参照123)
            TALENT_EFFECT_SELF_LOSE_HP_TO_HURT: 133,       // 对敌方造成攻击者自身已损失生命N%的伤害
            TALENT_EFFECT_BUFF_EFFECT_PRO: 134,            // Buff效果提升
            TALENT_EFFECT_REDUCE_ALL_HURT: 135,            // 减少所有伤害
            TALENT_EFFECT_HURT_VALUE_ADD_HP2: 136,         // 嗜血2(受伤hurt数值的百分比转hp(可配施加者), 不受回复加成影响)
            TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION: 137,  // 受到xx派系的所有伤害提升(与96对应)
            TALENT_EFFECT_REDUCE_CDRED_EFFECT: 138,        // 降低cd减少效果
            TALENT_EFFECT_HIT_CUTMYHP_TO_DAMAGE: 139,      // 击中别人时减少自己N%hp,对别人造成N%的X倍数的伤害, 低于Z%上限则掉到1血(备注:X为effect_value, N为effect_param, Z为effect_extra)
            TALENT_EFFECT_PRO_ATKER_ALL_DAMAGE: 140,       // 提高攻击者所有的伤害
            TALENT_EFFECT_CANNOT_GRAB_BUFF: 141,           // 不可被别人偷取buff
            TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE: 142,  // 降低被攻击者所有的伤害(降低N%*减伤系数的伤害,减伤系数=伤害来源攻击/(被攻击者攻击+伤害来源攻击 ))
            TALENT_EFFECT_CUT_CD_AND_REL_SKILL: 143,       // 清空自身cd并释放技能
            TALENT_EFFECT_IGNORE_TARGET_INJURY: 144,        // 攻击敌方时忽视目标减伤
            TALENT_EFFECT_PRO_ALL_HURT_BY_TARGET_POS: 146  // 根据敌方玩家位置提高所有伤害(effect_extra为1号位或2号位或3号位或4号位)
        },

        TableTalentBaseValueType: {
            TALENT_BASEVALUE_NONE: 0,
            TALENT_BASEVALUE_HP: 1,    // 目标基础数值血量相关(百分比)
            TALENT_BASEVALUE_RAGE: 2,  // 基础数值怒气相关(数值）
            TALENT_BASEVALUE_CD: 3,    // 基础数值cd相关（数值）
            TALENT_BASEVALUE_HELP_CD: 4,  // 援护cd相关（数值）
            TALENT_PERCENT_CD: 5,      // cd相关(百分比)
            TALENT_LOSS_BLOOD: 6,      // 损失血量相关
            TALENT_BRING_ROLE_HP: 7,    // 施加者数值血量相关(百分比)
            TALENT_BASEVALUE_HP_SPECIAL: 8 // 目标基础数值血量相关(百分比),减血不受天赋的影响
        },

        TableRoleBaseAttribute: {
            BASE_ATTR_NONE: 0,
            BASE_ATTR_PHY_ATK: 1,      // 攻击力       atk
            BASE_ATTR_PHY_DEF: 2,      // 防御力       def
            BASE_ATTR_HTV: 3,          // 效果命中     htv
            BASE_ATTR_EVA: 4,          // 效果抵抗     eva

            BASE_ATTR_IGNORE_DEF: 6,   // 忽视防御     redef
            BASE_ATTR_PHY_CRIT: 7,     // 暴击率      crit
            BASE_ATTR_CRIT_EXTRA: 8,   // 暴击伤害     csd
            BASE_ATTR_CRIT_DEF: 10,    // 暴击抵抗     ctr               
            BASE_ATTR_HIT_RATE: 11,    // 忽视格挡     ibl
            BASE_ATTR_DODGE_RATE: 12,  // 格挡率       blr
            BASE_ATTR_SPEED: 13,       // 速度        spd
            BASE_ATTR_HP: 20,          // hp          hp
            BASE_ATTR_UNIL_RESIS: 21,  // 通用抵抗      unr
            BASE_ATTR_IGNORE_RESIS: 22,// 忽视抵抗      inr
            BASE_ATTR_FLOAT_RESIS: 23, // 浮空抵抗      flr
            BASE_ATTR_CUR_HP: 24       // 当前hp
        },

        TableTalentAppearTime: {
            TALENT_APPEAR_NONE: -1,
            TALENT_APPEAR_TRIGGER: 1,  // 特定时机触发
            TALENT_APPEAR_COME: 2      // 入场触发
        },

        TableTalentCondition: {
            TALENT_CONDITION_NONE: -1,
            TALENT_CONDITION_ATK: 1,
            TALETN_CONDITION_BEATKED: 2,
        },

        TableShelterState: {
            SHELTER_STATE_NONE: 0,
            SHELTER_STATE_PROTECT: 1,
            SHELTER_STATE_HURT: 2,
            SHELTER_STATE_BREAK: 3,
            SHELTER_STATE_RECOVER: 4
        },

        TableAiLimitTerm: {
            AI_LIMIT_NONE: 0,  // 无任何限制
            AI_LIMIT_DELAY: 1, // 间隔时间
            AI_LIMIT_BLOOD: 2  // 血量
        },

        TableRoleUpPosType: {
            TYPE_NONE: 0,
            TYPE_CRIT: 1,
            TYPE_PRESS_SKILL: 2,
            TYPE_PRESS_BUFF: 3,
            TYPE_PRESS_DODGE: 4,
            TYPE_REC_HP: 5,
            TYPE_PRESS_TALENT: 6,
            TYPE_BREAK: 7,
            TYPE_IMMUNE: 8,
            TYPE_RESIST: 9
        },

        TableEnumDir: {
            Dir_None: -1,
            Dir_Right: 0,
            Dir_Left: 1,
            Dir_Up: 2,
            Dir_Down: 3,
            Dir_Down2: 4,
            Dir_Right2: 5,
            Dir_Mid: 6
        },

        EnumDepthDir: {
            Dir_None: -1,
            Dir_Left_Up: 1,
            Dir_Left_Down: 2,
            Dir_Right_Up: 3,
            Dir_Right_Down: 4,
            Dir_Down: 5,
            Dir_Up: 6,
            Dir_Left: 7,
            Dir_Right: 8
        },

        TableTouchType: {
            TOUCH_TYPE_NONE: 0,
            TOUCH_TYPE_DOWN: 1,
            TOUCH_TYPE_MOVE: 2,
            TOUCH_TYPE_UP: 3
        },

        TableEnumSkillConsume: {
            CONSUME_TYPE_NONE: 0,
            CONSUME_TYPE_MP: 1,
            CONSUME_TYPE_HP: 2,
        },

        TableEnumBaseState: {
            //State_Back : 0,
            State_None: 1,
            State_Walk: 2,
            State_Sprint: 3 		//冲刺
        },


        TableEnumSpecialState: {
            SpecialState_None: 0,
            SpecialState_GetUp_Super: 1,	//起身无敌状态，可以被霸体终结
            SpecialState_NoBreak: 2,		//霸体状态，不被打断
            SpecialState_Super: 3 			//无敌状态，不受伤害
        },

        TableEnumActionFlash: {
            Flash_None: 0,
            Flash_LastPos: 1,          // 上一次行为 
            Flash_Origin: 2,           // 原始的(进场位置)   
            Flash_Local: 3,            // 本地(现在在什么位置，就从什么位置开始)
            Flash_DetailPos: 4,        // 特定位置(需要表里配相应位置)
            Flash_Target: 5            // 指定目标(指定目标，依据effect的目标)
        },

        TableEnumOtherState: {
            OtherState_None: -1,
            OtherState_Appear: 0,      //出场
            OtherState_Stand: 1,       //待机
            OtherState_Run: 2,         //跑
            OtherState_Sprint: 3,      //冲刺
            OtherState_Jump: 4,        //跳
            OtherState_JumpUp: 5,      //上跳
            OtherState_JumpMid: 6,     //上跳
            OtherState_JumpDown: 7,    //上跳
            OtherState_Hurt: 8,        //受伤
            OtherState_Hurt_Heavy: 9,	//受伤重
            OtherState_Float_FallDown: 10, // 浮空倒地
            OtherState_StirUp: 11,	    //击飞上升
            OtherState_StirDown: 12,   //击飞下落
            OtherState_FallDown: 13,   //倒地
            OtherState_Die: 14,        //死亡
            OtherState_GetUp: 15,      //起身
            OtherState_Weak: 16,       //虚弱
            OtherState_Win: 17,        //胜利
            OtherState_Static: 18,     //静止
            OtherState_Parry: 19,      //格挡
            OtherState_EnterWeek: 20,  //进入虚弱
            OtherState_Weeking: 21,    //虚弱中
            OtherState_ExitWeek: 22,   //退出虚弱
            OtherState_Attack: 25,     //攻击   

            OtherState_FightShowAtk: 101,     // 战斗演示攻打
            OtherState_FightShowBeAtk: 102,   // 战斗演示被打
            // 暂时无
            OtherState_Curve: 17    //复活
        },

        //hhh
        TableActionPriority: {
            [0]: { priority: 999999 },
            [1]: { priority: 2 },
            [2]: { priority: 4 },
            [3]: { priority: 2 },
            [4]: { priority: 2 },
            [5]: { priority: 2 },
            [6]: { priority: 2 },
            [7]: { priority: 2 },
            [8]: { priority: 2 },
            [9]: { priority: 2 },
            [10]: { priority: 2 },
            [11]: { priority: 2 },
            [12]: { priority: 2 },
            [13]: { priority: 2 },
            [14]: { priority: 2 },
            [15]: { priority: 2 },
            [16]: { priority: 2 },
            [17]: { priority: 2 },
            [18]: { priority: 2 },
            [25]: { priority: 2 },
            [19]: { priority: 999999 }
        },

        //hhh
        TableHunterRoleAniName: {
            [0]: "0000_chuchang",
            [1]: "0001_daiji",
            [2]: "0002_pao",
            [3]: "0003_chongci",
            [4]: "0004_tiao",
            [5]: "0005_tiaoyueshang",
            [6]: "0006_tiaoyuezhong",
            [7]: "0007_tiaoyuexia",
            [8]: "0008_shouji1",
            [9]: "0009_shouji2",
            [10]: "0010_fukongdaodi",
            [11]: "0011_jifeishangsheng",
            [12]: "0012_jifeixialuo",
            [13]: "0013_daodi",
            [14]: "0014_siwang",
            [15]: "0015_daodiqishen",
            [16]: "0016_xuruo",
            [17]: "0017_shengli",
            [18]: "0018_dingshen",
            [25]: "0025_gongji1"
        },

        TableEnumDebuffState: {
            DEBUFF_NONE: 0,		//无buff
            DEBUFF_ICE: 1,			//冰冻
            DEBUFF_RAIN: 2,		//酸雨
            DEBUFF_BLOOD: 3,		//吸血
            DEBUFF_MAX_NUM: 3 		//debuff数量
        },


        TableEnumNumLayout: {
            Layout_Down_Up: 0,		//字下数上
            Layout_Up_Down: 1,		//字上数下
            Layout_Left_Right: 2,	//字左数右
            Layout_Right_Left: 3,	//字右数左
            Layout_SPURTING: 4,    //溅射(字上，数字溅射)
            Layout_HIT_HALT: 5,    //击打停顿
            Layout_SHIFT: 6,       //整体平移
            Layout_Left_Right_Short: 7,	//字左数右(怒气提示文本试用)
            Layout_Layout_New: 8   //新样式
        },

        // 人物继承用的分类
        TableEnumRoleType: {
            ROLE_TYPE_NONE: 0,		// none
            ROLE_TYPE_GENERAL: 1,	// 武将
            ROLE_TYPE_MOB: 2,		// 怪物
            ROLE_TYPE_BOSS: 3,		// Boss
            ROLE_TYPE_CALL: 4,		// 召唤怪物
            ROLE_TYPE_HELP: 5,     // 援助武将
            ROLE_TYPE_LOCAL: 6,    // 本地武将
            ROLE_TYPE_LOCAL_HELP: 7  // 本地援护武将
        },

        TableEnumSex: {
            SEX_Unknown: 0,
            SEX_MALE: 1,           // 男性
            SEX_FEMALE: 2,         // 女性
            SEX_MA: 3
        },

        //
        TableEnumFromClassify: {
            TYPE_NONE: 0,			// 未知形态
            TYPE_PERSON: 1,		// 人物形态
            TYPE_ENEMY: 2,			// 小兵形态
            TYPE_ELITE: 3,         // 精英敌人
            TYPE_BOSS: 4,			// Boss敌人形态
            TYPE_CALL: 5           // 召唤形态
            // todo
        },

        TableEnumOperate: {
            Operate_DoubleTouch: -3,	//双击
            Operate_UpSlide: -2,		//上滑
            Operate_None: -1,			//无操作
            Operate_SingleTouch: 0,	//单击
            Operate_FrontSlide: 1,		//前滑
            Operate_BackSlide: 2,		//后滑
            Operate_JumpTouch: 3,		//空中单击
            Operate_SprintTouch: 4,	//冲刺单击
            Operate_DownSlide: 5,		//下滑
            Operate_JumpDownSlide: 6 	//空中下滑
        },

        TableEnumLayerId: {
            LAYER_NONE: 0,
            LAYER_LOGIN: 1,
            LAYER_CITY: 2,
            LAYER_FIGHT: 3,
            LAYER_LEAGUE: 4,
            LAYER_LEAGUE_FIGHT: 5,
            LAYER_WONDERLAND: 6,
            LAYER_ZORKBOSS: 7,
            LAYER_ZORK: 8,
            LAYER_DARKLAND: 9,
            LAYER_MAX: 10
        },

        TableEnumReportSkipType: {
            REPORT_SKIP_NONE: 0,
            REPORT_SKIP_FIGHT: 1,          // 从战斗进重播
            REPORT_SKIP_MAIL: 2,           // 从邮件进重播
            REPORT_SKIP_CHAT: 3,           // 从聊天进重播
            REPORT_SKIP_MINE: 4,           // 从挖矿进重播
            REPORT_SKIP_ARENA: 5,          // 从演武进重播
            REPORT_SKIP_LEAGUE: 6,         // 从联盟进重播
            REPORT_SKIP_ENEMY: 7           // 从山洞进重播
        },

        // 本地战斗类型，与服务器的BattleType不重合
        TableEnumFightType: {
            // local
            FIGHT_TYPE_NONE: 0,		    // 无任何类型
            FIGHT_TYPE_TEACH: 1001,        // 教学
            FIGHT_TYPE_REPLAY: 1002,       // 重播    

            // 暂时没加
            FIGHT_TYPE_WORLD_BOSS: 1003,   // 世界boss
            FIGHT_TYPE_UNION_BOSS: 1003,   // 联盟boss
            FIGHT_TYPE_REAL_PK: 1004,      // 实时pk
            FIGHT_TYPE_GAOJI_WANTED: 1005, // 高级流星街（特殊处理）
            FIGHT_TYPE_GAOJI_ADVENTURE: 1006  // 高级冒险副本(特殊处理)
        },

        TableEnumCommonCosume: {
            CONSUME_TYPE_NONE: 0,
            CONSUME_TYPE_RAGE: 1,
            CONSUME_TYPE_HP: 2
        },

        TableEnumFightTip: {
            TIP_NONE: 0,
            TIP_CD: 1,
            TIP_RAGE: 2,
            TIP_MP: 0
        },

        TableEnumBloodEffectState:
        {
            kBloodEffectStateGoOut: 0,
            kBloodEffectStateGoTarget: 1
        },

        TableEnumGoCityType:
        {
            Go_City_Unkonwn: -1,
            Go_City_None: 0,
            Go_City_From_Battle: 1,
            Go_City_From_Door: 2,
            Go_City_From_Tower: 3,
            Go_City_From_TeachBattle: 4,
            Go_City_From_WorldMap: 5,
            Go_City_Num: 6
        },

        TableEnumGoBattleType:
        {
            Go_Battle_Unkonwn: -1,
            Go_Battle_None: 0,
            Go_Battle_From_City: 1,
            Go_Battle_From_Door: 2,
            Go_Battle_Num: 3
        },

        TableSceneState: {
            SCENE_STATE_NONE: -1, // 无任何状态
            SCENE_STATE_INIT: 0,  // 初始状态
            SCENE_STATE_APPEAR: 1,  // 出场状态
            SCENE_STATE_WALK: 2,  // 跑步遇敌状态
            SCENE_STATE_DIALOG: 3,  // 对话切入状态
            SCENE_STATE_CHANGE: 4,  // 模糊切换状态
            SCENE_STATE_SCALE: 5,  // 场景缩放
            SCENE_STATE_FIGHT_RULE: 6,  // 战斗开始之前说明
            SCENE_STATE_FIGHT_START: 7,  // 战斗开始状态
            SCENE_STATE_FIGHT_GODDESS: 8,  // 军事施法
            SCENE_STATE_FIGHT: 9,  // 战斗状态
            SCENE_STATE_SETTLE: 10, // 战斗结算状态
            SCENE_STATE_FIGHT_WAIT: 11,  // 等待阶段
            SCENE_STATE_FIGHT_WEEK_SETTLE: 12 // 虚弱结算状态
        },

        TableFightSceneState: {
            FIGHT_SCENE_NONE: 0,
            FIGHT_SCENE_SCALE_IN: 1,
            FIGHT_SCENE_SCALE_OUT: 2,
        },

        TableMonsterStage: {
            MONSTER_STAGE_NONE: 0,
            MONSTER_STAGE_APPEAR: 1,
            MONSTER_STAGE_A: 1,        // 普通副本的关卡A阶段
            MONSTER_STAGE_B: 2         // 普通副本的关卡B阶段
        },

        TableStageState: {
            STAGE_STATE_NONE: 0,
            STAGE_STATE_1ST: 1,        // 第一阶段
            STAGE_STATE_2ND: 2,        // 第二阶段
            STAGE_STATE_3RD: 3,
            STAGE_STATE_4TH: 4,
            STAGE_STATE_5TH: 5
        },

        TableDialogStage: {
            DIALOG_STAGE_NONE: 0,      // none
            DIALOG_STAGE_1ST: 1,       // 对话第一阶段(刚入场，可能有对话武将)
            DIALOG_STAGE_2ND: 2,       // 对话第二阶段(遇到第一批怪时)
            DIALOG_STAGE_3RD: 3,       // 对话第三阶段(打赢第一场怪时说话)
            DIALOG_STAGE_4TH: 4,       // 对话第四阶段(遇到第二批怪时)
            DIALOG_STAGE_5TH: 5        // 对话第五阶段(打赢第二批怪时说话)
        },

        TableRunStage: {
            STAGE_NONE: 0,
            STAGE_RUN_ONE: 1,
            STAGE_RUN_TWO: 2,
            STAGE_RUN_END: 3
        },

        TableEnumGoddessState: {
            GODDESS_STATE_NONE: 0,
            GODDESS_STATE_DOBUFF: 1,
            GODDESS_STATE_END: 2
        },

        TableIconListState: {
            GENERAL: 1,
            LEAGUE: 2
        },

        TableIconItemState: {
            DEFAULT: 1,
            EXTRA: 2
        },

        TableGetSingleType: {
            DEFAULT: 1,
            GENERAL: 2
        },

        ETransType: {
            JUSTLOGIN: 1,
            CHGE2CITY: 2,
            CHGE2BATTLE: 3
        },

        EnumFormatError: {
            FORMAT_ERROR_NONE: 0,
            FORMAT_ERROR_EMPTY: 1,
            FORMAT_ERROR_NOMAIN: 2,
            FORMAT_ERROR_ILLEGAL: 3,
            FORMAT_ERROR_MAIN_EMPTY: 4,
            FORMAT_ERROR_GEL_DEAD: 5,
            FORMAT_ERROR_MAX: 6
        },

        EnumFormatMoveType: {
            MOVE: 1,
            EXCHANGE: 2,
            CLICK: 3,
            ANI_CLICK: 4
        },

        EnumHelpState: {
            HELP_STATE_NONE: 0,
            HELP_STATE_START: 1,
            HELP_STATE_APPEAR: 2,
            HELP_STATE_ATTACK: 3,
            HELP_STATE_DISAPPEAR: 4,
            HELP_STATE_END: 5,
            HELP_STATE_MAX: 6
        },

        // 武将成长相关
        EnumGelAttrib: {
            ATTR_NONE: 0,
            ATTR_HP: 1,                // 生命值
            ATTR_PHY_ATK: 2,           // 攻击
            ATTR_PHY_DEF: 3,           // 防御
            ATTR_HTV: 4,               // 效果命中
            ATTR_EVA: 5,               // 效果抵抗
            ATTR_PHY_CRIT: 6,          // 暴击率
            ATTR_SKILL_CRIT: 7,        // 魔法暴击(废弃)
            ATTR_CRIT_EXTRA: 8,        // 暴击伤害
            ATTR_CRIT_RESIS: 9,        // 暴击抵抗
            ATTR_DODGE_RATE: 10,       // 格挡率
            ATTR_HIT_RATE: 11,         // 忽视格挡
            ATTR_IGNORE_PHYDEF: 12,    // 忽视防御
            ATTR_IGNORE_MAGICDEF: 13,  // 忽视魔防(废弃)
            ATTR_FINAL_EXTRA: 14,      // 终伤增加(废弃)
            ATTR_FINAL_REDUCE: 15,     // 终伤减少(废弃)
            ATTR_RAGE_REDUCE: 16,      // 怒气减少
            ATTR_ATK_ALL: 17,          // 基础攻击(废弃)
            ATTR_DEF_ALL: 18,          // 基础防御(废弃)
            ATTR_CRIT_ALL: 19,         // 基础暴击(废弃)
            ATTR_IGNORE_ALL: 20,       // 忽视防御
            ATTR_UNIL_RESIS: 21,       // 通用抵抗
            ATTR_IGNORE_RESIS: 22,     // 忽视抵抗 
            ATTR_FLOAT_RESIS: 23,      // 浮空抵抗
            ATTR_CD_SPEED: 24,         // 速度
            ATTR_SUPPORT_CONSUME: 25,  // 作为援护怒气消耗值

            ATTR_MAX: 26
        },

        EnumAttriShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 23, 24, 25],
        EnumAttriReal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25],

        EnumHunterAttriReal: [1, 2, 3, 4, 5, 6, 8, 10, 9, 24],
        EnumHunterAttriShow: [1, 2, 3, 24, 6, 8, 10, 5, 4, 9],
        EnumHunterAttriShowFloat: {
            [24]: true,
            [9]: true,
            [6]: true,
            [8]: true,
            [5]: true,
            [4]: true
        },
        EnumHunterAttriShow2: [1, 2, 3, 8],
        EnumHunterAttriShow3: [1, 2, 3, 24],

        EnumHunterAttriPercent: [6, 8, 10, 11, 12, 16, 21, 22, 23],

        //hhh
        EnumPowerRatio: {
            [1]: 0.3,
            [2]: 4,      // 物理攻击
            [3]: 3,      // 物理防御
            [4]: 3,      // 效果命中
            [5]: 4,      // 效果抵抗
            [6]: 5,      // 物理暴击
            [7]: 5,      // 魔法暴击
            [8]: 1,      // 暴击加成
            [9]: 5,      // 暴击抵抗
            [10]: 5,     // 闪避
            [11]: 5,     // 命中
            [12]: 4,     // 忽视物防
            [13]: 3,     // 忽视魔防
            [14]: 4.4,   // 终伤增加
            [15]: 3.3,   // 终伤减少
            [16]: 0,     // 怒气减少
            [17]: 0,     // 基础攻击
            [18]: 0,     // 基础防御
            [19]: 0,     // 基础暴击
            [20]: 0,     // 忽视防御
            [21]: 0,     // 通用抵抗
            [22]: 0,     // 忽视抵抗
            [23]: 0      // 浮空抵抗
        },

        EnumCarve: {
            CARVE_NONE: 0,
            CARVE_A: 1,    // 一元印
            CARVE_B: 2,    // 两仪印
            CARVE_C: 3,    // 三才印

            CARVE_D: 4,    // 四象印
            CARVE_E: 5,    // 五行印
            CARVE_F: 6,    // 六合印
            CARVE_G: 7,    // 七星印
            CARVE_H: 8,    // 八卦印
            CARVE_I: 9,    // 九宫印
            CARVE_J: 10,   // 十方印

            CARVE_K: 11,   // 百戈印
            CARVE_L: 12,   // 千钧印

            CARVE_MAX: 13
        },

        EnumEquipPos: {
            Pos_None: 0,
            Pos_Weapon: 1, // 武器
            Pos_Clothes: 2,// 衣服
            Pos_Shoes: 3,  // 鞋子
            Pos_Hat: 4,    // 帽子
            Pos_Jade: 5,   // 玉佩
            Pos_Horse: 6   // 战马
        },

        EnumCarveIndex: {
            CARVE_0: 0,
            CARVE_1: 1,
            CARVE_2: 2,
            CARVE_3: 3,
            CARVE_4: 4,
            CARVE_5: 5,
            CARVE_6: 6
        },

        BuildType: {
            // openfun没有配开启等级
            //    Build_Type_Message : -3,   // 消息
            Build_Type_Tavern: -1,   // 酒馆

            Build_Type_None: 0,
            // openfun有配开启等级
            Build_Type_League: 1,    // 帮会
            Build_Type_Arena: 2,    // 竞技场
            Build_Type_Mine: 3,    // 矿洞
            Build_Type_Worship: 4,   // 仙境（原访仙）
            Build_Type_Tower: 5,    // 爬塔
            Build_Type_Bastille: 6,    // 伏牛寨
            Build_Type_Arrest: 7,    // 通缉令
            Build_Type_Mall: 26,   // 商铺
            Build_Type_Jade: 40,   // 玉石坊
            Build_Type_Zork: 45,   // 魔域
            Build_Type_DarkLand: 46    // 黑暗大陆
        },

        LeagueBuildType: {
            League_Build_None: 0,
            League_Build_Dating: 1,   // 帮会建筑大厅
            League_Build_Chuansong: 2,// 战斗传送门
            League_Build_Kaozhu: 3,   // 烤猪
            League_Build_Zhangfang: 4,// 账房
            League_Build_Yishouge: 5, // 异兽阁
            League_Build_Shop: 6,     // 商铺
            League_Build_Notice: 7,   // 公告
            League_Build_Fish: 8,     // 钓鱼
            League_Build_Instance: 9, // 帮会副本
            League_Build_War: 10,     // 帮会战
            League_Build_Chest: 11,   // 宝箱
            League_Build_Convert: 12  // 游侠
        },

        ZorkBuildType: {
            Zork_Build_None: 0,
            Zork_Build_Altar: 31,      // 魔域祭坛
            Zork_Build_Boss: 32,       // 魔域boss  
            Zork_Build_Shop: 33,       // 魔域商铺 
            Zork_Build_Convert: 34     // 魔域游侠
        },

        EnumAnalyseResult: {
            RESULT_NONE: 0,                        // 无
            RESULT_FORMAT: 1,                      // 上阵武将数量不足(自己有武将 上阵不足) (提示战斗中去上阵）
            RESULT_VISIT: 2,                       // 上阵武将数量不足（自己没武将 上阵不足） （去酒馆）
            RESULT_CARD_NUM: 3,                    // 卡片数量不足
            RESULT_CARD_LEVEL: 4,                  // 卡片等级不足
            RESULT_UPGRADE_GENERAL_LEVEL: 5,       // 武将等级不足
            RESULT_UPGRADE_GENERAL_STAR: 6,        // 武将星级不足
            RESULT_UPGRADE_GENERAL_STEP: 7,        // 武将品阶不足
            RESULT_UPGRADE_SKILLS: 8,              // 武将技能等级不足
            RESULT_UPGRADE_ADVISER: 9,             // 念兽升级
            RESULT_MAX: 10                         // max
        },

        EnumGelAttribName: [
            "general_hp",
            "general_atk",
            "general_def",
            "skill_atk",
            "skill_def",
            "atk_crit",
            "skill_crit",
            "crit_extra",
            "crit_resistance",
            "dodge_rate",
            "hit_rate",
            "ignore_phyDef",
            "ignore_magicDef",
            "final_extra",
            "final_reduce",
            "rage_reduce",
            "general_atk_all",
            "general_def_all",
            "all_crit",
            "ignore_def_all",
            "universal_resistance",
            "ignore_resistance",
            "float_resistance",
            "cd_speed",
            "support_consume"
        ],

        TableArtSkillId: [0, 1, 1, 2, 3, 4, 5],
        TableSoulSkillId: [0, 2, 2, 3, 4, 5, 6],
        TableGasSkillId: [0, 2, 2, 3, 4, 5, 6],

        TableFightNoPress: ["ccbResources/ani_fight/lusu_eff.ExportJson", "ccbResources/ani_fight/bishaji_eff.ExportJson", "ccbResources/ani_fight/yuanzhu_eff.ExportJson", "ccbResources/ani_fight/lusu_beijing_eff.ExportJson", "ccbResources/ani_fight/lvbu_beijing.ExportJson"],

        EnumBookType: {
            ALL: 1,//全部
            A: 2,  //甲
            B: 3,  //乙
            C: 4,  //丙
            D: 5   //丁
        },

        EnumBookQuality: {
            [1]: [1, 2, 3, 4], //全部
            [2]: [4],       //甲
            [3]: [3],       //乙
            [4]: [2],       //丙
            [5]: [1]        //丁
        },
        TableEnumPetOtherState: {
            OtherState_Stand: 0,      //待机
            OtherState_Run: 1,        //跑
            OtherState_Skill: 2,      //技能
            OtherState_Cry: 0,        //哭
        },
        EnumBookQuality2: {
            [1]: [4, 3, 2, 1], //全部
            [2]: [4],       //甲
            [3]: [3],       //乙
            [4]: [2],       //丙
            [5]: [1]        //丁
        },

        EnumDailyLive: {
            unOpened: 0,
            unfinished: 1,
            finished: 2,
            rewarded: 3
        },

        EnumHeroEquip: {
            strenthen: 1,
            forge: 2,
            carve: 3
        },

        EnumHero: {
            LIST: 1,
            INFO: 2,

            ROLE: 1,
            SKILL: 2,
            EQUIP: 3,
            TALENT: 4
        },

        EnumTalkNpcId: {
            TAVERN1: 1,
            TAVERN2: 2,
            BASTILLE1: 3,
            BASTILLE2: 4,
            MALL1: 5,
            MALL2: 6,
            ARENA: 7,
            LEAGUE: 8,
            WORSHIP: 9,
            TRAIN: 10,
            WANTED: 11,
            RUNES: 12,
            GROUPFIGHT: 13
        },

        Enum: {
            Mall: {
                NORMAL: 1,
                ARENA: 2,
                LEAGUE: 3,
                HONOR: 4,
                LOTTERY: 5,
                MATCH: 6,


                //    CONTEND : 5,
                //    SECRET : 6,
                //    LOTTERY : 7,
                //    DEMON  : 8,

                [1]: message.EMallType.MALL_TYPE_ORDINARY, //普通
                [2]: message.EMallType.MALL_TYPE_LADDER,   //演武      
                [3]: message.EMallType.MALL_TYPE_LEAGUE,   //帮会
                [4]: message.EMallType.MALL_TYPE_HONOR,   //荣誉
                [5]: message.EMallType.MALL_TYPE_LOTTERY,  //酒馆
                [6]: message.EMallType.MALL_TYPE_LEAGUE_SCORE // 战功商店

                //    [5] : EMallType.MALL_TYPE_CONTEND,  //争霸
                //    [6] : EMallType.MALL_TYPE_MYSTERIOUS,//神秘
                //    [7] : EMallType.MALL_TYPE_LOTTERY,  //如意
                //    [8] : EMallType.MALL_TYPE_DEMON,    //魔域
            },

            PropTag: {
                Hero: "general_exp",
                Talent: "talent_exp"
            },
            PortNpc: {
                SafeLine: 1040, // 安全区域安全线
                SafeUp: 1041, // 安全区域上障碍
                SafeDown: 1042, // 安全区域下障碍
                SafeUp2: 1043, // 安全区域上障碍2
            },
            // 活动Boss npc
            ActivityNpc: {
                ActivityBoss: 1044, // 安全区域安全
            },
            Mail: {
                SYSTEM: 1,
                LETTER: 2,
                ARENA: 3,
                WONDERLAND: 4,
                PK: 5
            },

            Rank: {
                ALL: 1,
                SIX: 2,
                LEVEL: 3,
                LEAGUE: 4,
                LADDER: 5,
                CONTEND: 6,
                TOWER: 7,
                COMBO: 8,
                DAMAGE: 9,
                HIGHTOWER: 10
            },

            Comment: {
                HUNTER: 1,
                TOWER: 2,
                LICENCE: 3,
                WANTED: 5,
                TOTAL: 6,
                GROUP: 7

            },

            Vip: {
                VIP: 1,
                CHARGE: 2,
                MAX: 15,
                COUNT: 16
            },

            Equip: {
                STREN: 1,
                FORGE: 2,
                CARVE: 3
            },

            Hero: {

                GRADE: 1,
                SKILL: 2,
                FATE: 3,
                TALENT: 4,
                LIFE: 5,
                STREN: 6,
                FORGE: 7,
                CARVE: 8,
                LEVEL: 9,
                STAR: 10,
                HOLE: 11,
                DETAIL: 12
            },

            HeroHole: {
                ACTIVATE: 1,
                COMPOSE: 2,
                DROP: 3
            },

            HeroHoleID: {
                ID1: 1,
                ID2: 2,
                ID3: 3,
                ID4: 4
            },

            HeroSkill: {
                SKILL1: 1,
                SKILL2: 2,
                SKILL3: 3
            },

            HeroEquip: {
                STREN: 1,
                FORGE: 2,
                CARVE: 3
            },

            HeroTalent: {
                TALENT1: 1,
                TALENT2: 2,
                TALENT3: 3,
                TALENT4: 4
            },

            HeroTalentIndex: {
                ALL: 1,
                GRADE3: 2,
                GRADE2: 3,
                GRADE1: 4
            },

            HeroTalentType: {
                [1]: [3, 2, 1],
                [2]: 3,
                [3]: 2,
                [4]: 1
            },

            Arrow: {
                LEFT: -1,
                RIGHT: 1
            },

            Move: {
                INIT: 0,   //初始用
                CLICK: 1, //点击用
                MOVE: 2,   //移动用
                FOCUS: 3,  //教学用
                NEWHERO: 4  //招募用
            },

            Adviser: {
                UPGRADE: 1,
                LAW: 2
                // SKILL : 3,
            },

            HeroSpineTurnId: [
                10002,
                10009,
                10013,
                10014,
                10015,
                10016,
                10018,
                10019,
                10020,
                10023,
                10024,
                10025,
                10026,
            ],

            VipOpenLevel: {
                CHEST_TEN_SLIVER: 6,
                CHEST_TEN_GOLD: 9
            },

            Wanted: {
                START: 1,
                CHECK: 2
            },

            //经验丹
            PropHero: [
                30001,
                30002,
                30003,
                30004,
                30005
            ],

            //然并卵
            PropMoney: [
                30401,
                30402,
                30403,
                30404,
                30405
            ],

            //加精力
            PropPower: [
                30451,
                30452,
                30453,
                30454,
                30455
            ],

            //加晶魄
            PropCRYSTAL: [
                30501,
                30502,
                30503,
                30504,
                30505
            ],

            //加真气
            PropQi: [
                30601,
                30602,
                30603,
                30604,
                30605
            ],

            //加缘分
            PropCompse: [
                30701,
                30702,
                30703,
                30704,
                30705
            ],

            //加天赋
            PropTalent: [
                30801,
                30802,
                30803,
                30804
                //    30805,
            ],

            //觉醒
            PropSkill: [
                31201,
                31202,
                31203,
                31204,
                31205
            ],

            //信物
            PropSoul: [
                30701
            ],

            //神兵碎片
            PropAdviserPiece: [
                30901,
                30902,
                30903,
                30904,
                30905,
                30906,
                30907,
                30908,
                30909,
                30910,
                30911,
                30912,
                30913,
                30914,
                30915
            ],

            //碎片礼盒
            PieceBox: [
                130001, 130002, 130003, 130004, 130005, 130006, 130301, 130302, 130303
            ],

            //宝箱
            Treasure: [
                130101, 130102, 130103, 130104, 130105
            ],

            //卡包
            CardPackage: [
                139001,
                139002,
                139003,
                139004,
                139005,
                139006,
                139007,
                139008,
                139009,
                139010
            ],

            // 替身人偶
            Substitute: [
                31001, 31002
            ],

            //加神兵
            PropAdviser: [
                30901,
                30902,
                30903,
                30904,
                30905,
                30906,
                30907,
                31001,
                31101
            ],

            //宝箱
            PropBox: [
                130001,
                130002
            ],

            //秘宝
            PropSecret: [
                170001,
                170002,
                170003,
                170004,
                170005,
                170006,
                170007
            ],

            //盗贼的宝藏
            Rogue: [
                130201,
                130202,
                130203,
                130204,
                130205,
                130206,
            ],

            //宝物碎片
            PropPotatoPiece: [
                32001,
                32002,
                32003,
                32004,
                32005,
                32006,
                32007,
                32008,
                32009,
                32010,
                32011,
                32012,
                32501,
                32502,
                32503,
                32504,
                32505,
                32506,
                32507,
                32508,
                32509,
                32510
            ],

            //卡片碎片
            PropCardPiece: [
                33001,
                33002,
                33003,
                33004,
                33005,
                33006,
                33007,
                33008,
                33009,
                33010,
                33011,
                33012,
                33013,
                33050,
                33051,
                33052,
                33053,
                33054,
                33055,
                33056,
                33057,
                33058
            ],

            // 合成随机卡碎片
            PropCardPieceRandom: [
                33050,
                33051,
                33052,
                33053,
                33054,
                33055,
                33056,
                33057,
                33058
            ],

            //人偶
            PropRole: [
                31101,
                31102
            ],

            //hhh弹出窗口的id
            PropUseProp: [
                "PropMoney",
                "PropCRYSTAL",
                "PropQi",
                "PropBox",
                "PropSecret"
            ],

            OneKeySell: {
                MONEY: 1,
                CRYSTAL: 2,
                Qi: 3,
                Fruit: 4,
                Demon: 5,
                Rogue: 6 // 仙境盗贼的包裹
            },

            MonthType: {
                JUNIOR: 1,
                SENIOR: 2
            },

            AdviserAni: {
                STANDBY: 1,//待机
                APPEAR: 2, //出场
                CONJURE: 3 //施法
            },

            ChargeType: {
                RECOMMEND: 1,//推荐
                DOUBLE: 2, //首翻
                NOTHING: 3 //无
            },

            NotifyType: {
                PowerFull: 1,  //体力回复满推送
                PowerGet12: 2,   //体力领取12点推送
                PowerGet18: 3,   //体力领取18点推送
                PowerGet21: 4,   //体力领取21点推送
                NotifyLogin: 5,//登陆提醒推送
                NotifyMine: 6  //挖矿结束
            },

            MonthContinue: 10,

            Novice: {     //新手任务
                //    GENERAL : 1,    //武将任务
                //    FIGHT : 2,      //战力任务
                //    GRADE : 3,      //品阶任务 
                //    FORGE : 4,      //锻造任务
                //    ELITE : 5,      //精英任务
                //    ARENA : 6,      //演武任务
                //    TOWER : 7,      //爬塔任务

                ELITE: 1,      //冒险任务   
                GRADE: 2,      //品阶任务
                GENERAL: 3,    //升星次数
                ARENA: 4,      //演武任务 
                WONDLEND: 5,     //采果子     
                TOWER: 6      //爬塔任务 
            },

            NoviceType: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
            },

            WeekMissionTypeUI: [
                "Activity_WeekMissionOne",
                "Activity_WeekMissionTwo",
                "Activity_WeekMissionThree",
                "Activity_WeekMission",
            ],

            NoviceState: {
                ERROR: 0,
                LOCK: 1,
                OPEN: 2,
                REWARD: 3,
                OVER: 4,
            },

            NoviceMission: {
                [1]: {
                    [1]: 510001,
                    [2]: 510002,
                    [3]: 510003,
                },
                [2]: {
                    [1]: 520001,
                    [2]: 520002,
                    [3]: 520003,
                },
                [3]: {
                    [1]: 530001,
                    [2]: 530002,
                    [3]: 530003,
                },
                [4]: {
                    [1]: 540001,
                    [2]: 540002,
                    [3]: 540003,
                },
                [5]: {
                    [1]: 550001,
                    [2]: 550002,
                    [3]: 550003,
                },
                [6]: {
                    [1]: 560001,
                    [2]: 560002,
                    [3]: 560003,
                },
                [7]: {
                    [1]: 570001,
                    [2]: 570002,
                    [3]: 570003,
                }
            },

            License: {
                [50002]: 710000,
                [50003]: 720000,
                [50025]: 730000,
                [50055]: 740000
            },

            League_CelebrateType: {
                NORMAL: 1,//普通
                ADD: 2    //加餐
            },

            League_LogType: {
                NORMAL: 1,
                Animal: 2,
                Instance: 3,
                InstanceHurt: 4
            },

            AnimalNoticeType: {
                Get: 1,
                Feed: 2,
                Del: 3
            },

            BossNoticeType: {
                Start: 1,
                Blood: 2,
                END: 3
            },

            LeagueFishType: {
                White: 1,
                Green: 2,
                Blue: 3,
                Purple: 4
            },

            LeagueFishStatus: {
                Fishing: 1,
                CanPush: 2,
                CanPull: 3,
                CanGet: 4
            },

            LeagueWarPosState: {
                None: -1,
                Move: 0,
                Leave: 1,
                Dead: 2,
                Building: 10000,
                Mob: 20000
            },

            /*
            JoinType : {
                None : -1,
                Person : 0,
                Building : 1,
                Collect : 2,
                Mob : 3
            },
            */

            TalentSource: {
                None: -1,
                Talent: 1,
                HideTalent: 2,
                //StrategyCompose : 3,
                PotatoSkill: 3,
                AdviserSkill: 4,
                AwakeSkill: 5,
                PokedexSkill: 6,
                //ArtifactSkill : 7,
                Psychic: 8,
                BreakSkill: 9,
                PetSkill: 10,
                Equip: 11,
                Title: 12,

            },

            SceneBuffType: {
                None: -1,

                Fast: 10,          // 加速
                Invincible: 13,    // 无敌
                Frozen: 18,        // 冰冻
                RecoverBlood: 24,  // 回血
                Inspire: 26,       // 鼓舞
                Bomb: 28,          // 爆炸

                CollectDouble: 101 // 采集翻倍
            },

            LeagueWarTouchType: {
                Person: 1,     // 敌方
                Building: 2,   // 建筑
                Grass: 3,      // 采集
                Npc: 4,        // 功能Npc
                Mob: 5,        // 怪物
                Partner: 6,    // 本方
                Cannon: 7      // 大炮
            },

            AcivityAdType: {
                CHIXIAO: 1,
                SIHUN: 2,
                GUANYU: 3,
                ZHUGELIANG: 4,
                JUEXING: 5,
                ZHUANGSHU: 6
            },

            ActivityHeroType: {
                LVBU: 1,
                SIMAYI: 2,
                XIAOQIAO: 3,
                ZHUGELIANG: 4,
                GUANYHU: 5,
                ZHOUYU: 6,
                LUSU: 7
            },

            HeroFashion: {
                [1]: 10011,  //吕布
                [2]: 10003,  //貂蝉
                [3]: 10002,  //诸葛亮
                [4]: 10012,  //司马懿
                [5]: 10017,  //关于
                [6]: 10009,  //小乔
                [7]: 10019   //孙权
            },

            HeroStarTalent: {
                [1]: 1,
                [2]: 1,
                [3]: 1,
                [4]: 2,
                [5]: 3,
                [6]: 4,
                [7]: 4
            },

            LeagueWarDragType: {
                ON: 0,         // 可拖拽武将
                OFF: 1,        // 不可拖拽
            },

            FastFormatItemType: {
                NORMAL: 0,
                VOID: 1,
                LOCK: 2
            },

            FastResultBarType: {
                HP: 0,
                HURT: 1
            },

            HeroFashionType: {
                DEFAULT: 0,
                ORIENT: 1,
                FASHIOIN: 2
            },

            HeroDetailType: {
                FATE: 1,
                SKILL: 2,
                TALENT: 3
            },

            LeagueHomeButtonType: {
                BtnInstance: 1,
                BtnFish: 2,
                BtnWar: 3
            },

            FlagType: {
                Appear: 1,
                Loop: 2,
                Disappear: 3
            },

            TalentStar: {
                Star3: 1,
                Star4: 2,
                Star5: 3,
                Star6: 4
            },

            MysteriousId: 654321,

            ANI_NPC: 52,

            formulaP3: 100,

            //普通商铺、神秘商铺、演武商铺、帮会商铺, 推荐规则
            MallForHeroNeed: [
                message.EMallType.MALL_TYPE_ORDINARY,
                message.EMallType.MALL_TYPE_LADDER,
                message.EMallType.MALL_TYPE_LEAGUE
            ],

            Jade: {
                DIVIDE: 1,
                COMPOSE: 2,
                CONVERT: 3
            },

            JadeGame: {
                CUT_A_ONE: 1,
                CUT_A_TEN: 2,
                CUT_B_ONE: 3,
                CUT_B_TEN: 4
            },

            JadeType: {
                JADE1: 1,  //攻击
                JADE2: 2,  //生命
                JADE3: 3,  //防御
                JADE4: 4,  //暴击
                JADE5: 5,  //闪避
                JADE6: 6   //命中
            },

            JadeCompose: {
                LEFT: 1,
                RIGHT: 2,
                ITEM: 3
            },

            JadeWash: {
                SHOW: 1,
                WAIT: 2,
                WASH: 3,
                AUTO: 4,
                RESULT: 5
            },

            LeagueRankType: {
                ALL: 1,
                SEVEN: 2
            },

            LeagueRankSortType: {
                DONATE: 1,
                ANIMAL: 2,
                INSTANCE: 3,
                WAR: 4
            },

            Convert: {
                CARVE: 1,
                ARTIFACT: 2,

                [1]: [
                    90002, 90003
                ],
                [2]: [
                    30901, 30902, 30903, 30904, 30905, 30906, 30907, 30908, 30909
                ],
            },

            HIDE_REVIEW: [6, 7, 16, 12, 14, 17, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],

            FeedBack: {
                BACK: 1,
                GIFT: 2
            },

            ContendAward: {
                DAN: 1,
                RANK: 2
            },

            GiftBagSkipUI: {
                [1]: "Activity_TimeGiftFirstPopD", // 红橙宝物
                [2]: "Activity_TimeGiftFirstPopH", // 玉石
                [3]: "Activity_TimeGiftFirstPopG", // n选1
                [4]: "Activity_TimeGiftFirstPopI", // 通用
                [5]: "Activity_TimeGiftFirstPopE", // 3天
                [6]: "Activity_TimeGiftFirstPopF"  // 5天
            },

            FateMax: 7,

            JadeSpark: 7,

            MatchGroup: {
                Group_1: 1,
                Group_2: 2,
                Group_3: 3,
                Group_4: 4
            },

            MatchResult: {
                Result_Champion: 1,
                Result_Second: 2,
                Result_Third: 3,
                Result_Promotion: 4,   // 晋级
                Result_Relegation: 5,  // 保级
                Result_Degrade: 6      // 降级
            },

            MatchTitleState: {
                NoStart: 1,
                //Matching : 2,
                //Ready : 3,
                Going: 2,
                Ending: 3
            },

            RpgControlType: {
                None: 0,
                Tree: 1,
                Build: 2,
                Cannon: 3
            },

            WarReason: {
                Build: 1,
                Hp: 2,
                Honor: 3,
                Kill: 4,
                Random: 5
            },

            ZorkSkill: {
                Attack: 1,
                Bomb: 2
            },

            ////////////-
            //回收系统
            Recovery: {
                Potato_Decompose: 1,   //宝物分解
                Potato_Rebirth: 2,     //宝物重生
                Hero_Rebirth: 3,       //武将重生
                Equip_Rebirth: 4      //装备重生
            },

            GeneralRecoveryType: {

                LevelRecovery: 1,    //等级还原
                QualityRecovery: 2,  //品阶还原
                SkillRecovery: 3,    //技能还原
                TalentRecovery: 4    //天赋还原
            },

            EquipRecoveryType: {

                StrengthRecovery: 1, //强化还原
                ForgeRecovery: 2,    //锻造还原
                CarveRecovery: 3     //刻印还原
            },

            PotatoUI: {
                potato: 1,
                split: 2
            },

            PotatoChildUI: {
                potato: 1,
                split: 2,
                unid: 3,
                none: 4,
                splite_custom: 5,
                unid_custom: 6
            },

            PotatoStatus: {

                Ided: 1,       //鉴定
                host: 2,       //已装备
                unIded: 3,     //未鉴定
                tmp: 4         //临时
            },

            PotatoLevel: {

                D: 1,  //D D级：0条
                C: 2,  //C C级：1~2条
                B: 3,  //B B级：3条
                A: 4,  //A A级：4条
                S: 5,  //S S级：5条
                SS: 6  //SS SS级：6条
            },

            NewWanted: {

                SOUL: 1,   //信物大盗
                POTATO: 2, //宝物大盗
                JADE: 3    //玉石大盗
            },

            GeneralLife: {

                NULLA: 1,
                NULLB: 2,
                OPEN: 3,   //已激活
                CLOSE: 4,   //未激活
                CENTER: 5   //中心点
            },

            //hhh
            GeneralLifeAttri: [
                1,   // 生命值
                17,  // 基础攻击
                18,  // 基础防御
                10,  // 闪避
                11,  // 命中
                19,  // 暴击加成
                9    // 暴击抵抗
            ],

            TalentUI: {

                LOCK: 1,
                LEARN: 2,
                LEVELUP: 3,
                CHANGE: 4
            },

            HunterUI: {

                DETAIL: 1,
                PARTNER: 2,
                SKILL: 3,
                CARD: 4,
                LIFE: 5
            },

            CommonUITitleBgType: {

                NormalRed: 1,
                NormalGreen: 2,
                LongRed: 3,
                BigRed: 4,
                LightRed: 5,
                GrayRed: 6,
                LongBlue: 7
            },

            ResourcesUse: {
                [1]: message.EResourceType.RESOURCE_MONEY, // 游戏币
                [2]: message.EResourceType.RESOURCE_TOKEN, // 元宝
                [3]: message.EResourceType.RESOURCE_POWER, // 体力
                [4]: message.EResourceType.RESOURCE_GOLD_PLATE, // 能量胶囊
                [5]: message.EResourceType.RESOURCE_WANTED_COIN, // 悬赏令
                [6]: message.EResourceType.RESOURCE_ARREST_COIN, // 海捕令
                [7]: message.EResourceType.RESOURCE_HUNT_COIN, // 缉拿令
                [8]: message.EResourceType.RESOURCE_LOTTERYSCORE // 酒馆积分
            },

            HXHChargeType: {
                First: 1,   // 首冲
                Op: 2,   // 绝版
                Gift: 3,   // 礼包
                Charge: 4,   // 充值
                Vip: 5       // VIP    
            },

            // 猎人屏蔽枚举
            HXHReviewBuild: [
                // 4,   // 仙境
                1,    // 帮会
                7,    // 通缉令
            ],

            // hhh 猎人武将卡片分类
            HXHHunterEnum: {
                Level: 1,                // 等级
                Star: 2,                // 星级
                Quality: 3               // 品质
            },

            // 恭喜获得来源显示处理
            HXHGetGoodsFromType: {
                Normal: 0, //  通用
                Tavern: 1  // 酒馆双倍积分
            },

            //福利活动
            ActivitySpecial: {
                Sign: 1,
                UpLevel: 2,
                UpStar: 3,
                Instance: 4,
                WonderLand: 5,
                SkyArena: 6,
                WantedSecond: 7
                //    WantedSecond:1,
                //    UpLevel:2,
                //    UpStar:3,
                //    Instance:4,
                //    WonderLand:5,
                //    SkyArena:6,  
            },

            WonderlandType: {
                WondType_None: 0,
                WondType_Peace: 1,
                WondType_Fight: 2
            },

            // 礼包主城弹出根索引
            GiftCityShow: [
                1005,
                1010,
                1015,
                1025,
                1035,
                1045,
                1055
            ],

            // 某系卡片跳转掉落
            // table_item_client 表对应id
            CardTypeDropId: [
                200201,
                200203,
                200202,
                200204,
                200205,
                200206
            ],

            // 果子id
            FruitIds: [
                131001,
                131002,
                131003,
                131101,
                131102,
                131103,
                131104,
                131105,
                131106,
                131107,
                131108,
                131109,
                131110,
                131201,
                131202,
                131203,
                131204
            ],

            PsychicItemType: {
                MainItem: 1,
                UpdateItem: 2
            },

            PsychicItemNameType: {
                NormalName: 1,
                AttriName: 2
            },

            // 当前公会战状态枚举
            UnionBattleStatus: {
                LadderNotRegistered: 1, // 天梯赛未报名
                LadderRegistered: 2, // 天梯赛已报名 (天梯赛准备)
                FinalFourReady: 3, // 四强赛准备阶段 (四强赛准备)
                Battle: 4, // 战斗阶段
                FinalFourRegistered: 5, // 四强赛已报名状态(已报名下一轮排位赛)
                FinalFourNotRegistered: 6  // 四强赛未报名状态(未报名下一轮)
            },

            // 和平仙境npc
            WonderlandPeaceNpc: {
                Exchange: 1035,   // 果实收集
                Mora: 1036,   // 猜拳
                Fish: 1037,   //钓鱼
                Door: 1038,   // 传送门
                DoubleColor: 1039, // 双色球
                Boss: 1060, // 世界boss
                Port: 1061,// 港口
                PassCheck: 1062// 工作派遣
            },

            // 黑暗大陆果实背包
            DarkLandFruitBagType: {
                All: 1,   // 全部
                Red: 2,   // 红果实
                Blue: 3,  // 蓝果实
                Holy: 4,  // 神圣果实
                Relic: 5, // 遗迹卷轴
                Other: 6  // 其他
            },

            // 黑暗大陆果实背包类型对应Id
            DarkLandFruitBagItem: {
                [1]: [],
                [2]: [[131001, 10]],
                [3]: [[131101, 10]],
                [4]: [[138001, 5], [139001, 10]],
                [5]: [[130001, 6], [130101, 5]],
                [6]: []
            },

            // 黑暗大陆商店类型
            DarkLandMallType: {
                DarkMall: 1,
                Exchange: 2,

                [1]: message.EMallType.MALL_TYPE_ORDINARY, //普通
                [2]: null   // 快速商店     
            },


            // 
            NoviceMissionType: {
                [1]: {
                    [1]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE,// 通关副本
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,// 累积啤酒次数
                    },
                    [2]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_TOWER,// 普通爬塔最高层
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,// 获得几星以上武将数量
                        [3]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY, // 武将最大品质
                    },
                    [3]: {
                        [6]: message.MissionSubType.MISSION_SUB_TYPE_LADDER, // 本服格斗场最大排名
                        [8]: message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE, // 帮会捐献
                        [10]: message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE, // 联盟副本挑战次数
                    },
                    [4]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR,   // 流星街第四个副本最大层
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE,  // 流星街第五个副本最大层
                        [3]: message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES,// 娃娃机抽奖次数
                    },
                    [5]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE,  // 精英副本
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI,   // 获得几张紫卡
                        [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG,  // 获得几张橙卡
                        [4]: message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG,  // 获得几张红卡
                    },
                    [6]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_SEARCH_ZI,/// 探索紫色品质几次
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG,// 探索橙色品质几次
                        [3]: message.MissionSubType.MISSION_SUB_TYPE_SEARCH_HONG,// 探索红色品质几次
                        [4]: message.MissionSubType.MISSION_SUB_TYPE_USE_POWER, // 消耗体力
                    },
                    [7]: {
                        [1]: message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION,//采集果子
                        [2]: message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES, // 猜拳次数
                        [3]: message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME, // 觉醒什么级猎人次数（级别*10000+数量）
                        [4]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK,// 武将突破次数
                    }
                },
                [2]: {
                    [1]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                    [2]: message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME,
                    [3]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                },
                [3]: {
                    [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM,
                    [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL,
                },
                [4]: {
                    [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM,
                    [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL,
                },
                [5]: {
                    [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM,
                    [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL,
                },
            },

            NoviceType0: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
            },

            NoviceType1: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
            },

            NoviceType2: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL,
            },

            NoviceTypeMAQI: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL,
            },

            NoviceTypeKUBI: {
                [1]: message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                [2]: message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM,
                [3]: message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL,
            },

            TableNoviceMissionType: [
                message.MissionType.MISSION_TYPE_SEVEN,
                message.MissionType.MISSION_TYPE_MISSION_ONE,
                message.MissionType.MISSION_TYPE_MISSION_TWO,
                message.MissionType.MISSION_TYPE_MISSION_MAQI,
                message.MissionType.MISSION_TYPE_MISSION_KUBI
            ],

            TableEnumNoviceIndex: {
                NOVICE_NORMAL: 1,
                NOVICE_ONE: 2,
                NOVICE_TWO: 3,
                NOVICE_MAQI: 4,
                NOVICE_KUBI: 5,
            },

            TableEnumNovice: [
                message.EProcessType.PROCESS_TYPE_MISSION_SEVEN,
                message.EProcessType.PROCESS_TYPE_MISSION_ONE,
                message.EProcessType.PROCESS_TYPE_MISSION_TWO,
                message.EProcessType.PROCESS_TYPE_MISSION_MAQI,
                message.EProcessType.PROCESS_TYPE_MISSION_KUBI
            ],
            TableEnumRelicLevel: [
                // D : 1,
                // C : 2,
                // B : 3,
                // A : 4,
                // S : 5,
                // SS = 6,
                1,//   [1]: 
                2,//   [2]: 
                5,//   [3]: 
                8,//   [4]: 
                11,//   [5]: 
                14,//   [6]: 
                17,//   [7]: 
            ],

            ActivityInstance: {
                Normal: 1,
                Hard: 2,
            },

            TableTransformStatus: {
                OnlyShowActivity: 1,
                ShowTransform: 2,
                AllClosed: 3,
                AllOpen: 4,
            },

            TransMapRole: [
                100,
                101,
                102,
                103,
            ],

            PassGiftLow: [
                100214,
                100215,
                100216
            ]
        }

    }

}