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
    var EnumEffectType;
    (function (EnumEffectType) {
        EnumEffectType[EnumEffectType["Effect_Type_None"] = 0] = "Effect_Type_None";
        EnumEffectType[EnumEffectType["Effect_Type_Skill_Common"] = 1] = "Effect_Type_Skill_Common";
        EnumEffectType[EnumEffectType["Effect_Type_Skill_Target"] = 2] = "Effect_Type_Skill_Target";
        EnumEffectType[EnumEffectType["Effect_Type_Tallent"] = 3] = "Effect_Type_Tallent";
        EnumEffectType[EnumEffectType["Effect_Type_Missile"] = 4] = "Effect_Type_Missile";
        EnumEffectType[EnumEffectType["Effect_Type_Num"] = 5] = "Effect_Type_Num";
    })(EnumEffectType = zj.EnumEffectType || (zj.EnumEffectType = {}));
    function getRandom(n, m) {
        if (n == null && m == null) {
            return Math.floor(Math.random() * 99999999);
        }
        else if (m == null) {
            return Math.floor(1 + Math.random() * n);
        }
        else if (m == n) {
            return n;
        }
        return Math.floor(Math.random() * (m - n) + n);
    }
    zj.getRandom = getRandom;
    function turnNum(tPosition, number) {
        if (tPosition == zj.TableEnum.TablePositionType.POSITION_LEFT) {
            return number;
        }
        else if (tPosition == zj.TableEnum.TablePositionType.POSITION_RIGHT) {
            return -number;
        }
    }
    zj.turnNum = turnNum;
    function turnDir(dir, number) {
        if (dir == zj.TableEnum.TableEnumDir.Dir_Right) {
            return number;
        }
        else if (dir == zj.TableEnum.TableEnumDir.Dir_Left) {
            return -number;
        }
    }
    zj.turnDir = turnDir;
    function getBuffRelate(level, id) {
        var tableBuff = zj.TableSkillBuff.Table(); //TableUtil.getInstance().getTableByName(StringConfig_Table.skillBuff)
        if (tableBuff[id] == null) {
            //console.log("skillBuff表id = " + id + "没有查找到")
            return;
        }
        var param = tableBuff[id].hit_rate;
        var baseType = tableBuff[id].base_type;
        var damageType = tableBuff[id].damage_type;
        var hitRate = param[0] + level * param[1];
        return [hitRate, baseType, damageType];
    }
    zj.getBuffRelate = getBuffRelate;
    function getBuffUseType(type) {
        var tableBaseBuff = zj.TableClientBuffBase.Table(); //TableUtil.getInstance().getTableByName(StringConfig_Table.buffBase)
        if (tableBaseBuff[type] == null) {
            //console.log("buffBase表id = " + type + "没有查找到")
            return;
        }
        return [tableBaseBuff[type].buff_profit, tableBaseBuff[type].is_fold, tableBaseBuff[type].fold_number];
    }
    zj.getBuffUseType = getBuffUseType;
    var SkillEffectBase = (function () {
        function SkillEffectBase() {
            // body	   
            // body	   
            this.effectLayer = null;
            this.effect_type = EnumEffectType.Effect_Type_None;
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
            this.effect_id = null;
            this.pzName = "";
            this.belong_skill = null;
            this.belong_role = null;
            this.belong_action = null;
            this.belong_parent = null;
            this.touch_role = null;
            this.effect_skill_type = message.EEffectType.EFFECT_TYPE_COLLISION;
            this.effect_target_pos = message.ETargetPosType.TARGET_POS_NONE;
            this.effect_target = message.ETargetId.TARGET_COLLISION;
            this.effect_next_type = message.EEffectType.EFFECT_TYPE_NONE;
            this.effect_point = [-1, -1, -1];
            this.continue_time = -1;
            this.next_id = -1;
            this.dis_x = 0;
            this.dis_y = 0;
            this.x = 0;
            this.y = 0;
            this.e_dir = -1;
            this.originalX = 0;
            this.originalY = 0;
            this.b_loop = false;
            this.b_finish = true;
            this.b_playBuff = false;
            this.b_playParticle = false;
            this.b_call = false;
            this.b_complete = false;
            this.b_shake = false;
            this.b_playSound = false;
            this.b_lockY = false;
            this.b_follow = false;
            this.b_floorEnd = false;
            this.b_blendActive = false;
            this.total_time = 0;
            this.hurt_gap = 0;
            this.cur_counter = 0;
            this.collision_counter = 0;
            this.hurt = null;
            this.sound_id = -1;
            this.sound_path = null;
            this.next_effect = null;
            this.spxAnimationFrame = -1;
            this.b_decay = false;
            this.decay_ratio = -1;
            this.collision_distance = -1;
            this.related_eff = null;
            this.DISPLACEMENT = {
                speed_x: 0,
                speed_y: 0,
                aspeed_x: 0,
                aspeed_y: 0,
                aspeed_time: 0,
                continue_time: 0
            };
            this.I = { eff_id: null, eff_info: null, eff_nxteff: null, eff_disp: null };
        }
        SkillEffectBase.prototype.setId = function (id) {
            this.effectLayer = null;
            this.effect_type = EnumEffectType.Effect_Type_None;
            this.fightScene = zj.StageSceneManager.Instance.GetCurScene();
            this.effect_id = id;
            this.pzName = "";
            this.belong_skill = null;
            this.belong_role = null;
            this.belong_action = null;
            this.belong_parent = null;
            this.touch_role = null;
            this.effect_skill_type = message.EEffectType.EFFECT_TYPE_COLLISION;
            this.effect_target_pos = message.ETargetPosType.TARGET_POS_NONE;
            this.effect_target = message.ETargetId.TARGET_COLLISION;
            this.effect_next_type = message.EEffectType.EFFECT_TYPE_NONE;
            this.effect_point = [-1, -1, -1];
            this.continue_time = -1;
            this.next_id = -1;
            this.dis_x = 0;
            this.dis_y = 0;
            this.x = 0;
            this.y = 0;
            this.e_dir = -1;
            this.originalX = 0;
            this.originalY = 0;
            this.b_loop = false;
            this.b_finish = true;
            this.b_playBuff = false;
            this.b_playParticle = false;
            this.b_call = false;
            this.b_complete = false;
            this.b_shake = false;
            this.b_playSound = false;
            this.b_lockY = false;
            this.b_follow = false;
            this.b_floorEnd = false;
            this.b_blendActive = false;
            this.total_time = 0;
            this.hurt_gap = 0;
            this.cur_counter = 0;
            this.collision_counter = 0;
            this.hurt = null;
            this.spx = null;
            this.sound_id = -1;
            this.sound_path = null;
            this.next_effect = null;
            this.spxAnimationFrame = -1;
            this.b_decay = false;
            this.decay_ratio = -1;
            this.collision_distance = -1;
            this.related_eff = null;
            var I = { eff_id: null, eff_info: null, eff_nxteff: null, eff_disp: null };
            I["eff_id"] = id;
            I["eff_info"] = zj.PlayerSkillSystem.EffectInfo(id);
            I["eff_nxteff"] = zj.PlayerSkillSystem.EffectInfo(I["eff_info"].next_effects_id);
            I["eff_disp"] = zj.PlayerSkillSystem.DisplacementInfo(I["eff_info"].displacement_id);
            this.I = I;
            this.polyFun();
        };
        SkillEffectBase.prototype.polyFun = function () {
        };
        SkillEffectBase.prototype.release = function () {
            // body   
            this.DISPLACEMENT.speed_x = 0,
                this.DISPLACEMENT.speed_y = 0,
                this.DISPLACEMENT.aspeed_x = 0,
                this.DISPLACEMENT.aspeed_y = 0,
                this.DISPLACEMENT.aspeed_time = 0,
                this.DISPLACEMENT.continue_time = 0;
            this.total_time = 0;
            zj.CC_SAFE_DELETE(this.hurt);
            this.hurt = null;
            zj.CC_SAFE_DELETE(this.next_effect);
            this.next_effect = null;
            //this.clearEffectLayer();
            if (this.spx) {
                this.spx.clearSpine();
                this.spx = null;
            }
            this.fightScene = null;
        };
        SkillEffectBase.prototype.init = function () {
            // body
            this.effect_skill_type = this.I.eff_info.effect_skill_type;
            this.effect_target_pos = this.I.eff_info.effect_target_pos;
            this.effect_target = this.I.eff_info.effect_target;
            this.b_loop = zj.booln(this.I.eff_info.is_repeat);
            this.b_follow = zj.booln(this.I.eff_info.is_follow_role);
            this.b_floorEnd = zj.booln(this.I.eff_info.is_floor_end);
            this.b_blendActive = zj.booln(this.I.eff_info.blend_active);
            this.b_lockY = zj.booln(this.I.eff_info.is_lockY);
            this.continue_time = this.I.eff_info.continue_time;
            this.next_id = this.I.eff_info.next_effects_id;
            if (this.I.eff_nxteff != null) {
                this.effect_next_type = this.I.eff_nxteff.effect_skill_type;
            }
            this.sound_id = this.I.eff_info.effect_sound_id;
            if (this.sound_id != -1) {
                var tableSound = zj.TableClientSoundResource.Table();
                this.sound_path = tableSound[this.sound_id].sound_path;
            }
            this.effect_point = this.I.eff_info.point_hurt;
            this.dis_x = this.I.eff_info.distance_role[0];
            this.dis_y = this.I.eff_info.distance_role[1];
            // this.dis_x = 0;//这里很尴尬需要修改
            if (this.I.eff_info.decay_ratio != -1) {
                this.b_decay = true;
                this.decay_ratio = this.I.eff_info.decay_ratio;
            }
            this.collision_distance = this.I.eff_info.collision_distance;
            if (this.I.eff_info.efficient_eff != -1) {
                this.related_eff = this.belong_role.getRelatedEffect(this.I.eff_info.efficient_eff);
            }
        };
        SkillEffectBase.prototype.initHand = function () {
            // body		
        };
        SkillEffectBase.prototype.loadArmature = function () {
            // body    
            if (this.I.eff_info.effects_spx_id != -1) {
                var order = void 0; // let order = 1
                this.spx = zj.HunterSpineX(this.I.eff_info.effects_spx_id, zj.Gmgr.Instance.spineX_scale * this.I.eff_info.effect_scale)[0];
                this.spx.SetAutoUpdate(false);
                this.spx.setVisibleSpx(false);
                this.addEffectLayer(order);
            }
        };
        SkillEffectBase.prototype.getArmaturePos = function () {
            // body 
            this.x = this.spx.getPositionX();
            this.y = this.spx.getPositionY();
        };
        SkillEffectBase.prototype.addEffectLayer = function (order) {
            // body	
            //revert
            /*this.effectLayer = new eui.Group;
            this.belong_role.nodeBody.addChild(this.spx.spine)
            this.spx.SetPosition(this.belong_role.x, this.belong_role.y);*/
            this.effectLayer = this.fightScene.getEffectLayer(this.belong_role);
            this.effectLayer.addChild(this.spx.spine);
            // this.effectLayer.visible = false;
        };
        SkillEffectBase.prototype.clearEffectLayer = function () {
            // body		
        };
        SkillEffectBase.prototype.loadHurt = function () {
            // body	
            if (this.I.eff_info.hurt_id != -1) {
                this.hurt = new zj.SkillHurt(this.I.eff_info.hurt_id);
            }
        };
        SkillEffectBase.prototype.loadNext = function () {
            // body		
            if (this.next_id != -1) {
                if (this.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET) {
                    // console.log("特效id：" + this.effect_id + "当前特效为指向性特效，不能有next")
                    //assert(false)
                }
                //if( this.effect_next_type == EEffectType.EFFECT_TYPE_COLLISION ){ 
                this.next_effect = new SkillEffect();
                this.next_effect.newSetData(this.next_id, this.belong_skill, this.belong_action, this);
                this.next_effect.initHand();
                //}
            }
        };
        SkillEffectBase.prototype.loadSpx = function () {
            // body
            this.loadArmature();
            this.loadHurt();
            this.loadNext();
        };
        SkillEffectBase.prototype.playEffect = function () {
            // body
            this.cleanHurtBodys();
            this.resetDist();
            // spx
            var tableSkillEffect = zj.TableSkillEffects.Table(); //CSV.GetTable(StringConfig_Table.skillEffects)    
            var spxActionId = this.I.eff_info.effects_action_id;
            var roleDir = this.belong_role.getDir();
            // 特效速度是根据人物挂钩的
            var playSpeed = this.belong_role.getPlayActionSpeed();
            // 针对不同场景处理
            if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS) {
                if (this.fightScene.bHideEffect == true && this.belong_role.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER) {
                    this.spx.setVisibleSpx(false);
                }
                else {
                    this.spx.setVisibleSpx(true);
                }
            }
            else {
                this.spx.setVisibleSpx(true);
            }
            if (this.b_blendActive == true) {
                this.spx.setBlendAdditive(true);
            }
            this.spx.setSpeedScale(playSpeed);
            var _a = this.handlePos(), rx = _a[0], ry = _a[1], roleScale = _a[2];
            //ry = 640 - ry;
            this.spx.setFlipX(zj.yuan3(roleScale > 0, false, true));
            this.spx.SetPosition(rx, ry - (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
            this.x = rx;
            this.y = ry - (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
            this.spx.stopAllActions();
            this.spx.SetLoop(this.b_loop);
            this.spx.ChangeAction(spxActionId);
            // other
            this.b_finish = false;
            this.b_playBuff = false;
            this.b_shake = false;
            this.collision_counter = 0;
            this.originalX = rx;
            this.originalY = ry;
            //this.update(0)
        };
        SkillEffectBase.prototype.handlePos = function () {
            //     
            return [0, 0, 1];
        };
        SkillEffectBase.prototype.updateCall = function (tick) {
            // body	
            if (this.b_call == false && this.I.eff_info.call_monsterbase != -1 && this.spxAnimationFrame >= this.I.eff_info.callFrame) {
                this.fightScene.createCallMonster(this.I.eff_info.call_monsterbase, this.belong_role.bEnemy, this.belong_role, 0, this.belong_skill);
                this.b_call = true;
            }
        };
        SkillEffectBase.prototype.update = function (tick) {
            // body
            if (this.b_finish == true) {
                return;
            }
            var rt = tick * 1000;
            if (this.cur_counter == 0) {
                this.spxAnimationFrame = this.spx.GetCurFrm();
                this.b_loopChange = this.spx.isLoopChange();
                this.updateShake(tick);
                this.updateRelateEff();
                var bEnd = this.updateSpx(tick);
                //wuzhi
                //if( bEnd == true ){ return true }
                this.total_time = this.total_time + rt;
                this.updateSound(tick);
                this.updateSpxOther(tick);
                this.updateHurt(tick);
                this.updateTargetHurt(tick);
                this.updateTargetBuff();
                this.updateParticle();
                this.updateBreakUnit();
                this.updateCall();
                this.updateEndSpx();
            }
            else if (this.cur_counter == 1) {
                this.next_effect.update(tick);
                var bFinish = this.next_effect.getIsFinish();
                if (bFinish == true) {
                    this.b_finish = true;
                }
            }
        };
        SkillEffectBase.prototype.updateRelateEff = function () {
            if (this.related_eff != null) {
                if (this.related_eff.getIsFinish() == true) {
                    this.changeNextOrEnd(true);
                }
            }
        };
        SkillEffectBase.prototype.updateSpx = function (tick) {
            // body	
            if (this.spx != null) {
                this.spx.UpdataAni(tick);
            }
        };
        SkillEffectBase.prototype.updateSpxOther = function (tick) {
            // body	    
            if (this.b_loop == false) {
                // condition 1
                if (this.b_complete == true) {
                    this.changeNextOrEnd(false);
                }
            }
            else {
                if (this.b_loopChange == true) {
                    if (zj.booln(this.I.eff_info.hurt_zone_reset)) {
                    }
                    if (zj.booln(this.I.eff_info.buff_zone_reset)) {
                        this.b_playBuff = false;
                    }
                    if (this.hurt != null) {
                        this.hurt.clearCollideInfo();
                    }
                }
                // condition 2
                if (this.total_time >= this.continue_time) {
                    this.changeNextOrEnd(true);
                }
                else {
                    if (this.hurt != null) {
                        var roleNum = this.hurt.getHurtRoleNum();
                        var curBodys = this.hurt.getHurtBodysNum();
                        // condition 3
                        if (roleNum != -1 && curBodys >= roleNum) {
                            this.changeNextOrEnd(true);
                        }
                    }
                }
            }
        };
        SkillEffectBase.prototype.updateHurt = function (tick) {
            // body
            if (this.hurt != null) {
                this.hurt.update(tick);
            }
        };
        SkillEffectBase.prototype.updateSpxDistance = function (tick) {
            // body
            var cheatDt = tick;
            //let rt = tick * 1000
            var rt = cheatDt * 1000;
            if (this.I.eff_disp != null) {
                if (this.total_time >= this.I.eff_info.start_move_time && this.total_time < this.DISPLACEMENT.continue_time) {
                    if (this.DISPLACEMENT.aspeed_time > 0) {
                        var tmpAccTime = rt;
                        this.DISPLACEMENT.aspeed_time = this.DISPLACEMENT.aspeed_time - rt;
                        if (this.DISPLACEMENT.aspeed_time < 0) {
                            tmpAccTime = tmpAccTime + this.DISPLACEMENT.aspeed_time;
                        }
                        var aaaaaa = this.DISPLACEMENT.speed_x;
                        this.DISPLACEMENT.speed_x = this.DISPLACEMENT.speed_x + this.DISPLACEMENT.aspeed_x * tmpAccTime;
                        this.DISPLACEMENT.speed_y = this.DISPLACEMENT.speed_y + this.DISPLACEMENT.aspeed_y * tmpAccTime;
                    }
                    var tmpX = 0;
                    var tmpY = this.DISPLACEMENT.speed_y * rt;
                    var roleDir = this.belong_role.getDir();
                    if (roleDir == zj.TableEnum.TableEnumDir.Dir_Right) {
                        tmpX = this.DISPLACEMENT.speed_x * rt;
                    }
                    else {
                        tmpX = -this.DISPLACEMENT.speed_x * rt;
                    }
                    this.x = this.spx.GetPosX() + tmpX / 1.3;
                    this.y = this.spx.GetPosY() - tmpY;
                    if (this.b_floorEnd == true) {
                        if (this.y <= zj.Gmgr.Instance.floor) {
                            this.y = zj.Gmgr.Instance.floor;
                            this.changeNextOrEnd(true);
                            this.spx.Stop();
                            return true;
                        }
                    }
                    this.spx.SetPosition(this.x, this.y);
                }
            }
            return false;
        };
        SkillEffectBase.prototype.updateShake = function (tick) {
            // body		
            if (zj.Gmgr.Instance.layerId != zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS) {
                if (this.belong_role.bDead == true) {
                    return;
                }
            }
            else {
                if (this.belong_role.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER) {
                    return;
                }
            }
            //if( this.belong_role.bDead == true ){ return }
            if (this.b_shake == true) {
                return;
            }
            if (this.belong_role.isVisible() == false) {
                return;
            }
            var bodyFrame = this.belong_role.getBodySpx().GetCurFrm();
            if (this.I.eff_info.shake_id != null && this.I.eff_info.shake_id != -1 && bodyFrame >= this.I.eff_info.shake_appear_frame) {
                this.fightScene.startShake(this.I.eff_info.shake_id);
                this.b_shake = true;
            }
        };
        SkillEffectBase.prototype.updateSound = function (tick) {
            if (this.sound_id == -1) {
                return;
            }
            if (this.spxAnimationFrame >= this.I.eff_info.sound_appear_frame && this.b_playSound == false) {
                this.b_playSound = true;
                if (this.sound_id != null) {
                    zj.Helper.EftByID(this.sound_id);
                }
            }
        };
        SkillEffectBase.prototype.updateParticle = function () {
            // body    
            if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS) {
                return;
            }
            if (this.I.eff_info.particle_id == -1) {
                return;
            }
            if (this.spxAnimationFrame >= this.I.eff_info.particle_frame && this.b_playParticle == false) {
                this.b_playParticle = true;
                //wuzhi 2
                //let particle = new SkillParticle(this.fightScene.getParticleLayer(), this.belong_role, this.I.eff_info.particle_id)
                //this.fightScene.addParticle(particle)
            }
        };
        SkillEffectBase.prototype.updateTargetBuff = function () {
            // body 
        };
        SkillEffectBase.prototype.updateTargetHurt = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            // body
        };
        SkillEffectBase.prototype.updateBreakUnit = function (args) {
            // body
            if (this.belong_action != null && this.belong_action.getIsContinueBreak() == true) {
                this.b_finish = true;
            }
        };
        SkillEffectBase.prototype.collisionEvent = function () {
            // body
            if (this.I.eff_info.collision_num <= 0) {
                return;
            }
            this.collision_counter = this.collision_counter + 1;
            if (this.collision_counter >= this.I.eff_info.collision_num) {
                this.changeNextOrEnd(false);
            }
        };
        SkillEffectBase.prototype.updateEndSpx = function (args) {
            // body
            if (this.b_complete == true) {
                return;
            }
            if (this.spx.IsActEnd()) {
                if (this.spx != null) {
                    this.spx.setVisibleSpx(false);
                }
                this.b_complete = true;
            }
        };
        SkillEffectBase.prototype.changeNextOrEnd = function (bClean) {
            // body
            if (this.next_effect != null) {
                this.cur_counter = 1;
                if (bClean == true) {
                    this.cleanHurtBodys();
                }
                //if( this.effect_next_type == EEffectType.EFFECT_TYPE_COLLISION ){
                this.next_effect.playEffect();
                //}
            }
            else {
                this.b_finish = true;
                this.spx.setVisibleSpx(false);
                this.cleanHurtBodys();
            }
            this.spx.Stop();
        };
        SkillEffectBase.prototype.setActInterval = function (scale) {
            if (this.cur_counter == 0) {
                if (this.spx != null) {
                    this.spx.setSpeedScale(scale);
                }
            }
            else if (this.cur_counter == 1) {
                this.next_effect.setActInterval(scale);
            }
            else {
                console.assert(false);
            }
        };
        SkillEffectBase.prototype.Pause = function () {
            if (this.cur_counter == 0) {
                if (this.spx != null) {
                    this.spx.Pause();
                }
            }
            else if (this.cur_counter == 1) {
                this.next_effect.Pause();
            }
            else {
                console.assert(false);
            }
        };
        SkillEffectBase.prototype.resume = function () {
            if (this.cur_counter == 0) {
                if (this.spx != null) {
                    this.spx.resume();
                }
            }
            else if (this.cur_counter == 1) {
                if (this.next_effect != null) {
                    this.next_effect.resume();
                }
            }
            else {
                console.assert(false);
            }
        };
        SkillEffectBase.prototype.addHurtOne = function (role) {
            // body	
            if (this.cur_counter == 0) {
                this.hurt.addHurtOne(role);
            }
            else if (this.cur_counter == 1) {
                if (this.next_effect != null) {
                    this.next_effect.addHurtOne(role);
                }
            }
            else {
                console.assert(false);
            }
        };
        SkillEffectBase.prototype.canHurtOne = function (role) {
            // body
            //assert( role != null )
            if (this.cur_counter == 0) {
                if (this.hurt != null) {
                    var bTag = this.hurt.canHurtOne(role);
                    if (bTag == true) {
                        if (this.next_effect != null) {
                            this.cur_counter = 1;
                            this.playEffect();
                        }
                        else {
                            this.b_finish = true;
                            this.cleanHurtBodys();
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else if (this.cur_counter == 1) {
                if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                    return this.next_effect.canHurtOne(role);
                }
                else {
                    return false;
                }
            }
            else {
                console.assert(false);
            }
            return false;
        };
        SkillEffectBase.prototype.cleanHurtBodys = function () {
            // body
            if (this.hurt != null) {
                this.hurt.cleanHurtBodys();
            }
        };
        SkillEffectBase.prototype.setPos = function (x, y) {
            // body
            if (this.cur_counter == 0) {
                this.x = x;
                this.y = y;
                if (this.spx != null) {
                    this.spx.SetPosition(x, y);
                }
            }
            else if (this.cur_counter == 1) {
                if (this.next_effect != null) {
                    this.next_effect.setPos(x, y);
                }
            }
            else {
                console.assert(false);
            }
        };
        SkillEffectBase.prototype.resetDist = function () {
            var effdisp = this.I.eff_disp;
            if (effdisp == null) {
                return;
            }
            var sX = effdisp.displacement_speed[zj.adjustIndex(1)];
            var sY = effdisp.displacement_speed[zj.adjustIndex(2)];
            var aX = effdisp.displacement_acceleration[zj.adjustIndex(1)];
            var aY = effdisp.displacement_acceleration[zj.adjustIndex(2)];
            var aTime = effdisp.acceleration_time;
            var cTime = effdisp.continue_time;
            this.setDisplacement(sX, sY, aX, aY, aTime, cTime);
        };
        SkillEffectBase.prototype.setDisplacement = function (sX, sY, aX, aY, aTime, cTime) {
            this.DISPLACEMENT.speed_x = sX;
            if (sX > 1) {
                console.log(111);
            }
            this.DISPLACEMENT.speed_y = sY;
            this.DISPLACEMENT.aspeed_x = aX;
            this.DISPLACEMENT.aspeed_y = aY;
            this.DISPLACEMENT.aspeed_time = aTime;
            this.DISPLACEMENT.continue_time = cTime;
        };
        SkillEffectBase.prototype.getPos = function () {
            // body
            var x = 0;
            var y = 0;
            if (this.cur_counter == 0) {
                x = this.x;
                y = this.y;
            }
            else if (this.cur_counter == 1) {
                if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                    this.next_effect.getPos(x, y);
                }
                else {
                    // do! need
                    // assert( false )
                }
            }
            else {
                console.assert(false);
            }
            return [x, y];
        };
        SkillEffectBase.prototype.setVisible = function (tag) {
            if (this.cur_counter == 0) {
                this.spx.setVisibleSpx(tag);
            }
            else if (this.cur_counter == 1) {
                if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                    return this.next_effect.setVisible(tag);
                }
                else {
                    // do! need
                    // assert( false )
                }
            }
        };
        SkillEffectBase.prototype.getEffectSpx = function () {
            // body
            if (this.b_finish != true) {
                if (this.cur_counter == 0) {
                    return this.spx;
                }
                else if (this.cur_counter == 1) {
                    if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                        return this.next_effect.getEffectSpx();
                    }
                    else {
                        // do! need
                        // assert( false )
                    }
                }
                else {
                    console.assert(false);
                }
            }
            return null;
        };
        SkillEffectBase.prototype.getEffectType = function (args) {
            if (this.cur_counter == 0) {
                return this.effect_type;
            }
            else {
                if (this.next_effect != null) {
                    return this.next_effect.getEffectType();
                }
            }
        };
        SkillEffectBase.prototype.getHurt = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            if (this.cur_counter == 0) {
                return this.hurt;
            }
            else if (this.cur_counter == 1) {
                if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                    return this.next_effect.getHurt();
                }
                else {
                    // do! need
                    // assert( false )
                }
            }
            else {
                console.assert(false);
            }
            return null;
        };
        SkillEffectBase.prototype.getHitEffectId = function () {
            // body
            if (this.cur_counter == 0) {
                var len = this.I.eff_info.hit_effects_ids.length;
                var index = getRandom(1, len);
                return [this.I.eff_info.hit_effects_ids[zj.adjustIndex(index)], this.I.eff_info.hit_effects_size];
            }
            else if (this.cur_counter == 1) {
                if (this.effect_next_type != message.EEffectType.EFFECT_TYPE_TARGET) {
                    return this.next_effect.getHitEffectId();
                }
                else {
                    // do! need
                    // assert( false )
                }
            }
            else {
                console.assert(false);
            }
            return -1;
        };
        SkillEffectBase.prototype.getIsFollowRole = function () {
            // body
            return this.b_follow;
        };
        SkillEffectBase.prototype.getIsFinish = function () {
            // body
            return this.b_finish;
        };
        SkillEffectBase.prototype.getEffectId = function () {
            // body
            return this.effect_id;
        };
        SkillEffectBase.prototype.getBelongRole = function () {
            // body
            return this.belong_role;
        };
        SkillEffectBase.prototype.getBelongSkill = function () {
            // body
            return this.belong_skill;
        };
        SkillEffectBase.prototype.getBelongUnit = function () {
            // body
            return this.belong_action;
        };
        SkillEffectBase.prototype.getAtkType = function () {
            // body
            return this.I.eff_info.effect_atk_type;
        };
        SkillEffectBase.prototype.getSkillType = function () {
            // body
            return this.effect_skill_type;
        };
        SkillEffectBase.prototype.getTarget = function () {
            // body
            return this.effect_target;
        };
        SkillEffectBase.prototype.getBreakPriority = function () {
            // body
            return this.I.eff_info.effect_break_priority;
        };
        SkillEffectBase.prototype.getBuffId = function () {
            // body
            return this.I.eff_info.effect_buff_id;
        };
        SkillEffectBase.prototype.setEffectType = function (effectType) {
            // body
            this.effect_type = effectType;
        };
        SkillEffectBase.prototype.isHighLight = function (args) {
            return zj.yuan3(this.belong_skill.skill_type == message.ESkillType.SKILL_TYPE_DEATH, true, false);
        };
        return SkillEffectBase;
    }());
    zj.SkillEffectBase = SkillEffectBase;
    __reflect(SkillEffectBase.prototype, "zj.SkillEffectBase");
    var SkillEffect = (function (_super) {
        __extends(SkillEffect, _super);
        function SkillEffect() {
            return _super.call(this) || this;
        }
        SkillEffect.prototype.newSetData = function (id, belong_skill, belong_action, belong_parent) {
            this.setId(id);
            this.polyFun();
            this.CtorMore(belong_skill, belong_action, belong_parent);
            this.init();
        };
        SkillEffect.prototype.polyFun = function () {
            this.setEffectType(EnumEffectType.Effect_Type_Skill_Common);
        };
        SkillEffect.prototype.CtorMore = function (belong_skill, belong_action, belong_parent) {
            this.belong_skill = belong_skill;
            this.belong_role = belong_skill.getBelongRole();
            this.belong_action = belong_action;
            this.belong_parent = belong_parent;
        };
        SkillEffect.prototype.initHand = function () {
            // body	    
            this.loadSpx();
        };
        SkillEffect.prototype.handlePos = function () {
            // body
            var _a = [0, 0], rx = _a[0], ry = _a[1];
            var roleScale = this.belong_role.getScale();
            if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                roleScale = turnNum(this.belong_role.ePosition, 1);
            }
            else {
                roleScale = turnDir(this.belong_role.dir, 1);
            }
            if (this.I.eff_info.effect_target == message.ETargetId.TARGET_MAP) {
                if ((this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT && this.effect_target_pos == message.ETargetPosType.TARGET_POS_ENEMY)
                    || (this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_RIGHT && this.effect_target_pos == message.ETargetPosType.TARGET_POS_MINE)) {
                    rx = this.I.eff_info.distance_map[0];
                    ry = this.I.eff_info.distance_map[1]; ///(UIManager.StageWidth/960)
                    ry = (zj.UIManager.StageHeight - ry); ///(UIManager.StageHeight/ Device.STANDARD_SCREEN_H);
                }
                else {
                    rx = zj.UIManager.StageWidth - (this.I.eff_info.distance_map[0] * (zj.UIManager.StageWidth / zj.Device.STANDARD_SCREEN_W)) - this.fightScene.fightRoot.x;
                    ry = (this.I.eff_info.distance_map[1]); ///(UIManager.StageWidth/960)
                    ry = zj.UIManager.StageHeight - ry;
                    if (this.spx.name != "zi_yanwu_eff") {
                        var a = void 0;
                    }
                }
            }
            else {
                if (this.belong_parent != null && this.belong_parent.effect_type == EnumEffectType.Effect_Type_Skill_Common) {
                    rx = this.belong_parent.spx.getPositionX();
                    ry = this.belong_parent.spx.getPositionY();
                }
                else {
                    var roleDir = this.belong_role.getDir();
                    var face = -1;
                    if (roleDir == zj.TableEnum.TableEnumDir.Dir_Right) {
                        face = 1;
                    }
                    var _x = this.belong_role.getPosX();
                    var _y = this.belong_role.getPosY();
                    rx = _x + face * this.dis_x * Math.abs(roleScale);
                    ry = _y - this.dis_y * Math.abs(roleScale);
                }
            }
            return [rx, ry, roleScale];
        };
        SkillEffect.prototype.updateSpx = function (tick) {
            // body    	
            _super.prototype.updateSpx.call(this, tick);
            if (this.b_follow == true) {
                this.updateSpxFollow(tick);
            }
            else {
                this.updateSpxDistance(tick);
            }
        };
        SkillEffect.prototype.updateSpxFollow = function (tick) {
            // body		
            var roleDir = this.belong_role.getDir();
            var roleX = this.belong_role.getPosX();
            var roleY = this.belong_role.getPosY();
            var roleScale = this.belong_role.getScale();
            var face = -1;
            if (roleDir == zj.TableEnum.TableEnumDir.Dir_Right) {
                face = 1;
            }
            var rx = roleX + face * this.dis_x * Math.abs(roleScale);
            if (this.b_lockY == false) {
                var ry = roleY - this.dis_y * Math.abs(roleScale);
            }
            else {
                var ry = zj.Gmgr.Instance.floor;
            }
            this.spx.SetPosition(rx, ry);
        };
        SkillEffect.prototype.clearEffectLayer = function () {
            // body	
            this.effectLayer.removeChild(this.spx.spine, true);
        };
        return SkillEffect;
    }(SkillEffectBase));
    zj.SkillEffect = SkillEffect;
    __reflect(SkillEffect.prototype, "zj.SkillEffect");
    var TalentHurtEffect = (function (_super) {
        __extends(TalentHurtEffect, _super);
        function TalentHurtEffect() {
            var _this = _super.call(this) || this;
            _this.talent_effect = null;
            _this.belong_talent = null;
            return _this;
        }
        TalentHurtEffect.prototype.newSetData = function (id, belong_talentEffect) {
            _super.prototype.setId.call(this, id);
            this.polyFun();
            this.CtorMore(belong_talentEffect);
            this.init();
        };
        TalentHurtEffect.prototype.polyFun = function () {
            this.setEffectType(EnumEffectType.Effect_Type_Tallent);
        };
        TalentHurtEffect.prototype.CtorMore = function (belong_talentEffect) {
            // body
            // 天赋产生天赋效果，天赋效果为 产生一个碰撞特效
            this.talent_effect = belong_talentEffect;
            this.belong_talent = belong_talentEffect.belong_talent;
            this.belong_role = belong_talentEffect.target_role;
        };
        TalentHurtEffect.prototype.initHand = function () {
            // body	    
            this.loadSpx();
        };
        TalentHurtEffect.prototype.handlePos = function () {
            // body
            var rx = this.belong_role.getPosX();
            var ry = this.belong_role.getPosY();
            var roleScale = turnNum(this.belong_role.ePosition, 1);
            var roleDir = this.belong_role.getDir();
            var face = -1;
            if (roleDir == zj.TableEnum.TableEnumDir.Dir_Right) {
                face = 1;
            }
            if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                rx = rx + face * this.dis_x * Math.abs(roleScale);
                ry = ry - this.dis_y * Math.abs(roleScale);
            }
            else {
                rx = this.belong_role.x + face * this.dis_x * Math.abs(roleScale);
                ry = this.belong_role.y - this.dis_y * Math.abs(roleScale);
            }
            return [rx, ry, roleScale];
        };
        TalentHurtEffect.prototype.updateSpx = function (tick) {
            // body    	
            _super.prototype.updateSpx.call(this, tick);
        };
        TalentHurtEffect.prototype.clearEffectLayer = function () {
            // body	
            this.effectLayer.removeChild(this.spx.spine, true);
        };
        return TalentHurtEffect;
    }(SkillEffectBase));
    zj.TalentHurtEffect = TalentHurtEffect;
    __reflect(TalentHurtEffect.prototype, "zj.TalentHurtEffect");
    var SkillEffectTimely = (function (_super) {
        __extends(SkillEffectTimely, _super);
        function SkillEffectTimely() {
            var _this = _super.call(this) || this;
            _this.target_role = null;
            return _this;
        }
        SkillEffectTimely.prototype.newSetData = function (id, belong_skill, target_role, belong_action) {
            _super.prototype.setId.call(this, id);
            this.polyFun();
            this.CtorMore(belong_skill, belong_action, target_role);
            this.init();
        };
        SkillEffectTimely.prototype.polyFun = function () {
            this.setEffectType(EnumEffectType.Effect_Type_Skill_Target);
        };
        SkillEffectTimely.prototype.CtorMore = function (belong_skill, belong_action, target_role) {
            this.belong_skill = belong_skill;
            this.belong_role = belong_skill.getBelongRole();
            this.belong_action = belong_action;
            this.target_role = target_role;
            this.touch_role = target_role;
        };
        SkillEffectTimely.prototype.initHand = function () {
            // body	
            this.loadSpx();
        };
        SkillEffectTimely.prototype.clearEffectLayer = function () {
            // body
            this.effectLayer.removeChild(this.spx.spine, true);
        };
        SkillEffectTimely.prototype.handlePos = function () {
            // 
            // let roleDir = this.target_role.getDir()
            var roleScale = this.target_role.getScale();
            var _a = [0, 0], rx = _a[0], ry = _a[1];
            // let roleX = this.target_role.getPosX();
            // let roleY = this.target_role.getPosY();
            // let face = -1;
            // if( roleDir == TableEnum.TableEnumDir.Dir_Right ){ face = 1 }	    
            // rx = roleX + face * this.dis_x * Math.abs(roleScale);
            // if( this.b_lockY == false ){
            //     ry = roleY - this.dis_y * Math.abs(roleScale);
            // }else{
            //     ry = UIManager.StageHeight-230;
            // }
            var rectRole = this.target_role.body.getRect();
            rx = this.target_role.x;
            ry = this.target_role.y - rectRole.height / 2;
            return [rx, ry, roleScale];
        };
        SkillEffectTimely.prototype.updateSpx = function (tick) {
            // body    	
            _super.prototype.updateSpx.call(this, tick);
            //if( this.b_follow == true ){
            if (this.b_follow == true) {
                this.updateSpxFollow(tick);
            }
            else {
                this.updateSpxDistance(tick);
            }
        };
        SkillEffectTimely.prototype.updateSpxFollow = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body		
            var roleDir = this.target_role.getDir();
            var roleX = this.target_role.getPosX();
            var roleY = this.target_role.getPosY();
            var roleScale = this.target_role.getScale();
            var face = -1;
            if (roleDir == zj.TableEnum.TableEnumDir.Dir_Right) {
                face = 1;
            }
            var rx = roleX + face * this.dis_x * Math.abs(roleScale);
            if (this.b_lockY == false) {
                var ry = roleY - this.dis_y * Math.abs(roleScale);
            }
            else {
                var ry = zj.Gmgr.Instance.floor;
            }
            this.spx.SetPosition(rx, ry);
        };
        SkillEffectTimely.prototype.updateTargetBuff = function () {
            // body   
            if (this.effect_target == message.ETargetId.TARGET_COLLISION || this.b_playBuff == true) {
                return;
            }
            if (this.I.eff_info.effect_buff_id != -1 && this.spxAnimationFrame >= this.I.eff_info.buff_appear_frame) {
                this.b_playBuff = true;
                var _a = getBuffRelate(1, this.I.eff_info.effect_buff_id), hitRate = _a[0], baseType = _a[1], damageType = _a[2];
                var useType = void 0, is_fold = getBuffUseType(baseType);
                if (this.target_role.beCanHurt() == true || useType == zj.TableEnum.TableBuffUseType.Buff_Use_Good) {
                    this.target_role.beTargetEffectBuff(this, this.belong_role);
                }
            }
        };
        SkillEffectTimely.prototype.updateTargetHurt = function (tick) {
            // body        
            if (this.effect_target == message.ETargetId.TARGET_COLLISION) {
                return;
            }
            if (this.effect_point[1] == -1) {
                return;
            }
            if (this.spxAnimationFrame >= this.effect_point[1] && this.spxAnimationFrame < this.effect_point[2]) {
                if (this.hurt_gap == 0) {
                    if (zj.Gmgr.Instance.layerId != zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS && this.target_role.beCanHurt() == true && this.belong_role.bDead == false) {
                        // 直接给敌人施加hurt
                        this.target_role.beTargetEffectHurt(this, this.belong_role);
                    }
                    else if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS) {
                        // 直接给敌人施加hurt
                        this.target_role.beTargetEffectHurt(this, this.belong_role);
                    }
                }
                this.hurt_gap = this.hurt_gap + tick * 1000;
                if (this.hurt_gap >= this.effect_point[3]) {
                    this.hurt_gap = 0;
                }
            }
        };
        return SkillEffectTimely;
    }(SkillEffectBase));
    zj.SkillEffectTimely = SkillEffectTimely;
    __reflect(SkillEffectTimely.prototype, "zj.SkillEffectTimely");
    //////////////////////////////////////////////////////////////////////////////-
    // 导弹跟踪特效
    var MissileEffect = (function (_super) {
        __extends(MissileEffect, _super);
        function MissileEffect() {
            var _this = _super.call(this) || this;
            _this.track_role = null;
            _this._targetPoint = new egret.Point();
            _this._thisPoint = new egret.Point();
            return _this;
        }
        MissileEffect.prototype.newSetData = function (id, belong_skill, belong_action, belong_parent) {
            _super.prototype.newSetData.call(this, id, belong_skill, belong_action, belong_parent);
            this.polyFun();
            this.initTrack();
        };
        MissileEffect.prototype.polyFun = function () {
            this.setEffectType(EnumEffectType.Effect_Type_Missile);
        };
        MissileEffect.prototype.initTrack = function () {
            var players = this.fightScene.getTargetPlayer(this.belong_role, this.effect_target_pos, this.effect_target);
            if (players.length != 0) {
                this.track_role = players[zj.adjustIndex(1)];
            }
        };
        MissileEffect.prototype.updateSpx = function (tick) {
            // body   
            _super.prototype.updateSpx.call(this, tick);
            this.updateTrack(tick);
        };
        MissileEffect.prototype.updateTrack = function (tick) {
            // body
            var speed = this.I.eff_info.missile_speed;
            if (speed <= 0) {
                speed = 0;
            }
            var rt = tick * 1000;
            if (this.track_role == null) {
                return;
            }
            var _a = this.track_role.getMidPos(), _t_x = _a[0], _t_y = _a[1];
            this._targetPoint.setTo(_t_x, _t_y);
            var _b = this.getPos(), _x = _b[0], _y = _b[1];
            this._thisPoint.setTo(_x, _y);
            var delta = this._targetPoint.subtract(this._thisPoint);
            var distance = egret.Point.distance(this._thisPoint, this._targetPoint);
            var x2 = this._thisPoint.x + speed * rt * delta.x / distance;
            var y2 = this._thisPoint.y + speed * rt * delta.y / distance;
            if (100 > distance) {
                return;
            }
            this.x = x2;
            this.y = y2;
            this.spx.SetPosition(this.x, this.y);
            var x1 = this._thisPoint.x;
            var y1 = this._thisPoint.y;
            var deltaRotation = 90 - Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            this.spx.setRotation(deltaRotation);
        };
        return MissileEffect;
    }(SkillEffect));
    zj.MissileEffect = MissileEffect;
    __reflect(MissileEffect.prototype, "zj.MissileEffect");
})(zj || (zj = {}));
//# sourceMappingURL=SkillEffect.js.map