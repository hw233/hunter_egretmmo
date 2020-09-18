var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillUnit = (function () {
        function SkillUnit(belong_role, belong_skill, id) {
            // body
            this.fight_scene = zj.StageSceneManager.Instance.GetCurScene();
            this.belong_role = null;
            this.belong_skill = null;
            this.unit_id = null;
            this.skill_type = null;
            this.cur_counter = 0;
            this.counter_tick = 0;
            this.b_finish = true;
            this.b_lookBegin = true;
            this.b_lookEnd = false;
            this.b_look = true;
            this.b_storage = true;
            this.play_up_rate = 1.0;
            this.action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE;
            this.flash_param1 = 0;
            this.flash_param2 = 0;
            this.skill_order = -1;
            this.bg_spx_id = -1;
            this.bg_spx_index = 0;
            this.bg_appear_frame = -1;
            this.b_bgAppear = false;
            this.bgCss = null;
            this.tableAction = [];
            this.I = null;
            // body
            this.fight_scene = zj.StageSceneManager.Instance.GetCurScene();
            this.belong_role = belong_role;
            this.belong_skill = belong_skill;
            this.unit_id = id;
            this.skill_type = this.belong_skill.getSkillType();
            this.cur_counter = 0;
            this.counter_tick = 0;
            this.b_finish = true;
            this.b_lookBegin = true;
            this.b_lookEnd = false;
            this.b_look = true;
            this.b_storage = true;
            this.play_up_rate = 1.0;
            this.action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE;
            this.flash_param1 = 0;
            this.flash_param2 = 0;
            //this.skill_order = -1
            //this.bg_spx_id = -1
            //this.bg_spx_index = 0
            //this.bg_appear_frame = -1
            this.b_bgAppear = false;
            this.bgCss = null;
            this.tableAction = [];
            var I = {};
            I["unitid"] = id;
            I["unitInfo"] = zj.PlayerSkillSystem.UnitInfo(id);
            this.I = I;
            this.init();
        }
        SkillUnit.prototype.release = function () {
            // body
            //this.fight_scene.getEffectLayer(this.belong_role).removeChild(this.bgCss, true)
            this.belong_role = null;
            if (this.bgCss && this.bgCss.spine) {
                this.bgCss.clearSpine();
                this.bgCss = null;
            }
            var i = zj.adjustIndex(1);
            while (i < this.tableAction.length) {
                zj.CC_SAFE_DELETE(this.tableAction[i]);
                //Game.ObjectPool.getItem("SkillAction",this.tableAction[i]);
                i = i + 1;
            }
            this.tableAction = null;
            this.fight_scene = null;
        };
        SkillUnit.prototype.init = function () {
            //let tableSkillUnit = CSV.GetTable(StringConfig_Table.skillUnit)
            //this.skill_order = tableSkillUnit[this.unit_id].skill_order	
            //this.bg_spx_id = tableSkillUnit[this.unit_id].bg_spx_id
            //this.bg_spx_index = tableSkillUnit[this.unit_id].bg_spx_index
            //this.bg_appear_frame = tableSkillUnit[this.unit_id].bg_appear_frame
            this.initBgCss();
            // body
            this.addAction();
            //this.extraAction()
        };
        SkillUnit.prototype.initBgCss = function (args) {
            // body
            if (this.I.unitInfo.bg_spx_id == -1) {
                return;
            }
            this.bgCss = zj.HunterSpineX(this.I.unitInfo.bg_spx_id, zj.Gmgr.Instance.spineX_scale)[0];
            this.bgCss.SetAutoUpdate(true);
            this.bgCss.setVisibleSpx(false);
            /*
            let name = resdb.SPX( this.I.unitInfo.bg_spx_id )
            this.bgCss = ccs.Armature.create(name)
            this.bgCss.setVisible(false)
            let function animationEvent(armatureBack,movementType,movementID)
                if( movementType == ccs.MovementEventType.loopComplete or movementType == ccs.MovementEventType.complete ){
                    armatureBack.setVisible(false)
                }
            }
            this.bgCss.getAnimation().setMovementEventCallFunc(animationEvent)
            */
            //this.fight_scene.getEffectLayer(this.belong_role).addChild(this.bgCss)    
            this.fight_scene.nodeDownEffect.addChild(this.bgCss.spine);
        };
        SkillUnit.prototype.hideBg = function () {
            if (this.bgCss != null) {
                this.bgCss.stopAllActions();
                this.bgCss.setVisibleSpx(false);
            }
        };
        SkillUnit.prototype.playBgCss = function () {
            this.bgCss.setVisibleSpx(true);
            this.bgCss.SetPosition(zj.UIManager.StageWidth / 2 - this.fight_scene.fightRoot.x, zj.UIManager.StageHeight / 2);
            this.bgCss.stopAllActions();
            this.bgCss.SetLoop(false);
            var index = this.I.unitInfo.bg_spx_index;
            if (index <= -1) {
                index = 0;
            }
            this.bgCss.ChangeAction(index);
            // body
            /*
            this.bgCss.setVisible(true)
            this.bgCss.stopAllActions()
            this.bgCss.setPosition(cc.p(Device.screenWidth/2, Device.screenHeight/2))
            //roleScale = turnNum(this.belong_role.ePosition, roleScale)
            let scale = math.max(Device.screenWidth/Device.STANDARD_SCREEN_W, Device.screenHeight/Device.STANDARD_SCREEN_H)
            let ratio = turnNum(this.belong_role.ePosition, 1)
            this.bgCss.setScaleX(ratio*scale)
            this.bgCss.setScaleY(scale)
            this.bgCss.getAnimation().playWithIndex(this.I.unitInfo.bg_spx_index + this.belong_role.eTeamNum % TableTeamNum.TEAM_NUM_MAX)
            */
        };
        SkillUnit.prototype.updateBg = function () {
            if (this.I.unitInfo.bg_spx_id == -1 || this.b_bgAppear == true) {
                return;
            }
            var bodyFrame = this.belong_role.getBodySpx().GetCurFrm();
            if (bodyFrame > this.I.unitInfo.bg_appear_frame) {
                this.b_bgAppear = true;
                this.playBgCss();
            }
        };
        SkillUnit.prototype.playSkill = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.clearHurtBodys();
            this.b_finish = false;
            this.b_bgAppear = false;
            this.cur_counter = 0;
            this.b_lookBegin = false;
            this.b_look = false;
            this.b_storage = false;
            this.counter_tick = 0;
            this.action_flash_type = message.EActionFlashType.FLASH_TYPE_NONE;
            this.flash_param1 = 0;
            this.flash_param2 = 0;
            var tableSize = this.tableAction.length;
            if (tableSize > 0) {
                this.tableAction[this.cur_counter + zj.adjustIndex(1)].play();
                //this.tableAction[this.cur_counter+1].playAction(this.play_up_rate)
            }
        };
        SkillUnit.prototype.update = function (tick) {
            // body
            if (this.b_finish == true) {
                return;
            }
            if (this.belong_role.is_flashing == true) {
                return;
            }
            this.counter_tick = this.counter_tick + tick * 1000;
            var curAction = this.tableAction[this.cur_counter + 0];
            var actionFinish = curAction.getIsFinish();
            if (actionFinish == true) {
                var tableSize = this.tableAction.length;
                if (tableSize > this.cur_counter + 1) {
                    this.cur_counter = this.cur_counter + 1;
                    curAction = this.tableAction[this.cur_counter + 0];
                    curAction.play();
                    //curAction.playAction(this.play_up_rate)
                }
                else {
                    //this.}Look()
                    //this.b_finish = true
                    this.endUnit();
                }
            }
            else {
                curAction.update(tick);
            }
            this.updateBg();
            this.updateStorage();
            //this.updateLookBegin()
            this.updateLook();
        };
        SkillUnit.prototype.canBreakSkill = function (skillOrder) {
            // body
            var order = this.getOrder();
            if (skillOrder <= order) {
                return false;
            }
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            var actionBreak = curAction.isBreakAction();
            if (actionBreak == true) {
                return true;
            }
            return false;
        };
        SkillUnit.prototype.getBreakPriority = function () {
            // body    
            var priority = this.tableAction[this.cur_counter + zj.adjustIndex(1)].getBreakPriority();
            return priority;
        };
        SkillUnit.prototype.getCurAction = function (args) {
            // body
            //return null
            //return this.tableAction[this.cur_counter+1].getCurUnit()
            return this.tableAction[this.cur_counter + zj.adjustIndex(1)];
        };
        SkillUnit.prototype.addAction = function () {
            // body
            var tableSkillUnit = zj.TableSkillUnit.Table();
            var tableAllAction = tableSkillUnit[this.unit_id].all_action;
            var tableSize = tableAllAction.length;
            for (var i = zj.adjustIndex(1); i < tableSize; i++) {
                var action_id = tableAllAction[i];
                var action = new zj.SkillAction();
                // let action = Game.ObjectPool.getItem("SkillAction",SkillAction);
                action.newSetData(this.belong_role, this.belong_skill, action_id, this);
                this.tableAction.push(action);
            }
        };
        SkillUnit.prototype.nextAction = function () {
            // body
            var size = this.tableAction.length;
            if (size <= this.cur_counter + 1) {
                //this.}Look()
                //this.}Look()
                //this.b_finish = true
                this.endUnit();
                return;
            }
            this.cur_counter = this.cur_counter + 1;
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            //curAction.playAction(this.play_up_rate)
            curAction.play();
        };
        SkillUnit.prototype.addHurtOne = function (role) {
            // body
            //assert( role != null)
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                curAction.addHurtOne(role);
            }
        };
        SkillUnit.prototype.canHurtOne = function (role) {
            // body
            //assert( role != null)
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                return curAction.canHurtOne(role);
            }
            return false;
        };
        SkillUnit.prototype.clearHurtBodys = function () {
            // body
            var tableSize = this.tableAction.length;
            for (var i = zj.adjustIndex(1); i < tableSize; i++) {
                var action = this.tableAction[i];
                action.cleanHurtBodys();
            }
        };
        SkillUnit.prototype.getActionIsByWeapon = function () {
            // body
            var tag = false;
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                tag = curAction.getIsByWeapon();
            }
            return tag;
        };
        SkillUnit.prototype.getActionToFloorOver = function () {
            // body
            var tag = false;
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                tag = curAction.getIsToFloorOver();
            }
            return tag;
        };
        SkillUnit.prototype.getHurt = function () {
            // body
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                return curAction.getHurt();
            }
            return null;
        };
        SkillUnit.prototype.getHitEffectId = function () {
            // body
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                return curAction.getHitEffectId();
            }
            return -1;
        };
        SkillUnit.prototype.getCurActionPriority = function () {
            // body  
            var curAction = this.tableAction[this.cur_counter + zj.adjustIndex(1)];
            if (curAction != null) {
                return curAction.getBreakPriority();
            }
            return -1;
        };
        SkillUnit.prototype.setInterval = function (speed) {
            // body
            if (this.bgCss != null) {
                this.bgCss.setSpeedScale(speed);
            }
        };
        SkillUnit.prototype.setActionFlash = function (value, param1, param2) {
            this.action_flash_type = value;
            this.flash_param1 = param1;
            this.flash_param2 = param2;
        };
        SkillUnit.prototype.Pause = function (args) {
            // body
            if (this.bgCss != null) {
                this.bgCss.Pause();
            }
        };
        SkillUnit.prototype.resume = function (args) {
            // body
            if (this.bgCss != null) {
                this.bgCss.resume();
            }
        };
        SkillUnit.prototype.getOrder = function () {
            // body	
            return this.I.unitInfo.skill_order;
        };
        SkillUnit.prototype.getIsFinish = function () {
            // body
            return this.b_finish;
        };
        SkillUnit.prototype.getBelongRole = function () {
            // body
            return this.belong_role;
        };
        SkillUnit.prototype.getBelongSkill = function () {
            // body
            return this.belong_skill;
        };
        SkillUnit.prototype.getSkillUnitId = function () {
            // body
            return this.unit_id;
        };
        SkillUnit.prototype.getActionByID = function (id) {
            //let action_id = tableAllAction[i]
            for (var i = zj.adjustIndex(1); i < this.tableAction.length; i++) {
                if (this.tableAction[i].action_id == id) {
                    return this.tableAction[i];
                }
            }
            return null;
        };
        SkillUnit.prototype.getActionFlash = function () {
            return [this.action_flash_type, this.flash_param1, this.flash_param2];
        };
        SkillUnit.prototype.updateStorage = function () {
            // body   
            if (!(zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_FIGHT || zj.Gmgr.Instance.layerId == zj.TableEnum.TableEnumLayerId.LAYER_ZORKBOSS)) {
                return;
            }
            if (this.I.unitInfo.storage_appear_frame == -1 || this.b_storage == true) {
                return;
            }
            if (this.counter_tick >= this.I.unitInfo.storage_appear_frame) {
                this.b_storage = true;
                if (this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE) {
                    this.belong_role.playStorage(zj.UIConfig.UIConfig_CommonBattleCss.pressKillAni.index);
                }
                else if (this.skill_type == message.ESkillType.SKILL_TYPE_DEATH) {
                    this.belong_role.playStorage(zj.UIConfig.UIConfig_CommonBattleCss.deadKillAni.index);
                }
                if (this.belong_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_MOB && this.belong_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL) {
                    if (this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE || this.skill_type == message.ESkillType.SKILL_TYPE_DEATH) {
                        if (!zj.Device.isReviewSwitch) {
                            this.belong_role.playDialogAni();
                        }
                    }
                }
                /*
                if( this.skill_type == ESkillType.SKILL_TYPE_DEATH ){
                    if( this.belong_role.roleType == TableEnumRoleType.ROLE_TYPE_BOSS and this.belong_role.bDead != true ){
                    this.belong_role.openStorageBar(this.I.unitInfo.storage_appear_frame, this.I.unitInfo.look_}_frame)
                    }
                }
                */
            }
        };
        SkillUnit.prototype.startLookBegin = function () {
            // body
            if (zj.Gmgr.Instance.layerId != zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                return;
            }
            if (this.I.unitInfo.look_begin_frame == -1 || this.skill_type == message.ESkillType.SKILL_TYPE_COMMON || this.b_lookBegin == true) {
                return;
            }
            if (true) {
                //if( this.counter_tick > this.I.unitInfo.look_begin_frame ){
                this.b_lookBegin = true;
                if (this.belong_role.isPerson()) {
                    //if( this.belong_role != null and this.belong_role.roleType != TableEnumRoleType.ROLE_TYPE_CALL ){
                    //if( this.belong_role.bEnemy == false ){
                    if (true) {
                        var sence = zj.StageSceneManager.Instance.GetCurScene();
                        if (this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE) {
                            if (this.belong_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_HELP && this.belong_role.roleType != zj.TableEnum.TableEnumRoleType.ROLE_TYPE_LOCAL_HELP) {
                                sence.staticBegin(this.belong_role);
                                if (sence.beInPvp()) {
                                    if (!this.belong_role.bEnemy) {
                                        sence.helpRoleAniBegin(this.belong_role);
                                    }
                                    else {
                                        sence.oppHelpRoleAniBegin(this.belong_role);
                                    }
                                }
                                else {
                                    if (!this.belong_role.bEnemy) {
                                        sence.helpRoleAniBegin(this.belong_role);
                                    }
                                }
                            }
                            sence.renderTargetStart(this.belong_role.targetPlayers);
                            sence.renderEffectStart(this.belong_role);
                        }
                        else if (this.skill_type == message.ESkillType.SKILL_TYPE_DEATH) {
                            //sence.killSkillEnd(this.belong_role)   
                        }
                    }
                }
            }
        };
        SkillUnit.prototype.endUnit = function () {
            this.b_finish = true;
            this.hideBg();
            this.endLook();
        };
        SkillUnit.prototype.endLook = function () {
            if (zj.Gmgr.Instance.layerId != zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                return;
            }
            if (this.I.unitInfo.look_begin_frame != -1 && this.I.unitInfo.look_end_frame != -1 && this.b_look == false) {
                if (this.b_lookBegin == true) {
                    if (this.belong_role.isPerson()) {
                        //if( this.belong_role.bEnemy == false ){
                        var sence = zj.StageSceneManager.Instance.GetCurScene();
                        sence.staticEnd(this.belong_role);
                        sence.renderEffectEnd(this.belong_role);
                    }
                }
            }
        };
        SkillUnit.prototype.updateLook = function () {
            // body
            if (zj.Gmgr.Instance.layerId != zj.TableEnum.TableEnumLayerId.LAYER_FIGHT) {
                return;
            }
            if (this.I.unitInfo.look_begin_frame == -1 || this.I.unitInfo.look_end_frame == -1 || this.skill_type == message.ESkillType.SKILL_TYPE_COMMON || this.b_look == true) {
                return;
            }
            if (this.counter_tick > this.I.unitInfo.look_end_frame) {
                this.b_look = true;
                if (this.belong_role.isPerson()) {
                    if (true) {
                        //if( this.belong_role.bEnemy == false ){
                        var sence = zj.StageSceneManager.Instance.GetCurScene();
                        if (this.skill_type == message.ESkillType.SKILL_TYPE_HANDLE) {
                            sence.staticEnd(this.belong_role);
                            sence.renderEffectEnd(this.belong_role);
                        }
                        else if (this.skill_type == message.ESkillType.SKILL_TYPE_DEATH) {
                            //sence.killSkillEnd(this.belong_role)   
                        }
                    }
                }
            }
        };
        return SkillUnit;
    }());
    zj.SkillUnit = SkillUnit;
    __reflect(SkillUnit.prototype, "zj.SkillUnit");
})(zj || (zj = {}));
//# sourceMappingURL=SkillUnit.js.map