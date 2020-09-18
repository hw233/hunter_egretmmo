namespace zj {
    export class StagePerson extends StageRole {

        constructor(node, aiTag) {
            super(node, aiTag);
            this.formType = TableEnum.TableEnumFromClassify.TYPE_PERSON;
        }


        public loadSkill(...args) {
            this.loadServerSkill();
            //this.loadLocalSkill();
        }
        public loadLocalSkill() {
            if (this.tableSkillIds.length != this.tableSkillLevels.length) {
                // cclog("the num of skills is equal to nums of levels") assert(false) end 
            }
            for (let i = 0; i < this.tableSkillIds.length; i++) {
                if (this.tableSkillIds[i] > 0) {
                    let info = { id: this.tableSkillIds[i], level: this.tableSkillLevels[i] };

                    let ts = new RoleSkill(this, info);
                    let sType = Helper.getSkillBaseTypeById(this.tableSkillIds[i]);
                    if (sType == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    } else if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    } else if (sType == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        }

        public loadServerSkill(...args) {
            // body
            for (let i = adjustIndex(1); i < this.roleInfo.skills.length; i++) {
                let v = this.roleInfo.skills[i]
                if (v.pos >= message.ESkillType.SKILL_TYPE_COMMON && v.pos <= message.ESkillType.SKILL_TYPE_DEATH) {
                    let info = { id: v.skillId, level: v.level }

                    let ts = new RoleSkill(this, info)
                    if (v.pos == message.ESkillType.SKILL_TYPE_COMMON) {
                        this.tableCommons.push(ts);
                    } else if (v.pos == message.ESkillType.SKILL_TYPE_HANDLE) {
                        this.tableSkills.push(ts);
                    } else if (v.pos == message.ESkillType.SKILL_TYPE_DEATH) {
                        this.tableDeaths.push(ts);
                    }
                }
            }
        }


        public creatPerson(roleInfo, aiId, eCamp, ePosition, eTeamNum, floor, x, y, dir, bEnemy, scale, roleId, appearStage, orderPos?) {
            // body
            this.setPositionType(ePosition)
            this.setRoleId(roleId)
            this.setGeneralId(PlayerHunterSystem.GetGeneralId(roleId))
            //this.setOrderPos(orderPos)
            this.setTeamNum(eTeamNum)
            this.setIsEnemy(bEnemy)

            this.init(roleInfo)
            this.commonCreateRole(eCamp, floor, x, y, dir, appearStage, scale)

            this.setVisible(false);
        }

        public loadBaseData(...args) {
            // general body    
            let instance = PlayerHunterSystem.Table(this.roleId);
            //let generalId = gnrdb.getGeneralId(this.roleId)
            if (this.roleInfo == null) {
                this.mapRoleId = instance.general_roleId
            } else {
                // this.mapRoleId = PlayerHunterSystem.MapFightID(this.roleInfo);
                let tranId = PlayerSkillSystem.getTranMapId(this.roleInfo);
                if (tranId != null && tranId != -1) {
                    this.mapRoleId = tranId;
                }
                else {
                    this.mapRoleId = PlayerHunterSystem.MapFightID(this.roleInfo);
                }
            }

            let transferlevel = null;
            if (this.roleInfo != null) {
                transferlevel = this.roleInfo.transfer_level;
            }

            //instance.general_roleId
            this.formType = instance.role_type

            let body = fromGeneral(this.roleId, transferlevel);
            this.roleName = instance.general_name
            if (PlayerHunterSystem.GetHasGeneral(this.roleId) && this.roleInfo != null) {
                this.headPath = PlayerHunterSystem.Head(this.roleInfo)
            } else {
                this.headPath = body.head_path
            }
            this.battleHead = body.battle_head
            this.supportHead = body.battle_help
            this.bodyPath = body.body_path
            this.halfPath = body.half_path
            // 鏃呭洟鏍囪瘑
            this.groupTag = body.organization
            // 鐗规€
            this.roleFeature = body.features
            // 娲剧郴
            this.roleFaction = instance.type
            this.parryMaxTime = body.parry_time
            this.homingTime = body.homing_time

            this.profession = instance.general_profession
            //this.maxBeanNum = instance.bean_max
            this.maxBeanNum = 1
            this.helpBg = instance.help_bg

            this.tableSkillIds = instance.skill_ids
            this.tableSkillLevels = instance.skill_levels
            //this.tableTalentIds = instance.talent_ids
            //this.tableTalentLevels = instance.talent_levels
            this.tableHideTalentIds = instance.hide_talent_ids

            this.getUpTime = instance.get_up_time
            this.stirUpDef = instance.stir_up_resistance
            this.stirAgainDef = instance.stir_again_def
            this.moveSpeed = instance.move_speed
            let tag = instance.is_stir_up
            this.bStirUp = getBoolean(tag)
            tag = instance.is_gravity
            this.bGravity = getBoolean(tag)
            this.appearRage = instance.rage_reduce

            this.SetAttrib("maxRage", instance.general_rage)
            this.SetAttrib("stiffDef", instance.stiff_resistance)
        }



        public init(roleInfo) {
            // body
            // 方便测试关闭    
            this.loadRoleData(roleInfo);
            this.loadBuffsAttri()
            this.loadAttriPlus()
            // 方便测试开启	
            this.loadBaseData()
            this.loadClientData()
            this.loadModelDB()
            this.loadBody()

            this.loadTalent();
            this.loadAdviserSkill()
            this.loadPokedexSkill();
            this.loadPetSkill()
            this.loadTitleSkill()
            this.loadAttriTalent()
            this.loadSkill()
            this.loadSkillAi()
            this.loadLeagueSkill();
            this.loadSkinProperty();

            this.loadFightSpxRes()
            this.loadStorageSpx()
            this.loadSkillDialog()
            this.initBleedTriggerLine();
            this.setHp(this.getMaxHp())
            if (!this.fightScene.beInPvp()) {
                this.setRage(this.appearRage);
            }
            this.closeRoleDcUI()
        }
        public loadAttriPlus() {
            this.rageReducePlus = this.tableBuffsAttri[TableEnum.EnumGelAttrib.ATTR_RAGE_REDUCE] / 100;
        }
        public loadTitleSkill() {
            let t = Gmgr.Instance.titleSkill[this.ePosition];
            let tTalents = [];
            for (let k in t) {
                let v = t[k];
                let info = {};
                info["id"] = v.skillId
                info["level"] = v.skillLevel
                info["bHide"] = true
                info["source"] = TableEnum.Enum.TalentSource.Title;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        }
        //加载宠物天赋
        public loadPetSkill() {
            let t = Gmgr.Instance.petSkill[this.ePosition];
            let tTalents = [];
            for (let k in t) {
                let v = t[k];
                let info = {};
                info["id"] = v.skillId
                info["level"] = v.skillLevel
                info["bHide"] = true
                info["source"] = TableEnum.Enum.TalentSource.PetSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        }
        //军师天赋（不做全局检测处理)
        public loadAdviserSkill() {
            let t = Gmgr.Instance.adviserSkills[this.ePosition];
            let tTalents = [];
            for (let k in t) {
                let v = t[k];
                let talentIns = TableGeneralTalent.Item(v.skillId);
                if (talentIns == null) {
                    continue;
                }
                if (talentIns.trigger_condition[0] != -1 && talentIns.trigger_condition[0] != this.roleFeature) {
                    continue;
                }
                let info = {};
                info["id"] = v.skillId
                info["level"] = v.skillLevel
                info["bHide"] = true
                info["source"] = TableEnum.Enum.TalentSource.AdviserSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        }
        //图鉴天赋
        public loadPokedexSkill() {
            let t = Gmgr.Instance.pokedexSkill[this.ePosition];
            if (t == null || t[this.roleFaction] == null) {
                return;
            }
            let tTalents = [];
            for (let k in t[this.roleFaction]) {
                let v = t[this.roleFaction][k];
                let info = {};
                info["id"] = v.skillId;
                info["level"] = v.skillLevel;
                info["bHide"] = true;
                info["source"] = TableEnum.Enum.TalentSource.PokedexSkill;
                tTalents.push(info);
            }
            this.initTalent(tTalents);
        }

        public loadTalent() {
            // let arr = Gmgr.Instance.everybodyTalent;
            this.initTalent(Gmgr.Instance.everybodyTalent[this.ePosition])
            this.initTalent(Gmgr.Instance.personalTalent[this.ePosition][this.roleInfo.general_id]);
        }
        /**
         * 读取工会技能附加属性
         */
        public loadLeagueSkill() {
            let list = Gmgr.Instance.leagueSkill[this.ePosition];
            if (list) {
                let result = Helper.CreateGeneralAttrTbl();
                // 根据猎人类型，获取工会技能生效的类型列表
                let typeList = Game.PlayerLeagueSystem.getSkillValueType(this.roleFeature);
                for (let i = 0; i < list.length; i++) {
                    if (typeList.indexOf(list[i].key) >= 0) {
                        // 通过工会技能对象，获取附加的属性类型和附加属性值[属性类型，附加属性值]
                        let [attType, value] = Game.PlayerLeagueSystem.getSkillValue(list[i].key, list[i].value);
                        result[attType - 1] += value;
                    }
                }
                // 添加属性值
                for (let i = 0; i < result.length; i++) {
                    if (result[i] != 0) {
                        let attriType = i + 1;
                        let addValue = 0;
                        // 判断属性是否为百分比加成或者直接加数值
                        if (Game.PlayerLeagueSystem.isSkillPercent(attriType)) {
                            addValue = this.baseAttribs[attriType] * result[i] / 100;
                        } else {
                            addValue = result[i];
                        }
                        this.fightExtraAttribs[attriType] += addValue;
                    }
                }
            }
        }
        /**
         * 皮肤属性加成
         */
        public loadSkinProperty() {
            let tables = Gmgr.Instance.skinSkill[this.ePosition];
            if (tables) {
                let result = PlayerHunterSystem.getSkinProperty(this.baseAttribs, this.roleInfo);
                for (let i = 0; i < result.length; i++) {
                    let attriType = i + 1;
                    this.fightExtraAttribs[attriType] += result[i];
                }
            }
        }
    }


    export class StagePersonGeneral extends StagePerson {

        public senderRole = null;

        constructor(node, aiTag) {
            super(node, aiTag)
            this.setRoleType(TableEnum.TableEnumRoleType.ROLE_TYPE_GENERAL)
            this.senderRole = null;
        }
    }

    export class StageRoleBoss extends StageRoleMob {
        constructor(node, aiTag, roleId) {
            super(node, aiTag, roleId);
            this.setRoleType(TableEnum.TableEnumRoleType.ROLE_TYPE_BOSS);
            this.deadAni = null;
            this.bossRelHandleSkillNum = 0;

            this.currShieldHp = 0;
            this.weekTimer = 0;
            this.weekTimerMax = 0;
            this.weekProgressPer = 1;
        }
        public enterWeekAni = [];
        public deadAni;
        public bossRelHandleSkillNum;
        public weekTimer;
        public weekTimerMax;
        public weekProgressPer;
        public release() {
            //this.fightScene.getUpEffectLayer().removeChild(this.deadAni);
            super.release();
        }
        public init() {
            super.init();
            this.loadSkillDialog();
            this.initWeekSpx();
        }

        public startFight() {
            super.startFight();
            if (this.isActivityBoss()) {
                this.fightScene.delSqueue(this.roleId, this.bEnemy);
            }
        }
        private spxWeeking;
        private exitWeekAni;
        public initWeekSpx() {
            if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return;
            }
            this.enterWeekAni = [];
            let enterTbl = [8001058, 8001059];
            for (let i = 0; i < enterTbl.length; i++) {
                let [enter] = HunterSpineX(enterTbl[i], 1, null, TableClientFightAniSpineSource.Item(enterTbl[i]).json);
                enter.setVisibleSpx(false);
                this.nodeRoot.addChild(enter.spine);
                this.enterWeekAni.push(enter);
            }
            [this.spxWeeking] = HunterSpineX(8001060, 1, null, TableClientFightAniSpineSource.Item(8001060).json);
            this.spxWeeking.setVisibleSpx(false);
            this.nodeRoot.addChild(this.spxWeeking.spine);

            this.exitWeekAni = [];
            enterTbl = [8001058, 8001059];
            for (let i = 0; i < enterTbl.length; i++) {
                let [exit] = HunterSpineX(enterTbl[i], 1, null, TableClientFightAniSpineSource.Item(enterTbl[i]).json);
                exit.setVisibleSpx(false);
                this.nodeRoot.addChild(exit.spine);
                this.exitWeekAni.push(exit);
            }
        }
        public playEnterWeek() {
            for (let i = 0; i < this.enterWeekAni.length; i++) {
                this.enterWeekAni[i].setVisibleSpx(true)
                this.enterWeekAni[i].SetPosition(this.x, this.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground));
                this.enterWeekAni[i].stopAllActions()
                this.enterWeekAni[i].SetLoop(false)
                this.enterWeekAni[i].ChangeAction(0)
            }

            this.spxWeeking.setVisibleSpx(true)
            this.spxWeeking.SetPosition(this.x, this.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions()
            this.spxWeeking.SetLoop(false)
            this.spxWeeking.ChangeAction(0);
        }
        public playWeeking() {
            this.spxWeeking.setVisibleSpx(true)
            this.spxWeeking.SetPosition(this.x, this.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions()
            this.spxWeeking.SetLoop(true)
            this.spxWeeking.ChangeAction(1);
        }
        public playExitWeek() {
            for (let i = 0; i < this.exitWeekAni.length; i++) {
                this.exitWeekAni[i].setVisibleSpx(true)
                this.exitWeekAni[i].SetPosition(this.x, this.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground));
                this.exitWeekAni[i].stopAllActions()
                this.exitWeekAni[i].SetLoop(false)
                this.exitWeekAni[i].ChangeAction(0)
            }

            this.spxWeeking.setVisibleSpx(true)
            this.spxWeeking.SetPosition(this.x, this.floor + (Gmgr.Instance.floor - Gmgr.Instance.ground));
            this.spxWeeking.stopAllActions()
            this.spxWeeking.SetLoop(false)
            this.spxWeeking.ChangeAction(2);
        }
        public enterWeekTrigger() {
            super.enterWeekTrigger();
            this.fightScene.staticBossWeekEnd(this);
            this.willlEnterWeek();
        }
        public leaveWeekTrigger() {
            super.leaveWeekTrigger();
            this.fightScene.staticBossWeekEnd(this);
            this.fightScene.openFillNextMonster();
            this.changeWeekAni(3);
            this.appearFight();
            this.startFight();
        }
        public changeOtherEnterweek() {
            super.changeOtherEnterweek();
            this.playEnterWeek()
            this.fightScene.staticBossWeekBegin(this)
            this.fightScene.delSqueue(this.roleId, this.bEnemy);
        }
        public changeOtherWeeking() {
            super.changeOtherWeeking();
            this.playWeeking();
        }
        public changeOtherExitweek() {
            super.changeOtherExitweek();
            this.playExitWeek();
            this.fightScene.staticBossWeekBegin(this);
        }
        public skillExtraFun(sType) {
            if (sType == message.ESkillType.SKILL_TYPE_HANDLE) {
                this.bossRelHandleSkillNum = this.bossRelHandleSkillNum + 1;
            }
        }
        public initServer(roleInfo) {
            super.initServer(roleInfo);
        }
        public loadStorageSpx() {
            super.loadStorageSpx();
        }
        public changeWeekAni(state) {
            let [numX, numY] = this.getHurtNumPos();
            if (state == 1) {
                this.createWeekNumber(numX, numY);
            } else if (state == 2) {
                this.createRidweekNumber(numX, numY);
            } else if (state == 3) {
                this.createAbilityproNumber(numX, numY);
            }
        }
        public willlEnterWeek() {
            this.changeWeekAni(1);
            this.clearUseBuffs(TableEnum.TableBuffUseType.Buff_Use_Bad);
        }
        public willLeaveWeek(newBossId) {
            let oldRoleId = this.roleId;
            this.fightScene.tableEnemys[oldRoleId] = null;
            delete this.fightScene.tableEnemys[oldRoleId];
            this.fightScene.cleanCollision(this)

            this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_ExitWeek)

            this.setRoleId(newBossId)
            this.setGeneralId(newBossId)

            this.clearBossInfo();
            this.reloadBossInfo();
            this.changeWeekAni(2);

            this.roleInfo = this.createRoleInfo();
            this.fightScene.tableEnemys[newBossId] = this;
            this.fightScene.pushSqueue(this.roleId, this.bEnemy);
            this.fightScene.addCollision(this);
        }
        public clearBossInfo() {
            this.clearAllBuffs();
            this.clearTblInfo();
            this.hurtTotalValue = 0;
            this.recoverTotalValue = 0;
            this.weekProgressPer = 1;
        }
        public clearTblInfo() {
            let i = 1;
            while (i < this.tableCommons.length) {
                CC_SAFE_DELETE(this.tableCommons[i]);
                i = i + 1;
            }
            this.tableCommons = [];

            i = 1;
            while (i < this.tableSkills.length) {
                CC_SAFE_DELETE(this.tableSkills[i]);
                i = i + 1;
            }
            this.tableSkills = [];
            i = 1;
            while (i < this.tableDeaths.length) {
                CC_SAFE_DELETE(this.tableDeaths[i]);
                i = i + 1;
            }
            this.tableDeaths = [];
            i = 1;
            while (i < this.tableEffects.length) {
                CC_SAFE_DELETE(this.tableEffects[i]);
                i = i + 1;
            }
            this.tableEffects = [];
            i = 1;
            while (i < this.tableHits.length) {
                CC_SAFE_DELETE(this.tableHits[i]);
                i = i + 1;
            }
            this.tableHits = [];
            i = 1;
            while (i < this.tableNumbers.length) {
                CC_SAFE_DELETE(this.tableNumbers[i]);
                i = i + 1;
            }
            this.tableNumbers = [];
            i = 1;
            while (i < this.tableBuffs.length) {
                CC_SAFE_DELETE(this.tableBuffs[i]);
                i = i + 1;
            }
            this.tableBuffs = [];

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
            this.tableClean = [];

            this.tableTalentEffect = {};
            this.tableSkillIds = [];
            this.tableSkillLevels = [];
            this.tableTalentIds = [];
            this.tableTalentLevels = [];
            this.tableHideTalentIds = [];
            this.tableDeathTalent = [];
        }
        public reloadBossInfo() {
            this.loadBaseData()
            this.loadFightData()
            //self:loadModelDB()  
            //self:loadBody()   

            this.loadTalent()
            this.loadAttriTalent()
            this.loadSkill()
            this.loadSkillAi()

            //self:loadFightSpxRes()     
            //self:loadStorageSpx()
            this.initBleedTriggerLine()
            this.setHp(this.getMaxHp())

            // 模型要变大
            this.scale = this.scale + 0.05;
            this.setScale(this.scale);
        }
        public update(tick) {
            super.update(tick);
            this.updateWeekBar(tick);
        }
        public updateWeekBar(tick) {
            if (Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_RELIC) {
                return;
            }
            if (this.isWeeking() && !this.fightScene.isAllPause && !this.fightScene.bTargetPause) {
                this.weekTimer = this.weekTimer - tick * 1000;
                let percent = this.weekTimer / this.weekTimerMax * 100;
                if (percent <= 0) {
                    percent = 0;
                }
                if (percent >= 100) {
                    percent = 100;
                }
                this.weekProgressPer = percent / 100;
            }
        }
        public getWeekProgressPer() {
            return this.weekProgressPer;
        }
        public endWeekBar() {

        }
        public setWeekTimer(timer) {
            this.weekTimerMax = timer;
            this.weekTimer = this.weekTimerMax;
        }
        public setWeekShieldMaxHp(shieldHp) {
            this.currShieldHp = 0;
        }
        public calcShieldHp(reduce) {
            this.currShieldHp = this.currShieldHp + reduce;
        }
        public getShieldHp() {
            return this.currShieldHp;
        }
        public updateDeadPos() {
            if (this.deadAni != null && this.deadAni.isVisible() == true) {
                this.deadAni.x = this.x;
                this.deadAni.y = this.y;
            }
        }
        public setDead() {
            super.setDead(this);
        }
    }
}