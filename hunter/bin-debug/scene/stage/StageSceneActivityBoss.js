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
    /**
     * @class 年兽BOSS 进入战场地图
     *
     * @author Yu Qingchao
     *
     * 2019.07.20
     */
    var StageSceneActivityBoss = (function (_super) {
        __extends(StageSceneActivityBoss, _super);
        function StageSceneActivityBoss() {
            var _this = _super.call(this) || this;
            _this.floor = 100;
            _this.playersNum = 0;
            _this.playerLeader = null;
            _this.tableBosses = {};
            _this.orderCnt = 1;
            return _this;
        }
        StageSceneActivityBoss.prototype.OnLoading = function (percent) {
            _super.prototype.OnLoading.call(this, percent);
            if (percent == 51) {
                this.InitRes();
            }
            else if (percent == 71) {
                this.initMapBlock();
            }
            else if (percent == 76) {
                this.initBosses();
            }
            else if (percent == 81) {
                this.initMember();
            }
            else if (percent == 86) {
                this.proofLeaderPos(zj.Game.PlayerBossSystem.ActivityBoss.roleInfo["posInfo"].posItem);
                this.bPosFinished = true;
            }
            else if (percent == 91) {
                // this.loadPrepare();
                this.mainMenu = zj.newUI(zj.Activity_Boss);
                this.mainMenu.show();
            }
            else if (percent == 96) {
                // uicache.Add("Common_Annouce", null, true);
            }
        };
        StageSceneActivityBoss.prototype.InitRes = function () {
            zj.Gmgr.Instance.preLayerId = zj.Gmgr.Instance.layerId;
            zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_ZORKBOSS);
            zj.Gmgr.Instance.bInSceneFight = false;
            zj.Game.PlayerZorkSystem.zorkBoss.isZorkBossEnd = false;
            this.bHidePerson = false;
            this.bHideEffect = false;
            this.mainMenu = null;
            this.sceneType = zj.Game.PlayerBossSystem.ActivityBoss.roleInfo["posInfo"].posItem.sceneType;
            this.count = 0;
            this.prepareTime = 0;
            this.deathAni = null;
            this.bEnding = false;
            // this.InitScene();
            this.LoadMap(19);
            this.initCellNode();
            this.initTmx();
            this.initLeader();
            this.initBuilds(zj.StringConfig_Table.activityBossMap, 1);
        };
        StageSceneActivityBoss.prototype.Init = function () {
            _super.prototype.Init.call(this);
            zj.Helper.PlaybgmByID(100006);
            //更新时间差值
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
            this.proofTime();
            zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            // this.prepareFun();
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            // Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, this.SceneBossResultNotice_Visit, this);
            // Game.EventManager.on(GameEvent.SERVER_NOTICE_BOSS_HP_CHANGE, this.BossHpChangeNotice_Visit, this);
        };
        StageSceneActivityBoss.prototype.release = function () {
            _super.prototype.release.call(this);
            zj.CC_SAFE_DELETE(this.playerLeader);
            this.playerLeader = null;
            for (var k in this.tableBosses) {
                var v = this.tableBosses[k];
                zj.CC_SAFE_DELETE(v);
                v = null;
            }
            this.tableBosses = null;
        };
        StageSceneActivityBoss.prototype.initLeader = function () {
            var order = this.orderCnt;
            var leader = new zj.StageSceneFightLeader(this.map, this.MapBlockH);
            var x = 0;
            var y = 0;
            var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            leader.createZorkPlayer(scenePosInfo, this.floor, x, y, dir, x, y);
            leader.dealZorkRoleInfo(zj.Game.PlayerBossSystem.ActivityBoss.roleInfo);
            leader.dealSceneNotice(scenePosInfo);
            if (scenePosInfo.hpPre == 0) {
                leader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            this.playerLeader = leader;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneActivityBoss.prototype.initBosses = function () {
            var a = zj.Game.PlayerWonderLandSystem.scenePosInfo;
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_BOSS) {
                    continue;
                }
                if (this.tableBosses[v.roleBase.id] != null) {
                    continue;
                }
                if (zj.Helper.getObjLen(this.tableBosses) != 0) {
                    continue;
                }
                this.addZorkBoss(v, null, null);
            }
        };
        StageSceneActivityBoss.prototype.addZorkBoss = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var boss = new zj.StageSceneFightBoss(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Left;
            var screen_x = scenePosInfo.build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = scenePosInfo.build_y - (this.playerLeader.verDistance - this.playerLeader.y);
            screen_y = zj.PlayerWonderLandSystem.MapHeight - screen_y;
            boss.createActivityBoss(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            boss.dealSceneNotice(scenePosInfo);
            boss.setHidden(true);
            this.tableBosses[scenePosInfo.build_id] = boss;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneActivityBoss.prototype.addMember = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var member = new zj.StageSceneFightInLeauge(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            var screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y);
            member.createZorkPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            member.dealSceneNotice(scenePosInfo);
            this.tableMembers[scenePosInfo.roleBase.id] = member;
            this.orderCnt = this.orderCnt + 1;
            //如果隐藏玩家设置为开启状态，则每次进入需要判定
            if (this.bHidePerson == true) {
                member.setHidden(true);
            }
        };
        StageSceneActivityBoss.prototype.initMember = function () {
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
                    continue;
                }
                if (v.roleBase.id == zj.Game.PlayerInfoSystem.RoleID) {
                    continue;
                }
                if (this.tableMembers[v.roleBase.id] != null) {
                    continue;
                }
                this.addMember(v, null, null);
            }
        };
        StageSceneActivityBoss.prototype.delMember = function (key_id) {
            if (this.tableMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.tableMembers[key_id]);
            }
            else if (this.cacheMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.cacheMembers[key_id]);
            }
            delete this.tableMembers[key_id];
            delete this.cacheMembers[key_id];
            delete zj.Game.PlayerWonderLandSystem.scenePosInfo[key_id];
        };
        StageSceneActivityBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (this.playerLeader != null) {
                this.playerLeader.Update(tick);
                this.updateLeaderDieUi();
            }
            this.updateBosses(tick);
            this.updateMember(tick);
            this.updateBuilds(tick);
            this.updateCd(tick);
            // this.updatePrepareTime(tick);
            this.updateEndEvent();
        };
        StageSceneActivityBoss.prototype.updateMember = function (tick) {
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v.bCanRemove == true) {
                    zj.CC_SAFE_DELETE(v);
                    v = null;
                    delete this.tableMembers[k];
                    delete this.cacheMembers[k];
                    continue;
                }
                v.Update(tick);
            }
        };
        StageSceneActivityBoss.prototype.updateNoticePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_BOSS) {
                    var key_id = v.roleBase.id;
                    if (this.tableBosses[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.addZorkBoss(v, null, null);
                    }
                    else if (this.tableBosses[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.tableBosses[key_id].joinView();
                        this.tableBosses[key_id].dealSceneNotice(v);
                    }
                    else if (this.tableBosses[key_id] != null) {
                        this.tableBosses[key_id].dealSceneNotice(v);
                    }
                }
                else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
                    if (v.roleBase.id == zj.Game.PlayerInfoSystem.RoleID) {
                        if (v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            if (this.playerLeader != null) {
                                this.playerLeader.dealSceneNotice(v);
                            }
                        }
                    }
                    else {
                        var key_id = v.roleBase.id;
                        if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this.tableMembers[key_id] = this.cacheMembers[key_id];
                            delete this.cacheMembers[key_id];
                            this.tableMembers[key_id].joinView();
                            this.tableMembers[key_id].dealSceneNotice(v);
                        }
                        else if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this.addMember(v, null, null);
                        }
                        else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null)
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
                            this.delMember(key_id);
                        }
                        else if (this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
                            this.tableMembers[key_id].leaveView();
                            this.cacheMembers[key_id] = this.tableMembers[key_id];
                            delete this.tableMembers[key_id];
                        }
                        else if (this.tableMembers[key_id] != null) {
                            this.tableMembers[key_id].dealSceneNotice(v);
                        }
                    }
                }
            }
        };
        StageSceneActivityBoss.prototype.updateBosses = function (tick) {
            for (var k in this.tableBosses) {
                var v = this.tableBosses[k];
                v.Update(tick);
            }
        };
        StageSceneActivityBoss.prototype.updateBuilds = function (tick) {
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                v.Update(tick);
            }
        };
        StageSceneActivityBoss.prototype.updateCd = function (tick) {
            zj.SkillCdMgr.Instance.update(tick);
        };
        StageSceneActivityBoss.prototype.UpdateMap = function (base_x, base_y) {
            var _a = this.ComputeMapXY(base_x, base_y), moveX = _a[0], moveY = _a[1];
            _super.prototype.UpdateMap.call(this, moveX, moveY);
            this.updateMapBosses(moveX, moveY);
        };
        StageSceneActivityBoss.prototype.updateMapBosses = function (base_x, base_y) {
            for (var k in this.tableBosses) {
                var v = this.tableBosses[k];
                var _a = v.getPos(), x = _a[0], y = _a[1];
                v.setPos(x - base_x, y - base_y);
            }
        };
        StageSceneActivityBoss.prototype.getUpNode = function () {
            return this.nodeUp;
        };
        StageSceneActivityBoss.prototype.OnTouchDown = function (touchs) {
            if (this.playerLeader != null && this.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                return false;
            }
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchDown(touchs);
            }
        };
        StageSceneActivityBoss.prototype.OnTouchMove = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchMove(touchs);
            }
        };
        StageSceneActivityBoss.prototype.OnTouchUp = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchUp(touchs);
            }
        };
        StageSceneActivityBoss.prototype.getLeader = function () {
            return this.playerLeader;
        };
        StageSceneActivityBoss.prototype.updateEndEvent = function () {
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
            if (progress.info == 0 && zj.Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd == false) {
                zj.Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd = true;
                this.playerLeader.endFightAuto();
            }
        };
        StageSceneActivityBoss.prototype.reqLeaderPos = function (x, y, successCB, force) {
            if (zj.Game.PlayerBossSystem.ActivityBoss.isZorkBossEnd == true) {
                return;
            }
            if (x <= 0) {
                x = 1;
            }
            var visit_func = function (req, resp) {
                var msg = resp;
                if (msg.header.result == 0) {
                    if (successCB != null) {
                        successCB(this);
                    }
                    if (this.playerLeader != null) {
                        this.playerLeader.resetMoveNet();
                    }
                    if (msg.body.roleInfo.length != 0) {
                        zj.Game.PlayerBossSystem.ActivityBoss.roleInfo = msg.body.roleInfo[0];
                        if ((this.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None || this.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Attack)) {
                            this.playerLeader.dealZorkRoleInfo(zj.Game.PlayerBossSystem.ActivityBoss.roleInfo);
                            if (this.playerLeader.sceneHpPercent == 0) {
                                this.playerLeader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                            }
                        }
                    }
                }
            };
            var req = new message.DarklandBossMoveRequest();
            req.body.scene_x = x;
            y = zj.PlayerWonderLandSystem.MapHeight - y;
            req.body.scene_y = y;
            zj.Game.Controller.send(req, visit_func, null, this, true);
        };
        StageSceneActivityBoss.prototype.updateLeaderDieUi = function () {
            if (this.playerLeader.otherState != zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                return;
            }
            if (this.playerLeader.dieProtectTime <= 0) {
                return;
            }
            if (this.isCanPushWarUi() == false) {
                return;
            }
            if (this.mainMenu != null) {
                this.mainMenu.SetDieTime(this.playerLeader.dieProtectTime);
            }
        };
        StageSceneActivityBoss.prototype.revivePersonReq = function (successCB) {
            var visit_func = function (req, resp) {
                var msg = resp;
                if (msg.header.result == 0 || msg.header.result == 11307) {
                    //弹出结算界面试试
                    if (successCB != null) {
                        successCB();
                    }
                    if (this.playerLeader != null) {
                        this.playerLeader.path = null;
                        this.playerLeader.dealZorkRoleInfo(zj.Game.PlayerBossSystem.ActivityBoss.roleInfo);
                        this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem);
                        this.playerLeader.reSafe();
                    }
                }
                else if (msg.header.result == 10209) {
                    zj.TipManager.ShowAddGemStone();
                }
            };
            var req = new message.BossDeadCoolingRequest();
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneActivityBoss.prototype.SceneItemPosInfoNotice_Visit = function (e) {
            var data = e.data;
            if (zj.Helper.getObjLen(zj.Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
                this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
                zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            }
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.timePosInfo);
            zj.Game.PlayerWonderLandSystem.timePosInfo = {};
        };
        StageSceneActivityBoss.prototype.SceneItemPosNotice_Visit = function (e) {
            var data = e.data;
            this.updateSimplePos(zj.Game.PlayerWonderLandSystem.noticePosInfo);
            zj.Game.PlayerWonderLandSystem.noticePosInfo = {};
        };
        StageSceneActivityBoss.prototype.updateSimplePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (this.tableMembers[k] != null) {
                    this.tableMembers[k].dealSimpleMoveNotice(v);
                }
            }
        };
        StageSceneActivityBoss.prototype.getEventThings = function (x, y) {
            var t = [];
            var tbl_move = [];
            for (var k in this.tableMapCells) {
                var v = this.tableMapCells[k];
                if (v.info.build_type != 5) {
                    continue;
                }
                if (v.isCanBeTouch() == false) {
                    continue;
                }
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                var tree_x = void 0, tree_y = v.getEventPos();
                if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
                    continue;
                }
                var info = [];
                info.type = zj.TableEnum.Enum.LeagueWarTouchType.Npc;
                info.data = v;
                t.push(info);
            }
            var still_len = t.length;
            var move_len = tbl_move.length;
            var real_person = Math.min(move_len, zj.ConstantConfig_RoleBattle.OVERLAP_SELECT_MAX_NUM - still_len);
            var tbl_rand = [];
            while (true) {
                if (tbl_rand.length >= real_person) {
                    break;
                }
                var rand = zj.TsMtirand();
                var rand_value = rand % move_len + 1;
                var value = tbl_move[rand_value];
                if (zj.Table.VIn(tbl_rand, value) == false) {
                    tbl_rand.push(value);
                    var info = {};
                    var bMember = zj.yuan3(this.tableMembers[value].getLegId() != 0 && this.playerLeader.getLegId() == this.tableMembers[value].getLegId(), true, false);
                    info["type"] = zj.Helper.getWonderlandPlayerType(null, bMember);
                    info["data"] = this.tableMembers[value];
                    t.push(info);
                }
            }
            t.sort(function (a, b) {
                return a.type - b.type;
            });
            return t;
        };
        StageSceneActivityBoss.prototype.checkEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            return zj.yuan3(t.length == 0, false, true);
        };
        StageSceneActivityBoss.prototype.dealEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            var doSomeThing = false;
            if (t.length > 1) {
                // let ui = PushUI("League_WarSelectThings")
                // ui:SetInfo( t )
                // ui:SetFather(this)
                // ui:SetPressOutExit()
                doSomeThing = true;
            }
            else if (t.length == 1) {
                if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                    this.pushPersonInterface(t[0].data.playerInfo);
                    doSomeThing = true;
                }
            }
            return doSomeThing;
        };
        StageSceneActivityBoss.prototype.pushNpcUi = function (info) {
            if (info.build_id == zj.TableEnum.Enum.ActivityNpc.ActivityBoss) {
                this.ReqGetMobsInfo();
                if (this.isTouchUiEnabled() == false) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                }
            }
        };
        StageSceneActivityBoss.prototype.ReqGetMobsInfo = function () {
            var ReqGetMobsInfo_Visit = function (req, resp) {
                var msg = resp;
                if (msg.header.result == 0) {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
                    this.dealFight();
                }
            };
            var req = new message.MobsInfoRequest();
            req.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
            req.body.mobsId = zj.Game.PlayerBossSystem.ActivityBoss.bossId;
            zj.Game.Controller.send(req, ReqGetMobsInfo_Visit, null, this, false);
        };
        StageSceneActivityBoss.prototype.pushPersonInterface = function (info) {
            // let ui = PushUI("Wonderland_SelectPlayer");
            // ui:SetInfo( info );
            // ui:SetFather(this);
            // ui:SetPressOutExit();
        };
        StageSceneActivityBoss.prototype.addCollectMenu = function (time, type) {
            this.mainMenu.addControlPop(time, type);
        };
        StageSceneActivityBoss.prototype.deleteCollectMenu = function () {
            this.mainMenu.deleteControlPop();
        };
        StageSceneActivityBoss.prototype.getLiveBoss = function () {
            for (var k in this.tableBosses) {
                var v = this.tableBosses[k];
                return v;
            }
            return null;
        };
        StageSceneActivityBoss.prototype.goNearBoss = function () {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.activityBossMap);
            var _center_x = tbl[zj.TableEnum.Enum.ActivityNpc.ActivityBoss].build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var _center_y = tbl[zj.TableEnum.Enum.ActivityNpc.ActivityBoss].build_y - (this.playerLeader.verDistance - this.playerLeader.y);
            var _radius = zj.ConstantConfig_ZorkBoss.career_atk_dis[this.playerLeader.profession].max;
            var _in_radius = zj.ConstantConfig_ZorkBoss.career_atk_dis[this.playerLeader.profession].min;
            var _a = [null, null], x = _a[0], y = _a[1];
            var _b = [null, null], mapX = _b[0], mapY = _b[1];
            var pi = Math.sin(this.angleToRadian(45));
            var dif = Math.abs(this.playerLeader.y - _center_y);
            var map_x;
            var map_y;
            while (true) {
                //取舍范围
                x = zj.Helper.getRandom2(_center_x, _center_x - _radius);
                var _tmp = zj.yuan3(dif >= _radius, _radius, dif);
                if (dif < 30) {
                    y = this.playerLeader.y;
                }
                else {
                    if (_center_y > this.playerLeader.y) {
                        var scope_y1 = _center_y - _tmp * pi;
                        var scope_y2 = _center_y;
                        y = zj.Helper.getRandom2(scope_y1, scope_y2);
                    }
                    else {
                        var scope_y1 = _center_y;
                        var scope_y2 = _center_y + _tmp * pi;
                        y = zj.Helper.getRandom2(scope_y1, scope_y2);
                    }
                }
                map_x = x + (this.playerLeader.moveDistance - this.playerLeader.x);
                map_y = y + (this.playerLeader.verDistance - this.playerLeader.y);
                var i = Math.floor(map_x / this.Block_Width);
                var j = Math.floor(map_y / this.Block_Width);
                var key = zj.Helper.StringFormat("%d_%d", i, j);
                //判断区间
                var num = Math.abs(y - _center_y) / _radius;
                if (map_x > 0 && map_y > 0 && num <= pi
                    && zj.isPointInCircle(new egret.Point(x, y), new egret.Point(_center_x, _center_y), _radius) == true
                    && zj.isPointInCircle(new egret.Point(x, y), new egret.Point(_center_x, _center_y), _in_radius) == false
                    && this.blocks[key] != null
                    && this.blocks[key].couldCross == true) {
                    break;
                }
                _c = [null, null], map_x = _c[0], map_y = _c[1];
            }
            return [map_x, map_y, x, y];
            var _c;
        };
        StageSceneActivityBoss.prototype.angleToRadian = function (angle) {
            return angle * (Math.PI / 180);
        };
        StageSceneActivityBoss.prototype.isNeedGoBoss = function () {
            var tag = null;
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.activityBossMap);
            var _center_x = tbl[zj.TableEnum.Enum.ActivityNpc.ActivityBoss].build_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var _center_y = tbl[zj.TableEnum.Enum.ActivityNpc.ActivityBoss].build_y - (this.playerLeader.verDistance - this.playerLeader.y);
            var _radius = zj.ConstantConfig_ZorkBoss.boss_attack_outer_radius;
            var inCircle = zj.isPointInCircle(new egret.Point(this.playerLeader.x, this.playerLeader.y), new egret.Point(_center_x, _center_y), _radius);
            if (inCircle == true) {
                tag = false;
            }
            else {
                tag = true;
            }
            return tag;
        };
        StageSceneActivityBoss.prototype.loadFormation = function () {
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
            zj.loadUI(zj.CommonFormatePveMain).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(1);
            });
        };
        StageSceneActivityBoss.prototype.dealFight = function () {
            var cb = function (thisobj) {
                var cb_child = function (thisobj) {
                    thisobj.loadFormation();
                };
                thisobj.reqLeaderPos(thisobj.playerLeader.moveDistance, thisobj.playerLeader.verDistance, cb_child, true);
            };
            this.startAutoFight(cb);
        };
        StageSceneActivityBoss.prototype.startAutoFight = function (cb) {
            var tag = this.isNeedGoBoss();
            if (tag == null) {
                return;
            }
            if (tag == false) {
                cb(this);
            }
            else {
                var _a = this.goNearBoss(), mapX = _a[0], mapY = _a[1], x = _a[2], y = _a[3];
                if (x != null && y != null) {
                    this.playerLeader.startStarPath(x, y, cb, this);
                }
            }
        };
        StageSceneActivityBoss.prototype.hidePerson = function (hidden) {
            this.bHidePerson = hidden;
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                v.setHidden(hidden);
            }
        };
        StageSceneActivityBoss.prototype.dealFightUi = function (tag) {
            if (this.mainMenu) {
                this.mainMenu.dealFightUi(tag);
            }
        };
        StageSceneActivityBoss.prototype.hideEffect = function (hidden) {
            this.bHideEffect = hidden;
            for (var k in this.tableEffects) {
                var v = this.tableEffects[k];
                if (v.belong_role.playerState == zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER) {
                    v.setVisible(!hidden);
                }
            }
        };
        StageSceneActivityBoss.prototype.ReConnetFun = function () {
            //BOSS处理
            var boss = this.getLiveBoss();
            if (boss == null)
                return;
            //判断血量对boss形态进行判断
            boss.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_None);
        };
        StageSceneActivityBoss.prototype.testMove = function (x, y) {
            var visit_func = function () {
            };
            var req = new message.DarklandBossMoveRequest();
            req.body.scene_x = x;
            req.body.scene_y = y;
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneActivityBoss.prototype.loadPrepare = function () {
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
            var curTime = zj.Game.Controller.serverNow();
            var curSec = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
            var num = (progress.info - 1) % 10;
            var dif = curSec - zj.CommonConfig.darkland_boss_open_time[num][0];
            this.prepareTime = dif;
        };
        StageSceneActivityBoss.prototype.updatePrepareTime = function (tick) {
            if (this.prepareTime <= 0) {
                return;
            }
            var rt = tick * 1000;
            this.prepareTime = this.prepareTime - rt;
            if (this.prepareTime <= 30) {
                // this.mainMenu.BossAppearUi();
                this.bossAppear();
                this.prepareTime = 0;
            }
        };
        StageSceneActivityBoss.prototype.bossAppear = function () {
            var boss = this.getLiveBoss();
            boss.setHidden(false);
            boss.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Appear);
            boss.procState(0);
        };
        StageSceneActivityBoss.prototype.OnExit = function () {
            this.release();
            if (this.mainMenu) {
                this.mainMenu.close();
                this.mainMenu = null;
            }
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
        };
        return StageSceneActivityBoss;
    }(zj.StageSceneRpg));
    zj.StageSceneActivityBoss = StageSceneActivityBoss;
    __reflect(StageSceneActivityBoss.prototype, "zj.StageSceneActivityBoss");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneActivityBoss.js.map