namespace zj {
    // 战斗场景人物类
    // lilou
    // 2018.12.11

    let ROLE_CD_SPEED = 1000

    enum ETalentDir {
        Dir_Attack = 1,
        Dir_BeAttactked = 2,
    }

    enum EGetRageWay {
        Way_None = 0,
        Way_Common = 1,
        Way_Skill = 2,
        Way_LastHit = 3,
        Way_Blood = 4,
        Way_Max = 5,
    }

    function _hurtingAndBring(beAttacked, attack) {
        beAttacked.bringHurtRole = attack
        attack.hurtingRole = beAttacked
    }

    function _clearHurtingAndBring(beAttacked, attack) {
        beAttacked.bringHurtRole = null
        attack.hurtingRole = null
    }

    function _cacheGeneralDeadInfo(role) {
        let info: { cur_rage, cur_bean, cur_skillCd }
        info.cur_rage = role.getRage()
        info.cur_bean = role.getCurBeanNum()
        info.cur_skillCd = role.getPressCdTime()
        return info
    }


    function _creatSkillAction(time, type, index, atomic) {
        let skillAction = new message.ActionSkillInfo;
        skillAction.triggerTime = time
        skillAction.type = type
        skillAction.index = index
        skillAction.atomic = atomic
        return skillAction
    }

    function _creatStateAction(time, state) {
        let stateAction = new message.ActionStateInfo;
        stateAction.triggerTime = time
        stateAction.state = state
        return stateAction
    }

    function _isIgnoreInjureForTalent(type: number): boolean {
        let tag: boolean = false;
        if (type == TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_HURT_REDUCE
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_ACTION_ABSORB
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_ALL_HURT
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE
            || type == TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALL_HURT_BY_TARGET_POS
        ) {
            tag = true;
        }
        return tag;
    }

    function _isIgnoreInjureForBuff(type: number): boolean {
        let tag: boolean = false;
        if (type == TableEnum.TableBufferType.BUFFER_PROMOTE_DEF || type == TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE) {
            tag = true;
        }
        return tag;
    }

    export class StageRole {

        public effect = [];

        public fightScene: any; // 战斗场景

        public nodeRoot;

        // todo
        // public nodeNormal = new eui.Group;
        // public nodeFollow = new eui.Group;

        // public nodeShadow = new eui.Group;
        // public nodeBody = new eui.Group;
        public nodeDc = new eui.Group;
        public nodeUp = new eui.Group;
        public nodeMid = new eui.Group;
        public nodeDown = new eui.Group;
        // public nodeBuff = new eui.Group;
        // public nodeEffect = new eui.Group;
        // public nodeHit = new eui.Group;
        // public nodeNumberes = new eui.Group;
        // public nodeBuffName = new eui.Group;

        // public nodeUpEffect = new eui.Group;
        // public nodeDcBuff = new eui.Group;

        public nHightLightTick;
        public bHightLight;

        public baseAttribs = Helper.CreateGeneralAttrTbl0();
        public fightExtraAttribs = Helper.CreateTalentAttrTbl();

        public attribs = {
            level: 1,			// 等级        

            atkAll: 0,         // 总攻击力
            defAll: 0,         // 总防御力
            critAll: 0,        // 总暴击率
            ignoreAll: 0,      // 总忽视

            atk: 0,			// 物理攻击力
            def: 0,			// 物理防御力
            htv: 0,		    // 效果命中
            eva: 0,		    // 效果抵抗
            //sacredAtk = 0,		// 神圣攻击力
            //sacredDef = 0,		// 神圣防御力	

            curRage: 0,		// 当前怒气
            maxRage: 0,		// 最大怒气        	
            curHp: 0,			// 当前hp
            maxHp: 0,			// 最大hp	

            atkCritRate: 0,	// 物攻暴击
            skillCritRate: 0,	// 技能暴击
            sacredCritRate: 0,	// 神圣暴击	
            critExtra: 0,      // 暴击附加	
            critDef: 0,		// 暴击韧性	

            ignorePhydef: 0,   // 忽视物防
            ignoreMagicdef: 0, // 忽视魔防
            ignoreScaredef: 0, // 忽视神防
            finalExtraHurt: 0, // 终极附加
            finalReduceHurt: 0,// 终极减免	

            hitRate: 0,		// 命中率
            dodgeRate: 0,		// 闪避率	
            stiffDef: 0,		// 硬直抗性	

            unilResis: 0,      // 通用抵抗
            ignoreResis: 0,    // 忽视抵抗
            floatResis: 0,     // 浮空抵抗	

            cdSpeed: 0,        // 速度值
            supportConsume: 0, // 作为援护怒气需求值
        }

        public roleName = null
        public headPath = null
        public eyePath = null
        public talentEyePath = null
        public bodyPath = null
        public halfPath = null
        public roleType = 0
        public profession = TableEnum.TableEnumProfession.CAREER_Unknown
        public sex = TableEnum.TableEnumSex.SEX_Unknown
        public formType = TableEnum.TableEnumFromClassify.TYPE_NONE
        public mapRoleId = 0     // 模型id
        public roleId = 0        // 真正角色id
        public generalId = 0     // baseGeneralId
        public star = 1          // 星级
        public step = 0          // 阶数
        public curExp = 0
        public nHpTube;

        // state
        public state = TableEnum.TableEnumBaseState.State_None
        public otherState = TableEnum.TableEnumOtherState.OtherState_None
        public specialState = TableEnum.TableEnumSpecialState.SpecialState_None

        public initSpecialState = TableEnum.TableEnumSpecialState.SpecialState_None
        public lastState = -1
        public lastA = -1

        public actionId = -1
        public actionLastId = -1
        public dir = TableEnum.TableEnumDir.Dir_Right
        private _x = 0
        private _y = 0
        public bodyX = 0
        public bodyY = 0
        public floor = 0
        public moveDistance = 0

        public bCall = false;
        public bEnemy = true
        public bDisappear = false
        //public bStandDisappear = false
        public bPause = false
        public bPauseBlack = false

        public relySupportRole;//依赖援护


        // cachedata
        public scale = 1.0
        public scaleX = 1.0
        public actSpeed = 1.0
        public bActLoop = false
        public bBodyActEnd = false

        public saveDir = TableEnum.TableEnumDir.Dir_None
        public tempMoveDir = -1
        public sprintDistance = 0
        public beHurtTimes = 0
        public jumpSpeed = 0
        public sprintSpeed = ConstantConfig_RoleBattle.SPRINT_SPEED
        public stirUpSpeed = 0
        public striBreakTime = 0
        public stirSpeedX = 0
        public getUpTime = 0
        public getUpTimeUpdate = 0
        public moveSpeed = 0
        public stirUpDef = 0
        public specialTimes = -1
        public stiffTime = 0
        public parryTime = 0
        public parryMaxTime = 0
        public homingTime = 0
        public jumpOffset = 0
        public stirAgainDef = 0
        //public aiId = -1  
        //public pveAi = -1
        //public pvpAi = -1
        public helpBg = -1

        public targetDis = 0
        public runDis = 0
        public runState = TableEnum.TableRunStage.STAGE_NONE

        public hurtNumPosX = 0
        public hurtNumPosY = 0

        public hurtNumOffsetNorX = 0
        public hurtNumOffsetNorY = 0
        public hurtNumOffsetSpeX = 0
        public hurtNumOffsetSpeY = 0

        public hitEffectOffsetNorX = 0
        public hitEffectOffsetNorY = 0
        public hitEffectOffsetSpeX = 0
        public hitEffectOffsetSpeY = 0

        public roleAniOffsetNorUpX = 0
        public roleAniOffsetNorUpY = 0
        public roleAniOffsetSpeUpX = 0
        public roleAniOffsetSpeUpY = 0
        public cheat_checkAttr = 0;
        public cheat_checkTime = 0;
        public cheat_diffvalue = 0;
        public cheat_range = 0;

        public offsetNorMidX = 0
        public offsetNorMidY = 0

        // tag
        public bVisible = true 		// 是否隐藏 
        public bDead = false			// 是否死亡状态
        public bStun = false			// 是否眩晕状态
        public bCanRemove = false 	// 是否能被删除
        public bSprintJump = false 	// 是否从冲刺处跳起
        public bStirUp = false		// 是否挑起
        public bFloatBreak = true     // 是否可以被浮空打断
        public bGravity = false		// 是否受重力
        public bStandStun = false 	// 是否站立眩晕
        public bStandFrozen = false   // 站立冰冻
        public bStandSleep = false    // 站立睡眠
        public bStandStoned = false   // 站立石化
        public bCancelSprint = false 	// 是否取消冲刺
        public bUpSpring = false 		// 是否被弹起
        public bFallDownFlag = false 	// 倒地被攻击弹起落下标识
        //public bGetUpOver = false 	// 起身是否结束
        public bAlreadyDead = false 	// 是否已经死亡	
        public bHitedToRight = false 	// 被打左边还是右边  
        public bMomentDead = false    // 短暂的死亡 
        public bTalentTag = false     // 特殊死亡天赋是否触发
        //public bBezierTag = false     // 贝塞尔曲线中
        public bStartFight = false    // 入场激活战斗


        // instance    
        public shadow = new eui.Image       // 影子ani  
        public body: Spx = null 		// 人物art
        public haloFront = null    // 前光环
        public haloBack = null    // 后光环
        public bodySpxId = -1     // 人物资源路径
        public tableEffectPath = {} // 特效加载图片

        public myAI = null         // 人物ai
        public storageSpx: Spx = null   // 蓄力相关
        public shelterAni = null   // 蛋蛋罩相关

        // attribs 
        public tableBuffsAttri = Helper.CreateGeneralAttrTbl0();      // 全局buff属性加成值
        //public tableAdviserAttri = {}     // 军师属性加成值
        //public tableComposeAttri = {}     // 组合属性加成值
        public tablePotatoSkill = []     // 宝物天赋

        // skill
        public curSkill = null
        public curSkillIdx = -1

        // table
        public tableCommons = []	// 人物普通技能
        public tableSkills = []	// 人物基础技能
        public tableDeaths = []	// 人物必杀技能
        public tableSkillAi = []

        public tableEffects = []	// 人物随身特效
        public tableHits = []		// 命中特效
        public tableNumbers = []	// 被攻击数字
        public tableHurtValue = []// 受伤
        public tableBuffs = []    // buff 
        public tableClean = []    // 延迟清理

        // 天赋
        public tableBaseTalent = []
        //public tableAppearTalent = {}
        public tableTalentEffect = {};

        // 天赋动画出现    
        public talentTimmer = 0
        public tableDelayTalent = []
        public tableTalentAni = []
        public tableQTalent = []

        //public TALENT_INTERVAL_TIMER = 400  
        //public tableTalentEffectAni = {}

        // 天赋效果
        public bReviving = false
        public bBomb = false
        public bNoRevive = false

        public tableSkillIds = []
        public tableSkillLevels = []
        public tableTalentIds = []
        public tableTalentLevels = []
        public tableHideTalentIds = []
        public tableDeathTalent = []

        // 施加者
        public bringHurtRole = null
        // 正在进行目标者
        public hurtingRole = null
        // 正在复活者
        public revivingRole = null


        // 特效
        public reviveCss = null            // 复活特效
        public deadCss = null              // 死亡特效
        // 粒子
        public deadParticleEffects = null  // 死亡粒子特效
        public resafeParticleEffects = null // 复活粒子特效	
        public breakMoveEffects = null     // 打断移动特效

        // ui相关
        public freezeTime = 0
        public stunFrame = 0
        public bColorChange = false
        public disappearTran = 255
        public bForceAi = false

        public DISPLACEMENT = {
            id: 0,
            speed_x: 0,
            speed_y: 0,
            aspeed_x: 0,
            aspeed_y: 0,
            aspeed_time: 0,
            continue_time: 0,
        }

        // 回调
        public bodyActionFun = null
        // sound
        public press_sound_path = null
        public kill_sound_path = null


        ////////////-extra////////////////-
        public eCamp = TableEnum.TableCampType.CAMP_TYPE_NONE
        public eAppearStage = TableEnum.TableStageState.STAGE_STATE_NONE
        public ePosition = TableEnum.TablePositionType.POSITION_NONE
        public orderPos = 0
        public eTeamNum = TableEnum.TableTeamNum.TEAM_NUM_NONE
        public teamOriginalX = 0
        public teamOriginalY = 0
        public realX = 0
        public realY = 0
        public noticeTouchType = message.ESkillType.SKILL_TYPE_NONE
        public bDelayTag = false

        public noHurtMs = 0
        public bNoHurtJudge = false
        public bFrozen = false    // 冰冻
        public bSleep = false     // 睡眠
        public bStoned = false    // 石化
        public bSilence = false   // 禁言     
        public bDisarm = false    // 缴械
        public bImmune = false    // 免疫
        //public bSpeedDown = false // 减缓    
        //public bSpeedUp = false   // 加速
        public bIgnoreInjury: boolean = false;

        public bleedSum = 0
        public bloodTriggerLine = 0

        public hurtTotalValue = 0
        public recoverTotalValue = 0
        public bossHurtValue = 0

        public bezierDisplacementId = -1

        public curBeanNum = 0
        public maxBeanNum = 0

        public rageConsume = 0
        public rageReducePlus = 0
        public bRageAdd = true;
        //public ragePlus = 0
        //////////////////////////////////-
        // replay
        public actions = new message.BattleActionInfo;
        public battleAction = null
        public skillReplayIndex = 1
        //////////////////////////////////-		
        // hunter
        // dc
        public pressCd = null
        public SpriteHpBoard = new eui.Image;
        public SpriteHpBloodGround = new eui.Image;
        public SpriteHpBlood = new eui.Image;
        public SpritePdhBlood = new eui.Image;
        public SpriteRedBlood = new eui.Image;
        public SpriteBloodSplit = new eui.Image;
        public BarHpSize = { width: 0, height: 0 }
        public BloodSplit = { width: 0, height: 0 }
        public BuffLdPos = null
        public TableBuffDcUi = {}
        public TableBuffBoard = {}
        public TableBuffNum = {}

        //public orginHpValue = -1
        public hpAnimTick = 0
        public stepHpValue = 0
        public currHpValue = -1
        public pdhValue = 0
        public pdhBakeValue = 0

        public cdAnimTick = 0
        public stepCdValue = 0
        public currCdValue = -1

        // target still
        public still_target_effect = -1
        public targetPlayers = {}

        // 设置出场结束回调
        public appearCallback: Function;

        public debugPrint = 0

        public bInGut = false
        public bGoGutPos = false
        //public gutPosX = 0
        //public gutPosY = 0
        //public gutEndCallback = null
        public senderRole;



        // other
        public lastDir: number = 0
        public runSoundFps: number = 0;
        public initDir: number = 0;
        public preHpPer: number = 0;
        public roleInfo: any;
        public battleHead = ""
        public supportHead = ""
        public groupTag = 0;
        public roleFeature = 0;
        public roleFaction = 0;
        public appearRage = 0;
        public SpriteCdBar = new eui.Image;
        public SpriteCdBarLight = new eui.Image;
        public is_flashing = false;
        public is_breakMoving = false;
        public currShieldHp = 0;

        constructor(node, aiTag) {

            this.fightScene = StageSceneManager.Instance.GetCurScene();

            this.nodeRoot = node;
            // this.nodeRoot.addChild(this.nodeNormal)//目前没用
            // this.nodeRoot.addChild(this.nodeFollow)

            // this.nodeFollow.addChild(this.nodeShadow)//目前没用
            // this.nodeFollow.addChild(this.nodeBody)//目前没用
            this.nodeRoot.addChild(this.nodeDc)//目前没用
            // this.nodeFollow.addChild(this.nodeUp)
            // this.nodeFollow.addChild(this.nodeMid)
            // this.nodeFollow.addChild(this.nodeDown)
            // this.nodeRoot.addChild(this.nodeUp)
            // this.nodeRoot.addChild(this.nodeMid)
            // this.nodeRoot.addChild(this.nodeDown)
            // this.nodeFollow.addChild(this.nodeBuff)//目前没用
            // this.nodeFollow.addChild(this.nodeEffect);//目前没用
            // this.nodeFollow.addChild(this.nodeHit)//目前没用
            // this.nodeFollow.addChild(this.nodeNumberes)//目前没用
            // this.nodeFollow.addChild(this.nodeBuffName)//目前没用

            // this.nodeRoot.addChild(this.nodeUpEffect)
            // this.nodeDc.addChild(this.nodeDcBuff)//目前没用
        }
        /**释放*/
        public release() {
            this.senderRole = null;
            this.TableBuffBoard = {};
            this.TableBuffDcUi = {};
            CC_SAFE_DELETE(this.myAI);
            CC_SAFE_DELETE(this.pressCd);
            this.pressCd = null;
            let i = 0;
            while (i < this.tableCommons.length) {
                CC_SAFE_DELETE(this.tableCommons[i]);
                i = i + 1;
            }
            this.tableCommons = [];

            i = 0;
            while (i < this.tableSkills.length) {
                CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            this.tableSkills = [];

            i = 0;
            while (i < this.tableDeaths.length) {
                CC_SAFE_DELETE(this.tableDeaths[i]);
                i = i + 1;
            }
            this.tableDeaths = [];

            i = 0;
            while (i < this.tableEffects.length) {
                CC_SAFE_DELETE(this.tableEffects[i]);
                i = i + 1;
            }
            this.tableEffects = [];

            i = 0;
            while (i < this.tableHits.length) {
                CC_SAFE_DELETE(this.tableHits[i]);
                i = i + 1;
            }
            this.tableHits = [];

            i = 0;
            while (i < this.tableNumbers.length) {
                CC_SAFE_DELETE(this.tableNumbers[i]);
                i = i + 1;
            }
            this.tableNumbers = [];

            i = 0;
            while (i < this.tableBuffs.length) {
                CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];

            //释放天赋
            for (let k = 0; k < this.tableBaseTalent.length; k++) {
                i = 0;
                let v = this.tableBaseTalent[k + 1];
                if (v) {
                    while (i < v.length) {
                        CC_SAFE_DELETE(v[i]);
                        i = i + 1;
                    }
                }

            }
            this.tableBaseTalent = [];

            //释放延迟数据
            i = 0;
            while (i < this.tableClean.length) {
                let info = this.tableClean[i];
                if (info.bClean == true) {
                    info.father.removeChild(info.body);
                }
                i = i + 1;
            }
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            if (this.storageSpx) {
                this.storageSpx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
                this.storageSpx.clearSpine();
                this.storageSpx = null;
            }
            if (this.ani_dialog) {
                this.ani_dialog.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent1, this);
                this.ani_dialog.clearSpine();
                this.ani_dialog = null;
            }
            if (this.bombCss) {
                this.bombCss.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.bombCss.clearSpine();
                this.bombCss = null;
            }

            this.tableSkills = [];

            this.tableTalentEffect = {};
            this.tableSkillIds = [];
            this.tableSkillLevels = [];
            this.tableTalentIds = [];
            this.tableTalentLevels = [];
            this.tableHideTalentIds = [];
            this.tableDeathTalent = [];
            this.fightScene = null;



        }
        // public frame_on() {
        //     console.log("12121212");
        // }


        public get x(): number {
            return this._x;
        }
        public get y(): number {
            return this._y;
        }
        public set x(xx) {
            this._x = xx;
        }
        public set y(yy) {
            this._y = yy;
        }
        public loadBody() {
            this.bodySpxId = TableMapRole.Item(this.mapRoleId).body_spx_id;
            if (this.bodySpxId != -1) {
                [this.body,] = HunterSpineX(this.bodySpxId, Gmgr.Instance.spineX_scale)
                // this.body.spine.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.frame_on, this);
                this.body.SetAutoUpdate(false)
                this.nodeRoot.addChild(this.body.spine);
                // this.nodeBody.visible = false;
                this.body.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Stand);

            }

            this.loadSlots();
            this.loadDc();
            this.bone_down_x = this.body.spine.armature.getBone("buff_flo").global.x;
            this.bone_down_y = this.body.spine.armature.getBone("buff_flo").global.y;
            this.bone_mid_x = this.body.spine.armature.getBone("buff_mid").global.x;
            this.bone_mid_y = this.body.spine.armature.getBone("buff_mid").global.y;
            this.bone_up_x = this.body.spine.armature.getBone("buff_up").global.x;
            this.bone_up_y = this.body.spine.armature.getBone("buff_up").global.y;
        }
        private bone_down_x;
        private bone_down_y;
        private bone_mid_x;
        private bone_mid_y;
        private bone_up_x;
        private bone_up_y;

        // 角色脚下影子
        public loadSlots() {
            this.shadow.source = UIConfig.UIConfig_CommonBattle.common_shadow;
            this.nodeRoot.addChild(this.shadow);
        }

        // 人物头顶上的
        public loadDc() {
            this.loadHpDc();
            this.BuffLdPos = { x: -ConstantConfig_CommonBattle.blood_board.w / 2 + 30, y: ConstantConfig_CommonBattle.blood_board.h / 2 + ConstantConfig_CommonBattle.BUFF_HP_DIS_OFFSETY + 5 };
        }
        private rectx: eui.Rect = new eui.Rect();
        public convertRect(Object) {
            this.rectx.width = Object.width;
            this.rectx.height = Object.height;
            return this.rectx;
        }

        // 人物血条
        public loadHpDc() {
            let bar_size = { width: 0, height: 0 }


            this.SpriteHpBoard.source = UIConfig.UIConfig_CommonBattle.hp_board;
            this.fightScene.hpBox.addChild(this.SpriteHpBoard)
            this.SpriteHpBoard.anchorOffsetX = this.SpriteHpBoard.width / 2;
            this.SpriteHpBoard.anchorOffsetY = this.SpriteHpBoard.height / 2;
            this.SpriteHpBoard.x = 0;
            this.SpriteHpBoard.y = 0;
            bar_size = this.convertRect(this.SpriteHpBoard);

            this.SpritePdhBlood.source = UIConfig.UIConfig_CommonBattle.hp_blood_pdh;
            this.fightScene.hpBox.addChild(this.SpritePdhBlood);
            this.SpritePdhBlood.anchorOffsetX = 0;
            this.SpritePdhBlood.anchorOffsetY = this.SpritePdhBlood.height / 2;
            this.SpritePdhBlood.x = -bar_size.width / 2;
            this.SpritePdhBlood.y = 0;
            this.SpritePdhBlood.visible = false;


            this.SpriteRedBlood.source = UIConfig.UIConfig_CommonBattle.hp_blood_red;
            this.fightScene.hpBox.addChild(this.SpriteRedBlood);
            this.SpriteRedBlood.anchorOffsetX = 0;
            this.SpriteRedBlood.anchorOffsetY = this.SpriteRedBlood.height / 2;
            this.SpriteRedBlood.x = -bar_size.width / 2;
            this.SpriteRedBlood.y = 0;
            this.SpriteRedBlood.visible = false;

            this.SpriteHpBloodGround.source = UIConfig.UIConfig_CommonBattle.hp_blood_r;
            this.fightScene.hpBox.addChild(this.SpriteHpBloodGround);
            this.SpriteHpBloodGround.anchorOffsetX = 0
            this.SpriteHpBloodGround.anchorOffsetY = this.SpriteHpBloodGround.height / 2;
            this.SpriteHpBloodGround.x = -bar_size.width / 2;
            this.SpriteHpBloodGround.y = 0;

            this.SpriteHpBlood.source = UIConfig.UIConfig_CommonBattle.hp_blood_l;
            this.fightScene.hpBox.addChild(this.SpriteHpBlood);
            this.SpriteHpBlood.anchorOffsetX = 0;
            this.SpriteHpBlood.anchorOffsetY = this.SpriteHpBlood.height / 2;
            this.SpriteHpBlood.x = -bar_size.width / 2;
            this.SpriteHpBlood.y = 0;
            this.SpriteHpBlood.visible = true;

            this.SpriteBloodSplit.source = UIConfig.UIConfig_CommonBattle.blood_split;
            this.fightScene.hpBox.addChild(this.SpriteBloodSplit);
            this.SpriteBloodSplit.anchorOffsetX = this.SpriteBloodSplit.width / 2;
            this.SpriteBloodSplit.anchorOffsetY = 0;
            this.SpriteBloodSplit.x = 0;
            this.SpriteBloodSplit.y = 0;
            this.SpriteBloodSplit.visible = false;
            this.BloodSplit.width = this.SpriteBloodSplit.width;
            this.BloodSplit.height = this.SpriteBloodSplit.height;

            this.SpriteCdBar.source = UIConfig.UIConfig_CommonBattle.cd_bar;
            this.fightScene.hpBox.addChild(this.SpriteCdBar);
            this.SpriteCdBar.anchorOffsetX = 0;
            this.SpriteCdBar.anchorOffsetY = this.SpriteCdBar.height / 2;
            this.SpriteCdBar.x = -bar_size.width / 2;
            this.SpriteCdBar.y = 0;


            // let hp_size_bar = getPercentSize(bar_size, 1)
            // let rect = new eui.Rect(hp_size_bar.width, hp_size_bar.height);
            // rect.x = -bar_size.width / 2;
            // rect.visible = false;
            // this.nodeDc.addChildAt(rect, 2);
            // this.SpriteHpBoard.mask = rect;

            // let cd_size_bar = getPercentSize(bar_size, 0)
            // let rect1 = new eui.Rect(cd_size_bar.width, cd_size_bar.height);
            // rect1.x = -bar_size.width / 2;
            // rect1.y = this.SpriteCdBar.height / 2;
            // rect1.visible = false;
            // this.nodeDc.addChildAt(rect1, 11);
            // this.SpriteCdBar.mask = rect1;

            this.BarHpSize = bar_size
        }

        // 切换骨骼序列
        public changeAction(actionId) {
            if (this.actionId == actionId && this.lastDir == this.dir) {
                return
            }

            this.actionId = actionId;
            this.lastDir = this.dir;

            if (this.actionId < ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                this.actionLastId = actionId + this.dir
            }

            if (this.body != null) {
                this.bBodyActEnd = false
                this.body.stopAllActions();

                if (actionId < ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                    let bFlipX = false
                    if (this.ePosition == TableEnum.TablePositionType.POSITION_LEFT) {
                        bFlipX = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Right, false, true)
                    } else if (this.ePosition == TableEnum.TablePositionType.POSITION_RIGHT) {
                        bFlipX = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Left, true, false)
                    }

                    this.setFlipX(bFlipX)
                    this.body.SetLoop(this.bActLoop)
                    this.body.ChangeAction(actionId);
                } else {
                    let bFlipX = yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_LEFT, false, true)
                    this.setFlipX(bFlipX)
                    this.body.SetLoop(this.bActLoop)
                    this.body.ChangeAction(actionId);
                }
                if (this.bodyActionFun != null && this.bDead == false && this.bMomentDead == false) {
                    this.bodyActionFun(this)
                    this.bodyActionFun = null
                }
            }
        }

        /*设置是否翻转*/
        public setFlipX(flip) {
            if (this.body != null) {
                this.body.setFlipX(flip)
            }
        }

        public changeOtherState(otherState, param?) {
            let self = this;
            // body    
            if (self.otherState == otherState) { return }

            /*
            if( self.bEnemy == false and self.roleId == 10011 ){
                if( otherState == TableEnumOtherState.OtherState_Attack ){
                    let a = 2
                }
            }
            */

            if (otherState == TableEnum.TableEnumOtherState.OtherState_None) {
                self.noHurtMs = 0
                self.bNoHurtJudge = true
            } else {
                self.bNoHurtJudge = false
            }

            if (self.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                //self.clearEffects()
                self.loadSpxData()
            }

            if (otherState == TableEnum.TableEnumOtherState.OtherState_None) {
                self.changeOtherNone()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Appear) {
                self.changeOtherAppear()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Curve) {
                self.changeOtherCurve()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Run) {
                self.changeOtherRun()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_JumpUp) {
                self.changeOtherJumpUp()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_JumpDown) {
                self.changeOtherJumpDown()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Hurt) {
                self.changeOtherHurt()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy) {
                self.changeHeavyHurt()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_StirUp) {
                let tag = self.changeOtherStirUp(param)
                if (tag == true) { return }
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_StirDown) {
                self.changeOtherStirDown()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
                self.changeOtherFallDown()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_GetUp) {
                self.changeOtherGetUp()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
                self.changeOtherDie()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Static) {
                self.changeOtherStatic()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Parry) {
                self.changeOtherParry()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_EnterWeek) {
                self.changeOtherEnterweek()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Weeking) {
                self.changeOtherWeeking()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_ExitWeek) {
                self.changeOtherExitweek()
            } else if (otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                self.changeOtherAttack()
            }

            self.otherState = otherState

        }

        public loadSpxData(...args) {
            // body
            this.setActInterval(Gmgr.Instance.battleSpeed)
            this.setActLoop(true)
        }

        public setActInterval(speed) {
            // body
            this.actSpeed = speed

            if (this.body != null) {
                //this.body.getAnimation().setSpeedScale(speed)
                this.body.setSpeedScale(speed)
            }

            if (this.curSkill != null) {
                let curUnit = this.curSkill.getCurUnit()
                if (curUnit != null) {
                    curUnit.setInterval(speed)
                }
            }
        }
        /***是否循环 */
        public setActLoop(bLoop) {
            // body	
            this.bActLoop = bLoop
        }

        public changeOtherNone(...args) {
            // body
            this.bSprintJump = false
            //this.curSkill = null
            let y = this.floor + Gmgr.Instance.upY
            if (this.bGravity == true && Math.floor(this.y) > Math.floor(y)) {
                this.setActLoop(false)
                this.otherState = TableEnum.TableEnumOtherState.OtherState_JumpDown
            } else {
                this.setActLoop(true)
            }
        }

        public changeOtherAppear(...args) {
            // body
            this.setActLoop(false)
        }

        public changeOtherCurve(...args) {
            // body
            this.setActLoop(false)
            //this.fightScene.setGameCurve(true)
        }

        public changeOtherRun(...args) {
            // body
            this.setActLoop(true)
            this.runState = TableEnum.TableRunStage.STAGE_RUN_ONE
            this.runSoundFps = 0
        }

        public changeOtherJumpUp(...args) {
            // body
            this.lastState = this.state
            this.jumpSpeed = ConstantConfig_RoleBattle.LEADER_JUMP_SPEED
            this.setActLoop(false)
        }

        public changeOtherJumpDown(...args) {
            // body
            this.lastState = this.state
            this.jumpSpeed = 0
            this.setActLoop(false)
        }

        public changeOtherStatic(...args) {
            // body
            this.setActLoop(false)
            //cclog("dongzuo===="..this.y)
        }

        public changeOtherParry(...args) {
            this.setActLoop(true)
            this.parryTime = this.parryMaxTime
        }

        public changeOtherEnterweek() {
            this.setActLoop(false)
        }

        public changeOtherWeeking() {
            this.setActLoop(true)
        }

        public changeOtherExitweek() {
            this.setActLoop(false)
        }

        public changeOtherHurt(...args) {
            // body
            this.setActLoop(false)
        }

        public changeHeavyHurt(...args) {
            // body
            this.setActLoop(false)
        }

        public changeOtherStirUp(force) {
            // body
            if (force != null && force == true) {
                this.setActLoop(false)
                this.striBreakTime = 0
                return false
            } else {
                if (this.bDead == false && this.bStirUp == false) {
                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt)
                    return true
                }
                this.setActLoop(false)
                this.striBreakTime = 0
                return false
            }
        }

        public changeOtherStirDown(...args) {
            // body
            this.setActLoop(false)
        }

        public changeOtherFallDown(...args) {
            // body
            if (this.bDead == false) {
                this.getUpTimeUpdate = this.getUpTime
            }
            this.setActLoop(false)
        }

        public changeOtherGetUp(...args) {
            // body
            this.beHurtTimes = 0
            this.bSprintJump = false
            this.goOtherGetUp()
            this.setActLoop(false)
        }

        public changeOtherDie(...args) {
            // body	  
            this.goOtherDie()
            if (this.shadow && this.shadow.parent) {
                this.shadow.parent.removeChild(this.shadow);
            }
            if (this.SpriteHpBoard && this.SpriteHpBoard.parent) {
                this.SpriteHpBoard.parent.removeChild(this.SpriteHpBoard);
            }
            if (this.SpritePdhBlood && this.SpritePdhBlood.parent) {
                this.SpritePdhBlood.parent.removeChild(this.SpritePdhBlood);
            }
            if (this.SpriteRedBlood && this.SpriteRedBlood.parent) {
                this.SpriteRedBlood.parent.removeChild(this.SpriteRedBlood);
            }
            if (this.SpriteHpBloodGround && this.SpriteHpBloodGround.parent) {
                this.SpriteHpBloodGround.parent.removeChild(this.SpriteHpBloodGround);
            }
            if (this.SpriteHpBlood && this.SpriteHpBlood.parent) {
                this.SpriteHpBlood.parent.removeChild(this.SpriteHpBlood);
            }
            if (this.SpriteBloodSplit && this.SpriteBloodSplit.parent) {
                this.SpriteBloodSplit.parent.removeChild(this.SpriteBloodSplit);
            }
            if (this.SpriteCdBar && this.SpriteCdBar.parent) {
                this.SpriteCdBar.parent.removeChild(this.SpriteCdBar);
            }
            this.clearAllBuffs();
        }

        public changeOtherAttack(...args) {
            // body
            // null
        }

        public goOtherGetUp(...args) {
            // body	
        }

        public goOtherDie(...args) {
            // body
            this.setActLoop(false)
        }

        /*每帧检测基本状态*/
        public procState(tick) {
            // body	
            let self = this;
            let tag: any
            // if ((this.bStun == false && this.bFrozen == false && this.bSleep == false && this.bStoned == false) && this.otherState < TableEnum.TableEnumOtherState.OtherState_Hurt) {

            //     if (this.state == TableEnum.TableEnumBaseState.State_None) {
            //         //tag = this.procStateNone(tick)
            //     } else if (this.state == TableEnum.TableEnumBaseState.State_Walk) {
            //         //tag = this.procStateWalk(tick)
            //     } else if (this.state == TableEnum.TableEnumBaseState.State_Sprint) {
            //         //tag = this.procStateSprint(tick)
            //     }

            // }


            self.procActId(tick);
            switch (self.otherState) {
                case TableEnum.TableEnumOtherState.OtherState_None:
                    tag = self.procOtherNone(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Appear:
                    tag = self.procOtherAppear(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Curve:
                    tag = self.procOtherCurve(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Run:
                    tag = self.procOtherRun(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_JumpUp:
                    tag = self.procOtherJumpup(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_JumpDown:
                    tag = self.procOtherJumpDown(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Hurt:
                    tag = self.procOtherHurt(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy:
                    tag = self.procHeavyHurt(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_StirUp:
                    tag = self.procOtherStirUp(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_StirDown:
                    tag = self.procOtherStirDown(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_FallDown:
                    tag = self.procOtherFallDown(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_GetUp:
                    tag = self.procOtherGetUp(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Die:
                    tag = self.procOtherDie(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Static:
                    tag = self.procOtherStatic(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Parry:
                    tag = self.procOtherParry(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_EnterWeek:
                    tag = self.procOtherEnterweek(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Weeking:
                    tag = self.procOtherWeeking(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_ExitWeek:
                    tag = self.procOtherExitweek(tick);
                    break;
                case TableEnum.TableEnumOtherState.OtherState_Attack:
                    tag = self.procCurSkill(tick);
                    break;
            }
            // if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Weeking) {
            //     tag = this.procOtherWeeking(tick)
            // } else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_ExitWeek) {
            //     tag = this.procOtherExitweek(tick)
            // } else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
            //     tag = this.procOtherAttack(tick)
            //     tag = this.procCurSkill(tick)
            // }
            self.procActId(tick)
        }


        public resetSkill(args?) {
            // body  
            this.curSkill = null
            this.curSkillIdx = TableEnum.TableEnumOperate.Operate_None
        }

        public handlePos(args?) {
            // body
            if (this.comparePos() > 50) {
                this.breakMoveAni(null)
            } else {
                this.backHoming()
            }
        }

        public finishSkill() {
            if (this.bDead == false && this.actionId >= ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                this.handlePos()
                this.procState(0)
                if (this.curSkill != null) {
                    this.resetSkill()
                }
            }
        }

        /*不受伤回退到原位置*/
        public backHoming(...args) {
            // body  
            this.setPos(this.teamOriginalX, this.teamOriginalY + (Gmgr.Instance.floor - Gmgr.Instance.ground))
        }


        public procCurSkill(tick) {
            // body
            if (this.curSkill == null) { return true }
            let tag = this.curSkill.getIsFinish()
            if (tag == true) {
                //this.resetSkill()         		
                //this.recoverOriginalState()
                this.finishSkill()
            } else {
                this.curSkill.update(tick)
                tag = this.curSkill.getSkillToFloorOver()
                let tmpY = Gmgr.Instance.floor + this.floor - Gmgr.Instance.ground
                if (tag == true && Math.floor(this.y) <= Math.floor(tmpY)) {
                    this.y = tmpY
                    this.curSkill.nextAction()
                }
            }
            return false
        }


        public procOtherAttack(tick) {
            // body    
            return false
        }

        public leaveWeekTrigger() {

        }


        public procOtherExitweek(tick) {
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                this.leaveWeekTrigger()
            }
        }


        public procOtherWeeking(tick) {

        }


        public procOtherParry(tick) {
            // body
            let rt = tick * 1000
            this.parryTime = this.parryTime - rt
            if (this.parryTime <= 0) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }
            /*
            if( this.body != null and this.isBodyActEnd() == true ){
            }
            */
        }

        /*检测人物是否在地板上*/
        public getIsOnFloor(...args) {
            // body
            let bOn = false
            let tmpY = Gmgr.Instance.floor + this.floor - Gmgr.Instance.ground
            if (Math.floor(this.y) == Math.floor(tmpY)) {
                bOn = true
            }
            return bOn
        }

        public procOtherStatic(tick) {
            // body
            let rt = tick * 1000
            this.stiffTime = this.stiffTime - rt
            if (this.body != null) {
                //if( this.body != null and this.isBodyActEnd() == true ){
                if (this.stiffTime <= 0) {
                    if (this.getIsOnFloor()) {
                        this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                    } else {
                        this.stiffTime = 0
                        this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED
                        this.stirSpeedX = 0
                        this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp, true)
                    }
                }
            }
        }

        public procOtherDie(tick) {
            // body
            if (this.body == null) { return true }
            let bEnd = this.isBodyActEnd()
            if (bEnd == true) {
                this.bAlreadyDead = true
            }
            return false
        }

        public procOtherGetUp(tick) {
            // body    
            if (this.body == null) { return 1 }
            let bEnd = this.isBodyActEnd()
            if (bEnd == true) {
                // 起身归位                 
                //if( this.comparePos() > 50 ){ this.bodyActionFun = this.breakMoveAni }else{ this.bodyActionFun = this.backOriginalTeam }

                if (this.checkRunHome()) {
                    this.changeDir(this.initDir, true)
                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run)
                } else {
                    if (this.comparePos() > 50) {
                        this.bodyActionFun = this.breakMoveAni
                    } else {
                        this.bodyActionFun = this.backOriginalTeam
                    }
                }

                //this.bGetUpOver = true
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }

            return false
        }

        public procOtherFallDown(tick) {
            let self = this;
            // body
            let rt = tick * 1000
            let distance = 0
            if (self.bUpSpring == true && self.bGravity == true) {
                distance = self.stirUpSpeed * rt
                if (self.bFallDownFlag == true) {
                    self.moveMap(0, distance)
                    self.stirUpSpeed = self.stirUpSpeed - ConstantConfig_RoleBattle.GRAVITY * rt
                    if (self.stirUpSpeed <= 0) {
                        self.stirUpSpeed = 0
                        self.bFallDownFlag = false
                    }
                    self.setPosY(self.y)
                } else {
                    self.moveMap(0, -distance)
                    let tmpY = Gmgr.Instance.floor + self.floor - Gmgr.Instance.ground
                    if (Math.floor(self.y) >= Math.floor(tmpY)) {
                        self.y = tmpY
                        if (self.stirUpSpeed > ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED_MAX) {
                            self.stirUpSpeed = self.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_AGAIN_RATIO
                            self.bUpSpring = true
                            self.bFallDownFlag = true
                            return 1
                        }
                        self.bUpSpring = false
                        return 1
                    }
                    self.setPosY(self.y)
                    self.stirUpSpeed = self.stirUpSpeed + ConstantConfig_RoleBattle.GRAVITY * rt
                }
                if (self.dir == TableEnum.TableEnumDir.Dir_Right) {
                    distance = -self.stirSpeedX * rt
                } else {
                    distance = self.stirSpeedX * rt
                }
                self.moveMap(distance, 0)
                self.setPosX(self.x)
            } else {
                if (self.body != null && self.isBodyActEnd() == true) {
                    if (self.bDead == true) {
                        self.getUpTimeUpdate = 0
                        self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die)
                        return -1
                    }

                    self.getUpTimeUpdate = self.getUpTimeUpdate - rt
                    if (self.getUpTimeUpdate <= 0) {
                        self.getUpTimeUpdate = 0
                        self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_GetUp)
                    }
                }
            }

            return false
        }

        public procOtherStirUp(tick) {
            let self = this;
            // body
            let rt = tick * 1000
            let distance = 0
            if (self.bGravity == true) {
                distance = self.stirUpSpeed * rt
                self.moveMap(0, distance)

                let riseBreakValue = 0
                if (self.y - (Gmgr.Instance.ground - Gmgr.Instance.floor) <= ConstantConfig_RoleBattle.VERTICAL_BREAK_Y) {
                    self.striBreakTime = self.striBreakTime + rt
                    riseBreakValue = ConstantConfig_RoleBattle.VERTICAL_BREAK_V0 + ConstantConfig_RoleBattle.VERTICAL_BREAK_A * self.striBreakTime
                }

                self.stirUpSpeed = self.stirUpSpeed - ConstantConfig_RoleBattle.GRAVITY * rt - riseBreakValue;
                let aaa = Gmgr.Instance.ground;
                let bbb = Gmgr.Instance.floor;
                // console.log(self.y - (Gmgr.Instance.ground - Gmgr.Instance.floor)+"******************"+ConstantConfig_RoleBattle.VERTICAL_END_MAX);
                if (self.stirUpSpeed <= 0 || self.y - (Gmgr.Instance.ground - Gmgr.Instance.floor) <= ConstantConfig_RoleBattle.VERTICAL_END_MAX) {
                    self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirDown)
                    self.stirUpSpeed = 0;

                }
                self.setPosY(self.y);
            }

            if (self.dir == TableEnum.TableEnumDir.Dir_Right) {
                distance = -self.stirSpeedX * rt
            } else {
                distance = self.stirSpeedX * rt
            }
            self.moveMap(distance, 0)
            self.setPosX(self.x);

            return false
        }

        public procOtherStirDown(tick) {
            // body
            let self = this;
            let rt = tick * 1000
            let distance = 0
            if (self.bGravity == true) {
                distance = self.stirUpSpeed * rt
                self.moveMap(0, -distance);
                let tmpY = Gmgr.Instance.floor + self.floor - Gmgr.Instance.ground;
                if (Math.floor(self.y) >= Math.floor(tmpY)) {
                    self.y = tmpY
                    let high = self.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_BIG
                    let low = self.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_SML
                    if (self.bDead == true) {
                        self.stirUpSpeed = high
                    } else {
                        if (self.formType == TableEnum.TableEnumFromClassify.TYPE_PERSON || self.formType == TableEnum.TableEnumFromClassify.TYPE_BOSS) {
                            self.stirUpSpeed = low
                        } else {
                            self.stirUpSpeed = high
                        }
                    }

                    /*
                    if( this.bDead and this.formType != TableEnumFromClassify.TYPE_ENEMY ){
                        this.stirUpSpeed = this.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_BIG
                    }else{
                        this.stirUpSpeed = this.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_SML
                    }
                    */

                    self.bUpSpring = true
                    self.bFallDownFlag = true
                    self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_FallDown)
                    self.setPosY(self.y)

                    //return 1
                    return true
                }
                self.setPosY(self.y)
                self.stirUpSpeed = self.stirUpSpeed + ConstantConfig_RoleBattle.GRAVITY * rt
            }
            if (self.dir == TableEnum.TableEnumDir.Dir_Right) {
                distance = -self.stirSpeedX * rt
            } else {
                distance = self.stirSpeedX * rt
            }
            self.moveMap(distance, 0)
            self.setPosX(self.x)

            return false
        }

        public procOtherJumpup(tick) {
            // body
            let self = this;
            let rt = tick * 1000
            if (self.bGravity == true) {
                let distance = self.jumpSpeed * rt
                self.moveMap(0, distance)
                self.jumpSpeed = self.jumpSpeed - ConstantConfig_RoleBattle.GRAVITY * rt
                if (self.jumpSpeed <= 0) {
                    self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_JumpDown)
                    self.jumpSpeed = 0
                }
                self.setPosY(self.y)
            }

            return false
        }

        public procOtherJumpDown(tick) {
            // body
            let self = this;
            let rt = tick * 1000
            if (self.bGravity == true) {
                let distance = self.jumpSpeed * rt
                self.moveMap(0, -distance)
                let tmpY = Gmgr.Instance.floor + self.floor - Gmgr.Instance.ground
                if (Math.floor(self.y) <= Math.floor(tmpY)) {
                    self.y = tmpY
                    self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                    self.setPosY(self.y)
                    self.bSprintJump = false
                    // return 1
                    return true
                }
                self.setPosY(self.y)
                self.jumpSpeed = self.jumpSpeed + ConstantConfig_RoleBattle.GRAVITY * rt
            } else {
                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }

            return false
        }

        public procOtherHurt(tick) {
            // body
            let self = this;
            let rt = tick * 1000
            if (self.body != null && self.isBodyActEnd() == true) {
                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }

            return false
        }

        public procOtherEnterweek(tick) {
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Weeking)
                this.enterWeekTrigger()
            }
        }

        public enterWeekTrigger() {
            this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENTER_WEEK, -1, null, null);
        }

        public procHeavyHurt(tick) {
            // body
            let rt = tick * 1000
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }

            return false
        }

        public procActId(tick) {
            // body
            let self = this;
            if (self.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) { return }
            let actId = self.actionId
            if (self.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
                self.bStandStun = false
                self.bStandFrozen = false
                self.bStandSleep = true
                self.bStandStoned = true
                //actId = self.otherState * 2 + self.dir
                actId = self.otherState
            } else {
                if (self.bStun) {
                    self.bStandStun = true
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = TableEnum.TableEnumOtherState.OtherState_Static
                } else if (self.bFrozen) {
                    self.bStandFrozen = true
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = TableEnum.TableEnumOtherState.OtherState_Static
                } else if (self.bSleep) {
                    self.bStandSleep = true
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = TableEnum.TableEnumOtherState.OtherState_Static
                } else if (self.bStoned) {
                    self.bStandStoned = true
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = TableEnum.TableEnumOtherState.OtherState_Static
                } else {
                    //actId = self.state * 2 + self.dir
                    actId = self.state
                }
            }

            self.changeAction(actId)
        }

        public procOtherNone(tick) {
            let self = this;
            // body    
            let tmpY = Gmgr.Instance.floor + self.floor - Gmgr.Instance.ground
            if (self.bGravity == false) {
                if (Math.floor(self.y) < Math.floor(tmpY)) {
                    self.y = self.y - 1
                    if (self.y >= tmpY) {
                        self.y = tmpY
                    }
                }

                if (Math.floor(self.y) > Math.floor(tmpY)) {
                    self.y = self.y + 1
                    if (self.y <= tmpY) {
                        self.y = tmpY
                    }
                }
            } else {
                if (Math.floor(self.y) < Math.floor(tmpY) && !self.bInGut) {
                    self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_JumpDown)
                }

            }

            self.changeDir(self.tempMoveDir, false)
            // 针对回到初始位置进行处理
            //let fightScene = StageSceneManager.GetCurScene()
            // wu zhi 3
            if (self.fightScene.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                self.procNoHurtDis(tick)
            }

            return false
        }

        /*改变人物方向*/
        public changeDir(dir, force) {
            let temp_dir = 0;
            // body
            if (temp_dir != dir) {
                temp_dir = dir
            }

            if (this.bStun == true || this.bDead == true || this.bCanRemove == true || dir == -1) {
                return
            }

            if (force == true) {
                this.dir = dir
                return
            }

            if (this.otherState >= TableEnum.TableEnumOtherState.OtherState_Hurt && this.otherState < TableEnum.TableEnumOtherState.OtherState_Attack) {
                return
            }

            this.dir = dir
            this.tempMoveDir = -1

        }

        public procNoHurtDis(tick) {
            // body
            if (this.bInGut) { return }
            if (this.bNoHurtJudge == false) { return }
            if (this.bStun || this.bSilence) { return }
            this.noHurtMs = this.noHurtMs + tick * 1000
            if (this.noHurtMs >= this.homingTime) {
                // and this.x >= 0 and this.x <= Device.STANDARD_SCREEN_W
                if (Math.abs(this.teamOriginalX - this.x) > ConstantConfig_RoleBattle.NO_HURT_DIFFER) {

                    if (this.checkRunHome()) {
                        this.changeDir(this.initDir, true)
                        this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run)
                    } else {
                        if (this.comparePos() > 50) {
                            this.breakMoveAni(null)
                        } else {
                            this.backOriginalTeam()
                        }
                    }
                }
                this.bNoHurtJudge = false
            }
        }

        public checkRunHome() {
            let tag = false
            if (this.bEnemy == false) {
                if (this.x < this.teamOriginalX) {
                    tag = true
                }
            } else {
                if (this.x > this.teamOriginalX) {
                    tag = true
                }
            }
            return tag
        }

        /*比较起始点与现在位置的偏差*/
        public comparePos(args?) {
            // body
            return Math.floor(this.teamOriginalX - this.x)
        }

        public setRealPos(x, y) {
            this.realX = x;
            this.realY = y;
        }

        /*回退到原位置*/
        public backOriginalTeam(...args) {
            // body    

            let des_x = this.teamOriginalX
            let des_y = this.teamOriginalY + (Gmgr.Instance.floor - Gmgr.Instance.ground)
            this.setPos(des_x, des_y)
            /*
            let function callback(cb, role)   
                if( role != null ){
                    role.setPos(des_x, des_y)  
                }
            } 
            let move = cc.MoveTo.create(0.05, cc.p(des_x , des_y))
            let action = cc.EaseSineOut.create(move)         
            this.body.runAction(cc.Sequence.create(action,cc.CallFunc.create(callback, this)))
            */
        }

        public setBodyXY(x, y) {
            this.bodyX = x
            this.bodyY = y
        }

        public renewDcPos() {
            if (this.body == null) {
                return
            }
            let word_x = this.body.GetPosX()
            let word_y = this.body.GetPosY()

            if (this.bodyX == word_x && this.bodyY == word_y) {
                return
            }
            this.setBodyXY(word_x, word_y);

            // this.bone_down_x = this.body.spine.armature.getBone("buff_flo").global.x;
            // this.bone_down_y = this.body.spine.armature.getBone("buff_flo").global.y;
            // let bone_mid_x = this.body.spine.armature.getBone("buff_mid").global.x;
            // let bone_mid_y = this.body.spine.armature.getBone("buff_mid").global.y;
            // let bone_up_x = this.body.spine.armature.getBone("buff_up").global.x;
            // let bone_up_y = this.body.spine.armature.getBone("buff_up").global.y;

            if (this.nodeDown != null) {
                this.nodeDown.x = word_x + this.bone_down_x * this.scale;
                this.nodeDown.y = word_y + this.bone_down_y * this.scale;
            }
            if (this.nodeMid != null) {
                this.nodeMid.x = word_x + this.bone_mid_x * this.scale;
                this.nodeMid.y = word_y + this.bone_mid_y * this.scale;
            }
            if (this.nodeUp != null) {
                this.nodeUp.x = word_x + this.bone_up_x * this.scale;
                this.nodeUp.y = word_y + this.bone_up_y * this.scale;
            }

            let dcX = word_x + this.bone_up_x * this.scale;
            let dcY = word_y + this.bone_up_y * this.scale + ConstantConfig_CommonBattle.dcOffsetPos.y;
            if (this.SpriteHpBoard) {
                this.SpriteHpBoard.x = (0 + 0) + dcX;
                this.SpriteHpBoard.y = (0 + 0) + dcY;
            }
            if (this.SpritePdhBlood) {
                this.SpritePdhBlood.x = (0 + -29.5) + dcX;
                this.SpritePdhBlood.y = (0 + 0) + dcY;
            }
            if (this.SpriteRedBlood) {
                this.SpriteRedBlood.x = (0 + -29.5) + dcX;
                this.SpriteRedBlood.y = (0 + 0) + dcY;
            }
            if (this.SpriteHpBloodGround) {
                this.SpriteHpBloodGround.x = (0 + -29.5) + dcX;
                this.SpriteHpBloodGround.y = (0 + 0) + dcY;
            }
            if (this.SpriteHpBlood) {
                this.SpriteHpBlood.x = (0 + -29.5) + dcX;
                this.SpriteHpBlood.y = (0 + 0) + dcY;
            }
            if (this.SpriteBloodSplit) {
                this.SpriteBloodSplit.x = (0 + 0) + dcX;
                this.SpriteBloodSplit.y = (0 + 0) + dcY;
            }
            if (this.SpriteCdBar) {
                this.SpriteCdBar.x = (0 + -29.5) + dcX;
                this.SpriteCdBar.y = (0 + 0) + dcY;
            }
            if (this.nodeDc != null) {
                this.nodeDc.x = word_x + this.bone_up_x * this.scale;
                this.nodeDc.y = word_y + this.bone_up_y * this.scale + ConstantConfig_CommonBattle.dcOffsetPos.y;
            }
        }

        private shadowx = 55;
        private shadowy = 10;
        /*设置角色相关位移坐标*/
        public setPos(x, y) {
            let self = this;
            // body  
            self.x = x
            self.y = y
            // console.log(y);

            self.realX = self.x
            self.realY = self.y

            if (self.body != null) {
                self.body.SetPosition(x, y);
            }

            if (self.haloFront != null) {
                self.haloFront.setPosition(x, y)
            }

            if (self.haloBack != null) {
                self.haloBack.setPosition(x, y)
            }

            if (self.shadow != null) {
                if (self.bInGut) {
                    [self.shadow.x, self.shadow.y] = [self.x - self.shadowx, self.y - self.shadowy];
                } else {
                    [self.shadow.x, self.shadow.y] = [self.x - self.shadowx, Gmgr.Instance.floor + (self.floor - Gmgr.Instance.ground) - self.shadowy];
                }
            }

            //this.renewDcPos()
        }

        public isBodyActEnd(...args) {
            // body
            return this.bBodyActEnd
        }

        public procOtherAppear(tick) {
            // body
            let rt = tick * 1000
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                if (this.appearCallback != null) {
                    this.appearCallback.call(this.appearthisobj);
                    this.appearthisobj = null;
                }
            }
            return false
        }

        public procOtherCurve(tick) {
            // body
            let rt = tick * 1000
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            }
            return false
        }

        /*地图移动*/
        public moveMap(x, y) {
            // body  

            this.x = this.x + x

            let scene = StageSceneManager.Instance.GetCurScene()
            if (this == scene.objectRole) {
                //cclog("otherState======="..this.otherState)       
                if (y > 0) {
                    if (this.y >= ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER) {
                        scene.updateTeamMap(0, -y)
                        this.jumpOffset = this.jumpOffset - y
                    } else {
                        if (this.y + y > ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER) {
                            this.jumpOffset = 0
                            this.jumpOffset = this.jumpOffset - y + ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER + this.y
                            scene.updateTeamMap(0, y + ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER - this.y)
                            this.y = ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER
                        } else {
                            this.y = this.y - y
                        }
                    }
                } else if (y < 0) {
                    if (this.jumpOffset > 0) {
                        this.jumpOffset = this.jumpOffset - y
                        if (this.jumpOffset < 0) {
                            this.y = this.y - this.jumpOffset
                            y = y + this.jumpOffset
                            this.jumpOffset = 0
                            if (this.y < Gmgr.Instance.ground) {
                                this.y = Gmgr.Instance.ground
                            }
                        }
                        scene.updateTeamMap(0, y)
                    } else {
                        this.y = this.y - y
                        let tmpY = Gmgr.Instance.floor + (this.floor - Gmgr.Instance.ground)
                        if (Math.floor(this.y) < Math.floor(tmpY)) {
                            this.y = tmpY
                            Gmgr.Instance.floor = Gmgr.Instance.ground
                        }
                    }
                }
            } else {
                this.y = this.y - y
            }
        }

        /*设置坐标x*/
        public setPosX(x) {
            // body
            this.setPos(x, this.y)
        }

        /*设置坐标y*/
        public setPosY(y) {
            // body
            this.setPos(this.x, y)
        }

        /*设置是否隐藏*/
        public setVisible(tag) {
            // body  
            this.bVisible = tag

            if (this.body != null) {
                this.body.setVisibleSpx(tag);
            }

            if (this.haloFront != null) {
                this.haloFront.setVisible(tag)
            }

            if (this.haloBack != null) {
                this.haloBack.setVisible(tag)
            }

            if (this.shadow != null) {
                this.shadow.visible = tag
            }

            // if (this.nodeFollow != null) {
            //     this.nodeFollow.visible = tag
            // }

            /*
            if( this.nodeBuff != null ){
                this.nodeBuff.setVisible(tag)
            }
            */
        }

        /*获得人物hp*/
        public getHp(...args) {
            // body
            return this.attribs.curHp
        }
        //获得人物技能cd
        public getPressCdTime() {
            let skill = this.getPressSkill();
            if (skill != null) {
                let cd = SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.getTime();
                }
            }
            return 0;
        }

        /*获得人物最大hp*/
        public getMaxHp(bPdh?) {
            let self = this;
            self.CheatCheckSumAttr(null);
            let value = self.attribs.maxHp;
            let results = self.handleTalentEffect_ProtoToProto();
            value = value + results[TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP];

            let [bAttribAdd, addValue] = self.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null)
            let [bAttribCut, cutValue] = self.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null)
            let livingPerson = self.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP)

            let extra = (addValue - cutValue + livingPerson) / 100;
            let [, baseAddValue] = self.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null);
            let [, baseCutValue] = self.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null)
            let baseByFaction = self.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP)
            let baseByFightType = self.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP)
            let baseByFeature = self.handleTalentEffect_ProHurtByFeature(self.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP)
            let baseByDiff = self.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP)
            let base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + self.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_HP]) / 100;

            let numValue = value;
            if (self.isPerson()) {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0
                }
                if (base <= 0) {
                    base = 0
                }
                let real = value * percent + (self.baseAttribs[TableEnum.EnumGelAttrib.ATTR_HP]) * base + self.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP] - yuan3(bPdh != null, self.pdhValue, 0);
                if (real <= 0) {
                    real = 1
                }
                numValue = real;
            } else {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0
                }
                let real = value * percent + self.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP] - yuan3(bPdh != null, self.pdhValue, 0);
                if (real <= 0) {
                    real = 1;
                }
                numValue = real
            }
            return numValue;
        }

        public recordHpPer() {
            let self = this;
            self.preHpPer = self.getHp() / yuan3(self.bEnemy, self.attribs.maxHp, self.getMaxHp())
            if (self.preHpPer >= 1.0) { self.preHpPer = 1.0 }
        }

        public appearFight(args?) {
            this.bStartFight = true;
            this.loadEntireTalent();
            this.appearSpeical();
            //触发战斗开始天赋，如剑魂
            this.loadFightAppear();

        }
        //战斗开始时触发
        public loadFightAppear() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_APPEAR];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
            t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    talent.is_reset = true;
                }
            }
        }
        public appearSpeical() {
            this.loadEveryBody();
        }
        public loadEveryBody() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        }
        //加载全局天赋
        public loadEntireTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ALL_FIGHT];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        }

        public startFight() {
            //热血猎人删除
            //this.startSpecial();
            this.triggerFightStart();
            this.setHp(this.preHpPer * this.getMaxHp());
            this.openRoleDcUI();
            this.debugPrint = 1;
        }
        //战斗开始入场触发
        public triggerFightStart() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    talent.is_reset = true;
                }
            }
            t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_FIRST];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    talent.is_reset = true;
                }
            }
        }

        public procOtherRun(tick) {
            let self = this;
            // body 
            let rt = tick * 1000

            if (self.fightScene.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT && self.fightScene.sceneState != TableEnum.TableSceneState.SCENE_STATE_DIALOG) {
                if (self.bEnemy == false) {
                    if (self.runState == TableEnum.TableRunStage.STAGE_RUN_END) { return true }
                    //let fightScene = StageSceneManager.GetCurScene()   
                    let dis = self.moveSpeed * rt
                    let runDis = self.runDis + dis

                    let borderDis = 0;
                    if (self.fightScene.monsterStage == TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                        //borderDis = (FightDistanceConfig.A / fightScene.groundScale + FightDistanceConfig.Appear_Left_Mid_X * (1-fightScene.groundScale))        
                        borderDis = FightDistanceConfig.A
                    } else {
                        //borderDis = (FightDistanceConfig.B / fightScene.groundScale + FightDistanceConfig.Appear_Left_Mid_X * (1-fightScene.groundScale))        
                        borderDis = FightDistanceConfig.B
                    }

                    if (self.runState == TableEnum.TableRunStage.STAGE_RUN_ONE) {
                        if (self.fightScene.eStageState == TableEnum.TableStageState.STAGE_STATE_1ST) {
                            let x = Math.abs(self.fightScene.cameraX) + UIManager.StageWidth / (self.fightScene.groundScale) * FightDistanceConfig.Touch_Ratio
                            if (self.x >= Math.abs(self.fightScene.cameraX) + UIManager.StageWidth / (self.fightScene.groundScale) * FightDistanceConfig.Touch_Ratio && self.fightScene.cameraTouch == false) {
                                self.fightScene.openRunCamera(self)
                            }
                        } else {
                            let x = UIManager.StageWidth / (self.fightScene.groundScale) * FightDistanceConfig.Touch_Ratio
                            if (self.x >= UIManager.StageWidth / (self.fightScene.groundScale) * FightDistanceConfig.Touch_Ratio && self.fightScene.cameraTouch == false) {
                                self.fightScene.openRunCamera(self)
                            }
                        }
                    } else if (self.runState == TableEnum.TableRunStage.STAGE_RUN_TWO) {
                        // todo       
                    }

                    if (runDis > borderDis) {
                        self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                        self.runState = TableEnum.TableRunStage.STAGE_RUN_END
                        dis = borderDis - self.runDis
                    }
                    self.runDis = self.runDis + dis

                    self.moveMap(dis, 0)
                    self.setPosX(self.x)
                }
            } else {
                if (self.bEnemy == false) {
                    /*左边玩家*/
                    // 补位
                    let dis = self.moveSpeed * rt
                    let runDis = 0
                    if (self.dir == TableEnum.TableEnumDir.Dir_Right) {
                        runDis = self.x + dis
                        if (runDis > self.teamOriginalX) {
                            self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                            dis = self.teamOriginalX - self.x
                            // 区分补位和归位
                            if (self.bStartFight == false) {
                                self.recordHpPer()
                                self.appearFight()
                                self.startFight()
                            }
                        }
                        self.moveMap(dis, 0)
                        // 消失 
                    } else if (self.dir == TableEnum.TableEnumDir.Dir_Left) {
                        runDis = self.x - dis
                        if (runDis < -50) {
                            self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                            self.setVisible(false)
                        }
                        self.moveMap(-dis, 0)
                    }
                    self.setPos(self.x, self.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground))
                } else {
                    // 补位
                    /*右边玩家*/
                    let dis = self.moveSpeed * rt
                    let runDis = 0
                    if (self.dir == TableEnum.TableEnumDir.Dir_Left) {
                        if (self.bGoGutPos) {
                            runDis = self.x - dis
                            if (runDis < self.teamOriginalX) {
                                self.bGoGutPos = false
                                self.fightScene.monsterGutEnd(self)
                                self.changeDir(TableEnum.TableEnumDir.Dir_Left, true)
                                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                            }
                        } else {
                            runDis = self.x - dis
                            if (runDis < self.teamOriginalX) {
                                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                                dis = self.x - self.teamOriginalX
                                // 区分补位和归位
                                if (self.bStartFight == false) {
                                    self.recordHpPer()
                                    self.appearFight()
                                    self.startFight()
                                }
                            }
                        }
                        self.moveMap(-dis, 0)
                        // 消失
                    } else if (self.dir == TableEnum.TableEnumDir.Dir_Right) {
                        runDis = self.x + dis
                        if (self.bGoGutPos) {
                            if (runDis > self.teamOriginalX) {
                                dis = self.teamOriginalX - self.x
                                self.bGoGutPos = false
                                self.fightScene.monsterGutEnd(self)
                                self.changeDir(TableEnum.TableEnumDir.Dir_Left, true)
                                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                            }
                        } else {
                            if (runDis > UIManager.StageWidth / self.fightScene.groundScale + 50) {
                                self.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
                                self.setVisible(false)
                            }
                        }
                        self.moveMap(dis, 0)
                    }
                    self.setPos(self.x, self.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground))
                }
            }
            /*
            this.runSoundFps = this.runSoundFps + 1
            if( this.runSoundFps >= ConstantConfig_RoleBattle.RUN_SOUND_FPS_MAX ){
                this.runSoundFps = 0
                // cd可释放提示音效
                gmsound.eftByID(20039) 
            }
            */

            return false
        }

        public setPositionType(eType) {
            // body
            this.ePosition = eType
        }

        /*设置真实人物id*/
        public setRoleId(id) {
            // body
            this.roleId = id
        }

        /*设置baseGeneralId*/
        public setGeneralId(id) {
            this.generalId = id
        }

        public setOrderPos(orderPos) {
            // body
            this.orderPos = orderPos
        }

        public setTeamNum(eNum) {
            // body
            this.eTeamNum = eNum
        }

        /*人物是否是敌人*/
        public setIsEnemy(tag) {
            // body
            this.bEnemy = tag
        }
        public isSupport() {
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return true;
            } else {
                return false;
            }
        }

        public creatEntryCd(...args) {
            // body
            let pressSkill = this.getPressSkill()
            if (pressSkill != null) {
                SkillCdMgr.Instance.addSkillCd(this, pressSkill, true)
                this.pressCd = SkillCdMgr.Instance.getCurCd(pressSkill)
            }
        }


        /*获得人物按键技能*/
        public getPressSkill(...args) {
            // body
            return this.tableSkills[adjustIndex(1)]
        }

        public setRoleInfo(roleInfo) {
            // body
            this.roleInfo = roleInfo
        }

        /*保存人物信息MD5*/
        public SaveData(...args) {
            // body
            /*
            this.myData = this.CreateData()
            */
        }

        public SetAttrib(attribName, attribVal) {
            let self = this;
            if ((self.attribs[attribName] == null)) {
                //console.log("attrib " + attribName + " is illegal")
                console.assert(false)
            }
            self.attribs[attribName] = attribVal;
            self.SaveData()
        }

        public loadModelDB(...args) {
            // body	
            let instance = TableMapRole.Item(this.mapRoleId);

            this.profession = instance.model_profession
            this.sex = instance.model_sex

            this.eyePath = instance.eye_head
            this.talentEyePath = instance.eye_talent
            this.hurtNumPosX = instance.hurt_num_pos[adjustIndex(1)]
            this.hurtNumPosY = instance.hurt_num_pos[adjustIndex(2)]

            this.hurtNumOffsetNorX = instance.hurt_num_offset_nor[adjustIndex(1)]
            this.hurtNumOffsetNorY = instance.hurt_num_offset_nor[adjustIndex(2)]
            this.hurtNumOffsetSpeX = instance.hurt_num_offset_spe[adjustIndex(1)]
            this.hurtNumOffsetSpeY = instance.hurt_num_offset_spe[adjustIndex(2)]

            this.hitEffectOffsetNorX = instance.hit_effect_offset_nor[adjustIndex(1)]
            this.hitEffectOffsetNorY = instance.hit_effect_offset_nor[adjustIndex(2)]
            this.hitEffectOffsetSpeX = instance.hit_effect_offset_spe[adjustIndex(1)]
            this.hitEffectOffsetSpeY = instance.hit_effect_offset_spe[adjustIndex(2)]

            this.roleAniOffsetNorUpX = instance.role_ani_offset_nor_up[adjustIndex(1)]
            this.roleAniOffsetNorUpY = instance.role_ani_offset_nor_up[adjustIndex(2)]
            this.roleAniOffsetSpeUpX = instance.role_ani_offset_spe_up[adjustIndex(1)]
            this.roleAniOffsetSpeUpY = instance.role_ani_offset_spe_up[adjustIndex(2)]

            this.offsetNorMidX = instance.offset_nor_mid[adjustIndex(1)]
            this.offsetNorMidY = instance.offset_nor_mid[adjustIndex(2)]

            let tableSound = TableClientSoundResource.Table();
            let sound_id = instance.press_xuli_effect_sound
            if (sound_id != -1) {
                this.press_sound_path = tableSound[sound_id].sound_path
            }
            sound_id = instance.kill_xuli_effect_sound
            if (sound_id != -1) {
                this.kill_sound_path = tableSound[sound_id].sound_path
            }
        }

        /*处理命中特效*/
        public procHitEffects(tick) {
            // body	
            let list = this.tableHits;
            let i = 0;
            while (i < list.length) {
                let tEffect = list[i];
                let bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    CC_SAFE_DELETE(tEffect);
                    list.splice(i, 1);
                } else {
                    tEffect.update(tick);
                    i++;
                }
            }
        }

        public updateSpineX(tick) {
            // body
            // if (this.body != null) {
            //     this.body.UpdataAni(tick)
            // }
        }

        public updateEndBody(tick) {
            // body    
            let self = this;
            if (self.bBodyActEnd == true) { return }
            if (self.body.IsActEnd()) {
                self.bBodyActEnd = true
            }
        }

        /*设置透明度*/
        public setTrans(trans) {
            // body
            if (this.body != null) {
                this.body.spine.armature.display.alpha = trans / 255;
            }
        }

        public procTran(args?) {
            // body
            this.disappearTran = this.disappearTran - 10
            if (this.disappearTran < 0) { this.disappearTran = 0 }
            this.setTrans(this.disappearTran)
        }

        public procDisappear(tick) {
            // body
            if (this.bDisappear == false) { return }
            //StageRoleMob.procTran(this, tick)

            this.procDisappearCall();
        }
        public procDisappearCall() {
            if (this.disappearTran <= 100) {
                this.bDisappear = false
                this.bCanRemove = true
            }
        }

        /*处理特效*/
        public procEffects(tick) {
            // body	
            let self = this;
            let i = adjustIndex(1)
            while (i < self.tableEffects.length) {
                self.tableEffects[i].update(tick)
                i = i + 1
            }

            i = adjustIndex(1)
            while (i < self.tableEffects.length) {
                let tEffect = self.tableEffects[i]
                let bFinish = tEffect.getIsFinish()
                if (bFinish == true) {
                    CC_SAFE_DELETE(tEffect)
                    self.tableEffects.splice(i, 1);
                } else {
                    i = i + 1
                }
            }

            /*
            let i = 1
            while i <= this.tableEffects.length do
                let tEffect = this.tableEffects[i]
                let bFinish = tEffect.getIsFinish()
                if( bFinish == true ){
                    CC_SAFE_DELETE(tEffect)
                    table.remove(this.tableEffects, i)
                }else{
                    tEffect.update(tick)
                    i = i + 1
                }
            }
            */
        }

        public cleanDisplacement(...args) {
            // body
            this.DISPLACEMENT.id = -1
            this.DISPLACEMENT.speed_x = 0
            this.DISPLACEMENT.speed_y = 0
            this.DISPLACEMENT.aspeed_x = 0
            this.DISPLACEMENT.aspeed_y = 0
            this.DISPLACEMENT.aspeed_time = 0
            this.DISPLACEMENT.continue_time = 0
            this.bezierDisplacementId = -1
        }

        /*处理命中位移*/
        public procHitedDisplacement(tick) {
            let self = this;
            // body
            let rt = tick * 1000
            if (self.DISPLACEMENT.id <= 0) { return }
            if (self.DISPLACEMENT.aspeed_time > 0) {
                let tmpAccTime = rt
                self.DISPLACEMENT.aspeed_time = self.DISPLACEMENT.aspeed_time - rt
                if (self.DISPLACEMENT.aspeed_time < 0) {
                    tmpAccTime = tmpAccTime + self.DISPLACEMENT.aspeed_time
                }
                self.DISPLACEMENT.speed_x = self.DISPLACEMENT.speed_x + self.DISPLACEMENT.aspeed_x * tmpAccTime
                self.DISPLACEMENT.speed_y = self.DISPLACEMENT.speed_y + self.DISPLACEMENT.aspeed_y * tmpAccTime
                if (self.bStirUp == false) {
                    self.DISPLACEMENT.speed_y = 0
                }
            }

            let tmpSpeedTime = rt
            self.DISPLACEMENT.continue_time = self.DISPLACEMENT.continue_time - rt
            if (self.DISPLACEMENT.continue_time < 0) {
                tmpSpeedTime = tmpSpeedTime + self.DISPLACEMENT.continue_time
            }

            if (self.bezierDisplacementId != -1) {
                self.moveMap(self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime)
            } else {
                if (self.bEnemy) {
                    self.moveMap(self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime)
                } else {
                    self.moveMap(-self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime)
                }
                //self.moveMap(self.DISPLACEMENT.speed_x*tmpSpeedTime, self.DISPLACEMENT.speed_y*tmpSpeedTime)
                /*
                if( self.bHitedToRight == true ){
                    self.moveMap(self.DISPLACEMENT.speed_x*tmpSpeedTime, self.DISPLACEMENT.speed_y*tmpSpeedTime)
                }else{
                    self.moveMap(-self.DISPLACEMENT.speed_x*tmpSpeedTime, self.DISPLACEMENT.speed_y*tmpSpeedTime)
                }
                */

            }

            // 人物位移加入墙壁判断处理
            if (self.x < FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[adjustIndex(4)]) {
                self.x = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[adjustIndex(4)]
            }
            if (self.x > FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[adjustIndex(4)]) {
                self.x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[adjustIndex(4)]
            }

            self.setPosX(self.x)
            if (self.DISPLACEMENT.continue_time <= 0) {
                self.cleanDisplacement()
            }
        }

        /*修改人物状态*/
        public changeSpecialState(splState, times) {
            // body
            if (splState < this.specialState && this.specialTimes > 0) { return }
            //assert( splState >= TableEnumSpecialState.SpecialState_None and splState <= TableEnumSpecialState.SpecialState_Super)
            this.specialState = splState
            this.specialTimes = times
        }

        /*每帧检测特殊状态*/
        public procSpecialState(tick) {
            // body
            let self = this;
            let rt = tick * 1000
            if (self.specialState == TableEnum.TableEnumSpecialState.SpecialState_None) {
                //null
            } else if (self.specialState == TableEnum.TableEnumSpecialState.SpecialState_NoBreak) {
                if (self.specialTimes != -1) {
                    self.specialTimes = self.specialTimes - rt
                    if (self.specialTimes <= 0) {
                        self.specialTimes = 0
                        self.changeSpecialState(self.initSpecialState, -1)
                    }
                }
            } else if (self.specialState == TableEnum.TableEnumSpecialState.SpecialState_Super || self.specialState == TableEnum.TableEnumSpecialState.SpecialState_GetUp_Super) {
                if (self.specialTimes != -1) {
                    self.specialTimes = self.specialTimes - rt

                    if (self.specialTimes <= 0) {
                        self.specialTimes = 0
                        self.changeSpecialState(self.initSpecialState, -1)
                    }
                }
            }
        }


        /*处理数字特效*/
        public procNumbers(tick) {
            let self = this;
            // body	
            let i = adjustIndex(1)
            while (i < self.tableNumbers.length) {
                let tNumber = self.tableNumbers[i]
                let bFinish = tNumber.isFinish()
                if (bFinish == true) {
                    CC_SAFE_DELETE(tNumber)
                    self.tableNumbers.splice(i, 1);
                } else {
                    tNumber.update(tick)
                    i = i + 1
                }
            }
        }

        public updateHpAnim(tick) {
            let self = this;
            tick = 0.0333;
            if (Math.floor(self.currHpValue) != Math.floor(self.getHp())) {
                self.hpAnimTick = self.hpAnimTick + tick * 1000
                if (self.hpAnimTick >= ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP) {
                    self.hpAnimTick = self.hpAnimTick - ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP
                    self.currHpValue = self.currHpValue + self.stepHpValue
                    if (self.stepHpValue > 0) {
                        if (self.currHpValue + 0.1 > self.getHp()) {
                            self.currHpValue = self.getHp()
                        }
                    } else if (self.stepHpValue < 0) {
                        if (self.currHpValue - 0.1 < self.getHp()) {
                            self.currHpValue = self.getHp()
                        }
                    }
                    if (self.stepHpValue > 0) {
                        self.setHpDc(true)
                        self.setHpGroundDc(true)
                    } else if (self.stepHpValue < 0) {
                        self.setHpGroundDc(true)
                    }
                }
            }
            if (self.pdhBakeValue != self.pdhValue) {
                self.updatePermanentHp()
                self.pdhBakeValue = self.pdhValue
            }
        }
        private midPos: egret.Point = new egret.Point();
        public getMidPos() {
            this.midPos.x = (this.x + this.offsetNorMidX) * this.fightScene.uiScale + this.fightScene.fightRoot.x;//正常是按0，0算的现在战斗容器Xy有变化了所以得加上这个差值,指不定还有啥地方需要加差值呢   真坑！！！！！！！
            this.midPos.y = (this.y - this.offsetNorMidY) * this.fightScene.uiScaleY + this.fightScene.fightRoot.y;
            return this.midPos;
        }

        public update(tick) {
            let self = this;
            self.procHitEffects(tick);
            self.updateHpAnim(tick);
            self.updateCdDc(tick);
            if (self.bPause) return;

            self.updateSpineX(tick);
            self.updateEndBody(tick);
            self.procClean(tick);
            self.procBuffs(tick);
            self.procAtkBuff();
            self.renewDcPos();
            self.updateDcBuff();
            self.procDisappear(tick);
            self.procBomb(tick);
            self.procEffects(tick);
            self.procHitedDisplacement(tick);
            self.procSpecialState(tick);
            self.procState(tick);
            self.procNumbers(tick);
            self.updateCorpse();
            self.updateHighLight(tick);
            self.updateBloodTalent();
            self.updateTimeTalent(tick);
            self.debugPrintAttri(false);
        }
        public debugPrintAttri(force) {

        }
        public updateTimeTalent(tick) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    talent.update(tick);
                    if (talent.time_tick <= 0) {
                        talent.time_tick = talent.extra_value;
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public updateBloodTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_BLOOD_LOW];
            let percentHpValue = this.getHp() * 100 / this.getMaxHp(true);
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.blood_num >= talent.extra_value) {
                        continue;
                    }
                    if (percentHpValue >= talent.trigger_condition[0] && talent.is_has_blood_touch == true) {
                        talent.is_has_blood_touch = false;
                    }
                    if (talent.is_has_blood_touch == false && percentHpValue < talent.trigger_condition[0]) {
                        if (talent.isTouch() == true) {
                            talent.changeBloodTouch();
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public beginHightLight() {
            this.nHightLightTick = 0;
            this.setHighLight(true);
        }
        public setHighLight(tag) {
            this.bHightLight = tag;
        }
        public updateHighLight(tick) {
            if (!this.bHightLight) {
                return;
            }
            this.nHightLightTick = this.nHightLightTick + tick * 1000;
            if (this.nHightLightTick >= ConstantConfig_RoleBattle.HIGHT_LIGHT_MAX_TIME) {
                this.doBreakOther(true);
                this.endHightLight();
            }
        }
        public doBreakOther(tag) {
            this.fightScene.recoverFBreak(this, tag);
        }
        public endHightLight() {
            this.setHighLight(false);
        }
        public updateCorpse() {
            //僵尸怪的处理
            if (this.bDead == true && this.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
            }
        }
        public procBomb(tick) {
            if (this.bDead == true || this.bMomentDead == true) {
                return;
            }
            if (this.bBomb == false) {
                return;
            }
            this.disappearTran = this.disappearTran - 50;
            if (this.disappearTran < 0) {
                this.disappearTran = 0;
                this.setDead(true);
                this.bAlreadyDead = true;
            }
            this.setTrans(this.disappearTran);
        }
        public tableBuffPre;
        public loadDcBuff() {
            let tbl = Game.PlayerBuffSystem.SetBuffLayer(this.tableBuffs);
            this.tableBuffPre = tbl;
        }
        public updateDcBuff() {
            let tbl = Game.PlayerBuffSystem.SetBuffLayer(this.tableBuffs);
            let diff_tbl = Game.PlayerBuffSystem.FindDiffer(this.tableBuffPre, tbl);
            if (diff_tbl.length != 0) {
                this.tableBuffPre = tbl;
                this.freshBuffDc(diff_tbl);
            }
        }
        private ff(k, v, value) {
            return value[0][0] == v.buff_type;
        }
        public freshBuffDc1(tbl) {

        }
        public freshBuffDc(tbl) {
            let num = 0;
            // let retTbl = this.TableBuffDcUi;
            for(let k in tbl){
                let v = tbl[k];
                let key = v[0];
                let value = v[1];

                if(value != null && value[0][0] != -1){
                    //let [_ret] = Table.FindR(this.tableBuffs, function (k, v) {
                	// 		return value[0][0] == v.buff_type;
            		// });
                    let _ret;
                    for (let i = 0; i < this.tableBuffs.length; i++) {
                        if (this.ff(i, this.tableBuffs[i],value)) {
                            [_ret,] = [this.tableBuffs[i], i];
                            break;
                        }
                    }
                    if(_ret != null){
                        if(this.TableBuffDcUi[key] == null){
                            let x = this.BuffLdPos.x+(key-1) * ConstantConfig_CommonBattle.dcBuffOffsetPos.x;
                            let y = -this.BuffLdPos.y;

                            let board = new eui.Image("ui_battle_buff_diban_png");
                            board.x = x;
                            board.y = y;
                            board.scaleX = board.scaleY = 0.6;
                            this.nodeDc.addChild(board);
                            this.TableBuffBoard[key] = board;

                            let pic = new eui.Image(_ret.buff_icon_path);
                            pic.x = x-2*0.4;
                            pic.y = y;
                            pic.scaleX = pic.scaleY = 0.6;
                            this.nodeDc.addChild(pic);
                            this.TableBuffDcUi[key] = pic;

                            // let ttf_num = new eui.Label();
                            // ttf_num.textColor = ConstantConfig_Common.Color.normal_color;
                            // ttf_num.scaleX = ttf_num.scaleY = 0.3;
                            // ttf_num.x = x + 10;
                            // ttf_num.y = y + 7;
                            // ttf_num.text
                            // if(value[0][1] != 1){
                            //     ttf_num.visible = true;
                            // }else{
                            //     ttf_num.visible = false;
                            // }
                            // this.nodeDc.addChild(ttf_num);
                            // this.TableBuffNum[key] = ttf_num;

                        }else{
                            this.TableBuffDcUi[key].visible = true;
                            this.TableBuffDcUi[key].source = _ret.buff_icon_path;

                            this.TableBuffBoard[key].visible = true;

                            // if(value[0][1] != 1){
                            //     this.TableBuffNum[key].visible = true;
                            //     this.TableBuffNum[key].text = value[0][1];
                            // }else{
                            //     this.TableBuffNum[key].visible = false;
                            // }
                        }
                    }
                }else{
                    if(this.TableBuffDcUi[key] != null){
                        this.TableBuffDcUi[key].visible = false;
                    }
                    if(this.TableBuffBoard[key] != null){
                        this.TableBuffBoard[key].visible = false;
                    }
                    // if(this.TableBuffNum[key] != null){
                    //     this.TableBuffNum[key].visible = false;
                    // }
                }
            }
        }
        public procAtkBuff() {
            this.bStun = false
            this.bSilence = false
            this.bDisarm = false
            this.bFrozen = false
            this.bStoned = false
            this.bSleep = false
            this.bImmune = false;

            for (let k in this.tableBuffs) {
                let v = this.tableBuffs[k];
                let baseType = v.getBuffBaseType();
                if (baseType == TableEnum.TableBufferType.BUFFER_DIZZINESS) {
                    this.bStun = true;
                } else if (baseType == TableEnum.TableBufferType.BUFFER_SILENCE) {
                    this.bSilence = true;
                }
                else if (baseType == TableEnum.TableBufferType.BUFFER_DISARM) {
                    this.bDisarm = true;
                }
                else if (baseType == TableEnum.TableBufferType.BUFFER_FROZEN) {
                    this.bFrozen = true;
                }
                else if (baseType == TableEnum.TableBufferType.BUFFER_STONED) {
                    this.bStoned = true;
                }
                else if (baseType == TableEnum.TableBufferType.BUFFER_SLEEP) {
                    this.bSleep = true;
                }
                else if (baseType == TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE) {
                    this.bImmune = true;
                }
            }
        }
        public procClean(args) {
            let i = 0;
            while (i <= this.tableClean.length) {
                let info = this.tableClean[i];
                if (info && info.bClean == true) {
                    info.father.removeChild(info.body);
                    this.tableClean.splice(i, 1);
                    info.body = null;
                } else {
                    i = i + 1;
                }
            }
        }
        //[[处理buff]]
        public procBuffs(tick) {
            let i = 0;
            if (this.tableBuffs.length > 0) {
                while (i < this.tableBuffs.length) {
                    let tBuff = this.tableBuffs[i];
                    let bFinish = tBuff.getIsFinish();
                    if (bFinish == true) {
                        this.deleteBuff(i);
                    } else {
                        tBuff.update(tick);
                        i = i + 1;
                    }
                }
            }
        }
        public deleteBuff(index) {
            let tBuff = this.tableBuffs[index];
            this.openFoldBuffEffect(tBuff);
            CC_SAFE_DELETE(tBuff);
            this.tableBuffs.splice(index, 1);
        }
        public updateCdDc(tick) {
            if (this.SpriteCdBar && this.pressCd) {
                let cur = Math.floor(this.pressCd.getTime());
                let max = Math.floor(this.pressCd.getMaxTime());
                this.calcCdAnim(cur, max);
                this.updateCdAnim(tick, cur, max);
            }
        }
        public updateCdAnim(tick, cur, max) {
            if (Math.floor(this.currCdValue) != Math.floor(cur)) {
                this.cdAnimTick = this.cdAnimTick + tick * 1000;
                if (this.cdAnimTick >= ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP) {
                    this.cdAnimTick = this.cdAnimTick - ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP;
                    this.currCdValue = Math.floor(this.currCdValue + this.stepCdValue);
                    if (this.stepCdValue > 0) {
                        if (this.currCdValue + 0.1 > cur) {
                            this.currCdValue = cur;
                        }
                    } else if (this.stepCdValue < 0) {
                        if (this.currCdValue - 0.1 < cur) {
                            this.currCdValue = cur
                        }
                    }
                }
                if (this.stepCdValue > 0) {
                    this.setCdDc(true, cur, max);
                    this.setCdLightDc(false, false, cur, max);
                } else if (this.stepCdValue < 0) {
                    this.setCdDc(true, cur, max);
                    this.setCdLightDc(true, true, cur, max);
                }
            }
        }
        public setCdDc(bGoing, real, max) {
            if (this.SpriteCdBar != null && this.pressCd != null) {
                let cur = yuan3(bGoing, this.currCdValue, real);
                let size_bar = getPercentSize(this.BarHpSize, 1 - cur / max);
                this.SpriteCdBar.width = size_bar.width;
            }
        }
        public setCdLightDc(bVisible, bGoing, real, max) {

        }
        public calcCdAnim(cur, max) {
            if (this.currCdValue == -1) {
                this.currCdValue = cur;
            }
            if (cur == this.currCdValue) {
                return null;
            }
            let lost = Math.abs(cur - this.currCdValue) / max * 100;
            if (lost < ConstantConfig_RoleBattle.FIGHT_CD_ANIM_VALUE) {
                this.currCdValue = cur;
                this.setCdDc(false, cur, max);
                this.setCdLightDc(false, false, cur, max);
                return false;
            } else {
                this.stepCdValue = (cur - this.currCdValue) / (ConstantConfig_RoleBattle.FIGHT_CD_ANIM_TIME / ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP);
                return true;
            }
        }

        /*设置人物当前经验*/
        public setCurExp(value) {
            // body
            this.curExp = value
        }


        /*设置人物星级*/
        public setStar(star) {
            // body
            this.star = star
        }

        /*设置人物阶数*/
        public setStep(step) {
            // body
            this.step = step
        }

        public loadRoleData(roleInfo) {
            // body    
            if (roleInfo == null) { return }
            this.setRoleInfo(roleInfo)
            this.roleId = this.roleInfo.general_id
            this.setGeneralId(PlayerHunterSystem.GetGeneralId(this.roleInfo.general_id))
            this.SetAttrib("level", this.roleInfo.level)
            this.setCurExp(this.roleInfo.exp)
            this.setStar(this.roleInfo.star)
            this.setStep(this.roleInfo.step)
        }

        public setRoleType(roleType) {
            this.roleType = roleType;
        }

        public CheatCheckSumAttr(addHp?) {
            if (this.cheat_checkAttr == null) {
                return;
            }
            if (addHp == null) {
                addHp = 0;
            }
            this.cheat_checkAttr = this.cheat_checkAttr + addHp;
            let today = egret.getTimer();
            if (today - this.cheat_checkTime < 1) {
                return;
            }
            this.cheat_checkTime = today;
            let curAttr = 0;
            for (let j = 0; j < TableEnum.EnumAttriReal.length; j++) {
                let i = TableEnum.EnumAttriReal[j];
                curAttr = curAttr + this.baseAttribs[i];
            }
            for (let k in this.attribs) {
                let v = this.attribs[k];
                if (k != "curRage") {
                    curAttr = curAttr + v;
                }
            }
            let diff_value = Math.abs(curAttr - this.cheat_checkAttr);
            let range = diff_value / this.cheat_checkAttr;
            if (diff_value > this.cheat_diffvalue) {
                this.cheat_diffvalue = diff_value;
                this.cheat_range = range;
                // if (range > 0.01) { //&& Device.isDebug
                    //GameCommon:ShowMessage(string.format("catch you! diffValue = %.2f  range = %.2f", this.cheat_diffvalue, this.cheat_range), false);
                // }
            }
        }

        public setHpDc(bGoing) {
            if (this.SpriteHpBlood != null) {
                let cur = yuan3(bGoing, this.currHpValue, this.getHp())
                let maxHp = this.getMaxHp()
                let size_bar = getPercentSize(this.BarHpSize, cur / maxHp)
                this.SpriteHpBlood.width = size_bar.width;

            }
        }

        public setHpGroundDc(bGoing) {
            if (this.SpriteHpBloodGround != null) {
                let cur = yuan3(bGoing, this.currHpValue, this.getHp())
                let maxHp = this.getMaxHp()
                let size_bar = getPercentSize(this.BarHpSize, cur / maxHp)
                this.SpriteHpBloodGround.width = size_bar.width;
                //let rect = new eui.Rect(1, 1);
                //this.nodeDc.addChildAt(rect, 11);
                //this.SpriteHpBloodGround.mask = rect;
            }
        }

        public calcHpAnim() {
            if (this.currHpValue == -1) {
                this.currHpValue = this.getHp()
                this.setHpDc(false)
                this.setHpGroundDc(false)
            }

            if (this.getHp() == this.currHpValue) { return }
            let lost = Math.abs(this.getHp() - this.currHpValue) / this.getMaxHp() * 100
            if (lost < ConstantConfig_RoleBattle.FIGHT_HP_ANIM_VALUE) {
                this.currHpValue = this.getHp()
                this.setHpDc(false)
                this.setHpGroundDc(false)
            } else {
                this.stepHpValue = (this.getHp() - this.currHpValue) / (ConstantConfig_RoleBattle.FIGHT_HP_ANIM_TIME / ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP)
                if (this.stepHpValue < 0) { this.setHpDc(false) }
            }
        }


        /*修改人物HP*/
        public setHp(hp) {
            // body
            let maxHp = this.getMaxHp(true)
            if (hp > maxHp) {
                hp = maxHp
            }

            if (hp < 0) {
                hp = 0
            }

            let tmpHp = hp - this.getHp()
            this.SetAttrib("curHp", hp)
            this.CheatCheckSumAttr(tmpHp)
            //this.setHpDc()
            this.calcHpAnim()
            //this.updatePermanentHp()
            //this.calcPermanentHp()    
        }

        public setCamp(eType) {
            // body
            this.eCamp = eType
        }

        /*设置地板高度*/
        public setFloor(h) {
            // body
            this.floor = h
        }

        public setTeamCoord(x, y) {
            // body
            this.teamOriginalX = x
            this.teamOriginalY = y
        }


        public setAppearStage(stage) {
            // body
            this.eAppearStage = stage
        }

        public setInitDir(dir) {
            this.initDir = dir
        }

        /*设置缩放比例*/
        public setScale(scale) {
            // body
            this.scale = scale
            if (this.body != null) {
                this.body.SetScale(scale)
            }
        }

        /*改变人物状态1*/
        public changeState(state) {
            // body
            if (this.state == TableEnum.TableEnumBaseState.State_Sprint) {
                this.sprintDistance = 0
            }

            if (this.state != state) {
                this.state = state
            }
        }

        public commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale) {
            this.loadSpxData()
            this.setCamp(eCamp)
            this.setFloor(floor)
            this.setPos(x, y)
            this.setTeamCoord(x, y)
            this.setAppearStage(appearStage)
            this.creatAi(-1);
            this.setInitDir(dir)
            this.changeDir(dir, false)
            this.setScale(TableMapRole.Item(this.mapRoleId).body_scale * scale)
            this.setFlipX(yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_LEFT, false, true))
            this.changeAction(TableEnum.TableEnumOtherState.OtherState_Stand)
            this.changeState(TableEnum.TableEnumBaseState.State_None)
            this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None)
            this.enterBtl();
            //this.procState(0)

        }
        //[[获得速度值]]
        public getCdSpeed() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.cdSpeed
            let results = this.handleTalentEffect_ProtoToProto()
            value = value + results[TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];

            let [bAttribAdd, addValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null)
            let [bAttribCut, cutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let extra = (addValue - cutValue + livingPerson + loseHpToProto) / 100;

            let [a, baseAddValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null)
            let [b, baseCutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED)
            let base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_CD_SPEED]) / 100;

            if (this.isPerson()) {
                let percent = 1 + extra;
                if (percent <= 0) { percent = 0 }
                if (base <= 0) { base = 0 }
                let real = value * percent + (this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_CD_SPEED]) * base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];
                if (real <= 0) { real = 0 }
                return real;
            } else {
                let percent = 1 + extra;
                if (percent <= 0) { percent = 0 }
                let real = value * percent + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];
                if (real <= 0) { real = 0 }
                return real;
            }
        }

        public isWeeking() {
            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_EnterWeek
                || this.otherState == TableEnum.TableEnumOtherState.OtherState_Weeking
                || this.otherState == TableEnum.TableEnumOtherState.OtherState_ExitWeek) {
                return true;
            }
            return false;
        }

        public isActivityBoss() {
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                return true;
            }
            return false;
        }

        public checkBuffLegeal(args?) {
            // body   
            // 眩晕
            if (this.bStun == true) {
                return false
            }

            // 冰冻
            if (this.bFrozen == true) {
                return false
            }

            // 石化 
            if (this.bStoned == true) {
                return false
            }

            // 睡眠
            if (this.bSleep == true) {
                return false
            }

            // 沉默
            if (this.bSilence == true) {
                return false
            }

            return true
        }

        public isPlaySkillLegeal(args?) {
            // body
            if (this.bPauseBlack == true) {
                return false
            }



            // buff 
            if (this.checkBuffLegeal() == false) { return false }

            let isFloor = this.getIsOnFloor()

            if ((this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy || this.otherState == TableEnum.TableEnumOtherState.OtherState_Parry) && !isFloor) {
                return false
            }

            // state
            if (!(this.otherState == TableEnum.TableEnumOtherState.OtherState_None || this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack ||
                this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy ||
                this.otherState == TableEnum.TableEnumOtherState.OtherState_Parry)) {
                return false
            }

            // state
            /*
            if( this.otherState != TableEnumOtherState.OtherState_None and this.otherState != TableEnumOtherState.OtherState_Attack ){
                return false
            }
            */

            if (this.is_flashing == true) {
                return false
            }

            if (this.is_breakMoving == true) {
                return false
            }

            // floor
            /*
            if( this.getIsOnFloor() == false ){ 
                return false 
            }
            */
            return true
        }


        /*设置当前技能*/
        public setCurSkill(sType, index) {
            // body
            if (this.bDead == true || this.bMomentDead == true) {
                return false
            }

            if (this.isWeeking()) {
                return false
            }

            if (this.isActivityBoss()) {
                return false;
            }

            if (this.isPlaySkillLegeal() == false) {
                return false
            }

            let tSkill = null
            let tIndex = 0
            if (sType == message.ESkillType.SKILL_TYPE_COMMON) {

                let tableSize = this.tableCommons.length
                if (index > tableSize) { return false }
                let skillSize = this.tableCommons[index].getSkillSize()
                if (skillSize == 0) { return false }
                tIndex = index
                tSkill = this.tableCommons[index]

            } else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {

                let tableSize = this.tableSkills.length
                if (index > tableSize) { return false }
                let skillSize = this.tableSkills[index].getSkillSize()
                if (skillSize == 0) { return false }
                tIndex = index
                tSkill = this.tableSkills[index]

            } else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {

                let tableSize = this.tableDeaths.length
                if (index > tableSize) { return false }
                let skillSize = this.tableDeaths[index].getSkillSize()
                if (skillSize == 0) { return false }
                tIndex = index
                tSkill = this.tableDeaths[index]
            }

            // 是否受一些buff的控制
            let damage = tSkill.getSkillDamageType()
            //  缴械 物理技能无法使用
            if (damage == message.EDamageType.DAMAGE_TYPE_PHY && this.bDisarm == true) {
                return false
            }

            // 禁言 魔法技能无法使用
            //if( this.bSilence == true ){
            //if( damage == EDamageType.DAMAGE_TYPE_MAGIC and this.bSilence == true ){
            //    return false
            //}      

            /*
            // 优先级打断
            let delay = false    
            if( this.otherState == TableEnumOtherState.OtherState_Attack ){
               //if( true ){ return false }
                if( this.curSkill != null ){
                     if( tSkill.getSkillOrder() <= this.curSkill.getSkillOrder() ){
                        return false
                     }else{
                        //delay = true                              
                     }
                }else{
                    return false
                }
            }  
            */

            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                if (this.curSkill != null) {
                    if (tSkill.getSkillOrder() <= this.curSkill.getSkillOrder()) {
                        return false
                    }
                }
            }

            // 豆子检测
            // if( SkillCdMgr.Instance.isSkillExit(tSkill) == true ){
            // wu zhi 7这里临时注释掉
            let scene = StageSceneManager.Instance.GetCurScene();
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE && this.pressCd != null && this.pressCd.IsFinish() == false && this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                if (this.eCamp == TableEnum.TableCampType.CAMP_TYPE_MY) {
                    scene.playTip(TableEnum.TableEnumFightTip.TIP_CD, this.eTeamNum);
                }
                return false;
            }

            // 怒气消耗
            /*
            if( tSkill.getIsRageEnough() == true ){    
                if( this.eCamp == TableCampType.CAMP_TYPE_MY ){
                    scene.playTip(TableEnumFightTip.TIP_MP)
                }   
                return false
            }    
            */

            /*
            // 延迟播放  
            if( delay == true ){  
                 // 延迟播放
                if( this.bDelayTag == false ){
                    this.bDelayTag = true
                    this.setNoticeTouchType(sType) 
                    return false 
                }else{
                    this.bDelayTag = true
                }                    
            }  
            */

            this.curSkillIdx = tIndex
            this.curSkill = tSkill

            // cd添加
            /*
            if( this.curSkill.getCd() > 0 ){
                SkillCdMgr.addSkillCd( this, this.curSkill, false )
            }	
            */

            /*
            // 减豆
            if( sType == ESkillType.SKILL_TYPE_HANDLE ){
                let tag, cd = SkillCdMgr.isSkillExit(tSkill)
                this.reduceBean()
                if( cd.isPause() == true ){
                    cd.setIsPause(false)
                    cd.openNext()
                }        
            }
        
            // 怒气增加
            this.skillMakeRage( sType )
            */

            return true
        }

        public skillFollow(sType, index) {
            //战斗技能唯一识别码改变
            Gmgr.Instance.atomicVary();
            this.curSkill.setVaryCode(Gmgr.Instance.getAtomic());
            this.gnrTargetStill();
            if (Gmgr.Instance.bReplay == false && this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                let skillAction = _creatSkillAction(this.fightScene.getTiming(), sType, index, this.curSkill.getVaryCode());
                this.actions.skillInfos.push(skillAction);
            }
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                if (this.pressCd != null) {
                    this.pressCd.openNext();
                    this.pressCd.setIsFinish(false);
                }
            }
            //必杀技特效
            if ((this.bEnemy == false || Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) && sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                let soundID = TableMapRole.Item(this.mapRoleId).bisha_dub_sound;
                Helper.EftByID(soundID);
            }

            //怒气增加
            this.skillMakeRage(sType);

            this.changeState(TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Attack);

            // 播放技能归位
            //this.backHoming()
            //this.backSkillPos()
            this.curSkill.playRoleSkill()
            //this.playSkillExtraEffect();

            //触发天赋
            this.enemyTriggerWhenSupportSkill();
            this.enemyTriggerWhenMyRelSkill(yuan3(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillDamageTalent(yuan3(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillTypeTalent(this.curSkill, yuan3(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillFirst(this.curSkill, yuan3(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillIntervalNum(this.curSkill, yuan3(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillBeLowBlood(this.curSkill);

            //这里是移动队列 
            if (this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_CALL && this.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                if (this.fightScene.battleSqueue.length != 0 && this.fightScene.battleSqueue[0].id == this.roleId) {
                    if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.fightScene.endRound(this.roleId, this.bEnemy);
                    }
                }
            }
            //cd 时间改变
            if (sType != message.ESkillType.SKILL_TYPE_COMMON && this.bCall == false) {
                if (this.bEnemy == false) {
                    this.fightScene.leftAiCd = this.tableSkillAi[sType].delayTime;
                } else if (this.bEnemy == true) {
                    this.fightScene.rightAiCd = this.tableSkillAi[sType].delayTime;
                }
                if (this.tableSkillAi[sType].aiType == TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
                    this.fightScene.setOppAiSkillTag(this.bEnemy);
                }
            }
            //额外效果
            this.skillExtraFun(sType);
        }
        public skillMakeRage(skillType) {
            if (skillType == message.ESkillType.SKILL_TYPE_COMMON) {
                //技能增加怒气
                let value = this.handleTalentEffect_GetRage();
                let r_value = this.handleTalentEffect_ReduceRage();
                let p = 100 + value - r_value;
                if (p <= 0) {
                    p = 0;
                }
                let tmp = this.getRageAddValue(EGetRageWay.Way_Common) * p / 100;
                this.dealRecRage(tmp);
            } else if (skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
                //技能增加怒气
                let value = this.handleTalentEffect_GetRage();
                let r_value = this.handleTalentEffect_ReduceRage();
                let p = 100 + value - r_value;
                if (p <= 0) {
                    p <= 0;
                }
                let tmp = this.getRageAddValue(EGetRageWay.Way_Skill) * p / 100;
                this.dealRecRage(tmp);
            }
        }
        public gnrTargetStill() {
            if (this.curSkill != null) {
                this.curSkill.targetStill();
            }
        }
        public enemyTriggerWhenSupportSkill() {
            if (!(this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP)) {
                return;
            }
            if (this.bEnemy) {
                for (let k in this.fightScene.tableAllys) {
                    let v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemySupportSkill();
                    }
                }
            } else {
                for (let k in this.fightScene.tableEnemys) {
                    let v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemySupportSkill();
                    }
                }
            }
        }
        public enemyTriggerWhenMyRelSkill(skillType) {
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            if (this.bEnemy) {
                for (let k in this.fightScene.tableAllys) {
                    let v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyRelSkillDamageTalent(skillType);
                    }
                }
            } else {
                for (let k in this.fightScene.tableEnemys) {
                    let v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyRelSkillDamageTalent(skillType);
                    }
                }
            }
        }
        //释放物理类或法术类时触发
        public triggerRelSkillDamageTalent(skillType) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_DAMAGE];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || Table.FindK(talent.trigger_condition, skillType) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        //释放技能区间触发（自动技、主动技、必杀技, -1为所有)
        public triggerRelSkillTypeTalent(skill, skillType) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_TYPE];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1) {
                        if (talent.extra_value == -1 || (talent.extra_value != -1 && talent.trigger_num < talent.extra_value)) {
                            talent.trigger_num = talent.trigger_num + 1;
                            if (talent.isTouch() == true) {
                                skill.addKeepingTalent(talent);
                                talent.talentFun();
                                talent.triggerEffect();
                            }
                        }
                    }
                }
            }
        }
        //第一次释放技能时（自动技、主动技、必杀技, -1为所有)
        public triggerRelSkillFirst(skill, skillType) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_FIRST];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.is_reset == true && (talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1)) {
                        talent.is_reset = false;
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        //间隔多少次释放技能时触发（自动技、主动技、必杀技, -1为所有)
        public triggerRelSkillIntervalNum(skill, skillType) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.is_reset == true) {
                        talent.is_reset = false;
                        if ((talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1)) {
                            if (talent.isTouch() == true) {
                                talent.talentFun();
                                talent.triggerEffect();
                            }
                        }
                    }
                    talent.trigger_num = talent.trigger_num + 1;
                    if (talent.trigger_num > talent.extra_value) {
                        talent.trigger_num = 0;
                        talent.is_reset = true;
                    }
                }
            }
        }
        //释放技能区间(血量低于X%时)
        public triggerRelSkillBeLowBlood(skill) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW];
            if (t == null || t.length == 0) {
                return;
            }
            let percentHpValue = this.getHp() * 100 / this.getMaxHp(true);
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                if (percentHpValue < talent.trigger_condition[0]) {
                    if (talent.isTouch() == true) {
                        skill.addKeepingTalent(talent);
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        }
        //敌方释放物理类或法术类时触发
        public triggerEnemyRelSkillDamageTalent(skillType) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_RELEASE_SKILL_DAMAGE];
            if (t) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public skillExtraFun(sType) {

        }

        public playSkill(sType, index) {
            // body 
            if (this.setCurSkill(sType, index) == true) {
                // 减豆
                this.skillFollow(sType, index)

                return true
            }
            return false
        }

        public playCommonAtk(index) {
            return this.playSkill(message.ESkillType.SKILL_TYPE_COMMON, index);
        }

        public playSkillAtk(index) {
            // body
            return this.playSkill(message.ESkillType.SKILL_TYPE_HANDLE, index)
        }
        public playDeathAtk(index) {
            return this.playSkill(message.ESkillType.SKILL_TYPE_DEATH, index)
        }

        /*获得人物坐标x*/
        public getPosX(...args) {
            // body
            return this.x
        }
        /*获得人物坐标y*/
        public getPosY(...args) {
            // body
            return this.y
        }

        //[[获得人物bodySpx]]
        public getBodySpx(...args) {
            //   body
            return this.body
        }

        //获得人物朝向
        public getDir(...args) {
            // body
            return this.dir;
        }

        /*获得释放技能速度*/
        public getPlayActionSpeed(...args) {
            // body
            //let speedDown = this.getBuffSpeedDown()
            //let speedUp = this.getBuffSpeedUp()
            //let actionSpeed = this.actSpeed * (1 - speedDown + speedUp)
            return this.actSpeed
        }

        /*获得人物缩放比例*/
        public getScale(...args) {
            // body
            return this.scale
        }


        /*获得人物随身是否存在effect*/
        public getIsEffectFollowMe(effect) {
            // body
            //assert( effect != null )
            let tag = false
            for (let i = adjustIndex(1); i < this.tableEffects.length; i++) {
                let t = this.tableEffects[i]
                if (t == effect) {
                    tag = true
                    break
                }
            }
            return tag
        }

        /*添加特效*/
        public addEffect(effect) {
            // body
            //assert( effect != null )	
            let follow = effect.getIsFollowRole()
            if (follow == true) {
                let tag = this.getIsEffectFollowMe(effect)
                if (tag != true) {
                    this.tableEffects.push(effect);
                }
            } else {
                //revert
                //this.effect.push(effect);
                let layerId = Gmgr.Instance.layerId
                if (layerId != TableEnum.TableEnumLayerId.LAYER_FIGHT) { console.assert(false) } console.log();

                let scene = StageSceneManager.Instance.GetCurScene()
                scene.addEffect(effect)
            }
        }

        /*人物是否隐藏*/
        public isVisible(...args) {
            // body
            return this.bVisible
        }

        public dealHitEffect(hitId, hitX, hitY, scale) {
            // body   
            // this.bHitedToRight 
            let hit = Game.ObjectPool.getItem("SkillHit", SkillHit);
            hit.setInfo(this.nodeRoot, this, hitId, scale);
            hit.setPosition(hitX, hitY)
            hit.playSpx()
            this.tableHits.push(hit);
        }

        public getHitPos(args?) {
            // body
            let hitX = 0
            let hitY = 0
            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
                hitX = this.x + this.hitEffectOffsetSpeX
                hitY = this.y - this.hitEffectOffsetSpeY
            } else {
                hitX = this.x + this.hitEffectOffsetNorX
                hitY = this.y - this.hitEffectOffsetNorY
            }
            return [hitX, hitY]
        }

        public dealHit(character, hitId, sizeTbl) {
            // body
            // 被打人物左右方
            this.bHitedToRight = yuan3(this.x > character.getPosX(), true, false)
            if (hitId != -1) {
                let [x, y] = this.getHitPos()
                let scale = 1.0
                if (sizeTbl.length > 1) {
                    scale = getRandom(sizeTbl[adjustIndex(1)] * 1000, sizeTbl[adjustIndex(2)] * 1000) / 1000
                }
                this.dealHitEffect(hitId, x, y, scale)
                // 被击中的声音
                /*
                if( hurt.sound_id != -1 and Gmgr.Instance.hitSoundEffectNum < ConstantConfig_Common.MaxHitSoundEffect ){
                    let name = hurt.getSoundName()
                    gmsound.playeff(name)
                    Gmgr.Instance.hitSoundEffectNum = Gmgr.Instance.hitSoundEffectNum + 1
                }
                */
            }
        }
        public shelterHurt() {
            let dandanBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff && dandanBuff[0]) {
                dandanBuff[0].shelterHurt();
            }

        }
        //[[获得人物当前形态行为等级]]
        public getActionPriority() {
            if (this.actionId < ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                let index = Math.floor(this.actionId);
                return TableEnum.TableActionPriority[index].priority;
            } else {
                if (this.curSkill != null) {
                    return this.curSkill.getCurActionId();
                } else {
                    //console.log("---人物动作行为id---"+this.actionId+"---人物当前状态----"+this.otherState);
                }
            }
        }
        public checkShelter() {
            let dandanBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff == null || dandanBuff[0] == null) {
                return false;
            }
            return true;
        }
        public setDisplacement(id, sX, sY, aX, aY, aTime, cTime) {
            this.DISPLACEMENT.id = id
            this.DISPLACEMENT.speed_x = sX
            this.DISPLACEMENT.speed_y = sY
            this.DISPLACEMENT.aspeed_x = aX
            this.DISPLACEMENT.aspeed_y = aY
            this.DISPLACEMENT.aspeed_time = aTime
            this.DISPLACEMENT.continue_time = cTime
        }
        public doBreak(tag) {
            this.doBreakUi();
            this.doBreakOther(tag);
        }
        public doContinueBreak() {
            if (this.curSkill != null) {
                let curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.getCurAction().setContinueBreak();
                }
            }
        }
        public doSkillBreak() {
            if (this.curSkill != null) {
                this.curSkill.endCurSkill();
                this.curSkill.setIsFinish();
            }
        }
        public doBreakUi() {
            if (this.curSkill != null && (this.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH ||
                this.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_HANDLE)) {
                let arr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_BREAK);
                this.createBreakNumber(arr[0], arr[1]);
            }
        }
        public createBreakNumber(baseX, baseY) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(UIConfig.UIConfig_FightNumber.daduan);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction()
            num.start();
        }
        public dealHurtState(priority, hurt, character) {
            let t_sx;
            let t_sy;
            if (this.bDead == true || this.bMomentDead == true) {
                return;
            }
            if (this.isWeeking()) {
                return;
            }
            this.shelterHurt();
            if (this.specialState != TableEnum.TableEnumSpecialState.SpecialState_NoBreak) {
                let myPriority = this.getActionPriority();
                if (priority > myPriority) {
                    //boss硬直条处理
                    if (this.checkShelter() == true) {
                        return;
                    }
                    if (hurt != null && hurt.getAtkDisId() != -1) {
                        //设置被攻击者人物位移
                        let atkedDisId = hurt.getAtkDisId();
                        let disInfo = TableClientHurtDisplacement.Item(atkedDisId);
                        if (disInfo == null) {
                            return;
                        }
                        let type = disInfo.type;
                        if (type == -1) {
                            this.cleanDisplacement()
                            t_sx = disInfo.displacement_speed[0]
                            t_sy = disInfo.displacement_speed[1]
                            let t_ax = disInfo.displacement_acceleration[0]
                            let t_ay = disInfo.displacement_acceleration[1]
                            let t_atime = disInfo.acceleration_time
                            let t_ctime = disInfo.continue_time
                            this.setDisplacement(atkedDisId, t_sx, t_sy, t_ax, t_ay, t_atime, t_ctime);
                        }
                        else if (type == 1) {
                            if (this.bezierDisplacementId != -1) {
                                return;
                            }
                            this.cleanDisplacement()
                            this.bezierDisplacementId = atkedDisId;
                            let ex = disInfo.end_pos[1]
                            ex = yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_LEFT, Math.abs(960 - ex), ex)
                            let ey = disInfo.end_pos[2]
                            //let t_ctime = disInfo.continue_time  
                            let t_ctime = 450
                            let t_sx = (ex - this.x) / t_ctime
                            let t_sy = (ey - this.y) / t_ctime
                            this.setDisplacement(atkedDisId, t_sx, t_sy, 0, 0, 0, t_ctime);
                        }
                        //转换再次抵抗
                        let stirAgainDef = convertStirRatio(this.getFloatResis());
                        //根据受伤害状态来改变当前被打人物状态
                        let hurtAtkState = hurt.getHurtAtkState();
                        if (this.otherState == TableEnum.TableEnumOtherState.OtherState_None || this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                            let posTag = false;
                            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && this.bFloatBreak == true) {
                                this.doBreak(false);
                                this.doContinueBreak();
                                this.doSkillBreak();
                                posTag = true;
                            }
                            if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                            } else if (hurtAtkState == 0) {
                                let tmpY = Gmgr.Instance.floor + (this.floor - Gmgr.Instance.ground);
                                if (Math.floor(this.y) > Math.floor(tmpY)) {
                                    this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                                    //this.stirSpeedX = t_sx
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                                } else {
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt);
                                }
                            } else if (hurtAtkState == 1) {
                                let tmpY = Gmgr.Instance.floor + (this.floor - Gmgr.Instance.ground);
                                if (Math.floor(this.y) > Math.floor(tmpY)) {
                                    this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                                } else {
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy);
                                }
                            } else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                            if (posTag == true) {
                                this.setPos(this.x, this.y);
                            }
                        } else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy) {
                            if (hurtAtkState == 0) {
                                this.refreshHurt();
                            } else if (hurtAtkState == 1) {
                                this.refreshHeavyHurt();
                            } else if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                            } else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                        } else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_StirUp) {
                            this.beHurtTimes = this.beHurtTimes + 1;
                            if (hurtAtkState == 0 || hurtAtkState == 1) {
                                this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED - this.beHurtTimes * stirAgainDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                            } else if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef - this.beHurtTimes * stirAgainDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                            } else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                        } else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
                            this.beHurtTimes = this.beHurtTimes + 1;
                            if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef - this.beHurtTimes * stirAgainDef;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);;
                            } else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                            this.stirSpeedX = 0;
                        }
                    }
                }
            }
            //this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt)
        }
        //[[获得浮空抵抗]]
        public getFloatResis() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.floatResis;
            let addValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS, null, null)
            let cutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            //let protomeByBuffNum = this:handleTalentEffect_ProtomeByNumOfBuff(TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            let extra = (addValue[1] - cutValue[1] + livingPerson + loseHpToProto) / 100;


            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS, null, null)
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            let base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]) / 100;

            if (this.isPerson()) {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                let real = value * percent + (this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]) * base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            } else {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                let real = value * percent + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        }

        public refreshHurt() {
            this.backHoming()
            this.bBodyActEnd = false
            this.body.stopAllActions()
            this.body.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Hurt)
        }
        public refreshHeavyHurt() {
            this.backHoming()
            this.bBodyActEnd = false
            this.body.stopAllActions();
            this.body.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy);
        }
        //处理闪避
        public dealDodge(action, character, atkType) {
            //必然命中
            let bTalentEffective = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_HIT_MAX, -1, null, null);
            if (bTalentEffective[0]) {
                return false;
            }
            //检测施加者是否迷惑
            let htvExtra = 0;
            let bDamageDodge = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_DODGE_DAMAGE, atkType, null, null);
            let evaExtra = 0;
            if (bDamageDodge[0] == true || isParry(this.getDodgeRate(), character.getHitRate(), character, this)) {
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DODGE, -1, null, null);
                let arr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_PRESS_DODGE);
                this.createDodgeNumber(arr[0], arr[1]);
                if (this.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Parry);
                }
                return true;
            }
            return false;
        }
        //[[格挡率]]
        public getDodgeRate() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.dodgeRate;
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            let extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;

            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null)
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE]

            let addBuffValue = 0;
            let adBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_ADD_BLR);
            if (adBuff[0] != null) {
                addBuffValue = adBuff[0].fir_value;
            }
            let reduceBuffValue = 0;
            let rdBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_REDUCE_BLR);
            if (rdBuff[0] != null) {
                reduceBuffValue = rdBuff[0].fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        public createDodgeNumber(baseX, baseY) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(UIConfig.UIConfig_FightNumber.shanbi);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        //[[暴击抵抗]]
        public getCritDef() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.critDef;
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            let extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;

            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null)
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF];
            if (value <= 0) {
                value = 0
            }
            return value;
        }
        //[[敌方, 攻击类型, 伤害类型, 优先级]]
        public beHurtCommon(belongSkill, character, atkType, hurt, hitId, sizeTbl, priority, numX, numY, bTarget, point, effect, curAction) {
            let hurtValue = 0
            //是否暴击
            let bCrit = false;
            let bDodge = false;
            if (hurt != null) {
                hurt.addHurtOne(this);

                //整理成通用fun        
                //任意攻击击中敌人时
                character.triggerHit(belongSkill.getSkillType());
                //受到某类攻击时(hurt产生前)
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DAMAGE_BEFORE, -1, null, null);
                //被技能攻击时触发天赋
                bDodge = this.dealDodge(curAction, character, null);//aType
                //作衰减公式处理
                let hurtProofValue = hurt.getProofValue();
                if (effect != null && point != null && effect.b_decay == true) {
                    let mid = this.getMidPos();
                    let dis = Helper.getTwoPointsDis(mid, point);
                    hurtProofValue = (effect.decay_ratio - dis) / effect.decay_ratio * hurtProofValue + hurtProofValue * 0.5;
                }
                if (effect != null) {
                    effect.collisionEvent();
                }
                let skillRatioExtra = 0;
                if (belongSkill.getSkillType() == message.ESkillType.SKILL_TYPE_HANDLE || belongSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH) {
                    skillRatioExtra = (character.getAutoSkill().getRelateValue()) * (belongSkill.getSkillLevel());
                }
                let bReduceDefenceArr = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_DEFENCE, atkType);

                let calceHurt = () => {
                    //A代表攻方，B代表守方
                    let O_def = this.getDef(true);
                    let D_def = this.getDef(false);
                    //是否忽视防御
                    let isIgDef = isIgnoreDef(character.getIgnorePhydef(), character, this);
                    //忽视防御
                    let realDef = yuan3(isIgDef, D_def * (100 - constdb.GetValue(ConstValueEnum.CV_IGNORE_DEF)) / 100, D_def);
                    //攻击方攻击
                    let A_phyAtk = character.getAtk();
                    //防守方防御 天赋忽视防御
                    let D_phyDef = character.handleTalentEffect_IgnoreTargetDef(realDef);
                    let formulaDef = D_phyDef;
                    let ignoreDefLimitTagArr = this.handleTalentEffect_IgnoreDefLimit();
                    if (ignoreDefLimitTagArr[0]) {
                        let difValue = D_def - D_phyDef;
                        if (difValue > 0 && difValue / D_def * 100 > ignoreDefLimitTagArr[1]) {
                            formulaDef = D_def * (100 - ignoreDefLimitTagArr[1]) / 100;
                        }
                    }
                    let reduceIgnoreDefTagArr = this.handleTalentEffect_ReduceIgnoreDef();
                    if (reduceIgnoreDefTagArr[0]) {
                        formulaDef = (O_def - formulaDef) * (reduceIgnoreDefTagArr[1] / 100) + formulaDef;
                    }
                    //伤害值计算
                    let value = hunterHurtC(A_phyAtk, formulaDef, belongSkill.getSkillHurtRatio() * 0.01, belongSkill.getHurtExtraValue(), hurtProofValue, character.roleId);
                    return value;
                }

                //攻方暴击率
                let A_critRate = character.getCritRate();
                //攻方暴击伤害
                let A_csd = character.getCritExtra();
                //暴击抵抗
                let D_ctr = this.getCritDef();

                //是否忽视敌方暴击抵抗
                let ignoreCritDefTagArr = character.handleTalentEffect_IgnoreCritDef();
                if (ignoreCritDefTagArr[0]) {
                    D_ctr = D_ctr * (100 - ignoreCritDefTagArr[1]) / 100;
                    if (D_ctr <= 0) {
                        D_ctr = 0;
                    }
                }
                //检测天赋是否必然暴击
                let bTalentEffective = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_MAX, -1);
                //检测是否暴击
                let bAtkTalentCritEffective = false;
                let reduceCritByAtkGroup = this.handleTalentEffect_ReduceCritByAttackGroup(character);
                if (bTalentEffective[0] || isCrit(A_critRate - reduceCritByAtkGroup, D_ctr, character, this) == true) {
                    bCrit = true;
                    //被敌方暴击时
                    this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_CRIT, -1, null, null);
                    //攻方产生暴击时
                    character.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_CRIT, -1);
                    //队友产生暴击时
                    this.triggerFriendTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_FRIEND_BECRIT);
                    hurtValue = calceHurt();
                    let orginVal = hurtValue;
                    hurtValue = hunterCritHurt(orginVal, A_csd);
                    hurtValue = this.handleTalentEffect_CritHurtLimit(orginVal, hurtValue);
                    //降低和提升暴击伤害
                    let arr = this.handleTalentEffect_CritHurt(character, hurtValue);
                    hurtValue = arr[0];
                    bAtkTalentCritEffective = arr[1];
                } else {
                    hurtValue = calceHurt();
                }
                //受到某种类型伤害时
                this.triggerBeAttackedByDamage();
                let bAtkTalentKeepShow = false;
                //处理天赋伤害加减
                let arr = this.keepOutTalentHurt(atkType, hurtValue, character);
                bAtkTalentKeepShow = Boolean(arr[0]);
                hurtValue = Number(arr[1]);
                //属性转伤害
                let defToRealHurt = character.handleTalentEffect_ProtoToHurt(this);
                hurtValue = hurtValue + defToRealHurt;

                //目标生命值转hurt
                hurtValue = character.handleTalentEffect_AddHurtByTargetHp(hurtValue, this);
                //目标最大生命值转hurt
                hurtValue = character.handleTalentEffect_AddHurtByTargetMaxHp(hurtValue, this);
                if (hurtValue <= 0) {
                    hurtValue = 0;
                }
                //增益buff减伤
                hurtValue = this.keepOutHurt(atkType, hurtValue);

                //是否触发秒杀
                hurtValue = character.handleTalentEffect_SecKill(hurtValue, this);
                //敌人已损失生命值n%的伤害
                hurtValue = character.handleTalentEffect_LostHpTrantoHurt(hurtValue, this);
                //自己已损失生命值n%的伤害
                hurtValue = character.handleTalentEffect_AtkerLostHpTrantoHurt(hurtValue);
                //是否触发抢夺buff
                character.handleTalentEffect_GrabBuff(this);
                //伤害系数
                let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO);
                hurtValue = hurtValue * ratio;
                if (bDodge) {
                    hurtValue = hurtValue * (100 - constdb.GetValue(ConstValueEnum.CV_DODGE_HURT)) / 100;
                }
                let beAtkedMaxHp = this.getMaxHp(true);
                //攻击时时产生hurt时触发
                character.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_HURT_BEHIND, belongSkill.getSkillType(), yuan3(hurtValue > beAtkedMaxHp, beAtkedMaxHp, hurtValue));
                //被攻击时产生hurt时触发
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_HURT_BEHIND, belongSkill.getSkillType(), yuan3(hurtValue > beAtkedMaxHp, beAtkedMaxHp, hurtValue), null);
                //处理吸血
                character.dealBleed(hurtValue);
                //吸血转护盾
                character.handleTalentEffect_SuckTrantoShield(hurtValue);
                //处理伤害减免
                hurtValue = this.dealDamageReduction(hurtValue, character);
                //处理所有伤害减免
                hurtValue = this.dealAllHurt(hurtValue, character);
                //每段攻击最多吸收的伤害值
                hurtValue = this.handleTalentEffect_ActionAbsorb(hurtValue, curAction);
                //被打方处理反弹( 目标者, 伤害 )
                this.dealRebound(character, atkType, hurtValue);
                //击中别人自己hp转别人伤害
                character.handleTalentEffect_CutMyHpToDamage(this);
                if (hurtValue < 0) {
                    return [false, 0];
                }
                if (hurtValue < 1) {
                    hurtValue = 1;
                }
                let showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                let right = yuan3(this.getPosX() > character.getPos()[0], true, false);
                if (bAtkTalentKeepShow == true || bAtkTalentCritEffective == true) {
                    if (bCrit) {
                        let critArr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_CRIT);
                        this.createCritNum(critArr[0], critArr[1], showValue);
                    } else {
                        this.creatHurtNum(numX, numY, showValue);
                    }
                } else {
                    if (bCrit == true) {
                        let critArr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_CRIT);
                        this.createCritNum(critArr[0], critArr[1], showValue);
                    } else {
                        this.creatHurtNum(numX, numY, showValue, right);
                    }
                }
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!:"+hurtValue);
                //处理hp
                let curHp = this.getHp();
                let realhurt = yuan3(hurtValue > curHp, curHp, hurtValue);
                this.handleTalentEffect_ReboundHurt(realhurt, character);
                this.checkLoseBloodTalent(realhurt / this.getMaxHp(true) * 100);
                character.flowHurtValue(hurtValue, realhurt, this);
                //普通碰撞减血
                this.skillReduceHp(hurtValue, character, null);
                this.dealShelter(hurtValue);
                this.bleedMakeRage(hurtValue);
                //外挂交互
                //this.fightScene.takePluginConst();
            }


            this.dealHit(character, hitId, sizeTbl);
            //被击中碰撞音效
            if (hurt != null && hurt.sound_id != -1 && Gmgr.Instance.hitSoundEffectNum < ConstantConfig_Common.MaxHitSoundEffect) {
                Helper.EftByID(hurt.sound_id);
                Gmgr.Instance.hitSoundEffectNum = Gmgr.Instance.hitSoundEffectNum + 1;
            }
            let bDeadArr = this.dealHurtHpZero(character, hurtValue, belongSkill.getSkillType());
            if (bDeadArr && bDeadArr[0] == true) {
                return [true, bDeadArr[1]];
            }
            if (bDodge == true) {
                return [true, bDeadArr[1]];
            }
            this.dealHurtState(priority, hurt, character);
            return [true, hurtValue];
        }
        public keepOutHurt(atkType, hurtValue) {
            let value = hurtValue;
            // 处理免疫
            let bImmune = false;
            let immuneOdd = 0;
            let arr = this.dealImmune(atkType, value);
            bImmune = arr[0];
            immuneOdd = arr[1];
            if (bImmune == true) {
                bImmune == true
            }
            //处理护盾
            let bShield = false;
            let shieldOdd = 0;
            let arr1 = this.dealShield(value);
            bShield = arr1[0];
            shieldOdd = arr1[1];
            if (bShield == true) {
                value = shieldOdd
            }
            //处理吸收
            this.dealSuck(atkType, value);
            return value;
        }
        //处理免疫(待优化)
        public dealImmune(damageType, hurtValue) {
            let bImmune = false;
            let value = hurtValue;
            let arr = this.commonImmune(TableEnum.TableBufferType.BUFFER_PHY_IMMUNE, value);
            bImmune = arr[0];
            value = arr[1];
            if (bImmune == true && value == 0) {
                //物理全免 
            } else {
                arr = this.commonImmune(TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE, value);
                bImmune = arr[0];
                value = arr[1];
            }
            return [bImmune, value];
        }
        public commonSuck(buffType, hurtValue) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            let arr = this.getBuff(buffType);
            tBuff = arr[0];
            index = arr[1];
            //无此buff吸收
            if (tBuff == null) {
                return [false, value];
            }
            if (buffType == TableEnum.TableBufferType.BUFFER_PHY_SUCK || buffType == TableEnum.TableBufferType.BUFFER_MAGIC_SUCK || buffType == TableEnum.TableBufferType.BUFFER_DAMAGE_SUCK) {
                tBuff.playTriggerSpx();
            }
            let maxValue = value * tBuff.fir_value;
            let buffValue = tBuff.sec_value;
            let difValue = buffValue - maxValue;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                let forbidden = this.getForbideRecoverValue();
                let tmp = maxValue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            } else {
                let forbidden = this.getForbideRecoverValue();
                let tmp = buffValue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            }
        }
        //[[是否存在禁止恢复buff，恢复的百分比是多少]]
        public getForbideRecoverValue() {
            let value = 0;
            for (let k in this.tableBuffs) {
                let v = this.tableBuffs[k];
                if (v.getBuffBaseType() == TableEnum.TableBufferType.BUFFER_FORBIDE_RECOVER) {
                    value = value + v.fir_value;
                }
            }
            if (value >= 1) {
                value = 1;
            }
            return value;
        }
        //[[人物回血总量]]
        public flowRecoverValue(value) {
            this.recoverTotalValue = this.recoverTotalValue + value;
        }
        public dealRecHp(value) {
            if (this.bDead == true || this.bMomentDead == true) {
                return 0;
            }
            if (value <= 1) {
                value = 1;
            }
            let dif = this.addHp(value);
            let arr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_REC_HP);
            let x = arr[0];
            let y = arr[1];
            this.creatRechpNum(x, y, value);
            return dif;
        }
        //[[增加人物血量]]
        public addHp(add) {
            let cur = this.getHp();
            let max = this.getMaxHp(true);
            let dif = 0;
            if (cur + add > max) {
                cur + add > max;
            }
            this.setHp(cur + add);
            return dif;
        }
        public creatRechpNum(baseX, baseY, hurtV) {
            let scale = getRandom(ConstantConfig_CommonBattle.shanghainum2.randTbl.min * 1000, ConstantConfig_CommonBattle.shanghainum2.randTbl.max * 1000) / 1000;
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum2, hurtV, ConstantConfig_CommonBattle.shanghainum2.w, ConstantConfig_CommonBattle.shanghainum2.h, ConstantConfig_CommonBattle.shanghainum2.offset)
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 3, scale)
            num.setData(baseX, baseY, 0, 0)
            num.start();
        }
        //处理吸收
        public dealSuck(damageType, hurtValue) {
            let bSuck = false;
            let value = hurtValue;
            this.commonSuck(TableEnum.TableBufferType.BUFFER_PHY_SUCK, value);
            this.commonSuck(TableEnum.TableBufferType.BUFFER_DAMAGE_SUCK, value);
            return [bSuck, value];
        }
        //处理护盾
        public dealShield(hurtValue) {
            let bShield1 = false;
            let bShield2 = false;
            let bShield3 = false;
            let bShield4 = false;
            let value = hurtValue;
            let arr = this.immuneRelatedNum(value);
            bShield1 = arr[0];
            value = arr[1];
            if (bShield1) {
                return [true, value];
            }
            arr = this.immuneCompareHp(value);
            bShield2 = arr[0];
            value = arr[1];
            if (bShield2) {
                return [true, value];
            }
            arr = this.commonImmune(TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_DEF, value);
            bShield3 = arr[0];
            value = arr[1];
            if (bShield3) {
                return [true, value];
            }
            arr = this.commonImmune(TableEnum.TableBufferType.BUFFER_SHIELD, value);
            bShield4 = arr[0];
            value = arr[1];
            return [bShield4, value];

        }
        //处理关联次数免疫
        public immuneRelatedNum(hurtValue) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            if (this.bIgnoreInjury) return [false, value]; // 被对方忽略减伤
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_NUM);
            tBuff = arr[0];
            index = arr[1];
            //无免
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            let buffValue = tBuff.sec_value;
            let difValue = buffValue - 1;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                //全免
                return [true, 0];
            } else {
                //部分免
                return [true, hurtValue];
            }
        }
        //处理比较最大生命
        public immuneCompareHp(hurtValue) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            if (this.bIgnoreInjury) return [false, value]; // 被对方忽略减伤
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_SHIELD_COMPARE_MAXHP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            if (hurtValue >= tBuff.sec_value) {
                //部分免
                this.openFoldBuffEffect(tBuff);
                CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
                return [true, hurtValue - tBuff.sec_value];
            } else {
                return [true, 0];
            }
        }
        //处理通用免疫
        public commonImmune(buffType, hurtValue) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            if (this.bIgnoreInjury) return [false, value]; // 被对方忽略减伤
            let arr = this.getBuff(buffType);
            tBuff = arr[0];
            index = arr[1];
            //无免
            if (tBuff == null) {
                return [false, value];
            }
            if (buffType == TableEnum.TableBufferType.BUFFER_PHY_IMMUNE || buffType == TableEnum.TableBufferType.BUFFER_MAGIC_IMMUNE || buffType == TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE || buffType == TableEnum.TableBufferType.BUFFER_SHIELD || buffType == 0) {
                tBuff.playTriggerSpx();
            }
            let buffValue = tBuff.sec_value;
            let difValue = buffValue - value;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                //全免
                return [true, 0];
            } else {
                //部分免
                return [true, hurtValue - buffValue];
            }
        }
        public openFoldBuffEffect(instance) {
            for (let k in this.tableBuffs) {
                let v = this.tableBuffs[k];
                if (v.buff_type == instance.buff_type && v.is_fold == true) {
                    v.is_fold = false;
                    if (v.spx != null) {
                        v.spx.visible = true;
                    }
                    return;
                }
            }
        }
        public dealDamageReduction(hurtValue, character) {
            let value = hurtValue;
            let aValue = this.handleTalentEffect_LoseHpConvertIgnoreHurt();
            let bValue = this.handleTalentEffect_BeInBuffIngoreHurt();

            let percent = (100 - aValue - bValue) / 100;
            if (percent <= 0) {
                percent = 0;
            }
            value = hurtValue * percent;
            if (value <= 1) {
                value = 1;
            }
            return value;
        }
        public handleTalentEffect_BeInBuffIngoreHurt() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        }
        public handleTalentEffect_LoseHpConvertIgnoreHurt() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let maxHp = this.getMaxHp(true);
                let curHp = this.getHp();
                if (maxHp <= 0) {
                    maxHp <= 0;
                }
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                let per = (maxHp - curHp) / maxHp * 100;
                addValue = Math.floor(per / arr[2]) * arr[1];
            }
            return addValue;
        }
        public dealAllHurt(hurtValue, character) {
            let value = hurtValue;
            value = this.handleTalentEffect_Hunlian(character, value);
            let redValue1 = this.handleTalentEffect_ReduceAllHurt();
            let addValue1 = this.handleTalentEffect_ProAllHurt(character);
            let addValue2 = character.handleTalentEffect_ProAtkerAllHurt();
            let redValue2 = this.handleTalentEffect_ReduceBeAtkerAllHurt(character);
            let signValue = this.getBuffOverlayValue(TableEnum.TableBufferType.BUFFER_SIGIN);
            let percent = (100 - redValue1 + addValue1 + addValue2 - redValue2) / 100 + signValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = value * percent;
            if (value <= 1) {
                value = 1;
            }
            return value;
        }
        public handleTalentEffect_Hunlian(character, hurtValue) {
            let tableMaxHp = [];
            let t = [];
            if (this.bEnemy == false) {
                t = this.fightScene.tableAllys;
            } else {
                t = this.fightScene.tableAllys;
            }
            tableMaxHp = this.fightScene.sortTableByHp(t, false);
            let len = tableMaxHp.length;
            // 1、魂链对自身不起作用。即如果拥有魂链天赋的是被攻击者，则不起作用。
            // 2、A被攻击，B、C有N%的魂链时。
            // 如果A生命值最少，则B、C中生命值大的那个角色的魂链生效（应该会有个特效显示），分担A的伤害。
            // 分完后A应受到的剩下的伤害，按规则继续由第二个分担者分担。
            // 3、加深规则，应该是分担完后加深。即若A本应受到DmgA的伤害，分担DmgA*N%给B，然后对B受到的这个DmgA*N%来做加深或减免。
            // 4、分担的伤害值不超过分担者生命上限。生命值只剩1时，魂链天赋失效。
            if (len != 0 && tableMaxHp[len] != this) {
                return hurtValue;
            }
            for (let i = 0; i < len - 1; i++) {
                //队友是否触发魂链
                let arr = tableMaxHp[i].getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PARTAKE, -1, null, null);
                if (arr[0] == true) {
                    //减免
                    let partValue = hurtValue * arr[1] / 100;
                    //加深
                    let realValue = partValue * (1 + arr[2] / 100);
                    tableMaxHp[i].dealCutHp(character, realValue, true, 3, null);
                    hurtValue = hurtValue - partValue;
                }
            }
            return hurtValue;
        }
        public handleTalentEffect_ReduceAllHurt() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_ALL_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        }
        public handleTalentEffect_ProAllHurt(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION, target.roleFaction, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        }
        public handleTalentEffect_ReduceBeAtkerAllHurt(atker) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE, -1, null, null);
            let cutValue = 0;
            if (arr[0] == true) {
                let atker_atk = atker.getAtk();
                let my_atk = this.getAtk();
                cutValue = arr[1] * atker_atk / (atker_atk + my_atk);
            }
            return cutValue;
        }
        public handleTalentEffect_ActionAbsorb(hurt, action) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_ACTION_ABSORB, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true && action != null) {
                let maxLost = this.getMaxHp(true) * arr[1] / 100;
                hurtValue = action.keepOutLostHp(maxLost, hurt);
            }
            return hurtValue;
        }
        public handleTalentEffect_IgnoreInjury(target) {
            if (target == null) return;
            target.bIgnoreInjury = false;
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_TARGET_INJURY, -1, null, null);
            if (tag) target.bIgnoreInjury = true;
            return tag;
        }
        public keepOutTalentHurt(atkType, hurtValue, character) {
            let value = 0
            let multiValue = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_MULTI_HURT, -1)
            let aArr = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTACK_DAMAGE_REDUCE, -1)
            let bArr = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTACK_DAMAGE_ADD, -1)
            let cArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE, -1, null, null)
            let dArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_ADD, -1, null, null)
            let eArr = character.handleTalentEffect_Feishe(this, -1);
            let fArr = character.handleTalentEffect_Guidao(-1);
            let gArr = character.handleTalentEffect_JianTa(this, -1);
            let hArr = character.dealDouble(this);

            let jArr = character.handleTalentEffect_YanXing(this)
            let kArr = character.handleTalentEffect_ChuanYang(this, -1)
            let lArr = character.handleTalentEffect_Meihuo(-1)
            let oArr = character.handleTalentEffect_AtkRow(this)
            let pValue = character.dealWeak()
            let qValue = this.dealArmor()
            let rValue = this.dealArmorBreak();


            let sArr = character.handleTalentEffect_ProHurtByTargetGroup(this)
            let tArr = character.handleTalentEffect_ProHurtByTargetFeature(this)
            let uArr = character.handleTalentEffect_ProHurtByTargetFaction(this)
            let vValue = character.handleTalentEffect_LivingHurt(this)
            let wArr = character.handleTalentEffect_DisFar(this)
            let xArr = character.handleTalentEffect_AttriDValueP(this)
            let zArr = this.handleTalentEffect_ReduceHurtByTargetFaction(character)
            let aaArr = character.handleTalentEffect_ProHurtByByTargetHpPer(this)
            let bbArr = this.handleTalentEffect_ReduceHurtByAttackGroup(character)
            let ccArr = character.handleTalentEffect_ProtoCompareToDamageAdd(this)
            let ddArr = this.handleTalentEffect_ProtoCompareToDamageReduce(character)
            let eeArr = character.handleRageToHurt(this)
            let ffArr = this.handleHpCompareToEnemyMin();
            let ggArr = this.handleTalentEffect_ReduceHurtByAttackerFeature(character);
            let hhArr = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_ADD_HURT, -1);

            let percent = (100 - aArr[1] + bArr[1] - cArr[1] + dArr[1] + eArr[1] + fArr[1] + gArr[1] + hArr[1] + jArr[1] + kArr[1] + lArr[1] + oArr[1] + sArr[1] + tArr[1] + uArr[1] + vValue + wArr[1] + xArr[1] - zArr[1] + aaArr[1] - bbArr[1] + ccArr[1] - ddArr[1] + eeArr[1] - Number(ffArr[1]) - ggArr[1] + hhArr[1]) / 100 - pValue - qValue + rValue;
            if (percent <= 0) {
                percent = 0;
            }
            if (multiValue[1] <= 1) {
                multiValue[1] = 1;
            }
            value = hurtValue * percent + hurtValue * (multiValue[1] - 1);
            let bExtraShow = false;
            if (bArr[0] == true || eArr[0] == true || fArr[0] == true || gArr[0] == true || hArr[0] == true || jArr[0] == true || kArr[0] == true || lArr[0] == true || oArr[0] == true || sArr[0] == true || tArr[0] == true || uArr[0] == true || wArr[0] == true || xArr[0] == true) {
                bExtraShow = true;
            }
            return [bExtraShow, value];
        }
        public dealArmor() {
            let armorBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_ARMOR);
            let value = 0;
            if (armorBuff[0] != null) {
                value = armorBuff[0].fir_value;
            }
            return value;
        }
        //处理破甲
        public dealArmorBreak() {
            let armorBreakBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_ARMOR_BREAK);
            let value = 0;
            // if armorBuff ~= nil then
            //     value = armorBuff.fir_value
            // end
            return value;
        }
        public handleTalentEffect_ReduceHurtByTargetFaction(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION, target.roleFaction, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_ReduceHurtByAttackGroup(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATTACK_GROUP, character.groupTag, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_ProtoCompareToDamageReduce(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_REDUCE, -1, null, null);
            let addValue = 0;
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                let ret1 = this.getProtoValue(arr[2]);
                let ret2 = character.getProtoValue(arr[2]);
                if (ret1 > ret2) {
                    ret1 > ret2;
                }
            }
            return [arr[0], addValue];
        }
        public handleHpCompareToEnemyMin() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_HP_COMPARETO_ENEMY, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let targets = this.fightScene.getTargetPlayer(this, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_ALL);
                let myHp = this.getHp();
                for (let k in targets) {
                    let v = targets[k];
                    if (myHp < v.getHp()) {
                        addValue = arr[1];
                        return [true, addValue];
                    }
                }
            }
            return [false, addValue];
        }
        //受到(攻防辅)猎人伤害降低
        public handleTalentEffect_ReduceHurtByAttackerFeature(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATTACKER_FEATURE, character.roleFeature, null, null);
            let reduceValue = 0;
            if (arr[0] == true) {
                reduceValue = arr[1];
            }
            return [arr[0], arr[1]];
        }
        public triggerBeAttackedByDamage() {
            //并没有魔法攻击了，统一都用物理攻击
            this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DAMAGE, -1, null, null);
        }
        public handleTalentEffect_CritHurt(character, hurtValue) {
            let arr = character.getTalentEffective(TableEnum.TableTalentEffect.TALETN_EFFECT_CRIT_HURT_ADD, -1, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_HURT_REDUCE, -1, null, null);
            let percent = 1 + (arr[1] - arr1[1]) / 100;
            if (percent <= 0) {
                percent <= 0
            }
            let value = hurtValue * percent;
            return [value, arr[0]];
        }

        public handleTalentEffect_CritHurtLimit(val, hurtValue) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CRITHURT_LIMIT, -1, null, null);
            let value = hurtValue;
            if (arr[0] == true) {
                let limit = (val * arr[1] / 100);
                if (hurtValue >= limit) {
                    hurtValue >= limit
                }
            }
            return value;
        }
        public triggerFriendTalent(type) {
            let partners = this.fightScene.getPartnerDebar(this.eCamp, this);
            for (let j = 0; j < partners.length; j++) {
                let role = partners[j];
                let t = role.tableBaseTalent[type];
                if (t != null) {
                    for (let i = 0; i < t.length; i++) {
                        let talent = t[i];
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }

        public handleTalentEffect_ReduceCritByAttackGroup(character) {
            let value = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CRIT_BY_ATTACK_GROUP, character.groupTag, null, null);
            return value[1];
        }
        public dealRebound(character, atkType, hurtValue) {
            if (this.isSupport()) {
                return;
            }
            let bRebound = false;
            let value = hurtValue;
            let arr = this.commonRebound(hurtValue, character);
            bRebound = arr[0];
            value = arr[1];
            if (bRebound == true) {
                //我方处理反弹效果
                this.doReboundUi();
                //敌方处理被反弹效果
                character.beRebounded(atkType, value, this);
            }
        }
        public commonRebound(hurtValue, character) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_REBOUND);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            let reboundValue = value * tBuff.fir_value * (Math.atan(this.getAtk() / 5000 - 2) + 1.11);
            return [true, reboundValue];
        }
        public createCritNum(baseX, baseY, hurtV) {
            let scale = getRandom(ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.baoji)
            num.setNumberInfo(UIConfig.UIConfig_FightNumber.baojinum, hurtV, ConstantConfig_CommonBattle.baojinum.w, ConstantConfig_CommonBattle.baojinum.h, ConstantConfig_CommonBattle.baojinum.offset);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        public handleTalentEffect_ReboundHurt(hurtValue, character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_HURT, -1, null, null);
            if (arr[0]) {
                let reboundValue = arr[1] * hurtValue / 100;
                if (reboundValue <= 1) {
                    reboundValue = 1;
                }
                //我方处理反弹效果
                this.doReboundUi();
                //敌方处理被反弹效果
                character.beRebounded(1, reboundValue, this);
            }
        }
        public handleTalentEffect_ProtomeByNumOfBuff(proto) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_BY_NUM_OF_BUFF, -1, null, null);
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true && this.hurtingRole != null) {
                let num = this.hurtingRole.getBuffSpecNumByType(arr[4].effect_extraParam);
                if (arr[3] != -1) {
                    if (num > arr[3]) {
                        num = arr[3];
                    }
                }
                result[arr[2]] = num * arr[1];
            }
            return result[proto];
        }
        //获得有益或减益buff数量
        public getBuffSpecNumByType(tbl) {
            if (tbl == null) {
                return 0;
            }
            if (tbl[0] == -1) {
                return this.tableBuffs.length;
            }
            let num = 0;
            for (let i = 0; i < this.tableBuffs.length; i++) {
                let type = this.tableBuffs[i].getBuffUseType();
                if (Table.FindK(tbl, type) != -1) {
                    num = num + 1;
                }
            }
            return num;
        }
        public handleTalentEffect_NumOfAtk() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED, -1, null, null);
            return arr[1];
        }
        public handleTalentEffect_Longyuan(condition) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LONGYUAN, condition, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                let num = 0;
                let tag = yuan3(this.fightScene.beInPvp() == true, true, false);
                if (this.bEnemy == false) {
                    num = this.fightScene.getGeneralsNum(true, tag);
                }
                if (this.bEnemy == true) {
                    num = this.fightScene.getGeneralsNum(false, tag);
                }
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return addValue;
        }
        public handleTalentEffect_Longhun(condition) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_JILI, condition, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                let num = 0
                if (this.bEnemy == false) {
                    num = this.fightScene.getGeneralsNum(false, true) - 1;
                }
                let tag = yuan3(this.fightScene.beInPvp() == true, true, false);
                if (this.bEnemy == true) {
                    num = this.fightScene.getGeneralsNum(true, tag) - 1;
                }
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return addValue;
        }
        //[[获得人物普攻伤害]]
        public getAtk() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.atk;
            let results = this.handleTalentEffect_ProtoToProto();
            value = value + results[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK];
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            let longhunValue = this.handleTalentEffect_Longhun(-1);
            let longyuanValue = this.handleTalentEffect_Longyuan(-1);
            let numOfAtk = this.handleTalentEffect_NumOfAtk();
            let atkPromoteValue = this.getBuffOverlayValue(TableEnum.TableBufferType.BUFFER_ATK_PROMOTE);
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let extra = (arr[1] + longhunValue + longyuanValue + numOfAtk + livingPerson + protomeByBuffNum - arr1[1] + loseHpToProto) / 100 + atkPromoteValue;

            let baseAddValueArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            let baseCutValueArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK)
            let base = (baseByFaction + baseByFightType + baseByFeature + baseAddValueArr[1] + baseByDiff - baseCutValueArr[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_PHY_ATK]) / 100;

            let loseHpToAtk = this.handleTalentEffect_LoseHpConvertAtk();
            if (this.isPerson()) {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                let real = value * percent + (this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_PHY_ATK]) * base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK] + loseHpToAtk;
                if (real <= 0) {
                    real = 0
                }
                return real;
            } else {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                let real = value * percent + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK] + loseHpToAtk;
                if (real <= 0) {
                    real = 0
                }
                return real;
            }
        }
        public handleTalentEffect_LoseHpConvertAtk() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LOSEHP_CONVERT_ATK, -1, null, null);
            let tmpValue = 0;
            if (arr[0]) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                    let loseHp = this.getMaxHp(true) - this.getHp();
                    tmpValue = loseHp / arr[2] * arr[1];
                }
            }
            return tmpValue;
        }
        public doReboundUi() {
            let arr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_BREAK);
            this.createReboundNumber(arr[0], arr[1]);
        }
        public createReboundNumber(baseX, baseY) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(UIConfig.UIConfig_FightNumber.rebound);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        public getRoleUpPos(tType) {
            let numX = 0;
            let numY = 0;
            let upX = 0;
            let upY = 0;
            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
                upX = this.roleAniOffsetSpeUpX;
                upY = this.roleAniOffsetSpeUpY;
            } else {
                upX = this.roleAniOffsetNorUpX;
                upY = this.roleAniOffsetNorUpY;
            }
            numX = this.x + upX + TsMtirand() % 30 * this.rand();
            numY = this.y - upY - TsMtirand() % 30 * this.rand();

            return [numX, numY];
        }
        public getHurtNumPos(...args) {
            // body
            let numX = 0
            let numY = 0

            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_StirUp || this.otherState == TableEnum.TableEnumOtherState.OtherState_StirDown || this.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
                numX = this.x + this.hurtNumOffsetSpeX + TsMtirand() % 30 * this.rand()
                numY = this.y - this.hurtNumOffsetSpeY - TsMtirand() % 30 * this.rand()
            } else {
                numX = this.x + this.hurtNumOffsetNorX + TsMtirand() % 30 * this.rand()
                numY = this.y - this.hurtNumOffsetNorY - TsMtirand() % 30 * this.rand()
            }
            return [numX, numY]
        }
        public checkLoseBloodTalent(loseBloodPer) {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_LOSE_BLOOD];
            if (t == null || t.length == 0) {
                return;
            }
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                if (talent.trigger_condition[0] == -1) {
                    let ret = talent.lose_blood_val + loseBloodPer;
                    talent.lose_blood_val = ret;
                    if (ret >= talent.extra_value) {
                        talent.lose_blood_val = ret - talent.extra_value;
                        if (talent.isTouch() == true) {
                            talent.talentFun(null);
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public dealShelter(value) {
            let dandanBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff[0] == null) {
                return;
            }
            dandanBuff[0].dealShelter(value);
            dandanBuff[0].playTriggerSpx();
        }

        public handleTalentEffect_ReduceIgnoreDef() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_IGNORE_DEF_VALUE, -1, null, null);
            return arr;
        }
        public handleTalentEffect_IgnoreDefLimit() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_DEF_LIMIT, -1, null, null);
            return arr;
        }
        public rand(...args) {
            let r = TsMtirand() % 2
            if (r == 0) {
                return -1
            } else {
                return 1
            }
        }

        public beEffectHurt(effect, character, point) {
            //无敌状态
            if (effect == null) {
                return [false, 0];
            }
            let hurt = effect.getHurt();
            if (hurt == null || (hurt != null && hurt.canHurtOne(this) == false) || hurt.beInCollideFrame() == false) {
                return [false, 0];
            }
            //console.log("==========================:"+hurt);

            let arr = this.getHurtNumPos();
            let numX = arr[0];
            let numY = arr[1];

            let aType = effect.getAtkType();
            _hurtingAndBring(this, character);

            let belongSkill = effect.getBelongSkill()
            let priority = effect.getBreakPriority()
            arr = effect.getHitEffectId();
            let hitId = arr[0];
            let sizeTbl = arr[1];
            let buffId = effect.getBuffId();
            let belongUnit = belongSkill.getCurUnit();
            let curAction = belongUnit.getCurAction();


            character.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF, this, ETalentDir.Dir_Attack);
            character.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF, character, ETalentDir.Dir_Attack);
            this.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF, this, ETalentDir.Dir_BeAttactked);
            //攻击方属性值大于小于防御方检测
            character.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, this, ETalentDir.Dir_Attack);
            character.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, this, ETalentDir.Dir_Attack);
            //防御方生命值大于小于攻击方检测
            this.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, character, ETalentDir.Dir_BeAttactked);
            //攻击方属性大于防御方N%检测
            character.checkProtoComparePer(TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, this, ETalentDir.Dir_Attack);
            //防御方属性大于供给方N%检测
            this.checkProtoComparePer(TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, character, ETalentDir.Dir_BeAttactked);
            //攻击方生命值大于小于检测 
            character.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_Attack);
            character.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_Attack);
            //防御方生命值大于小于检测
            this.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_BeAttactked)
            this.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_BeAttactked)
            //被攻击方生命值大于小于检测，攻击方触发天赋
            character.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, this, ETalentDir.Dir_Attack);
            character.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, this, ETalentDir.Dir_Attack);
            //攻击方生命值大于小于检测，被攻击方触发天赋
            this.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, character, ETalentDir.Dir_BeAttactked);
            character.checkProtoCompareValueTalent();
            this.checkProtoCompareValueTalent();

            //真实伤害判断
            //buff判断
            this.beBuffHurt(belongSkill.getSkillLevel(), buffId, character, belongUnit, effect, null);
            arr = this.beHurtCommon(belongSkill, character, aType, hurt, hitId, sizeTbl, priority, numX, numY, false, point, effect, curAction);
            this.beCollisionStepBuff(character);
            _clearHurtingAndBring(this, character);
            this.releaseZoneEffect();
            character.releaseZoneEffect();
            return [arr[0], arr[1]];
        }
        public triggerInBuff(type, character, param) {
            let t = this.tableBaseTalent[type];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (param == talent.extra_value) {
                        let tBuff = null;
                        let index = 0;
                        for (let j = 0; j < talent.trigger_condition.length; j++) {
                            let arr = character.getBuff(talent.trigger_condition[j]);
                            tBuff = arr[0];
                            index = arr[1];
                            if (tBuff != null) {
                                continue;
                            }
                        }
                        if (tBuff != null) {
                            if (talent.isTouch() == true) {
                                talent.talentFun(null);
                                talent.triggerEffect();
                            }
                        }
                    }
                }
            }
        }
        public checkProtoCompareTalent(eType, targetRole, param) {
            let t = this.tableBaseTalent[eType];
            if (!t || t.length == 0) { return };
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                let _type = talent.trigger_condition[0];
                let _my = this.getProtoValue(_type);
                let _target = targetRole.getProtoValue(_type);
                if (param == talent.extra_value && ((eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER && (_my - _target > 0))
                    || (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS && (_target - _my > 0)))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null)
                        talent.triggerEffect();
                    }
                }
            }
        }
        public checkProtoComparePer(eType, targetRole, param) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) { return };
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                let _type = talent.trigger_condition[0];
                let _my = this.getProtoValue(_type);
                let _target = targetRole.getProtoValue(_type);
                if (param == talent.extra_value && (_my - _target * (100 + talent.extra_value2) / 100 > 0)) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        }
        public checkHpCompareSelf(eType, param) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) { return };
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                let _type = talent.trigger_condition[0];
                let _value = this.getHp() / this.getMaxHp(true) * 100;
                if (param == talent.extra_value && ((eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER && _value - _type > 0)
                    || (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS && _type - _value > 0))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        }
        public checkHpCompareTarget(eType, target, param) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) { return };
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                let _type = talent.trigger_condition[0];
                let _value = target.getHp() / target.getMaxHp(true) * 100;
                if (param == talent.extra_value && ((eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER && _value - _type > 0)
                    || (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS && _type - _value > 0))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        }
        public checkProtoCompareValueTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTRI_COMPARE_GREATER];
            if (t == null || t.length == 0) {
                return;
            }
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                let _type = talent.trigger_condition[0];
                let _my = this.getProtoValue(_type);
                if (_my > talent.extra_value) {
                    if (talent.isTouch() == true) {
                        talent.attriDiff = _my - talent.extra_value;
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        }
        public releaseZoneEffect() {
            for (let j in this.tableTalentEffect) {
                let i = 0;
                let v = this.tableTalentEffect[j];
                if (v) {
                    while (i < v.length) {
                        if (v[i].belong_talent != null && this.isZoneTalentTrigger(v[i].belong_talent.trigger_type)) {
                            CC_SAFE_DELETE(v[i]);
                            v.splice(i, 1);
                        } else {
                            i = i + 1;
                        }
                    }
                }
            }
        }
        public beCollisionStepBuff(character) {
            let arr = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_STEP_BUFF, -1, null, null);
            if (arr[0] == true) {
                if (arr[4].stepBuffHitRate == -1) {
                    arr[4].stepBuffHitRate = arr[5];
                }
                let arr1 = this.beBuffHurt(arr[4].stepBuffHit, arr[4].effect_buffId, character, null, null, arr[4].stepBuffHitRate);
                if (arr1[0] == null && arr1[1] == 0) {
                    arr[4].stepBuffHitRate = arr[4].stepBuffHitRate + arr[5];
                } else if (arr1[0] != null) {
                    character.tableTalentEffect.splice(TableEnum.TableTalentEffect.TALENT_EFFECT_STEP_BUFF, 1);
                }
            }
        }
        public isZoneTalentTrigger(type) {
            if (type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS ||
                type == TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTRI_COMPARE_GREATER) {
                return true;
            }
            return false;
        }
        //死亡动画
        public setDisappear() {
            this.bDisappear = true;
            if (this.deadParticleEffects == null) {
                [this.deadParticleEffects] = HunterSpineX(null, 1, null, "zd_siwang");
                this.nodeRoot.addChild(this.deadParticleEffects.spine);
                this.deadParticleEffects.ChangeAction(0);
                this.deadParticleEffects.SetPosition(this.x, this.y);
                this.deadParticleEffects.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.deadFun, this);
            }
        }
        private deadFun() {
            if (this.deadParticleEffects) {
                this.deadParticleEffects.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.deadFun, this);
                this.deadParticleEffects.clearSpine();
                this.deadParticleEffects = null;
            }
        }
        public setCanRemove() {
            this.bCanRemove = true;
        }
        public getTeamNum() {
            return this.eTeamNum;
        }

        public enterBtl() {
            this.initLight();
            this.loadDcBuff();
            this.renewDcPos();
        }

        public updatePermanentHp() {
            if (this.SpritePdhBlood == null) {
                return
            }
            let maxHp = this.getMaxHp()
            if (this.pdhValue == 0) {
                this.SpritePdhBlood.visible = false;
                this.SpriteBloodSplit.visible = false;
                this.SpriteRedBlood.visible = false;
            } else {
                let size_bar = getPercentSize(this.BarHpSize, 1)
                this.SpritePdhBlood.visible = true;
                this.SpritePdhBlood.width = size_bar.width;

                let red_bar = getPercentSize(this.BarHpSize, (maxHp - this.pdhValue) / maxHp)
                this.SpriteRedBlood.visible = true;
                this.SpriteRedBlood.width = red_bar.width;

                let bar = getPercentSize(this.BarHpSize, (maxHp - this.pdhValue) / maxHp)
                this.SpriteBloodSplit.visible = true;
                this.SpriteBloodSplit.x = -this.BarHpSize.width / 2 + bar.width;
                this.SpriteBloodSplit.y = 4
            }
        }

        public creatHurtNum(baseX, baseY, hurtV, right?) {
            // body 
            //if( true ){ return } 
            // 黄色数字   
            // if( #FightNumberEffectMgr.tableNumbers >= 2 ){ return }
            let scale = getRandom(ConstantConfig_CommonBattle.shanghainum1.randTbl.min * 1000, ConstantConfig_CommonBattle.shanghainum1.randTbl.max * 1000) / 1000

            let num1 = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num1.newSetData();
            num1.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum1, hurtV, ConstantConfig_CommonBattle.shanghainum1.w, ConstantConfig_CommonBattle.shanghainum1.h, ConstantConfig_CommonBattle.shanghainum1.offset)
            num1.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 1, scale)
            num1.setData(baseX, baseY, 0, 0)
            num1.start()

            // // 特效白色数字
            // let num2 = Game.ObjectPool.getItem("FightNumberEffect",FightNumberEffect);
            // num2.newSetData();
            // num2.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum3, hurtV, ConstantConfig_CommonBattle.shanghainum3.w, ConstantConfig_CommonBattle.shanghainum3.h, ConstantConfig_CommonBattle.shanghainum3.offset)
            // num2.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 5, scale )  
            // num2.setData(baseX, baseY, 0, 0);
            // num2.start()
        }

        public isImmuning() {
            for (let k in this.tableBuffs) {
                if (this.tableBuffs[k].getBuffBaseType() == TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE) {
                    return true
                }
            }
            return false
        }

        public isRelicCensus() {
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                return true
            }
            return false
        }

        public calcShieldHp(reduce) {
            this.currShieldHp = this.currShieldHp + reduce
        }

        /*技能减血*/
        public skillReduceHp(reduce, character, bFlow) {
            if (bFlow == null) { bFlow = true }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce)
            }

            if (this.isImmuning()) {
                return
            }
            let cur = this.getHp()
            this.setHp(cur - reduce)

        }

        public setDead(bHell) {
            if (this.isActivityBoss()) {
                return;
            }
            if (this.bDead == true || this.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
                return;
            }
            this.bDead = true;
            this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_DEATH, false);
            this.doBreakOther(false);
            this.clearAllBuffs();
            this.setRage(0);
            if (bHell == true) {
                //直接宣判死亡
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
            } else {
                //需要经过特殊处理再死亡
                if (this.bGravity == false) {
                    this.bGravity = true;
                    this.floor = Gmgr.Instance.ground;
                }
                if (this.formType == TableEnum.TableEnumFromClassify.TYPE_CALL) {
                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
                } else {
                    this.stirUpSpeed = ConstantConfig_RoleBattle.COMMON_DEAD_STIRUPSPEED;
                    this.stirSpeedX = ConstantConfig_RoleBattle.COMMON_DEAD_STIRXSPEED;
                    this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);
                }
            }


        }

        public deadJudge(args?) {
            for (let i = 0; i < this.tableDeathTalent.length; i++) {
                let talent = this.tableDeathTalent[i];
                talent.talentFun();
                talent.triggerEffect();
            }
            this.tableDeathTalent = [];
            this.bMomentDead = false;
            this.doBreakOther(false);
            //处理回天
            let buquTag = false;
            //处理自爆
            let zibaoTag = false;
            //处理复活
            let fuhuoTag = false;
            //如果致死标志置为true，则不能复活
            if (this.bNoRevive == false) {
                buquTag = this.handleTalentEffect_Buqu();
                zibaoTag = this.handleTalentEffect_ZiBao();
                fuhuoTag = this.handleTalentEffect_Fuhuo();
            }
            //检测不屈是否生效
            if (buquTag == false && zibaoTag == false && fuhuoTag == false) {
                //触发特殊死亡天赋时需直接死亡
                if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                    if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                        this.fightScene.openWeekStep();
                    } else {
                        this.setDead(this.bTalentTag);
                    }
                } else {
                    this.setDead(this.bTalentTag);
                }
            }
        }
        public handleTalentEffect_Fuhuo(args?) {
            let [tag, value, extra, extra2, effect] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_FUHUO, -1, null, null);
            if (tag == true) {
                this.bReviving = true;
                this.setHp(this.getMaxHp(true) * value / 100);
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    let buff = this.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this, null, null, null);
                }
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_AFTER_FUHUO, -1, null, null);

                this.breakMoveAni(this.moveFinsihCB);
            }
            return tag;
        }
        private moveFinsihCB() {
            this.bReviving = false;
            this.setVisible(true);
            this.changeState(TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Curve);
            //重生复活后重置小技能cd时间
            this.dealCutCdMin();
        }
        public dealCutCdMin() {
            if (this.getPressSkill() != null) {
                let cdVal = this.getPressSkill().getCd();
                let effectValue = this.dealCdEffect();
                SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), cdVal * (-1) * effectValue, null, null);
                this.playCdAni(-(cdVal / 1000));
            }
        }
        public playCdAni(cd) {
            if (Gmgr.Instance.bGoLogin == true || this.bEnemy == true) {
                return;
            }
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_CALL || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            let value = Math.floor(Math.abs(cd));
            let [x, y] = this.fightScene.getRageTipPos(this.eTeamNum, 1);
            if (x != null && y != null) {
                y = y + 30;
                if (cd < 0) {
                    this.createCdReduceNum(x, y, value);
                } else if (cd > 0) {
                    this.createCdAddNum(x, y, value);
                }
            }
        }
        public createCdReduceNum(baseX, baseY, value) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.cdjian);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        }
        public createCdAddNum(baseX, baseY, value) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.cdjia);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0)
            num.setPosition(baseX, baseY)
            num.runAction()

            num.start();
        }
        public dealCdEffect() {
            let value = 0;
            let [aTag, aValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CDRED_EFFECT, -1, null, null);
            let percent = 100 - aValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = percent / 100;
            return value;
        }
        public handleTalentEffect_ZiBao(args?) {
            let [tag, value, extra] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ZIBAO, -1, null, null);
            if (tag == true) {
                this.setBomb();
            }
            return tag;
        }
        //设置自爆
        public setBomb(args?) {
            this.bBomb = true;
        }
        public handleTalentEffect_Buqu(args?) {
            let [tag, value, extra, extra2, effect] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_BUQU, -1, null, null);
            if (tag == true) {
                //不屈起身前要清除所有buff
                this.clearAllBuffs();
                //不屈回血
                let tvalue1 = value * this.getMaxHp(true) / 100;
                this.flowRecoverValue(tvalue1);
                this.dealRecHp(tvalue1);
                let tvalue = effect.growUp_value * this.getMaxRage() / 100;
                this.dealRecRage(tvalue);
                this.setVisible(true);
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    let buff = this.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this, null, null, null);
                }
                this.changeState(TableEnum.TableEnumBaseState.State_None);
                this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_GetUp);
            }
            return tag;
        }
        public checkTalent_Limit(eType) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) { return };
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                if (talent.trigger_num < talent.extra_value) {
                    if (talent.isTouch() == true) {
                        talent.trigger_num = talent.trigger_num + 1
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        }

        public dealHurtHpZero(character, value, skillType) {
            if (this.bDead == true || this.bMomentDead == true) {
                return [true, 0];
            }
            if (this.isWeeking()) {
                return [true, 0];
            }
            if (this.isActivityBoss()) {
                return [true, 0];
            }
            if (this.getHp() <= 0) {
                if (character != null) {
                    let killer = character;
                    if (character.bCall == true) {
                        killer = character.father;
                    }
                    killer.handleTalentEffect_KillNoRevive(this);
                    if (killer != null && killer.bDead == false) {
                        let value = killer.handleTalentEffect_GetRage();
                        let r_value = killer.handleTalentEffect_ReduceRage();
                        let p = 100 + value - r_value;
                        if (p <= 0) {
                            p = 0;
                        }
                        let tmp = killer.getRageAddValue(EGetRageWay.Way_LastHit) * p / 100;
                        //补刀所属玩家加3点怒气
                        killer.dealRecRage(tmp, true);
                        //击杀任意敌人时
                        killer.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_KILL, skillType);
                        //是否触发神兵技噬魂
                        killer.checkTalent_Limit(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SHIHUN);
                        //是否触发吞噬
                        killer.handleTalentEffect_Tunshi(this);
                    }
                }
                this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD, false);
                this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH, false);
                //是否触发频死
                let ret = this.handleTalentEffect_WillDead();
                if (ret == true) {
                    return [false, value];
                }
                ret = this.handleTalentEffect_WillDead2();
                if (ret == true) {
                    return [false, value];
                }
                //自己死亡时触发队友的
                this.triggerFriendTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_FRIEND_DEATH);
                //自己死亡时触发敌人的
                this.triggerEnemyTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_DEATH);
                this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN, true);
                let deadSpx = UIConfig.UIConfig_CommonBattleCss.json_siwang;
                if (this.tableDeathTalent.length == 0) {
                    //自己死亡时
                    this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ZIBAO, true)
                    this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO, true)
                    this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_YIJI, true)
                    this.checkDeadTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUCHOU, true)
                    deadSpx = UIConfig.UIConfig_CommonBattleCss.json_zibao;
                }
                this.bTalentTag = yuan3(this.tableDeathTalent.length > 0, true, false);
                if (this.bTalentTag == true) {
                    this.bMomentDead = true;
                    this.setVisible(false);
                    //this.createDeadCss( this.x, this.y + this.hitEffectOffsetNorY, createCallback(this, this.deadJudge), deadSpx);
                    egret.setTimeout(() => { this.deadJudge() }, this, 1500);
                    return [true, value];
                } else {
                    this.deadJudge();
                    return [true, value];
                }
            }
            return [false, value];
        }
        // public createDeadCss( x, y, cb: Function, spxId){
        //     if(this.deadCss == null){
        //         let name = resdb.SPX( spxId );
        //     }
        // }
        public handleTalentEffect_Tunshi(deathRole) {
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_TUNSHI, -1, null, null);
            if (tag == true) {
                //天赋回血
                let tvalue = value / 100 * deathRole.getMaxHp(true);
                let forbidden = this.getForbideRecoverValue();
                let tmp = tvalue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            }
        }
        public procTalent(tick) {
            //判定自己的持续性天赋
            //判定自己身上天赋效果是否存在
            if (this.fightScene.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (!(this.bPause == true && this.fightScene.isTimePause() == true)) {
                this.procBattleTimeTalent();
            }
            for (let k in this.tableTalentEffect) {//let k = 0;k<Helper.getObjLen(this.tableTalentEffect);k++
                let v = this.tableTalentEffect[k];
                if (!v) {
                    continue;
                }
                let i = 0;
                while (i < v.length) {
                    if (v[i].b_disappear == true) {
                        CC_SAFE_DELETE(v[i]);
                        v.splice(i, 1);
                    } else {
                        v[i].update(tick);
                        i = i + 1;
                    }
                }
            }
        }
        public procBattleTimeTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.is_reset == true && this.fightScene.battleTime / 1000 >= talent.extra_value && talent.isTouch() == true) {
                        talent.is_reset = false;
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        }
        public updateExtra(tick) {
            this.procTalent(tick);
            if (this.bPause == true) {
                return;
            }
            this.procAi(tick);
        }
        public creatAi(aiId) {
            this.myAI = new AiBrain(this, aiId);
        }
        public procAi(tick) {
            if (this.bDead == true || this.bMomentDead == true) {
                return;
            }
            if (this.isWeeking()) {
                return;
            }
            if (this.isActivityBoss()) {
                return;
            }
            if (this.bForceAi == true) {
                return;
            }
            if (this.myAI != null) {
                if (this.fightScene.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                    this.myAI.update(tick);
                }
            }
        }
        public getAccordSkill(tContainer, tType) {
            if (tType == message.ESkillType.SKILL_TYPE_COMMON) {

            } else if (tType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.accordCd(tContainer, this.tableSkills);
            } else if (tType == message.ESkillType.SKILL_TYPE_DEATH) {
                this.accordCd(tContainer, this.tableSkills);
            }
        }

        public accordCd(tContainer, tCd) {
            for (let k in tCd) {
                let v = tCd[k];
                let damage = v.getSkillDamageType();
                //眩晕
                if (this.bStun == true) {
                    continue;
                }
                //冰冻
                if (this.bFrozen == true) {
                    continue;
                }
                //石化
                if (this.bStoned == true) {
                    continue;
                }
                //睡眠
                if (this.bSleep == true) {
                    continue;
                }
                //缴械 物理技能无法使用
                if (damage == message.EDamageType.DAMAGE_TYPE_PHY && this.bDisarm == true) {
                    continue;
                }
                if (this.pressCd == null || this.pressCd.IsFinish() == false) {
                    continue;
                }
                let info = { skillType: v.getSkillType(), order: v.getSkillOrder(), index: parseInt(k) };
                tContainer.push(info);
            }
        }
        public getAutoSkill() {
            return this.tableCommons[0];
        }
        public setForceAi(tag) {
            this.bForceAi = tag;
        }
        public loadSkillAi() {
            if (this.tableSkills.length > 0) {
                let info = { delayTime: this.tableSkills[0].getSkillDelayTime(), aiType: this.tableSkills[0].getSkillAiType() };
                this.tableSkillAi[message.ESkillType.SKILL_TYPE_HANDLE] = info;
            }
            if (this.tableDeaths.length > 0) {
                let info = { delayTime: this.tableDeaths[0].getSkillDelayTime(), aiType: this.tableDeaths[0].getSkillAiType() };
                this.tableSkillAi[message.ESkillType.SKILL_TYPE_DEATH] = info;
            }
        }
        public isPerson() {
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return true;
            } else {
                return false;
            }
        }
        public Pause() {
            if (this.bPause) {
                return;
            }
            this.bPause = true;
            if (this.body != null) {
                this.body.Pause();
            }
            for (let i = 0; i < this.tableEffects.length; i++) {
                this.tableEffects[i].Pause();
            }
            for (let i = 0; i < this.tableHits.length; i++) {
                let hit = this.tableHits[i];
                if (hit != null) {
                    let spx = hit.getEffectSpx();
                    if (spx != null) {
                        spx.Pause();
                    }
                }
            }
            for (let i = 0; i < this.tableBuffs.length; i++) {
                let ani = this.tableBuffs[i].getEffectSpx();
                if (ani != null) {
                    let animation = ani;
                    if (animation != null) {
                        animation.Pause();
                    }
                }
            }
            if (this.curSkill != null) {
                let curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.Pause();
                }
            }
        }
        public resume() {
            if (!this.bPause) {
                return;
            }
            this.bPause = false;
            if (this.body != null) {
                this.body.resume();
            }
            for (let i = 0; i < this.tableEffects.length; i++) {
                this.tableEffects[i].resume();
            }
            for (let i = 0; i < this.tableHits.length; i++) {
                let hit = this.tableHits[i];
                if (hit != null) {
                    let spx = hit.getEffectSpx();
                    if (spx != null) {
                        spx.resume();
                    }
                }
            }
            for (let i = 0; i < this.tableBuffs.length; i++) {
                let ani = this.tableBuffs[i].getEffectSpx();
                if (ani != null) {
                    let animation = ani;
                    if (animation != null) {
                        animation.resume();
                    }
                }
            }
            if (this.curSkill != null) {
                let curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.resume();
                }
            }
        }
        public pauseBlack() {
            if (this.bPauseBlack) {
                return;
            }
            this.bPauseBlack = true;
        }
        public resumeBlack() {
            if (!this.bPauseBlack) {
                return;
            }
            this.bPauseBlack = false;
        }
        public playStorage(index) {
            //蓄力
            if (this.storageSpx == null) {
                return;
            }
            this.storageSpx.setVisibleSpx(true);
            this.storageSpx.SetPosition(this.x + this.offsetNorMidX, this.y - this.offsetNorMidY - (Gmgr.Instance.floor - Gmgr.Instance.ground));
            this.storageSpx.stopAllActions();
            this.storageSpx.ChangeAction(0);
            //蓄力音效
            if (index == 0 && this.press_sound_path != null) {
                Helper.PlayEff(this.press_sound_path);
            } else if (index == 1 && this.kill_sound_path != null) {
                Helper.PlayEff(this.kill_sound_path);
            }
        }
        //[[获得人物普攻防御]]
        public getDef(expect) {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.def;
            let results = this.handleTalentEffect_ProtoToProto();
            value = value + results[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
            let aAttribAddArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            let aAttribCutArr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            let reduceValue = 0;
            let rdBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_REDUCE_DEF);
            if (rdBuff != undefined && rdBuff[0] != null) {
                reduceValue = rdBuff[0].fir_value;
            }
            let promoteValue = this.getBuffOverlayValue(TableEnum.TableBufferType.BUFFER_PROMOTE_DEF);
            let fireValue = 0;
            let fireBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_FIRING);
            if (fireBuff != undefined && fireBuff[0] != null) {
                fireValue = fireBuff[0].third_value;
            }
            let addDefValue = 0;
            let addDefBySourceBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE);
            if (addDefBySourceBuff != undefined && addDefBySourceBuff[0] != null && this.bIgnoreInjury) {
                addDefValue = addDefBySourceBuff[0].fir_value;
            }
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let extra = 0;
            if (expect == true) {
                extra = (aAttribAddArr[1] - aAttribCutArr[1] + livingPerson + loseHpToProto) / 100;
            } else {
                extra = (aAttribAddArr[1] - aAttribCutArr[1] + livingPerson + loseHpToProto) / 100 + promoteValue - reduceValue - fireValue + addDefValue;
            }


            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            let base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_PHY_DEF]) / 100;
            if (this.isPerson()) {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                let real = value * percent + (this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_PHY_DEF]) * base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
                if (real <= 0) {
                    real = 1
                }
                return real;
            } else {
                let percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                let real = value * percent + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        }
        public getTalentEffective(eType, eCondition, target, param1) {
            let value = 0;
            let extra = 0;
            let extra2 = 0;
            let bActive = false;
            let father = null;
            let effective = null;
            let sortValue = [];
            let bOnly = false;
            let t = this.tableTalentEffect[eType];
            if (t != null && t.length != 0) {
                for (let i = 0; i < t.length; i++) {
                    let effect = t[i];
                    if (_isIgnoreInjureForTalent(eType) && this.bIgnoreInjury) {
                        break;
                    }
                    if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_GRAB_BUFF && effect.effect_extra2 != -1 && effect.active_num >= effect.effect_extra2) {
                        continue;
                    }
                    if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW) {
                        eCondition = this.fightScene.getGelRow(target.bEnemy, target.eTeamNum + 1, effect.effect_param);
                    }
                    let tag = false;
                    if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE) {
                        if ((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1) && param1 == effect.effect_extra) {
                            tag = true;
                        }
                        bOnly = true;
                    } else if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE) {
                        if (((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1)) && param1 == effect.effect_extra) {
                            tag = true;
                        }
                    } else if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION) {
                        if (((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1))) {
                            tag = true;
                        }
                    } else if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT) {
                        let baseTbl = this.getBuffBaseTbl();
                        if (Helper.tAnyIn(effect.effect_extraParam, baseTbl)) {
                            tag = true;
                        }
                    } else {
                        if (effect.effect_param == eCondition || effect.effect_param == -1) {
                            tag = true;
                        }
                    }
                    if (tag) {
                        if (!effect.b_disappear) {
                            if (effect.isActive()) {
                                bActive = true
                                value = value + effect.effect_value;
                                extra = effect.effect_extra;
                                extra2 = effect.effect_extra2;
                                effect.active_num = effect.active_num + 1;
                                sortValue[sortValue.length] = effect.effect_value;
                            }
                        }
                        effect.useEffect();
                        if (bActive == true) {
                            father = effect.belong_talent;
                            effective = effect;
                            if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_FUHUO) {
                                effect.belong_talent.revive_num = effect.belong_talent.revive_num + 1;
                                continue;
                            } else if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_BUQU) {
                                effect.belong_talent.buqu_time = this.fightScene.realTime;
                                continue;
                            } else if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD || eType == TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2) {
                                effect.belong_talent.revive_num = effect.belong_talent.revive_num + 1;
                                continue;
                            }
                        }
                    }
                }
            }
            if (bActive && bOnly) {
                sortValue.sort((a, b) => {
                    return b - a;
                });
                value = sortValue[0];
            }
            return [bActive, value, extra, extra2, effective, father];
        }
        public checkInstanceTalent(eType, eCondition, value, extra) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                if (talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(eCondition) != -1) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(value);
                        talent.triggerEffect();
                    }
                }
            }
        }
        public getBuffBaseTbl() {
            let tbl = [];
            let kv = {};
            for (let k in this.tableBuffs) {
                let v = this.tableBuffs[k];
                let base = v.getBuffBaseType();
                if (kv[base] == null) {
                    kv[base] = true;
                    tbl.push(base);
                }
            }
            return tbl;
        }
        public handleTalentEffect_ProtoAttriByDiff(type) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTR_PROMOTE_BY_DIFF, -1, null, null);
            let addValue = 0;
            if (type == arr[3] && arr[0] == true) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                addValue = arr[1] * arr[4].attriDiff / arr[2];
            }
            return addValue;
        }
        //根据攻防辅提升
        public handleTalentEffect_ProHurtByFeature(condition, proto) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FEATURE, condition, null, null);
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = arr[1];
            }
            return result[proto];
        }
        //念兽相关加基础
        public handleTalentEffect_ProHurtByFightType(condition, proto) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE, condition, null, proto);
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = result[arr[2]] + arr[1];
            }

            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE, condition, null, proto);
            if (arr1[0] == true) {
                result[arr1[2]] = result[arr1[2]] + arr1[1];
            }
            return result[proto];
        }
        //念兽相关加基础
        public handleTalentEffect_ProHurtBySelfFaction(proto) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FACTION, this.roleFaction, null, null);
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = arr[1];
            }
            return result[proto];
        }
        public handleTalentEffect_LoseHpConverAddProto(condition) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_ADD_PROTO, condition, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let maxHp = this.getMaxHp(true);
                let curHp = this.getHp();
                if (maxHp <= 0) {
                    maxHp = 1
                }
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                let per = (maxHp - curHp) / maxHp * 100;
                addValue = per / arr[2] * arr[1];
            }
            return addValue;
        }
        public handleTalentEffect_LivingPerson(condition) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LIVING_PERSON, condition, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let num = this.fightScene.getGeneralsNum(this.bEnemy, false) - 1;
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return addValue;
        }
        //[[根据指定buff的id获取特定buff及其位置索引]]
        public getBuff(sType) {
            // for(let k in this.tableBuffs){
            //     let v = this.tableBuffs[k];
            //     if(v.getBuffBaseType() == sType){
            //         return [v, k];
            //     }
            // }
            for (let i = 0; i < this.tableBuffs.length; i++) {
                let v = this.tableBuffs[i];
                if (v.getBuffBaseType() == sType) {
                    return [v, i + 1];
                }
            }
            return [null, -1];
        }
        public getBuffOverlayValue(type) {
            let value = 0;
            if (_isIgnoreInjureForBuff(type) && this.bIgnoreInjury) return value;
            for (let i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_type == type) {
                    value = value + this.tableBuffs[i].fir_value;
                }
            }
            return value;
        }
        public handleTalentEffect_ProtoToProto() {
            let tbl = [TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF,
            TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            let result = Helper.CreateTalentAttrTbl();
            for (let i = 0; i < tbl.length; i++) {
                let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_RPOTO_TO_ATK, tbl[i], null, null);
                if (arr[0] == true) {
                    let ret = this.getProtoValue(arr[2]);
                    let addValue = ret * arr[1] / 100;
                    result[arr[3]] = result[arr[3]] + addValue;
                }
            }
            return result;
        }
        public getProtoValue(type) {
            let ret = 0;
            switch (type) {
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK:
                    ret = this.attribs.atk;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF:
                    ret = this.attribs.def;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV:
                    ret = this.attribs.htv;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA:
                    ret = this.attribs.eva;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF:
                    ret = this.attribs.ignorePhydef;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT:
                    ret = this.attribs.atkCritRate;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA:
                    ret = this.attribs.critExtra;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF:
                    ret = this.attribs.critDef;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE:
                    ret = this.attribs.hitRate;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE:
                    ret = this.attribs.dodgeRate;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED:
                    ret = this.attribs.cdSpeed;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP:
                    ret = this.attribs.maxHp;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS:
                    ret = this.attribs.unilResis;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS:
                    ret = this.attribs.ignoreResis;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS:
                    ret = this.attribs.floatResis;
                    break;
                case TableEnum.TableRoleBaseAttribute.BASE_ATTR_CUR_HP:
                    ret = this.getHp();
                    break;
            }
            return ret;
        }
        public bleedMakeRage(value) {
            let tmp = value;
            if (value >= this.getMaxHp(true)) {
                tmp = this.getMaxHp(true);
            }
            this.bleedSum = this.bleedSum + tmp;
            let value1 = this.handleTalentEffect_GetRage();
            let r_value = this.handleTalentEffect_ReduceRage();
            //回血增加怒气
            let p = 100 + value1 - r_value;
            if (p <= 0) {
                p = 0;
            }
            let tmp1 = this.getRageAddValue(EGetRageWay.Way_Blood) * p / 100;

            while (this.bleedSum > this.bloodTriggerLine) {
                this.bleedSum = this.bleedSum - this.bloodTriggerLine;
                this.dealRecRage(tmp1);
            }
        }
        public initBleedTriggerLine() {
            this.bloodTriggerLine = 0.05 * (this.getMaxHp());
        }
        public handleTalentEffect_GetRage() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_GET_RAGE, -1, null, null);
            return arr[1];
        }
        public handleTalentEffect_ReduceRage() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_GET_RAGE, -1, null, null);
            return arr[1];
        }
        public getRageAddValue(wayType) {
            let value = 0;
            if (wayType > EGetRageWay.Way_None && wayType < EGetRageWay.Way_Max) {
                if (this.fightScene.beInPvp()) {
                    value = ConstantConfig_RoleBattle.RAGE_GET_VALUE.pvp[wayType];
                } else {
                    value = ConstantConfig_RoleBattle.RAGE_GET_VALUE.pvp[wayType]
                }
            }
            return value;
        }
        public dealRecRage(value, bLast = false) {
            if (this.bDead == true || this.bMomentDead == true) {
                return;
            }
            if (this.bSilence == true) {
                return;
            }
            if (this.bRageAdd == false) {
                return;
            }
            if (this.isWeeking() == true) {
                return;
            }
            if (this.isActivityBoss()) {
                return;
            }
            this.addRage(value);
            this.playRageAni(value, bLast);
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL) {
                this.fightScene.addRageYH(this, value);
            }
        }

        public playRageAni(rage, bLast = false) {
            if (Gmgr.Instance.bGoLogin == true || this.bEnemy == true) {
                return;
            }
            if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_CALL || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            let value = Math.abs(rage);
            value = Math.floor(value);
            let arr = this.fightScene.getRageTipPos(this.eTeamNum, 2);
            if (arr[0] != null && arr[1] != null) {
                if (rage < 0) {
                    this.createRageReduceNum(arr[0], arr[1], value);
                } else if (rage > 0) {
                    if (bLast == true) {
                        this.createRageZhanNum(arr[0], arr[1], value);
                    } else {
                        this.createRageAddNum(arr[0], arr[1], value);
                    }
                } else {
                    return;
                }
            }
        }
        public createRageAddNum(baseX, baseY, value) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.nujia)
            num.setNumberInfo(UIConfig.UIConfig_FightNumber.nuqishuzi2, value, ConstantConfig_CommonBattle.nuqinum2.w, ConstantConfig_CommonBattle.nuqinum2.h, ConstantConfig_CommonBattle.nuqinum2.offset)
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY)
            num.runAction()

            num.start()
        }
        public createRageZhanNum(baseX, baseY, value) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.nuzhan)
            num.setNumberInfo(UIConfig.UIConfig_FightNumber.nuqishuzi2, value, ConstantConfig_CommonBattle.nuqinum2.w, ConstantConfig_CommonBattle.nuqinum2.h, ConstantConfig_CommonBattle.nuqinum2.offset)
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0)
            num.setPosition(baseX, baseY)
            num.runAction()

            num.start();
        }
        public createRageReduceNum(baseX, baseY, value) {
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setWordInfo(UIConfig.UIConfig_FightNumber.nujian)
            num.setNumberInfo(UIConfig.UIConfig_FightNumber.nuqishuzi1, value, ConstantConfig_CommonBattle.nuqinum1.w, ConstantConfig_CommonBattle.nuqinum1.h, ConstantConfig_CommonBattle.nuqinum1.offset)
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0)
            num.setPosition(baseX, baseY)
            num.runAction()

            num.start();
        }

        //[[增加人物怒气]]
        public addRage(add) {
            let cur = this.getRage();
            this.setRage(cur + add);
        }
        //[[获得人物怒气]]
        public getRage() {
            return this.attribs.curRage;
        }
        //[[修改人物怒气]]
        public setRage(rage) {
            if (rage > this.getMaxRage()) {
                rage = this.getMaxRage();
            }
            if (rage < 0) {
                rage = 0;
            }
            this.SetAttrib("curRage", rage);
        }
        //[[获得人物最大怒气]]
        public getMaxRage() {
            this.CheatCheckSumAttr(null);
            let _max_rage = this.attribs.maxRage;
            if (this.relySupportRole != null) {
                _max_rage = this.relySupportRole.getSupportConsume();
            }
            return _max_rage;
        }
        //[[获得人物方位]]
        public getPositionType() {
            return this.ePosition;
        }
        public getLevel() {
            return this.attribs.level;
        }
        //[[获取武将等级]]
        //被动技
        public loadTalent() {
            let arr = Gmgr.Instance.everybodyTalent;
            this.initTalent(Gmgr.Instance.everybodyTalent[this.ePosition]);
            this.initTalent(Gmgr.Instance.personalTalent[this.ePosition][this.roleInfo.general_id]);
        }
        //加载天赋(天赋数据的加载我方武将和ParticleSystemQuad敌方武将应该分开)
        public initTalent(t) {
            if (t == null) {
                return;
            }
            let tableTalent = TableGeneralTalent.Table();
            let pressSkill = this.getPressSkill();
            for (let i = 0; i < t.length; i++) {
                if (tableTalent[t[i].id] == null) {
                    continue;
                }
                let level = t[i].level;
                if (level >= tableTalent[t[i].id].max_level) {
                    level = tableTalent[t[i].id].max_level;
                }
                let growthValue = 0;
                if (t[i].growthValue != null) {
                    growthValue = t[i].growthValue;
                }
                let talent = new BaseTalent(t[i].id, level, this, t[i].bHide, t[i].source);
                if (talent != null) {
                    talent.growthValue = growthValue;
                }
                if (this.tableBaseTalent[talent.trigger_type] == null) {
                    let info = [];
                    info.push(talent);
                    this.tableBaseTalent[talent.trigger_type] = info;
                } else {
                    this.tableBaseTalent[talent.trigger_type].push(talent);
                }
            }
        }
        //[[获得动画buff—node]]
        public getBuffNode(pos) {
            let bone = null;
            if (pos == "up") {
                return this.nodeUp;
            } else if (pos == "mid") {
                return this.nodeMid;
            } else if (pos == "mid") {
                return this.nodeDown;
            }
        }
        //[[获得动画buff-name-node]]
        public getBuffNameNode() {
            // return this.nodeBuffName;
        }
        public triggerHit(skillType) {
            if (skillType == message.ESkillType.SKILL_TYPE_COMMON) {
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HIT, message.ESkillType.SKILL_TYPE_COMMON, null, null);
            } else if (skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HIT, message.ESkillType.SKILL_TYPE_HANDLE, null, null);
            }
        }
        //[[暴击]]
        public getCritRate() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.atkCritRate;
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let extra = arr[1] - arr1[1] + livingPerson + protomeByBuffNum + loseHpToProto;

            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        //[[获得暴伤附加值]]
        public getCritExtra() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.critExtra;
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null)
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let extra = arr[1] - arr1[1] + livingPerson + protomeByBuffNum + loseHpToProto;


            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null)
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA];
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        public handleTalentEffect_IgnoreCritDef(args) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_REAL_HURT, -1, null, null);
            return [arr[0], arr[1]];
        }
        //[[获得忽视物防]]
        public getIgnorePhydef() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.ignorePhydef;
            let addValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let cutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let extra = addValue[1] - cutValue[1] + livingPerson + protomeByBuffNum + loseHpToProto;


            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF];
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        public handleTalentEffect_IgnoreTargetDef(def) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_TARGET_DEF, -1, null, null);
            let defValue = def;
            if (arr[0] == true) {
                if (arr[1] <= 0) {
                    arr[1] = 0;
                }
                if (arr[1] >= 100) {
                    arr[1] == 100;
                }
                defValue = defValue * (100 - arr[1]) / 100;
            }
            return defValue;
        }
        public handleTalentEffect_Feishe(character, atkType) {
            if (character.getIsOnFloor() == true) {
                return [false, 0];
            }
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_FEISHE, atkType, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_Guidao(atkType) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_GUIDAO, atkType, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = ((this.getMaxHp(true) - this.getHp()) / this.getMaxHp(true)) * 100 * (arr[1] / arr[2]);
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_JianTa(character, atkType) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_JIANTA, atkType, null, null);
            let addValue = 0;
            let hpP = character.getHp() / character.getMaxHp(true) * 100;
            let realTag = false;
            if (arr[0] == true && hpP < arr[2]) {
                realTag = true
                addValue = arr[1];
            }
            return [realTag, addValue];
        }
        //处理连击伤害
        public dealDouble(beAttackedRole) {
            let tBuff = null;
            let index = 0;
            let percent = 0;
            let bExtraShow = false;
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_DOUBLE_DEEP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [bExtraShow, percent];
            }
            let arr1 = this.handleTalentEffect_Zhuiji();
            let gushouNum = beAttackedRole.handleTalentEffect_Gushou();
            percent = tBuff.fir_value * 100 + arr1[1] - gushouNum;
            if (arr[0] == true) {
                bExtraShow = true;
            }
            if (percent <= 0) {
                percent = 0
            }
            return [bExtraShow, percent];
        }
        public handleTalentEffect_YanXing(character) {
            if (character.getIsOnFloor() == true) {
                return [false, 0];
            }
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_YANXING, -1, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_ChuanYang(character, atkType) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CHUANYANG, atkType, null, null);
            let addValue = 0;
            let hpP = character.getHp() / character.getMaxHp(true) * 100;
            let realTag = false;
            if (arr[0] == true && hpP > arr[2]) {
                realTag = true;
                addValue = arr[1];
            }
            return [realTag, addValue];
        }
        public handleTalentEffect_Meihuo(condition) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_MEIHUO, condition, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                let num = this.fightScene.getGeneralsSexNum(TableEnum.TableEnumSex.SEX_MALE);
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_AtkRow(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW, -1, character, null);
            return [arr[0], arr[1]];
        }
        //处理虚弱
        public dealWeak() {
            let weakBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_WEAK);
            let value = 0;
            if (weakBuff != null && weakBuff[0] != null) {
                value = weakBuff[0].fir_value;
            }
            return value;
        }
        public handleTalentEffect_ProHurtByTargetGroup(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_GROUP, target.groupTag, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_ProHurtByTargetFeature(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FEATURE, target.roleFeature, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_ProHurtByTargetFaction(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FACTION, target.roleFaction, null, null);
            return [arr[0], arr[1]];
        }
        public handleTalentEffect_LivingHurt(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LIVING_ENEMY_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let ret = target.bEnemy;
                let num = this.fightScene.getGeneralsNum(ret, false);
                if (ret == this.bEnemy) {
                    num = num - 1;
                }
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return addValue;
        }
        public handleTalentEffect_DisFar(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_DISTANCE_FAR_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1] * (target.eTeamNum + 1);
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_AttriDValueP(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_DVALUE_PERCENT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                let _l = this.getProtoValue(arr[2]);
                let _r = target.getProtoValue(arr[2]);
                addValue = arr[1] * Math.abs(_l - _r) / _r;
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_ProHurtByByTargetHpPer(target) {
            let [tag, value, extra, extra2, effect, father] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BYENEMYHPPER, -1, null, null);
            let calcV = 0;
            if (tag) {
                if (target.getHp() / target.getMaxHp(true) * 100 > extra) {
                    calcV = value + target.eTeamNum * (effect.effect_extraParam[0] + effect.effect_extraParam[1] * father.talent_level)
                }
            }
            return [tag, calcV];
        }
        public handleTalentEffect_ProtoCompareToDamageAdd(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_ADD, -1, null, null);
            let addValue = 0;
            let result = Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                let ret1 = this.getProtoValue(arr[2]);
                let ret2 = character.getProtoValue(arr[2]);
                if (ret1 > ret2) {
                    addValue = arr[1]
                }
            }
            return [arr[0], addValue];
        }
        public handleRageToHurt(character) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_RAGE_TO_HURT, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                addValue = character.getRage() / arr[2] * arr[1];
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_Zhuiji() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ZHUIJI, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return [arr[0], addValue];
        }
        public handleTalentEffect_ProtoToHurt(target) {
            let tbl = [TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF,
            TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            let addValue = 0;
            for (let i = 0; i < tbl.length; i++) {
                let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROTO_TO_REALHURT, tbl[i], null, null);
                if (arr[0] == true) {
                    let ret = this.getProtoValue(arr[2]);
                    let arr1 = target.handleTalentEffect_ReduceRealHurt();
                    let percent = (100 - arr1[1]) / 100;
                    if (percent <= 0) {
                        percent = 0;
                    }
                    addValue = addValue + ret * arr[1] * percent / 100;
                }
            }
            return addValue;
        }
        public handleTalentEffect_AddHurtByTargetHp(hurt, target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ADDHURT_BY_TARGET_HP, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true) {
                hurtValue = hurtValue + target.getHp() * arr[1] / 100;
            }
            return hurtValue;
        }
        public handleTalentEffect_AddHurtByTargetMaxHp(hurt, target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ADDHURT_BY_TARGET_MAXHP, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true) {
                if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK
                    || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
                    || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                    if (target.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        arr[1] = 0;
                    }
                }
                let arr1 = target.handleTalentEffect_ReduceRealHurt();
                let percent = (100 - arr1[1]) / 100;
                if (percent <= 0) {
                    percent = 0;
                }
                hurtValue = hurtValue + target.getMaxHp(true) * arr[1] * percent / 100;
            }
            return hurtValue;
        }
        public handleTalentEffect_SecKill(hurt, target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_SEC_KILL, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true && target != null && target.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                let maxHp = target.getMaxHp();
                let curHp = target.getHp();
                if (maxHp <= 1) {
                    maxHp = 1;
                }
                let per = curHp / maxHp * 100;
                if (per < arr[1]) {
                    hurtValue = target.getHp();
                }
            }
            return hurtValue;
        }
        public handleTalentEffect_LostHpTrantoHurt(hurt, target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_TRANTO_HURT, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true && target != null && target.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                let tvalue = (target.getMaxHp() - target.getHp()) * arr[1] / 100;
                hurtValue = hurtValue + tvalue;
            }
            return hurtValue;
        }
        public handleTalentEffect_AtkerLostHpTrantoHurt(hurt) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_SELF_LOSE_HP_TO_HURT, -1, null, null);
            let hurtValue = hurt;
            if (arr[0] == true) {
                let tvalue = (this.getMaxHp() - this.getHp()) * arr[1] / 100;
                hurtValue = hurtValue + tvalue;
            }
            return hurtValue;
        }
        public handleTalentEffect_GrabBuff(beAtkedRole) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_GRAB_BUFF, -1, null, null);
            if (arr[0] == true) {
                if (beAtkedRole != null && beAtkedRole.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && arr[4].effect_extraParam.indexOf(Gmgr.Instance.fightTalentType) != -1) {
                    return;
                }
                let cannotGrabTag = beAtkedRole.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CANNOT_GRAB_BUFF, -1);
                if (!cannotGrabTag) {
                    let index = beAtkedRole.randBuff(arr[2]);
                    if (index != -1) {
                        let targets = this.fightScene.getTargetPlayer(this, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_RANDOM_ONE);
                        let buff = beAtkedRole.tableBuffs[index];
                        let buff_type, belong_role, buff_id, skill_level, target_role, belong_unit, is_fold = buff.getProto();
                        for (let k in targets) {
                            let v = targets[k];
                            let _buff = v.newBuff(buff_type, belong_role, buff_id, skill_level, v, belong_unit, is_fold);
                            v.addBuff(_buff);
                        }
                        beAtkedRole.deleteBuff(index);
                    }
                }
            }
        }
        //吸血
        public dealBleed(hurtValue) {
            let tBuff = null;
            let index = 0;
            let value = hurtValue;
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_SUCK_BLOOD);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return;
            }
            let bleedValue = hurtValue * tBuff.fir_value;
            if (bleedValue >= 0) {
                this.suckBlood(bleedValue);
            }
        }
        //处理吸血
        public suckBlood(hurtValue) {
            let tmp = hurtValue * this.getRecoverRadio();
            if (tmp <= 1) {
                tmp = 1;
            }
            this.flowRecoverValue(tmp);
            this.dealRecHp(tmp);
        }
        //炸弹
        public beBombend(character, atkType, hurtValue) {
            let value = hurtValue;
            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO)
            value = value * ratio;

            value = this.keepOutRealHurt(character, value);

            //处理所有伤害减免
            value = this.dealAllHurt(value, character);
            // 取值范围
            if (value < 0) {
                return;
            }
            if (value < 1) {
                value = 1;
            }
            let showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            let [numX, numY] = this.getHurtNumPos();
            let right = yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_RIGHT, true, false);
            this.creatHurtNum(numX, numY, showValue);
            //处理hp
            let curHp = this.getHp();
            character.flowHurtValue(value, yuan3(value > curHp, curHp, value), this);
            //定时流血
            this.bombHp(value)
            this.dealShelter(value)
            this.bleedMakeRage(value)
            this.dealHurtHpZero(character, value, null);
        }
        public bombHp(reduce, bFlow?) {
            if (bFlow == null) {
                bFlow = true;
            }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce);
            }
            let cur = this.getHp();
            this.setHp(cur - reduce);
        }
        public getRecoverRadio() {
            let addP = this.handleTalentEffect_AddRecoverValue();
            let forbidden = this.getForbideRecoverValue();
            let radio = (1 + addP / 100) * (1 - forbidden);
            if (radio <= 0) {
                radio = 0;
            }
            return radio;
        }
        public handleTalentEffect_AddRecoverValue() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ADD_RECOVER_VALUE, -1, null, null);
            return arr[1];
        }
        public handleTalentEffect_SuckTrantoShield(hurtValue) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_SUCKHP_TRANTO_SHIELD, -1, null, null);
            if (arr[0]) {
                let surplus = this.getMaxHp(true) - this.getHp();
                let suckValue = hurtValue * arr[1] / 100;
                let recoverValue = 0;
                let shieldValue = 0;
                if (suckValue > surplus) {
                    recoverValue = surplus;
                    shieldValue = suckValue - surplus;
                } else {
                    recoverValue = suckValue;
                    shieldValue = 0;
                }
                this.suckBlood(recoverValue);
                if (shieldValue > 0 && arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    let ratio = (arr[4].effect_extraParam[0] + arr[4].effect_extraParam[1] * arr[5].talent_level);
                    let exitBuff = this.getBuffNumById(arr[4].effect_buffId);
                    if (exitBuff != null) {
                        exitBuff.sec_value = exitBuff.sec_value + shieldValue * ratio / 100;
                    } else {
                        let arr1 = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                        let buff = arr1[0];
                        if (buff) {
                            buff.sec_value = shieldValue * ratio / 100;
                        }
                    }
                }
            }
        }
        public getBuffNumById(buffId) {
            for (let i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_id == buffId) {
                    return this.tableBuffs[i];
                }
            }
            return null;
        }
        public beBuffHurt(skillLevel, id, character, unit, effect, addRate) {
            let aa = null;
            if (this.bDead == true || this.bMomentDead == true) {
                return [aa, -1];
            }
            if (id == -1) {
                return [aa, -1];
            }
            let extraRate = yuan3(addRate == null, 0, addRate)
            let hitRate = 0
            let baseType = TableEnum.TableBufferType.BUFFER_NONE;
            let damageType = message.EDamageType.DAMAGE_TYPE_NONE;
            let arr = Helper.getBuffRelate(skillLevel, id);
            hitRate = arr[0];
            baseType = arr[1];
            damageType = arr[2];
            arr = Helper.getBuffUseType(baseType);
            let useType = arr[0];
            let maxNum = arr[2];
            let currNum = this.getBuffNumByType(baseType);
            if (maxNum != -1 && currNum > maxNum) {
                return [aa, -1];
            }
            if (useType == TableEnum.TableBuffUseType.Buff_Use_Good) {
                let tForbide = this.getBuff(TableEnum.TableBufferType.BUFFER_FORBIDE_STRENGTH);
                if (tForbide && tForbide[0] != null && tForbide[0].forbideTypeTbl[baseType] != null) {
                    tForbide[0].playTriggerSpx();
                    return [aa, -1];
                }
            }
            if (true) {
                let tImnue = this.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE);
                if (tImnue && tImnue[0] != null && tImnue[0].immuneTypeTbl[baseType] != null) {
                    tImnue[0].playTriggerSpx();
                    return [aa, -1];
                }
                let tImnue1 = this.getBuff(TableEnum.TableBufferType.BUFFER_IMMUNE2);
                if (tImnue1 && tImnue1[0] != null && tImnue1[0].immuneTypeTbl[baseType] != null) {
                    tImnue1[0].playTriggerSpx();
                    return [aa, -1];
                }
            }
            if (true) {
                //首先判断是否命中
                let realHit = ((hitRate + extraRate) / 100 * (1 + character.getHtv() / 100)) * 100;
                if (percentIsEffect(realHit, character, this, "效果命中") == false) {
                    this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_RESIST_BUFF, -1, null, null);
                    this.doResistUi();
                    return [null, 0];
                }
                //判断有害的是否被抵抗
                if (useType == TableEnum.TableBuffUseType.Buff_Use_Bad) {
                    if (realHit <= 100) {
                        realHit = 100;
                    }
                    let evaHit = (1 - realHit / 100 / (1 + this.getEva() / 100)) * 100;
                    if (evaHit < 0) {
                        evaHit = 0;
                    }
                    if (percentIsEffect(evaHit, character, this, "效果抵抗") == true) {
                        this.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_RESIST_BUFF, -1, null, null);
                        this.doResistUi();
                        return [aa, 0];
                    }
                }
            }
            if (!character.bEnemy) {
                if (Gmgr.Instance.myUseBuffs[baseType] == null) {
                    Gmgr.Instance.myUseBuffs[baseType] = true;
                }
            }
            character.checkInstanceTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BUFF_HIT, baseType);
            let buff = this.newBuff(baseType, character, id, skillLevel, this, unit);
            this.dealBuffBreak(buff);
            this.addBuff(buff);
            return [buff, 1];
        }
        public addBuff(buff) {
            this.tableBuffs.push(buff);
        }
        public dealBuffBreak(buff) {
            if (buff == null) {
                return;
            }
            function changeRoleState(role) {
                role.doBreak();
                role.doContinueBreak();
                role.doSkillBreak();
                role.setPos(role.x, role.y);
                if (role.otherState == TableEnum.TableEnumOtherState.OtherState_None || role.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                    role.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt);
                }
            }
            let breakTag = false;
            let type = buff.getBuffBaseType();
            if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && this.curSkill != null) {
                let damage = this.curSkill.getSkillDamageType();
                //缴械
                if (damage == message.EDamageType.DAMAGE_TYPE_PHY && type == TableEnum.TableBufferType.BUFFER_DISARM) {
                    breakTag = true;
                }
            }
            if (breakTag == true || type == TableEnum.TableBufferType.BUFFER_DIZZINESS || type == TableEnum.TableBufferType.BUFFER_FROZEN || type == TableEnum.TableBufferType.BUFFER_SLEEP || type == TableEnum.TableBufferType.BUFFER_STONED || type == TableEnum.TableBufferType.BUFFER_SILENCE) {
                changeRoleState(this);
            }
        }
        public newBuff(baseType, belong, id, level, target, unit) {
            //检测此类buff是否存在
            let arr = getBuffUseType(baseType);
            let useType = arr[0];
            let is_fold = arr[1];
            let tBuff = null;
            let index = 0;
            let arr1 = this.getBuff(baseType);
            tBuff = arr1[0];
            index = arr1[1];
            if (tBuff != null && is_fold == 0) {
                CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            //生成此类buff
            let tag = yuan3(tBuff != null && is_fold == 1, true, false);
            // let buff = new SkillBuff();
            let buff = Game.ObjectPool.getItem("SkillBuff", SkillBuff);
            buff.newSetData(belong, id, level, target, unit, tag);
            buff.playSpx();
            return buff;
        }
        public reduceFightExtraAttri(proto, value) {
            let base = this.getBaseProtoValue(proto);
            if (base = null) {
                return;
            }
            if (proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK || proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF
                || proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] - base * value / 100;
            } else {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] - value;
            }
            if (proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                SkillCdMgr.Instance.reCalcCd(this.getPressSkill());
            }
        }
        public doResistUi() {
            let arr = this.getRoleUpPos(TableEnum.TableRoleUpPosType.TYPE_RESIST);
            this.createResistNumber(arr[0], arr[1]);
        }
        public createResistNumber(baseX, baseY) {
            let scale = getRandom(ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(UIConfig.UIConfig_FightNumber.dikang);
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        //[[获得人物效果抵抗]]
        public getEva() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.eva;
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            let arr1 = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;

            let baseAddValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            let baseCutValue = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - arr1[1] + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_EVA];

            let addBuffValue = 0;
            let adBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_ADD_EVA);
            if (adBuff && adBuff[0] != null) {
                addBuffValue = adBuff[0].fir_value;
            }

            let reduceBuffValue = 0;
            let rdBuff = this.getBuff(TableEnum.TableBufferType.BUFFER_REDUCE_EVA);
            if (rdBuff && rdBuff[0] != null) {
                reduceBuffValue = rdBuff[0].fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        public getBuffNumByType(type) {
            let num = 0;
            for (let i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_type == type) {
                    num = num + 1;
                }
            }
            return num;
        }
        public handleTalentEffect_ProAtkerAllHurt() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ATKER_ALL_DAMAGE, -1, null, null);
            let addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        }
        public handleTalentEffect_CutMyHpToDamage(target) {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_HIT_CUTMYHP_TO_DAMAGE, -1, null, null);
            if (arr[0]) {
                let n = (arr[4].effect_extraParam[1] + arr[4].effect_extraParam[2] * arr[5].talent_level);
                let constCut = this.getMaxHp() * n / 100;
                let willCutMyHp = -1;
                if (arr[4].sum_hp >= constCut || Math.floor(this.getHp()) <= 1) {
                    willCutMyHp = 0;
                } else {
                    let curPer = this.getHp() / this.getMaxHp() * 100;
                    if (curPer < arr[2]) {
                        willCutMyHp = this.getHp() - 1
                        arr[4].sum_hp = arr[4].sum_hp + this.getHp() - 1
                    } else {
                        arr[4].sum_hp = arr[4].sum_hp + constCut;
                        willCutMyHp = constCut;
                    }
                }
                let willDamageHp = constCut * arr[1] / 100;
                this.dealCutHp(this, willCutMyHp, null, null, null);
                target.dealCutHp(this, willDamageHp, null, null, null);
            }
        }
        //直接减血
        public dealCutHp(character, value, bFrTalent, hurtDealType, bFlow) {
            if (this.isSupport()) {
                return;
            }
            if (hurtDealType == null) {
                hurtDealType = 1;
            }
            if (bFlow == null) {
                bFlow = true;
            }
            let hurtValue = value;
            if (hurtValue < 0) {
                return;
            }
            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            hurtValue = hurtValue * ratio;
            if (1 == hurtDealType) {
                hurtValue = this.keepOutRealHurt(character, hurtValue);
                //处理所有伤害减免
                hurtValue = this.dealAllHurt(hurtValue, character);
                if (hurtValue < 1) {
                    hurtValue = 1;
                }
                let showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                let arr = this.getHurtNumPos();
                let numX = arr[0];
                let numY = arr[1];
                let right = yuan3(this.getPosX() > character.getPos(), true, false);
                if (bFrTalent == true) {
                    this.creatHurtNum(numX, numY, showValue, right);
                } else {
                    this.creatHurtNum(numX, numY, showValue, right);
                }
                let curHp = this.getHp();
                if (bFlow) {
                    character.flowHurtValue(hurtValue, yuan3(hurtValue > curHp, curHp, hurtValue), this);
                    this.bleedMakeRage(hurtValue);
                }
                //直接减血
                this.reduceHp(hurtValue, bFlow);
                this.dealShelter(hurtValue);
            } else if (hurtDealType == 2) {
                if (hurtValue < 1) {
                    hurtValue = 1;
                }
                this.reduceHp(hurtValue, bFlow);
            } else if (hurtDealType == 3) {
                if (hurtValue < 1) {
                    hurtValue == 1;
                }
                let showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                let numArr = this.getHurtNumPos();
                let numX = numArr[0];
                let numY = numArr[1];
                let right = yuan3(this.getPosX() > character.getPos(), true, false);
                this.creatHurtNum(numX, numY, showValue, right);
                let curHp = this.getHp();
                if (bFlow) {
                    character.flowHurtValue(hurtValue, yuan3(hurtValue > curHp, curHp, hurtValue), this);
                    this.bleedMakeRage(hurtValue);
                }
                this.reduceHp(hurtValue, bFlow);
                this.dealShelter(hurtValue);
            }
            this.dealHurtHpZero(character, hurtValue, null);
        }
        //[[减少人物血量]]
        public reduceHp(reduce, bFlow) {
            if (bFlow == null) {
                bFlow = true;
            }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce);
            }
            if (this.isImmuning()) {
                return;
            }
            let cur = this.getHp();
            this.setHp(cur - reduce);
        }
        public keepOutRealHurt(character, hurtValue) {
            let value = hurtValue;
            let arr = this.handleTalentEffect_ReduceRealHurt();
            let bCutValue = character.dealWeak();
            let percent = (100 - arr[1]) / 100 - bCutValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = hurtValue * percent
            return value;
        }
        public handleTalentEffect_ReduceRealHurt() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_REAL_HURT, -1, null, null);
            return [arr[0], arr[1]];
        }
        public getPos() {
            return [this.x, this.y];
        }
        //[[人物伤害总量]]
        public flowHurtValue(value, realValue, beAtkedRole) {
            this.hurtTotalValue = this.hurtTotalValue + value;
            if (beAtkedRole.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK
                    || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                    this.bossHurtValue = this.bossHurtValue + realValue;
                }
            }
        }
        public checkDeadTalent(eType, bRecord) {
            let t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            for (let i = 0; i < t.length; i++) {
                let talent = t[i];
                if (talent.trigger_condition[0] == -1) {
                    if (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN && (this.fightScene.realTime - talent.buqu_time) <= talent.extra_value && talent.buqu_time != 0) {
                        continue;
                    }
                    if (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (talent.isTouch() == true) {
                        if (bRecord == true) {
                            this.tableDeathTalent.push(talent);
                        } else {
                            talent.talentFun(null);
                            talent.triggerEffect();
                        }
                        if (eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN ||
                            eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO ||
                            eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH ||
                            eType == TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD) {
                            return;
                        }
                    }
                }
            }
        }
        //敌方人物触发
        public triggerEnemyTalent(type) {
            let enemyCamp = yuan3(this.eCamp == 1, 2, 1);
            let enemys = this.fightScene.getPartnerDebar(enemyCamp, this);
            for (let j = 0; j < enemys.length; j++) {
                let role = enemys[j];
                let t = role.tableBaseTalent[type];
                if (t != null) {
                    for (let i = 0; i < t.length; i++) {
                        let talent = t[i];
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public handleTalentEffect_WillDead2() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2, -1, null, null);
            if (arr[0] == true) {
                //不屈起身前要清除减益buff
                this.clearUseBuffs(TableEnum.TableBuffUseType.Buff_Use_Bad);
                //生命值设置为1
                let hp = 1;
                if (arr[4] != null && arr[4].effect_extraParam > 1) {
                    let ratio = (arr[4].effect_extraParam[1] + arr[4].effect_extraParam[2] * arr[5].talent_level);
                    hp = this.getMaxHp(true) * ratio / 100;
                }
                this.setHp(hp);
                //添加无敌buff
                if (arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    let buff = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                }
            }
            return arr[0];
        }
        //[[清除有益或减益buff]]
        public clearUseBuffs(useType) {
            let i = 0;
            while (i < this.tableBuffs.length) {
                let tBuff = this.tableBuffs[i];
                let type = tBuff.getBuffUseType();
                if (type == useType) {
                    this.openFoldBuffEffect(tBuff);
                    CC_SAFE_DELETE(tBuff);
                    this.tableBuffs.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
        }
        public handleTalentEffect_WillDead() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD, -1, null, null);
            if (arr[0] == true) {
                //不屈起身前要清除所有buff
                this.clearAllBuffs();
                //生命值设置为1
                this.setHp(1);
                //添加无敌buff
                if (arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    let buff = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                }
            }
            return arr[0];
        }
        //[[清除所有buff]]
        public clearAllBuffs() {
            let i = 0;
            while (i < this.tableBuffs.length) {
                CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];
            this.bStun = false;
            this.bSilence = false;
            this.bDisarm = false;
            this.bFrozen = false;
            this.bStoned = false;
            this.bSleep = false;
        }
        public loadClientData() {
            let attrTbl = [];
            let arr = PlayerHunterSystem.CalcBattleGelAttr(this, null);
            attrTbl = arr[0];
            this.tablePotatoSkill = arr[1];
            this.baseAttribs = PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(this.roleInfo);
            this.SetAttrib("maxHp", attrTbl[TableEnum.EnumGelAttrib.ATTR_HP]);
            this.SetAttrib("curHp", this.attribs.maxHp);

            this.SetAttrib("atkAll", attrTbl[TableEnum.EnumGelAttrib.ATTR_ATK_ALL])
            this.SetAttrib("defAll", attrTbl[TableEnum.EnumGelAttrib.ATTR_DEF_ALL])
            this.SetAttrib("critAll", attrTbl[TableEnum.EnumGelAttrib.ATTR_CRIT_ALL])
            this.SetAttrib("ignoreAll", attrTbl[TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL])

            this.SetAttrib("atk", attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_ATK])
            this.SetAttrib("def", attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_DEF])
            this.SetAttrib("htv", attrTbl[TableEnum.EnumGelAttrib.ATTR_HTV])
            this.SetAttrib("eva", attrTbl[TableEnum.EnumGelAttrib.ATTR_EVA]);

            this.SetAttrib("atkCritRate", attrTbl[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT])
            this.SetAttrib("skillCritRate", attrTbl[TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT])
            this.SetAttrib("sacredCritRate", 0)

            this.SetAttrib("critExtra", attrTbl[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA])
            this.SetAttrib("critDef", attrTbl[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS])

            this.SetAttrib("hitRate", attrTbl[TableEnum.EnumGelAttrib.ATTR_HIT_RATE])
            this.SetAttrib("dodgeRate", attrTbl[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE])

            this.SetAttrib("ignorePhydef", attrTbl[TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF])
            this.SetAttrib("ignoreMagicdef", attrTbl[TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF])
            this.SetAttrib("ignoreScaredef", 0)

            this.SetAttrib("finalExtraHurt", attrTbl[TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA])
            this.SetAttrib("finalReduceHurt", attrTbl[TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE])

            this.SetAttrib("unilResis", attrTbl[TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS])
            this.SetAttrib("ignoreResis", attrTbl[TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS])
            this.SetAttrib("floatResis", attrTbl[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS])
            this.SetAttrib("cdSpeed", attrTbl[TableEnum.EnumGelAttrib.ATTR_CD_SPEED])
            this.SetAttrib("supportConsume", attrTbl[TableEnum.EnumGelAttrib.ATTR_SUPPORT_CONSUME])
            this.CheatCalcSumAttr();
        }
        public CheatCalcSumAttr() {
            let today = new Date();
            this.cheat_checkAttr = 0
            this.cheat_checkTime = today.getTime();
            this.cheat_diffvalue = 0
            this.cheat_range = 0;
            let baseAttribs = PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(this.roleInfo);
            for (let j = 0; j < TableEnum.EnumAttriReal.length; j++) {
                let i = TableEnum.EnumAttriReal[j];
                this.cheat_checkAttr = this.cheat_checkAttr + baseAttribs[i];
            }
            for (let k in this.attribs) {
                let v = this.attribs[k];
                if (k != "curRage") {
                    this.cheat_checkAttr = this.cheat_checkAttr + v;
                }
            }
        }
        public handleTalentEffect_EntryTime() {
            let arr = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_ENTRY_TIME, -1, null, null);
            return arr[1];
        }
        //[[buff加速影响值]]
        public getBuffSpeedUp() {
            let tBuff = null;
            let index = 0;
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_SPEED_UP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff != null) {
                return tBuff.fir_value;
            }
            return 0;
        }
        //[[buff减速影响值]]
        public getBuffSpeedDown() {
            let tBuff = null;
            let index = 0;
            let arr = this.getBuff(TableEnum.TableBufferType.BUFFER_SPEED_DOWN);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff != null) {
                return tBuff.fir_value;
            }
            return 0;
        }
        public handleTalentEffect_KillNoRevive(target) {
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_KILL_NO_REVIVE, -1, null, null);
            if (tag == true && target != null) {
                target.bNoRevive = true;
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_DEATH] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ZIBAO] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_YIJI] = null
                target.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUCHOU] = null
            }
        }
        public creatAttriInfo() {
            let info = new message.AttriInfo();
            info.general_hp = this.attribs.maxHp
            info.general_atk = this.attribs.atk
            info.general_def = this.attribs.def
            info.skill_atk = this.attribs.htv
            info.skill_def = this.attribs.eva
            info.atk_crit = this.attribs.atkCritRate
            info.skill_crit = this.attribs.skillCritRate
            info.crit_extra = this.attribs.critExtra
            info.crit_resistance = this.attribs.critDef
            info.dodge_rate = this.attribs.dodgeRate
            info.hit_rate = this.attribs.hitRate
            info.ignore_phyDef = this.attribs.ignorePhydef
            info.ignore_magicDef = this.attribs.ignoreMagicdef // 打断浮空
            info.final_extra = this.attribs.finalExtraHurt
            info.final_reduce = this.attribs.finalReduceHurt
            info.general_atk_all = this.attribs.atkAll
            info.general_def_all = this.attribs.defAll
            info.all_crit = this.attribs.critAll
            info.ignore_def_all = this.attribs.ignoreAll
            info.universal_resistance = this.attribs.unilResis
            info.ignore_resistance = this.attribs.ignoreResis
            info.float_resistance = this.attribs.floatResis
            info.cd_speed = this.attribs.cdSpeed
            info.support_consume = this.attribs.supportConsume;
            return info;
        }
        public loadAttriTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        }
        public loadFightSpxRes() {

        }
        public loadStorageSpx() {

            let name = UIConfig.UIConfig_CommonBattleCss.json_xuli;
            let [armature] = HunterSpineX(name, 1, null, TableClientAniSpxSource.Item(name).name);
            armature.setVisibleSpx(false);
            this.nodeRoot.addChild(armature.spine);
            armature.stopAllActions();
            armature.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
            this.storageSpx = armature;
        }
        private animationTimeEvent() {
            //this.storageSpx.clearSpine();
            //this.storageSpx = null;
            this.storageSpx.stopAllActions();
            this.storageSpx.setVisibleSpx(false);
        }
        public openRoleDcUI() {
            if (this.bInGut) {
                return
            }
            if (this.nodeDc) {
                this.nodeDc.visible = true;
            }
            if (this.SpriteHpBoard) {
                this.SpriteHpBoard.visible = true;
            }
            if (this.SpritePdhBlood) {
                this.SpritePdhBlood.visible = true;
            }
            if (this.SpriteRedBlood) {
                this.SpriteRedBlood.visible = true;
            }
            if (this.SpriteHpBloodGround) {
                this.SpriteHpBloodGround.visible = true;
            }
            if (this.SpriteHpBlood) {
                this.SpriteHpBlood.visible = true;
            }
            // if(this.SpriteBloodSplit){
            //     this.SpriteBloodSplit.visible = true;
            // }
            if (this.SpriteCdBar) {
                this.SpriteCdBar.visible = true;
            }
        }
        public closeRoleDcUI() {
            if (this.nodeDc) {
                this.nodeDc.visible = false;
            }
            if (this.SpriteHpBoard) {
                this.SpriteHpBoard.visible = false;
            }
            if (this.SpritePdhBlood) {
                this.SpritePdhBlood.visible = false;
            }
            if (this.SpriteRedBlood) {
                this.SpriteRedBlood.visible = false;
            }
            if (this.SpriteHpBloodGround) {
                this.SpriteHpBloodGround.visible = false;
            }
            if (this.SpriteHpBlood) {
                this.SpriteHpBlood.visible = false;
            }
            if (this.SpriteBloodSplit) {
                this.SpriteBloodSplit.visible = false;
            }
            if (this.SpriteCdBar) {
                this.SpriteCdBar.visible = false;
            }
        }
        public loadServerData() {
            this.SetAttrib("maxHp", this.roleInfo.attri.general_hp)
            this.SetAttrib("curHp", this.attribs.maxHp)

            this.SetAttrib("atkAll", this.roleInfo.attri.general_atk_all)
            this.SetAttrib("defAll", this.roleInfo.attri.general_def_all)
            this.SetAttrib("critAll", this.roleInfo.attri.all_crit)
            this.SetAttrib("ignoreAll", this.roleInfo.attri.ignore_def_all)

            this.SetAttrib("atk", this.roleInfo.attri.general_atk)
            this.SetAttrib("def", this.roleInfo.attri.general_def)
            this.SetAttrib("htv", this.roleInfo.attri.skill_atk)
            this.SetAttrib("eva", this.roleInfo.attri.skill_def)

            //this.SetAttrib("sacredAtk", 0)
            //this.SetAttrib("sacredDef", 0)

            this.SetAttrib("atkCritRate", this.roleInfo.attri.atk_crit)
            this.SetAttrib("skillCritRate", this.roleInfo.attri.skill_crit)
            this.SetAttrib("sacredCritRate", 0)

            this.SetAttrib("critExtra", this.roleInfo.attri.crit_extra)
            this.SetAttrib("critDef", this.roleInfo.attri.crit_resistance)

            this.SetAttrib("hitRate", this.roleInfo.attri.hit_rate)
            this.SetAttrib("dodgeRate", this.roleInfo.attri.dodge_rate)

            this.SetAttrib("ignorePhydef", this.roleInfo.attri.ignore_phyDef)
            this.SetAttrib("ignoreMagicdef", this.roleInfo.attri.ignore_magicDef)
            this.SetAttrib("ignoreScaredef", 0)

            this.SetAttrib("finalExtraHurt", this.roleInfo.attri.final_extra)
            this.SetAttrib("finalReduceHurt", this.roleInfo.attri.final_reduce)

            this.SetAttrib("unilResis", this.roleInfo.attri.universal_resistance)
            this.SetAttrib("ignoreResis", this.roleInfo.attri.ignore_resistance)
            this.SetAttrib("floatResis", this.roleInfo.attri.float_resistance)
            this.SetAttrib("cdSpeed", this.roleInfo.attri.cdSpeed)
            this.SetAttrib("supportConsume", this.roleInfo.attri.supportConsume)
        }
        //角色数据模型
        public getRoleInfo() {
            return this.roleInfo;
        }
        public newTalentEffect(belongTalent, id, value) {
            let talentEffect = TableGeneralTalentEffect.Table();
            let eType = talentEffect[id].effect_type;
            let effect = new TalentEffect(this, belongTalent, id, value);
            let t = this.tableTalentEffect[eType];

            if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE) {
                if (belongTalent.belong_role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP ||
                    belongTalent.belong_role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    return;
                }
            }
            if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE) {
                if (belongTalent.belong_role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP ||
                    belongTalent.belong_role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    return;
                }
            }
            if (t == null) {
                let info = [];
                info.push(effect);
                this.tableTalentEffect[eType] = info;
            } else {
                if (eType == TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP ||
                    eType == TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_REDUCE_HP ||
                    eType == TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP2) {
                    this.tableTalentEffect[eType].push(effect);
                } else {
                    let [_v, _k] = Table.FindR(t, function (_k, _v) {
                        if (_v.effect_id == id) {
                            return true
                        }
                    });
                    if (_v != null && eType == TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED) {
                        _v.trigger_num = _v.trigger_num + 1;
                        _v.effect_value = _v.bakeup_value * _v.trigger_num;
                    } else {
                        this.tableTalentEffect[eType].push(effect);
                    }
                }
            }
        }
        //获得人物其他形态
        public getOtherState() {
            return this.otherState;
        }
        //人物跑步状态
        public setRunState(state) {
            this.runState = state;
        }
        public clearRun() {
            this.runDis = 0;
        }
        //获得人物效果命中
        public getHtv() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.htv;
            let [aAttribAdd, addValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null)
            let [aAttribCut, cutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let extra = addValue - cutValue + livingPerson + protomeByBuffNum + loseHpToProto;

            let [, baseAddValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null)
            let [, baseCutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_HTV];

            let addBuffValue = 0;
            let [adBuff,] = this.getBuff(TableEnum.TableBufferType.BUFFER_ADD_HTV);
            if (adBuff) {
                addBuffValue = adBuff.fir_value;
            }
            let reduceBuffValue = 0;
            let [rdBuff,] = this.getBuff(TableEnum.TableBufferType.BUFFER_REDUCE_HTV);
            if (rdBuff) {
                reduceBuffValue = rdBuff.fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        //忽视格挡
        public getHitRate() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.hitRate;
            let [bAttribAdd, addValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null);
            let [bAttribCut, cutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null);

            //处理迷惑
            let buffValue1 = 0;
            let [hitBuff,] = this.getBuff(TableEnum.TableBufferType.BUFFER_CONFUSE);
            if (hitBuff) {
                buffValue1 = hitBuff.fir_value;
            }
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let extra = addValue - cutValue + livingPerson + protomeByBuffNum + loseHpToProto - buffValue1 * 100;

            let [, baseAddValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null)
            let [, baseCutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_HIT_RATE];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE];
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        //获得通用抵抗
        public getUnilResis() {
            this.CheatCheckSumAttr(null);
            let value = this.attribs.unilResis;
            let [bAttribAdd, addValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS, null, null)
            let [bAttribCut, cutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS, null, null)
            let livingPerson = this.handleTalentEffect_LivingPerson(TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            //local protomeByBuffNum = this:handleTalentEffect_ProtomeByNumOfBuff(TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let extra = addValue - cutValue + livingPerson + loseHpToProto;

            let [, baseAddValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let [, baseCutValue] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null)
            let baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let baseByFightType = this.handleTalentEffect_ProHurtByFightType(Gmgr.Instance.fightTalentType, TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            let base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS];

            value = value + extra + base + this.fightExtraAttribs[TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS];
            if (value <= 0) {
                value = 0;
            }
            return value;
        }
        public getRealPos() {
            return [this.realX, this.realY];
        }
        public flashMove(move_finish_CB, thisobj, des_x, des_y) {
            this.is_flashing = true;
            this.setRealPos(des_x, des_y);
            this.setHomingVisible(false);

            let timeOut = egret.setTimeout(() => {
                this.is_flashing = false;
                this.setHomingVisible(true);
                this.setPos(des_x, des_y);
                if (move_finish_CB && thisobj) {
                    move_finish_CB.call(thisobj);
                }
                egret.clearTimeout(timeOut);
            }, this, 80);
        }
        public breakMoveAni(move_finish_CB, thisobj?, des_x?, des_y?) {
            let sx = this.x;
            let sy = this.y
            let ex = yuan3(des_x == null, this.teamOriginalX, des_x);
            let ey = yuan3(des_y == null, this.teamOriginalY, des_y);
            this.is_breakMoving = true
            this.setRealPos(ex, ey);
            this.setHomingVisible(false);
            let timeOut = egret.setTimeout(() => {
                this.is_breakMoving = false
                this.setHomingVisible(true);
                this.backHoming();
                if (move_finish_CB && thisobj) {
                    move_finish_CB.call(thisobj);
                }
                egret.clearTimeout(timeOut);
            }, this, 80);
        }
        public getFormType() {
            return this.formType;
        }
        public playTalentEffect(talentEffect) {

        }
        //获得初始人物特殊形态
        public getInitSpecialState() {
            return this.initSpecialState;
        }
        public getIsUseAi() {
            //return this.bUseAi;
        }
        //是否受重力影响
        public getIsGravity() {
            return this.bGravity;
        }
        //是否取消冲刺
        public getCancelSprint() {
            return this.bCancelSprint;
        }
        //人物是否死亡
        public getIsDead() {
            return this.bDead;
        }
        public getFloor() {
            return this.floor;
        }
        //定时回血
        public beRecoverBlood(character, hurtValue) {
            let tmp = hurtValue * this.getRecoverRadio();
            if (tmp <= 1) {
                tmp = 1;
            }
            character.flowRecoverValue(tmp);
            let dif = this.dealRecHp(tmp);
            return dif;
        }
        //定时流血
        public beBleeded(character, atkType, hurtValue) {
            //增益伤害抵挡
            let value = this.keepOutHurt(atkType, hurtValue);
            value = this.keepOutRealHurt(character, value);
            //是否有伤害加深buff
            //value = this.dealWeak(value);

            //减少持续伤害的天赋效果
            let reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;

            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            //处理所有伤害减免
            value = this.dealAllHurt(value, character);
            //取值范围
            if (value < 0) { return }
            if (value < 1) { value = 1 }

            let showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            let [numX, numY] = this.getHurtNumPos();
            let right = yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_RIGHT, true, false);
            this.creatHurtNum(numX, numY, showValue);
            //处理hp
            let curHp = this.getHp();
            character.flowHurtValue(value, yuan3(value > curHp, curHp, value), this);
            //定时流血
            this.reduceHp(value, null);
            this.dealShelter(value);
            this.bleedMakeRage(value);
            this.dealHurtHpZero(character, value, null);
        }
        public handleTalentEffect_ReduceContinueDamage() {
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CONTINUE_DAMAGE, -1, null, null);
            let tValue = 0;
            if (tag == true) {
                tValue = value
            }
            return tValue;
        }
        //增加buff时间
        public dealTimeBuff(stanardType, baseType) {
            let value = 0;
            for (let i = 0; i < this.tableBuffs.length; i++) {
                let v = this.tableBuffs[i];
                if (v.getBuffBaseType() == stanardType) {
                    if (v.timeType[baseType] != null && v.timeType[baseType] >= 1) {
                        value = value + v.fir_value;
                    }
                }
            }
            return value;
        }
        public handleTalentEffect_BuffEffectPro(buffType) {
            let [tag, value, extra, extra2, effect] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_EFFECT_PRO, -1, null, null);
            let addValue = 0;
            if (tag == true && Table.FindK(effect.effect_extraParam, buffType) != -1) {
                addValue = value;
            }
            return addValue;
        }
        public getBuffNodePosXy(pos) {
            let x = 0;
            let y = 0;
            let node = this.getBuffNode(pos);
            if (node != null) {
                x = node.x;
                y = node.y;
            }
            return [x, y];
        }
        public beCanHurt() {
            let tag = true;
            if (this.specialState == TableEnum.TableEnumSpecialState.SpecialState_Super
                || this.specialState == TableEnum.TableEnumSpecialState.SpecialState_GetUp_Super
                || this.bDead == true
                || this.bBomb == true
                || this.bMomentDead == true
                || this.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
                tag = false;
            }
            return tag;
        }
        //[[设置归位是否隐藏]]
        public setHomingVisible(tag) {
            if (this.bVisible == false) {
                return;
            }
            if (this.body) {
                this.body.setVisibleSpx(tag);
            }
            if (this.haloFront) {
                this.haloFront.setVisible(tag);
            }
            if (this.haloBack) {
                this.haloBack.setVisible(tag);
            }
            if (this.shadow) {
                this.shadow.visible = tag;
            }
            // if (this.nodeFollow) {
            //     this.nodeFollow.visible = tag;
            // }
        }
        //[[获得正在施加伤害的角色]]
        public getBringHurtRole() {
            return this.bringHurtRole;
        }
        public isPlaySkillUiLegeal() {
            if (this.bPauseBlack == true) {
                return false;
            }
            if (this.checkBuffLegeal() == false) {
                return false;
            }
            let isFloor = this.getIsOnFloor();

            if ((this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy || this.otherState == TableEnum.TableEnumOtherState.OtherState_Parry) && !isFloor) {
                return false;
            }

            if (!(this.otherState == TableEnum.TableEnumOtherState.OtherState_None || this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack ||
                this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy ||
                this.otherState == TableEnum.TableEnumOtherState.OtherState_Parry)) {
                return false;
            }
            return true
        }
        //设置人物技能cd
        public setPressCdTime(time) {
            let skill = this.getPressSkill();
            if (skill != null) {
                let cd = SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.setTime(time);
                }
            }
        }
        //设置人物技能最大cd
        public resetPressMaxCd() {
            let skill = this.getPressSkill();
            if (skill != null) {
                let cd = SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.setMaxTime(skill.getCd());
                }
            }
        }
        public getCurBeanNum() {
            return this.curBeanNum;
        }
        public setCurBeanNum(num) {
            this.curBeanNum = num;
        }
        public isHandleCdOk() {
            let tag = false;
            if (this.pressCd != null) {
                tag = this.pressCd.IsFinish();
            }
            if (tag && Game.TeachSystem.curPart == 4002) {
                Game.EventManager.event(GameEvent.SKILL_CD_OK, { isOk: true });
            }
            return tag;
        }
        //获得作为援护怒气消耗值
        public getSupportConsume() {
            this.CheatCheckSumAttr();
            let reduce = this.rageReducePlus;
            return this.attribs.supportConsume * (1 - reduce);
        }
        public setNoticeTouchType(type) {
            if (type == message.ESkillType.SKILL_TYPE_HANDLE) {
                if (this.playSkillAtk(0) == true) {
                    this.fightScene.dealSkillUi(this);
                }
            } else if (type == message.ESkillType.SKILL_TYPE_DEATH) {
                if (this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.playSkillAtk(0);
                }
            }
        }
        //根据个数和类型来驱散buff
        public clearBuffsByNumAType(totalNum, tbl) {
            let num = 0;
            let i = 0;
            while (i < this.tableBuffs.length) {
                let tBuff = this.tableBuffs[i];
                let base = tBuff.getBuffBaseType();
                if (tbl[base] != null && tbl[base] >= 1) {
                    this.openFoldBuffEffect(tBuff);
                    CC_SAFE_DELETE(tBuff);
                    this.tableBuffs.splice(i, 1);
                    num = num + 1;
                } else {
                    i = i + 1;
                }
                if (num >= totalNum) {
                    continue;
                }
            }
            return num;
        }
        //定时中毒掉血
        public bePoisonBlood(character, hurtValue) {
            //增益伤害抵挡
            let value = this.keepOutHurt(null, hurtValue);
            value = this.keepOutRealHurt(character, value);

            //减少持续伤害的天赋效果
            let reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;

            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;

            this.dealCutHp(character, value, false, null, null);
        }
        public beWoundedBlood(character, hurtValue) {
            //增益伤害抵挡
            let value = this.keepOutHurt(null, hurtValue);

            value = this.keepOutRealHurt(character, value);

            //减少持续伤害的天赋效果
            let reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;

            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO)
            value = value * ratio;

            this.dealCutHp(character, value, false, null, null);

        }
        //获得正在进行目标者
        public getHurtingRole() {
            return this.hurtingRole;
        }
        //设置依赖援护
        public setRelySupportRole(role) {
            this.relySupportRole = role;
        }
        public appearSupportFight() {
            this.loadEntireTalent();
            this.appearSpeical();
        }
        public dealCutRage(value) {
            this.reduceRage(value);
            this.playRageAni((-1) * value);
        }
        public dealAddCd(value, isOverFlow) {
            SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), value, null, isOverFlow);
            this.playCdAni(value / 1000);
        }
        public dealCutCd(value, tag) {
            if (value > 0) {
                this.enemyTriggerWhenCdCut();
            }
            let effectValue = this.dealCdEffect();
            SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), value * (-1) * effectValue, tag, null);
            this.playCdAni(-(value / 1000));
        }
        public enemyTriggerWhenCdCut() {
            if (this.bEnemy) {
                for (let k in this.fightScene.tableAllys) {
                    let v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyCdCut();
                    }
                }
            } else {
                for (let k in this.fightScene.tableEnemys) {
                    let v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyCdCut();
                    }
                }
            }
        }
        public triggerEnemyCdCut() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_CD_REDUCE];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || Table.FindK(talent.trigger_condition, -1) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public dealAddCdMax() {
            if (this.getPressSkill() != null) {
                SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), this.getPressSkill().getCd(), null, null);
            }
        }
        //减少人物怒气
        public reduceRage(reduce) {
            let cur = this.getRage();
            this.setRage(cur - reduce);
        }
        public triggerTouchSupportTalent() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_TOUCH_SUPPORT];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if (talent.trigger_condition[0] == -1) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        private appearthisobj;
        public setAppearCallback(callback, thisobj) {
            this.appearthisobj = thisobj;
            this.appearCallback = callback;
        }
        public triggerEnemySupportSkill() {
            let t = this.tableBaseTalent[TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_RELEASE_SUPPORT_SKILL];
            if (t != null) {
                for (let i = 0; i < t.length; i++) {
                    let talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || Table.FindK(talent.trigger_condition, -1) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        }
        public handleTalentEffect_DispelUsefulToPosion(targetRole, num) {
            let [tag, value, extra, extra2, effect] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_USEFUL_TO_POISON, -1, null, null);
            if (tag == true) {
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    let realNum = yuan3(num > extra, extra, num);
                    for (let i = 0; i < realNum; i++) {
                        targetRole.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this);
                    }
                }
            }
        }
        public handleTalentEffect_PurgeTrantoRecover(targetRole, num) {
            let [tag, value, extra, extra2, effect] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PURGE_TRANTO_RECOVER, -1, null, null);
            if (tag == true) {
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    let realNum = yuan3(num > extra, extra, num);
                    for (let i = 0; i < realNum; i++) {
                        targetRole.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this);
                    }
                }
            }
        }
        public getSingleTalentEffect(eType) {
            let t = this.tableTalentEffect[eType];
            if (t != null && t.length != 0) {
                return t[0];
            }
            return null;
        }
        //处理相关类型的时间
        public dealAllTimeBuff(tbl, value1) {
            let value = 0;
            for (let k in this.tableBuffs) {
                let v = this.tableBuffs[k];
                let baseType = v.getBuffBaseType();
                if (tbl[baseType] != null && tbl[baseType] >= 1) {
                    v.continue_time = v.continue_time * (1 + value)
                }
            }
            return value;
        }
        //人物伤害总量
        public getflowHurtValue(value) {
            return this.hurtTotalValue;
        }
        //人物回血总量
        public getflowRecoverValue(value) {
            return this.recoverTotalValue;
        }
        public CheatGetPluginState() {
            if (this.cheat_diffvalue != null && this.cheat_range != null) {
                return Helper.StringFormat("%.2f|%.2f", this.cheat_diffvalue, this.cheat_range)
            }
            return "";
        }
        public makeSkillsData(tbl) {
            for (let i = 0; i < this.tableCommons.length; i++) {
                let msg = this.tableCommons[i].makeSkillTableInfo();
                tbl.push(msg);
            }
            for (let i = 0; i < this.tableSkills.length; i++) {
                let msg = this.tableSkills[i].makeSkillTableInfo();
                tbl.push(msg);
            }
            for (let i = 0; i < this.tableDeaths.length; i++) {
                let msg = this.tableDeaths[i].makeSkillTableInfo();
                tbl.push(msg);
            }
        }
        public getFollowEffectByID(id) {
            for (let i = 0; i < this.tableEffects.length; i++) {
                let v = this.tableEffects[i];
                if (v.effect_id == id) {
                    return v;
                }
            }
        }
        public getRelatedEffect(id) {
            let eff = this.getFollowEffectByID(id);
            if (eff == null) {
                let scene = StageSceneManager.Instance.GetCurScene();
                eff = scene.getSceneEffectByID(id);
            }
            return eff;
        }
        public beTargetEffectBuff(effect, character) {
            let belongSkill = effect.getBelongSkill();
            let belongUnit = belongSkill.getCurUnit();
            let buffId = effect.getBuffId();
            this.beBuffHurt(belongSkill.getSkillLevel(), buffId, character, belongUnit, effect, null);
        }
        public beTargetEffectHurt(effect: SkillEffectTimely, character: StagePersonGeneral) {
            if (effect == null) return;
            let hurt = effect.getHurt();
            if (hurt == null) return;
            character.handleTalentEffect_IgnoreInjury(this);

            let [numX, numY] = character.getHurtNumPos();
            let aType = effect.getAtkType();

            _hurtingAndBring(this, character);

            let belongSkill = effect.getBelongSkill();
            let skillType = effect.getSkillType();
            let atkType = effect.getAtkType();
            let priority = effect.getBreakPriority();

            character.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF, this, ETalentDir.Dir_Attack);
            character.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF, character, ETalentDir.Dir_Attack);
            this.triggerInBuff(TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF, this, ETalentDir.Dir_BeAttactked);

            // 攻击方属性值大于小于防御方检测
            character.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, this, ETalentDir.Dir_Attack);
            character.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, this, ETalentDir.Dir_Attack);
            // 防御方生命值大于小于攻击方检测
            this.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkProtoCompareTalent(TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, character, ETalentDir.Dir_BeAttactked);

            // 攻击方属性大于防御方N % 检测
            character.checkProtoComparePer(TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, this, ETalentDir.Dir_Attack);
            // 防御方属性大于供给方N % 检测
            this.checkProtoComparePer(TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, character, ETalentDir.Dir_BeAttactked);

            // 攻击方生命值大于小于检测
            character.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_Attack);
            character.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_Attack);
            // 防御方生命值大于小于检测
            this.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareSelf(TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_BeAttactked);

            // 被攻击方生命值大于小于检测，攻击方触发天赋
            character.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, this, ETalentDir.Dir_Attack);
            character.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, this, ETalentDir.Dir_Attack);
            // 攻击方生命值大于小于检测，被攻击方触发天赋
            this.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareTarget(TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, character, ETalentDir.Dir_BeAttactked);

            character.checkProtoCompareValueTalent();
            this.checkProtoCompareValueTalent();

            // character.triggerBeInBuff(true, belongSkill.getSkillType());
            // this.triggerBeInBuff(false, belongSkill.getSkillType());

            // 敌方处于低于血量时
            // character.triggerBeLowBlood(TableTalentCondition.TALENT_CONDITION_ATK);
            // 我方处于低于血量时
            // this.triggerBeLowBlood(TableTalentCondition.TALETN_CONDITION_BEATKED);

            priority = effect.getBreakPriority()
            let [hitId, sizeTbl] = effect.getHitEffectId()
            belongSkill = effect.getBelongSkill()

            // 真实伤害判断
            let bHurt: boolean = false;
            let realValue: number = 0;
            [bHurt, realValue] = this.beHurtCommon(belongSkill, character, aType, hurt, hitId, sizeTbl, priority, numX, numY, true, null, effect, null);
            _clearHurtingAndBring(self, character)
            this.releaseZoneEffect()
            character.releaseZoneEffect()

            this.fightScene.handleCombo(character, realValue)
        }
        public handleTalentEffect_ProBuffRecoverValue() {
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_BUFF_RECOVER_EFFECT, -1, null, null);
            return value;
        }
        // private l: egret.Shape = new egret.Shape();
        public rect() {
            // let rectRole = this.body.getRect();
            // this.nodeRoot.stage.addChild(this.l);
            // this.l.graphics.clear();
            // this.l.graphics.beginFill(0x232323, 0.5);

            // this.l.graphics.drawRect(rectRole.x + Game.UIManager.x, rectRole.y, rectRole.width, rectRole.height);
            // this.l.graphics.endFill();
        }
        //处理被反弹
        public beRebounded(atkType, hurtValue, character) {
            //天赋buff减伤
            if (this.isSupport()) {
                return;
            }
            let bTag;
            let value = hurtValue;
            let arr = this.keepOutTalentHurt(atkType, value, character);
            bTag = arr[0];
            value = arr[1];

            //终伤百分比
            let [_addTag, _finalAdd] = character.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PERCENT_FINAL_ADD, -1, null, null)
            let [_reduceTag, _finalReduce] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_PERCENT_FINAL_REDUCE, -1, null, null)
            value = value * (1 + _finalAdd / 100 - _finalReduce / 100);

            if (hurtValue <= 0) {
                hurtValue = 0;
            }
            value = this.keepOutHurt(atkType, value);

            value = this.keepOutRealHurt(character, value);

            let ratio = yuan3(this.fightScene.beInPvp() == true, constdb.GetValue(ConstValueEnum.CV_FIGHT_PVP_RATIO), ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            //处理所有伤害减免
            value = this.dealAllHurt(value, character);
            if (value < 0) {
                return;
            }
            if (value < 1) {
                value = 1;
            }
            let showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            let [numX, numY] = this.getHurtNumPos();
            let right = yuan3(this.getPosX() > character.getPos(), true, false);
            this.creatHurtNum(numX, numY, showValue, right);
            //处理hp
            let curHp = this.getHp();
            character.flowHurtValue(value, yuan3(value > curHp, curHp, value), this);
            //反弹减血
            this.reduceHp(value, null);
            this.dealShelter(value)
            this.bleedMakeRage(value)
            this.dealHurtHpZero(character, hurtValue, null);
        }
        public addFightExtraAttri(proto, value) {
            let base = this.getBaseProtoValue(proto);
            if (base == null) {
                return;
            }
            if (proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK || proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF
                || proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] + base * value / 100;
            } else {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] + value;
            }
            if (proto == TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                SkillCdMgr.Instance.reCalcCd(this.getPressSkill());
            }
        }
        public getBaseProtoValue(type) {
            let ret = 0;
            if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_PHY_ATK];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_PHY_DEF];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_HTV];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_EVA];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_PHY_CRIT];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_DODGE_RATE];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_HIT_RATE];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_CD_SPEED];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_HP];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS];
            }
            else if (type == TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS) {
                ret = this.baseAttribs[TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS];
            }
            return ret;
        }
        private ani_dialog;
        public loadSkillDialog() {

            let name = UIConfig.UIConfig_CommonBattleCss.json_skill_dialog;
            [this.ani_dialog,] = HunterSpineX(name, 1, null, TableClientAniSpxSource.Item(name).name);
            this.ani_dialog.setVisibleSpx(false);
            this.ani_dialog.stopAllActions();
            this.nodeRoot.addChild(this.ani_dialog.spine);
            this.ani_dialog.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent1, this);
        }
        private animationTimeEvent1() {
            this.ani_dialog.stopAllActions();
            this.ani_dialog.setVisibleSpx(false);
        }
        public playDialogAni() {
            if (this.ani_dialog == null) {
                return;
            }
            this.ani_dialog.setVisibleSpx(true);
            this.ani_dialog.SetPosition(this.x, this.y);
            this.ani_dialog.ChangeAction(yuan3(this.bEnemy == false, 0, 1));

            let pressSkill = this.getPressSkill();
            if (pressSkill != null) {
                let name = new eui.Image;
                cachekeys([pressSkill.skill_name2_path_s], null)
                    .then(() => {
                        // name.source = pressSkill.skill_name2_path_s;
                        name.texture = RES.getRes(pressSkill.skill_name2_path_s);
                        name.anchorOffsetX = name.width * 0.5;
                        name.anchorOffsetY = name.height * 0.5;

                        let slot = this.ani_dialog.spine.armature.getSlot("003_wenzi");
                        slot.setDisplay(name);
                    })
                    .catch((e) => { toast(e); });
            }
        }
        public playReplaySkill(sType, index) {
            this.skillSimple(sType, index);
            this.skillFollow(sType, index);
        }
        public skillSimple(sType, index) {
            if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                this.curSkill = this.tableCommons[index - 1];
            } else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.curSkill = this.tableSkills[index - 1];
            } else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                this.curSkill = this.tableDeaths[index - 1];
            }
            this.curSkillIdx = index;
        }
        public setGoGutPosTag(tag) {
            this.bGoGutPos = tag;
        }
        public setInGut(tag) {
            this.bInGut = tag;
        }
        public light;
        public initLight() {
            if (Gmgr.Instance.fightType != TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return;
            }
            // [this.light] = HunterSpineX(8001063, Gmgr.Instance.spineX_scale);
            // this.light.SetAutoUpdate(true);
            // this.light.setVisibleSpx(false);
            // this.fightScene.nodeTip.addChild(this.light.spine);
        }
        public playLight() {
            if (Gmgr.Instance.fightType != TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return;
            }
            // this.light.setVisibleSpx(true)
            // this.light.SetPosition(this.x, this.y);
            // this.light.stopAllActions()   
            // this.light.SetLoop(false) 
            // this.light.ChangeAction(0)
        }
        public foreverCutHp(character, value) {
            let hurtValue = value;
            hurtValue = this.keepOutRealHurt(character, hurtValue);
            if (hurtValue < 0) {
                return;
            }
            if (hurtValue < 1) {
                hurtValue = 1;
            }
            this.permanentReduceHp(hurtValue);
        }
        public permanentReduceHp(value) {
            this.pdhValue = this.pdhValue + value;
        }
        public loadBuffsAttri() {
            if (this.bEnemy == false) {
                this.tableBuffsAttri = Helper.integrateAttri0(Gmgr.Instance.buffLeftAttriTbl);
            } else {
                this.tableBuffsAttri = Helper.integrateAttri0(Gmgr.Instance.buffRightAttriTbl);
            }
        }
        public handleTalentEffect_Gushou() {
            let [tag, value] = this.getTalentEffective(TableEnum.TableTalentEffect.TALENT_EFFECT_GUSHOU, -1, null, null);
            let addValue = 0;
            if (tag == true) {
                addValue = value;
            }
            return addValue;
        }
        //根据指定的buff类型删除特定buff
        public removeBuffByType(sType) {
            let i = 0;
            while (i < this.tableBuffs.length) {
                let tBuff = this.tableBuffs[i];
                if (tBuff.getBuffBaseType() == sType) {
                    this.openFoldBuffEffect(tBuff);
                    CC_SAFE_DELETE(this.tableBuffs[i]);
                    this.tableBuffs.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
        }
        private bombCss;
        public createBomoCss() {
            let name = UIConfig.UIConfig_CommonBattleCss.json_bomb;
            [this.bombCss,] = HunterSpineX(name, 1, null, TableClientAniSpxSource.Item(name).name);
            this.bombCss.ChangeAction(0);
            this.nodeRoot.addChild(this.bombCss.spine);
            let [x, y] = this.getBuffNodePosXy("mid");
            this.bombCss.SetPosition(x, y);
            this.bombCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
        }
        private comStartFun() {
            if (this.bombCss) {
                this.bombCss.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.bombCss.clearSpine();
                this.bombCss = null;
            }
        }
        public clearEffectBelongRole(tbl) {
            for (let k in this.tableTalentEffect) {
                let v = this.tableTalentEffect[k];
                let i = 0;
                while (i < v.length) {
                    if (tbl[v[i].belong_role.roleId] != null) {
                        CC_SAFE_DELETE(v[i]);
                        v.splice(i, 1);
                    } else {
                        i = i + 1;
                    }
                }
            }
        }
        public createWeekNumber(baseX, baseY) {
            let scale = getRandom(ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(null)//UIConfig.UIConfig_FightNumber.week
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale)
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        public createRidweekNumber(baseX, baseY) {
            let scale = getRandom(ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false))
            num.setWordInfo(null)//UIConfig.UIConfig_FightNumber.ridweek
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale)
            num.setData(baseX, baseY, 0, 0)
            num.runAction()
            num.start();
        }
        public createAbilityproNumber(baseX, baseY) {
            let scale = getRandom(ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000
            let num = Game.ObjectPool.getItem("FightNumberEffect", FightNumberEffect);
            num.newSetData();
            num.setEffectDir(yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(null)//UIConfig.UIConfig_FightNumber.abilitypro
            num.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        }
        public beTalentHurt(effect, character) {
            if (effect == null) {
                return [false, 0];
            }
            let hurt = effect.getHurt();
            if (hurt == null || (hurt != null && hurt.canHurtOne(this) == false)) {
                return [false, 0];
            }
            let buffId = effect.getBuffId();
            let talentLevel = effect.belong_talent.talent_level;
            let talentEffectVal = effect.talent_effect.effect_value;

            hurt.addHurtOne(this);
            let [numX, numY] = this.getHurtNumPos();
            let atkType = effect.getAtkType();
            _hurtingAndBring(this, character);

            let priority = effect.getBreakPriority()
            let hurtValue = 0;
            let phyDef = character.handleTalentEffect_IgnoreTargetDef(this.getDef(false));
            let pierceForce = character.getIgnorePhydef();
            hurtValue = phyTalentValue(talentEffectVal, character.getAtk(), hurt.getProofValue(), phyDef, pierceForce, character.getLevel(), character, this);
            if (hurtValue > 0) {
                this.dealCutHp(character, hurtValue, true, null, null);
            }
            this.dealHurtState(priority, hurt, character);
            this.beBuffHurt(talentLevel, buffId, character, null, effect, null);
            _clearHurtingAndBring(this, character);
        }
        public setRevive(hpPer) {
            if (!this.bDead) {
                return;
            }
            // 布尔相关
            this.bDead = false
            this.bMomentDead = false
            this.bAlreadyDead = false
            this.bCanRemove = false
            this.bDisappear = false
            this.bBomb = false
            this.setTrans(255);

            // 场景相关
            this.fightScene = StageSceneManager.Instance.GetCurScene();
            this.fightScene.addRole(this)
            this.fightScene.addCollision(this)
            this.fightScene.pushSqueue(this.roleId, this.bEnemy);
            if (this.bEnemy == false) {
                this.fightScene.tableTimelyPos.splice(this.eTeamNum + 1, 1);
            }
            this.fightScene.freshReviveMenu(this);

            // 重置技能进度条
            SkillCdMgr.Instance.setRoleCd(this, this.pressCd);
            SkillCdMgr.Instance.reCalcCd(this.getPressSkill());

            // 自身相关
            this.setVisible(true)
            this.setHp(this.getMaxHp(true) * hpPer / 100)
            this.backHoming()
            this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Curve);
        }
    }
}