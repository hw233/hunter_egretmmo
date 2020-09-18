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
    var StageSceneDarkland = (function (_super) {
        __extends(StageSceneDarkland, _super);
        function StageSceneDarkland() {
            var _this = _super.call(this) || this;
            _this.floor = 100;
            _this.playersNum = 0;
            _this.playerLeader = null;
            _this.orderCnt = 1;
            _this.timer_tick = 0;
            return _this;
        }
        StageSceneDarkland.prototype.OnLoading = function (percent) {
            _super.prototype.OnLoading.call(this, percent);
            switch (percent) {
                case 51:
                    this.InitRes();
                    break;
                case 71:
                    this.initMapBlock();
                    break;
                case 76:
                    this.initMobs();
                    break;
                case 81:
                    this.initMember();
                    break;
                case 86:
                    this.proofLeaderPos(zj.Game.PlayerWonderLandSystem.darkland.roleInfo["posInfo"].posItem);
                    this.bPosFinished = true;
                    break;
                case 91:
                    this.mainMenu = zj.newUI(zj.DarkLandChoose);
                    this.mainMenu.show();
                    break;
                case 96:
                    // uicache.Add("Common_Annouce", null, true)
                    break;
            }
        };
        StageSceneDarkland.prototype.InitRes = function () {
            zj.Gmgr.Instance.preLayerId = zj.Gmgr.Instance.layerId;
            zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_DARKLAND);
            zj.Gmgr.Instance.bInSceneFight = false;
            this.mainMenu = null;
            this.sceneType = zj.Game.PlayerWonderLandSystem.darkland.roleInfo["posInfo"].posItem.sceneType;
            this.count = 0;
            // this.InitScene();
            var MapId = 41;
            this.LoadMap(MapId);
            this.initCellNode();
            this.initTmx();
            this.initLeader();
            this.initLeaderPet();
            this.initTrees();
            this.flashSceneLeaderColor();
            this.initBuilds(zj.StringConfig_Table.darklandlandMap, zj.Game.PlayerWonderLandSystem.darkland.darklandId);
        };
        StageSceneDarkland.prototype.release = function () {
            _super.prototype.release.call(this);
            zj.CC_SAFE_DELETE(this.playerLeader);
        };
        StageSceneDarkland.prototype.Init = function () {
            _super.prototype.Init.call(this);
            zj.Helper.PlaybgmByID(100001);
            //更新时间差值
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
            zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            this.proofTime();
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
        };
        StageSceneDarkland.prototype.SceneItemPosNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.updateSimplePos(zj.Game.PlayerWonderLandSystem.noticePosInfo);
            zj.Game.PlayerWonderLandSystem.noticePosInfo = {};
        };
        StageSceneDarkland.prototype.SceneItemPosInfoNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            if (this.playerLeader != null) {
                if (zj.Helper.getObjLen(zj.Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
                    this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadPosInfo);
                    zj.Game.PlayerWonderLandSystem.loadPosInfo = {};
                }
                this.updateNoticePos(zj.Game.PlayerWonderLandSystem.timePosInfo);
                zj.Game.PlayerWonderLandSystem.timePosInfo = {};
            }
        };
        StageSceneDarkland.prototype.LeagueWarBattleResultNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.beAtkNoticeResult();
        };
        StageSceneDarkland.prototype.initLeader = function () {
            var order = this.orderCnt;
            var leader = new zj.StageSceneFightLeader(this.map, this.MapBlockH);
            var x = 0;
            var y = 0;
            var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            leader.createWonderlandPlayer(scenePosInfo, this.floor, x, y, dir, x, y);
            leader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
            leader.dealSceneNotice(scenePosInfo);
            if (scenePosInfo.hpPre == 0) {
                leader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            this.playerLeader = leader;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneDarkland.prototype.initLeaderPet = function () {
            var pet = new zj.StageScenePlayerPet(this.map, this.MapBlockH);
            var x = -70;
            var y = 0;
            var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            pet.createPlayerPet(this.playerLeader, x, y, dir);
            this.playerLeaderPet = pet;
            this.orderCnt = this.orderCnt + 1;
            this.playerLeader.setPlayerPet(pet);
        };
        StageSceneDarkland.prototype.initTrees = function () {
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
                    continue;
                }
                this.addTree(v);
            }
        };
        StageSceneDarkland.prototype.addTree = function (scenePosInfo) {
            if (scenePosInfo.posItem.sceneType != this.sceneType) {
                return;
            }
            if (scenePosInfo.posItem.scene_x > this.mapWidth || scenePosInfo.posItem.scene_y > this.mapHeight) {
                return;
            }
            var tbl = zj.TableWonderlandTree.Table();
            var tree_id = scenePosInfo.buildId;
            var v = tbl[tree_id];
            if (v == null) {
                return;
            }
            var key = scenePosInfo.roleBase.id;
            var posItem = scenePosInfo.posItem;
            var tree = new zj.StageRpgTree(this.map, this.MapBlockH);
            tree.InitTree(v, scenePosInfo);
            this.tableTrees[key] = tree;
            return tree;
        };
        StageSceneDarkland.prototype.initMobs = function () {
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    continue;
                }
                if (this.tableMembers[v.roleBase.id] != null) {
                    continue;
                }
                this.addMob(v, null, null);
            }
        };
        StageSceneDarkland.prototype.isModExist = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    return true;
                }
            }
            return false;
        };
        StageSceneDarkland.prototype.addMob = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var mob = new zj.StageSceneFightMob(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Left;
            var _a = this.proofMobPos(scenePosInfo.posItem.scene_x, scenePosInfo.posItem.scene_y), map_x = _a[0], map_y = _a[1];
            var screen_x = map_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = map_y - (this.playerLeader.verDistance - this.playerLeader.y);
            mob.createWonderlandMob(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            mob.setPos(screen_x, screen_y);
            this.tableMembers[scenePosInfo.roleBase.id] = mob;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneDarkland.prototype.addMember = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var member = new zj.StageSceneFightInLeauge(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            var screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y);
            member.createWonderlandPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            member.dealSceneNotice(scenePosInfo);
            this.tableMembers[scenePosInfo.roleBase.id] = member;
            this.orderCnt = this.orderCnt + 1;
            this.addmemberPet(member);
        };
        StageSceneDarkland.prototype.addmemberPet = function (member) {
            var carry = member.getCarryPet();
            if (carry) {
                var pet = new zj.StageScenePlayerPet(this.map, this.MapBlockH);
                var x = -70;
                var y = 0;
                var dir = zj.TableEnum.TableEnumDir.Dir_Right;
                pet.createPlayerPet(member, x, y, dir);
                this.tableMemberPets[member.scenePosInfo.roleBase.id] = pet;
                this.orderCnt = this.orderCnt + 1;
                this.tableMembers[member.scenePosInfo.roleBase.id].setPlayerPet(pet);
            }
        };
        StageSceneDarkland.prototype.initMember = function () {
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
        StageSceneDarkland.prototype.delMember = function (key_id) {
            if (this.tableMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.tableMembers[key_id]);
                zj.CC_SAFE_DELETE(this.tableMemberPets[key_id]);
            }
            else if (this.cacheMembers[key_id] != null) {
                zj.CC_SAFE_DELETE(this.cacheMembers[key_id]);
            }
            delete this.tableMembers[key_id];
            delete this.tableMemberPets[key_id];
            delete this.cacheMembers[key_id];
            delete zj.Game.PlayerWonderLandSystem.scenePosInfo[key_id];
        };
        StageSceneDarkland.prototype.SetTreeBlock = function (tree) {
            var hor = (tree.map_x - tree.info.balk_rt[2] / 1) / this.Block_Width;
            var ver = tree.map_y / this.Block_Width;
            var grid_w = tree.info.balk_rt[2] / this.Block_Width;
            var grid_h = tree.info.balk_rt[3] / this.Block_Width;
            for (var i = hor; i < hor + grid_w - 1; i++) {
                for (var j = ver; j < ver + grid_h - 1; j++) {
                    i = Math.floor(i);
                    j = Math.floor(j);
                    var key = zj.Helper.StringFormat("%d_%d", i, j);
                    this.blocks[key].couldCross = false;
                }
            }
        };
        StageSceneDarkland.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (this.playerLeader != null) {
                this.playerLeader.Update(tick);
                this.updateLeaderDieUi();
            }
            if (this.playerLeaderPet != null) {
                this.playerLeaderPet.Update(tick);
            }
            this.updateMember(tick);
            this.updateBuilds(tick);
            this.updateTrees(tick);
            this.updateNpcs(tick);
            this.updateTreeTrans(null);
            this.flashTree();
        };
        StageSceneDarkland.prototype.updateMember = function (tick) {
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
                this.flashMemberColor(v);
            }
            for (var k in this.tableMemberPets) {
                var v = this.tableMemberPets[k];
                if (v.master.bCanRemove == true) {
                    zj.CC_SAFE_DELETE(v);
                    v = null;
                    delete this.tableMemberPets[k];
                    continue;
                }
                v.Update(tick);
            }
        };
        StageSceneDarkland.prototype.updateNoticePos = function (tbl) {
            if (tbl == null) {
                return;
            }
            var _loop_1 = function (k) {
                var v = tbl[k];
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
                    var key_id = v.roleBase.id;
                    if (this_1.tableTrees[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        var tree = this_1.addTree(v);
                        if (tree != null) {
                            this_1.SetTreeBlock(tree);
                            zj.Astar.getInstance().clear_cached_paths();
                        }
                    }
                    else if (this_1.tableTrees[key_id] != null) {
                        this_1.tableTrees[key_id].dealSceneNotice(v);
                    }
                }
                else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    var key_id_1 = v.roleBase.id;
                    if (this_1.tableMembers[key_id_1] == null && this_1.cacheMembers[key_id_1] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this_1.tableMembers[key_id_1] = this_1.cacheMembers[key_id_1];
                        delete this_1.cacheMembers[key_id_1];
                        this_1.tableMembers[key_id_1].joinView();
                        this_1.tableMembers[key_id_1].dealSceneNotice(v);
                    }
                    else if (this_1.tableMembers[key_id_1] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this_1.addMob(v, null, null);
                    }
                    else if ((this_1.tableMembers[key_id_1] != null || this_1.cacheMembers[key_id_1] != null) && ((v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE))) {
                        if (!this_1.willDelMobs[key_id_1]) {
                            this_1.delMember(key_id_1);
                        }
                    }
                    else if (this_1.tableMembers[key_id_1] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && zj.Helper.getObjLen(v.otherBase) == 0)) {
                        this_1.tableMembers[key_id_1].leaveView();
                        this_1.cacheMembers[key_id_1] = this_1.tableMembers[key_id_1];
                        delete this_1.tableMembers[key_id_1];
                    }
                    else if (this_1.tableMembers[key_id_1] != null) {
                        //死亡和被动战斗
                        var mobBattle = function (thisobj) {
                            if (thisobj.tableMembers[key_id_1].isVisible() == true
                                && zj.Helper.getObjLen(v.otherBase) != 0
                                && ((thisobj.tableMembers[v.otherBase[0].id] != null) || v.otherBase[0].id == zj.Game.PlayerInfoSystem.RoleID)) {
                                thisobj.tableMembers[key_id_1].dealSceneNotice(v);
                                thisobj.memberNoticeResult(key_id_1, v.otherBase[0].id);
                                return true;
                            }
                            return false;
                        };
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
                            if (mobBattle(this_1) == false) {
                                this_1.delMember(key_id_1);
                            }
                            else {
                                this_1.willDelMobs[key_id_1] = true;
                            }
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED) {
                            mobBattle(this_1);
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
                            this_1.tableMembers[key_id_1].dealSceneNotice(v);
                        }
                    }
                    else if (this_1.cacheMembers[key_id_1] != null) {
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            this_1.delMember(key_id_1);
                        }
                    }
                }
                else {
                    if (v.roleBase.id == zj.Game.PlayerInfoSystem.RoleID) {
                        if (v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            if (this_1.playerLeader != null) {
                                this_1.playerLeader.dealSceneNotice(v);
                            }
                        }
                    }
                    else {
                        var key_id = v.roleBase.id;
                        if (this_1.tableMembers[key_id] == null && this_1.cacheMembers[key_id] != null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this_1.tableMembers[key_id] = this_1.cacheMembers[key_id];
                            delete this_1.cacheMembers[key_id];
                            this_1.tableMembers[key_id].joinView();
                            this_1.tableMembers[key_id].dealSceneNotice(v);
                        }
                        else if (this_1.tableMembers[key_id] == null && this_1.cacheMembers[key_id] == null
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                            this_1.addMember(v, null, null);
                        }
                        else if ((this_1.tableMembers[key_id] != null || this_1.cacheMembers[key_id] != null)
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
                            this_1.delMember(key_id);
                        }
                        else if (this_1.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
                            this_1.tableMembers[key_id].leaveView();
                            this_1.cacheMembers[key_id] = this_1.tableMembers[key_id];
                            delete this_1.tableMembers[key_id];
                        }
                        else if (this_1.tableMembers[key_id] != null) {
                            this_1.tableMembers[key_id].dealSceneNotice(v);
                            if (this_1.tableMembers[key_id].bVisible == true && this_1.tableMembers[key_id].otherState == zj.TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0) {
                                this_1.memberNoticeResult(key_id, v.otherBase[0].id);
                            }
                        }
                    }
                }
            };
            var this_1 = this;
            for (var k in tbl) {
                _loop_1(k);
            }
        };
        StageSceneDarkland.prototype.updateBuilds = function (tick) {
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                if (v.isCanRemove() == true && v.buildHp <= 0) {
                    this.ClearBlock(v);
                    zj.CC_SAFE_DELETE(v);
                    delete this.tableBuilds[k];
                    continue;
                }
                v.Update(tick);
            }
        };
        StageSceneDarkland.prototype.UpdateMap = function (base_x, base_y) {
            var _a = this.ComputeMapXY(base_x, base_y), moveX = _a[0], moveY = _a[1];
            _super.prototype.UpdateMap.call(this, moveX, moveY);
        };
        StageSceneDarkland.prototype.getUpNode = function () {
            return this.nodeUp;
        };
        StageSceneDarkland.prototype.OnTouchDown = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchDown(touchs);
            }
            this.dealWithNpcButton(0, [touchs.stageX, touchs.stageY]);
        };
        StageSceneDarkland.prototype.OnTouchMove = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchMove(touchs);
            }
            this.dealWithNpcButton(1, [touchs.stageX, touchs.stageY]);
        };
        StageSceneDarkland.prototype.OnTouchUp = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchUp(touchs);
            }
            this.dealWithNpcButton(2, [touchs.stageX, touchs.stageY]);
        };
        StageSceneDarkland.prototype.dealWithNpcButton = function (tag, pos) {
        };
        StageSceneDarkland.prototype.getLeader = function () {
            return this.playerLeader;
        };
        StageSceneDarkland.prototype.reqLeaderPos = function (x, y, successCB) {
            if (x <= 0) {
                x = 1;
            }
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                if (successCB != null) {
                    successCB();
                }
                if (this.playerLeader) {
                    this.playerLeader.resetMoveNet();
                }
                if (response.body.roleInfo.length != 0) {
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo[0];
                    this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
                    if (this.playerLeader.sceneHpPercent == 0) {
                        this.playerLeader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                    }
                }
            };
            var req = new message.SceneMoveRequest();
            req.body.scene_x = x;
            y = zj.PlayerWonderLandSystem.MapHeight - y;
            req.body.scene_y = y;
            zj.Game.Controller.send(req, visit_func, null, this, true);
        };
        StageSceneDarkland.prototype.updateLeaderDieUi = function () {
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
        StageSceneDarkland.prototype.collideObjectReq = function (other_id, successCB) {
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    if (response.header.result == message.EC.XG_ROLE_NOT_FINDED) {
                        this.delMember(zj.Gmgr.Instance.rpgObjectId);
                    }
                    return;
                }
                else {
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
                    zj.Game.PlayerWonderLandSystem.darkland.getGoods = response.body.gameInfo.getGoods;
                    zj.Game.PlayerWonderLandSystem.battleResult(response);
                    //弹出结算界面试试
                    if (successCB != null) {
                        successCB();
                    }
                    this.atkNoticeResult();
                }
            };
            var req = new message.SceneCollideRequest();
            req.body.objectId = other_id;
            zj.Gmgr.Instance.rpgObjectId = other_id;
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneDarkland.prototype.wonderlandCollectionReq = function (tree_id, successCB) {
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result != 0) {
                    if (response.header.result == message.EC.XG_LACK_GOLDPLATE) {
                        // Player.BuyPlate();购买盘子提示
                    }
                    else {
                        zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    }
                    return;
                }
                else {
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
                    if (successCB != null) {
                        successCB();
                    }
                    this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
                }
            };
            var req = new message.SceneCollectionRequest();
            req.body.treeId = tree_id;
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneDarkland.prototype.revivePersonReq = function (successCB) {
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result == 0 || response.header.result == message.EC.XG_SCENE_OWNER_NOT_DEAD) {
                    response.body.roleInfo.posInfo.posItem.scene_y = zj.PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
                    zj.Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
                    //弹出结算界面试试
                    if (successCB != null) {
                        successCB();
                    }
                    if (this.playerLeader != null) {
                        this.playerLeader.path = null;
                        this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
                        this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem);
                        this.playerLeader.reSafe();
                    }
                }
                else if (response.header.result == message.EC.XG_LACK_TOKEN) {
                    zj.TipManager.ShowAddGemStone();
                }
            };
            var req = new message.SceneDeadCoolingRequest();
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneDarkland.prototype.updateSimplePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (this.tableMembers[k] != null) {
                    this.tableMembers[k].dealSimpleMoveNotice(v);
                }
            }
        };
        StageSceneDarkland.prototype.getEventThings = function (x, y) {
            var t = [];
            var checkNeedMove = false;
            var leaderInSafe = zj.Table.VIn(this.playerLeader.tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine);
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                if (v.isCanBeAtk() == false) {
                    continue;
                }
                if (v.beInScope(x, y) == true) {
                    checkNeedMove = true;
                    var info = {};
                    info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Building;
                    info["data"] = v;
                    t.push(info);
                }
            }
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
                var _a = v.getEventPos(), tree_x = _a[0], tree_y = _a[1];
                if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
                    continue;
                }
                checkNeedMove = true;
                var info = {};
                info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Npc;
                info["data"] = v;
                t.push(info);
            }
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                var _b = v.getEventPos(), tree_x = _b[0], tree_y = _b[1];
                if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
                    continue;
                }
                if (!leaderInSafe) {
                    checkNeedMove = true;
                }
                var info = {};
                info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Grass;
                info["data"] = v;
                t.push(info);
            }
            var tbl_move = [];
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v.beInScope(x, y) == false) {
                    continue;
                }
                if (v.otherState != zj.TableEnum.TableEnumOtherState.OtherState_None) {
                    continue;
                }
                if (v.otherState != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    if (!leaderInSafe) {
                        checkNeedMove = true;
                    }
                    var info = {};
                    info["type"] = zj.TableEnum.Enum.LeagueWarTouchType.Mob;
                    info["data"] = v;
                    t.push(info);
                    continue;
                }
                tbl_move.push(k);
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
                var value = tbl_move[rand_value - 1];
                if (zj.Table.VIn(tbl_rand, value) == false) {
                    tbl_rand.push(value);
                    var info = {};
                    var bMember = zj.yuan3(this.tableMembers[value].getLegId() != 0 && this.tableMembers[value].getLegId() == this.playerLeader.getLegId(), true, false);
                    info["type"] = zj.Helper.getWonderlandPlayerType(this.playerLeader.getBattleMode(), bMember);
                    info["data"] = this.tableMembers[value];
                    t.push(info);
                    if ((!leaderInSafe) && (!zj.Table.VIn(this.tableMembers[value].tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine))) {
                        checkNeedMove = true;
                    }
                }
            }
            t.sort(function (a, b) {
                return a.type - b.type;
            });
            return t;
        };
        StageSceneDarkland.prototype.checkEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            return zj.yuan3(t.length == 0, false, true);
        };
        StageSceneDarkland.prototype.dealEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            var doSomeThing = false;
            if (t.length > 1) {
                // local ui = PushUI("League_WarSelectThings")
                // ui:SetInfo( t )
                // ui:SetFather(self)
                // ui:SetPressOutExit()
                zj.loadUI(zj.League_WarSelectThings).then(function (dialog) {
                    dialog.SetInfo(t);
                    dialog.show();
                    doSomeThing = true;
                });
                doSomeThing = true;
            }
            else if (t.length == 1) {
                //安全区域检测
                var fightId = t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Person && t[0].data.playerInfo.id || 0;
                var canDo = this.delSafeAreaCheck(t[0].type, fightId);
                if (!canDo) {
                    return doSomeThing;
                }
                if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                    //碰撞人物
                    this.collideObjectReq(t[0].data.playerInfo.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Mob) {
                    //碰撞怪物 
                    this.collideObjectReq(t[0].data.playerInfo.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Building) {
                    //none
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Grass) {
                    //采集
                    this.wonderlandCollectionReq(t[0].data.scenePosInfo.roleBase.id, null);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Partner) {
                    this.pushPersonInterface(t[0].data.playerInfo);
                    doSomeThing = true;
                }
                else if (t[0].type == zj.TableEnum.Enum.LeagueWarTouchType.Npc) {
                    //npc
                    this.pushNpcUi(t[0].data.info);
                    doSomeThing = true;
                }
            }
            return doSomeThing;
        };
        //安全区操作检测
        StageSceneDarkland.prototype.delSafeAreaCheck = function (touch_type, id) {
            var canDo = true;
            var leaderInSafe = zj.Table.VIn(this.playerLeader.tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine);
            if (touch_type == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                //碰撞人物
                if (leaderInSafe) {
                    canDo = false;
                    // GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[0])
                }
                else {
                    if (this.tableMembers[id] != null) {
                        var fightObjInSafe = zj.Table.VIn(this.tableMembers[id].tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine);
                        if (fightObjInSafe) {
                            canDo = false;
                            // GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[Enum.LeagueWarTouchType.Person])
                        }
                    }
                }
            }
            else if (touch_type == zj.TableEnum.Enum.LeagueWarTouchType.Mob) {
                //碰撞怪物
                if (leaderInSafe) {
                    canDo = false;
                    // GameCommon:ShowMessage(TextsConfig_DarkLand.safe_error[Enum.LeagueWarTouchType.Mob])
                }
            }
            return canDo;
        };
        StageSceneDarkland.prototype.dealTriggerAreaThings = function (x, y, trigger_Tbl) {
            var curTriggerTbl = trigger_Tbl || [];
            //安全区
            var safeInfo = zj.Table.ObjFindRcall(this.tableNpcs, function (_k, _v) {
                return _v.info.build_id == zj.TableEnum.Enum.PortNpc.SafeLine;
            }, this)[0];
            var aa = [];
            if (trigger_Tbl.indexOf(zj.TableEnum.Enum.PortNpc.SafeLine) == -1) {
                if (safeInfo != null && safeInfo.beInScope(x, y)) {
                    //进入安全区
                    curTriggerTbl.push(zj.TableEnum.Enum.PortNpc.SafeLine);
                }
            }
            else {
                if (trigger_Tbl.indexOf(zj.TableEnum.Enum.PortNpc.SafeLine) != -1 && (safeInfo != null) && (safeInfo.beInScope(x, y) == false)) {
                    var safeKey = zj.Table.FindK(trigger_Tbl, zj.TableEnum.Enum.PortNpc.SafeLine);
                    //离开安全区
                    curTriggerTbl.splice(safeKey, 1);
                }
            }
            return curTriggerTbl;
        };
        StageSceneDarkland.prototype.pushNpcUi = function (info) {
            if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
                zj.loadUI(zj.ExchangeMainSence).then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
                // Teach.addTeaching();
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Mora) {
                zj.loadUI(zj.MoraMainScene).then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
                // Teach.addTeaching();
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Fish) {
                zj.loadUI(zj.FishingMain).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                // Teach.addTeaching();
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Door) {
                var LeaveWonderlandSceneReq_1 = function Func() {
                    var Response = function (req, resp) {
                        var response = resp;
                        if (response.header.result == message.EC.SUCCESS) {
                            this.delMember(zj.Game.PlayerInfoSystem.RoleID);
                            var cb = function () {
                                if (!zj.Device.isReviewSwitch) {
                                    // PushUI("HXH_Wonderland")//退出去走这里  目前有问题
                                }
                            };
                            // StageSceneManager:ChangeScene(StageSceneCity, cb)
                            zj.StageSceneManager.Instance.clearScene();
                        }
                        else {
                            zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        }
                    };
                    var req = new message.WonderlandLeaveRequest();
                    zj.Game.Controller.send(req, Response, null, this, false);
                };
                if (this.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                    zj.toast(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                    return;
                }
                if (this.isTouchUiEnabled() == false) {
                    zj.toast(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                    return;
                }
                var _a = this.isCanLeaveScene(), tag = _a[0], code = _a[1];
                if (tag == true && !zj.Device.isReviewSwitch) {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Wonderland.return_tip, function () {
                        LeaveWonderlandSceneReq_1();
                    });
                }
                else {
                    if (zj.TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")] != null) {
                        zj.toast(zj.TextsConfig.TextsConfig_Rpg.leave_error[parseInt(code + "")]);
                    }
                }
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {
                var Response_1 = function (req, resp) {
                    var response = resp;
                    if (response.header.result == message.EC.SUCCESS) {
                        zj.Game.PlayerDoubleBallSystem.my_id = zj.Game.PlayerDoubleBallSystem.serverFruit(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit, zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.blueFruit);
                        zj.Game.PlayerDoubleBallSystem.public_id = zj.Game.PlayerDoubleBallSystem.serverFruit(response.body.fruitInfo.dailyLotteryFruit.redFruit, response.body.fruitInfo.dailyLotteryFruit.blueFruit);
                        zj.loadUI(zj.DoubleColorSence).then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                    else {
                        zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    }
                };
                var req = new message.GetLotteryFruitInfoRequest();
                zj.Game.Controller.send(req, Response_1, null, this, false);
            }
            else {
                return;
            }
        };
        StageSceneDarkland.prototype.pushPersonInterface = function (info) {
            // ui = PushUI("Wonderland_SelectPlayer")
            // ui:SetInfo( info )
            // ui:SetFather(self)
            // ui:SetPressOutExit()
        };
        StageSceneDarkland.prototype.flashSceneLeaderColor = function () {
            var _path = zj.Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
            var _color = zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            this.playerLeader.flashTtfNameColor(_color);
            this.playerLeader.flashBarTexture(_path);
        };
        StageSceneDarkland.prototype.flashTree = function () {
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                var _tag = false;
                var _action = -1;
                var _a = v.getEventPos(), x = _a[0], y = _a[1];
                if (this.playerLeader.isValidEventDis(x, y) == true) {
                    _tag = true;
                    _action = zj.TableEnum.Enum.LeagueWarTouchType.Grass;
                }
                if (v.fruitCnt <= 0) {
                    _action = -1;
                }
                var isPeace = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.darkland.darklandId).is_battle == 0;
                var can_pick = zj.Otherdb.inPeaceWonderlandNotPick(v.treeId);
                zj.otherdb;
                if (isPeace) {
                    if (!can_pick) {
                        _action = -1;
                    }
                }
                v.flashTree(_tag, _action);
            }
        };
        StageSceneDarkland.prototype.getDarklandMode = function () {
            var model = zj.TableEnum.Enum.WonderlandType.WondType_Fight;
            return model;
        };
        StageSceneDarkland.prototype.flashMemberColor = function (v) {
            if (v.bVisible == false) {
                return;
            }
            if (v.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                var _action = -1;
                if (this.playerLeader.isValidEventDis(v.x, v.y + v.bodyHeight / 2) == true && v.isFightShowing() == false) {
                    _action = zj.TableEnum.Enum.LeagueWarTouchType.Mob;
                }
                v.flashLedAni(_action);
            }
            else {
                var myMode = this.playerLeader.getBattleMode();
                var otherMode = v.getBattleMode();
                var bMember = zj.yuan3(v.getLegId() != 0 && v.getLegId() == this.playerLeader.getLegId(), true, false);
                var _action = zj.Helper.getWonderlandPlayerType(myMode, bMember);
                var _path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
                var _color = zj.ConstantConfig_Common.Color.wonderland_color.memeber_color;
                if (this.getDarklandMode() == zj.TableEnum.Enum.WonderlandType.WondType_Fight) {
                    if (bMember) {
                        _path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar;
                    }
                    else {
                        _path = zj.UIConfig.UIConfig_LeagueWarScene.roleBloodFightBar;
                    }
                    if (_action == zj.TableEnum.Enum.LeagueWarTouchType.Person) {
                        _color = zj.ConstantConfig_Common.Color.wonderland_color.other_kill_color;
                    }
                }
                if (v.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die || this.playerLeader.isValidEventDis(v.x, v.y + v.bodyHeight / 2) == false) {
                    _action = -1;
                }
                v.flashBarTexture(_path);
                v.flashTtfNameColor(_color);
                v.flashLedAni(_action);
            }
        };
        StageSceneDarkland.prototype.addCollectMenu = function (time, type) {
            if (this.mainMenu != null) {
                this.mainMenu.addControlPop(time, type);
            }
        };
        StageSceneDarkland.prototype.deleteCollectMenu = function () {
            if (this.mainMenu) {
                this.mainMenu.deleteControlPop();
            }
        };
        //发协议切换场景
        StageSceneDarkland.prototype.DarklandEnter_Req = function (id) {
            var DarklandEnter_Resp = function (req, resp) {
                var response = resp;
                if (response.header.result == message.EC.SUCCESS) {
                    zj.Game.PlayerDarkSystem.enterScene(response);
                    zj.Game.PlayerWonderLandSystem.darkland.mapBlockIndex = id;
                    zj.StageSceneManager.Instance.ChangeScene(StageSceneDarkland);
                    zj.Game.PlayerWonderLandSystem.darkland.darklandId = id;
                }
                // Teach.addTeaching();
            };
            var req = new message.SceneEnterRequest();
            req.body.id = id;
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, DarklandEnter_Resp, null, this, false);
        };
        StageSceneDarkland.prototype.OnExit = function () {
            this.release();
            if (this.mainMenu) {
                this.mainMenu.close();
                this.mainMenu = null;
            }
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
        };
        return StageSceneDarkland;
    }(zj.StageSceneRpg));
    zj.StageSceneDarkland = StageSceneDarkland;
    __reflect(StageSceneDarkland.prototype, "zj.StageSceneDarkland");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneDarkland.js.map