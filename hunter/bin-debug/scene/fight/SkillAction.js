var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillAction = (function () {
        function SkillAction() {
            // body	
            this.belong_role = null;
            this.belong_skill = null;
            this.belong_unit = null;
            this.action_id = null;
            this.hurt = null;
            this.b_finish = true;
            this.b_play = false;
            this.skill_type = null;
            this.fight_scene = null;
            this.tablePlayRec = {};
            this.disp_tick = 0;
            this.collision_counter = 0;
            this.b_lockY = false;
            //public related_action = null
            // 持续施法相关
            this.b_continue = false;
            this.b_continue_break = false;
            // 格挡相关
            this.b_hasParryed = false;
            // 与天赋70相关
            this.totalLostHp = 0;
            this.DISPLACEMENT = { speed_x: 0, speed_y: 0, aspeed_x: 0, aspeed_y: 0, aspeed_time: 0, continue_time: 0 };
            this.I = { actid: null, act: null, roledisp: null };
            this.is_repeat = null;
            this.continue_time = null;
            this.spxAnimationFrame = null;
            // body	
        }
        SkillAction.prototype.newSetData = function (belong_role, belong_skill, id, belong_unit) {
            this.belong_role = belong_role;
            this.belong_skill = belong_skill;
            this.belong_unit = belong_unit;
            this.action_id = id;
            this.hurt = null;
            this.b_finish = true;
            this.b_play = false;
            this.skill_type = this.belong_skill.getSkillType();
            this.fight_scene = zj.StageSceneManager.Instance.GetCurScene();
            this.tablePlayRec = {};
            this.disp_tick = 0;
            this.collision_counter = 0;
            this.b_lockY = false;
            //this.related_action = null
            // 持续施法相关
            this.b_continue = false;
            this.b_continue_break = false;
            // 格挡相关
            this.b_hasParryed = false;
            // 与天赋70相关
            this.totalLostHp = 0;
            // let I:any  = {};
            this.I.actid = id;
            this.I.act = zj.PlayerSkillSystem.ActionInfo(id);
            this.I.roledisp = zj.PlayerSkillSystem.ActionDisplacement(this.I.act.role_displacement_id);
            this.init();
        };
        SkillAction.prototype.release = function () {
            // body
            this.fight_scene = null;
            this.I.actid = null;
            this.I.act = null;
            this.I.roledisp = null;
        };
        SkillAction.prototype.init = function () {
            // body
            if (this.I.act.hurt_id != -1) {
                //this.hurt = new SkillHurt(this.belong_skill, this.I.act.hurt_id)
                this.hurt = new zj.SkillHurt(this.I.act.hurt_id);
            }
            if (this.I.act.effects_id.length != this.I.act.effects_appear_frame.length) {
                //console.log("skill_action id " + this.I.actid + " the num of effects_id is ! equal the num of frame ")
                //assert(false)
            }
            this.b_lockY = zj.booln(this.I.act.is_lockY);
            //this.efficient_action = this.I.act.efficient_frame
        };
        SkillAction.prototype.resetDist = function () {
            var roledisp = this.I.roledisp;
            if (roledisp == null) {
                return;
            }
            var sX = roledisp.displacement_speed[zj.adjustIndex(1)];
            var sY = roledisp.displacement_speed[zj.adjustIndex(2)];
            var aX = roledisp.displacement_acceleration[zj.adjustIndex(1)];
            var aY = roledisp.displacement_acceleration[zj.adjustIndex(2)];
            var aTime = roledisp.acceleration_time;
            var cTime = roledisp.continue_time;
            this.setDisplacement(sX, sY, aX, aY, aTime, cTime);
            this.disp_tick = 0;
        };
        SkillAction.prototype.setDisplacement = function (sX, sY, aX, aY, aTime, cTime) {
            this.DISPLACEMENT.speed_x = sX;
            this.DISPLACEMENT.speed_y = sY;
            this.DISPLACEMENT.aspeed_x = aX;
            this.DISPLACEMENT.aspeed_y = aY;
            this.DISPLACEMENT.aspeed_time = aTime;
            this.DISPLACEMENT.continue_time = cTime;
        };
        SkillAction.prototype.play = function () {
            var _this = this;
            var x = this.belong_role.getPosX();
            var y = this.belong_role.getPosY();
            var des_x = 0;
            var des_y = 0;
            function _getIsFlash(c_x, c_y) {
                var is_flash = false;
                if (Math.abs(x - c_x) > zj.ConstantConfig_RoleBattle.FLASH_DIS_IGNORE_X ||
                    Math.abs(y - c_y) > zj.ConstantConfig_RoleBattle.FLASH_DIS_IGNORE_Y) {
                    is_flash = true;
                }
                return is_flash;
            }
            /*
            let function _getFlashDesPos(position, src_x, src_y)
                if( position == TablePositionType.POSITION_LEFT ){
                    return src_x - ConstantConfig_RoleBattle.FLASH_DIS_OFFSET_X, src_y
                }else if( position == TablePositionType.POSITION_RIGHT ){
                    return src_x + ConstantConfig_RoleBattle.FLASH_DIS_OFFSET_X, src_y
                }
            }
            */
            var _getSrc = function (type, param1, parm2) {
                var _is_flash = false;
                var _src_x = 0;
                var _src_y = 0;
                var _offset_w = zj.yuan3(_this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, _this.I.act.target_offset_distance[zj.adjustIndex(1)], -_this.I.act.target_offset_distance[zj.adjustIndex(1)]);
                var _offset_h = _this.I.act.target_offset_distance[zj.adjustIndex(2)];
                if (type == message.EActionFlashType.FLASH_TYPE_ORIGIN) {
                    _src_x = _this.belong_role.teamOriginalX;
                    _src_y = _this.belong_role.teamOriginalY;
                    _is_flash = _getIsFlash(_src_x, _src_y);
                }
                else if (type == message.EActionFlashType.FLASH_TYPE_LOCAL) {
                    _is_flash = false;
                }
                else if (type == message.EActionFlashType.FLASH_TYPE_DETAILPOS) {
                    if (_this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT) {
                        _src_x = param1;
                    }
                    else if (_this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_RIGHT) {
                        _src_x = 960 - param1;
                    }
                    if (_this.b_lockY == false) {
                        _src_y = parm2 + _offset_h + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
                    }
                    else {
                        _src_y = _this.belong_role.teamOriginalY + _offset_h + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
                    }
                    _is_flash = _getIsFlash(_src_x, _src_y);
                }
                else if (type == message.EActionFlashType.FLASH_TYPE_TARGET) {
                    var targetPlayers = _this.fight_scene.getTargetPlayer(_this.belong_role, param1, parm2);
                    if (targetPlayers.length > 0) {
                        //let [_realX, _realY] = [0, 0]
                        var _a = targetPlayers[zj.adjustIndex(1)].getRealPos(), _realX = _a[0], _realY = _a[1];
                        _src_x = _realX + _offset_w;
                        if (_this.b_lockY == false) {
                            _src_y = _realY + _offset_h + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
                        }
                        else {
                            _src_y = _this.belong_role.teamOriginalY + _offset_h + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground);
                        }
                        _is_flash = _getIsFlash(_src_x, _src_y);
                    }
                }
                return [_is_flash, _src_x, _src_y];
            };
            //let is_flash = false
            var _a = this.belong_unit.getActionFlash(), type = _a[0], param1 = _a[1], param2 = _a[2];
            if (this.I.act.action_flash == message.EActionFlashType.FLASH_TYPE_LASTPOS) {
                if (type == message.EActionFlashType.FLASH_TYPE_NONE) {
                    type = message.EActionFlashType.FLASH_TYPE_LOCAL;
                    param1 = 0;
                    param2 = 0;
                }
            }
            else {
                type = this.I.act.action_flash;
                param1 = this.I.act.flash_target_param1;
                param2 = this.I.act.flash_target_param2;
            }
            var _b = _getSrc(type, param1, param2), is_flash = _b[0], src_x = _b[1], src_y = _b[2];
            this.belong_unit.setActionFlash(type, param1, param2);
            if (is_flash == true) {
                //des_x, des_y = _getFlashDesPos(this.belong_role.ePosition, src_x, src_y)
                var des_x_1 = src_x;
                var des_y_1 = src_y;
                this.belong_role.flashMove(this.playAction, this, des_x_1, des_y_1);
            }
            else {
                this.playAction();
            }
        };
        SkillAction.prototype.playAction = function () {
            //console.log("action play")
            this.is_repeat = zj.booln(this.I.act.is_repeat);
            this.continue_time = this.I.act.continue_time;
            if (zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                var playSpeed = this.belong_role.getPlayActionSpeed();
                this.belong_role.setActInterval(playSpeed);
            }
            if (this.I.act.spx_action_id != -1) {
                this.resetDist();
                //this.belong_role.startDraw()
                this.belong_role.setFlipX(zj.yuan3(this.belong_role.ePosition == zj.TableEnum.TablePositionType.POSITION_LEFT, false, true));
                this.belong_role.setActLoop(this.is_repeat);
                this.belong_role.changeAction(this.I.act.spx_action_id);
            }
            //print("spx_action_id == "..this.I.act.spx_action_id)
            this.b_finish = false;
            this.b_play = true;
            this.b_continue_break = false;
            this.tablePlayRec = {};
            this.collision_counter = 0;
            this.b_hasParryed = false;
            this.totalLostHp = 0;
            //this.cur_counter = 0
            //this.b_pause = false
            //this.b_storage = false
            //this.b_look = false
        };
        SkillAction.prototype.collisionEvent = function () {
            // body
            if (this.I.act.collision_num <= 0) {
                return;
            }
            this.collision_counter = this.collision_counter + 1;
            if (this.collision_counter >= this.I.act.collision_num) {
                //this.changeNextOrEnd(false)
                //this.b_finish = true
                this.setIsFinish(true);
                this.b_play = false;
            }
        };
        SkillAction.prototype.setIsFinish = function (tag) {
            this.b_finish = tag;
        };
        SkillAction.prototype.update = function (tick) {
            if (this.b_finish == true) {
                return true;
            }
            this.spxAnimationFrame = this.belong_role.getBodySpx().GetCurFrm();
            this.updateDisplacement(tick);
            this.updateEffect();
            //this.updateShake()
            this.updateBodyAct(tick);
            this.updateHurt(tick);
            //this.updateRelatedAction()
            //this.updateBodyAct( tick )
            //this.updatePause()
            //this.updateStorage()
            //this.updateLook()
        };
        SkillAction.prototype.isBreakAction = function () {
            var breakFrame = this.I.act.break_action_frame;
            if (breakFrame == -1) {
                return false;
            }
            var bodyFrame = this.belong_role.getBodySpx().GetCurFrm();
            if (bodyFrame >= breakFrame) {
                return true;
            }
            return false;
        };
        SkillAction.prototype.addHurtOne = function (role) {
            //assert( role != null )
            if (this.hurt != null) {
                this.hurt.addHurtOne(role);
            }
        };
        SkillAction.prototype.canHurtOne = function (role) {
            //assert( role != null )
            var tag = false;
            if (this.hurt != null) {
                tag = this.hurt.canHurtOne(role);
            }
            return tag;
        };
        SkillAction.prototype.cleanHurtBodys = function () {
            if (this.hurt != null) {
                this.hurt.cleanHurtBodys();
            }
        };
        SkillAction.prototype.updateBodyAct = function (tick) {
            var bodyEnd = this.belong_role.isBodyActEnd();
            if (this.is_repeat) {
                // 是否每个区间都生效
                if (zj.booln(this.I.act.zone_reset) && this.belong_role.getBodySpx().isLoopChange() == true) {
                    this.tablePlayRec = {};
                }
                this.continue_time = this.continue_time - tick * 1000;
                if (this.continue_time <= 0) {
                    this.setIsFinish(true);
                    this.b_play = false;
                }
            }
            else {
                if (bodyEnd == true) {
                    this.setIsFinish(true);
                    this.b_play = false;
                }
            }
        };
        SkillAction.prototype.updateShake = function () {
            var shakeId = this.I.act.shake_id;
            var shakeAppear = this.I.act.shake_appear_frame;
            var role_frame = this.spxAnimationFrame;
            if (shakeId == null || shakeId == -1 || role_frame != shakeAppear) {
                return;
            }
            if (this.fight_scene && this.fight_scene.startShake != null) {
                this.fight_scene.startShake(shakeId);
            }
        };
        SkillAction.prototype.updateDisplacement = function (tick) {
            // s = v0·t + a·t2/2
            if (this.I.roledisp == null
                || this.DISPLACEMENT.continue_time <= 0) {
                return;
            }
            var cheatDt = tick; //1.0 / 30//ConstantConfig_RoleBattle.DEFAULTFPS
            var rt = cheatDt * 1000;
            //let rt = tick*1000
            this.disp_tick = this.disp_tick + rt;
            if (this.disp_tick < this.DISPLACEMENT.continue_time) {
                if (this.DISPLACEMENT.aspeed_time > 0) {
                    var tmpAccTime = rt;
                    this.DISPLACEMENT.aspeed_time = this.DISPLACEMENT.aspeed_time - rt;
                    if (this.DISPLACEMENT.aspeed_time < 0) {
                        tmpAccTime = tmpAccTime + this.DISPLACEMENT.aspeed_time;
                    }
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
                /*
                let dis_x = this.DISPLACEMENT.speed_x * rt + this.DISPLACEMENT.aspeed_x * rt^2 / 2
                let dis_y = this.DISPLACEMENT.speed_y * rt + this.DISPLACEMENT.aspeed_y * rt^2 / 2
                let tmpX = 0
                let tmpY = dis_y
                let roleDir = this.belong_role.getDir()
                if( roleDir == TableEnumDir.Dir_Right ){
                    tmpX = dis_x
                }else{
                    tmpX = -dis_x
                }
                */
                var roleType = this.belong_role.getFormType();
                if (roleType == zj.TableEnum.TableEnumFromClassify.TYPE_PERSON) {
                    this.belong_role.moveMap(tmpX, tmpY);
                    this.belong_role.setPos(this.belong_role.getPosX(), this.belong_role.getPosY());
                }
                else {
                    var y = this.belong_role.getPosY() + tmpY;
                    var bGravity = this.belong_role.getIsGravity();
                    if (bGravity == true && y < zj.Gmgr.Instance.floor + (this.belong_role.getFloor() - zj.Gmgr.Instance.ground)) {
                        y = zj.Gmgr.Instance.floor + (this.belong_role.getFloor() - zj.Gmgr.Instance.ground);
                    }
                    this.belong_role.moveMap(tmpX, 0);
                    this.belong_role.setPos(this.belong_role.getPosX(), y);
                }
            }
        };
        SkillAction.prototype.creatEffect = function (id) {
            // body
            if (id == 1008224) {
                var aaa = void 0;
            }
            var info = zj.PlayerSkillSystem.EffectInfo(id);
            if (info == null) {
                return;
            }
            //let effect_skill_type = getEffectSkillTypeById( id )
            if (info.effect_skill_type == message.EEffectType.EFFECT_TYPE_COLLISION) {
                //1
                // let effect = new SkillEffect();
                var effect = zj.Game.ObjectPool.getItem("SkillEffectBase_1", zj.SkillEffect);
                effect.newSetData(id, this.belong_skill, this, null);
                effect.initHand();
                effect.playEffect();
                this.belong_role.addEffect(effect);
            }
            else if (info.effect_skill_type == message.EEffectType.EFFECT_TYPE_MISSILE) {
                var effect = new zj.MissileEffect();
                effect.newSetData(id, this.belong_skill, this, null);
                effect.initHand();
                effect.playEffect();
                this.belong_role.addEffect(effect);
            }
            else if (info.effect_skill_type == message.EEffectType.EFFECT_TYPE_TARGET) {
                var fightScene = zj.StageSceneManager.Instance.GetCurScene();
                //let target = getEffectTargetId( id )
                var players = [];
                if (id == this.belong_role.still_target_effect) {
                    players = this.belong_role.targetPlayers;
                }
                else {
                    players = fightScene.getTargetPlayer(this.belong_role, info.effect_target_pos, info.effect_target);
                }
                //2
                for (var i = 0; i < players.length; i++) {
                    //let effect = new SkillEffectTimely();
                    var effect = zj.Game.ObjectPool.getItem("SkillEffectBase_2", zj.SkillEffectTimely);
                    effect.newSetData(id, this.belong_skill, players[i], this);
                    effect.initHand();
                    effect.playEffect();
                    players[i].addEffect(effect);
                }
            }
        };
        SkillAction.prototype.updateEffect = function () {
            // body	
            for (var i = 0; i < this.I.act.effects_id.length; i++) {
                var id = this.I.act.effects_id[i];
                if (id == -1 || this.tablePlayRec[id] != null) {
                    continue;
                }
                if (this.spxAnimationFrame >= this.I.act.effects_appear_frame[i]) {
                    this.tablePlayRec[id] = "trigger";
                    this.creatEffect(id);
                    //console.log("wocao");
                }
                //console.log("mlgb", this.spxAnimationFrame)
            }
        };
        SkillAction.prototype.updateHurt = function (tick) {
            if (this.hurt != null) {
                this.hurt.update(tick);
            }
        };
        SkillAction.prototype.getBelongSkill = function () {
            return this.belong_skill;
        };
        SkillAction.prototype.getActionId = function () {
            return this.action_id;
        };
        SkillAction.prototype.getIsFinish = function () {
            return this.b_finish;
        };
        SkillAction.prototype.getIsToFloorOver = function () {
            return zj.booln(this.I.act.is_to_floor_over);
        };
        SkillAction.prototype.getBreakPriority = function () {
            return this.I.act.action_break_priority;
        };
        SkillAction.prototype.setContinueBreak = function (args) {
            // body  
            if (this.b_continue == false) {
                return;
            }
            this.b_continue_break = true;
        };
        SkillAction.prototype.getIsContinueBreak = function (args) {
            // body    
            return this.b_continue_break;
        };
        SkillAction.prototype.getCollisionNum = function () {
            return this.I.act.collision_num;
        };
        SkillAction.prototype.getCollisionDistance = function () {
            return this.I.act.collision_distance;
        };
        SkillAction.prototype.isHasParryed = function () {
            return this.b_hasParryed;
        };
        SkillAction.prototype.keepOutLostHp = function (maxLost, curHurt) {
            var hurtValue = 0;
            if (this.totalLostHp < maxLost) {
                var ret = this.totalLostHp + curHurt;
                if (ret >= maxLost) {
                    hurtValue = maxLost;
                    this.totalLostHp = maxLost;
                }
                else {
                    hurtValue = curHurt;
                    this.totalLostHp = ret;
                }
            }
            else {
                hurtValue = maxLost;
            }
            return hurtValue;
        };
        return SkillAction;
    }());
    zj.SkillAction = SkillAction;
    __reflect(SkillAction.prototype, "zj.SkillAction");
})(zj || (zj = {}));
//# sourceMappingURL=SkillAction.js.map