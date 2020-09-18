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
    var StageSceneWonderland = (function (_super) {
        __extends(StageSceneWonderland, _super);
        function StageSceneWonderland() {
            var _this = _super.call(this) || this;
            _this.testNum = 100;
            _this.floor = 100;
            _this.playersNum = 0;
            _this.playerLeader = null;
            _this.orderCnt = 1;
            // 教学
            // Game.TeachSystem.curPart = -1
            zj.Teach.bFirstTeachUpdata = true;
            _this.timer_tick = 0;
            return _this;
        }
        StageSceneWonderland.prototype.OnTouchDown = function (touchs) {
            if (this.playerLeader != null) {
                // let yy = UIManager.StageWidth - touchs.localY;
                this.playerLeader.OnTouchDown(touchs);
            }
            this.dealWithNpcButton(0, [touchs.stageX, touchs.stageY]);
        };
        StageSceneWonderland.prototype.OnTouchMove = function (touchs) {
            if (this.playerLeader != null) {
                this.playerLeader.OnTouchMove(touchs);
            }
            this.dealWithNpcButton(1, [touchs.stageX, touchs.stageY]);
        };
        StageSceneWonderland.prototype.OnTouchUp = function (touchs) {
            if (this.playerLeader != null) {
                // let yy = UIManager.StageWidth - touchs.localY;
                this.playerLeader.OnTouchUp(touchs);
            }
            this.dealWithNpcButton(2, [touchs.stageX, touchs.stageY]);
        };
        StageSceneWonderland.prototype.OnLoading = function (percent) {
            _super.prototype.OnLoading.call(this, percent);
            switch (percent) {
                case 51:
                    this.InitRes();
                    this.dealTeachMobs();
                    break;
                case 56:
                    break;
                case 61:
                    break;
                case 66:
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
                    var posItem = zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem;
                    if (zj.SceneManager.initType == 3) {
                        zj.SceneManager.initType = 0;
                        posItem.scene_x = zj.Util.randomValue(1800, 1970);
                        posItem.scene_y = zj.Util.randomValue(366, 422);
                    }
                    this.proofLeaderPos(posItem);
                    this.bPosFinished = true;
                    break;
                case 91:
                    this.mainMenu = zj.newUI(zj.WonderLandChoose);
                    this.mainMenu.show();
                    break;
                case 96:
                    // uicache.Add("Common_Annouce", nil, true)
                    break;
            }
        };
        StageSceneWonderland.prototype.InitRes = function () {
            zj.Gmgr.Instance.preLayerId = zj.Gmgr.Instance.layerId;
            zj.Gmgr.Instance.setLayerId(zj.TableEnumLayerId.LAYER_WONDERLAND);
            zj.Gmgr.Instance.bInSceneFight = false;
            this.mainMenu = null;
            this.sceneType = zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem.sceneType;
            this.count = 0;
            // this.InitScene();
            var MapId = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).map_id;
            this.LoadMap(MapId);
            this.initCellNode();
            this.initTmx();
            this.initLeader();
            this.initLeaderPet();
            this.initTrees();
            //this.initBuilds() 
            this.initBuilds(zj.StringConfig_Table.wonderlandMap, zj.Game.PlayerWonderLandSystem.wonderlandId);
            this.flashSceneLeaderColor();
        };
        StageSceneWonderland.prototype.release = function () {
            _super.prototype.release.call(this);
            zj.CC_SAFE_DELETE(this.playerLeader);
            this.playerLeader = null;
        };
        StageSceneWonderland.prototype.Init = function () {
            _super.prototype.Init.call(this);
            zj.Helper.PlaybgmByID(100001);
            //更新时间差值
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
            this.proofTime();
            zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
        };
        StageSceneWonderland.prototype.SceneItemPosNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.updateSimplePos(zj.Game.PlayerWonderLandSystem.noticePosInfo);
            zj.Game.PlayerWonderLandSystem.noticePosInfo = {};
        };
        StageSceneWonderland.prototype.SceneItemPosInfoNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            if (zj.Helper.getObjLen(zj.Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
                this.updateNoticePos(zj.Game.PlayerWonderLandSystem.loadingPosInfo);
                zj.Game.PlayerWonderLandSystem.loadingPosInfo = {};
            }
            // Game.PlayerWonderLandSystem.timePosInfo
            this.updateNoticePos(zj.Game.PlayerWonderLandSystem.timePosInfo);
            zj.Game.PlayerWonderLandSystem.timePosInfo = {};
        };
        StageSceneWonderland.prototype.LeagueWarBattleResultNotice_Visit = function (ev) {
            var body = ev.data.body;
            if (body == undefined || body == null)
                return;
            this.beAtkNoticeResult();
        };
        StageSceneWonderland.prototype.initLeader = function () {
            var order = this.orderCnt;
            var leader = new zj.StageSceneFightLeader(this.map, this.MapBlockH);
            var x = 0;
            var y = 0;
            var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            leader.createWonderlandPlayer(scenePosInfo, this.floor, x, y, dir, x, y);
            leader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
            leader.dealSceneNotice(scenePosInfo);
            if (scenePosInfo.hpPre == 0) {
                leader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
            }
            this.playerLeader = leader;
            this.orderCnt = this.orderCnt + 1;
        };
        StageSceneWonderland.prototype.initLeaderPet = function () {
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
        StageSceneWonderland.prototype.initTrees = function () {
            var y = 0;
            for (var k in zj.Game.PlayerWonderLandSystem.scenePosInfo) {
                var v = zj.Game.PlayerWonderLandSystem.scenePosInfo[k];
                if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
                    continue;
                }
                this.addTree(v);
            }
        };
        StageSceneWonderland.prototype.addTree = function (scenePosInfo) {
            var tbl = zj.TableWonderlandTree.Table();
            var tree_id = scenePosInfo.buildId;
            if (scenePosInfo.posItem.scene_x > this.mapWidth || scenePosInfo.posItem.scene_y > this.mapHeight) {
                return;
            }
            var v = tbl[tree_id];
            if (v == null) {
                return;
            }
            var key = scenePosInfo.roleBase.id;
            var tree = new zj.StageRpgTree(this.map, this.MapBlockH);
            tree.InitTree(v, scenePosInfo);
            this.tableTrees[key] = tree;
            return tree;
        };
        StageSceneWonderland.prototype.initMobs = function () {
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
        StageSceneWonderland.prototype.isModExist = function (t) {
            for (var k in t) {
                var v = t[k];
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    return true;
                }
            }
            return false;
        };
        StageSceneWonderland.prototype.addMob = function (scenePosInfo, x, y) {
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
            this.willDelMobs[scenePosInfo.roleBase.id] = false;
        };
        StageSceneWonderland.prototype.addMember = function (scenePosInfo, x, y) {
            var order = this.orderCnt;
            var member = new zj.StageSceneFightInLeauge(this.map, this.MapBlockH);
            var floor = 200;
            var dir = zj.TableEnum.TableEnumDir.Dir_Right;
            var screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x);
            var screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y);
            // if(scenePosInfo.roleBase.picId < 100){
            // 	scenePosInfo.roleBase.picId = "1400" + scenePosInfo.roleBase.picId;
            // }
            // scenePosInfo.roleBase.picId = 140001
            member.createWonderlandPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
            member.dealSceneNotice(scenePosInfo);
            this.tableMembers[scenePosInfo.roleBase.id] = member;
            this.orderCnt = this.orderCnt + 1;
            this.addmemberPet(member);
        };
        StageSceneWonderland.prototype.addmemberPet = function (member) {
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
        StageSceneWonderland.prototype.initMember = function () {
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
        StageSceneWonderland.prototype.delMember = function (key_id) {
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
        StageSceneWonderland.prototype.Update = function (tick) {
            // tick = 0.03;
            _super.prototype.Update.call(this, tick);
            if (this.playerLeader != null) {
                this.playerLeader.Update(tick);
                this.updateLeaderDieUi();
                this.updateLeaderFish();
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
            //教学
            // Teach.procTeach();
            zj.Teach.checkTeachId();
            zj.Teach.proOperateTeach();
        };
        StageSceneWonderland.prototype.updateMember = function (tick) {
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v.bCanRemove == true) {
                    zj.CC_SAFE_DELETE(v);
                    delete this.tableMembers[k];
                    delete this.cacheMembers[k];
                    v = null;
                    continue;
                }
                v.Update(tick);
                this.flashMemberColor(v);
            }
            for (var k in this.tableMemberPets) {
                var v = this.tableMemberPets[k];
                if (v.master.bCanRemove == true) {
                    zj.CC_SAFE_DELETE(v);
                    delete this.tableMemberPets[k];
                    v = null;
                    continue;
                }
                v.Update(tick);
            }
        };
        StageSceneWonderland.prototype.updateSimplePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (this.tableMembers[k] != null) {
                    this.tableMembers[k].dealSimpleMoveNotice(v);
                }
            }
        };
        StageSceneWonderland.prototype.mobBattle = function (v, key_id) {
            if (this.tableMembers[key_id].isVisible() == true
                && v.otherBase.length != 0
                && ((this.tableMembers[v.otherBase[0].id] != null) || v.otherBase[0].id == zj.Game.PlayerInfoSystem.RoleID)) {
                this.tableMembers[key_id].dealSceneNotice(v);
                this.memberNoticeResult(key_id, v.otherBase[0].id);
                return true;
            }
            return false;
        };
        StageSceneWonderland.prototype.updateNoticePos = function (tbl) {
            for (var k in tbl) {
                var v = tbl[k];
                if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
                    var key_id = v.roleBase.id;
                    if (this.tableTrees[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        var tree = this.addTree(v);
                        if (tree != null) {
                            this.SetTreeBlock(tree);
                            zj.Astar.getInstance().clear_cached_paths();
                        }
                    }
                    else if (this.tableTrees[key_id] != null) {
                        this.tableTrees[key_id].dealSceneNotice(v);
                    }
                }
                else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    var key_id = v.roleBase.id;
                    if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.tableMembers[key_id] = this.cacheMembers[key_id];
                        delete this.cacheMembers[key_id];
                        this.tableMembers[key_id].joinView();
                        this.tableMembers[key_id].dealSceneNotice(v);
                    }
                    else if (this.tableMembers[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
                        this.addMob(v, null, null);
                    }
                    else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) && ((v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE))) {
                        if (!this.willDelMobs[key_id]) {
                            this.delMember(key_id);
                        }
                    }
                    else if (this.tableMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && v.otherBase.length == 0)) {
                        this.tableMembers[key_id].leaveView();
                        this.cacheMembers[key_id] = this.tableMembers[key_id];
                        delete this.tableMembers[key_id];
                    }
                    else if (this.tableMembers[key_id] != null) {
                        //死亡和被动战斗
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
                            if (this.mobBattle(v, key_id) == false) {
                                this.delMember(key_id);
                            }
                            else {
                                this.willDelMobs[key_id] = true;
                            }
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED) {
                            this.mobBattle(v, key_id);
                        }
                        else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
                            this.tableMembers[key_id].dealSceneNotice(v);
                        }
                    }
                    else if (this.cacheMembers[key_id] != null) {
                        if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
                            this.delMember(key_id);
                        }
                    }
                }
                else {
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
                            && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE
                                || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
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
                            if (this.tableMembers[key_id].bVisible == true && this.tableMembers[key_id].otherState == zj.TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0) {
                                this.memberNoticeResult(key_id, v.otherBase[0].id);
                            }
                        }
                    }
                }
            }
        };
        StageSceneWonderland.prototype.updateBuilds = function (tick) {
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
        StageSceneWonderland.prototype.UpdateMap = function (base_x, base_y) {
            var _a = this.ComputeMapXY(base_x, base_y), moveX = _a[0], moveY = _a[1];
            _super.prototype.UpdateMap.call(this, moveX, moveY);
        };
        StageSceneWonderland.prototype.getUpNode = function () {
            return this.nodeUp;
        };
        StageSceneWonderland.prototype.dealWithNpcButton = function (tag, pos) {
            // let x = pos[0];
            // let y = pos[1];
            // for(let k in this.tableNpcs){
            // 	let v = this.tableNpcs[k];
            // 	let rect:egret.Rectangle = new egret.Rectangle(v.x + v.info.touch_rt[0], v.y + v.info.touch_rt[1], v.info.touch_rt[2], v.info.touch_rt[3]);
            // 	if(rect.containsPoint(new egret.Point(x,y)) == true){
            // 		if(tag == 0 && v.back1 != null){
            // 			//getNodeScaleByClick(v.back1, true);
            // 		}
            // 	}
            // }
        };
        StageSceneWonderland.prototype.getLeader = function () {
            return this.playerLeader;
        };
        StageSceneWonderland.prototype.reqLeaderPos = function (x, y, successCB) {
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
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo[0];
                    this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
                    if (this.playerLeader.sceneHpPercent == 0) {
                        this.playerLeader.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Die);
                    }
                }
            };
            var req = new message.WonderlandMoveRequest();
            req.body.scene_x = x;
            y = zj.PlayerWonderLandSystem.MapHeight - y;
            req.body.scene_y = y;
            zj.Game.Controller.send(req, visit_func, null, this, true);
        };
        StageSceneWonderland.prototype.updateLeaderDieUi = function () {
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
        StageSceneWonderland.prototype.updateLeaderFish = function () {
            this.playerLeader.pre_fish_state = this.playerLeader.bInFish;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0) {
                //下杆中
                if (this.playerLeader.bInFish != 1) {
                    this.playerLeader.bInFish = 1;
                }
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
                //可收杆
                if (this.playerLeader.bInFish != 2) {
                    this.playerLeader.bInFish = 2;
                }
            }
            else {
                if (this.playerLeader.bInFish != 0) {
                    this.playerLeader.bInFish = 0;
                }
            }
        };
        StageSceneWonderland.prototype.declareReq = function (roleId, successCB) {
            // let visit_func = function func(host, msg, result){
            // 	if(result == EC.SUCCESS){
            // 		//弹出结算界面试试
            // 		if(successCB != null){
            // 			successCB();
            // 		}
            // 		this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
            // 	}
            // }
        };
        StageSceneWonderland.prototype.collideObjectReq = function (other_id, successCB) {
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
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
                    zj.Game.PlayerWonderLandSystem.getGoods = response.body.gameInfo.getGoods;
                    zj.Game.PlayerWonderLandSystem.battleResult(response);
                    //弹出结算界面试试
                    if (successCB != null) {
                        successCB();
                    }
                    this.atkNoticeResult();
                }
            };
            var req = new message.WonderlandCollideRequest();
            req.body.objectId = other_id;
            zj.Gmgr.Instance.rpgObjectId = other_id;
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneWonderland.prototype.wonderlandCollectionReq = function (tree_id, successCB) {
            var visit_func = function func(req, resp) {
                var _this = this;
                var response = resp;
                if (response.header.result != 0) {
                    if (response.header.result == message.EC.XG_LACK_GOLDPLATE) {
                        // Player.BuyPlate();购买盘子提示
                        var viplevel = zj.TableVipinfo.Table()[Object.keys(zj.TableVipinfo.Table()).length - 1].level;
                        var Licence_1 = function (vipLv) {
                            var lv = vipLv ? vipLv : zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
                            return zj.TableLicence.Item(lv);
                        };
                        if (zj.Game.PlayerInfoSystem.BaseInfo.vipLevel == viplevel || Licence_1().buy_plate > zj.Game.PlayerVIPSystem.vipInfo.buyPlate || Licence_1(zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel + 1).buy_plate <= Licence_1().buy_plate) {
                            var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buy_plate, zj.CommonConfig.plate_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPlate), zj.CommonConfig.role_buy_add_plate, Licence_1().buy_plate - zj.Game.PlayerVIPSystem.vipInfo.buyPlate, Licence_1().buy_plate);
                            zj.TipManager.ShowConfirmCancel(str, function () {
                                zj.Game.PlayerWonderLandSystem.BuyPlate().then(function () {
                                    var str_power = zj.Helper.StringFormat("+%d", zj.CommonConfig.role_buy_add_plate);
                                    zj.TipManager.GetResource(str_power, message.EResourceType.RESOURCE_GOLD_PLATE, _this.height / 2);
                                }).catch(function (result) {
                                    if (result == message.EC.XG_POWER_BUY_LIMIT) {
                                        var str_1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.err_buy_plate, zj.Game.PlayerVIPSystem.vipInfo.buyPlate, Licence_1().buy_plate);
                                        zj.TipManager.ShowTipsAndGoVip(str_1, _this, zj.TableEnum.Enum.Vip.CHARGE, null);
                                    }
                                    else if (result == message.EC.XG_LACK_TOKEN) {
                                        zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                                            zj.loadUI(zj.PayMallScene)
                                                .then(function (scene) {
                                                scene.show(zj.UI.SHOW_FROM_TOP);
                                                scene.init(false);
                                                scene.loadFrom(zj.StageSceneManager.Instance.GetCurScene().mm || zj.TableEnum.Enum.HXHChargeType.Charge);
                                            });
                                        });
                                    }
                                    else {
                                    }
                                });
                            });
                        }
                    }
                    else {
                        zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                    }
                    return;
                }
                else {
                    zj.Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
                    if (successCB != null) {
                        successCB();
                    }
                    if (this.playerLeader) {
                        this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
                    }
                }
            };
            var req = new message.WonderlandCollectionRequest();
            req.body.treeId = tree_id;
            zj.Game.Controller.send(req, visit_func, null, this, false, true);
        };
        StageSceneWonderland.prototype.revivePersonReq = function (successCB) {
            var visit_func = function func(req, resp) {
                var response = resp;
                if (response.header.result == 0 || response.header.result == message.EC.XG_SCENE_OWNER_NOT_DEAD) {
                    //弹出结算界面试试
                    if (successCB != null) {
                        successCB();
                    }
                    if (this.playerLeader != null) {
                        this.playerLeader.path = null;
                        this.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
                        this.proofLeaderPos(this.playerLeader.fightRoleInfo.posItem);
                        this.playerLeader.reSafe();
                    }
                }
                else if (response.header.result == message.EC.XG_LACK_TOKEN) {
                    zj.TipManager.ShowAddGemStone();
                }
            };
            var req = new message.WonderlandDeadCoolingRequest();
            zj.Game.Controller.send(req, visit_func, null, this, false);
        };
        StageSceneWonderland.prototype.getEventThings = function (x, y) {
            var t = [];
            for (var k in this.tableBuilds) {
                var v = this.tableBuilds[k];
                if (v.isCanBeAtk() == false) {
                    continue;
                }
                if (v.beInScope(x, y) == true) {
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
                }
            }
            t.sort(function (a, b) {
                return a.type - b.type;
            });
            return t;
        };
        StageSceneWonderland.prototype.checkEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            return zj.yuan3(t.length == 0, false, true);
        };
        StageSceneWonderland.prototype.dealEventThings = function (x, y) {
            var t = this.getEventThings(x, y);
            var doSomeThing = false;
            if (t.length > 1) {
                zj.loadUI(zj.League_WarSelectThings).then(function (dialog) {
                    dialog.SetInfo(t);
                    dialog.show();
                    doSomeThing = true;
                });
            }
            else if (t.length == 1) {
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
                    //采集
                    this.pushNpcUi(t[0].data.info);
                    doSomeThing = true;
                }
            }
            return doSomeThing;
        };
        //安全区操作检测
        StageSceneWonderland.prototype.delSafeAreaCheck = function (touch_type, id) {
            var canDo = true;
            return canDo;
        };
        StageSceneWonderland.prototype.dealTriggerAreaThings = function (x, y, trigger_Tbl) {
            return [];
        };
        StageSceneWonderland.prototype.pushNpcUi = function (info) {
            var _this = this;
            if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Port) {
                if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, true)) {
                    zj.loadUI(zj.DarkLandPortMainSence)
                        .then(function (Scene) {
                        Scene.Init();
                        Scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                // Teach.addTeaching();
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Boss) {
                if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, true)) {
                    zj.Game.PlayerZorkSystem.bossInfo().then(function () {
                        zj.loadUI(zj.ZorkBossMainPop)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                        });
                    });
                }
                // Teach.addTeaching();
            }
            else if (info.build_id == zj.TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
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
                // let LeaveWonderlandSceneReq = function Func() {
                // 	let Response = function (req: aone.AoneRequest, resp: aone.AoneResponse) {
                // 		let response = <message.WonderlandLeaveResponse>resp;
                // 		if (response.header.result == message.EC.SUCCESS) {
                // 			// let cb = function(){
                // 			// 	if(!Device.isReviewSwitch){
                // 			// 		// PushUI("HXH_Wonderland")//退出去走这里  目前有问题
                // 			// 	}
                // 			// }
                // 			Game.PlayerWonderLandSystem.prairieClose();
                // 		} else {
                // 			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                // 		}
                // 	}
                // 	let req = new message.WonderlandLeaveRequest();
                // 	Game.Controller.send(req, Response, null, this, false);
                // }
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
                        // LeaveWonderlandSceneReq();
                        zj.Game.PlayerWonderLandSystem.prairieClose(_this.mainMenu.closeFinish, _this.mainMenu);
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
        StageSceneWonderland.prototype.pushPersonInterface = function (info) {
            // local ui = PushUI("Wonderland_SelectPlayer")
            // ui:SetInfo( info )
            // ui:SetFather(self)
            // ui:SetPressOutExit();
        };
        StageSceneWonderland.prototype.flashSceneLeaderColor = function () {
            var _path = zj.Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
            var _color = zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            this.playerLeader.flashTtfNameColor(_color);
            this.playerLeader.flashBarTexture(_path);
        };
        StageSceneWonderland.prototype.flashTree = function () {
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
                var isPeace = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).is_battle == 0;
                var can_pick = zj.Otherdb.inPeaceWonderlandNotPick(v.treeId);
                if (isPeace) {
                    if (!can_pick) {
                        _action = -1;
                    }
                }
                v.flashTree(_tag, _action);
            }
        };
        StageSceneWonderland.prototype.getWonderlandMode = function () {
            var model = zj.TableEnum.Enum.WonderlandType.WondType_Peace;
            if (zj.Game.PlayerWonderLandSystem.wonderlandId == 3 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                model = zj.TableEnum.Enum.WonderlandType.WondType_Fight;
            }
            return model;
        };
        StageSceneWonderland.prototype.flashMemberColor = function (v) {
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
                if (this.getWonderlandMode() == zj.TableEnum.Enum.WonderlandType.WondType_Fight) {
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
        StageSceneWonderland.prototype.addCollectMenu = function (time, type) {
            if (this.mainMenu != null) {
                this.mainMenu.addControlPop(time, type);
            }
        };
        StageSceneWonderland.prototype.deleteCollectMenu = function () {
            this.mainMenu.deleteControlPop();
        };
        //仙境教学相关
        //获得最近的树
        StageSceneWonderland.prototype.getNearTree = function () {
            var near = null;
            var dis = 999999;
            var leaderCenter = this.playerLeader.getBodyCenter();
            for (var k in this.tableTrees) {
                var v = this.tableTrees[k];
                if (v != null) {
                    var _a = v.getEventPos(), _x = _a[0], _y = _a[1];
                    var _temp = zj.Helper.getTwoPointsDis(leaderCenter, new egret.Point(_x, _y));
                    if (_temp < dis) {
                        dis = _temp;
                        near = v;
                    }
                }
            }
            return near;
        };
        StageSceneWonderland.prototype.getNpcById = function (id) {
            var near = null;
            var dis = 999999;
            var leaderCenter = this.playerLeader.getBodyCenter();
            for (var k in this.tableNpcs) {
                var v = this.tableNpcs[k];
                if (v != null) {
                    if (v.info.build_id == id) {
                        near = v;
                    }
                }
            }
            return near;
        };
        //获得出现的怪
        StageSceneWonderland.prototype.getNearMob = function () {
            var near = null;
            var dis = 999999;
            var leaderCenter = this.playerLeader.getBodyCenter();
            for (var k in this.tableMembers) {
                var v = this.tableMembers[k];
                if (v != null && v.joinType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
                    var mobCenter = v.getBodyCenter();
                    var _temp = zj.Helper.getTwoPointsDis(leaderCenter, mobCenter);
                    if (_temp < dis) {
                        dis = _temp;
                        near = v;
                    }
                }
            }
            return near;
        };
        //获得去最近的数的位置
        StageSceneWonderland.prototype.getGoingPosByTree = function (tree) {
            var going_x = tree.x - this.Block_Width;
            var going_y = tree.y;
            return [going_x, going_y];
        };
        //去最近的树行为
        StageSceneWonderland.prototype.goNearTree = function () {
            var tree = this.getNearTree();
            if (tree != null) {
                var _a = this.getGoingPosByTree(tree), x = _a[0], y = _a[1];
                this.playerLeader.startStarPath(x, y);
            }
        };
        //特定NPC行为
        StageSceneWonderland.prototype.goToNpc = function (npcId) {
            var npc = this.getNpcById(npcId);
            if (npc != null) {
                var _a = this.getGoingPosByTree(npc), x = _a[0], y = _a[1];
                this.playerLeader.startStarPath(x, y);
            }
        };
        StageSceneWonderland.prototype.collectNearTree = function () {
            var tree = this.getNearTree();
            if (tree != null) {
                this.wonderlandCollectionReq(tree.scenePosInfo.roleBase.id, null);
            }
        };
        StageSceneWonderland.prototype.collideNearMob = function () {
            var mob = this.getNearMob();
            if (mob) {
                this.collideObjectReq(mob.playerInfo.id, null);
            }
        };
        //去最近的怪行为
        StageSceneWonderland.prototype.goNearMob = function () {
            var mob = this.getNearMob();
            if (mob) {
                var _a = [mob.x - this.Block_Width, mob.y], x = _a[0], y = _a[1];
                this.playerLeader.startStarPath(x, y);
            }
        };
        //发协议切换场景
        StageSceneWonderland.prototype.WonderlandEnter_Req = function (id) {
            var WonderlandEnter_Resp = function (req, resp) {
                var response = resp;
                if (response.header.result == message.EC.SUCCESS) {
                    zj.Game.PlayerWonderLandSystem.mapBlockIndex = id;
                    zj.Game.PlayerWonderLandSystem.wonderlandId = id;
                    zj.Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
                    var MapId = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).map_id;
                    zj.MapSceneLoading.getInstance().loadFightRes(MapId, this.openWonderLand, this);
                }
                else {
                    zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                }
                // Teach.addTeaching();
            };
            var req = new message.WonderlandEnterRequest();
            req.body.id = id;
            zj.Game.PlayerWonderLandSystem.willGoRpg();
            zj.Game.Controller.send(req, WonderlandEnter_Resp, null, this, false);
        };
        StageSceneWonderland.prototype.openWonderLand = function () {
            zj.StageSceneManager.Instance.ChangeScene(StageSceneWonderland);
        };
        StageSceneWonderland.prototype.dealTeachMobs = function () {
            if (zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                //战斗新手特殊处理，入场召唤怪物
                if (!this.isModExist(zj.Game.PlayerWonderLandSystem.scenePosInfo)) {
                    this.collectNearTree();
                }
            }
        };
        StageSceneWonderland.prototype.initTestMember = function () {
            for (var i = 0; i < this.testNum; i++) {
                var model = 140001 + zj.Helper.getRandom2(0, 16);
                var x = zj.Helper.getRandom2(0, 3520);
                var y = zj.Helper.getRandom2(0, 1680);
                var scenePosInfo = zj.Game.PlayerWonderLandSystem.scenePosInfo[zj.Game.PlayerInfoSystem.RoleID];
                scenePosInfo.roleBase.id = zj.Game.PlayerInfoSystem.RoleID + i;
                scenePosInfo.roleBase.picId = model;
                scenePosInfo.posItem.scene_x = x;
                scenePosInfo.posItem.scene_y = y;
                this.addMember(scenePosInfo, null, null);
            }
        };
        StageSceneWonderland.prototype.simulateMove = function () {
            for (var i = 0; i < 50; i++) {
                var a = zj.Helper.getRandom2(1, this.testNum);
                var id = zj.Game.PlayerInfoSystem.RoleID + a;
                if (this.tableMembers[id] != null) {
                    var x = zj.Helper.getRandom2(0, 3520);
                    var y = zj.Helper.getRandom2(0, 1680);
                    var scenePosInfo = this.tableMembers[id].scenePosInfo;
                    scenePosInfo.posItem.posState = message.ESceneItemState.SCENE_ITEM_STATE_MOVE;
                    scenePosInfo.posItem.scene_x = x;
                    scenePosInfo.posItem.scene_y = y;
                    this.tableMembers[id].dealSceneNotice(scenePosInfo);
                }
            }
        };
        StageSceneWonderland.prototype.OnExit = function () {
            this.release();
            if (this.mainMenu) {
                this.mainMenu.close();
                this.mainMenu = null;
            }
            this.playerLeaderPet = null;
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
        };
        return StageSceneWonderland;
    }(zj.StageSceneRpg));
    zj.StageSceneWonderland = StageSceneWonderland;
    __reflect(StageSceneWonderland.prototype, "zj.StageSceneWonderland");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneWonderland.js.map