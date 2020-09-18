var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    var StageSceneFight = (function (_super) {
        __extends(StageSceneFight, _super);
        function StageSceneFight() {
            var _this = _super.call(this) || this;
            // private tttt;
            // private count = 0;
            // private timer(){
            //     let newCount = egret.$hashCount;
            //     let diff = newCount - this.count;
            //     this.count = newCount;
            //     console.log("！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"+diff);
            // }
            _this.RenderLayerOrder = {
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
            };
            // data
            _this.tableEnemys = {};
            _this.tableTimelyPos = [];
            _this.tableAllyDead = [];
            _this.tableEnemyDead = [];
            _this.tableCollision = [];
            _this.battleSqueue = [];
            _this.tableEffects = [];
            _this.tableAllys = {};
            _this.tablePosKey = {};
            _this.tableNodeRoles = [];
            _this.tableEnemyKey = [];
            _this.tableParticles = [];
            _this.tableDeadParticles = [];
            _this.tableBloodEffects = [];
            _this.tableAllyCallMobs = [];
            _this.tableEnemyCallMobs = [];
            _this.tableAllySupports = {};
            _this.tableEnemySupports = {};
            _this.tableAllySptKey = {};
            _this.tableEnemySptKey = {};
            _this.tableAllysReserveRec = [];
            _this.tableEnemysReserveRec = [];
            _this.tableDeadCacheLeft = {};
            _this.tableDeadCacheRight = {};
            _this.tableMonsterPosRecord = {};
            _this.delayTick = 0;
            _this.appearTick = 0;
            _this.timeIndex = 1;
            _this.timeOppIndex = 1;
            _this.appearIndex = 0;
            _this.appearOppIndex = 0;
            _this.cameraTouch = false;
            _this.cameraRole = null;
            _this.cameraMoveDis = 0;
            _this.borderDis = 0;
            _this.cameraX = 0;
            _this.cameraY = 0;
            // radialBlur
            _this.radialBlurSprite = null;
            _this.strength = 0;
            _this.strengthTime = 0;
            _this.strengthDir = 1;
            _this.startStrength = false;
            _this.scaleValue = 0;
            _this.scaleTime = 0;
            _this.scaleDir = 0;
            _this.startScale = false;
            _this.scaleBreakConst = 0;
            _this.scaleOutSpeedConst = 0;
            _this.scaleInSpeedConst = 0;
            _this.scaleOutFun = null;
            _this.scaleInFun = null;
            _this.bShake = false;
            _this.shakeId = 0;
            _this.shakeMaxFrame = 0;
            _this.shakeFrame = 0;
            _this.shakeOrignX = 0;
            _this.shakeOrignY = 0;
            _this.shakeBgX = 0;
            _this.shakeBgY = 0;
            _this.comboLv = 0;
            _this.nDieFrame = 0;
            _this.bDiePlay = false;
            // Pause
            _this.bButtonPause = false;
            _this.isAllPause = false;
            _this.bTargetPause = false;
            _this.pauseFounder = null;
            _this.bBossPause = false;
            _this.pauseBoss = null;
            _this.bossPauseTick = 0;
            _this.f_helpBgIndex = -1;
            _this.f_helpBgAction = -1;
            _this.b_helpRoleing = false;
            _this.ani_helpBg = null;
            _this.ani_helpRole = null;
            _this.ani_oppHelpRole = null;
            _this.helpRole = null;
            _this.senderHelpRole = null;
            _this.oppHelpRole = null;
            _this.oppSenderHelpRole = null;
            // goddess
            _this.bGoddessDir = false;
            _this.goddessStandardX = 0;
            _this.goddessMagicX = 0;
            _this.bGoddessFun = false;
            _this.goddessTimer = 0;
            // start
            _this.fightStartSpine = null;
            _this.fightStartCss = null;
            _this.rawDuration_start = -1;
            // timeup
            _this.fightTimeUp = null;
            // table clean
            _this.tableClean = [];
            // talent
            _this.tableLTalent = {};
            _this.tableRTalent = {};
            _this.tableTalentAni = {};
            // battle squeue
            _this.bOpenQueueBattle = false;
            _this.maxAtkInterval = 0;
            _this.interval_tick = 0;
            _this.extra_tick = 0;
            _this.bAtkWait = false;
            // battle time   
            _this.stageMaxTime = zj.ConstantConfig_RoleBattle.PVP_CD_TIME * zj.yuan3(zj.Gmgr.Instance.debugLocalFight, 100, 1);
            _this.battleTime = _this.stageMaxTime;
            _this.realTime = 1;
            _this.bTimingOn = true;
            // data statistics   
            _this.nFinalCnt = 0;
            _this.bBalance = false;
            _this.generalBattleInfo = [];
            _this.oppBattleInfo = [];
            _this.getItemInfo = {};
            // verticalDis
            _this.verticalDis = 0;
            // replay
            _this.replayLeftGelRec = {};
            _this.replayRightGelRec = {};
            _this.eventReplayIndex = 1;
            _this.speedReplayIndex = 1;
            _this.comboReplayIndex = 1;
            _this.timerTick = 0;
            _this.timerPluginTick = 0;
            // power
            _this.formatPosNum = 0;
            _this.tableGeneralsPower = {};
            //- ai
            _this.leftAiCd = 0; //ConstantConfig_RoleBattle.AI_CD_TIME
            _this.rightAiCd = 0;
            _this.eStageState = zj.TableEnum.TableStageState.STAGE_STATE_1ST;
            // combo
            _this.comboEffect = null;
            _this.curCombo = 0;
            _this.comboRole = null;
            _this.maxCombo = 0;
            // low fps
            _this.bBossRemove = false;
            _this.bBossDead = false;
            _this.bTeachDead = false;
            _this.teachBattleId = -1;
            // formular
            _this.formulaTbl = {};
            // relate week to test
            _this.timerEveryChap = 0;
            _this.currChapStep = 1;
            _this.maxChapStep = 5;
            _this.isWeekSteping = false;
            _this.chapResultTbl = {};
            _this.groundScale = 1.0;
            _this.mapId = 0;
            // ui
            _this.mainmenu = null;
            _this.cheatCheckTime = 0;
            //教学需要
            _this.instanceId = 0;
            _this.killEye = null;
            // private s: egret.Shape = new egret.Shape();
            _this.role_point = new egret.Point();
            _this.circle_point = new egret.Point();
            _this.frameRate = 0;
            _this.roleRenderPos = [1, 2, 3, 4, 5];
            _this.monsterRenderPos = [1, 2, 3, 4, 5];
            _this.callRenderPos = [1, 2, 3, 4, 5];
            _this.hunterRoleRenderPos = [4, 8, 2, 6, 3, 7, 1, 5];
            _this.tableNodeMonsterEffects = [];
            _this.tableNodeRoleEffects = [];
            //重置场景角色层级
            _this.roleIndexArr = [0, 2, 1, 3, 0, 2, 1, 3];
            _this.tick = 0;
            // //战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)
            // if(FightLoading.getInstance().fightType == 16 || FightLoading.getInstance().fightType == 22 || FightLoading.getInstance().fightType == 23){
            //     this.replayBattleInfo = new message.MultiResultInfo;
            // }else{
            //     this.replayBattleInfo = new message.ReplayBattleInfo;
            // }
            _this.replayBattleInfo = new message.ReplayBattleInfo;
            zj.Gmgr.Instance.bInSceneFight = true;
            //教学
            zj.Game.TeachSystem.curPart = -1;
            zj.Teach.bFirstTeachUpdata = true;
            // this.count = egret.$hashCount;
            // this.tttt = egret.setInterval(this.timer,this,1000);
            zj.Game.EventManager.on(zj.GameEvent.NETWORK_DISCONNECTION, _this.netWork, _this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.netConnected, _this);
            return _this;
        }
        StageSceneFight.prototype.netConnected = function () {
            //成功
            this.resumeAll();
        };
        StageSceneFight.prototype.netWork = function () {
            //断线
            this.pauseAll();
        };
        Object.defineProperty(StageSceneFight.prototype, "sceneState", {
            get: function () {
                return this._sceneState;
            },
            set: function (value) {
                this._sceneState = value;
            },
            enumerable: true,
            configurable: true
        });
        StageSceneFight.prototype.procRole = function (t, tick) {
            // body
            var self = this;
            var i = 1;
            var index = 1;
            for (var k in t) {
                var v = t[k];
                // 特殊处理
                if (v.bCanRemove == true) {
                    //self.delSqueue(v.roleId, v.bEnemy)
                    if (v.bEnemy == false) {
                        self.tableTimelyPos[v.eTeamNum + 1] = v.roleId;
                        self.tableAllyDead.push(v);
                    }
                    else {
                        self.tableEnemyDead.push(v);
                    }
                    //鼠崽闹春问题
                    if (v.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        self.bBossRemove = true;
                    }
                    // todo                    
                    zj.SkillCdMgr.Instance.cleanRoleCd(v);
                    self.cleanCollision(v);
                    v.setVisible(false);
                    zj.CC_SAFE_DELETE(v);
                    t[k] = null;
                    delete t[k];
                    continue;
                }
                if (v.bDead == true) {
                    self.delSqueue(v.roleId, v.bEnemy);
                    if (v.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        self.bBossDead = true;
                        self.bTimingOn = false;
                        // 小怪消失
                        self.setEnemysDead(v);
                    }
                    if (zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH && v.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                        if (v.bLocalBoss) {
                            self.bTeachDead = true;
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
                    v.setDisappear();
                    v.setCanRemove();
                    //self.addDeadParticle(v.x, v.y)
                    self.freshDeadUi(v);
                    if (v.bEnemy == false) {
                        if (zj.Gmgr.Instance.bReplay == false && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                            self.takeRoleBattleInfo(self.generalBattleInfo, v);
                            self.varyGeneralDamage(self.replayBattleInfo.leftReplayInfo.generals, v, self.eStageState);
                            //self.takeRoleActionInfo(v)
                        }
                    }
                    else {
                        if (zj.Gmgr.Instance.bReplay == false && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                            self.takeRoleBattleInfo(self.oppBattleInfo, v);
                            self.varyGeneralDamage(self.replayBattleInfo.rightReplayInfo.generals, v, self.eStageState);
                            //self.takeRoleActionInfo(v)
                        }
                    }
                    if (self.battleTime > 0 && self.doFightFilling(v) == true) {
                        self.doFillUi(v);
                    }
                }
                zj.Gmgr.Instance.aiSpeedList.push(zj.createAiSpeedRoleInfo(v.roleId, v.bEnemy, v.isSupport(), v.getCdSpeed(), v.pressCd, false, v.eTeamNum));
                i = i + 1;
                index = index + 1;
            }
        };
        StageSceneFight.prototype.cleanCollision = function (role) {
            // body
            var i = 0;
            while (i < this.tableCollision.length) {
                if (role == this.tableCollision[i].player) {
                    this.tableCollision.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.delSqueue = function (roleId, bEnemy) {
            var i = zj.adjustIndex(1);
            while (i < this.battleSqueue.length) {
                if (this.battleSqueue[i].id == roleId && this.battleSqueue[i].bEnemy == bEnemy) {
                    this.battleSqueue.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.setEnemysDead = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && v.bDead != true) {
                    v.setHp(0);
                    v.setDead();
                    v.dealHurtHpZero(null, 0, null);
                }
            }
        };
        StageSceneFight.prototype.freshDeadUi = function (role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshDeadUi(role);
            }
        };
        //////////////////////////////////////////////////-
        //////////////////-replay//////////////////////////
        StageSceneFight.prototype.takeRoleBattleInfo = function (tbl, role) {
            // body
            if (role.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                return;
            }
            if (tbl != null) {
                var _a = this.isBattleInfoInTable(tbl, role.roleId), tag = _a[0], index = _a[1];
                if (tag == false) {
                    var msg = new message.ArmyUnitCur;
                    msg.monster_id = role.roleId;
                    msg.is_dead = role.bDead;
                    msg.cur_pos = role.eTeamNum + 1;
                    msg.cur_hp = zj.yuan3(role.bEnemy, role.attribs.maxHp * role.getHp() / role.getMaxHp(), role.getHp());
                    msg.cur_rage = role.getRage();
                    msg.cur_bean = role.getCurBeanNum();
                    msg.cur_skillCd = role.getPressCdTime();
                    tbl.push(msg);
                }
                else {
                    tbl[index].is_dead = role.bDead;
                    tbl[index].cur_pos = role.eTeamNum + 1;
                    tbl[index].cur_hp = zj.yuan3(role.bEnemy, role.attribs.maxHp * role.getHp() / role.getMaxHp(), role.getHp());
                    tbl[index].cur_rage = role.getRage();
                    tbl[index].cur_bean = role.getCurBeanNum();
                    tbl[index].cur_skillCd = role.getPressCdTime();
                }
            }
        };
        StageSceneFight.prototype.isBattleInfoInTable = function (t, monster_id) {
            for (var i = zj.adjustIndex(1); i < t.length; i++) {
                if (t[i].monster_id == monster_id) {
                    return [true, i];
                }
            }
            return [false, -1];
        };
        StageSceneFight.prototype.doFightFilling = function (role) {
            // body
            return false;
        };
        StageSceneFight.prototype.doFillUi = function (role) {
            if (this.mainmenu != null) {
                this.mainmenu.doFillUi(role);
            }
        };
        StageSceneFight.prototype.varyGeneralDamage = function (t, general, appear) {
            // body
            for (var k in t) {
                var v = t[k];
                if (v.generalInfo.general_id == general.roleId) {
                    v.totalDamage = general.getflowHurtValue();
                    v.recoverValue = general.getflowRecoverValue();
                    v.plugin_state = general.CheatGetPluginState();
                    // 防止破解加入技能验证
                    general.makeSkillsData(v.skills);
                    // 防破解属性值重新赋值
                    if (general.isPerson()) {
                        v.generalInfo.attri = general.creatAttriInfo();
                    }
                    //v.generalInfo.attri = general.creatAttriInfo()
                    return;
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
        };
        StageSceneFight.prototype.procEffectCollision = function (cT) {
            // if (ConstantConfig_RoleBattle.DEFAULTFPS == 60) {
            //     this.frameRate++;
            //     if ((this.frameRate % 2) == 0) {
            //         return;
            //     }
            // }
            //对双层循环进行的优化
            var self = this;
            var k1;
            for (k1 in self.tableEffects) {
                var v1 = self.tableEffects[k1];
                if (v1 == null) {
                    continue;
                }
                if (v1.belong_role.bDead == true) {
                    continue;
                }
                var effect_type = v1.getEffectType();
                if (effect_type == null) {
                    continue;
                }
                //判断动画是否为null
                var effect = v1.getEffectSpx();
                if (effect == null) {
                    continue;
                }
                var t_rect = effect.getRect();
                var k2 = void 0;
                for (k2 in cT) {
                    var v2 = cT[k2];
                    if (v1.belong_role.bEnemy == v2.player.bEnemy) {
                        continue;
                    }
                    if (v2.player.bVisible == false) {
                        continue;
                    }
                    if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                        continue;
                    }
                    var rectRole = v2.player.body.getRect();
                    self.role_point.x = rectRole.x + rectRole.width / 2; //new egret.Point(rectRole.x + rectRole.width / 2, rectRole.y + rectRole.height / 2);
                    self.role_point.y = rectRole.y + rectRole.height / 2;
                    self.circle_point.x = t_rect.x + t_rect.width / 2; //new egret.Point(t_rect.x + t_rect.width / 2, t_rect.y + t_rect.height / 2);
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
                    if (v1.b_decay == true && zj.isPointInCircle(self.role_point, self.circle_point, v1.decay_ratio) == false) {
                        continue;
                    }
                    // let distance = egret.Point.distance(self.role_point, self.circle_point);
                    // if (effect.name == "wj_005_saci_eff") {
                    //     let aaa;
                    // }
                    var distance = Math.abs(self.role_point.x - self.circle_point.x);
                    //中心点距离判定
                    if (v1.collision_distance != -1 && distance > v1.collision_distance) {
                        continue;
                    }
                    if (zj.getSpineIsCollision(v2.player.body, effect) == true) {
                        if (effect_type == zj.EnumEffectType.Effect_Type_Skill_Common) {
                            var _a = v2.player.beEffectHurt(v1, v1.belong_role), bHurt = _a[0], hurtV = _a[1];
                            self.handleCombo(v1.belong_role, hurtV);
                        }
                        else if (effect_type == zj.EnumEffectType.Effect_Type_Missile) {
                            var _b = v2.player.beEffectHurt(v1, v1.belong_role), bHurt = _b[0], hurtV = _b[1];
                            self.handleCombo(v1.belong_role, hurtV);
                        }
                        else if (effect_type == zj.EnumEffectType.Effect_Type_Skill_Target) {
                            var _c = v2.player.beEffectHurt(v1, v1.belong_role, self.circle_point), bHurt = _c[0], hurtV = _c[1];
                            self.handleCombo(v1.belong_role, hurtV);
                        }
                        else if (effect_type == zj.EnumEffectType.Effect_Type_Tallent) {
                            v2.player.beTalentHurt(v1, v1.belong_role);
                        }
                    }
                }
            }
            //动作碰撞
            for (var k1_1 in cT) {
                var v1 = cT[k1_1];
                if (v1.player.curSkill == null) {
                    continue;
                }
                if (v1.player.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    continue;
                }
                var curSkillAction = v1.player.curSkill.getSkillAction();
                if (curSkillAction == null) {
                    continue;
                }
                if (curSkillAction.getCollisionNum() == -1) {
                    continue;
                }
                var v1_rect = v1.player.body.getRect();
                for (var k2 in cT) {
                    var v2 = cT[k2];
                    if (v1.player.bEnemy == v2.player.bEnemy) {
                        continue;
                    }
                    if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die || v2.player.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || v2.player.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                        continue;
                    }
                    var v2_rect = v2.player.body.getRect();
                    var role1_point = egret.Point.create(v1_rect.x + v1_rect.width / 2, v1_rect.y + v1_rect.height / 2);
                    var role2_point = egret.Point.create(v2_rect.x + v2_rect.width / 2, v2_rect.y + v2_rect.height / 2);
                    var distance = egret.Point.distance(role1_point, role2_point);
                    egret.Point.release(role1_point);
                    egret.Point.release(role2_point);
                    var getCollisionDistance = curSkillAction.getCollisionDistance();
                    if (getCollisionDistance != -1 && distance > getCollisionDistance) {
                        continue;
                    }
                    if (getCollisionDistance != -1) {
                        if (distance < getCollisionDistance) {
                            curSkillAction.collisionEvent();
                        }
                    }
                    else {
                        if (zj.getSpineIsCollision(v1.player.body, v2.player.body) == true) {
                            curSkillAction.collisionEvent();
                        }
                    }
                }
            }
            // //跟随特效的碰撞
            for (var k in cT) {
                var v = cT[k];
                for (var k1_2 in v.player.tableEffects) {
                    var v1 = v.player.tableEffects[k1_2];
                    if (v1.belong_role.bDead == true) {
                        continue;
                    }
                    var effect_type = v1.getEffectType();
                    if (effect_type == null) {
                        continue;
                    }
                    if (v1.getEffectSpx() == null) {
                        continue;
                    }
                    for (var k2 in cT) {
                        var v2 = cT[k2];
                        if (v1.belong_role.bEnemy == v2.player.bEnemy) {
                            continue;
                        }
                        if (v2.player.bVisible == false) {
                            continue;
                        }
                        if (v2.player.bDead == true || v2.player.bBomb == true || v2.player.bMomentDead == true || v2.player.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                            continue;
                        }
                        if (zj.getSpineIsCollision(v2.player.body, v1.getEffectSpx()) == true) {
                            if (effect_type == zj.EnumEffectType.Effect_Type_Skill_Target) {
                                var arr = v2.player.beEffectHurt(v1, v1.belong_role);
                                self.handleCombo(v1.belong_role, arr[1]);
                            }
                        }
                    }
                }
            }
        };
        StageSceneFight.prototype.handleCombo = function (role, hurtValue) {
            // body
            if (hurtValue > 0 && role.bEnemy == false) {
                this.addCombo(role);
            }
        };
        StageSceneFight.prototype.addCombo = function (role) {
            // body 
            this.curCombo = this.curCombo + 1;
            this.comboRole = role;
            if (this.maxCombo < this.curCombo) {
                this.maxCombo = this.curCombo;
            }
            this.comboEffect.resetNum(this.curCombo);
            this.comboEffect.setVisible(true);
        };
        /**创建我方武将 */
        StageSceneFight.prototype._createMyGel = function (pos, generalInfo) {
            var generalId = generalInfo.general_id;
            var aiId = -1;
            var coordinateIndex = pos;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[coordinateIndex];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[coordinateIndex]);
            y = zj.UIManager.StageHeight - y;
            var floor = y + zj.Gmgr.Instance.upY;
            var general = null;
            general = new zj.StagePersonGeneral(this.getRoleLayer(false, pos), false);
            general.creatPerson(generalInfo, aiId, zj.TableEnum.TableCampType.CAMP_TYPE_MY, zj.TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Right, false, 1.0, generalId, this.eStageState);
            general.creatEntryCd();
            this.handleTeachValue(general);
            this.tableAllys[generalId] = general;
            this.tablePosKey[pos] = generalId;
            var item = { player: general, force: false };
            this.tableCollision.push(item);
            // console.log("load my general }==" + generalId)   
            this.roleAdd();
            return general;
        };
        StageSceneFight.prototype.getRoleLayer = function (enemy, pos) {
            pos = 0;
            if (enemy) {
                //return this.tableNodeRoles[4 + pos]
                return this.tableNodeRoles[pos];
            }
            else {
                return this.tableNodeRoles[pos];
            }
        };
        ////////////////////////////////////////////////////////////
        /**创建敌方武将 */
        StageSceneFight.prototype._createOppGel = function (pos, generalInfo, appearTag, posTag) {
            // general_id 
            if (!generalInfo)
                return;
            var generalId = generalInfo.general_id;
            var aiId = -1;
            var coordinateIndex = pos;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[coordinateIndex];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Right_Mid_Y + zj.tableRightStanceY[coordinateIndex]);
            y = zj.UIManager.StageHeight - y;
            var floor = y + zj.Gmgr.Instance.upY;
            var general = null;
            general = new zj.StagePersonGeneral(this.getRoleLayer(true, pos), false);
            general.creatPerson(generalInfo, aiId, zj.TableEnum.TableCampType.CAMP_TYPE_OTHER, zj.TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Left, true, 1.0, generalId, this.eStageState);
            general.creatEntryCd();
            general.setVisible(appearTag);
            this.tableEnemys[generalId] = general;
            this.tableEnemyKey[pos] = generalId;
            //console.log("load general start==" + generalId)
            var item = { player: general, force: true };
            this.tableCollision.push(item);
            //console.log("load opp general start==" + generalId)
            this.roleAdd();
            return general;
        };
        StageSceneFight.prototype._creatSceneEventAction = function (time, type) {
            var eventAction = new message.SceneEventAction();
            eventAction.triggerTime = time;
            eventAction.type = type;
            return eventAction;
        };
        StageSceneFight.prototype._creatSpeedRecord = function (time, index) {
            var record = new message.IIKVPairs();
            record.key = time;
            record.value = index;
            return record;
        };
        StageSceneFight.prototype.isFightScene = function () {
            //用于判断是否是战斗场景勿删
            return true;
        };
        StageSceneFight.prototype.OnLoading = function (percent) {
            _super.prototype.OnLoading.call(this, percent);
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
                    zj.Teach.loadTeach(this.instanceId);
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
        };
        StageSceneFight.prototype.initSection_Opp = function () {
        };
        StageSceneFight.prototype.loadExt = function () {
        };
        StageSceneFight.prototype.initSection_Mine = function () {
        };
        StageSceneFight.prototype.loadCurFormation = function () {
            // let date = Game.PlayerFormationSystem.curFormations;
            // let encoder = new aone.BinaryEncoder();
            // date[Gmgr.Instance.fightType-1].to_bytes(encoder);
            // this.curFormation = new message.FormationInfo();
            // let decoder = new aone.BinaryDecoder(new Uint8Array(encoder.buffer));
            // this.curFormation.parse_bytes(decoder);
            var date = zj.Game.PlayerFormationSystem.curFormations;
            this.curFormation = date[zj.Gmgr.Instance.fightType - 1];
        };
        StageSceneFight.prototype.loadRand = function () {
            this.fightSeed = 1;
            this.initRandSeed();
            // lcgsrandom(this.fightSeed);
            zj.Gmgr.Instance.lcgrandcnt = 0;
        };
        StageSceneFight.prototype.initRandSeed = function () {
            this.fightSeed = zj.TsMtirand() % 1000000 + 1;
        };
        StageSceneFight.prototype.initSection_Other = function () {
        };
        StageSceneFight.prototype.loadSpeed = function () {
            zj.Gmgr.Instance.bakeSpeedIndex = zj.Gmgr.Instance.backupSpeedTbl[zj.Gmgr.Instance.fightType];
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK && zj.Gmgr.Instance.debugLocalFight) {
                zj.Gmgr.Instance.bakeSpeedIndex = 1;
            }
            else if (zj.Gmgr.Instance.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                zj.Gmgr.Instance.bakeSpeedIndex = 1;
            }
            zj.Gmgr.Instance.setBattleSpeed(zj.Gmgr.Instance.bakeSpeedIndex);
            this.speedRecord(zj.Gmgr.Instance.bakeSpeedIndex);
        };
        StageSceneFight.prototype.speedRecord = function (index) {
            var record = this._creatSpeedRecord(this.timerTick, index);
            this.replayBattleInfo.battleSpeeds.push(record);
        };
        StageSceneFight.prototype.preRes = function () {
            // fight  
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_zhandou_start)
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_tongyong)  
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_jisha)    
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_xuli) 
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_help)
            // resdb.SpxAddFileInfo(UIConfig_CommonBattleCss.json_skill_dialog)
        };
        StageSceneFight.prototype.preCssRes = function () {
        };
        StageSceneFight.prototype.InitRes = function () {
            zj.Gmgr.Instance.setLayerId(zj.TableEnum.TableEnumLayerId.LAYER_FIGHT);
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
            this.uiScale = zj.UIManager.Stage.width / zj.Device.STANDARD_SCREEN_W;
            this.uiScaleY = zj.UIManager.Stage.height / zj.Device.STANDARD_SCREEN_H;
            var scaleNum = 0;
            if (this.uiScale > this.uiScaleY) {
                scaleNum = this.uiScaleY;
            }
            else {
                scaleNum = this.uiScale;
            }
            this.uiScale = scaleNum;
            this.uiScaleY = scaleNum;
            //this.fightRoot.scaleX=this.uiScale;
            //this.fightRoot.scaleY=this.uiScaleY;
            this.fightRoot.x = (zj.UIManager.StageWidth - zj.Device.STANDARD_SCREEN_W) / 2;
            this.nodeDownEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeDownEffect);
            this.tableNodeRoles = [];
            this.roleBox = new eui.Group();
            this.fightRoot.addChild(this.roleBox);
            this.hpBox = new eui.Group();
            this.fightRoot.addChild(this.hpBox);
            //for (let i = 0; i < this.hunterRoleRenderPos.length; i++) {
            //for (let i = 0; i < 1; i++) {
            var layer = new eui.Group;
            this.roleBox.addChild(layer);
            this.tableNodeRoles.push(layer);
            //}
            this.nodeBlackShader = new eui.Group();
            layer.addChildAt(this.nodeBlackShader, 0);
            this.initBlackShader(); //黑背景
            this.nodeCalls = new eui.Group();
            this.fightRoot.addChild(this.nodeCalls);
            this.tableNodeMonsterEffects = [];
            //for (let i = 0; i < this.monsterRenderPos.length; i++) {
            var layer2 = new eui.Group();
            this.fightRoot.addChild(layer2);
            this.tableNodeMonsterEffects.push(layer2);
            //}
            this.tableNodeRoleEffects = [];
            //for (let i = 0; i < this.roleRenderPos.length; i++) {
            var layer1 = new eui.Group();
            this.fightRoot.addChild(layer1);
            this.tableNodeRoleEffects.push(layer1);
            //}
            this.nodeEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeEffect);
            this.nodeParticle = new eui.Group();
            this.fightRoot.addChild(this.nodeParticle);
            this.nodeUpEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeUpEffect);
            this.nodeHitEffect = new eui.Group();
            this.fightRoot.addChild(this.nodeHitEffect);
            //渲染层设计
            this.nodeNumber = new eui.Group();
            this.fightRoot.addChild(this.nodeNumber);
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
        };
        StageSceneFight.prototype.roleAdd = function () {
            var layerRole = this.tableNodeRoles[0];
            var index = 0;
            for (var i = 0; i < this.roleIndexArr.length; i++) {
                if (i < 4) {
                    var roleId = this.tablePosKey[this.roleIndexArr[i]];
                    var role = this.tableAllys[roleId];
                    if (role) {
                        layerRole.addChildAt(role.body.spine, index);
                        index++;
                    }
                }
                else {
                    var enemyId = this.tableEnemyKey[this.roleIndexArr[i]];
                    var enemy = this.tableEnemys[enemyId];
                    if (enemy) {
                        layerRole.addChildAt(enemy.body.spine, index);
                        index++;
                    }
                }
            }
        };
        StageSceneFight.prototype.roleIndexChange = function (role) {
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
            var layerRole = this.tableNodeRoles[0];
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
        };
        StageSceneFight.prototype.initOnceData = function () {
            this.bHideAuto = false;
            this.bLockAuto = false;
            this.bHideLimit = true;
            this.bLockKey = false;
        };
        StageSceneFight.prototype.initData = function () {
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
            this.eStageState = zj.TableEnum.TableStageState.STAGE_STATE_1ST;
            this.tableMonsterPosRecord = {};
            //battle squeue
            this.battleSqueue = [];
            //dialog
            this.dialogGeneral = null;
            this.dialogStage = zj.TableEnum.TableDialogStage.DIALOG_STAGE_NONE;
            this.bDialogGeneralAppear = false;
            this.bOpenBattleStory = false;
            this.bOpenBossInformation = false;
            this.bossInformationId = 0;
            // key
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_NONE;
            this.delayTick = 0;
            this.appearTick = 0;
            this.timeIndex = 1;
            this.timeOppIndex = 1;
            this.appearIndex = 0;
            this.appearOppIndex = 0;
            this.cameraTouch = false;
            this.cameraRole = null;
            this.cameraMoveDis = 0;
            this.borderDis = 0;
            this.cameraX = 0;
            this.cameraY = 0;
            // radialBlur
            this.radialBlurSprite = null;
            this.strength = 0;
            this.strengthTime = 0;
            this.strengthDir = 1;
            this.startStrength = false;
            // sceneScale
            this.scaleValue = 0;
            this.scaleTime = 0;
            this.scaleDir = 0;
            this.startScale = false;
            this.scaleBreakConst = 0;
            this.scaleOutSpeedConst = 0;
            this.scaleInSpeedConst = 0;
            this.scaleOutFun = null;
            this.scaleInFun = null;
            // shake
            this.bShake = false;
            this.shakeId = 0;
            this.shakeMaxFrame = 0;
            this.shakeFrame = 0;
            this.isShakePlusX = 0;
            this.isShakePlusY = 0;
            this.shakeOrignX = 0;
            this.shakeOrignY = 0;
            this.shakeBgX = 0;
            this.shakeBgY = 0;
            // combo
            this.comboEffect = null;
            this.comboLv = 1;
            this.curCombo = 0;
            this.maxCombo = 0;
            this.comboRole = null;
            this.bComboBuff = false;
            // low fps
            this.bBossDead = false;
            this.bPvpDead = false;
            this.bTeachDead = false;
            this.bBossRemove = false;
            this.bLowFrame = false;
            this.nCurFps = zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.nDieFrame = 0;
            this.bDiePlay = false;
            // Pause
            this.bButtonPause = false;
            this.isAllPause = false;
            this.bTargetPause = false;
            this.pauseFounder = null;
            this.bBossPause = false;
            this.pauseBoss = null;
            this.bossPauseTick = 0;
            this.createCombo();
            // ui
            this.mainmenu = null;
            //self.killEye = nil
            // help
            //self.helpBg = nil
            this.f_helpBgIndex = -1;
            this.f_helpBgAction = -1;
            this.b_helpRoleing = false;
            this.ani_helpBg = null;
            this.ani_helpRole = null;
            this.ani_oppHelpRole = null;
            this.helpRole = null;
            this.senderHelpRole = null;
            this.oppHelpRole = null;
            this.oppSenderHelpRole = null;
            //self.bHelpBgDisappear = false
            //self.helpRole = nil
            //self.helpGelOtherState = EnumHelpState.HELP_STATE_NONE
            //self.oppHelpRole = nil
            //self.oppHelpGelOtherState = EnumHelpState.HELP_STATE_NONE
            // goddess
            this.bGoddessDir = false;
            this.goddessStandardX = 0;
            this.goddessMagicX = 0;
            this.bGoddessFun = false;
            this.goddessTimer = 0;
            // start
            this.fightStartSpine = null;
            this.fightStartCss = null;
            this.rawDuration_start = -1;
            // timeup
            this.fightTimeUp = null;
            // table clean
            this.tableClean = [];
            // talent
            this.tableLTalent = {};
            this.tableRTalent = {};
            this.tableTalentAni = {};
            // battle squeue
            this.bOpenQueueBattle = false;
            this.maxAtkInterval = 0;
            this.interval_tick = 0;
            this.extra_tick = 0;
            this.bAtkWait = false;
            // battle time   
            //this.stageMaxTime = 0
            //this.battleTime = 0
            this.realTime = 1;
            this.bTimingOn = true;
            // data statistics   
            this.nFinalCnt = 0;
            this.bBalance = false;
            this.generalBattleInfo = [];
            this.oppBattleInfo = [];
            this.getItemInfo = { exp: 0, coin: 0, arena: 0, soul: 0, league: 0, items: {}, turnItems: {}, extraItems: {}, firstBloodItems: {}, potatos: {} };
            // verticalDis
            this.verticalDis = 0;
            // replay
            this.replayLeftGelRec = {};
            this.replayRightGelRec = {};
            this.eventReplayIndex = 1;
            this.speedReplayIndex = 1;
            this.comboReplayIndex = 1;
            this.timerTick = 0;
            this.timerPluginTick = 0;
            // power
            this.formatPosNum = 0;
            this.tableGeneralsPower = {};
            //- ai
            this.leftAiCd = 0; //ConstantConfig_RoleBattle.AI_CD_TIME
            this.rightAiCd = 0; //ConstantConfig_RoleBattle.AI_CD_TIME
            // strategy
            //Gmgr.Instance.strategySkills = {[TablePositionType.POSITION_LEFT] = {}, [TablePositionType.POSITION_RIGHT] = {}}
            zj.Gmgr.Instance.everybodyTalent = (_a = {}, _a[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _a[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _a);
            zj.Gmgr.Instance.personalTalent = (_b = {}, _b[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _b[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _b);
            zj.Gmgr.Instance.adviserSkills = (_c = {}, _c[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _c[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _c);
            zj.Gmgr.Instance.leagueSkill = (_d = {}, _d[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _d[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _d);
            zj.Gmgr.Instance.pokedexSkill = (_e = {}, _e[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _e[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _e);
            zj.Gmgr.Instance.petSkill = (_f = {}, _f[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _f[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _f);
            zj.Gmgr.Instance.titleSkill = (_g = {}, _g[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _g[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _g);
            zj.Gmgr.Instance.skinSkill = (_h = {}, _h[zj.TableEnum.TablePositionType.POSITION_LEFT] = [], _h[zj.TableEnum.TablePositionType.POSITION_RIGHT] = [], _h);
            // buffs
            zj.Gmgr.Instance.buffLeftAttriTbl = zj.Helper.CreateGeneralAttrTbl();
            zj.Gmgr.Instance.buffRightAttriTbl = zj.Helper.CreateGeneralAttrTbl();
            // teach
            this.teachBattleId = -1;
            // formular
            this.formulaTbl = {};
            // relate week to test
            this.timerEveryChap = 0;
            this.currChapMaxTime = zj.ConstantConfig_RoleBattle.FIGHT_TEST_STAGE_TIME;
            //self.currChapWeekTime = 0
            this.currChapStep = 1;
            this.maxChapStep = 5;
            this.isWeekSteping = false;
            this.chapResultTbl = {};
            var _a, _b, _c, _d, _e, _f, _g, _h;
        };
        StageSceneFight.prototype.releaseData = function () {
            zj.CC_SAFE_DELETE(this.bossInstance);
            this.bossInstance = null;
            zj.CC_SAFE_DELETE(this.beginRole);
            this.beginRole = null;
            zj.CC_SAFE_DELETE(this.comboEffect);
            this.comboEffect = null;
            for (var k in this.tableAllys) {
                zj.CC_SAFE_DELETE(this.tableAllys[k]);
            }
            this.tableAllys = {};
            for (var k in this.tableEnemys) {
                zj.CC_SAFE_DELETE(this.tableEnemys[k]);
            }
            this.tableEnemys = {};
            for (var k in this.tableAllySupports) {
                zj.CC_SAFE_DELETE(this.tableAllySupports[k]);
            }
            this.tableAllySupports = {};
            for (var k in this.tableEnemySupports) {
                zj.CC_SAFE_DELETE(this.tableEnemySupports[k]);
            }
            this.tableEnemySupports = {};
            for (var i = 0; i < this.tableAllyCallMobs.length; i++) {
                zj.CC_SAFE_DELETE(this.tableAllyCallMobs[i]);
            }
            this.tableAllyCallMobs = [];
            for (var i = 0; i < this.tableEnemyCallMobs.length; i++) {
                zj.CC_SAFE_DELETE(this.tableEnemyCallMobs[i]);
            }
            this.tableEnemyCallMobs = [];
            for (var i = 0; i < this.tableEffects.length; i++) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
            }
            this.tableEffects = [];
            for (var i = 0; i < this.tableParticles.length; i++) {
                zj.CC_SAFE_DELETE(this.tableParticles[i]);
            }
            this.tableParticles = [];
            for (var i = 0; i < this.tableDeadParticles.length; i++) {
                zj.CC_SAFE_DELETE(this.tableDeadParticles[i]);
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
            zj.SkillCdMgr.Instance.clearCd();
            this.cameraRole = null;
            //Gmgr.Instance.clearFightInfo();
        };
        StageSceneFight.prototype.initBlackShader = function () {
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
            var rectImg = new eui.Image("ui_battle_buff_diban_png");
            rectImg.x = -this.fightRoot.x;
            rectImg.width = 2000;
            rectImg.height = 2000;
            rectImg.alpha = 0.7;
            this.nodeBlackShader.addChild(rectImg);
            this.nodeBlackShader.visible = false;
        };
        StageSceneFight.prototype.release = function () {
            _super.prototype.release.call(this);
            this.freeRes();
            this.releaseData();
        };
        StageSceneFight.prototype.freeRes = function () {
            //preRes
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_zhandou_start);
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_tongyong);    
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_jisha);    
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_xuli); 
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_help); 
            // resdb.SpxFreeFileInfo(UIConfig.UIConfig_CommonBattleCss.json_skill_dialog);
        };
        StageSceneFight.prototype.getTiming = function () {
            return this.timerTick;
        };
        StageSceneFight.prototype.battleEvent = function (type) {
            var eventAction = this._creatSceneEventAction(this.timerTick, type);
            this.replayBattleInfo.eventActions.push(eventAction);
        };
        StageSceneFight.prototype.battleRole = function () {
            this.playerToBriefInfo();
            this.oppToBriefInfo();
            this.saveLeftFormat();
            this.saveRightFormat();
            this.saveOther();
        };
        StageSceneFight.prototype.playerToBriefInfo = function () {
            this.replayBattleInfo.leftReplayInfo.roleInfo = zj.Helper.baseToBriefInfo(zj.Game.PlayerInfoSystem.BaseInfo);
        };
        StageSceneFight.prototype.oppToBriefInfo = function () {
        };
        StageSceneFight.prototype.saveLeftFormat = function () {
            this.replayBattleInfo.leftReplayInfo.formation = this.curFormation;
        };
        StageSceneFight.prototype.saveRightFormat = function () {
            this.replayBattleInfo.rightReplayInfo.formation = new message.FormationInfo;
        };
        StageSceneFight.prototype.saveOther = function () {
        };
        StageSceneFight.prototype.saveLeftGeneralInfos = function () {
            var generals = this.curFormation.generals;
            var reserves = this.curFormation.reserves;
            var supports = this.curFormation.supports;
            this._fillGel(generals, 1);
            this._fillGel(reserves, 2);
            this._fillGel(supports, 3);
        };
        StageSceneFight.prototype._fillGel = function (t, type) {
            for (var i = 0; i < t.length; i++) {
                if (t[i] != 0) {
                    var index = zj.Helper.getGeneralIndexById(t[i]);
                    if (index == -1) {
                        continue;
                    }
                    var battleGeneral = new message.BattleGeneralInfo;
                    battleGeneral.type = type;
                    var roleInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
                    var _a = zj.PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo), result = _a[0], _ = _a[1];
                    roleInfo.attri = zj.Helper.tblConvertAttri(result);
                    battleGeneral.generalInfo = roleInfo;
                    this.replayBattleInfo.leftReplayInfo.generals.push(battleGeneral);
                }
            }
        };
        StageSceneFight.prototype.saveRightGeneralInfos = function () {
        };
        StageSceneFight.prototype.saveLeftAdviser = function () {
            //  for k,v in pairs(Player.advisers) {
            //     table.insert(self.replayBattleInfo.leftReplayInfo.advisers, v );
            //  }
        };
        StageSceneFight.prototype.saveRightAdviser = function () {
        };
        StageSceneFight.prototype.saveLeftArtifact = function () {
            // for k,v in pairs(Player.artifacts) {
            //     table.insert(self.replayBattleInfo.leftReplayInfo.artifacts, v )
            // }
        };
        StageSceneFight.prototype.saveRightArtifact = function () {
        };
        StageSceneFight.prototype.battleRTime = function (time) {
            if (this.replayBattleInfo != null) {
                this.replayBattleInfo.stageTimes.push(time / 1000);
            }
        };
        StageSceneFight.prototype.procClean = function () {
            var self = this;
            var i = 0;
            while (i < self.tableClean.length) {
                var info = self.tableClean[i];
                if (info.bClean == true) {
                    info.father.removeChild(info.body);
                    self.tableClean.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.creatDelayClean = function (_body, _father) {
            var info = { body: _body, father: _father, bClean: true };
            this.tableClean.push(info);
        };
        //普通攻击设计
        StageSceneFight.prototype.openQueueBattle = function () {
            this.bOpenQueueBattle = true;
            this.maxAtkInterval = zj.squeueConfig.start_interval;
        };
        StageSceneFight.prototype.closeQueueBattle = function () {
            this.bOpenQueueBattle = false;
        };
        StageSceneFight.prototype.InitBattleSqueue = function () {
            this.battleSqueue = [];
            for (var i_1 = 0; i_1 < 4; i_1++) {
                var info = {};
                var id = this.tablePosKey[i_1];
                if (id == null) {
                    id = -1;
                }
                if (this.tableAllys[id] == null) {
                    id = -1;
                }
                info = { id: id, bEnemy: false };
                this.battleSqueue[i_1 * 2] = info;
            }
            for (var i_2 = 1; i_2 <= 4; i_2++) {
                var info = {};
                var id = this.tableEnemyKey[i_2 - 1];
                if (id == null) {
                    id = -1;
                }
                if (this.tableEnemys[id] == null) {
                    id = -1;
                }
                info = { id: id, bEnemy: true };
                this.battleSqueue[i_2 * 2 - 1] = info;
            }
            var i = 0;
            while (i < this.battleSqueue.length) {
                if (this.battleSqueue[i].id == -1) {
                    this.battleSqueue.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
            this.interval_tick = 0;
            this.extra_tick = 0;
            this.bAtkWait = false;
        };
        StageSceneFight.prototype.endRound = function (roleId, bEnemy) {
            this.delSqueue(roleId, bEnemy);
            this.pushSqueue(roleId, bEnemy);
        };
        StageSceneFight.prototype.pushSqueue = function (roleId, bEnemy) {
            var info = { id: roleId, bEnemy: bEnemy };
            this.battleSqueue.push(info);
        };
        StageSceneFight.prototype.breakRound = function () {
            if (this.battleSqueue.length >= 2) {
                var roleA = this.battleSqueue[0];
                this.battleSqueue.splice(0, 1);
                this.battleSqueue.push(roleA);
            }
        };
        StageSceneFight.prototype.clearSqueueInfo = function () {
            this.interval_tick = 0;
            this.extra_tick = 0;
            this.bAtkWait = false;
        };
        StageSceneFight.prototype.fillSqueueInfo = function () {
            this.interval_tick = this.maxAtkInterval;
            this.extra_tick = 0;
            this.bAtkWait = false;
        };
        StageSceneFight.prototype.setNextAtkInterval = function (curRole) {
            if (curRole != null && curRole.getAutoSkill() != null) {
                this.maxAtkInterval = curRole.getAutoSkill().getSkillDelayTime();
            }
            else {
                this.maxAtkInterval = zj.squeueConfig.atk_interval;
            }
        };
        StageSceneFight.prototype.isCommonAtkLegal = function () {
            for (var k in this.tableAllys) {
                if (this.tableAllys[k].otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false;
                }
            }
            for (var k in this.tableEnemys) {
                if (this.tableEnemys[k].otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false;
                }
            }
            for (var k in this.tableAllySupports) {
                if (this.tableAllySupports[k].otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false;
                }
            }
            for (var k in this.tableEnemySupports) {
                if (this.tableEnemySupports[k].otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                    return false;
                }
            }
        };
        StageSceneFight.prototype.procAiTime = function (tick) {
            var self = this;
            if (zj.Gmgr.Instance.bReplay == true) {
                return;
            }
            if (self.bTargetPause == true) {
                return;
            }
            if (self.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            var dt = tick * 1000;
            self.leftAiCd = self.leftAiCd - dt;
            if (self.leftAiCd <= 0) {
                self.leftAiCd = 0;
            }
            self.rightAiCd = self.rightAiCd - dt;
            if (self.rightAiCd <= 0) {
                self.rightAiCd = 0;
            }
        };
        StageSceneFight.prototype.procBattleSqueue = function (tick) {
            var self = this;
            if (zj.Gmgr.Instance.bReplay == true) {
                return;
            }
            if (self.bTargetPause == true) {
                return;
            }
            if (self.bOpenQueueBattle == false) {
                return;
            }
            if (self.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (self.battleSqueue.length == 0) {
                return;
            }
            var dt = tick * 1000;
            self.interval_tick = self.interval_tick + dt;
            if (self.interval_tick >= self.maxAtkInterval) {
                var info = self.battleSqueue[0];
                var role = null;
                if (info.bEnemy == false) {
                    role = self.tableAllys[info.id];
                }
                else {
                    role = self.tableEnemys[info.id];
                }
                //上线待修改
                if (role == null) {
                    return;
                }
                if (self.bAtkWait == true) {
                    self.extra_tick = self.extra_tick + dt;
                    //多长时间未攻击开启下一次攻击
                    if (self.extra_tick >= zj.squeueConfig.break_interval) {
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
        };
        StageSceneFight.prototype.startFight = function () {
            if (this.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT;
            this.openQueueBattle();
            if (this.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.openFirstStart();
            }
            else {
                this.openSecondStart();
            }
        };
        StageSceneFight.prototype.openFirstStart = function () {
            this.recordHpPer();
            this.appearAllysPersonal();
            this.startAllysPersonal();
            this.appearEnemyPersonal();
            this.startEnemyPersonal();
        };
        StageSceneFight.prototype.openSecondStart = function () {
            this.recordHpPer();
            this.appearEnemyPersonal();
            this.startAllysPersonal();
            this.startEnemyPersonal();
        };
        StageSceneFight.prototype.startStrategy = function () {
            this.startAllysStrategy();
            this.startEnemyStrategy();
        };
        //女神检测施法
        StageSceneFight.prototype.procGoddess = function (tick) {
            if (this.bGoddessFun == false) {
                this.goddessTimer = this.goddessTimer + tick * 1000;
                if (this.goddessTimer > 1000) {
                    this.bGoddessFun = true;
                    this.goddessTimer = 0;
                    this.startStrategy();
                }
            }
        };
        //径向模糊
        StageSceneFight.prototype.creatRadialBlur = function () {
            //this.nodeGround.visible=false;
            this.startStrength = true;
            this.strengthDir = 1;
            this.strengthTime = 0;
            this.strength = 0;
        };
        StageSceneFight.prototype.procRadialBlur = function (tick) {
            this.strengthTime = this.strengthTime + tick * 1000;
            if (this.strengthTime > zj.RadialBlurConfig.Blur_Break_Time && this.startStrength == true) {
                this.strengthTime = this.strengthTime - zj.RadialBlurConfig.Blur_Break_Time;
                var _delete = false;
                if (this.strengthDir == 1) {
                    this.strength = this.strength + zj.RadialBlurConfig.Emerge_Speed;
                    if (this.strength >= zj.RadialBlurConfig.Blur_Value_Max) {
                        this.strength = zj.RadialBlurConfig.Blur_Value_Max;
                        this.strengthDir = -1;
                    }
                }
                else {
                    this.strength = this.strength - zj.RadialBlurConfig.Die_Speed;
                    if (this.strength < zj.RadialBlurConfig.Blur_Value_Min) {
                        this.strength = zj.RadialBlurConfig.Blur_Value_Min;
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
        };
        StageSceneFight.prototype.endRadialBlur = function () {
            this.saveCameraInfo();
            this.resetMapOut();
            this.openSceneEffect(true);
            if (this.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
            }
            else if (this.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_2ND) {
                this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_4TH);
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
            }
        };
        StageSceneFight.prototype.initCamera = function () {
            if (this.monsterStage == zj.TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                this.borderDis = zj.FightDistanceConfig.A * this.groundScale; // * this.uiScale;
            }
            else {
                this.borderDis = zj.FightDistanceConfig.B * this.groundScale; // * this.uiScale                      
            }
        };
        StageSceneFight.prototype.updateCamera = function (tick) {
            var self = this;
            var rt = tick * 1000;
            if (self.cameraTouch == true) {
                var dis = Math.floor(zj.FightDistanceConfig.BG_Move_Speed * rt);
                var tmpDis = self.cameraMoveDis;
                self.cameraMoveDis = self.cameraMoveDis + dis;
                var xx = 0;
                var yy = 0;
                if (self.cameraMoveDis > self.borderDis) {
                    self.cameraTouch = false;
                    dis = self.borderDis - tmpDis;
                    self.cameraMoveDis = 0;
                }
                var _x = self.nodeRoot.x;
                var _y = self.nodeRoot.y;
                self.nodeRoot.x = _x - dis;
                self.nodeRoot.y = 0;
                self.UpdateMap(dis / self.groundScale, 0);
            }
        };
        StageSceneFight.prototype.openRunCamera = function (role) {
            //开启镜头移动
            this.cameraTouch = true;
            this.cameraRole = role;
            //人物进入奔跑第二阶段
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null) {
                    v.setRunState(zj.TableEnum.TableRunStage.STAGE_RUN_TWO);
                }
            }
        };
        StageSceneFight.prototype.saveCameraInfo = function () {
            this.cameraX = this.nodeRoot.x;
            this.cameraY = this.nodeRoot.y;
        };
        StageSceneFight.prototype.resetMapOut = function () {
            this.nodeRoot.x = 0;
            this.nodeRoot.y = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = 1;
            this.nodeMap.scaleX = this.nodeMap.scaleY = 1;
            this.shakeBgX = this.nodeMap.x;
            this.shakeBgY = this.nodeMap.y;
            this.setFightPos();
            this.InitBattleSqueue();
        };
        StageSceneFight.prototype.resetMapIn = function () {
            this.nodeRoot.anchorOffsetX = 0;
            this.nodeRoot.anchorOffsetY = 0;
            this.nodeRoot.x = this.x;
            this.nodeRoot.y = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.groundScale;
            this.nodeMap.scaleX = this.nodeMap.scaleY = this.groundScale;
            this.setAllysCameraPos();
        };
        StageSceneFight.prototype.setAllysCameraPos = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                var num = v.getTeamNum() + 1;
                var _x = Math.abs(this.cameraX) / this.groundScale / this.uiScale + zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[num];
                v.setPosX(_x);
            }
        };
        StageSceneFight.prototype.setFightPos = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                var num = v.getTeamNum() + 1;
                var xx = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[num];
                var yy = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[num]);
                yy = zj.UIManager.StageHeight - yy;
                v.setPos(xx, yy);
                v.setTeamCoord(xx, yy);
                v.clearRun();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                var num = v.getTeamNum() + 1;
                var xx = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[num];
                var yy = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Right_Mid_Y + zj.tableRightStanceY[num]);
                yy = zj.UIManager.StageHeight - yy;
                v.setPosX(xx, yy);
                v.setTeamCoord(xx, yy);
            }
            this.openAiFight(this.tableAllys);
            this.openAiFight(this.tableAllySupports);
        };
        StageSceneFight.prototype.hideAllAlly = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.visible = false;
            }
        };
        StageSceneFight.prototype.checkOppDead = function (bEnemy) {
            if (!bEnemy) {
                return this.checkAllEnemyDead();
            }
            else {
                return this.checkAllFriendDead();
            }
        };
        StageSceneFight.prototype.checkOppAnyReady = function (bEnemy) {
            if (!bEnemy) {
                return this.checkAnyEnemyReady();
            }
            else {
                return this.checkAnyAllyReady();
            }
        };
        StageSceneFight.prototype.checkAnyAllyReady = function () {
            var tag = false;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bDead && !v.bCall && v.bStartFight) {
                    tag = true;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkAnyEnemyReady = function () {
            var tag = false;
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && !v.bDead && !v.bCall && v.bStartFight) {
                    tag = true;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkAllEnemyDead = function () {
            var tag = true;
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && !v.bDead && !v.bCall) {
                    tag = false;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkAllFriendDead = function () {
            var tag = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bDead && !v.bCall) {
                    tag = false;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkAllFriendIsFloor = function () {
            var tag = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bDead && v.getIsOnFloor() == false) {
                    tag = false;
                    break;
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != null && !v.bDead && v.getIsOnFloor() == false) {
                    tag = false;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkAllFriendIsState = function (state) {
            var tag = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bDead && v.otherState != state) {
                    tag = false;
                    break;
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != null && !v.bDead && v.otherState != state) {
                    tag = false;
                    break;
                }
            }
            if (tag && zj.Game.TeachSystem.curPart == 4002)
                zj.Game.EventManager.event(zj.GameEvent.SKILL_CD_OK, { isOk: true });
            return tag;
        };
        StageSceneFight.prototype.checkEnemyEmpty = function () {
            var empty = true;
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && !v.bCall) {
                    empty = false;
                    break;
                }
            }
            return empty;
        };
        StageSceneFight.prototype.checkAllFriendEmpty = function () {
            var empty = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bCall) {
                    empty = false;
                    break;
                }
            }
            return empty;
        };
        StageSceneFight.prototype.changeGround = function () {
            this.groundScale = 1; //FightDistanceConfig.Fight_Scale;
            this.nodeRoot.anchorOffsetX = this.nodeRoot.anchorOffsetY = 0;
            this.nodeRoot.scaleX = this.nodeRoot.scaleY = this.groundScale;
            this.nodeMap.anchorOffsetX = this.nodeMap.anchorOffsetY = 0;
            this.nodeMap.scaleX = this.nodeMap.scaleY = this.groundScale;
        };
        StageSceneFight.prototype.initFightNumber = function () {
            //加载数字图片
            zj.FightNumberEffectMgr.Instance.addToLayer(this.nodeNumber);
        };
        StageSceneFight.prototype.Init = function () {
            // this.nodeMap.cacheAsBitmap = true;
            this.loadAuto();
            // this.initMyYH();
            this.shakeOrignX = this.nodeRoot.x;
            this.shakeOrignY = this.nodeRoot.y;
            this.shakeBgX = this.nodeMap.x;
            this.shakeBgY = this.nodeMap.y;
            this.loadTime();
            this.loadSound();
            this.teachBattleId = zj.Game.TeachSystem.curPart;
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_INIT;
        };
        StageSceneFight.prototype.loadSound = function () {
            zj.Helper.PlaybgmByID(100006);
        };
        StageSceneFight.prototype.loadTime = function () {
            if (zj.Gmgr.Instance.bReplay == false) {
                this.battleRTime(this.stageMaxTime);
            }
        };
        StageSceneFight.prototype.loadAuto = function () {
        };
        StageSceneFight.prototype.initMap = function () {
            //  local tableCityData = CSV:GetTable("city_data") 
            //  self:LoadMap(1)  
        };
        StageSceneFight.prototype.startShake = function (id) {
            if (zj.GlobalBattleConfig.shake == false) {
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
            var tableShake = zj.TableClientSkillShake.Table();
            this.shakeMaxFrame = tableShake[this.shakeId].screen_shake_frame;
        };
        StageSceneFight.prototype.rand = function () {
            // if mtirand()%2 == 1 then
            //     return true
            // else
            //     return false
            // end
        };
        StageSceneFight.prototype.updateShake = function (tick) {
            var self = this;
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
            }
            else {
                var tableShake = zj.TableClientSkillShake.Table();
                self.isShakePlusX = !self.isShakePlusX;
                self.isShakePlusY = !self.isShakePlusY;
                var randX = 0;
                var randY = 0;
                var maxX = tableShake[self.shakeId].range_x[1];
                var minX = tableShake[self.shakeId].range_x[0];
                var maxY = tableShake[self.shakeId].range_y[1];
                var minY = tableShake[self.shakeId].range_y[0];
                if (maxX == 0 && minX == 0) {
                    randX = 0;
                }
                else if (maxX == minX) {
                    randX = minX;
                }
                else {
                    // randX = minX + mtirand()%(maxX-minX);
                }
                if (randX > 10 || randX < 0) {
                    randX = 0;
                }
                if (maxY == 0 && minY == 0) {
                    randY = 0;
                }
                else if (maxY == minY) {
                    randY = minY;
                }
                else {
                    // randY = minY + mtirand()%(maxY-minY);
                }
                if (randY > 10 || randY < 0) {
                    randY = 0;
                }
                self.nodeMap.x = self.shakeBgX + zj.yuan3(self.isShakePlusX, randX, -randX);
                self.nodeMap.y = self.shakeBgY + zj.yuan3(self.isShakePlusY, randY, -randY);
                self.nodeRoot.x = self.shakeOrignX + zj.yuan3(self.isShakePlusX, randX, -randX);
                self.nodeRoot.y = self.shakeOrignY + zj.yuan3(self.isShakePlusY, randY, -randY);
                self.shakeFrame = self.shakeFrame + tick * 1000;
            }
        };
        StageSceneFight.prototype.isTimePause = function () {
            return this.bBeginPause;
        };
        StageSceneFight.prototype.Update = function (tick) {
            var self = this;
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
            var cheatDt = tick * zj.Gmgr.Instance.battleSpeed || 1; //1 / ConstantConfig_RoleBattle.DEFAULTFPS * Gmgr.Instance.battleSpeed;
            //清除命中音效限制
            zj.Gmgr.Instance.hitSoundEffectNum = 0;
            //教学轮询
            //Teach.procTeach(self.instanceId);
            //各种提示
            //TipsMgr.CheckTips();
            //动画同步处理
            self.updateStartCssEnd();
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            //self.proOperateTeach(cheatDt);
            if (self.bBossPause == true) {
                return;
            }
            //战斗计时器
            if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT || self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT) {
                self.timerTick = self.timerTick + 1;
            }
            //减帧处理
            var slowDt = cheatDt;
            self.updateIsLowFrame();
            self.updateDie(slowDt);
            slowDt = cheatDt * self.nCurFps / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            self.updateShake(cheatDt);
            self.updateFightState(cheatDt);
            self.updateCamera(cheatDt);
            self.procVerticalDis();
            if (self.isAllPause == false) {
                self.procSkiPause(slowDt);
            }
            zj.Gmgr.Instance.aiSpeedList.length = 0;
            self.procRole(self.tableAllys, slowDt);
            self.procRole(self.tableEnemys, slowDt);
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
            zj.FightNumberEffectMgr.Instance.update(cheatDt);
        };
        StageSceneFight.prototype.procChapWeek = function (tick) {
            var self = this;
            var rt = tick * 1000;
            if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                if (self.isWeekSteping) {
                    self.timerEveryChap = self.timerEveryChap + rt;
                    if (self.timerEveryChap >= self.weekTime) {
                        self.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_WEEK_SETTLE;
                        self.clearMyTEfectBelongEnemy();
                        if (self.bossInstance != null) {
                            self.bossInstance.clearAllBuffs();
                        }
                        if (self.isFinalStage()) {
                            self.goBalance();
                        }
                        else {
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
        };
        StageSceneFight.prototype.isFinalStage = function () {
        };
        StageSceneFight.prototype.openNextChap = function () {
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
        };
        StageSceneFight.prototype.openFillNextMonster = function () {
            var tbl = [0, 1, 3];
            for (var i = 0; i < tbl.length; i++) {
                this.fillMonster(tbl[i]);
            }
        };
        StageSceneFight.prototype.fillMonster = function (pos) {
        };
        StageSceneFight.prototype.isCanEnterWeek = function () {
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return false;
            }
            else {
                if (this.currChapStep >= this.maxChapStep) {
                    return false;
                }
                else {
                    return true;
                }
            }
        };
        StageSceneFight.prototype.openNextChapMonster = function () {
        };
        StageSceneFight.prototype.openWeekStep = function () {
            this.isWeekSteping = true;
            this.setEnemysDeadExpBoss();
            if (this.bossInstance != null) {
                this.bossInstance.setWeekTimer(this.weekTime);
                this.bossInstance.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_EnterWeek);
            }
            if (this.mainmenu != null) {
                this.mainmenu.OpenWeekUI();
            }
        };
        StageSceneFight.prototype.resetNextStepData = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT;
            this.timerEveryChap = 0;
            this.currChapStep = this.currChapStep + 1;
            this.isWeekSteping = false;
            this.battleTime = 0;
            this.monsterStage = this.monsterStage + 1;
            this.eStageState = this.eStageState + 1;
        };
        StageSceneFight.prototype.getCurrChapSetp = function () {
            return this.currChapStep;
        };
        StageSceneFight.prototype.getChapResultTbl = function () {
            return this.chapResultTbl;
        };
        StageSceneFight.prototype.getWeekBossHurt = function () {
            if (this.bossInstance != null) {
                return this.bossInstance.getShieldHp();
            }
            return 0;
        };
        StageSceneFight.prototype.updateRoleSpeed = function (tick) {
            var self = this;
            var list = zj.Gmgr.Instance.aiSpeedList;
            if (list.length > 0) {
                list.sort(function (a, b) { return b.ext - a.ext; });
                for (var i = 0; i < list.length; i++) {
                    var info = list[i];
                    if (!info.bEnemy) {
                        if (!info.bSupport) {
                            if (self.tableAllys[info.id] != null) {
                                self.tableAllys[info.id].update(tick);
                            }
                        }
                        else {
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
                        }
                        else {
                            if (self.tableEnemySupports[info.id] != null) {
                                self.tableEnemySupports[info.id].update(tick);
                            }
                        }
                    }
                }
                for (var i = 0; i < list.length; i++) {
                    var info = list[i];
                    if (!info.bEnemy) {
                        if (!info.bSupport) {
                            if (self.tableAllys[info.id] != null) {
                                self.tableAllys[info.id].updateExtra(tick);
                            }
                        }
                        else {
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
            zj.Gmgr.Instance.aiSpeedList = [];
        };
        StageSceneFight.prototype.updateRoleReplay = function (tick) {
        };
        StageSceneFight.prototype.updateBossPause = function (tick) {
            this.bossPauseTick = this.bossPauseTick + tick * 1000;
            if (this.bossPauseTick >= 500) {
                this.resumeByBoss();
                this.bossPauseTick = 0;
            }
        };
        StageSceneFight.prototype.updateTeamMap = function (baseX, baseY) {
            this.UpdateMap(0, baseY);
            this.updateMapEnemys(0, baseY, this.objectRole);
            this.updateMapAllys(0, baseY, this.objectRole);
            //this.updateMapHelpGeneral(0, baseY, this.objectRole)
            this.updateMapEffects(0, baseY, this.objectRole);
        };
        StageSceneFight.prototype.procVerticalDis = function () {
            // let self = this;
            function _search() {
                for (var k in this.tableAllys) {
                    var v = this.tableAllys[k];
                    if (v.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        if (v.y > zj.ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                            return v;
                        }
                    }
                }
                for (var k in this.tableAllySupports) {
                    var v = this.tableAllySupports[k];
                    if (v.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        if (v.y > zj.ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                            return v;
                        }
                    }
                }
                return null;
            }
            if (this.objectRole == null) {
                this.objectRole = _search();
            }
            var dis;
            var tag;
            if (this.objectRole != null) {
                dis = this.objectRole.y - zj.ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS;
                tag = false;
                if (this.objectRole.y <= zj.ConstantConfig_RoleBattle.VERTICAL_BEGIN_DIS) {
                    dis = 0;
                    tag = true;
                }
                var shift = dis - this.verticalDis;
                this.updateTeamMap(0, shift);
                this.verticalDis = dis;
                if (tag) {
                    this.verticalDis = 0;
                    this.objectRole = null;
                }
            }
        };
        StageSceneFight.prototype.updateMapEnemys = function (base_x, base_y, object) {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
        };
        StageSceneFight.prototype.updateMapAllys = function (base_x, base_y, object) {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != object) {
                    if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Attack) {
                        var xx = v.x;
                        var yy = v.y;
                        v.x = xx - base_x;
                        v.y = yy - base_y;
                    }
                    else {
                        v.x = v.teamOriginalX;
                        v.y = v.teamOriginalY - (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
                    }
                }
            }
        };
        StageSceneFight.prototype.updateMapEffects = function (base_x, base_y, object) {
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.x = v.teamOriginalX;
                v.y = v.teamOriginalY + (zj.Gmgr.Instance.ground - zj.Gmgr.Instance.floor);
            }
        };
        StageSceneFight.prototype.updateMapNumbers = function (xx, yy) {
            zj.FightNumberEffectMgr.Instance.moveDistance(xx, yy);
        };
        StageSceneFight.prototype.procCd = function (tick) {
            var self = this;
            if (self.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            zj.SkillCdMgr.Instance.update(tick);
        };
        StageSceneFight.prototype.updateFightState = function (tick) {
            var self = this;
            if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_INIT) {
                self.openAppaer(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_APPEAR) {
                self.procSenceAppear(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_WALK) {
                self.procSenceRun(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_CHANGE) {
                self.procRadialBlur(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_SCALE) {
                self.procSceneScale(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG) {
                self.procDialog(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_RULE) {
                self.procRule(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_GODDESS) {
                self.procGoddess(tick);
            }
            else if (self.sceneState == zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT) {
                self.procFightWait(tick);
            }
        };
        StageSceneFight.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_2(tick);
        };
        StageSceneFight.prototype.procRule = function (tick) {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFight.prototype.procFightWait = function (tick) {
            // if(this.mainmenu != null){
            //     if(this.mainmenu.getLoadStep() == -1){
            //         this.startFight();
            //     }
            // }
            this.startFight();
        };
        StageSceneFight.prototype.openAppaer = function (tick) {
            this.delayTick = this.delayTick + tick * 1000;
            if (this.delayTick >= 200) {
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_APPEAR;
                if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_LADDER_ATTACK &&
                    /**Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_MINE_SNATCH*/
                    zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER &&
                    zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC &&
                    zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    this.closeSceneEffect(); //有问题
                }
            }
        };
        StageSceneFight.prototype.openRun = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_WALK;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            }
        };
        StageSceneFight.prototype.openSceneOut = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_CHANGE;
            this.creatRadialBlur();
        };
        StageSceneFight.prototype.funSceneScaleIn = function () {
            this.resetMapIn();
            this.openRun();
        };
        StageSceneFight.prototype.dirRun = function () {
            this.openRun();
        };
        StageSceneFight.prototype.setScaleInConfig = function (breakTime, inSpeed, inFun) {
            this.scaleDir = -1;
            this.scaleValue = 1.0;
            this.scaleBreakConst = breakTime;
            this.scaleInSpeedConst = inSpeed;
            this.scaleInFun = inFun;
        };
        StageSceneFight.prototype.setScaleOutConfig = function (breakTime, outSpeed, outFun) {
            this.scaleDir = 1;
            this.scaleValue = this.groundScale;
            this.scaleBreakConst = breakTime;
            this.scaleOutSpeedConst = outSpeed;
            this.scaleOutFun = outFun;
        };
        StageSceneFight.prototype.openSceneScaleOut = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_SCALE;
            this.startScale = true;
            this.setScaleOutConfig(zj.SceneScaleConfig.Scale_Break_Time, zj.SceneScaleConfig.Scale_Out_Speed, null);
        };
        StageSceneFight.prototype.openSceneScaleIn = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_SCALE;
            this.startScale = true;
            this.setScaleInConfig(zj.SceneScaleConfig.Scale_Break_Time, zj.SceneScaleConfig.Scale_In_Speed, this.funSceneScaleIn);
        };
        StageSceneFight.prototype.procSceneScale = function (tick) {
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
                }
                else if (this.scaleDir == -1) {
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
        };
        StageSceneFight.prototype.procSenceAppear_1 = function (tick) {
            var _number = zj.Helper.getObjLen(this.tableAllys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number) {
                this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_1ST);
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
        };
        StageSceneFight.prototype.procSenceAppear_2 = function (tick) {
            var _number = zj.Helper.getObjLen(this.tableAllys);
            var numberOpp = zj.Helper.getObjLen(this.tableEnemys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number && this.checkOppAppearEnd() == true && this.timeOppIndex > numberOpp) {
                this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
            this.procOppAppear();
        };
        StageSceneFight.prototype.procSenceAppear_3 = function (tick) {
            var _number = zj.Helper.getObjLen(this.tableAllys);
            if (this.checkAppearEnd() == true && this.timeIndex > _number) {
                this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_2ND);
                this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                return;
            }
            this.appearTick = this.appearTick + tick * 1000;
            this.procMyAppear();
        };
        StageSceneFight.prototype.procSenceRun = function (tick) {
            if (this.checkRunEnd() == true && this.cameraTouch == false) {
                if (this.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_1ST) {
                    this.openSceneOut();
                }
                else {
                    this.endRadialBlur();
                }
            }
        };
        StageSceneFight.prototype.checkAppearEnd = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && v.getOtherState() == zj.TableEnum.TableEnumOtherState.OtherState_Appear) {
                    return false;
                }
            }
            return true;
        };
        StageSceneFight.prototype.procMyAppear = function () {
            var _number = zj.Helper.getObjLen(this.tableAllys);
            if (this.timeIndex <= _number && this.appearTick > zj.AppearTimeConfig[this.timeIndex]) {
                for (var k in this.tablePosKey) {
                    var v = this.tablePosKey[k];
                    if (this.appearIndex < parseInt(k) + 1) {
                        this.appearIndex = parseInt(k) + 1;
                        this.timeIndex = this.timeIndex + 1;
                        this.tableAllys[v].setVisible(true);
                        this.tableAllys[v].changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Appear);
                        break;
                    }
                }
            }
        };
        StageSceneFight.prototype.procOppAppear = function () {
            var _number = zj.Helper.getObjLen(this.tableEnemys);
            if (this.timeOppIndex <= _number && this.appearTick > zj.AppearTimeConfig[this.timeOppIndex]) {
                for (var k in this.tableEnemyKey) {
                    var v = this.tableEnemyKey[k];
                    if (this.appearOppIndex < parseInt(k) + 1) {
                        this.appearOppIndex = parseInt(k) + 1;
                        this.timeOppIndex = this.timeOppIndex + 1;
                        this.tableEnemys[v].setVisible(true);
                        this.tableEnemys[v].changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Appear);
                        break;
                    }
                }
            }
        };
        StageSceneFight.prototype.checkOppAppearEnd = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && v.getOtherState() == zj.TableEnum.TableEnumOtherState.OtherState_Appear) {
                    return false;
                }
            }
            return true;
        };
        StageSceneFight.prototype.checkRunEnd = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && v.getOtherState() == zj.TableEnum.TableEnumOtherState.OtherState_Run) {
                    return false;
                }
            }
            return true;
        };
        StageSceneFight.prototype.getSceneEffectByID = function (id) {
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                if (v.effect_id == id) {
                    return v;
                }
            }
            return null;
        };
        StageSceneFight.prototype.procEffects = function (tick) {
            var self = this;
            var i = 0;
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
                var tEffect = self.tableEffects[i];
                var bFinish = tEffect.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(tEffect);
                    if (tEffect.effect_skill_type == 2) {
                        zj.Game.ObjectPool.returnItem("SkillEffectBase_2", tEffect);
                    }
                    else if (tEffect.effect_skill_type == 1) {
                        zj.Game.ObjectPool.returnItem("SkillEffectBase_1", tEffect);
                    }
                    self.tableEffects.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.addEffect = function (effect) {
            this.tableEffects.push(effect);
        };
        StageSceneFight.prototype.clearAllEffects = function () {
            var i = 0;
            while (i < this.tableEffects.length) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
                this.tableEffects.splice(i, 1);
            }
        };
        StageSceneFight.prototype.procParticles = function (tick) {
            var self = this;
            var i = 0;
            while (i < self.tableParticles.length) {
                self.tableParticles[i].update(tick);
                i = i + 1;
            }
            i = 0;
            while (i < self.tableParticles.length) {
                var particle = self.tableParticles[i];
                var bFinish = particle.getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(particle);
                    self.tableParticles.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.addParticle = function (particle) {
            this.tableParticles.push(particle);
        };
        StageSceneFight.prototype.clearAllParticles = function () {
            var i = 0;
            while (i < this.tableParticles.length) {
                zj.CC_SAFE_DELETE(this.tableParticles[i]);
                this.tableParticles.splice(i, 1);
            }
        };
        StageSceneFight.prototype.addDeadParticle = function (x, y) {
            // local particle  = cc.ParticleSystemQuad:create(UIConfig_CommonBattle.deadParticleSprite)
            // particle:setPositionType(cc.POSITION_TYPE_GROUPED)
            // particle:setPosition(x, y)
            // self.nodeParticle:addChild(particle)	     
            // table.insert(self.tableDeadParticles, particle)
        };
        StageSceneFight.prototype.procDeadParticles = function (tick) {
            var i = 0;
            while (i < this.tableDeadParticles.length) {
                var particle = this.tableDeadParticles[i];
                if (particle.isActive() == false && particle.getParticleCount() == 0) {
                    particle.visible = false;
                    this.tableDeadParticles.splice(i, 1);
                    this.creatDelayClean(particle, this.nodeParticle);
                }
                else {
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.addBloodEffect = function (effect) {
            this.tableBloodEffects.push(effect);
        };
        StageSceneFight.prototype.procBloodEffect = function (tick) {
            var i = 0;
            while (i < this.tableBloodEffects.length) {
                var bFinish = this.tableBloodEffects[i].getIsFinish();
                if (bFinish == true) {
                    zj.CC_SAFE_DELETE(this.tableBloodEffects[i]);
                    this.tableBloodEffects.splice(i, 1);
                }
                else {
                    this.tableBloodEffects[i].update(tick);
                    i = i + 1;
                }
            }
        };
        StageSceneFight.prototype.procCalls = function (t, tick) {
            //let i = 0;
            //let index = 0;
            for (var k in t) {
                var v = t[k];
                //特殊处理
                if (v.bCanRemove == true) {
                    zj.SkillCdMgr.Instance.cleanRoleCd(v);
                    zj.CC_SAFE_DELETE(v);
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
        };
        StageSceneFight.prototype.randRevive = function (bEnemy, hpPer) {
            var role = null;
            if (bEnemy == false && this.tableAllyDead.length > 0) {
                var rand = 1; //lcgrand();
                var index = rand % this.tableAllyDead.length + 1;
                role = this.tableAllyDead[index - 1];
                role.setRevive(hpPer);
                this.tableAllyDead.splice(index, 0);
                return [true, role];
            }
            else if (bEnemy == true && this.tableEnemyDead.length > 0) {
                var rand = 1; //lcgrand();
                var index = rand % this.tableEnemyDead.length + 1;
                role = this.tableEnemyDead[index];
                this.tableEnemyDead[index].setRevive(hpPer);
                this.tableEnemyDead.splice(index, 1);
                return [true, role];
            }
            return [true, null];
        };
        StageSceneFight.prototype.isRandRevive = function (bEnemy) {
            if (bEnemy == false && this.tableAllyDead.length > 0) {
                return true;
            }
            else if (bEnemy == true && this.tableEnemyDead.length > 0) {
                return true;
            }
            return false;
        };
        StageSceneFight.prototype.procHelpRole = function (t, tick) {
            for (var k in t) {
                var v = t[k];
                zj.Gmgr.Instance.aiSpeedList.push(zj.createAiSpeedRoleInfo(v.roleId, v.bEnemy, v.isSupport(), v.getCdSpeed(), null, true, v.eTeamNum));
            }
        };
        StageSceneFight.prototype.updateIsLowFrame = function () {
            var self = this;
            var tag = false;
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                if (self.checkAllEnemyDead() == true && self.tableEnemysReserveRec[0] == "empty") {
                    tag = true;
                    self.bPvpDead = true;
                }
            }
            else {
                if (self.bBossDead == true) {
                    tag = true;
                }
            }
            if (self.checkAllFriendDead() == true && self.tableAllysReserveRec[0] == "empty") {
                tag = true;
            }
            this.bLowFrame = tag;
        };
        StageSceneFight.prototype.updateDie = function (slowDt) {
            var self = this;
            if (self.bLowFrame == true && self.nDieFrame == 0) {
                self.bDiePlay = true;
                self.nCurFps = zj.ConstantConfig_RoleBattle.SLOWFPS;
                if (self.bBossDead || self.bPvpDead || self.bTeachDead) {
                    self.loadKillerAni();
                    self.startShake(10001);
                }
                self.setCssSpeed(self.nCurFps / zj.ConstantConfig_RoleBattle.DEFAULTFPS);
            }
            if (self.bDiePlay == true) {
                self.nDieFrame = self.nDieFrame + slowDt;
                if (self.nDieFrame >= zj.ConstantConfig_RoleBattle.DIE_MAX_FRAME) {
                    self.nCurFps = zj.ConstantConfig_RoleBattle.DEFAULTFPS;
                    self.bDiePlay = false;
                    self.setCssSpeed(self.nCurFps / zj.ConstantConfig_RoleBattle.DEFAULTFPS);
                }
            }
        };
        StageSceneFight.prototype.setCssSpeed = function (speed) {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != null && v.bDead != true) {
                    v.setActInterval(speed);
                }
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.setActInterval(speed);
            }
        };
        StageSceneFight.prototype.setAllysDead = function (tag) {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && v.bDead != true) {
                    v.setHp(0);
                    v.setDead(tag);
                }
            }
        };
        StageSceneFight.prototype.setEnemysDeadExpBoss = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != null && v.bDead != true && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                    v.setHp(0);
                    v.setDead();
                }
            }
        };
        StageSceneFight.prototype.cleanHurtVlaue = function (t, idx) {
            if (zj.Helper.getObjLen(t) <= 0) {
                return;
            }
            var i = 0;
            while (i < zj.Helper.getObjLen(t)) {
                t[i].deleteHurtValue(idx);
                i = i + 1;
            }
        };
        StageSceneFight.prototype.addRole = function (role) {
            if (role.bEnemy) {
                this.tableEnemys[role.roleId] = role;
            }
            else {
                this.tableAllys[role.roleId] = role;
            }
        };
        StageSceneFight.prototype.addCollision = function (role) {
            var item = { player: role, force: role.bEnemy };
            this.tableCollision.push(item);
        };
        StageSceneFight.prototype.getRageTipPos = function (num, type) {
            if (this.mainmenu == null) {
                return [null, null];
            }
            else {
                var arrPos = this.mainmenu.GetCdTipPos(num + 1, type);
                var xx = arrPos[0];
                var yy = arrPos[1];
                if (xx != null && yy != null) {
                    xx = xx; /// this.uiScale;
                    yy = yy; /// this.uiScaleY;
                    yy = yy - 20;
                }
                return [xx - this.fightRoot.x + 60, yy];
            }
        };
        StageSceneFight.prototype.playTip = function (state, num) {
            if (this.mainmenu == null) {
                return;
            }
            if (this.sp) {
                this.nodeTip.removeChild(this.sp);
            }
            var move_by1 = null;
            var move_by2 = null;
            var fade_in = null;
            var fade_out = null;
            var ac1 = null;
            var ac2 = null;
            var as = null;
            var path = null;
            if (state == zj.TableEnum.TableEnumFightTip.TIP_CD) {
                path = zj.UIConfig.UIConfig_CommonBattle.fightTipCD;
            }
            else if (state == zj.TableEnum.TableEnumFightTip.TIP_MP) {
                path = zj.UIConfig.UIConfig_CommonBattle.fightTipMp;
            }
            else {
                //assert(false);
            }
            var arr = this.mainmenu.GetCdTipPos(num + 1, 1);
            var x = arr[0] - this.fightRoot.x;
            var y = arr[1];
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
        };
        StageSceneFight.prototype.getAllys = function () {
            return this.tableAllys;
        };
        StageSceneFight.prototype.getEnemys = function () {
            return this.tableEnemys;
        };
        StageSceneFight.prototype.getEffects = function () {
            return this.tableEffects;
        };
        StageSceneFight.prototype.getEffectLayer = function (role) {
            if (role.bCall == true) {
                return this.nodeEffect;
            }
            else {
                if (role.bEnemy == false) {
                    var pos = 0;
                    // if (role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || role.roleType == TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    //     pos = 4;
                    // } else {
                    //     pos = role.eTeamNum + 1;
                    // }
                    return this.tableNodeRoleEffects[pos];
                }
                else if (role.bEnemy == true) {
                    var pos = 0; //role.eTeamNum + 1;
                    //let num = this.tableNodeMonsterEffects[pos].numChildren;
                    return this.tableNodeRoleEffects[pos];
                }
            }
        };
        StageSceneFight.prototype.renderEffectStart = function (role) {
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
        };
        StageSceneFight.prototype.renderEffectEnd = function (role) {
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
        };
        StageSceneFight.prototype.recoverEffectRender = function () {
            // for (let i = 0; i < this.tableNodeRoleEffects.length; i++) {
            //     //this.tableNodeRoleEffects[i].setLocalZOrder( this.RenderLayerOrder.MidRoleEffect_Order + this.roleRenderPos[i]);
            // }
            // for (let i = 0; i < this.tableNodeMonsterEffects.length; i++) {
            //     //this.tableNodeMonsterEffects[i].setLocalZOrder( this.RenderLayerOrder.MidRoleEffect_Order + this.roleRenderPos[i]);
            // }
        };
        StageSceneFight.prototype.getParticleLayer = function () {
            return this.nodeParticle;
        };
        StageSceneFight.prototype.getUpEffectLayer = function () {
            return this.nodeUpEffect;
        };
        StageSceneFight.prototype.getHitEffectLayer = function () {
            return this.nodeHitEffect;
        };
        StageSceneFight.prototype.getBuffEffectLayer = function () {
            return this.nodeBuffEffect;
        };
        StageSceneFight.prototype.getMidLayer = function () {
            return this.midNode;
        };
        StageSceneFight.prototype.initMonster = function (bTag) {
        };
        StageSceneFight.prototype.clearStageInfo = function () {
        };
        StageSceneFight.prototype.clearCall = function () {
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != null && v.bDead == false) {
                    v.setDead();
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != null && v.bDead == false) {
                    v.setDead();
                }
            }
        };
        StageSceneFight.prototype.nextStage = function () {
            this.bTimingOn = true;
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
        };
        StageSceneFight.prototype.initMonsterTalents = function () {
        };
        StageSceneFight.prototype.clearMonsterTalents = function () {
        };
        StageSceneFight.prototype.getPartnerCount = function (camp) {
            if (camp == zj.TableEnum.TableCampType.CAMP_TYPE_MY) {
                return zj.Helper.getObjLen(this.tableAllys);
            }
            else if (camp == zj.TableEnum.TableCampType.CAMP_TYPE_OTHER) {
                return zj.Helper.getObjLen(this.tableEnemys);
            }
        };
        StageSceneFight.prototype.getPartnerDebar = function (camp, role) {
            var t = [];
            if (camp == zj.TableEnum.TableCampType.CAMP_TYPE_MY) {
                for (var k in this.tableAllys) {
                    var v = this.tableAllys[k];
                    if (v != role && v.bCall != true) {
                        t.push(v);
                    }
                }
            }
            else if (camp == zj.TableEnum.TableCampType.CAMP_TYPE_OTHER) {
                for (var k in this.tableEnemys) {
                    var v = this.tableEnemys[k];
                    if (v != role && v.bCall != true) {
                        t.push(v);
                    }
                }
            }
            return t;
        };
        StageSceneFight.prototype.getTargetRadio = function (role, radio) {
            var tResult = [];
            var t = [];
            function search(tRoles) {
                var temp = [];
                for (var k in tRoles) {
                    var v = tRoles[k];
                    if (v != role && (v.x - role.x) < radio && (v.y - role.y) < radio) {
                        temp.push(v);
                    }
                }
                return temp;
            }
            if (role.bEnemy == false) {
                t = search(this.tableAllys);
            }
            else if (role.bEnemy == true) {
                t = search(this.tableEnemys);
            }
            while (true) {
                if (tResult.length >= 2) {
                    break;
                }
                var rank = 1; //lcgrand();
                var rand_value = rank % t.length + 1;
                if (tResult.indexOf(t[rand_value]) == -1) {
                    tResult.push(t[rand_value]);
                }
            }
            if (t.length >= 1) {
                var rand = 1; //lcgrand();
                tResult.push(t[rand % t.length + 1]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetPlayer = function (role, targetPos, target, isExceptBoss, extraValue) {
            //自己单独处理
            var tbl = [];
            if (target == message.ETargetId.TARGET_SELF) {
                var t = [];
                t.push(role);
                return t;
            }
            var pos = role.getPositionType();
            if ((pos == zj.TableEnum.TablePositionType.POSITION_LEFT && targetPos == message.ETargetPosType.TARGET_POS_MINE) ||
                (pos == zj.TableEnum.TablePositionType.POSITION_RIGHT && targetPos == message.ETargetPosType.TARGET_POS_ENEMY)) {
                return this.funTarget(target, this.tableAllys, role, isExceptBoss, extraValue);
            }
            else if ((pos == zj.TableEnum.TablePositionType.POSITION_RIGHT && targetPos == message.ETargetPosType.TARGET_POS_MINE) ||
                (pos == zj.TableEnum.TablePositionType.POSITION_LEFT && targetPos == message.ETargetPosType.TARGET_POS_ENEMY)) {
                return this.funTarget(target, this.tableEnemys, role, isExceptBoss, extraValue);
            }
            return tbl;
        };
        StageSceneFight.prototype.funTarget = function (target, t, role, isExceptBoss, extraValue) {
            var tbl = [];
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
                return this.getTargetByPos(t, zj.TableEnum.TableTeamNum.TEAM_NUM_A);
            }
            else if (target == message.ETargetId.TARGET_POS_2) {
                return this.getTargetByPos(t, zj.TableEnum.TableTeamNum.TEAM_NUM_B);
            }
            else if (target == message.ETargetId.TARGET_POS_3) {
                return this.getTargetByPos(t, zj.TableEnum.TableTeamNum.TEAM_NUM_C);
            }
            else if (target == message.ETargetId.TARGET_POS_4) {
                return this.getTargetByPos(t, zj.TableEnum.TableTeamNum.TEAM_NUM_D);
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
                var value = target - 21;
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
        };
        StageSceneFight.prototype.getTargetDisNear = function (tRoles, role) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return a.value - b.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetDisMid = function (tRoles, role) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len == 3) {
                tResult.push(tRoles[temp[1].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetDisFar = function (tRoles, role) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: Math.abs(v.realX - role.x) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getProtoMax = function (tRoles, role, extraValue) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getProtoValue(extraValue) * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getProtoMin = function (tRoles, role, extraValue) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getProtoValue(extraValue) * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return a.value - b.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getRoleCdMax = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getProtoValue() * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getRoleCdMin = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getProtoValue() * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return a.value - b.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getRoleDebuffMax = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getBuffNumByUseType(zj.TableEnum.TableBuffUseType.Buff_Use_Bad) * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getRoleBuffMax = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getBuffNumByUseType(zj.TableEnum.TableBuffUseType.Buff_Use_Good) * 10000 + zj.getRandom(0, 50) };
                    temp.push(info);
                }
            }
            temp.sort(function (a, b) {
                return b.value - a.value;
            });
            var len = temp.length;
            if (len >= 1) {
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetFeature = function (tRoles, feature) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true && v.roleFeature == feature) {
                    tResult.push(tRoles[k]);
                }
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetByPosKey = function (tRoles, pos) {
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    if (v.eTeamNum == pos) {
                        return k;
                    }
                }
            }
            return null;
        };
        StageSceneFight.prototype.getTargetByPos = function (tRoles, pos) {
            var tResult = [];
            var temp = [];
            var _t = [];
            if (pos == zj.TableEnum.TableTeamNum.TEAM_NUM_A) {
                _t = [0, 1, 2, 3];
            }
            else if (pos == zj.TableEnum.TableTeamNum.TEAM_NUM_B) {
                _t = [1, 2, 3, 0];
            }
            else if (pos == zj.TableEnum.TableTeamNum.TEAM_NUM_C) {
                _t = [2, 3, 1, 0];
            }
            else if (pos == zj.TableEnum.TableTeamNum.TEAM_NUM_D) {
                _t = [3, 2, 1, 0];
            }
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true && v.bCall == false) {
                    temp[v.eTeamNum] = v;
                }
            }
            for (var i = 0; i < _t.length; i++) {
                var poskey = _t[i];
                if (temp[poskey] != null) {
                    tResult.push(temp[poskey]);
                    break;
                }
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMinHp = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            var len = temp.length;
            if (len >= 1) {
                temp.sort(function (a, b) {
                    return a.hp - b.hp;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.sortTableByHp = function (tRoles, bMin) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            if (bMin == true) {
                temp.sort(function (a, b) {
                    return a.hp - b.hp;
                });
            }
            else {
                temp.sort(function (a, b) {
                    return b.hp - a.hp;
                });
            }
            for (var i = 0; i < temp.length; i++) {
                tResult.push(tRoles[temp[i].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMaxHp = function (tRoles, isExceptBoss) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    if (isExceptBoss == true && v.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS) {
                        continue;
                    }
                    var info = { key: k, hp: v.getHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort(function (a, b) {
                    return b.hp - a.hp;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMinPercentHp = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getHp() / v.getMaxHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort(function (a, b) {
                    return a.value - b.value;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMaxPercentHp = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, value: v.getHp() / v.getMaxHp() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort(function (a, b) {
                    return b.value - a.value;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMinRage = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, rage: v.getRage() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort(function (a, b) {
                    return a.rage - b.rage;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetMaxRage = function (tRoles) {
            var tResult = [];
            var temp = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    var info = { key: k, rage: v.getRage() };
                    temp.push(info);
                }
            }
            if (temp.length >= 1) {
                temp.sort(function (a, b) {
                    return b.rage - a.rage;
                });
                tResult.push(tRoles[temp[0].key]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetAll = function (tRoles) {
            var tResult = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    tResult.push(v);
                }
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetRand = function (tRoles) {
            var tResult = [];
            var t = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    t.push(v);
                }
            }
            if (t.length >= 1) {
                var rand = 1; //lcgrand();
                tResult.push(t[rand % t.length + 1]);
            }
            return tResult;
        };
        StageSceneFight.prototype.getTargetRandTwo = function (tRoles) {
            var tResult = [];
            var t = [];
            for (var k in tRoles) {
                var v = tRoles[k];
                if (v.bDead != true) {
                    t.push(v);
                }
            }
            if (t.length <= 2) {
                tResult = t.concat(); //JSON.parse(JSON.stringify(t));
            }
            else {
                while (true) {
                    if (tResult.length >= 2) {
                        break;
                    }
                    var rand = 1; //lcgrand();
                    var rand_value = rand % t.length + 1;
                    if (tResult.indexOf(t[rand_value]) == -1) {
                        tResult.push(t[rand_value]);
                    }
                }
            }
            return tResult;
        };
        StageSceneFight.prototype.goFightTimeUp = function () {
            if (this.fightTimeUp != null) {
                return;
            }
            this.goTimeUp();
            this.loadFightTimeUp();
        };
        /**时间到了 */
        StageSceneFight.prototype.loadFightTimeUp = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_timeup;
            this.fightTimeUp = zj.HunterSpineX(1, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            this.fightTimeUp.SetPosition(zj.UIManager.StageWidth / 2, zj.UIManager.StageHeight / 2);
            this.fightTimeUp.ChangeAction(0);
            this.nodeUpEffect.addChild(this.fightTimeUp.spine);
            this.fightTimeUp.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
        };
        StageSceneFight.prototype.animationTimeEvent = function () {
            if (this.fightTimeUp) {
                this.fightTimeUp.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
                this.fightTimeUp.clearSpine();
                this.fightTimeUp = null;
            }
            //this.creatDelayClean(this.fightTimeUp, this.nodeUpEffect);
            this.bBalance = true;
            this.endTimeUp();
        };
        StageSceneFight.prototype.endTimeUp = function () {
        };
        StageSceneFight.prototype.judgeFightStart = function () {
            if (this.eStageState == zj.TableEnum.TableStageState.STAGE_STATE_1ST) {
                this.loadFightStart();
            }
            else {
                this.endStartCss();
            }
        };
        StageSceneFight.prototype.loadFightStart = function () {
            this.loadCommonFightStart();
        };
        StageSceneFight.prototype.loadCommonFightStart = function () {
            var name = zj.UIConfig.UIConfig_CommonBattleCss.json_zhandou_start;
            this.fightStartCss = zj.HunterSpineX(name, 1, null, zj.TableClientAniSpxSource.Item(name).name)[0];
            this.fightStartCss.SetPosition(zj.Device.STANDARD_SCREEN_W / 2, zj.Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(0);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            //开始战斗音效
            zj.Helper.EftByID(20045);
        };
        StageSceneFight.prototype.comStartFun = function () {
            if (this.fightStartCss) {
                this.rawDuration_start = 200;
                this.fightStartCss.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.fightStartCss.clearSpine();
                this.fightStartCss = null;
            }
        };
        StageSceneFight.prototype.loadContendFightStart = function () {
            var tbl = [310, 311, 312];
            this.fightStartCss = zj.HunterSpineX(1, 1, null, zj.TableClientAniCssSource.Item(zj.TableClientAniUi.Item(tbl[zj.Gmgr.Instance.starcraftIndex - 1]).css_id).name)[0];
            this.fightStartCss.SetPosition(zj.Device.STANDARD_SCREEN_W / 2, zj.Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(zj.TableClientAniUi.Item(tbl[zj.Gmgr.Instance.starcraftIndex - 1]).index);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            zj.Helper.EftByID(20045);
        };
        StageSceneFight.prototype.loadSingleFightStart = function () {
            var tbl = [200300, 200301, 200302];
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                tbl = [801500, 801501, 801502];
            }
            this.fightStartCss = zj.HunterSpineX(1, 1, null, zj.TableClientAniCssSource.Item(zj.TableClientAniUi.Item(tbl[zj.Gmgr.Instance.starcraftIndex - 1]).css_id).name)[0];
            this.fightStartCss.SetPosition(zj.Device.STANDARD_SCREEN_W / 2, zj.Device.STANDARD_SCREEN_H / 2);
            this.fightStartCss.ChangeAction(zj.TableClientAniUi.Item(tbl[zj.Gmgr.Instance.starcraftIndex - 1]).index);
            this.nodeUpEffect.addChild(this.fightStartCss.spine);
            this.fightStartCss.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
            zj.Helper.EftByID(20045);
        };
        StageSceneFight.prototype.updateStartCssEnd = function () {
            //这里有问题
            var self = this;
            if (self.rawDuration_start == -1) {
                return;
            }
            self.rawDuration_start = -1;
            self.endStartCss();
        };
        StageSceneFight.prototype.endStartCss = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_WAIT;
        };
        StageSceneFight.prototype.renderRoleStart = function (role, color) {
            if (role != null) {
                var pos = role.eTeamNum + 1;
                role.beginHightLight();
                // role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = true;
                    this.roleIndexChange(role);
                }
            }
        };
        StageSceneFight.prototype.renderMonsterStart = function (role, color) {
            if (role != null) {
                var pos = role.eTeamNum + 1;
                role.beginHightLight();
                // role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[4+pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = true;
                    this.roleIndexChange(role);
                }
            }
        };
        StageSceneFight.prototype.renderTargetStart = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v.bEnemy == false) {
                    this.renderRoleStart(v, false);
                }
                else {
                    this.renderMonsterStart(v, false);
                }
            }
        };
        StageSceneFight.prototype.renderRoleEnd = function (role, color) {
            if (role != null) {
                var pos = role.eTeamNum + 1;
                role.beginHightLight();
                //role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = false;
                    this.roleAdd();
                }
            }
        };
        StageSceneFight.prototype.renderMonsterEnd = function (role, color) {
            if (role != null) {
                var pos = role.eTeamNum + 1;
                role.beginHightLight();
                //role.nodeRoot.parent.setChildIndex(role.nodeRoot,this.hunterRoleRenderPos[4+pos]);
                if (color == true) {
                    this.nodeBlackShader.visible = false;
                    this.roleAdd();
                }
            }
        };
        StageSceneFight.prototype.staticBegin = function (role) {
            if (zj.GlobalBattleConfig.static == false) {
                return;
            }
            if (role == null) {
                return;
            }
            this.removeFounder();
            this.trussRole(role);
            this.renderRoleStart(role, true);
        };
        StageSceneFight.prototype.staticEnd = function (role) {
            if (role != this.pauseFounder) {
                this.renderTargetEnd(role.targetPlayers);
                this.clearTargetPlayer(role);
                this.renderSingleEnd(role, false);
                this.resumeExTargetBlack(role);
            }
            else {
                this.removeFounder();
            }
        };
        StageSceneFight.prototype.removeFounder = function () {
            if (this.pauseFounder != null) {
                this.renderTargetEnd(this.pauseFounder.targetPlayers);
                this.clearTargetPlayer(this.pauseFounder);
                this.renderSingleEnd(this.pauseFounder, true);
                this.resumeExTargetBlack(this.pauseFounder);
                //self:resume()
                this.pauseFounder = null;
            }
        };
        StageSceneFight.prototype.recoverFBreak = function (role, tag) {
            if (this.pauseFounder != null) {
            }
            this.renderTargetEnd(role.targetPlayers);
            this.clearTargetPlayer(role);
            var realTag = tag;
            if (role == this.pauseFounder) {
                realTag = true;
            }
            this.renderSingleEnd(role, realTag);
            if (this.pauseFounder != null && role == this.pauseFounder) {
                this.resumeExTargetBlack(this.pauseFounder);
                this.pauseFounder = null;
            }
        };
        StageSceneFight.prototype.renderTargetEnd = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v.bEnemy == false) {
                    this.renderRoleEnd(v, false);
                }
                else {
                    this.renderMonsterEnd(v, false);
                }
            }
        };
        StageSceneFight.prototype.renderSingleEnd = function (role, tag) {
            if (!role.bEnemy) {
                this.renderRoleEnd(role, tag);
            }
            else {
                this.renderMonsterEnd(role, tag);
            }
        };
        StageSceneFight.prototype.Pause = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.Pause();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.Pause();
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.Pause();
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.Pause();
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                v.Pause();
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                v.Pause();
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.Pause();
            }
            zj.FightNumberEffectMgr.Instance.Pause();
        };
        StageSceneFight.prototype.resume = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.resume();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.resume();
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.resume();
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.resume();
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                v.resume();
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                v.resume();
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.resume();
            }
            zj.FightNumberEffectMgr.Instance.resume();
        };
        StageSceneFight.prototype.pauseByBoss = function () {
            this.bBossPause = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.Pause();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.Pause();
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.Pause();
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.Pause();
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                v.Pause();
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                v.Pause();
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.Pause();
            }
            zj.FightNumberEffectMgr.Instance.Pause();
        };
        StageSceneFight.prototype.resumeByBoss = function () {
            this.bBossPause = false;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.resume();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.resume();
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.resume();
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.resume();
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                v.resume();
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                v.resume();
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                v.resume();
            }
            zj.FightNumberEffectMgr.Instance.resume();
        };
        StageSceneFight.prototype.beginSkiPause = function (beginRole) {
            this.beginRole = beginRole;
            this.bBeginPause = true;
            this.nPauseTick = 0;
            this.nMaxPauseTick = zj.yuan3(this.beginRole.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP || this.beginRole.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP, zj.ConstantConfig_RoleBattle.SKI_SUPPORT_PAUSE_TIME, zj.ConstantConfig_RoleBattle.SKI_PAUSE_TIME);
            this.pauseExTarget(beginRole);
        };
        StageSceneFight.prototype.procSkiPause = function (tick) {
            var self = this;
            if (!self.bBeginPause) {
                return;
            }
            self.nPauseTick = self.nPauseTick + tick * 1000;
            if (self.nPauseTick >= self.nMaxPauseTick) {
                self.bBeginPause = false;
                self.resumeExTarget(self.beginRole);
            }
        };
        StageSceneFight.prototype.pauseExTarget = function (target) {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.Pause();
                }
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                if (v.belong_role != target) {
                    v.Pause();
                }
            }
            zj.FightNumberEffectMgr.Instance.Pause();
        };
        StageSceneFight.prototype.pauseExTargetBlack = function (target) {
            this.bTargetPause = true;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v == null) {
                    delete this.tableEnemys[k];
                }
                if (v != target && v != null) {
                    v.pauseBlack();
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.pauseBlack();
                }
            }
        };
        StageSceneFight.prototype.resumeExTarget = function (target) {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.resume();
                }
            }
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                if (v.belong_role != target) {
                    v.resume();
                }
            }
            zj.FightNumberEffectMgr.Instance.resume();
        };
        StageSceneFight.prototype.resumeExTargetBlack = function (target) {
            this.bTargetPause = false;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (var k in this.tableAllyCallMobs) {
                var v = this.tableAllyCallMobs[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
            for (var k in this.tableEnemyCallMobs) {
                var v = this.tableEnemyCallMobs[k];
                if (v != target) {
                    v.resumeBlack();
                }
            }
        };
        StageSceneFight.prototype.pauseAll = function () {
            zj.Gmgr.Instance.bPause = true;
            this.Pause();
            if (this.mainmenu != null) {
                this.mainmenu.Pause();
            }
        };
        StageSceneFight.prototype.resumeAll = function () {
            zj.Gmgr.Instance.bPause = false;
            this.resume();
            if (this.mainmenu != null) {
                this.mainmenu.resume();
            }
        };
        StageSceneFight.prototype.clearMainMenu = function () {
            this.mainmenu = null;
        };
        StageSceneFight.prototype.freshReviveMenu = function (role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshReviveMenu(role);
            }
        };
        StageSceneFight.prototype.endStageUi = function () {
            //这里有问题
            this.hideMainUi();
        };
        StageSceneFight.prototype.endFightUi = function () {
            //这里有问题
            this.hideMainUi();
        };
        StageSceneFight.prototype.trussRole = function (role) {
            this.pauseFounder = role;
            this.beginSkiPause(role);
            this.pauseExTargetBlack(role);
        };
        StageSceneFight.prototype.staticBossWeekBegin = function (role) {
            if (zj.GlobalBattleConfig.static == false) {
                return;
            }
            if (role == null) {
                return;
            }
            this.removeFounder();
            this.pauseWeekFounder = role;
            this.pauseExTargetBlack(role);
            this.renderMonsterStart(role, true);
        };
        StageSceneFight.prototype.staticBossWeekEnd = function (role) {
            this.renderTargetEnd(role.targetPlayers);
            this.clearTargetPlayer(role);
            this.renderSingleEnd(role, true);
            this.resumeExTargetBlack(role);
            this.pauseWeekFounder = null;
        };
        StageSceneFight.prototype.rolesToHome = function (t) {
            for (var k in t) {
                var v = t[k];
                v.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
                v.backHoming();
            }
        };
        StageSceneFight.prototype.clearFightInfo = function () {
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
        };
        StageSceneFight.prototype.hideRoles = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                v.visible = false;
            }
        };
        //暴击相关
        StageSceneFight.prototype.createCombo = function () {
            //这里有问题
            this.comboEffect = new zj.ComboEffect(this.nodeTip);
            // this.nodeTip.addChild(this.comboEffect);
            var x = (zj.Device.STANDARD_SCREEN_W - zj.ConstantConfig_RoleBattle.COMBO_DIS_X - 100);
            var y = (zj.Device.STANDARD_SCREEN_H / 2 - 140);
            function funCall(info) {
                this.comboLv = info.combo_lv;
                if (info.buff_id != -1) {
                    this.bComboBuff = true;
                    this.createComboBuff(this.comboRole, info.buff_id, info.buff_lv);
                }
                //连斩升级出发提示音效
                zj.Helper.EftByID(20047);
            }
            this.comboEffect.setCallBack(funCall, this);
            this.comboEffect.setPosition(x, y);
            this.comboEffect.addToLayer();
        };
        StageSceneFight.prototype.clearCombo = function () {
            this.curCombo = 0;
            this.comboLv = 1;
            if (this.comboEffect != null) {
                this.comboEffect.clear();
            }
            if (this.bComboBuff == true) {
                this.bComboBuff = false;
                this.clearBuff(false, zj.TableEnum.TableBufferType.BUFFER_DOUBLE_DEEP);
            }
        };
        StageSceneFight.prototype.procCombo = function (tick) {
            var self = this;
            if (self.curCombo <= 0) {
                return;
            }
            var _finish = self.comboEffect.update(tick);
            if (_finish == true) {
                self.clearCombo();
            }
        };
        StageSceneFight.prototype.createComboBuff = function (role, buffId, level) {
            if (role.bEnemy == false) {
                for (var k in this.tableAllys) {
                    var v = this.tableAllys[k];
                    v.beBuffHurt(level, buffId, role, null);
                }
            }
            else {
                for (var k in this.tableEnemys) {
                    var v = this.tableEnemys[k];
                    v.beBuffHurt(level, buffId, role, null);
                }
            }
        };
        StageSceneFight.prototype.clearBuff = function (bEnemy, sType) {
            if (bEnemy == false) {
                for (var k in this.tableAllys) {
                    var v = this.tableAllys[k];
                    v.removeBuffByType(sType);
                }
            }
            else {
                for (var k in this.tableEnemys) {
                    var v = this.tableEnemys[k];
                    v.removeBuffByType(sType);
                }
            }
        };
        StageSceneFight.prototype.clearMyTEfectBelongEnemy = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.clearEffectBelongRole(this.tableEnemys);
            }
        };
        StageSceneFight.prototype.getUiIndex = function (general) {
            var index = -1;
            for (var k in this.tablePosKey) {
                var v = this.tablePosKey[k];
                if (v == general.roleId) {
                    index = parseInt(k);
                    break;
                }
            }
            return index;
        };
        StageSceneFight.prototype.dealSkillUi = function (general) {
            var index = this.getUiIndex(general);
            if (index != -1 && this.mainmenu != null) {
                this.mainmenu.DealSkillUiEffect(general, index);
            }
        };
        StageSceneFight.prototype.dealDeathUi = function (general) {
            var index = this.getUiIndex(general);
            if (index != -1 && this.mainmenu != null) {
                this.mainmenu.DealDeathUiEffect(general, index);
            }
        };
        StageSceneFight.prototype.freshNewUi = function (role) {
            if (this.mainmenu != null) {
                this.mainmenu.FreshNewUi(role);
            }
        };
        StageSceneFight.prototype.closeMenuAni = function () {
            if (this.mainmenu != null) {
                this.mainmenu.CloseAni();
            }
        };
        StageSceneFight.prototype.handleTeachValue = function (role) {
            if (zj.teachBattle.teach_value[zj.Game.TeachSystem.curPart] != null) {
                var tbl = zj.teachBattle.teach_value[zj.Game.TeachSystem.curPart][zj.PlayerHunterSystem.GetGeneralId(role.roleId)];
                if (tbl != null) {
                    if (tbl.nq != null) {
                        role.setRage(tbl.nq);
                    }
                }
            }
        };
        // 创建本地援助
        StageSceneFight.prototype._createMyLocalSupport = function (pos, roleId) {
            var generalId = roleId;
            var aiId = -1;
            //let coordinateIndex = pos
            var coordinateIndex = 4;
            var teamIndex = pos - 1;
            var xx = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[coordinateIndex];
            var yy = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[coordinateIndex]);
            yy = zj.UIManager.StageHeight - yy;
            var floor = yy + zj.Gmgr.Instance.upY;
            var general = new zj.StagePersonLocalHelp(this.getRoleLayer(false, pos), false);
            general.creatLocal(generalId, zj.TableEnum.TableCampType.CAMP_TYPE_MY, zj.TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, xx, yy, zj.TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState, null);
            general.setVisible(false);
            general.openRageLimit();
            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;
            var item = { player: general, force: false };
            this.tableCollision.push(item);
            var senderId = this.tablePosKey[pos];
            if (senderId != undefined && senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableAllys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableAllys[senderId]);
            }
            return general;
        };
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
        StageSceneFight.prototype._createOppSupport = function (pos, generalInfo) {
            var generalId = generalInfo.general_id;
            var aiId = -1;
            //let coordinateIndex = pos
            var coordinateIndex = 5;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.tableRightStanceX[coordinateIndex];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Right_Mid_Y + zj.tableRightStanceY[coordinateIndex]);
            var floor = y + zj.Gmgr.Instance.upY;
            var general = new zj.StagePersonHelp(this.getRoleLayer(true, pos), false);
            general.creatPerson(generalInfo, aiId, zj.TableEnum.TableCampType.CAMP_TYPE_OTHER, zj.TableEnum.TablePositionType.POSITION_RIGHT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Left, true, 1.0, generalId, this.eStageState);
            general.setVisible(false);
            general.openRageLimit();
            this.tableEnemySupports[generalId] = general;
            this.tableEnemySptKey[pos] = generalId;
            var item = { player: general, force: true };
            this.tableCollision.push(item);
            var senderId = this.tableEnemyKey[pos];
            if (senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableEnemys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableEnemys[senderId]);
            }
            return general;
        };
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
        StageSceneFight.prototype.getMonsterPosInfo = function (pos, bTag) {
            var dis = 0;
            if (bTag == true) {
                dis = zj.FightDistanceConfig.Appear_Right_Mid_X;
            }
            else {
                if (this.monsterStage == zj.TableEnum.TableMonsterStage.MONSTER_STAGE_APPEAR) {
                    dis = zj.FightDistanceConfig.Appear_Right_Mid_X + zj.FightDistanceConfig.A;
                }
                else {
                    dis = zj.FightDistanceConfig.Appear_Right_Mid_X + (this.monsterStage - 1) * zj.FightDistanceConfig.B;
                }
            }
            var x = dis + zj.tableRightStanceX[pos];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Right_Mid_Y + zj.tableRightStanceY[pos]);
            var floor = y + zj.Gmgr.Instance.upY;
            return [x, y, floor];
        };
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
        StageSceneFight.prototype.initBuffs = function () {
        };
        StageSceneFight.prototype.initAdviser = function () {
            zj.Gmgr.Instance.leftAdviserId = this.curFormation.adviserId;
            zj.Gmgr.Instance.adviserLeftInfos = zj.Game.PlayerAdviserSystem.adviser;
            zj.Gmgr.Instance.adviserLeftAttriTbl = zj.Adviserlvdb.GetAllAdviserValueTbl(zj.Game.PlayerAdviserSystem.adviser, zj.Game.PlayerInfoSystem.BaseInfo);
            this.initAdviserSkills();
            this.initPokedexSkills();
            this.initPetSkills();
            this.initTitleSkills();
            this.initLeagueSkills();
            this.initSkinSkills();
        };
        StageSceneFight.prototype.initAdviserSkills = function () {
            zj.Gmgr.Instance.adviserSkills[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Adviserlvdb.GetAdviserSkills(zj.Game.PlayerAdviserSystem.adviser, zj.Game.PlayerInfoSystem.BaseInfo);
        };
        StageSceneFight.prototype.initPokedexSkills = function () {
            zj.Gmgr.Instance.pokedexSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Talentdb.GetPokedexSkills(zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds());
        };
        StageSceneFight.prototype.initPetSkills = function () {
            zj.Gmgr.Instance.petSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Adviserdb.GetPetFightSkill(zj.Game.PlayerAdviserSystem.petInfo);
        };
        StageSceneFight.prototype.initTitleSkills = function () {
            zj.Gmgr.Instance.titleSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Otherdb.GetTitleFightSkill(zj.Game.PlayerInfoSystem.BaseInfo.titleId);
        };
        StageSceneFight.prototype.initLeagueSkills = function () {
            zj.Gmgr.Instance.leagueSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Game.PlayerLeagueSystem.getSkillList();
        };
        StageSceneFight.prototype.initSkinSkills = function () {
            zj.Gmgr.Instance.skinSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.TableItemFashion.Table();
        };
        StageSceneFight.prototype.initStrategy = function () {
            //单个属性集合
            var index = zj.Adviserdb.GetIndexById(zj.Gmgr.Instance.leftAdviserId, zj.Gmgr.Instance.adviserLeftInfos);
            if (index == null) {
                return;
            }
            var adviserInfo = zj.Gmgr.Instance.adviserLeftInfos[index];
            if (adviserInfo != null && adviserInfo.strategies.length > 0) {
                zj.Gmgr.Instance.strategyLeftInfo = adviserInfo.strategies[0];
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
        };
        StageSceneFight.prototype.initOppStrategy = function () {
            //单个属性集合
            var index = zj.Adviserdb.GetIndexById(zj.Gmgr.Instance.rightAdviserId, zj.Gmgr.Instance.adviserRightInfos);
            if (index == null) {
                return;
            }
            var adviserInfo = zj.Gmgr.Instance.adviserRightInfos[index];
            if (adviserInfo != null && adviserInfo.strategies.length > 0) {
                zj.Gmgr.Instance.strategyRightInfo = adviserInfo.strategies[0];
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
        };
        StageSceneFight.prototype.initArtifact = function () {
            // Gmgr.Instance.artifactLeftTbl = Player.artifacts;
        };
        StageSceneFight.prototype.abandonFakeGeneral = function () {
            for (var i = 0; i < this.curFormation.supports.length; i++) {
                var key = this.curFormation.supports[i];
                if (key != 0) {
                    if (zj.Game.PlayerHunterSystem.queryHunter(key) == null) {
                        this.curFormation.supports[i] = 0;
                    }
                }
            }
        };
        StageSceneFight.prototype.getCurFormationGels = function () {
            var arr = zj.Game.PlayerFormationSystem.curFormations;
            var type = zj.Gmgr.Instance.fightType;
            var generals = arr[type - 1].generals;
            var reserves = arr[type - 1].reserves;
            var supports = arr[type - 1].supports;
            return [generals, reserves, supports];
        };
        StageSceneFight.prototype.initSupports = function () {
            var test = [0, 1, 2, 3];
            var arr = this.getCurFormationGels();
            var generals = arr[0];
            var reserves = arr[1];
            var supports = arr[2];
            for (var i = 0; i < test.length; i++) {
                var id = generals[test[i]];
                if (id != null && id > 0) {
                    var generalId = supports[test[i]];
                    if (generalId != null) {
                        var index = zj.Helper.getGeneralIndexById(generalId);
                        var generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
                        if (generalInfo != null) {
                            var general = this._createMySupport(test[i], generalInfo);
                            this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 3, true, null, null, null, false);
                        }
                        else {
                            if (zj.Device.isReviewSwitch) {
                                continue;
                            }
                            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                                continue;
                            }
                            var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Gmgr.Instance.fightType].maxMobID;
                            if (maxMobID >= zj.teachBattle.teach_fake_help.start_fake_stage_id && maxMobID <= zj.teachBattle.teach_fake_help.max_fake_stage_id) {
                                var curMobId = zj.Game.PlayerInstanceSystem.curInstances[zj.Gmgr.Instance.fightType].curMobID;
                                var tbl = zj.teachBattle.teach_fake_help[curMobId];
                                if (tbl != null && tbl[test[i]] != null) {
                                    if (zj.TableClientMonsterLocal.Item(tbl[test[i]]) != null) {
                                        this._createMyLocalSupport(test[i], tbl[test[i]]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        // 初始化特殊援护
        StageSceneFight.prototype.initMyYH = function () {
            this.tableRoleYH = null;
            if (!this.beInPvp()) {
                var id = zj.FightHelper.FIGHT_ASSISTANCE;
                if (zj.TableClientMonsterLocal.Item(id) != null) {
                    this.tableRoleYH = this._createMyLocalYH(zj.FightHelper.FIGHT_ASSISTANCE_IDX, id);
                }
            }
        };
        // 为特殊援护加怒气
        StageSceneFight.prototype.addRageYH = function (role, value) {
            if (this.tableRoleYH && role != this.tableRoleYH) {
                value = Math.max(1, Math.floor(value / 1));
                this.tableRoleYH.addRage(value);
            }
        };
        // 创建特殊援护
        StageSceneFight.prototype._createMyLocalYH = function (pos, roleId) {
            var generalId = roleId;
            var coordinateIndex = 4;
            var teamIndex = pos - 1;
            var xx = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[coordinateIndex];
            var yy = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[coordinateIndex]);
            yy = zj.UIManager.StageHeight - yy;
            var floor = yy + zj.Gmgr.Instance.upY;
            var general = new zj.StagePersonLocalYH(this.getRoleLayer(false, pos), false);
            general.creatLocal(generalId, zj.TableEnum.TableCampType.CAMP_TYPE_MY, zj.TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, xx, yy, zj.TableEnum.TableEnumDir.Dir_Right, false, 1.0, this.eStageState, null);
            general.setVisible(false);
            // general.openRageLimit();
            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;
            var item = { player: general, force: false };
            this.tableCollision.push(item);
            return general;
        };
        // 特殊援护放技能
        StageSceneFight.prototype.startHelpYH = function (general) {
            // this.tableRoleYH
            // dealSupport
            if (!this.isAllDie() && this.isGelSupportValid(general)) {
                this.helpRole = general;
                this.helpRoleAniBegin(this.helpRole);
                this.helpRole.dealCutRage(this.helpRole.getMaxRage());
                this.playSupportSkill(this.helpRole, this.helpRole);
                this.helpRole = null;
            }
        };
        StageSceneFight.prototype.initGeneralTalents = function () {
            var arr = this.getCurFormationGels();
            var generals = arr[0];
            var reserves = arr[1];
            var supports = arr[2];
            for (var k in generals) {
                var v = generals[k];
                if (v != 0) {
                    var _info = zj.Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        var _arr = zj.Talentdb.createPersonTalent(_info);
                        var _every = _arr[0];
                        var _personal = _arr[1];
                        zj.Talentdb.addTbl(zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT], _every);
                        zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;
                    }
                }
            }
            for (var k in reserves) {
                var v = reserves[k];
                if (v != 0) {
                    var _info = zj.Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        var _arr = zj.Talentdb.createPersonTalent(_info);
                        var _every = _arr[0];
                        var _personal = _arr[1];
                        zj.Talentdb.addTbl(zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT], _every);
                        zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;
                    }
                }
            }
            for (var k in supports) {
                var v = supports[k];
                if (v != 0) {
                    var _info = zj.Game.PlayerHunterSystem.allHuntersMap()[v];
                    if (_info != null) {
                        var _arr = zj.Talentdb.createPersonTalent(_info);
                        var _every = _arr[0];
                        var _personal = _arr[1];
                        zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v] = _personal;
                    }
                }
            }
        };
        StageSceneFight.prototype.initGenerals = function (reserveTag) {
            this.initGeneralTalents();
            var test = [0, 1, 2, 3];
            var arr = this.getCurFormationGels();
            var generals = arr[0];
            var reserves = arr[1];
            var supports = arr[2];
            //generals = [arr[0][1]];//这里写了个测试数据
            this.setReserveRec(reserves, this.tableAllysReserveRec);
            for (var i = 0; i < test.length; i++) {
                var id = generals[test[i]];
                if (id == null || id <= 0) {
                    if (reserveTag == true) {
                        var generalId = this.getReserveId(reserves, this.tableAllysReserveRec);
                        if (generalId == -1) {
                            continue;
                        }
                        else {
                            var index = zj.Helper.getGeneralIndexById(generalId);
                            var generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
                            var general = this._createMyGel(test[i], generalInfo);
                            this.searchGelnfo(general);
                            this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 2, true, null, null, null, true);
                        }
                    }
                    else {
                        continue;
                    }
                }
                else {
                    var generalId = generals[test[i]];
                    var index = zj.Helper.getGeneralIndexById(generalId);
                    var generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
                    var general = this._createMyGel(test[i], generalInfo);
                    this.searchGelnfo(general);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 1, true, null, null, null, false);
                }
            }
            this.roleAdd();
        };
        StageSceneFight.prototype.fillMyGeneral = function (pos) {
            return false;
        };
        StageSceneFight.prototype.synchroMyGelnfo = function (general) {
            var info = this.tableDeadCacheLeft[general.eTeamNum + 1];
            if (info != null) {
                general.setRage(info.cur_rage);
                general.setCurBeanNum(info.cur_bean);
                general.setPressCdTime(info.cur_skillCd);
                general.resetPressMaxCd();
            }
        };
        StageSceneFight.prototype.searchGelnfo = function (general) {
        };
        StageSceneFight.prototype.searchMonsterInfo = function (monster) {
        };
        StageSceneFight.prototype._createMySupport = function (pos, generalInfo) {
            var generalId = generalInfo.general_id;
            var aiId = -1;
            var coordinateIndex = 4;
            var teamIndex = pos - 1;
            var x = zj.FightDistanceConfig.Appear_Left_Mid_X + zj.tableLeftStanceX[coordinateIndex];
            var y = zj.adaptRoleY(zj.FightDistanceConfig.Appear_Left_Mid_Y + zj.tableLeftStanceY[coordinateIndex]);
            y = zj.UIManager.StageHeight - y;
            var floor = y + zj.Gmgr.Instance.upY;
            var general = new zj.StagePersonHelp(this.getRoleLayer(false, pos), false);
            general.creatPerson(generalInfo, aiId, zj.TableEnum.TableCampType.CAMP_TYPE_MY, zj.TableEnum.TablePositionType.POSITION_LEFT, teamIndex, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Right, false, 1.0, generalId, this.eStageState);
            general.setVisible(false);
            general.openRageLimit();
            this.tableAllySupports[generalId] = general;
            this.tableAllySptKey[pos] = generalId;
            var item = {};
            item["player"] = general;
            item["force"] = false;
            this.tableCollision.push(item);
            var senderId = this.tablePosKey[pos];
            if (senderId != null && senderId > 0) {
                //设置依赖援护武将
                this.tableAllys[senderId].setRelySupportRole(general);
                general.setSenderRole(this.tableAllys[senderId]);
            }
            return general;
        };
        StageSceneFight.prototype.initOppSupports = function () {
            var test = [0, 1, 2, 3];
            var supports = this.oppDetailInfo.supports;
            for (var i = 0; i < test.length; i++) {
                var info = supports[test[i]];
                if (info != null && info.general_id > 0) {
                    var general = this._createOppSupport(test[i], info);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 3, true, null, null, null, false);
                }
            }
        };
        StageSceneFight.prototype.initOppPvpTalent = function () {
            var generals = this.oppDetailInfo.generals;
            var reserves = this.oppDetailInfo.reserves;
            var supports = this.oppDetailInfo.supports;
            for (var k in generals) {
                var v = generals[k];
                if (v.general_id != 0) {
                    var _arr = zj.Talentdb.createPersonTalent(v);
                    var _every = _arr[0];
                    var _personal = _arr[1];
                    zj.Talentdb.addTbl(zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT], _every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }
            for (var k in reserves) {
                var v = reserves[k];
                if (v.general_id != 0) {
                    var _arr = zj.Talentdb.createPersonTalent(v);
                    var _every = _arr[0];
                    var _personal = _arr[1];
                    zj.Talentdb.addTbl(zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT], _every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }
            for (var k in supports) {
                var v = supports[k];
                if (v.general_id != 0) {
                    var _arr = zj.Talentdb.createPersonTalent(v);
                    var _every = _arr[0];
                    var _personal = _arr[1];
                    //Talentdb.addTbl(Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT], _every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_RIGHT][v.general_id] = _personal;
                }
            }
        };
        StageSceneFight.prototype.initOppPvp = function (reserveTag, appearTag, posTag) {
            this.initOppPvpTalent();
            var test = [0, 1, 2, 3];
            var generals = this.oppDetailInfo.generals;
            var reserves = this.oppDetailInfo.reserves;
            zj.Gmgr.Instance.formatRightWholeGels = zj.Helper.writeDetailFormat(this.oppDetailInfo);
            this.setDetailReserveRec(reserves, this.tableEnemysReserveRec);
            for (var i = 0; i < test.length; i++) {
                var info = generals[test[i]];
                if (info == null || info.general_id == 0) {
                    if (reserveTag == true) {
                        var info_1 = this.getReserveInfo(reserves, this.tableEnemysReserveRec, true, null);
                        if (info_1 == null) {
                            continue;
                        }
                        else {
                            var general = this._createOppGel(test[i], info_1, appearTag, posTag);
                            this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 2, false, zj.Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null);
                        }
                    }
                    else {
                        continue;
                    }
                }
                else {
                    var general = this._createOppGel(test[i], info, appearTag, posTag);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 1, false, zj.Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null);
                }
            }
        };
        StageSceneFight.prototype.fillOppGeneral = function (pos) {
            var reserves = this.oppDetailInfo.reserves;
            var info = this.getReserveInfo(reserves, this.tableEnemysReserveRec, true, null);
            if (info == null) {
                return false;
            }
            else {
                var general = this._createOppGel(pos, info, true, false);
                general.x = zj.Device.STANDARD_SCREEN_W;
                general.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
                this.synchroOppGelnfo(general);
                general.switchReserve();
                this.takeBtlGeneralInfo(this.replayBattleInfo.rightReplayInfo.generals, general, 2, false, zj.Game.PlayerBattleSystem.pvpOppBriefInfo, this.oppDetailInfo.advisers, this.oppDetailInfo.artifacts, null);
                this.pushSqueue(info.general_id, true);
            }
            return true;
        };
        StageSceneFight.prototype.synchroOppGelnfo = function (general) {
            var info = this.tableDeadCacheRight[general.eTeamNum + 1];
            if (info != null) {
                general.setRage(info.cur_rage);
                general.setCurBeanNum(info.cur_bean);
                general.setPressCdTime(info.cur_skillCd);
                general.resetPressMaxCd();
            }
        };
        StageSceneFight.prototype.getGeneralsNum = function (bEnemy, bOutside) {
            var num = 0;
            if (bEnemy == false) {
                num = zj.Helper.getObjLen(this.tableAllys);
                if (bOutside == true) {
                    num = num + this.getOutsideNum(false);
                }
            }
            else if (bEnemy == true) {
                num = zj.Helper.getObjLen(this.tableEnemys);
                if (bOutside == true) {
                    num = num + this.getOutsideNum(true);
                }
            }
            return num;
        };
        StageSceneFight.prototype.getGeneralsSexNum = function (sex) {
            var left = this._getSexNum(this.tableAllys, sex);
            var right = this._getSexNum(this.tableEnemys, sex);
            return left + right;
        };
        StageSceneFight.prototype._getSexNum = function (t, sex) {
            var num = 0;
            for (var k in t) {
                var v = t[k];
                if (v.bCall == false && v.sex == sex) {
                    num = num + 1;
                }
            }
            return num;
        };
        StageSceneFight.prototype.getOutsideNum = function (bEnemy) {
            if (bEnemy == false) {
                return this._getNum(this.tableAllysReserveRec);
            }
            else {
                return this._getNum(this.tableEnemysReserveRec);
            }
        };
        StageSceneFight.prototype._getNum = function (t) {
            var num = 0;
            for (var k in t) {
                var v = t[k];
                if (v == "outside") {
                    num = num + 1;
                }
            }
            return num;
        };
        StageSceneFight.prototype.setReserveRec = function (reserves, rec) {
            for (var i = 0; i < reserves.length; i++) {
                var id = reserves[i];
                if (id != null && id > 0) {
                    rec[id] = "outside";
                }
            }
            if (zj.Helper.getObjLen(rec) == 0) {
                rec[0] = "empty";
            }
        };
        StageSceneFight.prototype.setDetailReserveRec = function (reserves, rec) {
            for (var i = 0; i < reserves.length; i++) {
                if (reserves[i] != null) {
                    var id = reserves[i];
                    if (id != null && id > 0) {
                        rec[id] = "outside";
                    }
                }
            }
            if (zj.Helper.getObjLen(rec) == 0) {
                rec[0] = "empty";
            }
        };
        StageSceneFight.prototype.getReserveId = function (reserves, rec) {
            if (rec[0] == "empty") {
                return -1;
            }
            for (var i = 0; i < reserves.length; i++) {
                var id = reserves[i];
                if (id != null && id > 0) {
                    if (rec[id] == "outside") {
                        rec[id] = "fill";
                        return id;
                    }
                }
            }
            rec[0] = "empty";
            return -1;
        };
        StageSceneFight.prototype.isAllReserveAppear = function (reserves) {
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
        };
        StageSceneFight.prototype.getReserveInfo = function (reserves, rec, peg, posRec) {
            if (rec[0] == "empty") {
                return null;
            }
            for (var i = 0; i < reserves.length; i++) {
                var info = reserves[i];
                if (info != null && info.general_id > 0 && rec[info.general_id] == "outside") {
                    if (posRec != null) {
                        if (posRec.indexOf(info.general_id) == -1) {
                            return this.fill(info, rec, peg);
                        }
                    }
                    else {
                        return this.fill(info, rec, peg);
                    }
                }
            }
            if (peg == true) {
                rec[0] = "empty";
            }
            return null;
        };
        StageSceneFight.prototype.fill = function (info, rec, peg) {
            if (peg == true) {
                rec[info.general_id] = "fill";
            }
            return info;
        };
        StageSceneFight.prototype.creatEntryCd = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.creatEntryCd();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.creatEntryCd();
            }
        };
        StageSceneFight.prototype.updateBattleTime = function (tick) {
            console.log("updateBattleTime: " + tick + " - " + zj.Util.randomValue(10000, 20000));
            var self = this;
            if (self.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT || self.bTimingOn == false) {
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
        };
        StageSceneFight.prototype.getPlayerGelBtlInfo = function (generalId) {
            for (var i = 0; i < zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals.length; i++) {
                if (generalId == zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals[i].generalInfo.general_id) {
                    return zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals[i];
                }
            }
            return null;
        };
        StageSceneFight.prototype.getGelBtlInfo = function (generalId) {
            for (var i = 0; i < this.replayBattleInfo.leftReplayInfo.generals.length; i++) {
                if (generalId == this.replayBattleInfo.leftReplayInfo.generals[i].generalInfo.general_id) {
                    return this.replayBattleInfo.leftReplayInfo.generals[i];
                }
            }
            return null;
        };
        StageSceneFight.prototype.getTotalDamageValue = function () {
            var damage = 0;
            for (var i = 0; i < this.replayBattleInfo.leftReplayInfo.generals.length; i++) {
                damage = damage + this.replayBattleInfo.leftReplayInfo.generals[i].totalDamage;
            }
            return damage;
        };
        StageSceneFight.prototype.takeAllysBattleInfo = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                    this.takeRoleBattleInfo(this.generalBattleInfo, v);
                    this.varyGeneralDamage(this.replayBattleInfo.leftReplayInfo.generals, v, this.eStageState);
                }
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.varyGeneralDamage(this.replayBattleInfo.leftReplayInfo.generals, v, this.eStageState);
                }
            }
        };
        StageSceneFight.prototype.takeOppBattleInfo = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                if (v && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL) {
                    this.takeRoleBattleInfo(this.oppBattleInfo, v);
                    this.varyGeneralDamage(this.replayBattleInfo.rightReplayInfo.generals, v, this.eStageState);
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v && v.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                    this.varyGeneralDamage(this.replayBattleInfo.rightReplayInfo.generals, v, this.eStageState);
                }
            }
        };
        StageSceneFight.prototype.sortBattleInfoByDamage = function () {
            zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals.sort(function (a, b) {
                return (b.totalDamage + b.recoverValue) - (a.totalDamage + a.recoverValue);
            });
            zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.generals.sort(function (a, b) {
                return (b.totalDamage + b.recoverValue) - (a.totalDamage + a.recoverValue);
            });
        };
        StageSceneFight.prototype.statisticEnd = function () {
            if (zj.Gmgr.Instance.bReplay == false) {
                this.takeAllysBattleInfo();
                this.takeOppBattleInfo();
                this.takeUseBuff();
                this.replayBattleInfo.seed = this.fightSeed;
                this.replayBattleInfo.bgId = this.mapId;
                //this.replayBattleInfo.battleType = Gmgr.Instance.fightType;
                this.replayBattleInfo.helpMaxNum = 0; // 无用
                this.battleRole();
            }
        };
        StageSceneFight.prototype.takeUseBuff = function () {
            for (var k in zj.Gmgr.Instance.myUseBuffs) {
                var v = zj.Gmgr.Instance.myUseBuffs[k];
                if (v) {
                    this.replayBattleInfo.buffTypes.push(parseInt(k));
                }
            }
        };
        StageSceneFight.prototype.closeAiFight = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v != null && !v.bCall) {
                    v.setForceAi(true);
                    v.changeState(zj.TableEnum.TableEnumBaseState.State_None);
                    v.procState(0);
                }
            }
        };
        StageSceneFight.prototype.openAiFight = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v != null && !v.bCall) {
                    v.setForceAi(false);
                }
            }
        };
        StageSceneFight.prototype.staticFight = function () {
            this.bTimingOn = false;
            this.closeQueueBattle();
            this.closeAiFight(this.tableAllys);
            this.closeAiFight(this.tableEnemys);
            this.closeAiFight(this.tableAllySupports);
            this.closeAiFight(this.tableEnemySupports);
        };
        StageSceneFight.prototype.clearAllRoleBuffs = function () {
            this.clearAllBuffs(this.tableAllys);
            this.clearAllBuffs(this.tableEnemys);
            this.clearAllBuffs(this.tableAllySupports);
            this.clearAllBuffs(this.tableEnemySupports);
        };
        StageSceneFight.prototype.clearAllBuffs = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v != null) {
                    v.clearAllBuffs();
                }
            }
        };
        StageSceneFight.prototype.closeRoleUI = function (t) {
            // for (let k in t) {
            //     let v = t[k];
            //     if (v != null) {
            //v.closeRoleDcUI();
            //     }
            // }
        };
        StageSceneFight.prototype.getBeforeGelCount = function () {
            var generals = this.curFormation.generals;
            var reserves = this.curFormation.reserves;
            var num = 0;
            for (var i = 0; i < generals.length; i++) {
                if (generals[i] > 0) {
                    num = num + 1;
                }
            }
            for (var i = 0; i < reserves.length; i++) {
                if (reserves[i] > 0) {
                    num = num + 1;
                }
            }
            return num;
        };
        StageSceneFight.prototype.getFinalGelCount = function () {
            var num = 0;
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                if (v != null && !v.bCall && !v.bDead) {
                    num = num + 1;
                }
            }
            num = num + this.getOutsideNum(false);
            return num;
        };
        StageSceneFight.prototype.OnTouchDown = function () {
            return false;
        };
        StageSceneFight.prototype.OnTouchMove = function () {
            return false;
        };
        StageSceneFight.prototype.OnTouchUp = function () {
            return false;
        };
        StageSceneFight.prototype.isAllMonsterAppear = function () {
            return true;
        };
        StageSceneFight.prototype.isBossAppear = function () {
            return this.bBossAppear;
        };
        StageSceneFight.prototype.takeBtlGeneralInfo = function (t, general, type, b_left, baseInfo, advisers, artifacts, bMob) {
            if (general.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                return;
            }
            var arr = this.isGeneralInTable(t, general.roleId);
            var tag = arr[0];
            var index = arr[1];
            if (tag == false) {
                var battleGeneral = new message.BattleGeneralInfo;
                battleGeneral.stage = general.eAppearStage;
                battleGeneral.type = type;
                if (bMob == true) {
                    battleGeneral.generalInfo = general.getRoleInfo();
                    battleGeneral.pos = zj.yuan3(general.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getRealBtlPos());
                }
                else {
                    var roleInfo = general.getRoleInfo();
                    var result = zj.PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo);
                    roleInfo.attri = zj.Helper.tblConvertAttri(result);
                    battleGeneral.generalInfo = roleInfo;
                    battleGeneral.pos = zj.yuan3(general.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getTeamNum() + 1);
                }
                battleGeneral.totalDamage = 0;
                t.push(battleGeneral);
            }
            else {
                var obj = t[parseInt(index + "")];
                obj.stage = general.eAppearStage;
                obj.pos = zj.yuan3(general.roleType == zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP, 5, general.getTeamNum() + 1); //general.getTeamNum() + 1);
            }
        };
        StageSceneFight.prototype.isGeneralInTable = function (t, generalId) {
            for (var i = 0; i < t.length; i++) {
                if (t[i].generalInfo.general_id == generalId) {
                    return [true, i];
                }
            }
            return [false, -1];
        };
        StageSceneFight.prototype.takeRoleActionInfo = function (role) {
            var stageAction = new message.BattleStageAction;
            stageAction.generalId = role.roleId;
            stageAction.stage = role.eAppearStage;
            stageAction.pos = role.ePosition;
            stageAction.action = role.actions;
            for (var i = 0; i < this.replayBattleInfo.stageActions.length; i++) {
                var action = this.replayBattleInfo.stageActions[i];
                if (action.generalId == role.roleId && action.stage == role.eAppearStage && action.pos == role.ePosition) {
                    this.replayBattleInfo.stageActions[i] = stageAction;
                }
            }
            this.replayBattleInfo.stageActions.push(stageAction);
        };
        StageSceneFight.prototype.takeAllysActionsInfo = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                this.takeRoleActionInfo(v);
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                this.takeRoleActionInfo(v);
            }
        };
        StageSceneFight.prototype.takeOppActionsInfo = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                this.takeRoleActionInfo(v);
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                this.takeRoleActionInfo(v);
            }
        };
        StageSceneFight.prototype.getFreeCallPos = function (bEnemy) {
            if (bEnemy == false) {
                for (var i = zj.TableEnum.TableCallPos.CALL_POS_MAX - 1; i < zj.TableEnum.TableCallPos.CALL_POS_A; i--) {
                    if (this.isExit(this.tableAllyCallMobs, i) == false) {
                        return i;
                    }
                }
            }
            else {
                for (var i = zj.TableEnum.TableCallPos.CALL_POS_MAX - 1; i < zj.TableEnum.TableCallPos.CALL_POS_A; i--) {
                    if (this.isExit(this.tableEnemyCallMobs, i) == false) {
                        return i;
                    }
                }
            }
            return -1;
        };
        StageSceneFight.prototype.isExit = function (tbl, pos) {
            for (var i = 0; i < tbl.length; i++) {
                if (tbl[i] != null && tbl[i].eTeamNum == pos) {
                    return true;
                }
            }
            return false;
        };
        StageSceneFight.prototype.getCallMonsterCoord = function (bEnemy, pos, id) {
            var x = 0;
            var y = 0;
            // let floor_offset = monsterLocaldb.Instance(id).floor_offset;
            // if(bEnemy == false){
            //     x = tableLeftGeneral[1].coordinate.x + tableLeftCallX[pos+1];
            //     y = tableLeftGeneral[1].coordinate.y + floor_offset;
            // }else{
            //     x = tableRightGeneral[1].coordinate.x + tableRightCallY[pos+1];
            //     y = tableRightGeneral[1].coordinate.y + floor_offset;
            // }
            var floor = y + zj.Gmgr.Instance.upY;
            return [x, y, floor];
        };
        StageSceneFight.prototype.createCallMonster = function (monsterId, bEnemy, father, add, level) {
            var pos = this.getFreeCallPos(bEnemy);
            //位置已满
            if (pos == -1) {
                return;
            }
            var arr = this.getCallMonsterCoord(bEnemy, pos, monsterId);
            var x = arr[0];
            var y = arr[1];
            y = zj.UIManager.StageHeight - y;
            var floor = y; //arr[2];
            var monster = new zj.StageRoleCallMob(this.nodeCalls, false, monsterId); //StageRoleCallMob.new(this.nodeCalls, false, monsterId);
            // monster.setCallParam(father, 0, level);
            //monster.creatMonster(-1, yuan3( bEnemy == false, TableEnum.TableCampType.CAMP_TYPE_MY, TableEnum.TableCampType.CAMP_TYPE_OTHER), 
            // yuan3( bEnemy == false, TableEnum.TablePositionType.POSITION_LEFT, TableEnum.TablePositionType.POSITION_RIGHT), 
            // pos, floor, x, y, yuan3( bEnemy == false, TableEnum.TableEnumDir.Dir_Right, TableEnum.TableEnumDir.Dir_Left), bEnemy, 1.0, this.eStageState);
            monster.creatEntryCd();
            monster.setVisible(true);
            monster.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Appear);
            if (bEnemy == false) {
                this.tableAllyCallMobs.push(monster);
            }
            else {
                this.tableEnemyCallMobs.push(monster);
            }
        };
        //本地怪物
        StageSceneFight.prototype._createLocalMonster = function (pos, monsterId, isBoss, bTag, bDialog, realPos) {
            var arr = this.getMonsterPosInfo(pos, bTag);
            var x = arr[0];
            var y = arr[1];
            y = zj.UIManager.StageHeight - y;
            var floor = y; //arr[2];
            var monster = null;
            var scale = 1.0;
            if (isBoss == true) {
                this.bBossAppear = true;
                monster = new zj.StageRoleBoss(this.getRoleLayer(true, pos), false, monsterId); //StageRoleBoss.new(this.getRoleLayer(true,pos), false, monsterId);
                this.bossInstance = monster;
                scale = zj.ConstantConfig_RoleBattle.BOSS_BODY_SCALE_RADIO;
            }
            else {
                monster = new zj.StageRoleMobCommon(this.getRoleLayer(true, pos), false, monsterId); //StageRoleMobCommon.new(this.getRoleLayer(true,pos), false, monsterId);
            }
            monster.creatMonster(-1, zj.TableEnum.TableCampType.CAMP_TYPE_OTHER, zj.TableEnum.TablePositionType.POSITION_RIGHT, pos - 1, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Left, true, scale, this.eStageState);
            monster.setRealBtlPos(realPos);
            monster.creatEntryCd();
            this.handleTeachValue(monster);
            if (bDialog == false) {
                this.tableEnemys[monsterId] = monster;
                this.tableEnemyKey[pos] = monsterId;
                var item = { player: monster, force: true };
                this.tableCollision.push(item);
                this.roleAdd();
            }
            return monster;
        };
        StageSceneFight.prototype._createTeachMonster = function (pos, monsterId, isBoss, bTag) {
            var arr = this.getMonsterPosInfo(pos, bTag);
            var x = arr[0];
            var y = arr[1];
            var floor = arr[2];
            var monster = null;
            var scale = 1.0;
            if (isBoss == true) {
                this.bBossAppear = true;
                //monster = new (this.getRoleLayer(true, pos), false, monsterId);//StageRoleBossLocal.new(this.getRoleLayer(true,pos), false, monsterId);
                scale = zj.ConstantConfig_RoleBattle.BOSS_BODY_SCALE_RADIO;
            }
            else {
                //monster = new (this.getRoleLayer(true, pos), false, monsterId);//StageRoleMobLocal.new(this.getRoleLayer(true,pos), false, monsterId);
            }
            monster.creatMonster(-1, zj.TableEnum.TableCampType.CAMP_TYPE_OTHER, zj.TableEnum.TablePositionType.POSITION_RIGHT, pos - 1, floor, x, y, zj.TableEnum.TableEnumDir.Dir_Left, true, scale, this.eStageState);
            monster.creatEntryCd();
            this.tableEnemys[monsterId] = monster;
            this.tableEnemyKey[pos] = monsterId;
            var item = { player: monster, force: true };
            this.tableCollision.push(item);
            return monster;
        };
        StageSceneFight.prototype.checkOpenStory = function (stage) {
            this.dialogStage = stage;
        };
        StageSceneFight.prototype.procDialog = function (args) {
            if (this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_1ST) {
                this.procDialog_1st();
            }
            else if (this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_2ND) {
                this.procDialog_2nd();
            }
            else if (this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_3RD) {
                this.procDialog_3rd();
            }
            else if (this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_4TH) {
                this.procDialog_4th();
            }
            else if (this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_5TH) {
                this.procDialog_5th();
            }
        };
        StageSceneFight.prototype.procDialog_1st = function () {
            this.openRun();
        };
        StageSceneFight.prototype.procDialog_2nd = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_RULE;
        };
        StageSceneFight.prototype.procDialog_3rd = function () {
            this.nextStage();
            if (zj.Gmgr.Instance.bReplay == false) {
                this.battleRTime(this.stageMaxTime);
            }
        };
        StageSceneFight.prototype.procDialog_4th = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFight.prototype.createMainUi = function () {
            this.mainmenu = zj.newUI(zj.Fight_Main);
            //loadUI(Fight_Main).then((dialog: Fight_Main) => {
            //this.mainmenu = dialog;
            this.mainmenu.Init();
            this.addChild(this.mainmenu);
            zj.Game.EventManager.event(zj.GameEvent.SHOW_FIGHT_UI, { typeName: "zj.Fight_Main" });
            //});
        };
        StageSceneFight.prototype.hideMainUi = function () {
            if (this.mainmenu != null) {
                this.mainmenu.OnExit();
                if (this.mainmenu.parent) {
                    this.mainmenu.parent.removeChild(this.mainmenu);
                }
                this.mainmenu = null;
            }
        };
        StageSceneFight.prototype.OnExit = function () {
            this.hideMainUi();
            this.release();
            zj.FightNumberEffectMgr.Instance.removeFromLayer();
            // egret.clearInterval(this.tttt);
        };
        StageSceneFight.prototype.procDialog_5th = function () {
            this.goBalance();
        };
        StageSceneFight.prototype.isTimeUp = function () {
            if (this.battleTime <= 0) {
                return true;
            }
            return false;
        };
        StageSceneFight.prototype.goBalance = function (arg) {
            this.bBalance = true;
            this.lockPause();
            this.commonBalance();
        };
        StageSceneFight.prototype.goTimeUp = function () {
            this.lockPause();
            this.commonBalance();
        };
        StageSceneFight.prototype.commonBalance = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_SETTLE;
            //this.replayBattleInfo.battleFakeData = getTrackCheatData()
            this.closeMenuAni();
            this.staticFight();
            this.statisticEnd();
            this.clearAllRoleBuffs();
            this.hideRoles(this.tableAllySupports);
        };
        StageSceneFight.prototype.lockPause = function () {
            if (this.mainmenu != null) {
                this.mainmenu.LockPauseUi();
            }
        };
        StageSceneFight.prototype.beInPvp = function () {
            if (this.battleType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK
                || this.battleType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                || this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                || this.battleType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE
                || this.battleType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                return true;
            }
            return false;
        };
        StageSceneFight.prototype.initGeneralsPower = function () {
            var generals = this.curFormation.generals;
            var reserves = this.curFormation.reserves;
            var supports = this.curFormation.supports;
            this.formatPosNum = zj.Helper.getObjLen(generals) + zj.Helper.getObjLen(reserves) + zj.Helper.getObjLen(supports);
            this.commonInsterPower(this.tableGeneralsPower, generals);
        };
        StageSceneFight.prototype.commonInsterPower = function (vec, tbl) {
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
        };
        StageSceneFight.prototype.recordHpPer = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.recordHpPer();
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.recordHpPer();
            }
        };
        StageSceneFight.prototype.debugPrint = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.debugPrintAttri(true);
            }
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.debugPrintAttri(true);
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.debugPrintAttri(true);
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.debugPrintAttri(true);
            }
        };
        StageSceneFight.prototype.appearAllysPersonal = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.appearFight();
            }
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                v.appearSupportFight();
            }
        };
        StageSceneFight.prototype.startAllysPersonal = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.startFight();
            }
        };
        StageSceneFight.prototype.appearEnemyPersonal = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.appearFight();
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                v.appearSupportFight();
            }
        };
        StageSceneFight.prototype.startEnemyPersonal = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.startFight();
            }
        };
        StageSceneFight.prototype.startAllysStrategy = function () {
            for (var k in this.tableAllys) {
                var v = this.tableAllys[k];
                v.startStrategy();
            }
        };
        StageSceneFight.prototype.startEnemyStrategy = function () {
            for (var k in this.tableEnemys) {
                var v = this.tableEnemys[k];
                v.startStrategy();
            }
        };
        StageSceneFight.prototype.beOppAiCanBreak = function (bEnemy) {
            var tag = false;
            if (bEnemy == false) {
                if (this.beInPvp() == false) {
                    tag = this.isBossAiTagFun();
                }
                else {
                    tag = this.isAiTagFun(this.tableEnemys);
                }
            }
            else {
                tag = this.isAiTagFun(this.tableAllys);
            }
            return tag;
        };
        StageSceneFight.prototype.isBossAiTagFun = function () {
            var tag = false;
            if (this.bBossAppear == false) {
                var key = this.tableEnemyKey[zj.TableEnum.TableTeamNum.TEAM_NUM_B + 1];
                if (key != null) {
                    var role = this.tableEnemys[key];
                    if (role != null && role.bCall == false && role.bDead == false && role.curSkill != null) {
                        if (role.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && role.curSkill.getIsBreakTag() == false) {
                            tag = true;
                        }
                    }
                }
            }
            return tag;
        };
        StageSceneFight.prototype.isAiTagFun = function (t) {
            var tag = false;
            for (var k in t) {
                var v = t[k];
                if (v != null && v.bCall == false && v.bDead == false && v.curSkill != null) {
                    if (v.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && v.curSkill.getIsBreakTag() == false) {
                        tag = true;
                    }
                }
            }
            return tag;
        };
        StageSceneFight.prototype.setOppAiSkillTag = function (bEnemy) {
            var tag = false;
            if (bEnemy == false) {
                this.doAiTagFun(this.tableEnemys);
            }
            else {
                this.doAiTagFun(this.tableAllys);
            }
        };
        StageSceneFight.prototype.doAiTagFun = function (t) {
            var tag = false;
            for (var k in t) {
                var v = t[k];
                if (v != null && v.bCall == false && v.bDead == false && v.curSkill != null) {
                    if (v.curSkill.getSkillType() == message.ESkillType.SKILL_TYPE_DEATH && v.curSkill.getIsBreakTag() == false) {
                        v.curSkill.setIsBreakTag();
                    }
                }
            }
        };
        StageSceneFight.prototype.beMyAiCanRecover = function (role, bEnemy) {
            var tag = false;
            if (role != null && role.bCall == false && role.bDead == false) {
                if (bEnemy == false) {
                    tag = this.getSingleHp(this.tableAllys, zj.ConstantConfig_RoleBattle.AI_RECOVER_SINGLE_POINT);
                }
                else {
                    tag = this.getSingleHp(this.tableEnemys, zj.ConstantConfig_RoleBattle.AI_RECOVER_SINGLE_POINT);
                }
                if (tag == false) {
                    if (bEnemy == false) {
                        if (this.getAverageHp(this.tableAllys) <= zj.ConstantConfig_RoleBattle.AI_RECOVER_ALL_POINT) {
                            tag = true;
                        }
                    }
                    else {
                        if (this.getAverageHp(this.tableEnemys) <= zj.ConstantConfig_RoleBattle.AI_RECOVER_ALL_POINT) {
                            tag = true;
                        }
                    }
                }
            }
            return tag;
        };
        StageSceneFight.prototype.getAverageHp = function (t) {
            var sum = 0;
            var num = 0;
            for (var k in t) {
                var v = t[k];
                if (v != null && v.bCall == false && v.bDead == false) {
                    sum = sum + v.getHp() * 100 / v.getMaxHp();
                    num = num + 1;
                }
            }
            if (num == 0) {
                return 100;
            }
            else {
                return sum / num;
            }
        };
        StageSceneFight.prototype.getSingleHp = function (t, hp) {
            for (var k in t) {
                var v = t[k];
                if (v != null && v.bCall == false && v.bDead == false) {
                    if (v.getHp() * 100 / v.getMaxHp() <= hp) {
                        return true;
                    }
                }
            }
            return false;
        };
        StageSceneFight.prototype.setTargetPlayer = function (role, id, t) {
            role.still_target_effect = id;
            role.targetPlayers = t;
        };
        StageSceneFight.prototype.clearTargetPlayer = function (role) {
            role.still_target_effect = -1;
            role.targetPlayers = {};
        };
        StageSceneFight.prototype.modifySpeedData = function (speedIndex) {
            zj.Gmgr.Instance.setBattleSpeed(speedIndex);
            this.setCssSpeed(zj.Gmgr.Instance.battleSpeed);
        };
        StageSceneFight.prototype.startHelp = function (general) {
            this.dealSupport(general);
        };
        StageSceneFight.prototype.startOppHelp = function (general) {
            this.dealOppSupport(general);
        };
        StageSceneFight.prototype.isAllDie = function () {
            var tableRoles = this.tableAllys;
            for (var k in tableRoles) {
                if (tableRoles[k].getHp() > 0) {
                    return false;
                }
            }
            return true;
        };
        StageSceneFight.prototype.dealSupport = function (general) {
            var tag = this.isGelSupportValid(general.relySupportRole);
            if (tag) {
                this.helpRole = general.relySupportRole;
                this.senderHelpRole = general;
                this.helpRoleAniBegin(this.helpRole);
                //self:oppHelpRoleAniBegin(self.helpRole)
                // 主将相关
                this.senderHelpRole.dealCutRage(this.helpRole.getSupportConsume());
                this.senderHelpRole.triggerTouchSupportTalent();
                this.playSupportSkill(this.helpRole, this.senderHelpRole);
                this.helpRole = null;
                this.senderHelpRole = null;
            }
        };
        StageSceneFight.prototype.dealOppSupport = function (general) {
            var tag = this.isOppGelSupportValid(general.relySupportRole);
            if (tag) {
                this.oppHelpRole = general.relySupportRole;
                this.oppSenderHelpRole = general;
                this.oppHelpRoleAniBegin(this.oppHelpRole);
                //self:supportSkillBegin(sethislf.oppHelpRole)
                // 主将相关
                this.oppSenderHelpRole.dealCutRage(this.oppHelpRole.getSupportConsume());
                this.oppSenderHelpRole.triggerTouchSupportTalent();
                this.playSupportSkill(this.oppHelpRole, this.oppSenderHelpRole);
                this.oppHelpRole = null;
                this.oppSenderHelpRole = null;
            }
        };
        StageSceneFight.prototype.isGelSupportValid = function (supportGel) {
            var tag = false;
            if (supportGel != null) {
                if (supportGel.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && supportGel.curSkill != null) {
                    tag = false;
                }
                else {
                    if (this.helpRole != null) {
                        tag = false;
                    }
                    else {
                        tag = true;
                    }
                }
            }
            return tag;
        };
        StageSceneFight.prototype.isOppGelSupportValid = function (supportGel) {
            var tag = false;
            if (supportGel != null) {
                if (supportGel.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && supportGel.curSkill != null) {
                    tag = false;
                }
                else {
                    if (this.oppHelpRole != null) {
                        tag = false;
                    }
                    else {
                        tag = true;
                    }
                }
            }
            return tag;
        };
        StageSceneFight.prototype.checkSupportSkill = function (general) {
            var tag = false;
            var pos = general.eTeamNum + 1;
            var role_id = this.tableAllySptKey[pos];
            var helpG = null;
            if (role_id != null && role_id > 0) {
                helpG = this.tableAllySupports[role_id];
                if (helpG != null) {
                    if (helpG.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && helpG.curSkill != null) {
                        tag = false;
                    }
                    else {
                        if (this.oppHelpRole != null) {
                            tag = false;
                        }
                        else {
                            tag = true;
                        }
                    }
                }
            }
            return [tag, helpG];
        };
        StageSceneFight.prototype.playSupportSkill = function (helpRole, sender) {
            function callback() {
                helpRole.setNoticeTouchType(message.ESkillType.SKILL_TYPE_DEATH);
            }
            helpRole.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Appear);
            helpRole.setAppearCallback(callback, this);
            helpRole.setVisible(true);
            this.staticBegin(helpRole);
        };
        StageSceneFight.prototype.helpBgBegin = function () {
            this.nodeBlackShader.visible = true;
        };
        StageSceneFight.prototype.helpBgEnd = function () {
            this.nodeBlackShader.visible = false;
        };
        StageSceneFight.prototype.isHelpBgDestory = function () {
            var tag = true;
            for (var k in this.tableAllySupports) {
                var v = this.tableAllySupports[k];
                if (v.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && v.curSkill != null) {
                    tag = false;
                    break;
                }
            }
            for (var k in this.tableEnemySupports) {
                var v = this.tableEnemySupports[k];
                if (v.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack && v.curSkill != null) {
                    tag = false;
                    break;
                }
            }
            return tag;
        };
        StageSceneFight.prototype.loadOppHelpRole = function () {
            this.ani_oppHelpRole = zj.HunterSpineX(1, 1, null, zj.TableClientAniSpxSource.Item(zj.UIConfig.UIConfig_CommonBattleCss.json_help).name)[0];
            this.ani_oppHelpRole.spine.visible = false;
            this.ani_oppHelpRole.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent1, this);
            this.nodeUpEffect.addChild(this.ani_oppHelpRole.spine);
        };
        StageSceneFight.prototype.animationRoleEvent1 = function () {
            // this.nodeUpEffect.removeChild(this.ani_helpRole.spine);
            // this.ani_oppHelpRole.stopAllActions();
            // this.ani_oppHelpRole.clearSpine();
            // this.ani_oppHelpRole = null;
            this.ani_oppHelpRole.stopAllActions();
            this.ani_oppHelpRole.spine.visible = false;
            // this.ani_oppHelpRole.clearSpine();
            // this.ani_oppHelpRole = null;
        };
        StageSceneFight.prototype.oppHelpRoleAniBegin = function (role) {
            if (role == null) {
                return;
            }
            var item = zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.right;
            this.ani_oppHelpRole.spine.visible = true;
            this.ani_oppHelpRole.stopAllActions();
            this.ani_oppHelpRole.SetPosition(zj.Device.STANDARD_SCREEN_W, zj.Gmgr.Instance.floor);
            this.ani_oppHelpRole.ChangeAction(item.index);
            var body = new eui.Image();
            body.source = zj.cachekey(role.bodyPath, this);
            body.anchorOffsetX = 595 / 2;
            body.anchorOffsetY = 167 / 2;
            var slot = this.ani_oppHelpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role);
            slot.setDisplay(body);
            var body2 = new eui.Image(role.bodyPath);
            body2.anchorOffsetX = 595 / 2;
            body2.anchorOffsetY = 167 / 2;
            var slot2 = this.ani_oppHelpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role2);
            slot2.setDisplay(body2);
            var pressSkill = role.getPressSkill();
            if (pressSkill != null) {
                var name_1 = new eui.Image(pressSkill.skill_name_path);
                var slot_1 = this.ani_oppHelpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.word);
                slot_1.setDisplay(name_1);
            }
        };
        StageSceneFight.prototype.loadHelpRole = function () {
            this.ani_helpRole = zj.HunterSpineX(1, 1, null, zj.TableClientAniSpxSource.Item(zj.UIConfig.UIConfig_CommonBattleCss.json_help).name)[0];
            this.ani_helpRole.spine.visible = false;
            this.ani_helpRole.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationRoleEvent, this);
            this.nodeUpEffect.addChild(this.ani_helpRole.spine);
        };
        StageSceneFight.prototype.animationRoleEvent = function () {
            // this.nodeUpEffect.removeChild(this.ani_helpRole.spine);
            // this.ani_helpRole.stopAllActions();
            // this.ani_helpRole.clearSpine();
            // this.ani_helpRole = null;
            // this.ani_helpRole.clearSpine();
            // this.ani_helpRole = null;
            this.ani_helpRole.stopAllActions();
            this.ani_helpRole.spine.visible = false;
        };
        StageSceneFight.prototype.helpRoleAniBegin = function (role) {
            if (role == null) {
                return;
            }
            var item = zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.left;
            this.ani_helpRole.spine.visible = true;
            this.ani_helpRole.stopAllActions();
            this.ani_helpRole.SetPosition(0, zj.Gmgr.Instance.floor);
            this.ani_helpRole.ChangeAction(item.index);
            var body = new eui.Image();
            body.source = zj.cachekey(role.bodyPath, this);
            body.anchorOffsetX = 595 / 2;
            body.anchorOffsetY = 167 / 2;
            var slot = this.ani_helpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role2);
            slot.setDisplay(body);
            var body2 = new eui.Image(role.bodyPath);
            body2.anchorOffsetX = 595 / 2;
            body2.anchorOffsetY = 167 / 2;
            var slot2 = this.ani_helpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.role);
            slot2.setDisplay(body2);
            var pressSkill = role.getPressSkill();
            if (pressSkill != null) {
                var name_2 = new eui.Image(pressSkill.skill_name_path);
                var slot_2 = this.ani_helpRole.spine.armature.getSlot(zj.UIConfig.UIConfig_CommonBattleCss.HUNTER_HELP.skins.word);
                slot_2.setDisplay(name_2);
            }
        };
        StageSceneFight.prototype.loadKillerAni = function () {
            this.spx_bg = zj.HunterSpineX(1, 1, null, "zd_jisha")[0];
            this.spx_bg.SetPosition(zj.Device.STANDARD_SCREEN_W / 2, zj.Device.STANDARD_SCREEN_H / 2);
            this.spx_bg.ChangeAction(0);
            this.nodeDownEffect.addChild(this.spx_bg.spine);
            this.spx_bg.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFunSpx_bg, this);
            this.spx_up = zj.HunterSpineX(1, 1, null, "zd_jisha")[0];
            this.spx_up.SetPosition(zj.Device.STANDARD_SCREEN_W / 2, zj.Device.STANDARD_SCREEN_H / 2);
            this.spx_up.ChangeAction(1);
            this.nodeTip.addChild(this.spx_up.spine);
            this.spx_up.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFunSpx_up, this);
        };
        StageSceneFight.prototype.comStartFunSpx_bg = function () {
            if (this.spx_bg) {
                this.spx_bg.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.spx_bg.clearSpine();
                this.spx_bg = null;
            }
        };
        StageSceneFight.prototype.comStartFunSpx_up = function () {
            if (this.spx_up) {
                this.spx_up.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.comStartFun, this);
                this.spx_up.clearSpine();
                this.spx_up = null;
            }
        };
        StageSceneFight.prototype.getGelRow = function (bEnemy, index, p) {
            function getRow(tbl, teamIndex, pos) {
                var _t = [];
                for (var i = 0; i < 4; i++) {
                    for (var k in tbl) {
                        var v = tbl[k];
                        var num = v.eTeamNum + 1;
                        if (v.bDead == false && num == i) {
                            _t.push(num);
                        }
                    }
                }
                function findk(t, v) {
                    for (var k in t) {
                        var _v = t[k];
                        if (_v == v) {
                            return k;
                        }
                    }
                    return -1;
                }
                var a = findk(_t, teamIndex);
                if (a != -1) {
                    if (_t.length == 4) {
                        if (a == 2 || a == 3) {
                            return 2;
                        }
                        else if (a == 4) {
                            return 3;
                        }
                        else if (a == 1) {
                            return 1;
                        }
                    }
                    else if (_t.length == 3) {
                        return a;
                    }
                    else if (_t.length == 2) {
                        if (pos == 2) {
                            return 999;
                        }
                        else {
                            if (a == 1) {
                                return 1;
                            }
                            else if (a == 2) {
                                return 3;
                            }
                        }
                    }
                    else if (_t.length == 1) {
                        if (pos == 2) {
                            return 999;
                        }
                        else {
                            return pos;
                        }
                    }
                }
                return 999;
            }
            if (p == -1) {
                return -1;
            }
            if (bEnemy) {
                return getRow(this.tableEnemys, index, p);
            }
            else {
                return getRow(this.tableAllys, index, p);
            }
        };
        StageSceneFight.prototype.endHelp = function () {
            if (this.helpRole == null && this.oppHelpRole == null && this.isHelpBgDestory() == true) {
            }
        };
        return StageSceneFight;
    }(zj.StageScene));
    zj.StageSceneFight = StageSceneFight;
    __reflect(StageSceneFight.prototype, "zj.StageSceneFight");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFight.js.map