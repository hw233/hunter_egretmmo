var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 战斗场景人物类
    // lilou
    // 2018.12.11
    var ROLE_CD_SPEED = 1000;
    var ETalentDir;
    (function (ETalentDir) {
        ETalentDir[ETalentDir["Dir_Attack"] = 1] = "Dir_Attack";
        ETalentDir[ETalentDir["Dir_BeAttactked"] = 2] = "Dir_BeAttactked";
    })(ETalentDir || (ETalentDir = {}));
    var EGetRageWay;
    (function (EGetRageWay) {
        EGetRageWay[EGetRageWay["Way_None"] = 0] = "Way_None";
        EGetRageWay[EGetRageWay["Way_Common"] = 1] = "Way_Common";
        EGetRageWay[EGetRageWay["Way_Skill"] = 2] = "Way_Skill";
        EGetRageWay[EGetRageWay["Way_LastHit"] = 3] = "Way_LastHit";
        EGetRageWay[EGetRageWay["Way_Blood"] = 4] = "Way_Blood";
        EGetRageWay[EGetRageWay["Way_Max"] = 5] = "Way_Max";
    })(EGetRageWay || (EGetRageWay = {}));
    function _hurtingAndBring(beAttacked, attack) {
        beAttacked.bringHurtRole = attack;
        attack.hurtingRole = beAttacked;
    }
    function _clearHurtingAndBring(beAttacked, attack) {
        beAttacked.bringHurtRole = null;
        attack.hurtingRole = null;
    }
    function _cacheGeneralDeadInfo(role) {
        var info;
        info.cur_rage = role.getRage();
        info.cur_bean = role.getCurBeanNum();
        info.cur_skillCd = role.getPressCdTime();
        return info;
    }
    function _creatSkillAction(time, type, index, atomic) {
        var skillAction = new message.ActionSkillInfo;
        skillAction.triggerTime = time;
        skillAction.type = type;
        skillAction.index = index;
        skillAction.atomic = atomic;
        return skillAction;
    }
    function _creatStateAction(time, state) {
        var stateAction = new message.ActionStateInfo;
        stateAction.triggerTime = time;
        stateAction.state = state;
        return stateAction;
    }
    function _isIgnoreInjureForTalent(type) {
        var tag = false;
        if (type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_HURT_REDUCE
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_ACTION_ABSORB
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_ALL_HURT
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE
            || type == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALL_HURT_BY_TARGET_POS) {
            tag = true;
        }
        return tag;
    }
    function _isIgnoreInjureForBuff(type) {
        var tag = false;
        if (type == zj.TableEnum.TableBufferType.BUFFER_PROMOTE_DEF || type == zj.TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE) {
            tag = true;
        }
        return tag;
    }
    var StageRole = (function () {
        function StageRole(node, aiTag) {
            this.effect = [];
            // todo
            // public nodeNormal = new eui.Group;
            // public nodeFollow = new eui.Group;
            // public nodeShadow = new eui.Group;
            // public nodeBody = new eui.Group;
            this.nodeDc = new eui.Group;
            this.nodeUp = new eui.Group;
            this.nodeMid = new eui.Group;
            this.nodeDown = new eui.Group;
            this.baseAttribs = zj.Helper.CreateGeneralAttrTbl0();
            this.fightExtraAttribs = zj.Helper.CreateTalentAttrTbl();
            this.attribs = {
                level: 1,
                atkAll: 0,
                defAll: 0,
                critAll: 0,
                ignoreAll: 0,
                atk: 0,
                def: 0,
                htv: 0,
                eva: 0,
                //sacredAtk = 0,		// 神圣攻击力
                //sacredDef = 0,		// 神圣防御力	
                curRage: 0,
                maxRage: 0,
                curHp: 0,
                maxHp: 0,
                atkCritRate: 0,
                skillCritRate: 0,
                sacredCritRate: 0,
                critExtra: 0,
                critDef: 0,
                ignorePhydef: 0,
                ignoreMagicdef: 0,
                ignoreScaredef: 0,
                finalExtraHurt: 0,
                finalReduceHurt: 0,
                hitRate: 0,
                dodgeRate: 0,
                stiffDef: 0,
                unilResis: 0,
                ignoreResis: 0,
                floatResis: 0,
                cdSpeed: 0,
                supportConsume: 0,
            };
            this.roleName = null;
            this.headPath = null;
            this.eyePath = null;
            this.talentEyePath = null;
            this.bodyPath = null;
            this.halfPath = null;
            this.roleType = 0;
            this.profession = zj.TableEnum.TableEnumProfession.CAREER_Unknown;
            this.sex = zj.TableEnum.TableEnumSex.SEX_Unknown;
            this.formType = zj.TableEnum.TableEnumFromClassify.TYPE_NONE;
            this.mapRoleId = 0; // 模型id
            this.roleId = 0; // 真正角色id
            this.generalId = 0; // baseGeneralId
            this.star = 1; // 星级
            this.step = 0; // 阶数
            this.curExp = 0;
            // state
            this.state = zj.TableEnum.TableEnumBaseState.State_None;
            this.otherState = zj.TableEnum.TableEnumOtherState.OtherState_None;
            this.specialState = zj.TableEnum.TableEnumSpecialState.SpecialState_None;
            this.initSpecialState = zj.TableEnum.TableEnumSpecialState.SpecialState_None;
            this.lastState = -1;
            this.lastA = -1;
            this.actionId = -1;
            this.actionLastId = -1;
            this.dir = zj.TableEnum.TableEnumDir.Dir_Right;
            this._x = 0;
            this._y = 0;
            this.bodyX = 0;
            this.bodyY = 0;
            this.floor = 0;
            this.moveDistance = 0;
            this.bCall = false;
            this.bEnemy = true;
            this.bDisappear = false;
            //public bStandDisappear = false
            this.bPause = false;
            this.bPauseBlack = false;
            // cachedata
            this.scale = 1.0;
            this.scaleX = 1.0;
            this.actSpeed = 1.0;
            this.bActLoop = false;
            this.bBodyActEnd = false;
            this.saveDir = zj.TableEnum.TableEnumDir.Dir_None;
            this.tempMoveDir = -1;
            this.sprintDistance = 0;
            this.beHurtTimes = 0;
            this.jumpSpeed = 0;
            this.sprintSpeed = zj.ConstantConfig_RoleBattle.SPRINT_SPEED;
            this.stirUpSpeed = 0;
            this.striBreakTime = 0;
            this.stirSpeedX = 0;
            this.getUpTime = 0;
            this.getUpTimeUpdate = 0;
            this.moveSpeed = 0;
            this.stirUpDef = 0;
            this.specialTimes = -1;
            this.stiffTime = 0;
            this.parryTime = 0;
            this.parryMaxTime = 0;
            this.homingTime = 0;
            this.jumpOffset = 0;
            this.stirAgainDef = 0;
            //public aiId = -1  
            //public pveAi = -1
            //public pvpAi = -1
            this.helpBg = -1;
            this.targetDis = 0;
            this.runDis = 0;
            this.runState = zj.TableEnum.TableRunStage.STAGE_NONE;
            this.hurtNumPosX = 0;
            this.hurtNumPosY = 0;
            this.hurtNumOffsetNorX = 0;
            this.hurtNumOffsetNorY = 0;
            this.hurtNumOffsetSpeX = 0;
            this.hurtNumOffsetSpeY = 0;
            this.hitEffectOffsetNorX = 0;
            this.hitEffectOffsetNorY = 0;
            this.hitEffectOffsetSpeX = 0;
            this.hitEffectOffsetSpeY = 0;
            this.roleAniOffsetNorUpX = 0;
            this.roleAniOffsetNorUpY = 0;
            this.roleAniOffsetSpeUpX = 0;
            this.roleAniOffsetSpeUpY = 0;
            this.cheat_checkAttr = 0;
            this.cheat_checkTime = 0;
            this.cheat_diffvalue = 0;
            this.cheat_range = 0;
            this.offsetNorMidX = 0;
            this.offsetNorMidY = 0;
            // tag
            this.bVisible = true; // 是否隐藏 
            this.bDead = false; // 是否死亡状态
            this.bStun = false; // 是否眩晕状态
            this.bCanRemove = false; // 是否能被删除
            this.bSprintJump = false; // 是否从冲刺处跳起
            this.bStirUp = false; // 是否挑起
            this.bFloatBreak = true; // 是否可以被浮空打断
            this.bGravity = false; // 是否受重力
            this.bStandStun = false; // 是否站立眩晕
            this.bStandFrozen = false; // 站立冰冻
            this.bStandSleep = false; // 站立睡眠
            this.bStandStoned = false; // 站立石化
            this.bCancelSprint = false; // 是否取消冲刺
            this.bUpSpring = false; // 是否被弹起
            this.bFallDownFlag = false; // 倒地被攻击弹起落下标识
            //public bGetUpOver = false 	// 起身是否结束
            this.bAlreadyDead = false; // 是否已经死亡	
            this.bHitedToRight = false; // 被打左边还是右边  
            this.bMomentDead = false; // 短暂的死亡 
            this.bTalentTag = false; // 特殊死亡天赋是否触发
            //public bBezierTag = false     // 贝塞尔曲线中
            this.bStartFight = false; // 入场激活战斗
            // instance    
            this.shadow = new eui.Image; // 影子ani  
            this.body = null; // 人物art
            this.haloFront = null; // 前光环
            this.haloBack = null; // 后光环
            this.bodySpxId = -1; // 人物资源路径
            this.tableEffectPath = {}; // 特效加载图片
            this.myAI = null; // 人物ai
            this.storageSpx = null; // 蓄力相关
            this.shelterAni = null; // 蛋蛋罩相关
            // attribs 
            this.tableBuffsAttri = zj.Helper.CreateGeneralAttrTbl0(); // 全局buff属性加成值
            //public tableAdviserAttri = {}     // 军师属性加成值
            //public tableComposeAttri = {}     // 组合属性加成值
            this.tablePotatoSkill = []; // 宝物天赋
            // skill
            this.curSkill = null;
            this.curSkillIdx = -1;
            // table
            this.tableCommons = []; // 人物普通技能
            this.tableSkills = []; // 人物基础技能
            this.tableDeaths = []; // 人物必杀技能
            this.tableSkillAi = [];
            this.tableEffects = []; // 人物随身特效
            this.tableHits = []; // 命中特效
            this.tableNumbers = []; // 被攻击数字
            this.tableHurtValue = []; // 受伤
            this.tableBuffs = []; // buff 
            this.tableClean = []; // 延迟清理
            // 天赋
            this.tableBaseTalent = [];
            //public tableAppearTalent = {}
            this.tableTalentEffect = {};
            // 天赋动画出现    
            this.talentTimmer = 0;
            this.tableDelayTalent = [];
            this.tableTalentAni = [];
            this.tableQTalent = [];
            //public TALENT_INTERVAL_TIMER = 400  
            //public tableTalentEffectAni = {}
            // 天赋效果
            this.bReviving = false;
            this.bBomb = false;
            this.bNoRevive = false;
            this.tableSkillIds = [];
            this.tableSkillLevels = [];
            this.tableTalentIds = [];
            this.tableTalentLevels = [];
            this.tableHideTalentIds = [];
            this.tableDeathTalent = [];
            // 施加者
            this.bringHurtRole = null;
            // 正在进行目标者
            this.hurtingRole = null;
            // 正在复活者
            this.revivingRole = null;
            // 特效
            this.reviveCss = null; // 复活特效
            this.deadCss = null; // 死亡特效
            // 粒子
            this.deadParticleEffects = null; // 死亡粒子特效
            this.resafeParticleEffects = null; // 复活粒子特效	
            this.breakMoveEffects = null; // 打断移动特效
            // ui相关
            this.freezeTime = 0;
            this.stunFrame = 0;
            this.bColorChange = false;
            this.disappearTran = 255;
            this.bForceAi = false;
            this.DISPLACEMENT = {
                id: 0,
                speed_x: 0,
                speed_y: 0,
                aspeed_x: 0,
                aspeed_y: 0,
                aspeed_time: 0,
                continue_time: 0,
            };
            // 回调
            this.bodyActionFun = null;
            // sound
            this.press_sound_path = null;
            this.kill_sound_path = null;
            ////////////-extra////////////////-
            this.eCamp = zj.TableEnum.TableCampType.CAMP_TYPE_NONE;
            this.eAppearStage = zj.TableEnum.TableStageState.STAGE_STATE_NONE;
            this.ePosition = zj.TableEnum.TablePositionType.POSITION_NONE;
            this.orderPos = 0;
            this.eTeamNum = zj.TableEnum.TableTeamNum.TEAM_NUM_NONE;
            this.teamOriginalX = 0;
            this.teamOriginalY = 0;
            this.realX = 0;
            this.realY = 0;
            this.noticeTouchType = message.ESkillType.SKILL_TYPE_NONE;
            this.bDelayTag = false;
            this.noHurtMs = 0;
            this.bNoHurtJudge = false;
            this.bFrozen = false; // 冰冻
            this.bSleep = false; // 睡眠
            this.bStoned = false; // 石化
            this.bSilence = false; // 禁言     
            this.bDisarm = false; // 缴械
            this.bImmune = false; // 免疫
            //public bSpeedDown = false // 减缓    
            //public bSpeedUp = false   // 加速
            this.bIgnoreInjury = false;
            this.bleedSum = 0;
            this.bloodTriggerLine = 0;
            this.hurtTotalValue = 0;
            this.recoverTotalValue = 0;
            this.bossHurtValue = 0;
            this.bezierDisplacementId = -1;
            this.curBeanNum = 0;
            this.maxBeanNum = 0;
            this.rageConsume = 0;
            this.rageReducePlus = 0;
            this.bRageAdd = true;
            //public ragePlus = 0
            //////////////////////////////////-
            // replay
            this.actions = new message.BattleActionInfo;
            this.battleAction = null;
            this.skillReplayIndex = 1;
            //////////////////////////////////-		
            // hunter
            // dc
            this.pressCd = null;
            this.SpriteHpBoard = new eui.Image;
            this.SpriteHpBloodGround = new eui.Image;
            this.SpriteHpBlood = new eui.Image;
            this.SpritePdhBlood = new eui.Image;
            this.SpriteRedBlood = new eui.Image;
            this.SpriteBloodSplit = new eui.Image;
            this.BarHpSize = { width: 0, height: 0 };
            this.BloodSplit = { width: 0, height: 0 };
            this.BuffLdPos = null;
            this.TableBuffDcUi = {};
            this.TableBuffBoard = {};
            this.TableBuffNum = {};
            //public orginHpValue = -1
            this.hpAnimTick = 0;
            this.stepHpValue = 0;
            this.currHpValue = -1;
            this.pdhValue = 0;
            this.pdhBakeValue = 0;
            this.cdAnimTick = 0;
            this.stepCdValue = 0;
            this.currCdValue = -1;
            // target still
            this.still_target_effect = -1;
            this.targetPlayers = {};
            this.debugPrint = 0;
            this.bInGut = false;
            this.bGoGutPos = false;
            // other
            this.lastDir = 0;
            this.runSoundFps = 0;
            this.initDir = 0;
            this.preHpPer = 0;
            this.battleHead = "";
            this.supportHead = "";
            this.groupTag = 0;
            this.roleFeature = 0;
            this.roleFaction = 0;
            this.appearRage = 0;
            this.SpriteCdBar = new eui.Image;
            this.SpriteCdBarLight = new eui.Image;
            this.is_flashing = false;
            this.is_breakMoving = false;
            this.currShieldHp = 0;
            this.rectx = new eui.Rect();
            this.shadowx = 55;
            this.shadowy = 10;
            this.midPos = new egret.Point();
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
            this.nodeRoot = node;
            // this.nodeRoot.addChild(this.nodeNormal)//目前没用
            // this.nodeRoot.addChild(this.nodeFollow)
            // this.nodeFollow.addChild(this.nodeShadow)//目前没用
            // this.nodeFollow.addChild(this.nodeBody)//目前没用
            this.nodeRoot.addChild(this.nodeDc); //目前没用
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
        StageRole.prototype.release = function () {
            this.senderRole = null;
            this.TableBuffBoard = {};
            this.TableBuffDcUi = {};
            zj.CC_SAFE_DELETE(this.myAI);
            zj.CC_SAFE_DELETE(this.pressCd);
            this.pressCd = null;
            var i = 0;
            while (i < this.tableCommons.length) {
                zj.CC_SAFE_DELETE(this.tableCommons[i]);
                i = i + 1;
            }
            this.tableCommons = [];
            i = 0;
            while (i < this.tableSkills.length) {
                zj.CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            this.tableSkills = [];
            i = 0;
            while (i < this.tableDeaths.length) {
                zj.CC_SAFE_DELETE(this.tableDeaths[i]);
                i = i + 1;
            }
            this.tableDeaths = [];
            i = 0;
            while (i < this.tableEffects.length) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
                i = i + 1;
            }
            this.tableEffects = [];
            i = 0;
            while (i < this.tableHits.length) {
                zj.CC_SAFE_DELETE(this.tableHits[i]);
                i = i + 1;
            }
            this.tableHits = [];
            i = 0;
            while (i < this.tableNumbers.length) {
                zj.CC_SAFE_DELETE(this.tableNumbers[i]);
                i = i + 1;
            }
            this.tableNumbers = [];
            i = 0;
            while (i < this.tableBuffs.length) {
                zj.CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];
            //释放天赋
            for (var k = 0; k < this.tableBaseTalent.length; k++) {
                i = 0;
                var v = this.tableBaseTalent[k + 1];
                if (v) {
                    while (i < v.length) {
                        zj.CC_SAFE_DELETE(v[i]);
                        i = i + 1;
                    }
                }
            }
            this.tableBaseTalent = [];
            //释放延迟数据
            i = 0;
            while (i < this.tableClean.length) {
                var info = this.tableClean[i];
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
        };
        Object.defineProperty(StageRole.prototype, "x", {
            // public frame_on() {
            //     console.log("12121212");
            // }
            get: function () {
                return this._x;
            },
            set: function (xx) {
                this._x = xx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageRole.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (yy) {
                this._y = yy;
            },
            enumerable: true,
            configurable: true
        });
        StageRole.prototype.loadBody = function () {
            this.bodySpxId = zj.TableMapRole.Item(this.mapRoleId).body_spx_id;
            if (this.bodySpxId != -1) {
                this.body = zj.HunterSpineX(this.bodySpxId, zj.Gmgr.Instance.spineX_scale)[0];
                // this.body.spine.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.frame_on, this);
                this.body.SetAutoUpdate(false);
                this.nodeRoot.addChild(this.body.spine);
                // this.nodeBody.visible = false;
                this.body.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
            }
            this.loadSlots();
            this.loadDc();
            this.bone_down_x = this.body.spine.armature.getBone("buff_flo").global.x;
            this.bone_down_y = this.body.spine.armature.getBone("buff_flo").global.y;
            this.bone_mid_x = this.body.spine.armature.getBone("buff_mid").global.x;
            this.bone_mid_y = this.body.spine.armature.getBone("buff_mid").global.y;
            this.bone_up_x = this.body.spine.armature.getBone("buff_up").global.x;
            this.bone_up_y = this.body.spine.armature.getBone("buff_up").global.y;
        };
        // 角色脚下影子
        StageRole.prototype.loadSlots = function () {
            this.shadow.source = zj.UIConfig.UIConfig_CommonBattle.common_shadow;
            this.nodeRoot.addChild(this.shadow);
        };
        // 人物头顶上的
        StageRole.prototype.loadDc = function () {
            this.loadHpDc();
            this.BuffLdPos = { x: -zj.ConstantConfig_CommonBattle.blood_board.w / 2 + 30, y: zj.ConstantConfig_CommonBattle.blood_board.h / 2 + zj.ConstantConfig_CommonBattle.BUFF_HP_DIS_OFFSETY + 5 };
        };
        StageRole.prototype.convertRect = function (Object) {
            this.rectx.width = Object.width;
            this.rectx.height = Object.height;
            return this.rectx;
        };
        // 人物血条
        StageRole.prototype.loadHpDc = function () {
            var bar_size = { width: 0, height: 0 };
            this.SpriteHpBoard.source = zj.UIConfig.UIConfig_CommonBattle.hp_board;
            this.fightScene.hpBox.addChild(this.SpriteHpBoard);
            this.SpriteHpBoard.anchorOffsetX = this.SpriteHpBoard.width / 2;
            this.SpriteHpBoard.anchorOffsetY = this.SpriteHpBoard.height / 2;
            this.SpriteHpBoard.x = 0;
            this.SpriteHpBoard.y = 0;
            bar_size = this.convertRect(this.SpriteHpBoard);
            this.SpritePdhBlood.source = zj.UIConfig.UIConfig_CommonBattle.hp_blood_pdh;
            this.fightScene.hpBox.addChild(this.SpritePdhBlood);
            this.SpritePdhBlood.anchorOffsetX = 0;
            this.SpritePdhBlood.anchorOffsetY = this.SpritePdhBlood.height / 2;
            this.SpritePdhBlood.x = -bar_size.width / 2;
            this.SpritePdhBlood.y = 0;
            this.SpritePdhBlood.visible = false;
            this.SpriteRedBlood.source = zj.UIConfig.UIConfig_CommonBattle.hp_blood_red;
            this.fightScene.hpBox.addChild(this.SpriteRedBlood);
            this.SpriteRedBlood.anchorOffsetX = 0;
            this.SpriteRedBlood.anchorOffsetY = this.SpriteRedBlood.height / 2;
            this.SpriteRedBlood.x = -bar_size.width / 2;
            this.SpriteRedBlood.y = 0;
            this.SpriteRedBlood.visible = false;
            this.SpriteHpBloodGround.source = zj.UIConfig.UIConfig_CommonBattle.hp_blood_r;
            this.fightScene.hpBox.addChild(this.SpriteHpBloodGround);
            this.SpriteHpBloodGround.anchorOffsetX = 0;
            this.SpriteHpBloodGround.anchorOffsetY = this.SpriteHpBloodGround.height / 2;
            this.SpriteHpBloodGround.x = -bar_size.width / 2;
            this.SpriteHpBloodGround.y = 0;
            this.SpriteHpBlood.source = zj.UIConfig.UIConfig_CommonBattle.hp_blood_l;
            this.fightScene.hpBox.addChild(this.SpriteHpBlood);
            this.SpriteHpBlood.anchorOffsetX = 0;
            this.SpriteHpBlood.anchorOffsetY = this.SpriteHpBlood.height / 2;
            this.SpriteHpBlood.x = -bar_size.width / 2;
            this.SpriteHpBlood.y = 0;
            this.SpriteHpBlood.visible = true;
            this.SpriteBloodSplit.source = zj.UIConfig.UIConfig_CommonBattle.blood_split;
            this.fightScene.hpBox.addChild(this.SpriteBloodSplit);
            this.SpriteBloodSplit.anchorOffsetX = this.SpriteBloodSplit.width / 2;
            this.SpriteBloodSplit.anchorOffsetY = 0;
            this.SpriteBloodSplit.x = 0;
            this.SpriteBloodSplit.y = 0;
            this.SpriteBloodSplit.visible = false;
            this.BloodSplit.width = this.SpriteBloodSplit.width;
            this.BloodSplit.height = this.SpriteBloodSplit.height;
            this.SpriteCdBar.source = zj.UIConfig.UIConfig_CommonBattle.cd_bar;
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
            this.BarHpSize = bar_size;
        };
        // 切换骨骼序列
        StageRole.prototype.changeAction = function (actionId) {
            if (this.actionId == actionId && this.lastDir == this.dir) {
                return;
            }
            this.actionId = actionId;
            this.lastDir = this.dir;
            if (this.actionId < zj.ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                this.actionLastId = actionId + this.dir;
            }
            if (this.body != null) {
                this.bBodyActEnd = false;
                this.body.stopAllActions();
                if (actionId < zj.ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                    var bFlipX = false;
                    if (this.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT) {
                        bFlipX = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Right, false, true);
                    }
                    else if (this.ePosition == zj.TableEnum.TablePositionType.POSITION_RIGHT) {
                        bFlipX = zj.yuan3(this.dir == zj.TableEnum.TableEnumDir.Dir_Left, true, false);
                    }
                    this.setFlipX(bFlipX);
                    this.body.SetLoop(this.bActLoop);
                    this.body.ChangeAction(actionId);
                }
                else {
                    var bFlipX = zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, false, true);
                    this.setFlipX(bFlipX);
                    this.body.SetLoop(this.bActLoop);
                    this.body.ChangeAction(actionId);
                }
                if (this.bodyActionFun != null && this.bDead == false && this.bMomentDead == false) {
                    this.bodyActionFun(this);
                    this.bodyActionFun = null;
                }
            }
        };
        /*设置是否翻转*/
        StageRole.prototype.setFlipX = function (flip) {
            if (this.body != null) {
                this.body.setFlipX(flip);
            }
        };
        StageRole.prototype.changeOtherState = function (otherState, param) {
            var self = this;
            // body    
            if (self.otherState == otherState) {
                return;
            }
            /*
            if( self.bEnemy == false and self.roleId == 10011 ){
                if( otherState == TableEnumOtherState.OtherState_Attack ){
                    let a = 2
                }
            }
            */
            if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                self.noHurtMs = 0;
                self.bNoHurtJudge = true;
            }
            else {
                self.bNoHurtJudge = false;
            }
            if (self.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                //self.clearEffects()
                self.loadSpxData();
            }
            if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                self.changeOtherNone();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Appear) {
                self.changeOtherAppear();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Curve) {
                self.changeOtherCurve();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Run) {
                self.changeOtherRun();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_JumpUp) {
                self.changeOtherJumpUp();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_JumpDown) {
                self.changeOtherJumpDown();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt) {
                self.changeOtherHurt();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy) {
                self.changeHeavyHurt();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp) {
                var tag = self.changeOtherStirUp(param);
                if (tag == true) {
                    return;
                }
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirDown) {
                self.changeOtherStirDown();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                self.changeOtherFallDown();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_GetUp) {
                self.changeOtherGetUp();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                self.changeOtherDie();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Static) {
                self.changeOtherStatic();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Parry) {
                self.changeOtherParry();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_EnterWeek) {
                self.changeOtherEnterweek();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Weeking) {
                self.changeOtherWeeking();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_ExitWeek) {
                self.changeOtherExitweek();
            }
            else if (otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                self.changeOtherAttack();
            }
            self.otherState = otherState;
        };
        StageRole.prototype.loadSpxData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActInterval(zj.Gmgr.Instance.battleSpeed);
            this.setActLoop(true);
        };
        StageRole.prototype.setActInterval = function (speed) {
            // body
            this.actSpeed = speed;
            if (this.body != null) {
                //this.body.getAnimation().setSpeedScale(speed)
                this.body.setSpeedScale(speed);
            }
            if (this.curSkill != null) {
                var curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.setInterval(speed);
                }
            }
        };
        /***是否循环 */
        StageRole.prototype.setActLoop = function (bLoop) {
            // body	
            this.bActLoop = bLoop;
        };
        StageRole.prototype.changeOtherNone = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.bSprintJump = false;
            //this.curSkill = null
            var y = this.floor + zj.Gmgr.Instance.upY;
            if (this.bGravity == true && Math.floor(this.y) > Math.floor(y)) {
                this.setActLoop(false);
                this.otherState = zj.TableEnum.TableEnumOtherState.OtherState_JumpDown;
            }
            else {
                this.setActLoop(true);
            }
        };
        StageRole.prototype.changeOtherAppear = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherCurve = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
            //this.fightScene.setGameCurve(true)
        };
        StageRole.prototype.changeOtherRun = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(true);
            this.runState = zj.TableEnum.TableRunStage.STAGE_RUN_ONE;
            this.runSoundFps = 0;
        };
        StageRole.prototype.changeOtherJumpUp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.lastState = this.state;
            this.jumpSpeed = zj.ConstantConfig_RoleBattle.LEADER_JUMP_SPEED;
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherJumpDown = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.lastState = this.state;
            this.jumpSpeed = 0;
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherStatic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
            //cclog("dongzuo===="..this.y)
        };
        StageRole.prototype.changeOtherParry = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.setActLoop(true);
            this.parryTime = this.parryMaxTime;
        };
        StageRole.prototype.changeOtherEnterweek = function () {
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherWeeking = function () {
            this.setActLoop(true);
        };
        StageRole.prototype.changeOtherExitweek = function () {
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherHurt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
        };
        StageRole.prototype.changeHeavyHurt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherStirUp = function (force) {
            // body
            if (force != null && force == true) {
                this.setActLoop(false);
                this.striBreakTime = 0;
                return false;
            }
            else {
                if (this.bDead == false && this.bStirUp == false) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Hurt);
                    return true;
                }
                this.setActLoop(false);
                this.striBreakTime = 0;
                return false;
            }
        };
        StageRole.prototype.changeOtherStirDown = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherFallDown = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.bDead == false) {
                this.getUpTimeUpdate = this.getUpTime;
            }
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherGetUp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.beHurtTimes = 0;
            this.bSprintJump = false;
            this.goOtherGetUp();
            this.setActLoop(false);
        };
        StageRole.prototype.changeOtherDie = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	  
            this.goOtherDie();
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
        };
        StageRole.prototype.changeOtherAttack = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            // null
        };
        StageRole.prototype.goOtherGetUp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	
        };
        StageRole.prototype.goOtherDie = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.setActLoop(false);
        };
        /*每帧检测基本状态*/
        StageRole.prototype.procState = function (tick) {
            // body	
            var self = this;
            var tag;
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
                case zj.TableEnum.TableEnumOtherState.OtherState_None:
                    tag = self.procOtherNone(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Appear:
                    tag = self.procOtherAppear(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Curve:
                    tag = self.procOtherCurve(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Run:
                    tag = self.procOtherRun(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_JumpUp:
                    tag = self.procOtherJumpup(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_JumpDown:
                    tag = self.procOtherJumpDown(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Hurt:
                    tag = self.procOtherHurt(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy:
                    tag = self.procHeavyHurt(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_StirUp:
                    tag = self.procOtherStirUp(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_StirDown:
                    tag = self.procOtherStirDown(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_FallDown:
                    tag = self.procOtherFallDown(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_GetUp:
                    tag = self.procOtherGetUp(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Die:
                    tag = self.procOtherDie(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Static:
                    tag = self.procOtherStatic(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Parry:
                    tag = self.procOtherParry(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_EnterWeek:
                    tag = self.procOtherEnterweek(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Weeking:
                    tag = self.procOtherWeeking(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_ExitWeek:
                    tag = self.procOtherExitweek(tick);
                    break;
                case zj.TableEnum.TableEnumOtherState.OtherState_Attack:
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
            self.procActId(tick);
        };
        StageRole.prototype.resetSkill = function (args) {
            // body  
            this.curSkill = null;
            this.curSkillIdx = zj.TableEnum.TableEnumOperate.Operate_None;
        };
        StageRole.prototype.handlePos = function (args) {
            // body
            if (this.comparePos() > 50) {
                this.breakMoveAni(null);
            }
            else {
                this.backHoming();
            }
        };
        StageRole.prototype.finishSkill = function () {
            if (this.bDead == false && this.actionId >= zj.ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                this.handlePos();
                this.procState(0);
                if (this.curSkill != null) {
                    this.resetSkill();
                }
            }
        };
        /*不受伤回退到原位置*/
        StageRole.prototype.backHoming = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body  
            this.setPos(this.teamOriginalX, this.teamOriginalY + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
        };
        StageRole.prototype.procCurSkill = function (tick) {
            // body
            if (this.curSkill == null) {
                return true;
            }
            var tag = this.curSkill.getIsFinish();
            if (tag == true) {
                //this.resetSkill()         		
                //this.recoverOriginalState()
                this.finishSkill();
            }
            else {
                this.curSkill.update(tick);
                tag = this.curSkill.getSkillToFloorOver();
                var tmpY = zj.Gmgr.Instance.floor + this.floor - zj.Gmgr.Instance.ground;
                if (tag == true && Math.floor(this.y) <= Math.floor(tmpY)) {
                    this.y = tmpY;
                    this.curSkill.nextAction();
                }
            }
            return false;
        };
        StageRole.prototype.procOtherAttack = function (tick) {
            // body    
            return false;
        };
        StageRole.prototype.leaveWeekTrigger = function () {
        };
        StageRole.prototype.procOtherExitweek = function (tick) {
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                this.leaveWeekTrigger();
            }
        };
        StageRole.prototype.procOtherWeeking = function (tick) {
        };
        StageRole.prototype.procOtherParry = function (tick) {
            // body
            var rt = tick * 1000;
            this.parryTime = this.parryTime - rt;
            if (this.parryTime <= 0) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            /*
            if( this.body != null and this.isBodyActEnd() == true ){
            }
            */
        };
        /*检测人物是否在地板上*/
        StageRole.prototype.getIsOnFloor = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var bOn = false;
            var tmpY = zj.Gmgr.Instance.floor + this.floor - zj.Gmgr.Instance.ground;
            if (Math.floor(this.y) == Math.floor(tmpY)) {
                bOn = true;
            }
            return bOn;
        };
        StageRole.prototype.procOtherStatic = function (tick) {
            // body
            var rt = tick * 1000;
            this.stiffTime = this.stiffTime - rt;
            if (this.body != null) {
                //if( this.body != null and this.isBodyActEnd() == true ){
                if (this.stiffTime <= 0) {
                    if (this.getIsOnFloor()) {
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                    }
                    else {
                        this.stiffTime = 0;
                        this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                        this.stirSpeedX = 0;
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp, true);
                    }
                }
            }
        };
        StageRole.prototype.procOtherDie = function (tick) {
            // body
            if (this.body == null) {
                return true;
            }
            var bEnd = this.isBodyActEnd();
            if (bEnd == true) {
                this.bAlreadyDead = true;
            }
            return false;
        };
        StageRole.prototype.procOtherGetUp = function (tick) {
            // body    
            if (this.body == null) {
                return 1;
            }
            var bEnd = this.isBodyActEnd();
            if (bEnd == true) {
                // 起身归位                 
                //if( this.comparePos() > 50 ){ this.bodyActionFun = this.breakMoveAni }else{ this.bodyActionFun = this.backOriginalTeam }
                if (this.checkRunHome()) {
                    this.changeDir(this.initDir, true);
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
                }
                else {
                    if (this.comparePos() > 50) {
                        this.bodyActionFun = this.breakMoveAni;
                    }
                    else {
                        this.bodyActionFun = this.backOriginalTeam;
                    }
                }
                //this.bGetUpOver = true
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageRole.prototype.procOtherFallDown = function (tick) {
            var self = this;
            // body
            var rt = tick * 1000;
            var distance = 0;
            if (self.bUpSpring == true && self.bGravity == true) {
                distance = self.stirUpSpeed * rt;
                if (self.bFallDownFlag == true) {
                    self.moveMap(0, distance);
                    self.stirUpSpeed = self.stirUpSpeed - zj.ConstantConfig_RoleBattle.GRAVITY * rt;
                    if (self.stirUpSpeed <= 0) {
                        self.stirUpSpeed = 0;
                        self.bFallDownFlag = false;
                    }
                    self.setPosY(self.y);
                }
                else {
                    self.moveMap(0, -distance);
                    var tmpY = zj.Gmgr.Instance.floor + self.floor - zj.Gmgr.Instance.ground;
                    if (Math.floor(self.y) >= Math.floor(tmpY)) {
                        self.y = tmpY;
                        if (self.stirUpSpeed > zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED_MAX) {
                            self.stirUpSpeed = self.stirUpSpeed * zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_RATIO;
                            self.bUpSpring = true;
                            self.bFallDownFlag = true;
                            return 1;
                        }
                        self.bUpSpring = false;
                        return 1;
                    }
                    self.setPosY(self.y);
                    self.stirUpSpeed = self.stirUpSpeed + zj.ConstantConfig_RoleBattle.GRAVITY * rt;
                }
                if (self.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                    distance = -self.stirSpeedX * rt;
                }
                else {
                    distance = self.stirSpeedX * rt;
                }
                self.moveMap(distance, 0);
                self.setPosX(self.x);
            }
            else {
                if (self.body != null && self.isBodyActEnd() == true) {
                    if (self.bDead == true) {
                        self.getUpTimeUpdate = 0;
                        self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                        return -1;
                    }
                    self.getUpTimeUpdate = self.getUpTimeUpdate - rt;
                    if (self.getUpTimeUpdate <= 0) {
                        self.getUpTimeUpdate = 0;
                        self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_GetUp);
                    }
                }
            }
            return false;
        };
        StageRole.prototype.procOtherStirUp = function (tick) {
            var self = this;
            // body
            var rt = tick * 1000;
            var distance = 0;
            if (self.bGravity == true) {
                distance = self.stirUpSpeed * rt;
                self.moveMap(0, distance);
                var riseBreakValue = 0;
                if (self.y - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor) <= zj.ConstantConfig_RoleBattle.VERTICAL_BREAK_Y) {
                    self.striBreakTime = self.striBreakTime + rt;
                    riseBreakValue = zj.ConstantConfig_RoleBattle.VERTICAL_BREAK_V0 + zj.ConstantConfig_RoleBattle.VERTICAL_BREAK_A * self.striBreakTime;
                }
                self.stirUpSpeed = self.stirUpSpeed - zj.ConstantConfig_RoleBattle.GRAVITY * rt - riseBreakValue;
                var aaa = zj.Gmgr.Instance.ground;
                var bbb = zj.Gmgr.Instance.floor;
                // console.log(self.y - (Gmgr.Instance.ground - Gmgr.Instance.floor)+"******************"+ConstantConfig_RoleBattle.VERTICAL_END_MAX);
                if (self.stirUpSpeed <= 0 || self.y - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor) <= zj.ConstantConfig_RoleBattle.VERTICAL_END_MAX) {
                    self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirDown);
                    self.stirUpSpeed = 0;
                }
                self.setPosY(self.y);
            }
            if (self.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                distance = -self.stirSpeedX * rt;
            }
            else {
                distance = self.stirSpeedX * rt;
            }
            self.moveMap(distance, 0);
            self.setPosX(self.x);
            return false;
        };
        StageRole.prototype.procOtherStirDown = function (tick) {
            // body
            var self = this;
            var rt = tick * 1000;
            var distance = 0;
            if (self.bGravity == true) {
                distance = self.stirUpSpeed * rt;
                self.moveMap(0, -distance);
                var tmpY = zj.Gmgr.Instance.floor + self.floor - zj.Gmgr.Instance.ground;
                if (Math.floor(self.y) >= Math.floor(tmpY)) {
                    self.y = tmpY;
                    var high = self.stirUpSpeed * zj.ConstantConfig_RoleBattle.STIR_UP_RATIO_BIG;
                    var low = self.stirUpSpeed * zj.ConstantConfig_RoleBattle.STIR_UP_RATIO_SML;
                    if (self.bDead == true) {
                        self.stirUpSpeed = high;
                    }
                    else {
                        if (self.formType == zj.TableEnum.TableEnumFromClassify.TYPE_PERSON || self.formType == zj.TableEnum.TableEnumFromClassify.TYPE_BOSS) {
                            self.stirUpSpeed = low;
                        }
                        else {
                            self.stirUpSpeed = high;
                        }
                    }
                    /*
                    if( this.bDead and this.formType != TableEnumFromClassify.TYPE_ENEMY ){
                        this.stirUpSpeed = this.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_BIG
                    }else{
                        this.stirUpSpeed = this.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_SML
                    }
                    */
                    self.bUpSpring = true;
                    self.bFallDownFlag = true;
                    self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_FallDown);
                    self.setPosY(self.y);
                    //return 1
                    return true;
                }
                self.setPosY(self.y);
                self.stirUpSpeed = self.stirUpSpeed + zj.ConstantConfig_RoleBattle.GRAVITY * rt;
            }
            if (self.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                distance = -self.stirSpeedX * rt;
            }
            else {
                distance = self.stirSpeedX * rt;
            }
            self.moveMap(distance, 0);
            self.setPosX(self.x);
            return false;
        };
        StageRole.prototype.procOtherJumpup = function (tick) {
            // body
            var self = this;
            var rt = tick * 1000;
            if (self.bGravity == true) {
                var distance = self.jumpSpeed * rt;
                self.moveMap(0, distance);
                self.jumpSpeed = self.jumpSpeed - zj.ConstantConfig_RoleBattle.GRAVITY * rt;
                if (self.jumpSpeed <= 0) {
                    self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_JumpDown);
                    self.jumpSpeed = 0;
                }
                self.setPosY(self.y);
            }
            return false;
        };
        StageRole.prototype.procOtherJumpDown = function (tick) {
            // body
            var self = this;
            var rt = tick * 1000;
            if (self.bGravity == true) {
                var distance = self.jumpSpeed * rt;
                self.moveMap(0, -distance);
                var tmpY = zj.Gmgr.Instance.floor + self.floor - zj.Gmgr.Instance.ground;
                if (Math.floor(self.y) <= Math.floor(tmpY)) {
                    self.y = tmpY;
                    self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                    self.setPosY(self.y);
                    self.bSprintJump = false;
                    // return 1
                    return true;
                }
                self.setPosY(self.y);
                self.jumpSpeed = self.jumpSpeed + zj.ConstantConfig_RoleBattle.GRAVITY * rt;
            }
            else {
                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageRole.prototype.procOtherHurt = function (tick) {
            // body
            var self = this;
            var rt = tick * 1000;
            if (self.body != null && self.isBodyActEnd() == true) {
                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageRole.prototype.procOtherEnterweek = function (tick) {
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Weeking);
                this.enterWeekTrigger();
            }
        };
        StageRole.prototype.enterWeekTrigger = function () {
            this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENTER_WEEK, -1, null, null);
        };
        StageRole.prototype.procHeavyHurt = function (tick) {
            // body
            var rt = tick * 1000;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        StageRole.prototype.procActId = function (tick) {
            // body
            var self = this;
            if (self.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                return;
            }
            var actId = self.actionId;
            if (self.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                self.bStandStun = false;
                self.bStandFrozen = false;
                self.bStandSleep = true;
                self.bStandStoned = true;
                //actId = self.otherState * 2 + self.dir
                actId = self.otherState;
            }
            else {
                if (self.bStun) {
                    self.bStandStun = true;
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = zj.TableEnum.TableEnumOtherState.OtherState_Static;
                }
                else if (self.bFrozen) {
                    self.bStandFrozen = true;
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = zj.TableEnum.TableEnumOtherState.OtherState_Static;
                }
                else if (self.bSleep) {
                    self.bStandSleep = true;
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = zj.TableEnum.TableEnumOtherState.OtherState_Static;
                }
                else if (self.bStoned) {
                    self.bStandStoned = true;
                    //actId = TableEnumOtherState.OtherState_Static * 2 + self.dir
                    actId = zj.TableEnum.TableEnumOtherState.OtherState_Static;
                }
                else {
                    //actId = self.state * 2 + self.dir
                    actId = self.state;
                }
            }
            self.changeAction(actId);
        };
        StageRole.prototype.procOtherNone = function (tick) {
            var self = this;
            // body    
            var tmpY = zj.Gmgr.Instance.floor + self.floor - zj.Gmgr.Instance.ground;
            if (self.bGravity == false) {
                if (Math.floor(self.y) < Math.floor(tmpY)) {
                    self.y = self.y - 1;
                    if (self.y >= tmpY) {
                        self.y = tmpY;
                    }
                }
                if (Math.floor(self.y) > Math.floor(tmpY)) {
                    self.y = self.y + 1;
                    if (self.y <= tmpY) {
                        self.y = tmpY;
                    }
                }
            }
            else {
                if (Math.floor(self.y) < Math.floor(tmpY) && !self.bInGut) {
                    self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_JumpDown);
                }
            }
            self.changeDir(self.tempMoveDir, false);
            // 针对回到初始位置进行处理
            //let fightScene = StageSceneManager.GetCurScene()
            // wu zhi 3
            if (self.fightScene.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                self.procNoHurtDis(tick);
            }
            return false;
        };
        /*改变人物方向*/
        StageRole.prototype.changeDir = function (dir, force) {
            var temp_dir = 0;
            // body
            if (temp_dir != dir) {
                temp_dir = dir;
            }
            if (this.bStun == true || this.bDead == true || this.bCanRemove == true || dir == -1) {
                return;
            }
            if (force == true) {
                this.dir = dir;
                return;
            }
            if (this.otherState >= zj.TableEnum.TableEnumOtherState.OtherState_Hurt && this.otherState < zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                return;
            }
            this.dir = dir;
            this.tempMoveDir = -1;
        };
        StageRole.prototype.procNoHurtDis = function (tick) {
            // body
            if (this.bInGut) {
                return;
            }
            if (this.bNoHurtJudge == false) {
                return;
            }
            if (this.bStun || this.bSilence) {
                return;
            }
            this.noHurtMs = this.noHurtMs + tick * 1000;
            if (this.noHurtMs >= this.homingTime) {
                // and this.x >= 0 and this.x <= Device.STANDARD_SCREEN_W
                if (Math.abs(this.teamOriginalX - this.x) > zj.ConstantConfig_RoleBattle.NO_HURT_DIFFER) {
                    if (this.checkRunHome()) {
                        this.changeDir(this.initDir, true);
                        this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
                    }
                    else {
                        if (this.comparePos() > 50) {
                            this.breakMoveAni(null);
                        }
                        else {
                            this.backOriginalTeam();
                        }
                    }
                }
                this.bNoHurtJudge = false;
            }
        };
        StageRole.prototype.checkRunHome = function () {
            var tag = false;
            if (this.bEnemy == false) {
                if (this.x < this.teamOriginalX) {
                    tag = true;
                }
            }
            else {
                if (this.x > this.teamOriginalX) {
                    tag = true;
                }
            }
            return tag;
        };
        /*比较起始点与现在位置的偏差*/
        StageRole.prototype.comparePos = function (args) {
            // body
            return Math.floor(this.teamOriginalX - this.x);
        };
        StageRole.prototype.setRealPos = function (x, y) {
            this.realX = x;
            this.realY = y;
        };
        /*回退到原位置*/
        StageRole.prototype.backOriginalTeam = function () {
            // body    
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var des_x = this.teamOriginalX;
            var des_y = this.teamOriginalY + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
            this.setPos(des_x, des_y);
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
        };
        StageRole.prototype.setBodyXY = function (x, y) {
            this.bodyX = x;
            this.bodyY = y;
        };
        StageRole.prototype.renewDcPos = function () {
            if (this.body == null) {
                return;
            }
            var word_x = this.body.GetPosX();
            var word_y = this.body.GetPosY();
            if (this.bodyX == word_x && this.bodyY == word_y) {
                return;
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
            var dcX = word_x + this.bone_up_x * this.scale;
            var dcY = word_y + this.bone_up_y * this.scale + zj.ConstantConfig_CommonBattle.dcOffsetPos.y;
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
                this.nodeDc.y = word_y + this.bone_up_y * this.scale + zj.ConstantConfig_CommonBattle.dcOffsetPos.y;
            }
        };
        /*设置角色相关位移坐标*/
        StageRole.prototype.setPos = function (x, y) {
            var self = this;
            // body  
            self.x = x;
            self.y = y;
            // console.log(y);
            self.realX = self.x;
            self.realY = self.y;
            if (self.body != null) {
                self.body.SetPosition(x, y);
            }
            if (self.haloFront != null) {
                self.haloFront.setPosition(x, y);
            }
            if (self.haloBack != null) {
                self.haloBack.setPosition(x, y);
            }
            if (self.shadow != null) {
                if (self.bInGut) {
                    _a = [self.x - self.shadowx, self.y - self.shadowy], self.shadow.x = _a[0], self.shadow.y = _a[1];
                }
                else {
                    _b = [self.x - self.shadowx, zj.Gmgr.Instance.floor + (self.floor - zj.Gmgr.Instance.ground) - self.shadowy], self.shadow.x = _b[0], self.shadow.y = _b[1];
                }
            }
            var _a, _b;
            //this.renewDcPos()
        };
        StageRole.prototype.isBodyActEnd = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.bBodyActEnd;
        };
        StageRole.prototype.procOtherAppear = function (tick) {
            // body
            var rt = tick * 1000;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                if (this.appearCallback != null) {
                    this.appearCallback.call(this.appearthisobj);
                    this.appearthisobj = null;
                }
            }
            return false;
        };
        StageRole.prototype.procOtherCurve = function (tick) {
            // body
            var rt = tick * 1000;
            if (this.body != null && this.isBodyActEnd() == true) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            }
            return false;
        };
        /*地图移动*/
        StageRole.prototype.moveMap = function (x, y) {
            // body  
            this.x = this.x + x;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (this == scene.objectRole) {
                //cclog("otherState======="..this.otherState)       
                if (y > 0) {
                    if (this.y >= zj.ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER) {
                        scene.updateTeamMap(0, -y);
                        this.jumpOffset = this.jumpOffset - y;
                    }
                    else {
                        if (this.y + y > zj.ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER) {
                            this.jumpOffset = 0;
                            this.jumpOffset = this.jumpOffset - y + zj.ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER + this.y;
                            scene.updateTeamMap(0, y + zj.ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER - this.y);
                            this.y = zj.ConstantConfig_RoleBattle.JUMP_DIS_OFFSET_LEADER;
                        }
                        else {
                            this.y = this.y - y;
                        }
                    }
                }
                else if (y < 0) {
                    if (this.jumpOffset > 0) {
                        this.jumpOffset = this.jumpOffset - y;
                        if (this.jumpOffset < 0) {
                            this.y = this.y - this.jumpOffset;
                            y = y + this.jumpOffset;
                            this.jumpOffset = 0;
                            if (this.y < zj.Gmgr.Instance.ground) {
                                this.y = zj.Gmgr.Instance.ground;
                            }
                        }
                        scene.updateTeamMap(0, y);
                    }
                    else {
                        this.y = this.y - y;
                        var tmpY = zj.Gmgr.Instance.floor + (this.floor - zj.Gmgr.Instance.ground);
                        if (Math.floor(this.y) < Math.floor(tmpY)) {
                            this.y = tmpY;
                            zj.Gmgr.Instance.floor = zj.Gmgr.Instance.ground;
                        }
                    }
                }
            }
            else {
                this.y = this.y - y;
            }
        };
        /*设置坐标x*/
        StageRole.prototype.setPosX = function (x) {
            // body
            this.setPos(x, this.y);
        };
        /*设置坐标y*/
        StageRole.prototype.setPosY = function (y) {
            // body
            this.setPos(this.x, y);
        };
        /*设置是否隐藏*/
        StageRole.prototype.setVisible = function (tag) {
            // body  
            this.bVisible = tag;
            if (this.body != null) {
                this.body.setVisibleSpx(tag);
            }
            if (this.haloFront != null) {
                this.haloFront.setVisible(tag);
            }
            if (this.haloBack != null) {
                this.haloBack.setVisible(tag);
            }
            if (this.shadow != null) {
                this.shadow.visible = tag;
            }
            // if (this.nodeFollow != null) {
            //     this.nodeFollow.visible = tag
            // }
            /*
            if( this.nodeBuff != null ){
                this.nodeBuff.setVisible(tag)
            }
            */
        };
        /*获得人物hp*/
        StageRole.prototype.getHp = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.attribs.curHp;
        };
        //获得人物技能cd
        StageRole.prototype.getPressCdTime = function () {
            var skill = this.getPressSkill();
            if (skill != null) {
                var cd = zj.SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.getTime();
                }
            }
            return 0;
        };
        /*获得人物最大hp*/
        StageRole.prototype.getMaxHp = function (bPdh) {
            var self = this;
            self.CheatCheckSumAttr(null);
            var value = self.attribs.maxHp;
            var results = self.handleTalentEffect_ProtoToProto();
            value = value + results[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP];
            var _a = self.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null), bAttribAdd = _a[0], addValue = _a[1];
            var _b = self.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null), bAttribCut = _b[0], cutValue = _b[1];
            var livingPerson = self.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP);
            var extra = (addValue - cutValue + livingPerson) / 100;
            var _c = self.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null), baseAddValue = _c[1];
            var _d = self.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, null, null), baseCutValue = _d[1];
            var baseByFaction = self.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP);
            var baseByFightType = self.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP);
            var baseByFeature = self.handleTalentEffect_ProHurtByFeature(self.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP);
            var baseByDiff = self.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP);
            var base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + self.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_HP]) / 100;
            var numValue = value;
            if (self.isPerson()) {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                var real = value * percent + (self.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_HP]) * base + self.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP] - zj.yuan3(bPdh != null, self.pdhValue, 0);
                if (real <= 0) {
                    real = 1;
                }
                numValue = real;
            }
            else {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                var real = value * percent + self.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP] - zj.yuan3(bPdh != null, self.pdhValue, 0);
                if (real <= 0) {
                    real = 1;
                }
                numValue = real;
            }
            return numValue;
        };
        StageRole.prototype.recordHpPer = function () {
            var self = this;
            self.preHpPer = self.getHp() / zj.yuan3(self.bEnemy, self.attribs.maxHp, self.getMaxHp());
            if (self.preHpPer >= 1.0) {
                self.preHpPer = 1.0;
            }
        };
        StageRole.prototype.appearFight = function (args) {
            this.bStartFight = true;
            this.loadEntireTalent();
            this.appearSpeical();
            //触发战斗开始天赋，如剑魂
            this.loadFightAppear();
        };
        //战斗开始时触发
        StageRole.prototype.loadFightAppear = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_APPEAR];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
            t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    talent.is_reset = true;
                }
            }
        };
        StageRole.prototype.appearSpeical = function () {
            this.loadEveryBody();
        };
        StageRole.prototype.loadEveryBody = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_EVERY_BODY];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        };
        //加载全局天赋
        StageRole.prototype.loadEntireTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ALL_FIGHT];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.startFight = function () {
            //热血猎人删除
            //this.startSpecial();
            this.triggerFightStart();
            this.setHp(this.preHpPer * this.getMaxHp());
            this.openRoleDcUI();
            this.debugPrint = 1;
        };
        //战斗开始入场触发
        StageRole.prototype.triggerFightStart = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    talent.is_reset = true;
                }
            }
            t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_FIRST];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    talent.is_reset = true;
                }
            }
        };
        StageRole.prototype.procOtherRun = function (tick) {
            var self = this;
            // body 
            var rt = tick * 1000;
            if (self.fightScene.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT && self.fightScene.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG) {
                if (self.bEnemy == false) {
                    if (self.runState == zj.TableEnum.TableRunStage.STAGE_RUN_END) {
                        return true;
                    }
                    //let fightScene = StageSceneManager.GetCurScene()   
                    var dis = self.moveSpeed * rt;
                    var runDis = self.runDis + dis;
                    var borderDis = 0;
                    if (self.fightScene.monsterStage == zj.TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                        //borderDis = (FightDistanceConfig.A / fightScene.groundScale + FightDistanceConfig.Appear_Left_Mid_X * (1-fightScene.groundScale))        
                        borderDis = zj.FightDistanceConfig.A;
                    }
                    else {
                        //borderDis = (FightDistanceConfig.B / fightScene.groundScale + FightDistanceConfig.Appear_Left_Mid_X * (1-fightScene.groundScale))        
                        borderDis = zj.FightDistanceConfig.B;
                    }
                    if (self.runState == zj.TableEnum.TableRunStage.STAGE_RUN_ONE) {
                        if (self.fightScene.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_1ST) {
                            var x = Math.abs(self.fightScene.cameraX) + zj.UIManager.StageWidth / (self.fightScene.groundScale) * zj.FightDistanceConfig.Touch_Ratio;
                            if (self.x >= Math.abs(self.fightScene.cameraX) + zj.UIManager.StageWidth / (self.fightScene.groundScale) * zj.FightDistanceConfig.Touch_Ratio && self.fightScene.cameraTouch == false) {
                                self.fightScene.openRunCamera(self);
                            }
                        }
                        else {
                            var x = zj.UIManager.StageWidth / (self.fightScene.groundScale) * zj.FightDistanceConfig.Touch_Ratio;
                            if (self.x >= zj.UIManager.StageWidth / (self.fightScene.groundScale) * zj.FightDistanceConfig.Touch_Ratio && self.fightScene.cameraTouch == false) {
                                self.fightScene.openRunCamera(self);
                            }
                        }
                    }
                    else if (self.runState == zj.TableEnum.TableRunStage.STAGE_RUN_TWO) {
                        // todo       
                    }
                    if (runDis > borderDis) {
                        self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                        self.runState = zj.TableEnum.TableRunStage.STAGE_RUN_END;
                        dis = borderDis - self.runDis;
                    }
                    self.runDis = self.runDis + dis;
                    self.moveMap(dis, 0);
                    self.setPosX(self.x);
                }
            }
            else {
                if (self.bEnemy == false) {
                    /*左边玩家*/
                    // 补位
                    var dis = self.moveSpeed * rt;
                    var runDis = 0;
                    if (self.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                        runDis = self.x + dis;
                        if (runDis > self.teamOriginalX) {
                            self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                            dis = self.teamOriginalX - self.x;
                            // 区分补位和归位
                            if (self.bStartFight == false) {
                                self.recordHpPer();
                                self.appearFight();
                                self.startFight();
                            }
                        }
                        self.moveMap(dis, 0);
                        // 消失 
                    }
                    else if (self.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                        runDis = self.x - dis;
                        if (runDis < -50) {
                            self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                            self.setVisible(false);
                        }
                        self.moveMap(-dis, 0);
                    }
                    self.setPos(self.x, self.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
                }
                else {
                    // 补位
                    /*右边玩家*/
                    var dis = self.moveSpeed * rt;
                    var runDis = 0;
                    if (self.dir == zj.TableEnum.TableEnumDir.Dir_Left) {
                        if (self.bGoGutPos) {
                            runDis = self.x - dis;
                            if (runDis < self.teamOriginalX) {
                                self.bGoGutPos = false;
                                self.fightScene.monsterGutEnd(self);
                                self.changeDir(zj.TableEnum.TableEnumDir.Dir_Left, true);
                                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                            }
                        }
                        else {
                            runDis = self.x - dis;
                            if (runDis < self.teamOriginalX) {
                                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                                dis = self.x - self.teamOriginalX;
                                // 区分补位和归位
                                if (self.bStartFight == false) {
                                    self.recordHpPer();
                                    self.appearFight();
                                    self.startFight();
                                }
                            }
                        }
                        self.moveMap(-dis, 0);
                        // 消失
                    }
                    else if (self.dir == zj.TableEnum.TableEnumDir.Dir_Right) {
                        runDis = self.x + dis;
                        if (self.bGoGutPos) {
                            if (runDis > self.teamOriginalX) {
                                dis = self.teamOriginalX - self.x;
                                self.bGoGutPos = false;
                                self.fightScene.monsterGutEnd(self);
                                self.changeDir(zj.TableEnum.TableEnumDir.Dir_Left, true);
                                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                            }
                        }
                        else {
                            if (runDis > zj.UIManager.StageWidth / self.fightScene.groundScale + 50) {
                                self.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                                self.setVisible(false);
                            }
                        }
                        self.moveMap(dis, 0);
                    }
                    self.setPos(self.x, self.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
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
            return false;
        };
        StageRole.prototype.setPositionType = function (eType) {
            // body
            this.ePosition = eType;
        };
        /*设置真实人物id*/
        StageRole.prototype.setRoleId = function (id) {
            // body
            this.roleId = id;
        };
        /*设置baseGeneralId*/
        StageRole.prototype.setGeneralId = function (id) {
            this.generalId = id;
        };
        StageRole.prototype.setOrderPos = function (orderPos) {
            // body
            this.orderPos = orderPos;
        };
        StageRole.prototype.setTeamNum = function (eNum) {
            // body
            this.eTeamNum = eNum;
        };
        /*人物是否是敌人*/
        StageRole.prototype.setIsEnemy = function (tag) {
            // body
            this.bEnemy = tag;
        };
        StageRole.prototype.isSupport = function () {
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return true;
            }
            else {
                return false;
            }
        };
        StageRole.prototype.creatEntryCd = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var pressSkill = this.getPressSkill();
            if (pressSkill != null) {
                zj.SkillCdMgr.Instance.addSkillCd(this, pressSkill, true);
                this.pressCd = zj.SkillCdMgr.Instance.getCurCd(pressSkill);
            }
        };
        /*获得人物按键技能*/
        StageRole.prototype.getPressSkill = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.tableSkills[zj.adjustIndex(1)];
        };
        StageRole.prototype.setRoleInfo = function (roleInfo) {
            // body
            this.roleInfo = roleInfo;
        };
        /*保存人物信息MD5*/
        StageRole.prototype.SaveData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            /*
            this.myData = this.CreateData()
            */
        };
        StageRole.prototype.SetAttrib = function (attribName, attribVal) {
            var self = this;
            if ((self.attribs[attribName] == null)) {
                //console.log("attrib " + attribName + " is illegal")
                console.assert(false);
            }
            self.attribs[attribName] = attribVal;
            self.SaveData();
        };
        StageRole.prototype.loadModelDB = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body	
            var instance = zj.TableMapRole.Item(this.mapRoleId);
            this.profession = instance.model_profession;
            this.sex = instance.model_sex;
            this.eyePath = instance.eye_head;
            this.talentEyePath = instance.eye_talent;
            this.hurtNumPosX = instance.hurt_num_pos[zj.adjustIndex(1)];
            this.hurtNumPosY = instance.hurt_num_pos[zj.adjustIndex(2)];
            this.hurtNumOffsetNorX = instance.hurt_num_offset_nor[zj.adjustIndex(1)];
            this.hurtNumOffsetNorY = instance.hurt_num_offset_nor[zj.adjustIndex(2)];
            this.hurtNumOffsetSpeX = instance.hurt_num_offset_spe[zj.adjustIndex(1)];
            this.hurtNumOffsetSpeY = instance.hurt_num_offset_spe[zj.adjustIndex(2)];
            this.hitEffectOffsetNorX = instance.hit_effect_offset_nor[zj.adjustIndex(1)];
            this.hitEffectOffsetNorY = instance.hit_effect_offset_nor[zj.adjustIndex(2)];
            this.hitEffectOffsetSpeX = instance.hit_effect_offset_spe[zj.adjustIndex(1)];
            this.hitEffectOffsetSpeY = instance.hit_effect_offset_spe[zj.adjustIndex(2)];
            this.roleAniOffsetNorUpX = instance.role_ani_offset_nor_up[zj.adjustIndex(1)];
            this.roleAniOffsetNorUpY = instance.role_ani_offset_nor_up[zj.adjustIndex(2)];
            this.roleAniOffsetSpeUpX = instance.role_ani_offset_spe_up[zj.adjustIndex(1)];
            this.roleAniOffsetSpeUpY = instance.role_ani_offset_spe_up[zj.adjustIndex(2)];
            this.offsetNorMidX = instance.offset_nor_mid[zj.adjustIndex(1)];
            this.offsetNorMidY = instance.offset_nor_mid[zj.adjustIndex(2)];
            var tableSound = zj.TableClientSoundResource.Table();
            var sound_id = instance.press_xuli_effect_sound;
            if (sound_id != -1) {
                this.press_sound_path = tableSound[sound_id].sound_path;
            }
            sound_id = instance.kill_xuli_effect_sound;
            if (sound_id != -1) {
                this.kill_sound_path = tableSound[sound_id].sound_path;
            }
        };
        /*处理命中特效*/
        StageRole.prototype.procHitEffects = function (tick) {
            // body	
            var list = this.tableHits;
            var i = 0;
            while (i < list.length) {
                var tEffect = list[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    list.splice(i, 1);
                }
                else {
                    tEffect.update(tick);
                    i++;
                }
            }
        };
        StageRole.prototype.updateSpineX = function (tick) {
            // body
            // if (this.body != null) {
            //     this.body.UpdataAni(tick)
            // }
        };
        StageRole.prototype.updateEndBody = function (tick) {
            // body    
            var self = this;
            if (self.bBodyActEnd == true) {
                return;
            }
            if (self.body.IsActEnd()) {
                self.bBodyActEnd = true;
            }
        };
        /*设置透明度*/
        StageRole.prototype.setTrans = function (trans) {
            // body
            if (this.body != null) {
                this.body.spine.armature.display.alpha = trans / 255;
            }
        };
        StageRole.prototype.procTran = function (args) {
            // body
            this.disappearTran = this.disappearTran - 10;
            if (this.disappearTran < 0) {
                this.disappearTran = 0;
            }
            this.setTrans(this.disappearTran);
        };
        StageRole.prototype.procDisappear = function (tick) {
            // body
            if (this.bDisappear == false) {
                return;
            }
            //StageRoleMob.procTran(this, tick)
            this.procDisappearCall();
        };
        StageRole.prototype.procDisappearCall = function () {
            if (this.disappearTran <= 100) {
                this.bDisappear = false;
                this.bCanRemove = true;
            }
        };
        /*处理特效*/
        StageRole.prototype.procEffects = function (tick) {
            // body	
            var self = this;
            var i = zj.adjustIndex(1);
            while (i < self.tableEffects.length) {
                self.tableEffects[i].update(tick);
                i = i + 1;
            }
            i = zj.adjustIndex(1);
            while (i < self.tableEffects.length) {
                var tEffect = self.tableEffects[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    self.tableEffects.splice(i, 1);
                }
                else {
                    i = i + 1;
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
        };
        StageRole.prototype.cleanDisplacement = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.DISPLACEMENT.id = -1;
            this.DISPLACEMENT.speed_x = 0;
            this.DISPLACEMENT.speed_y = 0;
            this.DISPLACEMENT.aspeed_x = 0;
            this.DISPLACEMENT.aspeed_y = 0;
            this.DISPLACEMENT.aspeed_time = 0;
            this.DISPLACEMENT.continue_time = 0;
            this.bezierDisplacementId = -1;
        };
        /*处理命中位移*/
        StageRole.prototype.procHitedDisplacement = function (tick) {
            var self = this;
            // body
            var rt = tick * 1000;
            if (self.DISPLACEMENT.id <= 0) {
                return;
            }
            if (self.DISPLACEMENT.aspeed_time > 0) {
                var tmpAccTime = rt;
                self.DISPLACEMENT.aspeed_time = self.DISPLACEMENT.aspeed_time - rt;
                if (self.DISPLACEMENT.aspeed_time < 0) {
                    tmpAccTime = tmpAccTime + self.DISPLACEMENT.aspeed_time;
                }
                self.DISPLACEMENT.speed_x = self.DISPLACEMENT.speed_x + self.DISPLACEMENT.aspeed_x * tmpAccTime;
                self.DISPLACEMENT.speed_y = self.DISPLACEMENT.speed_y + self.DISPLACEMENT.aspeed_y * tmpAccTime;
                if (self.bStirUp == false) {
                    self.DISPLACEMENT.speed_y = 0;
                }
            }
            var tmpSpeedTime = rt;
            self.DISPLACEMENT.continue_time = self.DISPLACEMENT.continue_time - rt;
            if (self.DISPLACEMENT.continue_time < 0) {
                tmpSpeedTime = tmpSpeedTime + self.DISPLACEMENT.continue_time;
            }
            if (self.bezierDisplacementId != -1) {
                self.moveMap(self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime);
            }
            else {
                if (self.bEnemy) {
                    self.moveMap(self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime);
                }
                else {
                    self.moveMap(-self.DISPLACEMENT.speed_x * tmpSpeedTime, self.DISPLACEMENT.speed_y * tmpSpeedTime);
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
            if (self.x < zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[zj.adjustIndex(4)]) {
                self.x = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[zj.adjustIndex(4)];
            }
            if (self.x > zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[zj.adjustIndex(4)]) {
                self.x = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[zj.adjustIndex(4)];
            }
            self.setPosX(self.x);
            if (self.DISPLACEMENT.continue_time <= 0) {
                self.cleanDisplacement();
            }
        };
        /*修改人物状态*/
        StageRole.prototype.changeSpecialState = function (splState, times) {
            // body
            if (splState < this.specialState && this.specialTimes > 0) {
                return;
            }
            //assert( splState >= TableEnumSpecialState.SpecialState_None and splState <= TableEnumSpecialState.SpecialState_Super)
            this.specialState = splState;
            this.specialTimes = times;
        };
        /*每帧检测特殊状态*/
        StageRole.prototype.procSpecialState = function (tick) {
            // body
            var self = this;
            var rt = tick * 1000;
            if (self.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_None) {
                //null
            }
            else if (self.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_NoBreak) {
                if (self.specialTimes != -1) {
                    self.specialTimes = self.specialTimes - rt;
                    if (self.specialTimes <= 0) {
                        self.specialTimes = 0;
                        self.changeSpecialState(self.initSpecialState, -1);
                    }
                }
            }
            else if (self.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_Super || self.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_GetUp_Super) {
                if (self.specialTimes != -1) {
                    self.specialTimes = self.specialTimes - rt;
                    if (self.specialTimes <= 0) {
                        self.specialTimes = 0;
                        self.changeSpecialState(self.initSpecialState, -1);
                    }
                }
            }
        };
        /*处理数字特效*/
        StageRole.prototype.procNumbers = function (tick) {
            var self = this;
            // body	
            var i = zj.adjustIndex(1);
            while (i < self.tableNumbers.length) {
                var tNumber = self.tableNumbers[i];
                var bFinish = tNumber.isFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tNumber);
                    self.tableNumbers.splice(i, 1);
                }
                else {
                    tNumber.update(tick);
                    i = i + 1;
                }
            }
        };
        StageRole.prototype.updateHpAnim = function (tick) {
            var self = this;
            tick = 0.0333;
            if (Math.floor(self.currHpValue) != Math.floor(self.getHp())) {
                self.hpAnimTick = self.hpAnimTick + tick * 1000;
                if (self.hpAnimTick >= zj.ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP) {
                    self.hpAnimTick = self.hpAnimTick - zj.ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP;
                    self.currHpValue = self.currHpValue + self.stepHpValue;
                    if (self.stepHpValue > 0) {
                        if (self.currHpValue + 0.1 > self.getHp()) {
                            self.currHpValue = self.getHp();
                        }
                    }
                    else if (self.stepHpValue < 0) {
                        if (self.currHpValue - 0.1 < self.getHp()) {
                            self.currHpValue = self.getHp();
                        }
                    }
                    if (self.stepHpValue > 0) {
                        self.setHpDc(true);
                        self.setHpGroundDc(true);
                    }
                    else if (self.stepHpValue < 0) {
                        self.setHpGroundDc(true);
                    }
                }
            }
            if (self.pdhBakeValue != self.pdhValue) {
                self.updatePermanentHp();
                self.pdhBakeValue = self.pdhValue;
            }
        };
        StageRole.prototype.getMidPos = function () {
            this.midPos.x = (this.x + this.offsetNorMidX) * this.fightScene.uiScale + this.fightScene.fightRoot.x; //正常是按0，0算的现在战斗容器Xy有变化了所以得加上这个差值,指不定还有啥地方需要加差值呢   真坑！！！！！！！
            this.midPos.y = (this.y - this.offsetNorMidY) * this.fightScene.uiScaleY + this.fightScene.fightRoot.y;
            return this.midPos;
        };
        StageRole.prototype.update = function (tick) {
            var self = this;
            self.procHitEffects(tick);
            self.updateHpAnim(tick);
            self.updateCdDc(tick);
            if (self.bPause)
                return;
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
        };
        StageRole.prototype.debugPrintAttri = function (force) {
        };
        StageRole.prototype.updateTimeTalent = function (tick) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_AUTOMATIC_TIME];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
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
        };
        StageRole.prototype.updateBloodTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BLOOD_LOW];
            var percentHpValue = this.getHp() * 100 / this.getMaxHp(true);
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
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
        };
        StageRole.prototype.beginHightLight = function () {
            this.nHightLightTick = 0;
            this.setHighLight(true);
        };
        StageRole.prototype.setHighLight = function (tag) {
            this.bHightLight = tag;
        };
        StageRole.prototype.updateHighLight = function (tick) {
            if (!this.bHightLight) {
                return;
            }
            this.nHightLightTick = this.nHightLightTick + tick * 1000;
            if (this.nHightLightTick >= zj.ConstantConfig_RoleBattle.HIGHT_LIGHT_MAX_TIME) {
                this.doBreakOther(true);
                this.endHightLight();
            }
        };
        StageRole.prototype.doBreakOther = function (tag) {
            this.fightScene.recoverFBreak(this, tag);
        };
        StageRole.prototype.endHightLight = function () {
            this.setHighLight(false);
        };
        StageRole.prototype.updateCorpse = function () {
            //僵尸怪的处理
            if (this.bDead == true && this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
        };
        StageRole.prototype.procBomb = function (tick) {
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
        };
        StageRole.prototype.loadDcBuff = function () {
            var tbl = zj.Game.PlayerBuffSystem.SetBuffLayer(this.tableBuffs);
            this.tableBuffPre = tbl;
        };
        StageRole.prototype.updateDcBuff = function () {
            var tbl = zj.Game.PlayerBuffSystem.SetBuffLayer(this.tableBuffs);
            var diff_tbl = zj.Game.PlayerBuffSystem.FindDiffer(this.tableBuffPre, tbl);
            if (diff_tbl.length != 0) {
                this.tableBuffPre = tbl;
                this.freshBuffDc(diff_tbl);
            }
        };
        StageRole.prototype.ff = function (k, v, value) {
            return value[0][0] == v.buff_type;
        };
        StageRole.prototype.freshBuffDc1 = function (tbl) {
        };
        StageRole.prototype.freshBuffDc = function (tbl) {
            var num = 0;
            // let retTbl = this.TableBuffDcUi;
            for (var k in tbl) {
                var v = tbl[k];
                var key = v[0];
                var value = v[1];
                if (value != null && value[0][0] != -1) {
                    //let [_ret] = Table.FindR(this.tableBuffs, function (k, v) {
                    // 		return value[0][0] == v.buff_type;
                    // });
                    var _ret = void 0;
                    for (var i = 0; i < this.tableBuffs.length; i++) {
                        if (this.ff(i, this.tableBuffs[i], value)) {
                            _ret = [this.tableBuffs[i], i][0];
                            break;
                        }
                    }
                    if (_ret != null) {
                        if (this.TableBuffDcUi[key] == null) {
                            var x = this.BuffLdPos.x + (key - 1) * zj.ConstantConfig_CommonBattle.dcBuffOffsetPos.x;
                            var y = -this.BuffLdPos.y;
                            var board = new eui.Image("ui_battle_buff_diban_png");
                            board.x = x;
                            board.y = y;
                            board.scaleX = board.scaleY = 0.6;
                            this.nodeDc.addChild(board);
                            this.TableBuffBoard[key] = board;
                            var pic = new eui.Image(_ret.buff_icon_path);
                            pic.x = x - 2 * 0.4;
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
                        }
                        else {
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
                }
                else {
                    if (this.TableBuffDcUi[key] != null) {
                        this.TableBuffDcUi[key].visible = false;
                    }
                    if (this.TableBuffBoard[key] != null) {
                        this.TableBuffBoard[key].visible = false;
                    }
                    // if(this.TableBuffNum[key] != null){
                    //     this.TableBuffNum[key].visible = false;
                    // }
                }
            }
        };
        StageRole.prototype.procAtkBuff = function () {
            this.bStun = false;
            this.bSilence = false;
            this.bDisarm = false;
            this.bFrozen = false;
            this.bStoned = false;
            this.bSleep = false;
            this.bImmune = false;
            for (var k in this.tableBuffs) {
                var v = this.tableBuffs[k];
                var baseType = v.getBuffBaseType();
                if (baseType == zj.TableEnum.TableBufferType.BUFFER_DIZZINESS) {
                    this.bStun = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_SILENCE) {
                    this.bSilence = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_DISARM) {
                    this.bDisarm = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_FROZEN) {
                    this.bFrozen = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_STONED) {
                    this.bStoned = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_SLEEP) {
                    this.bSleep = true;
                }
                else if (baseType == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE) {
                    this.bImmune = true;
                }
            }
        };
        StageRole.prototype.procClean = function (args) {
            var i = 0;
            while (i <= this.tableClean.length) {
                var info = this.tableClean[i];
                if (info && info.bClean == true) {
                    info.father.removeChild(info.body);
                    this.tableClean.splice(i, 1);
                    info.body = null;
                }
                else {
                    i = i + 1;
                }
            }
        };
        //[[处理buff]]
        StageRole.prototype.procBuffs = function (tick) {
            var i = 0;
            if (this.tableBuffs.length > 0) {
                while (i < this.tableBuffs.length) {
                    var tBuff = this.tableBuffs[i];
                    var bFinish = tBuff.getIsFinish();
                    if (bFinish == true) {
                        this.deleteBuff(i);
                    }
                    else {
                        tBuff.update(tick);
                        i = i + 1;
                    }
                }
            }
        };
        StageRole.prototype.deleteBuff = function (index) {
            var tBuff = this.tableBuffs[index];
            this.openFoldBuffEffect(tBuff);
            zj.CC_SAFE_DELETE(tBuff);
            this.tableBuffs.splice(index, 1);
        };
        StageRole.prototype.updateCdDc = function (tick) {
            if (this.SpriteCdBar && this.pressCd) {
                var cur = Math.floor(this.pressCd.getTime());
                var max = Math.floor(this.pressCd.getMaxTime());
                this.calcCdAnim(cur, max);
                this.updateCdAnim(tick, cur, max);
            }
        };
        StageRole.prototype.updateCdAnim = function (tick, cur, max) {
            if (Math.floor(this.currCdValue) != Math.floor(cur)) {
                this.cdAnimTick = this.cdAnimTick + tick * 1000;
                if (this.cdAnimTick >= zj.ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP) {
                    this.cdAnimTick = this.cdAnimTick - zj.ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP;
                    this.currCdValue = Math.floor(this.currCdValue + this.stepCdValue);
                    if (this.stepCdValue > 0) {
                        if (this.currCdValue + 0.1 > cur) {
                            this.currCdValue = cur;
                        }
                    }
                    else if (this.stepCdValue < 0) {
                        if (this.currCdValue - 0.1 < cur) {
                            this.currCdValue = cur;
                        }
                    }
                }
                if (this.stepCdValue > 0) {
                    this.setCdDc(true, cur, max);
                    this.setCdLightDc(false, false, cur, max);
                }
                else if (this.stepCdValue < 0) {
                    this.setCdDc(true, cur, max);
                    this.setCdLightDc(true, true, cur, max);
                }
            }
        };
        StageRole.prototype.setCdDc = function (bGoing, real, max) {
            if (this.SpriteCdBar != null && this.pressCd != null) {
                var cur = zj.yuan3(bGoing, this.currCdValue, real);
                var size_bar = zj.getPercentSize(this.BarHpSize, 1 - cur / max);
                this.SpriteCdBar.width = size_bar.width;
            }
        };
        StageRole.prototype.setCdLightDc = function (bVisible, bGoing, real, max) {
        };
        StageRole.prototype.calcCdAnim = function (cur, max) {
            if (this.currCdValue == -1) {
                this.currCdValue = cur;
            }
            if (cur == this.currCdValue) {
                return null;
            }
            var lost = Math.abs(cur - this.currCdValue) / max * 100;
            if (lost < zj.ConstantConfig_RoleBattle.FIGHT_CD_ANIM_VALUE) {
                this.currCdValue = cur;
                this.setCdDc(false, cur, max);
                this.setCdLightDc(false, false, cur, max);
                return false;
            }
            else {
                this.stepCdValue = (cur - this.currCdValue) / (zj.ConstantConfig_RoleBattle.FIGHT_CD_ANIM_TIME / zj.ConstantConfig_RoleBattle.FIGHT_CD_ANIM_STEP);
                return true;
            }
        };
        /*设置人物当前经验*/
        StageRole.prototype.setCurExp = function (value) {
            // body
            this.curExp = value;
        };
        /*设置人物星级*/
        StageRole.prototype.setStar = function (star) {
            // body
            this.star = star;
        };
        /*设置人物阶数*/
        StageRole.prototype.setStep = function (step) {
            // body
            this.step = step;
        };
        StageRole.prototype.loadRoleData = function (roleInfo) {
            // body    
            if (roleInfo == null) {
                return;
            }
            this.setRoleInfo(roleInfo);
            this.roleId = this.roleInfo.general_id;
            this.setGeneralId(zj.PlayerHunterSystem.GetGeneralId(this.roleInfo.general_id));
            this.SetAttrib("level", this.roleInfo.level);
            this.setCurExp(this.roleInfo.exp);
            this.setStar(this.roleInfo.star);
            this.setStep(this.roleInfo.step);
        };
        StageRole.prototype.setRoleType = function (roleType) {
            this.roleType = roleType;
        };
        StageRole.prototype.CheatCheckSumAttr = function (addHp) {
            if (this.cheat_checkAttr == null) {
                return;
            }
            if (addHp == null) {
                addHp = 0;
            }
            this.cheat_checkAttr = this.cheat_checkAttr + addHp;
            var today = egret.getTimer();
            if (today - this.cheat_checkTime < 1) {
                return;
            }
            this.cheat_checkTime = today;
            var curAttr = 0;
            for (var j = 0; j < zj.TableEnum.EnumAttriReal.length; j++) {
                var i = zj.TableEnum.EnumAttriReal[j];
                curAttr = curAttr + this.baseAttribs[i];
            }
            for (var k in this.attribs) {
                var v = this.attribs[k];
                if (k != "curRage") {
                    curAttr = curAttr + v;
                }
            }
            var diff_value = Math.abs(curAttr - this.cheat_checkAttr);
            var range = diff_value / this.cheat_checkAttr;
            if (diff_value > this.cheat_diffvalue) {
                this.cheat_diffvalue = diff_value;
                this.cheat_range = range;
                // if (range > 0.01) { //&& Device.isDebug
                //GameCommon:ShowMessage(string.format("catch you! diffValue = %.2f  range = %.2f", this.cheat_diffvalue, this.cheat_range), false);
                // }
            }
        };
        StageRole.prototype.setHpDc = function (bGoing) {
            if (this.SpriteHpBlood != null) {
                var cur = zj.yuan3(bGoing, this.currHpValue, this.getHp());
                var maxHp = this.getMaxHp();
                var size_bar = zj.getPercentSize(this.BarHpSize, cur / maxHp);
                this.SpriteHpBlood.width = size_bar.width;
            }
        };
        StageRole.prototype.setHpGroundDc = function (bGoing) {
            if (this.SpriteHpBloodGround != null) {
                var cur = zj.yuan3(bGoing, this.currHpValue, this.getHp());
                var maxHp = this.getMaxHp();
                var size_bar = zj.getPercentSize(this.BarHpSize, cur / maxHp);
                this.SpriteHpBloodGround.width = size_bar.width;
                //let rect = new eui.Rect(1, 1);
                //this.nodeDc.addChildAt(rect, 11);
                //this.SpriteHpBloodGround.mask = rect;
            }
        };
        StageRole.prototype.calcHpAnim = function () {
            if (this.currHpValue == -1) {
                this.currHpValue = this.getHp();
                this.setHpDc(false);
                this.setHpGroundDc(false);
            }
            if (this.getHp() == this.currHpValue) {
                return;
            }
            var lost = Math.abs(this.getHp() - this.currHpValue) / this.getMaxHp() * 100;
            if (lost < zj.ConstantConfig_RoleBattle.FIGHT_HP_ANIM_VALUE) {
                this.currHpValue = this.getHp();
                this.setHpDc(false);
                this.setHpGroundDc(false);
            }
            else {
                this.stepHpValue = (this.getHp() - this.currHpValue) / (zj.ConstantConfig_RoleBattle.FIGHT_HP_ANIM_TIME / zj.ConstantConfig_RoleBattle.FIGHT_HP_ANIM_STEP);
                if (this.stepHpValue < 0) {
                    this.setHpDc(false);
                }
            }
        };
        /*修改人物HP*/
        StageRole.prototype.setHp = function (hp) {
            // body
            var maxHp = this.getMaxHp(true);
            if (hp > maxHp) {
                hp = maxHp;
            }
            if (hp < 0) {
                hp = 0;
            }
            var tmpHp = hp - this.getHp();
            this.SetAttrib("curHp", hp);
            this.CheatCheckSumAttr(tmpHp);
            //this.setHpDc()
            this.calcHpAnim();
            //this.updatePermanentHp()
            //this.calcPermanentHp()    
        };
        StageRole.prototype.setCamp = function (eType) {
            // body
            this.eCamp = eType;
        };
        /*设置地板高度*/
        StageRole.prototype.setFloor = function (h) {
            // body
            this.floor = h;
        };
        StageRole.prototype.setTeamCoord = function (x, y) {
            // body
            this.teamOriginalX = x;
            this.teamOriginalY = y;
        };
        StageRole.prototype.setAppearStage = function (stage) {
            // body
            this.eAppearStage = stage;
        };
        StageRole.prototype.setInitDir = function (dir) {
            this.initDir = dir;
        };
        /*设置缩放比例*/
        StageRole.prototype.setScale = function (scale) {
            // body
            this.scale = scale;
            if (this.body != null) {
                this.body.SetScale(scale);
            }
        };
        /*改变人物状态1*/
        StageRole.prototype.changeState = function (state) {
            // body
            if (this.state == zj.TableEnum.TableEnumBaseState.State_Sprint) {
                this.sprintDistance = 0;
            }
            if (this.state != state) {
                this.state = state;
            }
        };
        StageRole.prototype.commonCreateRole = function (eCamp, floor, x, y, dir, appearStage, scale) {
            this.loadSpxData();
            this.setCamp(eCamp);
            this.setFloor(floor);
            this.setPos(x, y);
            this.setTeamCoord(x, y);
            this.setAppearStage(appearStage);
            this.creatAi(-1);
            this.setInitDir(dir);
            this.changeDir(dir, false);
            this.setScale(zj.TableMapRole.Item(this.mapRoleId).body_scale * scale);
            this.setFlipX(zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, false, true));
            this.changeAction(zj.TableEnum.TableEnumOtherState.OtherState_Stand);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
            this.enterBtl();
            //this.procState(0)
        };
        //[[获得速度值]]
        StageRole.prototype.getCdSpeed = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.cdSpeed;
            var results = this.handleTalentEffect_ProtoToProto();
            value = value + results[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null), bAttribAdd = _a[0], addValue = _a[1];
            var _b = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null), bAttribCut = _b[0], cutValue = _b[1];
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var extra = (addValue - cutValue + livingPerson + loseHpToProto) / 100;
            var _c = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null), a = _c[0], baseAddValue = _c[1];
            var _d = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, null, null), b = _d[0], baseCutValue = _d[1];
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED);
            var base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED]) / 100;
            if (this.isPerson()) {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                var real = value * percent + (this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED]) * base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
            else {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                var real = value * percent + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        };
        StageRole.prototype.isWeeking = function () {
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_EnterWeek
                || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Weeking
                || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_ExitWeek) {
                return true;
            }
            return false;
        };
        StageRole.prototype.isActivityBoss = function () {
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                return true;
            }
            return false;
        };
        StageRole.prototype.checkBuffLegeal = function (args) {
            // body   
            // 眩晕
            if (this.bStun == true) {
                return false;
            }
            // 冰冻
            if (this.bFrozen == true) {
                return false;
            }
            // 石化 
            if (this.bStoned == true) {
                return false;
            }
            // 睡眠
            if (this.bSleep == true) {
                return false;
            }
            // 沉默
            if (this.bSilence == true) {
                return false;
            }
            return true;
        };
        StageRole.prototype.isPlaySkillLegeal = function (args) {
            // body
            if (this.bPauseBlack == true) {
                return false;
            }
            // buff 
            if (this.checkBuffLegeal() == false) {
                return false;
            }
            var isFloor = this.getIsOnFloor();
            if ((this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Parry) && !isFloor) {
                return false;
            }
            // state
            if (!(this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Parry)) {
                return false;
            }
            // state
            /*
            if( this.otherState != TableEnumOtherState.OtherState_None and this.otherState != TableEnumOtherState.OtherState_Attack ){
                return false
            }
            */
            if (this.is_flashing == true) {
                return false;
            }
            if (this.is_breakMoving == true) {
                return false;
            }
            // floor
            /*
            if( this.getIsOnFloor() == false ){
                return false
            }
            */
            return true;
        };
        /*设置当前技能*/
        StageRole.prototype.setCurSkill = function (sType, index) {
            // body
            if (this.bDead == true || this.bMomentDead == true) {
                return false;
            }
            if (this.isWeeking()) {
                return false;
            }
            if (this.isActivityBoss()) {
                return false;
            }
            if (this.isPlaySkillLegeal() == false) {
                return false;
            }
            var tSkill = null;
            var tIndex = 0;
            if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                var tableSize = this.tableCommons.length;
                if (index > tableSize) {
                    return false;
                }
                var skillSize = this.tableCommons[index].getSkillSize();
                if (skillSize == 0) {
                    return false;
                }
                tIndex = index;
                tSkill = this.tableCommons[index];
            }
            else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                var tableSize = this.tableSkills.length;
                if (index > tableSize) {
                    return false;
                }
                var skillSize = this.tableSkills[index].getSkillSize();
                if (skillSize == 0) {
                    return false;
                }
                tIndex = index;
                tSkill = this.tableSkills[index];
            }
            else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                var tableSize = this.tableDeaths.length;
                if (index > tableSize) {
                    return false;
                }
                var skillSize = this.tableDeaths[index].getSkillSize();
                if (skillSize == 0) {
                    return false;
                }
                tIndex = index;
                tSkill = this.tableDeaths[index];
            }
            // 是否受一些buff的控制
            var damage = tSkill.getSkillDamageType();
            //  缴械 物理技能无法使用
            if (damage == message.EDamageType.DAMAGE_TYPE_PHY && this.bDisarm == true) {
                return false;
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
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                if (this.curSkill != null) {
                    if (tSkill.getSkillOrder() <= this.curSkill.getSkillOrder()) {
                        return false;
                    }
                }
            }
            // 豆子检测
            // if( SkillCdMgr.Instance.isSkillExit(tSkill) == true ){
            // wu zhi 7这里临时注释掉
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE && this.pressCd != null && this.pressCd.IsFinish() == false && this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                if (this.eCamp == zj.TableEnum.TableCampType.CAMP_TYPE_MY) {
                    scene.playTip(zj.TableEnum.TableEnumFightTip.TIP_CD, this.eTeamNum);
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
            this.curSkillIdx = tIndex;
            this.curSkill = tSkill;
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
            return true;
        };
        StageRole.prototype.skillFollow = function (sType, index) {
            //战斗技能唯一识别码改变
            zj.Gmgr.Instance.atomicVary();
            this.curSkill.setVaryCode(zj.Gmgr.Instance.getAtomic());
            this.gnrTargetStill();
            if (zj.Gmgr.Instance.bReplay == false && this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                var skillAction = _creatSkillAction(this.fightScene.getTiming(), sType, index, this.curSkill.getVaryCode());
                this.actions.skillInfos.push(skillAction);
            }
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                if (this.pressCd != null) {
                    this.pressCd.openNext();
                    this.pressCd.setIsFinish(false);
                }
            }
            //必杀技特效
            if ((this.bEnemy == false || zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) && sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                var soundID = zj.TableMapRole.Item(this.mapRoleId).bisha_dub_sound;
                zj.Helper.EftByID(soundID);
            }
            //怒气增加
            this.skillMakeRage(sType);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Attack);
            // 播放技能归位
            //this.backHoming()
            //this.backSkillPos()
            this.curSkill.playRoleSkill();
            //this.playSkillExtraEffect();
            //触发天赋
            this.enemyTriggerWhenSupportSkill();
            this.enemyTriggerWhenMyRelSkill(zj.yuan3(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillDamageTalent(zj.yuan3(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillTypeTalent(this.curSkill, zj.yuan3(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillFirst(this.curSkill, zj.yuan3(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillIntervalNum(this.curSkill, zj.yuan3(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, message.ESkillType.SKILL_TYPE_HANDLE, this.curSkill.getSkillType()));
            this.triggerRelSkillBeLowBlood(this.curSkill);
            //这里是移动队列 
            if (this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL && this.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
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
                }
                else if (this.bEnemy == true) {
                    this.fightScene.rightAiCd = this.tableSkillAi[sType].delayTime;
                }
                if (this.tableSkillAi[sType].aiType == zj.TableEnum.TableSkillAiType.TYPE_SKILLAI_BREAK) {
                    this.fightScene.setOppAiSkillTag(this.bEnemy);
                }
            }
            //额外效果
            this.skillExtraFun(sType);
        };
        StageRole.prototype.skillMakeRage = function (skillType) {
            if (skillType == message.ESkillType.SKILL_TYPE_COMMON) {
                //技能增加怒气
                var value = this.handleTalentEffect_GetRage();
                var r_value = this.handleTalentEffect_ReduceRage();
                var p = 100 + value - r_value;
                if (p <= 0) {
                    p = 0;
                }
                var tmp = this.getRageAddValue(EGetRageWay.Way_Common) * p / 100;
                this.dealRecRage(tmp);
            }
            else if (skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
                //技能增加怒气
                var value = this.handleTalentEffect_GetRage();
                var r_value = this.handleTalentEffect_ReduceRage();
                var p = 100 + value - r_value;
                if (p <= 0) {
                    p <= 0;
                }
                var tmp = this.getRageAddValue(EGetRageWay.Way_Skill) * p / 100;
                this.dealRecRage(tmp);
            }
        };
        StageRole.prototype.gnrTargetStill = function () {
            if (this.curSkill != null) {
                this.curSkill.targetStill();
            }
        };
        StageRole.prototype.enemyTriggerWhenSupportSkill = function () {
            if (!(this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP)) {
                return;
            }
            if (this.bEnemy) {
                for (var k in this.fightScene.tableAllys) {
                    var v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemySupportSkill();
                    }
                }
            }
            else {
                for (var k in this.fightScene.tableEnemys) {
                    var v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemySupportSkill();
                    }
                }
            }
        };
        StageRole.prototype.enemyTriggerWhenMyRelSkill = function (skillType) {
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            if (this.bEnemy) {
                for (var k in this.fightScene.tableAllys) {
                    var v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyRelSkillDamageTalent(skillType);
                    }
                }
            }
            else {
                for (var k in this.fightScene.tableEnemys) {
                    var v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyRelSkillDamageTalent(skillType);
                    }
                }
            }
        };
        //释放物理类或法术类时触发
        StageRole.prototype.triggerRelSkillDamageTalent = function (skillType) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_DAMAGE];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || zj.Table.FindK(talent.trigger_condition, skillType) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        //释放技能区间触发（自动技、主动技、必杀技, -1为所有)
        StageRole.prototype.triggerRelSkillTypeTalent = function (skill, skillType) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_TYPE];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
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
        };
        //第一次释放技能时（自动技、主动技、必杀技, -1为所有)
        StageRole.prototype.triggerRelSkillFirst = function (skill, skillType) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_FIRST];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.is_reset == true && (talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1)) {
                        talent.is_reset = false;
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        //间隔多少次释放技能时触发（自动技、主动技、必杀技, -1为所有)
        StageRole.prototype.triggerRelSkillIntervalNum = function (skill, skillType) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_INTERVAL_NUM];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
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
        };
        //释放技能区间(血量低于X%时)
        StageRole.prototype.triggerRelSkillBeLowBlood = function (skill) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RELEASE_SKILL_BLOOD_LOW];
            if (t == null || t.length == 0) {
                return;
            }
            var percentHpValue = this.getHp() * 100 / this.getMaxHp(true);
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                if (percentHpValue < talent.trigger_condition[0]) {
                    if (talent.isTouch() == true) {
                        skill.addKeepingTalent(talent);
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        };
        //敌方释放物理类或法术类时触发
        StageRole.prototype.triggerEnemyRelSkillDamageTalent = function (skillType) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_RELEASE_SKILL_DAMAGE];
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(skillType) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.skillExtraFun = function (sType) {
        };
        StageRole.prototype.playSkill = function (sType, index) {
            // body 
            if (this.setCurSkill(sType, index) == true) {
                // 减豆
                this.skillFollow(sType, index);
                return true;
            }
            return false;
        };
        StageRole.prototype.playCommonAtk = function (index) {
            return this.playSkill(message.ESkillType.SKILL_TYPE_COMMON, index);
        };
        StageRole.prototype.playSkillAtk = function (index) {
            // body
            return this.playSkill(message.ESkillType.SKILL_TYPE_HANDLE, index);
        };
        StageRole.prototype.playDeathAtk = function (index) {
            return this.playSkill(message.ESkillType.SKILL_TYPE_DEATH, index);
        };
        /*获得人物坐标x*/
        StageRole.prototype.getPosX = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.x;
        };
        /*获得人物坐标y*/
        StageRole.prototype.getPosY = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.y;
        };
        //[[获得人物bodySpx]]
        StageRole.prototype.getBodySpx = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            //   body
            return this.body;
        };
        //获得人物朝向
        StageRole.prototype.getDir = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.dir;
        };
        /*获得释放技能速度*/
        StageRole.prototype.getPlayActionSpeed = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            //let speedDown = this.getBuffSpeedDown()
            //let speedUp = this.getBuffSpeedUp()
            //let actionSpeed = this.actSpeed * (1 - speedDown + speedUp)
            return this.actSpeed;
        };
        /*获得人物缩放比例*/
        StageRole.prototype.getScale = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.scale;
        };
        /*获得人物随身是否存在effect*/
        StageRole.prototype.getIsEffectFollowMe = function (effect) {
            // body
            //assert( effect != null )
            var tag = false;
            for (var i = zj.adjustIndex(1); i < this.tableEffects.length; i++) {
                var t = this.tableEffects[i];
                if (t == effect) {
                    tag = true;
                    break;
                }
            }
            return tag;
        };
        /*添加特效*/
        StageRole.prototype.addEffect = function (effect) {
            // body
            //assert( effect != null )	
            var follow = effect.getIsFollowRole();
            if (follow == true) {
                var tag = this.getIsEffectFollowMe(effect);
                if (tag != true) {
                    this.tableEffects.push(effect);
                }
            }
            else {
                //revert
                //this.effect.push(effect);
                var layerId = zj.Gmgr.Instance.layerId;
                if (layerId != zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                    console.assert(false);
                }
                console.log();
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                scene.addEffect(effect);
            }
        };
        /*人物是否隐藏*/
        StageRole.prototype.isVisible = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.bVisible;
        };
        StageRole.prototype.dealHitEffect = function (hitId, hitX, hitY, scale) {
            // body   
            // this.bHitedToRight 
            var hit = zj.Game.ObjectPool.getItem("SkillHit", zj.SkillHit);
            hit.setInfo(this.nodeRoot, this, hitId, scale);
            hit.setPosition(hitX, hitY);
            hit.playSpx();
            this.tableHits.push(hit);
        };
        StageRole.prototype.getHitPos = function (args) {
            // body
            var hitX = 0;
            var hitY = 0;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                hitX = this.x + this.hitEffectOffsetSpeX;
                hitY = this.y - this.hitEffectOffsetSpeY;
            }
            else {
                hitX = this.x + this.hitEffectOffsetNorX;
                hitY = this.y - this.hitEffectOffsetNorY;
            }
            return [hitX, hitY];
        };
        StageRole.prototype.dealHit = function (character, hitId, sizeTbl) {
            // body
            // 被打人物左右方
            this.bHitedToRight = zj.yuan3(this.x > character.getPosX(), true, false);
            if (hitId != -1) {
                var _a = this.getHitPos(), x = _a[0], y = _a[1];
                var scale = 1.0;
                if (sizeTbl.length > 1) {
                    scale = zj.getRandom(sizeTbl[zj.adjustIndex(1)] * 1000, sizeTbl[zj.adjustIndex(2)] * 1000) / 1000;
                }
                this.dealHitEffect(hitId, x, y, scale);
                // 被击中的声音
                /*
                if( hurt.sound_id != -1 and Gmgr.Instance.hitSoundEffectNum < ConstantConfig_Common.MaxHitSoundEffect ){
                    let name = hurt.getSoundName()
                    gmsound.playeff(name)
                    Gmgr.Instance.hitSoundEffectNum = Gmgr.Instance.hitSoundEffectNum + 1
                }
                */
            }
        };
        StageRole.prototype.shelterHurt = function () {
            var dandanBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff && dandanBuff[0]) {
                dandanBuff[0].shelterHurt();
            }
        };
        //[[获得人物当前形态行为等级]]
        StageRole.prototype.getActionPriority = function () {
            if (this.actionId < zj.ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
                var index = Math.floor(this.actionId);
                return zj.TableEnum.TableActionPriority[index].priority;
            }
            else {
                if (this.curSkill != null) {
                    return this.curSkill.getCurActionId();
                }
                else {
                    //console.log("---人物动作行为id---"+this.actionId+"---人物当前状态----"+this.otherState);
                }
            }
        };
        StageRole.prototype.checkShelter = function () {
            var dandanBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff == null || dandanBuff[0] == null) {
                return false;
            }
            return true;
        };
        StageRole.prototype.setDisplacement = function (id, sX, sY, aX, aY, aTime, cTime) {
            this.DISPLACEMENT.id = id;
            this.DISPLACEMENT.speed_x = sX;
            this.DISPLACEMENT.speed_y = sY;
            this.DISPLACEMENT.aspeed_x = aX;
            this.DISPLACEMENT.aspeed_y = aY;
            this.DISPLACEMENT.aspeed_time = aTime;
            this.DISPLACEMENT.continue_time = cTime;
        };
        StageRole.prototype.doBreak = function (tag) {
            this.doBreakUi();
            this.doBreakOther(tag);
        };
        StageRole.prototype.doContinueBreak = function () {
            if (this.curSkill != null) {
                var curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.getCurAction().setContinueBreak();
                }
            }
        };
        StageRole.prototype.doSkillBreak = function () {
            if (this.curSkill != null) {
                this.curSkill.endCurSkill();
                this.curSkill.setIsFinish();
            }
        };
        StageRole.prototype.doBreakUi = function () {
            if (this.curSkill != null && (this.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH ||
                this.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_HANDLE)) {
                var arr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_BREAK);
                this.createBreakNumber(arr[0], arr[1]);
            }
        };
        StageRole.prototype.createBreakNumber = function (baseX, baseY) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.daduan);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.dealHurtState = function (priority, hurt, character) {
            var t_sx;
            var t_sy;
            if (this.bDead == true || this.bMomentDead == true) {
                return;
            }
            if (this.isWeeking()) {
                return;
            }
            this.shelterHurt();
            if (this.specialState != zj.TableEnum.TableEnumSpecialState.SpecialState_NoBreak) {
                var myPriority = this.getActionPriority();
                if (priority > myPriority) {
                    //boss硬直条处理
                    if (this.checkShelter() == true) {
                        return;
                    }
                    if (hurt != null && hurt.getAtkDisId() != -1) {
                        //设置被攻击者人物位移
                        var atkedDisId = hurt.getAtkDisId();
                        var disInfo = zj.TableClientHurtDisplacement.Item(atkedDisId);
                        if (disInfo == null) {
                            return;
                        }
                        var type = disInfo.type;
                        if (type == -1) {
                            this.cleanDisplacement();
                            t_sx = disInfo.displacement_speed[0];
                            t_sy = disInfo.displacement_speed[1];
                            var t_ax = disInfo.displacement_acceleration[0];
                            var t_ay = disInfo.displacement_acceleration[1];
                            var t_atime = disInfo.acceleration_time;
                            var t_ctime = disInfo.continue_time;
                            this.setDisplacement(atkedDisId, t_sx, t_sy, t_ax, t_ay, t_atime, t_ctime);
                        }
                        else if (type == 1) {
                            if (this.bezierDisplacementId != -1) {
                                return;
                            }
                            this.cleanDisplacement();
                            this.bezierDisplacementId = atkedDisId;
                            var ex = disInfo.end_pos[1];
                            ex = zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, Math.abs(960 - ex), ex);
                            var ey = disInfo.end_pos[2];
                            //let t_ctime = disInfo.continue_time  
                            var t_ctime = 450;
                            var t_sx_1 = (ex - this.x) / t_ctime;
                            var t_sy_1 = (ey - this.y) / t_ctime;
                            this.setDisplacement(atkedDisId, t_sx_1, t_sy_1, 0, 0, 0, t_ctime);
                        }
                        //转换再次抵抗
                        var stirAgainDef = zj.convertStirRatio(this.getFloatResis());
                        //根据受伤害状态来改变当前被打人物状态
                        var hurtAtkState = hurt.getHurtAtkState();
                        if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                            var posTag = false;
                            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && this.bFloatBreak == true) {
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
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                            }
                            else if (hurtAtkState == 0) {
                                var tmpY = zj.Gmgr.Instance.floor + (this.floor - zj.Gmgr.Instance.ground);
                                if (Math.floor(this.y) > Math.floor(tmpY)) {
                                    this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                                    //this.stirSpeedX = t_sx
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                                }
                                else {
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Hurt);
                                }
                            }
                            else if (hurtAtkState == 1) {
                                var tmpY = zj.Gmgr.Instance.floor + (this.floor - zj.Gmgr.Instance.ground);
                                if (Math.floor(this.y) > Math.floor(tmpY)) {
                                    this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                                }
                                else {
                                    this.stirSpeedX = 0;
                                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy);
                                }
                            }
                            else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                            if (posTag == true) {
                                this.setPos(this.x, this.y);
                            }
                        }
                        else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy) {
                            if (hurtAtkState == 0) {
                                this.refreshHurt();
                            }
                            else if (hurtAtkState == 1) {
                                this.refreshHeavyHurt();
                            }
                            else if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                            }
                            else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                        }
                        else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp) {
                            this.beHurtTimes = this.beHurtTimes + 1;
                            if (hurtAtkState == 0 || hurtAtkState == 1) {
                                this.stirUpSpeed = zj.ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED - this.beHurtTimes * stirAgainDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                            }
                            else if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef - this.beHurtTimes * stirAgainDef;
                                this.stirSpeedX = 0;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                            }
                            else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                        }
                        else if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                            this.beHurtTimes = this.beHurtTimes + 1;
                            if (hurtAtkState == 2) {
                                this.stirUpSpeed = t_sy - this.stirUpDef - this.beHurtTimes * stirAgainDef;
                                if (this.stirUpSpeed < 0) {
                                    this.stirUpSpeed = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                                ;
                            }
                            else if (hurtAtkState == 4) {
                                this.stiffTime = hurt.getHurtStiffTime() - this.attribs.stiffDef;
                                if (this.stiffTime <= 0) {
                                    this.stiffTime = 0;
                                }
                                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Static);
                            }
                            this.stirSpeedX = 0;
                        }
                    }
                }
            }
            //this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Hurt)
        };
        //[[获得浮空抵抗]]
        StageRole.prototype.getFloatResis = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.floatResis;
            var addValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS, null, null);
            var cutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            //let protomeByBuffNum = this:handleTalentEffect_ProtomeByNumOfBuff(TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS)
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            var extra = (addValue[1] - cutValue[1] + livingPerson + loseHpToProto) / 100;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS);
            var base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]) / 100;
            if (this.isPerson()) {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                var real = value * percent + (this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]) * base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
            else {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                var real = value * percent + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        };
        StageRole.prototype.refreshHurt = function () {
            this.backHoming();
            this.bBodyActEnd = false;
            this.body.stopAllActions();
            this.body.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Hurt);
        };
        StageRole.prototype.refreshHeavyHurt = function () {
            this.backHoming();
            this.bBodyActEnd = false;
            this.body.stopAllActions();
            this.body.ChangeAction(zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy);
        };
        //处理闪避
        StageRole.prototype.dealDodge = function (action, character, atkType) {
            //必然命中
            var bTalentEffective = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HIT_MAX, -1, null, null);
            if (bTalentEffective[0]) {
                return false;
            }
            //检测施加者是否迷惑
            var htvExtra = 0;
            var bDamageDodge = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DODGE_DAMAGE, atkType, null, null);
            var evaExtra = 0;
            if (bDamageDodge[0] == true || zj.isParry(this.getDodgeRate(), character.getHitRate(), character, this)) {
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DODGE, -1, null, null);
                var arr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_PRESS_DODGE);
                this.createDodgeNumber(arr[0], arr[1]);
                if (this.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Parry);
                }
                return true;
            }
            return false;
        };
        //[[格挡率]]
        StageRole.prototype.getDodgeRate = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.dodgeRate;
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE];
            var addBuffValue = 0;
            var adBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ADD_BLR);
            if (adBuff[0] != null) {
                addBuffValue = adBuff[0].fir_value;
            }
            var reduceBuffValue = 0;
            var rdBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_REDUCE_BLR);
            if (rdBuff[0] != null) {
                reduceBuffValue = rdBuff[0].fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        StageRole.prototype.createDodgeNumber = function (baseX, baseY) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.shanbi);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        //[[暴击抵抗]]
        StageRole.prototype.getCritDef = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.critDef;
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        //[[敌方, 攻击类型, 伤害类型, 优先级]]
        StageRole.prototype.beHurtCommon = function (belongSkill, character, atkType, hurt, hitId, sizeTbl, priority, numX, numY, bTarget, point, effect, curAction) {
            var _this = this;
            var hurtValue = 0;
            //是否暴击
            var bCrit = false;
            var bDodge = false;
            if (hurt != null) {
                hurt.addHurtOne(this);
                //整理成通用fun        
                //任意攻击击中敌人时
                character.triggerHit(belongSkill.getSkillType());
                //受到某类攻击时(hurt产生前)
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DAMAGE_BEFORE, -1, null, null);
                //被技能攻击时触发天赋
                bDodge = this.dealDodge(curAction, character, null); //aType
                //作衰减公式处理
                var hurtProofValue_1 = hurt.getProofValue();
                if (effect != null && point != null && effect.b_decay == true) {
                    var mid = this.getMidPos();
                    var dis = zj.Helper.getTwoPointsDis(mid, point);
                    hurtProofValue_1 = (effect.decay_ratio - dis) / effect.decay_ratio * hurtProofValue_1 + hurtProofValue_1 * 0.5;
                }
                if (effect != null) {
                    effect.collisionEvent();
                }
                var skillRatioExtra = 0;
                if (belongSkill.getSkillType() == message.ESkillType.SKILL_TYPE_HANDLE || belongSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH) {
                    skillRatioExtra = (character.getAutoSkill().getRelateValue()) * (belongSkill.getSkillLevel());
                }
                var bReduceDefenceArr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_DEFENCE, atkType);
                var calceHurt = function () {
                    //A代表攻方，B代表守方
                    var O_def = _this.getDef(true);
                    var D_def = _this.getDef(false);
                    //是否忽视防御
                    var isIgDef = zj.isIgnoreDef(character.getIgnorePhydef(), character, _this);
                    //忽视防御
                    var realDef = zj.yuan3(isIgDef, D_def * (100 - zj.constdb.GetValue(zj.ConstValueEnum.CV_IGNORE_DEF)) / 100, D_def);
                    //攻击方攻击
                    var A_phyAtk = character.getAtk();
                    //防守方防御 天赋忽视防御
                    var D_phyDef = character.handleTalentEffect_IgnoreTargetDef(realDef);
                    var formulaDef = D_phyDef;
                    var ignoreDefLimitTagArr = _this.handleTalentEffect_IgnoreDefLimit();
                    if (ignoreDefLimitTagArr[0]) {
                        var difValue = D_def - D_phyDef;
                        if (difValue > 0 && difValue / D_def * 100 > ignoreDefLimitTagArr[1]) {
                            formulaDef = D_def * (100 - ignoreDefLimitTagArr[1]) / 100;
                        }
                    }
                    var reduceIgnoreDefTagArr = _this.handleTalentEffect_ReduceIgnoreDef();
                    if (reduceIgnoreDefTagArr[0]) {
                        formulaDef = (O_def - formulaDef) * (reduceIgnoreDefTagArr[1] / 100) + formulaDef;
                    }
                    //伤害值计算
                    var value = zj.hunterHurtC(A_phyAtk, formulaDef, belongSkill.getSkillHurtRatio() * 0.01, belongSkill.getHurtExtraValue(), hurtProofValue_1, character.roleId);
                    return value;
                };
                //攻方暴击率
                var A_critRate = character.getCritRate();
                //攻方暴击伤害
                var A_csd = character.getCritExtra();
                //暴击抵抗
                var D_ctr = this.getCritDef();
                //是否忽视敌方暴击抵抗
                var ignoreCritDefTagArr = character.handleTalentEffect_IgnoreCritDef();
                if (ignoreCritDefTagArr[0]) {
                    D_ctr = D_ctr * (100 - ignoreCritDefTagArr[1]) / 100;
                    if (D_ctr <= 0) {
                        D_ctr = 0;
                    }
                }
                //检测天赋是否必然暴击
                var bTalentEffective = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_MAX, -1);
                //检测是否暴击
                var bAtkTalentCritEffective = false;
                var reduceCritByAtkGroup = this.handleTalentEffect_ReduceCritByAttackGroup(character);
                if (bTalentEffective[0] || zj.isCrit(A_critRate - reduceCritByAtkGroup, D_ctr, character, this) == true) {
                    bCrit = true;
                    //被敌方暴击时
                    this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_CRIT, -1, null, null);
                    //攻方产生暴击时
                    character.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_CRIT, -1);
                    //队友产生暴击时
                    this.triggerFriendTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FRIEND_BECRIT);
                    hurtValue = calceHurt();
                    var orginVal = hurtValue;
                    hurtValue = zj.hunterCritHurt(orginVal, A_csd);
                    hurtValue = this.handleTalentEffect_CritHurtLimit(orginVal, hurtValue);
                    //降低和提升暴击伤害
                    var arr_1 = this.handleTalentEffect_CritHurt(character, hurtValue);
                    hurtValue = arr_1[0];
                    bAtkTalentCritEffective = arr_1[1];
                }
                else {
                    hurtValue = calceHurt();
                }
                //受到某种类型伤害时
                this.triggerBeAttackedByDamage();
                var bAtkTalentKeepShow = false;
                //处理天赋伤害加减
                var arr = this.keepOutTalentHurt(atkType, hurtValue, character);
                bAtkTalentKeepShow = Boolean(arr[0]);
                hurtValue = Number(arr[1]);
                //属性转伤害
                var defToRealHurt = character.handleTalentEffect_ProtoToHurt(this);
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
                var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
                hurtValue = hurtValue * ratio;
                if (bDodge) {
                    hurtValue = hurtValue * (100 - zj.constdb.GetValue(zj.ConstValueEnum.CV_DODGE_HURT)) / 100;
                }
                var beAtkedMaxHp = this.getMaxHp(true);
                //攻击时时产生hurt时触发
                character.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_HURT_BEHIND, belongSkill.getSkillType(), zj.yuan3(hurtValue > beAtkedMaxHp, beAtkedMaxHp, hurtValue));
                //被攻击时产生hurt时触发
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_HURT_BEHIND, belongSkill.getSkillType(), zj.yuan3(hurtValue > beAtkedMaxHp, beAtkedMaxHp, hurtValue), null);
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
                var showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                var right = zj.yuan3(this.getPosX() > character.getPos()[0], true, false);
                if (bAtkTalentKeepShow == true || bAtkTalentCritEffective == true) {
                    if (bCrit) {
                        var critArr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_CRIT);
                        this.createCritNum(critArr[0], critArr[1], showValue);
                    }
                    else {
                        this.creatHurtNum(numX, numY, showValue);
                    }
                }
                else {
                    if (bCrit == true) {
                        var critArr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_CRIT);
                        this.createCritNum(critArr[0], critArr[1], showValue);
                    }
                    else {
                        this.creatHurtNum(numX, numY, showValue, right);
                    }
                }
                //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!:"+hurtValue);
                //处理hp
                var curHp = this.getHp();
                var realhurt = zj.yuan3(hurtValue > curHp, curHp, hurtValue);
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
            if (hurt != null && hurt.sound_id != -1 && zj.Gmgr.Instance.hitSoundEffectNum < zj.ConstantConfig_Common.MaxHitSoundEffect) {
                zj.Helper.EftByID(hurt.sound_id);
                zj.Gmgr.Instance.hitSoundEffectNum = zj.Gmgr.Instance.hitSoundEffectNum + 1;
            }
            var bDeadArr = this.dealHurtHpZero(character, hurtValue, belongSkill.getSkillType());
            if (bDeadArr && bDeadArr[0] == true) {
                return [true, bDeadArr[1]];
            }
            if (bDodge == true) {
                return [true, bDeadArr[1]];
            }
            this.dealHurtState(priority, hurt, character);
            return [true, hurtValue];
        };
        StageRole.prototype.keepOutHurt = function (atkType, hurtValue) {
            var value = hurtValue;
            // 处理免疫
            var bImmune = false;
            var immuneOdd = 0;
            var arr = this.dealImmune(atkType, value);
            bImmune = arr[0];
            immuneOdd = arr[1];
            if (bImmune == true) {
                bImmune == true;
            }
            //处理护盾
            var bShield = false;
            var shieldOdd = 0;
            var arr1 = this.dealShield(value);
            bShield = arr1[0];
            shieldOdd = arr1[1];
            if (bShield == true) {
                value = shieldOdd;
            }
            //处理吸收
            this.dealSuck(atkType, value);
            return value;
        };
        //处理免疫(待优化)
        StageRole.prototype.dealImmune = function (damageType, hurtValue) {
            var bImmune = false;
            var value = hurtValue;
            var arr = this.commonImmune(zj.TableEnum.TableBufferType.BUFFER_PHY_IMMUNE, value);
            bImmune = arr[0];
            value = arr[1];
            if (bImmune == true && value == 0) {
                //物理全免 
            }
            else {
                arr = this.commonImmune(zj.TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE, value);
                bImmune = arr[0];
                value = arr[1];
            }
            return [bImmune, value];
        };
        StageRole.prototype.commonSuck = function (buffType, hurtValue) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            var arr = this.getBuff(buffType);
            tBuff = arr[0];
            index = arr[1];
            //无此buff吸收
            if (tBuff == null) {
                return [false, value];
            }
            if (buffType == zj.TableEnum.TableBufferType.BUFFER_PHY_SUCK || buffType == zj.TableEnum.TableBufferType.BUFFER_MAGIC_SUCK || buffType == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_SUCK) {
                tBuff.playTriggerSpx();
            }
            var maxValue = value * tBuff.fir_value;
            var buffValue = tBuff.sec_value;
            var difValue = buffValue - maxValue;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                zj.CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                var forbidden = this.getForbideRecoverValue();
                var tmp = maxValue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            }
            else {
                var forbidden = this.getForbideRecoverValue();
                var tmp = buffValue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            }
        };
        //[[是否存在禁止恢复buff，恢复的百分比是多少]]
        StageRole.prototype.getForbideRecoverValue = function () {
            var value = 0;
            for (var k in this.tableBuffs) {
                var v = this.tableBuffs[k];
                if (v.getBuffBaseType() == zj.TableEnum.TableBufferType.BUFFER_FORBIDE_RECOVER) {
                    value = value + v.fir_value;
                }
            }
            if (value >= 1) {
                value = 1;
            }
            return value;
        };
        //[[人物回血总量]]
        StageRole.prototype.flowRecoverValue = function (value) {
            this.recoverTotalValue = this.recoverTotalValue + value;
        };
        StageRole.prototype.dealRecHp = function (value) {
            if (this.bDead == true || this.bMomentDead == true) {
                return 0;
            }
            if (value <= 1) {
                value = 1;
            }
            var dif = this.addHp(value);
            var arr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_REC_HP);
            var x = arr[0];
            var y = arr[1];
            this.creatRechpNum(x, y, value);
            return dif;
        };
        //[[增加人物血量]]
        StageRole.prototype.addHp = function (add) {
            var cur = this.getHp();
            var max = this.getMaxHp(true);
            var dif = 0;
            if (cur + add > max) {
                cur + add > max;
            }
            this.setHp(cur + add);
            return dif;
        };
        StageRole.prototype.creatRechpNum = function (baseX, baseY, hurtV) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.shanghainum2.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.shanghainum2.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.shanghainum2, hurtV, zj.ConstantConfig_CommonBattle.shanghainum2.w, zj.ConstantConfig_CommonBattle.shanghainum2.h, zj.ConstantConfig_CommonBattle.shanghainum2.offset);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 3, scale);
            num.setData(baseX, baseY, 0, 0);
            num.start();
        };
        //处理吸收
        StageRole.prototype.dealSuck = function (damageType, hurtValue) {
            var bSuck = false;
            var value = hurtValue;
            this.commonSuck(zj.TableEnum.TableBufferType.BUFFER_PHY_SUCK, value);
            this.commonSuck(zj.TableEnum.TableBufferType.BUFFER_DAMAGE_SUCK, value);
            return [bSuck, value];
        };
        //处理护盾
        StageRole.prototype.dealShield = function (hurtValue) {
            var bShield1 = false;
            var bShield2 = false;
            var bShield3 = false;
            var bShield4 = false;
            var value = hurtValue;
            var arr = this.immuneRelatedNum(value);
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
            arr = this.commonImmune(zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_DEF, value);
            bShield3 = arr[0];
            value = arr[1];
            if (bShield3) {
                return [true, value];
            }
            arr = this.commonImmune(zj.TableEnum.TableBufferType.BUFFER_SHIELD, value);
            bShield4 = arr[0];
            value = arr[1];
            return [bShield4, value];
        };
        //处理关联次数免疫
        StageRole.prototype.immuneRelatedNum = function (hurtValue) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            if (this.bIgnoreInjury)
                return [false, value]; // 被对方忽略减伤
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_SHIELD_RELATED_NUM);
            tBuff = arr[0];
            index = arr[1];
            //无免
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            var buffValue = tBuff.sec_value;
            var difValue = buffValue - 1;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                zj.CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                //全免
                return [true, 0];
            }
            else {
                //部分免
                return [true, hurtValue];
            }
        };
        //处理比较最大生命
        StageRole.prototype.immuneCompareHp = function (hurtValue) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            if (this.bIgnoreInjury)
                return [false, value]; // 被对方忽略减伤
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_SHIELD_COMPARE_MAXHP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            if (hurtValue >= tBuff.sec_value) {
                //部分免
                this.openFoldBuffEffect(tBuff);
                zj.CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
                return [true, hurtValue - tBuff.sec_value];
            }
            else {
                return [true, 0];
            }
        };
        //处理通用免疫
        StageRole.prototype.commonImmune = function (buffType, hurtValue) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            if (this.bIgnoreInjury)
                return [false, value]; // 被对方忽略减伤
            var arr = this.getBuff(buffType);
            tBuff = arr[0];
            index = arr[1];
            //无免
            if (tBuff == null) {
                return [false, value];
            }
            if (buffType == zj.TableEnum.TableBufferType.BUFFER_PHY_IMMUNE || buffType == zj.TableEnum.TableBufferType.BUFFER_MAGIC_IMMUNE || buffType == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE || buffType == zj.TableEnum.TableBufferType.BUFFER_SHIELD || buffType == 0) {
                tBuff.playTriggerSpx();
            }
            var buffValue = tBuff.sec_value;
            var difValue = buffValue - value;
            tBuff.sec_value = difValue;
            if (tBuff.sec_value <= 0) {
                this.openFoldBuffEffect(tBuff);
                zj.CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            if (difValue >= 0) {
                //全免
                return [true, 0];
            }
            else {
                //部分免
                return [true, hurtValue - buffValue];
            }
        };
        StageRole.prototype.openFoldBuffEffect = function (instance) {
            for (var k in this.tableBuffs) {
                var v = this.tableBuffs[k];
                if (v.buff_type == instance.buff_type && v.is_fold == true) {
                    v.is_fold = false;
                    if (v.spx != null) {
                        v.spx.visible = true;
                    }
                    return;
                }
            }
        };
        StageRole.prototype.dealDamageReduction = function (hurtValue, character) {
            var value = hurtValue;
            var aValue = this.handleTalentEffect_LoseHpConvertIgnoreHurt();
            var bValue = this.handleTalentEffect_BeInBuffIngoreHurt();
            var percent = (100 - aValue - bValue) / 100;
            if (percent <= 0) {
                percent = 0;
            }
            value = hurtValue * percent;
            if (value <= 1) {
                value = 1;
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_BeInBuffIngoreHurt = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_LoseHpConvertIgnoreHurt = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_IGNORE_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var maxHp = this.getMaxHp(true);
                var curHp = this.getHp();
                if (maxHp <= 0) {
                    maxHp <= 0;
                }
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                var per = (maxHp - curHp) / maxHp * 100;
                addValue = Math.floor(per / arr[2]) * arr[1];
            }
            return addValue;
        };
        StageRole.prototype.dealAllHurt = function (hurtValue, character) {
            var value = hurtValue;
            value = this.handleTalentEffect_Hunlian(character, value);
            var redValue1 = this.handleTalentEffect_ReduceAllHurt();
            var addValue1 = this.handleTalentEffect_ProAllHurt(character);
            var addValue2 = character.handleTalentEffect_ProAtkerAllHurt();
            var redValue2 = this.handleTalentEffect_ReduceBeAtkerAllHurt(character);
            var signValue = this.getBuffOverlayValue(zj.TableEnum.TableBufferType.BUFFER_SIGIN);
            var percent = (100 - redValue1 + addValue1 + addValue2 - redValue2) / 100 + signValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = value * percent;
            if (value <= 1) {
                value = 1;
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_Hunlian = function (character, hurtValue) {
            var tableMaxHp = [];
            var t = [];
            if (this.bEnemy == false) {
                t = this.fightScene.tableAllys;
            }
            else {
                t = this.fightScene.tableAllys;
            }
            tableMaxHp = this.fightScene.sortTableByHp(t, false);
            var len = tableMaxHp.length;
            // 1、魂链对自身不起作用。即如果拥有魂链天赋的是被攻击者，则不起作用。
            // 2、A被攻击，B、C有N%的魂链时。
            // 如果A生命值最少，则B、C中生命值大的那个角色的魂链生效（应该会有个特效显示），分担A的伤害。
            // 分完后A应受到的剩下的伤害，按规则继续由第二个分担者分担。
            // 3、加深规则，应该是分担完后加深。即若A本应受到DmgA的伤害，分担DmgA*N%给B，然后对B受到的这个DmgA*N%来做加深或减免。
            // 4、分担的伤害值不超过分担者生命上限。生命值只剩1时，魂链天赋失效。
            if (len != 0 && tableMaxHp[len] != this) {
                return hurtValue;
            }
            for (var i = 0; i < len - 1; i++) {
                //队友是否触发魂链
                var arr = tableMaxHp[i].getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PARTAKE, -1, null, null);
                if (arr[0] == true) {
                    //减免
                    var partValue = hurtValue * arr[1] / 100;
                    //加深
                    var realValue = partValue * (1 + arr[2] / 100);
                    tableMaxHp[i].dealCutHp(character, realValue, true, 3, null);
                    hurtValue = hurtValue - partValue;
                }
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_ReduceAllHurt = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_ALL_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_ProAllHurt = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION, target.roleFaction, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_ReduceBeAtkerAllHurt = function (atker) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_BEATKER_ALL_DAMAGE, -1, null, null);
            var cutValue = 0;
            if (arr[0] == true) {
                var atker_atk = atker.getAtk();
                var my_atk = this.getAtk();
                cutValue = arr[1] * atker_atk / (atker_atk + my_atk);
            }
            return cutValue;
        };
        StageRole.prototype.handleTalentEffect_ActionAbsorb = function (hurt, action) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_ACTION_ABSORB, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true && action != null) {
                var maxLost = this.getMaxHp(true) * arr[1] / 100;
                hurtValue = action.keepOutLostHp(maxLost, hurt);
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_IgnoreInjury = function (target) {
            if (target == null)
                return;
            target.bIgnoreInjury = false;
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_TARGET_INJURY, -1, null, null), tag = _a[0], value = _a[1];
            if (tag)
                target.bIgnoreInjury = true;
            return tag;
        };
        StageRole.prototype.keepOutTalentHurt = function (atkType, hurtValue, character) {
            var value = 0;
            var multiValue = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_MULTI_HURT, -1);
            var aArr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTACK_DAMAGE_REDUCE, -1);
            var bArr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTACK_DAMAGE_ADD, -1);
            var cArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_REDUCE, -1, null, null);
            var dArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEATTACKED_DAMAGE_ADD, -1, null, null);
            var eArr = character.handleTalentEffect_Feishe(this, -1);
            var fArr = character.handleTalentEffect_Guidao(-1);
            var gArr = character.handleTalentEffect_JianTa(this, -1);
            var hArr = character.dealDouble(this);
            var jArr = character.handleTalentEffect_YanXing(this);
            var kArr = character.handleTalentEffect_ChuanYang(this, -1);
            var lArr = character.handleTalentEffect_Meihuo(-1);
            var oArr = character.handleTalentEffect_AtkRow(this);
            var pValue = character.dealWeak();
            var qValue = this.dealArmor();
            var rValue = this.dealArmorBreak();
            var sArr = character.handleTalentEffect_ProHurtByTargetGroup(this);
            var tArr = character.handleTalentEffect_ProHurtByTargetFeature(this);
            var uArr = character.handleTalentEffect_ProHurtByTargetFaction(this);
            var vValue = character.handleTalentEffect_LivingHurt(this);
            var wArr = character.handleTalentEffect_DisFar(this);
            var xArr = character.handleTalentEffect_AttriDValueP(this);
            var zArr = this.handleTalentEffect_ReduceHurtByTargetFaction(character);
            var aaArr = character.handleTalentEffect_ProHurtByByTargetHpPer(this);
            var bbArr = this.handleTalentEffect_ReduceHurtByAttackGroup(character);
            var ccArr = character.handleTalentEffect_ProtoCompareToDamageAdd(this);
            var ddArr = this.handleTalentEffect_ProtoCompareToDamageReduce(character);
            var eeArr = character.handleRageToHurt(this);
            var ffArr = this.handleHpCompareToEnemyMin();
            var ggArr = this.handleTalentEffect_ReduceHurtByAttackerFeature(character);
            var hhArr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_ADD_HURT, -1);
            var percent = (100 - aArr[1] + bArr[1] - cArr[1] + dArr[1] + eArr[1] + fArr[1] + gArr[1] + hArr[1] + jArr[1] + kArr[1] + lArr[1] + oArr[1] + sArr[1] + tArr[1] + uArr[1] + vValue + wArr[1] + xArr[1] - zArr[1] + aaArr[1] - bbArr[1] + ccArr[1] - ddArr[1] + eeArr[1] - Number(ffArr[1]) - ggArr[1] + hhArr[1]) / 100 - pValue - qValue + rValue;
            if (percent <= 0) {
                percent = 0;
            }
            if (multiValue[1] <= 1) {
                multiValue[1] = 1;
            }
            value = hurtValue * percent + hurtValue * (multiValue[1] - 1);
            var bExtraShow = false;
            if (bArr[0] == true || eArr[0] == true || fArr[0] == true || gArr[0] == true || hArr[0] == true || jArr[0] == true || kArr[0] == true || lArr[0] == true || oArr[0] == true || sArr[0] == true || tArr[0] == true || uArr[0] == true || wArr[0] == true || xArr[0] == true) {
                bExtraShow = true;
            }
            return [bExtraShow, value];
        };
        StageRole.prototype.dealArmor = function () {
            var armorBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ARMOR);
            var value = 0;
            if (armorBuff[0] != null) {
                value = armorBuff[0].fir_value;
            }
            return value;
        };
        //处理破甲
        StageRole.prototype.dealArmorBreak = function () {
            var armorBreakBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ARMOR_BREAK);
            var value = 0;
            // if armorBuff ~= nil then
            //     value = armorBuff.fir_value
            // end
            return value;
        };
        StageRole.prototype.handleTalentEffect_ReduceHurtByTargetFaction = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATKER_FACTION, target.roleFaction, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_ReduceHurtByAttackGroup = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATTACK_GROUP, character.groupTag, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_ProtoCompareToDamageReduce = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_REDUCE, -1, null, null);
            var addValue = 0;
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                var ret1 = this.getProtoValue(arr[2]);
                var ret2 = character.getProtoValue(arr[2]);
                if (ret1 > ret2) {
                    ret1 > ret2;
                }
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleHpCompareToEnemyMin = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HP_COMPARETO_ENEMY, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var targets = this.fightScene.getTargetPlayer(this, message.ETargetPosType.TARGET_POS_ENEMY, message.ETargetId.TARGET_ALL);
                var myHp = this.getHp();
                for (var k in targets) {
                    var v = targets[k];
                    if (myHp < v.getHp()) {
                        addValue = arr[1];
                        return [true, addValue];
                    }
                }
            }
            return [false, addValue];
        };
        //受到(攻防辅)猎人伤害降低
        StageRole.prototype.handleTalentEffect_ReduceHurtByAttackerFeature = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_HURT_BY_ATTACKER_FEATURE, character.roleFeature, null, null);
            var reduceValue = 0;
            if (arr[0] == true) {
                reduceValue = arr[1];
            }
            return [arr[0], arr[1]];
        };
        StageRole.prototype.triggerBeAttackedByDamage = function () {
            //并没有魔法攻击了，统一都用物理攻击
            this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_DAMAGE, -1, null, null);
        };
        StageRole.prototype.handleTalentEffect_CritHurt = function (character, hurtValue) {
            var arr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALETN_EFFECT_CRIT_HURT_ADD, -1, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CRIT_HURT_REDUCE, -1, null, null);
            var percent = 1 + (arr[1] - arr1[1]) / 100;
            if (percent <= 0) {
                percent <= 0;
            }
            var value = hurtValue * percent;
            return [value, arr[0]];
        };
        StageRole.prototype.handleTalentEffect_CritHurtLimit = function (val, hurtValue) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CRITHURT_LIMIT, -1, null, null);
            var value = hurtValue;
            if (arr[0] == true) {
                var limit = (val * arr[1] / 100);
                if (hurtValue >= limit) {
                    hurtValue >= limit;
                }
            }
            return value;
        };
        StageRole.prototype.triggerFriendTalent = function (type) {
            var partners = this.fightScene.getPartnerDebar(this.eCamp, this);
            for (var j = 0; j < partners.length; j++) {
                var role = partners[j];
                var t = role.tableBaseTalent[type];
                if (t != null) {
                    for (var i = 0; i < t.length; i++) {
                        var talent = t[i];
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.handleTalentEffect_ReduceCritByAttackGroup = function (character) {
            var value = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CRIT_BY_ATTACK_GROUP, character.groupTag, null, null);
            return value[1];
        };
        StageRole.prototype.dealRebound = function (character, atkType, hurtValue) {
            if (this.isSupport()) {
                return;
            }
            var bRebound = false;
            var value = hurtValue;
            var arr = this.commonRebound(hurtValue, character);
            bRebound = arr[0];
            value = arr[1];
            if (bRebound == true) {
                //我方处理反弹效果
                this.doReboundUi();
                //敌方处理被反弹效果
                character.beRebounded(atkType, value, this);
            }
        };
        StageRole.prototype.commonRebound = function (hurtValue, character) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_REBOUND);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [false, value];
            }
            tBuff.playTriggerSpx();
            var reboundValue = value * tBuff.fir_value * (Math.atan(this.getAtk() / 5000 - 2) + 1.11);
            return [true, reboundValue];
        };
        StageRole.prototype.createCritNum = function (baseX, baseY, hurtV) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.baoji);
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.baojinum, hurtV, zj.ConstantConfig_CommonBattle.baojinum.w, zj.ConstantConfig_CommonBattle.baojinum.h, zj.ConstantConfig_CommonBattle.baojinum.offset);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.handleTalentEffect_ReboundHurt = function (hurtValue, character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REBOUND_HURT, -1, null, null);
            if (arr[0]) {
                var reboundValue = arr[1] * hurtValue / 100;
                if (reboundValue <= 1) {
                    reboundValue = 1;
                }
                //我方处理反弹效果
                this.doReboundUi();
                //敌方处理被反弹效果
                character.beRebounded(1, reboundValue, this);
            }
        };
        StageRole.prototype.handleTalentEffect_ProtomeByNumOfBuff = function (proto) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_BY_NUM_OF_BUFF, -1, null, null);
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true && this.hurtingRole != null) {
                var num = this.hurtingRole.getBuffSpecNumByType(arr[4].effect_extraParam);
                if (arr[3] != -1) {
                    if (num > arr[3]) {
                        num = arr[3];
                    }
                }
                result[arr[2]] = num * arr[1];
            }
            return result[proto];
        };
        //获得有益或减益buff数量
        StageRole.prototype.getBuffSpecNumByType = function (tbl) {
            if (tbl == null) {
                return 0;
            }
            if (tbl[0] == -1) {
                return this.tableBuffs.length;
            }
            var num = 0;
            for (var i = 0; i < this.tableBuffs.length; i++) {
                var type = this.tableBuffs[i].getBuffUseType();
                if (zj.Table.FindK(tbl, type) != -1) {
                    num = num + 1;
                }
            }
            return num;
        };
        StageRole.prototype.handleTalentEffect_NumOfAtk = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED, -1, null, null);
            return arr[1];
        };
        StageRole.prototype.handleTalentEffect_Longyuan = function (condition) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LONGYUAN, condition, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                var num = 0;
                var tag = zj.yuan3(this.fightScene.beInPvp() == true, true, false);
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
        };
        StageRole.prototype.handleTalentEffect_Longhun = function (condition) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_JILI, condition, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                var num = 0;
                if (this.bEnemy == false) {
                    num = this.fightScene.getGeneralsNum(false, true) - 1;
                }
                var tag = zj.yuan3(this.fightScene.beInPvp() == true, true, false);
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
        };
        //[[获得人物普攻伤害]]
        StageRole.prototype.getAtk = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.atk;
            var results = this.handleTalentEffect_ProtoToProto();
            value = value + results[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK];
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            var longhunValue = this.handleTalentEffect_Longhun(-1);
            var longyuanValue = this.handleTalentEffect_Longyuan(-1);
            var numOfAtk = this.handleTalentEffect_NumOfAtk();
            var atkPromoteValue = this.getBuffOverlayValue(zj.TableEnum.TableBufferType.BUFFER_ATK_PROMOTE);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var extra = (arr[1] + longhunValue + longyuanValue + numOfAtk + livingPerson + protomeByBuffNum - arr1[1] + loseHpToProto) / 100 + atkPromoteValue;
            var baseAddValueArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            var baseCutValueArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK);
            var base = (baseByFaction + baseByFightType + baseByFeature + baseAddValueArr[1] + baseByDiff - baseCutValueArr[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK]) / 100;
            var loseHpToAtk = this.handleTalentEffect_LoseHpConvertAtk();
            if (this.isPerson()) {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                var real = value * percent + (this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK]) * base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK] + loseHpToAtk;
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
            else {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                var real = value * percent + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK] + loseHpToAtk;
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        };
        StageRole.prototype.handleTalentEffect_LoseHpConvertAtk = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSEHP_CONVERT_ATK, -1, null, null);
            var tmpValue = 0;
            if (arr[0]) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                    var loseHp = this.getMaxHp(true) - this.getHp();
                    tmpValue = loseHp / arr[2] * arr[1];
                }
            }
            return tmpValue;
        };
        StageRole.prototype.doReboundUi = function () {
            var arr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_BREAK);
            this.createReboundNumber(arr[0], arr[1]);
        };
        StageRole.prototype.createReboundNumber = function (baseX, baseY) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.rebound);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 2, null);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.getRoleUpPos = function (tType) {
            var numX = 0;
            var numY = 0;
            var upX = 0;
            var upY = 0;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                upX = this.roleAniOffsetSpeUpX;
                upY = this.roleAniOffsetSpeUpY;
            }
            else {
                upX = this.roleAniOffsetNorUpX;
                upY = this.roleAniOffsetNorUpY;
            }
            numX = this.x + upX + zj.TsMtirand() % 30 * this.rand();
            numY = this.y - upY - zj.TsMtirand() % 30 * this.rand();
            return [numX, numY];
        };
        StageRole.prototype.getHurtNumPos = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var numX = 0;
            var numY = 0;
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirUp || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_StirDown || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FallDown) {
                numX = this.x + this.hurtNumOffsetSpeX + zj.TsMtirand() % 30 * this.rand();
                numY = this.y - this.hurtNumOffsetSpeY - zj.TsMtirand() % 30 * this.rand();
            }
            else {
                numX = this.x + this.hurtNumOffsetNorX + zj.TsMtirand() % 30 * this.rand();
                numY = this.y - this.hurtNumOffsetNorY - zj.TsMtirand() % 30 * this.rand();
            }
            return [numX, numY];
        };
        StageRole.prototype.checkLoseBloodTalent = function (loseBloodPer) {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_LOSE_BLOOD];
            if (t == null || t.length == 0) {
                return;
            }
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                if (talent.trigger_condition[0] == -1) {
                    var ret = talent.lose_blood_val + loseBloodPer;
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
        };
        StageRole.prototype.dealShelter = function (value) {
            var dandanBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_DANDAN);
            if (dandanBuff[0] == null) {
                return;
            }
            dandanBuff[0].dealShelter(value);
            dandanBuff[0].playTriggerSpx();
        };
        StageRole.prototype.handleTalentEffect_ReduceIgnoreDef = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_IGNORE_DEF_VALUE, -1, null, null);
            return arr;
        };
        StageRole.prototype.handleTalentEffect_IgnoreDefLimit = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_DEF_LIMIT, -1, null, null);
            return arr;
        };
        StageRole.prototype.rand = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var r = zj.TsMtirand() % 2;
            if (r == 0) {
                return -1;
            }
            else {
                return 1;
            }
        };
        StageRole.prototype.beEffectHurt = function (effect, character, point) {
            //无敌状态
            if (effect == null) {
                return [false, 0];
            }
            var hurt = effect.getHurt();
            if (hurt == null || (hurt != null && hurt.canHurtOne(this) == false) || hurt.beInCollideFrame() == false) {
                return [false, 0];
            }
            //console.log("==========================:"+hurt);
            var arr = this.getHurtNumPos();
            var numX = arr[0];
            var numY = arr[1];
            var aType = effect.getAtkType();
            _hurtingAndBring(this, character);
            var belongSkill = effect.getBelongSkill();
            var priority = effect.getBreakPriority();
            arr = effect.getHitEffectId();
            var hitId = arr[0];
            var sizeTbl = arr[1];
            var buffId = effect.getBuffId();
            var belongUnit = belongSkill.getCurUnit();
            var curAction = belongUnit.getCurAction();
            character.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF, this, ETalentDir.Dir_Attack);
            character.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF, character, ETalentDir.Dir_Attack);
            this.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF, this, ETalentDir.Dir_BeAttactked);
            //攻击方属性值大于小于防御方检测
            character.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, this, ETalentDir.Dir_Attack);
            character.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, this, ETalentDir.Dir_Attack);
            //防御方生命值大于小于攻击方检测
            this.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, character, ETalentDir.Dir_BeAttactked);
            //攻击方属性大于防御方N%检测
            character.checkProtoComparePer(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, this, ETalentDir.Dir_Attack);
            //防御方属性大于供给方N%检测
            this.checkProtoComparePer(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, character, ETalentDir.Dir_BeAttactked);
            //攻击方生命值大于小于检测 
            character.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_Attack);
            character.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_Attack);
            //防御方生命值大于小于检测
            this.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_BeAttactked);
            //被攻击方生命值大于小于检测，攻击方触发天赋
            character.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, this, ETalentDir.Dir_Attack);
            character.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, this, ETalentDir.Dir_Attack);
            //攻击方生命值大于小于检测，被攻击方触发天赋
            this.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, character, ETalentDir.Dir_BeAttactked);
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
        };
        StageRole.prototype.triggerInBuff = function (type, character, param) {
            var t = this.tableBaseTalent[type];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (param == talent.extra_value) {
                        var tBuff = null;
                        var index = 0;
                        for (var j = 0; j < talent.trigger_condition.length; j++) {
                            var arr = character.getBuff(talent.trigger_condition[j]);
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
        };
        StageRole.prototype.checkProtoCompareTalent = function (eType, targetRole, param) {
            var t = this.tableBaseTalent[eType];
            if (!t || t.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                var _type = talent.trigger_condition[0];
                var _my = this.getProtoValue(_type);
                var _target = targetRole.getProtoValue(_type);
                if (param == talent.extra_value && ((eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER && (_my - _target > 0))
                    || (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS && (_target - _my > 0)))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.checkProtoComparePer = function (eType, targetRole, param) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                var _type = talent.trigger_condition[0];
                var _my = this.getProtoValue(_type);
                var _target = targetRole.getProtoValue(_type);
                if (param == talent.extra_value && (_my - _target * (100 + talent.extra_value2) / 100 > 0)) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.checkHpCompareSelf = function (eType, param) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                var _type = talent.trigger_condition[0];
                var _value = this.getHp() / this.getMaxHp(true) * 100;
                if (param == talent.extra_value && ((eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER && _value - _type > 0)
                    || (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS && _type - _value > 0))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.checkHpCompareTarget = function (eType, target, param) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                var _type = talent.trigger_condition[0];
                var _value = target.getHp() / target.getMaxHp(true) * 100;
                if (param == talent.extra_value && ((eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER && _value - _type > 0)
                    || (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS && _type - _value > 0))) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.checkProtoCompareValueTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTRI_COMPARE_GREATER];
            if (t == null || t.length == 0) {
                return;
            }
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                var _type = talent.trigger_condition[0];
                var _my = this.getProtoValue(_type);
                if (_my > talent.extra_value) {
                    if (talent.isTouch() == true) {
                        talent.attriDiff = _my - talent.extra_value;
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.releaseZoneEffect = function () {
            for (var j in this.tableTalentEffect) {
                var i = 0;
                var v = this.tableTalentEffect[j];
                if (v) {
                    while (i < v.length) {
                        if (v[i].belong_talent != null && this.isZoneTalentTrigger(v[i].belong_talent.trigger_type)) {
                            zj.CC_SAFE_DELETE(v[i]);
                            v.splice(i, 1);
                        }
                        else {
                            i = i + 1;
                        }
                    }
                }
            }
        };
        StageRole.prototype.beCollisionStepBuff = function (character) {
            var arr = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_STEP_BUFF, -1, null, null);
            if (arr[0] == true) {
                if (arr[4].stepBuffHitRate == -1) {
                    arr[4].stepBuffHitRate = arr[5];
                }
                var arr1 = this.beBuffHurt(arr[4].stepBuffHit, arr[4].effect_buffId, character, null, null, arr[4].stepBuffHitRate);
                if (arr1[0] == null && arr1[1] == 0) {
                    arr[4].stepBuffHitRate = arr[4].stepBuffHitRate + arr[5];
                }
                else if (arr1[0] != null) {
                    character.tableTalentEffect.splice(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_STEP_BUFF, 1);
                }
            }
        };
        StageRole.prototype.isZoneTalentTrigger = function (type) {
            if (type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS ||
                type == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTRI_COMPARE_GREATER) {
                return true;
            }
            return false;
        };
        //死亡动画
        StageRole.prototype.setDisappear = function () {
            this.bDisappear = true;
            if (this.deadParticleEffects == null) {
                this.deadParticleEffects = zj.HunterSpineX(null, 1, null, "zd_siwang")[0];
                this.nodeRoot.addChild(this.deadParticleEffects.spine);
                this.deadParticleEffects.ChangeAction(0);
                this.deadParticleEffects.SetPosition(this.x, this.y);
                this.deadParticleEffects.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.deadFun, this);
            }
        };
        StageRole.prototype.deadFun = function () {
            if (this.deadParticleEffects) {
                this.deadParticleEffects.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.deadFun, this);
                this.deadParticleEffects.clearSpine();
                this.deadParticleEffects = null;
            }
        };
        StageRole.prototype.setCanRemove = function () {
            this.bCanRemove = true;
        };
        StageRole.prototype.getTeamNum = function () {
            return this.eTeamNum;
        };
        StageRole.prototype.enterBtl = function () {
            this.initLight();
            this.loadDcBuff();
            this.renewDcPos();
        };
        StageRole.prototype.updatePermanentHp = function () {
            if (this.SpritePdhBlood == null) {
                return;
            }
            var maxHp = this.getMaxHp();
            if (this.pdhValue == 0) {
                this.SpritePdhBlood.visible = false;
                this.SpriteBloodSplit.visible = false;
                this.SpriteRedBlood.visible = false;
            }
            else {
                var size_bar = zj.getPercentSize(this.BarHpSize, 1);
                this.SpritePdhBlood.visible = true;
                this.SpritePdhBlood.width = size_bar.width;
                var red_bar = zj.getPercentSize(this.BarHpSize, (maxHp - this.pdhValue) / maxHp);
                this.SpriteRedBlood.visible = true;
                this.SpriteRedBlood.width = red_bar.width;
                var bar = zj.getPercentSize(this.BarHpSize, (maxHp - this.pdhValue) / maxHp);
                this.SpriteBloodSplit.visible = true;
                this.SpriteBloodSplit.x = -this.BarHpSize.width / 2 + bar.width;
                this.SpriteBloodSplit.y = 4;
            }
        };
        StageRole.prototype.creatHurtNum = function (baseX, baseY, hurtV, right) {
            // body 
            //if( true ){ return } 
            // 黄色数字   
            // if( #FightNumberEffectMgr.tableNumbers >= 2 ){ return }
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.shanghainum1.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.shanghainum1.randTbl.max * 1000) / 1000;
            var num1 = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num1.newSetData();
            num1.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.shanghainum1, hurtV, zj.ConstantConfig_CommonBattle.shanghainum1.w, zj.ConstantConfig_CommonBattle.shanghainum1.h, zj.ConstantConfig_CommonBattle.shanghainum1.offset);
            num1.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 1, scale);
            num1.setData(baseX, baseY, 0, 0);
            num1.start();
            // // 特效白色数字
            // let num2 = Game.ObjectPool.getItem("FightNumberEffect",FightNumberEffect);
            // num2.newSetData();
            // num2.setNumberInfo(UIConfig.UIConfig_FightNumber.shanghainum3, hurtV, ConstantConfig_CommonBattle.shanghainum3.w, ConstantConfig_CommonBattle.shanghainum3.h, ConstantConfig_CommonBattle.shanghainum3.offset)
            // num2.setLayout(TableEnum.TableEnumNumLayout.Layout_Layout_New, 5, scale )  
            // num2.setData(baseX, baseY, 0, 0);
            // num2.start()
        };
        StageRole.prototype.isImmuning = function () {
            for (var k in this.tableBuffs) {
                if (this.tableBuffs[k].getBuffBaseType() == zj.TableEnum.TableBufferType.BUFFER_DAMAGE_IMMUNE) {
                    return true;
                }
            }
            return false;
        };
        StageRole.prototype.isRelicCensus = function () {
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                return true;
            }
            return false;
        };
        StageRole.prototype.calcShieldHp = function (reduce) {
            this.currShieldHp = this.currShieldHp + reduce;
        };
        /*技能减血*/
        StageRole.prototype.skillReduceHp = function (reduce, character, bFlow) {
            if (bFlow == null) {
                bFlow = true;
            }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce);
            }
            if (this.isImmuning()) {
                return;
            }
            var cur = this.getHp();
            this.setHp(cur - reduce);
        };
        StageRole.prototype.setDead = function (bHell) {
            if (this.isActivityBoss()) {
                return;
            }
            if (this.bDead == true || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                return;
            }
            this.bDead = true;
            this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_DEATH, false);
            this.doBreakOther(false);
            this.clearAllBuffs();
            this.setRage(0);
            if (bHell == true) {
                //直接宣判死亡
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            else {
                //需要经过特殊处理再死亡
                if (this.bGravity == false) {
                    this.bGravity = true;
                    this.floor = zj.Gmgr.Instance.ground;
                }
                if (this.formType == zj.TableEnum.TableEnumFromClassify.TYPE_CALL) {
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                }
                else {
                    this.stirUpSpeed = zj.ConstantConfig_RoleBattle.COMMON_DEAD_STIRUPSPEED;
                    this.stirSpeedX = zj.ConstantConfig_RoleBattle.COMMON_DEAD_STIRXSPEED;
                    this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_StirUp);
                }
            }
        };
        StageRole.prototype.deadJudge = function (args) {
            for (var i = 0; i < this.tableDeathTalent.length; i++) {
                var talent = this.tableDeathTalent[i];
                talent.talentFun();
                talent.triggerEffect();
            }
            this.tableDeathTalent = [];
            this.bMomentDead = false;
            this.doBreakOther(false);
            //处理回天
            var buquTag = false;
            //处理自爆
            var zibaoTag = false;
            //处理复活
            var fuhuoTag = false;
            //如果致死标志置为true，则不能复活
            if (this.bNoRevive == false) {
                buquTag = this.handleTalentEffect_Buqu();
                zibaoTag = this.handleTalentEffect_ZiBao();
                fuhuoTag = this.handleTalentEffect_Fuhuo();
            }
            //检测不屈是否生效
            if (buquTag == false && zibaoTag == false && fuhuoTag == false) {
                //触发特殊死亡天赋时需直接死亡
                if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                    if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                        this.fightScene.openWeekStep();
                    }
                    else {
                        this.setDead(this.bTalentTag);
                    }
                }
                else {
                    this.setDead(this.bTalentTag);
                }
            }
        };
        StageRole.prototype.handleTalentEffect_Fuhuo = function (args) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_FUHUO, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4];
            if (tag == true) {
                this.bReviving = true;
                this.setHp(this.getMaxHp(true) * value / 100);
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    var buff = this.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this, null, null, null);
                }
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_AFTER_FUHUO, -1, null, null);
                this.breakMoveAni(this.moveFinsihCB);
            }
            return tag;
        };
        StageRole.prototype.moveFinsihCB = function () {
            this.bReviving = false;
            this.setVisible(true);
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Curve);
            //重生复活后重置小技能cd时间
            this.dealCutCdMin();
        };
        StageRole.prototype.dealCutCdMin = function () {
            if (this.getPressSkill() != null) {
                var cdVal = this.getPressSkill().getCd();
                var effectValue = this.dealCdEffect();
                zj.SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), cdVal * (-1) * effectValue, null, null);
                this.playCdAni(-(cdVal / 1000));
            }
        };
        StageRole.prototype.playCdAni = function (cd) {
            if (zj.Gmgr.Instance.bGoLogin == true || this.bEnemy == true) {
                return;
            }
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            var value = Math.floor(Math.abs(cd));
            var _a = this.fightScene.getRageTipPos(this.eTeamNum, 1), x = _a[0], y = _a[1];
            if (x != null && y != null) {
                y = y + 30;
                if (cd < 0) {
                    this.createCdReduceNum(x, y, value);
                }
                else if (cd > 0) {
                    this.createCdAddNum(x, y, value);
                }
            }
        };
        StageRole.prototype.createCdReduceNum = function (baseX, baseY, value) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.cdjian);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        };
        StageRole.prototype.createCdAddNum = function (baseX, baseY, value) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.cdjia);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        };
        StageRole.prototype.dealCdEffect = function () {
            var value = 0;
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CDRED_EFFECT, -1, null, null), aTag = _a[0], aValue = _a[1];
            var percent = 100 - aValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = percent / 100;
            return value;
        };
        StageRole.prototype.handleTalentEffect_ZiBao = function (args) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ZIBAO, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2];
            if (tag == true) {
                this.setBomb();
            }
            return tag;
        };
        //设置自爆
        StageRole.prototype.setBomb = function (args) {
            this.bBomb = true;
        };
        StageRole.prototype.handleTalentEffect_Buqu = function (args) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUQU, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4];
            if (tag == true) {
                //不屈起身前要清除所有buff
                this.clearAllBuffs();
                //不屈回血
                var tvalue1 = value * this.getMaxHp(true) / 100;
                this.flowRecoverValue(tvalue1);
                this.dealRecHp(tvalue1);
                var tvalue = effect.growUp_value * this.getMaxRage() / 100;
                this.dealRecRage(tvalue);
                this.setVisible(true);
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    var buff = this.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this, null, null, null);
                }
                this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
                this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_GetUp);
            }
            return tag;
        };
        StageRole.prototype.checkTalent_Limit = function (eType) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                if (talent.trigger_num < talent.extra_value) {
                    if (talent.isTouch() == true) {
                        talent.trigger_num = talent.trigger_num + 1;
                        talent.talentFun(null);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.dealHurtHpZero = function (character, value, skillType) {
            var _this = this;
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
                    var killer = character;
                    if (character.bCall == true) {
                        killer = character.father;
                    }
                    killer.handleTalentEffect_KillNoRevive(this);
                    if (killer != null && killer.bDead == false) {
                        var value_1 = killer.handleTalentEffect_GetRage();
                        var r_value = killer.handleTalentEffect_ReduceRage();
                        var p = 100 + value_1 - r_value;
                        if (p <= 0) {
                            p = 0;
                        }
                        var tmp = killer.getRageAddValue(EGetRageWay.Way_LastHit) * p / 100;
                        //补刀所属玩家加3点怒气
                        killer.dealRecRage(tmp, true);
                        //击杀任意敌人时
                        killer.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_KILL, skillType);
                        //是否触发神兵技噬魂
                        killer.checkTalent_Limit(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SHIHUN);
                        //是否触发吞噬
                        killer.handleTalentEffect_Tunshi(this);
                    }
                }
                this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD, false);
                this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH, false);
                //是否触发频死
                var ret = this.handleTalentEffect_WillDead();
                if (ret == true) {
                    return [false, value];
                }
                ret = this.handleTalentEffect_WillDead2();
                if (ret == true) {
                    return [false, value];
                }
                //自己死亡时触发队友的
                this.triggerFriendTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FRIEND_DEATH);
                //自己死亡时触发敌人的
                this.triggerEnemyTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_DEATH);
                this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN, true);
                var deadSpx = zj.UIConfig.UIConfig_CommonBattleCss.json_siwang;
                if (this.tableDeathTalent.length == 0) {
                    //自己死亡时
                    this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ZIBAO, true);
                    this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO, true);
                    this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_YIJI, true);
                    this.checkDeadTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUCHOU, true);
                    deadSpx = zj.UIConfig.UIConfig_CommonBattleCss.json_zibao;
                }
                this.bTalentTag = zj.yuan3(this.tableDeathTalent.length > 0, true, false);
                if (this.bTalentTag == true) {
                    this.bMomentDead = true;
                    this.setVisible(false);
                    //this.createDeadCss( this.x, this.y + this.hitEffectOffsetNorY, createCallback(this, this.deadJudge), deadSpx);
                    egret.setTimeout(function () { _this.deadJudge(); }, this, 1500);
                    return [true, value];
                }
                else {
                    this.deadJudge();
                    return [true, value];
                }
            }
            return [false, value];
        };
        // public createDeadCss( x, y, cb: Function, spxId){
        //     if(this.deadCss == null){
        //         let name = resdb.SPX( spxId );
        //     }
        // }
        StageRole.prototype.handleTalentEffect_Tunshi = function (deathRole) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_TUNSHI, -1, null, null), tag = _a[0], value = _a[1];
            if (tag == true) {
                //天赋回血
                var tvalue = value / 100 * deathRole.getMaxHp(true);
                var forbidden = this.getForbideRecoverValue();
                var tmp = tvalue * (1 - forbidden);
                if (tmp <= 1) {
                    tmp = 1;
                }
                this.flowRecoverValue(tmp);
                this.dealRecHp(tmp);
            }
        };
        StageRole.prototype.procTalent = function (tick) {
            //判定自己的持续性天赋
            //判定自己身上天赋效果是否存在
            if (this.fightScene.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (!(this.bPause == true && this.fightScene.isTimePause() == true)) {
                this.procBattleTimeTalent();
            }
            for (var k in this.tableTalentEffect) {
                var v = this.tableTalentEffect[k];
                if (!v) {
                    continue;
                }
                var i = 0;
                while (i < v.length) {
                    if (v[i].b_disappear == true) {
                        zj.CC_SAFE_DELETE(v[i]);
                        v.splice(i, 1);
                    }
                    else {
                        v[i].update(tick);
                        i = i + 1;
                    }
                }
            }
        };
        StageRole.prototype.procBattleTimeTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FIGHT_START];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.is_reset == true && this.fightScene.battleTime / 1000 >= talent.extra_value && talent.isTouch() == true) {
                        talent.is_reset = false;
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.updateExtra = function (tick) {
            this.procTalent(tick);
            if (this.bPause == true) {
                return;
            }
            this.procAi(tick);
        };
        StageRole.prototype.creatAi = function (aiId) {
            this.myAI = new zj.AiBrain(this, aiId);
        };
        StageRole.prototype.procAi = function (tick) {
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
                if (this.fightScene.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                    this.myAI.update(tick);
                }
            }
        };
        StageRole.prototype.getAccordSkill = function (tContainer, tType) {
            if (tType == message.ESkillType.SKILL_TYPE_COMMON) {
            }
            else if (tType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.accordCd(tContainer, this.tableSkills);
            }
            else if (tType == message.ESkillType.SKILL_TYPE_DEATH) {
                this.accordCd(tContainer, this.tableSkills);
            }
        };
        StageRole.prototype.accordCd = function (tContainer, tCd) {
            for (var k in tCd) {
                var v = tCd[k];
                var damage = v.getSkillDamageType();
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
                var info = { skillType: v.getSkillType(), order: v.getSkillOrder(), index: parseInt(k) };
                tContainer.push(info);
            }
        };
        StageRole.prototype.getAutoSkill = function () {
            return this.tableCommons[0];
        };
        StageRole.prototype.setForceAi = function (tag) {
            this.bForceAi = tag;
        };
        StageRole.prototype.loadSkillAi = function () {
            if (this.tableSkills.length > 0) {
                var info = { delayTime: this.tableSkills[0].getSkillDelayTime(), aiType: this.tableSkills[0].getSkillAiType() };
                this.tableSkillAi[message.ESkillType.SKILL_TYPE_HANDLE] = info;
            }
            if (this.tableDeaths.length > 0) {
                var info = { delayTime: this.tableDeaths[0].getSkillDelayTime(), aiType: this.tableDeaths[0].getSkillAiType() };
                this.tableSkillAi[message.ESkillType.SKILL_TYPE_DEATH] = info;
            }
        };
        StageRole.prototype.isPerson = function () {
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return true;
            }
            else {
                return false;
            }
        };
        StageRole.prototype.Pause = function () {
            if (this.bPause) {
                return;
            }
            this.bPause = true;
            if (this.body != null) {
                this.body.Pause();
            }
            for (var i = 0; i < this.tableEffects.length; i++) {
                this.tableEffects[i].Pause();
            }
            for (var i = 0; i < this.tableHits.length; i++) {
                var hit = this.tableHits[i];
                if (hit != null) {
                    var spx = hit.getEffectSpx();
                    if (spx != null) {
                        spx.Pause();
                    }
                }
            }
            for (var i = 0; i < this.tableBuffs.length; i++) {
                var ani = this.tableBuffs[i].getEffectSpx();
                if (ani != null) {
                    var animation = ani;
                    if (animation != null) {
                        animation.Pause();
                    }
                }
            }
            if (this.curSkill != null) {
                var curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.Pause();
                }
            }
        };
        StageRole.prototype.resume = function () {
            if (!this.bPause) {
                return;
            }
            this.bPause = false;
            if (this.body != null) {
                this.body.resume();
            }
            for (var i = 0; i < this.tableEffects.length; i++) {
                this.tableEffects[i].resume();
            }
            for (var i = 0; i < this.tableHits.length; i++) {
                var hit = this.tableHits[i];
                if (hit != null) {
                    var spx = hit.getEffectSpx();
                    if (spx != null) {
                        spx.resume();
                    }
                }
            }
            for (var i = 0; i < this.tableBuffs.length; i++) {
                var ani = this.tableBuffs[i].getEffectSpx();
                if (ani != null) {
                    var animation = ani;
                    if (animation != null) {
                        animation.resume();
                    }
                }
            }
            if (this.curSkill != null) {
                var curUnit = this.curSkill.getCurUnit();
                if (curUnit != null) {
                    curUnit.resume();
                }
            }
        };
        StageRole.prototype.pauseBlack = function () {
            if (this.bPauseBlack) {
                return;
            }
            this.bPauseBlack = true;
        };
        StageRole.prototype.resumeBlack = function () {
            if (!this.bPauseBlack) {
                return;
            }
            this.bPauseBlack = false;
        };
        StageRole.prototype.playStorage = function (index) {
            //蓄力
            if (this.storageSpx == null) {
                return;
            }
            this.storageSpx.setVisibleSpx(true);
            this.storageSpx.SetPosition(this.x + this.offsetNorMidX, this.y - this.offsetNorMidY - (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
            this.storageSpx.stopAllActions();
            this.storageSpx.ChangeAction(0);
            //蓄力音效
            if (index == 0 && this.press_sound_path != null) {
                zj.Helper.PlayEff(this.press_sound_path);
            }
            else if (index == 1 && this.kill_sound_path != null) {
                zj.Helper.PlayEff(this.kill_sound_path);
            }
        };
        //[[获得人物普攻防御]]
        StageRole.prototype.getDef = function (expect) {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.def;
            var results = this.handleTalentEffect_ProtoToProto();
            value = value + results[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
            var aAttribAddArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            var aAttribCutArr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            var reduceValue = 0;
            var rdBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_REDUCE_DEF);
            if (rdBuff != undefined && rdBuff[0] != null) {
                reduceValue = rdBuff[0].fir_value;
            }
            var promoteValue = this.getBuffOverlayValue(zj.TableEnum.TableBufferType.BUFFER_PROMOTE_DEF);
            var fireValue = 0;
            var fireBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_FIRING);
            if (fireBuff != undefined && fireBuff[0] != null) {
                fireValue = fireBuff[0].third_value;
            }
            var addDefValue = 0;
            var addDefBySourceBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ADD_DEFENCE_BYSOURCE);
            if (addDefBySourceBuff != undefined && addDefBySourceBuff[0] != null && this.bIgnoreInjury) {
                addDefValue = addDefBySourceBuff[0].fir_value;
            }
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var extra = 0;
            if (expect == true) {
                extra = (aAttribAddArr[1] - aAttribCutArr[1] + livingPerson + loseHpToProto) / 100;
            }
            else {
                extra = (aAttribAddArr[1] - aAttribCutArr[1] + livingPerson + loseHpToProto) / 100 + promoteValue - reduceValue - fireValue + addDefValue;
            }
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF);
            var base = (baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF]) / 100;
            if (this.isPerson()) {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                if (base <= 0) {
                    base = 0;
                }
                var real = value * percent + (this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF]) * base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
                if (real <= 0) {
                    real = 1;
                }
                return real;
            }
            else {
                var percent = 1 + extra;
                if (percent <= 0) {
                    percent = 0;
                }
                var real = value * percent + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF];
                if (real <= 0) {
                    real = 0;
                }
                return real;
            }
        };
        StageRole.prototype.getTalentEffective = function (eType, eCondition, target, param1) {
            var value = 0;
            var extra = 0;
            var extra2 = 0;
            var bActive = false;
            var father = null;
            var effective = null;
            var sortValue = [];
            var bOnly = false;
            var t = this.tableTalentEffect[eType];
            if (t != null && t.length != 0) {
                for (var i = 0; i < t.length; i++) {
                    var effect = t[i];
                    if (_isIgnoreInjureForTalent(eType) && this.bIgnoreInjury) {
                        break;
                    }
                    if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_GRAB_BUFF && effect.effect_extra2 != -1 && effect.active_num >= effect.effect_extra2) {
                        continue;
                    }
                    if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW) {
                        eCondition = this.fightScene.getGelRow(target.bEnemy, target.eTeamNum + 1, effect.effect_param);
                    }
                    var tag = false;
                    if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE) {
                        if ((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1) && param1 == effect.effect_extra) {
                            tag = true;
                        }
                        bOnly = true;
                    }
                    else if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE) {
                        if (((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1)) && param1 == effect.effect_extra) {
                            tag = true;
                        }
                    }
                    else if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ALLHURT_BY_ATKER_FACTION) {
                        if (((effect.effect_extraParam.length > 0 && effect.effect_extraParam[0] == -1) || (effect.effect_extraParam.indexOf(eCondition) != -1))) {
                            tag = true;
                        }
                    }
                    else if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BEINBUFF_IGNORE_HURT) {
                        var baseTbl = this.getBuffBaseTbl();
                        if (zj.Helper.tAnyIn(effect.effect_extraParam, baseTbl)) {
                            tag = true;
                        }
                    }
                    else {
                        if (effect.effect_param == eCondition || effect.effect_param == -1) {
                            tag = true;
                        }
                    }
                    if (tag) {
                        if (!effect.b_disappear) {
                            if (effect.isActive()) {
                                bActive = true;
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
                            if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_FUHUO) {
                                effect.belong_talent.revive_num = effect.belong_talent.revive_num + 1;
                                continue;
                            }
                            else if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUQU) {
                                effect.belong_talent.buqu_time = this.fightScene.realTime;
                                continue;
                            }
                            else if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD || eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2) {
                                effect.belong_talent.revive_num = effect.belong_talent.revive_num + 1;
                                continue;
                            }
                        }
                    }
                }
            }
            if (bActive && bOnly) {
                sortValue.sort(function (a, b) {
                    return b - a;
                });
                value = sortValue[0];
            }
            return [bActive, value, extra, extra2, effective, father];
        };
        StageRole.prototype.checkInstanceTalent = function (eType, eCondition, value, extra) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                if (talent.trigger_condition[0] == -1 || talent.trigger_condition.indexOf(eCondition) != -1) {
                    if (talent.isTouch() == true) {
                        talent.talentFun(value);
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.getBuffBaseTbl = function () {
            var tbl = [];
            var kv = {};
            for (var k in this.tableBuffs) {
                var v = this.tableBuffs[k];
                var base = v.getBuffBaseType();
                if (kv[base] == null) {
                    kv[base] = true;
                    tbl.push(base);
                }
            }
            return tbl;
        };
        StageRole.prototype.handleTalentEffect_ProtoAttriByDiff = function (type) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTR_PROMOTE_BY_DIFF, -1, null, null);
            var addValue = 0;
            if (type == arr[3] && arr[0] == true) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                addValue = arr[1] * arr[4].attriDiff / arr[2];
            }
            return addValue;
        };
        //根据攻防辅提升
        StageRole.prototype.handleTalentEffect_ProHurtByFeature = function (condition, proto) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FEATURE, condition, null, null);
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = arr[1];
            }
            return result[proto];
        };
        //念兽相关加基础
        StageRole.prototype.handleTalentEffect_ProHurtByFightType = function (condition, proto) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE, condition, null, proto);
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = result[arr[2]] + arr[1];
            }
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE, condition, null, proto);
            if (arr1[0] == true) {
                result[arr1[2]] = result[arr1[2]] + arr1[1];
            }
            return result[proto];
        };
        //念兽相关加基础
        StageRole.prototype.handleTalentEffect_ProHurtBySelfFaction = function (proto) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_SELF_FACTION, this.roleFaction, null, null);
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                result[arr[2]] = arr[1];
            }
            return result[proto];
        };
        StageRole.prototype.handleTalentEffect_LoseHpConverAddProto = function (condition) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_CONVERT_ADD_PROTO, condition, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var maxHp = this.getMaxHp(true);
                var curHp = this.getHp();
                if (maxHp <= 0) {
                    maxHp = 1;
                }
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                var per = (maxHp - curHp) / maxHp * 100;
                addValue = per / arr[2] * arr[1];
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_LivingPerson = function (condition) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LIVING_PERSON, condition, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var num = this.fightScene.getGeneralsNum(this.bEnemy, false) - 1;
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return addValue;
        };
        //[[根据指定buff的id获取特定buff及其位置索引]]
        StageRole.prototype.getBuff = function (sType) {
            // for(let k in this.tableBuffs){
            //     let v = this.tableBuffs[k];
            //     if(v.getBuffBaseType() == sType){
            //         return [v, k];
            //     }
            // }
            for (var i = 0; i < this.tableBuffs.length; i++) {
                var v = this.tableBuffs[i];
                if (v.getBuffBaseType() == sType) {
                    return [v, i + 1];
                }
            }
            return [null, -1];
        };
        StageRole.prototype.getBuffOverlayValue = function (type) {
            var value = 0;
            if (_isIgnoreInjureForBuff(type) && this.bIgnoreInjury)
                return value;
            for (var i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_type == type) {
                    value = value + this.tableBuffs[i].fir_value;
                }
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_ProtoToProto = function () {
            var tbl = [zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF,
                zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            var result = zj.Helper.CreateTalentAttrTbl();
            for (var i = 0; i < tbl.length; i++) {
                var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_RPOTO_TO_ATK, tbl[i], null, null);
                if (arr[0] == true) {
                    var ret = this.getProtoValue(arr[2]);
                    var addValue = ret * arr[1] / 100;
                    result[arr[3]] = result[arr[3]] + addValue;
                }
            }
            return result;
        };
        StageRole.prototype.getProtoValue = function (type) {
            var ret = 0;
            switch (type) {
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK:
                    ret = this.attribs.atk;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF:
                    ret = this.attribs.def;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV:
                    ret = this.attribs.htv;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA:
                    ret = this.attribs.eva;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF:
                    ret = this.attribs.ignorePhydef;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT:
                    ret = this.attribs.atkCritRate;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA:
                    ret = this.attribs.critExtra;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF:
                    ret = this.attribs.critDef;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE:
                    ret = this.attribs.hitRate;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE:
                    ret = this.attribs.dodgeRate;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED:
                    ret = this.attribs.cdSpeed;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP:
                    ret = this.attribs.maxHp;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS:
                    ret = this.attribs.unilResis;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS:
                    ret = this.attribs.ignoreResis;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS:
                    ret = this.attribs.floatResis;
                    break;
                case zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CUR_HP:
                    ret = this.getHp();
                    break;
            }
            return ret;
        };
        StageRole.prototype.bleedMakeRage = function (value) {
            var tmp = value;
            if (value >= this.getMaxHp(true)) {
                tmp = this.getMaxHp(true);
            }
            this.bleedSum = this.bleedSum + tmp;
            var value1 = this.handleTalentEffect_GetRage();
            var r_value = this.handleTalentEffect_ReduceRage();
            //回血增加怒气
            var p = 100 + value1 - r_value;
            if (p <= 0) {
                p = 0;
            }
            var tmp1 = this.getRageAddValue(EGetRageWay.Way_Blood) * p / 100;
            while (this.bleedSum > this.bloodTriggerLine) {
                this.bleedSum = this.bleedSum - this.bloodTriggerLine;
                this.dealRecRage(tmp1);
            }
        };
        StageRole.prototype.initBleedTriggerLine = function () {
            this.bloodTriggerLine = 0.05 * (this.getMaxHp());
        };
        StageRole.prototype.handleTalentEffect_GetRage = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_GET_RAGE, -1, null, null);
            return arr[1];
        };
        StageRole.prototype.handleTalentEffect_ReduceRage = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_GET_RAGE, -1, null, null);
            return arr[1];
        };
        StageRole.prototype.getRageAddValue = function (wayType) {
            var value = 0;
            if (wayType > EGetRageWay.Way_None && wayType < EGetRageWay.Way_Max) {
                if (this.fightScene.beInPvp()) {
                    value = zj.ConstantConfig_RoleBattle.RAGE_GET_VALUE.pvp[wayType];
                }
                else {
                    value = zj.ConstantConfig_RoleBattle.RAGE_GET_VALUE.pvp[wayType];
                }
            }
            return value;
        };
        StageRole.prototype.dealRecRage = function (value, bLast) {
            if (bLast === void 0) { bLast = false; }
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
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL) {
                this.fightScene.addRageYH(this, value);
            }
        };
        StageRole.prototype.playRageAni = function (rage, bLast) {
            if (bLast === void 0) { bLast = false; }
            if (zj.Gmgr.Instance.bGoLogin == true || this.bEnemy == true) {
                return;
            }
            if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                return;
            }
            var value = Math.abs(rage);
            value = Math.floor(value);
            var arr = this.fightScene.getRageTipPos(this.eTeamNum, 2);
            if (arr[0] != null && arr[1] != null) {
                if (rage < 0) {
                    this.createRageReduceNum(arr[0], arr[1], value);
                }
                else if (rage > 0) {
                    if (bLast == true) {
                        this.createRageZhanNum(arr[0], arr[1], value);
                    }
                    else {
                        this.createRageAddNum(arr[0], arr[1], value);
                    }
                }
                else {
                    return;
                }
            }
        };
        StageRole.prototype.createRageAddNum = function (baseX, baseY, value) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.nujia);
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.nuqishuzi2, value, zj.ConstantConfig_CommonBattle.nuqinum2.w, zj.ConstantConfig_CommonBattle.nuqinum2.h, zj.ConstantConfig_CommonBattle.nuqinum2.offset);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        };
        StageRole.prototype.createRageZhanNum = function (baseX, baseY, value) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.nuzhan);
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.nuqishuzi2, value, zj.ConstantConfig_CommonBattle.nuqinum2.w, zj.ConstantConfig_CommonBattle.nuqinum2.h, zj.ConstantConfig_CommonBattle.nuqinum2.offset);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        };
        StageRole.prototype.createRageReduceNum = function (baseX, baseY, value) {
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.nujian);
            num.setNumberInfo(zj.UIConfig.UIConfig_FightNumber.nuqishuzi1, value, zj.ConstantConfig_CommonBattle.nuqinum1.w, zj.ConstantConfig_CommonBattle.nuqinum1.h, zj.ConstantConfig_CommonBattle.nuqinum1.offset);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Left_Right_Short, null, null);
            num.setGap(0);
            num.setPosition(baseX, baseY);
            num.runAction();
            num.start();
        };
        //[[增加人物怒气]]
        StageRole.prototype.addRage = function (add) {
            var cur = this.getRage();
            this.setRage(cur + add);
        };
        //[[获得人物怒气]]
        StageRole.prototype.getRage = function () {
            return this.attribs.curRage;
        };
        //[[修改人物怒气]]
        StageRole.prototype.setRage = function (rage) {
            if (rage > this.getMaxRage()) {
                rage = this.getMaxRage();
            }
            if (rage < 0) {
                rage = 0;
            }
            this.SetAttrib("curRage", rage);
        };
        //[[获得人物最大怒气]]
        StageRole.prototype.getMaxRage = function () {
            this.CheatCheckSumAttr(null);
            var _max_rage = this.attribs.maxRage;
            if (this.relySupportRole != null) {
                _max_rage = this.relySupportRole.getSupportConsume();
            }
            return _max_rage;
        };
        //[[获得人物方位]]
        StageRole.prototype.getPositionType = function () {
            return this.ePosition;
        };
        StageRole.prototype.getLevel = function () {
            return this.attribs.level;
        };
        //[[获取武将等级]]
        //被动技
        StageRole.prototype.loadTalent = function () {
            var arr = zj.Gmgr.Instance.everybodyTalent;
            this.initTalent(zj.Gmgr.Instance.everybodyTalent[this.ePosition]);
            this.initTalent(zj.Gmgr.Instance.personalTalent[this.ePosition][this.roleInfo.general_id]);
        };
        //加载天赋(天赋数据的加载我方武将和ParticleSystemQuad敌方武将应该分开)
        StageRole.prototype.initTalent = function (t) {
            if (t == null) {
                return;
            }
            var tableTalent = zj.TableGeneralTalent.Table();
            var pressSkill = this.getPressSkill();
            for (var i = 0; i < t.length; i++) {
                if (tableTalent[t[i].id] == null) {
                    continue;
                }
                var level = t[i].level;
                if (level >= tableTalent[t[i].id].max_level) {
                    level = tableTalent[t[i].id].max_level;
                }
                var growthValue = 0;
                if (t[i].growthValue != null) {
                    growthValue = t[i].growthValue;
                }
                var talent = new zj.BaseTalent(t[i].id, level, this, t[i].bHide, t[i].source);
                if (talent != null) {
                    talent.growthValue = growthValue;
                }
                if (this.tableBaseTalent[talent.trigger_type] == null) {
                    var info = [];
                    info.push(talent);
                    this.tableBaseTalent[talent.trigger_type] = info;
                }
                else {
                    this.tableBaseTalent[talent.trigger_type].push(talent);
                }
            }
        };
        //[[获得动画buff—node]]
        StageRole.prototype.getBuffNode = function (pos) {
            var bone = null;
            if (pos == "up") {
                return this.nodeUp;
            }
            else if (pos == "mid") {
                return this.nodeMid;
            }
            else if (pos == "mid") {
                return this.nodeDown;
            }
        };
        //[[获得动画buff-name-node]]
        StageRole.prototype.getBuffNameNode = function () {
            // return this.nodeBuffName;
        };
        StageRole.prototype.triggerHit = function (skillType) {
            if (skillType == message.ESkillType.SKILL_TYPE_COMMON) {
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HIT, message.ESkillType.SKILL_TYPE_COMMON, null, null);
            }
            else if (skillType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HIT, message.ESkillType.SKILL_TYPE_HANDLE, null, null);
            }
        };
        //[[暴击]]
        StageRole.prototype.getCritRate = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.atkCritRate;
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var extra = arr[1] - arr1[1] + livingPerson + protomeByBuffNum + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        //[[获得暴伤附加值]]
        StageRole.prototype.getCritExtra = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.critExtra;
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var extra = arr[1] - arr1[1] + livingPerson + protomeByBuffNum + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_IgnoreCritDef = function (args) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_REAL_HURT, -1, null, null);
            return [arr[0], arr[1]];
        };
        //[[获得忽视物防]]
        StageRole.prototype.getIgnorePhydef = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.ignorePhydef;
            var addValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null);
            var cutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var extra = addValue[1] - cutValue[1] + livingPerson + protomeByBuffNum + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - baseCutValue[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_IgnoreTargetDef = function (def) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_IGNORE_TARGET_DEF, -1, null, null);
            var defValue = def;
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
        };
        StageRole.prototype.handleTalentEffect_Feishe = function (character, atkType) {
            if (character.getIsOnFloor() == true) {
                return [false, 0];
            }
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_FEISHE, atkType, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_Guidao = function (atkType) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_GUIDAO, atkType, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = ((this.getMaxHp(true) - this.getHp()) / this.getMaxHp(true)) * 100 * (arr[1] / arr[2]);
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_JianTa = function (character, atkType) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_JIANTA, atkType, null, null);
            var addValue = 0;
            var hpP = character.getHp() / character.getMaxHp(true) * 100;
            var realTag = false;
            if (arr[0] == true && hpP < arr[2]) {
                realTag = true;
                addValue = arr[1];
            }
            return [realTag, addValue];
        };
        //处理连击伤害
        StageRole.prototype.dealDouble = function (beAttackedRole) {
            var tBuff = null;
            var index = 0;
            var percent = 0;
            var bExtraShow = false;
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_DOUBLE_DEEP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return [bExtraShow, percent];
            }
            var arr1 = this.handleTalentEffect_Zhuiji();
            var gushouNum = beAttackedRole.handleTalentEffect_Gushou();
            percent = tBuff.fir_value * 100 + arr1[1] - gushouNum;
            if (arr[0] == true) {
                bExtraShow = true;
            }
            if (percent <= 0) {
                percent = 0;
            }
            return [bExtraShow, percent];
        };
        StageRole.prototype.handleTalentEffect_YanXing = function (character) {
            if (character.getIsOnFloor() == true) {
                return [false, 0];
            }
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_YANXING, -1, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_ChuanYang = function (character, atkType) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CHUANYANG, atkType, null, null);
            var addValue = 0;
            var hpP = character.getHp() / character.getMaxHp(true) * 100;
            var realTag = false;
            if (arr[0] == true && hpP > arr[2]) {
                realTag = true;
                addValue = arr[1];
            }
            return [realTag, addValue];
        };
        StageRole.prototype.handleTalentEffect_Meihuo = function (condition) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_MEIHUO, condition, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                //伤害值提升
                var num = this.fightScene.getGeneralsSexNum(zj.TableEnum.TableEnumSex.SEX_MALE);
                if (arr[2] <= 1) {
                    arr[2] = 1;
                }
                while (num > 0) {
                    num = num - arr[2];
                    addValue = addValue + arr[1];
                }
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_AtkRow = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATK_ROW, -1, character, null);
            return [arr[0], arr[1]];
        };
        //处理虚弱
        StageRole.prototype.dealWeak = function () {
            var weakBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_WEAK);
            var value = 0;
            if (weakBuff != null && weakBuff[0] != null) {
                value = weakBuff[0].fir_value;
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_ProHurtByTargetGroup = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_GROUP, target.groupTag, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_ProHurtByTargetFeature = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FEATURE, target.roleFeature, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_ProHurtByTargetFaction = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_TARGET_FACTION, target.roleFaction, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.handleTalentEffect_LivingHurt = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LIVING_ENEMY_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var ret = target.bEnemy;
                var num = this.fightScene.getGeneralsNum(ret, false);
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
        };
        StageRole.prototype.handleTalentEffect_DisFar = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DISTANCE_FAR_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1] * (target.eTeamNum + 1);
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_AttriDValueP = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_DVALUE_PERCENT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                var _l = this.getProtoValue(arr[2]);
                var _r = target.getProtoValue(arr[2]);
                addValue = arr[1] * Math.abs(_l - _r) / _r;
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_ProHurtByByTargetHpPer = function (target) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BYENEMYHPPER, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4], father = _a[5];
            var calcV = 0;
            if (tag) {
                if (target.getHp() / target.getMaxHp(true) * 100 > extra) {
                    calcV = value + target.eTeamNum * (effect.effect_extraParam[0] + effect.effect_extraParam[1] * father.talent_level);
                }
            }
            return [tag, calcV];
        };
        StageRole.prototype.handleTalentEffect_ProtoCompareToDamageAdd = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRI_COMPARE_RELATE_DAMAGE_ADD, -1, null, null);
            var addValue = 0;
            var result = zj.Helper.CreateTalentAttrTbl();
            if (arr[0] == true) {
                var ret1 = this.getProtoValue(arr[2]);
                var ret2 = character.getProtoValue(arr[2]);
                if (ret1 > ret2) {
                    addValue = arr[1];
                }
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleRageToHurt = function (character) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_RAGE_TO_HURT, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                if (arr[2] <= 0) {
                    arr[2] = 1;
                }
                addValue = character.getRage() / arr[2] * arr[1];
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_Zhuiji = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ZHUIJI, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return [arr[0], addValue];
        };
        StageRole.prototype.handleTalentEffect_ProtoToHurt = function (target) {
            var tbl = [zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF,
                zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT];
            var addValue = 0;
            for (var i = 0; i < tbl.length; i++) {
                var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROTO_TO_REALHURT, tbl[i], null, null);
                if (arr[0] == true) {
                    var ret = this.getProtoValue(arr[2]);
                    var arr1 = target.handleTalentEffect_ReduceRealHurt();
                    var percent = (100 - arr1[1]) / 100;
                    if (percent <= 0) {
                        percent = 0;
                    }
                    addValue = addValue + ret * arr[1] * percent / 100;
                }
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_AddHurtByTargetHp = function (hurt, target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ADDHURT_BY_TARGET_HP, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true) {
                hurtValue = hurtValue + target.getHp() * arr[1] / 100;
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_AddHurtByTargetMaxHp = function (hurt, target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ADDHURT_BY_TARGET_MAXHP, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true) {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                    if (target.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        arr[1] = 0;
                    }
                }
                var arr1 = target.handleTalentEffect_ReduceRealHurt();
                var percent = (100 - arr1[1]) / 100;
                if (percent <= 0) {
                    percent = 0;
                }
                hurtValue = hurtValue + target.getMaxHp(true) * arr[1] * percent / 100;
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_SecKill = function (hurt, target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_SEC_KILL, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true && target != null && target.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                var maxHp = target.getMaxHp();
                var curHp = target.getHp();
                if (maxHp <= 1) {
                    maxHp = 1;
                }
                var per = curHp / maxHp * 100;
                if (per < arr[1]) {
                    hurtValue = target.getHp();
                }
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_LostHpTrantoHurt = function (hurt, target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_LOSTHP_TRANTO_HURT, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true && target != null && target.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                var tvalue = (target.getMaxHp() - target.getHp()) * arr[1] / 100;
                hurtValue = hurtValue + tvalue;
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_AtkerLostHpTrantoHurt = function (hurt) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_SELF_LOSE_HP_TO_HURT, -1, null, null);
            var hurtValue = hurt;
            if (arr[0] == true) {
                var tvalue = (this.getMaxHp() - this.getHp()) * arr[1] / 100;
                hurtValue = hurtValue + tvalue;
            }
            return hurtValue;
        };
        StageRole.prototype.handleTalentEffect_GrabBuff = function (beAtkedRole) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_GRAB_BUFF, -1, null, null);
            if (arr[0] == true) {
                if (beAtkedRole != null && beAtkedRole.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS && arr[4].effect_extraParam.indexOf(zj.Gmgr.Instance.fightTalentType) != -1) {
                    return;
                }
                var cannotGrabTag = beAtkedRole.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CANNOT_GRAB_BUFF, -1);
                if (!cannotGrabTag) {
                    var index = beAtkedRole.randBuff(arr[2]);
                    if (index != -1) {
                        var targets = this.fightScene.getTargetPlayer(this, message.ETargetPosType.TARGET_POS_MINE, message.ETargetId.TARGET_RANDOM_ONE);
                        var buff = beAtkedRole.tableBuffs[index];
                        var buff_type = void 0, belong_role = void 0, buff_id = void 0, skill_level = void 0, target_role = void 0, belong_unit = void 0, is_fold = buff.getProto();
                        for (var k in targets) {
                            var v = targets[k];
                            var _buff = v.newBuff(buff_type, belong_role, buff_id, skill_level, v, belong_unit, is_fold);
                            v.addBuff(_buff);
                        }
                        beAtkedRole.deleteBuff(index);
                    }
                }
            }
        };
        //吸血
        StageRole.prototype.dealBleed = function (hurtValue) {
            var tBuff = null;
            var index = 0;
            var value = hurtValue;
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_SUCK_BLOOD);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff == null) {
                return;
            }
            var bleedValue = hurtValue * tBuff.fir_value;
            if (bleedValue >= 0) {
                this.suckBlood(bleedValue);
            }
        };
        //处理吸血
        StageRole.prototype.suckBlood = function (hurtValue) {
            var tmp = hurtValue * this.getRecoverRadio();
            if (tmp <= 1) {
                tmp = 1;
            }
            this.flowRecoverValue(tmp);
            this.dealRecHp(tmp);
        };
        //炸弹
        StageRole.prototype.beBombend = function (character, atkType, hurtValue) {
            var value = hurtValue;
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
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
            var showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            var _a = this.getHurtNumPos(), numX = _a[0], numY = _a[1];
            var right = zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_RIGHT, true, false);
            this.creatHurtNum(numX, numY, showValue);
            //处理hp
            var curHp = this.getHp();
            character.flowHurtValue(value, zj.yuan3(value > curHp, curHp, value), this);
            //定时流血
            this.bombHp(value);
            this.dealShelter(value);
            this.bleedMakeRage(value);
            this.dealHurtHpZero(character, value, null);
        };
        StageRole.prototype.bombHp = function (reduce, bFlow) {
            if (bFlow == null) {
                bFlow = true;
            }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce);
            }
            var cur = this.getHp();
            this.setHp(cur - reduce);
        };
        StageRole.prototype.getRecoverRadio = function () {
            var addP = this.handleTalentEffect_AddRecoverValue();
            var forbidden = this.getForbideRecoverValue();
            var radio = (1 + addP / 100) * (1 - forbidden);
            if (radio <= 0) {
                radio = 0;
            }
            return radio;
        };
        StageRole.prototype.handleTalentEffect_AddRecoverValue = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ADD_RECOVER_VALUE, -1, null, null);
            return arr[1];
        };
        StageRole.prototype.handleTalentEffect_SuckTrantoShield = function (hurtValue) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_SUCKHP_TRANTO_SHIELD, -1, null, null);
            if (arr[0]) {
                var surplus = this.getMaxHp(true) - this.getHp();
                var suckValue = hurtValue * arr[1] / 100;
                var recoverValue = 0;
                var shieldValue = 0;
                if (suckValue > surplus) {
                    recoverValue = surplus;
                    shieldValue = suckValue - surplus;
                }
                else {
                    recoverValue = suckValue;
                    shieldValue = 0;
                }
                this.suckBlood(recoverValue);
                if (shieldValue > 0 && arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    var ratio = (arr[4].effect_extraParam[0] + arr[4].effect_extraParam[1] * arr[5].talent_level);
                    var exitBuff = this.getBuffNumById(arr[4].effect_buffId);
                    if (exitBuff != null) {
                        exitBuff.sec_value = exitBuff.sec_value + shieldValue * ratio / 100;
                    }
                    else {
                        var arr1 = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                        var buff = arr1[0];
                        if (buff) {
                            buff.sec_value = shieldValue * ratio / 100;
                        }
                    }
                }
            }
        };
        StageRole.prototype.getBuffNumById = function (buffId) {
            for (var i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_id == buffId) {
                    return this.tableBuffs[i];
                }
            }
            return null;
        };
        StageRole.prototype.beBuffHurt = function (skillLevel, id, character, unit, effect, addRate) {
            var aa = null;
            if (this.bDead == true || this.bMomentDead == true) {
                return [aa, -1];
            }
            if (id == -1) {
                return [aa, -1];
            }
            var extraRate = zj.yuan3(addRate == null, 0, addRate);
            var hitRate = 0;
            var baseType = zj.TableEnum.TableBufferType.BUFFER_NONE;
            var damageType = message.EDamageType.DAMAGE_TYPE_NONE;
            var arr = zj.Helper.getBuffRelate(skillLevel, id);
            hitRate = arr[0];
            baseType = arr[1];
            damageType = arr[2];
            arr = zj.Helper.getBuffUseType(baseType);
            var useType = arr[0];
            var maxNum = arr[2];
            var currNum = this.getBuffNumByType(baseType);
            if (maxNum != -1 && currNum > maxNum) {
                return [aa, -1];
            }
            if (useType == zj.TableEnum.TableBuffUseType.Buff_Use_Good) {
                var tForbide = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_FORBIDE_STRENGTH);
                if (tForbide && tForbide[0] != null && tForbide[0].forbideTypeTbl[baseType] != null) {
                    tForbide[0].playTriggerSpx();
                    return [aa, -1];
                }
            }
            if (true) {
                var tImnue = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE);
                if (tImnue && tImnue[0] != null && tImnue[0].immuneTypeTbl[baseType] != null) {
                    tImnue[0].playTriggerSpx();
                    return [aa, -1];
                }
                var tImnue1 = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_IMMUNE2);
                if (tImnue1 && tImnue1[0] != null && tImnue1[0].immuneTypeTbl[baseType] != null) {
                    tImnue1[0].playTriggerSpx();
                    return [aa, -1];
                }
            }
            if (true) {
                //首先判断是否命中
                var realHit = ((hitRate + extraRate) / 100 * (1 + character.getHtv() / 100)) * 100;
                if (zj.percentIsEffect(realHit, character, this, "效果命中") == false) {
                    this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RESIST_BUFF, -1, null, null);
                    this.doResistUi();
                    return [null, 0];
                }
                //判断有害的是否被抵抗
                if (useType == zj.TableEnum.TableBuffUseType.Buff_Use_Bad) {
                    if (realHit <= 100) {
                        realHit = 100;
                    }
                    var evaHit = (1 - realHit / 100 / (1 + this.getEva() / 100)) * 100;
                    if (evaHit < 0) {
                        evaHit = 0;
                    }
                    if (zj.percentIsEffect(evaHit, character, this, "效果抵抗") == true) {
                        this.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_RESIST_BUFF, -1, null, null);
                        this.doResistUi();
                        return [aa, 0];
                    }
                }
            }
            if (!character.bEnemy) {
                if (zj.Gmgr.Instance.myUseBuffs[baseType] == null) {
                    zj.Gmgr.Instance.myUseBuffs[baseType] = true;
                }
            }
            character.checkInstanceTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BUFF_HIT, baseType);
            var buff = this.newBuff(baseType, character, id, skillLevel, this, unit);
            this.dealBuffBreak(buff);
            this.addBuff(buff);
            return [buff, 1];
        };
        StageRole.prototype.addBuff = function (buff) {
            this.tableBuffs.push(buff);
        };
        StageRole.prototype.dealBuffBreak = function (buff) {
            if (buff == null) {
                return;
            }
            function changeRoleState(role) {
                role.doBreak();
                role.doContinueBreak();
                role.doSkillBreak();
                role.setPos(role.x, role.y);
                if (role.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None || role.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    role.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Hurt);
                }
            }
            var breakTag = false;
            var type = buff.getBuffBaseType();
            if (this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && this.curSkill != null) {
                var damage = this.curSkill.getSkillDamageType();
                //缴械
                if (damage == message.EDamageType.DAMAGE_TYPE_PHY && type == zj.TableEnum.TableBufferType.BUFFER_DISARM) {
                    breakTag = true;
                }
            }
            if (breakTag == true || type == zj.TableEnum.TableBufferType.BUFFER_DIZZINESS || type == zj.TableEnum.TableBufferType.BUFFER_FROZEN || type == zj.TableEnum.TableBufferType.BUFFER_SLEEP || type == zj.TableEnum.TableBufferType.BUFFER_STONED || type == zj.TableEnum.TableBufferType.BUFFER_SILENCE) {
                changeRoleState(this);
            }
        };
        StageRole.prototype.newBuff = function (baseType, belong, id, level, target, unit) {
            //检测此类buff是否存在
            var arr = zj.getBuffUseType(baseType);
            var useType = arr[0];
            var is_fold = arr[1];
            var tBuff = null;
            var index = 0;
            var arr1 = this.getBuff(baseType);
            tBuff = arr1[0];
            index = arr1[1];
            if (tBuff != null && is_fold == 0) {
                zj.CC_SAFE_DELETE(tBuff);
                this.tableBuffs.splice(index, 1);
            }
            //生成此类buff
            var tag = zj.yuan3(tBuff != null && is_fold == 1, true, false);
            // let buff = new SkillBuff();
            var buff = zj.Game.ObjectPool.getItem("SkillBuff", zj.SkillBuff);
            buff.newSetData(belong, id, level, target, unit, tag);
            buff.playSpx();
            return buff;
        };
        StageRole.prototype.reduceFightExtraAttri = function (proto, value) {
            var base = this.getBaseProtoValue(proto);
            if (base = null) {
                return;
            }
            if (proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK || proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF
                || proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] - base * value / 100;
            }
            else {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] - value;
            }
            if (proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                zj.SkillCdMgr.Instance.reCalcCd(this.getPressSkill());
            }
        };
        StageRole.prototype.doResistUi = function () {
            var arr = this.getRoleUpPos(zj.TableEnum.TableRoleUpPosType.TYPE_RESIST);
            this.createResistNumber(arr[0], arr[1]);
        };
        StageRole.prototype.createResistNumber = function (baseX, baseY) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(zj.UIConfig.UIConfig_FightNumber.dikang);
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        //[[获得人物效果抵抗]]
        StageRole.prototype.getEva = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.eva;
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            var arr1 = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var extra = arr[1] - arr1[1] + livingPerson + loseHpToProto;
            var baseAddValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            var baseCutValue = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA, null, null);
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue[1] + baseByDiff - arr1[1] + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_EVA];
            var addBuffValue = 0;
            var adBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ADD_EVA);
            if (adBuff && adBuff[0] != null) {
                addBuffValue = adBuff[0].fir_value;
            }
            var reduceBuffValue = 0;
            var rdBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_REDUCE_EVA);
            if (rdBuff && rdBuff[0] != null) {
                reduceBuffValue = rdBuff[0].fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        StageRole.prototype.getBuffNumByType = function (type) {
            var num = 0;
            for (var i = 0; i < this.tableBuffs.length; i++) {
                if (this.tableBuffs[i].buff_type == type) {
                    num = num + 1;
                }
            }
            return num;
        };
        StageRole.prototype.handleTalentEffect_ProAtkerAllHurt = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PRO_ATKER_ALL_DAMAGE, -1, null, null);
            var addValue = 0;
            if (arr[0] == true) {
                addValue = arr[1];
            }
            return addValue;
        };
        StageRole.prototype.handleTalentEffect_CutMyHpToDamage = function (target) {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HIT_CUTMYHP_TO_DAMAGE, -1, null, null);
            if (arr[0]) {
                var n = (arr[4].effect_extraParam[1] + arr[4].effect_extraParam[2] * arr[5].talent_level);
                var constCut = this.getMaxHp() * n / 100;
                var willCutMyHp = -1;
                if (arr[4].sum_hp >= constCut || Math.floor(this.getHp()) <= 1) {
                    willCutMyHp = 0;
                }
                else {
                    var curPer = this.getHp() / this.getMaxHp() * 100;
                    if (curPer < arr[2]) {
                        willCutMyHp = this.getHp() - 1;
                        arr[4].sum_hp = arr[4].sum_hp + this.getHp() - 1;
                    }
                    else {
                        arr[4].sum_hp = arr[4].sum_hp + constCut;
                        willCutMyHp = constCut;
                    }
                }
                var willDamageHp = constCut * arr[1] / 100;
                this.dealCutHp(this, willCutMyHp, null, null, null);
                target.dealCutHp(this, willDamageHp, null, null, null);
            }
        };
        //直接减血
        StageRole.prototype.dealCutHp = function (character, value, bFrTalent, hurtDealType, bFlow) {
            if (this.isSupport()) {
                return;
            }
            if (hurtDealType == null) {
                hurtDealType = 1;
            }
            if (bFlow == null) {
                bFlow = true;
            }
            var hurtValue = value;
            if (hurtValue < 0) {
                return;
            }
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            hurtValue = hurtValue * ratio;
            if (1 == hurtDealType) {
                hurtValue = this.keepOutRealHurt(character, hurtValue);
                //处理所有伤害减免
                hurtValue = this.dealAllHurt(hurtValue, character);
                if (hurtValue < 1) {
                    hurtValue = 1;
                }
                var showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                var arr = this.getHurtNumPos();
                var numX = arr[0];
                var numY = arr[1];
                var right = zj.yuan3(this.getPosX() > character.getPos(), true, false);
                if (bFrTalent == true) {
                    this.creatHurtNum(numX, numY, showValue, right);
                }
                else {
                    this.creatHurtNum(numX, numY, showValue, right);
                }
                var curHp = this.getHp();
                if (bFlow) {
                    character.flowHurtValue(hurtValue, zj.yuan3(hurtValue > curHp, curHp, hurtValue), this);
                    this.bleedMakeRage(hurtValue);
                }
                //直接减血
                this.reduceHp(hurtValue, bFlow);
                this.dealShelter(hurtValue);
            }
            else if (hurtDealType == 2) {
                if (hurtValue < 1) {
                    hurtValue = 1;
                }
                this.reduceHp(hurtValue, bFlow);
            }
            else if (hurtDealType == 3) {
                if (hurtValue < 1) {
                    hurtValue == 1;
                }
                var showValue = hurtValue;
                if (this.isImmuning()) {
                    showValue = 1;
                }
                var numArr = this.getHurtNumPos();
                var numX = numArr[0];
                var numY = numArr[1];
                var right = zj.yuan3(this.getPosX() > character.getPos(), true, false);
                this.creatHurtNum(numX, numY, showValue, right);
                var curHp = this.getHp();
                if (bFlow) {
                    character.flowHurtValue(hurtValue, zj.yuan3(hurtValue > curHp, curHp, hurtValue), this);
                    this.bleedMakeRage(hurtValue);
                }
                this.reduceHp(hurtValue, bFlow);
                this.dealShelter(hurtValue);
            }
            this.dealHurtHpZero(character, hurtValue, null);
        };
        //[[减少人物血量]]
        StageRole.prototype.reduceHp = function (reduce, bFlow) {
            if (bFlow == null) {
                bFlow = true;
            }
            if (this.isRelicCensus() && bFlow) {
                this.calcShieldHp(reduce);
            }
            if (this.isImmuning()) {
                return;
            }
            var cur = this.getHp();
            this.setHp(cur - reduce);
        };
        StageRole.prototype.keepOutRealHurt = function (character, hurtValue) {
            var value = hurtValue;
            var arr = this.handleTalentEffect_ReduceRealHurt();
            var bCutValue = character.dealWeak();
            var percent = (100 - arr[1]) / 100 - bCutValue;
            if (percent <= 0) {
                percent = 0;
            }
            value = hurtValue * percent;
            return value;
        };
        StageRole.prototype.handleTalentEffect_ReduceRealHurt = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_REAL_HURT, -1, null, null);
            return [arr[0], arr[1]];
        };
        StageRole.prototype.getPos = function () {
            return [this.x, this.y];
        };
        //[[人物伤害总量]]
        StageRole.prototype.flowHurtValue = function (value, realValue, beAtkedRole) {
            this.hurtTotalValue = this.hurtTotalValue + value;
            if (beAtkedRole.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK
                    || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                    this.bossHurtValue = this.bossHurtValue + realValue;
                }
            }
        };
        StageRole.prototype.checkDeadTalent = function (eType, bRecord) {
            var t = this.tableBaseTalent[eType];
            if (t == null || t.length == 0) {
                return;
            }
            for (var i = 0; i < t.length; i++) {
                var talent = t[i];
                if (talent.trigger_condition[0] == -1) {
                    if (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN && (this.fightScene.realTime - talent.buqu_time) <= talent.extra_value && talent.buqu_time != 0) {
                        continue;
                    }
                    if (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH && talent.revive_num >= talent.extra_value) {
                        continue;
                    }
                    if (talent.isTouch() == true) {
                        if (bRecord == true) {
                            this.tableDeathTalent.push(talent);
                        }
                        else {
                            talent.talentFun(null);
                            talent.triggerEffect();
                        }
                        if (eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN ||
                            eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO ||
                            eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FEIGN_DEATH ||
                            eType == zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD) {
                            return;
                        }
                    }
                }
            }
        };
        //敌方人物触发
        StageRole.prototype.triggerEnemyTalent = function (type) {
            var enemyCamp = zj.yuan3(this.eCamp == 1, 2, 1);
            var enemys = this.fightScene.getPartnerDebar(enemyCamp, this);
            for (var j = 0; j < enemys.length; j++) {
                var role = enemys[j];
                var t = role.tableBaseTalent[type];
                if (t != null) {
                    for (var i = 0; i < t.length; i++) {
                        var talent = t[i];
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.handleTalentEffect_WillDead2 = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD2, -1, null, null);
            if (arr[0] == true) {
                //不屈起身前要清除减益buff
                this.clearUseBuffs(zj.TableEnum.TableBuffUseType.Buff_Use_Bad);
                //生命值设置为1
                var hp = 1;
                if (arr[4] != null && arr[4].effect_extraParam > 1) {
                    var ratio = (arr[4].effect_extraParam[1] + arr[4].effect_extraParam[2] * arr[5].talent_level);
                    hp = this.getMaxHp(true) * ratio / 100;
                }
                this.setHp(hp);
                //添加无敌buff
                if (arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    var buff = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                }
            }
            return arr[0];
        };
        //[[清除有益或减益buff]]
        StageRole.prototype.clearUseBuffs = function (useType) {
            var i = 0;
            while (i < this.tableBuffs.length) {
                var tBuff = this.tableBuffs[i];
                var type = tBuff.getBuffUseType();
                if (type == useType) {
                    this.openFoldBuffEffect(tBuff);
                    zj.CC_SAFE_DELETE(tBuff);
                    this.tableBuffs.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageRole.prototype.handleTalentEffect_WillDead = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_WILL_DEAD, -1, null, null);
            if (arr[0] == true) {
                //不屈起身前要清除所有buff
                this.clearAllBuffs();
                //生命值设置为1
                this.setHp(1);
                //添加无敌buff
                if (arr[4] != null && arr[4].effect_buffLv != -1 && arr[4].effect_buffId != -1) {
                    var buff = this.beBuffHurt(arr[4].effect_buffLv, arr[4].effect_buffId, this, null, null, null);
                }
            }
            return arr[0];
        };
        //[[清除所有buff]]
        StageRole.prototype.clearAllBuffs = function () {
            var i = 0;
            while (i < this.tableBuffs.length) {
                zj.CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];
            this.bStun = false;
            this.bSilence = false;
            this.bDisarm = false;
            this.bFrozen = false;
            this.bStoned = false;
            this.bSleep = false;
        };
        StageRole.prototype.loadClientData = function () {
            var attrTbl = [];
            var arr = zj.PlayerHunterSystem.CalcBattleGelAttr(this, null);
            attrTbl = arr[0];
            this.tablePotatoSkill = arr[1];
            this.baseAttribs = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(this.roleInfo);
            this.SetAttrib("maxHp", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_HP]);
            this.SetAttrib("curHp", this.attribs.maxHp);
            this.SetAttrib("atkAll", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_ATK_ALL]);
            this.SetAttrib("defAll", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_DEF_ALL]);
            this.SetAttrib("critAll", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_ALL]);
            this.SetAttrib("ignoreAll", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_ALL]);
            this.SetAttrib("atk", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK]);
            this.SetAttrib("def", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF]);
            this.SetAttrib("htv", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_HTV]);
            this.SetAttrib("eva", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_EVA]);
            this.SetAttrib("atkCritRate", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT]);
            this.SetAttrib("skillCritRate", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_SKILL_CRIT]);
            this.SetAttrib("sacredCritRate", 0);
            this.SetAttrib("critExtra", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA]);
            this.SetAttrib("critDef", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS]);
            this.SetAttrib("hitRate", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_HIT_RATE]);
            this.SetAttrib("dodgeRate", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE]);
            this.SetAttrib("ignorePhydef", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF]);
            this.SetAttrib("ignoreMagicdef", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_MAGICDEF]);
            this.SetAttrib("ignoreScaredef", 0);
            this.SetAttrib("finalExtraHurt", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_EXTRA]);
            this.SetAttrib("finalReduceHurt", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_FINAL_REDUCE]);
            this.SetAttrib("unilResis", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS]);
            this.SetAttrib("ignoreResis", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS]);
            this.SetAttrib("floatResis", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS]);
            this.SetAttrib("cdSpeed", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED]);
            this.SetAttrib("supportConsume", attrTbl[zj.TableEnum.EnumGelAttrib.ATTR_SUPPORT_CONSUME]);
            this.CheatCalcSumAttr();
        };
        StageRole.prototype.CheatCalcSumAttr = function () {
            var today = new Date();
            this.cheat_checkAttr = 0;
            this.cheat_checkTime = today.getTime();
            this.cheat_diffvalue = 0;
            this.cheat_range = 0;
            var baseAttribs = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(this.roleInfo);
            for (var j = 0; j < zj.TableEnum.EnumAttriReal.length; j++) {
                var i = zj.TableEnum.EnumAttriReal[j];
                this.cheat_checkAttr = this.cheat_checkAttr + baseAttribs[i];
            }
            for (var k in this.attribs) {
                var v = this.attribs[k];
                if (k != "curRage") {
                    this.cheat_checkAttr = this.cheat_checkAttr + v;
                }
            }
        };
        StageRole.prototype.handleTalentEffect_EntryTime = function () {
            var arr = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_CHANGE_ENTRY_TIME, -1, null, null);
            return arr[1];
        };
        //[[buff加速影响值]]
        StageRole.prototype.getBuffSpeedUp = function () {
            var tBuff = null;
            var index = 0;
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_SPEED_UP);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff != null) {
                return tBuff.fir_value;
            }
            return 0;
        };
        //[[buff减速影响值]]
        StageRole.prototype.getBuffSpeedDown = function () {
            var tBuff = null;
            var index = 0;
            var arr = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_SPEED_DOWN);
            tBuff = arr[0];
            index = arr[1];
            if (tBuff != null) {
                return tBuff.fir_value;
            }
            return 0;
        };
        StageRole.prototype.handleTalentEffect_KillNoRevive = function (target) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_KILL_NO_REVIVE, -1, null, null), tag = _a[0], value = _a[1];
            if (tag == true && target != null) {
                target.bNoRevive = true;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_WILL_DEAD] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_DEATH] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ZIBAO] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HUITIAN] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUHUO] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_YIJI] = null;
                target.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_FUCHOU] = null;
            }
        };
        StageRole.prototype.creatAttriInfo = function () {
            var info = new message.AttriInfo();
            info.general_hp = this.attribs.maxHp;
            info.general_atk = this.attribs.atk;
            info.general_def = this.attribs.def;
            info.skill_atk = this.attribs.htv;
            info.skill_def = this.attribs.eva;
            info.atk_crit = this.attribs.atkCritRate;
            info.skill_crit = this.attribs.skillCritRate;
            info.crit_extra = this.attribs.critExtra;
            info.crit_resistance = this.attribs.critDef;
            info.dodge_rate = this.attribs.dodgeRate;
            info.hit_rate = this.attribs.hitRate;
            info.ignore_phyDef = this.attribs.ignorePhydef;
            info.ignore_magicDef = this.attribs.ignoreMagicdef; // 打断浮空
            info.final_extra = this.attribs.finalExtraHurt;
            info.final_reduce = this.attribs.finalReduceHurt;
            info.general_atk_all = this.attribs.atkAll;
            info.general_def_all = this.attribs.defAll;
            info.all_crit = this.attribs.critAll;
            info.ignore_def_all = this.attribs.ignoreAll;
            info.universal_resistance = this.attribs.unilResis;
            info.ignore_resistance = this.attribs.ignoreResis;
            info.float_resistance = this.attribs.floatResis;
            info.cd_speed = this.attribs.cdSpeed;
            info.support_consume = this.attribs.supportConsume;
            return info;
        };
        StageRole.prototype.loadAttriTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALETN_TRIGGER_MY_SELF_ATTRI];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.isTouch() == true) {
                        talent.talentFun();
                        talent.triggerEffect();
                    }
                }
            }
        };
        StageRole.prototype.loadFightSpxRes = function () {
        };
        StageRole.prototype.loadStorageSpx = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_xuli;
            var armature = zj.HunterSpineX(name, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            armature.setVisibleSpx(false);
            this.nodeRoot.addChild(armature.spine);
            armature.stopAllActions();
            armature.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
            this.storageSpx = armature;
        };
        StageRole.prototype.animationTimeEvent = function () {
            //this.storageSpx.clearSpine();
            //this.storageSpx = null;
            this.storageSpx.stopAllActions();
            this.storageSpx.setVisibleSpx(false);
        };
        StageRole.prototype.openRoleDcUI = function () {
            if (this.bInGut) {
                return;
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
        };
        StageRole.prototype.closeRoleDcUI = function () {
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
        };
        StageRole.prototype.loadServerData = function () {
            this.SetAttrib("maxHp", this.roleInfo.attri.general_hp);
            this.SetAttrib("curHp", this.attribs.maxHp);
            this.SetAttrib("atkAll", this.roleInfo.attri.general_atk_all);
            this.SetAttrib("defAll", this.roleInfo.attri.general_def_all);
            this.SetAttrib("critAll", this.roleInfo.attri.all_crit);
            this.SetAttrib("ignoreAll", this.roleInfo.attri.ignore_def_all);
            this.SetAttrib("atk", this.roleInfo.attri.general_atk);
            this.SetAttrib("def", this.roleInfo.attri.general_def);
            this.SetAttrib("htv", this.roleInfo.attri.skill_atk);
            this.SetAttrib("eva", this.roleInfo.attri.skill_def);
            //this.SetAttrib("sacredAtk", 0)
            //this.SetAttrib("sacredDef", 0)
            this.SetAttrib("atkCritRate", this.roleInfo.attri.atk_crit);
            this.SetAttrib("skillCritRate", this.roleInfo.attri.skill_crit);
            this.SetAttrib("sacredCritRate", 0);
            this.SetAttrib("critExtra", this.roleInfo.attri.crit_extra);
            this.SetAttrib("critDef", this.roleInfo.attri.crit_resistance);
            this.SetAttrib("hitRate", this.roleInfo.attri.hit_rate);
            this.SetAttrib("dodgeRate", this.roleInfo.attri.dodge_rate);
            this.SetAttrib("ignorePhydef", this.roleInfo.attri.ignore_phyDef);
            this.SetAttrib("ignoreMagicdef", this.roleInfo.attri.ignore_magicDef);
            this.SetAttrib("ignoreScaredef", 0);
            this.SetAttrib("finalExtraHurt", this.roleInfo.attri.final_extra);
            this.SetAttrib("finalReduceHurt", this.roleInfo.attri.final_reduce);
            this.SetAttrib("unilResis", this.roleInfo.attri.universal_resistance);
            this.SetAttrib("ignoreResis", this.roleInfo.attri.ignore_resistance);
            this.SetAttrib("floatResis", this.roleInfo.attri.float_resistance);
            this.SetAttrib("cdSpeed", this.roleInfo.attri.cdSpeed);
            this.SetAttrib("supportConsume", this.roleInfo.attri.supportConsume);
        };
        //角色数据模型
        StageRole.prototype.getRoleInfo = function () {
            return this.roleInfo;
        };
        StageRole.prototype.newTalentEffect = function (belongTalent, id, value) {
            var talentEffect = zj.TableGeneralTalentEffect.Table();
            var eType = talentEffect[id].effect_type;
            var effect = new zj.TalentEffect(this, belongTalent, id, value);
            var t = this.tableTalentEffect[eType];
            if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_HURT_BY_FIGHT_TYPE) {
                if (belongTalent.belong_role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP ||
                    belongTalent.belong_role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    return;
                }
            }
            if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_PROTO_BY_FIGHT_TYPE) {
                if (belongTalent.belong_role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP ||
                    belongTalent.belong_role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    return;
                }
            }
            if (t == null) {
                var info = [];
                info.push(effect);
                this.tableTalentEffect[eType] = info;
            }
            else {
                if (eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP ||
                    eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_REDUCE_HP ||
                    eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_HURT_VALUE_ADD_HP2) {
                    this.tableTalentEffect[eType].push(effect);
                }
                else {
                    var _a = zj.Table.FindR(t, function (_k, _v) {
                        if (_v.effect_id == id) {
                            return true;
                        }
                    }), _v = _a[0], _k = _a[1];
                    if (_v != null && eType == zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_NUMBER_OF_ATK_LIMITED) {
                        _v.trigger_num = _v.trigger_num + 1;
                        _v.effect_value = _v.bakeup_value * _v.trigger_num;
                    }
                    else {
                        this.tableTalentEffect[eType].push(effect);
                    }
                }
            }
        };
        //获得人物其他形态
        StageRole.prototype.getOtherState = function () {
            return this.otherState;
        };
        //人物跑步状态
        StageRole.prototype.setRunState = function (state) {
            this.runState = state;
        };
        StageRole.prototype.clearRun = function () {
            this.runDis = 0;
        };
        //获得人物效果命中
        StageRole.prototype.getHtv = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.htv;
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null), aAttribAdd = _a[0], addValue = _a[1];
            var _b = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null), aAttribCut = _b[0], cutValue = _b[1];
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var extra = addValue - cutValue + livingPerson + protomeByBuffNum + loseHpToProto;
            var _c = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null), baseAddValue = _c[1];
            var _d = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV, null, null), baseCutValue = _d[1];
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_HTV];
            var addBuffValue = 0;
            var adBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_ADD_HTV)[0];
            if (adBuff) {
                addBuffValue = adBuff.fir_value;
            }
            var reduceBuffValue = 0;
            var rdBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_REDUCE_HTV)[0];
            if (rdBuff) {
                reduceBuffValue = rdBuff.fir_value;
            }
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV] + (addBuffValue - reduceBuffValue) * 100;
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        //忽视格挡
        StageRole.prototype.getHitRate = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.hitRate;
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null), bAttribAdd = _a[0], addValue = _a[1];
            var _b = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null), bAttribCut = _b[0], cutValue = _b[1];
            //处理迷惑
            var buffValue1 = 0;
            var hitBuff = this.getBuff(zj.TableEnum.TableBufferType.BUFFER_CONFUSE)[0];
            if (hitBuff) {
                buffValue1 = hitBuff.fir_value;
            }
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var protomeByBuffNum = this.handleTalentEffect_ProtomeByNumOfBuff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var extra = addValue - cutValue + livingPerson + protomeByBuffNum + loseHpToProto - buffValue1 * 100;
            var _c = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null), baseAddValue = _c[1];
            var _d = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE, null, null), baseCutValue = _d[1];
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_HIT_RATE];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        //获得通用抵抗
        StageRole.prototype.getUnilResis = function () {
            this.CheatCheckSumAttr(null);
            var value = this.attribs.unilResis;
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS, null, null), bAttribAdd = _a[0], addValue = _a[1];
            var _b = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS, null, null), bAttribCut = _b[0], cutValue = _b[1];
            var livingPerson = this.handleTalentEffect_LivingPerson(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            //local protomeByBuffNum = this:handleTalentEffect_ProtomeByNumOfBuff(TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS)
            var loseHpToProto = this.handleTalentEffect_LoseHpConverAddProto(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            var extra = addValue - cutValue + livingPerson + loseHpToProto;
            var _c = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_ADD_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null), baseAddValue = _c[1];
            var _d = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_ATTRIBUTE_REDUCE_BASE, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF, null, null), baseCutValue = _d[1];
            var baseByFaction = this.handleTalentEffect_ProHurtBySelfFaction(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            var baseByFightType = this.handleTalentEffect_ProHurtByFightType(zj.Gmgr.Instance.fightTalentType, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            var baseByFeature = this.handleTalentEffect_ProHurtByFeature(this.roleFeature, zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            var baseByDiff = this.handleTalentEffect_ProtoAttriByDiff(zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS);
            var base = baseByFaction + baseByFightType + baseByFeature + baseAddValue + baseByDiff - baseCutValue + this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS];
            value = value + extra + base + this.fightExtraAttribs[zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS];
            if (value <= 0) {
                value = 0;
            }
            return value;
        };
        StageRole.prototype.getRealPos = function () {
            return [this.realX, this.realY];
        };
        StageRole.prototype.flashMove = function (move_finish_CB, thisobj, des_x, des_y) {
            var _this = this;
            this.is_flashing = true;
            this.setRealPos(des_x, des_y);
            this.setHomingVisible(false);
            var timeOut = egret.setTimeout(function () {
                _this.is_flashing = false;
                _this.setHomingVisible(true);
                _this.setPos(des_x, des_y);
                if (move_finish_CB && thisobj) {
                    move_finish_CB.call(thisobj);
                }
                egret.clearTimeout(timeOut);
            }, this, 80);
        };
        StageRole.prototype.breakMoveAni = function (move_finish_CB, thisobj, des_x, des_y) {
            var _this = this;
            var sx = this.x;
            var sy = this.y;
            var ex = zj.yuan3(des_x == null, this.teamOriginalX, des_x);
            var ey = zj.yuan3(des_y == null, this.teamOriginalY, des_y);
            this.is_breakMoving = true;
            this.setRealPos(ex, ey);
            this.setHomingVisible(false);
            var timeOut = egret.setTimeout(function () {
                _this.is_breakMoving = false;
                _this.setHomingVisible(true);
                _this.backHoming();
                if (move_finish_CB && thisobj) {
                    move_finish_CB.call(thisobj);
                }
                egret.clearTimeout(timeOut);
            }, this, 80);
        };
        StageRole.prototype.getFormType = function () {
            return this.formType;
        };
        StageRole.prototype.playTalentEffect = function (talentEffect) {
        };
        //获得初始人物特殊形态
        StageRole.prototype.getInitSpecialState = function () {
            return this.initSpecialState;
        };
        StageRole.prototype.getIsUseAi = function () {
            //return this.bUseAi;
        };
        //是否受重力影响
        StageRole.prototype.getIsGravity = function () {
            return this.bGravity;
        };
        //是否取消冲刺
        StageRole.prototype.getCancelSprint = function () {
            return this.bCancelSprint;
        };
        //人物是否死亡
        StageRole.prototype.getIsDead = function () {
            return this.bDead;
        };
        StageRole.prototype.getFloor = function () {
            return this.floor;
        };
        //定时回血
        StageRole.prototype.beRecoverBlood = function (character, hurtValue) {
            var tmp = hurtValue * this.getRecoverRadio();
            if (tmp <= 1) {
                tmp = 1;
            }
            character.flowRecoverValue(tmp);
            var dif = this.dealRecHp(tmp);
            return dif;
        };
        //定时流血
        StageRole.prototype.beBleeded = function (character, atkType, hurtValue) {
            //增益伤害抵挡
            var value = this.keepOutHurt(atkType, hurtValue);
            value = this.keepOutRealHurt(character, value);
            //是否有伤害加深buff
            //value = this.dealWeak(value);
            //减少持续伤害的天赋效果
            var reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            //处理所有伤害减免
            value = this.dealAllHurt(value, character);
            //取值范围
            if (value < 0) {
                return;
            }
            if (value < 1) {
                value = 1;
            }
            var showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            var _a = this.getHurtNumPos(), numX = _a[0], numY = _a[1];
            var right = zj.yuan3(this.ePosition == zj.TableEnum.TablePositionType.POSITION_RIGHT, true, false);
            this.creatHurtNum(numX, numY, showValue);
            //处理hp
            var curHp = this.getHp();
            character.flowHurtValue(value, zj.yuan3(value > curHp, curHp, value), this);
            //定时流血
            this.reduceHp(value, null);
            this.dealShelter(value);
            this.bleedMakeRage(value);
            this.dealHurtHpZero(character, value, null);
        };
        StageRole.prototype.handleTalentEffect_ReduceContinueDamage = function () {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_REDUCE_CONTINUE_DAMAGE, -1, null, null), tag = _a[0], value = _a[1];
            var tValue = 0;
            if (tag == true) {
                tValue = value;
            }
            return tValue;
        };
        //增加buff时间
        StageRole.prototype.dealTimeBuff = function (stanardType, baseType) {
            var value = 0;
            for (var i = 0; i < this.tableBuffs.length; i++) {
                var v = this.tableBuffs[i];
                if (v.getBuffBaseType() == stanardType) {
                    if (v.timeType[baseType] != null && v.timeType[baseType] >= 1) {
                        value = value + v.fir_value;
                    }
                }
            }
            return value;
        };
        StageRole.prototype.handleTalentEffect_BuffEffectPro = function (buffType) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_BUFF_EFFECT_PRO, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4];
            var addValue = 0;
            if (tag == true && zj.Table.FindK(effect.effect_extraParam, buffType) != -1) {
                addValue = value;
            }
            return addValue;
        };
        StageRole.prototype.getBuffNodePosXy = function (pos) {
            var x = 0;
            var y = 0;
            var node = this.getBuffNode(pos);
            if (node != null) {
                x = node.x;
                y = node.y;
            }
            return [x, y];
        };
        StageRole.prototype.beCanHurt = function () {
            var tag = true;
            if (this.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_Super
                || this.specialState == zj.TableEnum.TableEnumSpecialState.SpecialState_GetUp_Super
                || this.bDead == true
                || this.bBomb == true
                || this.bMomentDead == true
                || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                tag = false;
            }
            return tag;
        };
        //[[设置归位是否隐藏]]
        StageRole.prototype.setHomingVisible = function (tag) {
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
        };
        //[[获得正在施加伤害的角色]]
        StageRole.prototype.getBringHurtRole = function () {
            return this.bringHurtRole;
        };
        StageRole.prototype.isPlaySkillUiLegeal = function () {
            if (this.bPauseBlack == true) {
                return false;
            }
            if (this.checkBuffLegeal() == false) {
                return false;
            }
            var isFloor = this.getIsOnFloor();
            if ((this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Parry) && !isFloor) {
                return false;
            }
            if (!(this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt || this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Hurt_Heavy ||
                this.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Parry)) {
                return false;
            }
            return true;
        };
        //设置人物技能cd
        StageRole.prototype.setPressCdTime = function (time) {
            var skill = this.getPressSkill();
            if (skill != null) {
                var cd = zj.SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.setTime(time);
                }
            }
        };
        //设置人物技能最大cd
        StageRole.prototype.resetPressMaxCd = function () {
            var skill = this.getPressSkill();
            if (skill != null) {
                var cd = zj.SkillCdMgr.Instance.getCurCd(skill);
                if (cd != null) {
                    return cd.setMaxTime(skill.getCd());
                }
            }
        };
        StageRole.prototype.getCurBeanNum = function () {
            return this.curBeanNum;
        };
        StageRole.prototype.setCurBeanNum = function (num) {
            this.curBeanNum = num;
        };
        StageRole.prototype.isHandleCdOk = function () {
            var tag = false;
            if (this.pressCd != null) {
                tag = this.pressCd.IsFinish();
            }
            if (tag && zj.Game.TeachSystem.curPart == 4002) {
                zj.Game.EventManager.event(zj.GameEvent.SKILL_CD_OK, { isOk: true });
            }
            return tag;
        };
        //获得作为援护怒气消耗值
        StageRole.prototype.getSupportConsume = function () {
            this.CheatCheckSumAttr();
            var reduce = this.rageReducePlus;
            return this.attribs.supportConsume * (1 - reduce);
        };
        StageRole.prototype.setNoticeTouchType = function (type) {
            if (type == message.ESkillType.SKILL_TYPE_HANDLE) {
                if (this.playSkillAtk(0) == true) {
                    this.fightScene.dealSkillUi(this);
                }
            }
            else if (type == message.ESkillType.SKILL_TYPE_DEATH) {
                if (this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.playSkillAtk(0);
                }
            }
        };
        //根据个数和类型来驱散buff
        StageRole.prototype.clearBuffsByNumAType = function (totalNum, tbl) {
            var num = 0;
            var i = 0;
            while (i < this.tableBuffs.length) {
                var tBuff = this.tableBuffs[i];
                var base = tBuff.getBuffBaseType();
                if (tbl[base] != null && tbl[base] >= 1) {
                    this.openFoldBuffEffect(tBuff);
                    zj.CC_SAFE_DELETE(tBuff);
                    this.tableBuffs.splice(i, 1);
                    num = num + 1;
                }
                else {
                    i = i + 1;
                }
                if (num >= totalNum) {
                    continue;
                }
            }
            return num;
        };
        //定时中毒掉血
        StageRole.prototype.bePoisonBlood = function (character, hurtValue) {
            //增益伤害抵挡
            var value = this.keepOutHurt(null, hurtValue);
            value = this.keepOutRealHurt(character, value);
            //减少持续伤害的天赋效果
            var reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            this.dealCutHp(character, value, false, null, null);
        };
        StageRole.prototype.beWoundedBlood = function (character, hurtValue) {
            //增益伤害抵挡
            var value = this.keepOutHurt(null, hurtValue);
            value = this.keepOutRealHurt(character, value);
            //减少持续伤害的天赋效果
            var reduceValue = this.handleTalentEffect_ReduceContinueDamage();
            value = value * (100 - reduceValue) / 100;
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            this.dealCutHp(character, value, false, null, null);
        };
        //获得正在进行目标者
        StageRole.prototype.getHurtingRole = function () {
            return this.hurtingRole;
        };
        //设置依赖援护
        StageRole.prototype.setRelySupportRole = function (role) {
            this.relySupportRole = role;
        };
        StageRole.prototype.appearSupportFight = function () {
            this.loadEntireTalent();
            this.appearSpeical();
        };
        StageRole.prototype.dealCutRage = function (value) {
            this.reduceRage(value);
            this.playRageAni((-1) * value);
        };
        StageRole.prototype.dealAddCd = function (value, isOverFlow) {
            zj.SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), value, null, isOverFlow);
            this.playCdAni(value / 1000);
        };
        StageRole.prototype.dealCutCd = function (value, tag) {
            if (value > 0) {
                this.enemyTriggerWhenCdCut();
            }
            var effectValue = this.dealCdEffect();
            zj.SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), value * (-1) * effectValue, tag, null);
            this.playCdAni(-(value / 1000));
        };
        StageRole.prototype.enemyTriggerWhenCdCut = function () {
            if (this.bEnemy) {
                for (var k in this.fightScene.tableAllys) {
                    var v = this.fightScene.tableAllys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyCdCut();
                    }
                }
            }
            else {
                for (var k in this.fightScene.tableEnemys) {
                    var v = this.fightScene.tableEnemys[k];
                    if (v != null && !v.bDead) {
                        v.triggerEnemyCdCut();
                    }
                }
            }
        };
        StageRole.prototype.triggerEnemyCdCut = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_CD_REDUCE];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || zj.Table.FindK(talent.trigger_condition, -1) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.dealAddCdMax = function () {
            if (this.getPressSkill() != null) {
                zj.SkillCdMgr.Instance.modifySkillCd(this, this.getPressSkill(), this.getPressSkill().getCd(), null, null);
            }
        };
        //减少人物怒气
        StageRole.prototype.reduceRage = function (reduce) {
            var cur = this.getRage();
            this.setRage(cur - reduce);
        };
        StageRole.prototype.triggerTouchSupportTalent = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TOUCH_SUPPORT];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if (talent.trigger_condition[0] == -1) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.setAppearCallback = function (callback, thisobj) {
            this.appearthisobj = thisobj;
            this.appearCallback = callback;
        };
        StageRole.prototype.triggerEnemySupportSkill = function () {
            var t = this.tableBaseTalent[zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ENEMY_RELEASE_SUPPORT_SKILL];
            if (t != null) {
                for (var i = 0; i < t.length; i++) {
                    var talent = t[i];
                    if ((talent.trigger_condition[0] == -1 || zj.Table.FindK(talent.trigger_condition, -1) != -1)) {
                        if (talent.isTouch() == true) {
                            talent.talentFun();
                            talent.triggerEffect();
                        }
                    }
                }
            }
        };
        StageRole.prototype.handleTalentEffect_DispelUsefulToPosion = function (targetRole, num) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_DISPEL_USEFUL_TO_POISON, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4];
            if (tag == true) {
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    var realNum = zj.yuan3(num > extra, extra, num);
                    for (var i = 0; i < realNum; i++) {
                        targetRole.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this);
                    }
                }
            }
        };
        StageRole.prototype.handleTalentEffect_PurgeTrantoRecover = function (targetRole, num) {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PURGE_TRANTO_RECOVER, -1, null, null), tag = _a[0], value = _a[1], extra = _a[2], extra2 = _a[3], effect = _a[4];
            if (tag == true) {
                if (effect != null && effect.effect_buffLv != -1 && effect.effect_buffId != -1) {
                    var realNum = zj.yuan3(num > extra, extra, num);
                    for (var i = 0; i < realNum; i++) {
                        targetRole.beBuffHurt(effect.effect_buffLv, effect.effect_buffId, this);
                    }
                }
            }
        };
        StageRole.prototype.getSingleTalentEffect = function (eType) {
            var t = this.tableTalentEffect[eType];
            if (t != null && t.length != 0) {
                return t[0];
            }
            return null;
        };
        //处理相关类型的时间
        StageRole.prototype.dealAllTimeBuff = function (tbl, value1) {
            var value = 0;
            for (var k in this.tableBuffs) {
                var v = this.tableBuffs[k];
                var baseType = v.getBuffBaseType();
                if (tbl[baseType] != null && tbl[baseType] >= 1) {
                    v.continue_time = v.continue_time * (1 + value);
                }
            }
            return value;
        };
        //人物伤害总量
        StageRole.prototype.getflowHurtValue = function (value) {
            return this.hurtTotalValue;
        };
        //人物回血总量
        StageRole.prototype.getflowRecoverValue = function (value) {
            return this.recoverTotalValue;
        };
        StageRole.prototype.CheatGetPluginState = function () {
            if (this.cheat_diffvalue != null && this.cheat_range != null) {
                return zj.Helper.StringFormat("%.2f|%.2f", this.cheat_diffvalue, this.cheat_range);
            }
            return "";
        };
        StageRole.prototype.makeSkillsData = function (tbl) {
            for (var i = 0; i < this.tableCommons.length; i++) {
                var msg = this.tableCommons[i].makeSkillTableInfo();
                tbl.push(msg);
            }
            for (var i = 0; i < this.tableSkills.length; i++) {
                var msg = this.tableSkills[i].makeSkillTableInfo();
                tbl.push(msg);
            }
            for (var i = 0; i < this.tableDeaths.length; i++) {
                var msg = this.tableDeaths[i].makeSkillTableInfo();
                tbl.push(msg);
            }
        };
        StageRole.prototype.getFollowEffectByID = function (id) {
            for (var i = 0; i < this.tableEffects.length; i++) {
                var v = this.tableEffects[i];
                if (v.effect_id == id) {
                    return v;
                }
            }
        };
        StageRole.prototype.getRelatedEffect = function (id) {
            var eff = this.getFollowEffectByID(id);
            if (eff == null) {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                eff = scene.getSceneEffectByID(id);
            }
            return eff;
        };
        StageRole.prototype.beTargetEffectBuff = function (effect, character) {
            var belongSkill = effect.getBelongSkill();
            var belongUnit = belongSkill.getCurUnit();
            var buffId = effect.getBuffId();
            this.beBuffHurt(belongSkill.getSkillLevel(), buffId, character, belongUnit, effect, null);
        };
        StageRole.prototype.beTargetEffectHurt = function (effect, character) {
            if (effect == null)
                return;
            var hurt = effect.getHurt();
            if (hurt == null)
                return;
            character.handleTalentEffect_IgnoreInjury(this);
            var _a = character.getHurtNumPos(), numX = _a[0], numY = _a[1];
            var aType = effect.getAtkType();
            _hurtingAndBring(this, character);
            var belongSkill = effect.getBelongSkill();
            var skillType = effect.getSkillType();
            var atkType = effect.getAtkType();
            var priority = effect.getBreakPriority();
            character.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_PERSON_IN_BUFF, this, ETalentDir.Dir_Attack);
            character.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_ATTACK_SELF_IN_BUFF, character, ETalentDir.Dir_Attack);
            this.triggerInBuff(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_BEATTACKED_SELF_IN_BUFF, this, ETalentDir.Dir_BeAttactked);
            // 攻击方属性值大于小于防御方检测
            character.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, this, ETalentDir.Dir_Attack);
            character.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, this, ETalentDir.Dir_Attack);
            // 防御方生命值大于小于攻击方检测
            this.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkProtoCompareTalent(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_HP_COMPARE_LESS, character, ETalentDir.Dir_BeAttactked);
            // 攻击方属性大于防御方N % 检测
            character.checkProtoComparePer(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, this, ETalentDir.Dir_Attack);
            // 防御方属性大于供给方N % 检测
            this.checkProtoComparePer(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_PROTO_COMPARE_GREATER_PER, character, ETalentDir.Dir_BeAttactked);
            // 攻击方生命值大于小于检测
            character.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_Attack);
            character.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_Attack);
            // 防御方生命值大于小于检测
            this.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_GREATER, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareSelf(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_SELF_HP_LESS, ETalentDir.Dir_BeAttactked);
            // 被攻击方生命值大于小于检测，攻击方触发天赋
            character.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, this, ETalentDir.Dir_Attack);
            character.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, this, ETalentDir.Dir_Attack);
            // 攻击方生命值大于小于检测，被攻击方触发天赋
            this.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_GREATER, character, ETalentDir.Dir_BeAttactked);
            this.checkHpCompareTarget(zj.TableEnum.TableTalentTrigger.TALENT_TRIGGER_TARGET_HP_LESS, character, ETalentDir.Dir_BeAttactked);
            character.checkProtoCompareValueTalent();
            this.checkProtoCompareValueTalent();
            // character.triggerBeInBuff(true, belongSkill.getSkillType());
            // this.triggerBeInBuff(false, belongSkill.getSkillType());
            // 敌方处于低于血量时
            // character.triggerBeLowBlood(TableTalentCondition.TALENT_CONDITION_ATK);
            // 我方处于低于血量时
            // this.triggerBeLowBlood(TableTalentCondition.TALETN_CONDITION_BEATKED);
            priority = effect.getBreakPriority();
            var _b = effect.getHitEffectId(), hitId = _b[0], sizeTbl = _b[1];
            belongSkill = effect.getBelongSkill();
            // 真实伤害判断
            var bHurt = false;
            var realValue = 0;
            _c = this.beHurtCommon(belongSkill, character, aType, hurt, hitId, sizeTbl, priority, numX, numY, true, null, effect, null), bHurt = _c[0], realValue = _c[1];
            _clearHurtingAndBring(self, character);
            this.releaseZoneEffect();
            character.releaseZoneEffect();
            this.fightScene.handleCombo(character, realValue);
            var _c;
        };
        StageRole.prototype.handleTalentEffect_ProBuffRecoverValue = function () {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PROMOTE_BUFF_RECOVER_EFFECT, -1, null, null), tag = _a[0], value = _a[1];
            return value;
        };
        // private l: egret.Shape = new egret.Shape();
        StageRole.prototype.rect = function () {
            // let rectRole = this.body.getRect();
            // this.nodeRoot.stage.addChild(this.l);
            // this.l.graphics.clear();
            // this.l.graphics.beginFill(0x232323, 0.5);
            // this.l.graphics.drawRect(rectRole.x + Game.UIManager.x, rectRole.y, rectRole.width, rectRole.height);
            // this.l.graphics.endFill();
        };
        //处理被反弹
        StageRole.prototype.beRebounded = function (atkType, hurtValue, character) {
            //天赋buff减伤
            if (this.isSupport()) {
                return;
            }
            var bTag;
            var value = hurtValue;
            var arr = this.keepOutTalentHurt(atkType, value, character);
            bTag = arr[0];
            value = arr[1];
            //终伤百分比
            var _a = character.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PERCENT_FINAL_ADD, -1, null, null), _addTag = _a[0], _finalAdd = _a[1];
            var _b = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_PERCENT_FINAL_REDUCE, -1, null, null), _reduceTag = _b[0], _finalReduce = _b[1];
            value = value * (1 + _finalAdd / 100 - _finalReduce / 100);
            if (hurtValue <= 0) {
                hurtValue = 0;
            }
            value = this.keepOutHurt(atkType, value);
            value = this.keepOutRealHurt(character, value);
            var ratio = zj.yuan3(this.fightScene.beInPvp() == true, zj.constdb.GetValue(zj.ConstValueEnum.CV_FIGHT_PVP_RATIO), zj.ConstantConfig_RoleBattle.PVE_HURT_RATIO);
            value = value * ratio;
            //处理所有伤害减免
            value = this.dealAllHurt(value, character);
            if (value < 0) {
                return;
            }
            if (value < 1) {
                value = 1;
            }
            var showValue = value;
            if (this.isImmuning()) {
                showValue = 1;
            }
            var _c = this.getHurtNumPos(), numX = _c[0], numY = _c[1];
            var right = zj.yuan3(this.getPosX() > character.getPos(), true, false);
            this.creatHurtNum(numX, numY, showValue, right);
            //处理hp
            var curHp = this.getHp();
            character.flowHurtValue(value, zj.yuan3(value > curHp, curHp, value), this);
            //反弹减血
            this.reduceHp(value, null);
            this.dealShelter(value);
            this.bleedMakeRage(value);
            this.dealHurtHpZero(character, hurtValue, null);
        };
        StageRole.prototype.addFightExtraAttri = function (proto, value) {
            var base = this.getBaseProtoValue(proto);
            if (base == null) {
                return;
            }
            if (proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK || proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF
                || proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] + base * value / 100;
            }
            else {
                this.fightExtraAttribs[proto] = this.fightExtraAttribs[proto] + value;
            }
            if (proto == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                zj.SkillCdMgr.Instance.reCalcCd(this.getPressSkill());
            }
        };
        StageRole.prototype.getBaseProtoValue = function (type) {
            var ret = 0;
            if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_ATK) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_DEF) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HTV) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_HTV];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_EVA) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_EVA];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_DEF) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_PHYDEF];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_PHY_CRIT) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_EXTRA) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_CRIT_DEF) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_CRIT_RESIS];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HIT_RATE) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_DODGE_RATE];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_DODGE_RATE) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_HIT_RATE];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_SPEED) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_CD_SPEED];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_HP) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_HP];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_UNIL_RESIS) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_UNIL_RESIS];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_IGNORE_RESIS) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_IGNORE_RESIS];
            }
            else if (type == zj.TableEnum.TableRoleBaseAttribute.BASE_ATTR_FLOAT_RESIS) {
                ret = this.baseAttribs[zj.TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS];
            }
            return ret;
        };
        StageRole.prototype.loadSkillDialog = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_skill_dialog;
            this.ani_dialog = zj.HunterSpineX(name, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            this.ani_dialog.setVisibleSpx(false);
            this.ani_dialog.stopAllActions();
            this.nodeRoot.addChild(this.ani_dialog.spine);
            this.ani_dialog.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent1, this);
        };
        StageRole.prototype.animationTimeEvent1 = function () {
            this.ani_dialog.stopAllActions();
            this.ani_dialog.setVisibleSpx(false);
        };
        StageRole.prototype.playDialogAni = function () {
            var _this = this;
            if (this.ani_dialog == null) {
                return;
            }
            this.ani_dialog.setVisibleSpx(true);
            this.ani_dialog.SetPosition(this.x, this.y);
            this.ani_dialog.ChangeAction(zj.yuan3(this.bEnemy == false, 0, 1));
            var pressSkill = this.getPressSkill();
            if (pressSkill != null) {
                var name_1 = new eui.Image;
                zj.cachekeys([pressSkill.skill_name2_path_s], null)
                    .then(function () {
                    // name.source = pressSkill.skill_name2_path_s;
                    name_1.texture = RES.getRes(pressSkill.skill_name2_path_s);
                    name_1.anchorOffsetX = name_1.width * 0.5;
                    name_1.anchorOffsetY = name_1.height * 0.5;
                    var slot = _this.ani_dialog.spine.armature.getSlot("003_wenzi");
                    slot.setDisplay(name_1);
                })
                    .catch(function (e) { zj.toast(e); });
            }
        };
        StageRole.prototype.playReplaySkill = function (sType, index) {
            this.skillSimple(sType, index);
            this.skillFollow(sType, index);
        };
        StageRole.prototype.skillSimple = function (sType, index) {
            if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                this.curSkill = this.tableCommons[index - 1];
            }
            else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.curSkill = this.tableSkills[index - 1];
            }
            else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                this.curSkill = this.tableDeaths[index - 1];
            }
            this.curSkillIdx = index;
        };
        StageRole.prototype.setGoGutPosTag = function (tag) {
            this.bGoGutPos = tag;
        };
        StageRole.prototype.setInGut = function (tag) {
            this.bInGut = tag;
        };
        StageRole.prototype.initLight = function () {
            if (zj.Gmgr.Instance.fightType != zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return;
            }
            // [this.light] = HunterSpineX(8001063, Gmgr.Instance.spineX_scale);
            // this.light.SetAutoUpdate(true);
            // this.light.setVisibleSpx(false);
            // this.fightScene.nodeTip.addChild(this.light.spine);
        };
        StageRole.prototype.playLight = function () {
            if (zj.Gmgr.Instance.fightType != zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                return;
            }
            // this.light.setVisibleSpx(true)
            // this.light.SetPosition(this.x, this.y);
            // this.light.stopAllActions()   
            // this.light.SetLoop(false) 
            // this.light.ChangeAction(0)
        };
        StageRole.prototype.foreverCutHp = function (character, value) {
            var hurtValue = value;
            hurtValue = this.keepOutRealHurt(character, hurtValue);
            if (hurtValue < 0) {
                return;
            }
            if (hurtValue < 1) {
                hurtValue = 1;
            }
            this.permanentReduceHp(hurtValue);
        };
        StageRole.prototype.permanentReduceHp = function (value) {
            this.pdhValue = this.pdhValue + value;
        };
        StageRole.prototype.loadBuffsAttri = function () {
            if (this.bEnemy == false) {
                this.tableBuffsAttri = zj.Helper.integrateAttri0(zj.Gmgr.Instance.buffLeftAttriTbl);
            }
            else {
                this.tableBuffsAttri = zj.Helper.integrateAttri0(zj.Gmgr.Instance.buffRightAttriTbl);
            }
        };
        StageRole.prototype.handleTalentEffect_Gushou = function () {
            var _a = this.getTalentEffective(zj.TableEnum.TableTalentEffect.TALENT_EFFECT_GUSHOU, -1, null, null), tag = _a[0], value = _a[1];
            var addValue = 0;
            if (tag == true) {
                addValue = value;
            }
            return addValue;
        };
        //根据指定的buff类型删除特定buff
        StageRole.prototype.removeBuffByType = function (sType) {
            var i = 0;
            while (i < this.tableBuffs.length) {
                var tBuff = this.tableBuffs[i];
                if (tBuff.getBuffBaseType() == sType) {
                    this.openFoldBuffEffect(tBuff);
                    zj.CC_SAFE_DELETE(this.tableBuffs[i]);
                    this.tableBuffs.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageRole.prototype.createBomoCss = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_bomb;
            this.bombCss = zj.HunterSpineX(name, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            this.bombCss.ChangeAction(0);
            this.nodeRoot.addChild(this.bombCss.spine);
            var _a = this.getBuffNodePosXy("mid"), x = _a[0], y = _a[1];
            this.bombCss.SetPosition(x, y);
            this.bombCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
        };
        StageRole.prototype.comStartFun = function () {
            if (this.bombCss) {
                this.bombCss.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.bombCss.clearSpine();
                this.bombCss = null;
            }
        };
        StageRole.prototype.clearEffectBelongRole = function (tbl) {
            for (var k in this.tableTalentEffect) {
                var v = this.tableTalentEffect[k];
                var i = 0;
                while (i < v.length) {
                    if (tbl[v[i].belong_role.roleId] != null) {
                        zj.CC_SAFE_DELETE(v[i]);
                        v.splice(i, 1);
                    }
                    else {
                        i = i + 1;
                    }
                }
            }
        };
        StageRole.prototype.createWeekNumber = function (baseX, baseY) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(null); //UIConfig.UIConfig_FightNumber.week
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.createRidweekNumber = function (baseX, baseY) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(null); //UIConfig.UIConfig_FightNumber.ridweek
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.createAbilityproNumber = function (baseX, baseY) {
            var scale = zj.getRandom(zj.ConstantConfig_CommonBattle.baojinum.randTbl.min * 1000, zj.ConstantConfig_CommonBattle.baojinum.randTbl.max * 1000) / 1000;
            var num = zj.Game.ObjectPool.getItem("FightNumberEffect", zj.FightNumberEffect);
            num.newSetData();
            num.setEffectDir(zj.yuan3(this.bEnemy == true, true, false));
            num.setWordInfo(null); //UIConfig.UIConfig_FightNumber.abilitypro
            num.setLayout(zj.TableEnum.TableEnumNumLayout.Layout_Layout_New, 4, scale);
            num.setData(baseX, baseY, 0, 0);
            num.runAction();
            num.start();
        };
        StageRole.prototype.beTalentHurt = function (effect, character) {
            if (effect == null) {
                return [false, 0];
            }
            var hurt = effect.getHurt();
            if (hurt == null || (hurt != null && hurt.canHurtOne(this) == false)) {
                return [false, 0];
            }
            var buffId = effect.getBuffId();
            var talentLevel = effect.belong_talent.talent_level;
            var talentEffectVal = effect.talent_effect.effect_value;
            hurt.addHurtOne(this);
            var _a = this.getHurtNumPos(), numX = _a[0], numY = _a[1];
            var atkType = effect.getAtkType();
            _hurtingAndBring(this, character);
            var priority = effect.getBreakPriority();
            var hurtValue = 0;
            var phyDef = character.handleTalentEffect_IgnoreTargetDef(this.getDef(false));
            var pierceForce = character.getIgnorePhydef();
            hurtValue = zj.phyTalentValue(talentEffectVal, character.getAtk(), hurt.getProofValue(), phyDef, pierceForce, character.getLevel(), character, this);
            if (hurtValue > 0) {
                this.dealCutHp(character, hurtValue, true, null, null);
            }
            this.dealHurtState(priority, hurt, character);
            this.beBuffHurt(talentLevel, buffId, character, null, effect, null);
            _clearHurtingAndBring(this, character);
        };
        StageRole.prototype.setRevive = function (hpPer) {
            if (!this.bDead) {
                return;
            }
            // 布尔相关
            this.bDead = false;
            this.bMomentDead = false;
            this.bAlreadyDead = false;
            this.bCanRemove = false;
            this.bDisappear = false;
            this.bBomb = false;
            this.setTrans(255);
            // 场景相关
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
            this.fightScene.addRole(this);
            this.fightScene.addCollision(this);
            this.fightScene.pushSqueue(this.roleId, this.bEnemy);
            if (this.bEnemy == false) {
                this.fightScene.tableTimelyPos.splice(this.eTeamNum + 1, 1);
            }
            this.fightScene.freshReviveMenu(this);
            // 重置技能进度条
            zj.SkillCdMgr.Instance.setRoleCd(this, this.pressCd);
            zj.SkillCdMgr.Instance.reCalcCd(this.getPressSkill());
            // 自身相关
            this.setVisible(true);
            this.setHp(this.getMaxHp(true) * hpPer / 100);
            this.backHoming();
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Curve);
        };
        return StageRole;
    }());
    zj.StageRole = StageRole;
    __reflect(StageRole.prototype, "zj.StageRole");
})(zj || (zj = {}));
//# sourceMappingURL=StageRole.js.map