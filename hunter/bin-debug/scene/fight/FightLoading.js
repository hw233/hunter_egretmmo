var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var FightLoading = (function () {
        function FightLoading() {
            this.resArr = [];
            this.groupNameImage = "";
            this.posArr = ["monster_pos1", "monster_pos2", "monster_pos3", "monster_pos4"];
            zj.Game.EventManager.on(zj.GameEvent.LOGING_SCENE, this.openPanel, this);
        }
        FightLoading.getInstance = function () {
            if (this.instance == null) {
                this.instance = new FightLoading();
            }
            return this.instance;
        };
        /**开始预加载当前战斗所有资源 fightType战斗类型 fun加载成功回调*/
        FightLoading.prototype.loadFightRes = function (fightType, fun, _thisAny) {
            this.fightType = fightType;
            this.comfun = fun;
            this.thisAny = _thisAny;
            this.resMax = 0;
            this.currNum = 0;
            zj.StageSceneManager.Instance.clearScene();
            zj.StageSceneManager.Instance.newTemporaryScene();
            zj.Game.EventManager.event(zj.GameEvent.OPEN_LOGING_SCENE);
        };
        FightLoading.prototype.openPanel = function () {
            if (!this.comfun) {
                return;
            }
            var imgUrl = this.loadMap();
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.hp_board);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.hp_blood_pdh);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.hp_blood_red);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.hp_blood_r);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.hp_blood_l);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.blood_split);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.cd_bar);
            imgUrl.push(zj.UIConfig.UIConfig_CommonBattle.cd_bar_light);
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
            var Mainui = zj.UIResource["Fight_Main"];
            for (var i = 0; i < Mainui.length; i++) {
                imgUrl.push(Mainui[i]);
            }
            var formation = zj.Game.PlayerFormationSystem.curFormations[this.fightType - 1];
            var hunArr = [];
            var resArr = ["zd_jisha", "zd_jisha", "ui_zhandou_yuanhu", "zd_xuli", "ui_zhandou_zhandoukaishi", "ui_zhandou_02_eff", "zd_tuoguan_eff", "buff_tongyong", "zd_shijiandaole", "buff_hudun", "buff_kongzhi", "buff_baozha", "zd_jineng_wenzi", "zd_siwang"];
            if (formation) {
                for (var i = 0; i < formation.generals.length; i++) {
                    if (formation.generals[i] != 0) {
                        hunArr.push(formation.generals[i]);
                    }
                }
                for (var i = 0; i < formation.supports.length; i++) {
                    if (formation.supports[i] != 0) {
                        hunArr.push(formation.supports[i]);
                    }
                }
            }
            if (this.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                hunArr = [];
                var generals = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].generals;
                var reserves = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].reserves;
                var supports = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].supports;
                for (var i = 0; i < generals.length; i++) {
                    if (generals[i] != 0) {
                        hunArr.push(generals[i]);
                    }
                }
                for (var i = 0; i < supports.length; i++) {
                    if (supports[i] != 0) {
                        hunArr.push(supports[i]);
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr_1 = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr_1.length; j++) {
                        resArr.push(arr_1[j]);
                    }
                }
                var arr = this.loadFightMonster();
                for (var i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                hunArr = [];
                resArr.push("xuruo_dahudun", "xuruo_hudun", "xuruo_leidian");
                var generals = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt].generals;
                var supports = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt].supports;
                for (var i = 0; i < generals.length; i++) {
                    if (generals[i] != 0) {
                        hunArr.push(generals[i]);
                    }
                }
                for (var i = 0; i < supports.length; i++) {
                    if (supports[i] != 0) {
                        hunArr.push(supports[i]);
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr_2 = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr_2.length; j++) {
                        resArr.push(arr_2[j]);
                    }
                }
                var arr = this.loadFightMonster();
                for (var i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK || this.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                var other = [];
                if (this.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                    resArr.push("ui_gedou_03");
                    var attArr = zj.Game.PlayerFormationSystem.formatsSingleAttack; //自己
                    for (var k in attArr) {
                        var v = attArr[k];
                        for (var i = 0; i < v.generals.length; i++) {
                            if (v.generals[i] != 0) {
                                hunArr.push(v.generals[i]);
                            }
                        }
                        for (var i = 0; i < v.supports.length; i++) {
                            if (v.supports[i] != 0) {
                                hunArr.push(v.supports[i]);
                            }
                        }
                    }
                    other = zj.Game.PlayerBattleSystem.singBattle;
                }
                else {
                    var date = zj.Game.PlayerBattleSystem.battleDetailFormation;
                    var info = { simpleInfo: { generals: [], supports: [] } };
                    for (var i = 0; i < date.generals.length; i++) {
                        info.simpleInfo.generals.push(date.generals[i]);
                    }
                    for (var i = 0; i < date.supports.length; i++) {
                        info.simpleInfo.supports.push(date.supports[i]);
                    }
                    other = [info];
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                var hunObj = {};
                var aaa = zj.Game.PlayerBattleSystem.battleDetailFormation;
                for (var i = 0; i < other.length; i++) {
                    var generals = other[i].simpleInfo.generals;
                    var supports = other[i].simpleInfo.supports;
                    for (var i_1 = 0; i_1 < generals.length; i_1++) {
                        if (generals[i_1].general_id != 0) {
                            hunArr.push(generals[i_1].general_id);
                            hunObj[generals[i_1].general_id] = generals[i_1];
                        }
                    }
                    for (var i_2 = 0; i_2 < supports.length; i_2++) {
                        if (supports[i_2].general_id != 0) {
                            hunArr.push(supports[i_2].general_id);
                            hunObj[supports[i_2].general_id] = supports[i_2];
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                var hunObj = {};
                hunArr = [];
                var other = zj.Game.PlayerBattleSystem.battleDetailFormation;
                var generals = other.generals;
                var supports = other.supports;
                for (var i = 0; i < generals.length; i++) {
                    if (generals[i].general_id != 0) {
                        hunArr.push(generals[i].general_id);
                        hunObj[generals[i].general_id] = generals[i];
                    }
                }
                for (var i = 0; i < supports.length; i++) {
                    if (supports[i].general_id != 0) {
                        hunArr.push(supports[i].general_id);
                        hunObj[supports[i].general_id] = supports[i];
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                resArr.push("ui_gedou04_eff");
                var hunObj = {};
                hunArr = [];
                var hArr = zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo;
                for (var i = 0; i < hArr.length; i++) {
                    var generals = hArr[i].generals;
                    var supports = hArr[i].supports;
                    for (var i_3 = 0; i_3 < generals.length; i_3++) {
                        if (generals[i_3].general_id != 0) {
                            hunArr.push(generals[i_3].general_id);
                            hunObj[generals[i_3].general_id] = generals[i_3];
                        }
                    }
                    for (var i_4 = 0; i_4 < supports.length; i_4++) {
                        if (supports[i_4].general_id != 0) {
                            hunArr.push(supports[i_4].general_id);
                            hunObj[supports[i_4].general_id] = supports[i_4];
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr_3 = this.loadFightHunter(hunArr[i], true, hunObj[hunArr[i]]);
                    for (var j = 0; j < arr_3.length; j++) {
                        resArr.push(arr_3[j]);
                    }
                }
                var arr = this.loadFightMonster();
                for (var i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                var other = zj.Game.PlayerBattleSystem.battleDetailFormation;
                var generals = other.generals;
                var supports = other.supports;
                var hunObj = {};
                for (var i = 0; i < generals.length; i++) {
                    if (generals[i].general_id != 0) {
                        hunArr.push(generals[i].general_id);
                        hunObj[generals[i].general_id] = generals[i];
                    }
                }
                for (var i = 0; i < supports.length; i++) {
                    if (supports[i].general_id != 0) {
                        hunArr.push(supports[i].general_id);
                        hunObj[supports[i].general_id] = supports[i];
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], false, hunObj[hunArr[i]]);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                resArr.push("ui_gedou_03");
                var attArr = zj.Game.PlayerFormationSystem.formatsSingleAttack;
                for (var k in attArr) {
                    var v = attArr[k];
                    for (var i = 0; i < v.generals.length; i++) {
                        if (v.generals[i] != 0) {
                            hunArr.push(v.generals[i]);
                        }
                    }
                    for (var i = 0; i < v.supports.length; i++) {
                        if (v.supports[i] != 0) {
                            hunArr.push(v.supports[i]);
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
                hunArr = [];
                var attArr1 = zj.Game.PlayerFormationSystem.threeBattleInfo;
                for (var k in attArr1) {
                    var v = attArr1[k];
                    for (var i = 0; i < v.generals.length; i++) {
                        if (v.generals[i].general_id != 0) {
                            hunArr.push(v.generals[i].general_id);
                        }
                    }
                    for (var i = 0; i < v.supports.length; i++) {
                        if (v.supports[i].general_id != 0) {
                            hunArr.push(v.supports[i].general_id);
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i]);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                hunArr = [];
                resArr = ["ui_zhandou_yuanhu", "zd_xuli", "buff_tongyong", "zd_jineng_wenzi", "zd_siwang"];
                var hunterName = ["wojin", "kuluoluo", "leiouli"]; //这是敌人和自己的副将需要技能的
                for (var k in zj.teachBattle.teachLeftGeneral) {
                    var v = zj.teachBattle.teachLeftGeneral[k];
                    if (v.id != 0) {
                        hunArr.push(v.id);
                    }
                }
                for (var k in zj.teachBattle.teachLeftSupport) {
                    var v = zj.teachBattle.teachLeftSupport[k];
                    if (v.id != 0) {
                        //if(hunterName.indexOf(k) != -1){
                        hunArr.push(v.id);
                        //}
                    }
                }
                var oneHunArr = [];
                for (var k in zj.teachBattle.teachRightGeneral) {
                    var v = zj.teachBattle.teachRightGeneral[k];
                    if (v.id != 0) {
                        if (hunterName.indexOf(k) != -1) {
                            hunArr.push(v.id);
                        }
                        else {
                            oneHunArr.push(v.id);
                        }
                    }
                }
                for (var i = 0; i < oneHunArr.length; i++) {
                    var name_1 = this.loadHunterSpx(oneHunArr[i]);
                    resArr.push(name_1);
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i]);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
                var boss = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo;
                for (var i = 0; i < 4; i++) {
                    var bossArr = boss.bossInfo["monster_pos" + (i + 1)];
                    for (var b = 0; b < bossArr.length; b++) {
                        var arr = this.loadFightHunter(zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId, null, bossArr[b]);
                        for (var j = 0; j < arr.length; j++) {
                            resArr.push(arr[j]);
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var arr = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr.length; j++) {
                        resArr.push(arr[j]);
                    }
                }
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                for (var i = 0; i < hunArr.length; i++) {
                    var arr_4 = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < arr_4.length; j++) {
                        resArr.push(arr_4[j]);
                    }
                }
                var arr = this.loadFightMonster();
                for (var i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            else {
                var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[this.fightType].maxMobID;
                if (maxMobID >= zj.teachBattle.teach_fake_help.start_fake_stage_id && maxMobID <= zj.teachBattle.teach_fake_help.max_fake_stage_id) {
                    // hunArr.push(102,114);//引导副本副将
                    var arrrr = [102, 114];
                    for (var i = 0; i < arrrr.length; i++) {
                        var harr_1 = this.loadFightHunter(arrrr[i]);
                        for (var j = 0; j < harr_1.length; j++) {
                            resArr.push(harr_1[j]);
                        }
                    }
                }
                for (var i = 0; i < hunArr.length; i++) {
                    var harr_2 = this.loadFightHunter(hunArr[i], true);
                    for (var j = 0; j < harr_2.length; j++) {
                        resArr.push(harr_2[j]);
                    }
                }
                var arr = this.loadFightMonster();
                for (var i = 0; i < arr.length; i++) {
                    resArr.push(arr[i]);
                }
            }
            // 添加援护资源
            var harr = this.loadFightHunter(zj.FightHelper.FIGHT_ASSISTANCE, true);
            for (var j = 0; j < harr.length; j++) {
                resArr.push(harr[j]);
            }
            this.resMax = (1 + resArr.length);
            this.startLoadFight(imgUrl, resArr);
        };
        //imgUrl地图和其他图片资源 resArr龙骨资源
        FightLoading.prototype.startLoadFight = function (imgUrl, resArr) {
            var _this = this;
            var groupName = "imgUrl" + egret.getTimer();
            this.groupNameImage = groupName;
            zj.StageSceneManager.Instance.temporaryScene.cachedGroupNames[groupName] = 0;
            if (!RES.createGroup(groupName, imgUrl, true)) {
                var str = zj.LANG("创建资源组失败:") + groupName;
                //toast(str);
                return;
            }
            zj.Game.RESGroupManager.loadGroup(groupName)
                .then(function () {
                _this.resComplete();
            })
                .catch(function (error) {
                //失败
                //toast(error);
                return;
            });
            this.resArr = resArr;
            for (var i = 0; i < resArr.length; i++) {
                zj.Game.DragonBonesManager.preloadDragonbone(zj.StageSceneManager.Instance.temporaryScene, resArr[i])
                    .then(function () {
                    _this.resComplete();
                })
                    .catch(function (error) {
                    //toast(error);
                });
            }
        };
        FightLoading.prototype.resComplete = function () {
            this.currNum = this.currNum + 1;
            if (this.currNum == this.resMax) {
                for (var i = 0; i < this.resArr.length; i++) {
                    var spx = zj.HunterSpineX(1, 1, null, this.resArr[i], false)[0];
                    zj.dragonBonesPool.getInstance().returnItem(spx.name, spx);
                }
                this.comfun.call(this.thisAny);
                this.comfun = null;
                this.thisAny = null;
            }
            zj.Game.EventManager.event(zj.GameEvent.LOGING_SCENE_PROGRESS, this.currNum / this.resMax);
        };
        //只是获取人物模型
        FightLoading.prototype.loadHunterSpx = function (roleId) {
            var index = zj.Helper.getGeneralIndexById(roleId);
            var generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
            var instanceHun;
            instanceHun = zj.PlayerHunterSystem.Table(roleId);
            var mapRoleId;
            if (generalInfo == null) {
                if (!instanceHun) {
                    instanceHun = zj.TableClientMonsterLocal.Item(roleId);
                    mapRoleId = instanceHun.monster_roleId;
                }
                else {
                    mapRoleId = instanceHun.general_roleId;
                }
            }
            else {
                mapRoleId = zj.PlayerHunterSystem.MapFightID(generalInfo);
            }
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var spineTable = zj.TableClientFightAniSpineSource.Item(bodySpxId); //人物模型
            return spineTable.json;
        };
        //获取一个猎人所有资源
        FightLoading.prototype.loadFightHunter = function (roleId, isself, other) {
            if (isself === void 0) { isself = false; }
            var res = [];
            var index;
            var generalInfo;
            if (isself) {
                index = zj.Helper.getGeneralIndexById(roleId);
                generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
            }
            var instanceHun;
            instanceHun = zj.PlayerHunterSystem.Table(roleId);
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
            var mapRoleId = 0;
            if (generalInfo == null) {
                if (!instanceHun) {
                    instanceHun = zj.TableClientMonsterLocal.Item(roleId);
                    if (!instanceHun) {
                        mapRoleId = roleId;
                        instanceHun = other.baseInfo; //世界boss走这里
                    }
                    else {
                        mapRoleId = instanceHun.monster_roleId;
                    }
                }
                else {
                    mapRoleId = instanceHun.general_roleId;
                    mapRoleId = zj.PlayerHunterSystem.MapFightID(other);
                }
            }
            else {
                // mapRoleId = PlayerHunterSystem.MapFightID(generalInfo);
                var tranId = zj.PlayerSkillSystem.getTranMapId(generalInfo);
                if (tranId != null && tranId != -1) {
                    mapRoleId = tranId;
                }
                else {
                    mapRoleId = zj.PlayerHunterSystem.MapFightID(generalInfo);
                }
            }
            if (other && mapRoleId == 0) {
                mapRoleId = zj.PlayerHunterSystem.MapFightID(other);
            }
            // if(instanceHun){
            //     let bodySpxId = TableMapRole.Item(instanceHun.general_roleId).body_spx_id;
            //     let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);//人物模型
            //     res.push(spineTable.json);
            // }
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var spineTable = zj.TableClientFightAniSpineSource.Item(bodySpxId); //人物模型
            res.push(spineTable.json);
            var skillArr = [];
            if (generalInfo) {
                for (var ss = 0; ss < generalInfo.skills.length; ss++) {
                    skillArr.push(generalInfo.skills[ss].skillId);
                }
            }
            else {
                skillArr = [];
                for (var ssid = 0; ssid < instanceHun.skill_ids.length; ssid++) {
                    var skillu = zj.PlayerSkillSystem.Table(instanceHun.skill_ids[ssid]);
                    for (var uu = 0; uu < skillu.skill_units.length; uu++) {
                        skillArr.push(skillu.skill_units[uu]); //不是自己的需要去表里去一下其他的都是skillunitID
                    }
                }
            }
            for (var i = 0; i < skillArr.length; i++) {
                var skillun = zj.PlayerSkillSystem.UnitInfo(skillArr[i]);
                if (skillun && skillun.bg_spx_id > 0) {
                    var skillbg = zj.TableClientFightAniSpineSource.Item(skillun.bg_spx_id);
                    //if(res.indexOf(skillbg.json) == -1){
                    res.push(skillbg.json);
                    //}
                }
                var id = -1;
                var instance = zj.PlayerSkillSystem.Table(skillArr[i]);
                for (var j = 0; j < instance.skill_units.length; j++) {
                    var tableSkillUnit = zj.TableSkillUnit.Table();
                    var tableAllAction = tableSkillUnit[instance.skill_units[j]].all_action;
                    for (var a = 0; a < tableAllAction.length; a++) {
                        var action = zj.PlayerSkillSystem.ActionInfo(tableAllAction[a]);
                        for (var e = 0; e < action.effects_id.length; e++) {
                            var effect = zj.PlayerSkillSystem.EffectInfo(action.effects_id[e]);
                            if (!effect) {
                                continue;
                            }
                            var skill = zj.TableClientFightAniSpineSource.Item(effect.effects_spx_id);
                            //if(res.indexOf(skill.json) == -1){
                            res.push(skill.json);
                            //}
                            if (effect.effect_buff_id > 0) {
                                var tableBuff = zj.TableSkillBuff.Table();
                                var buff_type = tableBuff[effect.effect_buff_id].base_type;
                                var tableBuffBase = zj.TableClientBuffBase.Table();
                                var spx_id = tableBuffBase[buff_type].spx_id;
                                if (spx_id > 0) {
                                    var buffname = zj.TableClientAniSpxSource.Item(spx_id).name;
                                    //if(res.indexOf(buffname) == -1){
                                    res.push(buffname);
                                    //}
                                }
                            }
                            for (var h = 0; h < effect.hit_effects_ids.length; h++) {
                                if (effect.hit_effects_ids[h] != -1) {
                                    var tableHit = zj.TableClientSkillHiteffect.Table();
                                    var hit_id = tableHit[effect.hit_effects_ids[h]].effects_spx_id;
                                    var hit = zj.TableClientFightAniSpineSource.Item(hit_id);
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
        };
        //获取当前战斗所有怪物 除了其他人猎人模型
        FightLoading.prototype.loadFightMonster = function () {
            var resArr = [];
            var arrMonster = [];
            var arr = zj.PlayerStageSystem.stageInfoTbl;
            for (var i = 0; i < arr.length; i++) {
                var armystage = arr[i];
                for (var j = 0; j < this.posArr.length; j++) {
                    var armyArr = armystage[this.posArr[j]];
                    for (var a = 0; a < armyArr.length; a++) {
                        arrMonster.push(armyArr[a].curInfo.monster_id);
                    }
                }
            }
            for (var b = 0; b < arrMonster.length; b++) {
                var instance = zj.Game.PlayerMobSystem.Instance(arrMonster[b]);
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
                var bodySpxId = zj.TableMapRole.Item(instance.monster_roleId).body_spx_id;
                var spineTable = zj.TableClientFightAniSpineSource.Item(bodySpxId); //人物模型
                resArr.push(spineTable.json);
                var info = { skills: [] };
                for (var c = 0; c < instance.skill_ids.length; c++) {
                    if (instance.skill_ids[c] > 0) {
                        var _level = instance.skill_levels[c];
                        var _id = instance.skill_ids[c];
                        //真实ID = 表里ID +（技能等级-1）*1000000	
                        //info.skills.push(_id + (_level - 1) * 1000000);
                        info.skills.push(_id);
                    }
                }
                for (var i = 0; i < info.skills.length; i++) {
                    var unItem = zj.PlayerSkillSystem.Table(info.skills[i]);
                    for (var u = 0; u < unItem.skill_units.length; u++) {
                        var skillun = zj.PlayerSkillSystem.UnitInfo(unItem.skill_units[0]);
                        if (skillun && skillun.bg_spx_id > 0) {
                            var skillbg = zj.TableClientFightAniSpineSource.Item(skillun.bg_spx_id);
                            //if(resArr.indexOf(skillbg.json) == -1){
                            resArr.push(skillbg.json);
                            //}
                        }
                        var tableAllAction = skillun.all_action;
                        for (var a = 0; a < tableAllAction.length; a++) {
                            var action = zj.PlayerSkillSystem.ActionInfo(tableAllAction[a]);
                            for (var e = 0; e < action.effects_id.length; e++) {
                                var effect = zj.PlayerSkillSystem.EffectInfo(action.effects_id[e]);
                                if (!effect) {
                                    continue;
                                }
                                var skill = zj.TableClientFightAniSpineSource.Item(effect.effects_spx_id);
                                //if(resArr.indexOf(skill.json) == -1){
                                resArr.push(skill.json);
                                //}
                                if (effect.effect_buff_id > 0) {
                                    var tableBuff = zj.TableSkillBuff.Table();
                                    var buff_type = tableBuff[effect.effect_buff_id].base_type;
                                    var tableBuffBase = zj.TableClientBuffBase.Table();
                                    var spx_id = tableBuffBase[buff_type].spx_id;
                                    if (spx_id > 0) {
                                        var buffname = zj.TableClientAniSpxSource.Item(spx_id).name;
                                        //if(resArr.indexOf(buffname) == -1){
                                        resArr.push(buffname);
                                        //}
                                    }
                                }
                                for (var h = 0; h < effect.hit_effects_ids.length; h++) {
                                    if (effect.hit_effects_ids[h] != -1) {
                                        var tableHit = zj.TableClientSkillHiteffect.Table();
                                        var hit_id = tableHit[effect.hit_effects_ids[h]].effects_spx_id;
                                        var hit = zj.TableClientFightAniSpineSource.Item(hit_id);
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
        };
        //获取当前战斗的地图ID
        FightLoading.prototype.loadMap = function () {
            var id = 7;
            if (this.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                var cell = zj.Game.PlayerWantedSystem.wantedCurPos;
                id = zj.TableWanted.Item(cell).battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                var cell = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
                var tableInstance = zj.TableInstance.Table();
                id = tableInstance[cell].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                var cell = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
                var tableTower = zj.TableTower.Table();
                id = tableTower[cell].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                // let tableTower = TableTower.Table();
                // id = tableTower[cell].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                var tblLeagueBoss = zj.TableLeagueAnimals.Table();
                id = tblLeagueBoss[1].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                var tblLicense = zj.TableMissionLicence.Table();
                id = tblLicense[zj.Game.PlayerMissionSystem.licenseCurPos].battle_bg;
            }
            else if (this.fightType == message.EFormationType.FORMATION_TYPE_RELIC) {
                id = zj.TableInstanceRelic.Item(zj.Game.PlayerMissionSystem.fightExt + 1).mapBg;
            }
            else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                id = zj.teachBattle.bgTeachId;
            }
            var _json = zj.Game.ConfigManager.getTable(id + ".json");
            var urlArr = [];
            for (var i = 0; i < _json["gameobjects"].length; i++) {
                var mainTbl = _json["gameobjects"][i];
                for (var k = 0; k < mainTbl["gameobjects"].length; k++) {
                    var obj = mainTbl["gameobjects"][k];
                    for (var j = 0; j < obj["gameobjects"].length; j++) {
                        var data = obj["gameobjects"][j];
                        for (var l = 0; l < data["components"].length; l++) {
                            var fData = data["components"][l];
                            var fileData = fData.fileData;
                            var imgUrl = fileData.path;
                            var egretUrl = this.CocosUrlToEgretUrl(imgUrl);
                            if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
                                urlArr.push(egretUrl);
                            }
                        }
                    }
                }
            }
            return urlArr;
        };
        /**cocos场景配置坐标转换成Egret坐标 */
        FightLoading.prototype.CocosUrlToEgretUrl = function (url) {
            var arrS = url.split(".");
            var sourceArr = arrS[0].split("/");
            var source = sourceArr[sourceArr.length - 1];
            return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
        };
        return FightLoading;
    }());
    zj.FightLoading = FightLoading;
    __reflect(FightLoading.prototype, "zj.FightLoading");
})(zj || (zj = {}));
//# sourceMappingURL=FightLoading.js.map