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
    var StagePerson = (function (_super) {
        __extends(StagePerson, _super);
        function StagePerson(node, aiTag) {
            var _this = _super.call(this, node, aiTag) || this;
            _this.formType = zj.TableEnum.TableEnumFromClassify.TYPE_PERSON;
            return _this;
        }
        StagePerson.prototype.loadSkill = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.loadServerSkill();
            //this.loadLocalSkill();
        };
        StagePerson.prototype.loadLocalSkill = function () {
            if (this.tableSkillIds.length != this.tableSkillLevels.length) {
                // cclog("the num of skills is equal to nums of levels") assert(false) end 
            }
            for (var i = 0; i < this.tableSkillIds.length; i++) {
                if (this.tableSkillIds[i] > 0) {
                    var info = { id: this.tableSkillIds[i], level: this.tableSkillLevels[i] };
                    var ts = new zj.RoleSkill(this, info);
                    var sType = zj.Helper.getSkillBaseTypeById(this.tableSkillIds[i]);
                    if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    }
                    else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    }
                    else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        };
        StagePerson.prototype.loadServerSkill = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            for (var i = zj.adjustIndex(1); i < this.roleInfo.skills.length; i++) {
                var v = this.roleInfo.skills[i];
                if (v.pos >= message.ESkillType.SKILL_TYPE_COMMON && v.pos <= message.ESkillType.SKILL_TYPE_DEATH) {
                    var info = { id: v.skillId, level: v.level };
                    var ts = new zj.RoleSkill(this, info);
                    if (v.pos == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    }
                    else if (v.pos == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    }
                    else if (v.pos == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        };
        StagePerson.prototype.creatPerson = function (roleInfo, aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale, roleId, appearStage, orderPos) {
            // body
            this.setPositionType(ePosition);
            this.setRoleId(roleId);
            this.setGeneralId(zj.PlayerHunterSystem.GetGeneralId(roleId));
            //this.setOrderPos(orderPos)
            this.setTeamNum(eTeamNum);
            this.setIsEnemy(bEnemy);
            this.init(roleInfo);
            this.commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale);
            this.setVisible(false);
        };
        StagePerson.prototype.loadBaseData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // general body    
            var instance = zj.PlayerHunterSystem.Table(this.roleId);
            //let generalId = gnrdb.getGeneralId(this.roleId)
            if (this.roleInfo == null) {
                this.mapRoleId = instance.general_roleId;
            }
            else {
                // this.mapRoleId = PlayerHunterSystem.MapFightID(this.roleInfo);
                var tranId = zj.PlayerSkillSystem.getTranMapId(this.roleInfo);
                if (tranId != null && tranId != -1) {
                    this.mapRoleId = tranId;
                }
                else {
                    this.mapRoleId = zj.PlayerHunterSystem.MapFightID(this.roleInfo);
                }
            }
            var transferlevel = null;
            if (this.roleInfo != null) {
                transferlevel = this.roleInfo.transfer_level;
            }
            //instance.general_roleId
            this.formType = instance.role_type;
            var body = zj.fromGeneral(this.roleId, transferlevel);
            this.roleName = instance.general_name;
            if (zj.PlayerHunterSystem.GetHasGeneral(this.roleId) && this.roleInfo != null) {
                this.headPath = zj.PlayerHunterSystem.Head(this.roleInfo);
            }
            else {
                this.headPath = body.head_path;
            }
            this.battleHead = body.battle_head;
            this.supportHead = body.battle_help;
            this.bodyPath = body.body_path;
            this.halfPath = body.half_path;
            // 鏃呭洟鏍囪瘑
            this.groupTag = body.organization;
            // 鐗规€
            this.roleFeature = body.features;
            // 娲剧郴
            this.roleFaction = instance.type;
            this.parryMaxTime = body.parry_time;
            this.homingTime = body.homing_time;
            this.profession = instance.general_profession;
            //this.maxBeanNum = instance.bean_max
            this.maxBeanNum = 1;
            this.helpBg = instance.help_bg;
            this.tableSkillIds = instance.skill_ids;
            this.tableSkillLevels = instance.skill_levels;
            //this.tableTalentIds = instance.talent_ids
            //this.tableTalentLevels = instance.talent_levels
            this.tableHideTalentIds = instance.hide_talent_ids;
            this.getUpTime = instance.get_up_time;
            this.stirUpDef = instance.stir_up_resistance;
            this.stirAgainDef = instance.stir_again_def;
            this.moveSpeed = instance.move_speed;
            var tag = instance.is_stir_up;
            this.bStirUp = zj.getBoolean(tag);
            tag = instance.is_gravity;
            this.bGravity = zj.getBoolean(tag);
            this.appearRage = instance.rage_reduce;
            this.SetAttrib("maxRage", instance.general_rage);
            this.SetAttrib("stiffDef", instance.stiff_resistance);
        };
        StagePerson.prototype.init = function (roleInfo) {
            // body
            // 方便测试关闭    
            this.loadRoleData(roleInfo);
            this.loadBuffsAttri();
            this.loadAttriPlus();
            // 方便测试开启	
            this.loadBaseData();
            this.loadClientData();
            this.loadModelDB();
            this.loadBody();
            this.loadTalent();
            this.loadAdviserSkill();
            this.loadPokedexSkill();
            this.loadPetSkill();
            this.loadTitleSkill();
            this.loadAttriTalent();
            this.loadSkill();
            this.loadSkillAi();
            this.loadLeagueSkill();
            this.loadSkinProperty();
            this.loadFightSpxRes();
            this.loadStorageSpx();
            this.loadSkillDialog();
            this.initBleedTriggerLine();
            this.setHp(this.getMaxHp());
            if (!this.fightScene.beInPvp()) {
                this.setRage(this.appearRage);
            }
            this.closeRoleDcUI();
        };
        StagePerson.prototype.loadAttriPlus = function () {
            this.rageReducePlus = this.tableBuffsAttri[zj.TableEnum.EnumGelAttrib.ATTR_RAGE_REDUCE] / 100;
        };
        StagePerson.prototype.loadTitleSkill = function () {
            var t = zj.Gmgr.Instance.titleSkill[this.ePosition];
            var tTalents = [];
            for (var k in t) {
                var v = t[k];
                var info = {};
                info["id"] = v.skillId;
                info["level"] = v.skillLevel;
                info["bHide"] = true;
                info["source"] = zj.TableEnum.Enum.TalentSource.Title;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        };
        //加载宠物天赋
        StagePerson.prototype.loadPetSkill = function () {
            var t = zj.Gmgr.Instance.petSkill[this.ePosition];
            var tTalents = [];
            for (var k in t) {
                var v = t[k];
                var info = {};
                info["id"] = v.skillId;
                info["level"] = v.skillLevel;
                info["bHide"] = true;
                info["source"] = zj.TableEnum.Enum.TalentSource.PetSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        };
        //军师天赋（不做全局检测处理)
        StagePerson.prototype.loadAdviserSkill = function () {
            var t = zj.Gmgr.Instance.adviserSkills[this.ePosition];
            var tTalents = [];
            for (var k in t) {
                var v = t[k];
                var talentIns = zj.TableGeneralTalent.Item(v.skillId);
                if (talentIns == null) {
                    continue;
                }
                if (talentIns.trigger_condition[0] != -1 && talentIns.trigger_condition[0] != this.roleFeature) {
                    continue;
                }
                var info = {};
                info["id"] = v.skillId;
                info["level"] = v.skillLevel;
                info["bHide"] = true;
                info["source"] = zj.TableEnum.Enum.TalentSource.AdviserSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        };
        //图鉴天赋
        StagePerson.prototype.loadPokedexSkill = function () {
            var t = zj.Gmgr.Instance.pokedexSkill[this.ePosition];
            if (t == null || t[this.roleFaction] == null) {
                return;
            }
            var tTalents = [];
            for (var k in t[this.roleFaction]) {
                var v = t[this.roleFaction][k];
                var info = {};
                info["id"] = v.skillId;
                info["level"] = v.skillLevel;
                info["bHide"] = true;
                info["source"] = zj.TableEnum.Enum.TalentSource.PokedexSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        };
        StagePerson.prototype.loadTalent = function () {
            // let arr = Gmgr.Instance.everybodyTalent;
            this.initTalent(zj.Gmgr.Instance.everybodyTalent[this.ePosition]);
            this.initTalent(zj.Gmgr.Instance.personalTalent[this.ePosition][this.roleInfo.general_id]);
        };
        /**
         * 读取工会技能附加属性
         */
        StagePerson.prototype.loadLeagueSkill = function () {
            var list = zj.Gmgr.Instance.leagueSkill[this.ePosition];
            if (list) {
                var result = zj.Helper.CreateGeneralAttrTbl();
                // 根据猎人类型，获取工会技能生效的类型列表
                var typeList = zj.Game.PlayerLeagueSystem.getSkillValueType(this.roleFeature);
                for (var i = 0; i < list.length; i++) {
                    if (typeList.indexOf(list[i].key) >= 0) {
                        // 通过工会技能对象，获取附加的属性类型和附加属性值[属性类型，附加属性值]
                        var _a = zj.Game.PlayerLeagueSystem.getSkillValue(list[i].key, list[i].value), attType = _a[0], value = _a[1];
                        result[attType - 1] += value;
                    }
                }
                // 添加属性值
                for (var i = 0; i < result.length; i++) {
                    if (result[i] != 0) {
                        var attriType = i + 1;
                        var addValue = 0;
                        // 判断属性是否为百分比加成或者直接加数值
                        if (zj.Game.PlayerLeagueSystem.isSkillPercent(attriType)) {
                            addValue = this.baseAttribs[attriType] * result[i] / 100;
                        }
                        else {
                            addValue = result[i];
                        }
                        this.fightExtraAttribs[attriType] += addValue;
                    }
                }
            }
        };
        /**
         * 皮肤属性加成
         */
        StagePerson.prototype.loadSkinProperty = function () {
            var tables = zj.Gmgr.Instance.skinSkill[this.ePosition];
            if (tables) {
                var result = zj.PlayerHunterSystem.getSkinProperty(this.baseAttribs, this.roleInfo);
                for (var i = 0; i < result.length; i++) {
                    var attriType = i + 1;
                    this.fightExtraAttribs[attriType] += result[i];
                }
            }
        };
        return StagePerson;
    }(zj.StageRole));
    zj.StagePerson = StagePerson;
    __reflect(StagePerson.prototype, "zj.StagePerson");
    var StagePersonGeneral = (function (_super) {
        __extends(StagePersonGeneral, _super);
        function StagePersonGeneral(node, aiTag) {
            var _this = _super.call(this, node, aiTag) || this;
            _this.senderRole = null;
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL);
            _this.senderRole = null;
            return _this;
        }
        return StagePersonGeneral;
    }(StagePerson));
    zj.StagePersonGeneral = StagePersonGeneral;
    __reflect(StagePersonGeneral.prototype, "zj.StagePersonGeneral");
    var StageRoleBoss = (function (_super) {
        __extends(StageRoleBoss, _super);
        function StageRoleBoss(node, aiTag, roleId) {
            var _this = _super.call(this, node, aiTag, roleId) || this;
            _this.enterWeekAni = [];
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS);
            _this.deadAni = null;
            _this.bossRelHandleSkillNum = 0;
            _this.currShieldHp = 0;
            _this.weekTimer = 0;
            _this.weekTimerMax = 0;
            _this.weekProgressPer = 1;
            return _this;
        }
        StageRoleBoss.prototype.release = function () {
            //this.fightScene.getUpEffectLayer().removeChild(this.deadAni);
            _super.prototype.release.call(this);
        };
        StageRoleBoss.prototype.init = function () {
            _super.prototype.init.call(this);
            this.loadSkillDialog();
            this.initWeekSpx();
        };
        StageRoleBoss.prototype.startFight = function () {
            _super.prototype.startFight.call(this);
            if (this.isActivityBoss()) {
                this.fightScene.delSqueue(this.roleId, this.bEnemy);
            }
        };
        StageRoleBoss.prototype.initWeekSpx = function () {
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return;
            }
            this.enterWeekAni = [];
            var enterTbl = [8001058, 8001059];
            for (var i = 0; i < enterTbl.length; i++) {
                var enter = zj.HunterSpineX(enterTbl[i], 1, null, zj.TableClientFightAniSpineSource.Item(enterTbl[i]).json)[0];
                enter.setVisibleSpx(false);
                this.nodeRoot.addChild(enter.spine);
                this.enterWeekAni.push(enter);
            }
            this.spxWeeking = zj.HunterSpineX(8001060, 1, null, zj.TableClientFightAniSpineSource.Item(8001060).json)[0];
            this.spxWeeking.setVisibleSpx(false);
            this.nodeRoot.addChild(this.spxWeeking.spine);
            this.exitWeekAni = [];
            enterTbl = [8001058, 8001059];
            for (var i = 0; i < enterTbl.length; i++) {
                var exit = zj.HunterSpineX(enterTbl[i], 1, null, zj.TableClientFightAniSpineSource.Item(enterTbl[i]).json)[0];
                exit.setVisibleSpx(false);
                this.nodeRoot.addChild(exit.spine);
                this.exitWeekAni.push(exit);
            }
        };
        StageRoleBoss.prototype.playEnterWeek = function () {
            for (var i = 0; i < this.enterWeekAni.length; i++) {
                this.enterWeekAni[i].setVisibleSpx(true);
                this.enterWeekAni[i].SetPosition(this.x, this.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
                this.enterWeekAni[i].stopAllActions();
                this.enterWeekAni[i].SetLoop(false);
                this.enterWeekAni[i].ChangeAction(0);
            }
            this.spxWeeking.setVisibleSpx(true);
            this.spxWeeking.SetPosition(this.x, this.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions();
            this.spxWeeking.SetLoop(false);
            this.spxWeeking.ChangeAction(0);
        };
        StageRoleBoss.prototype.playWeeking = function () {
            this.spxWeeking.setVisibleSpx(true);
            this.spxWeeking.SetPosition(this.x, this.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions();
            this.spxWeeking.SetLoop(true);
            this.spxWeeking.ChangeAction(1);
        };
        StageRoleBoss.prototype.playExitWeek = function () {
            for (var i = 0; i < this.exitWeekAni.length; i++) {
                this.exitWeekAni[i].setVisibleSpx(true);
                this.exitWeekAni[i].SetPosition(this.x, this.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
                this.exitWeekAni[i].stopAllActions();
                this.exitWeekAni[i].SetLoop(false);
                this.exitWeekAni[i].ChangeAction(0);
            }
            this.spxWeeking.setVisibleSpx(true);
            this.spxWeeking.SetPosition(this.x, this.floor + (zj.Gmgr.Instance.floor - zj.Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions();
            this.spxWeeking.SetLoop(false);
            this.spxWeeking.ChangeAction(2);
        };
        StageRoleBoss.prototype.enterWeekTrigger = function () {
            _super.prototype.enterWeekTrigger.call(this);
            this.fightScene.staticBossWeekEnd(this);
            this.willlEnterWeek();
        };
        StageRoleBoss.prototype.leaveWeekTrigger = function () {
            _super.prototype.leaveWeekTrigger.call(this);
            this.fightScene.staticBossWeekEnd(this);
            this.fightScene.openFillNextMonster();
            this.changeWeekAni(3);
            this.appearFight();
            this.startFight();
        };
        StageRoleBoss.prototype.changeOtherEnterweek = function () {
            _super.prototype.changeOtherEnterweek.call(this);
            this.playEnterWeek();
            this.fightScene.staticBossWeekBegin(this);
            this.fightScene.delSqueue(this.roleId, this.bEnemy);
        };
        StageRoleBoss.prototype.changeOtherWeeking = function () {
            _super.prototype.changeOtherWeeking.call(this);
            this.playWeeking();
        };
        StageRoleBoss.prototype.changeOtherExitweek = function () {
            _super.prototype.changeOtherExitweek.call(this);
            this.playExitWeek();
            this.fightScene.staticBossWeekBegin(this);
        };
        StageRoleBoss.prototype.skillExtraFun = function (sType) {
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.bossRelHandleSkillNum = this.bossRelHandleSkillNum + 1;
            }
        };
        StageRoleBoss.prototype.initServer = function (roleInfo) {
            _super.prototype.initServer.call(this, roleInfo);
        };
        StageRoleBoss.prototype.loadStorageSpx = function () {
            _super.prototype.loadStorageSpx.call(this);
        };
        StageRoleBoss.prototype.changeWeekAni = function (state) {
            var _a = this.getHurtNumPos(), numX = _a[0], numY = _a[1];
            if (state == 1) {
                this.createWeekNumber(numX, numY);
            }
            else if (state == 2) {
                this.createRidweekNumber(numX, numY);
            }
            else if (state == 3) {
                this.createAbilityproNumber(numX, numY);
            }
        };
        StageRoleBoss.prototype.willlEnterWeek = function () {
            this.changeWeekAni(1);
            this.clearUseBuffs(zj.TableEnum.TableBuffUseType.Buff_Use_Bad);
        };
        StageRoleBoss.prototype.willLeaveWeek = function (newBossId) {
            var oldRoleId = this.roleId;
            this.fightScene.tableEnemys[oldRoleId] = null;
            delete this.fightScene.tableEnemys[oldRoleId];
            this.fightScene.cleanCollision(this);
            this.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_ExitWeek);
            this.setRoleId(newBossId);
            this.setGeneralId(newBossId);
            this.clearBossInfo();
            this.reloadBossInfo();
            this.changeWeekAni(2);
            this.roleInfo = this.createRoleInfo();
            this.fightScene.tableEnemys[newBossId] = this;
            this.fightScene.pushSqueue(this.roleId, this.bEnemy);
            this.fightScene.addCollision(this);
        };
        StageRoleBoss.prototype.clearBossInfo = function () {
            this.clearAllBuffs();
            this.clearTblInfo();
            this.hurtTotalValue = 0;
            this.recoverTotalValue = 0;
            this.weekProgressPer = 1;
        };
        StageRoleBoss.prototype.clearTblInfo = function () {
            var i = 1;
            while (i < this.tableCommons.length) {
                zj.CC_SAFE_DELETE(this.tableCommons[i]);
                i = i + 1;
            }
            this.tableCommons = [];
            i = 1;
            while (i < this.tableSkills.length) {
                zj.CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            this.tableSkills = [];
            i = 1;
            while (i < this.tableDeaths.length) {
                zj.CC_SAFE_DELETE(this.tableDeaths[i]);
                i = i + 1;
            }
            this.tableDeaths = [];
            i = 1;
            while (i < this.tableEffects.length) {
                zj.CC_SAFE_DELETE(this.tableEffects[i]);
                i = i + 1;
            }
            this.tableEffects = [];
            i = 1;
            while (i < this.tableHits.length) {
                zj.CC_SAFE_DELETE(this.tableHits[i]);
                i = i + 1;
            }
            this.tableHits = [];
            i = 1;
            while (i < this.tableNumbers.length) {
                zj.CC_SAFE_DELETE(this.tableNumbers[i]);
                i = i + 1;
            }
            this.tableNumbers = [];
            i = 1;
            while (i < this.tableBuffs.length) {
                zj.CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];
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
            this.tableClean = [];
            this.tableTalentEffect = {};
            this.tableSkillIds = [];
            this.tableSkillLevels = [];
            this.tableTalentIds = [];
            this.tableTalentLevels = [];
            this.tableHideTalentIds = [];
            this.tableDeathTalent = [];
        };
        StageRoleBoss.prototype.reloadBossInfo = function () {
            this.loadBaseData();
            this.loadFightData();
            //self:loadModelDB()  
            //self:loadBody()   
            this.loadTalent();
            this.loadAttriTalent();
            this.loadSkill();
            this.loadSkillAi();
            //self:loadFightSpxRes()     
            //self:loadStorageSpx()
            this.initBleedTriggerLine();
            this.setHp(this.getMaxHp());
            // 模型要变大
            this.scale = this.scale + 0.05;
            this.setScale(this.scale);
        };
        StageRoleBoss.prototype.update = function (tick) {
            _super.prototype.update.call(this, tick);
            this.updateWeekBar(tick);
        };
        StageRoleBoss.prototype.updateWeekBar = function (tick) {
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return;
            }
            if (this.isWeeking() && !this.fightScene.isAllPause && !this.fightScene.bTargetPause) {
                this.weekTimer = this.weekTimer - tick * 1000;
                var percent = this.weekTimer / this.weekTimerMax * 100;
                if (percent <= 0) {
                    percent = 0;
                }
                if (percent >= 100) {
                    percent = 100;
                }
                this.weekProgressPer = percent / 100;
            }
        };
        StageRoleBoss.prototype.getWeekProgressPer = function () {
            return this.weekProgressPer;
        };
        StageRoleBoss.prototype.endWeekBar = function () {
        };
        StageRoleBoss.prototype.setWeekTimer = function (timer) {
            this.weekTimerMax = timer;
            this.weekTimer = this.weekTimerMax;
        };
        StageRoleBoss.prototype.setWeekShieldMaxHp = function (shieldHp) {
            this.currShieldHp = 0;
        };
        StageRoleBoss.prototype.calcShieldHp = function (reduce) {
            this.currShieldHp = this.currShieldHp + reduce;
        };
        StageRoleBoss.prototype.getShieldHp = function () {
            return this.currShieldHp;
        };
        StageRoleBoss.prototype.updateDeadPos = function () {
            if (this.deadAni != null && this.deadAni.isVisible() == true) {
                this.deadAni.x = this.x;
                this.deadAni.y = this.y;
            }
        };
        StageRoleBoss.prototype.setDead = function () {
            _super.prototype.setDead.call(this, this);
        };
        return StageRoleBoss;
    }(zj.StageRoleMob));
    zj.StageRoleBoss = StageRoleBoss;
    __reflect(StageRoleBoss.prototype, "zj.StageRoleBoss");
})(zj || (zj = {}));
//# sourceMappingURL=StagePerson.js.map