namespace zj {
    export class FightLoading {
        private static instance;
        public constructor() {
            Game.EventManager.on(GameEvent.LOGING_SCENE, this.openPanel, this);
        }
        public static getInstance(): FightLoading {
            if (this.instance == null) {
                this.instance = new FightLoading();
            }
            return this.instance;
        }
        public comfun: Function;
        public thisAny: any;
        private resMax;
        private currNum;
        public fightType;
        /**开始预加载当前战斗所有资源 fightType战斗类型 fun加载成功回调*/
        public loadFightRes(fightType, fun, _thisAny) {
            this.fightType = fightType;
            this.comfun = fun;
            this.thisAny = _thisAny;
            this.resMax = 0;
            this.currNum = 0;
            StageSceneManager.Instance.clearScene();
            StageSceneManager.Instance.newTemporaryScene();
            Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
        }
        private openPanel() {
            if (!this.comfun) {
                return;
            }
            let imgUrl = this.loadMap();
            imgUrl.push(UIConfig.UIConfig_CommonBattle.hp_board);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.hp_blood_pdh);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.hp_blood_red);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.hp_blood_r);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.hp_blood_l);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.blood_split);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.cd_bar);
            imgUrl.push(UIConfig.UIConfig_CommonBattle.cd_bar_light);
            imgUrl.push("buff_img_zhongdu_png");
            imgUrl.push("ui_battle_BurBossBlood1_png");
            imgUrl.push("ui_battle_BurBossBloodWhite_png");
            imgUrl.push("ui_battle_BurBossBlood3_png");
            imgUrl.push("ui_battle_BurBossBlood2_png");
            imgUrl.push("buff_icon_zhongdu_png");

            imgUrl.push("fight_number_shanghai1_png");
            imgUrl.push("fight_number_shanghai1_fnt");
            imgUrl.push("fight_number_shanghai3_png");
            imgUrl.push("fight_number_shanghai3_fnt");
            imgUrl.push("fight_number_baoji_png");
            imgUrl.push("fight_number_baoji_fnt");
            imgUrl.push("fight_number_shanghai2_png");
            imgUrl.push("fight_number_shanghai2_fnt");
            imgUrl.push("fight_number_nuqireduce_png");
            imgUrl.push("fight_number_nuqireduce_fnt");
            imgUrl.push("fight_number_nuqiadd_png");
            imgUrl.push("fight_number_nuqiadd_fnt");

            imgUrl.push("fight_game_baoji_png");
            imgUrl.push("fight_game_miss_png");
            imgUrl.push("fight_game_break_png");
            imgUrl.push("fight_game_immune_png");
            imgUrl.push("fight_game_nuqiadd_png");
            imgUrl.push("fight_game_nuqireduce_png");
            imgUrl.push("fight_game_zhansha_png");
            imgUrl.push("fight_number_cdadd_png");
            imgUrl.push("fight_number_cdreduce_png");
            imgUrl.push("fight_game_fantan_png");
            imgUrl.push("fight_number_lianjinum_png");
            let Mainui = UIResource["Fight_Main"];
            for (let i = 0; i < Mainui.length; i++) {
                imgUrl.push(Mainui[i]);
            }

            let formation = Game.PlayerFormationSystem.curFormations[this.fightType - 1];
            let hunArr = [];
            let resArr = ["zd_jisha", "zd_jisha", "ui_zhandou_yuanhu", "zd_xuli", "ui_zhandou_zhandoukaishi", "ui_zhandou_02_eff", "zd_tuoguan_eff", "buff_tongyong", "zd_shijiandaole", "buff_hudun", "buff_kongzhi", "buff_baozha", "zd_jineng_wenzi", "zd_siwang"];
            if (formation) {
                for (let i = 0; i < formation.generals.length; i++) {
                    if (formation.generals[i] != 0) {
                        hunArr.push(formation.generals[i]);
                    }
                }
                for (let i = 0; i < formation.supports.length; i++) {
                    if (formation.supports[i] != 0) {
                        hunArr.push(formation.supports[i]);
                    }
                }
            }

            if (this.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {//通缉令
                hunArr = [];
                let generals = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].generals;
                let reserves = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].reserves;
                let supports = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].supports;
                for (let i = 0; i < generals.length; i++) {
                    if (generals[i] != 0) {
                        hunArr.push(generals[i]);
                    }
                }
                for (let i = 0; i < supports.length; i++) {
                    if (supports[i] != 0) {
                        hunArr.push(supports[i]);
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                let arr = this.loadFightMonster();
                for (let i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {//遗迹
                hunArr = [];
                resArr.push("xuruo_dahudun", "xuruo_hudun", "xuruo_leidian");
                let generals = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt].generals;
                let supports = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt].supports;
                for (let i = 0; i < generals.length; i++) {
                    if (generals[i] != 0) {
                        hunArr.push(generals[i]);
                    }
                }
                for (let i = 0; i < supports.length; i++) {
                    if (supports[i] != 0) {
                        hunArr.push(supports[i]);
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                let arr = this.loadFightMonster();
                for (let i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK || this.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {//本服格斗场//跨服格斗场
                let other = [];
                if (this.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                    resArr.push("ui_gedou_03");
                    let attArr = Game.PlayerFormationSystem.formatsSingleAttack;//自己
                    for (let k in attArr) {
                        let v = attArr[k];
                        for (let i = 0; i < v.generals.length; i++) {
                            if (v.generals[i] != 0) {
                                hunArr.push(v.generals[i]);
                            }
                        }
                        for (let i = 0; i < v.supports.length; i++) {
                            if (v.supports[i] != 0) {
                                hunArr.push(v.supports[i]);
                            }
                        }
                    }
                    other = Game.PlayerBattleSystem.singBattle;
                } else {
                    let date = Game.PlayerBattleSystem.battleDetailFormation;
                    let info = { simpleInfo: { generals: [], supports: [] } };
                    for (let i = 0; i < date.generals.length; i++) {
                        info.simpleInfo.generals.push(date.generals[i]);
                    }
                    for (let i = 0; i < date.supports.length; i++) {
                        info.simpleInfo.supports.push(date.supports[i]);
                    }
                    other = [info];
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                let hunObj = {};
                let aaa = Game.PlayerBattleSystem.battleDetailFormation;
                for (let i = 0; i < other.length; i++) {
                    let generals = other[i].simpleInfo.generals;
                    let supports = other[i].simpleInfo.supports;
                    for (let i = 0; i < generals.length; i++) {
                        if (generals[i].general_id != 0) {
                            hunArr.push(generals[i].general_id);
                            hunObj[generals[i].general_id] = generals[i];
                        }
                    }
                    for (let i = 0; i < supports.length; i++) {
                        if (supports[i].general_id != 0) {
                            hunArr.push(supports[i].general_id);
                            hunObj[supports[i].general_id] = supports[i];
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                let hunObj = {};
                hunArr = [];
                let other = Game.PlayerBattleSystem.battleDetailFormation;
                let generals = other.generals;
                let supports = other.supports;
                for (let i = 0; i < generals.length; i++) {
                    if (generals[i].general_id != 0) {
                        hunArr.push(generals[i].general_id);
                        hunObj[generals[i].general_id] = generals[i];
                    }
                }
                for (let i = 0; i < supports.length; i++) {
                    if (supports[i].general_id != 0) {
                        hunArr.push(supports[i].general_id);
                        hunObj[supports[i].general_id] = supports[i];
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {//飞龙营地
                resArr.push("ui_gedou04_eff");
                let hunObj = {};
                hunArr = [];
                let hArr = PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo;
                for (let i = 0; i < hArr.length; i++) {
                    let generals = hArr[i].generals;
                    let supports = hArr[i].supports;
                    for (let i = 0; i < generals.length; i++) {
                        if (generals[i].general_id != 0) {
                            hunArr.push(generals[i].general_id);
                            hunObj[generals[i].general_id] = generals[i];
                        }
                    }
                    for (let i = 0; i < supports.length; i++) {
                        if (supports[i].general_id != 0) {
                            hunArr.push(supports[i].general_id);
                            hunObj[supports[i].general_id] = supports[i];
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true, hunObj[hunArr[i]]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                let arr = this.loadFightMonster();
                for (let i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                let other = Game.PlayerBattleSystem.battleDetailFormation;
                let generals = other.generals;
                let supports = other.supports;
                let hunObj = {};
                for (let i = 0; i < generals.length; i++) {
                    if (generals[i].general_id != 0) {
                        hunArr.push(generals[i].general_id);
                        hunObj[generals[i].general_id] = generals[i];
                    }
                }
                for (let i = 0; i < supports.length; i++) {
                    if (supports[i].general_id != 0) {
                        hunArr.push(supports[i].general_id);
                        hunObj[supports[i].general_id] = supports[i];
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                resArr.push("ui_gedou_03");
                let attArr = Game.PlayerFormationSystem.formatsSingleAttack;
                for (let k in attArr) {
                    let v = attArr[k];
                    for (let i = 0; i < v.generals.length; i++) {
                        if (v.generals[i] != 0) {
                            hunArr.push(v.generals[i]);
                        }
                    }
                    for (let i = 0; i < v.supports.length; i++) {
                        if (v.supports[i] != 0) {
                            hunArr.push(v.supports[i]);
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                let attArr1 = Game.PlayerFormationSystem.threeBattleInfo;
                for (let k in attArr1) {
                    let v = attArr1[k];
                    for (let i = 0; i < v.generals.length; i++) {
                        if (v.generals[i].general_id != 0) {
                            hunArr.push(v.generals[i].general_id);
                        }
                    }
                    for (let i = 0; i < v.supports.length; i++) {
                        if (v.supports[i].general_id != 0) {
                            hunArr.push(v.supports[i].general_id);
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {//新手
                hunArr = [];
                resArr = ["ui_zhandou_yuanhu", "zd_xuli", "buff_tongyong", "zd_jineng_wenzi", "zd_siwang"];
                let hunterName = ["wojin", "kuluoluo", "leiouli"];//这是敌人和自己的副将需要技能的
                for (let k in teachBattle.teachLeftGeneral) {//这个里面的都是全加载的
                    let v = teachBattle.teachLeftGeneral[k];
                    if (v.id != 0) {
                        hunArr.push(v.id);
                    }
                }
                for (let k in teachBattle.teachLeftSupport) {
                    let v = teachBattle.teachLeftSupport[k];
                    if (v.id != 0) {
                        //if(hunterName.indexOf(k) != -1){
                        hunArr.push(v.id);
                        //}
                    }
                }
                let oneHunArr = [];
                for (let k in teachBattle.teachRightGeneral) {
                    let v = teachBattle.teachRightGeneral[k];
                    if (v.id != 0) {
                        if (hunterName.indexOf(k) != -1) {
                            hunArr.push(v.id);
                        } else {
                            oneHunArr.push(v.id);
                        }
                    }
                }
                for (let i = 0; i < oneHunArr.length; i++) {
                    let name = this.loadHunterSpx(oneHunArr[i]);
                    resArr.push(name);
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i]);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                let boss = Game.PlayerZorkSystem.zorkBoss.bossInfo;
                for (let i = 0; i < 4; i++) {
                    let bossArr = boss.bossInfo["monster_pos" + (i + 1)];
                    for (let b = 0; b < bossArr.length; b++) {
                        let arr = this.loadFightHunter(Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId, null, bossArr[b]);
                        for (let j = 0; j < arr.length; j++) {
                            resArr.push(arr[j]);
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {//鼠崽闹春
                for (let i = 0; i < hunArr.length; i++) {
                    let arr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                let arr = this.loadFightMonster();
                for (let i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            } else {
                let maxMobID = Game.PlayerInstanceSystem.curInstances[this.fightType].maxMobID;
                if (maxMobID >= teachBattle.teach_fake_help.start_fake_stage_id && maxMobID <= teachBattle.teach_fake_help.max_fake_stage_id) {
                    // hunArr.push(102,114);//引导副本副将
                    let arrrr = [102, 114]
                    for (let i = 0; i < arrrr.length; i++) {
                        let harr = this.loadFightHunter(arrrr[i]);
                        for (let j = 0; j < harr.length; j++) {
                            resArr.push(harr[j]);
                        }
                    }
                }
                for (let i = 0; i < hunArr.length; i++) {
                    let harr = this.loadFightHunter(hunArr[i], true);
                    for (let j = 0; j < harr.length; j++) {
                        resArr.push(harr[j]);
                    }
                }
                let arr = this.loadFightMonster();
                for (let i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            // 添加援护资源
            let harr = this.loadFightHunter(FightHelper.FIGHT_ASSISTANCE, true);
            for (let j = 0; j < harr.length; j++) {
                resArr.push(harr[j]);
            }
            this.resMax = (1 + resArr.length);
            this.startLoadFight(imgUrl, resArr);
        }
        public resArr = [];
        public groupNameImage = "";
        //imgUrl地图和其他图片资源 resArr龙骨资源
        private startLoadFight(imgUrl, resArr) {
            let groupName = "imgUrl" + egret.getTimer();
            this.groupNameImage = groupName;
            StageSceneManager.Instance.temporaryScene.cachedGroupNames[groupName] = 0;
            if (!RES.createGroup(groupName, imgUrl, true)) {
                let str = LANG("创建资源组失败:") + groupName;
                //toast(str);
                return;
            }
            Game.RESGroupManager.loadGroup(groupName)
                .then(() => {//加载成功    
                    this.resComplete();
                })
                .catch((error) => {
                    //失败
                    //toast(error);
                    return;
                });
            this.resArr = resArr;
            for (let i = 0; i < resArr.length; i++) {
                Game.DragonBonesManager.preloadDragonbone(StageSceneManager.Instance.temporaryScene, resArr[i])
                    .then(() => {
                        this.resComplete();
                    })
                    .catch((error) => {
                        //toast(error);
                    });
            }
        }
        private resComplete() {
            this.currNum = this.currNum + 1;
            if (this.currNum == this.resMax) {//加载完成回调成功
                for (let i = 0; i < this.resArr.length; i++) {
                    let [spx,] = HunterSpineX(1, 1, null, this.resArr[i], false);
                    dragonBonesPool.getInstance().returnItem(spx.name, spx);
                }
                this.comfun.call(this.thisAny);
                this.comfun = null;
                this.thisAny = null;
            }
            Game.EventManager.event(GameEvent.LOGING_SCENE_PROGRESS, this.currNum / this.resMax);
        }
        //只是获取人物模型
        public loadHunterSpx(roleId) {
            let index = Helper.getGeneralIndexById(roleId);
            let generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
            let instanceHun;
            instanceHun = PlayerHunterSystem.Table(roleId);
            let mapRoleId;
            if (generalInfo == null) {
                if (!instanceHun) {
                    instanceHun = TableClientMonsterLocal.Item(roleId);
                    mapRoleId = instanceHun.monster_roleId;
                } else {
                    mapRoleId = instanceHun.general_roleId;
                }
            } else {
                mapRoleId = PlayerHunterSystem.MapFightID(generalInfo);
            }

            let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
            let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);//人物模型
            return spineTable.json;
        }
        //获取一个猎人所有资源
        private loadFightHunter(roleId, isself = false, other?) {
            let res = [];
            let index;
            let generalInfo;
            if (isself) {
                index = Helper.getGeneralIndexById(roleId);
                generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
            }
            let instanceHun;
            instanceHun = PlayerHunterSystem.Table(roleId);
            // if(other != null){
            //     let generals = other.generals;
            //     let supports = other.supports;
            //     for(let i = 0;i<generals.length;i++){
            //         if(generals[i].general_id == roleId){
            //             generalInfo = generals[i];
            //             break;
            //         }
            //     }
            //     for(let i = 0;i<supports.length;i++){
            //         if(supports[i].general_id == roleId){
            //             generalInfo = supports[i];
            //             break;
            //         }
            //     }
            // }
            let mapRoleId = 0;
            if (generalInfo == null) {
                if (!instanceHun) {
                    instanceHun = TableClientMonsterLocal.Item(roleId);
                    if (!instanceHun) {
                        mapRoleId = roleId;
                        instanceHun = other.baseInfo;//世界boss走这里
                    } else {
                        mapRoleId = instanceHun.monster_roleId;
                    }
                } else {
                    mapRoleId = instanceHun.general_roleId;
                    mapRoleId = PlayerHunterSystem.MapFightID(other);
                }
            } else {
                // mapRoleId = PlayerHunterSystem.MapFightID(generalInfo);
                let tranId = PlayerSkillSystem.getTranMapId(generalInfo);
                if (tranId != null && tranId != -1) {
                    mapRoleId = tranId;
                }
                else {
                    mapRoleId = PlayerHunterSystem.MapFightID(generalInfo);
                }
            }
            if (other && mapRoleId == 0) {
                mapRoleId = PlayerHunterSystem.MapFightID(other);
            }
            // if(instanceHun){
            //     let bodySpxId = TableMapRole.Item(instanceHun.general_roleId).body_spx_id;
            //     let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);//人物模型
            //     res.push(spineTable.json);
            // }
            let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
            let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);//人物模型
            res.push(spineTable.json);
            let skillArr = [];
            if (generalInfo) {
                for (let ss = 0; ss < generalInfo.skills.length; ss++) {
                    skillArr.push(generalInfo.skills[ss].skillId);
                }
            } else {
                skillArr = [];
                for (let ssid = 0; ssid < instanceHun.skill_ids.length; ssid++) {
                    let skillu = PlayerSkillSystem.Table(instanceHun.skill_ids[ssid])
                    for (let uu = 0; uu < skillu.skill_units.length; uu++) {
                        skillArr.push(skillu.skill_units[uu]);//不是自己的需要去表里去一下其他的都是skillunitID
                    }

                }
            }
            for (let i = 0; i < skillArr.length; i++) {//技能ID不是表里的ＩＤ
                let skillun = PlayerSkillSystem.UnitInfo(skillArr[i])
                if (skillun && skillun.bg_spx_id > 0) {
                    let skillbg = TableClientFightAniSpineSource.Item(skillun.bg_spx_id);
                    //if(res.indexOf(skillbg.json) == -1){
                    res.push(skillbg.json);
                    //}
                }
                let id = -1;
                let instance = PlayerSkillSystem.Table(skillArr[i]);
                for (let j = 0; j < instance.skill_units.length; j++) {//技能单元
                    let tableSkillUnit = TableSkillUnit.Table();
                    let tableAllAction = tableSkillUnit[instance.skill_units[j]].all_action;
                    for (let a = 0; a < tableAllAction.length; a++) {//技能action
                        let action = PlayerSkillSystem.ActionInfo(tableAllAction[a]);
                        for (let e = 0; e < action.effects_id.length; e++) {//技能
                            let effect = PlayerSkillSystem.EffectInfo(action.effects_id[e]);
                            if (!effect) {
                                continue;
                            }
                            let skill = TableClientFightAniSpineSource.Item(effect.effects_spx_id);
                            //if(res.indexOf(skill.json) == -1){
                            res.push(skill.json);
                            //}
                            if (effect.effect_buff_id > 0) {
                                let tableBuff = TableSkillBuff.Table();
                                let buff_type = tableBuff[effect.effect_buff_id].base_type;
                                let tableBuffBase = TableClientBuffBase.Table();
                                let spx_id = tableBuffBase[buff_type].spx_id;
                                if (spx_id > 0) {
                                    let buffname = TableClientAniSpxSource.Item(spx_id).name;
                                    //if(res.indexOf(buffname) == -1){
                                    res.push(buffname);
                                    //}
                                }

                            }
                            for (let h = 0; h < effect.hit_effects_ids.length; h++) {//受击特效
                                if (effect.hit_effects_ids[h] != -1) {
                                    let tableHit = TableClientSkillHiteffect.Table();
                                    let hit_id = tableHit[effect.hit_effects_ids[h]].effects_spx_id
                                    let hit = TableClientFightAniSpineSource.Item(hit_id);
                                    //if(res.indexOf(hit.json) == -1){
                                    res.push(hit.json);
                                    //}
                                }
                            }
                        }
                    }
                }
            }
            return res;
        }
        private posArr = ["monster_pos1", "monster_pos2", "monster_pos3", "monster_pos4"];
        //获取当前战斗所有怪物 除了其他人猎人模型
        private loadFightMonster() {//
            let resArr = [];
            let arrMonster = [];
            let arr = PlayerStageSystem.stageInfoTbl;
            for (let i = 0; i < arr.length; i++) {
                let armystage = arr[i];
                for (let j = 0; j < this.posArr.length; j++) {
                    let armyArr = armystage[this.posArr[j]];
                    for (let a = 0; a < armyArr.length; a++) {
                        arrMonster.push(armyArr[a].curInfo.monster_id);
                    }
                }
            }
            for (let b = 0; b < arrMonster.length; b++) {
                let instance = Game.PlayerMobSystem.Instance(arrMonster[b]);
                // for(let ta = 0;ta<instance.talent_ids.length;ta++){//天赋
                //     let tid = instance.talent_ids[ta];
                //     if(tid > 0){
                //         let tableTalent = TableGeneralTalent.Table();
                //         let effectArr = tableTalent[tid].talent_effect;
                //         for(let te = 0;te<effectArr.length;te++){
                //             if(effectArr[te] > 0){
                //                 let spxid = TableGeneralTalentEffect.Table()[effectArr[te]].spx_id;
                //                 if(spxid > 0){
                //                     let tname = TableClientAniSpxSource.Item(spxid).name;
                //                     if(resArr.indexOf(tname) == -1){
                //                         resArr.push(tname);
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
                let bodySpxId = TableMapRole.Item(instance.monster_roleId).body_spx_id;
                let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);//人物模型
                resArr.push(spineTable.json);
                let info = { skills: [] }
                for (let c = 0; c < instance.skill_ids.length; c++) {
                    if (instance.skill_ids[c] > 0) {
                        let _level = instance.skill_levels[c];
                        let _id = instance.skill_ids[c];
                        //真实ID = 表里ID +（技能等级-1）*1000000	
                        //info.skills.push(_id + (_level - 1) * 1000000);
                        info.skills.push(_id);
                    }
                }
                for (let i = 0; i < info.skills.length; i++) {//技能ID
                    let unItem = PlayerSkillSystem.Table(info.skills[i]);
                    for (let u = 0; u < unItem.skill_units.length; u++) {
                        let skillun = PlayerSkillSystem.UnitInfo(unItem.skill_units[0])
                        if (skillun && skillun.bg_spx_id > 0) {
                            let skillbg = TableClientFightAniSpineSource.Item(skillun.bg_spx_id);
                            //if(resArr.indexOf(skillbg.json) == -1){
                            resArr.push(skillbg.json);
                            //}
                        }
                        let tableAllAction = skillun.all_action;
                        for (let a = 0; a < tableAllAction.length; a++) {//技能action
                            let action = PlayerSkillSystem.ActionInfo(tableAllAction[a]);
                            for (let e = 0; e < action.effects_id.length; e++) {//技能
                                let effect = PlayerSkillSystem.EffectInfo(action.effects_id[e]);
                                if (!effect) {
                                    continue;
                                }
                                let skill = TableClientFightAniSpineSource.Item(effect.effects_spx_id);
                                //if(resArr.indexOf(skill.json) == -1){
                                resArr.push(skill.json);
                                //}
                                if (effect.effect_buff_id > 0) {
                                    let tableBuff = TableSkillBuff.Table();
                                    let buff_type = tableBuff[effect.effect_buff_id].base_type;
                                    let tableBuffBase = TableClientBuffBase.Table();
                                    let spx_id = tableBuffBase[buff_type].spx_id;
                                    if (spx_id > 0) {
                                        let buffname = TableClientAniSpxSource.Item(spx_id).name;
                                        //if(resArr.indexOf(buffname) == -1){
                                        resArr.push(buffname);
                                        //}
                                    }
                                }
                                for (let h = 0; h < effect.hit_effects_ids.length; h++) {//受击特效
                                    if (effect.hit_effects_ids[h] != -1) {
                                        let tableHit = TableClientSkillHiteffect.Table();
                                        let hit_id = tableHit[effect.hit_effects_ids[h]].effects_spx_id
                                        let hit = TableClientFightAniSpineSource.Item(hit_id);
                                        //if(resArr.indexOf(hit.json) == -1){
                                        resArr.push(hit.json);
                                        //}
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return resArr;
        }
        //获取当前战斗的地图ID
        private loadMap() {
            let id = 7;
            if (this.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                let cell = Game.PlayerWantedSystem.wantedCurPos;
                id = TableWanted.Item(cell).battle_bg;
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                let cell = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID
                let tableInstance = TableInstance.Table();
                id = tableInstance[cell].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                let cell = Game.PlayerTowerSystem.towerInfo.towerCur;
                let tableTower = TableTower.Table();
                id = tableTower[cell].battle_bg
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                // let tableTower = TableTower.Table();
                // id = tableTower[cell].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                let tblLeagueBoss = TableLeagueAnimals.Table();
                id = tblLeagueBoss[1].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                let tblLicense = TableMissionLicence.Table();
                id = tblLicense[Game.PlayerMissionSystem.licenseCurPos].battle_bg;
            } else if (this.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                id = TableInstanceRelic.Item(Game.PlayerMissionSystem.fightExt + 1).mapBg;
            } else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                id = teachBattle.bgTeachId;
            }
            let _json = Game.ConfigManager.getTable(id + ".json");
            let urlArr: string[] = [];
            for (let i = 0; i < _json["gameobjects"].length; i++) {
                let mainTbl = _json["gameobjects"][i];
                for (let k = 0; k < mainTbl["gameobjects"].length; k++) {
                    let obj = mainTbl["gameobjects"][k];
                    for (let j = 0; j < obj["gameobjects"].length; j++) {
                        let data = obj["gameobjects"][j];
                        for (let l = 0; l < data["components"].length; l++) {
                            let fData = data["components"][l];
                            let fileData = fData.fileData;
                            let imgUrl = fileData.path;
                            let egretUrl = this.CocosUrlToEgretUrl(imgUrl);
                            if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
                                urlArr.push(egretUrl);
                            }
                        }
                    }
                }
            }
            return urlArr;
        }
        /**cocos场景配置坐标转换成Egret坐标 */
        private CocosUrlToEgretUrl(url: string) {
            let arrS: string[] = url.split(".");
            let sourceArr: string[] = arrS[0].split("/");
            let source: string = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        }
    }
}