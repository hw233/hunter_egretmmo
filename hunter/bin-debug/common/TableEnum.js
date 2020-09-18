var zj;
(function (zj) {
    zj.TableEnum = {
        TableCampType: {
            CAMP_TYPE_NONE: 0,
            CAMP_TYPE_MY: 1,
            CAMP_TYPE_OTHER: 2 // 其他阵营
        },
        TablePositionType: {
            POSITION_NONE: 0,
            POSITION_LEFT: 1,
            POSITION_RIGHT: 2 // 右边
        },
        TableTeamNum: {
            TEAM_NUM_NONE: -1,
            TEAM_NUM_A: 0,
            TEAM_NUM_B: 1,
            TEAM_NUM_C: 2,
            TEAM_NUM_D: 3,
            TEAM_NUM_MAX: 4 // 站位总数
        },
        // 当前职业分类
        TableEnumProfession: {
            CAREER_Unknown: 0,
            CAREER_FOOT: 1,
            CAREER_TACTICIAN: 2,
            CAREER_ASSASSIN: 3,
            CAREER_ARCHER: 4,
            CAREER_MAX: 5,
        },
        EnumStrategySkillTarget: {
            None: 0,
            Default: 1,
            Pos: 2,
            Profession: 3 // 按职业区分
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
            TYPE_NONE: 0,
            TYPE_SKILLAI_NORMAL: 1,
            TYPE_SKILLAI_BREAK: 2,
            TYPE_SKILLAI_RECOVER: 3 // 回复类型
        },
        TableSkillExtraEffect: {
            EXTRA_EFFECT_NONE: 0,
            EXTRA_EFFECT_FLOATED_DEEP: 1,
            EXTRA_EFFECT_SUCK_BLOOD: 2,
            EXTRA_EFFECT_DISPEL_BAD_BUFF: 3,
            EXTRA_EFFECT_DISPEL_PROFIT_BUFF: 4,
            EXTRA_EFFECT_STEAL_HP_RECOVER: 5,
            EXTRA_EFFECT_MULT_HURT: 6,
            EXTRA_EFFECT_DOUBLE_BUFF_DEEP: 7,
            EXTRA_EFFECT_KICK_OUT: 8 // 淘汰
        },
        TableHurtEffectType: {
            TYPE_NONE: 0,
            TYPE_HP: 1,
            TYPE_RAGE: 2 // 怒气
        },
        TableBufferType: {
            BUFFER_NONE: -1,
            BUFFER_DIZZINESS: 1,
            BUFFER_SLEEP: 2,
            BUFFER_SPEED_DOWN: 3,
            BUFFER_SILENCE: 4,
            BUFFER_DISARM: 5,
            BUFFER_CONFUSE: 6,
            BUFFER_WEAK: 7,
            BUFFER_BLEED: 8,
            BUFFER_SUCK_BLOOD: 9,
            BUFFER_SPEED_UP: 10,
            BUFFER_PHY_IMMUNE: 11,
            BUFFER_MAGIC_IMMUNE: 12,
            BUFFER_DAMAGE_IMMUNE: 13,
            BUFFER_PHY_SUCK: 14,
            BUFFER_MAGIC_SUCK: 15,
            BUFFER_DAMAGE_SUCK: 16,
            BUFFER_REBOUND: 17,
            BUFFER_FROZEN: 18,
            BUFFER_STONED: 19,
            BUFFER_RECOVER_BLOOD: 20,
            BUFFER_DOUBLE_DEEP: 21,
            BUFFER_POISON: 22,
            BUFFER_REDUCE_DEF: 23,
            BUFFER_RECOVER_COMMON_BLOOD: 24,
            BUFFER_DANDAN: 25,
            BUFFER_ATK_PROMOTE: 26,
            BUFFER_FIRING: 27,
            BUFFER_BOMB: 28,
            BUFFER_IMMUNE: 29,
            BUFFER_DISPEL_HARMFUL: 30,
            BUFFER_DISPEL_HELPFUL: 31,
            BUFFER_FORBIDE_RECOVER: 32,
            BUFFER_SHIELD: 33,
            BUFFER_CURE: 34,
            BUFFER_ANGER: 35,
            BUFFER_ARMOR: 36,
            BUFFER_ADD_IGNORE_RESIS: 37,
            BUFFER_ADD_GAIN_TIME: 38,
            BUFFER_REDUCE_DEBUFF_TIME: 39,
            BUFFER_ADD_SELF_RESIST: 40,
            BUFFER_ARMOR_BREAK: 41,
            BUFFER_PROMOTE_DEF: 42,
            BUFFER_TIMER_BOMB: 43,
            BUFFER_ADD_HTV: 44,
            BUFFER_REDUCE_HTV: 45,
            BUFFER_ADD_EVA: 46,
            BUFFER_REDUCE_EVA: 47,
            BUFFER_ADD_BLR: 48,
            BUFFER_REDUCE_BLR: 49,
            BUFFER_IMMUNE2: 50,
            BUFFER_RECOVER_BYSOURCEHP: 51,
            BUFFER_RECOVER_BYSOURCEPROTE: 52,
            BUFFER_ADD_DEFENCE_BYSOURCE: 53,
            BUFFER_FORBIDE_STRENGTH: 54,
            BUFFER_SHIELD_RELATED_DEF: 55,
            BUFFER_SHIELD_RELATED_NUM: 56,
            BUFFER_SHIELD_COMPARE_MAXHP: 57,
            BUFFER_WOUNDED: 58,
            BUFFER_SIGIN: 59,
            BUFFER_RECOVER_GOON: 60 //延续恢复
        },
        // 主动动画类型
        TableBuffActiveType: {
            Buff_Active_Nor: -1,
            Buff_Active_Loop: 1,
            Buff_Active_Triger: 2 // 触发类型( 例如流血，回血之类)
        },
        TableBuffAniType: {
            NONE_PLAY: 0,
            ENCHANT_PLAY: 1,
            TRIGGER_PLAY: 2 // 触发播放
        },
        // 施加类型
        TableBuffUseType: {
            Buff_Use_None: 0,
            Buff_Use_Good: 1,
            Buff_Use_Bad: 2 // 减益buff
        },
        TableTalentTrigger: {
            TALENT_TRIGGER_NONE: -1,
            TALENT_TRIGGER_ALL_FIGHT: 1,
            //TALENT_TRIGGER_GEL_LIFE : 2,                    // 武将生存期
            TALENT_TRIGGER_EVERY_BODY: 3,
            TALETN_TRIGGER_MY_SELF_ATTRI: 4,
            //TALENT_TRIGGER_PVE_FIGHT : 2,                   // PVE副本的全程战斗
            //TALENT_TRIGGER_PVP_FIGHT : 3,                   // PVP副本的全程战斗
            //TALENT_TRIGGER_BEATTACKED_SKILL : 4,            // 受到技能攻击时
            TALENT_TRIGGER_BEATTACKED_DAMAGE: 5,
            TALENT_TRIGGER_HIT: 6,
            TALENT_TRIGGER_KILL: 7,
            TALENT_TRIGGER_FRIEND_DEATH: 8,
            TALENT_TRIGGER_SELF_DEATH: 9,
            TALENT_TRIGGER_RELEASE_SKILL_DAMAGE: 10,
            TALENT_TRIGGER_BEATTACKED_DODGE: 11,
            TALENT_TRIGGER_ATTACK_CRIT: 12,
            //TALENT_TRIGGER_ATTACK_BEDODGE : 13,             // 攻击被敌方闪避时   done
            TALENT_TRIGGER_BEATTACKED_CRIT: 14,
            TALENT_TRIGGER_ATTACK_HURT_BEHIND: 15,
            TALENT_TRIGGER_BEATTACKED_HURT_BEHIND: 16,
            //TALENT_TRIGGER_BEATTACKED_TARGET_HURT : 17,     // 被施加指向性hurt是有概率触发
            TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF: 18,
            TALENT_TRIGGER_ATTACK_SELF_IN_BUFF: 19,
            TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF: 20,
            //TALENT_TRIGGER_DOUBLE : 20,                   // 连击达到一定条件触发   
            TALENT_TRIGGER_RELEASE_SKILL_TYPE: 21,
            TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW: 22,
            TALENT_TRIGGER_ZIBAO: 23,
            TALENT_TRIGGER_HUITIAN: 24,
            TALENT_TRIGGER_FUHUO: 25,
            TALENT_TRIGGER_YIJI: 26,
            TALENT_TRIGGER_FUCHOU: 27,
            TALENT_TRIGGER_FIGHT_APPEAR: 28,
            TALENT_TRIGGER_SHIHUN: 29,
            TALENT_TRIGGER_AFTER_FUHUO: 30,
            //TALENT_TRIGGER_LONGHUN_FUHUO : 31,            // 龙魂复活
            TALENT_TRIGGER_BLOOD_LOW: 32,
            TALENT_TRIGGER_AUTOMATIC_TIME: 33,
            TALENT_TRIGGER_FRIEND_BECRIT: 34,
            TALENT_TRIGGER_LOSE_BLOOD: 35,
            TALENT_TRIGGER_HP_COMPARE_GREATER: 36,
            TALENT_TRIGGER_HP_COMPARE_LESS: 37,
            TALENT_TRIGGER_SELF_HP_GREATER: 38,
            TALENT_TRIGGER_SELF_HP_LESS: 39,
            TALENT_TRIGGER_TARGET_HP_GREATER: 40,
            TALENT_TRIGGER_TARGET_HP_LESS: 41,
            TALENT_TRIGGER_WILL_DEAD: 42,
            TALENT_TRIGGER_FIGHT_START: 43,
            TALENT_TRIGGER_TOUCH_SUPPORT: 44,
            TALENT_TRIGGER_RESIST_BUFF: 45,
            TALENT_TRIGGER_ATTRI_COMPARE_GREATER: 46,
            TALENT_TRIGGER_RELEASE_SKILL_FIRST: 47,
            TALENT_TRIGGER_PULL_CD_ADD: 48,
            TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER: 49,
            TALENT_TRIGGER_ENEMY_RELEASE_SKILL_DAMAGE: 50,
            TALENT_TRIGGER_BUFF_HIT: 51,
            TALENT_TRIGGER_BEATTACKED_DAMAGE_BEFORE: 52,
            TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM: 53,
            TALENT_TRIGGER_FEIGN_DEATH: 54,
            TALENT_TRIGGER_REVIVE_OTHER_PERSON: 55,
            TALENT_TRIGGER_ENEMY_DEATH: 56,
            TALENT_TRIGGER_ENEMY_RELEASE_SUPPORT_SKILL: 57,
            TALENT_TRIGGER_ENTER_WEEK: 58,
            TALENT_TRIGGER_ENEMY_CD_REDUCE: 59,
        },
        //[[1到6是直接给相应的目标施加效果]]
        TableTalentEffect: {
            TALENT_EFFECT_NONE: -1,
            TALENT_EFFECT_BASEVALUE_REDUCE: 1,
            TALENT_EFFECT_BASEVALUE_ADD: 2,
            TALENT_EFFECT_BASEVALUE_MIN: 3,
            TALENT_EFFECT_BASEVALUE_MAX: 4,
            TALENT_EFFECT_HURT_VALUE_ADD_HP: 5,
            TALENT_EFFECT_HURT_VALUE_REDUCE_HP: 6,
            TALENT_EFFECT_ATTACK_DAMAGE_REDUCE: 7,
            TALENT_EFFECT_ATTACK_DAMAGE_ADD: 8,
            TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE: 9,
            TALENT_EFFECT_BEATTACKED_DAMAGE_ADD: 10,
            TALENT_EFFECT_CRIT_MAX: 11,
            TALENT_EFFECT_HIT_MAX: 12,
            TALENT_EFFECT_DODGE_DAMAGE: 13,
            TALENT_EFFECT_REDUCE_DEFENCE: 14,
            TALENT_EFFECT_BUFF_ADD: 15,
            TALENT_EFFECT_ATTRIBUTE_ADD: 16,
            TALENT_EFFECT_ATTRIBUTE_REDUCE: 17,
            // 需要单独处理
            // 触发类型配击杀任意敌人时(TALENT_TRIGGER_KILL)
            TALENT_EFFECT_TUNSHI: 18,
            // 触发类型配被施加指向性hurt是有概率触发(TALENT_TRIGGER_BEATTACKED_TARGET_HURT)
            TALENT_EFFECT_TAOTUO: 19,
            // 触发类型配所有副本的全程战斗(TALENT_TRIGGER_ALL_FIGHT)
            TALENT_EFFECT_JILI: 20,
            TALENT_EFFECT_LONGYUAN: 21,
            TALENT_EFFECT_POISON_DEEP: 22,
            TALENT_EFFECT_FEISHE: 23,
            TALENT_EFFECT_GUIDAO: 24,
            TALENT_EFFECT_JIANTA: 25,
            TALENT_EFFECT_PARTAKE: 27,
            TALENT_EFFECT_GUSHOU: 28,
            TALENT_EFFECT_BUQU: 29,
            TALENT_EFFECT_ZHUIJI: 30,
            TALENT_EFFECT_HP_ADD_BY_ATK: 32,
            TALENT_EFFECT_HP_REDUCE_BY_ATK: 33,
            TALETN_EFFECT_CRIT_HURT_ADD: 34,
            TALENT_EFFECT_CRIT_HURT_REDUCE: 35,
            TALENT_EFFECT_ZIBAO: 36,
            TALENT_EFFECT_FUHUO: 37,
            TALENT_EFFECT_EMERGE_HURT_EFFECT: 38,
            TALENT_EFFECT_MULTI_HURT: 39,
            TALENT_EFFECT_PERCENT_FINAL_ADD: 40,
            TALENT_EFFECT_PERCENT_FINAL_REDUCE: 41,
            TALENT_EFFECT_CHUANYANG: 42,
            //TALENT_EFFECT_POFA : 43,                        // 破法(对方目标法攻值大于自己)
            //TALENT_EFFECT_XIAOYAO : 44,                     // 逍遥(增加自身物理防御X%的法术攻击)
            TALENT_EFFECT_MEIHUO: 45,
            //TALENT_EFFECT_ATK_PROFESSION : 46,              // 针对职业造成的伤害增加或减少(参数：TableEnumProfession)
            //TALENT_EFFECT_BEATKED_PROFESSION : 47,          // 针对职业自身所受的伤害增加或减少(参数：TableEnumProfession)
            TALENT_EFFECT_ATK_ROW: 48,
            TALENT_EFFECT_YANXING: 49,
            TALENT_EFFECT_LEITING: 50,
            TALENT_EFFECT_CHANGE_SKILL_LEVEL: 51,
            TALENT_EFFECT_CHANGE_GET_RAGE: 52,
            TALENT_EFFECT_CHANGE_RESERVE_RAGE: 53,
            TALENT_EFFECT_CHANGE_RESERVE_SUPPERTIME: 54,
            TALENT_EFFECT_AUTO_ADDHP: 55,
            TALENT_EFFECT_CHANGE_ENTRY_TIME: 56,
            TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED: 57,
            TALENT_EFFECT_ADD_IGNORE_RESIS: 58,
            TALENT_EFFECT_ADD_SELF_RESIST: 59,
            TALENT_EFFECT_ADD_GAIN_TIME: 60,
            TALENT_EFFECT_REDUCE_DEBUFF_TIME: 61,
            TALENT_EFFECT_CALL_MONSTER: 62,
            TALENT_EFFECT_RPOTO_TO_ATK: 63,
            TALENT_EFFECT_PROTO_TO_REALHURT: 64,
            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_GROUP: 65,
            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FEATURE: 66,
            TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FACTION: 67,
            TALENT_EFFECT_LIVING_PERSON: 68,
            TALENT_EFFECT_REBOUND_MYLOSTHP: 69,
            TALENT_EFFECT_LOSTHP_ACTION_ABSORB: 70,
            TALENT_EFFECT_KILL_NO_REVIVE: 71,
            TALENT_EFFECT_PROMOTE_BY_NUM_OF_BUFF: 72,
            TALENT_EFFECT_IGNORE_TARGET_DEF: 73,
            TALENT_EFFECT_ADDHURT_BY_TARGET_HP: 74,
            TALENT_EFFECT_WILL_DEAD: 75,
            TALENT_EFFECT_SEC_KILL: 76,
            TALENT_EFFECT_LIVING_ENEMY_HURT: 77,
            TALENT_EFFECT_DISTANCE_FAR_HURT: 78,
            TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FACTION: 79,
            TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE: 80,
            TALENT_EFFECT_GRAB_BUFF: 81,
            TALENT_EFFECT_BELONG_GAIN_TIME: 82,
            TALENT_EFFECT_BELONG_DEBUFF_TIME: 83,
            TALENT_EFFECT_ATTRIBUTE_ADD_BASE: 84,
            TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE: 85,
            TALENT_EFFECT_ATTRIBUTE_ADD_BASE_TIMELY: 86,
            TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE_TIMELY: 87,
            TALENT_EFFECT_ADDHURT_BY_TARGET_MAXHP: 88,
            TALENT_EFFECT_RANDOM_DISPEL_BUFF: 89,
            TALENT_EFFECT_ATTRI_DVALUE_PERCENT: 90,
            TALENT_EFFECT_ADD_RECOVER_VALUE: 91,
            TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FEATURE: 92,
            TALENT_EFFECT_REBOUND_MYDEFENCE: 93,
            TALENT_EFFECT_ATTR_PROMOTE_BY_DIFF: 94,
            TALENT_EFFECT_STEP_BUFF: 95,
            TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION: 96,
            TALENT_EFFECT_BUFF_CREATE_SHIELD: 97,
            TALENT_EFFECT_PROMOTE_HURT_BYENEMYHPPER: 98,
            TALENT_EFFECT_CRITHURT_LIMIT: 99,
            TALENT_EFFECT_REDUCE_CRIT_BY_ATTACK_GROUP: 100,
            TALENT_EFFECT_REDUCE_HURT_BY_ATTACK_GROUP: 101,
            TALENT_EFFECT_REDUCE_BOMB_TIME: 102,
            TALENT_EFFECT_ADD_BOMB_HURT: 103,
            TALENT_EFFECT_REDUCE_GET_RAGE: 104,
            TALENT_EFFECT_REDUCE_CONTINUE_DAMAGE: 105,
            TALENT_EFFECT_IGNORE_DEF_LIMIT: 106,
            TALENT_EFFECT_LOSEHP_CONVERT_ATK: 107,
            TALENT_EFFECT_PROMOTE_BUFF_RECOVER_EFFECT: 108,
            TALENT_EFFECT_REVIVE_DEADPERSON: 109,
            TALENT_EFFECT_PERMANENT_DAMAGE_HP: 110,
            TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_ADD: 111,
            TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_REDUCE: 112,
            TALENT_EFFECT_WILL_DEAD2: 113,
            TALENT_EFFECT_STEAL_HP_RECOVER: 114,
            TALENT_EFFECT_BUFF_INFINITIZE: 115,
            TALENT_EFFECT_RAGE_TO_HURT: 116,
            TALENT_EFFECT_HP_COMPARETO_ENEMY: 117,
            TALENT_EFFECT_REDUCE_IGNORE_DEF_VALUE: 118,
            TALENT_EFFECT_REDUCE_REAL_HURT: 119,
            TALENT_EFFECT_INGORE_CRIF_DEF: 120,
            TALENT_EFFECT_REBOUND_HURT: 121,
            TALENT_EFFECT_REDUCE_HURT_BY_ATTACKER_FEATURE: 122,
            TALENT_EFFECT_PURGE_TRANTO_RECOVER: 123,
            TALENT_EFFECT_HP_AVERAGE: 124,
            TALENT_EFFECT_SUCKHP_TRANTO_SHIELD: 125,
            TALENT_EFFECT_DISPEL_ADD_HURT: 126,
            TALENT_EFFECT_LOSTHP_TRANTO_HURT: 127,
            TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT: 128,
            TALENT_EFFECT_LOSTHP_CONVERT_ADD_PROTO: 129,
            TALENT_EFFECT_BEINBUFF_IGNORE_HURT: 130,
            TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE: 131,
            TALENT_EFFECT_DISPEL_USEFUL_TO_POISON: 132,
            TALENT_EFFECT_SELF_LOSE_HP_TO_HURT: 133,
            TALENT_EFFECT_BUFF_EFFECT_PRO: 134,
            TALENT_EFFECT_REDUCE_ALL_HURT: 135,
            TALENT_EFFECT_HURT_VALUE_ADD_HP2: 136,
            TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION: 137,
            TALENT_EFFECT_REDUCE_CDRED_EFFECT: 138,
            TALENT_EFFECT_HIT_CUTMYHP_TO_DAMAGE: 139,
            TALENT_EFFECT_PRO_ATKER_ALL_DAMAGE: 140,
            TALENT_EFFECT_CANNOT_GRAB_BUFF: 141,
            TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE: 142,
            TALENT_EFFECT_CUT_CD_AND_REL_SKILL: 143,
            TALENT_EFFECT_IGNORE_TARGET_INJURY: 144,
            TALENT_EFFECT_PRO_ALL_HURT_BY_TARGET_POS: 146 // 根据敌方玩家位置提高所有伤害(effect_extra为1号位或2号位或3号位或4号位)
        },
        TableTalentBaseValueType: {
            TALENT_BASEVALUE_NONE: 0,
            TALENT_BASEVALUE_HP: 1,
            TALENT_BASEVALUE_RAGE: 2,
            TALENT_BASEVALUE_CD: 3,
            TALENT_BASEVALUE_HELP_CD: 4,
            TALENT_PERCENT_CD: 5,
            TALENT_LOSS_BLOOD: 6,
            TALENT_BRING_ROLE_HP: 7,
            TALENT_BASEVALUE_HP_SPECIAL: 8 // 目标基础数值血量相关(百分比),减血不受天赋的影响
        },
        TableRoleBaseAttribute: {
            BASE_ATTR_NONE: 0,
            BASE_ATTR_PHY_ATK: 1,
            BASE_ATTR_PHY_DEF: 2,
            BASE_ATTR_HTV: 3,
            BASE_ATTR_EVA: 4,
            BASE_ATTR_IGNORE_DEF: 6,
            BASE_ATTR_PHY_CRIT: 7,
            BASE_ATTR_CRIT_EXTRA: 8,
            BASE_ATTR_CRIT_DEF: 10,
            BASE_ATTR_HIT_RATE: 11,
            BASE_ATTR_DODGE_RATE: 12,
            BASE_ATTR_SPEED: 13,
            BASE_ATTR_HP: 20,
            BASE_ATTR_UNIL_RESIS: 21,
            BASE_ATTR_IGNORE_RESIS: 22,
            BASE_ATTR_FLOAT_RESIS: 23,
            BASE_ATTR_CUR_HP: 24 // 当前hp
        },
        TableTalentAppearTime: {
            TALENT_APPEAR_NONE: -1,
            TALENT_APPEAR_TRIGGER: 1,
            TALENT_APPEAR_COME: 2 // 入场触发
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
            AI_LIMIT_NONE: 0,
            AI_LIMIT_DELAY: 1,
            AI_LIMIT_BLOOD: 2 // 血量
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
            State_Sprint: 3 //冲刺
        },
        TableEnumSpecialState: {
            SpecialState_None: 0,
            SpecialState_GetUp_Super: 1,
            SpecialState_NoBreak: 2,
            SpecialState_Super: 3 //无敌状态，不受伤害
        },
        TableEnumActionFlash: {
            Flash_None: 0,
            Flash_LastPos: 1,
            Flash_Origin: 2,
            Flash_Local: 3,
            Flash_DetailPos: 4,
            Flash_Target: 5 // 指定目标(指定目标，依据effect的目标)
        },
        TableEnumOtherState: {
            OtherState_None: -1,
            OtherState_Appear: 0,
            OtherState_Stand: 1,
            OtherState_Run: 2,
            OtherState_Sprint: 3,
            OtherState_Jump: 4,
            OtherState_JumpUp: 5,
            OtherState_JumpMid: 6,
            OtherState_JumpDown: 7,
            OtherState_Hurt: 8,
            OtherState_Hurt_Heavy: 9,
            OtherState_Float_FallDown: 10,
            OtherState_StirUp: 11,
            OtherState_StirDown: 12,
            OtherState_FallDown: 13,
            OtherState_Die: 14,
            OtherState_GetUp: 15,
            OtherState_Weak: 16,
            OtherState_Win: 17,
            OtherState_Static: 18,
            OtherState_Parry: 19,
            OtherState_EnterWeek: 20,
            OtherState_Weeking: 21,
            OtherState_ExitWeek: 22,
            OtherState_Attack: 25,
            OtherState_FightShowAtk: 101,
            OtherState_FightShowBeAtk: 102,
            // 暂时无
            OtherState_Curve: 17 //复活
        },
        //hhh
        TableActionPriority: (_a = {},
            _a[0] = { priority: 999999 },
            _a[1] = { priority: 2 },
            _a[2] = { priority: 4 },
            _a[3] = { priority: 2 },
            _a[4] = { priority: 2 },
            _a[5] = { priority: 2 },
            _a[6] = { priority: 2 },
            _a[7] = { priority: 2 },
            _a[8] = { priority: 2 },
            _a[9] = { priority: 2 },
            _a[10] = { priority: 2 },
            _a[11] = { priority: 2 },
            _a[12] = { priority: 2 },
            _a[13] = { priority: 2 },
            _a[14] = { priority: 2 },
            _a[15] = { priority: 2 },
            _a[16] = { priority: 2 },
            _a[17] = { priority: 2 },
            _a[18] = { priority: 2 },
            _a[25] = { priority: 2 },
            _a[19] = { priority: 999999 },
            _a),
        //hhh
        TableHunterRoleAniName: (_b = {},
            _b[0] = "0000_chuchang",
            _b[1] = "0001_daiji",
            _b[2] = "0002_pao",
            _b[3] = "0003_chongci",
            _b[4] = "0004_tiao",
            _b[5] = "0005_tiaoyueshang",
            _b[6] = "0006_tiaoyuezhong",
            _b[7] = "0007_tiaoyuexia",
            _b[8] = "0008_shouji1",
            _b[9] = "0009_shouji2",
            _b[10] = "0010_fukongdaodi",
            _b[11] = "0011_jifeishangsheng",
            _b[12] = "0012_jifeixialuo",
            _b[13] = "0013_daodi",
            _b[14] = "0014_siwang",
            _b[15] = "0015_daodiqishen",
            _b[16] = "0016_xuruo",
            _b[17] = "0017_shengli",
            _b[18] = "0018_dingshen",
            _b[25] = "0025_gongji1",
            _b),
        TableEnumDebuffState: {
            DEBUFF_NONE: 0,
            DEBUFF_ICE: 1,
            DEBUFF_RAIN: 2,
            DEBUFF_BLOOD: 3,
            DEBUFF_MAX_NUM: 3 //debuff数量
        },
        TableEnumNumLayout: {
            Layout_Down_Up: 0,
            Layout_Up_Down: 1,
            Layout_Left_Right: 2,
            Layout_Right_Left: 3,
            Layout_SPURTING: 4,
            Layout_HIT_HALT: 5,
            Layout_SHIFT: 6,
            Layout_Left_Right_Short: 7,
            Layout_Layout_New: 8 //新样式
        },
        // 人物继承用的分类
        TableEnumRoleType: {
            ROLE_TYPE_NONE: 0,
            ROLE_TYPE_GENERAL: 1,
            ROLE_TYPE_MOB: 2,
            ROLE_TYPE_BOSS: 3,
            ROLE_TYPE_CALL: 4,
            ROLE_TYPE_HELP: 5,
            ROLE_TYPE_LOCAL: 6,
            ROLE_TYPE_LOCAL_HELP: 7 // 本地援护武将
        },
        TableEnumSex: {
            SEX_Unknown: 0,
            SEX_MALE: 1,
            SEX_FEMALE: 2,
            SEX_MA: 3
        },
        //
        TableEnumFromClassify: {
            TYPE_NONE: 0,
            TYPE_PERSON: 1,
            TYPE_ENEMY: 2,
            TYPE_ELITE: 3,
            TYPE_BOSS: 4,
            TYPE_CALL: 5 // 召唤形态
            // todo
        },
        TableEnumOperate: {
            Operate_DoubleTouch: -3,
            Operate_UpSlide: -2,
            Operate_None: -1,
            Operate_SingleTouch: 0,
            Operate_FrontSlide: 1,
            Operate_BackSlide: 2,
            Operate_JumpTouch: 3,
            Operate_SprintTouch: 4,
            Operate_DownSlide: 5,
            Operate_JumpDownSlide: 6 //空中下滑
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
            REPORT_SKIP_FIGHT: 1,
            REPORT_SKIP_MAIL: 2,
            REPORT_SKIP_CHAT: 3,
            REPORT_SKIP_MINE: 4,
            REPORT_SKIP_ARENA: 5,
            REPORT_SKIP_LEAGUE: 6,
            REPORT_SKIP_ENEMY: 7 // 从山洞进重播
        },
        // 本地战斗类型，与服务器的BattleType不重合
        TableEnumFightType: {
            // local
            FIGHT_TYPE_NONE: 0,
            FIGHT_TYPE_TEACH: 1001,
            FIGHT_TYPE_REPLAY: 1002,
            // 暂时没加
            FIGHT_TYPE_WORLD_BOSS: 1003,
            FIGHT_TYPE_UNION_BOSS: 1003,
            FIGHT_TYPE_REAL_PK: 1004,
            FIGHT_TYPE_GAOJI_WANTED: 1005,
            FIGHT_TYPE_GAOJI_ADVENTURE: 1006 // 高级冒险副本(特殊处理)
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
        TableEnumBloodEffectState: {
            kBloodEffectStateGoOut: 0,
            kBloodEffectStateGoTarget: 1
        },
        TableEnumGoCityType: {
            Go_City_Unkonwn: -1,
            Go_City_None: 0,
            Go_City_From_Battle: 1,
            Go_City_From_Door: 2,
            Go_City_From_Tower: 3,
            Go_City_From_TeachBattle: 4,
            Go_City_From_WorldMap: 5,
            Go_City_Num: 6
        },
        TableEnumGoBattleType: {
            Go_Battle_Unkonwn: -1,
            Go_Battle_None: 0,
            Go_Battle_From_City: 1,
            Go_Battle_From_Door: 2,
            Go_Battle_Num: 3
        },
        TableSceneState: {
            SCENE_STATE_NONE: -1,
            SCENE_STATE_INIT: 0,
            SCENE_STATE_APPEAR: 1,
            SCENE_STATE_WALK: 2,
            SCENE_STATE_DIALOG: 3,
            SCENE_STATE_CHANGE: 4,
            SCENE_STATE_SCALE: 5,
            SCENE_STATE_FIGHT_RULE: 6,
            SCENE_STATE_FIGHT_START: 7,
            SCENE_STATE_FIGHT_GODDESS: 8,
            SCENE_STATE_FIGHT: 9,
            SCENE_STATE_SETTLE: 10,
            SCENE_STATE_FIGHT_WAIT: 11,
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
            MONSTER_STAGE_A: 1,
            MONSTER_STAGE_B: 2 // 普通副本的关卡B阶段
        },
        TableStageState: {
            STAGE_STATE_NONE: 0,
            STAGE_STATE_1ST: 1,
            STAGE_STATE_2ND: 2,
            STAGE_STATE_3RD: 3,
            STAGE_STATE_4TH: 4,
            STAGE_STATE_5TH: 5
        },
        TableDialogStage: {
            DIALOG_STAGE_NONE: 0,
            DIALOG_STAGE_1ST: 1,
            DIALOG_STAGE_2ND: 2,
            DIALOG_STAGE_3RD: 3,
            DIALOG_STAGE_4TH: 4,
            DIALOG_STAGE_5TH: 5 // 对话第五阶段(打赢第二批怪时说话)
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
            ATTR_HP: 1,
            ATTR_PHY_ATK: 2,
            ATTR_PHY_DEF: 3,
            ATTR_HTV: 4,
            ATTR_EVA: 5,
            ATTR_PHY_CRIT: 6,
            ATTR_SKILL_CRIT: 7,
            ATTR_CRIT_EXTRA: 8,
            ATTR_CRIT_RESIS: 9,
            ATTR_DODGE_RATE: 10,
            ATTR_HIT_RATE: 11,
            ATTR_IGNORE_PHYDEF: 12,
            ATTR_IGNORE_MAGICDEF: 13,
            ATTR_FINAL_EXTRA: 14,
            ATTR_FINAL_REDUCE: 15,
            ATTR_RAGE_REDUCE: 16,
            ATTR_ATK_ALL: 17,
            ATTR_DEF_ALL: 18,
            ATTR_CRIT_ALL: 19,
            ATTR_IGNORE_ALL: 20,
            ATTR_UNIL_RESIS: 21,
            ATTR_IGNORE_RESIS: 22,
            ATTR_FLOAT_RESIS: 23,
            ATTR_CD_SPEED: 24,
            ATTR_SUPPORT_CONSUME: 25,
            ATTR_MAX: 26
        },
        EnumAttriShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 23, 24, 25],
        EnumAttriReal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25],
        EnumHunterAttriReal: [1, 2, 3, 4, 5, 6, 8, 10, 9, 24],
        EnumHunterAttriShow: [1, 2, 3, 24, 6, 8, 10, 5, 4, 9],
        EnumHunterAttriShowFloat: (_c = {},
            _c[24] = true,
            _c[9] = true,
            _c[6] = true,
            _c[8] = true,
            _c[5] = true,
            _c[4] = true,
            _c),
        EnumHunterAttriShow2: [1, 2, 3, 8],
        EnumHunterAttriShow3: [1, 2, 3, 24],
        EnumHunterAttriPercent: [6, 8, 10, 11, 12, 16, 21, 22, 23],
        //hhh
        EnumPowerRatio: (_d = {},
            _d[1] = 0.3,
            _d[2] = 4,
            _d[3] = 3,
            _d[4] = 3,
            _d[5] = 4,
            _d[6] = 5,
            _d[7] = 5,
            _d[8] = 1,
            _d[9] = 5,
            _d[10] = 5,
            _d[11] = 5,
            _d[12] = 4,
            _d[13] = 3,
            _d[14] = 4.4,
            _d[15] = 3.3,
            _d[16] = 0,
            _d[17] = 0,
            _d[18] = 0,
            _d[19] = 0,
            _d[20] = 0,
            _d[21] = 0,
            _d[22] = 0,
            _d[23] = 0 // 浮空抵抗
        ,
            _d),
        EnumCarve: {
            CARVE_NONE: 0,
            CARVE_A: 1,
            CARVE_B: 2,
            CARVE_C: 3,
            CARVE_D: 4,
            CARVE_E: 5,
            CARVE_F: 6,
            CARVE_G: 7,
            CARVE_H: 8,
            CARVE_I: 9,
            CARVE_J: 10,
            CARVE_K: 11,
            CARVE_L: 12,
            CARVE_MAX: 13
        },
        EnumEquipPos: {
            Pos_None: 0,
            Pos_Weapon: 1,
            Pos_Clothes: 2,
            Pos_Shoes: 3,
            Pos_Hat: 4,
            Pos_Jade: 5,
            Pos_Horse: 6 // 战马
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
            Build_Type_Tavern: -1,
            Build_Type_None: 0,
            // openfun有配开启等级
            Build_Type_League: 1,
            Build_Type_Arena: 2,
            Build_Type_Mine: 3,
            Build_Type_Worship: 4,
            Build_Type_Tower: 5,
            Build_Type_Bastille: 6,
            Build_Type_Arrest: 7,
            Build_Type_Mall: 26,
            Build_Type_Jade: 40,
            Build_Type_Zork: 45,
            Build_Type_DarkLand: 46 // 黑暗大陆
        },
        LeagueBuildType: {
            League_Build_None: 0,
            League_Build_Dating: 1,
            League_Build_Chuansong: 2,
            League_Build_Kaozhu: 3,
            League_Build_Zhangfang: 4,
            League_Build_Yishouge: 5,
            League_Build_Shop: 6,
            League_Build_Notice: 7,
            League_Build_Fish: 8,
            League_Build_Instance: 9,
            League_Build_War: 10,
            League_Build_Chest: 11,
            League_Build_Convert: 12 // 游侠
        },
        ZorkBuildType: {
            Zork_Build_None: 0,
            Zork_Build_Altar: 31,
            Zork_Build_Boss: 32,
            Zork_Build_Shop: 33,
            Zork_Build_Convert: 34 // 魔域游侠
        },
        EnumAnalyseResult: {
            RESULT_NONE: 0,
            RESULT_FORMAT: 1,
            RESULT_VISIT: 2,
            RESULT_CARD_NUM: 3,
            RESULT_CARD_LEVEL: 4,
            RESULT_UPGRADE_GENERAL_LEVEL: 5,
            RESULT_UPGRADE_GENERAL_STAR: 6,
            RESULT_UPGRADE_GENERAL_STEP: 7,
            RESULT_UPGRADE_SKILLS: 8,
            RESULT_UPGRADE_ADVISER: 9,
            RESULT_MAX: 10 // max
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
            ALL: 1,
            A: 2,
            B: 3,
            C: 4,
            D: 5 //丁
        },
        EnumBookQuality: (_e = {},
            _e[1] = [1, 2, 3, 4],
            _e[2] = [4],
            _e[3] = [3],
            _e[4] = [2],
            _e[5] = [1] //丁
        ,
            _e),
        TableEnumPetOtherState: {
            OtherState_Stand: 0,
            OtherState_Run: 1,
            OtherState_Skill: 2,
            OtherState_Cry: 0,
        },
        EnumBookQuality2: (_f = {},
            _f[1] = [4, 3, 2, 1],
            _f[2] = [4],
            _f[3] = [3],
            _f[4] = [2],
            _f[5] = [1] //丁
        ,
            _f),
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
            Mall: (_g = {
                    NORMAL: 1,
                    ARENA: 2,
                    LEAGUE: 3,
                    HONOR: 4,
                    LOTTERY: 5,
                    MATCH: 6
                },
                //    CONTEND : 5,
                //    SECRET : 6,
                //    LOTTERY : 7,
                //    DEMON  : 8,
                _g[1] = message.EMallType.MALL_TYPE_ORDINARY,
                _g[2] = message.EMallType.MALL_TYPE_LADDER,
                _g[3] = message.EMallType.MALL_TYPE_LEAGUE,
                _g[4] = message.EMallType.MALL_TYPE_HONOR,
                _g[5] = message.EMallType.MALL_TYPE_LOTTERY,
                _g[6] = message.EMallType.MALL_TYPE_LEAGUE_SCORE // 战功商店
            ,
                _g),
            PropTag: {
                Hero: "general_exp",
                Talent: "talent_exp"
            },
            PortNpc: {
                SafeLine: 1040,
                SafeUp: 1041,
                SafeDown: 1042,
                SafeUp2: 1043,
            },
            // 活动Boss npc
            ActivityNpc: {
                ActivityBoss: 1044,
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
            HeroTalentType: (_h = {},
                _h[1] = [3, 2, 1],
                _h[2] = 3,
                _h[3] = 2,
                _h[4] = 1,
                _h),
            Arrow: {
                LEFT: -1,
                RIGHT: 1
            },
            Move: {
                INIT: 0,
                CLICK: 1,
                MOVE: 2,
                FOCUS: 3,
                NEWHERO: 4 //招募用
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
                STANDBY: 1,
                APPEAR: 2,
                CONJURE: 3 //施法
            },
            ChargeType: {
                RECOMMEND: 1,
                DOUBLE: 2,
                NOTHING: 3 //无
            },
            NotifyType: {
                PowerFull: 1,
                PowerGet12: 2,
                PowerGet18: 3,
                PowerGet21: 4,
                NotifyLogin: 5,
                NotifyMine: 6 //挖矿结束
            },
            MonthContinue: 10,
            Novice: {
                //    GENERAL : 1,    //武将任务
                //    FIGHT : 2,      //战力任务
                //    GRADE : 3,      //品阶任务 
                //    FORGE : 4,      //锻造任务
                //    ELITE : 5,      //精英任务
                //    ARENA : 6,      //演武任务
                //    TOWER : 7,      //爬塔任务
                ELITE: 1,
                GRADE: 2,
                GENERAL: 3,
                ARENA: 4,
                WONDLEND: 5,
                TOWER: 6 //爬塔任务 
            },
            NoviceType: (_j = {},
                _j[1] = message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,
                _j[2] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                _j[3] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                _j),
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
            NoviceMission: (_k = {},
                _k[1] = (_l = {},
                    _l[1] = 510001,
                    _l[2] = 510002,
                    _l[3] = 510003,
                    _l),
                _k[2] = (_m = {},
                    _m[1] = 520001,
                    _m[2] = 520002,
                    _m[3] = 520003,
                    _m),
                _k[3] = (_o = {},
                    _o[1] = 530001,
                    _o[2] = 530002,
                    _o[3] = 530003,
                    _o),
                _k[4] = (_p = {},
                    _p[1] = 540001,
                    _p[2] = 540002,
                    _p[3] = 540003,
                    _p),
                _k[5] = (_q = {},
                    _q[1] = 550001,
                    _q[2] = 550002,
                    _q[3] = 550003,
                    _q),
                _k[6] = (_r = {},
                    _r[1] = 560001,
                    _r[2] = 560002,
                    _r[3] = 560003,
                    _r),
                _k[7] = (_s = {},
                    _s[1] = 570001,
                    _s[2] = 570002,
                    _s[3] = 570003,
                    _s),
                _k),
            License: (_t = {},
                _t[50002] = 710000,
                _t[50003] = 720000,
                _t[50025] = 730000,
                _t[50055] = 740000,
                _t),
            League_CelebrateType: {
                NORMAL: 1,
                ADD: 2 //加餐
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
                Fast: 10,
                Invincible: 13,
                Frozen: 18,
                RecoverBlood: 24,
                Inspire: 26,
                Bomb: 28,
                CollectDouble: 101 // 采集翻倍
            },
            LeagueWarTouchType: {
                Person: 1,
                Building: 2,
                Grass: 3,
                Npc: 4,
                Mob: 5,
                Partner: 6,
                Cannon: 7 // 大炮
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
            HeroFashion: (_u = {},
                _u[1] = 10011,
                _u[2] = 10003,
                _u[3] = 10002,
                _u[4] = 10012,
                _u[5] = 10017,
                _u[6] = 10009,
                _u[7] = 10019 //孙权
            ,
                _u),
            HeroStarTalent: (_v = {},
                _v[1] = 1,
                _v[2] = 1,
                _v[3] = 1,
                _v[4] = 2,
                _v[5] = 3,
                _v[6] = 4,
                _v[7] = 4,
                _v),
            LeagueWarDragType: {
                ON: 0,
                OFF: 1,
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
                JADE1: 1,
                JADE2: 2,
                JADE3: 3,
                JADE4: 4,
                JADE5: 5,
                JADE6: 6 //命中
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
            Convert: (_w = {
                    CARVE: 1,
                    ARTIFACT: 2
                },
                _w[1] = [
                    90002, 90003
                ],
                _w[2] = [
                    30901, 30902, 30903, 30904, 30905, 30906, 30907, 30908, 30909
                ],
                _w),
            HIDE_REVIEW: [6, 7, 16, 12, 14, 17, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
            FeedBack: {
                BACK: 1,
                GIFT: 2
            },
            ContendAward: {
                DAN: 1,
                RANK: 2
            },
            GiftBagSkipUI: (_x = {},
                _x[1] = "Activity_TimeGiftFirstPopD",
                _x[2] = "Activity_TimeGiftFirstPopH",
                _x[3] = "Activity_TimeGiftFirstPopG",
                _x[4] = "Activity_TimeGiftFirstPopI",
                _x[5] = "Activity_TimeGiftFirstPopE",
                _x[6] = "Activity_TimeGiftFirstPopF" // 5天
            ,
                _x),
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
                Result_Promotion: 4,
                Result_Relegation: 5,
                Result_Degrade: 6 // 降级
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
                Potato_Decompose: 1,
                Potato_Rebirth: 2,
                Hero_Rebirth: 3,
                Equip_Rebirth: 4 //装备重生
            },
            GeneralRecoveryType: {
                LevelRecovery: 1,
                QualityRecovery: 2,
                SkillRecovery: 3,
                TalentRecovery: 4 //天赋还原
            },
            EquipRecoveryType: {
                StrengthRecovery: 1,
                ForgeRecovery: 2,
                CarveRecovery: 3 //刻印还原
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
                Ided: 1,
                host: 2,
                unIded: 3,
                tmp: 4 //临时
            },
            PotatoLevel: {
                D: 1,
                C: 2,
                B: 3,
                A: 4,
                S: 5,
                SS: 6 //SS SS级：6条
            },
            NewWanted: {
                SOUL: 1,
                POTATO: 2,
                JADE: 3 //玉石大盗
            },
            GeneralLife: {
                NULLA: 1,
                NULLB: 2,
                OPEN: 3,
                CLOSE: 4,
                CENTER: 5 //中心点
            },
            //hhh
            GeneralLifeAttri: [
                1,
                17,
                18,
                10,
                11,
                19,
                9 // 暴击抵抗
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
            ResourcesUse: (_y = {},
                _y[1] = message.EResourceType.RESOURCE_MONEY,
                _y[2] = message.EResourceType.RESOURCE_TOKEN,
                _y[3] = message.EResourceType.RESOURCE_POWER,
                _y[4] = message.EResourceType.RESOURCE_GOLD_PLATE,
                _y[5] = message.EResourceType.RESOURCE_WANTED_COIN,
                _y[6] = message.EResourceType.RESOURCE_ARREST_COIN,
                _y[7] = message.EResourceType.RESOURCE_HUNT_COIN,
                _y[8] = message.EResourceType.RESOURCE_LOTTERYSCORE // 酒馆积分
            ,
                _y),
            HXHChargeType: {
                First: 1,
                Op: 2,
                Gift: 3,
                Charge: 4,
                Vip: 5 // VIP    
            },
            // 猎人屏蔽枚举
            HXHReviewBuild: [
                // 4,   // 仙境
                1,
                7,
            ],
            // hhh 猎人武将卡片分类
            HXHHunterEnum: {
                Level: 1,
                Star: 2,
                Quality: 3 // 品质
            },
            // 恭喜获得来源显示处理
            HXHGetGoodsFromType: {
                Normal: 0,
                Tavern: 1 // 酒馆双倍积分
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
                LadderNotRegistered: 1,
                LadderRegistered: 2,
                FinalFourReady: 3,
                Battle: 4,
                FinalFourRegistered: 5,
                FinalFourNotRegistered: 6 // 四强赛未报名状态(未报名下一轮)
            },
            // 和平仙境npc
            WonderlandPeaceNpc: {
                Exchange: 1035,
                Mora: 1036,
                Fish: 1037,
                Door: 1038,
                DoubleColor: 1039,
                Boss: 1060,
                Port: 1061,
                PassCheck: 1062 // 工作派遣
            },
            // 黑暗大陆果实背包
            DarkLandFruitBagType: {
                All: 1,
                Red: 2,
                Blue: 3,
                Holy: 4,
                Relic: 5,
                Other: 6 // 其他
            },
            // 黑暗大陆果实背包类型对应Id
            DarkLandFruitBagItem: (_z = {},
                _z[1] = [],
                _z[2] = [[131001, 10]],
                _z[3] = [[131101, 10]],
                _z[4] = [[138001, 5], [139001, 10]],
                _z[5] = [[130001, 6], [130101, 5]],
                _z[6] = [],
                _z),
            // 黑暗大陆商店类型
            DarkLandMallType: (_0 = {
                    DarkMall: 1,
                    Exchange: 2
                },
                _0[1] = message.EMallType.MALL_TYPE_ORDINARY,
                _0[2] = null // 快速商店     
            ,
                _0),
            // 
            NoviceMissionType: (_1 = {},
                _1[1] = (_2 = {},
                    _2[1] = (_3 = {},
                        _3[1] = message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE,
                        _3[2] = message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,
                        _3),
                    _2[2] = (_4 = {},
                        _4[1] = message.MissionSubType.MISSION_SUB_TYPE_TOWER,
                        _4[2] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                        _4[3] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                        _4),
                    _2[3] = (_5 = {},
                        _5[6] = message.MissionSubType.MISSION_SUB_TYPE_LADDER,
                        _5[8] = message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE,
                        _5[10] = message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE,
                        _5),
                    _2[4] = (_6 = {},
                        _6[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR,
                        _6[2] = message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE,
                        _6[3] = message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES,
                        _6),
                    _2[5] = (_7 = {},
                        _7[1] = message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE,
                        _7[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI,
                        _7[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG,
                        _7[4] = message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG,
                        _7),
                    _2[6] = (_8 = {},
                        _8[1] = message.MissionSubType.MISSION_SUB_TYPE_SEARCH_ZI,
                        _8[2] = message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG,
                        _8[3] = message.MissionSubType.MISSION_SUB_TYPE_SEARCH_HONG,
                        _8[4] = message.MissionSubType.MISSION_SUB_TYPE_USE_POWER,
                        _8),
                    _2[7] = (_9 = {},
                        _9[1] = message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION,
                        _9[2] = message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES,
                        _9[3] = message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME,
                        _9[4] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK,
                        _9),
                    _2),
                _1[2] = (_10 = {},
                    _10[1] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                    _10[2] = message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME,
                    _10[3] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                    _10),
                _1[3] = (_11 = {},
                    _11[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    _11[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM,
                    _11[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL,
                    _11),
                _1[4] = (_12 = {},
                    _12[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    _12[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM,
                    _12[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL,
                    _12),
                _1[5] = (_13 = {},
                    _13[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                    _13[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM,
                    _13[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL,
                    _13),
                _1),
            NoviceType0: (_14 = {},
                _14[1] = message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER,
                _14[2] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                _14[3] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                _14),
            NoviceType1: (_15 = {},
                _15[1] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY,
                _15[2] = message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME,
                _15[3] = message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR,
                _15),
            NoviceType2: (_16 = {},
                _16[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                _16[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM,
                _16[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_UPLEVEL,
                _16),
            NoviceTypeMAQI: (_17 = {},
                _17[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                _17[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM,
                _17[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL,
                _17),
            NoviceTypeKUBI: (_18 = {},
                _18[1] = message.MissionSubType.MISSION_SUB_TYPE_WANTED,
                _18[2] = message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM,
                _18[3] = message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL,
                _18),
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
                1,
                2,
                5,
                8,
                11,
                14,
                17,
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
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
})(zj || (zj = {}));
//# sourceMappingURL=TableEnum.js.map