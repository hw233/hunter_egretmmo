namespace zj {
    export class StageSceneFight extends StageScene {
        public constructor() {
            super();
            // //战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)
            // if(FightLoading.getInstance().fightType == 16 || FightLoading.getInstance().fightType == 22 || FightLoading.getInstance().fightType == 23){
            //     this.replayBattleInfo = new message.MultiResultInfo;
            // }else{
            //     this.replayBattleInfo = new message.ReplayBattleInfo;
            // }
            this.replayBattleInfo = new message.ReplayBattleInfo;

            Gmgr.Instance.bInSceneFight = true;

            //教学
            Game.TeachSystem.curPart = -1;
            Teach.bFirstTeachUpdata = true;
            // this.count = egret.$hashCount;
            // this.tttt = egret.setInterval(this.timer,this,1000);
            Game.EventManager.on(GameEvent.NETWORK_DISCONNECTION, this.netWork, this);
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.netConnected, this);
        }
        private netConnected() {
            //成功
            this.resumeAll();
        }
        private netWork() {
            //断线
            this.pauseAll();
        }
        // private tttt;
        // private count = 0;
        // private timer(){
        //     let newCount = egret.$hashCount;
        //     let diff = newCount - this.count;
        //     this.count = newCount;
        //     console.log("！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"+diff);

        // }

        RenderLayerOrder = {

            DownEffect_Order: 15,
            Call_Order: 1000,
            Monster_Order: 2000,
            Role_Order: 3000,

            MidMonsterEffect_Order: 4000,
            MidRoleEffect_Order: 5000,

            MidNumber_Order: 6000,
            MidParticle_Order: 7000,

            Color_Order: 8000,
            Render_Order: 9000,
            RenderEffect_Order: 10000,

            UpEffect_Order: 21000,
            HitEffect_Order: 22000,
            Number_Order: 23000,
            BuffEffect_Order: 24000,

            Tip_Order: 26000,
        }
        // data
        public tableEnemys = {};
        public tableTimelyPos = [];
        public tableAllyDead = [];
        public tableEnemyDead = [];
        public tableCollision = [];
        public battleSqueue = [];
        public tableEffects = [];
        public tableAllys = {};
        public tablePosKey = {};
        public tableNodeRoles = [];
        public tableEnemyKey = [];
        public tableParticles = [];
        public tableDeadParticles = [];
        public tableBloodEffects = [];
        public tableAllyCallMobs = [];
        public tableEnemyCallMobs = [];
        public tableAllySupports = {};
        public tableEnemySupports = {};
        public tableAllySptKey = {};
        public tableEnemySptKey = {};
        public tableAllysReserveRec = [];
        public tableEnemysReserveRec = [];
        public tableDeadCacheLeft = {};
        public tableDeadCacheRight = {};
        public tableRoleYH: StagePersonLocalYH;// 援护对象
        public nGeneralCount: number;
        public monsterStage: number;
        public bBossAppear: boolean;
        public tableMonsterPosRecord = {};
        public dialogGeneral;
        public dialogStage;
        public bDialogGeneralAppear: boolean;
        public bOpenBattleStory: boolean;
        public bOpenBossInformation: boolean;
        public bossInformationId;
        private _sceneState;
        public delayTick = 0
        public appearTick = 0
        public timeIndex = 1
        public timeOppIndex = 1
        public appearIndex = 0
        public appearOppIndex = 0

        public cameraTouch = false
        public cameraRole = null;
        public cameraMoveDis = 0
        public borderDis = 0

        public cameraX = 0
        public cameraY = 0

        // radialBlur
        public radialBlurSprite = null;
        public strength = 0
        public strengthTime = 0
        public strengthDir = 1
        public startStrength = false

        public scaleValue = 0
        public scaleTime = 0
        public scaleDir = 0
        public startScale = false
        public scaleBreakConst = 0
        public scaleOutSpeedConst = 0
        public scaleInSpeedConst = 0
        public scaleOutFun = null
        public scaleInFun = null
        public bShake = false
        public shakeId = 0
        public shakeMaxFrame = 0
        public shakeFrame = 0
        public isShakePlusX;
        public isShakePlusY;
        public shakeOrignX = 0
        public shakeOrignY = 0
        public shakeBgX = 0
        public shakeBgY = 0
        public comboLv = 0;
        public bComboBuff;
        public bPvpDead;
        public bLowFrame;
        public nCurFps;
        public nDieFrame = 0
        public bDiePlay = false

        // Pause
        public bButtonPause = false
        public isAllPause = false
        public bTargetPause = false
        public pauseFounder = null

        public bBossPause = false
        public pauseBoss = null
        public bossPauseTick = 0

        public f_helpBgIndex = -1
        public f_helpBgAction = -1
        public b_helpRoleing = false
        public ani_helpBg = null
        public ani_helpRole = null
        public ani_oppHelpRole = null
        public helpRole = null
        public senderHelpRole = null
        public oppHelpRole = null
        public oppSenderHelpRole = null
        // goddess
        public bGoddessDir = false
        public goddessStandardX = 0
        public goddessMagicX = 0
        public bGoddessFun = false
        public goddessTimer = 0

        // start
        public fightStartSpine = null
        public fightStartCss = null
        public rawDuration_start = -1
        // timeup
        public fightTimeUp = null

        // table clean
        public tableClean = [];

        // talent
        public tableLTalent = {}
        public tableRTalent = {}
        public tableTalentAni = {}
        // battle squeue
        public bOpenQueueBattle = false
        public maxAtkInterval = 0
        public interval_tick = 0
        public extra_tick = 0
        public bAtkWait = false

        // battle time   
        public stageMaxTime = ConstantConfig_RoleBattle.PVP_CD_TIME * yuan3(Gmgr.Instance.debugLocalFight, 100, 1);
        public battleTime = this.stageMaxTime;
        public realTime = 1
        public bTimingOn = true

        // data statistics   
        public nFinalCnt = 0
        public bBalance = false
        public generalBattleInfo = []
        public oppBattleInfo = []
        public getItemInfo = {};

        // verticalDis
        public verticalDis = 0

        // replay
        public replayLeftGelRec = {}
        public replayRightGelRec = {}
        public eventReplayIndex = 1
        public speedReplayIndex = 1
        public comboReplayIndex = 1
        public timerTick = 0
        public timerPluginTick = 0

        // power
        public formatPosNum = 0
        public tableGeneralsPower = {}

        //- ai
        public leftAiCd = 0 //ConstantConfig_RoleBattle.AI_CD_TIME
        public rightAiCd = 0

        public eStageState = TableEnum.TableStageState.STAGE_STATE_1ST;

        // combo
        public comboEffect = null
        public curCombo = 0;
        public comboRole = null;
        public maxCombo = 0;

        // low fps
        public bBossRemove = false;
        public bBossDead = false;
        public bTeachDead = false;

        public teachBattleId = -1

        // formular
        public formulaTbl = {}

        // relate week to test
        public timerEveryChap = 0
        public currChapMaxTime;
        public currChapStep = 1
        public maxChapStep = 5
        public isWeekSteping = false
        public chapResultTbl = {}

        public groundScale = 1.0;

        public sp;

        public beginRole;

        public nPauseTick;

        public mapId = 0;


        // replay
        public replayBattleInfo// = new message.ReplayBattleInfo;

        // ui
        public mainmenu = null


        public bBeginPause;

        public cheatCheckTime = 0;

        //教学需要
        public instanceId = 0;

        public bossInstance;

        public objectRole;

        public nMaxPauseTick;

        public oppDetailInfo;

        public battleType;
        public pauseWeekFounder;

        public killEye = null;

        public get sceneState() {
            return this._sceneState;
        }
        public set sceneState(value) {
            this._sceneState = value;
        }

        public procRole(t, tick) {
            // body
            let self = this;
            let i = 1;
            let index = 1;
            for (let k in t) {
                let v = t[k];
                // 特殊处理
                if (v.bCanRemove == true) {
                    //self.delSqueue(v.roleId, v.bEnemy)
                    if (v.bEnemy == false) {
                        self.tableTimelyPos[v.eTeamNum + 1] = v.roleId
                        self.tableAllyDead.push(v);
                    } else {
                        self.tableEnemyDead.push(v);
                    }
                    //鼠崽闹春问题
                    if (v.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        self.bBossRemove = true
                    }

                    // todo                    
                    SkillCdMgr.Instance.cleanRoleCd(v)
                    self.cleanCollision(v);
                    v.setVisible(false);
                    CC_SAFE_DELETE(v);
                    t[k] = null;
                    delete t[k];
                    continue;
                }

                if (v.bDead == true) {
                    self.delSqueue(v.roleId, v.bEnemy)
                    if (v.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        self.bBossDead = true
                        self.bTimingOn = false
                        // 小怪消失
                        self.setEnemysDead(v)
                    }

                    if (Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH && v.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                        if (v.bLocalBoss) {
                            self.bTeachDead = true
                        }
                    }
                    /*
                    if( ! v.bEnemy and ! v.bCall ){
                        self.nAllyDeadNum = self.nAllyDeadNum + 1
                    } 
                    */
                }

                if (v.bAlreadyDead == true) {
                    //if( v.bAlreadyDead == true and v.bDisappear == false ){                    
                    v.setDisappear()
                    v.setCanRemove()
                    //self.addDeadParticle(v.x, v.y)
                    self.freshDeadUi(v)
                    if (v.bEnemy == false) {
                        if (Gmgr.Instance.bReplay == false && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                            self.takeRoleBattleInfo(self.generalBattleInfo, v)
                            self.varyGeneralDamage(self.replayBattleInfo.leftReplayInfo.generals, v, self.eStageState)
                            //self.takeRoleActionInfo(v)
                        }
                    } else {
                        if (Gmgr.Instance.bReplay == false && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                            self.takeRoleBattleInfo(self.oppBattleInfo, v)
                            self.varyGeneralDamage(self.replayBattleInfo.rightReplayInfo.generals, v, self.eStageState)
                            //self.takeRoleActionInfo(v)
                        }
                    }

                    if (self.battleTime > 0 && self.doFightFilling(v) == true) {
                        self.doFillUi(v)
                    }

                }
                Gmgr.Instance.aiSpeedList.push(createAiSpeedRoleInfo(v.roleId, v.bEnemy, v.isSupport(), v.getCdSpeed(), v.pressCd, false, v.eTeamNum));
                i = i + 1;
                index = index + 1;
            }
        }

        public cleanCollision(role) {
            // body
            let i = 0;
            while (i < this.tableCollision.length) {
                if (role == this.tableCollision[i].player) {
                    this.tableCollision.splice(i, 1);
                } else {
                    i = i + 1
                }
            }
        }

        public delSqueue(roleId, bEnemy) {
            let i = adjustIndex(1);
            while (i < this.battleSqueue.length) {
                if (this.battleSqueue[i].id == roleId && this.battleSqueue[i].bEnemy == bEnemy) {
                    this.battleSqueue.splice(i, 1);
                } else {
                    i = i + 1
                }
            }
        }

        public setEnemysDead(...args) {
            // body
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && v.bDead != true) {
                    v.setHp(0)
                    v.setDead()
                    v.dealHurtHpZero(null, 0, null);
                }
            }
        }

        public freshDeadUi(role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshDeadUi(role)
            }
        }

        //////////////////////////////////////////////////-
        //////////////////-replay//////////////////////////
        public takeRoleBattleInfo(tbl, role) {
            // body
            if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                return
            }
            if (tbl != null) {
                let [tag, index] = this.isBattleInfoInTable(tbl, role.roleId)
                if (tag == false) {
                    let msg = new message.ArmyUnitCur;
                    msg.monster_id = role.roleId
                    msg.is_dead = role.bDead
                    msg.cur_pos = role.eTeamNum + 1

                    msg.cur_hp = yuan3(role.bEnemy, role.attribs.maxHp * role.getHp() / role.getMaxHp(), role.getHp())
                    msg.cur_rage = role.getRage()
                    msg.cur_bean = role.getCurBeanNum()
                    msg.cur_skillCd = role.getPressCdTime()
                    tbl.push(msg);
                } else {
                    tbl[index].is_dead = role.bDead
                    tbl[index].cur_pos = role.eTeamNum + 1
                    tbl[index].cur_hp = yuan3(role.bEnemy, role.attribs.maxHp * role.getHp() / role.getMaxHp(), role.getHp())
                    tbl[index].cur_rage = role.getRage()
                    tbl[index].cur_bean = role.getCurBeanNum()
                    tbl[index].cur_skillCd = role.getPressCdTime()
                }
            }
        }

        public isBattleInfoInTable(t, monster_id): [boolean, number] {
            for (let i = adjustIndex(1); i < t.length; i++) {
                if (t[i].monster_id == monster_id) {
                    return [true, i]
                }
            }
            return [false, -1]
        }

        public doFightFilling(role) {
            // body
            return false
        }

        public doFillUi(role) {
            if (this.mainmenu != null) {
                this.mainmenu.doFillUi(role)
            }
        }

        public varyGeneralDamage(t, general, appear) {
            // body
            for (let k in t) {
                let v = t[k];
                if (v.generalInfo.general_id == general.roleId) {
                    v.totalDamage = general.getflowHurtValue();
                    v.recoverValue = general.getflowRecoverValue();
                    v.plugin_state = general.CheatGetPluginState();
                    // 防止破解加入技能验证
                    general.makeSkillsData(v.skills)
                    // 防破解属性值重新赋值
                    if (general.isPerson()) {
                        v.generalInfo.attri = general.creatAttriInfo();
                    }
                    //v.generalInfo.attri = general.creatAttriInfo()
                    return
                }
            }
            /*
            for i = 1, #t do
                if( t[i].stage == appear and t[i].generalInfo.general_id == general.roleId ){
                    t[i].totalDamage = general.getflowHurtValue()
                    t[i].recoverValue = general.getflowRecoverValue()
                    return
                }
            }
            */
        }

        // private s: egret.Shape = new egret.Shape();
        private role_point = new egret.Point();
        private circle_point = new egret.Point();
        private frameRate = 0;
        public procEffectCollision(cT) {
            // if (ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
            //     this.frameRate++;
            //     if ((this.frameRate % 2) == 0) {
            //         return;
            //     }
            // }
            //对双层循环进行的优化
            let self = this;
            let k1;
            for (k1 in self.tableEffects) {
                let v1 = self.tableEffects[k1];
                if (v1 == null) {
                    continue;
                }
                if (v1.belong_role.bDead == true) {
                    continue;
                }
                let effect_type = v1.getEffectType();
                if (effect_type == null) {
                    continue;
                }
                //判断动画是否为null
                let effect = v1.getEffectSpx();
                if (effect == null) {
                    continue;
                }
                let t_rect = effect.getRect();
                let k2;
                for (k2 in cT) {
                    let v2 = cT[k2];
                    if (v1.belong_role.bEnemy == v2.player.bEnemy) {
                        continue;
                    }
                    if (v2.player.bVisible == false) {
                        continue;
                    }
                    if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
                        continue;
                    }
                    let rectRole = v2.player.body.getRect();
                    self.role_point.x = rectRole.x + rectRole.width / 2;//new egret.Point(rectRole.x + rectRole.width / 2, rectRole.y + rectRole.height / 2);
                    self.role_point.y = rectRole.y + rectRole.height / 2;

                    self.circle_point.x = t_rect.x + t_rect.width / 2;//new egret.Point(t_rect.x + t_rect.width / 2, t_rect.y + t_rect.height / 2);
                    self.circle_point.y = t_rect.y + t_rect.height / 2;

                    // v2.player.rect();
                    // if(t_rect.width > 0){
                    //     self.stage.addChild(self.s);
                    //     self.s.graphics.clear();
                    //     self.s.graphics.beginFill(0x232323, 0.5);
                    //     self.s.graphics.drawRect(t_rect.x + Game.UIManager.x,t_rect.y,t_rect.width,t_rect.height);
                    //     self.s.graphics.endFill();
                    // }

                    //是否处于衰减范围之内
                    if (v1.b_decay == true && isPointInCircle(self.role_point, self.circle_point, v1.decay_ratio) == false) {
                        continue;
                    }
                    // let distance = egret.Point.distance(self.role_point, self.circle_point);
                    // if (effect.name == "wj_005_saci_eff") {
                    //     let aaa;
                    // }
                    let distance = Math.abs(self.role_point.x - self.circle_point.x);
                    //中心点距离判定
                    if (v1.collision_distance != -1 && distance > v1.collision_distance) {// * self.uiScale
                        continue;
                    }

                    if (getSpineIsCollision(v2.player.body, effect) == true) {
                        if (effect_type == EnumEffectType.Effect_Type_Skill_Common) {
                            let [bHurt, hurtV] = v2.player.beEffectHurt(v1, v1.belong_role);
                            self.handleCombo(v1.belong_role, hurtV);
                        } else if (effect_type == EnumEffectType.Effect_Type_Missile) {
                            let [bHurt, hurtV] = v2.player.beEffectHurt(v1, v1.belong_role)
                            self.handleCombo(v1.belong_role, hurtV);
                        } else if (effect_type == EnumEffectType.Effect_Type_Skill_Target) {
                            let [bHurt, hurtV] = v2.player.beEffectHurt(v1, v1.belong_role, self.circle_point);
                            self.handleCombo(v1.belong_role, hurtV);
                        } else if (effect_type == EnumEffectType.Effect_Type_Tallent) {
                            v2.player.beTalentHurt(v1, v1.belong_role);
                        }
                    }
                }
            }
            //动作碰撞
            for (let k1 in cT) {
                let v1 = cT[k1];
                if (v1.player.curSkill == null) {
                    continue;
                }
                if (v1.player.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                    continue;
                }
                let curSkillAction = v1.player.curSkill.getSkillAction();
                if (curSkillAction == null) {
                    continue;
                }
                if (curSkillAction.getCollisionNum() == -1) {
                    continue;
                }
                let v1_rect = v1.player.body.getRect();
                for (let k2 in cT) {
                    let v2 = cT[k2];
                    if (v1.player.bEnemy == v2.player.bEnemy) {
                        continue;
                    }
                    if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == TableEnum.TableEnumOtherState.OtherState_Die || v2.player.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || v2.player.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                        continue;
                    }
                    let v2_rect = v2.player.body.getRect();
                    let role1_point = egret.Point.create(v1_rect.x + v1_rect.width / 2, v1_rect.y + v1_rect.height / 2);
                    let role2_point = egret.Point.create(v2_rect.x + v2_rect.width / 2, v2_rect.y + v2_rect.height / 2);

                    let distance = egret.Point.distance(role1_point, role2_point);
                    egret.Point.release(role1_point);
                    egret.Point.release(role2_point);
                    let getCollisionDistance = curSkillAction.getCollisionDistance();
                    if (getCollisionDistance != -1 && distance > getCollisionDistance) {
                        continue;
                    }
                    if (getCollisionDistance != -1) {
                        if (distance < getCollisionDistance) {
                            curSkillAction.collisionEvent();
                        }
                    } else {
                        if (getSpineIsCollision(v1.player.body, v2.player.body) == true) {
                            curSkillAction.collisionEvent();
                        }
                    }
                }
            }
            // //跟随特效的碰撞
            for (let k in cT) {
                let v = cT[k];
                for (let k1 in v.player.tableEffects) {
                    let v1 = v.player.tableEffects[k1];
                    if (v1.belong_role.bDead == true) {
                        continue;
                    }
                    let effect_type = v1.getEffectType();
                    if (effect_type == null) {
                        continue;
                    }
                    if (v1.getEffectSpx() == null) {
                        continue;
                    }
                    for (let k2 in cT) {
                        let v2 = cT[k2];
                        if (v1.belong_role.bEnemy == v2.player.bEnemy) {
                            continue;
                        }
                        if (v2.player.bVisible == false) {
                            continue;
                        }
                        if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
                            continue;
                        }
                        if (getSpineIsCollision(v2.player.body, v1.getEffectSpx()) == true) {
                            if (effect_type == EnumEffectType.Effect_Type_Skill_Target) {
                                let arr = v2.player.beEffectHurt(v1, v1.belong_role);
                                self.handleCombo(v1.belong_role, arr[1]);
                            }
                        }
                    }
                }
            }
        }

        public handleCombo(role, hurtValue) {
            // body
            if (hurtValue > 0 && role.bEnemy == false) {
                this.addCombo(role)
            }
        }

        public addCombo(role) {
            // body 
            this.curCombo = this.curCombo + 1
            this.comboRole = role
            if (this.maxCombo < this.curCombo) { this.maxCombo = this.curCombo }
            this.comboEffect.resetNum(this.curCombo)
            this.comboEffect.setVisible(true)
        }

        /**创建我方武将 */
        public _createMyGel(pos, generalInfo) {
            let generalId = generalInfo.general_id
            let aiId = -1
            let coordinateIndex = pos
            let teamIndex = pos - 1

            let x = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex]
            let y = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex]);
            y = UIManager.StageHeight - y;
            let floor = y + Gmgr.Instance.upY

            let general: StagePersonGeneral = null
            general = new StagePersonGeneral(this.getRoleLayer(false, pos), false)
            general.creatPerson(generalInfo, aiId, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Right, false, 1.0, generalId, this.eStageState)
            general.creatEntryCd();
            this.handleTeachValue(general);

            this.tableAllys[generalId] = general
            this.tablePosKey[pos] = generalId

            let item = { player: general, force: false }
            this.tableCollision.push(item);

            // console.log("load my general }==" + generalId)   
            this.roleAdd();
            return general
        }


        public getRoleLayer(enemy, pos) {
            pos = 0;
            if (enemy) {
                //return this.tableNodeRoles[4 + pos]
                return this.tableNodeRoles[pos]
            } else {
                return this.tableNodeRoles[pos]
            }
        }


        ////////////////////////////////////////////////////////////

        /**创建敌方武将 */
        public _createOppGel(pos, generalInfo, appearTag, posTag) {
            // general_id 
            if (!generalInfo) return;
            let generalId = generalInfo.general_id
            let aiId = -1
            let coordinateIndex = pos
            let teamIndex = pos - 1

            let x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[coordinateIndex];
            let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[coordinateIndex]);
            y = UIManager.StageHeight - y;
            let floor = y + Gmgr.Instance.upY;

            let general = null
            general = new StagePersonGeneral(this.getRoleLayer(true, pos), false)
            general.creatPerson(generalInfo, aiId, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, 1.0, generalId, this.eStageState)
            general.creatEntryCd();
            general.setVisible(appearTag);


            this.tableEnemys[generalId] = general;
            this.tableEnemyKey[pos] = generalId
            //console.log("load general start==" + generalId)

            let item = { player: general, force: true };
            this.tableCollision.push(item);


            //console.log("load opp general start==" + generalId)
            this.roleAdd();
            return general;
        }
        public _creatSceneEventAction(time, type) {
            let eventAction = new message.SceneEventAction();
            eventAction.triggerTime = time
            eventAction.type = type
            return eventAction
        }

        public _creatSpeedRecord(time, index) {
            let record = new message.IIKVPairs();
            record.key = time
            record.value = index
            return record
        }
        public isFightScene() {
            //用于判断是否是战斗场景勿删
            return true
        }
        public OnLoading(percent) {
            super.OnLoading(percent);
            switch (percent) {
                case 5:
                    break;
                case 51:
                    this.InitRes();
                    break;
                case 56:
                    this.preCssRes();
                    break;
                case 61:
                    this.preRes();
                    break;
                case 66:
                    this.loadSpeed();
                    break;
                case 71:
                    break;
                case 76:
                    this.loadHelpRole();
                    this.loadOppHelpRole();
                    break;
                case 81:
                    this.initSection_Other();
                    Teach.loadTeach(this.instanceId);
                    this.loadRand();
                    this.loadCurFormation();
                    break;
                case 91:
                    this.initSection_Mine();
                    break;
                case 96:
                    this.initSection_Opp();
                    this.loadExt();
                    // this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, (this.mapHeight - UIManager.StageHeight)/2);
                    break;
            }
        }
        public initSection_Opp() {

        }
        public loadExt() {

        }
        public initSection_Mine() {

        }
        public curFormation: message.FormationInfo;
        public loadCurFormation() {

            // let date = Game.PlayerFormationSystem.curFormations;
            // let encoder = new aone.BinaryEncoder();
            // date[Gmgr.Instance.fightType-1].to_bytes(encoder);
            // this.curFormation = new message.FormationInfo();
            // let decoder = new aone.BinaryDecoder(new Uint8Array(encoder.buffer));
            // this.curFormation.parse_bytes(decoder);
            let date = Game.PlayerFormationSystem.curFormations;
            this.curFormation = date[Gmgr.Instance.fightType - 1];
        }
        public fightSeed;
        public loadRand() {
            this.fightSeed = 1;
            this.initRandSeed();
            // lcgsrandom(this.fightSeed);
            Gmgr.Instance.lcgrandcnt = 0;
        }
        public initRandSeed() {
            this.fightSeed = TsMtirand() % 1000000 + 1;
        }
        public initSection_Other() {

        }
        public loadSpeed() {
            Gmgr.Instance.bakeSpeedIndex = Gmgr.Instance.backupSpeedTbl[Gmgr.Instance.fightType];

            if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK && Gmgr.Instance.debugLocalFight) {
                Gmgr.Instance.bakeSpeedIndex = 1
            }
            else if (Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                Gmgr.Instance.bakeSpeedIndex = 1
            }
            Gmgr.Instance.setBattleSpeed(Gmgr.Instance.bakeSpeedIndex);

            this.speedRecord(Gmgr.Instance.bakeSpeedIndex);
        }
        public speedRecord(index) {
            let record = this._creatSpeedRecord(this.timerTick, index);
            this.replayBattleInfo.battleSpeeds.push(record);
        }
        public preRes() {
            // fight  
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_zhandou_start)
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_tongyong)  
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_jisha)    
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_xuli) 
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_help)
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_skill_dialog)
        }
        public preCssRes() {

        }
        private roleRenderPos = [1, 2, 3, 4, 5];
        private monsterRenderPos = [1, 2, 3, 4, 5];
        private callRenderPos = [1, 2, 3, 4, 5];
        private hunterRoleRenderPos = [4, 8, 2, 6, 3, 7, 1, 5];
        /**遮罩层 */
        private nodeMask: eui.Group;
        /**必杀背景层(处理中间层一些动画之类) */
        private nodeBg: eui.Group;
        /** 中间动画层*/
        private midNode: eui.Group;
        /**战斗层（进行缩放处理) */
        public fightRoot: eui.Group;
        public uiScale;
        public uiScaleY;
        private nodeDownEffect: eui.Group;
        private nodeCalls;
        private tableNodeMonsterEffects = [];
        private tableNodeRoleEffects = [];
        private nodeEffect: eui.Group;
        private nodeParticle: eui.Group;
        private nodeBlackShader: eui.Group;
        private nodeUpEffect: eui.Group;
        private nodeHitEffect: eui.Group;
        private nodeNumber: eui.Group;
        private nodeBuffEffect: eui.Group;
        private nodeTip: eui.Group;
        private roleBox: eui.Group;
        public hpBox: eui.Group;
        private InitRes() {
            Gmgr.Instance.setLayerId(TableEnum.TableEnumLayerId.LAYER_FIGHT);
            //this.InitScene();

            this.nodeMask = new eui.Group();
            this.nodeContainer.addChild(this.nodeMask);

            this.nodeBg = new eui.Group();
            this.nodeRoot.addChild(this.nodeBg);


            this.midNode = new eui.Group();
            this.nodeBg.addChild(this.midNode);

            this.fightRoot = new eui.Group();
            this.nodeRoot.addChild(this.fightRoot);
            // this.fightRoot.anchorOffsetX = UIManager.StageWidth/2;
            // this.fightRoot.anchorOffsetY = UIManager.StageHeight/2;
            this.uiScale = UIManager.Stage.width / Device.STANDARD_SCREEN_W;
            this.uiScaleY = UIManager.Stage.height / Device.STANDARD_SCREEN_H;
            let scaleNum = 0;
            if (this.uiScale > this.uiScaleY) {
                scaleNum = this.uiScaleY;
            } else {
                scaleNum = this.uiScale;
            }
            this.uiScale = scaleNum;
            this.uiScaleY = scaleNum;
            //this.fightRoot.scaleX=this.uiScale;
            //this.fightRoot.scaleY=this.uiScaleY;
            this.fightRoot.x = (UIManager.StageWidth - Device.STANDARD_SCREEN_W) / 2;

            this.nodeDownEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeDownEffect);

            this.tableNodeRoles = [];

            this.roleBox = new eui.Group();
            this.fightRoot.addChild(this.roleBox);

            this.hpBox = new eui.Group();
            this.fightRoot.addChild(this.hpBox);


            //for (let i = 0; i < this.hunterRoleRenderPos.length; i++) {
            //for (let i = 0; i < 1; i++) {
            let layer = new eui.Group;
            this.roleBox.addChild(layer);
            this.tableNodeRoles.push(layer);
            //}
            this.nodeBlackShader = new eui.Group();
            layer.addChildAt(this.nodeBlackShader, 0);
            this.initBlackShader();//黑背景

            this.nodeCalls = new eui.Group();
            this.fightRoot.addChild(this.nodeCalls);

            this.tableNodeMonsterEffects = [];
            //for (let i = 0; i < this.monsterRenderPos.length; i++) {
            let layer2 = new eui.Group();
            this.fightRoot.addChild(layer2);
            this.tableNodeMonsterEffects.push(layer2);
            //}

            this.tableNodeRoleEffects = [];
            //for (let i = 0; i < this.roleRenderPos.length; i++) {
            let layer1 = new eui.Group();
            this.fightRoot.addChild(layer1);
            this.tableNodeRoleEffects.push(layer1);
            //}

            this.nodeEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeEffect);

            this.nodeParticle = new eui.Group();
            this.fightRoot.addChild(this.nodeParticle);


            this.nodeUpEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeUpEffect)

            this.nodeHitEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeHitEffect)

            //渲染层设计
            this.nodeNumber = new eui.Group();
            this.fightRoot.addChild(this.nodeNumber)
            // this.nodeNumber.x = -this.fightRoot.x;
            this.nodeTip = new eui.Group();
            this.fightRoot.addChild(this.nodeTip);

            this.nodeBuffEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeBuffEffect);

            // formation
            //self.formationType = EFormationType.FORMATION_TYPE_NONO

            //Gmgr.Instance.bStopContinueFromBattle = false

            //map
            //self.mapId = 0
            //self.groundScale = 1.0
            this.initOnceData();
            this.initData();
        }
        //重置场景角色层级
        private roleIndexArr = [0, 2, 1, 3, 0, 2, 1, 3];
        public roleAdd() {
            let layerRole = this.tableNodeRoles[0];
            let index = 0;
            for (let i = 0; i < this.roleIndexArr.length; i++) {
                if (i < 4) {
                    let roleId = this.tablePosKey[this.roleIndexArr[i]];
                    let role = this.tableAllys[roleId];
                    if (role) {
                        layerRole.addChildAt(role.body.spine, index);
                        index++;
                    }
                } else {
                    let enemyId = this.tableEnemyKey[this.roleIndexArr[i]];
                    let enemy = this.tableEnemys[enemyId];
                    if (enemy) {
                        layerRole.addChildAt(enemy.body.spine, index);
                        index++;
                    }
                }
            }
        }
        private roleIndexChange(role) {
            // function roleFun(i) {
            //     let roleId = this.tablePosKey[this.roleIndexArr[i]];
            //     let role = this.tableAllys[roleId];
            //     if (role) {
            //         layerRole.addChildAt(role.body.spine, index);
            //         index++;
            //     }
            // }
            // function enemyFun(i) {
            //     let enemyId = this.tableEnemyKey[this.roleIndexArr[i]];
            //     let enemy = this.tableEnemys[enemyId];
            //     if (enemy) {
            //         layerRole.addChildAt(enemy.body.spine, index);
            //         index++;
            //     }
            // }
            // let isEnemy = role.bEnemy;
            let layerRole = this.tableNodeRoles[0];
            layerRole.addChildAt(this.nodeBlackShader, 0);
            // let index = 0;
            // for (let i = 0; i < this.roleIndexArr.length; i++) {
            //     if (!isEnemy) {
            //         if (i < 4) {
            //             roleFun(i);
            //             if (i == 3) {
            //                 layerRole.addChildAt(this.nodeBlackShader, index++);
            //             }
            //         } else {
            //             enemyFun(i);
            //         }
            //     } else {
            //         if (i < 4) {
            //             enemyFun(i);
            //             if (i == 3) {
            //                 layerRole.addChildAt(this.nodeBlackShader, index++);
            //             }
            //         } else {
            //             roleFun(i);
            //         }
            //     }
            // }
            // layerRole.addChildAt(role.body.spine, index++);
        }
        public bHideAuto: boolean;
        public bLockAuto: boolean;
        public bHideLimit: boolean;
        public bLockKey: boolean;
        public initOnceData() {
            this.bHideAuto = false
            this.bLockAuto = false
            this.bHideLimit = true
            this.bLockKey = false
        }
        public initData() {
            this.tableAllys = {};
            this.tableEnemys = {};
            this.tableEffects = [];
            this.tableParticles = [];
            this.tableDeadParticles = [];
            this.tableBloodEffects = [];
            this.tableCollision = [];
            this.tableAllyCallMobs = [];

            this.tableAllySupports = {};
            this.tableEnemySupports = {};

            this.tableTimelyPos = [];
            this.tablePosKey = {};
            this.tableEnemyKey = [];
            this.tableAllySptKey = {};
            this.tableEnemySptKey = {};
            this.tableAllyDead = [];
            this.tableEnemyDead = [];

            this.tableAllysReserveRec = [];
            this.tableEnemysReserveRec = [];
            this.tableDeadCacheLeft = {};
            this.tableDeadCacheRight = {};

            this.nGeneralCount = 0;
            this.monsterStage = 1;
            this.bBossAppear = false;
            this.eStageState = TableEnum.TableStageState.STAGE_STATE_1ST;
            this.tableMonsterPosRecord = {};

            //battle squeue
            this.battleSqueue = [];

            //dialog
            this.dialogGeneral = null;
            this.dialogStage = TableEnum.TableDialogStage.DIALOG_STAGE_NONE;
            this.bDialogGeneralAppear = false
            this.bOpenBattleStory = false
            this.bOpenBossInformation = false
            this.bossInformationId = 0

            // key
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_NONE

            this.delayTick = 0
            this.appearTick = 0
            this.timeIndex = 1
            this.timeOppIndex = 1
            this.appearIndex = 0
            this.appearOppIndex = 0

            this.cameraTouch = false
            this.cameraRole = null;
            this.cameraMoveDis = 0
            this.borderDis = 0

            this.cameraX = 0
            this.cameraY = 0

            // radialBlur
            this.radialBlurSprite = null;
            this.strength = 0
            this.strengthTime = 0
            this.strengthDir = 1
            this.startStrength = false

            // sceneScale
            this.scaleValue = 0
            this.scaleTime = 0
            this.scaleDir = 0
            this.startScale = false
            this.scaleBreakConst = 0
            this.scaleOutSpeedConst = 0
            this.scaleInSpeedConst = 0
            this.scaleOutFun = null
            this.scaleInFun = null

            // shake
            this.bShake = false
            this.shakeId = 0
            this.shakeMaxFrame = 0
            this.shakeFrame = 0
            this.isShakePlusX = 0
            this.isShakePlusY = 0
            this.shakeOrignX = 0
            this.shakeOrignY = 0
            this.shakeBgX = 0
            this.shakeBgY = 0

            // combo
            this.comboEffect = null
            this.comboLv = 1
            this.curCombo = 0
            this.maxCombo = 0
            this.comboRole = null;
            this.bComboBuff = false

            // low fps
            this.bBossDead = false
            this.bPvpDead = false
            this.bTeachDead = false
            this.bBossRemove = false
            this.bLowFrame = false
            this.nCurFps = ConstantConfig_RoleBattle.DEFAULTFPS;
            this.nDieFrame = 0
            this.bDiePlay = false

            // Pause
            this.bButtonPause = false
            this.isAllPause = false
            this.bTargetPause = false
            this.pauseFounder = null

            this.bBossPause = false
            this.pauseBoss = null
            this.bossPauseTick = 0

            this.createCombo();

            // ui
            this.mainmenu = null;
            //self.killEye = nil

            // help
            //self.helpBg = nil
            this.f_helpBgIndex = -1
            this.f_helpBgAction = -1
            this.b_helpRoleing = false
            this.ani_helpBg = null
            this.ani_helpRole = null
            this.ani_oppHelpRole = null
            this.helpRole = null
            this.senderHelpRole = null
            this.oppHelpRole = null
            this.oppSenderHelpRole = null

            //self.bHelpBgDisappear = false
            //self.helpRole = nil
            //self.helpGelOtherState = EnumHelpState.HELP_STATE_NONE
            //self.oppHelpRole = nil
            //self.oppHelpGelOtherState = EnumHelpState.HELP_STATE_NONE

            // goddess
            this.bGoddessDir = false
            this.goddessStandardX = 0
            this.goddessMagicX = 0
            this.bGoddessFun = false
            this.goddessTimer = 0

            // start
            this.fightStartSpine = null
            this.fightStartCss = null
            this.rawDuration_start = -1
            // timeup
            this.fightTimeUp = null

            // table clean
            this.tableClean = [];

            // talent
            this.tableLTalent = {}
            this.tableRTalent = {}
            this.tableTalentAni = {}

            // battle squeue
            this.bOpenQueueBattle = false
            this.maxAtkInterval = 0
            this.interval_tick = 0
            this.extra_tick = 0
            this.bAtkWait = false

            // battle time   
            //this.stageMaxTime = 0
            //this.battleTime = 0
            this.realTime = 1
            this.bTimingOn = true

            // data statistics   
            this.nFinalCnt = 0
            this.bBalance = false
            this.generalBattleInfo = []
            this.oppBattleInfo = []
            this.getItemInfo = { exp: 0, coin: 0, arena: 0, soul: 0, league: 0, items: {}, turnItems: {}, extraItems: {}, firstBloodItems: {}, potatos: {} }
            // verticalDis
            this.verticalDis = 0

            // replay
            this.replayLeftGelRec = {}
            this.replayRightGelRec = {}
            this.eventReplayIndex = 1
            this.speedReplayIndex = 1
            this.comboReplayIndex = 1
            this.timerTick = 0
            this.timerPluginTick = 0

            // power
            this.formatPosNum = 0
            this.tableGeneralsPower = {}

            //- ai
            this.leftAiCd = 0 //ConstantConfig_RoleBattle.AI_CD_TIME
            this.rightAiCd = 0 //ConstantConfig_RoleBattle.AI_CD_TIME

            // strategy
            //Gmgr.Instance.strategySkills = {[TablePositionType.POSITION_LEFT] = {}, [TablePositionType.POSITION_RIGHT] = {}}

            Gmgr.Instance.everybodyTalent = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.personalTalent = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.adviserSkills = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.leagueSkill = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.pokedexSkill = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.petSkill = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.titleSkill = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            Gmgr.Instance.skinSkill = { [TableEnum.TablePositionType.POSITION_LEFT]: [], [TableEnum.TablePositionType.POSITION_RIGHT]: [] };
            // buffs
            Gmgr.Instance.buffLeftAttriTbl = Helper.CreateGeneralAttrTbl();
            Gmgr.Instance.buffRightAttriTbl = Helper.CreateGeneralAttrTbl();

            // teach
            this.teachBattleId = -1

            // formular
            this.formulaTbl = {}

            // relate week to test
            this.timerEveryChap = 0
            this.currChapMaxTime = ConstantConfig_RoleBattle.FIGHT_TEST_STAGE_TIME
            //self.currChapWeekTime = 0
            this.currChapStep = 1
            this.maxChapStep = 5
            this.isWeekSteping = false
            this.chapResultTbl = {}
        }
        public releaseData() {
            CC_SAFE_DELETE(this.bossInstance);
            this.bossInstance = null;
            CC_SAFE_DELETE(this.beginRole);
            this.beginRole = null;
            CC_SAFE_DELETE(this.comboEffect);
            this.comboEffect = null;

            for (let k in this.tableAllys) {
                CC_SAFE_DELETE(this.tableAllys[k]);
            }
            this.tableAllys = {};

            for (let k in this.tableEnemys) {
                CC_SAFE_DELETE(this.tableEnemys[k]);
            }
            this.tableEnemys = {};

            for (let k in this.tableAllySupports) {
                CC_SAFE_DELETE(this.tableAllySupports[k]);
            }
            this.tableAllySupports = {};

            for (let k in this.tableEnemySupports) {
                CC_SAFE_DELETE(this.tableEnemySupports[k]);
            }
            this.tableEnemySupports = {};

            for (let i = 0; i < this.tableAllyCallMobs.length; i++) {
                CC_SAFE_DELETE(this.tableAllyCallMobs[i]);
            }
            this.tableAllyCallMobs = [];

            for (let i = 0; i < this.tableEnemyCallMobs.length; i++) {
                CC_SAFE_DELETE(this.tableEnemyCallMobs[i]);
            }
            this.tableEnemyCallMobs = [];

            for (let i = 0; i < this.tableEffects.length; i++) {
                CC_SAFE_DELETE(this.tableEffects[i]);
            }
            this.tableEffects = [];

            for (let i = 0; i < this.tableParticles.length; i++) {
                CC_SAFE_DELETE(this.tableParticles[i]);
            }
            this.tableParticles = [];

            for (let i = 0; i < this.tableDeadParticles.length; i++) {
                CC_SAFE_DELETE(this.tableDeadParticles[i]);
            }
            this.tableDeadParticles = [];

            this.tableCollision = null;
            this.tableTimelyPos = null;
            this.tablePosKey = null;
            this.tableEnemyKey = null;
            this.tableAllySptKey = null;
            this.tableEnemySptKey = null;
            this.tableAllyDead = null;
            this.tableEnemyDead = null;

            this.tableAllysReserveRec = null;
            this.tableEnemysReserveRec = null;
            this.tableDeadCacheLeft = null;
            this.tableDeadCacheRight = null;
            this.tableMonsterPosRecord = null;

            this.generalBattleInfo = null;
            this.oppBattleInfo = null;
            this.getItemInfo = null;
            this.replayBattleInfo = null;
            this.replayLeftGelRec = null;
            this.replayRightGelRec = null;

            this.tableGeneralsPower = null;
            this.comboRole = null;

            this.tableClean = null;
            this.tableLTalent = null;
            this.tableRTalent = null;
            this.tableTalentAni = null;
            if (this.ani_oppHelpRole) {
                this.ani_oppHelpRole.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
                this.ani_oppHelpRole.clearSpine();
                this.ani_oppHelpRole = null;
            }
            if (this.ani_helpRole) {
                this.ani_helpRole.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
                this.ani_helpRole.clearSpine();
                this.ani_helpRole = null;
            }
            // 清空数据防内存溢出
            SkillCdMgr.Instance.clearCd();
            this.cameraRole = null;
            //Gmgr.Instance.clearFightInfo();
        }
        public initBlackShader() {//1609   498
            //  let up:eui.Image=new eui.Image(UIConfig.UIConfig_CommonBattle.blackShade);
            //  //up.anchorOffsetX = 1609/2;
            //  //up.anchorOffsetY = 498;
            //  up.x = -this.fightRoot.x;//Device.STANDARD_SCREEN_W/2;
            //  up.y = 0;///this.uiScaleY;
            //  this.nodeBlackShader.addChild(up);

            //  let down:eui.Image=new eui.Image(UIConfig.UIConfig_CommonBattle.blackShade);
            // // up.anchorOffsetX = 1609/2;
            //  up.anchorOffsetY = 0;
            //  down.x=-this.fightRoot.x;//Device.STANDARD_SCREEN_W/2;
            //  down.y = UIManager.StageHeight;
            //  down.scaleY=-1;
            // let rect = new eui.Rect(2500, 2500, 0x000000);
            // rect.x = -this.fightRoot.x;
            // rect.alpha = 0.4;
            let rectImg: eui.Image = new eui.Image("ui_battle_buff_diban_png");
            rectImg.x = -this.fightRoot.x;
            rectImg.width = 2000;
            rectImg.height = 2000;
            rectImg.alpha = 0.7;
            this.nodeBlackShader.addChild(rectImg);
            this.nodeBlackShader.visible = false;
        }

        public release() {
            super.release();
            this.freeRes();
            this.releaseData();
        }
        public freeRes() {
            //preRes
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_zhandou_start);
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_tongyong);    
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_jisha);    
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_xuli); 
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_help); 
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_skill_dialog);
        }
        public getTiming() {
            return this.timerTick;
        }
        public battleEvent(type) {
            let eventAction = this._creatSceneEventAction(this.timerTick, type);
            this.replayBattleInfo.eventActions.push(eventAction);
        }
        public battleRole() {
            this.playerToBriefInfo();
            this.oppToBriefInfo();
            this.saveLeftFormat();
            this.saveRightFormat();
            this.saveOther();
        }
        public playerToBriefInfo() {
            this.replayBattleInfo.leftReplayInfo.roleInfo = Helper.baseToBriefInfo(Game.PlayerInfoSystem.BaseInfo);
        }
        public oppToBriefInfo() {

        }
        public saveLeftFormat() {
            this.replayBattleInfo.leftReplayInfo.formation = this.curFormation;
        }
        public saveRightFormat() {
            this.replayBattleInfo.rightReplayInfo.formation = new message.FormationInfo;
        }
        public saveOther() {

        }
        public saveLeftGeneralInfos() {
            let generals = this.curFormation.generals;
            let reserves = this.curFormation.reserves;
            let supports = this.curFormation.supports;

            this._fillGel(generals, 1);
            this._fillGel(reserves, 2);
            this._fillGel(supports, 3);
        }
        public _fillGel(t, type) {
            for (let i = 0; i < t.length; i++) {
                if (t[i] != 0) {
                    let index = Helper.getGeneralIndexById(t[i]);
                    if (index == -1) {
                        continue;
                    }
                    let battleGeneral = new message.BattleGeneralInfo;
                    battleGeneral.type = type;

                    let roleInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
                    let [result, _] = PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo);
                    roleInfo.attri = Helper.tblConvertAttri(result);
                    battleGeneral.generalInfo = roleInfo;
                    this.replayBattleInfo.leftReplayInfo.generals.push(battleGeneral);

                }
            }
        }
        public saveRightGeneralInfos() {

        }
        public saveLeftAdviser() {
            //  for k,v in pairs(Player.advisers) {
            //     table.insert(self.replayBattleInfo.leftReplayInfo.advisers, v );
            //  }
        }
        public saveRightAdviser() {

        }
        public saveLeftArtifact() {
            // for k,v in pairs(Player.artifacts) {
            //     table.insert(self.replayBattleInfo.leftReplayInfo.artifacts, v )
            // }
        }
        public saveRightArtifact() {

        }
        public battleRTime(time) {
            if (this.replayBattleInfo != null) {
                this.replayBattleInfo.stageTimes.push(time / 1000);
            }
        }
        public procClean() {
            let self = this;
            let i = 0;
            while (i < self.tableClean.length) {
                let info = self.tableClean[i];
                if (info.bClean == true) {
                    info.father.removeChild(info.body);
                    self.tableClean.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
        }
        public creatDelayClean(_body, _father) {
            let info = { body: _body, father: _father, bClean: true };
            this.tableClean.push(info);
        }
        //普通攻击设计
        public openQueueBattle() {
            this.bOpenQueueBattle = true;
            this.maxAtkInterval = squeueConfig.start_interval;
        }
        public closeQueueBattle() {
            this.bOpenQueueBattle = false;
        }
        public InitBattleSqueue() {
            this.battleSqueue = [];
            for (let i = 0; i < 4; i++) {
                let info = {};
                let id = this.tablePosKey[i];
                if (id == null) { id = -1; }
                if (this.tableAllys[id] == null) { id = -1; }
                info = { id: id, bEnemy: false };
                this.battleSqueue[i * 2] = info;
            }
            for (let i = 1; i <= 4; i++) {
                let info = {};
                let id = this.tableEnemyKey[i - 1];
                if (id == null) { id = -1; }
                if (this.tableEnemys[id] == null) { id = -1; }
                info = { id: id, bEnemy: true };
                this.battleSqueue[i * 2 - 1] = info;
            }
            let i = 0;
            while (i < this.battleSqueue.length) {
                if (this.battleSqueue[i].id == -1) {
                    this.battleSqueue.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
            this.interval_tick = 0;
            this.extra_tick = 0;
            this.bAtkWait = false;
        }
        public endRound(roleId, bEnemy) {
            this.delSqueue(roleId, bEnemy);
            this.pushSqueue(roleId, bEnemy);
        }
        public pushSqueue(roleId, bEnemy) {
            let info = { id: roleId, bEnemy: bEnemy };
            this.battleSqueue.push(info);
        }
        public breakRound() {
            if (this.battleSqueue.length >= 2) {
                let roleA = this.battleSqueue[0];
                this.battleSqueue.splice(0, 1);
                this.battleSqueue.push(roleA);
            }
        }
        public clearSqueueInfo() {
            this.interval_tick = 0;
            this.extra_tick = 0;
            this.bAtkWait = false;
        }
        public fillSqueueInfo() {
            this.interval_tick = this.maxAtkInterval;
            this.extra_tick = 0;
            this.bAtkWait = false;
        }
        public setNextAtkInterval(curRole) {
            if (curRole != null && curRole.getAutoSkill() != null) {
                this.maxAtkInterval = curRole.getAutoSkill().getSkillDelayTime();
            } else {
                this.maxAtkInterval = squeueConfig.atk_interval;
            }
        }
        public isCommonAtkLegal() {
            for (let k in this.tableAllys) {
                if (this.tableAllys[k].otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false;
                }
            }
            for (let k in this.tableEnemys) {
                if (this.tableEnemys[k].otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false
                }
            }
            for (let k in this.tableAllySupports) {
                if (this.tableAllySupports[k].otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false
                }
            }
            for (let k in this.tableEnemySupports) {
                if (this.tableEnemySupports[k].otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false
                }
            }
        }
        public procAiTime(tick) {
            let self = this;
            if (Gmgr.Instance.bReplay == true) {
                return;
            }
            if (self.bTargetPause == true) {
                return;
            }
            if (self.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            let dt = tick * 1000;
            self.leftAiCd = self.leftAiCd - dt;
            if (self.leftAiCd <= 0) {
                self.leftAiCd = 0;
            }
            self.rightAiCd = self.rightAiCd - dt
            if (self.rightAiCd <= 0) {
                self.rightAiCd = 0
            }
        }
        public procBattleSqueue(tick) {
            let self = this;
            if (Gmgr.Instance.bReplay == true) { return; }
            if (self.bTargetPause == true) { return; }
            if (self.bOpenQueueBattle == false) { return; }
            if (self.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) { return; }
            if (self.battleSqueue.length == 0) { return; }
            let dt = tick * 1000;
            self.interval_tick = self.interval_tick + dt;
            if (self.interval_tick >= self.maxAtkInterval) {
                let info = self.battleSqueue[0];
                let role = null;
                if (info.bEnemy == false) {
                    role = self.tableAllys[info.id];
                }
                else {
                    role = self.tableEnemys[info.id];
                }
                //上线待修改
                if (role == null) { return; }
                if (self.bAtkWait == true) {
                    self.extra_tick = self.extra_tick + dt;
                    //多长时间未攻击开启下一次攻击
                    if (self.extra_tick >= squeueConfig.break_interval) {
                        self.clearSqueueInfo();
                        self.breakRound();
                    }
                    else {
                        if (role.playCommonAtk(0) == true) {
                            self.clearSqueueInfo();
                            self.setNextAtkInterval(role);
                        }
                    }
                }
                else {
                    if (!role.checkBuffLegeal()) {
                        self.fillSqueueInfo();
                        self.breakRound();
                    }
                    else {
                        if (role.playCommonAtk(0) == false) {
                            self.bAtkWait = true;
                        }
                        else {
                            self.clearSqueueInfo();
                            self.setNextAtkInterval(role);
                        }
                    }
                }
            }
        }
        public startFight() {
            if (this.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) { return; }
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT;
            this.openQueueBattle();
            if (this.eStageState == TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.openFirstStart();
            } else {
                this.openSecondStart();
            }
        }
        public openFirstStart() {
            this.recordHpPer();
            this.appearAllysPersonal();
            this.startAllysPersonal();
            this.appearEnemyPersonal();
            this.startEnemyPersonal();
        }
        public openSecondStart() {
            this.recordHpPer();
            this.appearEnemyPersonal();
            this.startAllysPersonal();
            this.startEnemyPersonal();
        }
        public startStrategy() {
            this.startAllysStrategy();
            this.startEnemyStrategy();
        }
        //女神检测施法
        public procGoddess(tick) {
            if (this.bGoddessFun == false) {
                this.goddessTimer = this.goddessTimer + tick * 1000;
                if (this.goddessTimer > 1000) {
                    this.bGoddessFun = true;
                    this.goddessTimer = 0;
                    this.startStrategy();
                }
            }
        }
        //径向模糊
        public creatRadialBlur() {
            //this.nodeGround.visible=false;
            this.startStrength = true
            this.strengthDir = 1
            this.strengthTime = 0
            this.strength = 0;

        }
        public procRadialBlur(tick) {
            this.strengthTime = this.strengthTime + tick * 1000;
            if (this.strengthTime > RadialBlurConfig.Blur_Break_Time && this.startStrength == true) {
                this.strengthTime = this.strengthTime - RadialBlurConfig.Blur_Break_Time;
                let _delete = false;
                if (this.strengthDir == 1) {
                    this.strength = this.strength + RadialBlurConfig.Emerge_Speed;
                    if (this.strength >= RadialBlurConfig.Blur_Value_Max) {
                        this.strength = RadialBlurConfig.Blur_Value_Max;
                        this.strengthDir = -1;
                    }
                } else {
                    this.strength = this.strength - RadialBlurConfig.Die_Speed;
                    if (this.strength < RadialBlurConfig.Blur_Value_Min) {
                        this.strength = RadialBlurConfig.Blur_Value_Min;
                        this.strengthDir = 1;
                        this.startStrength = false;
                        _delete = true;
                    }
                }
                //this.radialBlurSprite.getGLProgramState().setUniformFloat("variedStrength", this.strength);
                if (_delete == true) {
                    // this.nodeMask.removeChild(this.radialBlurSprite);
                    // this.nodeGround.visible=true;
                    // this.radialBlurSprite = null;
                    this.endRadialBlur();
                }
            }
        }
        public endRadialBlur() {
            this.saveCameraInfo();
            this.resetMapOut();
            this.openSceneEffect(true);
            if (this.eStageState == TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
            } else if (this.eStageState == TableEnum.TableStageState.STAGE_STATE_2ND) {
                this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_4TH)
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
            }
        }
        public initCamera() {
            if (this.monsterStage == TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                this.borderDis = FightDistanceConfig.A * this.groundScale// * this.uiScale;
            } else {
                this.borderDis = FightDistanceConfig.B * this.groundScale// * this.uiScale                      
            }
        }
        public updateCamera(tick) {
            let self = this;
            let rt = tick * 1000;
            if (self.cameraTouch == true) {
                let dis = Math.floor(FightDistanceConfig.BG_Move_Speed * rt);
                let tmpDis = self.cameraMoveDis;
                self.cameraMoveDis = self.cameraMoveDis + dis;
                let xx = 0;
                let yy = 0;
                if (self.cameraMoveDis > self.borderDis) {
                    self.cameraTouch = false;
                    dis = self.borderDis - tmpDis;
                    self.cameraMoveDis = 0;
                }
                let _x = self.nodeRoot.x;
                let _y = self.nodeRoot.y;
                self.nodeRoot.x = _x - dis;
                self.nodeRoot.y = 0;
                self.UpdateMap(dis / self.groundScale, 0);
            }
        }
        public openRunCamera(role) {
            //开启镜头移动
            this.cameraTouch = true;
            this.cameraRole = role;
            //人物进入奔跑第二阶段
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null) {
                    v.setRunState(TableEnum.TableRunStage.STAGE_RUN_TWO);
                }
            }
        }
        public saveCameraInfo() {
            this.cameraX = this.nodeRoot.x;
            this.cameraY = this.nodeRoot.y;
        }
        public resetMapOut() {
            this.nodeRoot.x = 0;
            this.nodeRoot.y = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = 1;
            this.nodeMap.scaleX = this.nodeMap.scaleY = 1;
            this.shakeBgX = this.nodeMap.x;
            this.shakeBgY = this.nodeMap.y;

            this.setFightPos();
            this.InitBattleSqueue();
        }
        public resetMapIn() {
            this.nodeRoot.anchorOffsetX = 0;
            this.nodeRoot.anchorOffsetY = 0;
            this.nodeRoot.x = this.x;
            this.nodeRoot.y = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.groundScale;
            this.nodeMap.scaleX = this.nodeMap.scaleY = this.groundScale;
            this.setAllysCameraPos();
        }
        public setAllysCameraPos() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                let num = v.getTeamNum() + 1;
                let _x = Math.abs(this.cameraX) / this.groundScale / this.uiScale + FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[num];
                v.setPosX(_x);
            }
        }
        public setFightPos() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                let num = v.getTeamNum() + 1;
                let xx = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[num];
                let yy = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[num]);
                yy = UIManager.StageHeight - yy;
                v.setPos(xx, yy);
                v.setTeamCoord(xx, yy);
                v.clearRun();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                let num = v.getTeamNum() + 1;
                let xx = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[num];
                let yy = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[num]);
                yy = UIManager.StageHeight - yy;
                v.setPosX(xx, yy);
                v.setTeamCoord(xx, yy);

            }
            this.openAiFight(this.tableAllys);
            this.openAiFight(this.tableAllySupports);
        }
        public hideAllAlly() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.visible = false;
            }
        }
        public checkOppDead(bEnemy) {
            if (!bEnemy) {
                return this.checkAllEnemyDead();
            } else {
                return this.checkAllFriendDead();
            }
        }
        public checkOppAnyReady(bEnemy) {
            if (!bEnemy) {
                return this.checkAnyEnemyReady();
            } else {
                return this.checkAnyAllyReady();
            }
        }
        public checkAnyAllyReady() {
            let tag = false;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bDead && !v.bCall && v.bStartFight) {
                    tag = true;
                    break;
                }
            }
            return tag;
        }
        public checkAnyEnemyReady() {
            let tag = false;
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && !v.bDead && !v.bCall && v.bStartFight) {
                    tag = true;
                    break;
                }
            }
            return tag;
        }
        public checkAllEnemyDead() {
            let tag = true;
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && !v.bDead && !v.bCall) {
                    tag = false;
                    break;
                }
            }
            return tag;
        }
        public checkAllFriendDead() {
            let tag = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bDead && !v.bCall) {
                    tag = false;
                    break;
                }
            }
            return tag;
        }
        public checkAllFriendIsFloor() {
            let tag = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bDead && v.getIsOnFloor() == false) {
                    tag = false;
                    break;
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != null && !v.bDead && v.getIsOnFloor() == false) {
                    tag = false;
                    break;
                }
            }
            return tag;
        }

        public checkAllFriendIsState(state) {
            let tag = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bDead && v.otherState != state) {
                    tag = false;
                    break;
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != null && !v.bDead && v.otherState != state) {
                    tag = false;
                    break;
                }
            }
            if (tag && Game.TeachSystem.curPart == 4002) Game.EventManager.event(GameEvent.SKILL_CD_OK, { isOk: true });
            return tag;
        }
        public checkEnemyEmpty() {
            let empty = true;
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && !v.bCall) {
                    empty = false;
                    break;
                }
            }
            return empty;
        }
        public checkAllFriendEmpty() {
            let empty = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bCall) {
                    empty = false;
                    break;
                }
            }
            return empty;
        }
        public changeGround() {
            this.groundScale = 1;//FightDistanceConfig.Fight_Scale;
            this.nodeRoot.anchorOffsetX = this.nodeRoot.anchorOffsetY = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.groundScale;
            this.nodeMap.anchorOffsetX = this.nodeMap.anchorOffsetY = 0;
            this.nodeMap.scaleX = this.nodeMap.scaleY = this.groundScale;
        }
        public initFightNumber() {
            //加载数字图片
            FightNumberEffectMgr.Instance.addToLayer(this.nodeNumber);
        }
        public Init() {
            // this.nodeMap.cacheAsBitmap = true;
            this.loadAuto();

            // this.initMyYH();

            this.shakeOrignX = this.nodeRoot.x;
            this.shakeOrignY = this.nodeRoot.y;
            this.shakeBgX = this.nodeMap.x;
            this.shakeBgY = this.nodeMap.y;

            this.loadTime();
            this.loadSound();
            this.teachBattleId = Game.TeachSystem.curPart
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_INIT;
        }
        public loadSound() {
            Helper.PlaybgmByID(100006);
        }
        public loadTime() {
            if (Gmgr.Instance.bReplay == false) {
                this.battleRTime(this.stageMaxTime);
            }
        }
        public loadAuto() {

        }
        public initMap() {
            //  local tableCityData = CSV:GetTable("city_data") 
            //  self:LoadMap(1)  
        }
        public startShake(id) {
            if (GlobalBattleConfig.shake == false) {
                return;
            }
            this.nodeRoot.x = this.shakeOrignX;
            this.nodeRoot.y = this.shakeOrignY;
            this.nodeMap.x = this.shakeBgX;
            this.nodeMap.y = this.shakeBgY;

            function rand() {
                // if (mtirand()%2 == 1){
                //     return true
                // }else{
                //     return false
                // }
                return false;
            }

            this.bShake = true;
            this.shakeId = id;
            this.shakeFrame = 0;
            this.isShakePlusX = this.rand();
            this.isShakePlusY = this.rand();
            let tableShake = TableClientSkillShake.Table();
            this.shakeMaxFrame = tableShake[this.shakeId].screen_shake_frame;

        }
        private rand() {
            // if mtirand()%2 == 1 then
            //     return true
            // else
            //     return false
            // end
        }
        public updateShake(tick) {
            let self = this;
            if (self.bShake == false) {
                return;
            }
            if (self.shakeFrame >= self.shakeMaxFrame) {
                self.bShake = false;
                self.shakeFrame = 0;
                self.shakeId = -1;
                self.nodeRoot.x = self.shakeOrignX;
                self.nodeRoot.y = self.shakeOrignY;
                self.nodeMap.x = self.shakeBgX;
                self.nodeMap.y = self.shakeBgY;
            } else {
                let tableShake = TableClientSkillShake.Table();
                self.isShakePlusX = !self.isShakePlusX;
                self.isShakePlusY = !self.isShakePlusY;
                let randX = 0;
                let randY = 0;
                let maxX = tableShake[self.shakeId].range_x[1];
                let minX = tableShake[self.shakeId].range_x[0];
                let maxY = tableShake[self.shakeId].range_y[1];
                let minY = tableShake[self.shakeId].range_y[0];
                if (maxX == 0 && minX == 0) {
                    randX = 0;
                } else if (maxX == minX) {
                    randX = minX;
                } else {
                    // randX = minX + mtirand()%(maxX-minX);
                }
                if (randX > 10 || randX < 0) {
                    randX = 0;
                }
                if (maxY == 0 && minY == 0) {
                    randY = 0;
                } else if (maxY == minY) {
                    randY = minY;
                } else {
                    // randY = minY + mtirand()%(maxY-minY);
                }
                if (randY > 10 || randY < 0) {
                    randY = 0;
                }
                self.nodeMap.x = self.shakeBgX + yuan3(self.isShakePlusX, randX, -randX);
                self.nodeMap.y = self.shakeBgY + yuan3(self.isShakePlusY, randY, -randY);

                self.nodeRoot.x = self.shakeOrignX + yuan3(self.isShakePlusX, randX, -randX);
                self.nodeRoot.y = self.shakeOrignY + yuan3(self.isShakePlusY, randY, -randY);
                self.shakeFrame = self.shakeFrame + tick * 1000;
            }
        }
        public isTimePause() {
            return this.bBeginPause;
        }
        public tick = 0;
        public Update(tick) {
            let self = this;
            //外挂检测
            // if self.cheatCheckTime == nil or self.cheatCheckTime > 1 then
            //     self.cheatCheckTime = 0
            //     local funcData = hunterHurtC( 1, 1, 1, 1, 1, 1)
            //     if (cheatFuncData == 0 and funcData > 3) or (cheatFuncData ~= 0 and funcData > cheatFuncData) then
            //         cheatFuncData = funcData
            //     end
            // end
            self.tick = tick;
            self.cheatCheckTime = self.cheatCheckTime + tick;
            let cheatDt = tick * Gmgr.Instance.battleSpeed || 1;//1 / ConstantConfig_RoleBattle.DEFAULTFPS * Gmgr.Instance.battleSpeed;
            //清除命中音效限制
            Gmgr.Instance.hitSoundEffectNum = 0;
            //教学轮询
            //Teach.procTeach(self.instanceId);
            //各种提示
            //TipsMgr.CheckTips();
            //动画同步处理
            self.updateStartCssEnd();

            if (Gmgr.Instance.bPause == true) { return; }
            //self.proOperateTeach(cheatDt);
            if (self.bBossPause == true) {
                return;
            }
            //战斗计时器
            if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT || self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT) {
                self.timerTick = self.timerTick + 1;
            }
            //减帧处理
            let slowDt = cheatDt;
            self.updateIsLowFrame();
            self.updateDie(slowDt);
            slowDt = cheatDt * self.nCurFps / ConstantConfig_RoleBattle.DEFAULTFPS;
            self.updateShake(cheatDt);
            self.updateFightState(cheatDt);
            self.updateCamera(cheatDt);
            self.procVerticalDis();
            if (self.isAllPause == false) {
                self.procSkiPause(slowDt);
            }
            Gmgr.Instance.aiSpeedList.length = 0;
            self.procRole(self.tableAllys, slowDt);
            self.procRole(self.tableEnemys, slowDt)
            self.procHelpRole(self.tableAllySupports, slowDt);
            self.procHelpRole(self.tableEnemySupports, slowDt);
            self.updateRoleSpeed(slowDt);
            self.procBattleSqueue(cheatDt);
            self.procAiTime(cheatDt);
            if (self.isAllPause == false) {
                self.procParticles(slowDt);
                self.procEffects(slowDt);
                if (self.bTargetPause == false) {
                    self.procCombo(slowDt);
                    self.procCd(cheatDt);
                    //黑屏期间倒计时暂停
                    self.updateBattleTime(cheatDt);
                    self.procChapWeek(cheatDt);
                }
            }
            self.procEffectCollision(self.tableCollision);
            self.procClean();
            FightNumberEffectMgr.Instance.update(cheatDt);
        }
        public procChapWeek(tick) {
            let self = this;
            let rt = tick * 1000;
            if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                if (self.isWeekSteping) {
                    self.timerEveryChap = self.timerEveryChap + rt;
                    if (self.timerEveryChap >= self.weekTime) {
                        self.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_WEEK_SETTLE;
                        self.clearMyTEfectBelongEnemy();
                        if (self.bossInstance != null) {
                            self.bossInstance.clearAllBuffs();
                        }
                        if (self.isFinalStage()) {
                            self.goBalance();
                        } else {
                            self.chapResultTbl[self.currChapStep] = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
                            self.takeRoleBattleInfo(self.oppBattleInfo, self.bossInstance);
                            self.varyGeneralDamage(self.replayBattleInfo.rightReplayInfo.generals, self.bossInstance, self.eStageState);
                            if (self.mainmenu != null) {
                                self.mainmenu.EndCurrChap();
                            }
                        }
                    }
                }
            }
        }
        public isFinalStage() {
        }
        public openNextChap() {
            this.resetNextStepData();
            this.openNextChapMonster();
            if (this.bossInstance != null) {
                this.bossInstance.setAppearStage(this.monsterStage);
                this.bossInstance.willLeaveWeek(this.bossId);
                this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, this.bossInstance, 1, false, null, null, null, true);
            }
            if (this.mainmenu != null) {
                this.mainmenu.StartNextChap();
                this.mainmenu.ResetCurrBossInfo();
                this.mainmenu.CloseWeekUI();
            }
        }
        public openFillNextMonster() {
            let tbl = [0, 1, 3];
            for (let i = 0; i < tbl.length; i++) {
                this.fillMonster(tbl[i]);
            }
        }
        public fillMonster(pos) {

        }
        public isCanEnterWeek() {
            if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return false;
            } else {
                if (this.currChapStep >= this.maxChapStep) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        public openNextChapMonster() {

        }
        public openWeekStep() {
            this.isWeekSteping = true;
            this.setEnemysDeadExpBoss();
            if (this.bossInstance != null) {
                this.bossInstance.setWeekTimer(this.weekTime);
                this.bossInstance.changeOtherState(TableEnum.TableEnumOtherState.OtherState_EnterWeek);
            }
            if (this.mainmenu != null) {
                this.mainmenu.OpenWeekUI();
            }
        }
        public resetNextStepData() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT;
            this.timerEveryChap = 0;
            this.currChapStep = this.currChapStep + 1;
            this.isWeekSteping = false;
            this.battleTime = 0;
            this.monsterStage = this.monsterStage + 1;
            this.eStageState = this.eStageState + 1;
        }
        public getCurrChapSetp() {
            return this.currChapStep;
        }
        public getChapResultTbl() {
            return this.chapResultTbl;
        }

        public getWeekBossHurt() {
            if (this.bossInstance != null) {
                return this.bossInstance.getShieldHp();
            }
            return 0;
        }
        public updateRoleSpeed(tick) {
            let self = this;
            let list = Gmgr.Instance.aiSpeedList;
            if (list.length > 0) {
                list.sort(function (a: any, b: any) { return b.ext - a.ext });
                for (let i = 0; i < list.length; i++) {
                    let info = list[i];
                    if (!info.bEnemy) {
                        if (!info.bSupport) {
                            if (self.tableAllys[info.id] != null) {
                                self.tableAllys[info.id].update(tick);
                            }
                        } else {
                            if (self.tableAllySupports[info.id] != null) {
                                self.tableAllySupports[info.id].update(tick);
                            }
                        }
                    }
                    else {
                        if (!info.bSupport) {
                            if (self.tableEnemys[info.id] != null) {
                                self.tableEnemys[info.id].update(tick);
                            }
                        } else {
                            if (self.tableEnemySupports[info.id] != null) {
                                self.tableEnemySupports[info.id].update(tick)
                            }
                        }
                    }
                }
                for (let i = 0; i < list.length; i++) {
                    let info = list[i];
                    if (!info.bEnemy) {
                        if (!info.bSupport) {
                            if (self.tableAllys[info.id] != null) {
                                self.tableAllys[info.id].updateExtra(tick);
                            }
                        } else {
                            if (self.tableAllySupports[info.id] != null) {
                                self.tableAllySupports[info.id].updateExtra(tick);
                            }
                        }
                    }
                    else {
                        if (!info.bSupport) {
                            if (self.tableEnemys[info.id] != null) {
                                self.tableEnemys[info.id].updateExtra(tick);
                            }
                        }
                        else {
                            if (self.tableEnemySupports[info.id] != null) {
                                self.tableEnemySupports[info.id].updateExtra(tick);
                            }
                        }
                    }
                }
            }
            Gmgr.Instance.aiSpeedList = [];
        }
        public updateRoleReplay(tick) {

        }
        public updateBossPause(tick) {
            this.bossPauseTick = this.bossPauseTick + tick * 1000;
            if (this.bossPauseTick >= 500) {
                this.resumeByBoss();
                this.bossPauseTick = 0;
            }
        }
        public updateTeamMap(baseX, baseY) {
            this.UpdateMap(0, baseY);
            this.updateMapEnemys(0, baseY, this.objectRole);
            this.updateMapAllys(0, baseY, this.objectRole);
            //this.updateMapHelpGeneral(0, baseY, this.objectRole)
            this.updateMapEffects(0, baseY, this.objectRole);
        }

        public procVerticalDis() {
            // let self = this;
            function _search() {

                for (let k in this.tableAllys) {
                    let v = this.tableAllys[k];
                    if (v.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                        if (v.y > ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                            return v;
                        }
                    }
                }

                for (let k in this.tableAllySupports) {
                    let v = this.tableAllySupports[k];
                    if (v.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
                        if (v.y > ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                            return v;
                        }
                    }
                }
                return null;
            }
            if (this.objectRole == null) {
                this.objectRole = _search();
            }
            let dis;
            let tag;
            if (this.objectRole != null) {
                dis = this.objectRole.y - ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS;
                tag = false;
                if (this.objectRole.y <= ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                    dis = 0;
                    tag = true;
                }
                let shift = dis - this.verticalDis;
                this.updateTeamMap(0, shift);
                this.verticalDis = dis;
                if (tag) {
                    this.verticalDis = 0;
                    this.objectRole = null;
                }
            }

        }
        public updateMapEnemys(base_x, base_y, object) {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }

            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }

            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }
        }
        public updateMapAllys(base_x, base_y, object) {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != object) {
                    if (v.otherState != TableEnum.TableEnumOtherState.OtherState_Attack) {
                        let xx = v.x;
                        let yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    } else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (Gmgr.Instance.ground - Gmgr.Instance.floor);
                    }
                }
            }
        }
        public updateMapEffects(base_x, base_y, object) {
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.x = v.teamOriginalX;
                v.y = v.teamOriginalY + (Gmgr.Instance.ground - Gmgr.Instance.floor);
            }
        }
        public updateMapNumbers(xx, yy) {
            FightNumberEffectMgr.Instance.moveDistance(xx, yy);
        }
        public procCd(tick) {
            let self = this;
            if (self.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            SkillCdMgr.Instance.update(tick);
        }
        public updateFightState(tick) {
            let self = this;
            if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_INIT) {
                self.openAppaer(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_APPEAR) {
                self.procSenceAppear(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_WALK) {
                self.procSenceRun(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_CHANGE) {
                self.procRadialBlur(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_SCALE) {
                self.procSceneScale(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_DIALOG) {
                self.procDialog(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT_RULE) {
                self.procRule(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT_GODDESS) {
                self.procGoddess(tick);
            } else if (self.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT) {
                self.procFightWait(tick);
            }
        }
        public procSenceAppear(tick) {
            this.procSenceAppear_2(tick);
        }
        public procRule(tick) {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        }
        public procFightWait(tick) {
            // if(this.mainmenu != null){
            //     if(this.mainmenu.getLoadStep() == -1){
            //         this.startFight();
            //     }
            // }
            this.startFight();
        }
        public openAppaer(tick) {
            this.delayTick = this.delayTick + tick * 1000;
            if (this.delayTick >= 200) {
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_APPEAR;
                if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LADDER_ATTACK &&
                    /**Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MINE_SNATCH*/
                    Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER &&
                    Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC &&
                    Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_GROUP_FIGHT
                ) {
                    this.closeSceneEffect();//有问题
                }
            }
        }
        public openRun() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_WALK;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
            }
        }
        public openSceneOut() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_CHANGE;
            this.creatRadialBlur();
        }
        public funSceneScaleIn() {
            this.resetMapIn();
            this.openRun();
        }
        public dirRun() {
            this.openRun();
        }
        public setScaleInConfig(breakTime, inSpeed, inFun) {
            this.scaleDir = -1;
            this.scaleValue = 1.0;
            this.scaleBreakConst = breakTime;
            this.scaleInSpeedConst = inSpeed;
            this.scaleInFun = inFun;
        }
        public setScaleOutConfig(breakTime, outSpeed, outFun) {
            this.scaleDir = 1;
            this.scaleValue = this.groundScale;
            this.scaleBreakConst = breakTime;
            this.scaleOutSpeedConst = outSpeed;
            this.scaleOutFun = outFun;
        }
        public openSceneScaleOut() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_SCALE;
            this.startScale = true;
            this.setScaleOutConfig(SceneScaleConfig.Scale_Break_Time, SceneScaleConfig.Scale_Out_Speed, null);
        }
        public openSceneScaleIn() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_SCALE;
            this.startScale = true;
            this.setScaleInConfig(SceneScaleConfig.Scale_Break_Time, SceneScaleConfig.Scale_In_Speed, this.funSceneScaleIn);
        }
        public procSceneScale(tick) {
            this.scaleTime = this.scaleTime + tick * 1000;
            if (this.scaleTime > this.scaleBreakConst && this.startScale == true) {
                if (this.scaleDir == 1) {
                    this.scaleTime = this.scaleTime - this.scaleBreakConst;
                    this.scaleValue = this.scaleValue + this.scaleOutSpeedConst;
                    if (this.scaleValue >= 1) {
                        this.scaleValue = 1;
                        this.startScale = false;
                        this.scaleTime = 0;
                        if (this.scaleOutFun != null) {
                            this.scaleOutFun(this);
                        }
                        return;
                    }
                    this.nodeMap.scaleX = this.nodeMap.scaleY = this.scaleValue;
                    this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.scaleValue;
                } else if (this.scaleDir == -1) {
                    this.scaleTime = this.scaleTime - this.scaleBreakConst;
                    this.scaleValue = this.scaleValue - this.scaleInSpeedConst;
                    if (this.scaleValue < this.groundScale) {
                        this.scaleValue = this.groundScale;
                        this.startScale = false;
                        this.scaleTime = 0;
                        if (this.scaleInFun != null) {
                            this.scaleInFun(this);
                        }
                        return;
                    }
                    this.nodeMap.scaleX = this.nodeMap.scaleY = this.scaleValue;
                    this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.scaleValue;
                }
            }
        }
        public procSenceAppear_1(tick) {
            let _number = Helper.getObjLen(this.tableAllys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number) {
                this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_1ST);
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
        }
        public procSenceAppear_2(tick) {
            let _number = Helper.getObjLen(this.tableAllys);
            let numberOpp = Helper.getObjLen(this.tableEnemys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number && this.checkOppAppearEnd() == true && this.timeOppIndex > numberOpp) {
                this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
            this.procOppAppear();

        }
        public procSenceAppear_3(tick) {
            let _number = Helper.getObjLen(this.tableAllys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number) {
                this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
        }
        public procSenceRun(tick) {
            if (this.checkRunEnd() == true && this.cameraTouch == false) {
                if (this.eStageState == TableEnum.TableStageState.STAGE_STATE_1ST) {
                    this.openSceneOut();
                } else {
                    this.endRadialBlur();
                }
            }
        }
        public checkAppearEnd() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && v.getOtherState() == TableEnum.TableEnumOtherState.OtherState_Appear) {
                    return false;
                }
            }
            return true;
        }
        public procMyAppear() {
            let _number = Helper.getObjLen(this.tableAllys);
            if (this.timeIndex <= _number && this.appearTick > AppearTimeConfig[this.timeIndex]) {
                for (let k in this.tablePosKey) {
                    let v = this.tablePosKey[k];
                    if (this.appearIndex < parseInt(k) + 1) {
                        this.appearIndex = parseInt(k) + 1;
                        this.timeIndex = this.timeIndex + 1;
                        this.tableAllys[v].setVisible(true);
                        this.tableAllys[v].changeOtherState(TableEnum.TableEnumOtherState.OtherState_Appear);
                        break;
                    }
                }
            }
        }
        public procOppAppear() {
            let _number = Helper.getObjLen(this.tableEnemys);
            if (this.timeOppIndex <= _number && this.appearTick > AppearTimeConfig[this.timeOppIndex]) {
                for (let k in this.tableEnemyKey) {
                    let v = this.tableEnemyKey[k];
                    if (this.appearOppIndex < parseInt(k) + 1) {
                        this.appearOppIndex = parseInt(k) + 1;
                        this.timeOppIndex = this.timeOppIndex + 1;
                        this.tableEnemys[v].setVisible(true);
                        this.tableEnemys[v].changeOtherState(TableEnum.TableEnumOtherState.OtherState_Appear);
                        break;
                    }
                }
            }
        }
        public checkOppAppearEnd() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && v.getOtherState() == TableEnum.TableEnumOtherState.OtherState_Appear) {
                    return false;
                }
            }
            return true;
        }
        public checkRunEnd() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && v.getOtherState() == TableEnum.TableEnumOtherState.OtherState_Run) {
                    return false;
                }
            }
            return true;
        }
        public getSceneEffectByID(id) {
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                if (v.effect_id == id) {
                    return v;
                }
            }
            return null;
        }
        public procEffects(tick) {
            let self = this;
            let i = 0;
            while (i < self.tableEffects.length) {
                if (self.bTargetPause == true && self.tableEffects[i].belong_role != self.pauseFounder) {
                    i = i + 1;
                    continue;
                }
                self.tableEffects[i].update(tick);
                i = i + 1;
            }
            i = 0;
            while (i < self.tableEffects.length) {
                let tEffect = self.tableEffects[i];
                let bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    CC_SAFE_DELETE(tEffect);
                    if (tEffect.effect_skill_type == 2) {
                        Game.ObjectPool.returnItem("SkillEffectBase_2", tEffect);
                    } else if (tEffect.effect_skill_type == 1) {
                        Game.ObjectPool.returnItem("SkillEffectBase_1", tEffect);
                    }
                    self.tableEffects.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
        }
        public addEffect(effect) {
            this.tableEffects.push(effect);
        }
        public clearAllEffects() {
            let i = 0;
            while (i < this.tableEffects.length) {
                CC_SAFE_DELETE(this.tableEffects[i]);
                this.tableEffects.splice(i, 1);
            }
        }
        public procParticles(tick) {
            let self = this;
            let i = 0;
            while (i < self.tableParticles.length) {
                self.tableParticles[i].update(tick);
                i = i + 1;
            }
            i = 0;
            while (i < self.tableParticles.length) {
                let particle = self.tableParticles[i];
                let bFinish = particle.getIsFinish();
                if (bFinish == true) {
                    CC_SAFE_DELETE(particle);
                    self.tableParticles.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }
        }
        public addParticle(particle) {
            this.tableParticles.push(particle);
        }
        public clearAllParticles() {
            let i = 0;
            while (i < this.tableParticles.length) {
                CC_SAFE_DELETE(this.tableParticles[i]);
                this.tableParticles.splice(i, 1);
            }
        }
        public addDeadParticle(x, y) {
            // local particle  = cc.ParticleSystemQuad:create(UIConfig_CommonBattle.deadParticleSprite)
            // particle:setPositionType(cc.POSITION_TYPE_GROUPED)
            // particle:setPosition(x, y)
            // self.nodeParticle:addChild(particle)	     
            // table.insert(self.tableDeadParticles, particle)
        }
        public procDeadParticles(tick) {
            let i = 0;
            while (i < this.tableDeadParticles.length) {
                let particle = this.tableDeadParticles[i];
                if (particle.isActive() == false && particle.getParticleCount() == 0) {
                    particle.visible = false;
                    this.tableDeadParticles.splice(i, 1);
                    this.creatDelayClean(particle, this.nodeParticle);
                } else {
                    i = i + 1;
                }
            }
        }
        public addBloodEffect(effect) {
            this.tableBloodEffects.push(effect);
        }
        public procBloodEffect(tick) {
            let i = 0;
            while (i < this.tableBloodEffects.length) {
                let bFinish = this.tableBloodEffects[i].getIsFinish();
                if (bFinish == true) {
                    CC_SAFE_DELETE(this.tableBloodEffects[i]);
                    this.tableBloodEffects.splice(i, 1);
                } else {
                    this.tableBloodEffects[i].update(tick);
                    i = i + 1;
                }
            }
        }
        public procCalls(t, tick) {
            //let i = 0;
            //let index = 0;
            for (let k in t) {
                let v = t[k];
                //特殊处理
                if (v.bCanRemove == true) {
                    SkillCdMgr.Instance.cleanRoleCd(v);
                    CC_SAFE_DELETE(v);
                    t[k] = null;
                    delete t[k];
                    continue;
                }
                if (v.bAlreadyDead == true) {
                    v.setCanRemove();
                }
                v.update(tick);
                //i=i+1;
                //index=index+1;5r` `   `   5tfrg6byh7un.';/rrew    AI_CD_TIME
            }
        }
        public randRevive(bEnemy, hpPer) {
            let role = null;
            if (bEnemy == false && this.tableAllyDead.length > 0) {
                let rand = 1//lcgrand();
                let index = rand % this.tableAllyDead.length + 1;
                role = this.tableAllyDead[index - 1];
                role.setRevive(hpPer);
                this.tableAllyDead.splice(index, 0);
                return [true, role];
            } else if (bEnemy == true && this.tableEnemyDead.length > 0) {
                let rand = 1//lcgrand();
                let index = rand % this.tableEnemyDead.length + 1;
                role = this.tableEnemyDead[index];
                this.tableEnemyDead[index].setRevive(hpPer);
                this.tableEnemyDead.splice(index, 1);
                return [true, role];
            }
            return [true, null];
        }
        public isRandRevive(bEnemy) {
            if (bEnemy == false && this.tableAllyDead.length > 0) {
                return true;
            } else if (bEnemy == true && this.tableEnemyDead.length > 0) {
                return true;
            }
            return false;
        }
        public procHelpRole(t, tick) {
            for (let k in t) {
                let v = t[k];
                Gmgr.Instance.aiSpeedList.push(createAiSpeedRoleInfo(v.roleId, v.bEnemy, v.isSupport(), v.getCdSpeed(), null, true, v.eTeamNum));
            }
        }
        public updateIsLowFrame() {
            let self = this;
            let tag = false;
            if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                if (self.checkAllEnemyDead() == true && self.tableEnemysReserveRec[0] == "empty") {
                    tag = true;
                    self.bPvpDead = true;
                }
            } else {
                if (self.bBossDead == true) {
                    tag = true;
                }
            }
            if (self.checkAllFriendDead() == true && self.tableAllysReserveRec[0] == "empty") {
                tag = true;
            }
            this.bLowFrame = tag;
        }
        public updateDie(slowDt) {
            let self = this;
            if (self.bLowFrame == true && self.nDieFrame == 0) {
                self.bDiePlay = true;
                self.nCurFps = ConstantConfig_RoleBattle.SLOWFPS;
                if (self.bBossDead || self.bPvpDead || self.bTeachDead) {
                    self.loadKillerAni();
                    self.startShake(10001);
                }
                self.setCssSpeed(self.nCurFps / ConstantConfig_RoleBattle.DEFAULTFPS);
            }
            if (self.bDiePlay == true) {
                self.nDieFrame = self.nDieFrame + slowDt;
                if (self.nDieFrame >= ConstantConfig_RoleBattle.DIE_MAX_FRAME) {
                    self.nCurFps = ConstantConfig_RoleBattle.DEFAULTFPS;
                    self.bDiePlay = false;
                    self.setCssSpeed(self.nCurFps / ConstantConfig_RoleBattle.DEFAULTFPS);
                }
            }
        }
        public setCssSpeed(speed) {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.setActInterval(speed);
            }
        }
        public setAllysDead(tag) {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && v.bDead != true) {
                    v.setHp(0);
                    v.setDead(tag);
                }
            }
        }
        public setEnemysDeadExpBoss() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != null && v.bDead != true && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                    v.setHp(0);
                    v.setDead();
                }
            }
        }
        public cleanHurtVlaue(t, idx) {
            if (Helper.getObjLen(t) <= 0) {
                return;
            }
            let i = 0;
            while (i < Helper.getObjLen(t)) {
                t[i].deleteHurtValue(idx);
                i = i + 1;
            }
        }
        public addRole(role) {
            if (role.bEnemy) {
                this.tableEnemys[role.roleId] = role;
            } else {
                this.tableAllys[role.roleId] = role;
            }
        }
        public addCollision(role) {
            let item = { player: role, force: role.bEnemy };
            this.tableCollision.push(item);
        }
        public getRageTipPos(num, type) {
            if (this.mainmenu == null) {
                return [null, null]
            } else {
                let arrPos = this.mainmenu.GetCdTipPos(num + 1, type);
                let xx = arrPos[0];
                let yy = arrPos[1];
                if (xx != null && yy != null) {
                    xx = xx /// this.uiScale;
                    yy = yy /// this.uiScaleY;
                    yy = yy - 20;
                }
                return [xx - this.fightRoot.x + 60, yy];
            }
        }
        private tween: egret.Tween;
        public playTip(state, num) {
            if (this.mainmenu == null) { return }
            if (this.sp) {
                this.nodeTip.removeChild(this.sp);
            }
            let move_by1 = null;
            let move_by2 = null;

            let fade_in = null;
            let fade_out = null;

            let ac1 = null;
            let ac2 = null;
            let as = null;

            let path = null;
            if (state == TableEnum.TableEnumFightTip.TIP_CD) {
                path = UIConfig.UIConfig_CommonBattle.fightTipCD;
            } else if (state == TableEnum.TableEnumFightTip.TIP_MP) {
                path = UIConfig.UIConfig_CommonBattle.fightTipMp;
            } else {
                //assert(false);
            }
            let arr = this.mainmenu.GetCdTipPos(num + 1, 1);
            let x = arr[0] - this.fightRoot.x;
            let y = arr[1];
            // x = x / this.uiScale;
            // y = y / this.uiScaleY;
            y = y - 50;
            this.sp = new eui.Image(path);
            this.sp.x = x;
            this.sp.y = y;
            this.nodeTip.addChild(this.sp);
            this.sp.alpha = 0;

            egret.Tween.removeTweens(this.sp);
            egret.Tween.get(this.sp)
                .to({ y: y - 25, x: x, alpha: 1 }, 250)
                .to({ y: y - 25 * 2, x: x, alpha: 0 }, 500);
            // .to({alpha: 1}, 250)
            // .to({alpha: 0}, 250);
        }
        public getAllys() {
            return this.tableAllys;
        }
        public getEnemys() {
            return this.tableEnemys;
        }
        public getEffects() {
            return this.tableEffects;
        }
        public getEffectLayer(role) {
            if (role.bCall == true) {
                return this.nodeEffect;
            } else {
                if (role.bEnemy == false) {
                    let pos = 0;
                    // if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    //     pos = 4;
                    // } else {
                    //     pos = role.eTeamNum + 1;
                    // }
                    return this.tableNodeRoleEffects[pos];
                } else if (role.bEnemy == true) {
                    let pos = 0//role.eTeamNum + 1;
                    //let num = this.tableNodeMonsterEffects[pos].numChildren;
                    return this.tableNodeRoleEffects[pos];
                }
            }
        }
        public renderEffectStart(role) {
            // if (role.bEnemy == false) {
            //     let pos = 0;
            //     if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
            //         pos = 5;
            //     } else if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
            //         pos = role.eTeamNum + 1;
            //     }
            //     //this.tableNodeRoleEffects[pos].setLocalZOrder(this.RenderLayerOrder.RenderEffect_Order + this.roleRenderPos[pos]);
            // } else {
            //     let pos = role.eTeamNum + 1;
            //     //this.tableNodeMonsterEffects[pos].setLocalZOrder( this.RenderLayerOrder.RenderEffect_Order + this.monsterRenderPos[pos])
            // }
        }
        public renderEffectEnd(role) {
            // if (role.bEnemy == false) {
            //     let pos = 0;
            //     if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
            //         pos = 5;
            //     } else if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
            //         pos = role.eTeamNum + 1;
            //     }
            //     //this.tableNodeRoleEffects[pos].setLocalZOrder(this.RenderLayerOrder.MidRoleEffect_Order + this.roleRenderPos[pos]);
            // } else {
            //     let pos = role.eTeamNum + 1;
            //     //this.tableNodeMonsterEffects[pos].setLocalZOrder( this.RenderLayerOrder.MidRoleEffect_Order + this.monsterRenderPos[pos])
            // }
        }
        public recoverEffectRender() {
            // for (let i = 0; i < this.tableNodeRoleEffects.length; i++) {
            //     //this.tableNodeRoleEffects[i].setLocalZOrder( this.RenderLayerOrder.MidRoleEffect_Order + this.roleRenderPos[i]);
            // }
            // for (let i = 0; i < this.tableNodeMonsterEffects.length; i++) {
            //     //this.tableNodeMonsterEffects[i].setLocalZOrder( this.RenderLayerOrder.MidRoleEffect_Order + this.roleRenderPos[i]);
            // }
        }
        public getParticleLayer() {
            return this.nodeParticle;
        }
        public getUpEffectLayer() {
            return this.nodeUpEffect;
        }
        public getHitEffectLayer() {
            return this.nodeHitEffect;
        }
        public getBuffEffectLayer() {
            return this.nodeBuffEffect;
        }
        public getMidLayer() {
            return this.midNode;
        }
        public initMonster(bTag) {

        }
        public clearStageInfo() {

        }
        public clearCall() {
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != null && v.bDead == false) {
                    v.setDead();
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != null && v.bDead == false) {
                    v.setDead();
                }
            }
        }
        public nextStage() {
            this.bTimingOn = true
            this.closeSceneEffect();
            this.clearFightInfo();
            this.endStageUi();
            this.clearAllRoleBuffs();
            this.closeRoleUI(this.tableAllys);
            this.hideRoles(this.tableAllySupports);
            //PopAllUI()    
            //cclog("pop all ui, mainmenu is nil")
            this.monsterStage = this.monsterStage + 1;
            this.eStageState = this.eStageState + 1;

            this.groundScale = 1.0;
            this.initCamera();
            this.clearStageInfo();
            this.clearCall();
            this.clearMonsterTalents();
            this.initMonsterTalents();
            this.initMonster(false);
            //self:openSceneScaleIn()     
            this.dirRun();
        }
        public initMonsterTalents() {

        }
        public clearMonsterTalents() {

        }
        public getPartnerCount(camp) {
            if (camp == TableEnum.TableCampType.CAMP_TYPE_MY) {
                return Helper.getObjLen(this.tableAllys);
            } else if (camp == TableEnum.TableCampType.CAMP_TYPE_OTHER) {
                return Helper.getObjLen(this.tableEnemys);
            }
        }
        public getPartnerDebar(camp, role) {
            let t = [];
            if (camp == TableEnum.TableCampType.CAMP_TYPE_MY) {
                for (let k in this.tableAllys) {
                    let v = this.tableAllys[k];
                    if (v != role && v.bCall != true) {
                        t.push(v);
                    }
                }
            } else if (camp == TableEnum.TableCampType.CAMP_TYPE_OTHER) {
                for (let k in this.tableEnemys) {
                    let v = this.tableEnemys[k];
                    if (v != role && v.bCall != true) {
                        t.push(v);
                    }
                }
            }
            return t;
        }
        public getTargetRadio(role, radio) {
            let tResult = [];
            let t = [];
            function search(tRoles) {
                let temp = [];
                for (let k in tRoles) {
                    let v = tRoles[k];
                    if (v != role && (v.x - role.x) < radio && (v.y - role.y) < radio) {
                        temp.push(v);
                    }
                }
                return temp;
            }
            if (role.bEnemy == false) {
                t = search(this.tableAllys);
            } else if (role.bEnemy == true) {
                t = search(this.tableEnemys);
            }
            while (true) {
                if (tResult.length >= 2) {
                    break;
                }
                let rank = 1//lcgrand();
                let rand_value = rank % t.length + 1;
                if (tResult.indexOf(t[rand_value]) == -1) {
                    tResult.push(t[rand_value]);
                }
            }
            if (t.length >= 1) {
                let rand = 1//lcgrand();
                tResult.push(t[rand % t.length + 1]);
            }
            return tResult;
        }
        public getTargetPlayer(role, targetPos, target, isExceptBoss, extraValue) {
            //自己单独处理
            let tbl = [];
            if (target == message.ETargetId.TARGET_SELF) {
                let t = [];
                t.push(role);
                return t;
            }
            let pos = role.getPositionType();
            if ((pos == TableEnum.TablePositionType.POSITION_LEFT && targetPos == message.ETargetPosType.TARGET_POS_MINE) ||
                (pos == TableEnum.TablePositionType.POSITION_RIGHT && targetPos == message.ETargetPosType.TARGET_POS_ENEMY)) {
                return this.funTarget(target, this.tableAllys, role, isExceptBoss, extraValue);
            } else if ((pos == TableEnum.TablePositionType.POSITION_RIGHT && targetPos == message.ETargetPosType.TARGET_POS_MINE) ||
                (pos == TableEnum.TablePositionType.POSITION_LEFT && targetPos == message.ETargetPosType.TARGET_POS_ENEMY)) {
                return this.funTarget(target, this.tableEnemys, role, isExceptBoss, extraValue);
            }
            return tbl;
        }
        public funTarget(target, t, role, isExceptBoss, extraValue) {
            let tbl = [];
            if (target == message.ETargetId.TARGET_ALL) {
                return this.getTargetAll(t);
            }
            else if (target == message.ETargetId.TARGET_RANDOM_ONE) {
                return this.getTargetRand(t);
            }
            else if (target == message.ETargetId.TARGET_HP_MIN) {
                return this.getTargetMinHp(t);
            }
            else if (target == message.ETargetId.TARGET_HP_MAX) {
                return this.getTargetMaxHp(t, isExceptBoss);
            }
            else if (target == message.ETargetId.TARGET_RAGE_MIN) {
                return this.getTargetMinRage(t);
            }
            else if (target == message.ETargetId.TARGET_RAGE_MAX) {
                return this.getTargetMaxRage(t);
            }
            else if (target == message.ETargetId.TARGET_RANDOM_TWO) {
                return this.getTargetRandTwo(t);
            }
            else if (target == message.ETargetId.TARGET_HP_PERCENT_MIN) {
                return this.getTargetMinPercentHp(t);
            }
            else if (target == message.ETargetId.TARGET_HP_PERCENT_MAX) {
                return this.getTargetMaxPercentHp(t);
            }
            else if (target == message.ETargetId.TARGET_POS_1) {
                return this.getTargetByPos(t, TableEnum.TableTeamNum.TEAM_NUM_A);
            }
            else if (target == message.ETargetId.TARGET_POS_2) {
                return this.getTargetByPos(t, TableEnum.TableTeamNum.TEAM_NUM_B);
            }
            else if (target == message.ETargetId.TARGET_POS_3) {
                return this.getTargetByPos(t, TableEnum.TableTeamNum.TEAM_NUM_C);
            }
            else if (target == message.ETargetId.TARGET_POS_4) {
                return this.getTargetByPos(t, TableEnum.TableTeamNum.TEAM_NUM_D);
            }
            else if (target == message.ETargetId.TARGET_DIS_NEAR) {
                return this.getTargetDisNear(t, role);
            }
            else if (target == message.ETargetId.TARGET_DIS_MID) {
                return this.getTargetDisMid(t, role);
            }
            else if (target == message.ETargetId.TARGET_DIS_FAR) {
                return this.getTargetDisFar(t, role);
            }
            else if (target == message.ETargetId.TARGET_FEATURE_ATTACK || target == message.ETargetId.TARGET_FEATURE_DEFENSE || target == message.ETargetId.TARGET_FEATURE_ASSIST) {
                let value = target - 21;
                return this.getTargetFeature(t, value);
            }
            else if (target == message.ETargetId.TARGET_PROPERTY_MAX) {
                return this.getProtoMax(t, role, extraValue);
            }
            else if (target == message.ETargetId.TARGET_PROPERTY_MIN) {
                return this.getProtoMin(t, role, extraValue);
            }
            else if (target == message.ETargetId.TARGET_CD_MAX) {
                return this.getRoleCdMax(t);
            }
            else if (target == message.ETargetId.TARGET_CD_MIN) {
                return this.getRoleCdMin(t);
            }
            else if (target == message.ETargetId.TARGET_DEBUFF_MAX) {
                return this.getRoleDebuffMax(t);
            }
            else if (target == message.ETargetId.TARGET_BUFF_MAX) {
                return this.getRoleBuffMax(t);
            }
            return tbl;
        }
        public getTargetDisNear(tRoles, role) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return a.value - b.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetDisMid(tRoles, role) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len == 3) {
                tResult.push(tRoles[temp[1].key]);
            }
            return tResult;
        }
        public getTargetDisFar(tRoles, role) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getProtoMax(tRoles, role, extraValue) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getProtoValue(extraValue) * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getProtoMin(tRoles, role, extraValue) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getProtoValue(extraValue) * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return a.value - b.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getRoleCdMax(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getProtoValue() * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getRoleCdMin(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getProtoValue() * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return a.value - b.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getRoleDebuffMax(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getBuffNumByUseType(TableEnum.TableBuffUseType.Buff_Use_Bad) * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getRoleBuffMax(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getBuffNumByUseType(TableEnum.TableBuffUseType.Buff_Use_Good) * 10000 + getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort((a, b) => {
                return b.value - a.value;
            });
            let len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetFeature(tRoles, feature) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true && v.roleFeature == feature) {
                    tResult.push(tRoles[k]);
                }
            }
            return tResult;
        }
        public getTargetByPosKey(tRoles, pos) {
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    if (v.eTeamNum == pos) {
                        return k;
                    }
                }
            }
            return null;
        }
        public getTargetByPos(tRoles, pos) {
            let tResult = [];
            let temp = [];
            let _t = [];
            if (pos == TableEnum.TableTeamNum.TEAM_NUM_A) {
                _t = [0, 1, 2, 3];
            } else if (pos == TableEnum.TableTeamNum.TEAM_NUM_B) {
                _t = [1, 2, 3, 0];
            } else if (pos == TableEnum.TableTeamNum.TEAM_NUM_C) {
                _t = [2, 3, 1, 0];
            } else if (pos == TableEnum.TableTeamNum.TEAM_NUM_D) {
                _t = [3, 2, 1, 0];
            }
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true && v.bCall == false) {
                    temp[v.eTeamNum] = v;
                }
            }
            for (let i = 0; i < _t.length; i++) {
                let poskey = _t[i];
                if (temp[poskey] != null) {
                    tResult.push(temp[poskey]);
                    break;
                }
            }
            return tResult;
        }
        public getTargetMinHp(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            let len = temp.length;
            if (len >= 1) {
                temp.sort((a, b) => {
                    return a.hp - b.hp;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public sortTableByHp(tRoles, bMin) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            if (bMin == true) {
                temp.sort((a, b) => {
                    return a.hp - b.hp;
                });
            } else {
                temp.sort((a, b) => {
                    return b.hp - a.hp;
                });
            }
            for (let i = 0; i < temp.length; i++) {
                tResult.push(tRoles[temp[i].key]);
            }
            return tResult;
        }
        public getTargetMaxHp(tRoles, isExceptBoss) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    if (isExceptBoss == true && v.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        continue;
                    }
                    let info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort((a, b) => {
                    return b.hp - a.hp;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetMinPercentHp(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getHp() / v.getMaxHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort((a, b) => {
                    return a.value - b.value;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetMaxPercentHp(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, value: v.getHp() / v.getMaxHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort((a, b) => {
                    return b.value - a.value;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetMinRage(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, rage: v.getRage() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort((a, b) => {
                    return a.rage - b.rage;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetMaxRage(tRoles) {
            let tResult = [];
            let temp = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    let info = { key: k, rage: v.getRage() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort((a, b) => {
                    return b.rage - a.rage;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        }
        public getTargetAll(tRoles) {
            let tResult = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    tResult.push(v);
                }
            }
            return tResult;
        }
        public getTargetRand(tRoles) {
            let tResult = [];
            let t = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    t.push(v);
                }
            }
            if (t.length >= 1) {
                let rand = 1//lcgrand();
                tResult.push(t[rand % t.length + 1]);
            }
            return tResult;
        }
        public getTargetRandTwo(tRoles) {
            let tResult = [];
            let t = [];
            for (let k in tRoles) {
                let v = tRoles[k];
                if (v.bDead != true) {
                    t.push(v);
                }
            }
            if (t.length <= 2) {
                tResult = t.concat();//JSON.parse(JSON.stringify(t));
            } else {
                while (true) {
                    if (tResult.length >= 2) {
                        break;
                    }
                    let rand = 1//lcgrand();
                    let rand_value = rand % t.length + 1;
                    if (tResult.indexOf(t[rand_value]) == -1) {
                        tResult.push(t[rand_value]);
                    }
                }
            }
            return tResult;
        }
        public goFightTimeUp() {
            if (this.fightTimeUp != null) {
                return;
            }
            this.goTimeUp();
            this.loadFightTimeUp();
        }
        /**时间到了 */
        public loadFightTimeUp() {
            let name = UIConfig.UIConfig_CommonBattleCss.json_timeup;
            [this.fightTimeUp,] = HunterSpineX(1, 1, null, TableClientAniSpxSource.Item(name).name);
            this.fightTimeUp.SetPosition(UIManager.StageWidth / 2, UIManager.StageHeight / 2);
            this.fightTimeUp.ChangeAction(0);
            this.nodeUpEffect.addChild(this.fightTimeUp.spine);
            this.fightTimeUp.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
        }
        private animationTimeEvent() {
            if (this.fightTimeUp) {
                this.fightTimeUp.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
                this.fightTimeUp.clearSpine();
                this.fightTimeUp = null;
            }
            //this.creatDelayClean(this.fightTimeUp, this.nodeUpEffect);
            this.bBalance = true;
            this.endTimeUp();
        }
        public endTimeUp() {

        }
        public judgeFightStart() {
            if (this.eStageState == TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.loadFightStart();
            } else {
                this.endStartCss();
            }
        }
        public loadFightStart() {
            this.loadCommonFightStart();
        }
        private spineState: dragonBones.AnimationState;
        public loadCommonFightStart() {
            let name = UIConfig.UIConfig_CommonBattleCss.json_zhandou_start;
            [this.fightStartCss,] = HunterSpineX(name, 1, null, TableClientAniSpxSource.Item(name).name);
            this.fightStartCss.SetPosition(Device.STANDARD_SCREEN_W / 2, Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(0);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            //开始战斗音效
            Helper.EftByID(20045);
        }
        private comStartFun() {
            if (this.fightStartCss) {
                this.rawDuration_start = 200;
                this.fightStartCss.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.fightStartCss.clearSpine();
                this.fightStartCss = null;
            }
        }
        public loadContendFightStart() {
            let tbl = [310, 311, 312];
            [this.fightStartCss,] = HunterSpineX(1, 1, null, TableClientAniCssSource.Item(TableClientAniUi.Item(tbl[Gmgr.Instance.starcraftIndex - 1]).css_id).name);
            this.fightStartCss.SetPosition(Device.STANDARD_SCREEN_W / 2, Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(TableClientAniUi.Item(tbl[Gmgr.Instance.starcraftIndex - 1]).index);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            Helper.EftByID(20045);
        }
        public loadSingleFightStart() {
            let tbl = [200300, 200301, 200302];
            if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                tbl = [801500, 801501, 801502];
            }
            [this.fightStartCss,] = HunterSpineX(1, 1, null, TableClientAniCssSource.Item(TableClientAniUi.Item(tbl[Gmgr.Instance.starcraftIndex - 1]).css_id).name);
            this.fightStartCss.SetPosition(Device.STANDARD_SCREEN_W / 2, Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(TableClientAniUi.Item(tbl[Gmgr.Instance.starcraftIndex - 1]).index);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            Helper.EftByID(20045);
        }
        public updateStartCssEnd() {
            //这里有问题
            let self = this;
            if (self.rawDuration_start == -1) {
                return;
            }
            self.rawDuration_start = -1
            self.endStartCss();
        }
        public endStartCss() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT;
        }
        public renderRoleStart(role, color) {
            if (role != null) {
                let pos = role.eTeamNum + 1;
                role.beginHightLight();
                // role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = true;
                    this.roleIndexChange(role);
                }
            }
        }
        public renderMonsterStart(role, color) {
            if (role != null) {
                let pos = role.eTeamNum + 1;
                role.beginHightLight();
                // role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[4+pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = true;
                    this.roleIndexChange(role);
                }
            }
        }
        public renderTargetStart(t) {
            for (let k in t) {
                let v = t[k];
                if (v.bEnemy == false) {
                    this.renderRoleStart(v, false);
                } else {
                    this.renderMonsterStart(v, false);
                }
            }
        }
        public renderRoleEnd(role, color) {
            if (role != null) {
                let pos = role.eTeamNum + 1;
                role.beginHightLight();
                //role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = false;
                    this.roleAdd();
                }
            }
        }
        public renderMonsterEnd(role, color) {
            if (role != null) {
                let pos = role.eTeamNum + 1;
                role.beginHightLight();
                //role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[4+pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = false;
                    this.roleAdd();
                }
            }
        }
        public staticBegin(role) {
            if (GlobalBattleConfig.static == false) { return; }
            if (role == null) { return; }
            this.removeFounder();
            this.trussRole(role);
            this.renderRoleStart(role, true);
        }
        public staticEnd(role) {
            if (role != this.pauseFounder) {
                this.renderTargetEnd(role.targetPlayers);
                this.clearTargetPlayer(role);
                this.renderSingleEnd(role, false);
                this.resumeExTargetBlack(role);
            } else {
                this.removeFounder();
            }
        }
        public removeFounder() {
            if (this.pauseFounder != null) {
                this.renderTargetEnd(this.pauseFounder.targetPlayers);
                this.clearTargetPlayer(this.pauseFounder);
                this.renderSingleEnd(this.pauseFounder, true);
                this.resumeExTargetBlack(this.pauseFounder);
                //self:resume()
                this.pauseFounder = null;
            }
        }
        public recoverFBreak(role, tag) {
            if (this.pauseFounder != null) {

            }
            this.renderTargetEnd(role.targetPlayers);
            this.clearTargetPlayer(role);
            let realTag = tag;
            if (role == this.pauseFounder) {
                realTag = true;
            }
            this.renderSingleEnd(role, realTag);
            if (this.pauseFounder != null && role == this.pauseFounder) {
                this.resumeExTargetBlack(this.pauseFounder);
                this.pauseFounder = null;
            }
        }
        public renderTargetEnd(t) {
            for (let k in t) {
                let v = t[k];
                if (v.bEnemy == false) {
                    this.renderRoleEnd(v, false);
                } else {
                    this.renderMonsterEnd(v, false);
                }
            }
        }
        public renderSingleEnd(role, tag) {
            if (!role.bEnemy) {
                this.renderRoleEnd(role, tag);
            } else {
                this.renderMonsterEnd(role, tag);
            }
        }
        public Pause() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.Pause();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.Pause();
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.Pause();
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.Pause();
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                v.Pause();
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                v.Pause();
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.Pause();
            }
            FightNumberEffectMgr.Instance.Pause();
        }
        public resume() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.resume();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.resume();
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.resume();
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.resume();
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                v.resume();
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                v.resume();
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.resume();
            }
            FightNumberEffectMgr.Instance.resume();
        }
        public pauseByBoss() {
            this.bBossPause = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.Pause();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.Pause();
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.Pause();
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.Pause();
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                v.Pause();
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                v.Pause();
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.Pause();
            }
            FightNumberEffectMgr.Instance.Pause();
        }
        public resumeByBoss() {
            this.bBossPause = false;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.resume();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.resume();
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.resume();
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.resume();
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                v.resume();
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                v.resume();
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                v.resume();
            }
            FightNumberEffectMgr.Instance.resume();
        }
        public beginSkiPause(beginRole) {
            this.beginRole = beginRole
            this.bBeginPause = true
            this.nPauseTick = 0;
            this.nMaxPauseTick = yuan3(this.beginRole.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.beginRole.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP, ConstantConfig_RoleBattle.SKI_SUPPORT_PAUSE_TIME, ConstantConfig_RoleBattle.SKI_PAUSE_TIME);
            this.pauseExTarget(beginRole);
        }
        public procSkiPause(tick) {
            let self = this;
            if (!self.bBeginPause) { return; }
            self.nPauseTick = self.nPauseTick + tick * 1000;
            if (self.nPauseTick >= self.nMaxPauseTick) {
                self.bBeginPause = false;
                self.resumeExTarget(self.beginRole);
            }
        }
        public pauseExTarget(target) {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                if (v.belong_role != target) {
                    v.Pause();
                }
            }
            FightNumberEffectMgr.Instance.Pause();
        }
        public pauseExTargetBlack(target) {
            this.bTargetPause = true;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v == null) {
                    delete this.tableEnemys[k];
                }
                if (v != target && v != null) {
                    v.pauseBlack();
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
        }
        public resumeExTarget(target) {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (let k in this.tableEffects) {
                let v = this.tableEffects[k];
                if (v.belong_role != target) {
                    v.resume();
                }
            }
            FightNumberEffectMgr.Instance.resume();
        }
        public resumeExTargetBlack(target) {
            this.bTargetPause = false;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (let k in this.tableAllyCallMobs) {
                let v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (let k in this.tableEnemyCallMobs) {
                let v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
        }
        public pauseAll() {
            Gmgr.Instance.bPause = true;
            this.Pause();
            if (this.mainmenu != null) {
                this.mainmenu.Pause();
            }
        }
        public resumeAll() {
            Gmgr.Instance.bPause = false;
            this.resume();
            if (this.mainmenu != null) {
                this.mainmenu.resume();
            }
        }
        public clearMainMenu() {
            this.mainmenu = null;
        }
        public freshReviveMenu(role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshReviveMenu(role);
            }
        }
        public endStageUi() {
            //这里有问题
            this.hideMainUi();
        }
        public endFightUi() {
            //这里有问题
            this.hideMainUi();
        }
        public trussRole(role) {
            this.pauseFounder = role;
            this.beginSkiPause(role);
            this.pauseExTargetBlack(role);
        }
        public staticBossWeekBegin(role) {
            if (GlobalBattleConfig.static == false) { return; }
            if (role == null) { return; }
            this.removeFounder();
            this.pauseWeekFounder = role;
            this.pauseExTargetBlack(role);
            this.renderMonsterStart(role, true);
        }
        public staticBossWeekEnd(role) {
            this.renderTargetEnd(role.targetPlayers);
            this.clearTargetPlayer(role);
            this.renderSingleEnd(role, true);
            this.resumeExTargetBlack(role);
            this.pauseWeekFounder = null;
        }
        public rolesToHome(t) {
            for (let k in t) {
                let v = t[k];
                v.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
                v.backHoming();
            }
        }
        public clearFightInfo() {
            if (this.killEye != null) {
                this.killEye.visible = false;
            }
            if (this.ani_helpBg != null) {
                this.ani_helpBg.visible = false;
            }
            //人物归位
            this.rolesToHome(this.tableAllys);
            //清理援助
            //self:closeHelping()
            //清理特效
            this.clearAllEffects();
            this.nodeBlackShader.visible = false;
        }
        public hideRoles(tbl) {
            for (let k in tbl) {
                let v = tbl[k];
                v.visible = false;
            }
        }
        //暴击相关
        public createCombo() {
            //这里有问题
            this.comboEffect = new ComboEffect(this.nodeTip);
            // this.nodeTip.addChild(this.comboEffect);
            let x = (Device.STANDARD_SCREEN_W - ConstantConfig_RoleBattle.COMBO_DIS_X - 100);
            let y = (Device.STANDARD_SCREEN_H / 2 - 140);
            function funCall(info) {
                this.comboLv = info.combo_lv;
                if (info.buff_id != -1) {
                    this.bComboBuff = true;
                    this.createComboBuff(this.comboRole, info.buff_id, info.buff_lv);
                }
                //连斩升级出发提示音效
                Helper.EftByID(20047);
            }
            this.comboEffect.setCallBack(funCall, this);
            this.comboEffect.setPosition(x, y)
            this.comboEffect.addToLayer();
        }
        public clearCombo() {
            this.curCombo = 0;
            this.comboLv = 1;
            if (this.comboEffect != null) {
                this.comboEffect.clear();
            }
            if (this.bComboBuff == true) {
                this.bComboBuff = false;
                this.clearBuff(false, TableEnum.TableBufferType.BUFFER_DOUBLE_DEEP);
            }
        }
        public procCombo(tick) {
            let self = this;
            if (self.curCombo <= 0) { return; }
            let _finish = self.comboEffect.update(tick);
            if (_finish == true) {
                self.clearCombo();
            }
        }
        public createComboBuff(role, buffId, level) {
            if (role.bEnemy == false) {
                for (let k in this.tableAllys) {
                    let v = this.tableAllys[k];
                    v.beBuffHurt(level, buffId, role, null);
                }
            } else {
                for (let k in this.tableEnemys) {
                    let v = this.tableEnemys[k];
                    v.beBuffHurt(level, buffId, role, null);
                }
            }
        }
        public clearBuff(bEnemy, sType) {
            if (bEnemy == false) {
                for (let k in this.tableAllys) {
                    let v = this.tableAllys[k];
                    v.removeBuffByType(sType);
                }
            } else {
                for (let k in this.tableEnemys) {
                    let v = this.tableEnemys[k];
                    v.removeBuffByType(sType);
                }
            }
        }
        public clearMyTEfectBelongEnemy() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.clearEffectBelongRole(this.tableEnemys);
            }
        }
        public getUiIndex(general) {
            let index = -1;
            for (let k in this.tablePosKey) {
                let v = this.tablePosKey[k];
                if (v == general.roleId) {
                    index = parseInt(k);
                    break;
                }
            }
            return index;
        }
        public dealSkillUi(general) {
            let index = this.getUiIndex(general);
            if (index != -1 && this.mainmenu != null) {
                this.mainmenu.DealSkillUiEffect(general, index);
            }
        }
        public dealDeathUi(general) {
            let index = this.getUiIndex(general);
            if (index != -1 && this.mainmenu != null) {
                this.mainmenu.DealDeathUiEffect(general, index);
            }
        }
        public freshNewUi(role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshNewUi(role);
            }
        }
        public closeMenuAni() {
            if (this.mainmenu != null) {
                this.mainmenu.CloseAni();
            }
        }
        public handleTeachValue(role) {
            if (teachBattle.teach_value[Game.TeachSystem.curPart] != null) {
                let tbl = teachBattle.teach_value[Game.TeachSystem.curPart][PlayerHunterSystem.GetGeneralId(role.roleId)];
                if (tbl != null) {
                    if (tbl.nq != null) {
                        role.setRage(tbl.nq);
                    }
                }
            }
        }
        // 创建本地援助
        public _createMyLocalSupport(pos, roleId) {
            let generalId = roleId;
            let aiId = -1;
            //let coordinateIndex = pos
            let coordinateIndex = 4;
            let teamIndex = pos - 1;
            let xx = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex];
            let yy = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex]);
            yy = UIManager.StageHeight - yy;
            let floor = yy + Gmgr.Instance.upY;
            let general = new StagePersonLocalHelp(this.getRoleLayer(false, pos), false);
            general.creatLocal(generalId, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, xx, yy, TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState, null);
            general.setVisible(false);
            general.openRageLimit();

            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;
            let item = { player: general, force: false };
            this.tableCollision.push(item);

            let senderId = this.tablePosKey[pos];
            if (senderId != undefined && senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableAllys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableAllys[senderId]);
            }
            return general;
        }
        // public _createMyLocalGel(pos, roleId) {
        //     let generalId = roleId;
        //     let aiId = -1;
        //     let coordinateIndex = pos;
        //     let teamIndex = pos - 1;

        //     let xx = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex];
        //     let yy = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex]);
        //     let floor = yy + Gmgr.Instance.upY;

        //     let general = null;
        //     general = null;//StagePersonLocal.new(this.getRoleLayer(false,pos), false)    
        //     general.creatLocal(generalId, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, xx, yy, TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState);
        //     general.creatEntryCd();

        //     this.tableAllys[generalId] = general
        //     this.tablePosKey[pos] = generalId
        //     let item = { player: general, force: false };
        //     this.tableCollision.push(item);
        //     return general;
        // }
        // public _createOppLocalSupport(pos, roleId) {
        //     let generalId = roleId;
        //     let aiId = -1;
        //     //let coordinateIndex = pos
        //     let coordinateIndex = 5;
        //     let teamIndex = pos - 1;
        //     let x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[coordinateIndex]
        //     let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceX[coordinateIndex])
        //     let floor = y + Gmgr.Instance.upY
        //     let general = null;//StagePersonLocalHelp.new( this.getRoleLayer(true,pos), false)
        //     general.creatLocal(generalId, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, 1.0, this.eStageState);
        //     general.visible = false;
        //     general.openRageLimit();

        //     this.tableEnemySupports[generalId] = general;
        //     this.tableEnemySptKey[pos] = generalId;
        //     let item = { player: general, force: true };
        //     this.tableCollision.push(item);

        //     let senderId = this.tablePosKey[pos];
        //     if (senderId != null && senderId > 0) {
        //         //设置依赖援护武将
        //         this.tableEnemys[senderId].setRelySupportRole(general);
        //         general.setSenderRole(this.tableEnemys[senderId]);
        //     }
        //     return general;
        // }
        public _createOppSupport(pos, generalInfo) {
            let generalId = generalInfo.general_id
            let aiId = -1
            //let coordinateIndex = pos
            let coordinateIndex = 5
            let teamIndex = pos - 1
            let x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[coordinateIndex]
            let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[coordinateIndex])
            let floor = y + Gmgr.Instance.upY
            let general = new StagePersonHelp(this.getRoleLayer(true, pos), false)
            general.creatPerson(generalInfo, aiId, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, 1.0, generalId, this.eStageState)
            general.setVisible(false);
            general.openRageLimit();

            this.tableEnemySupports[generalId] = general;
            this.tableEnemySptKey[pos] = generalId;
            let item = { player: general, force: true };
            this.tableCollision.push(item);

            let senderId = this.tableEnemyKey[pos];
            if (senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableEnemys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableEnemys[senderId]);
            }
            return general;
        }
        // public _createOppLocalGel(pos, roleId, appearTag) {
        //     let generalId = roleId
        //     let aiId = -1
        //     let coordinateIndex = pos
        //     let teamIndex = pos - 1

        //     let x = FightDistanceConfig.Appear_Right_Mid_X + tableRightStanceX[coordinateIndex]
        //     let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[coordinateIndex])
        //     let floor = y + Gmgr.Instance.upY

        //     let general = null;
        //     general = new StagePersonLocal(this.getRoleLayer(true, pos), false)
        //     general.creatLocal(generalId, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, 1.0, this.eStageState)
        //     general.creatEntryCd()
        //     general.setVisible(appearTag)

        //     this.tableEnemys[generalId] = general;
        //     this.tableEnemyKey[pos] = generalId;
        //     let item = { player: general, force: true };
        //     this.tableCollision.push(item);
        //     this.roleAdd();
        //     return general;
        // }
        public getMonsterPosInfo(pos, bTag) {
            let dis = 0;
            if (bTag == true) {
                dis = FightDistanceConfig.Appear_Right_Mid_X;
            } else {
                if (this.monsterStage == TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                    dis = FightDistanceConfig.Appear_Right_Mid_X + FightDistanceConfig.A;
                } else {
                    dis = FightDistanceConfig.Appear_Right_Mid_X + (this.monsterStage - 1) * FightDistanceConfig.B
                }
            }
            let x = dis + tableRightStanceX[pos]
            let y = adaptRoleY(FightDistanceConfig.Appear_Right_Mid_Y + tableRightStanceY[pos])
            let floor = y + Gmgr.Instance.upY
            return [x, y, floor];
        }
        // public _createServerMonster(pos, generalInfo, bTag) {
        //     let monsterId = generalInfo.general_id;
        //     let instance = Game.PlayerMobSystem.Instance(monsterId);
        //     let isBoss = yuan3(instance.role_type == 4, true, false);
        //     let arr = this.getMonsterPosInfo(pos, bTag);
        //     let x = arr[0];
        //     let y = arr[1];
        //     let floor = arr[2];
        //     let monster = null;
        //     let scale = 1.0;
        //     if (isBoss == true) {
        //         this.bBossAppear = true;
        //         monster = null;//StageRoleBoss.new(this.getRoleLayer(true,pos), false, monsterId);
        //         scale = ConstantConfig_RoleBattle.BOSS_BODY_SCALE_RADIO;
        //     } else {
        //         monster = null;//StageRoleMobCommon = new(this.getRoleLayer(true,pos), false, monsterId);
        //     }
        //     monster.creatServerMonster(generalInfo, -1, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, pos - 1, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, scale, this.eStageState);
        //     monster.creatEntryCd();
        //     this.tableEnemys[monsterId] = monster;
        //     this.tableEnemyKey[pos] = monsterId;

        //     let item = { player: monster, force: true };
        //     this.tableCollision.push(item);
        //     return monster;
        // }
        public initBuffs() {

        }
        public initAdviser() {
            Gmgr.Instance.leftAdviserId = this.curFormation.adviserId
            Gmgr.Instance.adviserLeftInfos = Game.PlayerAdviserSystem.adviser;
            Gmgr.Instance.adviserLeftAttriTbl = Adviserlvdb.GetAllAdviserValueTbl(Game.PlayerAdviserSystem.adviser, Game.PlayerInfoSystem.BaseInfo);
            this.initAdviserSkills();
            this.initPokedexSkills();
            this.initPetSkills();
            this.initTitleSkills();
            this.initLeagueSkills();
            this.initSkinSkills();
        }
        public initAdviserSkills() {
            Gmgr.Instance.adviserSkills[TableEnum.TablePositionType.POSITION_LEFT] = Adviserlvdb.GetAdviserSkills(Game.PlayerAdviserSystem.adviser, Game.PlayerInfoSystem.BaseInfo);
        }
        public initPokedexSkills() {
            Gmgr.Instance.pokedexSkill[TableEnum.TablePositionType.POSITION_LEFT] = Talentdb.GetPokedexSkills(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds());
        }
        public initPetSkills() {
            Gmgr.Instance.petSkill[TableEnum.TablePositionType.POSITION_LEFT] = Adviserdb.GetPetFightSkill(Game.PlayerAdviserSystem.petInfo);
        }
        public initTitleSkills() {
            Gmgr.Instance.titleSkill[TableEnum.TablePositionType.POSITION_LEFT] = Otherdb.GetTitleFightSkill(Game.PlayerInfoSystem.BaseInfo.titleId);
        }
        public initLeagueSkills() {
            Gmgr.Instance.leagueSkill[TableEnum.TablePositionType.POSITION_LEFT] = Game.PlayerLeagueSystem.getSkillList();
        }
        public initSkinSkills() {
            Gmgr.Instance.skinSkill[TableEnum.TablePositionType.POSITION_LEFT] = TableItemFashion.Table();
        }
        public initStrategy() {
            //单个属性集合
            let index = Adviserdb.GetIndexById(Gmgr.Instance.leftAdviserId, Gmgr.Instance.adviserLeftInfos);
            if (index == null) {
                return;
            }
            let adviserInfo = Gmgr.Instance.adviserLeftInfos[index];
            if (adviserInfo != null && adviserInfo.strategies.length > 0) {
                Gmgr.Instance.strategyLeftInfo = adviserInfo.strategies[0];
            }
            // Gmgr.Instance.strategyComposeLeftTbl = strategycompodb.Active(index, Gmgr.Instance.adviserLeftInfos);
            // for(let k in Gmgr.Instance.strategyComposeLeftTbl){
            //     let v = Gmgr.Instance.strategyComposeLeftTbl[k];
            //     let instance = strategycompodb.Instance( v );
            //     for(let i = 0; i < instance.skill_id.length; i++){
            //        let skill_pos = yuan3(instance.skill_pos[i][0] == TableEnum.TablePositionType.POSITION_LEFT, TableEnum.TablePositionType.POSITION_LEFT, TableEnum.TablePositionType.POSITION_RIGHT);
            //        let info = {skill_id:instance.skill_id[i],skill_target:instance.skill_pos[i][1],skill_value:instance.skill_pos[i][2]};
            //        Gmgr.Instance.strategySkills[skill_pos].push(info);
            //     }
            // }
        }
        public initOppStrategy() {
            //单个属性集合
            let index = Adviserdb.GetIndexById(Gmgr.Instance.rightAdviserId, Gmgr.Instance.adviserRightInfos);
            if (index == null) {
                return;
            }
            let adviserInfo = Gmgr.Instance.adviserRightInfos[index];
            if (adviserInfo != null && adviserInfo.strategies.length > 0) {
                Gmgr.Instance.strategyRightInfo = adviserInfo.strategies[0];
            }
            // Gmgr.Instance.strategyComposeRightTbl = strategycompodb.Active(index, Gmgr.Instance.adviserRightInfos);
            // for(let k in Gmgr.Instance.strategyComposeRightTbl){
            //     let v = Gmgr.Instance.strategyComposeRightTbl[k];
            //     let instance = strategycompodb.Instance( v );
            //     for(let i = 0; i < instance.skill_id.length; i++){
            //         let skill_pos = yuan3(instance.skill_pos[i][0] == TableEnum.TablePositionType.POSITION_LEFT, TableEnum.TablePositionType.POSITION_RIGHT, TableEnum.TablePositionType.POSITION_LEFT);
            //         let info={skill_id:instance.skill_id[i],skill_target:instance.skill_pos[i][1],skill_value:instance.skill_pos[i][2]};
            //         Gmgr.Instance.strategySkills[skill_pos].push(info);
            //     }
            // }
        }
        public initArtifact() {
            // Gmgr.Instance.artifactLeftTbl = Player.artifacts;
        }
        public abandonFakeGeneral() {
            for (let i = 0; i < this.curFormation.supports.length; i++) {
                let key = this.curFormation.supports[i];
                if (key != 0) {
                    if (Game.PlayerHunterSystem.queryHunter(key) == null) {
                        this.curFormation.supports[i] = 0;
                    }
                }
            }
        }
        public getCurFormationGels() {
            let arr = Game.PlayerFormationSystem.curFormations;
            let type = Gmgr.Instance.fightType;
            let generals = arr[type - 1].generals;
            let reserves = arr[type - 1].reserves;
            let supports = arr[type - 1].supports;
            return [generals, reserves, supports];
        }
        public initSupports() {
            let test = [0, 1, 2, 3];
            let arr = this.getCurFormationGels();
            let generals = arr[0];
            let reserves = arr[1];
            let supports = arr[2];
            for (let i = 0; i < test.length; i++) {
                let id = generals[test[i]];
                if (id != null && id > 0) {
                    let generalId = supports[test[i]];
                    if (generalId != null) {
                        let index = Helper.getGeneralIndexById(generalId);
                        let generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
                        if (generalInfo != null) {
                            let general = this._createMySupport(test[i], generalInfo);
                            this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 3, true, null, null, null, false);
                        } else {
                            if (Device.isReviewSwitch) {
                                continue;
                            }
                            if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                                continue;
                            }
                            let maxMobID = Game.PlayerInstanceSystem.curInstances[Gmgr.Instance.fightType].maxMobID;
                            if (maxMobID >= teachBattle.teach_fake_help.start_fake_stage_id && maxMobID <= teachBattle.teach_fake_help.max_fake_stage_id) {
                                let curMobId = Game.PlayerInstanceSystem.curInstances[Gmgr.Instance.fightType].curMobID;
                                let tbl = teachBattle.teach_fake_help[curMobId];
                                if (tbl != null && tbl[test[i]] != null) {
                                    if (TableClientMonsterLocal.Item(tbl[test[i]]) != null) {
                                        this._createMyLocalSupport(test[i], tbl[test[i]]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // 初始化特殊援护
        private initMyYH() {
            this.tableRoleYH = null;
            if (!this.beInPvp()) {
                let id = FightHelper.FIGHT_ASSISTANCE;
                if (TableClientMonsterLocal.Item(id) != null) {
                    this.tableRoleYH = this._createMyLocalYH(FightHelper.FIGHT_ASSISTANCE_IDX, id);
                }
            }
        }
        // 为特殊援护加怒气
        public addRageYH(role, value) {
            if (this.tableRoleYH && role != this.tableRoleYH) {
                value = Math.max(1, Math.floor(value / 1));
                this.tableRoleYH.addRage(value);
            }
        }

        // 创建特殊援护
        public _createMyLocalYH(pos, roleId) {
            let generalId = roleId;

            let coordinateIndex = 4;
            let teamIndex = pos - 1;
            let xx = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex];
            let yy = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex]);
            yy = UIManager.StageHeight - yy;
            let floor = yy + Gmgr.Instance.upY;

            let general = new StagePersonLocalYH(this.getRoleLayer(false, pos), false);
            general.creatLocal(generalId, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, xx, yy, TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState, null);
            general.setVisible(false);
            // general.openRageLimit();

            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;
            let item = { player: general, force: false };
            this.tableCollision.push(item);
            return general;
        }
        // 特殊援护放技能
        public startHelpYH(general) {
            // this.tableRoleYH
            // dealSupport
            if (!this.isAllDie() && this.isGelSupportValid(general)) {
                this.helpRole = general;
                this.helpRoleAniBegin(this.helpRole);
                this.helpRole.dealCutRage(this.helpRole.getMaxRage())
                this.playSupportSkill(this.helpRole, this.helpRole)
                this.helpRole = null
            }
        }

        public initGeneralTalents() {
            let arr = this.getCurFormationGels();
            let generals = arr[0];
            let reserves = arr[1];
            let supports = arr[2];
            for (let k in generals) {
                let v = generals[k];
                if (v != 0) {
                    let _info = Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        let _arr = Talentdb.createPersonTalent(_info);
                        let _every = _arr[0];
                        let _personal = _arr[1];
                        Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                        Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;
                    }
                }
            }

            for (let k in reserves) {
                let v = reserves[k];
                if (v != 0) {
                    let _info = Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        let _arr = Talentdb.createPersonTalent(_info);
                        let _every = _arr[0];
                        let _personal = _arr[1];
                        Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                        Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;

                    }
                }
            }
            for (let k in supports) {
                let v = supports[k];
                if (v != 0) {
                    let _info = Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        let _arr = Talentdb.createPersonTalent(_info);
                        let _every = _arr[0];
                        let _personal = _arr[1];
                        Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;
                    }
                }
            }
        }
        public initGenerals(reserveTag) {
            this.initGeneralTalents();
            let test = [0, 1, 2, 3];
            let arr = this.getCurFormationGels();
            let generals = arr[0];
            let reserves = arr[1];
            let supports = arr[2];
            //generals = [arr[0][1]];//这里写了个测试数据
            this.setReserveRec(reserves, this.tableAllysReserveRec);
            for (let i = 0; i < test.length; i++) {
                let id = generals[test[i]];
                if (id == null || id <= 0) {
                    if (reserveTag == true) {
                        let generalId = this.getReserveId(reserves, this.tableAllysReserveRec);
                        if (generalId == -1) {
                            continue;
                        } else {
                            let index = Helper.getGeneralIndexById(generalId);
                            let generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
                            let general = this._createMyGel(test[i], generalInfo);
                            this.searchGelnfo(general)
                            this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 2, true, null, null, null, true)
                        }
                    } else {
                        continue;
                    }
                } else {
                    let generalId = generals[test[i]];
                    let index = Helper.getGeneralIndexById(generalId);
                    let generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
                    let general = this._createMyGel(test[i], generalInfo);
                    this.searchGelnfo(general)
                    this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 1, true, null, null, null, false);
                }
            }
            this.roleAdd();
        }
        public fillMyGeneral(pos) {
            return false;
        }
        public synchroMyGelnfo(general) {
            let info = this.tableDeadCacheLeft[general.eTeamNum + 1];
            if (info != null) {
                general.setRage(info.cur_rage);
                general.setCurBeanNum(info.cur_bean);
                general.setPressCdTime(info.cur_skillCd);
                general.resetPressMaxCd();
            }
        }
        public searchGelnfo(general) {

        }
        public searchMonsterInfo(monster) {

        }
        public _createMySupport(pos, generalInfo) {
            let generalId = generalInfo.general_id;
            let aiId = -1;
            let coordinateIndex = 4;
            let teamIndex = pos - 1;
            let x = FightDistanceConfig.Appear_Left_Mid_X + tableLeftStanceX[coordinateIndex];
            let y = adaptRoleY(FightDistanceConfig.Appear_Left_Mid_Y + tableLeftStanceY[coordinateIndex]);
            y = UIManager.StageHeight - y;
            let floor = y + Gmgr.Instance.upY;
            let general = new StagePersonHelp(this.getRoleLayer(false, pos), false);
            general.creatPerson(generalInfo, aiId, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, x, y, TableEnum.TableEnumDir.Dir_Right, false, 1.0, generalId, this.eStageState);
            general.setVisible(false);
            general.openRageLimit();

            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;

            let item = {};
            item["player"] = general;
            item["force"] = false;
            this.tableCollision.push(item);

            let senderId = this.tablePosKey[pos];
            if (senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableAllys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableAllys[senderId]);
            }
            return general;
        }
        public initOppSupports() {
            let test = [0, 1, 2, 3];
            let supports = this.oppDetailInfo.supports;
            for (let i = 0; i < test.length; i++) {
                let info = supports[test[i]];
                if (info != null && info.general_id > 0) {
                    let general = this._createOppSupport(test[i], info);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 3, true, null, null, null, false);
                }
            }
        }
        public initOppPvpTalent() {
            let generals = this.oppDetailInfo.generals;
            let reserves = this.oppDetailInfo.reserves;
            let supports = this.oppDetailInfo.supports;
            for (let k in generals) {
                let v = generals[k];
                if (v.general_id != 0) {
                    let _arr = Talentdb.createPersonTalent(v);
                    let _every = _arr[0];
                    let _personal = _arr[1];
                    Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                    Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }

            for (let k in reserves) {
                let v = reserves[k];
                if (v.general_id != 0) {
                    let _arr = Talentdb.createPersonTalent(v);
                    let _every = _arr[0];
                    let _personal = _arr[1];
                    Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                    Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }

            for (let k in supports) {
                let v = supports[k];
                if (v.general_id != 0) {
                    let _arr = Talentdb.createPersonTalent(v);
                    let _every = _arr[0];
                    let _personal = _arr[1];
                    //Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                    Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }
        }
        public initOppPvp(reserveTag, appearTag, posTag) {
            this.initOppPvpTalent();
            let test = [0, 1, 2, 3];
            let generals = this.oppDetailInfo.generals;
            let reserves = this.oppDetailInfo.reserves;
            Gmgr.Instance.formatRightWholeGels = Helper.writeDetailFormat(this.oppDetailInfo);
            this.setDetailReserveRec(reserves, this.tableEnemysReserveRec);
            for (let i = 0; i < test.length; i++) {
                let info = generals[test[i]];
                if (info == null || info.general_id == 0) {
                    if (reserveTag == true) {
                        let info = this.getReserveInfo(reserves, this.tableEnemysReserveRec, true, null)
                        if (info == null) {
                            continue;
                        } else {
                            let general = this._createOppGel(test[i], info, appearTag, posTag);
                            this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 2, false, Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null);
                        }
                    } else {
                        continue;
                    }
                } else {
                    let general = this._createOppGel(test[i], info, appearTag, posTag);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 1, false, Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null)
                }
            }
        }
        public fillOppGeneral(pos) {
            let reserves = this.oppDetailInfo.reserves;
            let info = this.getReserveInfo(reserves, this.tableEnemysReserveRec, true, null);
            if (info == null) {
                return false
            } else {
                let general = this._createOppGel(pos, info, true, false);
                general.x = Device.STANDARD_SCREEN_W;
                general.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
                this.synchroOppGelnfo(general);
                general.switchReserve();
                this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 2, false, Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null);
                this.pushSqueue(info.general_id, true);
            }
            return true;
        }
        public synchroOppGelnfo(general) {
            let info = this.tableDeadCacheRight[general.eTeamNum + 1];
            if (info != null) {
                general.setRage(info.cur_rage);
                general.setCurBeanNum(info.cur_bean);
                general.setPressCdTime(info.cur_skillCd);
                general.resetPressMaxCd();
            }
        }
        public getGeneralsNum(bEnemy, bOutside) {
            let num = 0;
            if (bEnemy == false) {
                num = Helper.getObjLen(this.tableAllys);
                if (bOutside == true) {
                    num = num + this.getOutsideNum(false);
                }
            } else if (bEnemy == true) {
                num = Helper.getObjLen(this.tableEnemys);
                if (bOutside == true) {
                    num = num + this.getOutsideNum(true);
                }
            }
            return num;
        }
        public getGeneralsSexNum(sex) {
            let left = this._getSexNum(this.tableAllys, sex);
            let right = this._getSexNum(this.tableEnemys, sex);
            return left + right
        }
        private _getSexNum(t, sex) {
            let num = 0;
            for (let k in t) {
                let v = t[k];
                if (v.bCall == false && v.sex == sex) {
                    num = num + 1;
                }
            }
            return num;
        }
        public getOutsideNum(bEnemy) {
            if (bEnemy == false) {
                return this._getNum(this.tableAllysReserveRec);
            } else {
                return this._getNum(this.tableEnemysReserveRec);
            }
        }
        private _getNum(t) {
            let num = 0;
            for (let k in t) {
                let v = t[k];
                if (v == "outside") {
                    num = num + 1;
                }
            }
            return num;
        }
        public setReserveRec(reserves, rec) {
            for (let i = 0; i < reserves.length; i++) {
                let id = reserves[i];
                if (id != null && id > 0) {
                    rec[id] = "outside";
                }
            }
            if (Helper.getObjLen(rec) == 0) {
                rec[0] = "empty";
            }
        }

        public setDetailReserveRec(reserves, rec) {
            for (let i = 0; i < reserves.length; i++) {
                if (reserves[i] != null) {
                    let id = reserves[i];
                    if (id != null && id > 0) {
                        rec[id] = "outside";
                    }
                }
            }
            if (Helper.getObjLen(rec) == 0) {
                rec[0] = "empty";
            }
        }

        public getReserveId(reserves, rec) {
            if (rec[0] == "empty") {
                return -1;
            }
            for (let i = 0; i < reserves.length; i++) {
                let id = reserves[i];
                if (id != null && id > 0) {
                    if (rec[id] == "outside") {
                        rec[id] = "fill"
                        return id;
                    }
                }
            }
            rec[0] = "empty";
            return -1;
        }
        public isAllReserveAppear(reserves) {
            // if(rec[0] == "empty"){
            //     return true;
            // }
            // for(let i=0; i<reserves.length; i++){
            //     let id = reserves[i];
            //     if(id != null && id > 0){
            //          if(rec[id] == "outside"){
            //             return false;
            //         }
            //     }
            // }
            return true;
        }
        public getReserveInfo(reserves, rec, peg, posRec) {
            if (rec[0] == "empty") {
                return null;
            }
            for (let i = 0; i < reserves.length; i++) {
                let info = reserves[i];
                if (info != null && info.general_id > 0 && rec[info.general_id] == "outside") {
                    if (posRec != null) {
                        if (posRec.indexOf(info.general_id) == -1) {
                            return this.fill(info, rec, peg);
                        }
                    } else {
                        return this.fill(info, rec, peg);
                    }
                }
            }
            if (peg == true) {
                rec[0] = "empty";
            }
            return null;
        }
        private fill(info, rec, peg) {
            if (peg == true) {
                rec[info.general_id] = "fill";
            }
            return info;
        }
        public creatEntryCd() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.creatEntryCd();
            }

            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.creatEntryCd();
            }
        }
        public updateBattleTime(tick) {
			console.log("updateBattleTime: " + tick + " - " + Util.randomValue(10000, 20000));
            let self = this;
            if (self.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT || self.bTimingOn == false) {
                return;
            }
            // if (self.isWeekSteping == true) {
            //     return;
            // }
            self.battleTime = self.battleTime - tick * 1000;
            if (self.battleTime <= 0) {
                self.battleTime = 0;
            }
            self.realTime = self.realTime + tick * 1000;
        }
        public getPlayerGelBtlInfo(generalId) {
            for (let i = 0; i < Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals.length; i++) {
                if (generalId == Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals[i].generalInfo.general_id) {
                    return Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals[i];
                }
            }
            return null;
        }
        public getGelBtlInfo(generalId) {
            for (let i = 0; i < this.replayBattleInfo.leftReplayInfo.generals.length; i++) {
                if (generalId == this.replayBattleInfo.leftReplayInfo.generals[i].generalInfo.general_id) {
                    return this.replayBattleInfo.leftReplayInfo.generals[i];
                }
            }
            return null;
        }
        public getTotalDamageValue() {
            let damage = 0;
            for (let i = 0; i < this.replayBattleInfo.leftReplayInfo.generals.length; i++) {
                damage = damage + this.replayBattleInfo.leftReplayInfo.generals[i].totalDamage;
            }
            return damage;
        }
        public takeAllysBattleInfo() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                    this.takeRoleBattleInfo(this.generalBattleInfo, v);
                    this.varyGeneralDamage(this.replayBattleInfo.leftReplayInfo.generals, v, this.eStageState);
                }
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.varyGeneralDamage(this.replayBattleInfo.leftReplayInfo.generals, v, this.eStageState);
                }
            }
        }
        public takeOppBattleInfo() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                if (v && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                    this.takeRoleBattleInfo(this.oppBattleInfo, v);
                    this.varyGeneralDamage(this.replayBattleInfo.rightReplayInfo.generals, v, this.eStageState);
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v && v.roleType != TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.varyGeneralDamage(this.replayBattleInfo.rightReplayInfo.generals, v, this.eStageState);
                }
            }
        }
        public sortBattleInfoByDamage() {
            Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals.sort((a, b) => {
                return (b.totalDamage + b.recoverValue) - (a.totalDamage + a.recoverValue);
            });
            Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.generals.sort((a, b) => {
                return (b.totalDamage + b.recoverValue) - (a.totalDamage + a.recoverValue);
            });
        }
        public statisticEnd() {
            if (Gmgr.Instance.bReplay == false) {
                this.takeAllysBattleInfo();
                this.takeOppBattleInfo();
                this.takeUseBuff();
                this.replayBattleInfo.seed = this.fightSeed;
                this.replayBattleInfo.bgId = this.mapId;
                //this.replayBattleInfo.battleType = Gmgr.Instance.fightType;
                this.replayBattleInfo.helpMaxNum = 0;  // 无用
                this.battleRole();
            }
        }
        public takeUseBuff() {
            for (let k in Gmgr.Instance.myUseBuffs) {
                let v = Gmgr.Instance.myUseBuffs[k];
                if (v) {
                    this.replayBattleInfo.buffTypes.push(parseInt(k));
                }
            }
        }
        public closeAiFight(t) {
            for (let k in t) {
                let v = t[k];
                if (v != null && !v.bCall) {
                    v.setForceAi(true);
                    v.changeState(TableEnum.TableEnumBaseState.State_None);
                    v.procState(0);
                }
            }
        }
        public openAiFight(t) {
            for (let k in t) {
                let v = t[k];
                if (v != null && !v.bCall) {
                    v.setForceAi(false);
                }
            }
        }
        public staticFight() {
            this.bTimingOn = false;
            this.closeQueueBattle();
            this.closeAiFight(this.tableAllys);
            this.closeAiFight(this.tableEnemys);
            this.closeAiFight(this.tableAllySupports);
            this.closeAiFight(this.tableEnemySupports);
        }
        public clearAllRoleBuffs() {
            this.clearAllBuffs(this.tableAllys);
            this.clearAllBuffs(this.tableEnemys);
            this.clearAllBuffs(this.tableAllySupports);
            this.clearAllBuffs(this.tableEnemySupports);
        }
        public clearAllBuffs(t) {
            for (let k in t) {
                let v = t[k];
                if (v != null) {
                    v.clearAllBuffs();
                }
            }
        }
        public closeRoleUI(t) {
            // for (let k in t) {
            //     let v = t[k];
            //     if (v != null) {
            //v.closeRoleDcUI();
            //     }
            // }
        }
        public getBeforeGelCount() {
            let generals = this.curFormation.generals;
            let reserves = this.curFormation.reserves;
            let num = 0;
            for (let i = 0; i < generals.length; i++) {
                if (generals[i] > 0) {
                    num = num + 1;
                }
            }
            for (let i = 0; i < reserves.length; i++) {
                if (reserves[i] > 0) {
                    num = num + 1;
                }
            }
            return num;
        }
        public getFinalGelCount() {
            let num = 0;
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                if (v != null && !v.bCall && !v.bDead) {
                    num = num + 1;
                }
            }
            num = num + this.getOutsideNum(false);
            return num;
        }
        public OnTouchDown() {
            return false
        }
        public OnTouchMove() {
            return false
        }
        public OnTouchUp() {
            return false
        }
        public isAllMonsterAppear() {
            return true
        }
        public isBossAppear() {
            return this.bBossAppear;
        }
        public takeBtlGeneralInfo(t, general, type, b_left, baseInfo, advisers, artifacts, bMob) {
            if (general.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                return;
            }
            let arr = this.isGeneralInTable(t, general.roleId);
            let tag = arr[0];
            let index = arr[1];
            if (tag == false) {
                let battleGeneral = new message.BattleGeneralInfo;
                battleGeneral.stage = general.eAppearStage;
                battleGeneral.type = type;
                if (bMob == true) {
                    battleGeneral.generalInfo = general.getRoleInfo();
                    battleGeneral.pos = yuan3(general.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getRealBtlPos());
                } else {
                    let roleInfo = general.getRoleInfo();
                    let result = PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo);
                    roleInfo.attri = Helper.tblConvertAttri(result);
                    battleGeneral.generalInfo = roleInfo;
                    battleGeneral.pos = yuan3(general.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getTeamNum() + 1);
                }
                battleGeneral.totalDamage = 0;
                t.push(battleGeneral);
            } else {
                let obj = t[parseInt(index + "")];
                obj.stage = general.eAppearStage;
                obj.pos = yuan3(general.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getTeamNum() + 1)//general.getTeamNum() + 1);
            }
        }
        public isGeneralInTable(t, generalId) {
            for (let i = 0; i < t.length; i++) {
                if (t[i].generalInfo.general_id == generalId) {
                    return [true, i];
                }
            }
            return [false, -1];
        }
        public takeRoleActionInfo(role) {
            let stageAction = new message.BattleStageAction;
            stageAction.generalId = role.roleId;
            stageAction.stage = role.eAppearStage;
            stageAction.pos = role.ePosition;
            stageAction.action = role.actions;
            for (let i = 0; i < this.replayBattleInfo.stageActions.length; i++) {
                let action = this.replayBattleInfo.stageActions[i];
                if (action.generalId == role.roleId && action.stage == role.eAppearStage && action.pos == role.ePosition) {
                    this.replayBattleInfo.stageActions[i] = stageAction;
                }
            }
            this.replayBattleInfo.stageActions.push(stageAction);
        }
        public takeAllysActionsInfo() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                this.takeRoleActionInfo(v);
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                this.takeRoleActionInfo(v);
            }
        }
        public takeOppActionsInfo() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                this.takeRoleActionInfo(v);
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                this.takeRoleActionInfo(v);
            }
        }
        public getFreeCallPos(bEnemy) {
            if (bEnemy == false) {
                for (let i = TableEnum.TableCallPos.CALL_POS_MAX - 1; i < TableEnum.TableCallPos.CALL_POS_A; i--) {
                    if (this.isExit(this.tableAllyCallMobs, i) == false) {
                        return i;
                    }
                }
            } else {
                for (let i = TableEnum.TableCallPos.CALL_POS_MAX - 1; i < TableEnum.TableCallPos.CALL_POS_A; i--) {
                    if (this.isExit(this.tableEnemyCallMobs, i) == false) {
                        return i;
                    }
                }
            }
            return -1;
        }
        private isExit(tbl, pos) {
            for (let i = 0; i < tbl.length; i++) {
                if (tbl[i] != null && tbl[i].eTeamNum == pos) {
                    return true;
                }
            }
            return false;
        }
        public getCallMonsterCoord(bEnemy, pos, id) {
            let x = 0;
            let y = 0;
            // let floor_offset = monsterLocaldb.Instance(id).floor_offset;
            // if(bEnemy == false){
            //     x = tableLeftGeneral[1].coordinate.x + tableLeftCallX[pos+1];
            //     y = tableLeftGeneral[1].coordinate.y + floor_offset;
            // }else{
            //     x = tableRightGeneral[1].coordinate.x + tableRightCallY[pos+1];
            //     y = tableRightGeneral[1].coordinate.y + floor_offset;
            // }
            let floor = y + Gmgr.Instance.upY;
            return [x, y, floor];
        }
        public createCallMonster(monsterId, bEnemy, father, add, level) {
            let pos = this.getFreeCallPos(bEnemy);
            //位置已满
            if (pos == -1) {
                return;
            }
            let arr = this.getCallMonsterCoord(bEnemy, pos, monsterId);
            let x = arr[0];
            let y = arr[1];
            y = UIManager.StageHeight - y;
            let floor = y//arr[2];
            let monster = new StageRoleCallMob(this.nodeCalls, false, monsterId);//StageRoleCallMob.new(this.nodeCalls, false, monsterId);
            // monster.setCallParam(father, 0, level);
            //monster.creatMonster(-1, yuan3( bEnemy == false, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TableCampType.CAMP_TYPE_OTHER), 
            // yuan3( bEnemy == false, TableEnum.TablePositionType.POSITION_LEFT, TableEnum.TablePositionType.POSITION_RIGHT), 
            // pos, floor, x, y, yuan3( bEnemy == false, TableEnum.TableEnumDir.Dir_Right, TableEnum.TableEnumDir.Dir_Left), bEnemy, 1.0, this.eStageState);
            monster.creatEntryCd();
            monster.setVisible(true);
            monster.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Appear);
            if (bEnemy == false) {
                this.tableAllyCallMobs.push(monster);
            } else {
                this.tableEnemyCallMobs.push(monster);
            }
        }
        //本地怪物
        public _createLocalMonster(pos, monsterId, isBoss, bTag, bDialog, realPos) {
            let arr = this.getMonsterPosInfo(pos, bTag);
            let x = arr[0];
            let y = arr[1];
            y = UIManager.StageHeight - y;
            let floor = y;//arr[2];
            let monster = null;
            let scale = 1.0;
            if (isBoss == true) {
                this.bBossAppear = true;
                monster = new StageRoleBoss(this.getRoleLayer(true, pos), false, monsterId);//StageRoleBoss.new(this.getRoleLayer(true,pos), false, monsterId);
                this.bossInstance = monster;
                scale = ConstantConfig_RoleBattle.BOSS_BODY_SCALE_RADIO;
            } else {
                monster = new StageRoleMobCommon(this.getRoleLayer(true, pos), false, monsterId);//StageRoleMobCommon.new(this.getRoleLayer(true,pos), false, monsterId);
            }
            monster.creatMonster(-1, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, pos - 1, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, scale, this.eStageState);
            monster.setRealBtlPos(realPos)
            monster.creatEntryCd()
            this.handleTeachValue(monster);
            if (bDialog == false) {
                this.tableEnemys[monsterId] = monster;
                this.tableEnemyKey[pos] = monsterId;
                let item = { player: monster, force: true };
                this.tableCollision.push(item);
                this.roleAdd();
            }
            return monster;
        }
        public _createTeachMonster(pos, monsterId, isBoss, bTag) {
            let arr = this.getMonsterPosInfo(pos, bTag);
            let x = arr[0];
            let y = arr[1];
            let floor = arr[2];
            let monster = null;
            let scale = 1.0;
            if (isBoss == true) {
                this.bBossAppear = true;
                //monster = new (this.getRoleLayer(true, pos), false, monsterId);//StageRoleBossLocal.new(this.getRoleLayer(true,pos), false, monsterId);
                scale = ConstantConfig_RoleBattle.BOSS_BODY_SCALE_RADIO;
            } else {
                //monster = new (this.getRoleLayer(true, pos), false, monsterId);//StageRoleMobLocal.new(this.getRoleLayer(true,pos), false, monsterId);
            }
            monster.creatMonster(-1, TableEnum.TableCampType.CAMP_TYPE_OTHER, TableEnum.TablePositionType.POSITION_RIGHT, pos - 1, floor, x, y, TableEnum.TableEnumDir.Dir_Left, true, scale, this.eStageState);
            monster.creatEntryCd();
            this.tableEnemys[monsterId] = monster
            this.tableEnemyKey[pos] = monsterId;
            let item = { player: monster, force: true };
            this.tableCollision.push(item);
            return monster;
        }
        public checkOpenStory(stage) {
            this.dialogStage = stage;
        }
        public procDialog(args) {
            if (this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_1ST) {
                this.procDialog_1st();
            } else if (this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_2ND) {
                this.procDialog_2nd();
            } else if (this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_3RD) {
                this.procDialog_3rd();
            } else if (this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_4TH) {
                this.procDialog_4th();
            } else if (this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_5TH) {
                this.procDialog_5th();
            }
        }
        public procDialog_1st() {
            this.openRun();
        }
        public procDialog_2nd() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_RULE;
        }
        public procDialog_3rd() {
            this.nextStage();
            if (Gmgr.Instance.bReplay == false) {
                this.battleRTime(this.stageMaxTime);
            }
        }
        public procDialog_4th() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        }
        public createMainUi() {
            this.mainmenu = newUI(Fight_Main);
            //loadUI(Fight_Main).then((dialog: Fight_Main) => {
            //this.mainmenu = dialog;
            this.mainmenu.Init();
            this.addChild(this.mainmenu);
            Game.EventManager.event(GameEvent.SHOW_FIGHT_UI, { typeName: "zj.Fight_Main" });
            //});
        }
        public hideMainUi() {
            if (this.mainmenu != null) {
                this.mainmenu.OnExit();
                if (this.mainmenu.parent) {
                    this.mainmenu.parent.removeChild(this.mainmenu);
                }
                this.mainmenu = null;
            }
        }
        public OnExit() {
            this.hideMainUi();
            this.release();
            FightNumberEffectMgr.Instance.removeFromLayer();
            // egret.clearInterval(this.tttt);
        }
        public procDialog_5th() {
            this.goBalance();
        }
        public isTimeUp() {
            if (this.battleTime <= 0) {
                return true;
            }
            return false;
        }
        public goBalance(arg?) {
            this.bBalance = true;
            this.lockPause();
            this.commonBalance();
        }
        public goTimeUp() {
            this.lockPause();
            this.commonBalance();
        }
        public commonBalance() {
            this.sceneState = TableEnum.TableSceneState.SCENE_STATE_SETTLE
            //this.replayBattleInfo.battleFakeData = getTrackCheatData()
            this.closeMenuAni()
            this.staticFight()
            this.statisticEnd()
            this.clearAllRoleBuffs()
            this.hideRoles(this.tableAllySupports)
        }
        public lockPause() {
            if (this.mainmenu != null) {
                this.mainmenu.LockPauseUi();
            }
        }
        public beInPvp() {
            if (this.battleType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK
                //|| this.battleType == message.EFormationType.FORMATION_TYPE_MINE_SNATCH
                //|| this.battleType == message.EFormationType.FORMATION_TYPE_CONTEND 
                || this.battleType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                || this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                || this.battleType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE
                || this.battleType == message.EFormationType.FORMATION_TYPE_PVP_THIRD
            ) {
                return true;
            }
            return false;
        }
        public initGeneralsPower() {
            let generals = this.curFormation.generals
            let reserves = this.curFormation.reserves
            let supports = this.curFormation.supports
            this.formatPosNum = Helper.getObjLen(generals) + Helper.getObjLen(reserves) + Helper.getObjLen(supports);
            this.commonInsterPower(this.tableGeneralsPower, generals);
        }
        public commonInsterPower(vec, tbl) {
            // for(let i = 0; i<tbl.length; i++){
            //     let general_id = tbl[i];
            //     if(general_id > 0){
            //         let index = getGeneralIndexById( general_id );
            //         let generalInfo = Player.generals[index];
            //         let powerInfo = {
            //             general_id:generalInfo.general_id,sandfPower:equipdb.GetEquipTotal_SandF_Power(generalInfo.equips),
            //             lvAndStarPower:gnrdb.GetLvAndStarPower(generalInfo.general_id, generalInfo.level, generalInfo.star),
            //             partnerPower:gnrdb.GetPartnerPower(generalInfo.general_id, generalInfo.step, generalInfo.partner),
            //             skillPower:gnrdb.GetSkillsPower(generalInfo.skills)
            //         };
            //         vec.push(powerInfo);
            //     }
            // }
        }
        public recordHpPer() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.recordHpPer();
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.recordHpPer();
            }
        }
        public debugPrint() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.debugPrintAttri(true);
            }
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.debugPrintAttri(true);
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.debugPrintAttri(true);
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.debugPrintAttri(true);
            }
        }
        public appearAllysPersonal() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.appearFight();
            }
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                v.appearSupportFight();
            }
        }
        public startAllysPersonal() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.startFight();
            }
        }
        public appearEnemyPersonal() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.appearFight();
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                v.appearSupportFight();
            }
        }
        public startEnemyPersonal() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.startFight();
            }
        }
        public startAllysStrategy() {
            for (let k in this.tableAllys) {
                let v = this.tableAllys[k];
                v.startStrategy();
            }
        }
        public startEnemyStrategy() {
            for (let k in this.tableEnemys) {
                let v = this.tableEnemys[k];
                v.startStrategy();
            }
        }
        public beOppAiCanBreak(bEnemy) {
            let tag = false;
            if (bEnemy == false) {
                if (this.beInPvp() == false) {
                    tag = this.isBossAiTagFun();
                } else {
                    tag = this.isAiTagFun(this.tableEnemys);
                }
            } else {
                tag = this.isAiTagFun(this.tableAllys);
            }
            return tag;
        }
        public isBossAiTagFun() {
            let tag = false;
            if (this.bBossAppear == false) {
                let key = this.tableEnemyKey[TableEnum.TableTeamNum.TEAM_NUM_B + 1];
                if (key != null) {
                    let role = this.tableEnemys[key];
                    if (role != null && role.bCall == false && role.bDead == false && role.curSkill != null) {
                        if (role.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && role.curSkill.getIsBreakTag() == false) {
                            tag = true;
                        }
                    }
                }
            }
            return tag;
        }
        public isAiTagFun(t) {
            let tag = false;
            for (let k in t) {
                let v = t[k];
                if (v != null && v.bCall == false && v.bDead == false && v.curSkill != null) {
                    if (v.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && v.curSkill.getIsBreakTag() == false) {
                        tag = true;
                    }
                }
            }
            return tag;
        }
        public setOppAiSkillTag(bEnemy) {
            let tag = false;
            if (bEnemy == false) {
                this.doAiTagFun(this.tableEnemys);
            } else {
                this.doAiTagFun(this.tableAllys);
            }
        }
        public doAiTagFun(t) {
            let tag = false;
            for (let k in t) {
                let v = t[k];
                if (v != null && v.bCall == false && v.bDead == false && v.curSkill != null) {
                    if (v.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && v.curSkill.getIsBreakTag() == false) {
                        v.curSkill.setIsBreakTag();
                    }
                }
            }
        }
        public beMyAiCanRecover(role, bEnemy) {
            let tag = false;
            if (role != null && role.bCall == false && role.bDead == false) {
                if (bEnemy == false) {
                    tag = this.getSingleHp(this.tableAllys, ConstantConfig_RoleBattle.AI_RECOVER_SINGLE_POINT);
                } else {
                    tag = this.getSingleHp(this.tableEnemys, ConstantConfig_RoleBattle.AI_RECOVER_SINGLE_POINT);
                }
                if (tag == false) {
                    if (bEnemy == false) {
                        if (this.getAverageHp(this.tableAllys) <= ConstantConfig_RoleBattle.AI_RECOVER_ALL_POINT) {
                            tag = true;
                        }
                    } else {
                        if (this.getAverageHp(this.tableEnemys) <= ConstantConfig_RoleBattle.AI_RECOVER_ALL_POINT) {
                            tag = true;
                        }
                    }
                }
            }
            return tag;
        }
        public getAverageHp(t) {
            let sum = 0;
            let num = 0;
            for (let k in t) {
                let v = t[k];
                if (v != null && v.bCall == false && v.bDead == false) {
                    sum = sum + v.getHp() * 100 / v.getMaxHp();
                    num = num + 1;
                }
            }
            if (num == 0) {
                return 100;
            } else {
                return sum / num;
            }
        }
        public getSingleHp(t, hp) {
            for (let k in t) {
                let v = t[k];
                if (v != null && v.bCall == false && v.bDead == false) {
                    if (v.getHp() * 100 / v.getMaxHp() <= hp) {
                        return true;
                    }
                }
            }
            return false;
        }
        public setTargetPlayer(role, id, t) {
            role.still_target_effect = id;
            role.targetPlayers = t;
        }
        public clearTargetPlayer(role) {
            role.still_target_effect = -1;
            role.targetPlayers = {};
        }
        public modifySpeedData(speedIndex) {
            Gmgr.Instance.setBattleSpeed(speedIndex);
            this.setCssSpeed(Gmgr.Instance.battleSpeed);
        }
        public startHelp(general) {
            this.dealSupport(general);
        }
        public startOppHelp(general) {
            this.dealOppSupport(general);
        }
        private isAllDie(): boolean {
            let tableRoles = this.tableAllys;
            for (let k in tableRoles) {
                if (tableRoles[k].getHp() > 0) {
                    return false;
                }
            }
            return true;
        }
        public dealSupport(general) {
            let tag = this.isGelSupportValid(general.relySupportRole);
            if (tag) {
                this.helpRole = general.relySupportRole
                this.senderHelpRole = general
                this.helpRoleAniBegin(this.helpRole);
                //self:oppHelpRoleAniBegin(self.helpRole)
                // 主将相关
                this.senderHelpRole.dealCutRage(this.helpRole.getSupportConsume())
                this.senderHelpRole.triggerTouchSupportTalent()
                this.playSupportSkill(this.helpRole, this.senderHelpRole)
                this.helpRole = null
                this.senderHelpRole = null
            }
        }
        public dealOppSupport(general) {
            let tag = this.isOppGelSupportValid(general.relySupportRole);
            if (tag) {
                this.oppHelpRole = general.relySupportRole
                this.oppSenderHelpRole = general
                this.oppHelpRoleAniBegin(this.oppHelpRole)
                //self:supportSkillBegin(sethislf.oppHelpRole)
                // 主将相关
                this.oppSenderHelpRole.dealCutRage(this.oppHelpRole.getSupportConsume())
                this.oppSenderHelpRole.triggerTouchSupportTalent()

                this.playSupportSkill(this.oppHelpRole, this.oppSenderHelpRole)
                this.oppHelpRole = null
                this.oppSenderHelpRole = null
            }
        }
        public isGelSupportValid(supportGel) {
            let tag = false;
            if (supportGel != null) {
                if (supportGel.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && supportGel.curSkill != null) {
                    tag = false;
                } else {
                    if (this.helpRole != null) {
                        tag = false;
                    } else {
                        tag = true;
                    }
                }
            }
            return tag;
        }
        public isOppGelSupportValid(supportGel) {
            let tag = false;
            if (supportGel != null) {
                if (supportGel.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && supportGel.curSkill != null) {
                    tag = false;
                } else {
                    if (this.oppHelpRole != null) {
                        tag = false;
                    } else {
                        tag = true;
                    }
                }
            }
            return tag;
        }
        public checkSupportSkill(general) {
            let tag = false;
            let pos = general.eTeamNum + 1;
            let role_id = this.tableAllySptKey[pos];
            let helpG = null;
            if (role_id != null && role_id > 0) {
                helpG = this.tableAllySupports[role_id];
                if (helpG != null) {
                    if (helpG.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && helpG.curSkill != null) {
                        tag = false;
                    } else {
                        if (this.oppHelpRole != null) {
                            tag = false;
                        } else {
                            tag = true;
                        }
                    }
                }
            }
            return [tag, helpG];
        }
        public playSupportSkill(helpRole, sender) {
            function callback() {
                helpRole.setNoticeTouchType(message.ESkillType.SKILL_TYPE_DEATH);
            }
            helpRole.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Appear)
            helpRole.setAppearCallback(callback, this);
            helpRole.setVisible(true)
            this.staticBegin(helpRole);
        }
        public helpBgBegin() {
            this.nodeBlackShader.visible = true;
        }
        public helpBgEnd() {
            this.nodeBlackShader.visible = false;
        }
        public isHelpBgDestory() {
            let tag = true;
            for (let k in this.tableAllySupports) {
                let v = this.tableAllySupports[k];
                if (v.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && v.curSkill != null) {
                    tag = false;
                    break;
                }
            }
            for (let k in this.tableEnemySupports) {
                let v = this.tableEnemySupports[k];
                if (v.otherState == TableEnum.TableEnumOtherState.OtherState_Attack && v.curSkill != null) {
                    tag = false;
                    break;
                }
            }
            return tag;
        }
        public loadOppHelpRole() {

            [this.ani_oppHelpRole,] = HunterSpineX(1, 1, null, TableClientAniSpxSource.Item(UIConfig.UIConfig_CommonBattleCss.json_help).name);
            this.ani_oppHelpRole.spine.visible = false;
            this.ani_oppHelpRole.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
            this.nodeUpEffect.addChild(this.ani_oppHelpRole.spine);
        }
        private animationRoleEvent1() {
            // this.nodeUpEffect.removeChild(this.ani_helpRole.spine);
            // this.ani_oppHelpRole.stopAllActions();
            // this.ani_oppHelpRole.clearSpine();
            // this.ani_oppHelpRole = null;
            this.ani_oppHelpRole.stopAllActions();
            this.ani_oppHelpRole.spine.visible = false;
            // this.ani_oppHelpRole.clearSpine();
            // this.ani_oppHelpRole = null;

        }
        public oppHelpRoleAniBegin(role) {
            if (role == null) { return; }
            let item = UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.right;

            this.ani_oppHelpRole.spine.visible = true;
            this.ani_oppHelpRole.stopAllActions();
            this.ani_oppHelpRole.SetPosition(Device.STANDARD_SCREEN_W, Gmgr.Instance.floor)
            this.ani_oppHelpRole.ChangeAction(item.index);

            let body = new eui.Image();
            body.source = cachekey(role.bodyPath, this);
            body.anchorOffsetX = 595 / 2;
            body.anchorOffsetY = 167 / 2;
            let slot = this.ani_oppHelpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role);
            slot.setDisplay(body);
            let body2 = new eui.Image(role.bodyPath);
            body2.anchorOffsetX = 595 / 2;
            body2.anchorOffsetY = 167 / 2;
            let slot2 = this.ani_oppHelpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role2);
            slot2.setDisplay(body2);

            let pressSkill = role.getPressSkill();
            if (pressSkill != null) {
                let name = new eui.Image(pressSkill.skill_name_path);
                let slot = this.ani_oppHelpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.word);
                slot.setDisplay(name);

            }
        }
        public loadHelpRole() {

            [this.ani_helpRole,] = HunterSpineX(1, 1, null, TableClientAniSpxSource.Item(UIConfig.UIConfig_CommonBattleCss.json_help).name);
            this.ani_helpRole.spine.visible = false;
            this.ani_helpRole.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
            this.nodeUpEffect.addChild(this.ani_helpRole.spine);
        }
        private animationRoleEvent() {
            // this.nodeUpEffect.removeChild(this.ani_helpRole.spine);
            // this.ani_helpRole.stopAllActions();
            // this.ani_helpRole.clearSpine();
            // this.ani_helpRole = null;
            // this.ani_helpRole.clearSpine();
            // this.ani_helpRole = null;
            this.ani_helpRole.stopAllActions();
            this.ani_helpRole.spine.visible = false;
        }
        public helpRoleAniBegin(role) {
            if (role == null) { return }
            let item = UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.left;

            this.ani_helpRole.spine.visible = true;
            this.ani_helpRole.stopAllActions();
            this.ani_helpRole.SetPosition(0, Gmgr.Instance.floor);
            this.ani_helpRole.ChangeAction(item.index);


            let body = new eui.Image();
            body.source = cachekey(role.bodyPath, this);
            body.anchorOffsetX = 595 / 2;
            body.anchorOffsetY = 167 / 2;
            let slot = this.ani_helpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role2);
            slot.setDisplay(body);

            let body2 = new eui.Image(role.bodyPath);
            body2.anchorOffsetX = 595 / 2;
            body2.anchorOffsetY = 167 / 2;
            let slot2 = this.ani_helpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role);
            slot2.setDisplay(body2);

            let pressSkill = role.getPressSkill();
            if (pressSkill != null) {
                let name = new eui.Image(pressSkill.skill_name_path);
                let slot = this.ani_helpRole.spine.armature.getSlot(UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.word);
                slot.setDisplay(name);
            }
        }
        private spx_bg;
        private spx_up;
        public loadKillerAni() {
            [this.spx_bg,] = HunterSpineX(1, 1, null, "zd_jisha");
            this.spx_bg.SetPosition(Device.STANDARD_SCREEN_W / 2, Device.STANDARD_SCREEN_H / 2);
            this.spx_bg.ChangeAction(0);
            this.nodeDownEffect.addChild(this.spx_bg.spine);
            this.spx_bg.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFunSpx_bg, this);

            [this.spx_up,] = HunterSpineX(1, 1, null, "zd_jisha");
            this.spx_up.SetPosition(Device.STANDARD_SCREEN_W / 2, Device.STANDARD_SCREEN_H / 2);
            this.spx_up.ChangeAction(1);
            this.nodeTip.addChild(this.spx_up.spine);
            this.spx_up.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFunSpx_up, this);
        }
        private comStartFunSpx_bg() {
            if (this.spx_bg) {
                this.spx_bg.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.spx_bg.clearSpine();
                this.spx_bg = null;
            }
        }
        private comStartFunSpx_up() {
            if (this.spx_up) {
                this.spx_up.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.spx_up.clearSpine();
                this.spx_up = null;
            }
        }
        public getGelRow(bEnemy, index, p) {
            function getRow(tbl, teamIndex, pos) {
                let _t = [];
                for (let i = 0; i < 4; i++) {
                    for (let k in tbl) {
                        let v = tbl[k];
                        let num = v.eTeamNum + 1;
                        if (v.bDead == false && num == i) {
                            _t.push(num);
                        }
                    }
                }
                function findk(t, v) {
                    for (let k in t) {
                        let _v = t[k];
                        if (_v == v) {
                            return k;
                        }
                    }
                    return -1;
                }
                let a = findk(_t, teamIndex);
                if (a != -1) {
                    if (_t.length == 4) {
                        if (a == 2 || a == 3) {
                            return 2;
                        } else if (a == 4) {
                            return 3;
                        } else if (a == 1) {
                            return 1;
                        }
                    } else if (_t.length == 3) {
                        return a;
                    } else if (_t.length == 2) {
                        if (pos == 2) {
                            return 999;
                        } else {
                            if (a == 1) {
                                return 1;
                            } else if (a == 2) {
                                return 3;
                            }
                        }
                    } else if (_t.length == 1) {
                        if (pos == 2) {
                            return 999;
                        } else {
                            return pos;
                        }
                    }
                }
                return 999;
            }
            if (p == -1) { return -1; }
            if (bEnemy) {
                return getRow(this.tableEnemys, index, p);
            } else {
                return getRow(this.tableAllys, index, p);
            }
        }
        public endHelp() {
            if (this.helpRole == null && this.oppHelpRole == null && this.isHelpBgDestory() == true) {

            }
        }
    }
}